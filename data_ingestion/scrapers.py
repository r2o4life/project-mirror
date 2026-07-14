import os
import json
import logging
from playwright.async_api import async_playwright
from google import genai
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

class Feature(BaseModel):
    feature_name: str
    description: str

class FeatureExtractionSchema(BaseModel):
    features: list[Feature]

async def scrape_and_extract_features(url: str) -> list[dict]:
    """
    Fetches the rendered HTML of a website using Playwright,
    and extracts structured JSON using the Google Gemini API.
    """
    logger.info(f"Starting async extraction for {url}")
    
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        logger.warning("GEMINI_API_KEY not found. LLM Extraction will fail.")
        return []

    # 1. Scrape with Playwright
    page_text = ""
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            # Navigate and wait for network to be idle to ensure JS renders
            await page.goto(url, wait_until="networkidle")
            
            # Extract all visible text from the body
            page_text = await page.evaluate("document.body.innerText")
            await browser.close()
    except Exception as e:
        logger.error(f"Error scraping {url} with Playwright: {e}")
        return []
        
    if not page_text:
        logger.error(f"No text could be extracted from {url}")
        return []
        
    # Limit text length to prevent blowing up the context window
    page_text = page_text[:20000]

    # 2. Extract with Gemini Structured Outputs
    try:
        # Note: The google-genai library supports synchronous calls primarily for simple extraction,
        # but we are in an async function. We can use the async client.
        client = genai.Client(api_key=api_key)
        
        prompt = f"You are a product analyst. Extract all the core features, capabilities, and pricing tier details of this product from the following text:\n\n{page_text}"
        
        response = await client.aio.models.generate_content(
            model='gemini-flash-latest',
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=FeatureExtractionSchema,
                temperature=0.1
            )
        )
        
        extracted_content = response.text
        extracted_data = json.loads(extracted_content)
        return extracted_data.get("features", [])
            
    except Exception as e:
        logger.error(f"Error during Gemini extraction: {e}")
        return []
