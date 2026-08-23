import os
import re

files_and_keys = {
    'src/pages/ContentStudio.tsx': 'engage',
    'src/pages/Travel.tsx': 'sense',
    'src/pages/PainPoints.tsx': 'sense',
    'src/pages/NBA.tsx': 'decide',
    'src/pages/PaymentHistory.tsx': 'sense',
    'src/pages/CustomerIdentity.tsx': 'understand',
    'src/pages/DataUsage.tsx': 'sense',
}

for filepath, active_key in files_and_keys.items():
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace(
        '(typeof activeStageKey !== "undefined" ? activeStageKey : s.key)',
        f'"{active_key}"'
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {filepath}")
