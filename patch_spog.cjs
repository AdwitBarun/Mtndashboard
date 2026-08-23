const fs = require("fs")
const path = require("path")

const files = fs
  .readdirSync("src/pages")
  .map((f) => path.join("src/pages", f))
  .filter((f) => f.endsWith(".tsx"))

for (const file of files) {
  if (
    file.includes("CustomerExplorer.tsx") ||
    file.includes("ClosedLoop.tsx") ||
    file.includes("CustomerHub.tsx") ||
    file.includes("Placeholder.tsx") ||
    file.includes("SPOG.tsx")
  )
    continue

  let content = fs.readFileSync(file, "utf8")
  if (content.includes("STAGES_NAV.map") && !content.includes("Customer 360")) {
    // We want to replace the exact block:
    //           <div className="flex items-center gap-5">
    //             {STAGES_NAV.map((s) => {
    content = content.replace(
      /<div className="flex items-center gap-5">\s*\{STAGES_NAV\.map\(\(s\) => \{/g,
      `<div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-5">
              {STAGES_NAV.map((s) => {`,
    )

    // And replace:
    //                 </button>
    //               )
    //             })}
    //           </div>
    content = content.replace(
      /<\/button>\s*\)\s*\}\)\}\s*<\/div>/g,
      `</button>
              )
            })}
            </div>
            <Link to={\`/hub/\${customer.id}/closed-loop\`} state={{ explorerSearch }} className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full border bg-white shadow-sm transition-all hover:shadow-md hover:border-[#7A1230]/50 group cursor-pointer" style={{ borderColor: "#7A1230", borderBottomWidth: 3 }}>
               <span className="text-[10px] font-bold" style={{ color: "#7A1230" }}>✨ Customer 360</span>
            </Link>
          </div>`,
    )

    // Ensure Sparkles is imported if we decide to use it, but since we are using emoji, it's fine.

    fs.writeFileSync(file, content)
    console.log("Patched " + file)
  }
}
