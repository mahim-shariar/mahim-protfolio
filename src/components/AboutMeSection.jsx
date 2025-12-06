import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Sparkles,
  Zap,
  Code2,
  Cpu,
  Database,
  Cloud,
  Shield,
  Users,
  Heart,
  Target,
  Lightbulb,
  BookOpen,
  Trophy,
  Briefcase,
  Award,
  Rocket,
  Calendar,
  Users as UsersIcon,
  X,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
} from "lucide-react";
import jhankhar_photo from "../assets/jhankhar_mahbub.jpeg";
import profile from "../assets/my-profile.png";

const AboutMeSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState({});
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);

  const certificate_link =
    "https://drive.google.com/file/d/1EktLjsCYPTkZ-wP1qxW7VP8b3J_fNO19/view?usp=sharing";

  const recomendation_letter =
    "https://drive.google.com/file/d/1uvuGjGe9cLt02LSsVgifSHUf4l59cHk7/view?usp=sharing";

  // Intersection Observer for smooth scroll animation
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

  // Your personality and expertise data
  const aboutData = {
    name: "ALEX MORGAN",
    title: "SENIOR FULL-STACK DEVELOPER",
    story:
      "I build digital experiences that transform ideas into impactful reality. With over 7 years of crafting cutting-edge web applications, I blend technical precision with creative vision to deliver solutions that exceed expectations.",
    values: [
      {
        icon: Heart,
        title: "Passion",
        description: "I love what I do, and it shows in every line of code.",
        color: "text-red-400",
      },
      {
        icon: Shield,
        title: "Integrity",
        description: "Honest communication and reliable delivery.",
        color: "text-blue-400",
      },
      {
        icon: Target,
        title: "Excellence",
        description:
          "Never settling for 'good enough' in pursuit of greatness.",
        color: "text-purple-400",
      },
      {
        icon: Users,
        title: "Collaboration",
        description: "The best solutions come from diverse perspectives.",
        color: "text-green-400",
      },
    ],
  };

  // Journey story data for modal
  const journeyStory = {
    title: "My Coding Journey",
    start:
      "During COVID lockdown in 2020, feeling bored at home, I convinced my parents to buy me a computer. At first, I was just playing games...",
    timeline: [
      {
        year: "2020",
        title: "The Beginning",
        description:
          "Got my first computer. Started playing games, but soon got bored. My cousin showed me some basic programming concepts.",
        icon: Lightbulb,
        color: "from-blue-500/20 to-cyan-500/20",
      },
      {
        year: "2021",
        title: "First Steps in Programming",
        description:
          "Tried learning Python basics. Discovered Programming Hero course by Jhankar Mahbub. Started my web development journey.",
        icon: BookOpen,
        color: "from-purple-500/20 to-pink-500/20",
      },
      {
        year: "2022",
        title: "The Struggle & Breakthrough",
        description:
          "Faced many challenges learning web development. Finally completed the course and received my first certificate!",
        icon: Trophy,
        color: "from-green-500/20 to-emerald-500/20",
      },
      {
        year: "2023",
        title: "First Internship & Leadership",
        description:
          "Selected for Programming Hero internship. Led a 6-member team to build 'Doctor Meet' - an online doctor consultation platform with pharmacy integration.",
        icon: Briefcase,
        color: "from-orange-500/20 to-red-500/20",
      },
      {
        year: "2023",
        title: "Achievement & Recognition",
        description:
          "Received recommendation letter (only few students got this). Started working at AK2 Technologies. Co-founded 'Trilance' agency with three other founders.",
        icon: Award,
        color: "from-indigo-500/20 to-blue-500/20",
      },
      {
        year: "Present",
        title: "Current Journey",
        description:
          "Working on real-world projects, continuously learning new technologies, and building my career in software development.",
        icon: Rocket,
        color: "from-cyan-500/20 to-teal-500/20",
      },
    ],
    achievements: [
      {
        title: "Programming Hero Certificate",
        description: "Completed full web development course with excellence",
        date: "2022",
        icon: Trophy,
        link: certificate_link,
        type: "certificate",
      },
      {
        title: "Recommendation Letter",
        description:
          "Received special recommendation for outstanding performance during internship",
        date: "2023",
        icon: Award,
        link: recomendation_letter,
        type: "recommendation",
      },
    ],
    mentors: [
      {
        name: "Jhankar Mahbub",
        role: "Lead Instructor, Programming Hero",
        description: "Inspired me to start my programming journey",
        avatar: jhankhar_photo,
      },
    ],
    currentWork: [
      "Working at AK2 Technologies on real-world projects",
      "Managing Trilance agency with co-founders",
      "Building modern web applications",
      "Continuously learning and growing",
    ],
  };

  // Modal handlers
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  // Handle click outside modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  // Hand-drawn border component
  const HandDrawnBorder = ({ isActive, color = "white" }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

  // White geometric shapes background for profile section only
  const WhiteGeometricShapes = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {/* Large white triangles */}
      <div className="absolute top-0 left-0 w-64 h-64">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <polygon points="0,0 100,0 0,100" fill="white" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <polygon
            points="100,100 0,100 100,0"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>

      {/* White circles */}
      <div className="absolute top-1/4 right-1/4 w-48 h-48">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.15"
          />
        </svg>
      </div>

      <div className="absolute bottom-1/4 left-1/4 w-32 h-32">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.1"
          />
        </svg>
      </div>

      {/* White hexagons */}
      <div className="absolute top-1/2 left-1/3 w-24 h-24">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <polygon
            points="50,0 93,25 93,75 50,100 7,75 7,25"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.1"
          />
        </svg>
      </div>

      <div className="absolute bottom-1/3 right-1/3 w-20 h-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <polygon
            points="50,0 93,25 93,75 50,100 7,75 7,25"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.1"
          />
        </svg>
      </div>

      {/* White dots pattern */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="dots"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="white" fillOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
    </div>
  );

  // Floating particles (original version)
  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 4 + 1;
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
              opacity: [0, 0.3, 0],
              x: [0, (Math.random() - 0.5) * 20, 0],
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

  // Subtle gradient background (original version)
  const SubtleGradient = () => (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/5 to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
    </div>
  );

  // Handle certificate/recommendation click
  const handleCertificateClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <SubtleGradient />
      <FloatingParticles />

      {/* Main Container with Smooth Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 container mx-auto px-4 py-20"
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
              ABOUT ME
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <Terminal className="w-5 h-5 text-white/60" />
              <span className="text-white/40 font-mono text-sm">
                $ whoami --story
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid - Bigger profile on left, story on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Full-size Profile Image with White Shapes */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div
              className="relative rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/10 group hover:bg-black/60 hover:border-white/30 transition-all duration-700 h-full min-h-[500px]"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, profile: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, profile: false }))
              }
            >
              <HandDrawnBorder isActive={isHovered.profile} />

              {/* White Geometric Background */}
              <WhiteGeometricShapes />

              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-30 group-hover:opacity-50 transition-opacity duration-700" />

              {/* Full-size Profile Image Container */}
              <div className="relative w-full h-full flex flex-col">
                {/* Full-size Profile Image */}
                <div className="relative flex-1 flex items-center mx-auto justify-center max-w-lg max-h-md p-6">
                  {/* Full-size Profile Image with white overlay */}

                  {/* Your profile image - now full size */}
                  <img
                    src={profile}
                    alt="Alex Morgan"
                    className="w-full h-full object-cover "
                  />
                </div>

                {/* Name and Title - at bottom of profile section */}
                <div className="relative p-5 border-t border-white/10 bg-gradient-to-r from-black/40 via-black/20 to-black/40">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {aboutData.name}
                    </h2>
                    <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg backdrop-blur-sm">
                      <span className="text-lg font-medium text-blue-300">
                        {aboutData.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story & Details (ORIGINAL - UNCHANGED) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Story Card */}
            <div
              className="relative rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 p-8 group hover:bg-black/60 hover:border-white/30 transition-all duration-700"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, story: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, story: false }))
              }
            >
              <HandDrawnBorder isActive={isHovered.story} />

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 border border-white/10 rounded-xl">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">My Journey</h3>
                  <p className="text-white/60 text-sm">
                    From curiosity to career
                  </p>
                </div>
              </div>

              <p className="text-white/70 text-lg leading-relaxed mb-6">
                {aboutData.story}
              </p>

              {/* Journey Highlights */}
              <div className="space-y-4 mb-8">
                {[
                  "Started during COVID lockdown with my first computer",
                  "Discovered programming through a cousin's inspiration",
                  "Mastered web development with dedication",
                  "Now building impactful digital solutions",
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span className="text-white/60">{point}</span>
                  </motion.div>
                ))}
              </div>

              {/* White Journey Button */}
              <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative group"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, journeyBtn: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, journeyBtn: false }))
                }
              >
                <div className="relative p-4 border border-white/30 rounded-xl bg-white backdrop-blur-sm group-hover:bg-white/95 transition-all duration-500">
                  <HandDrawnBorder
                    isActive={isHovered.journeyBtn}
                    color="#000000"
                  />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-black" />
                      <div className="text-left">
                        <h3 className="font-bold text-black text-sm">
                          View Full Story
                        </h3>
                        <p className="text-gray-600 text-xs">
                          My complete journey from beginner to developer
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Values Section */}
            <div
              className="relative rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 p-6 group hover:bg-black/60 hover:border-white/30 transition-all duration-700"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, values: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, values: false }))
              }
            >
              <HandDrawnBorder isActive={isHovered.values} />

              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>CORE VALUES</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {aboutData.values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -3 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-500 group"
                    >
                      <div
                        className={`p-2 rounded-lg bg-black/40 ${value.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-500`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white mb-1">
                          {value.title}
                        </h4>
                        <p className="text-white/50 text-xs">
                          {value.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-4"
            >
              {[
                {
                  icon: Github,
                  label: "GitHub",
                  color: "text-white/60 hover:text-white",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  color: "text-white/60 hover:text-blue-400",
                },
                {
                  icon: Twitter,
                  label: "Twitter",
                  color: "text-white/60 hover:text-cyan-400",
                },
                {
                  icon: Mail,
                  label: "Email",
                  color: "text-white/60 hover:text-red-400",
                },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className={`relative w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center transition-all duration-500 hover:bg-white/10 hover:border-white/30 ${social.color}`}
                    title={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Terminal Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 bg-black/40 border border-white/10 rounded-xl relative group hover:bg-black/60 hover:border-white/20 transition-all duration-700"
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, footer: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, footer: false }))
            }
          >
            <HandDrawnBorder isActive={isHovered.footer} />

            <Terminal className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-500" />
            <span className="text-white/40 font-mono text-sm group-hover:text-white/60 transition-colors duration-500">
              $ echo "Ready to build something amazing?" && sleep 2 && echo
              "Let's connect →"
            </span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="w-2 h-4 bg-white/60"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Journey Modal (ORIGINAL - UNCHANGED) */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              onClick={handleBackdropClick}
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                ref={modalRef}
                key="modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="relative w-full max-w-5xl max-h-[85vh] rounded-2xl bg-black/95 backdrop-blur-sm border border-white/10 overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <HandDrawnBorder isActive={true} />

                {/* Modal Header */}
                <div className="relative p-6 border-b border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-8">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {journeyStory.title}
                      </h2>
                      <p className="text-white/60">{journeyStory.start}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeModal}
                      className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white transition-all duration-500 flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Timeline */}
                    <div className="lg:col-span-2">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <span>MY JOURNEY TIMELINE</span>
                      </h3>

                      <div className="relative">
                        {/* Vertical timeline line */}
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-cyan-500/20" />

                        <div className="space-y-8">
                          {journeyStory.timeline.map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex items-start gap-6"
                              >
                                {/* Timeline dot */}
                                <div className="relative flex-shrink-0 z-10">
                                  <div className="w-12 h-12 bg-black/60 border border-white/10 rounded-full flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-white" />
                                  </div>
                                </div>

                                {/* Content */}
                                <div
                                  className={`flex-1 p-6 rounded-xl bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10`}
                                >
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="text-sm font-semibold text-blue-300">
                                      {item.year}
                                    </span>
                                    <span className="text-white/40">•</span>
                                    <span className="text-lg font-semibold text-white">
                                      {item.title}
                                    </span>
                                  </div>
                                  <p className="text-white/70">
                                    {item.description}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Achievements & Mentor */}
                    <div className="space-y-8">
                      {/* Achievements */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-yellow-400" />
                          <span>KEY ACHIEVEMENTS</span>
                        </h3>

                        <div className="space-y-4">
                          {journeyStory.achievements.map(
                            (achievement, index) => {
                              const Icon = achievement.icon;
                              return (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.5 + index * 0.1 }}
                                  className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                                  onClick={() =>
                                    handleCertificateClick(achievement.link)
                                  }
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <Icon className="w-6 h-6 text-yellow-400" />
                                      <div>
                                        <h4 className="font-semibold text-white">
                                          {achievement.title}
                                        </h4>
                                        <p className="text-sm text-white/40">
                                          {achievement.date}
                                        </p>
                                      </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors duration-300" />
                                  </div>
                                  <p className="text-white/60 text-sm">
                                    {achievement.description}
                                  </p>
                                </motion.div>
                              );
                            }
                          )}
                        </div>

                        {/* Achievement Images Section */}
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-white mb-4">
                            Achievement Certificates
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {/* Clickable certificate placeholders */}
                            {journeyStory.achievements.map(
                              (achievement, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.8 + index * 0.1 }}
                                  className="relative aspect-video border border-white/10 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 group cursor-pointer"
                                  onClick={() =>
                                    handleCertificateClick(achievement.link)
                                  }
                                >
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                      <div className="text-4xl font-bold text-white/20 mb-2 group-hover:text-white/30 transition-colors duration-300">
                                        {achievement.type === "certificate"
                                          ? "CERT"
                                          : "REC"}
                                      </div>
                                      <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300">
                                        {achievement.type === "certificate"
                                          ? "Certificate"
                                          : "Recommendation"}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="absolute inset-0 border-2 border-dashed border-white/5 rounded-lg" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                                    <div className="flex items-center gap-2 text-white/80 text-sm">
                                      <span>Click to view</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </div>
                                  </div>
                                </motion.div>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Mentor Section */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                          <UsersIcon className="w-5 h-5 text-green-400" />
                          <span>MENTOR & INSPIRATION</span>
                        </h3>

                        {journeyStory.mentors.map((mentor, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-white/10 rounded-xl"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/10 overflow-hidden flex items-center justify-center">
                                {mentor.avatar &&
                                typeof mentor.avatar === "string" ? (
                                  <img
                                    src={mentor.avatar}
                                    alt={mentor.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="text-xl font-bold text-white/40">
                                    {mentor.avatar}
                                  </div>
                                )}
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">
                                  {mentor.name}
                                </h4>
                                <p className="text-sm text-green-300">
                                  {mentor.role}
                                </p>
                              </div>
                            </div>
                            <p className="text-white/60 text-sm">
                              {mentor.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Current Work */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <Rocket className="w-5 h-5 text-cyan-400" />
                          <span>CURRENTLY</span>
                        </h3>

                        <div className="space-y-3">
                          {journeyStory.currentWork.map((work, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                              <span className="text-white/70">{work}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutMeSection;
