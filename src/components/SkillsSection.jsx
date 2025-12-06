import React from "react";
import { motion } from "framer-motion";
import { Terminal, Zap, Sparkles } from "lucide-react";
// Import React Icons
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaAws } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGraphql,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiKubernetes,
  SiJest,
  SiCypress,
  SiExpress,
  SiNestjs,
  SiFastapi,
  SiSocketdotio,
  SiVercel,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

const SkillsSection = () => {
  // All skills in one continuous array
  const skills = [
    { name: "React", icon: FaReact, level: 95 },
    { name: "TypeScript", icon: SiTypescript, level: 90 },
    { name: "Next.js", icon: SiNextdotjs, level: 88 },
    { name: "Node.js", icon: FaNodeJs, level: 92 },
    { name: "Tailwind CSS", icon: SiTailwindcss, level: 92 },
    { name: "MongoDB", icon: SiMongodb, level: 88 },
    { name: "Git", icon: FaGitAlt, level: 95 },
    { name: "AWS", icon: FaAws, level: 85 },
    { name: "Express", icon: SiExpress, level: 88 },
    { name: "FastAPI", icon: SiFastapi, level: 75 },
    { name: "Socket.io", icon: SiSocketdotio, level: 82 },
    { name: "Vercel", icon: SiVercel, level: 90 },
    { name: "VsCode", icon: VscCode, level: 90 },
  ];

  // Create extended array for smooth looping
  const extendedSkills = [...skills, ...skills, ...skills];

  // Hand-drawn underline effect
  const HandDrawnUnderline = ({ isActive }) => (
    <motion.div
      className="absolute -bottom-1 left-0 right-0 h-px overflow-hidden"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isActive ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <svg width="100%" height="2" className="overflow-visible">
        <path
          d="M0,1 Q10,0 20,1 T40,0.5 T60,1.5 T80,0.8 T100,1"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3,2"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
    </motion.div>
  );

  // Single skill badge component
  const SkillBadge = ({ skill, index }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/30 transition-all duration-500 ease-in-out min-w-[140px] mx-2 flex flex-col items-center justify-center"
      >
        {/* Icon container with subtle glow on hover */}
        <div className="relative mb-3">
          <skill.icon className="w-7 h-7 text-white/80 group-hover:text-white transition-all duration-500 ease-in-out" />

          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/5 blur-md"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Skill name with hand-drawn underline */}
        <div className="text-sm font-medium text-white/90 group-hover:text-white text-center relative transition-colors duration-500 ease-in-out">
          {skill.name}
          <HandDrawnUnderline isActive={true} />
        </div>

        {/* Level indicator - appears on hover */}
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div
            className="h-full bg-gradient-to-r from-white/40 via-white/60 to-white/40"
            style={{ width: `${skill.level}%` }}
          />
        </motion.div>

        {/* Subtle corner accents */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/40 transition-all duration-500" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 group-hover:border-white/40 transition-all duration-500" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 group-hover:border-white/40 transition-all duration-500" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/40 transition-all duration-500" />
      </motion.div>
    );
  };

  return (
    <div className="relative py-16 bg-black overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      {/* Animated grid lines in background */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full bg-white/30"
            style={{ top: `${i * 10}%` }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-white/30"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>

      <div className="relative z-20 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Decorative terminal icon */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <Terminal className="w-8 h-8 text-white/80" />
          </motion.div>

          {/* Title with sparkle accents */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-white/60" />
            <h2 className="text-4xl font-bold text-white tracking-tight">
              TECH STACK
            </h2>
            <Sparkles className="w-5 h-5 text-white/60" />
          </div>

          {/* Subtitle with hand-drawn underline */}
          <div className="relative inline-block">
            <p className="text-white/60 text-lg">
              Technologies I work with daily
            </p>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-px"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <svg width="100%" height="2" className="overflow-visible">
                <path
                  d="M0,1 Q30,0 60,1 T100,1"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                  strokeDasharray="4,3"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Top Marquee - Continuous right to left */}
        <div className="mb-8 relative">
          {/* Marquee container with fade edges */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

            <motion.div
              animate={{ x: ["0%", "-33.33%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex py-4"
            >
              {extendedSkills.map((skill, index) => (
                <SkillBadge key={`top-${index}`} skill={skill} index={index} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Marquee - Continuous left to right */}
        <div className="relative">
          {/* Marquee container with fade edges */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

            <motion.div
              animate={{ x: ["-33.33%", "0%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex py-4"
            >
              {extendedSkills.map((skill, index) => (
                <SkillBadge
                  key={`bottom-${index}`}
                  skill={skill}
                  index={index}
                />
              ))}
            </motion.div>
          </div>

          {/* Decorative terminal line at bottom */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="font-mono">
                Always learning new technologies
              </span>
              <Zap className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Minimalist stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[
              { value: skills.length, label: "TECHNOLOGIES" },
              { value: "∞", label: "CONTINUOUS LEARNING" },
              { value: "100%", label: "DEDICATION" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/50 tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsSection;
