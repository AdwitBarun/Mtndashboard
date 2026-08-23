const fs = require("fs")

let content = fs.readFileSync("src/pages/DataUsage.tsx", "utf8")

// Update main padding
content = content.replace(
  'className="p-6 md:p-8"',
  'className="p-4 md:p-6 lg:h-screen lg:flex lg:flex-col lg:overflow-hidden"',
)

// Reduce gap below Sense tab row
content = content.replace(
  'className="flex items-center gap-1 mb-6 border-b"',
  'className="flex items-center gap-1 mb-4 border-b shrink-0"',
)

// Remove bottom margin of Page Title to save space
content = content.replace(
  'className="text-2xl font-bold mb-4 text-gray-900"',
  'className="text-xl font-bold mb-3 text-gray-900 shrink-0"',
)

// Replace the two-column layout entirely
const twoColStart = content.indexOf("{/* Two-column layout */}")
const twoColEnd = content.lastIndexOf("</div>\n      </div>\n    </Layout>")

const newLayout = `
        {/* Row 2: Charts and KPIs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 flex-1 min-h-0">
          {/* LEFT COLUMN */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 min-h-0">
            {/* Main Chart Card */}
            <div
              className="rounded-xl border bg-white shadow-sm flex flex-col flex-1 min-h-0"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div className="flex items-start justify-between px-5 pt-4 pb-2 shrink-0">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Monthly Data Consumption (GB)
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    7-month trend for {customer.name}
                  </p>
                </div>

                <div className="flex p-0.5 rounded-lg bg-gray-50 border border-gray-200">
                  {(["Monthly", "Platform", "Event"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={\`px-3 py-1 text-xs font-medium rounded-md transition-colors \${
                        view === v
                          ? "bg-[#7A1230] text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }\`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-4 flex-1 min-h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  {view === "Platform" ? (
                    <BarChart
                      data={PLATFORM_DATA}
                      layout="vertical"
                      margin={{ top: 10, right: 20, bottom: 0, left: 50 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        stroke="#F3F4F6"
                      />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 11, fill: "#6B7280" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{
                          fontSize: 11,
                          fill: "#4B5563",
                          fontWeight: 500,
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <RTooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Bar dataKey="hrs" radius={[0, 4, 4, 0]} barSize={20}>
                        {PLATFORM_DATA.map((p, i) => (
                          <Cell key={i} fill={p.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : (
                    <BarChart
                      data={view === "Event" ? EVENT_DATA : MONTHLY_DATA}
                      margin={{ top: 20, right: 10, bottom: 0, left: -20 }}
                      barCategoryGap="25%"
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#F3F4F6"
                      />
                      <XAxis
                        dataKey="month"
                        tick={{
                          fontSize: 11,
                          fill: "#6B7280",
                          fontWeight: 500,
                        }}
                        axisLine={false}
                        tickLine={false}
                        dy={8}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#6B7280" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <RTooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="gb"
                        radius={[4, 4, 0, 0]}
                        label={{
                          position: "top",
                          fill: "#4B5563",
                          fontSize: 11,
                          fontWeight: 600,
                          dy: -4,
                        }}
                      >
                        {(view === "Event" ? EVENT_DATA : MONTHLY_DATA).map(
                          (m, i) => (
                            <Cell
                              key={i}
                              fill={
                                view === "Event" && m.event
                                  ? "#7A1230"
                                  : m.isCurrent
                                    ? "#7A1230"
                                    : "url(#barGradient)"
                              }
                            />
                          ),
                        )}
                      </Bar>
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#D49AAB" />
                          <stop offset="100%" stopColor="#E5BAC5" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-3 gap-4 shrink-0">
              <div className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <TrendingUp size={16} />
                  </div>
                  <div className="text-xs font-semibold text-gray-700 leading-tight">
                    Month-over-Month<br/>Growth
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-bold text-gray-900">+27%</span>
                  <span className="text-[10px] text-gray-500">vs last month</span>
                </div>
              </div>

              <div className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <MonitorPlay size={16} />
                  </div>
                  <div className="text-xs font-semibold text-gray-700 leading-tight">
                    Streaming Share<br/>of Usage
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-bold text-gray-900">68%</span>
                  <span className="text-[10px] text-gray-500">of total data</span>
                </div>
              </div>

              <div className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                    <Clock size={16} />
                  </div>
                  <div className="text-xs font-semibold text-gray-700 leading-tight">
                    Peak Usage<br/>Window
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-bold text-gray-900">9-11 PM</span>
                  <span className="text-[10px] text-gray-500">IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-1 lg:col-span-4 flex flex-col min-h-0">
            <div className="rounded-xl border bg-white shadow-sm p-5 flex flex-col h-full" style={{ borderColor: "#E5E7EB" }}>
              <h3 className="text-base font-bold text-gray-900 mb-3 shrink-0">
                Streaming Platform Split
              </h3>

              <div className="relative w-full h-[180px] mb-4 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PLATFORM_DATA}
                      dataKey="hrs"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {PLATFORM_DATA.map((p, i) => (
                        <Cell key={i} fill={p.fill} />
                      ))}
                      <Label
                        content={({ viewBox }) => {
                          const { cx, cy } = viewBox;
                          return (
                            <g>
                              <text
                                x={cx}
                                y={cy - 14}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                className="fill-gray-500 text-[10px] font-medium"
                              >
                                Total Streaming
                              </text>
                              <text
                                x={cx}
                                y={cy + 4}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                className="fill-gray-900 text-2xl font-bold"
                              >
                                132h
                              </text>
                              <text
                                x={cx}
                                y={cy + 22}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                className="fill-gray-400 text-[9px] font-medium"
                              >
                                Last 7 Months
                              </text>
                            </g>
                          )
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-2.5 overflow-y-auto min-h-0 pl-1 pr-2">
                {PLATFORM_DATA.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: p.fill }}
                      />
                      <span className="text-xs font-medium text-gray-700">
                        {p.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-gray-900">
                        {p.hrs}h
                      </span>
                      <span className="text-[11px] text-gray-500 w-6 text-right">
                        {p.percent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Live Sports (Bottom) */}
        <div className="rounded-xl border bg-white shadow-sm p-4 shrink-0" style={{ borderColor: "#E5E7EB" }}>
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            Live Sports and Events
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Play size={14} fill="currentColor" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 mb-0.5">
                  IPL 2026 (Mar - May)
                </h4>
                <p className="text-[11px] text-gray-600 leading-snug mb-1">
                  Highest streaming usage across weekends and playoffs.
                </p>
                <p className="text-[10px] font-medium text-gray-500">
                  Contributes 34% of sports streaming
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-l border-gray-100 pl-4">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                <Car size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 mb-0.5">
                  Formula 1 Season (Mar - Dec)
                </h4>
                <p className="text-[11px] text-gray-600 leading-snug mb-1">
                  Race-day streaming creates late-night usage spikes.
                </p>
                <p className="text-[10px] font-medium text-gray-500">
                  Contributes 21% of event streaming
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-l border-gray-100 pl-4">
              <div className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0 mt-0.5">
                <Trophy size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 mb-0.5">
                  Champions Trophy (Feb)
                </h4>
                <p className="text-[11px] text-gray-600 leading-snug mb-1">
                  Short-term spike in streaming during match days.
                </p>
                <p className="text-[10px] font-medium text-gray-500">
                  Contributes 17% of monthly uplift
                </p>
              </div>
            </div>
          </div>
        </div>
`

content =
  content.substring(0, twoColStart) + newLayout + content.substring(twoColEnd)

fs.writeFileSync("src/pages/DataUsage.tsx", content)
