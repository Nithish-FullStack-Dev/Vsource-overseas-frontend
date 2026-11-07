import React, { memo, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

interface DelayedPopupProps {
  onMinimize: () => void;
}

const DelayedPopup: React.FC<DelayedPopupProps> = ({ onMinimize }) => {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [backdropVisible, setBackdropVisible] = useState(true);
  const [showFlightAnimation, setShowFlightAnimation] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const isClosingRef = useRef(false);

  const controls = useAnimation();

  const options = ["Masters in abroad", "Education Loan Guidance"];

  // Finish closing after the flight animation completes
  const finishClose = () => {
    if (!isClosingRef.current) return;

    isClosingRef.current = false;
    setShowFlightAnimation(false);
    onMinimize();
  };

  // Close popup and launch flight animation
  const animateToIconAndClose = async () => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    setIsClosing(true);

    // Immediately remove the dark overlay
    setBackdropVisible(false);

    // Immediately restore website scrolling
    document.body.style.overflow = "";

    // Start the flight animation immediately
    setShowFlightAnimation(true);

    // Close the popup quickly
    await controls.start({
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    });
  };

  // Initial popup animation
  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    });
  }, [controls]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (isClosingRef.current) return;

      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        void animateToIconAndClose();
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  // Prevent background scrolling while popup is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading || isClosingRef.current) return;

    if (phoneNumber.length !== 10 || name.trim().length === 0) {
      toast.error("Please enter your name and a valid phone number.");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Enter a valid 10-digit phone number.");
      return;
    }

    if (!selectedOption) {
      toast.error("Please select a service required.");
      return;
    }

    setLoading(true);

    const payload = {
      data: {
        student_name: name,
        number: phoneNumber,
        service_required: selectedOption,
      },
    };

    try {
      const { status } = await axios.post(
        "https://backend.vsourceoverseas.com/api/enquires",
        payload,
      );

      if (status === 200 || status === 201) {
        toast.success("Submitted successfully!");

        // Clear form fields
        setName("");
        setPhoneNumber("");
        setSelectedOption("");

        // Launch flight animation and close popup
        void animateToIconAndClose();
      }
    } catch (error) {
      console.error("Failed to submit data", error);
      toast.error("Failed to submit data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] ${
        isClosing ? "pointer-events-none" : ""
      }`}
    >
      {/* Background overlay */}
      {backdropVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black"
        />
      )}

      {/* Centered popup form */}
      <div className="absolute inset-0 flex items-center justify-center overflow-y-auto p-4 pointer-events-none">
        <motion.div
          ref={cardRef}
          className="relative w-full max-w-md max-h-[90vh] overflow-y-auto pointer-events-auto"
          initial={{
            opacity: 0,
            scale: 0.85,
          }}
          animate={controls}
        >
          <div className="relative w-full rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-white md:p-6 p-3 text-gray-800 rounded-2xl">
              {/* Header */}
              <div className="bg-red-500 text-white md:py-6 md:px-6 md:-mx-6 md:-mt-6 mb-6 py-3 px-3 -mx-3 -mt-3 text-center relative rounded-t-2xl space-y-1">
                <h2 className="text-2xl font-bold tracking-wide">
                  STUDY MASTERS IN UK
                </h2>

                <h2 className="text-2xl font-bold tracking-wide">
                  FREE FLIGHT TICKET
                </h2>

                <p className="font-medium">TOP UNIVERSITIES • LOW PACKAGES</p>

                <p className="text-xl font-medium">
                  APPLY NOW FOR JAN 2027 INTAKE
                </p>

                {/* Close button */}
                <button
                  onClick={() => void animateToIconAndClose()}
                  disabled={isClosingRef.current}
                  className="absolute top-4 right-4 text-white hover:text-gray-100 transition duration-300 hover:rotate-180 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Student Name */}
                <input
                  type="text"
                  placeholder="Student Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
                  required
                />

                {/* Phone Number */}
                <div className="flex rounded-md overflow-hidden border border-gray-300">
                  <div className="bg-gray-100 text-gray-700 px-4 py-3 flex items-center font-medium border-r">
                    +91
                  </div>

                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    className="w-full px-4 py-3 text-gray-700 focus:outline-none"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                </div>

                {/* Service Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 flex justify-between items-center cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span>{selectedOption || "Select Service Required"}</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {options.map((option, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  disabled={loading || isClosingRef.current}
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-medium py-3 px-4 rounded-md transition duration-150 shadow-md"
                >
                  {loading ? "Submitting..." : "Request Callback"}
                </button>
              </form>

              {/* Footer */}
              <div className="bg-red-500 text-white md:-mb-6 md:-mx-6 md:p-6 md:mt-3 -mb-3 -mx-3 mt-2 p-3 text-center relative rounded-b-2xl space-y-1">
                <span className="text-xl font-medium">
                  100% LOAN ASSISTANCE FROM DIFFERENT GOVERNMENT & PRIVATE BANKS
                  FOR
                </span>

                <br />

                <span className="text-xl font-medium">
                  FULL COURSE FEES & ACCOMMODATION.
                </span>

                <br />

                <span className="text-xl font-medium">
                  COMPLETE GUIDANCE TILL VISA.
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===================================
    FLIGHT GIF ANIMATION
    Bottom Left → Top Right
==================================== */}

      {showFlightAnimation && (
        <motion.img
          key="flight-animation"
          src="/assets/images/flight.gif"
          alt="Free Flight Ticket"
          aria-hidden="true"
          draggable={false}
          initial={{
            x: "-100vw",
            y: "100vh",
            rotate: -25,
            opacity: 0,
          }}
          animate={{
            x: "100vw",
            y: "-100vh",
            rotate: -25,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            x: {
              duration: 10,
              ease: "linear",
            },
            y: {
              duration: 10,
              ease: "linear",
            },
            opacity: {
              duration: 10,
              times: [0, 0.1, 0.85, 1],
              ease: "linear",
            },
          }}
          onAnimationComplete={finishClose}
          className="
      fixed
      bottom-0
      left-0
      z-[100]
      w-[350px]
      sm:w-[450px]
      md:w-[600px]
      h-auto
      object-contain
      pointer-events-none
      select-none
    "
          style={{
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        />
      )}
    </div>
  );
};

export default memo(DelayedPopup);
