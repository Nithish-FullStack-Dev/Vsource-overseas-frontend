import React, { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
  options?: string[];
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I’m Vsource Overseas Assistant. How can I help you today?",
      options: [
        "Tell me about eligibility for studying abroad",
        "What documents do I need for admission or visa processing?",
        "How much education loan can I avail for overseas studies?",
        "What are collateral-free education loan options?",
        "What is a moratorium period for education loans?",
      ],
    },
  ]);

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If click is outside chatbot container, close
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const flow = {
    "Tell me about eligibility for studying abroad": {
      sender: "bot",
      text: "To study abroad, you typically need a confirmed admission letter from a recognized university, meet the minimum academic and language requirements, and have a financial plan (like an education loan or sponsorship). Your age and academic record may also be considered.",
      options: [
        "What about admission requirements?",
        "Are there age limits?",
        "Go back to main menu",
      ],
    },
    "Are there age limits?": {
      sender: "bot",
      text: "Yes, some universities and countries have age restrictions. Generally, undergraduate students should be between 17 and 25, while postgraduate and PhD programs may accept students up to 35 or older depending on the course.",
      options: ["What documents are required?", "Go back to main menu"],
    },
    "What about admission requirements?": {
      sender: "bot",
      text: "Admission requirements vary by university and course. Typically, you need your academic transcripts, recommendation letters, statement of purpose, standardized test scores (like IELTS/TOEFL, GRE/GMAT), and a confirmed admission offer.",
      options: ["Tell me about documents for visa", "Go back to main menu"],
    },
    "What documents are required?": {
      sender: "bot",
      text: "For applying to universities and education loans, you generally need: application forms, academic transcripts, passport, admission letter, language test scores, co-applicant income proof for loans, and any collateral documents if applicable.",
      options: [
        "What documents does the co-applicant need?",
        "How much education loan can I get?",
        "Go back to main menu",
      ],
    },
    "What documents does the co-applicant need?": {
      sender: "bot",
      text: "The co-applicant (usually a parent or guardian) needs to provide proof of identity and address, proof of income (like salary slips or ITR for the last 2 years), and bank statements. This helps the bank or financial institution assess their ability to support your education.",
      options: ["What documents are required?", "Go back to main menu"],
    },
    "How much education loan can I get?": {
      sender: "bot",
      text: "Education loan amounts depend on the course cost, university, and co-applicant's financial profile. Collateral-free loans usually go up to ₹20-30 Lakhs, while secured loans with collateral can go up to ₹1.5-2 Crore for premier universities.",
      options: ["What affects the loan amount?", "Go back to main menu"],
    },
    "What affects the loan amount?": {
      sender: "bot",
      text: "Loan amounts are influenced by tuition fees, living expenses, collateral value, your academic record, and your co-applicant's income and credit score. Top universities or specialized courses may get higher sanctioned amounts.",
      options: ["How much education loan can I get?", "Go back to main menu"],
    },
    "Tell me about collateral-free education loans": {
      sender: "bot",
      text: "Collateral-free education loans do not require any physical asset as security. Approval is based on your academic merit, university ranking, and co-applicant’s financial profile. This is ideal if you don’t have collateral.",
      options: [
        "What is a moratorium period?",
        "How much education loan can I get?",
        "Go back to main menu",
      ],
    },
    "What is a moratorium period?": {
      sender: "bot",
      text: "A moratorium period is the time during which you don’t have to pay EMIs on your education loan. Usually, it covers your study period plus 6 to 12 months after course completion, giving you time to settle before repayment starts.",
      options: [
        "Tell me about eligibility for studying abroad",
        "Go back to main menu",
      ],
    },
    "Go back to main menu": {
      sender: "bot",
      text: "Main Menu: What would you like to know?",
      options: [
        "Tell me about eligibility for studying abroad",
        "What documents are required?",
        "How much education loan can I get?",
        "Tell me about collateral-free education loans",
        "What is a moratorium period?",
      ],
    },
  };

  const handleOptionClick = (option: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: option }]);
    const next = flow[option];
    if (next) {
      setTimeout(() => {
        setMessages((prev) => [...prev, next]);
      }, 600);
    }
  };

  return (
    <div
      ref={chatRef}
      id="chatbot-container"
      className="fixed bottom-6 right-6 w-80 h-[400px] bg-white shadow-2xl rounded-3xl flex flex-col z-50 border border-gray-100 font-sans overflow-hidden transition-all duration-300 transform"
      onMouseDown={(e) => e.stopPropagation()} // Prevent mousedown inside chatbot from bubbling and closing it early
    >
      <div className="bg-red-600 text-white p-4 rounded-t-[22px] font-semibold text-lg flex justify-between items-center shadow-md">
        Study Abroad Assistant
        <button
          onClick={onClose}
          aria-label="Close Chatbot"
          className="text-white text-3xl font-light leading-none opacity-80 hover:opacity-100 transition-all duration-300"
        >
          &times;
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            <div
              className={`p-3 rounded-xl max-w-[85%] leading-relaxed drop-shadow-sm ${
                msg.sender === "user"
                  ? "ml-auto bg-[#1F2B6E] text-white"
                  : "mr-auto bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "bot" && msg.options && (
              <div className="mt-3 flex flex-col space-y-2">
                {msg.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    className="text-sm font-medium bg-white text-[#1F2B6E] px-4 py-2 rounded-xl border border-[#1F2B6E] drop-shadow-sm hover:bg-[#1F2B6E] hover:text-white transition-colors duration-200 ease-in-out"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
