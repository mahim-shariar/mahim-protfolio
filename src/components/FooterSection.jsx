import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  User,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { useApi } from "../hooks/useApi";
import logo from "../assets/logo-bg.png";

const FooterSection = () => {
  const [isHovered, setIsHovered] = useState({});
  const [isInView, setIsInView] = useState(false);
  const [currentYear, setCurrentYear] = useState(2024);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [contentData, setContentData] = useState(null);
  const sectionRef = useRef(null);

  const { get: getContent } = useApi();

  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const result = await getContent("/content");
        const data = result?.data || {};
        setContentData(data);
      } catch (error) {
        console.error("Error fetching content data:", error);
      }
    };

    fetchContentData();
  }, []);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

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
      url: contentData?.social?.github || "https://github.com",
      color: "hover:text-white",
    },
    {
      platform: "LinkedIn",
      icon: Linkedin,
      url: contentData?.social?.linkedin || "https://linkedin.com",
      color: "hover:text-blue-400",
    },
    {
      platform: "Twitter",
      icon: Twitter,
      url: contentData?.social?.twitter || "https://twitter.com",
      color: "hover:text-blue-300",
    },
    {
      platform: "Instagram",
      icon: Instagram,
      url: contentData?.social?.instagram || "https://instagram.com",
      color: "hover:text-pink-400",
    },
  ];

  const navLinks = [
    { name: "Home", icon: Sparkles, href: "#home" },
    { name: "About", icon: User, href: "#about" },
    { name: "Testimonials", icon: MessageSquare, href: "#testimonials" },
    { name: "Contact", icon: Mail, href: "#contact" },
  ];

  const quickLinks = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
  ];

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

  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {[...Array(10)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 8 + 4;
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
              opacity: [0, 0.15, 0],
              x: [0, (Math.random() - 0.5) * 10, 0],
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
    <footer
      ref={sectionRef}
      className="relative bg-black overflow-hidden py-12"
    >
      <FloatingParticles />

      <div className="relative z-10">
        {/* Top Border */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Footer Header - Smaller */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-8"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:bg-black/60 transition-all duration-500 mb-8"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, header: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, header: false }))
              }
            >
              <HandDrawnBorder isActive={isHovered.header} />

              {/* Terminal Dots - Smaller */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="flex gap-1 mb-4 justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="w-1.5 h-1.5 rounded-full bg-white/40"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                  className="w-1.5 h-1.5 rounded-full bg-white/60"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-white/80"
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight"
              >
                LET'S CONNECT
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center gap-2 mt-4"
              >
                <Terminal className="w-4 h-4 text-white/60" />
                <span className="text-white/40 font-mono text-xs">
                  $ connect --ready
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Grid - All in one row */}
        <div className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Logo Card - Smaller */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="relative"
            >
              <div
                className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 group hover:bg-black/60 transition-all duration-400 h-full"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, brand: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, brand: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.brand} />

                {/* Smaller Logo */}
                <div className="flex items-center justify-center mb-3">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-24 h-24 object-contain"
                  />
                </div>

                <p className="text-white/60 text-xs mb-4 text-center">
                  {contentData?.title || "Digital craftsmanship at its finest"}
                </p>

                {/* Social Links - Smaller */}
                <div className="flex gap-2 justify-center">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white ${social.color} hover:bg-white/10 transition-all duration-300`}
                        title={social.platform}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Navigation Card - Smaller */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="relative"
            >
              <div
                className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 group hover:bg-black/60 transition-all duration-400 h-full"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, nav: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, nav: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.nav} />

                <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                  <span className="text-white/40">#</span>
                  NAVIGATION
                </h3>

                <ul className="space-y-2">
                  {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          delay: 1 + index * 0.1,
                        }}
                      >
                        <a
                          href={link.href}
                          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 group/link text-sm"
                        >
                          <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover/link:scale-110 transition-transform duration-300">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{link.name}</span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>

            {/* Stats Card - Smaller */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              className="relative"
            >
              <div
                className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 group hover:bg-black/60 transition-all duration-400 h-full"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, stats: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, stats: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.stats} />

                <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                  <span className="text-white/40">$</span>
                  STATS
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="text-xl font-bold text-white mb-1">
                      {contentData?.experienceYears || 3}+
                    </div>
                    <div className="text-white/40 text-xs">
                      Years Experience
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div>
                    <div className="text-xl font-bold text-white mb-1">
                      {contentData?.projectCount || 20}+
                    </div>
                    <div className="text-white/40 text-xs">
                      Projects Completed
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Card - Smaller */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 }}
              className="relative"
            >
              <div
                className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 group hover:bg-black/60 transition-all duration-400 h-full"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, contact: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, contact: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.contact} />

                <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                  <span className="text-white/40">@</span>
                  CONTACT
                </h3>

                <div className="space-y-3">
                  <a
                    href="mailto:mdmahim924214@gmail.com"
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 text-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>
                      Email: {contentData?.email || "mdmahim924214@gmail.com"}
                    </span>
                  </a>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="text-white/60 text-xs">
                    <p>Available for:</p>
                    <ul className="mt-1 space-y-1">
                      <li className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                        <span>Freelance projects</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                        <span>Full-time roles</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
                        <span>Consultation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar - Smaller */}
          <div className="relative">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright - Smaller */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2 }}
                className="flex items-center gap-1.5 text-white/40 text-xs"
              >
                <Heart className="w-3 h-3 text-red-400" />
                <span>
                  © {currentYear} {contentData?.name || "YourName"}
                </span>
              </motion.div>

              {/* Quick Links - Smaller */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-white/40 hover:text-white text-xs transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </motion.div>

              {/* Made With - Smaller */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.4 }}
                className="flex items-center gap-1.5 text-white/40 text-xs"
              >
                <Coffee className="w-3 h-3 text-yellow-400" />
                <span>Made with passion</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button - Smaller */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-4 right-4 z-40 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:bg-black/90 transition-all duration-300 flex items-center justify-center"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default FooterSection;
