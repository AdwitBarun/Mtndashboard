import { useState } from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import {
  ArrowLeft,
  Database,
  Brain,
  FlaskConical,
  ShieldCheck,
  Target,
  Trophy,
  TrendingUp,
  Plane,
  Tv,
  Users,
  CreditCard,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Shield,
  Gamepad2,
  CheckCircle2,
  Radar,
  Cpu,
  Send,
  Eye,
  CalendarClock,
  MessageSquare,
} from "lucide-react"
import Layout from "../components/Layout"
import { getCustomer } from "../data/customers"

const STAGES_NAV = [
  { key: "sense", label: "Sense", path: "identity" },
  { key: "decide", label: "Decide", path: "pain-points" },
  { key: "engage", label: "Engage", path: "content-studio" },
  { key: "optimize", label: "Optimize", path: "feedback" },
]

const OPTIMIZE_TABS = [
  { key: "measurement", label: "Measurement & Feedback Layer" },
  { key: "summary", label: "Closed-Loop Summary" },
]

export default function Feedback() {
  const { customerId } = useParams<{ customerId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const explorerSearch =
    (location.state as { explorerSearch?: string } | null)?.explorerSearch ?? ""

  const [activeTab, setActiveTab] = useState("measurement")

  const customer = getCustomer(customerId ?? "")
  if (!customer)
    return (
      <Layout>
        <div className="p-8">
          <p style={{ color: "#6B7280" }}>Customer not found.</p>
        </div>
      </Layout>
    )

  return (
    <Layout>
      <div
        className="p-4 md:p-5 lg:px-8 lg:py-5 flex flex-col h-full min-h-0 overflow-hidden"
        style={{ background: "#F8F8FA" }}
      >
        {/* Top Header Row (Back, Stages) */}
        <div className="flex items-center justify-between mb-3 shrink-0">
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
                const isActive = s.key === "optimize"
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
                              STAGES_NAV.findIndex((x) => x.key === "optimize")
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
            <Link
              to={`/hub/${customer.id}/closed-loop`}
              state={{ explorerSearch }}
              className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full shadow-sm transition-all hover:shadow-md group cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                color: "white",
              }}
            >
              <span className="text-[10px] font-bold text-white">SPOG</span>
            </Link>
          </div>
        </div>

        {/* Breadcrumb */}
        <div
          className="flex items-center gap-1.5 text-xs mb-3 shrink-0"
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
          <span>Optimize</span>
          <span>›</span>
          <span style={{ color: "#1F2937", fontWeight: 600 }}>
            {activeTab === "measurement"
              ? "Measurement & Feedback Layer"
              : "Closed-Loop Summary"}
          </span>
        </div>

        {/* Tabs (like Decide page) */}
        <div
          className="flex items-center gap-1 mb-4 border-b shrink-0"
          style={{ borderColor: "#E2E2E6" }}
        >
          {OPTIMIZE_TABS.map((tab) => {
            const active = tab.key === activeTab
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-4 py-2 text-sm font-semibold transition-colors"
                style={
                  active
                    ? {
                        color: "#7C3AED",
                        borderBottom: "2px solid #7C3AED",
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

        {activeTab === "measurement" ? (
          <MeasurementTab />
        ) : (
          <ClosedLoopSummaryTab />
        )}
      </div>
    </Layout>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1 — Measurement & Feedback Layer
// ─────────────────────────────────────────────────────────────────────────────

function MeasurementTab() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-3 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold" style={{ color: "#1F2937" }}>
              Measurement & Feedback Layer
            </h1>
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border"
              style={{ background: "#F5F3FF", borderColor: "#DDD6FE" }}
            >
              <RefreshCw
                size={12}
                className="animate-spin-slow"
                style={{ color: "#7C3AED" }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "#7C3AED" }}
              >
                Closed Loop Learning
              </span>
              <Sparkles size={12} style={{ color: "#7C3AED" }} />
            </div>
          </div>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            Track outcomes, learn continuously and improve every next best action
            recommendation.
          </p>
        </div>
      </div>

      {/* Section 1: Feedback Status Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4 shrink-0">
        <StatusCard
          icon={Database}
          title="Model Registry"
          subLabel="Champion Model Updated"
          mainText="NBA Champion v5.1"
          footer="Updated Today"
        />
        <StatusCard
          icon={Brain}
          title="Prompt Learning"
          subLabel="New Insights Incorporated"
          mainText="Customer Behaviour Patterns Updated"
          footer="Learning Complete"
        />
        <div
          className="bg-white rounded-xl p-4 border flex flex-col justify-between"
          style={{ borderColor: "#E2E2E6" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="p-1.5 rounded-md"
              style={{ background: "#F5F3FF", color: "#7C3AED" }}
            >
              <FlaskConical size={16} />
            </div>
            <div className="text-sm font-bold" style={{ color: "#1F2937" }}>
              Experiment Tracking
            </div>
          </div>
          <div className="text-xl font-bold mb-3 text-gray-900 mt-1 flex items-baseline gap-1.5">
            5{" "}
            <span className="text-xs font-semibold text-gray-500">
              Active Experiments
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-bold"
            style={{ color: "#16A34A" }}
          >
            <CheckCircle2 size={12} /> 2 Winners Ready
          </div>
        </div>
        <div
          className="bg-white rounded-xl p-4 border flex flex-col justify-between"
          style={{ borderColor: "#E2E2E6" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="p-1.5 rounded-md"
              style={{ background: "#F5F3FF", color: "#7C3AED" }}
            >
              <ShieldCheck size={16} />
            </div>
            <div className="text-sm font-bold" style={{ color: "#1F2937" }}>
              AI Guardrails
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 mb-3">
            {["Bias", "Privacy", "Safety", "Explainability"].map((g) => (
              <div
                key={g}
                className="text-xs font-semibold text-gray-700 flex items-center gap-1"
              >
                <CheckCircle2 size={12} className="text-[#7C3AED]" /> {g}
              </div>
            ))}
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-bold"
            style={{ color: "#16A34A" }}
          >
            <CheckCircle2 size={12} /> All Clear
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-[250px_1fr_280px] gap-4 flex-1 min-h-0">
        {/* Section 2: Response Journey */}
        <div
          className="bg-white rounded-xl p-4 border flex flex-col h-full"
          style={{ borderColor: "#E2E2E6" }}
        >
          <h3 className="text-sm font-bold mb-4" style={{ color: "#1F2937" }}>
            Response Journey
          </h3>
          <div className="flex flex-col flex-1 relative pl-2">
            {[
              { icon: CheckCircle2, label: "Sent", date: "Mar 31", time: "10:01 AM", state: "completed" },
              { icon: CheckCircle2, label: "Delivered", date: "Mar 31", time: "10:02 AM", state: "completed" },
              { icon: CheckCircle2, label: "Opened", date: "Mar 31", time: "10:11 AM", state: "completed" },
              { icon: CheckCircle2, label: "Clicked", date: "Mar 31", time: "10:22 AM", state: "completed" },
              { icon: Target, label: "Activated", date: "Mar 31", time: "10:30 AM", state: "current" },
              { icon: RefreshCw, label: "Retention Confirmed", date: "Pending", time: "", state: "pending" },
            ].map((step, i, arr) => (
              <div
                key={i}
                className="flex items-start gap-4 mb-4 last:mb-0 relative z-10 group cursor-default"
              >
                {i < arr.length - 1 && (
                  <div
                    className={`absolute left-[15px] top-8 w-0.5 h-8 ${
                      step.state === "completed" &&
                      arr[i + 1].state !== "pending"
                        ? "bg-[#7C3AED]"
                        : "border-l-2 border-dashed border-gray-300 bg-transparent"
                    }`}
                  />
                )}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-[2px] transition-transform group-hover:scale-105 z-10 ${
                    step.state === "completed"
                      ? "bg-[#7C3AED] border-[#7C3AED] text-white"
                      : step.state === "current"
                        ? "bg-[#F5F3FF] border-[#7C3AED] text-[#7C3AED] ring-4 ring-purple-100"
                        : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon size={16} />
                </div>
                <div className="pt-0.5">
                  <div
                    className={`text-sm font-bold leading-tight ${
                      step.state === "pending"
                        ? "text-gray-400"
                        : "text-gray-900 group-hover:text-[#7C3AED] transition-colors"
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-xs text-gray-500 leading-tight mt-0.5">
                    {step.date} {step.time ? `• ${step.time}` : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-3">
            <div
              className="rounded-xl p-3 flex flex-col gap-1 border"
              style={{ background: "#F5F3FF", borderColor: "#DDD6FE" }}
            >
              <div className="flex items-center gap-2">
                <Trophy size={16} style={{ color: "#7C3AED" }} />
                <span className="text-sm font-bold" style={{ color: "#1F2937" }}>
                  Converted in 29 Mins
                </span>
              </div>
              <div
                className="text-xs font-medium"
                style={{ color: "#7C3AED", paddingLeft: 24 }}
              >
                Strong response time
              </div>
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div className="flex flex-col gap-4 h-full min-h-0">
          {/* Signal Factory Updated — no scroller */}
          <div
            className="bg-white rounded-xl p-4 border flex flex-col flex-1"
            style={{ borderColor: "#E2E2E6" }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold" style={{ color: "#1F2937" }}>
                Signal Factory Updated
              </h3>
              <button
                className="text-xs font-semibold transition-colors hover:opacity-70"
                style={{ color: "#7C3AED" }}
              >
                View All Signals
              </button>
            </div>
            <div className="flex flex-col flex-1">
              <div className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr] gap-2 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-1.5 border-b border-gray-100">
                <div>Metric</div>
                <div>Before</div>
                <div>After</div>
                <div className="text-right">Change</div>
              </div>
              <div className="flex flex-col justify-between flex-1">
                {[
                  { label: "Travel Intent Score", icon: Plane, before: 72, after: 94, change: "+22", pos: true },
                  { label: "OTT Affinity", icon: Tv, before: 68, after: 91, change: "+23", pos: true },
                  { label: "Family Influence", icon: Users, before: 54, after: 81, change: "+27", pos: true },
                  { label: "Payment Reliability", icon: CreditCard, before: 76, after: 93, change: "+17", pos: true },
                  { label: "Network Complaint Risk", icon: AlertTriangle, before: 60, after: 28, change: "-32", pos: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr] items-center gap-2 py-1.5 px-2 rounded-lg transition-colors hover:bg-gray-50 group cursor-default"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-gray-100 text-gray-600 group-hover:bg-white group-hover:shadow-sm">
                        <row.icon size={14} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 truncate">
                        {row.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500 w-5">
                        {row.before}
                      </span>
                      <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-300 rounded-full"
                          style={{ width: `${row.before}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-800 w-5">
                        {row.after}
                      </span>
                      <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#7C3AED] rounded-full"
                          style={{ width: `${row.after}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div
                        className="text-xs font-bold px-2 py-1 rounded"
                        style={{
                          background: row.pos ? "#F5F3FF" : "#FEF2F2",
                          color: row.pos ? "#7C3AED" : "#DC2626",
                        }}
                      >
                        {row.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Model KPI Delta — no scroller */}
          <div
            className="bg-white rounded-xl p-4 border flex flex-col flex-1"
            style={{ borderColor: "#E2E2E6" }}
          >
            <h3 className="text-sm font-bold mb-2" style={{ color: "#1F2937" }}>
              Model KPI Delta
            </h3>
            <div className="flex flex-col flex-1">
              <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-2 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-1.5 border-b border-gray-100">
                <div>Metric</div>
                <div>Before</div>
                <div>After</div>
                <div className="text-right">Change</div>
              </div>
              <div className="flex flex-col justify-between flex-1">
                {[
                  { label: "Offer Acceptance Rate", before: "18.6%", after: "24.7%", change: "▲ 6.1 pp", pos: true },
                  { label: "Conversion Rate", before: "9.3%", after: "13.8%", change: "▲ 4.5 pp", pos: true },
                  { label: "Churn Risk", before: "0.62", after: "0.48", change: "▼ -0.14", pos: true },
                  { label: "Model Accuracy", before: "74.2%", after: "81.2%", change: "▲ 7.0 pp", pos: true },
                  { label: "Customer Satisfaction", before: "78", after: "89", change: "▲ 11", pos: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-2 py-1.5 px-2 rounded-lg transition-colors hover:bg-gray-50"
                  >
                    <div className="text-xs font-semibold text-gray-700 truncate">
                      {row.label}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {row.before}
                    </div>
                    <div className="text-xs text-gray-900 font-bold">
                      {row.after}
                    </div>
                    <div
                      className="flex justify-end text-xs font-bold"
                      style={{ color: row.pos ? "#16A34A" : "#DC2626" }}
                    >
                      {row.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Updated Next Best Action Queue */}
        <div
          className="bg-white rounded-xl p-4 border flex flex-col h-full"
          style={{ borderColor: "#E2E2E6" }}
        >
          <h3 className="text-sm font-bold mb-3" style={{ color: "#1F2937" }}>
            Updated Next Best Action
          </h3>
          <div className="flex flex-col justify-between gap-2 flex-1">
            {[
              { rank: "🥇", name: "Smart Roaming Pack", score: "0.92", impact: "High", icon: Plane, trend: "up", impactColor: "#16A34A" },
              { rank: "🥈", name: "Family Shield Plan", score: "0.78", impact: "High", icon: Shield, trend: "up", impactColor: "#16A34A" },
              { rank: "🥉", name: "Premium OTT Bundle", score: "0.63", impact: "Medium", icon: Tv, trend: "amber", impactColor: "#F59E0B" },
              { rank: "🏅", name: "5G Gaming Booster", score: "0.58", impact: "Medium", icon: Gamepad2, trend: "amber", impactColor: "#F59E0B" },
            ].map((nba, i) => (
              <div
                key={i}
                className="rounded-xl border p-3 flex flex-col gap-2 transition-all hover:shadow-sm cursor-pointer"
                style={{ borderColor: "#F3F4F6" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">{nba.rank}</span>
                  <div className="p-1.5 rounded bg-gray-100 text-gray-600">
                    <nba.icon size={14} />
                  </div>
                  <span className="text-xs font-bold text-gray-900 truncate flex-1">
                    {nba.name}
                  </span>
                  <TrendingUp
                    size={14}
                    style={{ color: nba.trend === "up" ? "#16A34A" : "#F59E0B" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[9px] text-gray-400 mb-1 uppercase tracking-wider font-bold">
                      Priority Score
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-gray-800">
                        {nba.score}
                      </span>
                      <div className="h-1.5 flex-1 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-[#7C3AED] rounded-full"
                          style={{ width: `${parseFloat(nba.score) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-400 mb-1 uppercase tracking-wider font-bold">
                      Impact
                    </div>
                    <div
                      className="text-xs font-bold"
                      style={{ color: nba.impactColor }}
                    >
                      {nba.impact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable status card
function StatusCard({
  icon: Icon,
  title,
  subLabel,
  mainText,
  footer,
}: {
  icon: any
  title: string
  subLabel: string
  mainText: string
  footer: string
}) {
  return (
    <div
      className="bg-white rounded-xl p-4 border flex flex-col justify-between"
      style={{ borderColor: "#E2E2E6" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="p-1.5 rounded-md"
          style={{ background: "#F5F3FF", color: "#7C3AED" }}
        >
          <Icon size={16} />
        </div>
        <div className="text-sm font-bold" style={{ color: "#1F2937" }}>
          {title}
        </div>
      </div>
      <div className="text-xs text-gray-500 mb-0.5">{subLabel}</div>
      <div className="text-sm font-semibold mb-3 text-gray-900">{mainText}</div>
      <div
        className="flex items-center gap-1.5 text-xs font-bold"
        style={{ color: "#16A34A" }}
      >
        <CheckCircle2 size={12} /> {footer}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2 — Closed-Loop Summary
// ─────────────────────────────────────────────────────────────────────────────

function ClosedLoopSummaryTab() {
  const flowSteps = [
    { icon: Radar, title: "Signal Factory", sub: "6 adaptive signals", color: "#2563EB" },
    { icon: Brain, title: "AI Scoring", sub: "XGBoost + LLM", color: "#7C3AED" },
    { icon: Target, title: "NBA Selection", sub: "91% propensity", color: "#F59E0B" },
    { icon: Send, title: "Multi-Channel", sub: "6 channels · 11 variants", color: "#16A34A" },
    { icon: Eye, title: "Response", sub: "Activated in 29 min", color: "#0EA5E9" },
    { icon: RefreshCw, title: "Model Update", sub: "Retrain T+48h", color: "#DB2777" },
  ]

  const detailCards = [
    {
      icon: Cpu,
      title: "Champion Model",
      desc: "XGBoost v3.2 → v3.3 candidate queued. 5 feature weights updated. Training batch +1 record. Retrain in T+48h.",
      accent: "#7C3AED",
      bg: "#F5F3FF",
    },
    {
      icon: Brain,
      title: "Prompt Registry",
      desc: "Warm + Benefit-Led variant promoted to default across travel-intent segment. RAG context pattern saved.",
      accent: "#DB2777",
      bg: "#FDF2F8",
    },
    {
      icon: MessageSquare,
      title: "Channel Policy",
      desc: "WhatsApp affinity score 72 → 91 for this micro-segment. Instagram Story retargeting added to travel trigger.",
      accent: "#2563EB",
      bg: "#EFF6FF",
    },
    {
      icon: CalendarClock,
      title: "Contact Calendar",
      desc: "NBA queue rebuilt: 3 offers scheduled Apr–May. 14-day cooldown applied post-conversion.",
      accent: "#F59E0B",
      bg: "#FFFBEB",
    },
  ]

  const impactStats = [
    { value: "+₹1,290", label: "Revenue Captured", color: "#16A34A" },
    { value: "0.62 → 0.48", label: "Churn Risk", color: "#7C3AED" },
    { value: "74% → 81%", label: "Model Accuracy", color: "#2563EB" },
    { value: "18.6% → 24.7%", label: "Offer Acceptance", color: "#DB2777" },
    { value: "29 minutes", label: "Time-to-Convert", color: "#F59E0B" },
    { value: "Apr 14, 2026", label: "Next Contact", color: "#0EA5E9" },
  ]

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold" style={{ color: "#1F2937" }}>
              Closed-Loop AI Summary
            </h1>
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border"
              style={{ background: "#F5F3FF", borderColor: "#DDD6FE" }}
            >
              <Sparkles size={12} style={{ color: "#7C3AED" }} />
              <span className="text-xs font-semibold" style={{ color: "#7C3AED" }}>
                End-to-End Retention Architecture
              </span>
            </div>
          </div>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            How every signal, decision and outcome feeds back to make the next
            recommendation smarter.
          </p>
        </div>
      </div>

      {/* Flow diagram */}
      <div
        className="bg-white rounded-xl p-4 border mb-4 shrink-0"
        style={{ borderColor: "#E2E2E6" }}
      >
        <div className="flex items-center justify-between">
          {flowSteps.map((step, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center text-center gap-2 px-1">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm"
                  style={{
                    background: `${step.color}15`,
                    color: step.color,
                    boxShadow: `inset 0 0 0 2px ${step.color}`,
                  }}
                >
                  <step.icon size={22} />
                </div>
                <div>
                  <div
                    className="text-xs font-bold leading-tight"
                    style={{ color: "#1F2937" }}
                  >
                    {step.title}
                  </div>
                  <div className="text-[10px] text-gray-500 leading-tight mt-0.5">
                    {step.sub}
                  </div>
                </div>
              </div>
              {i < flowSteps.length - 1 && (
                <ArrowRight
                  size={18}
                  className="shrink-0 mx-1"
                  style={{ color: "#CBD5E1" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail cards */}
      <div className="grid grid-cols-4 gap-4 mb-4 flex-1 min-h-0">
        {detailCards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border p-4 flex flex-col transition-all hover:shadow-sm"
            style={{ borderColor: "#E2E2E6" }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 shrink-0"
              style={{ background: card.bg, color: card.accent }}
            >
              <card.icon size={20} />
            </div>
            <h3
              className="text-sm font-bold mb-2"
              style={{ color: card.accent }}
            >
              {card.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Interaction Impact Summary */}
      <div
        className="rounded-xl p-4 border shrink-0"
        style={{
          background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 55%, #EC7A5C 100%)",
          borderColor: "transparent",
        }}
      >
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2 shrink-0">
            <Sparkles size={18} className="text-white" />
            <span className="text-base font-bold text-white">
              Interaction Impact Summary
            </span>
          </div>
          <div className="flex-1 grid grid-cols-6 gap-3">
            {impactStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20"
              >
                <div className="text-sm font-bold text-white leading-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] text-white/80 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
