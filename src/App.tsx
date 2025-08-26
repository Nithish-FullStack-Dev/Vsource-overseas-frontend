// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import DelayedPopup from "./components/DelayedPopup";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ContactBar from "./components/ContactBar";
import { useEffect, useRef, useState } from "react";
import FaqSection from "./components/home/FaqSection";
import AOS from "aos";
import "aos/dist/aos.css";

import UniversityHomePage from "./pages/university-pages/UniversityHomePage";
import GoVirtual from "./services/GoVirtual";
import UniversityDetails from "./pages/university-pages/UniversityDetails";

const queryClient = new QueryClient();

const App = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [showFormIcon, setShowFormIcon] = useState(false);

  // Init AOS
  useEffect(() => {
    AOS.init({ once: false, mirror: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  // Show form after scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (
        scrollTop / docHeight >= 0.2 &&
        !localStorage.getItem("vsource_form_submitted")
      ) {
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
        <Toaster />
        <Sonner />
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

              {/* University pages */}
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
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
