import json
import os
import time
from dataclasses import dataclass, asdict
from typing import Dict, Any, List, Optional, Callable
from google import genai

@dataclass(frozen=True)
class PolicyProfile:
    density_mode: str       # CONCEPTUAL_COMPACTION | GRANULAR_PRECISION
    temporal_mode: str      # ATEMPORAL_PERMANENCE  | CHRONOLOGICAL_VELOCITY
    functional_intent: str  # LATERAL_ORIENTATION   | OPERATIONAL_COMMAND

@dataclass(frozen=True)
class GlobalBlueprint:
    paradigm_name: str
    core_utility: str
    density_target: str
    implementation_dna: str

@dataclass
class ValidationResult:
    is_valid: bool
    confidence_score: float
    drift_diagnosis: Optional[str] = None
    suggested_remedy: Optional[str] = None

class LLMClientInterface:
    """Interface wrapper for backend LLM execution layer."""
    def call(self, system_prompt: str, user_prompt: str) -> str:
        raise NotImplementedError("Integrate your active project client here.")

class GeminiClient(LLMClientInterface):
    def __init__(self):
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is missing.")
        self.client = genai.Client(api_key=api_key)
        self.model_name = "gemini-2.5-flash"

    def call(self, system_prompt: str, user_prompt: str) -> str:
        max_retries = 5
        base_delay = 2

        for attempt in range(max_retries):
            try:
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=user_prompt,
                    config=genai.types.GenerateContentConfig(
                        system_instruction=system_prompt,
                        temperature=0.2
                    )
                )
                return response.text
            except Exception as e:
                print(f"[Gemini API Error] Attempt {attempt + 1}/{max_retries} failed: {e}")
                if attempt == max_retries - 1:
                    raise e
                time.sleep(base_delay * (2 ** attempt))

class GlobalWebParadigmEngine:
    """
    Acts as a blueprint repository of world-class, open-web design paradigms.
    Injects industry-standard UI DNA into the agent via parametric research data,
    allowing the harness to enforce elite patterns on entirely greenfield builds.
    """
    def __init__(self):
        self._registry: Dict[str, List[GlobalBlueprint]] = {
            "SEMANTIC": [
                GlobalBlueprint(
                    paradigm_name="STRIPE_STYLE_MEGA_FLYOUT",
                    core_utility="Contextual navigation with fluid spatial continuity.",
                    density_target="CONCEPTUAL_COMPACTION",
                    implementation_dna=(
                        "Leverage standard semantic layout wrappers. Use clean, spacious container "
                        "groupings with highly descriptive link subtext to favor LATERAL_ORIENTATION. "
                        "Keep interactions exploratory; avoid placing raw data streams inside."
                    )
                ),
                GlobalBlueprint(
                    paradigm_name="APPLE_STYLE_BENTO_GRID",
                    core_utility="High-impact macro grouping of disparate value propositions.",
                    density_target="CONCEPTUAL_COMPACTION",
                    implementation_dna=(
                        "Utilize an uneven layout matrix grid. Each block must prioritize a singular macro icon, "
                        "a bold headline, and a short narrative sentence. Maintain absolute ATEMPORAL_PERMANENCE "
                        "by forbidding dynamic metrics, timers, or real-time counters."
                    )
                ),
                GlobalBlueprint(
                    paradigm_name="VERCEL_STYLE_SITEMAP_FOOTER",
                    core_utility="Expansive architectural discovery and compliance grounding.",
                    density_target="CONCEPTUAL_COMPACTION",
                    implementation_dna=(
                        "Render a multi-column text sitemap mapping the entire architectural surface area. "
                        "Emphasize strict typographical hierarchy, subtle interactive hover states, and "
                        "absolute grid alignments. Include immutable operational constants like copyright and legal links."
                    )
                )
            ],
            "SYNTACTIC": [
                GlobalBlueprint(
                    paradigm_name="LINEAR_STYLE_COMMAND_K_MATRIX",
                    core_utility="Blazing fast, high-density keyboard-driven operational execution.",
                    density_target="GRANULAR_PRECISION",
                    implementation_dna=(
                        "Render a ultra-high-density list interface optimized for rapid cognitive scanning. "
                        "Every element must feature clear state indicators, action badges, and localized shortcut layouts. "
                        "Expose clear mutation entry points to fulfill OPERATIONAL_COMMAND."
                    )
                ),
                GlobalBlueprint(
                    paradigm_name="VERCEL_STYLE_DEPLOYMENT_TELEMETRY",
                    core_utility="Real-time multi-dimensional infrastructure tracking and triage.",
                    density_target="GRANULAR_PRECISION",
                    implementation_dna=(
                        "Structure a dense columnar schema layout where records are treated as vectors. "
                        "Incorporate relative delta markers, metrics, or performance trajectories mapping velocity vectors "
                        "(e.g., performance variances over 30d, 90d, 365d) to rigidly enforce CHRONOLOGICAL_VELOCITY."
                    )
                )
            ]
        }

    def fetch_blueprints(self, mode: str) -> List[GlobalBlueprint]:
        return self._registry.get(mode, [])

class PolicyValidator:
    """
    Evaluates generated components against the abstract MECE PolicyProfile 
    and checks compliance against the authorized open-web paradigms.
    """
    def __init__(self, llm_client: LLMClientInterface):
        self.llm = llm_client

    def verify(self, generated_code: str, policy: PolicyProfile, blueprints: List[GlobalBlueprint]) -> ValidationResult:
        # Heuristic Guard 1: Verify Temporal Horizon boundaries
        if policy.temporal_mode == "CHRONOLOGICAL_VELOCITY":
            temporal_signals = ["delta", "trend", "history", "forecast", "horizon", "trajectory", "30d", "90d"]
            if not any(signal in generated_code.lower() for signal in temporal_signals):
                return ValidationResult(
                    is_valid=False,
                    confidence_score=1.0,
                    drift_diagnosis="TEMPORAL OMISSION: The active profile requires CHRONOLOGICAL_VELOCITY, but the output renders a static snapshot with no delta trackers.",
                    suggested_remedy="Refactor the data structure or UI layer to ingest baseline trajectories and relative time-horizon deltas."
                )

        # Heuristic Guard 2: Verify Functional Control layout
        if policy.functional_intent == "OPERATIONAL_COMMAND":
            control_signals = ["toggle", "action", "handler", "onchange", "onclick", "button", "update", "mutate", "form", "submit", "input"]
            if not any(signal in generated_code.lower() for signal in control_signals):
                return ValidationResult(
                    is_valid=False,
                    confidence_score=1.0,
                    drift_diagnosis="FUNCTIONAL DRIFT: The active profile requires OPERATIONAL_COMMAND, but the output contains zero transactional mutations.",
                    suggested_remedy="Flatten deep display paths and expose actionable parameters as immediately accessible primary-level controls."
                )

        # Deep Semantic Inspection via LLM Critic
        return self._run_semantic_critique(generated_code, policy, blueprints)

    def _run_semantic_critique(self, generated_code: str, policy: PolicyProfile, blueprints: List[GlobalBlueprint]) -> ValidationResult:
        system_prompt = (
            "You are an automated structural validator for an engineering harness.\n"
            "Analyze the provided greenfield code artifact against the designated operational policies and global blueprints. "
            "Ensure it reconstructs the core behavioral intent of the assigned web paradigm without straying into prohibited design patterns.\n"
            "Output your analysis strictly in valid JSON with keys: 'is_valid', 'diagnosis', 'remedy'."
        )
        
        serialized_blueprints = [asdict(b) for b in blueprints]
        user_prompt = f"""
        TARGET POLICY CONFIGURATION:
        - Information Density: {policy.density_mode}
        - Temporal Horizon: {policy.temporal_mode}
        - Functional Intent: {policy.functional_intent}

        AUTHORIZED RECONSTRUCTION BLUEPRINTS (FROM OPEN-WEB PARADIGMS):
        {json.dumps(serialized_blueprints, indent=2)}

        CODE ARTIFACT TO EVALUATE:
        ```
        {generated_code}
        ```

        CRITERIA DEFINITIONS:
        - CONCEPTUAL_COMPACTION: Low alphanumeric saturation. Narrative-oriented. Relational proximity over explicit raw fields.
        - GRANULAR_PRECISION: High data throughput. Multi-columnar schemas, filtering matrices, clear value densities.
        - ATEMPORAL_PERMANENCE: Timeless structural constants. Exclude time-series progressions.
        - CHRONOLOGICAL_VELOCITY: Ensure some element of time, velocity, trend, or deltas exist.
        - LATERAL_ORIENTATION: Exploratory navigation pathways, nested summaries, relational progressive discovery.
        - OPERATIONAL_COMMAND: Explicit transactional inputs, action buttons, dynamic toggles.

        Examine if the code drifts from these parameters or violates the core structural intent of the global web blueprint.
        """
        
        try:
            response_text = self.llm.call(system_prompt, user_prompt)
            clean_json = response_text.replace("```json", "").replace("```", "").strip()
            data = json.loads(clean_json)
            return ValidationResult(
                is_valid=data.get("is_valid", True),
                confidence_score=0.9,
                drift_diagnosis=data.get("diagnosis"),
                suggested_remedy=data.get("remedy")
            )
        except Exception as e:
            print(f"[Validator Error] Semantic critique failed: {str(e)}")
            return ValidationResult(
                is_valid=False, 
                confidence_score=0.0,
                drift_diagnosis="Validator pipeline encountered an internal parsing or connectivity error.",
                suggested_remedy="Escalate to human review to evaluate global web pattern alignment manually."
            )

class ClosedLoopAgentHarness:
    """
    Main execution wrapper that routes development prompts through policy vectors,
    manages automated healing retries using global blueprints, and handles interactive chat escalation.
    """
    def __init__(self, llm_client: LLMClientInterface, validator: PolicyValidator, engine: GlobalWebParadigmEngine):
        self.llm = llm_client
        self.validator = validator
        self.engine = engine

    def execute_harness_loop(self, feature_prompt: str, app_context: dict, max_healing_attempts: int = 3) -> dict:
        # Step 1: Parse environmental state to resolve the abstract policy mapping
        interpretation_mode = self._determine_interpretation_mode(app_context)
        policy = self._resolve_policy_profile(interpretation_mode)
        
        # Step 2: Fetch global web design primitives from the engine
        blueprints = self.engine.fetch_blueprints(interpretation_mode)
        system_directives = self._build_system_directives(policy, blueprints)
        
        feedback_history: List[Dict[str, str]] = []

        # Step 3: Automated Self-Healing Generation Loop
        for attempt in range(1, max_healing_attempts + 1):
            print(f"--- Harness Attempt {attempt}/{max_healing_attempts} ---")
            current_user_prompt = feature_prompt
            if feedback_history:
                latest_feedback = feedback_history[-1]
                current_user_prompt += (
                    f"\n\n⚠️ GLOBAL PARADIGM DEVIATION MANDATE (ATTEMPT {attempt}):\n"
                    f"Your generated greenfield code drifted from the authorized open-web pattern.\n"
                    f"DIAGNOSIS: {latest_feedback['diagnosis']}\n"
                    f"REQUIRED REFACTORING: {latest_feedback['remedy']}\n"
                    f"Re-analyze the architectural layout parameters and rebuild the component to reconcile this variance."
                )

            generated_artifact = self.llm.call(system_directives, current_user_prompt)
            
            # Extract just the code block if wrapped in markdown
            if "```" in generated_artifact:
                parts = generated_artifact.split("```")
                for p in parts[1:]:
                    if p.strip().startswith("tsx") or p.strip().startswith("typescript") or p.strip().startswith("javascript") or p.strip().startswith("html"):
                        if "\n" in p:
                            generated_artifact = p.split("\n", 1)[1]
                        else:
                            generated_artifact = p.replace("tsx", "", 1).replace("typescript", "", 1)
                        break
                    elif p.strip():
                        generated_artifact = p
                        break

            validation = self.validator.verify(generated_artifact, policy, blueprints)
            
            if validation.is_valid:
                print("Validation: PASSED")
                return {
                    "status": "STABLE",
                    "mode_executed": asdict(policy),
                    "artifact": generated_artifact.strip(),
                    "healing_cycles": attempt - 1
                }
            
            print(f"Validation: FAILED - {validation.drift_diagnosis}")
            drift_entry = {
                "attempt": str(attempt),
                "diagnosis": validation.drift_diagnosis or "Unknown global template breach.",
                "remedy": validation.suggested_remedy or "Align code structure with authorized global blueprint parameters."
            }
            feedback_history.append(drift_entry)

        return self._escalate_to_chat_modality(policy, generated_artifact, feedback_history)

    def _determine_interpretation_mode(self, context: dict) -> str:
        auth_state = context.get("auth_state", "UNAUTHENTICATED")
        current_view = context.get("current_view", "MARKETING_PAGE")
        if auth_state == "UNAUTHENTICATED" or current_view == "MARKETING_PAGE":
            return "SEMANTIC"
        return "SYNTACTIC"

    def _resolve_policy_profile(self, mode: str) -> PolicyProfile:
        if mode == "SEMANTIC":
            return PolicyProfile(
                density_mode="CONCEPTUAL_COMPACTION",
                temporal_mode="ATEMPORAL_PERMANENCE",
                functional_intent="LATERAL_ORIENTATION"
            )
        else:
            return PolicyProfile(
                density_mode="GRANULAR_PRECISION",
                temporal_mode="CHRONOLOGICAL_VELOCITY",
                functional_intent="OPERATIONAL_COMMAND"
            )

    def _build_system_directives(self, policy: PolicyProfile, blueprints: List[GlobalBlueprint]) -> str:
        serialized_blueprints = [asdict(b) for b in blueprints]
        return f"""
        You are a highly contextual generation engine operating inside a strict structural harness.
        You are building a greenfield codebase from the ground up. You must use native structural layouts, clean logic, and modern styling utilities.
        
        Your output code must rigidly conform to the following architectural policy configuration:

        - INFORMATION DENSITY: [{policy.density_mode}]
          * CONCEPTUAL_COMPACTION: Condense data schemas into clear narrative definitions. Focus on system visibility without alphanumeric clutter.
          * GRANULAR_PRECISION: Structure code to maximize informational density. Surface clear metrics, fields, and tables for deep operational tracking.

        - TEMPORAL HORIZON: [{policy.temporal_mode}]
          * ATEMPORAL_PERMANENCE: Render structures as timeless, permanent invariants. Omit time-series delta streams, tracking code, or chronological changes.
          * CHRONOLOGICAL_VELOCITY: Render data models as dynamic trajectories. Expose historical baseline variations, trend properties, or predictive analytics.

        - FUNCTIONAL INTENT: [{policy.functional_intent}]
          * LATERAL_ORIENTATION: Prioritize read-only relational exploration, deep-linking, configuration discoverability, and contextual summaries.
          * OPERATIONAL_COMMAND: Expose high-fidelity, immediate manipulation controls, transactional status indicators, state handlers, and optimization actions.

        AUTHORIZED GLOBAL OPEN-WEB BLUEPRINTS:
        You are explicitly instructed to study, adapt, and copy the structural, functional, and behavioral DNA of these industry-wide web paradigms:
        {json.dumps(serialized_blueprints, indent=2)}

        Never generate code patterns that step across these designated boundary states or break the utility intentions of the authorized paradigms.
        
        CRITICAL: 
        - Apply elite CSS styling to explicitly mimic the authorized paradigms.
        - The resulting code MUST compile in Next.js Server Components unless specifically instructed otherwise.
        - Return ONLY the updated code block, without any markdown formatting wrappers or conversational text outside of the block.
        """

    def _escalate_to_chat_modality(self, policy: PolicyProfile, artifact: str, history: List[dict]) -> dict:
        escalation_block = f"""
================================================================================
🚨 AGENT HARNESS ESCALATION: GLOBAL POLICY ALIGNMENT BREACH
================================================================================
The automated self-healing pipeline has exhausted its retry budget. The generation 
agent is trapped in an architectural loop, consistently drifting from compliance.

TARGET POLICY INJECTION PROFILE:
- Information Density : {policy.density_mode}
- Temporal Horizon    : {policy.temporal_mode}
- Functional Intent   : {policy.functional_intent}

DRIFT ENFORCEMENT SUMMARY LOG:{json.dumps(history, indent=2)}

NARROW RESOLUTION QUESTION FOR THE CHAT THREAD:
The agent cannot satisfy the requirement for `{policy.temporal_mode}` and `{policy.functional_intent}` 
using the authorized global open-web paradigms without altering the core functional scope requested in your prompt.

Please reply in the chat thread with one of the following directives:
1. "Override policy: Force downshift to SEMANTIC variants (COMPACTION / ATEMPORAL)."
2. "Adjust intent: Provide specific layout constraints to manually seed the generator."
3. Provide direct clarification on how your data schema wraps historical trend metrics.
================================================================================
"""
        print(escalation_block)
        
        return {
            "status": "ESCALATED_TO_CHAT",
            "active_policy": asdict(policy),
            "last_unstable_artifact": artifact,
            "escalation_message": "Execution halted. Awaiting narrow structural directive inside the chat thread."
        }
