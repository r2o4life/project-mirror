import os
from pathlib import Path
from dotenv import load_dotenv
load_dotenv(os.path.expanduser("~/.env"))
from agent_harness import LLMClientInterface, GeminiClient, PolicyValidator, ClosedLoopAgentHarness, PolicyProfile, GlobalWebParadigmEngine

def get_context_for_path(filepath: str) -> dict:
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
    abs_path = os.path.join(base_dir, "frontend", "src", "app", "page.tsx")
    rel_path = "frontend/src/app/page.tsx"
    
    context = get_context_for_path(rel_path)

    print(f"===========================================================")
    print(f"Translating {rel_path}")
    print(f"Context: {context}")
    
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

    result = harness.execute_harness_loop(feature_prompt, context)

    if result.get("status") in ["STABLE", "STABLE_WITH_REPAIRS"]:
        print(f"✅ Validation PASSED after {result.get('healing_cycles', 0)} healing cycles.")
        new_code = result["artifact"]
        
        # Clean up potential markdown formatting from LLM output
        if new_code.startswith("```tsx"):
            new_code = new_code[6:]
        if new_code.endswith("```"):
            new_code = new_code[:-3]
        new_code = new_code.strip()
            
        with open(abs_path, 'w') as f:
            f.write(new_code)
        print(f"Updated {rel_path}")
    else:
        print(f"❌ Validation FAILED. Escalated to chat.")
        print(result)

if __name__ == "__main__":
    main()
