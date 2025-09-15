// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
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
import { useRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";

import "aos/dist/aos.css";

import UniversityHomePage from "./pages/university-pages/UniversityHomePage";
import GoVirtual from "./services/GoVirtual";
import UniversityDetails from "./pages/university-pages/UniversityDetails";
import { AuthProvider } from "./components/config/AuthContext";
import ClientLayout from "./ClientLayout";
import ScrollToTop from "./ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />

          <main className="flex-grow">
            <Routes>
              {/* Client */}
              <Route element={<ClientLayout />}>
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
              </Route>

              <Route path="/meeting" element={<GoVirtual />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
