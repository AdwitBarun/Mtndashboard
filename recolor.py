import os

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for old_str, new_str in replacements.items():
        content = content.replace(old_str, new_str)
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

replacements = {
    # Gradients
    "bg-gradient-to-r from-gray-900 to-[#7A1230]": "bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#EC7A5C]",
    "bg-gradient-to-r from-slate-900 to-slate-800": "bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#EC7A5C]", # wait, travel persona is this? "Left profile / persona card (the maroon 'JO / Rohan Mehta' card) → fill with the 135° indigo→violet→coral gradient"
    # The persona card was "linear-gradient(145deg, #7A1230 0%, #4A0A1C 100%)"
    "linear-gradient(145deg, #7A1230 0%, #4A0A1C 100%)": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC7A5C 100%)",
    "linear-gradient(160deg,#7A0026 0%,#5C0E24 100%)": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC7A5C 100%)",
    "linear-gradient(90deg,#7A1230 0%,#5C0E24 100%)": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC7A5C 100%)",
    "bg-[#7A1533]": "bg-[#7C3AED]",
    "bg-[#7A1230]": "bg-[#7C3AED]",
    "bg-[#7A0026]": "bg-[#7C3AED]",
    "text-[#7A1533]": "text-[#7C3AED]",
    "text-[#7A1230]": "text-[#7C3AED]",
    "text-[#7A0026]": "text-[#7C3AED]",
    "border-[#7A1533]": "border-[#7C3AED]",
    "border-[#7A1230]": "border-[#7C3AED]",
    "border-[#7A0026]": "border-[#7C3AED]",
    "hover:text-[#7A1230]": "hover:text-[#7C3AED]",
    "hover:border-[#7A1230]": "hover:border-[#7C3AED]",
    "ring-[#7A1230]": "ring-[#7C3AED]",
    "fill-[#7A1230]": "fill-[#7C3AED]",
    "stroke-[#7A1230]": "stroke-[#7C3AED]",
    "from-[#7A1230]": "from-[#7C3AED]",
    "via-[#7A1230]": "via-[#7C3AED]",
    "to-[#7A1230]": "to-[#7C3AED]",

    "border-[#5c0f26]": "border-[#4F46E5]",
    
    # Specific constant replacements in code
    'maroon: "#7A1230"': 'maroon: "#7C3AED"',
    'maroon: "#7A0026"': 'maroon: "#7C3AED"',
    'darkMaroon: "#4A0A1C"': 'darkMaroon: "#4F46E5"',
    'darkMaroon: "#5A001C"': 'darkMaroon: "#4F46E5"',
    
    # Other raw colors
    "#7A1533": "#7C3AED",
    "#7A1230": "#7C3AED",
    "#4A0A1C": "#4F46E5",
    "#7A0026": "#7C3AED",
    "#5A001C": "#4F46E5",
    "#5c0f26": "#4F46E5",
    "#5C0E24": "#4F46E5",
}

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css', '.html')):
            replace_in_file(os.path.join(root, file), replacements)

print("Done.")
