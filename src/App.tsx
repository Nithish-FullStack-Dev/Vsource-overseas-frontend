import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
import ChatBot from "@/services/ChatBot";

// Page imports (no lazy load)
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
import View360 from "./components/View360";
import NotFound from "./pages/NotFound";
import UniversityHomePage from "./pages/university-pages/UniversityHomePage";
import UniversityDetails from "./pages/university-pages/UniversityDetails";
import MaintenancePage from "./pages/MaintenancePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      retry: false,
    },
  },
});

const App = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [showForm, setShowForm] = useState(false);
  const [showFormIcon, setShowFormIcon] = useState(false);

  // AOS setup
  useEffect(() => {
    AOS.init({ once: true, mirror: false, duration: 600 });
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

  const hideLayoutPages = ["/meeting", "/maintenance"];
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
              {/* Direct routes (no Suspense) */}
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
                  path="/explore-universities/:country/:slug/:documentId"
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
            </main>

            {!shouldHideLayout && <Navbar />}
            {!shouldHideLayout && <ContactBar />}
            {!shouldHideLayout && <Footer />}
          </div>

          {/* Chat Bot Service */}
          <ChatBot
            token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0Ijoid3d3LnZzb3VyY2VvdmVyc2Vhcy5jb20iLCJpZCI6IjY3NmZlMzQ3Yzk3NTFkMmFhNWNkZTQ5NyIsImFjY0lkIjoiNjZiZjVjNjUzNTIzZmIxNjhjYzBkZTFlIiwiaWF0IjoxNzU4ODAzNjQ0fQ.8q-5u03q7aBSWYp_PcMzZIMZgPxtfc2eH76oWzlx7rU"
            mobileNudge={48}
          />

          {/* Floating buttons */}
          {!shouldHideLayout && (
            <ScrollToTopButton
              showFormIcon={showFormIcon}
              chatbotNudge={120}
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
