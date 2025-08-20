"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaSignOutAlt } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import {
  FiUsers,
  FiTrendingUp,
  FiBookOpen,
  FiBell,
  FiUser,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth";

export default function ResponsiveMenu() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);

  const menuItems = [
    { href: "/team", label: "Team", icon: <FiUsers /> },
    { href: "/invest", label: "Invest", icon: <FiTrendingUp /> },
    { href: "/blog", label: "Blog", icon: <FiBookOpen /> },
    { href: "/home", label: "Home", icon: <FiHome /> },
    { href: "/notice", label: "Notice", icon: <FiBell /> },
    { href: "/account", label: "Account", icon: <FiUser /> },
  ];

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear auth tokens or session storage
    localStorage.removeItem("authUser");
    dispatch(logout())
    router.push("/");
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
                className="fixed bottom-0 left-0 right-0 px-2 pb-4"
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
                <button
                  onClick={() => setShowLogout((prev) => !prev)}
                  className="fixed top-1/2 right-0 -translate-y-1/2 bg-white shadow-md  rounded-l-full p-2 z-50 hover:bg-gray-100"
                >
                  {showLogout ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
                {showLogout && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 100, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="fixed top-1/2 right-0 -translate-y-1/2 bg-white w-24 shadow-lg  flex justify-center items-center rounded-l-xl z-40"
                    >
                      <button
                        onClick={handleLogout}
                        className="flex flex-col items-center p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xl"
                        >
                          <FaSignOutAlt size={18} />
                        </motion.div>
                        <span className="text-xs mt-1">Logout</span>
                      </button>
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        // Desktop menu
        <div className="pb-16">
          <div className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-100 p-4 flex justify-between items-center">

            {/* Left: Menu Items */}
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

            {/* Right: Logout Button */}
            <div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>

          </div>
        </div>

      )}

      <motion.button
        // onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }} // bounce up & down
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className={`fixed bottom-30 right-3 text-white p-4 rounded-full focus:outline-none
          bg-blue-600
          ${isMobile
            ? 'shadow-[0_4px_24px_0_rgba(59,130,246,0.25)] hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.35)]'
            : 'shadow-[0_8px_32px_0_rgba(59,130,246,0.18)] hover:shadow-[0_12px_40px_0_rgba(59,130,246,0.22)]'}
          hover:bg-blue-700`}
      >
        <FiUser size={isMobile ? 20 : 30} />
      </motion.button>
    </>
  );
}
