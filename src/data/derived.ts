import type { Customer, Strategy } from "./customers"

export interface RechargeMonth {
  month: string
  amount: number
  onTime: boolean
}

export interface PainPoint {
  id: string
  title: string
  description: string
  severity: "CRITICAL" | "HIGH" | "MEDIUM"
}

export interface DerivedOffer {
  id: string
  title: string
  strategy: string
  likelihoodPct: number
  estValue: string
  bestMatch: boolean
  painPointIds: string[]
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

// Current month: August 2026 (index 7). Show 6 months: Mar–Aug.
export function deriveRechargeHistory(customer: Customer): RechargeMonth[] {
  const seed = parseInt(customer.id.replace("SUB-", ""), 10)
  return Array.from({ length: 6 }, (_, idx) => {
    const monthIndex = (2 + idx) % 12 // Mar=2 ... Aug=7
    const varFactor = ((seed * 7 + idx * 13) % 31) - 15 // -15..+15
    const amount = Math.round(customer.arpu * (1 + varFactor / 100) * 10) / 10
    const lateProb = customer.risk * 0.45
    const roll = ((seed * 3 + idx * 17 + 7) % 100) / 100
    return { month: MONTH_LABELS[monthIndex], amount, onTime: roll >= lateProb }
  })
}

const PP_BY_SEGMENT: Record<string, {
  title: string
  description: string
  severity: PainPoint["severity"]
}[]> = {
  "Silent Decliners": [
    {
      title: "Severe Engagement Drop",
      description:
        "App sessions and data usage have declined over 60% across the last 90 days.",
      severity: "CRITICAL",
    },
    {
      title: "Zero Campaign Response",
      description:
        "Three consecutive promotional campaigns triggered no open, click, or engagement.",
      severity: "HIGH",
    },
    {
      title: "Competitor Signal Detected",
      description:
        "Device recently queried a rival carrier provisioning endpoint twice this week.",
      severity: "CRITICAL",
    },
  ],
  "Early Life Subscribers": [
    {
      title: "Poor Onboarding Completion",
      description:
        "First-use setup wizard was abandoned at step 2 — app remains unconfigured.",
      severity: "HIGH",
    },
    {
      title: "Unread Welcome Comms",
      description:
        "Welcome email and SMS series show zero open or click-through events.",
      severity: "MEDIUM",
    },
    {
      title: "Early Churn Flag Raised",
      description:
        "ML propensity model assigns >0.60 churn probability within the first 30 days.",
      severity: "CRITICAL",
    },
  ],
  "Budget New Joiners": [
    {
      title: "Data Depletion Risk",
      description:
        "Usage patterns indicate the data bundle will exhaust 10 days before cycle end.",
      severity: "HIGH",
    },
    {
      title: "Top-Up Friction",
      description:
        "Three failed top-up attempts recorded within the current billing cycle.",
      severity: "HIGH",
    },
    {
      title: "Price Sensitivity Signal",
      description:
        "Customer visited a competitor price-comparison page twice in the last 7 days.",
      severity: "MEDIUM",
    },
  ],
  "Loyal Family Accounts": [
    {
      title: "Family Data Cap Approaching",
      description:
        "Pooled household data is 82% consumed with 12 days remaining in the cycle.",
      severity: "HIGH",
    },
    {
      title: "Secondary Line Overuse",
      description:
        "One secondary account is consuming 40% above their allocated data share.",
      severity: "MEDIUM",
    },
  ],
  "Premium Data Explorers": [
    {
      title: "Repeated Data Cap Hits",
      description:
        "Customer has exceeded their monthly data allowance three consecutive months.",
      severity: "CRITICAL",
    },
    {
      title: "Streaming Quality Degradation",
      description:
        "App telemetry shows repeated quality downgrade events during peak viewing hours.",
      severity: "HIGH",
    },
  ],
  "Younger Techies": [
    {
      title: "Device Upgrade Overdue",
      description:
        "Current handset is two hardware generations behind; upgrade-intent signals detected.",
      severity: "MEDIUM",
    },
    {
      title: "5G Coverage Gap",
      description:
        "Customer reported intermittent 5G dropout in their registered home postcode.",
      severity: "HIGH",
    },
  ],
  "Android Sociables": [
    {
      title: "Social Data Running Low",
      description:
        "TikTok and Instagram usage is exceeding the plan allocation by roughly 30%.",
      severity: "HIGH",
    },
    {
      title: "Inconsistent Top-Up Behaviour",
      description:
        "Two of the last six months showed delayed recharge events after data ran out.",
      severity: "MEDIUM",
    },
  ],
  "Frequent Travel Professionals": [
    {
      title: "Roaming Cost Shock",
      description:
        "Last month's roaming bill was 3× the rolling average, triggering a support call.",
      severity: "CRITICAL",
    },
    {
      title: "International Data Cap Reached",
      description:
        "Customer hit the roaming data cap on two of the last three overseas trips.",
      severity: "HIGH",
    },
    {
      title: "No Business Roaming Agreement",
      description:
        "No enterprise roaming SLA in place despite a clear monthly international pattern.",
      severity: "MEDIUM",
    },
  ],
}

const OFFER_TEMPLATES: Record<Strategy, {
  title: string
  strategyLabel: string
  baseLikelihood: number
  estValue: string
  ppIdx: number[]
}[]> = {
  Upsell: [
    {
      title: "Premium Plan Upgrade",
      strategyLabel: "UPSELL",
      baseLikelihood: 72,
      estValue: "+₹20/mo",
      ppIdx: [0],
    },
    {
      title: "Unlimited Data Add-On",
      strategyLabel: "UPSELL",
      baseLikelihood: 58,
      estValue: "+₹12/mo",
      ppIdx: [0, 1],
    },
  ],
  "Cross-Sell": [
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
  ],
  Retention: [
    {
      title: "Loyalty Retention Offer",
      strategyLabel: "RETENTION",
      baseLikelihood: 61,
      estValue: "Retain ARR",
      ppIdx: [0, 2],
    },
    {
      title: "Early Life Onboarding Reward",
      strategyLabel: "RETENTION",
      baseLikelihood: 48,
      estValue: "Retain base",
      ppIdx: [1],
    },
  ],
  "Win-Back": [
    {
      title: "Win-Back Incentive Pack",
      strategyLabel: "RETENTION",
      baseLikelihood: 42,
      estValue: "Prevent loss",
      ppIdx: [0, 1],
    },
    {
      title: "Loyalty Re-Engagement Offer",
      strategyLabel: "UPSELL",
      baseLikelihood: 35,
      estValue: "+₹10/mo",
      ppIdx: [2],
    },
  ],
}

export function derivePainPoints(customer: Customer): PainPoint[] {
  const templates =
    PP_BY_SEGMENT[customer.segment] ?? PP_BY_SEGMENT["Silent Decliners"]
  const count = customer.risk >= 0.6 ? templates.length : 2
  return templates.slice(0, count).map((t, i) => ({ id: `pp-${i}`, ...t }))
}

export function deriveOffers(
  customer: Customer,
  painPoints: PainPoint[],
): DerivedOffer[] {
  const templates =
    OFFER_TEMPLATES[customer.strategy] ?? OFFER_TEMPLATES["Upsell"]
  const primaryOffer = customer.nextBestAction.offerName
  return templates.map((t, i) => ({
    id: `offer-${i}`,
    title: i === 0 ? primaryOffer : t.title,
    strategy: t.strategyLabel,
    likelihoodPct: t.baseLikelihood,
    estValue: t.estValue,
    bestMatch: i === 0,
    painPointIds: t.ppIdx
      .filter((idx) => idx < painPoints.length)
      .map((idx) => `pp-${idx}`),
  }))
}
