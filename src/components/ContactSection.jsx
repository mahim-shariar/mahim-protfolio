import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Send,
  User,
  Sparkles,
  Terminal,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle,
  Shield,
  Zap,
  ExternalLink,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";

const ContactSection = () => {
  const [isHovered, setIsHovered] = useState({});
  const [isInView, setIsInView] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const calendarRef = useRef(null);
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

  // Handle escape key for calendar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showCalendar) {
        setShowCalendar(false);
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showCalendar]);

  const socialLinks = [
    {
      platform: "GitHub",
      icon: Github,
      url: "https://github.com/mahim-shariar",
      color: "hover:text-white",
    },
    {
      platform: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/md-mahim-7957381a7/",
      color: "hover:text-blue-400",
    },
    {
      platform: "X",
      icon: Twitter,
      url: "https://x.com/Being_MsMahim",
      color: "hover:text-blue-300",
    },
    {
      platform: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/being_mahimtalukder/",
      color: "hover:text-pink-400",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book at your convenience, 24/7 availability",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "End-to-end encrypted scheduling system",
    },
    {
      icon: Zap,
      title: "Instant Confirmation",
      description: "Receive calendar invites immediately",
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Google Meet/Zoom links auto-generated",
    },
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
      {[...Array(20)].map((_, i) => {
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
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden py-20"
    >
      <FloatingParticles />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 container mx-auto px-4"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 inline-block group hover:bg-black/60 transition-all duration-700"
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

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              BOOK A CALL
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <Calendar className="w-5 h-5 text-white/60" />
              <span className="text-white/40 font-mono text-sm">
                $ schedule --calendar --open
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - TidyCal Booking */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative"
          >
            <div
              className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group hover:bg-black/60 transition-all duration-700 h-full"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, booking: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, booking: false }))
              }
            >
              <HandDrawnBorder isActive={isHovered.booking} />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Instant Scheduling
                  </h2>
                  <p className="text-white/60">Powered by TidyCal</p>
                </div>
              </div>

              {/* Calendar Preview */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <div className="relative p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Live Calendar Integration
                  </h3>
                  <p className="text-white/60 mb-6">
                    See real-time availability and book instantly
                  </p>

                  <motion.button
                    onClick={() => setShowCalendar(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all duration-300 flex items-center gap-3 mx-auto"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Open Booking Calendar</span>
                  </motion.button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white/70">No login required</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white/70">Instant confirmation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white/70">Calendar sync</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Social & Benefits */}
          <div className="space-y-8">
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="relative"
            >
              <div
                className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group hover:bg-black/60 transition-all duration-700"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, social: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, social: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.social} />

                <h2 className="text-2xl font-bold text-white mb-8">
                  Connect Online
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 text-center">
                          <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                            <Icon
                              className={`w-5 h-5 text-white/80 ${social.color}`}
                            />
                          </div>
                          <span className="text-white/60 text-sm">
                            {social.platform}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="relative"
            >
              <div
                className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group hover:bg-black/60 transition-all duration-700"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, benefits: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, benefits: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.benefits} />

                <h2 className="text-2xl font-bold text-white mb-8">
                  Booking Benefits
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">
                            {benefit.title}
                          </h3>
                          <p className="text-white/40 text-xs mt-1">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-center"
        >
          <div className="inline-block p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-white/60" />
              <span className="text-white/40 font-mono text-sm">
                Schedule a call anytime • Available worldwide
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* TidyCal Modal */}
      {showCalendar && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={() => {
              setShowCalendar(false);
              setIsFullscreen(false);
            }}
          />

          {/* Calendar Container */}
          <motion.div
            ref={calendarRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className={`fixed z-50 ${
              isFullscreen
                ? "ins-0"
                : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[85vh] max-w-6xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-black/95 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
              <HandDrawnBorder isActive={true} />

              {/* Modal Header */}
              <div className="relative p-4 border-b border-white/10 bg-black/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Schedule a Call
                      </h2>
                      <p className="text-white/40 text-xs">
                        Powered by TidyCal
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white transition-all duration-300"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setShowCalendar(false);
                        setIsFullscreen(false);
                      }}
                      className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white transition-all duration-300"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* TidyCal Iframe */}
              <div className="flex-1 relative">
                <iframe
                  src="https://tidycal.com/mdmahim924214/30-minute-meeting"
                  title="TidyCal Booking Calendar"
                  className="w-full h-full border-0"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                  loading="lazy"
                />

                {/* Loading State */}
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/60">Loading booking calendar...</p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="relative p-4 border-t border-white/10 bg-black/80">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-white/60">Secure booking system</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-white/40" />
                    <a
                      href="https://tidycal.com/mdmahim924214/30-minute-meeting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      Open in new tab
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ContactSection;
