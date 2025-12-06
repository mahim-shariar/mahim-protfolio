import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Heart,
  Coffee,
  Terminal,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ArrowUp,
  Sparkles,
  Code2,
  Palette,
  Zap,
  Layers,
  Smartphone,
  Rocket,
  User,
  Calendar,
  MessageSquare,
} from "lucide-react";

const FooterSection = () => {
  const [isHovered, setIsHovered] = useState({});
  const [isInView, setIsInView] = useState(false);
  const [currentYear, setCurrentYear] = useState(2024);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Set current year
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      platform: "GitHub",
      icon: Github,
      url: "https://github.com/yourusername",
      color: "hover:text-white",
    },
    {
      platform: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/yourusername",
      color: "hover:text-blue-400",
    },
    {
      platform: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/yourusername",
      color: "hover:text-blue-300",
    },
    {
      platform: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/yourusername",
      color: "hover:text-pink-400",
    },
  ];

  const navSections = [
    {
      title: "Services",
      links: [
        { name: "Web Development", icon: Code2, href: "#services" },
        { name: "UI/UX Design", icon: Palette, href: "#services" },
        { name: "Web Animation", icon: Zap, href: "#services" },
        { name: "Full-Stack Projects", icon: Layers, href: "#services" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "About Me", icon: User, href: "#about" },
        { name: "Testimonials", icon: MessageSquare, href: "#testimonials" },
        { name: "Book a Call", icon: Calendar, href: "#contact" },
        { name: "Get in Touch", icon: Mail, href: "#contact" },
      ],
    },
  ];

  const quickLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

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
        className="absolute top-0 right-0 w-1 h-full transition-all duration-700 ease-in-out"
        viewBox="0 0 1 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0.5,0 Q0.8,10 0.5,20 T0.7,40 T0.4,60 T0.6,80 T0.5,100"
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
      <svg
        className="absolute top-0 left-0 w-1 h-full transition-all duration-700 ease-in-out"
        viewBox="0 0 1 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0.5,0 Q0.3,15 0.5,30 T0.3,50 T0.6,70 T0.4,90 T0.5,100"
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

  // Floating particles
  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 2;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["-100px", "100vh"],
              opacity: [0, 0.2, 0],
              x: [0, (Math.random() - 0.5) * 15, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );

  return (
    <div ref={sectionRef} className="relative bg-black overflow-hidden">
      <FloatingParticles />

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Border */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Footer Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="py-12"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center group hover:bg-black/60 transition-all duration-700 mb-12"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, header: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, header: false }))
              }
            >
              <HandDrawnBorder isActive={isHovered.header} />

              {/* Terminal Dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="flex gap-1.5 mb-6 justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-white/40"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-white/60"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-white/80"
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
              >
                LET'S BUILD TOGETHER
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center gap-3 mt-6"
              >
                <Terminal className="w-5 h-5 text-white/60" />
                <span className="text-white/40 font-mono text-sm">
                  $ footer --ready --connect
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="relative"
            >
              <div
                className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 group hover:bg-black/60 transition-all duration-500"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, brand: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, brand: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.brand} />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-bold text-lg">YOURNAME</span>
                </div>

                <p className="text-white/60 text-sm mb-6">
                  Creating exceptional digital experiences with modern
                  technology and elegant design.
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white ${social.color} hover:bg-white/10 transition-all duration-300`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Navigation Sections */}
            {navSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + sectionIndex * 0.1 }}
                className="relative"
              >
                <div
                  className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 group hover:bg-black/60 transition-all duration-500"
                  onMouseEnter={() =>
                    setIsHovered((prev) => ({ ...prev, [section.title]: true }))
                  }
                  onMouseLeave={() =>
                    setIsHovered((prev) => ({
                      ...prev,
                      [section.title]: false,
                    }))
                  }
                >
                  <HandDrawnBorder isActive={isHovered[section.title]} />

                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="text-white/40">#</span>
                    {section.title}
                  </h3>

                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => {
                      const Icon = link.icon;
                      return (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            delay: 1 + sectionIndex * 0.1 + linkIndex * 0.1,
                          }}
                        >
                          <a
                            href={link.href}
                            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group/link"
                          >
                            <div className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover/link:scale-110 transition-transform duration-300">
                              <Icon className="w-3 h-3" />
                            </div>
                            <span className="text-sm">{link.name}</span>
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            ))}

            {/* Stats / Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 }}
              className="relative"
            >
              <div
                className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 group hover:bg-black/60 transition-all duration-500"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, stats: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, stats: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.stats} />

                <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                  <span className="text-white/40">$</span>
                  STATS
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {currentYear}
                    </div>
                    <div className="text-white/40 text-xs">Current Year</div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div>
                    <div className="text-2xl font-bold text-white mb-1">
                      24/7
                    </div>
                    <div className="text-white/40 text-xs">Response Time</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="relative">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2 }}
                className="flex items-center gap-2 text-white/40 text-sm"
              >
                <Heart className="w-4 h-4 text-red-400" />
                <span>© {currentYear} YourName. All rights reserved.</span>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.3 }}
                className="flex flex-wrap items-center gap-6"
              >
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </motion.div>

              {/* Made With */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.4 }}
                className="flex items-center gap-2 text-white/40 text-sm"
              >
                <Coffee className="w-4 h-4 text-yellow-400" />
                <span>Made with passion</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:bg-black/90 transition-all duration-300 flex items-center justify-center"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

// Import AnimatePresence if not already imported
const AnimatePresence = ({ children }) => children;

export default FooterSection;
