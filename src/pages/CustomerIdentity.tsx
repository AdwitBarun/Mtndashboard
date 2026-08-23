import { useState } from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Smartphone,
  Wifi,
  CreditCard,
  Activity,
  Calendar,
  IndianRupee,
  Database,
  Diamond,
  ShieldCheck,
  Crown,
  Users,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Star,
  Zap,
  TrendingUp,
  Plane,
} from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import Layout from "../components/Layout"
import Avatar from "../components/Avatar"
import {
  getCustomer,
  SEGMENT_STYLE,
  RISK_STYLE,
  getRiskBand,
} from "../data/customers"

const STAGES_NAV = [
  { key: "understand", label: "Understand", path: "identity" },
  { key: "sense", label: "Sense", path: "usage" },
  { key: "decide", label: "Decide", path: "pain-points" },
  { key: "engage", label: "Engage", path: "content-studio" },
  { key: "optimize", label: "Optimize", path: "feedback" },
]

function Badge({ label, bg, text }: { label: string bg: string text: string }) {
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ background: bg, color: text }}
    >
      {label}
    </span>
  )
}

function ProgressRing({
  progress,
  color,
  icon: Icon,
}: {
  progress: number
  color: string
  icon: any
}) {
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg className="transform -rotate-90 w-12 h-12 absolute">
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-gray-100"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke={color}
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <Icon size={16} style={{ color }} />
    </div>
  )
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: any[]
}) => {
  if (active && payload && payload.length > 0) {
    return (
      <div
        className="bg-white border rounded-lg px-3 py-2 shadow-sm text-xs"
        style={{ borderColor: "#E2E2E6" }}
      >
        <div className="font-semibold mb-1" style={{ color: "#1F2937" }}>
          {payload[0].payload?.subject || payload[0].name}
        </div>
        {payload.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 mb-0.5"
          >
            <span style={{ color: p.color }}>{p.name}:</span>
            <span className="font-medium" style={{ color: "#1F2937" }}>
              {p.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function CustomerIdentity() {
  const { customerId } = useParams<{ customerId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const explorerSearch =
    (location.state as { explorerSearch?: string } | null)?.explorerSearch ?? ""

  const customer = getCustomer(customerId ?? "")
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  if (!customer) {
    return (
      <Layout>
        <div className="p-8">
          <p style={{ color: "#6B7280" }}>Customer not found.</p>
        </div>
      </Layout>
    )
  }

  const radarData = [
    {
      subject: "Data Usage",
      customer: customer.engagementDimensions.dataUsage,
      avg: 70,
    },
    {
      subject: "Loyalty",
      customer: customer.engagementDimensions.loyalty,
      avg: 72,
    },
    {
      subject: "Spend",
      customer: customer.engagementDimensions.spend,
      avg: 65,
    },
    {
      subject: "Streaming",
      customer: customer.engagementDimensions.streaming,
      avg: 62,
    },
    {
      subject: "Travel",
      customer: customer.engagementDimensions.travel,
      avg: 55,
    },
    {
      subject: "Recharge",
      customer: customer.engagementDimensions.recharge,
      avg: 74,
    },
  ]

  const totalMembers = customer.householdMembers.length
  const familyDataPool = customer.householdMembers.reduce((a, m) => {
    return a + Math.round((parseInt(customer.avgData) * m.usageShare) / 100)
  }, 0)

  const isPremium = customer.arpu > 500
  const isVerified = true
  const isFamily = customer.planType.includes("Family")
  const riskBand = getRiskBand(customer.risk)

  return (
    <Layout>
      <div className="p-6 md:p-8 ">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to={`/explorer${explorerSearch}`}
            state={{ explorerSearch }}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "#7C3AED" }}
          >
            <ArrowLeft size={14} /> Back to Customer Explorer
          </Link>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-5">
              {STAGES_NAV.map((s) => {
                const isActive = s.key === "understand"
                return (
                  <button
                    key={s.key}
                    onClick={() => {
                      if (s.key === "understand") return
                      navigate(`/hub/${customer.id}/${s.path}`, {
                        state: { explorerSearch },
                      })
                    }}
                    className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70"
                    title={s.label}
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={
                        isActive
                          ? { background: "#7C3AED" }
                          : STAGES_NAV.findIndex((x) => x.key === s.key) <
                              STAGES_NAV.findIndex(
                                (x) => x.key === "understand",
                              )
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
                              STAGES_NAV.findIndex(
                                (x) => x.key === "understand",
                              )
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
              <span className="text-[10px] font-bold text-white">
                SPOG
              </span>
            </Link>
          </div>
        </div>

        {/* Breadcrumb */}
        <div
          className="flex items-center gap-1.5 text-xs mb-5"
          style={{ color: "#9CA3AF" }}
        >
          <Link
            to={`/explorer${explorerSearch}`}
            state={{ explorerSearch }}
            className="transition-colors hover:text-[#7C3AED]"
            style={{ color: "#6B7280" }}
          >
            Customer Explorer
          </Link>
          <span>›</span>
          <span>Understand</span>
          <span>›</span>
          <span style={{ color: "#1F2937", fontWeight: 600 }}>
            Customer Identity
          </span>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr_360px] gap-5 mb-5">
          {/* LEFT COLUMN: IDENTITY & KPIs */}
          <div className="flex flex-col gap-5">
            {/* Identity Card */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden shadow-sm"
              style={{
                background:
                  "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC7A5C 100%)",
              }}
            >
              {/* Top Badges */}
              <div className="flex items-center justify-between absolute top-4 left-4 right-4">
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white font-medium">
                  <ShieldCheck size={12} className="text-emerald-400" />{" "}
                  Verified
                </div>
                {isPremium && (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-amber-400/20 to-amber-600/20 border border-amber-400/30 px-2 py-1 rounded-md text-[10px] text-amber-300 font-medium">
                    <Crown size={12} /> Premium
                  </div>
                )}
              </div>

              {/* Avatar & Core Details */}
              <div className="flex flex-col items-center text-center mt-6">
                <div className="relative">
                  <Avatar
                    initials={customer.initials}
                    color="rgba(255,255,255,0.15)"
                    size="xl"
                  />
                  {isFamily && (
                    <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                      <div
                        className="bg-indigo-50 text-indigo-700 p-0.5 rounded-full"
                        title="Family Plan Owner"
                      >
                        <Users size={12} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <h2 className="text-white font-bold text-xl">
                    {customer.name}
                  </h2>
                  <div className="text-white/70 text-sm mt-0.5">
                    Age {customer.age} | {customer.location}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-white/60 text-xs mt-2 font-mono bg-black/20 px-3 py-1 rounded-full mx-auto w-fit">
                    <Phone size={11} /> {customer.phone}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap pt-2 w-[500px] items-center justify-start gap-2">
                {customer.behavioralTags.map((tag) => (
                  <span
                    key={tag.label}
                    className="text-[10px] font-semibold px-2 py-1 rounded-md"
                    style={{
                      background: "#EDE9FE",
                      color: "#6D28D9",
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="bg-white rounded-xl p-4 border shadow-sm flex items-center gap-3"
                style={{ borderColor: "#E2E2E6" }}
              >
                <ProgressRing
                  progress={Math.min(100, (customer.tenure / 72) * 100)}
                  color="#3B82F6"
                  icon={Calendar}
                />
                <div>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    Tenure
                  </div>
                  <div className="font-bold text-gray-900">
                    {customer.tenure} mo (
                    {Math.round((customer.tenure / 12) * 10) / 10} yr)
                  </div>
                </div>
              </div>
              <div
                className="bg-white rounded-xl p-4 border shadow-sm flex items-center gap-3"
                style={{ borderColor: "#E2E2E6" }}
              >
                <ProgressRing
                  progress={customer.engagementDimensions.spend}
                  color="#10B981"
                  icon={IndianRupee}
                />
                <div>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    Monthly Spend
                  </div>
                  <div className="font-bold text-gray-900">
                    ₹{customer.arpu.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
              <div
                className="bg-white rounded-xl p-4 border shadow-sm flex items-center gap-3"
                style={{ borderColor: "#E2E2E6" }}
              >
                <ProgressRing
                  progress={customer.engagementDimensions.dataUsage}
                  color="#8B5CF6"
                  icon={Database}
                />
                <div>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    Data Usage
                  </div>
                  <div className="font-bold text-gray-900">
                    {customer.avgData}
                  </div>
                </div>
              </div>
              <div
                className="bg-white rounded-xl p-4 border shadow-sm flex items-center gap-3"
                style={{ borderColor: "#E2E2E6" }}
              >
                <ProgressRing
                  progress={customer.engagementDimensions.loyalty}
                  color="#F59E0B"
                  icon={Diamond}
                />
                <div>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    Lifetime Value
                  </div>
                  <div className="font-bold text-gray-900">
                    ₹1.33L (2-yr
                    <br />
                    proj)
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Insights (From Screenshot) */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div
                className="bg-white rounded-xl p-4 border shadow-sm"
                style={{ borderColor: "#E2E2E6" }}
              >
                <div className="flex items-start justify-between">
                  <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Loyalty Score
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-lg">
                  {customer.engagementDimensions.loyalty}%
                </div>
              </div>
              <div
                className="bg-white rounded-xl p-4 border shadow-sm"
                style={{ borderColor: "#E2E2E6" }}
              >
                <div className="flex items-start justify-between">
                  <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Account Size
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-lg">
                  {totalMembers} Member{totalMembers !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: FAMILY & DIGITAL PROFILE */}
          <div className="flex flex-col gap-5">
            {/* Household Members Rich Panel */}
            <div
              className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col"
              style={{ borderColor: "#E2E2E6" }}
            >
              <div
                className="px-5 py-4 border-b flex justify-between items-center bg-gray-50/50"
                style={{ borderColor: "#F3F4F6" }}
              >
                <div>
                  <h3
                    className="text-base font-bold"
                    style={{ color: "#1F2937" }}
                  >
                    Household Plan Members ({totalMembers})
                  </h3>
                  <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                    {isFamily ? "Family Data Pool: " : "Individual Data: "}
                    <span className="font-semibold text-gray-900">
                      {customer.avgData}
                    </span>
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Users size={20} />
                </div>
              </div>

              <div
                className="flex-1 overflow-y-auto"
                style={{ maxHeight: "400px" }}
              >
                {customer.householdMembers.map((m) => {
                  const open = expandedMember === m.id
                  const shareVal = m.data
                    ? m.data
                    : `${Math.round((parseInt(customer.avgData) * m.usageShare) / 100)} GB`
                  const spendVal =
                    m.role === "Primary"
                      ? `₹${customer.arpu.toLocaleString("en-IN")}`
                      : ""
                  return (
                    <div
                      key={m.id}
                      className="border-b last:border-b-0"
                      style={{ borderColor: "#F3F4F6" }}
                    >
                      <button
                        onClick={() => setExpandedMember(open ? null : m.id)}
                        className="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <Avatar
                          initials={m.initials}
                          color={m.color}
                          size="md"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {m.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {m.role === "Primary" ? "(Self)" : "(Dependent)"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span>{m.role} User</span>
                            <span>·</span>
                            <span>{m.device}</span>
                          </div>
                        </div>
                        <div className="text-right mr-3">
                          <div className="text-sm font-bold text-gray-900">
                            {shareVal}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {spendVal ? `${spendVal} Contribution` : ""}
                          </div>
                        </div>
                        {open ? (
                          <ChevronUp size={16} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-400" />
                        )}
                      </button>
                      {open && (
                        <div className="px-5 py-4 bg-gray-50/50 grid grid-cols-2 gap-4 text-xs border-t border-gray-100">
                          <div>
                            <div className="text-gray-500 mb-1">
                              Primary Application
                            </div>
                            <div className="font-medium text-gray-900">
                              {m.role === "Primary"
                                ? "Hotstar, Netflix"
                                : "YouTube, Instagram"}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-1">
                              OS Platform
                            </div>
                            <div className="font-medium text-gray-900">
                              {m.os}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Device & Digital Profile */}
            <div
              className="bg-white rounded-2xl border shadow-sm p-5 h-[350px]"
              style={{ borderColor: "#E2E2E6" }}
            >
              <h3
                className="text-base font-bold mb-4"
                style={{ color: "#1F2937" }}
              >
                Device & Digital Profile
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-5 pt-5 pb-5">
                {[
                  {
                    label: "Device",
                    value: customer.device,
                    icon: Smartphone,
                  },
                  { label: "OS", value: customer.os, icon: Activity },
                  { label: "Network", value: customer.networkType, icon: Wifi },
                  {
                    label: "Pref. Apps",
                    value: "Hotstar, Netflix",
                    icon: Star,
                  },
                  {
                    label: "Payment",
                    value: customer.paymentMethod,
                    icon: CreditCard,
                  },
                  {
                    label: "Backup",
                    value: customer.backupPayment,
                    icon: CreditCard,
                  },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-md text-gray-500">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        {label}
                      </div>
                      <div className="text-base font-semibold text-gray-900 mt-0.5">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="flex flex-wrap gap-2 mb-5 border-t pt-4 items-center justify-start"
                style={{ borderColor: "#F3F4F6" }}
              >
                <Badge
                  label={`${customer.networkType} User`}
                  bg="#EDE9FE"
                  text="#6D28D9"
                />
                <Badge
                  label={
                    customer.paymentMethod.includes("Card")
                      ? "Card User"
                      : "UPI/Cash User"
                  }
                  bg="#EDE9FE"
                  text="#6D28D9"
                />
                {customer.engagementDimensions.streaming > 70 && (
                  <Badge label="Heavy Streamer" bg="#EDE9FE" text="#6D28D9" />
                )}
                {isPremium && (
                  <Badge label="Premium Device" bg="#EDE9FE" text="#6D28D9" />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ENGAGEMENT & PERSONA */}
          <div className="flex flex-col gap-5">
            {/* Persona Archetype Card */}
            <div
              className="bg-white rounded-2xl border shadow-sm p-6 relative overflow-hidden h-[300px]"
              style={{ borderColor: "#E2E2E6" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7C3AED]/10 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-3 mb-3 relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(124,58,237,0.1)",
                    color: "#7C3AED",
                  }}
                >
                  <Star size={20} />
                </div>
                <div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "#7C3AED" }}
                  >
                    Persona Archetype
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mt-0.5">
                    {customer.personaArchetype.name}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-5 mt-5">
                <div
                  className={`border rounded-lg p-3 flex justify-between items-center ${
                    riskBand === "Low"
                      ? "bg-emerald-50 border-emerald-100"
                      : riskBand === "Medium"
                        ? "bg-amber-50 border-amber-100"
                        : "bg-red-50 border-red-100"
                  }`}
                >
                  <div>
                    <div
                      className={`text-[10px] font-bold uppercase ${
                        riskBand === "Low"
                          ? "text-emerald-700"
                          : riskBand === "Medium"
                            ? "text-amber-700"
                            : "text-red-700"
                      }`}
                    >
                      Churn Risk
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-bold ${
                        riskBand === "Low"
                          ? "text-emerald-700"
                          : riskBand === "Medium"
                            ? "text-amber-700"
                            : "text-red-700"
                      }`}
                    >
                      {riskBand}
                    </div>
                    <div
                      className={`text-xs font-mono mt-0.5 ${
                        riskBand === "Low"
                          ? "text-emerald-600"
                          : riskBand === "Medium"
                            ? "text-amber-600"
                            : "text-red-600"
                      }`}
                    >
                      {customer.risk.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-bold text-blue-700 uppercase">
                      Revenue Potential
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-700">
                      {customer.personaArchetype.revenue}
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-bold text-purple-700 uppercase">
                      Data Value
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-purple-700">
                      {customer.personaArchetype.dataValue}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Dimensions */}
            <div
              className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col h-[350px] flex-none grow-0 basis-auto"
              style={{ borderColor: "#E2E2E6" }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3
                    className="text-base font-bold"
                    style={{ color: "#1F2937" }}
                  >
                    Engagement Dimensions
                  </h3>
                  <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                    Customer vs Segment Average
                  </p>
                </div>
              </div>

              <div style={{ height: 260 }} className="w-full -ml-2">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minWidth={0}
                  minHeight={0}
                >
                  <RadarChart
                    data={radarData}
                    margin={{ top: 5, right: 25, bottom: 5, left: 25 }}
                  >
                    <PolarGrid stroke="#E2E2E6" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#4B5563", fontSize: 10, fontWeight: 500 }}
                    />
                    <Radar
                      name="Customer"
                      dataKey="customer"
                      stroke="#7C3AED"
                      fill="#7C3AED"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Segment Avg"
                      dataKey="avg"
                      stroke="#94A3B8"
                      fill="#94A3B8"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      strokeDasharray="4 4"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* CTA AREA */}
        <div className="bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#EC7A5C] rounded-2xl p-6 md:p-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 text-white shadow-lg">
          <div className="w-full">
            <h2
              className="text-xl font-bold mb-2 leading-tight text-left"
            >
              Next Stage will uncover behavioral signals, churn indicators, affinity scores,
              <br />
              next best actions and AI-driven opportunities.
            </h2>
          </div>
          <button
            onClick={() =>
              navigate(`/hub/${customer.id}/usage`, {
                state: { explorerSearch },
              })
            }
            className="shrink-0 bg-white text-[#4F46E5] px-8 py-4 rounded-xl text-sm font-bold border border-white transition-all duration-200 hover:bg-[#F5F3FF] hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
style={{
  background: "#FFFFFF",
  color: "#4F46E5",
}}
          >
            Begin Rohan&apos;s NBA Journey{" "}
            <ArrowLeft className="rotate-180" size={16} />
          </button>
        </div>
      </div>
    </Layout>
  )
}
