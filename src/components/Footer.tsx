// src/components/Footer.tsx
"use client";

// We no longer import 'Link' because it's not used
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          © {currentYear} Anas Allahim. All Rights Reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <motion.a
            href="https://github.com/Anas966"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}>
            <FaGithub className="w-6 h-6 text-gray-400 hover:text-cyan-400 transition-colors" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/anas-allahim"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            whileHover={{ scale: 1.2, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}>
            <FaLinkedin className="w-6 h-6 text-gray-400 hover:text-blue-500 transition-colors" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
