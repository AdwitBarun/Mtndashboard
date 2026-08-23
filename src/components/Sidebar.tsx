import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  Search,
  AlertTriangle,
  BarChart3,
  Zap,
  Target,
  MessageSquare,
  TrendingUp,
  Settings,
  Cpu,
} from "lucide-react"
import Avatar from "./Avatar"

const NAV = [
  { label: "Overview", icon: LayoutDashboard, to: "/overview" },
  { label: "Customer Explorer", icon: Search, to: "/explorer" },
  { label: "Segmentation", icon: Users, to: "/segmentation" },
  { label: "ML Lab", icon: FlaskConical, to: "/ml-lab" },
  { label: "NBA Engine", icon: Target, to: "/nba-engine" },
  { label: "Content Studio", icon: MessageSquare, to: "/content-studio-hub" },
  { label: "Measurement & Feedback", icon: TrendingUp, to: "/measurement" },
  { label: "Model Performance", icon: Cpu, to: "/model-performance" },
  { label: "Settings", icon: Settings, to: "/settings" },
]

export default function Sidebar() {
  const location = useLocation()

  function isActive(to: string) {
    if (to === "/explorer")
      return (
        location.pathname.startsWith("/explorer") ||
        location.pathname.startsWith("/hub")
      )
    return location.pathname.startsWith(to)
  }

  // The requested sidebar is WHITE with a burgundy diamond mark
  return (
    <aside className="flex flex-col w-56 shrink-0 min-h-screen bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <div className="w-7 h-7 rounded flex items-center justify-center shrink-0 bg-[#7C3AED] rotate-45 transform">
          <div className="-rotate-45 text-white font-black text-[10px]">S</div>
        </div>
        <div>
          <div className="text-gray-900 font-bold text-xs tracking-widest uppercase leading-tight">
            Solstice
          </div>
          <div className="text-gray-500 font-medium text-[9px] tracking-widest uppercase leading-tight">
            Mobile
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-2 py-4 flex-1">
        {NAV.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            style={
              isActive(to) ? { background: "#7C3AED", color: "white" } : {}
            }
          >
            <Icon size={14} />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom card */}
      <div className="mx-3 mb-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Avatar initials="AD" color="#7C3AED" size="xs" />
          <span className="text-gray-900 text-xs font-bold">
            AI-Driven Decisions
          </span>
        </div>
        <p className="text-gray-500 text-[10px] leading-relaxed">
          Turning customer insights into high-impact actions.
        </p>
      </div>
    </aside>
  )
}
