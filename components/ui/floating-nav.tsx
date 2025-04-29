"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { keyframes, css } from "@emotion/react";
import { Menu, X, Home, User, Briefcase, Code, Award, MessageSquare } from "lucide-react";

import { navItems } from "@/data";
import { cn } from "@/lib/utils";

// Define underline animation
const underline = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`;

// Create Emotion style for animated underline
const underlineStyle = css`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(to right, #a855f7, #ec4899);
    transform-origin: left;
    transform: scaleX(0);
    animation: ${underline} 0.3s forwards;
  }
`;

// Icon mapping for navigation items
const navIcons: { [key: string]: React.ReactNode } = {
  "Home": <Home className="h-5 w-5 mr-3" />,
  "About": <User className="h-5 w-5 mr-3" />,
  "Experience": <Briefcase className="h-5 w-5 mr-3" />,
  "Skills": <Code className="h-5 w-5 mr-3" />,
  "Projects": <Award className="h-5 w-5 mr-3" />,
  "Testimonials": <MessageSquare className="h-5 w-5 mr-3" />,
  "Contact": <MessageSquare className="h-5 w-5 mr-3" />,
};

type FloatingNavProps = {
  navItems: typeof navItems;
  className?: string;
};

export const FloatingNav = ({ navItems, className }: FloatingNavProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (mobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen, isMobile]);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      if (current < 50) {
        setVisible(true);
      } else {
        if (current > lastScrollY) {
          setVisible(false); // Scrolling down
        } else {
          setVisible(true); // Scrolling up
        }
      }
      setLastScrollY(current);
    }
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[4999] md:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>
      
      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed top-0 left-0 h-full w-64 bg-black-100 border-r border-purple-500/20 shadow-lg z-[5001] md:hidden overflow-y-auto"
          >
            <div className="p-5 flex flex-col h-full">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Portfolio
                </h2>
                <button 
                  onClick={closeMobileMenu}
                  className="p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
              
              <div className="flex flex-col space-y-1 flex-1">
                {navItems.map((navItem: any, idx: number) => (
                  <Link
                    key={`sidebar-link-${idx}`}
                    href={navItem.link}
                    className="group flex items-center py-3 px-4 rounded-lg hover:bg-purple-500/10 transition-colors duration-300 border-l-2 border-transparent hover:border-purple-500"
                    onClick={closeMobileMenu}
                  >
                    {navIcons[navItem.name] || <User className="h-5 w-5 mr-3" />}
                    <span className="text-sm font-medium text-white">
                      {navItem.name}
                    </span>
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/10">
                <Link
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center font-medium hover:opacity-90 transition-opacity"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-5 md:top-10 z-[5000] mx-auto flex justify-between items-center max-w-fit md:max-w-fit rounded-3xl border border-white/[0.2] bg-black-100 px-3 md:px-5 py-3 md:py-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-md",
          className
        )}
      >
        {/* Mobile Menu Button - Only visible on small screens */}
        <button 
          className="md:hidden relative z-20 text-white p-1 hover:bg-white/10 rounded-lg focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <Menu className="h-5 w-5" />
        </button>
        
        {/* Desktop Menu - Hidden on small screens */}
        <div className="hidden md:flex md:space-x-4">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className="group relative px-3 py-1"
            >
              <span className="relative z-10 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-300 group-hover:text-red-500">
                {navItem.name}
              </span>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-red-500 to-red-700 transition-all duration-300 group-hover:w-full"></span>
              <span className="absolute -inset-1 -z-10 scale-[0.8] rounded-lg opacity-0 blur transition duration-300 group-hover:scale-100 group-hover:opacity-10 bg-red-500"></span>
            </Link>
          ))}
        </div>
      </motion.nav>
    </>
  );
};
