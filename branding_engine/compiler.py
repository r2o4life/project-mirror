import json
import re
from typing import Dict, Any, Tuple, List

class CSSBrandingCompiler:
    """
    An advanced, framework-agnostic branding compiler featuring self-healing layout
    loops, fuzzy semantic matching, and a system environment contextualization layer.
    """
    
    def __init__(self):
        # Standard design archetype configurations mapping semantic concepts to CSS blueprints
        self.archetype_matrix = {
            "commercial landscaping": {
                "base_primary": "#E58C7A",    # Accent Flora (Flamingo Coral)
                "base_secondary": "#2C4436",  # Deep Canopy Green
                "base_neutral": "#1E2522",    # Slate Charcoal
                "base_bg": "#F4F6F4",         # Stone Backing
                "weight": "700",              # Heavy structural weight
                "tracking_scale": 0.035,
                "min_tracking": 0.20,
                "curve_type": "organic-sharp",
                "layout_orientation": "row"
            },
            "tech cyber": {
                "base_primary": "#00f0ff",    # Neon Cyan
                "base_secondary": "#7000ff",  # Deep Cyber Violet
                "base_neutral": "#0c0c0e",    # Obsidian
                "base_bg": "transparent",     # Carbon Dark (Transparent for nav integration)
                "weight": "900",              # Thick structural scale
                "tracking_scale": 0.04,
                "min_tracking": 0.30,
                "curve_type": "geometric-grid",
                "layout_orientation": "row"
            },
            "default": {
                "base_primary": "#3b82f6",    # Blue
                "base_secondary": "#10b981",  # Green
                "base_neutral": "#1f2937",    # Slate Gray
                "base_bg": "#ffffff",         # Pure White
                "weight": "600",
                "tracking_scale": 0.02,
                "min_tracking": 0.12,
                "curve_type": "standard-symmetric",
                "layout_orientation": "column"
            }
        }
        
    # =========================================================================
    # DETECT & HEAL LOOP 1: FUZZY SEMANTIC RESOLVER
    # =========================================================================
    
    def _calculate_string_similarity(self, s1: str, s2: str) -> float:
        """Calculates a quick similarity ratio to fuzzy-match input concepts."""
        if not s1 or not s2:
            return 0.0
        s1, s2 = s1.lower().strip(), s2.lower().strip()
        if s1 == s2:
            return 1.0
        
        # Simple Levenshtein distance fallback
        rows = len(s1) + 1
        cols = len(s2) + 1
        dist = [[0 for _ in range(cols)] for _ in range(rows)]
        
        for i in range(1, rows):
            dist[i][0] = i
        for j in range(1, cols):
            dist[0][j] = j
            
        for col in range(1, cols):
            for row in range(1, rows):
                cost = 0 if s1[row - 1] == s2[col - 1] else 1
                dist[row][col] = min(
                    dist[row - 1][col] + 1,       # deletion
                    dist[row][col - 1] + 1,       # insertion
                    dist[row - 1][col - 1] + cost # substitution
                )
        
        max_len = max(len(s1), len(s2))
        return (max_len - dist[-1][-1]) / max_len

    def _resolve_archetype(self, raw_concept: str) -> Tuple[Dict[str, Any], str, List[str]]:
        """
        SELF-HEALING LOOP: Maps unrecognized concepts back to the closest MECE archetype
        via a fuzzy string parsing threshold.
        """
        logs = []
        normalized = raw_concept.lower().strip()
        
        # Exact match check
        if normalized in self.archetype_matrix:
            return self.archetype_matrix[normalized], normalized, logs
            
        # Run similarity check against the matrix
        best_match = "default"
        highest_score = 0.0
        
        for archetype_key in self.archetype_matrix.keys():
            if archetype_key == "default":
                continue
            score = self._calculate_string_similarity(normalized, archetype_key)
            if score > highest_score:
                highest_score = score
                best_match = archetype_key
                
        # If the highest similarity exceeds 40%, we auto-heal the mismatch
        if highest_score >= 0.40:
            logs.append(
                f"[Fuzzy Match Healing] Unrecognized concept '{raw_concept}' mapped "
                f"to closest match '{best_match}' with a confidence score of {highest_score:.2f}."
            )
            return self.archetype_matrix[best_match], best_match, logs
            
        logs.append(
            f"[Fuzzy Match Healing] Low match confidence ({highest_score:.2f}) for '{raw_concept}'. "
            "Falling back to 'default' design properties safely."
        )
        return self.archetype_matrix["default"], "default", logs

    # =========================================================================
    # CORE DETERMINISTIC SEED LAYER
    # =========================================================================

    def _generate_deterministic_hash(self, input_string: str) -> int:
        """Generates a highly robust, session-independent FNV-1a 32-bit hash."""
        h = 2166136261
        for char in input_string:
            h ^= ord(char)
            h = (h * 16777619) & 0xffffffff
        return h

    # =========================================================================
    # DETECT & HEAL LOOP 2: CONTRAST OPTIMIZATION (WCAG AA/AAA compliance)
    # =========================================================================

    def _hex_to_rgb(self, hex_color: str) -> Tuple[int, int, int]:
        """Safely parses hexadecimal strings into standard RGB integers."""
        clean_hex = hex_color.lstrip("#")
        if clean_hex == "transparent":
            return 255, 255, 255 # Assume light background for transparent
        if len(clean_hex) == 3:
            clean_hex = "".join([c * 2 for c in clean_hex])
        try:
            return int(clean_hex[0:2], 16), int(clean_hex[2:4], 16), int(clean_hex[4:6], 16)
        except ValueError:
            return 255, 255, 255 # Safe white fallback if parsing fails

    def _rgb_to_hex(self, rgb: Tuple[int, int, int]) -> str:
        """Converts RGB color coordinate channels back to CSS Hex formatting."""
        return f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"

    def _get_relative_luminance(self, rgb: Tuple[int, int, int]) -> float:
        """Calculates normalized relative luminance of an RGB coordinate set."""
        normalized = []
        for val in rgb:
            s_color = val / 255.0
            if s_color <= 0.03928:
                normalized.append(s_color / 12.92)
            else:
                normalized.append(((s_color + 0.055) / 1.055) ** 2.4)
        return 0.2126 * normalized[0] + 0.7152 * normalized[1] + 0.0722 * normalized[2]

    def _get_contrast_ratio(self, hex1: str, hex2: str) -> float:
        """Determines contrast ratio between two hex values (1.0 to 21.0 range)."""
        rgb1 = self._hex_to_rgb(hex1)
        rgb2 = self._hex_to_rgb(hex2)
        
        lum1 = self._get_relative_luminance(rgb1)
        lum2 = self._get_relative_luminance(rgb2)
        
        lighter = max(lum1, lum2)
        darker = min(lum1, lum2)
        return (lighter + 0.05) / (darker + 0.05)

    def _adjust_color_luminance(self, hex_color: str, percent: float) -> str:
        """Adjusts hex color brightness programmatically by a scaling factor."""
        if hex_color == "transparent":
            return hex_color
        rgb = self._hex_to_rgb(hex_color)
        new_rgb = tuple(
            max(0, min(255, int(channel * (1 + percent))))
            for channel in rgb
        )
        return self._rgb_to_hex(new_rgb)

    def _heal_color_contrast(self, foreground_hex: str, background_hex: str, color_role: str, target_ratio: float = 4.5) -> Tuple[str, List[str]]:
        """
        SELF-HEALING LOOP: Iteratively scales foreground brightness (up or down)
        to meet target WCAG contrast guidelines against the configured background.
        """
        logs = []
        if background_hex == "transparent":
            background_hex = "#0d1117" # The site's dark mode background

        current_foreground = foreground_hex
        initial_ratio = self._get_contrast_ratio(current_foreground, background_hex)
        
        if initial_ratio >= target_ratio:
            return current_foreground, logs

        # Check background brightness context
        bg_rgb = self._hex_to_rgb(background_hex)
        bg_luminance = self._get_relative_luminance(bg_rgb)
        
        # If light background, we shift darker. If dark background, we shift lighter.
        shift_multiplier = -0.05 if bg_luminance > 0.5 else 0.05
        iterations = 0
        max_iterations = 30
        
        while iterations < max_iterations:
            current_foreground = self._adjust_color_luminance(current_foreground, shift_multiplier)
            new_ratio = self._get_contrast_ratio(current_foreground, background_hex)
            
            # Prevent endless loop bounds by exiting once threshold is passed
            if new_ratio >= target_ratio:
                logs.append(
                    f"[Contrast Healing] Low contrast ({initial_ratio:.2f}:1) detected on '{color_role}'. "
                    f"Healed color to '{current_foreground}' to meet WCAG target ({new_ratio:.2f}:1)."
                )
                return current_foreground, logs
                
            iterations += 1
            
        logs.append(
            f"[Contrast Warning] Max color-shift iterations reached for '{color_role}'. "
            f"Healed value capped at '{current_foreground}' with ratio {self._get_contrast_ratio(current_foreground, background_hex):.2f}:1."
        )
        return current_foreground, logs

    # =========================================================================
    # DETECT & HEAL LOOP 3: TYPOGRAPHIC OVERFLOW CLAMPER
    # =========================================================================

    def _heal_typographic_dimensions(self, company_name: str, base_tracking: float) -> Tuple[str, str, List[str]]:
        """
        SELF-HEALING LOOP: Programmatically scales down text size and limits
        letter-spacing budgets for long string sequences to prevent visual layout breaking.
        """
        logs = []
        char_count = len(company_name)
        
        # Design threshold constraints
        limit_char_length = 10
        base_font_size_rem = 2.0
        
        if char_count <= limit_char_length:
            return f"{base_font_size_rem:.2f}rem", f"{base_tracking:.3f}em", logs
            
        # Calculate dynamic text scaling factor
        overflow_chars = char_count - limit_char_length
        healed_font_size = max(1.1, base_font_size_rem - (overflow_chars * 0.08))
        healed_tracking = max(0.04, base_tracking - (overflow_chars * 0.015))
        
        logs.append(
            f"[Typographic Healing] Name string of {char_count} characters exceeds standard threshold ({limit_char_length}). "
            f"Healed font size from {base_font_size_rem:.1f}rem to {healed_font_size:.2f}rem, and adjusted "
            f"letter-spacing down to {healed_tracking:.3f}em to protect container integrity."
        )
        
        return f"{healed_font_size:.2f}rem", f"{healed_tracking:.3f}em", logs

    # =========================================================================
    # CONTEXTUALIZATION LAYER (Open Environmental Analysis)
    # =========================================================================

    def evaluate_environment(self) -> Dict[str, Any]:
        """
        Runs an open analysis and assessment of the system container and interactive tool
        this compiler occupies. Maps system dynamics to geometric concepts.
        """
        # Define characteristics of this system layout structure
        topology_report = {
            "interface_type": "Split-Pane Interactive Workspace",
            "communication_model": "Conversational Handoff & Prompt Pipeline",
            "execution_context": "Real-time Live HTML/CSS Browser Rendering",
            "fluid_constraints": "Container-queried sandboxes with streaming chunk status indicators"
        }
        
        # Translate assessed dynamics into visual-semantic variables
        derived_brand_concept = "collaborative preview engine"
        suggested_brand_name = "LuminaSync"  # AI/Human code synchronization
        
        return {
            "report": topology_report,
            "concept": derived_brand_concept,
            "default_name": suggested_brand_name
        }

    def compile_contextualized_brand(self, company_name: str = None) -> Dict[str, Any]:
        """
        Analyzes the workspace environment, registers a customized premium archetype
        if it does not already exist, resolves the branding name, and compiles the elements.
        """
        # Execute environmental evaluation
        env = self.evaluate_environment()
        target_concept = env["concept"]
        
        # Determine brand name hierarchy
        resolved_name = company_name if company_name else env["default_name"]
        
        # LEVERAGE EXISTING OR CREATE NEW: Check if archetype already registered, otherwise inject
        if target_concept not in self.archetype_matrix:
            # Generate design characteristics mapping to our interactive split-screen system
            self.archetype_matrix[target_concept] = {
                "base_primary": "#7000ff",    # Neural AI Violet (Reasoning engine)
                "base_secondary": "#00f0ff",  # Live Editor Cyan (Active preview)
                "base_neutral": "#1e293b",    # Slate Carbon (UI Panel backdrop)
                "base_bg": "#f8fafc",         # Clean Paper/Canvas Surface
                "weight": "800",              # Structured grid typography
                "tracking_scale": 0.03,
                "min_tracking": 0.18,
                "curve_type": "organic-sharp",
                "layout_orientation": "row"
            }
            context_log = f"[Contextualizer] Archetype '{target_concept}' not found. Created and registered fresh branding variables."
        else:
            context_log = f"[Contextualizer] Archetype '{target_concept}' exists. Leveraging existing design values."
            
        # Compile using healed pipelines
        package = self.compile(resolved_name, target_concept)
        package["compilation_audit_log"].insert(0, context_log)
        package["environment_evaluation"] = env["report"]
        
        return package

    # =========================================================================
    # COMPILATION CORE PIPELINE
    # =========================================================================

    def compile(self, company_name: str, concept_work: str) -> Dict[str, Any]:
        """
        Ingests unstructured brand strings, executes self-healing logic loops,
        and compiles fully-rendered HTML/CSS assets with debugging audit reports.
        """
        # Ensure company name string is safe and clean
        cleaned_name = re.sub(r'<[^>]*>', '', company_name).strip() or "Brand"
        cleaned_concept = re.sub(r'<[^>]*>', '', concept_work).strip() or "General Services"
        
        # Execute Self-Healing Loop 1: Semantic Archetype Mapping
        archetype, archetype_key, resolver_logs = self._resolve_archetype(cleaned_concept)
        compilation_audit_log = list(resolver_logs)
        
        # Retrieve computed spatial metric properties via FNV-1a Hash
        seed = self._generate_deterministic_hash(cleaned_name)
        tilt_degrees = (seed % 30) - 15
        
        # Setup base curves
        if archetype["curve_type"] == "organic-sharp":
            r1 = 60 + (seed % 25)
            r2 = 15 + (seed % 20)
            r3 = 55 + (seed % 20)
            r4 = 25 + (seed % 15)
            computed_curve = f"{r1}% {r2}% {r3}% 30% / {60}% {r4}% {60}% {r4}%"
        else:
            computed_curve = "12px"
            
        # Execute Self-Healing Loop 2: Contrast Compliance Healer
        healed_primary, primary_contrast_logs = self._heal_color_contrast(
            foreground_hex=archetype["base_primary"],
            background_hex=archetype["base_bg"],
            color_role="Primary Brand Accent",
            target_ratio=3.0  # Large graphical target threshold
        )
        compilation_audit_log.extend(primary_contrast_logs)
        
        healed_secondary, secondary_contrast_logs = self._heal_color_contrast(
            foreground_hex=archetype["base_secondary"],
            background_hex=archetype["base_bg"],
            color_role="Secondary Base Color",
            target_ratio=4.5  # Standard structural/content threshold
        )
        compilation_audit_log.extend(secondary_contrast_logs)
        
        healed_neutral, neutral_contrast_logs = self._heal_color_contrast(
            foreground_hex=archetype["base_neutral"],
            background_hex=archetype["base_bg"],
            color_role="Typographic Neutral",
            target_ratio=4.5  # High-readability target threshold
        )
        compilation_audit_log.extend(neutral_contrast_logs)
        
        # Execute Self-Healing Loop 3: Typography Overflow Clamper
        base_tracking = archetype["min_tracking"] + (len(cleaned_name) * archetype["tracking_scale"])
        font_size_val, tracking_val, typo_logs = self._heal_typographic_dimensions(cleaned_name, base_tracking)
        compilation_audit_log.extend(typo_logs)
        
        # Assemble fully integrated, localized CSS rules using computed safe variables
        # INJECTED RESPONSIVE CLAMPS & VERTICAL MEDIA QUERY
        compiled_css = f"""
.brandEngineContainer {{
  --brand-primary: {healed_primary};
  --brand-secondary: {healed_secondary};
  --brand-neutral: {healed_neutral};
  --brand-bg: {archetype['base_bg']};

  --font-size-primary: clamp(0.9rem, 3.5vw, {font_size_val});
  --font-weight-primary: {archetype['weight']};
  --font-spacing-primary: clamp(0.1em, 1vw, {tracking_val});

  --organic-curve: {computed_curve};
  --structural-tilt: {tilt_degrees}deg;
}}

.brandEngineContainer {{
  display: flex;
  flex-direction: {archetype['layout_orientation']};
  align-items: center;
  gap: clamp(0.5rem, 2vw, 1.2rem);
  padding: 0;
  background-color: var(--brand-bg);
  border-radius: 12px;
  font-family: system-ui, -apple-system, sans-serif;
  box-sizing: border-box;
}}

.brandIconArtifact {{
  width: clamp(24px, 6vw, 45px);
  height: clamp(24px, 6vw, 45px);
  background-color: var(--brand-primary);
  border-radius: clamp(6px, 1.5vw, 10px);
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}}

.brandGeometricShard {{
  width: 72%;
  height: 72%;
  background-color: var(--brand-secondary);
  border-radius: var(--organic-curve);
  transform: rotate(var(--structural-tilt));
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
}}

.brandTextBlock {{
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}}

.brandWordmark {{
  font-size: var(--font-size-primary);
  margin: 0;
  font-weight: var(--font-weight-primary);
  letter-spacing: var(--font-spacing-primary);
  text-transform: uppercase;
  color: #ffffff;
  background: linear-gradient(to right, var(--brand-primary) 10%, var(--brand-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  white-space: nowrap;
}}

.brandTagline {{
  font-size: clamp(0.45rem, 1.5vw, 0.6rem);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: clamp(0.1em, 0.5vw, 0.2em);
  font-weight: 600;
  color: var(--brand-primary);
  opacity: 0.9;
  white-space: nowrap;
}}

@media (max-width: 768px) {{
  .brandEngineContainer {{
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }}
  .brandTextBlock {{
    align-items: center;
    text-align: center;
  }}
}}
""".strip()

        # Compile standard, non-leak HTML element hierarchy
        compiled_html = f"""
<div class="brandEngineContainer">
  <div class="brandIconArtifact" aria-hidden="true">
    <div class="brandGeometricShard"></div>
  </div>
  <div class="brandTextBlock">
    <h1 class="brandWordmark">{cleaned_name}</h1>
    <p class="brandTagline">OPEN ECOSYSTEM</p>
  </div>
</div>
""".strip()

        return {
            "html": compiled_html,
            "css": compiled_css,
            "healed_tokens": {
                "original_input": {
                    "company_name": company_name,
                    "concept_work": concept_work
                },
                "processed_archetype_key": archetype_key,
                "adjusted_primary": healed_primary,
                "adjusted_secondary": healed_secondary,
                "adjusted_neutral": healed_neutral,
                "font_size_applied": font_size_val,
                "letter_spacing_applied": tracking_val,
                "structural_tilt_angle": f"{tilt_degrees}deg",
                "resolved_organic_curve": computed_curve
            },
            "compilation_audit_log": compilation_audit_log
        }

if __name__ == "__main__":
    compiler = CSSBrandingCompiler()
    
    pkg = compiler.compile("Project Mirror", "tech cyber")
    
    with open("brand_styles.css", "w") as css_file:
        css_file.write(pkg["css"])
        
    print("Compiled branding assets successfully.")
