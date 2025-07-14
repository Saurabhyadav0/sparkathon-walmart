// "use client";

// export default function Footer() {
//   return (
//     <footer className="relative z-10 text-center text-sm text-gray-500 dark:text-gray-400 py-6">
//         Made with ❤️ by team Sparkers  © 2025 Smart Waste Tracker — Empowering a Cleaner Future ♻️
//     </footer>
//   );
// }




"use client";
import { useEffect, useState } from "react";

export default function Footer() {
   const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
   
    <footer className="bg-black text-gray-300 text-center py-6 relative">
      <p> Made with ❤️ by team Sparkers</p>
      <p>  © 2025 Smart Waste Tracker — Empowering a Cleaner Future ♻️</p>

      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-400 text-white hover:bg-blue-700 shadow-lg transition"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
}
