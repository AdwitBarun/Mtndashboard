const fs = require('fs');
const file = 'src/pages/CustomerExplorer.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add Lucide icons if missing
if (!content.includes('Sparkles,')) {
    content = content.replace('Search,', 'Search, Sparkles, TrendingUp, Users, Target, Activity as ActivityIcon,');
}

const statsCode = `
        {/* Summary Chips */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Base", value: filtered.length, icon: Users, color: "#4F46E5" },
            { label: "High Risk", value: filtered.filter(c => c.risk >= 0.6).length, icon: ActivityIcon, color: "#EC7A5C" },
            { label: "Avg ARPU", value: \`₹\${Math.round(filtered.reduce((acc, c) => acc + c.arpu, 0) / (filtered.length || 1)).toLocaleString("en-IN")}\`, icon: TrendingUp, color: "#7C3AED" },
            { label: "Best Actions", value: filtered.length, icon: Target, color: "#10B981" }
          ].map((stat, i) => (
            <div key={i} className="bg-white border rounded-xl p-4 flex items-center gap-4" style={{ borderColor: "#E2E2E6" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: \`\${stat.color}15\` }}>
                <stat.icon size={18} style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: "#1F2937" }}>{stat.value}</div>
                <div className="text-xs font-medium" style={{ color: "#6B7280" }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Spotlight */}
        <div className="mb-6 border rounded-xl p-5 flex items-start gap-4 cursor-pointer transition-all hover:shadow-sm" style={{ borderColor: "#E2E2E6", background: "linear-gradient(to right, #F5F3FF, #ffffff)" }} onClick={() => navigate('/hub/SUB-10001', { state: { explorerSearch: window.location.search } })}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#7C3AED" }}>
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-[#1F2937]">AI Spotlight</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "#EDE9FE", color: "#6D28D9" }}>Retention Opportunity</span>
            </div>
            <p className="text-sm text-[#374151] mb-3">
              <span className="font-semibold text-[#1F2937]">Rohan Mehta (SUB-10001)</span> — High-value family anchor with strong roaming intent — top Retention for the Smart Roaming Pack.
            </p>
            <div className="flex items-center gap-4 text-xs font-medium text-[#6B7280]">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>ARPU ₹1,699</div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></div>Tenure 78 mo</div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div>Risk 0.44</div>
            </div>
          </div>
          <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#4F46E5] text-white font-bold text-sm">
            RM
          </div>
        </div>
`;

content = content.replace('{/* Filters */}', statsCode + '\n        {/* Filters */}');
fs.writeFileSync(file, content);
