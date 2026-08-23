import os
import re

def update_customer_360_buttons(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We are looking for the Link to closed-loop with Customer 360
    # It has className="..." and style={{ ... }} and then <span className="..." style={{ ... }}>✨ Customer 360</span>
    
    # Let's just find "Customer 360" in a span and update the Link.
    # Actually, simpler: replace the className and style of the Link/span for Customer 360.
    
    # Original:
    # className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full border bg-white shadow-sm transition-all hover:shadow-md hover:border-[#7C3AED]/50 group cursor-pointer"
    # style={{ borderColor: "#7C3AED", borderBottomWidth: 3 }}
    # <span className="text-[10px] font-bold" style={{ color: "#7C3AED" }}>
    
    content = re.sub(
        r'className="flex items-center justify-center gap-1\.5 px-3 py-1 rounded-full border bg-white shadow-sm transition-all hover:shadow-md hover:border-\[\#7C3AED\]/50 group cursor-pointer"\s*style=\{\{ borderColor: "\#7C3AED", borderBottomWidth: 3 \}\}',
        r'className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full shadow-sm transition-all hover:shadow-md group cursor-pointer" style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)", color: "white" }}',
        content
    )
    
    # Fix the span inside it
    content = re.sub(
        r'<span\s*className="text-\[10px\] font-bold"\s*style=\{\{ color: "\#7C3AED" \}\}\s*>\s*✨ Customer 360',
        r'<span className="text-[10px] font-bold text-white">✨ Customer 360',
        content
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, _, files in os.walk('src/pages'):
    for file in files:
        if file.endswith('.tsx'):
            update_customer_360_buttons(os.path.join(root, file))

print("Done.")
