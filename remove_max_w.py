import os
import re

def remove_max_w_mx_auto(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # match max-w-[...] mx-auto or max-w-7xl mx-auto
    new_content = re.sub(r'max-w-\[?\d+(?:px)?\]?\s+mx-auto\s*', '', content)
    new_content = re.sub(r'max-w-[a-z0-9]+\s+mx-auto\s*', '', new_content)
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src/pages'):
    for file in files:
        if file.endswith('.tsx'):
            remove_max_w_mx_auto(os.path.join(root, file))

print("Done.")
