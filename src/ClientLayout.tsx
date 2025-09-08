import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactBar from "@/components/ContactBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import DelayedPopup from "@/components/DelayedPopup";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";

const ClientLayout = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFormIcon, setShowFormIcon] = useState(false);
  const location = useLocation();

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
    <div className="flex flex-col min-h-screen">
      {!isGoVirtualPage && <Navbar />}
      <main className="flex-grow">
        <Outlet />
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
  );
};

export default ClientLayout;
