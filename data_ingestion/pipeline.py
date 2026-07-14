from django.db import transaction
from asgiref.sync import async_to_sync
from core.models import ProprietaryProduct, OpenSourceAlternative, FeatureParity
from .scrapers import scrape_and_extract_features
import logging

logger = logging.getLogger(__name__)

def ingest_proprietary_features(product_id: int):
    """
    Orchestrates the crawling, extraction, cleaning, and ingestion pipeline
    for a ProprietaryProduct using Crawl4AI.
    """
    try:
        product = ProprietaryProduct.objects.get(id=product_id)
        if not product.website_url:
            logger.warning(f"Product {product.name} has no website_url to crawl.")
            return

        # 1 & 2. Scrape HTML and Extract structured data with Crawl4AI/LLM
        logger.info(f"Scraping and extracting features for {product.name}: {product.website_url}")
        
        # async_to_sync to bridge Celery's sync worker to Crawl4AI's async ecosystem
        extracted_features = async_to_sync(scrape_and_extract_features)(product.website_url)
        
        if not extracted_features:
            logger.warning("No features extracted or LLM failed.")
            return

        # 3 & 4. Clean and Ingest into App Database
        logger.info(f"Ingesting {len(extracted_features)} features into the database.")
        
        with transaction.atomic():
            alternatives = OpenSourceAlternative.objects.filter(target_proprietary_product=product)
            
            for alt in alternatives:
                for feature_data in extracted_features:
                    feature_name = feature_data.get('feature_name', '').strip()
                    feature_desc = feature_data.get('description', '').strip()
                    
                    if not feature_name:
                        continue
                        
                    # Upsert logic to prevent duplicates
                    FeatureParity.objects.update_or_create(
                        alternative=alt,
                        feature_name__iexact=feature_name,
                        defaults={
                            'feature_name': feature_name,
                            'description': feature_desc
                        }
                    )
        logger.info(f"Successfully ingested features for {product.name}")
        
    except ProprietaryProduct.DoesNotExist:
        logger.error(f"ProprietaryProduct with ID {product_id} not found.")
    except Exception as e:
        logger.error(f"Pipeline error: {str(e)}")
