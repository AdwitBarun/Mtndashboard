import React, {
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom"
import {
  ArrowLeft,
  AlertTriangle,
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
  { key: "sense", label: "Sense", path: "identity" },
  { key: "decide", label: "Decide", path: "pain-points" },
  { key: "engage", label: "Engage", path: "content-studio" },
  { key: "optimize", label: "Optimize", path: "feedback" },
]

const DECIDE_TABS = [
  {
    key: "pain-points",
    label: "Pain Points & Recommended Offers",
    path: "pain-points",
  },
  {
    key: "nba",
    label: "Next Best Action Engine",
    path: "nba",
  },
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
  {
    id: "ai1",
    title: "Travel Pattern Match",
    conf: "91%",
  },
  {
    id: "ai2",
    title: "Premium Eligibility",
    conf: "84%",
  },
  {
    id: "ai3",
    title: "Roaming Affinity",
    conf: "88%",
  },
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

const CONNECTIONS = [
  {
    from: "pp1",
    toAI: "ai1",
    toOffer: "off1",
    color: THEME.purple,
  },
  {
    from: "pp3",
    toAI: "ai3",
    toOffer: "off1",
    color: THEME.purple,
  },
  {
    from: "pp4",
    toAI: "ai1",
    toOffer: "off1",
    color: THEME.purple,
  },
  {
    from: "pp2",
    toAI: "ai2",
    toOffer: "off2",
    color: THEME.green,
  },
  {
    from: "pp4",
    toAI: "ai2",
    toOffer: "off2",
    color: THEME.green,
  },
  {
    from: "pp3",
    toAI: "ai3",
    toOffer: "off3",
    color: THEME.orange,
  },
]

export default function PainPoints() {
  const { customerId } = useParams<{
    customerId: string
  }>()

  const navigate = useNavigate()
  const location = useLocation()

  const explorerSearch =
    (
      location.state as {
        explorerSearch?: string
      } | null
    )?.explorerSearch ?? ""

  const customer = getCustomer(customerId ?? "")

  const [hoveredPP, setHoveredPP] = useState<string | null>(
    null,
  )

  const [hoveredOffer, setHoveredOffer] = useState<
    string | null
  >(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const ppRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({})

  const aiRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({})

  const offerRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({})

  const [rects, setRects] = useState<{
    pp: Record<string, DOMRect>
    ai: Record<string, DOMRect>
    offer: Record<string, DOMRect>
    container: DOMRect | null
  }>({
    pp: {},
    ai: {},
    offer: {},
    container: null,
  })

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) {
        return
      }

      const container =
        containerRef.current.getBoundingClientRect()

      const ppRects: Record<string, DOMRect> = {}
      const aiRects: Record<string, DOMRect> = {}
      const offerRects: Record<string, DOMRect> = {}

      Object.entries(ppRefs.current).forEach(
        ([id, element]) => {
          if (element) {
            ppRects[id] = element.getBoundingClientRect()
          }
        },
      )

      Object.entries(aiRefs.current).forEach(
        ([id, element]) => {
          if (element) {
            aiRects[id] = element.getBoundingClientRect()
          }
        },
      )

      Object.entries(offerRefs.current).forEach(
        ([id, element]) => {
          if (element) {
            offerRects[id] =
              element.getBoundingClientRect()
          }
        },
      )

      setRects({
        pp: ppRects,
        ai: aiRects,
        offer: offerRects,
        container,
      })
    }

    measure()

    window.addEventListener("resize", measure)

    const resizeObserver = new ResizeObserver(() => {
      measure()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener("resize", measure)
      resizeObserver.disconnect()
    }
  }, [])

  if (!customer) {
    return (
      <Layout>
        <div className="p-8">
          <p style={{ color: "#6B7280" }}>
            Customer not found.
          </p>
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
                const activeStageIndex =
                  STAGES_NAV.findIndex(
                    (item) => item.key === "decide",
                  )

                const stageIndex =
                  STAGES_NAV.findIndex(
                    (item) => item.key === stage.key,
                  )

                const isActive =
                  stage.key === "decide"

                const isCompleted =
                  stageIndex < activeStageIndex

                return (
                  <button
                    key={stage.key}
                    type="button"
                    onClick={() =>
                      navigate(
                        `/hub/${customer.id}/${stage.path}`,
                        {
                          state: {
                            explorerSearch,
                          },
                        },
                      )
                    }
                    className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70"
                    title={stage.label}
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={
                        isActive
                          ? {
                              background:
                                THEME.maroon,
                            }
                          : isCompleted
                            ? {
                                background:
                                  "#8B5CF6",
                              }
                            : {
                                background:
                                  "transparent",
                                border:
                                  "2px solid #CBD5E1",
                              }
                      }
                    />

                    <span
                      className="text-[10px] font-medium whitespace-nowrap"
                      style={{
                        color: isActive
                          ? THEME.maroon
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
        <div
          className="flex items-center gap-1.5 text-xs mb-4"
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
          <span>Decide</span>
          <span>›</span>

          <span
            style={{
              color: "#1F2937",
              fontWeight: 600,
            }}
          >
            Pain Points
          </span>
        </div>

        {/* Decide tabs */}
        <div
          className="flex items-center gap-1 mb-8 border-b"
          style={{ borderColor: "#E2E2E6" }}
        >
          {DECIDE_TABS.map((tab) => {
            const isActive =
              tab.key === "pain-points"

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() =>
                  navigate(
                    `/hub/${customer.id}/${tab.path}`,
                    {
                      state: {
                        explorerSearch,
                      },
                    },
                  )
                }
                className="px-4 py-2 text-xs font-semibold transition-colors"
                style={
                  isActive
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

        {/* Friction analysis banner */}
        <div className="mb-10 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h1 className="text-3xl font-bold mb-2 text-slate-900">
            Friction Analysis
          </h1>

          <p className="text-slate-600 mb-6 text-base font-medium">
            4 customer pain points identified · 3 retention
            opportunities recommended ·
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

        {/* Main flow section */}
        <div
          ref={containerRef}
          className="relative mb-10 bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-200"
        >
          {/* Dynamic connectors */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              zIndex: 0,
              overflow: "visible",
            }}
          >
            {CONNECTIONS.map(
              (connection, index) => {
                const painPointRect =
                  rects.pp[connection.from]

                const aiRect =
                  rects.ai[connection.toAI]

                const offerRect =
                  rects.offer[connection.toOffer]

                const containerRect =
                  rects.container

                if (
                  !painPointRect ||
                  !aiRect ||
                  !offerRect ||
                  !containerRect
                ) {
                  return null
                }

                const isHovered =
                  hoveredPP === connection.from ||
                  hoveredOffer ===
                    connection.toOffer

                const isAnyHovered =
                  hoveredPP !== null ||
                  hoveredOffer !== null

                const strokeColor = isHovered
                  ? connection.color
                  : isAnyHovered
                    ? "#F1F5F9"
                    : "#CBD5E1"

                const strokeWidth = isHovered
                  ? 3
                  : 2

                const startX =
                  painPointRect.right -
                  containerRect.left

                const startY =
                  painPointRect.top +
                  painPointRect.height / 2 -
                  containerRect.top

                const aiStartX =
                  aiRect.left -
                  containerRect.left

                const aiStartY =
                  aiRect.top +
                  aiRect.height / 2 -
                  containerRect.top

                const aiEndX =
                  aiRect.right -
                  containerRect.left

                const aiEndY =
                  aiRect.top +
                  aiRect.height / 2 -
                  containerRect.top

                const offerX =
                  offerRect.left -
                  containerRect.left

                const offerY =
                  offerRect.top +
                  offerRect.height / 2 -
                  containerRect.top

                const firstOffset =
                  (aiStartX - startX) * 0.5

                const secondOffset =
                  (offerX - aiEndX) * 0.5

                return (
                  <g
                    key={`${connection.from}-${connection.toAI}-${connection.toOffer}-${index}`}
                    className="transition-all duration-300"
                  >
                    <path
                      d={`M ${startX} ${startY} C ${startX + firstOffset} ${startY}, ${aiStartX - firstOffset} ${aiStartY}, ${aiStartX} ${aiStartY}`}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={
                        isHovered
                          ? "none"
                          : "4 4"
                      }
                      className="transition-colors duration-300"
                    />

                    <path
                      d={`M ${aiEndX} ${aiEndY} C ${aiEndX + secondOffset} ${aiEndY}, ${offerX - secondOffset} ${offerY}, ${offerX} ${offerY}`}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={
                        isHovered
                          ? "none"
                          : "4 4"
                      }
                      className="transition-colors duration-300"
                    />

                    {isHovered && (
                      <polygon
                        points={`${offerX},${offerY} ${offerX - 8},${offerY - 4} ${offerX - 8},${offerY + 4}`}
                        fill={strokeColor}
                      />
                    )}
                  </g>
                )
              },
            )}
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px_1.2fr] gap-10 relative z-10">
            {/* Pain points column */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-red-50 text-red-600 p-1.5 rounded">
                  <AlertTriangle size={18} />
                </div>

                <h2 className="text-lg font-bold text-slate-800">
                  Identified Pain Points
                </h2>
              </div>

              {PP_DATA.map((painPoint) => {
                const isHigh =
                  painPoint.severity === "High"

                const backgroundClass = isHigh
                  ? "bg-red-50"
                  : "bg-orange-50"

                const textClass = isHigh
                  ? "text-red-700"
                  : "text-orange-700"

                const borderClass = isHigh
                  ? "border-red-100"
                  : "border-orange-100"

                const isHovered =
                  hoveredPP === painPoint.id

                const PainPointIcon =
                  painPoint.icon

                return (
                  <div
                    key={painPoint.id}
                    ref={(element) => {
                      ppRefs.current[painPoint.id] =
                        element
                    }}
                    onMouseEnter={() =>
                      setHoveredPP(painPoint.id)
                    }
                    onMouseLeave={() =>
                      setHoveredPP(null)
                    }
                    className={`rounded-2xl border p-5 bg-white shadow-sm transition-all duration-300 ${
                      isHovered
                        ? "ring-2 ring-purple-500 shadow-md scale-[1.02]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${backgroundClass}`}
                      >
                        <PainPointIcon
                          size={20}
                          className={textClass}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1.5">
                          <h3 className="font-bold text-slate-900 text-[15px] pr-2">
                            {painPoint.title}
                          </h3>

                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${backgroundClass} ${textClass} ${borderClass}`}
                          >
                            {painPoint.severity}
                          </span>
                        </div>

                        <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                          {painPoint.desc}
                        </p>

                        <div className="flex flex-col gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div className="flex justify-between text-xs gap-3">
                            <span className="text-slate-500">
                              Impact
                            </span>

                            <span className="font-medium text-slate-700 max-w-[180px] text-right truncate">
                              {painPoint.impact}
                            </span>
                          </div>

                          <div className="flex justify-between text-xs gap-3">
                            <span className="text-slate-500">
                              Revenue Risk
                            </span>

                            <span className="font-bold text-red-600">
                              {painPoint.risk}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* AI matching column */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-8">
                <BrainCircuit
                  size={18}
                  className="text-purple-600"
                />

                <h2 className="text-lg font-bold text-slate-800">
                  AI Matching Layer
                </h2>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-12 w-full px-4 relative">
                <div
                  className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 border-dashed border-l-2"
                  style={{ zIndex: 0 }}
                />

                {AI_NODES.map((node) => (
                  <div
                    key={node.id}
                    ref={(element) => {
                      aiRefs.current[node.id] =
                        element
                    }}
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

            {/* Recommended offers column */}
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
                const isHovered =
                  hoveredOffer === offer.id

                const OfferIcon = offer.icon

                return (
                  <div
                    key={offer.id}
                    ref={(element) => {
                      offerRefs.current[offer.id] =
                        element
                    }}
                    onMouseEnter={() =>
                      setHoveredOffer(offer.id)
                    }
                    onMouseLeave={() =>
                      setHoveredOffer(null)
                    }
                    className={`rounded-2xl border p-5 bg-white shadow-sm transition-all duration-300 ${
                      isHovered
                        ? "ring-2 ring-purple-500 shadow-md scale-[1.02]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                          <OfferIcon
                            size={20}
                            className="text-slate-700"
                          />
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
                          style={{
                            width: `${offer.conf}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom decision flow section */}
                {/* Bottom decision flow section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          {/* Timeline strip */}
          <div className="flex items-center justify-between mb-8 px-4 relative">
            <div className="absolute top-1/2 left-8 right-8 h-px bg-slate-200 -translate-y-1/2 z-0" />

            {[
              {
                step: "Pain Point Detected",
                active: true,
              },
              {
                step: "AI Analysis",
                active: true,
              },
              {
                step: "Offer Recommendation",
                active: true,
              },
              {
                step: "Acceptance Prediction",
                active: true,
              },
              {
                step: "Next Best Action",
                active: false,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative z-10 flex flex-col items-center gap-2 bg-white px-3"
              >
                <div
                  className="w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: item.active
                      ? THEME.maroon
                      : "#FFFFFF",
                    borderColor: item.active
                      ? "#FFFFFF"
                      : "#CBD5E1",
                    boxShadow: item.active
                      ? `0 0 0 2px ${THEME.maroon}`
                      : "none",
                  }}
                />

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                    item.active
                      ? "text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  {item.step}
                </span>
              </div>
            ))}
          </div>

          {/* Decision summary row */}
          <div className="flex flex-col gap-3">
            {/* Grey box containing text on left and gradient KPIs on right */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
              {/* Decision-stage information */}
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Ready for Decision Stage
                </h2>

                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  Recommended offers have been generated based on customer
                  pain points, behavioral signals, and eligibility criteria.
                </p>
              </div>

              {/* Gradient KPI box on right */}
              <div
                className="shrink-0 flex items-center gap-7 px-6 py-4 rounded-xl shadow-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC7A5C 100%)",
                }}
              >
                <div className="flex flex-col min-w-[68px]">
                  <span className="text-[10px] uppercase text-white/75 font-bold tracking-wide">
                    Selected
                  </span>

                  <span className="text-sm font-bold text-white whitespace-nowrap">
                    3 Offers
                  </span>
                </div>

                <div className="w-px h-9 bg-white/25" />

                <div className="flex flex-col min-w-[72px]">
                  <span className="text-[10px] uppercase text-white/75 font-bold tracking-wide">
                    Est. Value
                  </span>

                  <span className="text-sm font-bold text-white whitespace-nowrap">
                    ₹2,340
                  </span>
                </div>

                <div className="w-px h-9 bg-white/25" />

                <div className="flex flex-col min-w-[62px]">
                  <span className="text-[10px] uppercase text-white/75 font-bold tracking-wide">
                    Avg Prob
                  </span>

                  <span className="text-sm font-bold text-white">
                    82%
                  </span>
                </div>
              </div>
            </div>

            {/* Proceed link below grey box on white background */}
            <div className="flex justify-end pr-2 pt-1">
              <button
                type="button"
                onClick={() =>
                  navigate(`/hub/${customer.id}/nba`, {
                    state: { explorerSearch },
                  })
                }
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:text-[#4F46E5] transition-all hover:translate-x-0.5"
              >
                Proceed

                <span className="text-base font-bold tracking-[-2px]">
                  {">>"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}