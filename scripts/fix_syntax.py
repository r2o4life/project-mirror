import os
import re
from pathlib import Path

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    app_dir = os.path.join(base_dir, "frontend", "src", "app")
    
    fixed_count = 0
    for path in Path(app_dir).rglob('page.tsx'):
        with open(path, 'r') as f:
            content = f.read()
            
        # Check if there is a ```tsx or ```typescript block
        match = re.search(r'```(?:tsx|typescript|ts|javascript|jsx)\n(.*?)(```|$)', content, re.DOTALL)
        if match:
            new_content = match.group(1).strip()
            with open(path, 'w') as f:
                f.write(new_content)
            print(f"Fixed formatting in {path}")
            fixed_count += 1
        else:
            if "import " in content and "export default" in content:
                pass
            print(f"No code block found in {path}, left as is.")
            
    print(f"Fixed {fixed_count} files.")

if __name__ == "__main__":
    main()
