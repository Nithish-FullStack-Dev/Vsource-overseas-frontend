import { motion } from "framer-motion";

export function HighlightedText({ text, size, mobileSize, color }) {
  // Replace **...** with a span
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <motion.h1
      className={`text-[${mobileSize}] md:text-[${size}] leading-tight font-bold text-black max-w-2xl`}
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={i} className={`text-${color.trim()}-600 font-bold`}>
            {part.replace(/\*\*/g, "")}
          </span>
        ) : (
          part
        )
      )}
    </motion.h1>
  );
}
