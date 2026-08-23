with open("src/pages/ContentStudio.tsx", "r") as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if "const topPainTitle = topPain?.title ?? \"Engagement\"" in line:
        if skip:
            continue
        skip = True
    new_lines.append(line)

with open("src/pages/ContentStudio.tsx", "w") as f:
    f.writelines(new_lines)
