// src/services/ChatBot.tsx
import React, { useEffect } from "react";

interface ChatBotProps {
  token: string; // Gallabox token
  openOnLoad?: boolean; // optional, if true, opens the chat automatically
}

declare global {
  interface Window {
    Chatty?: any;
    VsourceOpenChat?: () => void;
    VsourceCloseChat?: () => void;
  }
}

const ChatBot: React.FC<ChatBotProps> = ({ token, openOnLoad = false }) => {
  useEffect(() => {
    const loadChatWidget = () => {
      // Don't inject twice
      if (!document.getElementById("gallabox-chatty")) {
        const script = document.createElement("script");
        script.id = "gallabox-chatty";
        script.async = true;
        script.src =
          "https://widget.gallabox.com/chatty-widget.min.js?_=" + Math.random();
        script.onload = () => {
          console.log("Gallabox Chatty loaded.");
          if (window.Chatty && openOnLoad) {
            window.Chatty({ open: true });
          }
        };
        document.body.appendChild(script);
      } else {
        // If script already loaded, open immediately if requested
        if (window.Chatty && openOnLoad) {
          window.Chatty({ open: true });
        }
      }

      // Initialize Chatty queue
      if (!window.Chatty) {
        window.Chatty = function (c: any) {
          (window.Chatty._ = window.Chatty._ || []).push(c);
        };
        window.Chatty._ = window.Chatty._ || [];
      }

      window.Chatty.url = "https://widget.gallabox.com";
      window.Chatty.hash = token;

      // Expose global open/close functions
      window.VsourceOpenChat = () => {
        if (window.Chatty) window.Chatty({ open: true });
      };
      window.VsourceCloseChat = () => {
        if (window.Chatty) window.Chatty({ open: false });
      };
    };

    loadChatWidget();
  }, [token, openOnLoad]);

  return null; // This component doesn't render any JSX
};

export default ChatBot;
