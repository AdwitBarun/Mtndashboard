const fs = require("fs")
let content = fs.readFileSync("src/pages/Feedback.tsx", "utf8")

// Replace KPI Delta:
content = content.replace(
  /Offer Acceptance[\s\S]*?17\.2%[\s\S]*?24\.8%/m,
  'Offer Acceptance</div>\n                  <div className="text-2xl font-bold text-slate-900 mt-1 mb-1">\n                    24.7%\n                  </div>\n                  <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-fit flex items-center gap-1">\n                    <TrendingUp size={12} />\n                    Up from 18.6%',
)

content = content.replace(
  /Conversion Rate[\s\S]*?8\.4%[\s\S]*?14\.2%/m,
  'Conversion Rate</div>\n                  <div className="text-2xl font-bold text-slate-900 mt-1 mb-1">\n                    13.8%\n                  </div>\n                  <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-fit flex items-center gap-1">\n                    <TrendingUp size={12} />\n                    Up from 9.3%',
)

content = content.replace(
  /Predicted Churn[\s\S]*?0\.58[\s\S]*?0\.42/m,
  'Predicted Churn</div>\n                  <div className="text-2xl font-bold text-slate-900 mt-1 mb-1">\n                    0.44\n                  </div>\n                  <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-fit flex items-center gap-1">\n                    <TrendingDown size={12} />\n                    Down from 0.61',
)

content = content.replace(
  /Model Accuracy[\s\S]*?76%[\s\S]*?84%/m,
  'Model Accuracy</div>\n                  <div className="text-2xl font-bold text-slate-900 mt-1 mb-1">\n                    83%\n                  </div>\n                  <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-fit flex items-center gap-1">\n                    <TrendingUp size={12} />\n                    Up from 78%',
)

content = content.replace(
  /Avg\. CTR[\s\S]*?14%[\s\S]*?32%/m,
  'Avg. CTR</div>\n                  <div className="text-2xl font-bold text-slate-900 mt-1 mb-1">\n                    31%\n                  </div>\n                  <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-fit flex items-center gap-1">\n                    <TrendingUp size={12} />\n                    Up from 12%',
)

// Update Signals array
const newSignals = `[
                  {
                    label: "Roaming Affinity",
                    icon: Plane,
                    before: 68,
                    after: 91,
                    change: "+23",
                    pos: true,
                  },
                  {
                    label: "Bill Sensitivity",
                    icon: CreditCard,
                    before: 58,
                    after: 72,
                    change: "+14",
                    pos: true,
                  },
                ]`

content = content.replace(
  /\[\s*\{\s*label: "Roaming Affinity"[\s\S]*?pos: true,\s*\}\,\s*\]/m,
  newSignals,
)

fs.writeFileSync("src/pages/Feedback.tsx", content)
