import React, { useState, useEffect } from 'react';
import { ChevronUp, MessageSquareMore, FileText } from 'lucide-react';
import DelayedPopup from './DelayedPopup';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false); // Controls form popup

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLiveChat = () => {
    alert('Live chat started...'); // Replace with chat logic
  };

  return (
    <>
      {isVisible && (
        <>
          {/* Store Form Button */}
          <button
            onClick={() => setShowForm(true)}
            className="fixed bottom-44 right-6 z-40 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors md:bottom-32"
            aria-label="Store Form"
          >
            <FileText className="h-6 w-6" />
          </button>

          {/* Live Chat Button */}
          <button
            onClick={openLiveChat}
            className="fixed bottom-32 right-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors md:bottom-20"
            aria-label="Live Chat"
          >
            <MessageSquareMore className="h-6 w-6" />
          </button>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-6 z-40 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors md:bottom-6"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Popup Form */}
      {showForm && (
        <DelayedPopup onClose={() => setShowForm(false)} />
      )}
    </>
  );
};

export default ScrollToTopButton;
