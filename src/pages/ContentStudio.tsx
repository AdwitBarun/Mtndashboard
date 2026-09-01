import { useState } from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Wifi,
  Battery,
  Phone,
  Video,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
  Heart,
  Send,
  Camera,
} from "lucide-react"
import Layout from "../components/Layout"
import { getCustomer, Customer } from "../data/customers"
import { derivePainPoints, deriveOffers } from "../data/derived"

const STAGES_NAV = [
  { key: "sense", label: "Sense", path: "identity" },
  { key: "decide", label: "Decide", path: "pain-points" },
  { key: "engage", label: "Engage", path: "content-studio" },
  { key: "optimize", label: "Optimize", path: "feedback" },
]

// Authentic logos
const WhatsappIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    className="text-[#25D366]"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    className="text-[#E1306C]"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    className="text-[#1877F2]"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const MetaIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    className="text-[#0668E1]"
  >
    <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.688 1.927 2.877 1.927 1.223 0 2.093-.567 3.622-3.019.577-.925 1.286-2.081 1.782-2.884l.036-.059 1.31-2.116.049-.078c.348-.564.687-1.109 1.02-1.62l.014-.021.014-.022c.184-.281.365-.552.545-.816l.043-.062c1.15-1.646 2.156-2.482 3.323-2.482 1.045 0 1.923.79 2.658 2.198.148.283.284.575.407.877l.02.05.058.146c.264.702.459 1.458.586 2.213.048.288.088.579.117.869v.005c.02.191.033.383.04.575.01.288.01.573 0 .855-.01.263-.036.523-.075.777-.048.31-.119.61-.212.895-.164.505-.408.955-.727 1.324-.293.339-.65.607-1.05.783-.353.155-.75.235-1.164.235-1.19 0-2.043-.658-3.5-3.116-.13-.22-.269-.457-.415-.71l-.043-.075-.078-.135c-.08-.14-.163-.286-.249-.437l-.045-.079-1.31-2.315-.037-.066a91.8 91.8 0 0 0-.694-1.204 30.983 30.983 0 0 0-.407-.652c-.184-.28-.366-.549-.548-.803l-.043-.06C10.06 4.796 9.055 3.96 7.888 3.96c-.322 0-.638.06-.94.176l-.033-.106zm.055 1.667c.62 0 1.181.485 1.777 1.336l.023.033c.15.216.301.454.454.71l.038.064c.23.386.467.813.717 1.28l.028.052 1.31 2.315.043.077c.85 1.502 1.352 2.325 1.744 2.902l.026.038c.62.912 1.11 1.315 1.719 1.315.284 0 .53-.076.732-.221.16-.115.294-.276.398-.474.113-.216.192-.482.235-.79a5.31 5.31 0 0 0 .048-.716c0-.176-.008-.36-.024-.548l-.005-.058a10.5 10.5 0 0 0-.087-.657l-.014-.08a8.586 8.586 0 0 0-.45-1.69c-.096-.234-.2-.454-.312-.667-.53-1.017-1.12-1.61-1.802-1.61-.732 0-1.412.56-2.297 1.83l-.043.061c-.15.216-.301.451-.454.702l-.014.021-.014.023c-.298.487-.607 1.019-.918 1.578l-.049.088-1.31 2.116-.036.059c-.437.706-.936 1.494-1.35 2.084-.888 1.263-1.31 1.545-1.9 1.545-.53 0-.98-.4-1.316-.981a3.612 3.612 0 0 1-.253-.522 4.937 4.937 0 0 1-.198-.646 8.42 8.42 0 0 1-.16-1.549c0-2.026.544-4.264 1.492-5.775.844-1.302 1.914-2.096 2.996-2.096z" />
  </svg>
)

const AppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    className="text-[#7C3AED]"
  >
    <path d="M18 2H6a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4V6a4 4 0 00-4-4zm-6 17a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6-5H6V6h12v8z" />
  </svg>
)

const SMSIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    className="text-[#34C759]"
  >
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
  </svg>
)

const CHANNELS = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    type: "Direct Message",
    icon: WhatsappIcon,
  },
  {
    key: "story",
    label: "Instagram Story",
    type: "Social Media",
    icon: InstagramIcon,
  },
  {
    key: "feed",
    label: "Facebook Feed",
    type: "Social Media",
    icon: FacebookIcon,
  },
  { key: "paid", label: "Meta Ads", type: "Paid Social", icon: MetaIcon },
  {
    key: "push",
    label: "MySolstice App",
    type: "Push Notification",
    icon: AppIcon,
  },
  { key: "sms", label: "SMS", type: "Direct Message", icon: SMSIcon },
]

// ── Data Helpers ─────────────────────────────────────────────────────────────

function getVariantDetails(variant: string) {
  switch (variant) {
    case "warm":
      return {
        name: "Warm + Benefit Led",
        style: "Friendly, Helpful, Relationship-focused",
        why: "High-loyalty customers respond best to relationship-focused framing.",
        lift: "72%",
        confidence: "93%",
        audience: "Family / High-Loyalty",
        accent: "#059669",
        bg: "#ECFDF5",
        textAccent: "#065F46",
      }
    case "urgency":
      return {
        name: "Urgency + Scarcity",
        style: "Immediate, FOMO, Time sensitive",
        why: "Risk segments convert faster with deadlines and clear loss-aversion.",
        lift: "58%",
        confidence: "86%",
        audience: "Churn Risk / Price Sensitive",
        accent: "#D97706",
        bg: "#FFFBEB",
        textAccent: "#92400E",
      }
    case "simple":
      return {
        name: "Simple + Direct",
        style: "Minimal, Action-oriented",
        why: "Younger techies or busy professionals prefer fast, clear propositions.",
        lift: "64%",
        confidence: "89%",
        audience: "Professionals / Techies",
        accent: "#2563EB",
        bg: "#EFF6FF",
        textAccent: "#1E40AF",
      }
    default:
      return getVariantDetails("warm")
  }
}

/**
 * Returns strategy-specific English copy so that each variant genuinely
 * changes the persuasion approach (not just the colour).
 */
function getVariantCopy(variant: string, firstName: string) {
  switch (variant) {
    case "urgency":
      return {
        greeting: `Travel alert, ${firstName} ⚡`,
        headlineTag: "Activate before you fly",
        bodyPara1: `Dubai trip coming up? Activate your roaming pack before departure and avoid costly pay-as-you-go charges once you land.`,
        bodyPara2: `Only ₹599 — limited traveller pricing.`,
        cta: "Activate Before Travel",
        adHeadline: "Don't get hit by roaming bill shock in Dubai.",
        storyHeadline: "Activate before you fly",
      }
    case "simple":
      return {
        greeting: `Dubai Roaming Pack`,
        headlineTag: "Everything you need",
        bodyPara1: `10GB Data • 100 Minutes • Unlimited Incoming • Valid 7 Days • ₹599.`,
        bodyPara2: `Activate and stay connected in Dubai.`,
        cta: "Activate Pack",
        adHeadline: "Dubai Roaming • 10GB • 100 Min • ₹599",
        storyHeadline: "Stay connected in Dubai",
      }
    case "warm":
    default:
      return {
        greeting: `Hi ${firstName}! 👋`,
        headlineTag: "We've got you covered",
        bodyPara1: `Planning another Dubai trip? Stay connected with family, maps and work with 10GB roaming data for 7 days at just ₹599.`,
        bodyPara2: `Enjoy a worry-free travel experience with uninterrupted connectivity.`,
        cta: "Activate Now",
        adHeadline: "Your Dubai trip, our connection.",
        storyHeadline: "Stay connected, worry-free",
      }
  }
}

function generateContent(
  language: string,
  variant: string,
  customer: Customer,
  offerName: string,
) {
  const firstName = customer.name.split(" ")[0]
  const price = 599 // Fixed price for the Dubai offer
  const offerTitle = "Smart Roaming Pack"
  const offerDetails = "10GB / 100 Min / Unltd, Valid 7 Days"
  const shortDetails = "10 GB / 7 Days"

  // Bulleted feature list rendered inside rich cards
  const features = [
    "10GB High-Speed Data",
    "100 Outgoing Minutes",
    "Unlimited Incoming",
    "Valid 7 Days",
  ]

  if (language === "Hindi") {
    return {
      greeting: `नमस्ते ${firstName} 👋`,
      bodyPara1: `दुबई की यात्रा कर रहे हैं? मात्र ₹599 में 7 दिनों के लिए 10GB डेटा पाएं।`,
      bodyPara2: `बिना किसी चिंता के दुबई में घूमें। नियम व शर्तें लागू।`,
      cta: `अभी सक्रिय करें`,
      price,
      headline: offerTitle,
      details: offerDetails,
      shortDetails,
      features,
      subject: `दुबई यात्रा पैक`,
      adHeadline: `आपकी दुबई यात्रा, हमारा नेटवर्क`,
      storyHeadline: `बेफिक्र होकर जुड़े रहें`,
      swipeText: `खोलने के लिए ऊपर स्वाइप करें`,
      date: `शुक्रवार, 3 मई`,
    }
  }

  if (language === "Marathi") {
    return {
      greeting: `नमस्कार ${firstName} 👋`,
      bodyPara1: `दुबईला प्रवास करत आहात? फक्त ₹599 मध्ये 7 दिवसांसाठी 10GB मिळवा.`,
      bodyPara2: `दुबईत बिनधास्त प्रवास करा. अटी लागू.`,
      cta: `आता सक्रिय करा`,
      price,
      headline: offerTitle,
      details: offerDetails,
      shortDetails,
      features,
      subject: `दुबई ट्रॅव्हल पॅक`,
      adHeadline: `तुमची दुबई ट्रिप, आमचे नेटवर्क`,
      storyHeadline: `निश्चिंत राहून जोडलेले राहा`,
      swipeText: `उघडण्यासाठी वर स्वाइप करा`,
      date: `शुक्रवार, 3 मे`,
    }
  }

  if (language === "Tamil") {
    return {
      greeting: `வணக்கம் ${firstName} 👋`,
      bodyPara1: `துபாய் பயணம் செய்கிறீர்களா? வெறும் ₹599-க்கு 7 நாட்களுக்கு 10GB பெறுங்கள்.`,
      bodyPara2: `துபாயில் கவலையின்றி பயணம் செய்யுங்கள். நிபந்தனைகள் பொருந்தும்.`,
      cta: `இப்போதே செயல்படுத்துக`,
      price,
      headline: offerTitle,
      details: offerDetails,
      shortDetails,
      features,
      subject: `துபாய் பயணத் தொகுப்பு`,
      adHeadline: `உங்கள் துபாய் பயணம், எங்கள் இணைப்பு`,
      storyHeadline: `கவலையின்றி இணைந்திருங்கள்`,
      swipeText: `திறக்க மேலே ஸ்வைப் செய்யவும்`,
      date: `வெள்ளிக்கிழமை, 3 மே`,
    }
  }

  if (language === "Telugu") {
    return {
      greeting: `నమస్కారం ${firstName} 👋`,
      bodyPara1: `దుబాయ్ ప్రయాణిస్తున్నారా? కేవలం ₹599 తో 7 రోజులకు 10GB పొందండి.`,
      bodyPara2: `దుబాయ్‌లో ఆందోళన లేకుండా ప్రయాణించండి. షరతులు వర్తిస్తాయి.`,
      cta: `ఇప్పుడే యాక్టివేట్ చేయండి`,
      price,
      headline: offerTitle,
      details: offerDetails,
      shortDetails,
      features,
      subject: `దుబాయ్ ట్రావెల్ ప్యాక్`,
      adHeadline: `మీ దుబాయ్ ట్రిప్, మా కనెక్షన్`,
      storyHeadline: `నిశ్చింతగా కనెక్ట్ అయి ఉండండి`,
      swipeText: `తెరవడానికి పైకి స్వైప్ చేయండి`,
      date: `శుక్రవారం, 3 మే`,
    }
  }

  // Default English — strategy-aware copy
  const copy = getVariantCopy(variant, firstName)
  return {
    greeting: copy.greeting,
    bodyPara1: copy.bodyPara1,
    bodyPara2: copy.bodyPara2,
    cta: copy.cta,
    price,
    headline: offerTitle,
    details: offerDetails,
    shortDetails,
    features,
    subject: `Dubai Travel Pack`,
    adHeadline: copy.adHeadline,
    storyHeadline: copy.storyHeadline,
    swipeText: `Swipe up to open`,
    date: `Friday, 3 May`,
  }
}

// ── Channel preview components ──────────────────────────────────────────────

function WhatsAppPreview({ content, variantInfo }: any) {
  return (
    <div className="flex flex-col h-full bg-[#EFEAE2] font-sans relative">
      {/* WhatsApp header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-3 bg-[#075E54] shrink-0">
        <ArrowLeft size={18} className="text-white shrink-0" />
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">
          SM
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-sm truncate">
            Solstice Mobile
          </div>
          <div className="text-white/80 text-[11px]">online</div>
        </div>
        <Video size={18} className="text-white mr-2 shrink-0" />
        <Phone size={18} className="text-white shrink-0" />
      </div>

      {/* Scrollable message area — content pinned to bottom, greeting always reachable */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-2">
        <div className="mt-auto text-center text-[10px] text-gray-600 mb-1 font-medium bg-white/70 w-fit mx-auto px-2 py-0.5 rounded-md shadow-sm">
          TODAY
        </div>
        <div className="text-center text-[10px] text-gray-600 mb-2 font-medium bg-[#FCF4CB] w-fit mx-auto px-3 py-1 rounded-md shadow-sm">
          🔒 Messages are end-to-end encrypted
        </div>

        <div className="self-start w-[92%]">
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

              {/* Rich product card */}
              <div className="rounded-xl border border-gray-100 overflow-hidden bg-gray-50 shadow-sm mb-3">
                <div
                  className="h-24 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${variantInfo.accent}22, ${variantInfo.accent}44)`,
                  }}
                >
                  <div className="relative z-10 text-center px-2">
                    <span className="text-3xl block mb-1">✈️</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                      {content.headline} · Dubai
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <span className="font-bold text-sm text-gray-900 leading-tight">
                      {content.headline}
                    </span>
                    <span
                      className="font-bold text-sm shrink-0"
                      style={{ color: variantInfo.textAccent }}
                    >
                      ₹{content.price}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {content.features.map((f: string) => (
                      <div
                        key={f}
                        className="flex items-center gap-1.5 text-[11.5px] text-gray-700"
                      >
                        <CheckCircle
                          size={12}
                          className="text-[#00A884] shrink-0"
                        />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center border-t border-gray-100 pt-2 pb-1">
                <button className="w-full font-bold text-sm text-[#00A884] py-1 text-center flex justify-center items-center">
                  <span>{content.cta}</span>
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
      <div className="bg-transparent px-2 py-2 flex items-center gap-2 shrink-0">
        <div className="bg-white flex-1 rounded-full px-4 py-2.5 text-sm text-gray-400 flex items-center gap-2 shadow-sm">
          <span className="mr-auto">Message</span>
          <Camera size={16} className="text-gray-400 ml-auto" />
        </div>
        <div className="w-10 h-10 rounded-full bg-[#075E54] flex items-center justify-center shrink-0">
          <Send size={16} className="text-white" />
        </div>
      </div>
    </div>
  )
}

function SocialStoryPreview({ content }: any) {
  return (
    <div
      className="flex flex-col h-full relative font-sans"
      style={{
        background: `linear-gradient(160deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)`,
      }}
    >
      {/* Story progress bars */}
      <div className="flex gap-1 px-3 pt-12 pb-2 relative z-10">
        <div className="h-0.5 flex-1 bg-white rounded-full"></div>
        <div className="h-0.5 flex-1 bg-white/30 rounded-full"></div>
        <div className="h-0.5 flex-1 bg-white/30 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 relative z-10">
        <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white bg-black/20">
          SM
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-white text-xs font-bold drop-shadow-md">
            solsticemobile
          </span>
          <span className="text-white/70 text-[9px]">Sponsored</span>
        </div>
        <div className="ml-auto text-white text-lg leading-none">×</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 relative z-10 text-center mt-[-30px]">
        <div className="text-6xl mb-3">🇦🇪</div>
        <h2 className="text-white text-[22px] font-black leading-tight mb-4 drop-shadow-lg uppercase tracking-wide">
          {content.storyHeadline}
        </h2>

        <div className="bg-white/95 backdrop-blur rounded-2xl p-5 shadow-2xl w-full max-w-[250px]">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            Smart Roaming Pack
          </div>
          <div className="text-[15px] font-bold text-gray-900 leading-tight">
            10GB + 100 Minutes
          </div>
          <div className="text-[13px] font-semibold text-gray-600 mt-0.5">
            Valid 7 Days · Dubai
          </div>
          <div
            className="text-3xl font-black mt-2"
            style={{ color: "#DD2A7B" }}
          >
            ₹{content.price}
          </div>
        </div>
      </div>

      {/* Swipe up CTA */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center z-10">
        <ChevronDown
          size={22}
          className="text-white mb-1 drop-shadow-md rotate-180 animate-bounce"
        />
        <span className="text-white font-bold text-sm drop-shadow-md">
          Swipe up to activate
        </span>
      </div>
    </div>
  )
}

function SocialFeedPreview({ content }: any) {
  return (
    <div className="flex flex-col h-full bg-white font-sans overflow-y-auto">
      {/* FB header */}
      <div className="flex items-center gap-2.5 px-3 pt-12 pb-3 shrink-0">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 bg-[#1877F2]">
          SM
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-gray-900 leading-tight">
            Solstice Mobile
          </div>
          <div className="text-[11px] text-gray-500 flex items-center gap-1">
            Sponsored · <span>🌐</span>
          </div>
        </div>
        <MoreHorizontal size={18} className="text-gray-500" />
      </div>

      {/* Caption */}
      <div className="px-3 pb-3">
        <p className="text-[13.5px] leading-relaxed text-gray-800 whitespace-pre-wrap">
          {content.bodyPara1}
        </p>
      </div>

      {/* Media */}
      <div className="w-full">
        <div
          className="h-44 flex flex-col items-center justify-center text-center p-4 relative"
          style={{
            background: `linear-gradient(135deg, #FDBA74 0%, #F97316 100%)`,
          }}
        >
          <span className="text-5xl mb-2 drop-shadow-md">🏜️</span>
          <div className="text-[18px] font-black text-white tracking-tight leading-tight drop-shadow-md">
            Dubai Roaming Pack
          </div>
          <div className="text-white/90 text-xs font-semibold mt-1">
            10GB · 100 Min · 7 Days
          </div>
        </div>
        {/* Link preview footer */}
        <div className="bg-gray-100 px-3 py-2.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">
              solsticemobile.com
            </div>
            <div className="text-[13px] font-bold text-gray-900">
              Stay connected abroad · ₹{content.price}
            </div>
          </div>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-xs font-bold py-2 px-3 rounded-md transition-colors shrink-0">
            Learn More
          </button>
        </div>
      </div>

      {/* Engagement stats */}
      <div className="px-3 py-2 flex items-center justify-between text-[11px] text-gray-500 border-b border-gray-100">
        <span className="flex items-center gap-1">
          <span className="bg-[#1877F2] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">
            👍
          </span>
          <span className="bg-[#F5533D] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] -ml-1">
            ❤️
          </span>
          4.2K
        </span>
        <span>128 comments · 45 shares</span>
      </div>

      {/* Action bar */}
      <div className="px-2 py-1 flex items-center justify-around text-gray-600 mt-auto">
        <button className="flex items-center gap-1.5 py-2 px-3 text-[12px] font-semibold hover:bg-gray-50 rounded-md">
          <ThumbsUp size={16} /> Like
        </button>
        <button className="flex items-center gap-1.5 py-2 px-3 text-[12px] font-semibold hover:bg-gray-50 rounded-md">
          <MessageCircle size={16} /> Comment
        </button>
        <button className="flex items-center gap-1.5 py-2 px-3 text-[12px] font-semibold hover:bg-gray-50 rounded-md">
          <Share2 size={16} /> Share
        </button>
      </div>
    </div>
  )
}

function PaidSocialPreview({ content }: any) {
  return (
    <div className="flex flex-col h-full bg-white font-sans overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3 pt-12 pb-3 shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: "#0668E1" }}
        >
          SM
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-gray-900 leading-tight">
            Solstice Mobile
          </div>
          <div className="text-[11px] text-gray-500 flex items-center gap-1">
            Sponsored · <span>🌐</span>
          </div>
        </div>
        <MoreHorizontal size={18} className="text-gray-500" />
      </div>

      {/* Ad copy */}
      <div className="px-3 pb-3 text-[13.5px] leading-relaxed text-gray-800">
        {content.adHeadline}
      </div>

      {/* Ad creative */}
      <div className="w-full">
        <div
          className="h-44 flex flex-col items-center justify-center p-3 relative overflow-hidden text-center"
          style={{
            background: `linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)`,
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
        <div className="p-3 bg-gray-100 flex justify-between items-center">
          <div>
            <div className="text-[10px] uppercase text-gray-500 font-bold mb-0.5 tracking-wider">
              SOLSTICEMOBILE.COM
            </div>
            <div className="text-[13px] font-bold text-gray-900">
              Roaming from ₹{content.price}
            </div>
          </div>
          <span
            className="text-xs font-bold px-4 py-2 rounded-md text-white shadow-sm shrink-0"
            style={{ background: "#0668E1" }}
          >
            Shop Now
          </span>
        </div>
      </div>

      {/* Engagement */}
      <div className="px-3 py-2.5 flex items-center justify-between text-[11px] text-gray-500 mt-auto border-t border-gray-100">
        <span className="flex items-center gap-1">
          <Heart size={13} className="text-[#F5533D] fill-current" /> 2.1K
        </span>
        <span>45 comments</span>
      </div>
    </div>
  )
}

function AppPushPreview({ content }: any) {
  return (
    <div
      className="flex flex-col h-full font-sans"
      style={{
        background:
          "linear-gradient(160deg,#4C1D95 0%,#1F2937 55%,#0F172A 100%)",
      }}
    >
      {/* Lock screen clock */}
      <div className="text-center py-10 mt-8">
        <div className="text-white/80 text-sm font-medium">{content.date}</div>
        <div className="text-white text-7xl font-thin tracking-tight leading-none mt-1">
          9:41
        </div>
      </div>

      {/* Push notification banner */}
      <div
        className="mx-3 mt-4 rounded-2xl overflow-hidden shadow-2xl relative"
        style={{
          background: "rgba(255,255,255,0.16)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-start gap-3 px-4 py-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5 shadow-sm"
            style={{ background: "#7C3AED" }}
          >
            SM
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-[11px] font-bold uppercase tracking-wider">
                MySolstice App
              </span>
              <span className="text-white/50 text-[10px]">now</span>
            </div>
            <p className="text-white font-bold text-[13px] leading-tight mb-1">
              ✈️ Travel detected — Dubai
            </p>
            <p className="text-white/80 text-[12px] leading-snug">
              Activate your Smart Roaming Pack now and save up to ₹1,200 on
              international usage. Tap to activate.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom swipe hint */}
      <div className="mt-auto pb-8 text-center text-white/50 text-xs flex flex-col items-center gap-2">
        <span>{content.swipeText}</span>
        <div className="w-32 h-1 bg-white/40 rounded-full"></div>
      </div>
    </div>
  )
}

function SMSPreview({ content }: any) {
  return (
    <div className="flex flex-col h-full bg-white font-sans relative">
      {/* iMessage-style header */}
      <div className="flex flex-col items-center gap-1 px-4 pt-16 pb-3 border-b border-gray-100 bg-white/95 backdrop-blur absolute top-0 left-0 right-0 z-10">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-gray-400 shadow-sm">
          SM
        </div>
        <div className="text-[13px] font-semibold text-gray-900">Solstice</div>
      </div>

      {/* Message thread — bottom pinned */}
      <div className="flex-1 min-h-0 p-4 pt-36 flex flex-col gap-2 overflow-y-auto pb-4">
        <div className="mt-auto text-center text-[10px] text-gray-400 font-medium mb-1">
          Text Message · Today 09:41
        </div>
        <div className="self-start max-w-[85%]">
          <div className="rounded-2xl rounded-bl-sm px-4 py-3 text-[14px] leading-relaxed shadow-sm bg-gray-200 text-black whitespace-pre-line">
            {`Dubai trip? 🌍\n\n10GB + 100 Min · 7 Days\nOnly ₹${content.price}\n\nActivate: `}
            <span className="text-blue-600 underline">bit.ly/SM-ROAM</span>
          </div>
        </div>
        <div className="text-left text-[10px] text-gray-400 font-medium pl-1">
          Delivered
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-gray-200 px-3 py-3 flex items-center gap-2 shrink-0">
        <div className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-400">
          Text Message
        </div>
        <div className="w-8 h-8 rounded-full bg-[#34C759] flex items-center justify-center shrink-0">
          <Send size={15} className="text-white" />
        </div>
      </div>
    </div>
  )
}

// ── Detail Item Component ────────────────────────────────────────────────────
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 flex flex-col justify-center">
      <div className="text-[9px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">
        {label}
      </div>
      <div
        className="text-[11px] text-gray-900 font-semibold truncate"
        title={value}
      >
        {value}
      </div>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function ContentStudio() {
  const { customerId } = useParams<{ customerId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const explorerSearch =
    (location.state as { explorerSearch?: string } | null)?.explorerSearch ?? ""

  const customer = getCustomer(customerId ?? "")

  const [selectedChannel, setSelectedChannel] = useState("whatsapp")
  const [activeVariant, setActiveVariant] = useState("warm")
  const [language, setLanguage] = useState("English")
  const [approved, setApproved] = useState(false)

  if (!customer) {
    return (
      <Layout>
        <div className="p-8">
          <p style={{ color: "#6B7280" }}>Customer not found.</p>
        </div>
      </Layout>
    )
  }

  const painPoints = derivePainPoints(customer)
  const offers = deriveOffers(customer, painPoints)
  const topPain = painPoints[0]
  const topOffer = offers[0]
  const offerName = topOffer?.title ?? customer.nextBestAction.offerName
  const topPainTitle = topPain?.title ?? "Engagement"

  const getSubtitle = (channelKey: string) => {
    switch (channelKey) {
      case "whatsapp":
        return "Deliver a personalized 1:1 rich message."
      case "story":
        return "Deliver an immersive full-screen story experience."
      case "feed":
        return "Deliver an engaging social feed post."
      case "paid":
        return "Deliver a targeted sponsored ad."
      case "push":
        return "Deliver a high-visibility push notification."
      case "sms":
        return "Deliver a direct text message alert."
      default:
        return ""
    }
  }

  const channelMeta = CHANNELS.find((c) => c.key === selectedChannel)!
  const variantInfo = getVariantDetails(activeVariant)
  const contentData = generateContent(
    language,
    activeVariant,
    customer,
    offerName,
  )

  return (
    <Layout>
      <div className="p-6 md:p-8 flex flex-col h-full">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to={`/hub/${customer.id}/identity`}
            state={{ explorerSearch }}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "#7C3AED" }}
          >
            <ArrowLeft size={14} /> Back to Customer Identity
          </Link>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-5">
              {STAGES_NAV.map((s) => {
                const isActive = s.key === "engage"
                return (
                  <button
                    key={s.key}
                    onClick={() =>
                      navigate(`/hub/${customer.id}/${s.path}`, {
                        state: { explorerSearch },
                      })
                    }
                    className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70"
                    title={s.label}
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={
                        isActive
                          ? { background: "#7C3AED" }
                          : STAGES_NAV.findIndex((x) => x.key === s.key) <
                              STAGES_NAV.findIndex((x) => x.key === "engage")
                            ? { background: "#8B5CF6" }
                            : {
                                background: "transparent",
                                border: "2px solid #CBD5E1",
                              }
                      }
                    />
                    <span
                      className="text-[10px] font-medium whitespace-nowrap"
                      style={{
                        color: isActive
                          ? "#7C3AED"
                          : STAGES_NAV.findIndex((x) => x.key === s.key) <
                              STAGES_NAV.findIndex((x) => x.key === "engage")
                            ? "#8B5CF6"
                            : "#CBD5E1",
                      }}
                    >
                      {s.label}
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
                background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                color: "white",
              }}
            >
              <span className="text-[10px] font-bold text-white">SPOG</span>
            </Link>
          </div>
        </div>

        {/* Breadcrumb */}
        <div
          className="flex items-center gap-1.5 text-xs mb-5"
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
          <span>Engage</span>
          <span>›</span>
          <span style={{ color: "#1F2937", fontWeight: 600 }}>
            Content Studio
          </span>
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_360px] gap-6 flex-1 min-h-[640px]">
          {/* LEFT — Channel list */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-gray-800 mb-1 px-1">
              Channel Distribution
            </h2>
            {CHANNELS.map(({ key, label, type, icon: Icon }) => {
              const active = selectedChannel === key
              return (
                <button
                  key={key}
                  onClick={() => setSelectedChannel(key)}
                  className={`w-full flex items-center justify-between p-4 text-left transition-all rounded-xl border bg-white ${
                    active
                      ? "shadow-md ring-1 ring-[#7C3AED]"
                      : "shadow-sm hover:shadow-md"
                  }`}
                  style={{
                    borderColor: active ? "#7C3AED" : "#E5E7EB",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full border border-gray-100">
                      <Icon />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {label}
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium">
                        {type}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`${active ? "text-[#7C3AED]" : "text-gray-400"}`}
                  />
                </button>
              )
            })}
          </div>

          {/* CENTER — Live preview */}
          <div
            className="rounded-xl border overflow-hidden flex flex-col shadow-sm"
            style={{ borderColor: "#E2E2E6" }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: "#F3F4F6", background: "#FAFAFA" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#2F855A" }}
                />
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    Live Preview — {channelMeta.label}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    {getSubtitle(selectedChannel)}
                  </div>
                </div>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-[#2F855A]/10 text-[#2F855A] border border-[#2F855A]/20">
                Active Channel
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-start pt-4 pb-4 bg-gray-50/80 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#CBD5E1 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              ></div>
              {/* Realistic Phone Mockup — fits viewport height */}
              <div className="relative h-[min(720px,calc(100vh-220px))] aspect-[9/19.5] bg-black rounded-[3rem] shadow-2xl border-[7px] border-gray-900 overflow-hidden ring-1 ring-gray-800 flex flex-col z-10">
                {/* Phone Notch/Island */}
                <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
                  <div className="w-36 h-7 bg-black rounded-b-3xl"></div>
                </div>

                {/* Phone Status Bar */}
                <div className="absolute top-0 inset-x-0 h-12 flex justify-between items-center px-7 z-40 text-white font-medium text-xs pointer-events-none">
                  <span>9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <Wifi size={14} />
                    <Battery size={14} />
                  </div>
                </div>

                {/* Dynamic App Content */}
                <div className="flex-1 min-h-0 w-full bg-white overflow-hidden rounded-[2.9rem] mt-1 relative z-30">
                  {selectedChannel === "whatsapp" && (
                    <WhatsAppPreview
                      content={contentData}
                      variantInfo={variantInfo}
                    />
                  )}
                  {selectedChannel === "story" && (
                    <SocialStoryPreview content={contentData} />
                  )}
                  {selectedChannel === "feed" && (
                    <SocialFeedPreview content={contentData} />
                  )}
                  {selectedChannel === "paid" && (
                    <PaidSocialPreview content={contentData} />
                  )}
                  {selectedChannel === "push" && (
                    <AppPushPreview content={contentData} />
                  )}
                  {selectedChannel === "sms" && (
                    <SMSPreview content={contentData} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Details panel */}
          <div
            className="rounded-xl border bg-white overflow-hidden flex flex-col shadow-sm"
            style={{ borderColor: "#E2E2E6" }}
          >
            <div
              className="px-4 py-3 border-b text-xs font-bold uppercase tracking-wider flex justify-between items-center"
              style={{
                borderColor: "#F3F4F6",
                color: "#6B7280",
                background: "#FAFAFA",
              }}
            >
              <span>Message Intelligence</span>
              {approved && <CheckCircle size={14} className="text-[#2F855A]" />}
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
              {/* Recipient */}
              <div
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100"
                style={{ background: "#FAFAFA" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-sm"
                  style={{ background: "#7C3AED" }}
                >
                  {customer.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    {customer.name}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    Recipient • {customer.id}
                  </div>
                </div>
              </div>

              {/* Language Selector */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400">
                  Target Language
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {["English", "Hindi", "Marathi", "Tamil", "Telugu"].map(
                    (lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors shadow-sm ${
                          language === lang
                            ? "bg-[#7C3AED] text-white border-[#7C3AED]"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {lang === "Hindi"
                          ? "हिन्दी"
                          : lang === "Marathi"
                            ? "मराठी"
                            : lang === "Tamil"
                              ? "தமிழ்"
                              : lang === "Telugu"
                                ? "తెలుగు"
                                : "English"}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400">
                  Context
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <DetailItem label="Segment" value={customer.segment} />
                  <DetailItem label="Channel" value={channelMeta.label} />
                  <DetailItem label="Target Offer" value={offerName} />
                  <DetailItem label="NBA Driver" value={topPainTitle} />
                  <DetailItem label="Uplift" value={variantInfo.lift} />
                  <DetailItem
                    label="Confidence"
                    value={variantInfo.confidence}
                  />
                </div>
              </div>

              {/* Variant Strategy */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400">
                  Variant Strategy
                </div>
                <div className="flex flex-col gap-2">
                  {["warm", "urgency", "simple"].map((variantKey) => {
                    const v = getVariantDetails(variantKey)
                    const active = activeVariant === variantKey
                    return (
                      <button
                        key={variantKey}
                        onClick={() => setActiveVariant(variantKey)}
                        className={`w-full text-left rounded-xl border p-3 transition-all ${
                          active ? "shadow-sm" : ""
                        }`}
                        style={{
                          borderColor: active ? v.accent : "#E2E2E6",
                          backgroundColor: active ? v.bg : "white",
                        }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="text-xs font-bold"
                            style={{ color: active ? v.textAccent : "#1F2937" }}
                          >
                            {v.name}
                          </span>
                          {active && (
                            <CheckCircle
                              size={14}
                              style={{ color: v.textAccent }}
                            />
                          )}
                        </div>
                        <p className="text-[10.5px] text-gray-600 leading-snug font-medium">
                          {v.style}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Why This Message? */}
              <div
                className="rounded-xl p-3"
                style={{
                  background: `${variantInfo.bg}80`,
                  border: `1px solid ${variantInfo.accent}40`,
                }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: variantInfo.textAccent }}
                  ></div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: variantInfo.textAccent }}
                  >
                    Why This Message?
                  </span>
                </div>
                <div className="text-[11px] text-gray-700 space-y-2 leading-relaxed font-medium">
                  <p>
                    • Customer profile maps to{" "}
                    <strong>{customer.segment}</strong> with high affinity for{" "}
                    {topPainTitle}.
                  </p>
                  <p>
                    • <strong>{variantInfo.name}</strong> messaging historically
                    performs {variantInfo.lift} better for this audience.
                  </p>
                  <p>
                    • Offer dynamically inserted based on predictive acceptance
                    model (Score: {variantInfo.confidence}).
                  </p>
                </div>
              </div>
            </div>

            {/* Launch Engagement */}
            <div
              className="px-4 py-4 border-t bg-gray-50"
              style={{ borderColor: "#F3F4F6" }}
            >
              <button
                onClick={() => setApproved(!approved)}
                className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all shadow-md hover:shadow-lg hover:opacity-90 flex items-center justify-center gap-2"
                style={{
                  background: approved
                    ? "#2F855A"
                    : "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC7A5C 100%)",
                }}
              >
                {approved ? (
                  <>
                    <CheckCircle size={16} /> Engagement Scheduled
                  </>
                ) : (
                  <>
                    Launch Engagement <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
