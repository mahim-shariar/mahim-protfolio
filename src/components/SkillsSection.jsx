import React, { memo } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Terminal, Zap } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt, FaAws } from "react-icons/fa";
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiDocker,
  SiPostgresql, SiMongodb, SiRedis, SiExpress,
  SiFastapi, SiSocketdotio, SiVercel, SiGraphql,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

const CATEGORIES = [
  {
    id: "frontend", code: "01", label: "Frontend",
    skills: [
      { name: "React",       icon: FaReact,      level: 95 },
      { name: "TypeScript",  icon: SiTypescript, level: 90 },
      { name: "Next.js",     icon: SiNextdotjs,  level: 88 },
      { name: "Tailwind CSS",icon: SiTailwindcss,level: 92 },
    ],
  },
  {
    id: "backend", code: "02", label: "Backend",
    skills: [
      { name: "Node.js",   icon: FaNodeJs,      level: 92 },
      { name: "Express.js",icon: SiExpress,     level: 88 },
      { name: "FastAPI",   icon: SiFastapi,     level: 75 },
      { name: "GraphQL",   icon: SiGraphql,     level: 72 },
      { name: "Socket.io", icon: SiSocketdotio, level: 82 },
    ],
  },
  {
    id: "database", code: "03", label: "Database",
    skills: [
      { name: "MongoDB",    icon: SiMongodb,    level: 88 },
      { name: "PostgreSQL", icon: SiPostgresql, level: 78 },
      { name: "Redis",      icon: SiRedis,      level: 70 },
    ],
  },
  {
    id: "tools", code: "04", label: "Tools & Cloud",
    skills: [
      { name: "Git",     icon: FaGitAlt,  level: 95 },
      { name: "AWS",     icon: FaAws,     level: 85 },
      { name: "Docker",  icon: SiDocker,  level: 80 },
      { name: "Vercel",  icon: SiVercel,  level: 90 },
      { name: "VS Code", icon: VscCode,   level: 95 },
    ],
  },
];

const ALL_SKILLS = CATEGORIES.flatMap((c) => c.skills);
const MARQUEE_SKILLS = [...ALL_SKILLS, ...ALL_SKILLS, ...ALL_SKILLS];

const MarqueeChip = memo(({ skill }) => (
  <div className="flex items-center gap-2 px-3.5 py-1.5 mx-1.5 rounded-full border border-white/10 bg-white/3 flex-shrink-0">
    <skill.icon className="w-3.5 h-3.5 text-white/50" />
    <span className="text-xs font-medium text-white/40 whitespace-nowrap">{skill.name}</span>
  </div>
));

const SkillRow = memo(({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -8 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: index * 0.06 }}
    whileHover={{ x: 3 }}
    className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors duration-200"
  >
    <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-white/[0.05] group-hover:bg-white/10 transition-all duration-200 group-hover:scale-110">
      <skill.icon className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-white/55 group-hover:text-white/85 transition-colors duration-200 truncate">{skill.name}</span>
        <span className="text-[10px] font-mono text-white/20 group-hover:text-white/40 transition-colors duration-200 ml-2 flex-shrink-0">{skill.level}%</span>
      </div>
      {/* Enhanced bar with glow */}
      <div className="h-[2px] rounded-full bg-white/6 overflow-visible relative">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.6))" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: index * 0.06 + 0.2 }}
        >
          {/* Glow tip */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/70 blur-[2px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.06 + 1 }}
          />
        </motion.div>
      </div>
    </div>
  </motion.div>
));

/* ─── Category block with 3D tilt ─── */
const CategoryBlock = memo(({ category, index }) => {
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springRotX = useSpring(rotX, { stiffness: 250, damping: 22, mass: 0.5 });
  const springRotY = useSpring(rotY, { stiffness: 250, damping: 22, mass: 0.5 });
  const shimmer = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.05), transparent 60%)`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    rotX.set((y - 0.5) * -8);
    rotY.set((x - 0.5) * 8);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={{
        transformPerspective: 900,
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden hover:border-white/14 transition-colors duration-300"
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: shimmer }}
      />

      {/* Category header */}
      <div className="relative flex items-center gap-2.5 px-4 py-3 border-b border-white/6 bg-white/[0.02]">
        <span className="font-mono text-[10px] text-white/20">{category.code}</span>
        <span className="text-[11px] font-semibold tracking-widest uppercase text-white/45">{category.label}</span>
        <div className="flex-1 h-px bg-white/6" />
        <span className="font-mono text-[10px] text-white/15">{category.skills.length} skills</span>
      </div>

      {/* Skills */}
      <div className="relative p-2">
        {category.skills.map((skill, i) => (
          <SkillRow key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
});

const SkillsSection = () => (
  <div className="relative py-20 bg-black overflow-hidden">
    {/* Dot grid */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
    />

    {/* Aurora orb */}
    <motion.div
      className="absolute pointer-events-none"
      animate={{ x: [0, 25, -15, 0], y: [0, -20, 15, 0], scale: [1, 1.12, 0.92, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.045) 0%, transparent 70%)",
        filter: "blur(90px)", top: "10%", left: "-10%",
      }}
    />

    {/* Noise grain */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025] mix-blend-overlay" style={{ zIndex: 1 }}>
      <filter id="skills-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#skills-noise)" />
    </svg>

    <div className="relative z-10 container mx-auto px-4 max-w-5xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/3 mb-5">
          <Terminal className="w-3.5 h-3.5 text-white/40" />
          <span className="text-[11px] font-mono text-white/40 tracking-[0.15em] uppercase">tech stack</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">Tools I Work With</h2>
        <p className="text-sm text-white/35 font-mono">
          <span className="text-white/15">{"// "}</span>
          technologies used in daily development
        </p>
      </motion.div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden mb-10">
        <div className="absolute left-0 top-0 bottom-0 w-14 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-14 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex py-1"
        >
          {MARQUEE_SKILLS.map((skill, i) => (
            <MarqueeChip key={i} skill={skill} />
          ))}
        </motion.div>
      </div>

      <div className="relative mb-10">
        <div className="h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />
      </div>

      {/* Category grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat, i) => (
          <CategoryBlock key={cat.id} category={cat} index={i} />
        ))}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 pt-8 border-t border-white/[0.07]"
      >
        <div className="flex items-center justify-center gap-10 sm:gap-20">
          {[
            { value: ALL_SKILLS.length.toString(), label: "Technologies" },
            { value: "∞",                          label: "Always Learning" },
            { value: "100%",                        label: "Dedication" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-[10px] font-mono text-white/25 tracking-widest uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-6 text-white/20 text-xs font-mono">
          <Zap className="w-3 h-3 animate-pulse" />
          <span>always learning new technologies</span>
          <Zap className="w-3 h-3 animate-pulse" />
        </div>
      </motion.div>
    </div>
  </div>
);

export default SkillsSection;
