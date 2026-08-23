const fs = require("fs")
let content = fs.readFileSync("src/pages/NBA.tsx", "utf8")

const updatedFactors = `const DECISION_FACTORS: Record<string, {
  label: string
  score: number
  positive: boolean
  reason: string
  icon: string
}[]> = {
  "Cross-Sell": [
    { label: "Roaming Affinity", score: 91, positive: true, reason: "Frequent international roaming signals.", icon: "✈️" },
    { label: "Data Usage", score: 88, positive: true, reason: "High usage during travel.", icon: "📶" },
    { label: "Tenure", score: 78, positive: true, reason: "Long-standing loyal subscriber.", icon: "📅" },
    { label: "Bill Sensitivity", score: 72, positive: false, reason: "High spend but bill shock history.", icon: "⚠" },
  ]
}`

content = content.replace(
  /const DECISION_FACTORS[\s\S]*?"Win-Back": \[[^\]]*\]\,\n\}/m,
  updatedFactors,
)

fs.writeFileSync("src/pages/NBA.tsx", content)
