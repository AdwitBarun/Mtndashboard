const fs = require("fs")

let content = fs.readFileSync("src/pages/Travel.tsx", "utf8")

// Change 1: Delete the "Frequent traveller with significant roaming activity..." paragraph
content = content.replace(
  /<p className="text-\[13px\] font-medium text-white\/90 leading-relaxed bg-black\/20 p-3 rounded-xl border border-white\/10">\s*Frequent traveller with significant roaming activity and\s*cross-border engagement\.\s*<\/p>/g,
  "",
)

// Change 2: Delete the AI Travel Insights div block entirely
const aiInsightRegex =
  /{\/\* 4\. AI Travel Insights \*\/}\s*<div className="bg-\[#7A0026\]\/5 rounded-2xl p-6 border border-\[#7A0026\]\/20 shadow-sm">[\s\S]*?<\/div>/
content = content.replace(aiInsightRegex, "")

// Change 3: Update width to 1135px and height to 205px on Travel Persona div
// The original tag is: <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700 text-white shadow-md">
// We inject style={{ width: "1135px", height: "205px" }} or tailwind classes if appropriate.
// Using inline styles is safest for explicit pixel dimensions.
content = content.replace(
  '<div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700 text-white shadow-md">',
  '<div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700 text-white shadow-md" style={{ width: "1135px", height: "205px" }}>',
)

// Change 4: Set height to 215px on Roaming Cost Breakdown div
// <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"> immediately after {/* 3. Roaming Cost Breakdown */}
content = content.replace(
  /{\/\* 3\. Roaming Cost Breakdown \*\/}\s*<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">/,
  '{/* 3. Roaming Cost Breakdown */}\n            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" style={{ height: "215px" }}>',
)

// Change 5: Set height to 450px on Monthly Roaming Spend chart div
// <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"> immediately after {/* 1. Monthly Roaming Spend (₹) Chart */}
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
