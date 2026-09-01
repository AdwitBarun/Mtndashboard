import { useNavigate } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex overflow-hidden bg-[#F5F6F8]">
      {/* LEFT PANEL */}

      <div
        className="hidden lg:flex w-[62%] relative overflow-hidden"
        style={{
          background: `
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 35%),
          radial-gradient(circle at 80% 25%, rgba(255,255,255,0.05) 0%, transparent 30%),
          radial-gradient(circle at 80% 80%, rgba(236,122,92,0.18) 0%, transparent 35%),
          linear-gradient(135deg,#4F46E5 0%,#7C3AED 55%,#EC7A5C 100%)
        `,
        }}
      >
        {/* Background Glow */}

        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-orange-400/20 blur-3xl" />

        {/* Decorative Lines */}

        <div className="absolute right-16 bottom-16 opacity-20">
          <div className="w-72 h-72 border border-white rounded-full" />
          <div className="absolute inset-10 border border-white rounded-full" />
          <div className="absolute inset-20 border border-white rounded-full" />
        </div>

        {/* Content */}

        <div className="relative z-10 flex flex-col justify-center px-24">
          <div className="max-w-[680px]">
            <p className="uppercase tracking-[0.4em] text-xs text-white/60 mb-8">
              AI-Native Decisioning Platform
            </p>

            <h1 className="text-[78px] font-bold leading-[0.9] text-white tracking-tight">
              Customer
              <br />
              Journey
            </h1>

            <p className="mt-8 text-[24px] leading-relaxed text-white/80 max-w-[560px]">
              Sense customer context, orchestrate next best actions,
              and continuously learn from outcomes.
            </p>

            
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="w-full lg:w-[38%] flex items-center justify-center px-12 bg-[#F5F6F8]">
        <div className="w-full max-w-[500px] bg-white rounded-[32px] border border-slate-200 p-12 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
          <h2 className="text-[52px] font-bold text-slate-900 leading-none">
            Welcome
          </h2>

          <p className="mt-6 text-slate-500 leading-relaxed text-lg">
            Explore the customer decision journey powered by
            Agentic AI and Next Best Action orchestration.
          </p>

          <button
            onClick={() => navigate("/explorer")}
            className="
              mt-10
              w-full
              py-4
              rounded-xl
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              shadow-lg
              hover:shadow-xl
              transition-all
            "
            style={{
              background:
                "linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%)",
            }}
          >
            Launch Experience
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
