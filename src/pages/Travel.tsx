import type { SVGProps } from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Layout from "../components/Layout"
import { getCustomer } from "../data/customers"

const STAGES_NAV = [
  { key: "understand", label: "Understand", path: "identity" },
  { key: "sense", label: "Sense", path: "usage" },
  { key: "decide", label: "Decide", path: "pain-points" },
  { key: "engage", label: "Engage", path: "content-studio" },
  { key: "optimize", label: "Optimize", path: "feedback" },
]

const SENSE_TABS = [
  { key: "usage", label: "Data Usage", path: "usage" },
  { key: "travel", label: "Travel", path: "travel" },
  { key: "payments", label: "Payment", path: "payments" },
]

const THEME = {
  maroon: "#7C3AED",
  darkMaroon: "#4F46E5",
  travelBlue: "#2563EB",
  successGreen: "#16A34A",
  orange: "#F97316",
  purple: "#7C3AED",
  softRose: "#EDE9FE", // violet tint
  slate50: "#F8FAFC",
  slate100: "#F1F5F9",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate400: "#94A3B8",
  slate500: "#64748B",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",
}

// Custom Solid Icons
type IconProps = SVGProps<SVGSVGElement> & {
  size?: number
  color?: string
}

const IconGlobe = ({ size = 24, color = "currentColor", ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
)

const IconCalendar = ({ size = 24, color = "currentColor", ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" {...props}>
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
  </svg>
)

const IconRupee = ({ size = 24, color = "currentColor", ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" {...props}>
    <path d="M13.66 7H9V5h8V3H6v2h1.34c1.54 0 2.87.87 3.51 2H6v2h4.74c-.45 1.5-1.96 2.5-3.74 2.5H6v2h1.66l4.63 7h2.64l-4.72-7c2.32-.4 4.14-2.22 4.62-4.5H18v-2h-3.34A5.02 5.02 0 0 0 13.66 7z" />
  </svg>
)

const IconPlane = ({ size = 24, color = "currentColor", ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" {...props}>
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
)

const IconAlert = ({ size = 24, color = "currentColor", ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
)

const SPEND_DATA = [
  { month: "Mar '25", value: 980 },
  { month: "Apr '25", value: 1180 },
  { month: "May '25", value: 1420 },
  { month: "Jun '25", value: 1520 },
  { month: "Jul '25", value: 1650 },
  { month: "Aug '25", value: 1290 },
]
const MAX_VAL = 2000
const Y_AXIS_STEPS = [2000, 1500, 1000, 500, 0]

export default function Travel() {
  const { customerId } = useParams<{ customerId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const explorerSearch =
    (location.state as { explorerSearch?: string } | null)?.explorerSearch ?? ""

  const customer = getCustomer(customerId ?? "")

  if (!customer)
    return (
      <Layout>
        <div className="p-8">
          <p style={{ color: THEME.slate500 }}>Customer not found.</p>
        </div>
      </Layout>
    )

  return (
    <Layout>
      <div className="p-6 md:p-8 min-h-screen">
        {/* Header & Nav */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to={"/hub/" + customer.id}
            state={{ explorerSearch }}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: THEME.maroon }}
          >
            <ArrowLeft size={14} /> Back to Customer Hub
          </Link>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-5">
              {STAGES_NAV.map((s) => {
                const isActive = s.key === "sense"
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
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={
                        isActive
                          ? { background: "#7C3AED" }
                          : STAGES_NAV.findIndex((x) => x.key === s.key) <
                              STAGES_NAV.findIndex((x) => x.key === "sense")
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
                              STAGES_NAV.findIndex((x) => x.key === "sense")
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
                ✨ Customer 360
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs mb-4 text-slate-400">
          <Link
            to={"/hub/" + customer.id}
            state={{ explorerSearch }}
            className="transition-colors hover:text-slate-600"
          >
            Customer Hub
          </Link>
          <span>›</span>
          <span>Sense</span>
          <span>›</span>
          <span className="text-slate-800 font-semibold">Travel Footprint</span>
        </div>

        <div className="flex items-center gap-1 mb-8 border-b border-slate-200">
          {SENSE_TABS.map((tab) => {
            const active = tab.key === "travel"
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
                        color: THEME.maroon,
                        borderBottom: `2px solid ${THEME.maroon}`,
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

        {/* 70/30 Layout */}
        <div
          className="grid grid-cols-1 xl:grid-cols-[70%_calc(30%-1.5rem)] gap-6 pb-12"
          style={{ height: "1300px" }}
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6" style={{ height: "1300px" }}>
            {/* 1. Monthly Roaming Spend (₹) Chart */}
            <div
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
              style={{ height: "450px" }}
            >
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900">
                  Monthly Roaming Spend (₹)
                </h2>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Last 7 months roaming activity trend
                </p>
              </div>

              <div className="relative h-[300px] w-full flex">
                {/* Y-Axis */}
                <div className="flex flex-col justify-between h-full pr-4 text-xs font-bold text-slate-400">
                  {Y_AXIS_STEPS.map((val) => (
                    <span key={val}>₹{val}</span>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="flex-1 relative flex items-end justify-between px-4 pb-0 h-full border-l border-b border-slate-200">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {Y_AXIS_STEPS.map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-px border-b border-dashed border-slate-200"
                      />
                    ))}
                  </div>

                  {/* Average Line */}
                  <div
                    className="absolute w-full border-b border-dashed border-slate-400 z-0 flex items-center"
                    style={{ bottom: `${(1340 / MAX_VAL) * 100}%`, left: 0 }}
                  >
                    <span className="absolute -left-12 text-[10px] font-bold text-slate-500 bg-white pr-1">
                      ₹1,340 Avg
                    </span>
                  </div>

                  {/* Bars */}
                  {SPEND_DATA.map((data, i) => {
                    const heightPct = (data.value / MAX_VAL) * 100
                    return (
                      <div
                        key={i}
                        className="relative flex flex-col items-center group w-[10%] max-w-[60px] z-10 h-full justify-end cursor-pointer"
                      >
                        {/* Amount Label on Hover */}
                        <div
                          className="absolute flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ bottom: `calc(${heightPct}% + 10px)` }}
                        >
                          <div className="bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded shadow-md whitespace-nowrap mb-1">
                            ₹{data.value.toLocaleString("en-IN")}
                          </div>
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-800" />
                        </div>

                        {/* Static Value */}
                        <span
                          className={`absolute text-[11px] font-bold transition-opacity group-hover:opacity-0 text-slate-500`}
                          style={{ bottom: `calc(${heightPct}% + 8px)` }}
                        >
                          ₹{data.value}
                        </span>

                        {/* The Bar */}
                        <div
                          className="w-full rounded-t-xl transition-all duration-300 group-hover:brightness-110"
                          style={{
                            height: `${heightPct}%`,
                            background: "#C4B5FD",
                          }}
                        />

                        {/* X-Axis Label */}
                        <div
                          className={`absolute -bottom-8 text-xs font-bold whitespace-nowrap text-slate-500`}
                        >
                          {data.month}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* 2. Travel KPI Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <IconGlobe size={20} />
                  </div>
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                    Countries Visited
                  </span>
                </div>
                <div className="text-3xl font-bold text-blue-900">3</div>
              </div>

              <div className="bg-green-50 p-5 rounded-2xl border border-green-100 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <IconCalendar size={20} />
                  </div>
                  <span className="text-xs font-bold text-green-800 uppercase tracking-wide">
                    Days Abroad
                  </span>
                </div>
                <div className="text-3xl font-bold text-green-900">17</div>
              </div>

              <div className="bg-[#FCE7EF] p-5 rounded-2xl border border-rose-200 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-rose-200 text-[#7C3AED] p-2 rounded-lg">
                    <IconRupee size={20} />
                  </div>
                  <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wide">
                    Total Roaming Spend
                  </span>
                </div>
                <div className="text-3xl font-bold text-[#7C3AED]">₹8,420</div>
              </div>

              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-amber-100 text-amber-600 p-2 rounded-lg">
                    <IconPlane size={20} />
                  </div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                    International Trips
                  </span>
                </div>
                <div className="text-3xl font-bold text-amber-900">3</div>
              </div>
            </div>

            {/* 3. Destinations Visited Section */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 px-1">
                Destinations Visited (Last 6 Months)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    dest: "Dubai",
                    flag: "🇦🇪",
                    days: 10,
                    spend: "₹3,800",
                    badge: "Business Travel",
                    color: "text-blue-700 bg-blue-100 border-blue-200",
                  },
                  {
                    dest: "Bangkok",
                    flag: "🇹🇭",
                    days: 7,
                    spend: "₹2,500",
                    badge: "Leisure Travel",
                    color: "text-orange-700 bg-orange-100 border-orange-200",
                  },
                  {
                    dest: "Singapore",
                    flag: "🇸🇬",
                    days: 4,
                    spend: "₹2,120",
                    badge: "Mixed Travel",
                    color: "text-purple-700 bg-purple-100 border-purple-200",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl leading-none">
                          {item.flag}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900">
                          {item.dest}
                        </h3>
                      </div>
                      <IconGlobe size={18} className="text-slate-300" />
                    </div>

                    <div className="flex flex-col gap-3 flex-1 mb-4">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                          <IconCalendar size={14} /> Days
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                          {item.days} Days
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                          <IconRupee size={14} /> Roaming Spend
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                          {item.spend}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md border ${item.color}`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Domestic Travel Corridors Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Top Domestic Travel Corridors
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    Most frequent travel routes
                  </p>
                </div>
                <button className="text-sm font-bold text-[#7C3AED] hover:text-[#4F46E5] transition-colors flex items-center gap-1">
                  View All Domestic Routes →
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { route: "Mumbai → Pune", trips: 12, pct: 100 },
                  { route: "Mumbai → Bengaluru", trips: 7, pct: 58 },
                  { route: "Mumbai → Delhi", trips: 6, pct: 50 },
                  { route: "Mumbai → Hyderabad", trips: 5, pct: 41 },
                  { route: "Mumbai → Chennai", trips: 4, pct: 33 },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-slate-500">
                      <IconPlane size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-slate-800">
                          {row.route}
                        </span>
                        <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {row.trips} Trips
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${row.pct}%`,
                            backgroundColor: THEME.travelBlue,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6" style={{ height: "1300px" }}>
            {/* 1. Travel Engagement Score */}
            <div
              className="rounded-2xl p-6 text-white shadow-md relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC7A5C 100%)`,
              }}
            >
              <div className="absolute -right-10 -top-10 text-white/10">
                <IconGlobe size={180} />
              </div>
              <div className="relative z-10">
                <h2 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <IconPlane size={16} /> Travel Engagement Score
                </h2>

                <div className="flex items-end gap-2 mb-2">
                  <span className="text-5xl font-bold leading-none">82</span>
                  <span className="text-lg font-bold text-white/60 mb-1">
                    / 100
                  </span>
                </div>

                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden mb-5">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: "82%" }}
                  />
                </div>
              </div>
            </div>

            {/* 5. Trigger Event Detected (Moved up for visibility) */}
            <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-5">
                <IconAlert size={20} className="text-red-600" />
                <h2 className="text-lg font-bold text-red-700">
                  ✈ Travel Trigger Detected
                </h2>
              </div>

              <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm mb-5">
                <div className="flex items-center gap-3 mb-3 border-b border-slate-100 pb-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 shrink-0">
                    <IconPlane size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      Airport Tower Ping Detected
                    </div>
                    <div className="text-xs font-semibold text-slate-500">
                      Dubai International Airport (DXB)
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Date: 14 May 2025</span>
                  <span>Time: 08:14 AM IST</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-5 bg-white/60 p-3 rounded-lg border border-red-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Travel Intent Confidence
                </span>
                <span className="text-xl font-bold text-red-600">92%</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                  Recommended Action
                </span>
                <div className="bg-[#7C3AED] text-white rounded-xl p-3 flex justify-between items-center shadow-md">
                  <span className="font-bold text-sm">Smart Roaming Pack</span>
                  <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">
                    Potential Savings: ₹1,250
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Travel Statistics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Travel Statistics
              </h2>
              <div className="flex flex-col gap-0 divide-y divide-slate-100">
                {[
                  {
                    label: "Total Trips (6 Months)",
                    value: "18",
                    icon: <IconPlane size={16} />,
                  },
                  {
                    label: "Domestic Trips",
                    value: "15",
                    icon: <IconGlobe size={16} />,
                  },
                  {
                    label: "International Trips",
                    value: "3",
                    icon: <IconGlobe size={16} />,
                  },
                  {
                    label: "Days Travelled",
                    value: "46",
                    icon: <IconCalendar size={16} />,
                  },
                  {
                    label: "Top Travel Month",
                    value: "May 2025",
                    icon: <IconCalendar size={16} />,
                  },
                  {
                    label: "Roaming Sessions",
                    value: "8",
                    icon: <IconGlobe size={16} />,
                  },
                  {
                    label: "Estimated Spend Risk",
                    value: "₹4,150",
                    icon: <IconRupee size={16} />,
                    hl: true,
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3"
                  >
                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                      <span className="text-slate-400">{row.icon}</span>{" "}
                      {row.label}
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        row.hl ? "text-red-600" : "text-slate-900"
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Roaming Cost Breakdown */}
            <div
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
              style={{ height: "240px" }}
            >
              <h2 className="text-lg font-bold text-slate-900 mb-5">
                Roaming Cost Breakdown
              </h2>

              <div className="flex flex-col gap-5">
                {[
                  {
                    label: "Data Roaming",
                    pct: 55,
                    amount: "₹4,620",
                    color: THEME.purple,
                  },
                  {
                    label: "Call Charges",
                    pct: 28,
                    amount: "₹2,360",
                    color: THEME.travelBlue,
                  },
                  {
                    label: "SMS & Misc",
                    pct: 17,
                    amount: "₹1,440",
                    color: THEME.orange,
                  },
                ].map((row, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-xs font-bold text-slate-700">
                        {row.label}{" "}
                        <span className="text-slate-400 font-semibold ml-1">
                          {row.pct}%
                        </span>
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {row.amount}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${row.pct}%`,
                          backgroundColor: row.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
