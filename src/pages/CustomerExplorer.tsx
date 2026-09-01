import { useState, useMemo, useCallback } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search, TrendingUp, Users, Target, Activity as ActivityIcon,
  SlidersHorizontal,
} from "lucide-react"
import Layout from "../components/Layout"
import RangeSlider from "../components/RangeSlider"
import {
  customers,
  getRiskBand,
  SEGMENT_STYLE,
  STRATEGY_STYLE,
  RISK_STYLE,
  Customer,
} from "../data/customers"
import type { Segment, Strategy, PlanType, Region } from "../data/customers"

const SEGMENTS: Segment[] = [
  "Early Life Subscribers",
  "Loyal Family Accounts",
  "Budget New Joiners",
  "Android Sociables",
  "Younger Techies",
  "Premium Data Explorers",
  "Frequent Travel Professionals",
  "Silent Decliners",
]
const STRATEGIES: Strategy[] = ["Retention", "Upsell", "Cross-Sell"]
const PLAN_TYPES: PlanType[] = [
  "Prepaid Individual",
  "Prepaid Family",
  "Postpaid Individual",
  "Postpaid Family",
]
const REGIONS: Region[] = ["North", "South", "East", "West", "Central"]
const PAGE_SIZE = 10

type SortKey = "id" | "name" | "segment" | "region" | "tenure" | "arpu" | "risk" | "strategy"
type SortDir = "asc" | "desc"

function Badge({ label, bg, text }: { label: string bg: string text: string }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ background: bg, color: text }}
    >
      {label}
    </span>
  )
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 px-3 text-sm rounded-lg border outline-none cursor-pointer appearance-none pr-8 font-medium"
      style={{
        borderColor: "#E2E2E6",
        background: "white",
        color: value ? "#1F2937" : "#6B7280",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

function CustomerRow({
  c,
  index,
  onClick,
}: {
  c: Customer
  index: number
  onClick: () => void
}) {
  const rb = getRiskBand(c.risk)
  const riskStyle = RISK_STYLE[rb]
  const segStyle = SEGMENT_STYLE[c.segment]
  const stratStyle = STRATEGY_STYLE[c.strategy]

  // Format region to show city if it's an Indian city (ignoring UK for the new design feel)
  // The new generated cities are UK based (like Sheffield, UK). For the first 10, they are Mumbai, Kolkata, etc.
  const isUK = c.location.includes("UK")
  const regionDisplay = isUK ? c.region : `${c.location} (${c.region})`

  return (
    <tr
      onClick={onClick}
      className="cursor-pointer transition-colors hover:bg-[#FBEAEE]/40 border-b last:border-b-0"
      style={{
        borderColor: "#F3F4F6",
        background: index % 2 === 0 ? "white" : "#FAFAFA",
      }}
    >
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs" style={{ background: "#9CA3AF" }}>
            {c.initials}
          </div>
          <div>
            <div
              className="text-sm font-semibold flex items-center gap-1.5"
              style={{ color: "#1F2937" }}
            >
              {c.name}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
              {c.id}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <Badge label={c.segment} bg={segStyle.bg} text={segStyle.text} />
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: "#1F2937" }}>
        {regionDisplay}
      </td>
      <td className="px-4 py-3.5 text-sm" style={{ color: "#1F2937" }}>
        {c.tenure} mo
      </td>
      <td
        className="px-4 py-3.5 whitespace-nowrap text-sm font-semibold"
        style={{ color: "#1F2937" }}
      >
        ₹{c.arpu.toLocaleString("en-IN")}
      </td>
      <td className="px-4 py-3.5">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            background: riskStyle.bg,
            color: riskStyle.text,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: riskStyle.text }}
          />
          {c.risk.toFixed(2)}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <Badge label={c.strategy} bg={stratStyle.bg} text={stratStyle.text} />
      </td>
    </tr>
  )
}

export default function CustomerExplorer() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const getParam = (k: string, def = "") => searchParams.get(k) ?? def

  const [pendingSegment, setPendingSegment] = useState(getParam("segment"))
  const [pendingRisk, setPendingRisk] = useState(getParam("risk"))
  const [pendingStrategy, setPendingStrategy] = useState(getParam("strategy"))
  const [pendingPlan, setPendingPlan] = useState(getParam("plan"))
  const [pendingRegion, setPendingRegion] = useState(getParam("region"))
  const [pendingTenure, setPendingTenure] = useState<[number, number]>([
    parseInt(getParam("tenureMin", "0")),
    parseInt(getParam("tenureMax", "72")),
  ])

  const activeSegment = getParam("segment")
  const activeRisk = getParam("risk")
  const activeStrategy = getParam("strategy")
  const activePlan = getParam("plan")
  const activeRegion = getParam("region")
  const activeTenureMin = parseInt(getParam("tenureMin", "0"))
  const activeTenureMax = parseInt(getParam("tenureMax", "72"))

  const [sortKey, setSortKey] = useState<SortKey>("id")
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [page, setPage] = useState(parseInt(getParam("page", "1")))
  const [search, setSearch] = useState(getParam("q"))

  const applyFilters = () => {
    const p = new URLSearchParams()
    if (pendingSegment) p.set("segment", pendingSegment)
    if (pendingRisk) p.set("risk", pendingRisk)
    if (pendingStrategy) p.set("strategy", pendingStrategy)
    if (pendingPlan) p.set("plan", pendingPlan)
    if (pendingRegion) p.set("region", pendingRegion)
    if (pendingTenure[0] > 0) p.set("tenureMin", String(pendingTenure[0]))
    if (pendingTenure[1] < 72) p.set("tenureMax", String(pendingTenure[1]))
    if (search) p.set("q", search)
    p.set("page", "1")
    setSearchParams(p)
    setPage(1)
  }

  const reset = () => {
    setPendingSegment("")
    setPendingRisk("")
    setPendingStrategy("")
    setPendingPlan("")
    setPendingRegion("")
    setPendingTenure([0, 72])
    setSearch("")
    setSearchParams({})
    setPage(1)
  }

  const handleSort = useCallback(
    (key: SortKey) => {
      if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
      else {
        setSortKey(key)
        setSortDir("asc")
      }
    },
    [sortKey],
  )

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      if (activeSegment && c.segment !== activeSegment) return false
      if (activeRisk) {
        const rb = getRiskBand(c.risk)
        if (rb !== activeRisk) return false
      }
      if (activeStrategy && c.strategy !== activeStrategy) return false
      if (activePlan && c.planType !== activePlan) return false
      if (activeRegion && c.region !== activeRegion) return false
      if (
        c.tenure < activeTenureMin ||
        (activeTenureMax < 72 && c.tenure > activeTenureMax)
      )
        return false
      if (search) {
        const q = search.toLowerCase()
        if (
          !c.name.toLowerCase().includes(q) &&
          !c.id.toLowerCase().includes(q) &&
          !c.segment.toLowerCase().includes(q) &&
          !c.region.toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  }, [
    activeSegment,
    activeRisk,
    activeStrategy,
    activePlan,
    activeRegion,
    activeTenureMin,
    activeTenureMax,
    search,
  ])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.id === "SUB-10001") return -1
      if (b.id === "SUB-10001") return 1

      let av: string | number = 0
      let bv: string | number = 0
      if (sortKey === "id") {
        av = a.id
        bv = b.id
      } else if (sortKey === "name") {
        av = a.name
        bv = b.name
      } else if (sortKey === "segment") {
        av = a.segment
        bv = b.segment
      } else if (sortKey === "region") {
        av = a.region
        bv = b.region
      } else if (sortKey === "tenure") {
        av = a.tenure
        bv = b.tenure
      } else if (sortKey === "arpu") {
        av = a.arpu
        bv = b.arpu
      } else if (sortKey === "risk") {
        av = a.risk
        bv = b.risk
      } else if (sortKey === "strategy") {
        av = a.strategy
        bv = b.strategy
      }
      if (typeof av === "string")
        return sortDir === "asc"
          ? av.localeCompare(bv as string)
          : (bv as string).localeCompare(av)
      return sortDir === "asc"
        ? (av as number - bv) as number
        : (bv as number - av) as number
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageRows = sorted.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k)
      return <span className="ml-1 opacity-25 text-[10px]">↕</span>
    return sortDir === "asc" ? (
      <ChevronUp size={12} className="ml-0.5 inline" />
    ) : (
      <ChevronDown size={12} className="ml-0.5 inline" />
    )
  }

  const Th = ({
    children,
    k,
    cls = "",
  }: {
    children: React.ReactNode
    k: SortKey
    cls?: string
  }) => (
    <th
      className={`px-4 py-3 text-left text-xs font-semibold cursor-pointer select-none whitespace-nowrap hover:opacity-70 transition-opacity ${cls}`}
      style={{ color: "#6B7280" }}
      onClick={() => handleSort(k)}
    >
      {children}
      <SortIcon k={k} />
    </th>
  )

  return (
    <Layout>
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1
              className="text-2xl font-bold mb-1"
              style={{ color: "#1F2937" }}
            >
              Customer Explorer
            </h1>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Every customer&apos;s best strategy — cross-sell, upsell,
              retention
            </p>
          </div>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#9CA3AF" }}
            />
            <input
              type="text"
              placeholder="Search subscribers, segments, or regions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              className="pl-9 pr-4 h-9 text-sm rounded-lg border outline-none w-72"
              style={{ borderColor: "#E2E2E6", color: "#1F2937" }}
            />
          </div>
        </div>

        
        {/* Summary Chips */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Base", value: "1.2M", icon: Users, color: "#4F46E5" },
            { label: "High Risk", value: "149k", icon: ActivityIcon, color: "#EC7A5C" },
            { label: "Avg ARPU", value: "₹459", icon: TrendingUp, color: "#7C3AED" },
            { label: "Recommended Offers", value: "27", icon: Target, color: "#10B981" }
          ].map((stat, i) => (
            <div key={i} className="border rounded-xl p-4 flex items-center gap-4" style={{ borderColor: "rgba(255,255,255,0.35)", background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC7A5C 100%)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFFFFF" }}>
                <stat.icon size={18} style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs font-medium text-white/80">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div
          className="rounded-xl border p-4 mb-5 bg-white"
          style={{ borderColor: "#E2E2E6" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal size={14} style={{ color: "#7C3AED" }} />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#6B7280" }}
            >
              Filters
            </span>
          </div>
          <div className="flex flex-wrap gap-3 items-end">
            <Select
              value={pendingSegment}
              onChange={setPendingSegment}
              options={SEGMENTS}
              placeholder="All Segments"
            />
            <Select
              value={pendingRisk}
              onChange={setPendingRisk}
              options={["Low", "Medium", "High"]}
              placeholder="Risk Band"
            />
            <Select
              value={pendingStrategy}
              onChange={setPendingStrategy}
              options={STRATEGIES}
              placeholder="Strategy"
            />
            <Select
              value={pendingPlan}
              onChange={setPendingPlan}
              options={PLAN_TYPES}
              placeholder="Plan Type"
            />
            <Select
              value={pendingRegion}
              onChange={setPendingRegion}
              options={REGIONS}
              placeholder="Region"
            />
            <div className="w-52">
              <RangeSlider
                min={0}
                max={72}
                value={pendingTenure}
                onChange={setPendingTenure}
                label="Tenure"
                unit=" mo"
                maxLabel="72+ mo"
              />
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={reset}
                className="h-9 px-4 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
                style={{ borderColor: "#E2E2E6", color: "#6B7280" }}
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="h-9 px-5 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-85"
                style={{
                  background:
                    "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-xl border bg-white overflow-hidden"
          style={{ borderColor: "#E2E2E6" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead
                style={{
                  borderBottom: "1px solid #E2E2E6",
                  background: "#FAFAFA",
                }}
              >
                <tr>
                  <Th k="id">Subscriber</Th>
                  <Th k="segment">Segment</Th>
                  <Th k="region">Region (City)</Th>
                  <Th k="tenure">Tenure</Th>
                  <Th k="arpu">ARPU</Th>
                  <Th k="risk">Risk</Th>
                  <Th k="strategy">Best Strategy</Th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((c, i) => (
                  <CustomerRow
                    key={c.id}
                    c={c}
                    index={i}
                    onClick={() =>
                      navigate(`/hub/${c.id}/identity`, {
                        state: { explorerSearch: window.location.search },
                      })
                    }
                  />
                ))}
                {pageRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-sm"
                      style={{ color: "#9CA3AF" }}
                    >
                      No subscribers match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className="flex items-center justify-between px-4 py-3 border-t"
            style={{ borderColor: "#E2E2E6" }}
          >
            <span className="text-xs" style={{ color: "#6B7280" }}>
              Showing {sorted.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}
              –{Math.min(safePage * PAGE_SIZE, sorted.length)} of{" "}
              {sorted.length} subscribers
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100 disabled:opacity-30"
                style={{ border: "1px solid #E2E2E6" }}
              >
                <ChevronLeft size={14} style={{ color: "#6B7280" }} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 || p === totalPages || Math.abs(p - safePage) <= 1,
                )
                .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && (p as number - arr[idx - 1]) as number > 1)
                    acc.push("...")
                  acc.push(p)
                  return acc
                }, [])
                .map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`e${i}`}
                      className="w-8 h-8 flex items-center justify-center text-xs"
                      style={{ color: "#9CA3AF" }}
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p as number)}
                      className="w-8 h-8 rounded-lg text-xs font-semibold transition-colors"
                      style={
                        safePage === p
                          ? { background: "#7C3AED", color: "white" }
                          : { border: "1px solid #E2E2E6", color: "#6B7280" }
                      }
                    >
                      {p}
                    </button>
                  ),
                )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100 disabled:opacity-30"
                style={{ border: "1px solid #E2E2E6" }}
              >
                <ChevronRight size={14} style={{ color: "#6B7280" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
