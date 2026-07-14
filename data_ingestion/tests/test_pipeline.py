from django.test import TestCase
from unittest.mock import patch
from core.models import ProprietaryProduct, OpenSourceAlternative, FeatureParity
from data_ingestion.pipeline import ingest_proprietary_features

class PipelineIntegrationTest(TestCase):
    def setUp(self):
        self.product = ProprietaryProduct.objects.create(
            name="TestProduct",
            website_url="https://example.com/features"
        )
        self.alt = OpenSourceAlternative.objects.create(
            name="OpenTest",
            repository_url="https://github.com/opentest/opentest",
            target_proprietary_product=self.product
        )

    @patch('data_ingestion.pipeline.async_to_sync')
    def test_pipeline_ingestion_with_crawl4ai(self, mock_async_to_sync):
        # Mock the async_to_sync wrapper to return a function that returns the mock data
        def mock_scrape_func(url):
            return [
                {"feature_name": "Task Tracking", "description": "Create tasks."},
                {"feature_name": "SSO Integration", "description": "Single sign-on."}
            ]
            
        mock_async_to_sync.return_value = mock_scrape_func

        # Run the pipeline
        ingest_proprietary_features(self.product.id)

        # Verify the features were ingested into the database
        features = FeatureParity.objects.filter(alternative=self.alt)
        
        self.assertEqual(features.count(), 2)
        
        feature_names = [f.feature_name for f in features]
        self.assertIn("Task Tracking", feature_names)
        self.assertIn("SSO Integration", feature_names)
        
        # Verify deduplication
        ingest_proprietary_features(self.product.id)
        self.assertEqual(FeatureParity.objects.filter(alternative=self.alt).count(), 2)
