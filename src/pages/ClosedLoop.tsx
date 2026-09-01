import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import {
  ArrowLeft,
  Wifi,
  Video,
  Plane,
  CreditCard,
  Users,
  AlertCircle,
  BrainCircuit,
  Target,
  BarChart,
  Gift,
  ArrowRight,
  Sparkles,
  MapPin,
  Smartphone,
  Calendar,
  IndianRupee,
  Share,
  Download,
  Save,
  Check,
  ChevronRight,
  Activity,
  Award,
  Clock,
} from "lucide-react"
import Layout from "../components/Layout"
import { getCustomer } from "../data/customers"

const STAGES_NAV = [
  { key: "sense", label: "Sense", path: "identity" },
  { key: "decide", label: "Decide", path: "pain-points" },
  { key: "engage", label: "Engage", path: "content-studio" },
  { key: "optimize", label: "Optimize", path: "feedback" },
]

export default function ClosedLoop() {
  const { customerId } = useParams<{ customerId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const explorerSearch =
    (location.state as { explorerSearch?: string } | null)?.explorerSearch ?? ""

  // Fallback to Rohan Mehta if no customer matches exactly
  const fallbackCustomer = {
    id: "SUB-10001",
    name: "Rohan Mehta",
    initials: "RM",
    segment: "Loyal Family Accounts",
    region: "Mumbai (MH)",
    tenure: 78,
    arpu: 1699,
    device: "Samsung Galaxy S24",
    planType: "Prepaid Individual",
    lifetimeValue: "₹1.33L",
  }

  const customer = getCustomer(customerId ?? "") || fallbackCustomer

  const go = (path: string) =>
    navigate(`/hub/${customer.id}/${path}`, { state: { explorerSearch } })

  return (
    <Layout>
      <div className="min-h-screen flex flex-col text-gray-800 font-sans">
        <div className="flex-1 p-4 max-w-[1600px] w-full mx-auto flex flex-col gap-3">
          {/* HEADER & NAV */}
          <div className="flex items-center justify-between shrink-0 mb-1 border-0">
            <div className="flex items-center gap-4">
              <Link
                to={"/hub/" + customer.id + "/identity"}
                state={{ explorerSearch }}
                className="text-xs font-semibold hover:opacity-70 transition-opacity flex items-center gap-1"
                style={{ color: "#7C3AED" }}
              >
                <ArrowLeft size={14} /> Back to Customer Identity
              </Link>
              <div className="text-xs font-medium text-gray-400">
                Customer Identity <ChevronRight size={12} className="inline" />{" "}
                Optimize <ChevronRight size={12} className="inline" />{" "}
                <span className="text-gray-700 font-bold">
                  Closed-Loop Summary
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center relative">
                <div className="absolute left-4 right-4 h-[2px] bg-gray-200 z-0 top-1/2 -translate-y-1/2"></div>
                {STAGES_NAV.map((s) => {
                  const isActive = s.key === "optimize"
                  const isPast = true
                  return (
                    <button
                      key={s.key}
                      onClick={() => go(s.path)}
                      className="relative z-10 flex flex-col items-center gap-1 w-16 group"
                      title={s.label}
                    >
                      <div
                        className="w-4 h-4 rounded-full transition-colors"
                        style={{
                          border: isActive
                            ? "none"
                            : isPast
                              ? "none"
                              : "2px solid #CBD5E1",
                          background: isActive
                            ? "#7C3AED"
                            : isPast
                              ? "#8B5CF6"
                              : "transparent",
                        }}
                      />
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider"
                        style={{
                          color: isActive
                            ? "#7C3AED"
                            : STAGES_NAV.findIndex((x) => x.key === s.key) <
                                STAGES_NAV.findIndex((x) => x.key === "optimize")
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
              <div className="flex items-center gap-2 text-gray-500 border-l border-gray-300 pl-4">
                <button className="p-1 hover:text-gray-800">
                  <Save size={16} />
                </button>
                <button className="p-1 hover:text-gray-800">
                  <Download size={16} />
                </button>
                <button className="p-1 hover:text-gray-800">
                  <Share size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* ROW 1: SNAPSHOT | HEALTH | AI SUMMARY */}
          <div className="grid grid-cols-12 gap-3 shrink-0">
            {/* Snapshot */}
            <div className="col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-center">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white bg-[#7C3AED] shrink-0 relative">
                  {customer.initials}
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5 border-2 border-white">
                    <Check size={10} strokeWidth={4} />
                  </div>
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    {customer.name}
                  </h2>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                      Premium Family
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700">
                      High Value
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">
                      Medium Churn
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-50 text-orange-700">
                      OTT Enthusiast
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-[10px] text-gray-600">
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-gray-400" />{" "}
                  {customer.region}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-gray-400" />{" "}
                  {customer.tenure} Months Tenure
                </div>
                <div className="flex items-center gap-1.5">
                  <Smartphone size={12} className="text-gray-400" />{" "}
                  {customer.device}
                </div>
                <div className="flex items-center gap-1.5">
                  <Award size={12} className="text-gray-400" />{" "}
                  {customer.planType}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={12} className="text-gray-400" /> 3 Family Members
                </div>
                <div className="flex items-center gap-1.5">
                  <IndianRupee size={12} className="text-gray-400" /> ₹
                  {customer.arpu.toLocaleString("en-IN")} ARPU
                </div>
              </div>
            </div>

            {/* Health Score */}
            <div className="col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center justify-center text-center">
              <div className="relative w-20 h-20 mb-2">
                <svg
                  viewBox="0 0 36 36"
                  className="w-full h-full transform -rotate-90"
                >
                  <path
                    className="text-gray-100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    stroke="#16A34A"
                    strokeWidth="4"
                    strokeDasharray="91, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-gray-900 leading-none">
                    91
                  </span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase">
                    / 100
                  </span>
                </div>
              </div>
              <div className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                Healthy
              </div>
              <div className="text-[10px] text-gray-500">
                Strong relationship and high lifetime value.
              </div>
            </div>

            {/* AI Summary */}
            <div className="col-span-5 bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative flex flex-col">
              <div className="absolute top-4 right-4 bg-purple-100 text-purple-800 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles size={10} /> AI Generated
              </div>
              <h3 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                AI Executive Summary
              </h3>
              <p className="text-[11px] leading-relaxed text-gray-700 flex-1">
                Customer shows{" "}
                <strong className="text-gray-900">
                  frequent international travel patterns
                </strong>{" "}
                with high data consumption and network quality issues.{" "}
                <strong className="text-gray-900">
                  Payment reliability is perfect
                </strong>{" "}
                and loyalty indicators are strong. Customer represents a{" "}
                <strong className="text-green-700">
                  high-confidence cross-sell candidate
                </strong>{" "}
                for the Smart Roaming Pack.
              </p>
              <button
                onClick={() => go("identity")}
                className="text-[11px] font-bold text-[#7C3AED] self-start mt-2 hover:underline"
              >
                View Customer Identity →
              </button>
            </div>
          </div>

          {/* ROW 2: BEHAVIOUR SIGNALS */}
          <div className="shrink-0 flex flex-col gap-2">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
              Key Behaviour Signals
            </h3>
            <div className="grid grid-cols-6 gap-3">
              {[
                {
                  label: "Data Usage",
                  icon: Wifi,
                  value: "79 GB/mo",
                  sub: "Very High Data Value",
                  bg: "bg-blue-50",
                  text: "text-blue-700",
                  border: "border-blue-100",
                  path: "usage",
                },
                {
                  label: "Streaming Share",
                  icon: Video,
                  value: "85%",
                  sub: "of total usage",
                  bg: "bg-purple-50",
                  text: "text-purple-700",
                  border: "border-purple-100",
                  path: "usage",
                },
                {
                  label: "Travel Score",
                  icon: Plane,
                  value: "78",
                  sub: "International Roamer",
                  bg: "bg-orange-50",
                  text: "text-orange-700",
                  border: "border-orange-100",
                  path: "travel",
                },
                {
                  label: "Payment Reliability",
                  icon: CreditCard,
                  value: "100%",
                  sub: "Excellent Record",
                  bg: "bg-green-50",
                  text: "text-green-700",
                  border: "border-green-100",
                  path: "payments",
                },
                {
                  label: "Engagement Level",
                  icon: Activity,
                  value: "High",
                  sub: "Above Segment Avg",
                  bg: "bg-red-50",
                  text: "text-red-700",
                  border: "border-red-100",
                  path: "content-studio",
                },
                {
                  label: "Household Members",
                  icon: Users,
                  value: "3",
                  sub: "2 Dependents",
                  bg: "bg-indigo-50",
                  text: "text-indigo-700",
                  border: "border-indigo-100",
                  path: "",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  onClick={s.path ? () => go(s.path) : undefined}
                  className={`rounded-xl border ${s.border} bg-white p-3 flex flex-col shadow-sm relative overflow-hidden ${
                    s.path
                      ? "cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
                      : ""
                  }`}
                >
                  <div
                    className={`absolute top-0 right-0 w-12 h-12 rounded-bl-full opacity-20 ${s.bg}`}
                  ></div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-md ${s.bg} ${s.text}`}>
                      <s.icon size={12} />
                    </div>
                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">
                      {s.label}
                    </div>
                  </div>
                  <div className="text-lg font-black text-gray-900 leading-tight">
                    {s.value}
                  </div>
                  <div className="text-[9px] font-semibold text-gray-500 mt-0.5">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROW 3: PAIN POINTS | AI REASONING | NBA */}
          <div className="grid grid-cols-12 gap-3 shrink-0">
            {/* Top Pain Points — click to Decide > Pain Points */}
            <div
              onClick={() => go("pain-points")}
              className="col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Top Pain Points
                </h3>
                <ArrowRight size={12} className="text-gray-400" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border border-red-100">
                  <AlertCircle size={14} className="text-red-600 shrink-0" />
                  <div className="text-xs font-bold text-gray-900 flex-1">
                    High Data Usage During Travel
                  </div>
                  <div className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-800 uppercase">
                    High
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border border-red-100">
                  <Activity size={14} className="text-red-600 shrink-0" />
                  <div className="text-xs font-bold text-gray-900 flex-1">
                    Bill Shock After Roaming
                  </div>
                  <div className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-800 uppercase">
                    High
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 border border-orange-100">
                  <Plane size={14} className="text-orange-600 shrink-0" />
                  <div className="text-xs font-bold text-gray-900 flex-1">
                    Network Speed Inconsistency
                  </div>
                  <div className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 uppercase">
                    Medium
                  </div>
                </div>
              </div>
            </div>

            {/* AI Reasoning Flow */}
            <div className="col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                AI Reasoning Flow
              </h3>
              <div className="flex items-center justify-between flex-1 relative px-2">
                <div className="absolute left-6 right-6 h-0.5 bg-gray-100 top-[26px] z-0"></div>
                {[
                  { icon: Activity, label: "Customer Behaviour Analysed" },
                  { icon: Users, label: "Pattern Similarity Matched" },
                  { icon: BrainCircuit, label: "Propensity Model Scored" },
                  { icon: Target, label: "Best Action Selected" },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 relative z-10 w-16"
                  >
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center text-purple-700 shadow-sm">
                      <step.icon size={12} />
                    </div>
                    <div className="text-[8px] font-bold text-center leading-tight text-gray-600">
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended NBA — click to Decide > NBA Engine */}
            <div
              onClick={() => go("nba")}
              className="col-span-4 bg-[#7C3AED] text-white rounded-xl shadow-sm border border-[#4F46E5] p-4 flex flex-col relative overflow-hidden cursor-pointer hover:shadow-lg hover:brightness-105 transition-all"
            >
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Gift size={100} />
              </div>
              <div className="flex items-center justify-between mb-2 relative z-10">
                <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest">
                  Recommended Next Best Action
                </h3>
                <ArrowRight size={14} className="text-white/70" />
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-white/20 rounded text-white shrink-0">
                  <Gift size={20} />
                </div>
                <div className="text-lg font-bold leading-tight">
                  Smart Roaming Pack <br />
                  <span className="font-medium text-white/90 text-sm">
                    — Travel Affinity Match
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 flex-1 items-end relative z-10">
                <div>
                  <div className="text-[10px] text-white/70 font-bold uppercase mb-1">
                    Acceptance Prob.
                  </div>
                  <div className="text-2xl font-black text-green-300">74%</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/70 font-bold uppercase mb-1">
                    Est. Revenue Impact
                  </div>
                  <div className="text-2xl font-black text-green-300">₹649</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/70 font-bold uppercase mb-1">
                    Strategy
                  </div>
                  <div className="inline-block px-3 py-1 bg-white/20 rounded font-bold text-xs mt-0.5">
                    Cross-Sell
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 4: WHY THIS OFFER | BUSINESS IMPACT */}
          <div className="grid grid-cols-12 gap-3 shrink-0">
            <div className="col-span-8 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between">
              <div className="flex gap-4 h-full">
                <div className="w-1/2 border-r border-gray-100 pr-4">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Why This Offer?
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {[
                      "High data usage during travel detected",
                      "Past bill shock events from roaming",
                      "Inconsistent network speed reported",
                      "Similar customers show 74% acceptance",
                      "Strong potential for travel cross-sell",
                    ].map((t, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-gray-700 font-semibold"
                      >
                        <Check
                          size={14}
                          className="text-green-600 shrink-0 mt-0.5"
                          strokeWidth={3}
                        />{" "}
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-1/2 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="p-2 rounded bg-gray-50 border border-gray-100">
                      <div className="text-[9px] font-bold text-gray-500 uppercase mb-1">
                        Preferred Channel
                      </div>
                      <div className="text-xs font-bold text-gray-900">
                        WhatsApp
                      </div>
                      <div className="text-[8px] text-gray-500 font-semibold mt-0.5">
                        86% Effectiveness (Primary)
                      </div>
                    </div>
                    <div className="p-2 rounded bg-gray-50 border border-gray-100">
                      <div className="text-[9px] font-bold text-gray-500 uppercase mb-1">
                        Language
                      </div>
                      <div className="text-xs font-bold text-gray-900">
                        English
                      </div>
                      <div className="text-[8px] text-gray-500 font-semibold mt-0.5">
                        Preferred Language
                      </div>
                    </div>
                    <div className="p-2 rounded bg-gray-50 border border-gray-100">
                      <div className="text-[9px] font-bold text-gray-500 uppercase mb-1">
                        Message Strategy
                      </div>
                      <div className="text-xs font-bold text-gray-900">
                        Warm + Benefit Led
                      </div>
                      <div className="text-[8px] text-gray-500 font-semibold mt-0.5">
                        High Engagement Fit
                      </div>
                    </div>
                    <div className="p-2 rounded bg-blue-50 border border-blue-100">
                      <div className="text-[9px] font-bold text-blue-800 uppercase mb-1">
                        Headline Preview
                      </div>
                      <div className="text-[10px] font-bold text-blue-900 italic leading-tight">
                        "Stay Connected, Avoid Bill Shock"
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => go("content-studio")}
                    className="text-xs font-bold text-[#7C3AED] flex items-center gap-1 hover:underline justify-end w-full cursor-pointer"
                  >
                    Preview Message <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                Business Impact Forecast
              </h3>
              <div className="flex flex-col gap-2.5 flex-1 justify-center">
                <div className="flex items-center justify-between text-xs">
                  <div className="font-semibold text-gray-600">ARPU</div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through">
                      ₹{customer.arpu.toLocaleString("en-IN")}
                    </span>
                    <span className="font-bold text-gray-900">₹2,348</span>
                    <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1 py-0.5 rounded">
                      ▲38%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="font-semibold text-gray-600">LTV</div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through">
                      {customer.lifetimeValue}
                    </span>
                    <span className="font-bold text-gray-900">₹1.61L</span>
                    <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1 py-0.5 rounded">
                      ▲21%
                    </span>
                  </div>
                </div>
                <div className="h-px bg-gray-100 my-1"></div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-green-50 rounded p-1.5 border border-green-100">
                    <div className="text-[9px] font-bold text-green-800 uppercase mb-0.5">
                      Retention Impact
                    </div>
                    <div className="text-sm font-black text-green-700">
                      +17%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded p-1.5 border border-gray-100">
                    <div className="text-[9px] font-bold text-gray-500 uppercase mb-0.5">
                      Acceptance Prob.
                    </div>
                    <div className="text-sm font-black text-gray-900">74%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 5: ENGAGEMENT JOURNEY */}
          <div className="shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between gap-6">
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Engagement Journey
              </h3>
              <div className="flex items-center relative w-full px-3">
                <div className="absolute left-6 right-6 h-[3px] bg-green-500 top-2.5 z-0"></div>
                <div className="flex items-center justify-between w-full relative z-10">
                  {[
                    { l: "Sent", t: "10:01 AM" },
                    { l: "Delivered", t: "10:02 AM" },
                    { l: "Opened", t: "10:15 AM" },
                    { l: "Clicked", t: "10:25 AM" },
                    { l: "Activated", t: "10:30 AM" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center relative h-11 w-8"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white border-2 border-white shadow-sm relative z-10">
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <div className="absolute top-6 flex flex-col items-center w-24 text-center left-1/2 -translate-x-1/2">
                        <div className="text-[9px] font-bold text-gray-900 leading-none mb-0.5">
                          {s.l}
                        </div>
                        <div className="text-[8px] font-semibold text-gray-500">
                          {s.t}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-green-50 border border-green-200 p-3 rounded-lg shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Clock size={20} />
              </div>
              <div>
                <div className="text-sm font-black text-green-800">
                  Converted in 29 Minutes
                </div>
                <div className="text-[10px] font-bold text-green-700">
                  Fast response!
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SUMMARY BAR */}
          <div className="shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex justify-between items-center mt-auto divide-x divide-gray-100">
            {[
              {
                icon: IndianRupee,
                label: "Revenue Captured",
                val: "₹649",
                sub: "Actual value",
                valColor: "text-green-600",
              },
              {
                icon: AlertCircle,
                label: "Churn Rate",
                val: "61% → 44%",
                sub: "Reduction",
                valColor: "text-green-600",
              },
              {
                icon: Target,
                label: "Model Accuracy",
                val: "78% → 83%",
                sub: "Improvement",
              },
              {
                icon: BarChart,
                label: "Channel CTR",
                val: "12% → 31%",
                sub: "WhatsApp",
              },
              {
                icon: Clock,
                label: "Time to Convert",
                val: "29 min",
                sub: "Avg response",
              },
              {
                icon: Gift,
                label: "Recommendation",
                val: "Smart Roaming Pack",
                sub: "Cross-Sell Strategy",
                valColor: "text-[#7C3AED]",
              },
            ].map((m, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center text-center px-1"
              >
                <m.icon size={14} className="text-gray-400 mb-1" />
                <div
                  className={`text-xs font-black leading-tight ${m.valColor || "text-gray-900"}`}
                >
                  {m.val}
                </div>
                <div className="text-[8px] font-bold text-gray-500 uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-[7px] text-gray-400 mt-0.5">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
