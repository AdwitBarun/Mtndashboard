import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Clock } from "lucide-react"
import Layout from "../components/Layout"

const PAGE_NAMES: Record<string, string> = {
  usage: "Usage and Streaming",
  travel: "Travel Footprint",
  payments: "Payment History",
  "pain-points": "Pain Points and Offers",
  nba: "Next Best Action Engine",
  "content-studio": "Content Studio",
  feedback: "Feedback Layer",
  "closed-loop": "Closed-Loop Summary",
}

const STAGE_NAMES: Record<string, string> = {
  identity: "Sense",
  usage: "Sense",
  travel: "Sense",
  payments: "Sense",
  "pain-points": "Decide",
  nba: "Decide",
  "content-studio": "Engage",
  feedback: "Optimize",
  "closed-loop": "Optimize",
}

export default function Placeholder() {
  const { customerId, page = "" } = useParams<{
    customerId: string
    page: string
  }>()
  const navigate = useNavigate()
  const pageName = PAGE_NAMES[page] ?? "Coming Soon"
  const stageName = STAGE_NAMES[page] ?? ""

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <button
          onClick={() => navigate(`/hub/${customerId}/identity`)}
          className="flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors hover:opacity-70"
          style={{ color: "#7C3AED" }}
        >
          <ArrowLeft size={14} />
          Back to Customer Identity
        </button>

        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "#FBEAEE" }}
          >
            <Clock size={28} style={{ color: "#7C3AED" }} />
          </div>
          <div className="text-center max-w-md">
            {stageName && (
              <div
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider"
                style={{ background: "#FBEAEE", color: "#7C3AED" }}
              >
                {stageName} Stage
              </div>
            )}
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: "#1F2937" }}
            >
              {pageName}
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
              This page is part of the Solstice Mobile Customer Intelligence
              Platform and is currently being built. It will be available in a
              future update.
            </p>
          </div>
          <button
            onClick={() => navigate(`/hub/${customerId}/identity`)}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-80"
            style={{ background: "#7C3AED" }}
          >
            Return to Customer Identity
          </button>
        </div>
      </div>
    </Layout>
  )
}
