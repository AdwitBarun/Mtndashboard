import React, { useState, useRef, useLayoutEffect } from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import {
  ArrowLeft,
  AlertTriangle,
  ChevronRight,
  Globe,
  Shield,
  Activity,
  Network,
  Percent,
  BrainCircuit,
  ActivitySquare,
} from "lucide-react"
import Layout from "../components/Layout"
import { getCustomer } from "../data/customers"

const STAGES_NAV = [
  { key: "understand", label: "Understand", path: "identity" },
  { key: "sense", label: "Sense", path: "usage" },
  { key: "decide", label: "Decide", path: "pain-points" },
  { key: "engage", label: "Engage", path: "content-studio" },
  { key: "optimize", label: "Optimize", path: "feedback" },
]
const DECIDE_TABS = [
  { key: "pain-points", label: "Pain Points & Recommended Offers", path: "pain-points" },
  { key: "nba", label: "Next Best Action Engine", path: "nba" },
]

const THEME = {
  maroon: "#7C3AED",
  darkMaroon: "#4F46E5",
  green: "#16A34A",
  orange: "#F59E0B",
  red: "#DC2626",
  blue: "#2563EB",
  purple: "#7C3AED",
}

const PP_DATA = [
  {
    id: "pp1",
    title: "High Data Usage During Travel",
    desc: "Consumes more data while roaming leading to premium roaming charges.",
    severity: "High",
    impact: "Potential dissatisfaction during travel periods.",
    risk: "₹450 annually",
    icon: ActivitySquare,
  },
  {
    id: "pp2",
    title: "Call Drops During Transit",
    desc: "Frequent connectivity interruptions while commuting.",
    severity: "Medium",
    impact: "Interrupted business calls.",
    risk: "₹310 annually",
    icon: Network,
  },
  {
    id: "pp3",
    title: "Bill Shock After Roaming",
    desc: "Unexpected roaming charges generating customer frustration.",
    severity: "High",
    impact: "High churn probability.",
    risk: "₹620 annually",
    icon: AlertTriangle,
  },
  {
    id: "pp4",
    title: "Network Speed Inconsistency",
    desc: "Variable network experience across visited locations.",
    severity: "Medium",
    impact: "Degraded streaming quality.",
    risk: "₹280 annually",
    icon: Activity,
  },
]

const AI_NODES = [
  { id: "ai1", title: "Travel Pattern Match", conf: "91%" },
  { id: "ai2", title: "Premium Eligibility", conf: "84%" },
  { id: "ai3", title: "Roaming Affinity", conf: "88%" },
]

const OFFERS_DATA = [
  {
    id: "off1",
    title: "Smart Roaming Pack",
    desc: "Affordable international roaming package designed for frequent travelers.",
    badge: "Best Match",
    conf: 82,
    impact: "Reduces roaming charges by 60%",
    value: "+₹1,290",
    retention: "High",
    icon: Globe,
  },
  {
    id: "off2",
    title: "Network Assurance Add-on",
    desc: "Priority network routing and quality assurance during travel.",
    badge: "Cross Sell",
    conf: 67,
    impact: "Stabilizes connection drops.",
    value: "+₹620",
    retention: "Medium",
    icon: Shield,
  },
  {
    id: "off3",
    title: "Bill Protection Plan",
    desc: "Protects customers from unexpected roaming costs.",
    badge: "Upsell",
    conf: 58,
    impact: "Prevents bill shock.",
    value: "+₹430",
    retention: "High",
    icon: Percent,
  },
]

// Definition of paths matching the prompt's examples
const CONNECTIONS = [
  {
    from: "pp1",
    toAI: "ai1",
    toOffer: "off1",
    color: THEME.purple,
  }, // High Data Usage During Travel -> Travel Pattern Match -> Smart Roaming Pack

  {
    from: "pp2",
    toAI: "ai2",
    toOffer: "off2",
    color: THEME.green,
  }, // Call Drops During Transit -> Premium Eligibility -> Network Assurance Add-on

  {
    from: "pp3",
    toAI: "ai3",
    toOffer: "off3",
    color: THEME.orange,
  }, // Bill Shock After Roaming -> Roaming Affinity -> Bill Protection Plan

  {
    from: "pp4",
    toAI: "ai1",
    toOffer: "off1",
    color: THEME.purple,
  }, // Network Speed Inconsistency -> Travel Pattern Match -> Smart Roaming Pack
]

export default function PainPoints() {
  const { customerId } = useParams<{ customerId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const explorerSearch =
    (location.state as { explorerSearch?: string } | null)?.explorerSearch ?? ""

  const customer = getCustomer(customerId ?? "")

  const [hoveredPP, setHoveredPP] = useState<string | null>(null)
  const [hoveredOffer, setHoveredOffer] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const ppRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const aiRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const offerRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [rects, setRects] = useState<{
    pp: Record<string, DOMRect>
    ai: Record<string, DOMRect>
    offer: Record<string, DOMRect>
    container: DOMRect | null
  }>({ pp: {}, ai: {}, offer: {}, container: null })

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const container = containerRef.current.getBoundingClientRect()
      const ppRects: Record<string, DOMRect> = {}
      const aiRects: Record<string, DOMRect> = {}
      const offerRects: Record<string, DOMRect> = {}

      Object.entries(ppRefs.current).forEach(([id, el]) => {
        if (el) ppRects[id] = el.getBoundingClientRect()
      })
      Object.entries(aiRefs.current).forEach(([id, el]) => {
        if (el) aiRects[id] = el.getBoundingClientRect()
      })
      Object.entries(offerRefs.current).forEach(([id, el]) => {
        if (el) offerRects[id] = el.getBoundingClientRect()
      })

      setRects({ pp: ppRects, ai: aiRects, offer: offerRects, container })
    }

    measure()
    window.addEventListener("resize", measure)
    const ro = new ResizeObserver(() => measure())
    if (containerRef.current) ro.observe(containerRef.current)

    return () => {
      window.removeEventListener("resize", measure)
      ro.disconnect()
    }
  }, [])

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
      <div className="p-6 md:p-8 min-h-screen">
        {/* Header & Nav */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to={"/hub/" + customer.id + "/identity"}
            state={{ explorerSearch }}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: THEME.maroon }}
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
          <span style={{ color: "#1F2937", fontWeight: 600 }}>Pain Points</span>
        </div>

        <div
          className="flex items-center gap-1 mb-8 border-b"
          style={{ borderColor: "#E2E2E6" }}
        >
          {DECIDE_TABS.map((tab) => {
            const active = tab.key === "pain-points"
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

        {/* Banner */}
        <div className="mb-10 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h1 className="text-3xl font-bold mb-2 text-slate-900">
            Friction Analysis
          </h1>
          <p className="text-slate-600 mb-6 text-base font-medium">
            4 customer pain points identified &middot; 3 retention opportunities
            recommended &middot;
            <span className="text-slate-900 font-semibold ml-1">
              Estimated annual retention value: ₹2,340
            </span>
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "High Churn Signals",
              "Travel Friction",
              "Usage Cap Risk",
              "Premium Upgrade Candidate",
            ].map((chip) => (
              <span
                key={chip}
                className="px-3 py-1.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wide"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Main Flow Section */}
        <div
          className="relative mb-10 bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-200"
          ref={containerRef}
        >
          {/* Connectors */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0, overflow: "visible" }}
          >
            {CONNECTIONS.map((c, i) => {
              const ppR = rects.pp[c.from]
              const aiR = rects.ai[c.toAI]
              const offR = rects.offer[c.toOffer]
              const cR = rects.container

              if (!ppR || !aiR || !offR || !cR) return null

              const isHovered =
                hoveredPP === c.from || hoveredOffer === c.toOffer
              const isAnyHovered = hoveredPP !== null || hoveredOffer !== null

              const strokeColor = isHovered
                ? c.color
                : isAnyHovered
                  ? "#F1F5F9"
                  : "#CBD5E1"
              const strokeWidth = isHovered ? 3 : 2
              const zIndex = isHovered ? 10 : 1

              // Node 1 (Pain Point) to Node 2 (AI)
              const x1 = ppR.right - cR.left
              const y1 = ppR.top + ppR.height / 2 - cR.top
              const x2 = aiR.left - cR.left
              const y2 = aiR.top + aiR.height / 2 - cR.top

              // Node 2 (AI) to Node 3 (Offer)
              const x3 = aiR.right - cR.left
              const y3 = aiR.top + aiR.height / 2 - cR.top
              const x4 = offR.left - cR.left
              const y4 = offR.top + offR.height / 2 - cR.top

              // Bezier control points offset
              const offset1 = (x2 - x1) * 0.5
              const offset2 = (x4 - x3) * 0.5

              return (
                <g
                  key={i}
                  style={{ zIndex }}
                  className="transition-all duration-300"
                >
                  <path
                    d={`M ${x1} ${y1} C ${x1 + offset1} ${y1}, ${x2 - offset1} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isHovered ? "none" : "4 4"}
                    className="transition-colors duration-300"
                  />
                  <path
                    d={`M ${x3} ${y3} C ${x3 + offset2} ${y3}, ${x4 - offset2} ${y4}, ${x4} ${y4}`}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isHovered ? "none" : "4 4"}
                    className="transition-colors duration-300"
                  />

                  {/* Directional arrow at the end */}
                  {isHovered && (
                    <polygon
                      points={`${x4},${y4} ${x4 - 8},${y4 - 4} ${x4 - 8},${y4 + 4}`}
                      fill={strokeColor}
                    />
                  )}
                </g>
              )
            })}
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px_1.2fr] gap-10 relative z-10">
            {/* Left Column: Pain Points */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-red-50 text-red-600 p-1.5 rounded">
                  <AlertTriangle size={18} />
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  Identified Pain Points
                </h2>
              </div>

              {PP_DATA.map((pp) => {
                const isHigh = pp.severity === "High"
                const bg = isHigh ? "bg-red-50" : "bg-orange-50"
                const text = isHigh ? "text-red-700" : "text-orange-700"
                const border = isHigh ? "border-red-100" : "border-orange-100"
                const isHovered = hoveredPP === pp.id

                return (
                  <div
                    key={pp.id}
                    ref={(el) => (ppRefs.current[pp.id] = el)}
                    onMouseEnter={() => setHoveredPP(pp.id)}
                    onMouseLeave={() => setHoveredPP(null)}
                    className={`rounded-2xl border p-5 bg-white shadow-sm transition-all duration-300 ${
                      isHovered
                        ? "ring-2 ring-purple-500 shadow-md scale-[1.02]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}
                      >
                        <pp.icon size={20} className={text} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1.5">
                          <h3 className="font-bold text-slate-900 text-[15px] pr-2">
                            {pp.title}
                          </h3>
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${bg} ${text} ${border}`}
                          >
                            {pp.severity}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                          {pp.desc}
                        </p>
                        <div className="flex flex-col gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Impact</span>
                            <span className="font-medium text-slate-700 max-w-[180px] text-right truncate">
                              {pp.impact}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Revenue Risk</span>
                            <span className="font-bold text-red-600">
                              {pp.risk}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Center Column: AI Matching */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-8">
                <BrainCircuit size={18} className="text-purple-600" />
                <h2 className="text-lg font-bold text-slate-800">
                  AI Matching Layer
                </h2>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-12 w-full px-4 relative">
                {/* Connecting vertical dashed line behind nodes */}
                <div
                  className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 border-dashed border-l-2"
                  style={{ zIndex: 0 }}
                />

                {AI_NODES.map((node) => (
                  <div
                    key={node.id}
                    ref={(el) => (aiRefs.current[node.id] = el)}
                    className="relative z-10 bg-white rounded-full border-2 border-purple-200 shadow-sm p-1 pr-4 flex items-center gap-3 w-full hover:border-purple-400 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 shrink-0">
                      <span className="font-bold text-purple-700 text-xs">
                        {node.conf}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-700 flex-1 leading-tight">
                      {node.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Recommended Offers */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-green-50 text-green-600 p-1.5 rounded">
                  <Shield size={18} />
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  Recommended Offers
                </h2>
              </div>

              {OFFERS_DATA.map((offer) => {
                const isHovered = hoveredOffer === offer.id

                return (
                  <div
                    key={offer.id}
                    ref={(el) => (offerRefs.current[offer.id] = el)}
                    onMouseEnter={() => setHoveredOffer(offer.id)}
                    onMouseLeave={() => setHoveredOffer(null)}
                    className={`rounded-2xl border p-5 bg-white shadow-sm transition-all duration-300 ${
                      isHovered
                        ? "ring-2 ring-purple-500 shadow-md scale-[1.02]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                          <offer.icon size={20} className="text-slate-700" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">
                            {offer.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-green-100 text-green-800 tracking-wide">
                              {offer.badge}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">
                              {offer.conf}% Confidence
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      {offer.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col justify-center">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wide mb-1">
                          Impact
                        </span>
                        <span className="text-xs font-semibold text-slate-800">
                          {offer.impact}
                        </span>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex flex-col justify-center">
                        <span className="text-[10px] text-green-700 uppercase font-bold tracking-wide mb-1">
                          Expected Value
                        </span>
                        <span className="text-sm font-bold text-green-800">
                          {offer.value}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500 font-medium">
                          Retention Impact
                        </span>
                        <span className="font-bold text-slate-800">
                          {offer.retention}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${offer.conf}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* AI Insight Section */}

        {/* Bottom CTA / Decision Flow Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          {/* Timeline Strip */}
          <div className="flex items-center justify-between mb-8 px-4 relative">
            <div className="absolute top-1/2 left-8 right-8 h-px bg-slate-200 -translate-y-1/2 z-0" />
            {[
              { step: "Pain Point Detected", active: true },
              { step: "AI Analysis", active: true },
              { step: "Offer Recommendation", active: true },
              { step: "Acceptance Prediction", active: true },
              { step: "Next Best Action", active: false },
            ].map((item, i) => (
              <div
                key={i}
                className="relative z-10 flex flex-col items-center gap-2 bg-white px-3"
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    item.active
                      ? `bg-${THEME.maroon} border-white ring-2 ring-[${THEME.maroon}]`
                      : "bg-white border-slate-300"
                  }`}
                  style={{
                    backgroundColor: item.active ? THEME.maroon : "#fff",
                    borderColor: item.active ? "#fff" : "#cbd5e1",
                    boxShadow: item.active
                      ? `0 0 0 2px ${THEME.maroon}`
                      : "none",
                  }}
                />
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    item.active ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {item.step}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                Ready for Decision Stage
              </h2>
              <p className="text-slate-600 text-sm font-medium">
                Recommended offers have been generated based on customer pain
                points, behavioral signals, and eligibility criteria.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-5 text-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-500 font-bold">
                    Selected
                  </span>
                  <span className="font-bold text-slate-900">3 Offers</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-500 font-bold">
                    Est. Value
                  </span>
                  <span className="font-bold text-green-600">₹2,340</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-500 font-bold">
                    Avg Prob
                  </span>
                  <span className="font-bold text-blue-600">82%</span>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/hub/" + customer.id + "/nba", {
                    state: { explorerSearch },
                  })
                }
                className="px-8 py-4 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 shrink-0"
                style={{
                  background: `linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC7A5C 100%)`,
                }}
              >
                Next Best Action Brain <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
