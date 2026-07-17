import json
from typing import Dict, Any

class CSSBrandingCompiler:
    """
    A framework-agnostic, deterministic branding compiler that converts
    linguistic strings into custom-tailored HTML/CSS asset payloads.
    """
    def __init__(self):
        # The Mutually Exclusive, Collectively Exhaustive (MECE) Archetype Matrix
        self.archetype_matrix = {
            "commercial landscaping": {
                "base_primary": "#2C4436",    # Deep Canopy Green
                "base_secondary": "#E58C7A",  # Accent Flora/Coral
                "base_neutral": "#1E2522",    # Slate Charcoal
                "base_bg": "#F4F6F4",         # Stone Backing
                "weight": "700",              # Structural heavy weight
                "tracking_scale": 0.035,      # Tracking multiplier
                "min_tracking": 0.20,         # em base units
                "curve_type": "organic-sharp",
                "layout_orientation": "row"
            },
            "tech cyber": {
                "base_primary": "#00f0ff",    # Neon Cyan
                "base_secondary": "#7000ff",  # Deep Cyber Violet
                "base_neutral": "#0a0a0c",    # Deep Obsidian
                "base_bg": "transparent",     # Modified to be transparent so it integrates cleanly in the nav bar
                "weight": "900",              # Ultra block weight
                "tracking_scale": 0.04,
                "min_tracking": 0.30,
                "curve_type": "geometric-grid",
                "layout_orientation": "row"       # Modified to row to fit nicely in a nav bar
            },
            "default": {
                "base_primary": "#3b82f6",
                "base_secondary": "#10b981",
                "base_neutral": "#1f2937",
                "base_bg": "#ffffff",
                "weight": "600",
                "tracking_scale": 0.02,
                "min_tracking": 0.12,
                "curve_type": "standard-symmetric",
                "layout_orientation": "column"
            }
        }

    def _generate_deterministic_hash(self, input_string: str) -> int:
        """Implements a consistent 32-bit FNV-1a hash algorithm."""
        h = 2166136261
        for char in input_string:
            h ^= ord(char)
            h = (h * 16777619) & 0xffffffff
        return h

    def _calculate_layout_metrics(self, name: str, archetype: Dict[str, Any]) -> Dict[str, str]:
        """Calculates algorithmic spatial properties based on the generated seed."""
        seed = self._generate_deterministic_hash(name)
        
        # Enforce structural rotations bounded between -15deg and 15deg
        tilt_degrees = (seed % 30) - 15
        
        # Linear text tracking calculation based on overall character length
        calculated_tracking = archetype["min_tracking"] + (len(name) * archetype["tracking_scale"])
        dynamic_tracking = min(calculated_tracking, 0.45)

        # Build dynamic asymmetry layouts if the design rules specify organic curves
        if archetype["curve_type"] == "organic-sharp":
            r1 = 60 + (seed % 25)  # 60% to 85%
            r2 = 15 + (seed % 20)  # 15% to 35%
            r3 = 55 + (seed % 20)  # 55% to 75%
            r4 = 25 + (seed % 15)  # 25% to 40%
            computed_curve = f"{r1}% {r2}% {r3}% 30% / {60}% {r4}% {60}% {r4}%"
        else:
            computed_curve = "12px"

        return {
            "structural_tilt": f"{tilt_degrees}deg",
            "letter_spacing": f"{dynamic_tracking:.3f}em",
            "organic_curve": computed_curve
        }

    def compile(self, company_name: str, concept_work: str) -> Dict[str, Any]:
        """Runs compilation pipeline to construct isolated HTML, CSS, and token metrics."""
        normalized_concept = concept_work.lower().strip()
        archetype = self.archetype_matrix.get(normalized_concept, self.archetype_matrix["default"])
        metrics = self._calculate_layout_metrics(company_name, archetype)

        # Compile CSS Template Scope
        compiled_css = f"""
.brand-engine-container {{
  --brand-primary: {archetype['base_primary']};
  --brand-secondary: {archetype['base_secondary']};
  --brand-neutral: {archetype['base_neutral']};
  --brand-bg: {archetype['base_bg']};
  --font-weight-primary: {archetype['weight']};
  --font-spacing-primary: {metrics['letter_spacing']};
  --organic-curve: {metrics['organic_curve']};
  --structural-tilt: {metrics['structural_tilt']};
}}
.brand-engine-container {{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
  padding: 0;
  background-color: var(--brand-bg);
  border-radius: 12px;
  font-family: system-ui, -apple-system, sans-serif;
  box-sizing: border-box;
}}
.brand-icon-artifact {{
  width: 45px;
  height: 45px;
  background-color: var(--brand-primary);
  border-radius: 10px;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
}}
.brand-geometric-shard {{
  width: 72%;
  height: 72%;
  background-color: var(--brand-secondary);
  border-radius: var(--organic-curve);
  transform: rotate(var(--structural-tilt));
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
}}
.brand-text-block {{
  text-align: left;
}}
.brand-wordmark {{
  font-size: 1.5rem;
  margin: 0;
  font-weight: var(--font-weight-primary);
  letter-spacing: var(--font-spacing-primary);
  text-transform: uppercase;
  color: #ffffff;
  background: linear-gradient(to right, var(--brand-primary) 10%, var(--brand-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}}
.brand-tagline {{
  font-size: 0.6rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 600;
  color: var(--brand-primary);
  opacity: 0.9;
  white-space: nowrap;
}}
""".strip()

        # Compile Clean Document Object Elements
        compiled_html = f"""
<div class="brand-engine-container">
  <div class="brand-icon-artifact" aria-hidden="true">
    <div class="brand-geometric-shard"></div>
  </div>
  <div class="brand-text-block">
    <h1 class="brand-wordmark">{company_name}</h1>
    <p class="brand-tagline">{concept_work}</p>
  </div>
</div>
""".strip()

        return {
            "html": compiled_html,
            "css": compiled_css,
            "computed_tokens": {
                "identity_seed": company_name,
                "domain_context": concept_work,
                "spatial_metrics": metrics
            }
        }

if __name__ == "__main__":
    compiler = CSSBrandingCompiler()
    artifact_package = compiler.compile("Project Mirror", "tech cyber")

    with open("brand_component.html", "w") as html_file:
        html_file.write(artifact_package["html"])

    with open("brand_styles.css", "w") as css_file:
        css_file.write(artifact_package["css"])
        
    print("Compiled branding assets successfully.")
