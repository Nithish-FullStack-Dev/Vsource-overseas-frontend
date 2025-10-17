import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useEffect, useRef, useState, lazy } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-loading-skeleton/dist/skeleton.css";

// Static imports
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactBar from "@/components/ContactBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import DelayedPopup from "@/components/DelayedPopup";
import ScrollToTop from "./ScrollToTop";
import GoVirtual from "./services/GoVirtual";
import { AuthProvider } from "./components/config/AuthContext";
import HeroSkeleton from "./Loaders/LandingPages/HeroSkeleton";

// <<== ADD THIS IMPORT (make sure path is correct for your repo)
import ChatBot from "@/services/ChatBot"; // if alias doesn't resolve, use "../services/ChatBot" or "./services/ChatBot" per your folder
import View360 from "./components/View360";

const queryClient = new QueryClient();

//Lazy-load
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
const NotFound = lazy(() => import("./pages/NotFound"));

const UniversityHomePage = lazy(
  () => import("./pages/university-pages/UniversityHomePage")
);
const UniversityDetails = lazy(
  () => import("./pages/university-pages/UniversityDetails")
);
const MaintenancePage = lazy(() => import("./pages/MaintenancePage"));

const App = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [showForm, setShowForm] = useState(false);
  const [showFormIcon, setShowFormIcon] = useState(false);

  // AOS setup
  useEffect(() => {
    AOS.init({ once: false, mirror: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  // Popup logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollTop / docHeight >= 0.2) {
        setShowForm(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide Navbar/Footer/ContactBar on these pages
  const hideLayoutPages = ["/meeting", "/maintenance", "/view-360"];
  const shouldHideLayout = hideLayoutPages.includes(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />

          <div className="flex flex-col min-h-screen">
            {!shouldHideLayout && <Navbar />}
            <main className="flex-grow">
              <Suspense fallback={<HeroSkeleton />}>
                <Routes>
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
                    path="/explore-universities/:country/:slug"
                    element={<UniversityDetails />}
                  />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/join-us" element={<JoinUsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/meeting" element={<GoVirtual />} />
                  <Route path="/maintenance" element={<MaintenancePage />} />
                  <Route path="/view-360" element={<View360 />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            {!shouldHideLayout && <Navbar />}
            {!shouldHideLayout && <ContactBar />}
            {!shouldHideLayout && <Footer />}
          </div>

          {/* ------------------ MOUNT CHAT BOT SERVICE HERE (once at root) ------------------ */}
          {/* Replace TOKEN_HERE with your real token */}
          <ChatBot token="YOUR_GALLABOX_TOKEN_HERE" openOnLoad={false} />

          {/* Floating buttons */}
          {!shouldHideLayout && (
            <ScrollToTopButton
              showFormIcon={showFormIcon}
              onFormIconClick={() => {
                setShowForm(true);
                setShowFormIcon(false);
              }}
            />
          )}

          {!shouldHideLayout && showForm && (
            <DelayedPopup
              onMinimize={() => {
                setShowForm(false);
                setShowFormIcon(true);
              }}
            />
          )}
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
