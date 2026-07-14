from celery import shared_task
from .pipeline import ingest_proprietary_features
import logging

logger = logging.getLogger(__name__)

@shared_task(rate_limit='5/m')
def crawl_proprietary_features_task(product_id: int):
    """
    Celery task to run the crawling pipeline for a specific proprietary product.
    Rate limited to 5 executions per minute to avoid overloading targets or APIs.
    """
    logger.info(f"Starting crawl task for ProprietaryProduct ID {product_id}")
    ingest_proprietary_features(product_id)
    logger.info(f"Finished crawl task for ProprietaryProduct ID {product_id}")
