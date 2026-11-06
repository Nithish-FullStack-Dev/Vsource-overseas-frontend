import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "aos/dist/aos.css";
import AOS from "aos";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactBar from "@/components/ContactBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import DelayedPopup from "@/components/DelayedPopup";
import ScrollToTop from "./ScrollToTop";
import AppSkeleton from "./AppSkeleton";
import PrivacyPolicy from "./components/ireland/PrivacyPolicy";
import TermsAndConditions from "./components/ireland/TermsAndConditions";
import ChatBot from "./services/ChatBot";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import LazyRender from "./utils/LazyRender";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const StudyUKPage = lazy(() => import("./pages/StudyUKPage"));
const StudyUSA = lazy(() => import("./pages/StudyUSA"));
const StudyCanada = lazy(() => import("./pages/StudyCanada"));
const StudyIreland = lazy(() => import("./pages/StudyIreland"));
const StudyFrance = lazy(() => import("./pages/StudyFrance"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const JoinUsPage = lazy(() => import("./pages/JoinUsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

const View360 = lazy(() => import("./components/View360"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UniversityHomePage = lazy(
  () => import("./pages/university-pages/UniversityHomePage"),
);
const UniversityDetails = lazy(
  () => import("./pages/university-pages/UniversityDetails"),
);
const MaintenancePage = lazy(() => import("./pages/MaintenancePage"));
// const ChatBot = lazy(() => import("@/services/ChatBot"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      retry: false,
    },
  },
});

const FloatingContactButtons = () => {
  const whatsappNumber = "919121711119";
  const phoneNumber = "+919121711119";

  return (
    <div className="fixed right-4 bottom-24 md:right-6 md:bottom-32 z-[9999] flex flex-col gap-6">
      {/* Call Now */}
      <a
        href={`tel:${phoneNumber}`}
        aria-label="Call Now"
        className="group flex items-center gap-3 justify-end"
      >
        <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-2 rounded-lg shadow-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Call Now
        </span>

        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#5ac1ff] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          <Phone className="text-white w-5 h-5 md:w-6 md:h-6" />
        </div>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-3 justify-end"
      >
        <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-2 rounded-lg shadow-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          WhatsApp
        </span>

        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          <FaWhatsapp className="text-white w-6 h-6 md:w-7 md:h-7" />
        </div>
      </a>
    </div>
  );
};

const App = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [showFormIcon, setShowFormIcon] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
      mirror: false,
      easing: "ease-out",
      offset: 50,
    });
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [location.pathname]);

  // SHOW POPUP AFTER 3 SECONDS
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const hideLayoutPages = ["/maintenance"];
  const shouldHideLayout = hideLayoutPages.includes(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />

        <div className="flex flex-col min-h-screen">
          {!shouldHideLayout && <Navbar />}

          <main className="flex-grow">
            <Suspense fallback={<AppSkeleton />}>
              <Routes>
                {/* <Route path="/" element={<MaintenancePage />} /> */}

                <Route path="/" element={<HomePage faqRef={faqRef} />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/study-in-uk" element={<StudyUKPage />} />
                <Route path="/study-in-usa" element={<StudyUSA />} />
                <Route path="/study-in-canada" element={<StudyCanada />} />
                <Route path="/study-in-ireland" element={<StudyIreland />} />
                <Route path="/study-in-france" element={<StudyFrance />} />

                <Route
                  path="/explore-universities"
                  element={<UniversityHomePage />}
                />
                <Route
                  path="/explore-universities/:country"
                  element={<UniversityHomePage />}
                />
                <Route
                  path="/explore-universities/:country/:slug/:documentId"
                  element={<UniversityDetails />}
                />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/join-us" element={<JoinUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/maintenance" element={<MaintenancePage />} />
                <Route path="/view-360" element={<View360 />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          {/* {!shouldHideLayout && <ContactBar />}  */}
          {!shouldHideLayout && (
            <LazyRender minHeight="80vh">
              <Footer />
            </LazyRender>
          )}
        </div>
        {/* 
        <Suspense fallback={null}>
          {!shouldHideLayout && (
            <ChatBot
              token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0Ijoid3d3LnZzb3VyY2VvdmVyc2Vhcy5jb20iLCJpZCI6IjY3NmZlMzQ3Yzk3NTFkMmFhNWNkZTQ5NyIsImFjY0lkIjoiNjZiZjVjNjUzNTIzZmIxNjhjYzBkZTFlIiwiaWF0IjoxNzU4ODAzNjQ0fQ.8q-5u03q7aBSWYp_PcMzZIMZgPxtfc2eH76oWzlx7rU"
              mobileNudge={80}
              desktopNudge={20}
            />
          )}
        </Suspense> */}

        {/* Floating Buttons */}
        {/* Floating Call & WhatsApp Buttons */}
        {!shouldHideLayout && <FloatingContactButtons />}
        {/* {!shouldHideLayout && (
          <ScrollToTopButton
            showFormIcon={showFormIcon}
            chatbotNudge={120}
            onFormIconClick={() => {
              setShowForm(true);
              setShowFormIcon(false);
            }}
          />
        )} */}

        {!shouldHideLayout && showForm && (
          <DelayedPopup
            onMinimize={() => {
              setShowForm(false);
              setShowFormIcon(true);
            }}
          />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
