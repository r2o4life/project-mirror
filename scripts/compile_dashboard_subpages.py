import os
import sys
from dotenv import load_dotenv

# Ensure credentials are loaded before hitting the harness
load_dotenv(os.path.expanduser("~/.env"))

# Add the script directory to the python path so we can import the harness
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from agent_harness import LLMClientInterface, GeminiClient, PolicyValidator, ClosedLoopAgentHarness, PolicyProfile, GlobalWebParadigmEngine

def compile_page(rel_path: str, context: dict, harness: ClosedLoopAgentHarness):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    abs_path = os.path.join(base_dir, rel_path)
    
    print(f"\n===========================================================")
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

def main():
    llm = GeminiClient()
    validator = PolicyValidator(llm)
    engine = GlobalWebParadigmEngine()
    harness = ClosedLoopAgentHarness(llm, validator, engine)
    
    dashboard_context = {
        "auth_state": "AUTHENTICATED",
        "current_view": "DASHBOARD_VIEW",
        "is_wizard_flow": False,
        "is_complex_artifact": True  # Force OPERATIONAL_COMMAND and high density
    }
    
    compile_page("frontend/src/app/dashboard/new-project/page.tsx", dashboard_context, harness)
    compile_page("frontend/src/app/dashboard/my-contributions/page.tsx", dashboard_context, harness)

if __name__ == "__main__":
    main()
