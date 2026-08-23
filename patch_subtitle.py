import re

with open("src/pages/ContentStudio.tsx", "r") as f:
    content = f.read()

subtitle_logic = """  const topPainTitle = topPain?.title ?? "Engagement"

  const getSubtitle = (channelKey: string) => {
    switch (channelKey) {
      case "whatsapp": return "Deliver a personalized 1:1 rich message."
      case "story": return "Deliver a full-screen sponsored story ad."
      case "feed": return "Deliver an engaging social feed post."
      case "paid": return "Deliver a targeted sponsored ad."
      case "push": return "Deliver a high-visibility push notification."
      case "sms": return "Deliver a direct text message alert."
      default: return ""
    }
  }

  const channelMeta = CHANNELS.find((c) => c.key === selectedChannel)!"""

content = content.replace('  const channelMeta = CHANNELS.find((c) => c.key === selectedChannel)!', subtitle_logic)

content = content.replace('Deliver a full-screen sponsored story ad.', '{getSubtitle(selectedChannel)}')

with open("src/pages/ContentStudio.tsx", "w") as f:
    f.write(content)
