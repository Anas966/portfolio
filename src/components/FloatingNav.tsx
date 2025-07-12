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

  const itemVariants = (index: number): Variants => {
    const angle = -Math.PI / 2 + (2 * Math.PI * index) / navItems.length;
    const radius = 85;
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
        className="fixed top-8 left-1/2 -translate-x-1/2 cursor-grab"
        style={{ zIndex: 50 }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        whileTap={{ cursor: "grabbing" }}>
        <motion.div
          className="w-full h-full rounded-full shadow-2xl flex items-center justify-center relative"
          style={{
            // NEW: Richer, more complex "cosmic" gradient
            background: `linear-gradient(135deg, #4f46e5, #a855f7, #ec4899, #f59e0b)`,
            backgroundSize: "400% 400%",
            animation: "aurora 15s ease infinite",
          }}
          variants={containerVariants}
          animate={isOpen ? "open" : "closed"}
          initial="closed">
          <AnimatePresence>
            {isOpen ? (
              <div className="w-full h-full absolute flex items-center justify-center">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="absolute"
                    variants={itemVariants(index)}
                    whileHover={{ scale: 1.2, rotate: [0, -8, 8, -8, 0] }}
                    transition={{ duration: 0.4 }}>
                    <Link
                      href={item.href}
                      className="group flex flex-col items-center w-16 text-center"
                      target={
                        item.name === "GitHub" || item.name === "LinkedIn"
                          ? "_blank"
                          : "_self"
                      }
                      rel="noopener noreferrer">
                      {/* NEW: Updated hover color to a rich gold */}
                      <item.icon className="w-8 h-8 text-white/70 group-hover:text-amber-300 transition-colors" />
                      <span className="text-[10px] mt-1 text-white/70 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                key="icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}>
                <div className="relative w-10 h-10">
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full"
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
