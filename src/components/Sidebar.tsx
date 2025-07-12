// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiHome, HiUser, HiViewColumns, HiEnvelope } from "react-icons/hi2";

const navLinks = [
  { name: "Home", href: "/", icon: HiHome },
  { name: "About", href: "/about", icon: HiUser },
  { name: "Projects", href: "/projects", icon: HiViewColumns },
  { name: "Contact", href: "/contact", icon: HiEnvelope },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col p-8 border-r border-gray-800">
      {/* Logo/Name Section */}
      <div className="mb-12">
        <Link href="/" className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Anas
          </span>
          <span className="text-gray-400">Allahim</span>
        </Link>
        <p className="text-sm text-gray-500 mt-1">Software Developer</p>
      </div>

      {/* Navigation Section */}
      <nav className="flex-grow">
        <ul>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className="mb-4">
                <Link
                  href={link.href}
                  className={`flex items-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-300"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}>
                  <link.icon className="w-5 h-5 mr-3" />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Social Links Section */}
      <div className="flex justify-center space-x-4">
        <motion.a
          href="https://github.com/Anas966"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}>
          <FaGithub className="w-6 h-6 text-gray-500 hover:text-white" />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/anas-allahim"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}>
          <FaLinkedin className="w-6 h-6 text-gray-500 hover:text-white" />
        </motion.a>
      </div>
    </aside>
  );
};

export default Sidebar;
