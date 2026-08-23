const fs = require("fs")
let content = fs.readFileSync("src/data/derived.ts", "utf8")

const crossSellReplace = `"Cross-Sell": [
    {
      title: "Smart Roaming Pack",
      strategyLabel: "CROSS-SELL",
      baseLikelihood: 76,
      estValue: "+₹1,290",
      ppIdx: [0, 1, 2],
    },
    {
      title: "Network Assurance",
      strategyLabel: "CROSS-SELL",
      baseLikelihood: 54,
      estValue: "+₹620",
      ppIdx: [1],
    },
    {
      title: "Bill Protection",
      strategyLabel: "CROSS-SELL",
      baseLikelihood: 47,
      estValue: "+₹430",
      ppIdx: [2],
    },
  ],`

content = content.replace(/"Cross-Sell": \[[^\]]*\]\,/m, crossSellReplace)

fs.writeFileSync("src/data/derived.ts", content)
