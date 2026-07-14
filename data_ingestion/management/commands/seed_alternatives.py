import json
import logging
import urllib.request
import re
from django.core.management.base import BaseCommand
from django.db import transaction

from core.models import ProprietaryProduct, OpenSourceAlternative

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Scrapes opensourcealternative.to and bulk-inserts pairs into the database using remixContext.'

    def handle(self, *args, **options):
        url = "https://www.opensourcealternative.to/"
        self.stdout.write(self.style.SUCCESS(f"Starting seed process for {url}"))
        
        self.stdout.write("Fetching HTML...")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            html = urllib.request.urlopen(req).read().decode('utf-8')
        except Exception as e:
            self.stderr.write(f"Failed to fetch {url}: {e}")
            return

        self.stdout.write("Extracting JSON context...")
        
        matches = re.findall(r'window\.__remixContext = (.*?);</script>', html)
        if not matches:
            self.stderr.write("Could not find __remixContext in the page.")
            return
            
        data = json.loads(matches[0])
        
        try:
            alternatives_data = data.get('state', {}).get('loaderData', {}).get('routes/_index', {}).get('alternatives', [])
        except AttributeError:
            self.stderr.write("Could not parse the expected JSON structure.")
            return

        if not alternatives_data:
            self.stderr.write("No alternatives found in the JSON.")
            return

        generic_proprietary, _ = ProprietaryProduct.objects.get_or_create(
            name="Various Proprietary Products",
            defaults={"description": "Open source alternatives found via crawler without explicit proprietary mapping."}
        )

        created_count = 0
        self.stdout.write(f"Found {len(alternatives_data)} open source alternatives! Seeding database...")
        
        with transaction.atomic():
            for item in alternatives_data:
                name = item.get('name')
                repo = item.get('repository')
                desc = item.get('description', '')
                
                if not name or not repo:
                    continue
                    
                repo_url = f"https://github.com/{repo}"
                
                if not OpenSourceAlternative.objects.filter(repository_url=repo_url).exists():
                    OpenSourceAlternative.objects.create(
                        name=name,
                        repository_url=repo_url,
                        description=desc,
                        target_proprietary_product=generic_proprietary
                    )
                    created_count += 1

        self.stdout.write(self.style.SUCCESS(f"Successfully seeded {created_count} new open source alternatives into the database!"))
