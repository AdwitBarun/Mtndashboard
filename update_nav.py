import os
import re

def update_stages_nav(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to find the STAGES_NAV.map and replace the loop body
    # It usually looks like:
    # {STAGES_NAV.map((s) => {
    #   const isActive = s.key === "understand"
    
    # Or in some places {STAGES_NAV.map((s, i) => {
    
    # Let's replace the whole STAGES_NAV.map block if it matches.
    # Actually, a regex might be tricky. Let's just do a specialized replacement for the exact style object.
    
    original = content
    
    # Replace the style for the dot
    content = re.sub(
        r'style=\{\s*isActive\s*\?\s*\{\s*background:\s*(?:THEME\.maroon|"\#7C3AED")\s*\}\s*:\s*\{\s*background:\s*"transparent",\s*border:\s*"2px solid \#D1D5DB",?\s*\}\s*\}',
        r'style={ isActive ? { background: "#7C3AED" } : (STAGES_NAV.findIndex(x => x.key === s.key) < STAGES_NAV.findIndex(x => x.key === (typeof activeStageKey !== "undefined" ? activeStageKey : s.key)) ? { background: "#8B5CF6" } : { background: "transparent", border: "2px solid #CBD5E1" }) }',
        content
    )
    
    # wait, activeStageKey is not defined. It's usually `const isActive = s.key === "understand"`
    # So I can capture the active key from that line!
    match = re.search(r'const isActive = s\.key === "([^"]+)"', content)
    if match:
        active_key = match.group(1)
        
        # Now we replace the dot style
        content = re.sub(
            r'style=\{\s*isActive\s*\?\s*\{\s*background:\s*(?:THEME\.maroon|"\#7C3AED")\s*\}\s*:\s*\{\s*background:\s*"transparent",\s*border:\s*"2px solid \#[a-fA-F0-9]+",?\s*\}\s*\}',
            f'style={{ isActive ? {{ background: "#7C3AED" }} : (STAGES_NAV.findIndex(x => x.key === s.key) < STAGES_NAV.findIndex(x => x.key === "{active_key}") ? {{ background: "#8B5CF6" }} : {{ background: "transparent", border: "2px solid #CBD5E1" }}) }}',
            content
        )
        
        # Now we replace the text style
        content = re.sub(
            r'style=\{\{\s*color:\s*isActive\s*\?\s*(?:THEME\.maroon|"\#7C3AED")\s*:\s*"\#9CA3AF"\s*\}\}',
            f'style={{{{ color: isActive ? "#7C3AED" : (STAGES_NAV.findIndex(x => x.key === s.key) < STAGES_NAV.findIndex(x => x.key === "{active_key}") ? "#8B5CF6" : "#CBD5E1") }}}}',
            content
        )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src/pages'):
    for file in files:
        if file.endswith('.tsx'):
            update_stages_nav(os.path.join(root, file))

print("Done.")
