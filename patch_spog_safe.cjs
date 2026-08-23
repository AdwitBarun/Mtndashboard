const fs = require("fs")
const path = require("path")

const files = [
  "ContentStudio.tsx",
  "CustomerIdentity.tsx",
  "DataUsage.tsx",
  "NBA.tsx",
  "PainPoints.tsx",
  "PaymentHistory.tsx",
  "Travel.tsx",
]

for (const name of files) {
  const file = path.join("src/pages", name)
  let content = fs.readFileSync(file, "utf8")

  // Replace only the first STAGES_NAV.map occurrence
  const targetStart =
    '<div className="flex items-center gap-5">\n            {STAGES_NAV.map((s) => {'
  const replacementStart = `<div className="flex flex-col items-end gap-2 shrink-0">\n            <div className="flex items-center gap-5">\n              {STAGES_NAV.map((s) => {`

  if (content.includes(targetStart)) {
    content = content.replace(targetStart, replacementStart)

    // Now find the first </div> after the STAGES_NAV map.
    // The STAGES_NAV.map ends with:
    //                 </button>
    //               )
    //             })}
    //           </div>

    // We can use a regex without /g
    const endRegex = /(<\/button>\s*\)\s*\}\)\}\s*)<\/div>/
    content = content.replace(
      endRegex,
      `$1</div>
            <Link to={\`/hub/\${customer.id}/closed-loop\`} state={{ explorerSearch }} className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full border bg-white shadow-sm transition-all hover:shadow-md hover:border-[#7A1230]/50 group cursor-pointer" style={{ borderColor: "#7A1230", borderBottomWidth: 3 }}>
               <span className="text-[10px] font-bold" style={{ color: "#7A1230" }}>✨ Customer 360</span>
            </Link>
          </div>`,
    )

    fs.writeFileSync(file, content)
    console.log("Safely patched " + file)
  } else {
    console.log("Could not find start in " + file)
  }
}
