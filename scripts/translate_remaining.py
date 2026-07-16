import os
from pathlib import Path
from agent_harness import LLMClientInterface, GeminiClient, PolicyValidator, ClosedLoopAgentHarness, PolicyProfile, GlobalWebParadigmEngine

def get_context_for_path(filepath: str) -> dict:
    if "dashboard" in filepath:
        return {
            "auth_state": "AUTHENTICATED", 
            "current_view": "APP_DASHBOARD", 
            "is_wizard_flow": False, 
            "is_complex_artifact": True
        }
    elif "spawn" in filepath:
        return {
            "auth_state": "AUTHENTICATED", 
            "current_view": "APP_DASHBOARD", 
            "is_wizard_flow": True, 
            "is_complex_artifact": True
        }
    else:
        return {
            "auth_state": "UNAUTHENTICATED", 
            "current_view": "MARKETING_PAGE", 
            "is_wizard_flow": False,
            "is_complex_artifact": False
        }

def main():
    llm = GeminiClient()
    validator = PolicyValidator(llm)
    engine = GlobalWebParadigmEngine()
    harness = ClosedLoopAgentHarness(llm, validator, engine)

    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Remaining files
    remaining_files = [
        "frontend/src/app/community/twitter/page.tsx",
        "frontend/src/app/community/discord/page.tsx",
        "frontend/src/app/community/blog/page.tsx",
        "frontend/src/app/community/github/page.tsx",
        "frontend/src/app/page.tsx",
        "frontend/src/app/spawn/page.tsx",
        "frontend/src/app/login/page.tsx"
    ]
    
    pages_to_translate = []
    for rel_path in remaining_files:
        context = get_context_for_path(rel_path)
        pages_to_translate.append({"filepath": rel_path, "context": context})

    print(f"Discovered {len(pages_to_translate)} remaining pages for translation.")

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

        if result.get("status") in ["STABLE", "STABLE_WITH_REPAIRS"]:
            print(f"✅ Validation PASSED after {result.get('healing_cycles', 0)} healing cycles.")
            new_code = result["artifact"]
            
            if new_code.startswith("```tsx"):
                new_code = new_code[6:]
            if new_code.endswith("```"):
                new_code = new_code[:-3]
            new_code = new_code.strip()
                
            with open(abs_path, 'w') as f:
                f.write(new_code)
            print(f"Updated {page['filepath']}")
        else:
            print(f"❌ Validation FAILED. Escalated to chat.")
            print(result.get("escalation_message"))

if __name__ == "__main__":
    main()
