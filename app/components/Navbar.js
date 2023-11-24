"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaHome,
  FaInfoCircle,
  FaUniversity,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link href="/">
            <div className="flex flex-row justify-center items-center gap-3">
              <Image src="/logo1.svg" width={50} height={50} />
              <div>
                <span className="text-yellow-500">Zr</span>Chain
              </div>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex space-x-4">
          <div className="flex flex-row items-center justify-center gap-6">
            <NavItem icon={<FaHome />} text="Home" path="/" />

            <NavItem icon={<FaInfoCircle />} text="About" path="/about" />

            <NavItem icon={<FaEnvelope />} text="Contact" path="/contact" />

            <NavItem
              icon={<FaUniversity />}
              text="Registration"
              path="/register"
            />
            <NavItem icon={<FaSearch />} text="Explore" path="/explore" />
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            <FaBars className="text-3xl" />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && <MobileMenu onClose={toggleNavbar} />}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, text, path }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center cursor-pointer hover:text-yellow-500"
    >
      {icon}
      <Link href={`${path}`}>
        <span className="ml-2 hover:text-yellow-500">{text}</span>
      </Link>
    </motion.div>
  );
};

const MobileMenu = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="fixed top-0 left-0 w-full h-screen bg-gray-900 text-white p-4"
    >
      <div className="flex justify-end">
        <button onClick={onClose}>
          <FaTimes className="text-2xl" />
        </button>
      </div>
      <div className="mt-8 space-y-4 ml-4">
        <NavItem icon={<FaHome />} text="Home" path="/" />

        <NavItem icon={<FaInfoCircle />} text="About" path="/about" />

        <NavItem icon={<FaEnvelope />} text="Contact" path="/contact" />
        <NavItem icon={<FaUniversity />} text="Registration" path="/register" />
        <NavItem icon={<FaSearch />} text="Explore" path="/explore" />
      </div>
    </motion.div>
  );
};

export default Navbar;
