export type Segment = "Early Life Subscribers" | "Loyal Family Accounts" | "Budget New Joiners" | "Android Sociables" | "Younger Techies" | "Premium Data Explorers" | "Frequent Travel Professionals" | "Silent Decliners"

export type Strategy = "Retention" | "Upsell" | "Cross-Sell" 
export type PlanType = "Prepaid Individual" | "Prepaid Family" | "Postpaid Individual" | "Postpaid Family"
export type Region = "North" | "South" | "East" | "West" | "Central"
export type RiskBand = "Low" | "Medium" | "High"
export type Priority = "High" | "Medium" | "Low"

export interface HouseholdMember {
  id: string
  name: string
  initials: string
  role: "Primary" | "Secondary"
  device: string
  os: string
  usageShare: number
  data?: string
  color: string
}

export interface Customer {
  id: string
  name: string
  initials: string
  segment: Segment
  region: Region
  tenure: number
  arpu: number
  risk: number
  strategy: Strategy
  planType: PlanType
  age: number
  location: string
  phone: string
  device: string
  os: string
  networkType: string
  primaryApp: string
  paymentMethod: string
  backupPayment: string
  householdMembers: HouseholdMember[]
  behavioralTags: { label: string color: string }[]
  avgData: string
  lifetimeValue: string
  engagementDimensions: {
    dataUsage: number
    loyalty: number
    spend: number
    streaming: number
    travel: number
    recharge: number
  }
  personaArchetype: {
    name: string
    description: string
    churnRisk: string
    revenue: string
    dataValue: string
  }
  journeyActivity: { time: string icon: string text: string }[]
  nextBestAction: {
    offerName: string
    acceptancePct: number
    revenueImpact: string
    priority: Priority
  }
}

export function getRiskBand(risk: number): RiskBand {
  if (risk >= 0.6) return "High"
  if (risk >= 0.3) return "Medium"
  return "Low"
}

export const SEGMENT_STYLE: Record<Segment, { bg: string text: string }> = {
  "Early Life Subscribers": { bg: "#FBEAEC", text: "#B23A48" },
  "Budget New Joiners": { bg: "#FBEAEC", text: "#B23A48" },
  "Loyal Family Accounts": { bg: "#E6F4EC", text: "#2F855A" },
  "Younger Techies": { bg: "#E6F4EC", text: "#2F855A" },
  "Android Sociables": { bg: "#E8F1FA", text: "#2B6CB0" },
  "Frequent Travel Professionals": { bg: "#E8F1FA", text: "#2B6CB0" },
  "Premium Data Explorers": { bg: "#EFE9FB", text: "#6B46C1" },
  "Silent Decliners": { bg: "#EFE9FB", text: "#6B46C1" },
}

export const STRATEGY_STYLE: Record<Strategy, { bg: string text: string }> = {
  Retention: { bg: "#FBEAEC", text: "#B23A48" },
  Upsell: { bg: "#E6F4EC", text: "#2F855A" },
  "Cross-Sell": { bg: "#E8F1FA", text: "#2B6CB0" },
}

export const RISK_STYLE: Record<RiskBand, { bg: string text: string }> = {
  Low: { bg: "#E6F4EC", text: "#2F855A" },
  Medium: { bg: "#FDF3E0", text: "#B7791F" },
  High: { bg: "#FBEAEC", text: "#B23A48" },
}

const MC = ["#2B6CB0", "#2F855A", "#6B46C1", "#B7791F"]

function initials(name: string) {
  const parts = name.trim().split(" ")
  return (
    (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")
  ).toUpperCase()
}

function ltv(arpu: number, tenure: number) {
  return `₹${(arpu * tenure).toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function soloMembers(
  name: string,
  device: string,
  os: string,
): HouseholdMember[] {
  return [
    {
      id: "M-P",
      name,
      initials: initials(name),
      role: "Primary",
      device,
      os,
      usageShare: 100,
      color: "#7C3AED",
    },
  ]
}

function familyMembers(
  primary: string,
  primaryDevice: string,
  primaryOs: string,
  secondaries: { name: string device: string os: string }[],
): HouseholdMember[] {
  const total = secondaries.reduce(
    (a, _, i) => a + (i === 0 ? 30 : i === 1 ? 22 : 15),
    0,
  )
  const primaryShare = 100 - total
  const members: HouseholdMember[] = [
    {
      id: "M-P",
      name: primary,
      initials: initials(primary),
      role: "Primary",
      device: primaryDevice,
      os: primaryOs,
      usageShare: primaryShare,
      color: "#7C3AED",
    },
  ]
  secondaries.forEach((s, i) => {
    members.push({
      id: `M-S${i + 1}`,
      name: s.name,
      initials: initials(s.name),
      role: "Secondary",
      device: s.device,
      os: s.os,
      usageShare: i === 0 ? 30 : i === 1 ? 22 : 15,
      color: MC[i] ?? MC[0],
    })
  })
  return members
}

export const customers: Customer[] = [
  // ─── 1 ───────────────────────────────────────────────────────────────────
  {
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
      {
        id: "HM-1",
        name: "Rohan",
        initials: "RM",
        role: "Primary",
        device: "Galaxy S24",
        os: "Android",
        usageShare: 39,
        color: "#4F46E5",
        data: "31 GB",
      },
      {
        id: "HM-2",
        name: "Priya",
        initials: "PM",
        role: "Secondary",
        device: "iPhone 15",
        os: "iOS",
        usageShare: 35,
        color: "#7C3AED",
        data: "28 GB",
      },
      {
        id: "HM-3",
        name: "Arjun",
        initials: "AM",
        role: "Secondary",
        device: "Galaxy A54",
        os: "Android",
        usageShare: 25,
        color: "#8B5CF6",
        data: "20 GB",
      },
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
      description:
        "A highly loyal anchor for a multi-device family plan with high data consumption.",
      churnRisk: "Medium",
      revenue: "High",
      dataValue: "Very High",
    },
    journeyActivity: [
      {
        time: "2 hours ago",
        icon: "wifi",
        text: "Data usage spike — 12 GB in 24 hrs",
      },
      {
        time: "3 days ago",
        icon: "plane",
        text: "Connected to roaming network (Dubai)",
      },
      {
        time: "1 week ago",
        icon: "credit-card",
        text: "Bill paid via UPI (PhonePe)",
      },
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
    id: "SUB-10002",
    name: "Ananya Iyer",
    initials: "AI",
    segment: "Premium Data Explorers",
    region: "West",
    tenure: 24,
    arpu: 749,
    risk: 0.22,
    strategy: "Upsell",
    planType: "Postpaid Individual",
    age: 34,
    location: "Mumbai",
    phone: "+44 7700 900456",
    device: "iPhone 15 Pro",
    os: "iOS 17",
    networkType: "5G",
    primaryApp: "Netflix",
    paymentMethod: "Credit Card",
    backupPayment: "Mastercard •••• 8812",
    householdMembers: soloMembers("Ananya Iyer", "iPhone 15 Pro", "iOS 17"),
    behavioralTags: [
      { label: "Power User", color: "#6B46C1" },
      { label: "Streamer", color: "#2B6CB0" },
      { label: "Early Adopter", color: "#B7791F" },
    ],
    avgData: "95 GB/mo",
    lifetimeValue: ltv(112, 24),
    engagementDimensions: {
      dataUsage: 96,
      loyalty: 65,
      spend: 88,
      streaming: 94,
      travel: 52,
      recharge: 70,
    },
    personaArchetype: {
      name: "The Data Power User",
      description:
        "A high-spend individual subscriber with an insatiable appetite for data and premium content. Responds well to exclusive early access and data-rich upgrade offers.",
      churnRisk: "Low",
      revenue: "Very High",
      dataValue: "Very High",
    },
    journeyActivity: [
      {
        time: "1 hour ago",
        icon: "wifi",
        text: "Approaching data cap — 90% used",
      },
      {
        time: "Yesterday",
        icon: "mail",
        text: "Opened promotional email — Premium 150GB",
      },
      {
        time: "5 days ago",
        icon: "credit-card",
        text: "Card charge successful — ₹112.00",
      },
    ],
    nextBestAction: {
      offerName: "150GB Premium Plus",
      acceptancePct: 68,
      revenueImpact: "+₹18/mo",
      priority: "High",
    },
  },
  // ─── 3 ───────────────────────────────────────────────────────────────────
  {
    id: "SUB-10003",
    name: "Rohit Verma",
    initials: "RV",
    segment: "Android Sociables",
    region: "East",
    tenure: 16,
    arpu: 299,
    risk: 0.41,
    strategy: "Cross-Sell",
    planType: "Prepaid Individual",
    age: 26,
    location: "Kolkata",
    phone: "+44 7700 900789",
    device: "Google Pixel 8",
    os: "Android 14",
    networkType: "4G",
    primaryApp: "TikTok",
    paymentMethod: "Top-Up (Cash)",
    backupPayment: "None",
    householdMembers: soloMembers(
      "Rohit Verma",
      "Google Pixel 8",
      "Android 14",
    ),
    behavioralTags: [
      { label: "Social Heavy", color: "#2B6CB0" },
      { label: "Video First", color: "#B7791F" },
    ],
    avgData: "28 GB/mo",
    lifetimeValue: ltv(45, 16),
    engagementDimensions: {
      dataUsage: 58,
      loyalty: 42,
      spend: 38,
      streaming: 72,
      travel: 18,
      recharge: 55,
    },
    personaArchetype: {
      name: "The Social Connector",
      description:
        "A young prepaid user primarily driven by social media consumption. Cross-sell opportunities exist around content add-ons and potential postpaid migration.",
      churnRisk: "Medium",
      revenue: "Low",
      dataValue: "Medium",
    },
    journeyActivity: [
      { time: "3 hours ago", icon: "smartphone", text: "Manual top-up — ₹10" },
      {
        time: "2 days ago",
        icon: "wifi",
        text: "Data near depletion — 500 MB remaining",
      },
      {
        time: "1 week ago",
        icon: "message-square",
        text: "Clicked SMS promo — social bundle",
      },
    ],
    nextBestAction: {
      offerName: "Social Boost Add-On",
      acceptancePct: 52,
      revenueImpact: "+₹8/mo",
      priority: "Medium",
    },
  },
  // ─── 4 ───────────────────────────────────────────────────────────────────
  {
    id: "SUB-10004",
    name: "Priya Nair",
    initials: "PN",
    segment: "Early Life Subscribers",
    region: "South",
    tenure: 4,
    arpu: 239,
    risk: 0.68,
    strategy: "Retention",
    planType: "Prepaid Individual",
    age: 22,
    location: "Kochi",
    phone: "+44 7700 901234",
    device: "Xiaomi Redmi Note 13",
    os: "Android 13",
    networkType: "4G",
    primaryApp: "Instagram",
    paymentMethod: "Top-Up (Card)",
    backupPayment: "Visa •••• 2293",
    householdMembers: soloMembers(
      "Priya Nair",
      "Xiaomi Redmi Note 13",
      "Android 13",
    ),
    behavioralTags: [
      { label: "New Subscriber", color: "#B23A48" },
      { label: "Price Sensitive", color: "#B7791F" },
    ],
    avgData: "18 GB/mo",
    lifetimeValue: ltv(38, 4),
    engagementDimensions: {
      dataUsage: 40,
      loyalty: 22,
      spend: 32,
      streaming: 48,
      travel: 10,
      recharge: 45,
    },
    personaArchetype: {
      name: "The New Arrival",
      description:
        "A recently acquired subscriber still in the critical early-life window. Churn risk is elevated; proactive retention outreach and onboarding nudges are essential.",
      churnRisk: "High",
      revenue: "Low",
      dataValue: "Low",
    },
    journeyActivity: [
      {
        time: "Today",
        icon: "alert-triangle",
        text: "High churn propensity flag raised",
      },
      {
        time: "4 days ago",
        icon: "mail",
        text: "No engagement with welcome campaign",
      },
      { time: "2 weeks ago", icon: "star", text: "First activation completed" },
    ],
    nextBestAction: {
      offerName: "Early Life Loyalty Discount",
      acceptancePct: 61,
      revenueImpact: "Retain ₹38/mo",
      priority: "High",
    },
  },
  // ─── 5 ───────────────────────────────────────────────────────────────────
  {
    id: "SUB-10005",
    name: "Sandeep Deshmukh",
    initials: "SD",
    segment: "Silent Decliners",
    region: "Central",
    tenure: 36,
    arpu: 349,
    risk: 0.75,
    strategy: "Retention",
    planType: "Postpaid Individual",
    age: 48,
    location: "Nagpur",
    phone: "+44 7700 901567",
    device: "Samsung Galaxy A34",
    os: "Android 13",
    networkType: "4G",
    primaryApp: "Google Maps",
    paymentMethod: "Direct Debit",
    backupPayment: "None",
    householdMembers: soloMembers(
      "Sandeep Deshmukh",
      "Samsung Galaxy A34",
      "Android 13",
    ),
    behavioralTags: [
      { label: "Declining Engagement", color: "#B23A48" },
      { label: "Long Tenure", color: "#6B46C1" },
      { label: "At Risk", color: "#B7791F" },
    ],
    avgData: "8 GB/mo",
    lifetimeValue: ltv(55, 36),
    engagementDimensions: {
      dataUsage: 22,
      loyalty: 35,
      spend: 45,
      streaming: 15,
      travel: 28,
      recharge: 30,
    },
    personaArchetype: {
      name: "The Fading Voice",
      description:
        "A mid-tenure postpaid customer showing clear signs of disengagement. Usage has dropped significantly over 6 months; a targeted offer may gain loyalty.",
      churnRisk: "High",
      revenue: "Medium",
      dataValue: "Low",
    },
    journeyActivity: [
      {
        time: "Today",
        icon: "alert-triangle",
        text: "Retention trigger — 90-day low engagement",
      },
      { time: "2 weeks ago", icon: "phone", text: "Outbound call — no answer" },
      {
        time: "Last month",
        icon: "message-square",
        text: "SMS retention offer — unopened",
      },
    ],
    nextBestAction: {
      offerName: "Retention Offer",
      acceptancePct: 38,
      revenueImpact: "Prevent ₹660 LTV loss",
      priority: "High",
    },
  },
  // ─── 6 ───────────────────────────────────────────────────────────────────
  {
    id: "SUB-10006",
    name: "Aditya Kapoor",
    initials: "AK",
    segment: "Younger Techies",
    region: "North",
    tenure: 20,
    arpu: 499,
    risk: 0.18,
    strategy: "Upsell",
    planType: "Postpaid Individual",
    age: 29,
    location: "Delhi",
    phone: "+44 7700 901890",
    device: "iPhone 15",
    os: "iOS 17",
    networkType: "5G",
    primaryApp: "Spotify",
    paymentMethod: "Apple Pay",
    backupPayment: "Visa •••• 6671",
    householdMembers: soloMembers("Aditya Kapoor", "iPhone 15", "iOS 17"),
    behavioralTags: [
      { label: "Tech Enthusiast", color: "#2F855A" },
      { label: "Music Streamer", color: "#2B6CB0" },
      { label: "5G Adopter", color: "#6B46C1" },
    ],
    avgData: "62 GB/mo",
    lifetimeValue: ltv(78, 20),
    engagementDimensions: {
      dataUsage: 78,
      loyalty: 68,
      spend: 65,
      streaming: 82,
      travel: 40,
      recharge: 75,
    },
    personaArchetype: {
      name: "The Tech Enthusiast",
      description:
        "A digitally engaged subscriber who adopts new technology early and values cutting-edge features. Ideal candidate for premium 5G plans and device upgrade offers.",
      churnRisk: "Low",
      revenue: "Medium",
      dataValue: "High",
    },
    journeyActivity: [
      {
        time: "Yesterday",
        icon: "wifi",
        text: "5G streaming session — 4K content",
      },
      {
        time: "3 days ago",
        icon: "star",
        text: "Opened upgrade offer — iPhone 16 Pro",
      },
      {
        time: "1 week ago",
        icon: "credit-card",
        text: "Apple Pay charge — ₹78.00",
      },
    ],
    nextBestAction: {
      offerName: "5G Max Plan Upgrade",
      acceptancePct: 71,
      revenueImpact: "+₹22/mo",
      priority: "High",
    },
  },
  // ─── 7 ───────────────────────────────────────────────────────────────────
  {
    id: "SUB-10007",
    name: "Meera Krishnan",
    initials: "MK",
    segment: "Frequent Travel Professionals",
    region: "West",
    tenure: 42,
    arpu: 879,
    risk: 0.29,
    strategy: "Cross-Sell",
    planType: "Postpaid Individual",
    age: 38,
    location: "Ahmedabad",
    phone: "+44 7700 902123",
    device: "iPhone 14 Pro",
    os: "iOS 16",
    networkType: "5G",
    primaryApp: "LinkedIn",
    paymentMethod: "Corporate Card",
    backupPayment: "Amex •••• 3301",
    householdMembers: soloMembers("Meera Krishnan", "iPhone 14 Pro", "iOS 16"),
    behavioralTags: [
      { label: "Frequent Flyer", color: "#2B6CB0" },
      { label: "Business User", color: "#6B46C1" },
      { label: "High Roaming", color: "#B7791F" },
    ],
    avgData: "75 GB/mo",
    lifetimeValue: ltv(134, 42),
    engagementDimensions: {
      dataUsage: 80,
      loyalty: 75,
      spend: 92,
      streaming: 60,
      travel: 95,
      recharge: 65,
    },
    personaArchetype: {
      name: "The Globe-Trotter",
      description:
        "A high-value professional subscriber with extensive international roaming behaviour. Cross-sell opportunities around business roaming bundles and travel data passes.",
      churnRisk: "Medium",
      revenue: "Very High",
      dataValue: "High",
    },
    journeyActivity: [
      {
        time: "2 hours ago",
        icon: "plane",
        text: "Roaming activated — Frankfurt, DE",
      },
      {
        time: "Yesterday",
        icon: "credit-card",
        text: "Roaming charge — ₹18.40",
      },
      {
        time: "4 days ago",
        icon: "mail",
        text: "Opened travel bundle offer email",
      },
    ],
    nextBestAction: {
      offerName: "Business Travel Roaming Pack",
      acceptancePct: 64,
      revenueImpact: "+₹30/mo",
      priority: "High",
    },
  },
  // ─── 8 ───────────────────────────────────────────────────────────────────
  {
    id: "SUB-10008",
    name: "Ramesh Gupta",
    initials: "RG",
    segment: "Loyal Family Accounts",
    region: "South",
    tenure: 60,
    arpu: 625,
    risk: 0.09,
    strategy: "Upsell",
    planType: "Postpaid Family",
    age: 45,
    location: "Hyderabad",
    phone: "+44 7700 902456",
    device: "Samsung Galaxy S23",
    os: "Android 13",
    networkType: "5G",
    primaryApp: "Amazon Prime",
    paymentMethod: "Direct Debit",
    backupPayment: "Mastercard •••• 5512",
    householdMembers: familyMembers(
      "Ramesh Gupta",
      "Samsung Galaxy S23",
      "Android 13",
      [
        { name: "Sunita Gupta", device: "iPhone 14", os: "iOS 16" },
        { name: "Rahul Gupta", device: "OnePlus 12", os: "Android 14" },
        { name: "Riya Gupta", device: "iPhone SE", os: "iOS 16" },
      ],
    ),
    behavioralTags: [
      { label: "Ultra Loyal", color: "#2F855A" },
      { label: "Family Plan", color: "#2B6CB0" },
      { label: "Long Tenure", color: "#6B46C1" },
      { label: "Streamer", color: "#B7791F" },
    ],
    avgData: "112 GB/mo",
    lifetimeValue: ltv(95, 60),
    engagementDimensions: {
      dataUsage: 85,
      loyalty: 96,
      spend: 82,
      streaming: 90,
      travel: 25,
      recharge: 95,
    },
    personaArchetype: {
      name: "The Family Anchor",
      description:
        "A 5-year family plan holder with maximum loyalty scores and zero churn risk. Premium bundle upgrades and loyalty reward programmes are the ideal next moves.",
      churnRisk: "Very Low",
      revenue: "High",
      dataValue: "High",
    },
    journeyActivity: [
      {
        time: "1 hour ago",
        icon: "wifi",
        text: "Family streaming peak — 18 GB usage",
      },
      {
        time: "2 days ago",
        icon: "credit-card",
        text: "Auto-pay processed — ₹95.00",
      },
      {
        time: "1 week ago",
        icon: "star",
        text: "Loyalty milestone — 5 years celebrated",
      },
    ],
    nextBestAction: {
      offerName: "Loyalty Max Bundle",
      acceptancePct: 82,
      revenueImpact: "+₹28/mo",
      priority: "High",
    },
  },
  // ─── 9 ───────────────────────────────────────────────────────────────────
  {
    id: "SUB-10009",
    name: "Sneha Reddy",
    initials: "SR",
    segment: "Budget New Joiners",
    region: "East",
    tenure: 2,
    arpu: 179,
    risk: 0.72,
    strategy: "Retention",
    planType: "Prepaid Individual",
    age: 19,
    location: "Bhubaneswar",
    phone: "+44 7700 902789",
    device: "Motorola Moto G84",
    os: "Android 13",
    networkType: "4G",
    primaryApp: "WhatsApp",
    paymentMethod: "Top-Up (Cash)",
    backupPayment: "None",
    householdMembers: soloMembers(
      "Sneha Reddy",
      "Motorola Moto G84",
      "Android 13",
    ),
    behavioralTags: [
      { label: "Budget Conscious", color: "#B23A48" },
      { label: "New Joiner", color: "#B7791F" },
    ],
    avgData: "12 GB/mo",
    lifetimeValue: ltv(28, 2),
    engagementDimensions: {
      dataUsage: 28,
      loyalty: 15,
      spend: 22,
      streaming: 35,
      travel: 5,
      recharge: 38,
    },
    personaArchetype: {
      name: "The Value Seeker",
      description:
        "A budget-oriented new subscriber in the critical first 90 days. Affordable data bundles and cashback incentives offer the best chance of early-life retention.",
      churnRisk: "High",
      revenue: "Low",
      dataValue: "Low",
    },
    journeyActivity: [
      {
        time: "Today",
        icon: "alert-triangle",
        text: "Churn alert — no top-up in 14 days",
      },
      {
        time: "3 days ago",
        icon: "message-square",
        text: "Welcome SMS — not clicked",
      },
      { time: "1 week ago", icon: "star", text: "First SIM activation" },
    ],
    nextBestAction: {
      offerName: "Starter Data Bundle Offer",
      acceptancePct: 45,
      revenueImpact: "Retain ₹28/mo",
      priority: "High",
    },
  },
  // ─── 10 ──────────────────────────────────────────────────────────────────
  {
    id: "SUB-10010",
    name: "Karan Malhotra",
    initials: "KM",
    segment: "Android Sociables",
    region: "Central",
    tenure: 11,
    arpu: 329,
    risk: 0.38,
    strategy: "Cross-Sell",
    planType: "Prepaid Individual",
    age: 24,
    location: "Indore",
    phone: "+44 7700 903012",
    device: "Samsung Galaxy A54",
    os: "Android 13",
    networkType: "4G",
    primaryApp: "YouTube",
    paymentMethod: "Top-Up (Card)",
    backupPayment: "Visa •••• 1184",
    householdMembers: soloMembers(
      "Karan Malhotra",
      "Samsung Galaxy A54",
      "Android 13",
    ),
    behavioralTags: [
      { label: "Video Streamer", color: "#2B6CB0" },
      { label: "Social Active", color: "#B7791F" },
    ],
    avgData: "35 GB/mo",
    lifetimeValue: ltv(52, 11),
    engagementDimensions: {
      dataUsage: 62,
      loyalty: 45,
      spend: 42,
      streaming: 78,
      travel: 15,
      recharge: 58,
    },
    personaArchetype: {
      name: "The Social Connector",
      description:
        "A mid-tenure prepaid user heavily engaged with social and video platforms. Ready for a content add-on cross-sell or a postpaid migration offer.",
      churnRisk: "Medium",
      revenue: "Low",
      dataValue: "Medium",
    },
    journeyActivity: [
      {
        time: "5 hours ago",
        icon: "wifi",
        text: "High streaming — 3 GB in session",
      },
      { time: "Yesterday", icon: "smartphone", text: "Topped up — ₹20" },
      {
        time: "5 days ago",
        icon: "message-square",
        text: "Clicked video bundle SMS offer",
      },
    ],
    nextBestAction: {
      offerName: "Video & Social Bundle",
      acceptancePct: 55,
      revenueImpact: "+₹10/mo",
      priority: "Medium",
    },
  },

  // ─── 11–42 generated with helper ─────────────────────────────────────────
  ...((): Customer[] => {
    const raw: [string, string, Segment, Region, number, number, number, Strategy, PlanType, number, string][] =
      [
        [
          "SUB-10011",
          "Rachel Moore",
          "Frequent Travel Professionals",
          "East",
          31,
          118,
          0.26,
          "Cross-Sell",
          "Postpaid Individual",
          36,
          "Sheffield, UK",
        ],
        [
          "SUB-10012",
          "Ahmed Hassan",
          "Early Life Subscribers",
          "West",
          7,
          42,
          0.55,
          "Retention",
          "Prepaid Individual",
          27,
          "Exeter, UK",
        ],
        [
          "SUB-10013",
          "Emma Clarke",
          "Loyal Family Accounts",
          "Central",
          54,
          88,
          0.14,
          "Upsell",
          "Postpaid Family",
          40,
          "Coventry, UK",
        ],
        [
          "SUB-10014",
          "Ryan Walsh",
          "Budget New Joiners",
          "North",
          3,
          25,
          0.79,
          "Retention",
          "Prepaid Individual",
          21,
          "Sunderland, UK",
        ],
        [
          "SUB-10015",
          "Nina Patel",
          "Premium Data Explorers",
          "South",
          18,
          125,
          0.2,
          "Upsell",
          "Postpaid Individual",
          32,
          "Portsmouth, UK",
        ],
        [
          "SUB-10016",
          "Omar Abdullah",
          "Silent Decliners",
          "East",
          44,
          48,
          0.81,
          "Retention",
          "Postpaid Individual",
          50,
          "Cambridge, UK",
        ],
        [
          "SUB-10017",
          "Claire Bennett",
          "Younger Techies",
          "West",
          15,
          82,
          0.16,
          "Upsell",
          "Postpaid Individual",
          28,
          "Plymouth, UK",
        ],
        [
          "SUB-10018",
          "Paulo Costa",
          "Android Sociables",
          "North",
          9,
          38,
          0.44,
          "Cross-Sell",
          "Prepaid Individual",
          23,
          "Liverpool, UK",
        ],
        [
          "SUB-10019",
          "Grace Kim",
          "Loyal Family Accounts",
          "Central",
          66,
          102,
          0.07,
          "Upsell",
          "Postpaid Family",
          47,
          "Leicester, UK",
        ],
        [
          "SUB-10020",
          "Jack Murphy",
          "Budget New Joiners",
          "South",
          1,
          22,
          0.85,
          "Retention",
          "Prepaid Individual",
          20,
          "Bournemouth, UK",
        ],
        [
          "SUB-10021",
          "Isabel Ferreira",
          "Premium Data Explorers",
          "East",
          30,
          108,
          0.25,
          "Upsell",
          "Postpaid Individual",
          31,
          "Norwich, UK",
        ],
        [
          "SUB-10022",
          "David Brown",
          "Silent Decliners",
          "West",
          40,
          52,
          0.69,
          "Retention",
          "Postpaid Individual",
          44,
          "Bath, UK",
        ],
        [
          "SUB-10023",
          "Yuki Tanaka",
          "Younger Techies",
          "North",
          22,
          75,
          0.21,
          "Upsell",
          "Postpaid Individual",
          30,
          "Leeds, UK",
        ],
        [
          "SUB-10024",
          "Sandra Lewis",
          "Loyal Family Accounts",
          "South",
          72,
          92,
          0.11,
          "Upsell",
          "Prepaid Family",
          49,
          "Worthing, UK",
        ],
        [
          "SUB-10025",
          "Mohammed Al-Rashid",
          "Frequent Travel Professionals",
          "Central",
          38,
          142,
          0.32,
          "Cross-Sell",
          "Postpaid Individual",
          41,
          "Birmingham, UK",
        ],
        [
          "SUB-10026",
          "Katy Williams",
          "Early Life Subscribers",
          "East",
          6,
          35,
          0.63,
          "Retention",
          "Prepaid Individual",
          25,
          "Ipswich, UK",
        ],
        [
          "SUB-10027",
          "Liam O'Brien",
          "Android Sociables",
          "West",
          14,
          48,
          0.36,
          "Cross-Sell",
          "Prepaid Individual",
          22,
          "Swansea, UK",
        ],
        [
          "SUB-10028",
          "Fatima Malik",
          "Budget New Joiners",
          "North",
          5,
          32,
          0.58,
          "Retention",
          "Prepaid Individual",
          26,
          "Bradford, UK",
        ],
        [
          "SUB-10029",
          "Thomas Schneider",
          "Premium Data Explorers",
          "South",
          27,
          118,
          0.19,
          "Upsell",
          "Postpaid Individual",
          35,
          "Hove, UK",
        ],
        [
          "SUB-10030",
          "Anjali Kapoor",
          "Loyal Family Accounts",
          "East",
          51,
          86,
          0.13,
          "Upsell",
          "Postpaid Family",
          43,
          "Peterborough, UK",
        ],
        [
          "SUB-10031",
          "Ben Adeyemi",
          "Younger Techies",
          "Central",
          17,
          71,
          0.24,
          "Upsell",
          "Postpaid Individual",
          27,
          "Wolverhampton, UK",
        ],
        [
          "SUB-10032",
          "Rosa Martinez",
          "Silent Decliners",
          "West",
          33,
          44,
          0.76,
          "Retention",
          "Postpaid Individual",
          39,
          "Newport, UK",
        ],
        [
          "SUB-10033",
          "Chris Taylor",
          "Android Sociables",
          "North",
          13,
          50,
          0.4,
          "Cross-Sell",
          "Prepaid Individual",
          24,
          "Hull, UK",
        ],
        [
          "SUB-10034",
          "Hannah Lee",
          "Frequent Travel Professionals",
          "South",
          45,
          128,
          0.28,
          "Cross-Sell",
          "Postpaid Individual",
          37,
          "Eastbourne, UK",
        ],
        [
          "SUB-10035",
          "Viktor Kovalev",
          "Early Life Subscribers",
          "East",
          8,
          40,
          0.6,
          "Retention",
          "Prepaid Individual",
          29,
          "Derby, UK",
        ],
        [
          "SUB-10036",
          "Nadine Bouchard",
          "Premium Data Explorers",
          "West",
          21,
          115,
          0.23,
          "Upsell",
          "Postpaid Individual",
          33,
          "Cardiff, UK",
        ],
        [
          "SUB-10037",
          "Oscar Petrov",
          "Budget New Joiners",
          "Central",
          4,
          29,
          0.71,
          "Retention",
          "Prepaid Individual",
          22,
          "Stoke-on-Trent, UK",
        ],
        [
          "SUB-10038",
          "Zara Ahmed",
          "Loyal Family Accounts",
          "North",
          58,
          97,
          0.1,
          "Upsell",
          "Postpaid Family",
          44,
          "Newcastle, UK",
        ],
        [
          "SUB-10039",
          "Marco Rossi",
          "Younger Techies",
          "South",
          25,
          80,
          0.17,
          "Upsell",
          "Postpaid Individual",
          31,
          "Brighton, UK",
        ],
        [
          "SUB-10040",
          "Cynthia Addo",
          "Silent Decliners",
          "East",
          37,
          58,
          0.73,
          "Retention",
          "Postpaid Individual",
          42,
          "Colchester, UK",
        ],
        [
          "SUB-10041",
          "Luke Harrison",
          "Android Sociables",
          "West",
          10,
          46,
          0.42,
          "Cross-Sell",
          "Prepaid Individual",
          23,
          "Swansea, UK",
        ],
        [
          "SUB-10042",
          "Mei Chen",
          "Frequent Travel Professionals",
          "Central",
          35,
          136,
          0.31,
          "Cross-Sell",
          "Postpaid Individual",
          36,
          "Birmingham, UK",
        ],
      ]

    const DEVICES: Record<Segment, [string, string]> = {
      "Early Life Subscribers": ["Xiaomi Redmi Note 13", "Android 13"],
      "Budget New Joiners": ["Motorola Moto G84", "Android 13"],
      "Loyal Family Accounts": ["Samsung Galaxy S24", "Android 14"],
      "Younger Techies": ["iPhone 15", "iOS 17"],
      "Android Sociables": ["Samsung Galaxy A54", "Android 13"],
      "Premium Data Explorers": ["iPhone 15 Pro", "iOS 17"],
      "Frequent Travel Professionals": ["iPhone 14 Pro", "iOS 16"],
      "Silent Decliners": ["Samsung Galaxy A34", "Android 13"],
    }

    const APPS: Record<Segment, string> = {
      "Early Life Subscribers": "Instagram",
      "Budget New Joiners": "WhatsApp",
      "Loyal Family Accounts": "YouTube",
      "Younger Techies": "Spotify",
      "Android Sociables": "TikTok",
      "Premium Data Explorers": "Netflix",
      "Frequent Travel Professionals": "LinkedIn",
      "Silent Decliners": "Google Maps",
    }

    const PERSONAS: Record<Segment, {
      name: string
      description: string
      churnRisk: string
      revenue: string
      dataValue: string
    }> = {
      "Loyal Family Accounts": {
        name: "The Family Anchor",
        description:
          "A loyal multi-line account holder who values stability and bundle pricing. Responds well to family upgrade offers.",
        churnRisk: "Low",
        revenue: "High",
        dataValue: "Medium",
      },
      "Premium Data Explorers": {
        name: "The Data Power User",
        description:
          "A high-spend individual with voracious data appetite. Early adopter who responds to premium and exclusive offers.",
        churnRisk: "Low",
        revenue: "Very High",
        dataValue: "Very High",
      },
      "Younger Techies": {
        name: "The Tech Enthusiast",
        description:
          "A digitally savvy subscriber who values cutting-edge features and 5G connectivity. Ideal for device upgrade cross-sells.",
        churnRisk: "Low",
        revenue: "Medium",
        dataValue: "High",
      },
      "Android Sociables": {
        name: "The Social Connector",
        description:
          "A social-media-driven user on prepaid. Strong content add-on potential and candidate for postpaid migration.",
        churnRisk: "Medium",
        revenue: "Low",
        dataValue: "Medium",
      },
      "Frequent Travel Professionals": {
        name: "The Globe-Trotter",
        description:
          "A high-value professional with significant roaming behaviour. Business roaming bundles are the primary cross-sell opportunity.",
        churnRisk: "Medium",
        revenue: "Very High",
        dataValue: "High",
      },
      "Early Life Subscribers": {
        name: "The New Arrival",
        description:
          "A recently acquired subscriber in the critical first 90 days. Proactive onboarding and retention outreach are essential.",
        churnRisk: "High",
        revenue: "Low",
        dataValue: "Low",
      },
      "Budget New Joiners": {
        name: "The Value Seeker",
        description:
          "A budget-conscious new subscriber. Affordable starter bundles and cashback incentives offer the best early-life retention path.",
        churnRisk: "High",
        revenue: "Low",
        dataValue: "Low",
      },
      "Silent Decliners": {
        name: "The Fading Voice",
        description:
          "A disengaging subscriber whose usage and spend are trending downward. Retention offers and proactive outreach are critical now.",
        churnRisk: "High",
        revenue: "Medium",
        dataValue: "Low",
      },
    }

    const TAGS: Record<Segment, { label: string color: string }[]> = {
      "Loyal Family Accounts": [
        { label: "High Loyalty", color: "#2F855A" },
        { label: "Family Plan", color: "#2B6CB0" },
      ],
      "Premium Data Explorers": [
        { label: "Power User", color: "#6B46C1" },
        { label: "Streamer", color: "#2B6CB0" },
      ],
      "Younger Techies": [
        { label: "Tech Enthusiast", color: "#2F855A" },
        { label: "5G Adopter", color: "#6B46C1" },
      ],
      "Android Sociables": [
        { label: "Social Heavy", color: "#2B6CB0" },
        { label: "Video First", color: "#B7791F" },
      ],
      "Frequent Travel Professionals": [
        { label: "Frequent Flyer", color: "#2B6CB0" },
        { label: "Business User", color: "#6B46C1" },
      ],
      "Early Life Subscribers": [
        { label: "New Subscriber", color: "#B23A48" },
        { label: "Price Sensitive", color: "#B7791F" },
      ],
      "Budget New Joiners": [
        { label: "Budget Conscious", color: "#B23A48" },
        { label: "New Joiner", color: "#B7791F" },
      ],
      "Silent Decliners": [
        { label: "Declining Engagement", color: "#B23A48" },
        { label: "At Risk", color: "#B7791F" },
      ],
    }

    const ENG: Record<Segment, Customer["engagementDimensions"]> = {
      "Loyal Family Accounts": {
        dataUsage: 70,
        loyalty: 90,
        spend: 78,
        streaming: 82,
        travel: 30,
        recharge: 88,
      },
      "Premium Data Explorers": {
        dataUsage: 94,
        loyalty: 62,
        spend: 86,
        streaming: 92,
        travel: 50,
        recharge: 68,
      },
      "Younger Techies": {
        dataUsage: 75,
        loyalty: 66,
        spend: 63,
        streaming: 80,
        travel: 38,
        recharge: 73,
      },
      "Android Sociables": {
        dataUsage: 55,
        loyalty: 40,
        spend: 36,
        streaming: 70,
        travel: 16,
        recharge: 53,
      },
      "Frequent Travel Professionals": {
        dataUsage: 78,
        loyalty: 72,
        spend: 90,
        streaming: 58,
        travel: 93,
        recharge: 63,
      },
      "Early Life Subscribers": {
        dataUsage: 38,
        loyalty: 20,
        spend: 30,
        streaming: 45,
        travel: 8,
        recharge: 42,
      },
      "Budget New Joiners": {
        dataUsage: 26,
        loyalty: 14,
        spend: 20,
        streaming: 32,
        travel: 6,
        recharge: 36,
      },
      "Silent Decliners": {
        dataUsage: 20,
        loyalty: 32,
        spend: 42,
        streaming: 14,
        travel: 25,
        recharge: 28,
      },
    }

    const NBA_OFFERS: Record<Strategy, {
      offerName: string
      acceptancePct: number
      revenueImpact: string
      priority: Priority
    }> = {
      Upsell: {
        offerName: "Premium Plan Upgrade",
        acceptancePct: 67,
        revenueImpact: "+₹20/mo",
        priority: "High",
      },
      "Cross-Sell": {
        offerName: "Roaming & Travel Bundle",
        acceptancePct: 58,
        revenueImpact: "+₹15/mo",
        priority: "Medium",
      },
      Retention: {
        offerName: "Loyalty Retention Offer",
        acceptancePct: 53,
        revenueImpact: "Retain ARR",
        priority: "High",
      },
      "Retention": {
        offerName: "Retention Incentive Pack",
        acceptancePct: 36,
        revenueImpact: "Prevent churn",
        priority: "High",
      },
    }

    return raw.map(
      ([
        id,
        name,
        segment,
        region,
        tenure,
        arpu,
        risk,
        strategy,
        planType,
        age,
        location,
      ]) => {
        const [device, os] = DEVICES[segment]
        const isFamily = planType.includes("Family")
        const secondaryNames = isFamily
          ? [
              {
                name: `${name.split(" ")[1] ?? "A"} Jr.`,
                device: "iPhone 14",
                os: "iOS 16",
              },
              {
                name: `${["Sam", "Alex", "Jordan", "Casey"][Math.floor(tenure % 4)]} ${name.split(" ")[1] ?? "B"}`,
                device: "Samsung A34",
                os: "Android 13",
              },
            ]
          : []
        const members = isFamily
          ? familyMembers(name, device, os, secondaryNames)
          : soloMembers(name, device, os)
        const dataGB = Math.round(10 + (ENG[segment].dataUsage / 100) * 90)
        return {
          id,
          name,
          initials: initials(name),
          segment,
          region,
          tenure,
          arpu,
          risk,
          strategy,
          planType,
          age,
          location,
          phone: `+44 7700 9${String(10000 + parseInt(id.replace("SUB-", ""))).slice(1)}`,
          device,
          os,
          networkType:
            segment === "Budget New Joiners" ||
            segment === "Early Life Subscribers" ||
            segment === "Android Sociables"
              ? "4G"
              : "5G",
          primaryApp: APPS[segment],
          paymentMethod: planType.startsWith("Prepaid")
            ? "Top-Up (Card)"
            : "Direct Debit",
          backupPayment: planType.startsWith("Prepaid")
            ? "None"
            : "Visa •••• 9900",
          householdMembers: members,
          behavioralTags: TAGS[segment],
          avgData: `${dataGB} GB/mo`,
          lifetimeValue: ltv(arpu, tenure),
          engagementDimensions: ENG[segment],
          personaArchetype: PERSONAS[segment],
          journeyActivity: [
            {
              time: "2 days ago",
              icon: "wifi",
              text: `Data usage — ${dataGB} GB this month`,
            },
            {
              time: "1 week ago",
              icon: "credit-card",
              text: `Payment processed — ₹${arpu.toFixed(2)}`,
            },
            {
              time: "2 weeks ago",
              icon: "mail",
              text:
                strategy === "Retention"
                  ? "Retention campaign triggered"
                  : "Promotional email opened",
            },
          ],
          nextBestAction: NBA_OFFERS[strategy],
        } satisfies Customer
      },
    )
  })(),
]

export function getCustomer(id: string): Customer | undefined {
  return customers.find((c) => c.id === id)
}
