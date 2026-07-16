import os
from pathlib import Path

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    app_dir = os.path.join(base_dir, "frontend", "src", "app")
    
    fixed_count = 0
    hooks = ["useState", "useEffect", "useRouter", "onClick", "onChange", "onSubmit"]
    
    for path in Path(app_dir).rglob('page.tsx'):
        with open(path, 'r') as f:
            content = f.read()
            
        if "use client" not in content and "'use client'" not in content:
            if any(hook in content for hook in hooks):
                # Don't add to files with server only methods unless we have to, actually Next.js will tell us
                if "createClient" not in content and "generateMetadata" not in content:
                    new_content = '"use client";\n\n' + content
                    with open(path, 'w') as f:
                        f.write(new_content)
                    print(f"Added 'use client' to {path}")
                    fixed_count += 1
                else:
                    print(f"Skipped {path} because it contains Server-only methods but also has hooks!")
            
    print(f"Fixed {fixed_count} files.")

if __name__ == "__main__":
    main()
