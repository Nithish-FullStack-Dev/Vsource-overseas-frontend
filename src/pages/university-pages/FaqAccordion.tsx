import React, { useState, useRef, useEffect } from "react";

interface FaqItem {
  id?: number;
  accordion: Array<{
    id?: number;
    question: string;
    answer: string;
  }>;
}

interface FaqAccordionProps {
  items: FaqItem;
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const MinusIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="red"
      className="w-4 h-4"
    >
      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
    </svg>
  );

  const PlusIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="red"
      className="w-4 h-4"
    >
      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </svg>
  );

  return (
    <div className=" p-6  w-full font-sans">
      <div className="space-y-4">
        {items?.accordion &&
          items?.accordion?.map((item, index) => {
            const isOpen = openIndex === index;
            const contentRef = useRef<HTMLDivElement>(null);

            useEffect(() => {
              if (contentRef.current) {
                if (isOpen) {
                  contentRef.current.style.maxHeight =
                    contentRef.current.scrollHeight + "px";
                } else {
                  contentRef.current.style.maxHeight = "0px";
                }
              }
            }, [isOpen]);

            return (
              <div key={item?.id || index} className="border-b border-gray-200">
                <button
                  className="w-full flex justify-between items-center py-5 text-red-600 focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium text-gray-700 text-start">
                    {item.question}
                  </span>
                  <span className="text-gray-500">
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                  </span>
                </button>
                <div
                  ref={contentRef}
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: "0px" }}
                >
                  <div className="pb-5 text-sm text-slate-500">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FaqAccordion;
