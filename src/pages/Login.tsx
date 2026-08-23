import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-[#F4F5F7] font-sans">
      {/* Left Panel */}
      <div
        className="hidden lg:flex w-1/2 flex-col justify-between p-12 text-white"
        style={{
          background:
            "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC7A5C 100%)",
        }}
      >
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-8 rounded flex items-center justify-center bg-white rotate-45 transform">
              <div className="-rotate-45 text-[#7C3AED] font-black text-sm">
                S
              </div>
            </div>
            <div>
              <div className="font-bold text-sm tracking-widest uppercase leading-tight">
                Solstice
              </div>
              <div className="text-white/80 font-medium text-[10px] tracking-widest uppercase leading-tight">
                Mobile
              </div>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-lg">
            AI-Driven Customer Decisioning
          </h1>
          <p className="text-lg lg:text-xl text-white/90 mb-10 max-w-md">
            Turn customer insight into high-impact action.
          </p>

          <div className="flex flex-wrap gap-3">
            {["Real-time signals", "ML scoring", "Guardrails"].map(
              (chip, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-medium"
                >
                  {chip}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-200">
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded flex items-center justify-center bg-[#7C3AED] rotate-45 transform">
              <div className="-rotate-45 text-white font-black text-sm">S</div>
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm tracking-widest uppercase leading-tight">
                Solstice
              </div>
              <div className="text-slate-500 font-medium text-[10px] tracking-widest uppercase leading-tight">
                Mobile
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back
          </h2>
          <p className="text-slate-500 mb-10">
            Sign in to access your Next Best Action engine.
          </p>

          <button
            onClick={() => navigate("/explorer")}
            className="w-full text-white font-bold py-4 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
