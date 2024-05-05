import { useEffect } from "react"

const Chatbox = () => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://app.tudongchat.com/js/chatbox.js"
    script.async = true
    script.onload = () => {
      const tudong_chatbox = new TuDongChat("_rMfCSO3T4O0UJTZ92yYv")
      tudong_chatbox.initial()
    }
    document.body.appendChild(script)

    return () => {
      // Cleanup code if needed
      document.body.removeChild(script)
    }
  }, [])

  return <div>{/* Chatbox HTML content */}</div>
}
