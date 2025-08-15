"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronUp } from "react-icons/fa";
import { FiHome, FiUser, FiSettings, FiBell } from "react-icons/fi";

export default function ResponsiveMenu() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const menuItems = [
    { href: "/home", label: "Home", icon: <FiHome /> },
    // { href: "/profile", label: "Profile", icon: <FiUser /> },
    // { href: "/settings", label: "Settings", icon: <FiSettings /> },
    // { href: "/notifications", label: "Alerts", icon: <FiBell /> },
  ];

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  // Detect mobile
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsMenuVisible(false);
      } else {
        setIsMenuVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobile]);

  return (
    <>
      {isMobile ? (
        <>
          {/* Always visible toggle button */}
          <button
            onClick={toggleMenu}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors z-50"
          >
            <motion.div
              animate={{ rotate: isMenuVisible ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronUp className="text-gray-600" />
            </motion.div>
          </button>

          {/* Animated menu bar */}
          <AnimatePresence>
            {isMenuVisible && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed bottom-0 left-0 right-0 px-4 pb-4"
              >
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm bg-opacity-80 flex justify-around p-2 max-w-md mx-auto">
                  {menuItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className={`flex flex-col items-center p-2 rounded-lg transition-all ${pathname === item.href
                          ? "text-green-600 bg-green-50"
                          : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                        }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xl"
                      >
                        {item.icon}
                      </motion.div>
                      <span className="text-xs mt-1">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        // Desktop menu
        <div className="pb-16">
          <div className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-100 p-4 flex justify-center mb-32">
            <div className="flex space-x-6">
              {menuItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${pathname === item.href
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
