// src/components/ScrollToTopButton.tsx
import React, { useEffect, useState } from "react";
import { ChevronUp, FileText } from "lucide-react";

interface Props {
  showFormIcon?: boolean;
  onFormIconClick?: () => void;
  extraRightPx?: number;
}

const ScrollToTopButton: React.FC<Props> = ({
  showFormIcon = true,
  onFormIconClick,
  extraRightPx = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.pageYOffset > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const baseRight = 20 + (extraRightPx || 0);

  return (
    <>
      {isVisible && (
        <>
          {showFormIcon && (
            <button
              onClick={() => {
                onFormIconClick?.();
                if (typeof window.VsourceOpenChat === "function") {
                  window.VsourceOpenChat();
                } else {
                  window.dispatchEvent(new Event("vsource-open-chat"));
                }
              }}
              aria-label="Open Form / Chat"
              className="sonar-button fixed z-50 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center"
              style={{ right: `${baseRight}px`, bottom: 176 }}
            >
              <FileText className="h-6 w-6" />
            </button>
          )}

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed z-50 p-2 rounded-full shadow-lg transition-colors"
            style={{
              right: `${baseRight}px`,
              bottom: 92,
              background: "#ef4444",
              color: "#fff",
            }}
          >
            <ChevronUp className="h-6 w-6" />
          </button>
        </>
      )}

      <style>{`
        .sonar-button { overflow: visible; position: fixed; }
        .sonar-button::after{
          content: ""; position:absolute; top:50%; left:50%; width:100%; height:100%; border-radius:50%;
          transform:translate(-50%,-50%) scale(0.9); opacity:0; animation: sonarEffect 1.5s ease-out infinite;
        }
        @keyframes sonarEffect {
          0% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; box-shadow: 0 0 0 2px rgba(255,255,255,0.5), 0 0 10px 10px rgba(239,68,68,0.6); }
          100% { transform: translate(-50%,-50%) scale(2); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default ScrollToTopButton;
