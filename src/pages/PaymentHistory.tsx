import React from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Layout from "../components/Layout"
import { getCustomer } from "../data/customers"

const STAGES_NAV = [
  { key: "sense", label: "Sense", path: "identity" },
  { key: "decide", label: "Decide", path: "pain-points" },
  { key: "engage", label: "Engage", path: "content-studio" },
  { key: "optimize", label: "Optimize", path: "feedback" },
]

const SENSE_TABS = [
  { key: "identity", label: "Customer Identity", path: "identity" },
  { key: "usage", label: "Data Usage", path: "usage" },
  { key: "travel", label: "Travel", path: "travel" },
  { key: "payments", label: "Payment", path: "payments" },
]

const THEME = {
  maroon: "#7C3AED",
  darkMaroon: "#4F46E5",
  green: "#16A34A",
  lightGreen: "#E8F7EF",
  gold: "#D4A017",
  softGray: "#F8F8FA",
  borderGray: "#E5E7EB",
}

type IconProps = {
  size?: number
  color?: string
  className?: string
}

const SolidCalendarCheck = ({
  size = 24,
  color = "currentColor",
  className,
}: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM10.56 17.46L16.5 11.53L15.08 10.11L10.56 14.63L8.42 12.49L7 13.91L10.56 17.46Z" />
  </svg>
)

const SolidWallet = ({
  size = 24,
  color = "currentColor",
  className,
}: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 7.28V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V16.72C21.59 16.37 22 15.74 22 15V9C22 8.26 21.59 7.63 21 7.28ZM20 15H16V9H20V15ZM5 19V5H19V7H16C14.9 7 14 7.9 14 9V15C14 16.1 14.9 17 16 17H19V19H5ZM17 10.5C17.83 10.5 18.5 11.17 18.5 12C18.5 12.83 17.83 13.5 17 13.5C16.17 13.5 15.5 12.83 15.5 12C15.5 11.17 16.17 10.5 17 10.5Z" />
  </svg>
)

const SolidTrendingUp = ({
  size = 24,
  color = "currentColor",
  className,
}: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" />
  </svg>
)

const SolidShieldCheck = ({
  size = 24,
  color = "currentColor",
  className,
}: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" />
  </svg>
)

const SolidCheckCircle = ({
  size = 24,
  color = "currentColor",
  className,
}: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 7.58L19 9L10 17Z" />
  </svg>
)

const CHART_DATA = [
  { month: "Sep '25", value: 2050 },
  { month: "Oct '25", value: 1950 },
  { month: "Nov '25", value: 1850 },
  { month: "Dec '25", value: 1700 },
  { month: "Jan '26", value: 1550 },
  { month: "Feb '26", value: 1399 },
]

const MAX_VAL = 3000
const Y_AXIS_STEPS = [3000, 2500, 2000, 1500, 1000, 500, 0]
const AVERAGE_RECHARGE = 1750

export default function PaymentHistory() {
  const { customerId } = useParams<{ customerId: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const explorerSearch =
    (location.state as { explorerSearch?: string } | null)?.explorerSearch ?? ""

  const customer = getCustomer(customerId ?? "")

  if (!customer) {
    return (
      <Layout>
        <div className="p-8">
          <p style={{ color: "#6B7280" }}>Customer not found.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-6 md:p-8 min-h-screen">
        {/* Header and navigation */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to={`/hub/${customer.id}/identity`}
            state={{ explorerSearch }}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: THEME.maroon }}
          >
            <ArrowLeft size={14} />
            Back to Customer Identity
          </Link>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-5">
              {STAGES_NAV.map((stage) => {
                const isActive = stage.key === "sense"
                const activeStageIndex = STAGES_NAV.findIndex(
                  (item) => item.key === "sense",
                )
                const stageIndex = STAGES_NAV.findIndex(
                  (item) => item.key === stage.key,
                )
                const isCompleted = stageIndex < activeStageIndex

                return (
                  <button
                    key={stage.key}
                    type="button"
                    onClick={() =>
                      navigate(`/hub/${customer.id}/${stage.path}`, {
                        state: { explorerSearch },
                      })
                    }
                    className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70"
                    title={stage.label}
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={
                        isActive
                          ? { background: "#7C3AED" }
                          : isCompleted
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
                          : isCompleted
                            ? "#8B5CF6"
                            : "#CBD5E1",
                      }}
                    >
                      {stage.label}
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
        <div className="flex items-center gap-1.5 text-xs mb-4 text-slate-400">
          <Link
            to={`/hub/${customer.id}/identity`}
            state={{ explorerSearch }}
            className="transition-colors hover:text-slate-600"
          >
            Customer Identity
          </Link>

          <span>›</span>
          <span>Sense</span>
          <span>›</span>

          <span className="text-slate-800 font-semibold">
            Payment History
          </span>
        </div>

        {/* Sense tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-slate-200">
          {SENSE_TABS.map((tab) => {
            const active = tab.key === "payments"

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() =>
                  navigate(`/hub/${customer.id}/${tab.path}`, {
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
                    : {
                        color: "#6B7280",
                      }
                }
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Dashboard 70/30 split layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[70%_calc(30%-1.5rem)] gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Recharge Timeline Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Recharge Timeline
                  </h2>

                  <p className="text-sm font-medium text-slate-500 mt-1">
                    On-Time Recharge Pattern (Last 6 Months)
                  </p>
                </div>

                <div className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 bg-slate-50 cursor-pointer">
                  Last 6 Months ▼
                </div>
              </div>

              <div className="relative h-[280px] w-full flex">
                {/* Y-axis */}
                <div className="flex flex-col justify-between h-full pr-4 text-xs font-semibold text-slate-400">
                  {Y_AXIS_STEPS.map((value) => (
                    <span key={value}>₹{value}</span>
                  ))}
                </div>

                {/* Chart area */}
                <div className="flex-1 relative flex items-end justify-between px-4 pb-0 h-full border-l border-b border-slate-200">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {Y_AXIS_STEPS.map((_, index) => (
                      <div
                        key={index}
                        className="w-full h-px border-b border-dotted border-slate-200"
                      />
                    ))}
                  </div>

                  {/* Average recharge line */}
                  <div
                    className="absolute w-full border-b border-dashed border-slate-400 z-0 flex items-center pointer-events-none"
                    style={{
                      bottom: `${(AVERAGE_RECHARGE / MAX_VAL) * 100}%`,
                      left: 0,
                    }}
                  >
                    <span className="absolute -left-12 text-[10px] font-bold text-slate-500 bg-white pr-1 whitespace-nowrap">
                      ₹1,750 Avg
                    </span>
                  </div>

                  {/* Recharge bars */}
                  {CHART_DATA.map((data) => {
                    const heightPercentage =
                      (data.value / MAX_VAL) * 100

                    return (
                      <div
                        key={data.month}
                        className="relative flex flex-col items-center group w-[10%] max-w-[50px] z-10 h-full justify-end"
                      >
                        {/* Amount label. Green tick removed. */}
                        <div
                          className="absolute flex flex-col items-center"
                          style={{
                            bottom: `calc(${heightPercentage}% + 10px)`,
                          }}
                        >
                          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                            ₹{data.value.toLocaleString("en-IN")}
                          </span>
                        </div>

                        {/* Bar */}
                        <div
                          className="w-full rounded-t-lg transition-all duration-300 group-hover:brightness-110"
                          style={{
                            height: `${heightPercentage}%`,
                            background: "#6D28D9",
                          }}
                        />

                        {/* X-axis label */}
                        <div className="absolute -bottom-8 text-xs font-bold text-slate-600 whitespace-nowrap">
                          {data.month}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Legend. Spend Trend removed. */}
              <div className="flex items-center gap-6 mt-12 text-sm font-semibold text-slate-600">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "#6D28D9" }}
                  />
                  On-time Recharge
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-4 border-b-2 border-dashed border-slate-400" />
                  Average Recharge
                </div>
              </div>
            </div>

            {/* Payment KPI strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-3">
                  <SolidCalendarCheck size={20} color={THEME.green} />
                </div>

                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  On-Time Recharges
                </span>

                <span className="text-2xl font-bold text-slate-900 mt-1 mb-1">
                  6 / 6
                </span>

                <span className="text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                  100% Success Rate
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <SolidWallet size={20} color="#2563EB" />
                </div>

                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Total Spend
                </span>

                <span className="text-2xl font-bold text-slate-900 mt-1 mb-1">
                  ₹10,499
                </span>

                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Last 6 Months
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                  <SolidTrendingUp size={20} color="#7C3AED" />
                </div>

                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Avg Recharge
                </span>

                <span className="text-2xl font-bold text-slate-900 mt-1 mb-1">
                  ₹1,750
                </span>

                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  Recent Decline
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                  <SolidShieldCheck size={20} color="#D97706" />
                </div>

                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Payment Reliability
                </span>

                <span className="text-2xl font-bold text-slate-900 mt-1 mb-1">
                  100%
                </span>

                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Perfect Payment Record
                </span>
              </div>
            </div>

            {/* Payment behaviour analysis */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-5">
                Payment Behaviour Analysis
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Recharge Frequency
                  </span>

                  <span className="text-lg font-bold text-slate-900 mb-2">
                    Monthly
                  </span>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Always recharges before due date.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Base Plan ARPU
                  </span>

                  <span className="text-lg font-bold text-slate-900 mb-2">
                    ₹1,699
                  </span>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Most frequent recharge value.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Payment Pattern
                  </span>

                  <span className="text-lg font-bold text-slate-900 mb-2">
                    Highly Consistent
                  </span>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    No missed cycle in 18 months.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Auto Recharge
                  </span>

                  <span className="text-lg font-bold text-green-700 mb-2">
                    Enabled
                  </span>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Recurring payment active.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Payment KPIs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Payment KPIs
              </h2>

              <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative w-32 h-32">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="10"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={THEME.green}
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900 leading-none">
                      100
                    </span>

                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      out of 100
                    </span>
                  </div>
                </div>

                <div className="mt-4 px-4 py-1.5 bg-green-50 text-green-700 font-bold text-sm rounded-full">
                  Reliability Score
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  {
                    label: "On-Time Payment",
                    value: "100%",
                    highlighted: true,
                  },
                  {
                    label: "Auto Recharge",
                    value: "100%",
                    highlighted: true,
                  },
                  {
                    label: "Failed Payments",
                    value: "0",
                    highlighted: false,
                  },
                  {
                    label: "Payment Method",
                    value: "UPI (PhonePe)",
                    highlighted: false,
                  },
                  {
                    label: "Backup Payment",
                    value: "Credit Card",
                    highlighted: false,
                  },
                  {
                    label: "Last Payment Date",
                    value: "28 Feb 2025",
                    highlighted: false,
                  },
                  {
                    label: "Next Recharge Due",
                    value: "28 Mar 2025",
                    highlighted: false,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
                  >
                    <span className="text-xs font-semibold text-slate-500">
                      {row.label}
                    </span>

                    <span
                      className={`text-xs font-bold ${
                        row.highlighted
                          ? "text-green-700"
                          : "text-slate-900"
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Perfect payment reliability */}
            <div
              className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-2xl p-6 shadow-sm"
              style={{ height: "150px" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <SolidShieldCheck size={20} color={THEME.green} />

                <h2 className="text-lg font-bold text-green-900">
                  Perfect Payment Reliability
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-green-200">
                  <SolidCheckCircle
                    size={16}
                    color={THEME.green}
                    className="mb-2"
                  />

                  <div className="text-[11px] font-bold text-green-900 mb-0.5">
                    No Payment Failures
                  </div>

                  <div className="text-[10px] font-semibold text-green-700 opacity-80">
                    Last 180 Days
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-green-200">
                  <SolidShieldCheck
                    size={16}
                    color={THEME.green}
                    className="mb-2"
                  />

                  <div className="text-[11px] font-bold text-green-900 mb-0.5">
                    Zero Declines
                  </div>

                  <div className="text-[10px] font-semibold text-green-700 opacity-80">
                    High Reliability
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue KPIs */}
            <div className="bg-gradient-to-br from-slate-900 to-[#1F2937] rounded-2xl p-6 shadow-md border border-slate-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex gap-6 divide-x divide-slate-700">
                <div className="flex-1 pr-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                    Monthly ARPU
                  </h3>

                  <div className="text-2xl font-bold text-white mb-1">
                    ₹{customer.arpu.toLocaleString("en-IN")}
                  </div>

                  <div className="text-xs font-bold text-green-400">
                    ↑ 12%
                  </div>
                </div>

                <div className="flex-1 pl-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                    Proj LTV (2 yr)
                  </h3>

                  <div className="text-2xl font-bold text-amber-400 mb-1">
                    {customer.lifetimeValue.replace(
                      " (2-yr proj)",
                      "",
                    )}
                  </div>

                  <div className="text-xs font-bold text-amber-500/80">
                    Premium Tier
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}