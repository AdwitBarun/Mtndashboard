import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
  ReferenceLine,
} from "recharts"
import {
  ArrowLeft,
  Clock,
  MonitorPlay,
  TrendingDown,
} from "lucide-react"

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

const DATA_USAGE_TREND = [
  { month: "Sep '25", usageGB: 49 },
  { month: "Oct '25", usageGB: 52 },
  { month: "Nov '25", usageGB: 59 },
  { month: "Dec '25", usageGB: 54 },
  { month: "Jan '26", usageGB: 47 },
  { month: "Feb '26", usageGB: 43 },
]

const AVERAGE_DATA_USAGE =
  DATA_USAGE_TREND.reduce((total, item) => total + item.usageGB, 0) /
  DATA_USAGE_TREND.length

const PLATFORM_DATA = [
  { name: "Hotstar", hrs: 41, percent: 31, fill: "#2B6CB0" },
  { name: "Netflix", hrs: 32, percent: 24, fill: "#E50914" },
  { name: "YouTube", hrs: 22, percent: 17, fill: "#2F855A" },
  { name: "SonyLIV", hrs: 16, percent: 12, fill: "#805AD5" },
  { name: "Amazon Prime", hrs: 12, percent: 9, fill: "#DD6B20" },
  { name: "JioCinema", hrs: 9, percent: 7, fill: "#ED8936" },
]

const TOTAL_STREAMING_HOURS = PLATFORM_DATA.reduce(
  (sum, platform) => sum + platform.hrs,
  0,
)

const AVERAGE_MONTHLY_STREAMING_HOURS = Math.round(
  TOTAL_STREAMING_HOURS / 6,
)

export default function DataUsage() {
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
      <div className="p-4 md:p-6 lg:h-screen lg:flex lg:flex-col lg:overflow-hidden">
        {/* Top navigation */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <Link
            to={`/hub/${customer.id}/identity`}
            state={{ explorerSearch }}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "#7C3AED" }}
          >
            <ArrowLeft size={14} />
            Back to Customer Identity
          </Link>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-5">
              {STAGES_NAV.map((stage) => {
                const activeStageIndex = STAGES_NAV.findIndex(
                  (item) => item.key === "sense",
                )

                const stageIndex = STAGES_NAV.findIndex(
                  (item) => item.key === stage.key,
                )

                const isActive = stage.key === "sense"
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
              <span className="text-[10px] font-bold text-white">SPOG</span>
            </Link>
          </div>
        </div>

        {/* Breadcrumb */}
        <div
          className="flex items-center gap-1.5 text-xs mb-4 shrink-0"
          style={{ color: "#9CA3AF" }}
        >
          <Link
            to={`/hub/${customer.id}/identity`}
            state={{ explorerSearch }}
            className="transition-colors hover:text-[#7C3AED]"
            style={{ color: "#6B7280" }}
          >
            Customer Identity
          </Link>

          <span>›</span>
          <span>Sense</span>
          <span>›</span>

          <span style={{ color: "#1F2937", fontWeight: 600 }}>
            Data Usage
          </span>
        </div>

        {/* Page title */}
        <h1 className="text-xl font-bold mb-3 text-gray-900 shrink-0">
          Usage & Streaming Insights
        </h1>

        {/* Sense tabs */}
        <div
          className="flex items-center gap-1 mb-4 border-b shrink-0"
          style={{ borderColor: "#E2E2E6" }}
        >
          {SENSE_TABS.map((tab) => {
            const isActive = tab.key === "usage"

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() =>
                  navigate(`/hub/${customer.id}/${tab.path}`, {
                    state: { explorerSearch },
                  })
                }
                className="px-4 py-2 text-sm font-semibold transition-colors"
                style={
                  isActive
                    ? {
                        color: "#7C3AED",
                        borderBottom: "2px solid #7C3AED",
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

        {/* Main dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 flex-1 min-h-0">
          {/* Left column */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 min-h-0">
            {/* Main data-usage chart */}
            <div
              className="rounded-2xl border bg-white shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div className="flex items-start justify-between px-6 pt-5 pb-1 shrink-0">
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Monthly Data Usage Trend
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Monthly mobile data consumption for {customer.name}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5">
                  <TrendingDown size={13} style={{ color: "#EA580C" }} />

                  <span className="text-[10px] font-semibold text-orange-700">
                    Declining since November peak
                  </span>
                </div>
              </div>

              <div className="px-4 sm:px-6 pt-2 pb-4 flex-1 min-h-[250px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minWidth={0}
                  minHeight={0}
                >
                  <ComposedChart
                    data={DATA_USAGE_TREND}
                    margin={{
                      top: 26,
                      right: 20,
                      bottom: 4,
                      left: 8,
                    }}
                    barCategoryGap="35%"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#EEF2F7"
                    />

                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: 11,
                        fill: "#64748B",
                        fontWeight: 500,
                      }}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />

                    <YAxis
                      domain={[0, 65]}
                      ticks={[0, 15, 30, 45, 60]}
                      tick={{
                        fill: "#64748B",
                        fontSize: 11,
                      }}
                      axisLine={false}
                      tickLine={false}
                      width={35}
                    />

                    <RTooltip
                      cursor={{
                        fill: "rgba(109, 40, 217, 0.05)",
                      }}
                      formatter={(value: number) => [
                        `${value} GB`,
                        "Data Usage",
                      ]}
                      labelStyle={{
                        color: "#0F172A",
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #E2E8F0",
                        boxShadow:
                          "0 10px 25px rgba(15, 23, 42, 0.10)",
                      }}
                    />

                    {/* Horizontal average line based on Travel page */}
                    <ReferenceLine
                      y={AVERAGE_DATA_USAGE}
                      stroke="#94A3B8"
                      strokeWidth={1.5}
                      strokeDasharray="5 4"
                      ifOverflow="extendDomain"
                      label={{
                        value: `${Math.round(AVERAGE_DATA_USAGE)} GB Avg`,
                        position: "insideLeft",
                        fill: "#64748B",
                        fontSize: 10,
                        fontWeight: 700,
                        offset: 8,
                      }}
                    />

                    <Bar
                      dataKey="usageGB"
                      name="Data Usage"
                      fill="#6D28D9"
                      radius={[8, 8, 2, 2]}
                      maxBarSize={82}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
              {/* Month-over-month change */}
              <div
                className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <TrendingDown size={17} />
                  </div>

                  <div className="text-xs font-semibold text-gray-700 leading-tight">
                    Month-over-Month
                    <br />
                    Change
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-bold text-gray-900">
                    -10%
                  </span>

                  <span className="text-[10px] text-gray-500">
                    vs last month
                  </span>
                </div>
              </div>

              {/* Streaming share */}
              <div
                className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <MonitorPlay size={17} />
                  </div>

                  <div className="text-xs font-semibold text-gray-700 leading-tight">
                    Streaming Share
                    <br />
                    of Usage
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-bold text-gray-900">
                    68%
                  </span>

                  <span className="text-[10px] text-gray-500">
                    of total data
                  </span>
                </div>
              </div>

              {/* Peak usage window */}
              <div
                className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                    <Clock size={17} />
                  </div>

                  <div className="text-xs font-semibold text-gray-700 leading-tight">
                    Peak Usage
                    <br />
                    Window
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-bold text-gray-900">
                    9-11 PM
                  </span>

                  <span className="text-[10px] text-gray-500">IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6 min-h-0">
            {/* Monthly streaming card */}
            <div
              className="rounded-2xl border bg-white shadow-sm px-5 py-4 flex flex-col min-h-0 overflow-hidden"
              style={{ borderColor: "#E5E7EB" }}
            >
              <h2 className="text-base font-bold text-gray-900 shrink-0">
                Monthly Streaming Overview
              </h2>

              <div className="relative w-full h-[180px] shrink-0">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minWidth={0}
                  minHeight={0}
                >
                  <PieChart>
                    <Pie
                      data={PLATFORM_DATA}
                      dataKey="hrs"
                      cx="50%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={82}
                      paddingAngle={2}
                      stroke="#FFFFFF"
                      strokeWidth={1}
                    >
                      {PLATFORM_DATA.map((platform) => (
                        <Cell
                          key={platform.name}
                          fill={platform.fill}
                        />
                      ))}

                      <Label
                        content={({ viewBox }) => {
                          if (
                            !viewBox ||
                            !("cx" in viewBox) ||
                            !("cy" in viewBox)
                          ) {
                            return null
                          }

                          const cx = viewBox.cx
                          const cy = viewBox.cy

                          return (
                            <g>
                              <text
                                x={cx}
                                y={cy - 15}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#64748B"
                                fontSize="10"
                                fontWeight="500"
                              >
                                Monthly Average
                              </text>

                              <text
                                x={cx}
                                y={cy + 5}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#0F172A"
                                fontSize="26"
                                fontWeight="800"
                              >
                                {AVERAGE_MONTHLY_STREAMING_HOURS}h
                              </text>

                              <text
                                x={cx}
                                y={cy + 24}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#94A3B8"
                                fontSize="9"
                                fontWeight="500"
                              >
                                Streaming Hours
                              </text>
                            </g>
                          )
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 min-h-0">
                {PLATFORM_DATA.map((platform) => (
                  <div
                    key={platform.name}
                    className="flex items-center justify-between gap-2 min-w-0"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: platform.fill }}
                      />

                      <span className="text-[11px] font-medium text-gray-700 truncate">
                        {platform.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[11px] font-bold text-gray-900">
                        {platform.hrs}h
                      </span>

                      <span className="text-[10px] text-gray-400">
                        {platform.percent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live sports card */}
            <div
              className="rounded-2xl border bg-white shadow-sm px-5 py-4 min-h-0 overflow-hidden"
              style={{ borderColor: "#E5E7EB" }}
            >
              <h2 className="text-base font-bold text-gray-900 mb-3">
                Live Sports & Events
              </h2>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-purple-100 bg-purple-50/70 p-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm mb-2">
                    <span className="text-sm">🏏</span>
                  </div>

                  <p className="text-[11px] font-bold text-gray-900 leading-snug">
                    IPL 2026
                  </p>

                  <p className="text-[10px] font-medium text-purple-700 mt-0.5">
                    Mar – May
                  </p>

                  <p className="text-[10px] text-gray-500 mt-2 leading-snug">
                    Weekend and playoff usage peaks
                  </p>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm mb-2">
                    <span className="text-sm">🏎️</span>
                  </div>

                  <p className="text-[11px] font-bold text-gray-900 leading-snug">
                    Formula 1
                  </p>

                  <p className="text-[10px] font-medium text-blue-700 mt-0.5">
                    Mar – Dec
                  </p>

                  <p className="text-[10px] text-gray-500 mt-2 leading-snug">
                    Late-night race-day spikes
                  </p>
                </div>

                <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm mb-2">
                    <span className="text-sm">🏆</span>
                  </div>

                  <p className="text-[11px] font-bold text-gray-900 leading-snug">
                    Champions Trophy
                  </p>

                  <p className="text-[10px] font-medium text-orange-700 mt-0.5">
                    February
                  </p>

                  <p className="text-[10px] text-gray-500 mt-2 leading-snug">
                    Match-day streaming uplift
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}