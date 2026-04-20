import React, { memo } from "react";
import { motion } from "framer-motion";
import { Terminal, Zap } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt, FaAws } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiExpress,
  SiFastapi,
  SiSocketdotio,
  SiVercel,
  SiGraphql,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

const CATEGORIES = [
  {
    id: "frontend",
    code: "01",
    label: "Frontend",
    skills: [
      { name: "React", icon: FaReact, level: 95 },
      { name: "TypeScript", icon: SiTypescript, level: 90 },
      { name: "Next.js", icon: SiNextdotjs, level: 88 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 92 },
    ],
  },
  {
    id: "backend",
    code: "02",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs, level: 92 },
      { name: "Express.js", icon: SiExpress, level: 88 },
      { name: "FastAPI", icon: SiFastapi, level: 75 },
      { name: "GraphQL", icon: SiGraphql, level: 72 },
      { name: "Socket.io", icon: SiSocketdotio, level: 82 },
    ],
  },
  {
    id: "database",
    code: "03",
    label: "Database",
    skills: [
      { name: "MongoDB", icon: SiMongodb, level: 88 },
      { name: "PostgreSQL", icon: SiPostgresql, level: 78 },
      { name: "Redis", icon: SiRedis, level: 70 },
    ],
  },
  {
    id: "tools",
    code: "04",
    label: "Tools & Cloud",
    skills: [
      { name: "Git", icon: FaGitAlt, level: 95 },
      { name: "AWS", icon: FaAws, level: 85 },
      { name: "Docker", icon: SiDocker, level: 80 },
      { name: "Vercel", icon: SiVercel, level: 90 },
      { name: "VS Code", icon: VscCode, level: 95 },
    ],
  },
];

const ALL_SKILLS = CATEGORIES.flatMap((c) => c.skills);
const MARQUEE_SKILLS = [...ALL_SKILLS, ...ALL_SKILLS, ...ALL_SKILLS];

const MarqueeChip = memo(({ skill }) => (
  <div className="flex items-center gap-2 px-3.5 py-1.5 mx-1.5 rounded-full border border-white/10 bg-white/[0.03] flex-shrink-0">
    <skill.icon className="w-3.5 h-3.5 text-white/50" />
    <span className="text-xs font-medium text-white/40 whitespace-nowrap">
      {skill.name}
    </span>
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
    <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-white/[0.05] group-hover:bg-white/10 transition-colors duration-200">
      <skill.icon className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-white/55 group-hover:text-white/85 transition-colors duration-200 truncate">
          {skill.name}
        </span>
        <span className="text-[10px] font-mono text-white/20 group-hover:text-white/35 transition-colors duration-200 ml-2 flex-shrink-0">
          {skill.level}%
        </span>
      </div>
      <div className="h-[2px] rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-white/25 to-white/55"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: index * 0.06 + 0.2 }}
        />
      </div>
    </div>
  </motion.div>
));

const CategoryBlock = memo(({ category, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden"
  >
    {/* Category header */}
    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
      <span className="font-mono text-[10px] text-white/20">{category.code}</span>
      <span className="text-[11px] font-semibold tracking-widest uppercase text-white/45">
        {category.label}
      </span>
      <div className="flex-1 h-px bg-white/[0.06]" />
      <span className="font-mono text-[10px] text-white/15">
        {category.skills.length} skills
      </span>
    </div>

    {/* Skills */}
    <div className="p-2">
      {category.skills.map((skill, i) => (
        <SkillRow key={skill.name} skill={skill} index={i} />
      ))}
    </div>
  </motion.div>
));

const SkillsSection = () => (
  <div className="relative py-20 bg-black overflow-hidden">
    {/* Dot grid */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />

    <div className="relative z-10 container mx-auto px-4 max-w-5xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-5">
          <Terminal className="w-3.5 h-3.5 text-white/40" />
          <span className="text-[11px] font-mono text-white/40 tracking-[0.15em] uppercase">
            tech stack
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
          Tools I Work With
        </h2>

        <p className="text-sm text-white/35 font-mono">
          <span className="text-white/15">{"// "}</span>
          technologies used in daily development
        </p>
      </motion.div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden mb-10">
        <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
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

      {/* Divider */}
      <div className="relative mb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
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
            { value: "∞", label: "Always Learning" },
            { value: "100%", label: "Dedication" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono text-white/25 tracking-widest uppercase">
                {stat.label}
              </div>
            </div>
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
