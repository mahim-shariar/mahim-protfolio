import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
  FileText,
} from "lucide-react";
import jhankhar_photo from "../assets/jhankhar_mahbub.jpeg";
import profile from "../assets/my-profile.png";
import { useApi } from "../hooks/useApi";

const AboutMeSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState({});
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const [contentData, setContentData] = useState(null);

  // Use framer-motion's optimized useInView hook
  const isInView = useInView(sectionRef, {
    amount: 0.1,
    once: false,
  });

  // Use API hook for fetching content data
  const { get: getContent, loading: contentLoading } = useApi();

  // Fetch content data on component mount
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
  }, [getContent]);

  // Memoized about data
  const aboutData = useMemo(
    () => ({
      name: contentData?.name || "ALEX MORGAN",
      title: contentData?.title || "SENIOR FULL-STACK DEVELOPER",
      story:
        contentData?.bio ||
        `I build digital experiences that transform ideas into impactful reality. With over ${
          contentData?.experienceYears || 3
        } years of crafting cutting-edge web applications, I blend technical precision with creative vision to deliver solutions that exceed expectations.`,
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
      socialLinks: {
        github: contentData?.social?.github || "#",
        linkedin: contentData?.social?.linkedin || "#",
        twitter: contentData?.social?.twitter || "#",
        email: "#",
      },
      certificates: contentData?.certificates || [],
      resume: contentData?.resume || "",
      experienceYears: contentData?.experienceYears || 0,
      projectCount: contentData?.projectCount || 0,
    }),
    [contentData]
  );

  // Memoized journey story
  const journeyStory = useMemo(
    () => ({
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
          description: `Working on real-world projects with ${
            contentData?.experienceYears || 3
          } years of experience, continuously learning new technologies, and building my career in software development.`,
          icon: Rocket,
          color: "from-cyan-500/20 to-teal-500/20",
        },
      ],
      achievements: aboutData.certificates.map((certificate, index) => ({
        title:
          index === 0
            ? "Programming Hero Certificate"
            : "Recommendation Letter",
        description:
          index === 0
            ? "Completed full web development course with excellence"
            : "Received special recommendation for outstanding performance",
        date: "2022-2023",
        icon: FileText,
        link: certificate,
        type: "certificate",
      })),
      mentors: [
        {
          name: "Jhankar Mahbub",
          role: "Lead Instructor, Programming Hero",
          description: "Inspired me to start my programming journey",
          avatar: jhankhar_photo,
        },
      ],
      currentWork: [
        `Working with ${aboutData.experienceYears}+ years of experience`,
        `Completed ${aboutData.projectCount}+ projects`,
        "Managing Trilance agency with co-founders",
        "Building modern web applications",
        "Continuously learning and growing",
      ],
    }),
    [aboutData, contentData]
  );

  // Modal handlers
  const openModal = useCallback(() => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen, closeModal]);

  // Handle click outside modal
  const handleBackdropClick = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    },
    [closeModal]
  );

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Memoized HandDrawnBorder component
  const HandDrawnBorder = useMemo(
    () =>
      ({ isActive, color = "white" }) =>
        (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute top-0 left-0 w-full h-1"
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
              />
            </svg>
            <svg
              className="absolute top-0 right-0 w-1 h-full"
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
              />
            </svg>
            <svg
              className="absolute bottom-0 left-0 w-full h-1"
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
              />
            </svg>
            <svg
              className="absolute top-0 left-0 w-1 h-full"
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
              />
            </svg>
          </div>
        ),
    []
  );

  // Optimized FloatingParticles component
  const FloatingParticles = useMemo(
    () => () =>
      (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          {[...Array(10)].map((_, i) => {
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 8 + 4;
            const delay = Math.random() * 2;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: "-20px",
                }}
                animate={{
                  y: ["-20px", "calc(100vh + 20px)"],
                  opacity: [0, 0.1, 0],
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
      ),
    []
  );

  // Optimized SubtleGradient component
  const SubtleGradient = useMemo(
    () => () =>
      (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/3 to-transparent blur-2xl" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/3 to-transparent blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black" />
        </div>
      ),
    []
  );

  // Optimized WhiteGeometricShapes component
  const WhiteGeometricShapes = useMemo(
    () => () =>
      (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <polygon
                points="0,0 100,0 0,100"
                fill="white"
                fillOpacity="0.05"
              />
            </svg>
          </div>

          <div className="absolute bottom-0 right-0 w-64 h-64">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <polygon
                points="100,100 0,100 100,0"
                fill="white"
                fillOpacity="0.05"
              />
            </svg>
          </div>
        </div>
      ),
    []
  );

  // Handle certificate/recommendation click
  const handleCertificateClick = useCallback((link) => {
    if (link && link !== "#") {
      window.open(link, "_blank");
    }
  }, []);

  // Social links configuration
  const socialLinksConfig = useMemo(
    () => [
      {
        icon: Github,
        label: "GitHub",
        color: "text-white/60 hover:text-white",
        href: aboutData.socialLinks.github,
      },
      {
        icon: Linkedin,
        label: "LinkedIn",
        color: "text-white/60 hover:text-blue-400",
        href: aboutData.socialLinks.linkedin,
      },
      {
        icon: Twitter,
        label: "Twitter",
        color: "text-white/60 hover:text-cyan-400",
        href: aboutData.socialLinks.twitter,
      },
      {
        icon: Mail,
        label: "Email",
        color: "text-white/60 hover:text-red-400",
        href: aboutData.socialLinks.email,
      },
    ],
    [aboutData.socialLinks]
  );

  // Journey highlights based on API data
  const journeyHighlights = useMemo(
    () => [
      `Started with ${aboutData.experienceYears}+ years of experience`,
      `Completed ${aboutData.projectCount}+ projects`,
      "Mastered web development with dedication",
      "Now building impactful digital solutions",
    ],
    [aboutData.experienceYears, aboutData.projectCount]
  );

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <SubtleGradient />
      <FloatingParticles />

      {/* Main Container with Optimized Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div
            className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 inline-block group hover:bg-black/60 transition-all duration-500"
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, header: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, header: false }))
            }
          >
            {HandDrawnBorder({ isActive: isHovered.header })}

            {/* Terminal Dots */}
            <div className="flex gap-1.5 mb-6 justify-center">
              {[0, 0.2, 0.4].map((delay, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full bg-white/40"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay,
                  }}
                />
              ))}
            </div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              ABOUT ME
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <Terminal className="w-5 h-5 text-white/60" />
              <span className="text-white/40 font-mono text-sm">
                $ whoami --story
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Full-size Profile Image */}
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div
              className="relative rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/10 group hover:bg-black/60 hover:border-white/30 transition-all duration-500 h-full min-h-[500px]"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, profile: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, profile: false }))
              }
            >
              {HandDrawnBorder({ isActive: isHovered.profile })}

              {/* White Geometric Background */}
              <WhiteGeometricShapes />

              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

              {/* Full-size Profile Image Container */}
              <div className="relative w-full h-full flex flex-col">
                {/* Full-size Profile Image */}
                <div className="relative flex-1 flex items-center mx-auto justify-center max-w-lg max-h-md p-6">
                  <img
                    src={profile}
                    alt={aboutData.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name and Title */}
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

          {/* Right Column: Story & Details */}
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="space-y-8"
          >
            {/* Story Card */}
            <div
              className="relative rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 p-8 group hover:bg-black/60 hover:border-white/30 transition-all duration-500"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, story: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, story: false }))
              }
            >
              {HandDrawnBorder({ isActive: isHovered.story })}

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
              <div className="space-y-3 mb-8">
                {journeyHighlights.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span className="text-white/60">{point}</span>
                  </motion.div>
                ))}
              </div>

              {/* White Journey Button */}
              <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full relative group"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, journeyBtn: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, journeyBtn: false }))
                }
              >
                <div className="relative p-4 border border-white/30 rounded-xl bg-white backdrop-blur-sm group-hover:bg-white/95 transition-all duration-300">
                  {HandDrawnBorder({
                    isActive: isHovered.journeyBtn,
                    color: "#000000",
                  })}

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
              className="relative rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 p-6 group hover:bg-black/60 hover:border-white/30 transition-all duration-500"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, values: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, values: false }))
              }
            >
              {HandDrawnBorder({ isActive: isHovered.values })}

              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>CORE VALUES</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {aboutData.values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div
                        className={`p-2 rounded-lg bg-black/40 ${value.color} bg-opacity-20 group-hover:scale-105 transition-transform duration-300`}
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
              className="flex justify-center gap-3"
            >
              {socialLinksConfig.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`relative w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-white/30 ${social.color}`}
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
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 bg-black/40 border border-white/10 rounded-xl relative group hover:bg-black/60 hover:border-white/20 transition-all duration-500"
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, footer: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, footer: false }))
            }
          >
            {HandDrawnBorder({ isActive: isHovered.footer })}

            <Terminal className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300" />
            <span className="text-white/40 font-mono text-sm group-hover:text-white/60 transition-colors duration-300">
              $ echo "Ready to build something amazing?" && sleep 2 && echo
              "Let's connect →"
            </span>
            <motion.div
              className="w-2 h-4 bg-white/60"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Journey Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <JourneyModal
            journeyStory={journeyStory}
            closeModal={closeModal}
            modalRef={modalRef}
            handleBackdropClick={handleBackdropClick}
            handleCertificateClick={handleCertificateClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Extracted JourneyModal component for better performance
const JourneyModal = React.memo(
  ({
    journeyStory,
    closeModal,
    modalRef,
    handleBackdropClick,
    handleCertificateClick,
  }) => {
    const modalVariants = {
      hidden: { opacity: 0, scale: 0.95, y: 10 },
      visible: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 10 },
    };

    return (
      <>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          onClick={handleBackdropClick}
        />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            ref={modalRef}
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-5xl max-h-[85vh] rounded-2xl bg-black/95 backdrop-blur-sm border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 border-b border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {journeyStory.title}
                  </h2>
                  <p className="text-white/60">{journeyStory.start}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white transition-all duration-300 flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
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

                    <div className="space-y-6">
                      {journeyStory.timeline.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
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
                      {journeyStory.achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
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
                      })}
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
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
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }
);

export default AboutMeSection;
