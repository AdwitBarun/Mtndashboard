const fs = require("fs")
const content = fs.readFileSync("src/pages/NBA.tsx", "utf8")

// 1. Extract sections
const getSection = (markerStart, markerEnd) => {
  const startIdx = content.indexOf(markerStart)
  if (startIdx === -1) throw new Error("Could not find start: " + markerStart)

  let endIdx
  if (markerEnd) {
    endIdx = content.indexOf(markerEnd, startIdx)
    if (endIdx === -1) throw new Error("Could not find end: " + markerEnd)
  } else {
    endIdx = content.length
  }

  return content.substring(startIdx, endIdx)
}

const topRecommendation = getSection(
  "{/* TOP RECOMMENDATION */}",
  "{/* ML DECISION FACTORS */}",
).trim()
const mlDecisionFactors = getSection(
  "{/* ML DECISION FACTORS */}",
  "{/* OFFER RANKING & ALTERNATIVES */}",
).trim()
const offerRanking = getSection(
  "{/* OFFER RANKING & ALTERNATIVES */}",
  "            </div>\n\n            {/* RIGHT 30% */}",
).trim()
const propensityScore = getSection(
  "{/* PROPENSITY SCORE */}",
  "{/* SIGNAL SUMMARY */}",
).trim()
const signalSummary = getSection(
  "{/* SIGNAL SUMMARY */}",
  "{/* CHANNEL SELECTION */}",
).trim()
const channelSelectionRaw = getSection(
  "{/* CHANNEL SELECTION */}",
  "{/* CONTENT GENERATION */}",
).trim()
const contentGenerationRaw = getSection(
  "{/* CONTENT GENERATION */}",
  "{/* CTA AREA */}",
).trim()
const ctaAreaRaw = getSection(
  "{/* CTA AREA */}",
  "            </div>\n          </div>\n        </div>\n\n        {/* INTELLIGENT FOOTER BAR */}",
).trim()
const footerRaw = getSection(
  "{/* INTELLIGENT FOOTER BAR */}",
  "      </div>\n    </Layout>",
).trim()

// Custom rewrites for Row 4 cards to be more compact as requested
const channelSelection = `              {/* DELIVERY CHANNEL */}
              <div
                className="rounded-xl border bg-white p-5 shadow-sm flex-1 flex flex-col justify-between"
                style={{ borderColor: "#E2E2E6" }}
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4">
                    Recommended Delivery Channel
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center border border-green-100 shrink-0">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-gray-900 leading-none">WhatsApp</span>
                        <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                          Primary
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Score: <span className="font-bold text-gray-900">0.86</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-700 space-y-1.5 font-medium mb-4">
                    <div className="flex gap-1.5"><span className="text-[#16A34A]">•</span> Highest engagement</div>
                    <div className="flex gap-1.5"><span className="text-[#16A34A]">•</span> Preferred channel</div>
                    <div className="flex gap-1.5"><span className="text-[#16A34A]">•</span> Strong campaign history</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <span className="font-medium">Alternatives:</span>
                  <div className="flex gap-1.5">
                    <span className="font-medium text-gray-700">SMS</span>
                    <span className="text-gray-300">|</span>
                    <span className="font-medium text-gray-700">App Push</span>
                  </div>
                </div>
              </div>`

const contentGeneration = `              {/* CONTENT ASSIGNMENT */}
              <div
                className="rounded-xl border bg-white p-5 shadow-sm flex-1 flex flex-col justify-between"
                style={{ borderColor: "#E2E2E6" }}
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4">
                    Content Assignment
                  </h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-3 mb-4">
                    <div>
                      <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        Language
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        English
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        Tone
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        Warm + Benefit
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        Personalization
                      </div>
                      <div className="text-sm font-bold text-gray-900">High</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        Expected CTR
                      </div>
                      <div className="text-sm font-bold text-[#16A34A]">
                        12.6%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">
                    Strategy Theme
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {customer.strategy} Growth
                  </div>
                </div>
              </div>`

const ctaArea = `              {/* CTA AREA */}
              <div
                className="rounded-xl border bg-white p-5 shadow-sm flex-1 flex flex-col justify-between"
                style={{ borderColor: "#E2E2E6" }}
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4">
                    Approval Panel
                  </h3>
                  <div className="space-y-3 mb-6 text-xs">
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-gray-500 font-medium">Offer Value:</span>
                      <span className="font-bold text-gray-900">{revImpact}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-gray-500 font-medium">Acceptance Prob:</span>
                      <span className="font-bold text-[#16A34A]">{propensity}%</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-gray-500 font-medium">Channel:</span>
                      <span className="font-bold text-gray-900">WhatsApp</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-gray-500 font-medium">Revenue Impact:</span>
                      <span className="font-bold text-gray-900">{revImpact}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate("/hub/" + customer.id + "/content-studio", {
                      state: { explorerSearch },
                    })
                  }
                  className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-md"
                  style={{ background: "#7A0026" }}
                >
                  Approve Recommendation <ChevronRight size={16} />
                </button>
              </div>`

const newFooter = `        {/* INTELLIGENT FOOTER BAR */}
        <div className="fixed bottom-0 left-56 right-0 bg-white border-t border-gray-200 px-6 py-3 flex items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-lg">🕒</span>
              <div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Decision Time</div>
                <div className="text-xs font-bold text-gray-900">{currentTime}</div>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>

            <div className="flex items-center gap-2">
              <span className="text-lg">👨‍👩‍👧‍👦</span>
              <div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Segment</div>
                <div className="text-xs font-bold text-gray-900 truncate max-w-[150px]">{customer.segment}</div>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>

            <div className="flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Risk Band</div>
                <div
                  className="text-xs font-bold"
                  style={{ color: customer.risk > 0.5 ? "#B23A48" : "#16A34A" }}
                >
                  {customer.risk > 0.5 ? "High" : "Low"}
                </div>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>

            <div className="flex items-center gap-2">
              <span className="text-lg">📅</span>
              <div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Opportunity Window</div>
                <div className="text-xs font-bold text-gray-900">Next 24 Hours</div>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>

            <div className="flex items-center gap-2">
              <span className="text-lg text-gray-700 font-bold">₹</span>
              <div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Expected Revenue</div>
                <div className="text-xs font-bold text-green-700">{revImpact}</div>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>

            <div className="flex items-center gap-2">
              <span className="text-lg">🧠</span>
              <div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Confidence</div>
                <div className="text-xs font-bold text-gray-900">92%</div>
              </div>
            </div>
          </div>
        </div>`

// Add wrapper flex classes to the sections to make them fill height properly
const wrapLeftCol = (content) =>
  '            <div className="col-span-12 lg:col-span-8 flex flex-col">\n' +
  content.replace(/className="/, 'className="flex-1 ') +
  "\n            </div>"
const wrapRightCol = (content) =>
  '            <div className="col-span-12 lg:col-span-4 flex flex-col">\n' +
  content.replace(/className="/, 'className="flex-1 ') +
  "\n            </div>"
const wrapFullCol = (content) =>
  '            <div className="col-span-12 flex flex-col">\n' +
  content.replace(/className="/, 'className="flex-1 ') +
  "\n            </div>"

const newGridContent =
  '          <div className="grid grid-cols-12 gap-6">\n' +
  wrapLeftCol(topRecommendation) +
  "\n" +
  wrapRightCol(propensityScore) +
  "\n" +
  wrapLeftCol(mlDecisionFactors) +
  "\n" +
  wrapRightCol(signalSummary) +
  "\n" +
  wrapFullCol(offerRanking) +
  "\n" +
  wrapRightCol(
    channelSelection.replace("              {/* DELIVERY CHANNEL */}\n", ""),
  ) +
  "\n" +
  wrapRightCol(
    contentGeneration.replace("              {/* CONTENT ASSIGNMENT */}\n", ""),
  ) +
  "\n" +
  wrapRightCol(ctaArea.replace("              {/* CTA AREA */}\n", "")) +
  "\n" +
  "          </div>"

const gridStartIdx = content.indexOf(
  '<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">',
)
const footerStartIdx = content.indexOf("{/* INTELLIGENT FOOTER BAR */}")

const result =
  content.substring(0, gridStartIdx) +
  newGridContent +
  "\n        </div>\n\n" +
  newFooter +
  "\n      </div>\n    </Layout>\n  )\n}\n"

fs.writeFileSync("src/pages/NBA.tsx", result)
console.log("Done rewriting NBA.tsx")
