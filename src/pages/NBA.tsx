import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import {
  ArrowLeft,
  Zap,
  ChevronRight,
  TrendingUp,
  BarChart2,
  MessageSquare,
} from "lucide-react"
import Layout from "../components/Layout"
import { getCustomer, STRATEGY_STYLE } from "../data/customers"
import { derivePainPoints, deriveOffers } from "../data/derived"

const STAGES_NAV = [
  { key: "sense", label: "Sense", path: "identity" },
  { key: "decide", label: "Decide", path: "pain-points" },
  { key: "engage", label: "Engage", path: "content-studio" },
  { key: "optimize", label: "Optimize", path: "feedback" },
]


const DECIDE_TABS = [
  { key: "pain-points", label: "Pain Points & Recommended Offers", path: "pain-points" },
  { key: "nba", label: "Next Best Action", path: "nba" },
]

const DECISION_FACTORS: Record<string, {
  label: string
  score: number
  positive: boolean
  reason: string
  icon: string
}[]> = {
  "Cross-Sell": [
    {
      label: "Roaming Affinity",
      score: 91,
      positive: true,
      reason: "Frequent international roaming signals.",
      icon: "✈️",
    },
    {
      label: "Data Usage",
      score: 88,
      positive: true,
      reason: "High usage during travel.",
      icon: "📶",
    },
    {
      label: "Tenure",
      score: 78,
      positive: true,
      reason: "Long-standing loyal subscriber.",
      icon: "📅",
    },
    {
      label: "Bill Sensitivity",
      score: 72,
      positive: false,
      reason: "High spend but bill shock history.",
      icon: "⚠",
    },
  ],
}

const SEGMENT_ALT_OFFERS: Record<string, {
  name: string
  pct: number
  impact: string
  reason: string
}[]> = {
  "Loyal Family Accounts": [
    {
      name: "Smart Roaming Pack",
      pct: 76,
      impact: "+₹1,290/yr",
      reason: "Best-fit · travel intent",
    },
    {
      name: "Network Assurance Add-on",
      pct: 54,
      impact: "+₹620/yr",
      reason: "Cross-sell",
    },
    {
      name: "Bill Protection Plan",
      pct: 47,
      impact: "+₹430/yr",
      reason: "Upsell",
    },
  ],
  "Premium Data Explorers": [
    {
      name: "150 GB Premium Plus",
      pct: 64,
      impact: "+₹1,499/mo",
      reason: "High price point",
    },
    {
      name: "Device Upgrade Offer",
      pct: 51,
      impact: "+₹1,200/mo",
      reason: "Recently upgraded",
    },
    {
      name: "Cloud Storage Pack",
      pct: 40,
      impact: "+₹299/mo",
      reason: "Low intent",
    },
  ],
  "Younger Techies": [
    {
      name: "5G Max Plan Upgrade",
      pct: 66,
      impact: "+₹1,799/mo",
      reason: "Price sensitivity",
    },
    {
      name: "Music Streaming Bundle",
      pct: 48,
      impact: "+₹650/mo",
      reason: "Has competitor app",
    },
    {
      name: "Gaming Pass",
      pct: 42,
      impact: "+₹499/mo",
      reason: "Moderate gaming use",
    },
  ],
  "Android Sociables": [
    {
      name: "Social Boost Add-On",
      pct: 50,
      impact: "+₹650/mo",
      reason: "Sufficient current data",
    },
    {
      name: "Prepaid to Postpaid",
      pct: 38,
      impact: "+₹999/mo",
      reason: "Commitment averse",
    },
    {
      name: "Video Pass",
      pct: 35,
      impact: "+₹450/mo",
      reason: "Prefers social media",
    },
  ],
  "Frequent Travel Professionals": [
    {
      name: "Enterprise Roaming SLA",
      pct: 60,
      impact: "+₹2,800/mo",
      reason: "Employer paid typically",
    },
    {
      name: "Multi-Country Pass",
      pct: 46,
      impact: "+₹1,599/mo",
      reason: "Infrequent current travel",
    },
    {
      name: "Lounge Access Pack",
      pct: 30,
      impact: "+₹999/mo",
      reason: "Has via credit card",
    },
  ],
  "Early Life Subscribers": [
    {
      name: "Early Life Discount",
      pct: 58,
      impact: "Retain ₹2,999",
      reason: "Margin dilution",
    },
    {
      name: "Welcome Cashback",
      pct: 44,
      impact: "Retain ₹2,400",
      reason: "One-off cost",
    },
    {
      name: "Free Add-on Month",
      pct: 40,
      impact: "Retain ₹2,200",
      reason: "Low long-term value",
    },
  ],
  "Budget New Joiners": [
    {
      name: "Starter Data Bundle",
      pct: 44,
      impact: "Retain ₹2,200",
      reason: "Better alternatives",
    },
    {
      name: "Refer a Friend",
      pct: 32,
      impact: "+₹400 credit",
      reason: "Low social network size",
    },
    {
      name: "Weekend Data Pass",
      pct: 28,
      impact: "+₹150/mo",
      reason: "Low weekend usage",
    },
  ],
  "Silent Decliners": [
    {
      name: "Win-Back Incentive",
      pct: 38,
      impact: "Prevent ₹50k loss",
      reason: "High discount required",
    },
    {
      name: "Loyalty Re-Engage",
      pct: 28,
      impact: "+₹800/mo",
      reason: "Low probability",
    },
    {
      name: "Device Care Free",
      pct: 20,
      impact: "Retain ₹1,500",
      reason: "Unrelated to pain point",
    },
  ],
}

export default function NBA() {
  const { customerId } = useParams<{ customerId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const explorerSearch =
    (location.state as { explorerSearch?: string } | null)?.explorerSearch ?? ""
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const d = new Date()
    setCurrentTime(
      d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    )
  }, [])

  const customer = getCustomer(customerId ?? "")
  if (!customer)
    return (
      <Layout>
        <div className="p-8">
          <p style={{ color: "#6B7280" }}>Customer not found.</p>
        </div>
      </Layout>
    )

  // Replace ₹ with ₹ in nextBestAction revenueImpact (if any other symbol)
  const revImpact = customer.nextBestAction.revenueImpact.replace(/₹/g, "₹")

  const factors =
    DECISION_FACTORS[customer.strategy] ?? DECISION_FACTORS["Upsell"]
  const altOffers =
    SEGMENT_ALT_OFFERS[customer.segment] ??
    SEGMENT_ALT_OFFERS["Loyal Family Accounts"]
  const propensity = customer.nextBestAction.acceptancePct

  const gaugeData = [
    {
      name: "Propensity",
      value: propensity,
      fill:
        propensity >= 60 ? "#16A34A" : propensity >= 40 ? "#F59E0B" : "#B23A48",
    },
  ]

  return (
    <Layout>
      <div
        className="flex flex-col min-h-full"
        style={{ backgroundColor: "#F8F8FA" }}
      >
        <div className="p-4 md:p-6 flex-1 pb-40">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-3">
            <Link
              to={"/hub/" + customer.id + "/identity"}
              state={{ explorerSearch }}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "#7C3AED" }}
            >
              <ArrowLeft size={14} /> Back to Customer Identity
            </Link>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="flex items-center gap-5">
                {STAGES_NAV.map((s) => {
                  const isActive = s.key === "decide"
                  return (
                    <button
                      key={s.key}
                      onClick={() =>
                        navigate("/hub/" + customer.id + "/" + s.path, {
                          state: { explorerSearch },
                        })
                      }
                      className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70"
                      title={s.label}
                    >
                      <div
                        className="w-5 h-5 rounded-full"
                        style={
                          isActive
                            ? { background: "#7C3AED" }
                            : STAGES_NAV.findIndex((x) => x.key === s.key) <
                                STAGES_NAV.findIndex((x) => x.key === "decide")
                              ? { background: "#8B5CF6" }
                              : {
                                  background: "transparent",
                                  border: "2px solid #CBD5E1",
                                }
                        }
                      />
                      <span
                        className="text-[10px] font-medium whitespace-nowrap"
                        style={{
                          color: isActive
                            ? "#7C3AED"
                            : STAGES_NAV.findIndex((x) => x.key === s.key) <
                                STAGES_NAV.findIndex((x) => x.key === "decide")
                              ? "#8B5CF6"
                              : "#CBD5E1",
                        }}
                      >
                        {s.label}
                      </span>
                    </button>
                  )
                })}
              </div>
              <Link
                to={`/hub/${customer.id}/closed-loop`}
                state={{ explorerSearch }}
                className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full shadow-sm transition-all hover:shadow-md group cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                  color: "white",
                }}
              >
                <span className="text-[10px] font-bold text-white">
                  SPOG
                </span>
              </Link>
            </div>
          </div>

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-1.5 text-xs mb-4"
            style={{ color: "#9CA3AF" }}
          >
            <Link
              to={"/hub/" + customer.id + "/identity"}
              state={{ explorerSearch }}
              className="transition-colors hover:text-[#7C3AED]"
              style={{ color: "#6B7280" }}
            >
              Customer Identity
            </Link>
            <span>›</span>
            <span>Decide</span>
            <span>›</span>
            <span style={{ color: "#1F2937", fontWeight: 600 }}>
              Next Best Action
            </span>
          </div>

          <div
            className="flex items-center gap-1 mb-6 border-b"
            style={{ borderColor: "#E2E2E6" }}
          >
            {DECIDE_TABS.map((tab) => {
              const active = tab.key === "nba"
              return (
                <button
                  key={tab.key}
                  onClick={() =>
                    navigate("/hub/" + customer.id + "/" + tab.path, {
                      state: { explorerSearch },
                    })
                  }
                  className="px-4 py-2 text-xs font-semibold transition-colors"
                  style={
                    active
                      ? {
                          color: "#7C3AED",
                          borderBottom: `2px solid #7C3AED`,
                          marginBottom: -1,
                        }
                      : { color: "#6B7280" }
                  }
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* AI DECISION JOURNEY ROW */}
          <div
            className="flex items-center justify-between bg-white border rounded-lg p-3 mb-4 shadow-sm"
            style={{ borderColor: "#E2E2E6" }}
          >
            {[
              { icon: "📊", label: "Customer Signals" },
              { icon: "🧠", label: "Scoring Model" },
              { icon: "🏆", label: "Offer Ranking" },
              { icon: "📱", label: "Channel Selection" },
              { icon: "✍️", label: "Content Assignment" },
            ].map((node, i, arr) => (
              <div
                key={i}
                className="flex items-center gap-2 cursor-pointer group flex-1 justify-center last:justify-end first:justify-start"
              >
                <div className="flex items-center gap-1.5 transition-transform group-hover:scale-105">
                  <span className="text-lg">{node.icon}</span>
                  <span className="text-xs font-semibold text-gray-700">
                    {node.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <span className="text-gray-300 mx-1 ml-2">→</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-4 pb-6">
            <div className="col-span-12 lg:col-span-8 flex flex-col">
              {/* TOP RECOMMENDATION */}
              <div
                className="flex-1 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
                style={{
                  background:
                    "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC7A5C 100%)",
                }}
              >
                <div className="p-4 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-white/20">
                        <Zap size={14} className="text-white" />
                      </div>
                      <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider">
                        AI Recommendation
                      </span>
                      <span className="ml-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/10 text-white">
                        Top Recommendation
                      </span>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-white mb-1">
                        {customer.nextBestAction.offerName}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-white/80 text-xs font-medium">
                          {customer.strategy} Strategy
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/80 text-xs">
                          Frequent Traveller Journey (Dubai, Bangkok &
                          Singapore)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="rounded-lg p-3 bg-white/10 backdrop-blur-sm border border-white/5">
                      <div className="text-white/60 text-[10px] font-medium mb-0.5 uppercase tracking-wide">
                        Acceptance
                      </div>
                      <div className="text-white text-lg font-bold">
                        {propensity}%
                      </div>
                      <div className="text-white/50 text-[9px] mt-0.5">
                        Probability
                      </div>
                    </div>
                    <div className="rounded-lg p-3 bg-white/10 backdrop-blur-sm border border-white/5">
                      <div className="text-white/60 text-[10px] font-medium mb-0.5 uppercase tracking-wide">
                        Impact
                      </div>
                      <div className="text-white text-lg font-bold">
                        {revImpact}
                      </div>
                      <div className="text-white/50 text-[9px] mt-0.5">
                        Expected Rev
                      </div>
                    </div>
                    <div className="rounded-lg p-3 bg-white/10 backdrop-blur-sm border border-white/5">
                      <div className="text-white/60 text-[10px] font-medium mb-0.5 uppercase tracking-wide">
                        Priority
                      </div>
                      <div className="text-white text-lg font-bold">
                        {customer.nextBestAction.priority}
                      </div>
                      <div className="text-white/50 text-[9px] mt-0.5">
                        AI Level
                      </div>
                    </div>
                    <div className="rounded-lg p-3 bg-white/10 backdrop-blur-sm border border-white/5">
                      <div className="text-white/60 text-[10px] font-medium mb-0.5 uppercase tracking-wide">
                        Confidence
                      </div>
                      <div className="text-white text-lg font-bold">92%</div>
                      <div className="text-white/50 text-[9px] mt-0.5">
                        Model Score
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              {/* PROPENSITY SCORE */}
              <div
                className="flex-1 rounded-xl border bg-white p-4 shadow-sm flex flex-col items-center justify-center"
                style={{ borderColor: "#E2E2E6" }}
              >
                <div className="w-full text-left">
                  <h3 className="text-xs font-bold text-gray-900 mb-0.5">
                    Propensity Score
                  </h3>
                  <p className="text-[10px] text-gray-500 mb-3">
                    ML-predicted acceptance likelihood
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div
                    className="relative flex items-center justify-center mb-2"
                    style={{ width: 100, height: 100 }}
                  >
                    <svg
                      className="absolute inset-0"
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      style={{ transform: "rotate(-90deg)" }}
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#F3F4F6"
                        strokeWidth="10"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke={gaugeData[0].fill}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 42}
                        strokeDashoffset={
                          2 * Math.PI * 42 * (1 - propensity / 100)
                        }
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">
                        {propensity}%
                      </span>
                    </div>
                  </div>
                  <div
                    className="text-xs font-bold mb-1"
                    style={{ color: gaugeData[0].fill }}
                  >
                    {propensity >= 60
                      ? "High Confidence"
                      : propensity >= 40
                        ? "Moderate Confidence"
                        : "Low Confidence"}
                  </div>
                  <div className="text-[10px] text-gray-500 text-center leading-tight">
                    Predicted Conversion:
                    <br />
                    <span className="font-medium text-gray-700">
                      1 in 4 convert
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8 flex flex-col">
              {/* ML DECISION FACTORS */}
              <div
                className="flex-1 rounded-xl border bg-white p-4 shadow-sm"
                style={{ borderColor: "#E2E2E6" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 size={14} style={{ color: "#7C3AED" }} />
                  <h3 className="text-sm font-bold text-gray-900">
                    ML Decision Factors
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {factors.map((f, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="text-xl mt-0.5">{f.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-gray-800">
                            {f.label}
                          </span>
                          <span
                            className="text-xs font-bold"
                            style={{
                              color: f.positive ? "#16A34A" : "#F59E0B",
                            }}
                          >
                            {f.score}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden bg-gray-100 mb-1">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: f.score + "%",
                              background: f.positive ? "#16A34A" : "#F59E0B",
                            }}
                          />
                        </div>
                        <div className="text-[10px] text-gray-500 leading-tight">
                          <span className="font-medium text-gray-700">
                            Reason:
                          </span>{" "}
                          {f.reason}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col">
              {/* SIGNAL SUMMARY */}
              <div
                className="flex-1 rounded-xl border bg-white p-4 shadow-sm"
                style={{ borderColor: "#E2E2E6" }}
              >
                <h3 className="text-sm font-bold text-gray-900 mb-3">
                  Signal Summary
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    
                    { label: "Strategy", value: customer.strategy, icon: "🎯" },
                    {
                      label: "Risk",
                      value: customer.risk.toFixed(2),
                      icon: "🛡️",
                    },
                    {
                      label: "ARPU",
                      value: "₹" + customer.arpu.toLocaleString("en-IN"),
                      icon: "💰",
                    }
            
                  ].map(({ label, value, icon }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{icon}</span>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {label}
                        </span>
                      </div>
                      <span
                        className="text-[11px] font-bold text-gray-900 text-right max-w-[140px] truncate"
                        title={value}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-12 flex flex-col">
              {/* OFFER RANKING & ALTERNATIVES */}
              <div
                className="flex-1 rounded-xl border bg-white p-4 shadow-sm"
                style={{ borderColor: "#E2E2E6" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} style={{ color: "#7C3AED" }} />
                    <h3 className="text-sm font-bold text-gray-900">
                      Offer Rankings & Alternatives
                    </h3>
                  </div>
                  <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    Top 3 Evaluated
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {altOffers.slice(0, 3).map((o, i) => (
                    <div
                      key={i}
                      className="border border-gray-100 rounded-lg p-3 bg-gray-50 flex flex-col justify-between"
                    >
                      <div>
                        <div
                          className="font-bold text-gray-800 text-xs mb-0.5 truncate"
                          title={o.name}
                        >
                          {o.name}
                        </div>
                        <div
                          className="text-[9px] text-gray-500 mb-3 truncate"
                          title={o.reason}
                        >
                          {o.reason}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-gray-600 font-medium">
                            Acceptance
                          </span>
                          <span className="text-[10px] font-bold text-gray-900">
                            {o.pct}%
                          </span>
                        </div>
                        <div className="h-1 rounded-full bg-gray-200 mb-3">
                          <div
                            className="h-full rounded-full bg-[#7C3AED]/40"
                            style={{ width: `${o.pct}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-200/60">
                          <span className="text-[9px] uppercase font-bold tracking-wider text-gray-400">
                            Impact
                          </span>
                          <span className="text-[11px] font-bold text-green-700">
                            {o.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 self-start">
              <div
                className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-4"
                style={{ borderColor: "#E2E2E6" }}
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">
                    Recommended Channel
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded bg-green-50 text-green-600 flex items-center justify-center border border-green-100 shrink-0">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-sm font-bold text-gray-900 leading-none">
                          WhatsApp
                        </span>
                        <span className="bg-green-100 text-green-700 text-[8px] font-bold px-1 py-0.5 rounded">
                          Primary
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-500">
                        Score:{" "}
                        <span className="font-bold text-gray-900">0.86</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-700 space-y-1 font-medium mb-3">
                    <div className="flex gap-1.5">
                      <span className="text-[#16A34A]">•</span> Highest
                      engagement
                    </div>
                    <div className="flex gap-1.5">
                      <span className="text-[#16A34A]">•</span> Preferred
                      channel
                    </div>
                    <div className="flex gap-1.5">
                      <span className="text-[#16A34A]">•</span> Strong campaign
                      history
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 pt-2 border-t border-gray-100">
                  <span className="font-medium">Alts:</span>
                  <div className="flex gap-1">
                    <span className="font-medium text-gray-700">SMS</span>
                    <span className="text-gray-300">|</span>
                    <span className="font-medium text-gray-700">App Push</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 self-start">
              <div
                className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-4"
                style={{ borderColor: "#E2E2E6" }}
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">
                    Content Assignment
                  </h3>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-3">
                    <div>
                      <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                        Language
                      </div>
                      <div className="text-xs font-bold text-gray-900">
                        English
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                        Tone
                      </div>
                      <div className="text-xs font-bold text-gray-900">
                        Warm + Benefit
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                        Personalization
                      </div>
                      <div className="text-xs font-bold text-gray-900">
                        High
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                        Expected CTR
                      </div>
                      <div className="text-xs font-bold text-[#16A34A]">
                        12.6%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                    Strategy Theme
                  </div>
                  <div className="text-xs font-bold text-gray-900">
                    {customer.strategy} Growth
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 self-start">
              <div
                className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-4"
                style={{ borderColor: "#E2E2E6" }}
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">
                    Approval Panel
                  </h3>
                  <div className="space-y-2 mb-4 text-[11px]">
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="text-gray-500 font-medium">
                        Offer Value:
                      </span>
                      <span className="font-bold text-gray-900">
                        {revImpact}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="text-gray-500 font-medium">
                        Acceptance Prob:
                      </span>
                      <span className="font-bold text-[#16A34A]">
                        {propensity}%
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="text-gray-500 font-medium">
                        Channel:
                      </span>
                      <span className="font-bold text-gray-900">WhatsApp</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate("/hub/" + customer.id + "/content-studio", {
                      state: { explorerSearch },
                    })
                  }
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 flex items-center justify-center gap-1.5 shadow-md"
                  style={{ background: "#7C3AED" }}
                >
                  Approve <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* INTELLIGENT FOOTER BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
            <div className="flex-1 flex items-center justify-center gap-1.5">
              <span className="text-base">🕒</span>
              <div>
                <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                  Decision Time
                </div>
                <div className="text-[11px] font-bold text-gray-900">
                  {currentTime}
                </div>
              </div>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>

            <div className="flex-1 flex items-center justify-center gap-1.5">
              <span className="text-base">👨‍👩‍👧‍👦</span>
              <div>
                <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                  Segment
                </div>
                <div className="text-[11px] font-bold text-gray-900 truncate max-w-[120px]">
                  {customer.segment}
                </div>
              </div>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>

            <div className="flex-1 flex items-center justify-center gap-1.5">
              <span className="text-base">🛡️</span>
              <div>
                <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                  Risk Band
                </div>
                <div
                  className="text-[11px] font-bold"
                  style={{ color: customer.risk > 0.5 ? "#B23A48" : "#16A34A" }}
                >
                  {customer.risk > 0.5 ? "High" : "Low"}
                </div>
              </div>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>

            <div className="flex-1 flex items-center justify-center gap-1.5">
              <span className="text-base">📅</span>
              <div>
                <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                  Window
                </div>
                <div className="text-[11px] font-bold text-gray-900">
                  Next 24 Hrs
                </div>
              </div>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>

            <div className="flex-1 flex items-center justify-center gap-1.5">
              <span className="text-base text-gray-700 font-bold">₹</span>
              <div>
                <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                  Expected Rev
                </div>
                <div className="text-[11px] font-bold text-green-700">
                  {revImpact}
                </div>
              </div>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>

            <div className="flex-1 flex items-center justify-center gap-1.5">
              <span className="text-base">🧠</span>
              <div>
                <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                  Confidence
                </div>
                <div className="text-[11px] font-bold text-gray-900">92%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
