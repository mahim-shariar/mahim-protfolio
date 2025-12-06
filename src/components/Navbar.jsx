import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  MessageSquare,
  Calendar,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import logo from "../assets/logo-bg.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ["home", "about", "services", "testimonials", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "#home",
    },
    {
      id: "about",
      label: "About",
      icon: User,
      href: "#about",
    },
    {
      id: "services",
      label: "Services",
      icon: Briefcase,
      href: "#services",
      hasDropdown: true,
      dropdownItems: [
        { label: "Web Development", href: "#services" },
        { label: "UI/UX Design", href: "#services" },
        { label: "Web Animation", href: "#services" },
        { label: "Full-Stack Projects", href: "#services" },
      ],
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: MessageSquare,
      href: "#testimonials",
    },
    {
      id: "contact",
      label: "Contact",
      icon: Calendar,
      href: "#contact",
    },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Hand-drawn border component
  const HandDrawnBorder = ({ isActive, color = "white", className = "" }) => (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <svg
        className="absolute top-0 left-0 w-full h-1 transition-all duration-700 ease-in-out"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0.5 Q10,0.2 20,0.5 T40,0.3 T60,0.6 T80,0.4 T100,0.5"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity={isActive ? 0.8 : 0.3}
          strokeLinecap="round"
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full h-1 transition-all duration-700 ease-in-out"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0.5 Q15,0.7 30,0.4 T50,0.6 T70,0.3 T90,0.7 T100,0.5"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity={isActive ? 0.8 : 0.3}
          strokeLinecap="round"
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
    </div>
  );

  return (
    <>
      {/* Navbar Container */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-sm border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        {/* Main Navbar */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Only - Bigger Size */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center justify-center"
            >
              <div className="relative group">
                <div className="relative flex items-center justify-center  transition-all duration-500 overflow-hidden p-2">
                  {/* Bigger Logo Image */}
                  <img
                    src={logo}
                    alt="FARBOD Logo"
                    className="w-30 h-30 object-contain"
                  />
                </div>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <div key={item.id} className="relative">
                    <motion.button
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => scrollToSection(item.href)}
                      className="relative px-4 py-2"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>

                        {item.hasDropdown && (
                          <ChevronDown
                            className={`w-3 h-3 transition-transform duration-300 ${
                              hoveredItem === item.id ? "rotate-180" : ""
                            }`}
                          />
                        )}

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white rounded-full"
                          />
                        )}
                      </div>
                    </motion.button>

                    {/* Dropdown for Services */}
                    {item.hasDropdown && hoveredItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full mt-2 w-48 z-50"
                      >
                        <div className="relative bg-black/90 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                          <HandDrawnBorder isActive={true} />

                          <div className="p-2">
                            {item.dropdownItems.map((dropdownItem, index) => (
                              <motion.a
                                key={index}
                                href={dropdownItem.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToSection(dropdownItem.href);
                                }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 group/item"
                              >
                                <Sparkles className="w-3 h-3 text-white/40 group-hover/item:text-white transition-colors duration-300" />
                                <span className="text-sm">
                                  {dropdownItem.label}
                                </span>
                              </motion.a>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}

              {/* CTA Button */}
              <motion.button
                onClick={() => scrollToSection("#contact")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 relative group"
              >
                <div className="relative px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all duration-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Book Call</span>

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.button>
            </div>

            {/* Mobile Menu Button - Fixed with proper ref */}
            <button
              ref={mobileMenuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-white hover:border-white/30 transition-all duration-300 menu-button z-50"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}

              {/* Terminal dots */}
              <div className="absolute -top-1 -right-1 flex gap-0.5">
                <div className="w-1 h-1 rounded-full bg-white/60" />
                <div className="w-1 h-1 rounded-full bg-white/40" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Fixed with proper ref */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden absolute top-16 left-0 right-0"
            >
              <div className="border-t border-white/10 bg-black/95 backdrop-blur-sm mobile-menu">
                <div className="container mx-auto px-4 py-4">
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-center mb-6 p-4">
                    <div className=" rounded-xl flex items-center justify-center">
                      <img
                        src={logo}
                        alt="FARBOD Logo"
                        className="w-30 h-30 object-contain"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.id;

                      return (
                        <div key={item.id}>
                          <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => scrollToSection(item.href)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                              isActive
                                ? "bg-white/10 text-white"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5" />
                              <span className="font-medium">{item.label}</span>
                            </div>

                            {isActive && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </motion.button>

                          {/* Mobile dropdown items */}
                          {item.hasDropdown && (
                            <div className="ml-4 pl-8 border-l border-white/10 space-y-2 mt-2">
                              {item.dropdownItems.map((dropdownItem, index) => (
                                <motion.a
                                  key={index}
                                  href={dropdownItem.href}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(dropdownItem.href);
                                  }}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="flex items-center gap-3 p-3 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 text-sm"
                                >
                                  <div className="w-2 h-2 rounded-full bg-white/40" />
                                  <span>{dropdownItem.label}</span>
                                </motion.a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Mobile CTA */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      onClick={() => scrollToSection("#contact")}
                      className="w-full mt-4 p-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Book a Call</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
