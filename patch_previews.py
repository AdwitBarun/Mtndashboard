import re

with open("src/pages/ContentStudio.tsx", "r") as f:
    content = f.read()

whatsapp_preview = """function WhatsAppPreview({ content, variantInfo }: any) {
  return (
    <div className="flex flex-col h-full bg-[#EFEAE2] font-sans relative">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54]">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">
          SM
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-sm truncate">
            Solstice Mobile
          </div>
          <div className="text-white/80 text-[11px]">Business Account ✓</div>
        </div>
        <Video size={18} className="text-white mr-2 shrink-0" />
        <Phone size={18} className="text-white shrink-0" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-end gap-2 pb-6">
        <div className="text-center text-[10px] text-gray-500 mb-2 font-medium bg-black/5 w-fit mx-auto px-2 py-0.5 rounded-full">
          Today
        </div>
        <div className="self-start w-[90%]">
          <div className="rounded-2xl rounded-tl-sm bg-white shadow-sm overflow-hidden text-[#111B21]">
            <div className="p-3">
              <p
                className="font-bold text-[15px] mb-1.5 whitespace-pre-wrap"
                style={{ color: variantInfo.textAccent }}
              >
                {content.greeting}
              </p>
              <p className="text-[13.5px] leading-relaxed mb-3 text-gray-800">
                {content.bodyPara1}
              </p>

              <div className="rounded-xl border border-gray-100 overflow-hidden bg-gray-50 shadow-sm mb-3">
                <div
                  className="h-20 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${variantInfo.accent}15, ${variantInfo.accent}30)`,
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
                  <div className="relative z-10 text-center px-2">
                    <span className="text-2xl block mb-1">✈️</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-900 drop-shadow-sm">
                      {content.headline} - Dubai
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <span className="font-bold text-sm text-gray-900 leading-tight">
                      {content.headline} - Dubai
                    </span>
                    <span
                      className="font-bold text-sm shrink-0"
                      style={{ color: variantInfo.textAccent }}
                    >
                      ₹{content.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-2 leading-snug">
                    {content.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center border-t border-gray-100 pt-2 pb-1">
                <button className="w-full font-bold text-sm text-[#00A884] py-1 text-center flex justify-center items-center">
                  <span className="underline">{content.cta}</span>
                </button>
              </div>
            </div>
            <div className="text-right px-3 pb-2 text-[10px] text-gray-400 font-medium flex justify-end items-center gap-1">
              09:41{" "}
              <CheckCircle size={12} className="text-[#53BDEB] fill-current" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Message input bar */}
      <div className="bg-[#F0F0F0] px-2 py-2 flex items-center gap-2">
        <div className="bg-white flex-1 rounded-full px-4 py-2 text-sm text-gray-400">
          Message
        </div>
      </div>
    </div>
  )
}"""

story_preview = """function SocialStoryPreview({ content, variantInfo }: any) {
  return (
    <div
      className="flex flex-col h-full relative font-sans"
      style={{
        background: `linear-gradient(160deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)`,
      }}
    >
      <div className="flex gap-1 px-3 pt-4 pb-2 relative z-10">
        <div className="h-0.5 flex-1 bg-white rounded-full"></div>
        <div className="h-0.5 flex-1 bg-white/30 rounded-full"></div>
        <div className="h-0.5 flex-1 bg-white/30 rounded-full"></div>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 relative z-10">
        <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-xs font-bold text-white bg-black/20">
          SM
        </div>
        <span className="text-white text-xs font-bold drop-shadow-md">
          Solstice Mobile · Sponsored
        </span>
        <div className="ml-auto text-white">×</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 relative z-10 text-center mt-[-20px]">
        <div className="text-5xl mb-4 p-4 rounded-full shadow-lg">
          🇦🇪
        </div>
        <h2 className="text-white text-[24px] font-black leading-tight mb-3 drop-shadow-lg">
          {content.bodyPara2}
        </h2>

        <div className="bg-white rounded-xl p-5 shadow-2xl w-full max-w-[240px]">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            Special Offer
          </div>
          <div className="text-[17px] font-bold text-gray-900 leading-tight">
            {content.headline}
          </div>
          <div className="text-[14px] font-semibold text-gray-700 mt-1">
            {content.shortDetails}
          </div>
          <div
            className="text-3xl font-black mt-2 mb-2"
            style={{ color: "#DD2A7B" }}
          >
            ₹{content.price}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center z-10">
        <ChevronDown size={20} className="text-white mb-1 drop-shadow-md" />
        <button className="bg-white/20 backdrop-blur-md text-white font-bold text-sm px-6 py-2.5 rounded-full border border-white/40 shadow-lg uppercase tracking-wider">
          Tap to Activate
        </button>
      </div>
    </div>
  )
}"""

feed_preview = """function SocialFeedPreview({ content, variantInfo }: any) {
  return (
    <div className="flex flex-col h-full bg-white font-sans">
      <div className="flex items-center gap-2.5 px-3 py-3 border-b border-gray-100">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 bg-[#1877F2]">
          SM
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-gray-900">Solstice Mobile</div>
          <div className="text-xs text-gray-500">Sponsored · 🌍</div>
        </div>
        <MoreHorizontal size={18} className="text-gray-500" />
      </div>
      <div className="px-3 pt-3 pb-2">
        <p className="text-[13px] leading-relaxed text-gray-800 mb-2 whitespace-pre-wrap">
          {content.bodyPara1}
        </p>
      </div>
      <div className="mx-3 mb-2 rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group">
        <div
          className="h-36 flex flex-col items-center justify-center text-center p-4 relative"
          style={{
            background: `linear-gradient(135deg, #FFDAB9 0%, #F58529 100%)`,
          }}
        >
          <span className="text-4xl mb-2 drop-shadow-md">🏜️</span>
          <div className="text-[15px] font-black text-white tracking-tight leading-tight drop-shadow-md">
            Dubai Roaming
          </div>
        </div>
        <div className="bg-gray-50 px-3 py-2.5 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">
              {content.shortDetails}
            </div>
            <div className="text-[13px] font-bold text-gray-900">
              ₹{content.price}
            </div>
          </div>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-xs font-bold py-1.5 px-3 rounded-lg transition-colors">
            {content.cta}
          </button>
        </div>
      </div>
      <div className="px-3 py-2.5 flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-50 mt-auto">
        <span className="flex items-center gap-1">
          <span className="bg-[#1877F2] text-white rounded-full p-0.5 text-[10px]">
            👍
          </span>{" "}
          4.2K
        </span>
        <span>128 comments · 45 shares</span>
      </div>
    </div>
  )
}"""

paid_preview = """function PaidSocialPreview({ content, variantInfo }: any) {
  return (
    <div className="flex flex-col h-full bg-white font-sans">
      <div className="flex items-center gap-2.5 px-3 py-3 border-b border-gray-100">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: "#1877F2" }}
        >
          SM
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-gray-900">Solstice Mobile</div>
          <div className="text-xs text-gray-500">Sponsored</div>
        </div>
        <MoreHorizontal size={18} className="text-gray-500" />
      </div>
      <div className="px-3 pt-3 pb-3 text-[13px] leading-relaxed text-gray-800">
        {content.adHeadline}
      </div>
      <div className="mx-3 mb-3 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 cursor-pointer relative">
        <div
          className="h-40 flex flex-col items-center justify-center p-3 relative overflow-hidden text-center"
          style={{
            background: `linear-gradient(135deg, #00BFFF 0%, #1E90FF 100%)`,
          }}
        >
          <div className="text-5xl drop-shadow-lg mb-2">🏙️</div>
          <div className="text-xl font-black text-white leading-tight drop-shadow-md">
            {content.headline}
          </div>
          <div className="text-sm text-white/90 font-medium mt-1">
            {content.details}
          </div>
        </div>
        <div className="p-3 bg-white flex justify-between items-center border-t border-gray-100">
          <div>
            <div className="text-[10px] uppercase text-gray-400 font-bold mb-0.5">
              solsticemobile.com
            </div>
            <div className="text-[13px] font-bold text-gray-900">
              ₹{content.price}
            </div>
          </div>
          <span
            className="text-xs font-bold px-3 py-1.5 rounded text-white shadow-sm"
            style={{ background: "#1877F2" }}
          >
            Shop Now
          </span>
        </div>
      </div>
      <div className="px-3 pb-3 text-[10px] text-gray-400 mt-auto flex justify-between">
        <span>👍 ❤️ 2.1K</span>
        <span>45 Comments</span>
      </div>
    </div>
  )
}"""

push_preview = """function AppPushPreview({ content, variantInfo }: any) {
  return (
    <div
      className="flex flex-col h-full font-sans"
      style={{ background: "linear-gradient(160deg,#1F2937 0%,#0F172A 100%)" }}
    >
      <div className="text-center py-10 mt-10">
        <div className="text-white text-6xl font-thin mb-1 tracking-tight">
          09:41
        </div>
        <div className="text-white/60 text-sm">{content.date}</div>
      </div>
      <div
        className="mx-4 mt-6 rounded-2xl overflow-hidden shadow-2xl relative"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-start gap-3 px-4 py-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5 shadow-sm"
            style={{ background: "#7A1230" }}
          >
            SM
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-xs font-bold uppercase tracking-wider">
                Solstice Mobile
              </span>
              <span className="text-white/50 text-[10px]">now</span>
            </div>
            <p className="text-white font-bold text-[13.5px] leading-tight mb-1">
              {content.bodyPara1}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-auto pb-8 text-center text-white/50 text-xs flex flex-col items-center gap-2">
         <span>{content.swipeText}</span>
         <div className="w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  )
}"""

sms_preview = """function SMSPreview({ content }: any) {
  return (
    <div className="flex flex-col h-full bg-gray-50 font-sans relative">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white/90 backdrop-blur absolute top-0 left-0 right-0 z-10">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 bg-gray-400">
          SM
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-gray-900 text-center mr-8">
            Solstice
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 pt-16 flex flex-col gap-3 justify-end overflow-y-auto pb-4">
        <div className="text-center text-[10px] text-gray-400 font-medium mb-1">
          Today 09:41
        </div>
        <div className="self-start max-w-[85%]">
          <div className="rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] leading-relaxed shadow-sm bg-gray-200 text-black">
            {content.bodyPara1} <br/> Activate: <span className="text-blue-600 underline">bit.ly/SM-ROAM</span> · {content.bodyPara2}
          </div>
        </div>
        <div className="text-left text-[10px] text-gray-400 font-medium pl-1">
          Delivered
        </div>
      </div>
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3">
         <div className="flex-1 border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-400">Text Message</div>
      </div>
    </div>
  )
}"""

# Replace the components
content = re.sub(r'function WhatsAppPreview[\s\S]*?(?=function SocialStoryPreview)', whatsapp_preview + '\n\n', content)
content = re.sub(r'function SocialStoryPreview[\s\S]*?(?=function SocialFeedPreview)', story_preview + '\n\n', content)
content = re.sub(r'function SocialFeedPreview[\s\S]*?(?=function PaidSocialPreview)', feed_preview + '\n\n', content)
content = re.sub(r'function PaidSocialPreview[\s\S]*?(?=function AppPushPreview)', paid_preview + '\n\n', content)
content = re.sub(r'function AppPushPreview[\s\S]*?(?=function SMSPreview)', push_preview + '\n\n', content)
content = re.sub(r'function SMSPreview[\s\S]*?(?=// ── Detail Item Component)', sms_preview + '\n\n', content)

with open("src/pages/ContentStudio.tsx", "w") as f:
    f.write(content)
