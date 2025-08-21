import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
// import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ContactBar from "./components/ContactBar";
import { useEffect, useRef, useState } from "react";
import FaqSection from "./components/home/FaqSection";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import UniversityHomePage from "./pages/university-pages/UniversityHomePage";
const queryClient = new QueryClient();


const App = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage faqRef={faqRef} />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/study-in-uk" element={<StudyUKPage />} />
              <Route path="/study-in-usa" element={<StudyUSA />} />
              <Route path="/study-in-canada" element={<StudyCanada />} />
              <Route path="/study-in-ireland" element={<StudyIreland />} />
              <Route path="/study-in-france" element={<StudyFrance />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/join-us" element={<JoinUsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/university-find" element={<UniversityHomePage />} />
            </Routes>
          </main>
          <ContactBar />
          <Footer />
          {showForm && (
            <DelayedPopup onClose={() => setShowForm(false)} />
          )}
          {/* <WhatsAppButton /> */}
          <ScrollToTopButton />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
