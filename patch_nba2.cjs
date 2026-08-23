const fs = require("fs")
let content = fs.readFileSync("src/pages/NBA.tsx", "utf8")

const signalSummaryReplace = `                <h3 className="text-sm font-bold text-gray-900 mb-3">Signal Summary</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Segment", value: "Loyal Family", icon: "👨‍👩‍👧‍👦" },
                    { label: "Strategy", value: customer.strategy, icon: "🎯" },
                    { label: "Risk", value: customer.risk.toFixed(2), icon: "🛡️" },
                    { label: "ARPU", value: "₹" + customer.arpu.toLocaleString("en-IN"), icon: "💰" },
                    { label: "Channel", value: "WhatsApp", icon: "📱" },
                    { label: "Window", value: "Next 24 hrs", icon: "⏱️" },
                  ].map(({ label, value, icon }) => (`

content = content.replace(
  /                <h3 className="text-sm font-bold text-gray-900 mb-3">Signal Summary<\/h3>[\s\S]*?\]\.map\(\(\{ label, value, icon \}\) => \(/m,
  signalSummaryReplace,
)

fs.writeFileSync("src/pages/NBA.tsx", content)
