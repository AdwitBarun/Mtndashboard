import re

with open("src/pages/ContentStudio.tsx", "r") as f:
    content = f.read()

header = """          {/* CENTER — Live preview */}
          <div className="rounded-xl border overflow-hidden flex flex-col shadow-sm" style={{ borderColor: "#E2E2E6" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#F3F4F6", background: "#FAFAFA" }}>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#2F855A" }} />
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    Live Preview — {channelMeta.label}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    Deliver a full-screen sponsored story ad.
                  </div>
                </div>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-[#2F855A]/10 text-[#2F855A] border border-[#2F855A]/20">
                Active Channel
              </span>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center py-8 bg-gray-50/80 relative overflow-hidden">
               <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
               {/* Realistic Phone Mockup */}
              <div className="relative w-[320px] h-[650px] bg-black rounded-[3rem] shadow-2xl border-[6px] border-gray-900 overflow-hidden ring-1 ring-gray-800 flex flex-col z-10">"""

content = re.sub(
    r'\{\/\* CENTER — Live preview \*\/\}\n\s*<div className="flex flex-col items-center justify-center p-6 bg-gray-50/80 rounded-2xl border border-gray-200 shadow-inner relative overflow-hidden">\n\s*\{\/\* Realistic Phone Mockup \*\/\}\n\s*<div className="relative w-\[320px\] h-\[650px\] bg-black rounded-\[3rem\] shadow-2xl border-\[6px\] border-gray-900 overflow-hidden ring-1 ring-gray-800 flex flex-col">',
    header,
    content
)

# And add the closing div for the new wrapper
content = re.sub(
    r'(\s*\{selectedChannel === "sms" && \(\n\s*<SMSPreview content=\{contentData\} \/>\n\s*\)\}\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>)',
    r'\1\n          </div>',
    content
)

with open("src/pages/ContentStudio.tsx", "w") as f:
    f.write(content)
