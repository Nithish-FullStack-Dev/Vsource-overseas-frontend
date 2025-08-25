import React, { useState, useEffect } from "react";
import { ChevronUp, MessageSquareMore, FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChatBot from "@/services/ChatBot";

interface Props {
  showFormIcon: boolean;
  onFormIconClick: () => void;
}

const ScrollToTopButton: React.FC<Props> = ({
  showFormIcon,
  onFormIconClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); // ✅ chatbot toggle

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {isVisible && (
        <>
          {showFormIcon && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onFormIconClick}
                  className="fixed bottom-44 right-6 z-40 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors md:bottom-32 mb-3"
                  aria-label="Open Form"
                >
                  <FileText className="h-6 w-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Request form</TooltipContent>
            </Tooltip>
          )}

          {/* Live Chat Button */}
          <button
            onClick={() => setChatOpen((prev) => !prev)}
            className="fixed bottom-32 right-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors md:bottom-20"
            aria-label="Live Chat"
          >
            <MessageSquareMore className="h-6 w-6" />
          </button>

          {/* ChatBot Widget */}
          {chatOpen && (
            <div id="chatbot-container">
              <ChatBot />
            </div>
          )}

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-6 z-40 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors md:bottom-6"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
        </>
      )}
    </>
  );
};

export default ScrollToTopButton;
