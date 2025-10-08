// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-loading-skeleton/dist/skeleton.css";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import StudyUKPage from "./pages/StudyUKPage";
import StudyUSA from "./pages/StudyUSA";
import StudyCanada from "./pages/StudyCanada";
import StudyIreland from "./pages/StudyIreland";
import StudyFrance from "./pages/StudyFrance";
import GalleryPage from "./pages/GalleryPage";
import JoinUsPage from "./pages/JoinUsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import UniversityHomePage from "./pages/university-pages/UniversityHomePage";
import UniversityDetails from "./pages/university-pages/UniversityDetails";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactBar from "@/components/ContactBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import DelayedPopup from "@/components/DelayedPopup";
import ScrollToTop from "./ScrollToTop";
import GoVirtual from "./services/GoVirtual";
import { AuthProvider } from "./components/config/AuthContext";

// <<== ADD THIS IMPORT (make sure path is correct for your repo)
import ChatBot from "@/services/ChatBot"; // if alias doesn't resolve, use "../services/ChatBot" or "./services/ChatBot" per your folder

const queryClient = new QueryClient();

const App = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // State for DelayedPopup and ScrollToTopButton
  const [showForm, setShowForm] = useState(false);
  const [showFormIcon, setShowFormIcon] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ once: false, mirror: true });
  }, []);

  // Refresh AOS on route change
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  // Show form after scrolling past 20% of the page
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

  const isGoVirtualPage = location.pathname === "/meeting";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />

          <div className="flex flex-col min-h-screen">
            {!isGoVirtualPage && <Navbar />}
            <main className="flex-grow">
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            {!isGoVirtualPage && <ContactBar />}
            {!isGoVirtualPage && <Footer />}
          </div>

          {/* ------------------ MOUNT CHAT BOT SERVICE HERE (once at root) ------------------ */}
          {/* Replace TOKEN_HERE with your real token */}
          <ChatBot token="YOUR_GALLABOX_TOKEN_HERE" openOnLoad={false} />

          {/* Floating buttons */}
          <ScrollToTopButton
            showFormIcon={showFormIcon}
            onFormIconClick={() => {
              setShowForm(true);
              setShowFormIcon(false);
            }}
          />

          {showForm && (
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
