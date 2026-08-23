const fs = require("fs")

let content = fs.readFileSync("src/pages/Travel.tsx", "utf8")

// Change 1: Delete the "Frequent traveller with significant roaming activity..." paragraph
// Looking at the original:
// <p className="text-[13px] font-medium text-white/90 leading-relaxed bg-black/20 p-3 rounded-xl border border-white/10">
//   Frequent traveller with significant roaming activity and
//   cross-border engagement.
// </p>
content = content.replace(
  /<p className="text-\[13px\] font-medium text-white\/90 leading-relaxed bg-black\/20 p-3 rounded-xl border border-white\/10">\s*Frequent traveller with significant roaming activity and\s*cross-border engagement\.\s*<\/p>/g,
  "",
)

// Change 2: Delete the AI Travel Insights div block entirely
// It starts with <div className="bg-[#7A0026]/5 rounded-2xl p-6 border border-[#7A0026]/20 shadow-sm">
const insightStart = content.indexOf(
  '<div className="bg-[#7A0026]/5 rounded-2xl p-6 border border-[#7A0026]/20 shadow-sm">',
)
if (insightStart !== -1) {
  // find the corresponding closing div.
  // It's under {/* 4. AI Travel Insights */}
  // The structure is roughly:
  // {/* 4. AI Travel Insights */}
  // <div className="bg-[#7A0026]/5 ...">
  //    ...
  // </div>
  const beforeInsight = content.substring(
    0,
    content.lastIndexOf("{/* 4. AI Travel Insights */}"),
  )

  // Find where this div ends. Since we know it's the last section in the RIGHT COLUMN,
  // we can just replace up to `          </div>\n        </div>\n      </div>\n    </Layout>`
  const afterInsightIndex = content.indexOf(
    "          </div>\n        </div>\n      </div>\n    </Layout>",
  )
  content = beforeInsight + content.substring(afterInsightIndex)
}

// Change 3: Update width to 1135px and height to 205px on Travel Persona div
content = content.replace(
  '<div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700 text-white shadow-md">',
  '<div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700 text-white shadow-md" style={{ width: "1135px", height: "205px" }}>',
)

// Change 4: Set height to 215px on Roaming Cost Breakdown div
content = content.replace(
  /{\/\* 3\. Roaming Cost Breakdown \*\/}\s*<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">/,
  '{/* 3. Roaming Cost Breakdown */}\n            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" style={{ height: "215px" }}>',
)

// Change 5: Set height to 450px on Monthly Roaming Spend chart div
content = content.replace(
  /{\/\* 1\. Monthly Roaming Spend \(₹\) Chart \*\/}\s*<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">/,
  '{/* 1. Monthly Roaming Spend (₹) Chart */}\n            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" style={{ height: "450px" }}>',
)

// Change 6: Set height to 1520px on the 70/30 layout grid
content = content.replace(
  '<div className="grid grid-cols-1 xl:grid-cols-[70%_calc(30%-1.5rem)] gap-6 pb-12">',
  '<div className="grid grid-cols-1 xl:grid-cols-[70%_calc(30%-1.5rem)] gap-6 pb-12" style={{ height: "1520px" }}>',
)

fs.writeFileSync("src/pages/Travel.tsx", content)
