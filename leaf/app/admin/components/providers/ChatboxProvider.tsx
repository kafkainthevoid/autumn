"use client"

import Script from "next/script"
import * as React from "react"

export function ChatboxProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Script
        id="tudong-chatbox"
        strategy="afterInteractive" // Ensures script loads after initial render
        src="https://app.tudongchat.com/js/chatbox.js"
        onLoad={() => {
          // @ts-ignore
          let tudong_chatbox = new TuDongChat("_rMfCSO3T4O0UJTZ92yYv")
          tudong_chatbox.initial()
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `tudong_chatbox = new TuDongChat('_rMfCSO3T4O0UJTZ92yYv'); tudong_chatbox.initial();`,
        }}
      />
    </div>
  )
}
