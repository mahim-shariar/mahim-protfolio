import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Search, Palette, Code2, TestTube, Rocket, Settings,
  ArrowRight, Sparkles,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Discovery & Analysis",
    description: "Deep dive into your business needs, goals, and target audience. We map out requirements, constraints, and success criteria before writing a single line of code.",
    icon: Search,
    tags: ["User Research", "Market Analysis", "Planning", "Strategy"],
  },
  {
    number: "02",
    title: "UI/UX Design",
    description: "Crafting intuitive interfaces and seamless user experiences. Every interaction is purposeful — wireframes, prototypes, and real user feedback before development begins.",
    icon: Palette,
    tags: ["Figma", "Wireframes", "Prototypes", "User Testing"],
  },
  {
    number: "03",
    title: "Development",
    description: "Building robust, scalable solutions with modern technologies. Clean architecture, readable code, and rigorous code reviews at every step.",
    icon: Code2,
    tags: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    number: "04",
    title: "Quality Assurance",
    description: "Rigorous testing to ensure flawless performance and security. Unit tests, integration tests, and real-device testing before anything ships.",
    icon: TestTube,
    tags: ["Jest", "Cypress", "Security Audit", "Performance"],
  },
  {
    number: "05",
    title: "Deployment",
    description: "Seamless launch with zero-downtime releases and full monitoring from day one. CI/CD pipelines, automated rollbacks, and live dashboards.",
    icon: Rocket,
    tags: ["Docker", "CI/CD", "Monitoring", "Analytics"],
  },
  {
    number: "06",
    title: "Support & Evolution",
    description: "Continuous improvement, updates, and scaling as your business grows. Your product stays fast, secure, and relevant long after launch.",
    icon: Settings,
    tags: ["Maintenance", "Updates", "Scaling", "Performance Tuning"],
  },
];

/* ─── Step node with rotating ring ─── */
const StepNode = ({ step, index, isInView }) => {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 180, damping: 14 }}
      className="relative z-10 flex items-center justify-center mt-6"
    >
      {/* Outer rotating dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute w-14 h-14 rounded-full border border-dashed border-white/[0.08]"
      />
      {/* Slower counter-rotate */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-10 h-10 rounded-full border border-dotted border-white/[0.06]"
      />
      {/* Pulse glow on enter */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0.6 }}
        animate={isInView ? { scale: 2.2, opacity: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="absolute w-10 h-10 rounded-full bg-white/10"
      />
      {/* Node circle */}
      <div className="relative w-10 h-10 rounded-full border border-white/15 bg-black flex items-center justify-center">
        <Icon className="w-4 h-4 text-white/50" />
        {/* Inner glow dot */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
          className="absolute inset-0 rounded-full bg-white/5"
        />
      </div>
    </motion.div>
  );
};

/* ─── Step card ─── */
const StepCard = ({ step, isInView, fromLeft }) => (
  <motion.div
    initial={{ opacity: 0, x: fromLeft ? -40 : 40, y: 10 }}
    animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    whileHover={{ y: -4, transition: { duration: 0.25 } }}
    className="group rounded-2xl border border-white/6 bg-white/[0.02] p-5 hover:border-white/14 hover:bg-white/[0.04] transition-colors duration-300 cursor-default"
  >
    {/* Number + title row */}
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="min-w-0">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18 }}
          className="font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase block"
        >
          Step {step.number}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.45 }}
          className="text-base font-bold text-white/85 mt-0.5 leading-snug"
        >
          {step.title}
        </motion.h3>
      </div>
      {/* Watermark number */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-[2.8rem] font-bold text-white/[0.04] leading-none select-none shrink-0 -mt-1 group-hover:text-white/[0.07] transition-colors duration-300"
      >
        {step.number}
      </motion.span>
    </div>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.28, duration: 0.5 }}
      className="text-white/38 text-[13px] leading-relaxed mb-4"
    >
      {step.description}
    </motion.p>

    {/* Tags — staggered */}
    <div className="flex flex-wrap gap-1.5">
      {step.tags.map((tag, ti) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.32 + ti * 0.07, duration: 0.3 }}
          className="px-2.5 py-1 border border-white/6 bg-white/[0.02] rounded-lg text-[10px] font-mono text-white/38 group-hover:border-white/10 group-hover:text-white/50 transition-colors duration-300"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

/* ─── One full step row ─── */
const StepRow = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.35, once: true });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_56px_1fr] items-start">

      {/* LEFT */}
      <div className={`py-5 pr-8 ${isEven ? "opacity-100" : "invisible pointer-events-none"}`}>
        {isEven && <StepCard step={step} isInView={isInView} fromLeft />}
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center">
        <StepNode step={step} index={index} isInView={isInView} />
        {index < STEPS.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="w-px flex-1 min-h-[80px] bg-gradient-to-b from-white/12 to-white/3 origin-top"
          />
        )}
      </div>

      {/* RIGHT */}
      <div className={`py-5 pl-8 ${!isEven ? "opacity-100" : "invisible pointer-events-none"}`}>
        {!isEven && <StepCard step={step} isInView={isInView} fromLeft={false} />}
      </div>
    </div>
  );
};

/* ─── Main ─── */
const ProcessSection = () => {
  const sectionRef  = useRef(null);
  const timelineRef = useRef(null);
  const isInView    = useInView(sectionRef, { amount: 0.05, once: true });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });

  /* Scroll-driven line */
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  /* Travelling glow dot */
  const dotY       = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Subtle radial glow centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.02), transparent)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 max-w-5xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[11px] font-mono text-white/40 tracking-[0.15em] uppercase">
              how i work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3"
          >
            Build. Test. Deploy.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-sm text-white/35 font-mono"
          >
            <span className="text-white/15">{"// "}</span>
            a 6-step methodology from idea to production
          </motion.p>
        </motion.div>

        {/* ── Desktop timeline ── */}
        <div ref={timelineRef} className="relative hidden md:block">

          {/* Base (ghost) line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.04]" />

          {/* Scroll-filled line */}
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top"
            style={{ scaleY: lineScaleY, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.12), rgba(255,255,255,0.03))" }}
          />
          {/* Glow blur copy */}
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] blur-[3px] origin-top opacity-40"
            style={{ scaleY: lineScaleY, background: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.1), transparent)" }}
          />

          {/* Travelling dot */}
          <motion.div
            style={{ top: dotY, opacity: dotOpacity }}
            className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-white/80" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-white/40 blur-[3px]" />
              <div className="absolute -inset-2 rounded-full bg-white/10 blur-[6px]" />
            </div>
          </motion.div>

          {/* Step rows */}
          {STEPS.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* ── Mobile single column ── */}
        <div className="md:hidden space-y-4">
          {STEPS.map((step, i) => {
            const MIcon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="relative pl-11"
              >
                <div className="absolute left-3.5 top-0 bottom-0 w-px bg-white/[0.06]" />
                <div className="absolute left-[7px] top-5 w-7 h-7 rounded-full border border-white/10 bg-black flex items-center justify-center">
                  <MIcon className="w-3 h-3 text-white/40" />
                </div>
                <StepCard step={step} isInView fromLeft />
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-20 relative rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1.5">Ready to Build Together?</h3>
              <p className="text-white/40 text-sm">Let's discuss your project and create something extraordinary.</p>
            </div>
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-2.5 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors duration-200 shrink-0"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>

          <div className="grid grid-cols-4 divide-x divide-white/[0.06] border-t border-white/6">
            {[
              { value: "50+",  label: "Projects"     },
              { value: "30+",  label: "Clients"      },
              { value: "3+",   label: "Years"        },
              { value: "100%", label: "Success Rate" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 py-5">
                <span className="text-xl font-bold text-white/90">{s.value}</span>
                <span className="text-[9px] font-mono text-white/25 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ProcessSection;
