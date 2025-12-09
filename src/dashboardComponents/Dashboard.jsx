import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Briefcase,
  FileText,
  User,
  ArrowRight,
  Home,
  ChevronLeft,
  Shield,
  FolderOpen,
  Edit3,
  UserCheck,
  Settings,
  Bell,
  Database,
  Key,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: "security",
      title: "Security & Privacy",
      description:
        "Advanced security settings, encryption, and privacy controls for your account",
      icon: Shield,
      accentIcon: Lock,
      route: "/security",
      features: [
        { text: "Two-factor authentication", icon: Shield },
        { text: "Data encryption", icon: Lock },
        { text: "Privacy controls", icon: Key },
      ],
      stats: "Protected",
    },
    {
      id: "projects",
      title: "Projects",
      description:
        "Manage all your projects, collaborations, and team workflows",
      icon: FolderOpen,
      accentIcon: Briefcase,
      route: "/projects",
      features: [
        { text: "Active projects", icon: Briefcase },
        { text: "Team members", icon: User },
        { text: "Recent updates", icon: Settings },
      ],
      stats: "12 Active",
    },
    {
      id: "content",
      title: "Content",
      description: "Create, edit, and organize your content and documents",
      icon: FileText,
      accentIcon: Edit3,
      route: "/content",
      features: [
        { text: "Draft documents", icon: Edit3 },
        { text: "Published articles", icon: FileText },
        { text: "Content analytics", icon: Database },
      ],
      stats: "47 Items",
    },
    {
      id: "profile",
      title: "Profile",
      description: "Manage your personal information and account preferences",
      icon: User,
      accentIcon: UserCheck,
      route: "/profile",
      features: [
        { text: "Personal info", icon: UserCheck },
        { text: "Account settings", icon: Settings },
        { text: "Notifications", icon: Bell },
      ],
      stats: "Complete",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  // Hand-drawn border component matching navbar
  const HandDrawnBorder = ({
    isActive = false,
    color = "white",
    className = "",
  }) => (
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
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Animated background dots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto mb-8 relative z-10"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <motion.button
            onClick={handleBackToHome}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Back to Home</p>
              <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                Return to main page
              </p>
            </div>
          </motion.button>
        </motion.div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 max-w-xl mx-auto"
          >
            Manage your workspace. Click on any section to access detailed
            controls and settings.
          </motion.p>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const AccentIcon = card.accentIcon;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(card.route)}
                className="group relative cursor-pointer"
              >
                {/* Main Card */}
                <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500 group-hover:border-white/20 h-full">
                  {/* Hand-drawn Border */}
                  <HandDrawnBorder isActive={hoveredCard === card.id} />

                  {/* Terminal Dots */}
                  <div className="absolute top-3 right-3 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  </div>

                  {/* Icon Section */}
                  <div className="relative mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-500">
                        <Icon className="w-7 h-7 text-white/80" />
                      </div>

                      {/* Accent Icon */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                        animate={{
                          rotate: hoveredCard === card.id ? [0, 10, 0] : 0,
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <AccentIcon className="w-4 h-4 text-white/60" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    {/* Title and Stats */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-3">
                        {card.description}
                      </p>
                      <div className="inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60">
                        {card.stats}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3">
                      {card.features.map((feature, idx) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 transition-all duration-300"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                              <FeatureIcon className="w-4 h-4 text-white/60" />
                            </div>
                            <span className="text-sm text-white/80">
                              {feature.text}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-white/10 transition-all duration-300">
                      <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">
                        Click to access
                      </span>

                      <motion.div
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-500"
                        animate={{
                          x: hoveredCard === card.id ? [0, 3, 0] : 0,
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500" />
                </div>

                {/* Subtle Hover Glow */}
                <div className="absolute -inset-1 bg-white/5 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl -z-10" />
              </motion.div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white/40 text-sm">
                Select any card to navigate to its respective section
              </p>
              <p className="text-xs text-white/20 mt-1">
                All sections are secured and accessible 24/7
              </p>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleBackToHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </motion.button>

              <motion.button
                onClick={handleBackToHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 text-sm"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                          linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
