import os
from agent_harness import LLMClientInterface, GeminiClient, PolicyValidator, ClosedLoopAgentHarness, PolicyProfile, GlobalWebParadigmEngine

def main():
    llm = GeminiClient()
    validator = PolicyValidator(llm)
    engine = GlobalWebParadigmEngine()
    harness = ClosedLoopAgentHarness(llm, validator, engine)

    # Define the pages and their context rules
    # According to the harness _resolve_policy_profile:
    # UNAUTHENTICATED / MARKETING_PAGE -> CONCEPTUAL_COMPACTION | ATEMPORAL_PERMANENCE | LATERAL_ORIENTATION
    # AUTHENTICATED / APP_DASHBOARD -> GRANULAR_PRECISION | CHRONOLOGICAL_VELOCITY | OPERATIONAL_COMMAND

    pages_to_translate = [
        {
            "filepath": "frontend/src/app/benchmarks/page.tsx",
            "context": {"auth_state": "UNAUTHENTICATED", "current_view": "MARKETING_PAGE", "is_wizard_flow": False}
        },
        {
            "filepath": "frontend/src/app/matchmaking/page.tsx",
            "context": {"auth_state": "UNAUTHENTICATED", "current_view": "MARKETING_PAGE", "is_wizard_flow": False}
        },
        {
            "filepath": "frontend/src/app/spawn/page.tsx",
            "context": {"auth_state": "AUTHENTICATED", "current_view": "APP_DASHBOARD", "is_wizard_flow": True}
        },
        {
            "filepath": "frontend/src/app/dashboard/page.tsx",
            "context": {"auth_state": "AUTHENTICATED", "current_view": "APP_DASHBOARD", "is_wizard_flow": False}
        }
    ]

    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    for page in pages_to_translate:
        abs_path = os.path.join(base_dir, page["filepath"])
        if not os.path.exists(abs_path):
            print(f"Skipping {abs_path} - file not found.")
            continue

        print(f"===========================================================")
        print(f"Translating {page['filepath']}")
        print(f"Context: {page['context']}")
        
        with open(abs_path, 'r') as f:
            original_code = f.read()

        feature_prompt = f"""
        Please refactor the following Next.js React component according to the active structural policy constraints.
        Do NOT change the underlying API endpoints, imports, or React hooks if they are required to fetch the data.
        ONLY change the structure, UI layout, density, and interactive elements to strictly align with the policy.
        
        Original Code:
        ```tsx
        {original_code}
        ```
        """

        result = harness.execute_harness_loop(feature_prompt, page["context"])

        if result.get("status") == "STABLE":
            print(f"✅ Validation PASSED after {result['healing_cycles']} healing cycles.")
            new_code = result["artifact"]
            with open(abs_path, 'w') as f:
                f.write(new_code)
            print(f"Updated {page['filepath']}")
        else:
            print(f"❌ Validation FAILED. Escalated to chat.")
            print(result.get("escalation_message"))

if __name__ == "__main__":
    main()
