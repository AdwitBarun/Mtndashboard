const fs = require("fs")
let content = fs.readFileSync("src/data/customers.ts", "utf8")

const updatedSub1 = `  {
    id: "SUB-10001",
    name: "Rohan Mehta",
    initials: "RM",
    segment: "Loyal Family Accounts",
    region: "West",
    tenure: 78,
    arpu: 1699,
    risk: 0.44, // Medium Churn Risk
    strategy: "Retention",
    planType: "Prepaid Family",
    age: 38,
    location: "Mumbai",
    phone: "+91 98201 74839",
    device: "Galaxy S24",
    os: "Android 14",
    networkType: "5G",
    primaryApp: "YouTube",
    paymentMethod: "UPI (PhonePe)",
    backupPayment: "Credit Card",
    householdMembers: [
      { id: "HM-1", name: "Rohan", initials: "RM", role: "Primary", device: "Galaxy S24", os: "Android", usageShare: 39, color: "#4F46E5", data: "31 GB" },
      { id: "HM-2", name: "Priya", initials: "PM", role: "Secondary", device: "iPhone 15", os: "iOS", usageShare: 35, color: "#7C3AED", data: "28 GB" },
      { id: "HM-3", name: "Arjun", initials: "AM", role: "Secondary", device: "Galaxy A54", os: "Android", usageShare: 25, color: "#8B5CF6", data: "20 GB" }
    ],
    behavioralTags: [
      { label: "High Loyalty", color: "#4F46E5" },
      { label: "Family Streamer", color: "#7C3AED" },
    ],
    avgData: "79 GB/mo",
    lifetimeValue: "₹1.33L (2-yr proj)",
    engagementDimensions: {
      dataUsage: 96,
      loyalty: 92,
      spend: 88,
      streaming: 85,
      travel: 78,
      recharge: 99,
    },
    personaArchetype: {
      name: "The Family Anchor",
      description: "A highly loyal anchor for a multi-device family plan with high data consumption.",
      churnRisk: "Medium",
      revenue: "High",
      dataValue: "Very High",
    },
    journeyActivity: [
      { time: "2 hours ago", icon: "wifi", text: "Data usage spike — 12 GB in 24 hrs" },
      { time: "3 days ago", icon: "plane", text: "Connected to roaming network (Dubai)" },
      { time: "1 week ago", icon: "credit-card", text: "Bill paid via UPI (PhonePe)" },
    ],
    nextBestAction: {
      offerName: "Smart Roaming Pack",
      acceptancePct: 76,
      revenueImpact: "+₹1,290/yr",
      priority: "High",
    },
  },
  // ─── 2 ───────────────────────────────────────────────────────────────────
  {
    id: "SUB-10002",`

content = content.replace(
  /  \{\n    id: "SUB-10001",[\s\S]*?id: "SUB-10002",/m,
  updatedSub1,
)

fs.writeFileSync("src/data/customers.ts", content)
