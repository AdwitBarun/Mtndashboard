import re

with open("src/pages/ContentStudio.tsx", "r") as f:
    content = f.read()

# Replace generateContent
new_generate_content = """function generateContent(
  language: string,
  variant: string,
  customer: Customer,
  offerName: string,
) {
  const firstName = customer.name.split(" ")[0]
  const price = 599 // Fixed price for the Dubai offer as requested
  const offerTitle = "Smart Roaming Pack"
  const offerDetails = "10GB / 100 Min / Unltd, Valid 7 Days"
  const shortDetails = "10 GB / 7 Days"

  if (language === "Hindi") {
      return {
        greeting: `नमस्ते ${firstName} 👋`,
        bodyPara1: `दुबई की यात्रा कर रहे हैं? मात्र ₹599 में 7 दिनों के लिए 10GB डेटा पाएं...`,
        bodyPara2: `बिना किसी चिंता के दुबई में घूमें। नियम व शर्तें लागू।`,
        cta: `अभी सक्रिय करें`,
        price: price,
        headline: offerTitle,
        details: offerDetails,
        shortDetails: shortDetails,
        subject: `दुबई यात्रा पैक`,
        adHeadline: `आपकी दुबई यात्रा, हमारा नेटवर्क`,
        swipeText: `खोलने के लिए ऊपर स्वाइप करें`,
        date: `शुक्रवार, 3 मई`
      }
  }

  if (language === "Marathi") {
      return {
        greeting: `नमस्कार ${firstName} 👋`,
        bodyPara1: `दुबईला प्रवास करत आहात? फक्त ₹599 मध्ये 7 दिवसांसाठी 10GB मिळवा...`,
        bodyPara2: `दुबईत बिनधास्त प्रवास करा. अटी लागू.`,
        cta: `आता सक्रिय करा`,
        price: price,
        headline: offerTitle,
        details: offerDetails,
        shortDetails: shortDetails,
        subject: `दुबई ट्रॅव्हल पॅक`,
        adHeadline: `तुमची दुबई ट्रिप, आमचे नेटवर्क`,
        swipeText: `उघडण्यासाठी वर स्वाइप करा`,
        date: `शुक्रवार, 3 मे`
      }
  }

  if (language === "Tamil") {
      return {
        greeting: `வணக்கம் ${firstName} 👋`,
        bodyPara1: `துபாய் பயணம் செய்கிறீர்களா? வெறும் ₹599-க்கு 7 நாட்களுக்கு 10GB பெறுங்கள்...`,
        bodyPara2: `துபாயில் கவலையின்றி பயணம் செய்யுங்கள். நிபந்தனைகள் பொருந்தும்.`,
        cta: `இப்போதே செயல்படுத்துக`,
        price: price,
        headline: offerTitle,
        details: offerDetails,
        shortDetails: shortDetails,
        subject: `துபாய் பயணத் தொகுப்பு`,
        adHeadline: `உங்கள் துபாய் பயணம், எங்கள் இணைப்பு`,
        swipeText: `திறக்க மேலே ஸ்வைப் செய்யவும்`,
        date: `வெள்ளிக்கிழமை, 3 மே`
      }
  }

  if (language === "Telugu") {
      return {
        greeting: `నమస్కారం ${firstName} 👋`,
        bodyPara1: `దుబాయ్ ప్రయాణిస్తున్నారా? కేవలం ₹599 తో 7 రోజులకు 10GB పొందండి...`,
        bodyPara2: `దుబాయ్‌లో ఆందోళన లేకుండా ప్రయాణించండి. షరతులు వర్తిస్తాయి.`,
        cta: `ఇప్పుడే యాక్టివేట్ చేయండి`,
        price: price,
        headline: offerTitle,
        details: offerDetails,
        shortDetails: shortDetails,
        subject: `దుబాయ్ ట్రావెల్ ప్యాక్`,
        adHeadline: `మీ దుబాయ్ ట్రిప్, మా కనెక్షన్`,
        swipeText: `తెరవడానికి పైకి స్వైప్ చేయండి`,
        date: `శుక్రవారం, 3 మే`
      }
  }

  // Default English
  return {
    greeting: `Hi ${firstName} 👋`,
    bodyPara1: `Heading to Dubai? Get 10GB for 7 Days at ₹599...`,
    bodyPara2: `Travel worry-free in Dubai. T&C apply.`,
    cta: `Activate now`,
    price: price,
    headline: offerTitle,
    details: offerDetails,
    shortDetails: shortDetails,
    subject: `Dubai Travel Pack`,
    adHeadline: `Your Dubai trip, our connection`,
    swipeText: `Swipe up to open`,
    date: `Friday, 3 May`
  }
}"""

content = re.sub(r'function generateContent\([\s\S]*?// ── Channel preview components', new_generate_content + '\n\n// ── Channel preview components', content)

with open("src/pages/ContentStudio.tsx", "w") as f:
    f.write(content)
