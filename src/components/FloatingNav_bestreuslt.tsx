// src/components/FloatingNav.tsx
"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { HiHome, HiUser, HiViewColumns, HiEnvelope } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

// --- Configuration ---
const navItems = [
  { name: "Home", href: "/", icon: HiHome },
  { name: "About", href: "/about", icon: HiUser },
  { name: "Projects", href: "/projects", icon: HiViewColumns },
  { name: "Contact", href: "/contact", icon: HiEnvelope },
  { name: "GitHub", href: "https://github.com/Anas966", icon: FaGithub },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/anas-allahim",
    icon: FaLinkedin,
  },
];

const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const constraintsRef = useRef(null);

  // --- Animation Variants ---
  const containerVariants: Variants = {
    open: {
      width: 240,
      height: 240,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        staggerChildren: 0.04,
      },
    },
    closed: {
      width: 72,
      height: 72,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
  };

  // This function calculates positions for a full 360-degree circle layout
  const itemVariants = (index: number): Variants => {
    // Distribute items evenly in a circle. Start from the top (-PI/2).
    const angle = -Math.PI / 2 + (2 * Math.PI * index) / navItems.length;
    const radius = 85; // The radius of the circle
    return {
      open: {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 400, damping: 15 },
      },
      closed: {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0,
        transition: { duration: 0.15 },
      },
    };
  };

  return (
    <>
      <motion.div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none"
      />

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
        // Starts at the top-center of the page
        className="fixed top-8 left-1/2 -translate-x-1/2 cursor-grab"
        style={{ zIndex: 50 }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        whileTap={{ cursor: "grabbing" }}>
        <motion.div
          className="w-full h-full rounded-full shadow-2xl flex items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, #6366f1, #06b6d4, #3b82f6, #8b5cf6)`,
            backgroundSize: "400% 400%",
            animation: "aurora 15s ease infinite",
          }}
          variants={containerVariants}
          animate={isOpen ? "open" : "closed"}
          initial="closed">
          <AnimatePresence>
            {isOpen ? (
              // --- EXPANDED RADIAL MENU ---
              <div className="w-full h-full absolute flex items-center justify-center">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="absolute"
                    variants={itemVariants(index)}>
                    <Link
                      href={item.href}
                      className="flex flex-col items-center text-white hover:text-cyan-200 transition-colors w-16 text-center"
                      target={
                        item.name === "GitHub" || item.name === "LinkedIn"
                          ? "_blank"
                          : "_self"
                      }
                      rel="noopener noreferrer">
                      <item.icon className="w-7 h-7" />
                      <span className="text-[10px] mt-1 whitespace-nowrap">
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              // --- COLLAPSED ICON with PULSE ---
              <motion.div
                key="icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}>
                <div className="relative w-10 h-10">
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full"
                    // Pulsing animation to signal interactivity
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FloatingNav;
