import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Terminal, Sparkles, Code2, Users, Heart, Target, Shield,
  Lightbulb, BookOpen, Trophy, Briefcase, Award, Rocket,
  Calendar, X, ArrowRight, Github, Linkedin, Mail,
  ExternalLink, FileText, MapPin, Zap, ChevronRight,
} from "lucide-react";
import jhankhar_photo from "../assets/jhankhar_mahbub.jpeg";
import profile from "../assets/my-profile.png";
import { useApi } from "../hooks/useApi";

/* ─── Dot grid background (shared style) ─── */
const DOT_BG = {
  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

/* ─── Fade-up animation helper ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

/* ─── Journey Modal ─── */
const JourneyModal = memo(({ journeyStory, closeModal, modalRef, handleBackdropClick, handleCertificateClick }) => (
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
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl bg-black border border-white/10 overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-white/8 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-white/30" />
              <span className="text-[11px] font-mono text-white/30 tracking-[0.15em] uppercase">My Story</span>
            </div>
            <h2 className="text-xl font-bold text-white">{journeyStory.title}</h2>
            <p className="text-white/40 text-sm mt-1 leading-relaxed max-w-xl">{journeyStory.start}</p>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/6 transition-colors ml-4 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Timeline */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-3.5 h-3.5 text-white/30" />
                <span className="text-[11px] font-mono text-white/30 tracking-[0.15em] uppercase">Timeline</span>
              </div>

              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-3 top-2 bottom-2 w-px bg-white/8" />

                <div className="space-y-5">
                  {journeyStory.timeline.map((item, i) => {
                    const TIcon = item.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="relative"
                      >
                        {/* Dot */}
                        <div className="absolute -left-5 top-3.5 w-2 h-2 rounded-full bg-white/20 border border-white/10" />

                        <div className="p-4 rounded-xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/12 transition-all duration-200">
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-6 h-6 rounded-md bg-white/6 flex items-center justify-center shrink-0">
                              <TIcon className="w-3 h-3 text-white/50" />
                            </div>
                            <span className="font-mono text-[10px] text-white/30 tracking-widest">{item.year}</span>
                            <span className="text-white/15">·</span>
                            <span className="text-sm font-semibold text-white/80">{item.title}</span>
                          </div>
                          <p className="text-white/45 text-xs leading-relaxed pl-8">{item.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Achievements + Mentor */}
            <div className="space-y-6">
              {/* Achievements */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[11px] font-mono text-white/30 tracking-[0.15em] uppercase">Achievements</span>
                </div>
                <div className="space-y-3">
                  {journeyStory.achievements.map((ach, i) => {
                    const AIcon = ach.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.07 }}
                        onClick={() => handleCertificateClick(ach.link)}
                        className="group p-4 border border-white/6 bg-white/[0.02] rounded-xl cursor-pointer hover:border-white/15 hover:bg-white/[0.04] transition-all duration-200"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <AIcon className="w-3.5 h-3.5 text-white/40" />
                            <span className="text-xs font-semibold text-white/70">{ach.title}</span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white/50 shrink-0 transition-colors" />
                        </div>
                        <p className="text-white/35 text-[11px] leading-relaxed pl-5">{ach.description}</p>
                        <div className="mt-2 pl-5">
                          <span className="font-mono text-[9px] text-white/20 tracking-wider">{ach.date}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mentor */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[11px] font-mono text-white/30 tracking-[0.15em] uppercase">Mentor</span>
                </div>
                {journeyStory.mentors.map((mentor, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="p-4 border border-white/6 bg-white/[0.02] rounded-xl"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden shrink-0">
                        {mentor.avatar ? (
                          <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/30 text-sm font-bold bg-white/5">
                            {mentor.name[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white/75">{mentor.name}</div>
                        <div className="text-[10px] font-mono text-white/30">{mentor.role}</div>
                      </div>
                    </div>
                    <p className="text-white/40 text-[11px] leading-relaxed">{mentor.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </>
));

/* ─── Main component ─── */
const AboutMeSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentData, setContentData] = useState(null);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1, once: true });
  const { get: getContent } = useApi();

  useEffect(() => {
    getContent("/content").then((res) => {
      if (res?.data) setContentData(res.data);
    }).catch(() => {});
  }, [getContent]);

  const aboutData = useMemo(() => ({
    name: contentData?.name || "Md. Mahim Shariar",
    title: contentData?.title || "MERN Stack Developer",
    story: contentData?.bio ||
      `I help businesses and entrepreneurs turn ideas into fast, reliable web apps using the MERN stack. Whether you need a product built from scratch or an existing app improved, I deliver clean code and a smooth user experience — on time and without the headaches. ${contentData?.experienceYears || 3}+ years of real-world projects, not just tutorials.`,
    values: [
      { icon: Heart,   title: "Passion",       desc: "I love what I do, and it shows in every line of code." },
      { icon: Shield,  title: "Integrity",     desc: "Honest communication and reliable delivery, always." },
      { icon: Target,  title: "Excellence",    desc: "Never settling for 'good enough' in pursuit of greatness." },
      { icon: Users,   title: "Collaboration", desc: "The best solutions come from diverse perspectives." },
    ],
    social: {
      github:   contentData?.social?.github   || "#",
      linkedin: contentData?.social?.linkedin || "#",
      email:    contentData?.social?.email    || "#",
    },
    certificates:     contentData?.certificates  || [],
    resume:           contentData?.resume        || "",
    experienceYears:  contentData?.experienceYears || 3,
    projectCount:     contentData?.projectCount    || 50,
  }), [contentData]);

  const journeyStory = useMemo(() => ({
    title: "My Coding Journey",
    start: "During COVID lockdown in 2020, feeling bored at home, I convinced my parents to buy me a computer. At first, I was just playing games…",
    timeline: [
      { year: "2020",    title: "The Beginning",          description: "Got my first computer. Started playing games, but soon got bored. My cousin showed me some basic programming concepts.", icon: Lightbulb },
      { year: "2021",    title: "First Steps",            description: "Tried learning Python basics. Discovered Programming Hero course by Jhankar Mahbub. Started my web development journey.", icon: BookOpen },
      { year: "2022",    title: "Struggle & Breakthrough",description: "Faced many challenges learning web development. Finally completed the course and received my first certificate!", icon: Trophy },
      { year: "2023",    title: "First Internship",       description: "Selected for Programming Hero internship. Led a 6-member team to build 'Doctor Meet' — an online doctor consultation platform.", icon: Briefcase },
      { year: "2023",    title: "Recognition",            description: "Received recommendation letter. Started working at AK2 Technologies. Co-founded 'Trilance' agency with three other founders.", icon: Award },
      { year: "Present", title: "Current Journey",        description: `Working on real-world projects with ${contentData?.experienceYears || 3}+ years of experience, building a career in software development.`, icon: Rocket },
    ],
    achievements: aboutData.certificates.map((cert, i) => ({
      title:       i === 0 ? "Programming Hero Certificate" : "Recommendation Letter",
      description: i === 0 ? "Completed full web development course with excellence" : "Received special recommendation for outstanding performance",
      date: "2022–2023",
      icon: FileText,
      link: cert,
    })),
    mentors: [{ name: "Jhankar Mahbub", role: "Lead Instructor, Programming Hero", description: "Inspired me to start my programming journey", avatar: jhankhar_photo }],
  }), [aboutData.certificates, contentData]);

  const openModal  = useCallback(() => { setIsModalOpen(true);  document.body.style.overflow = "hidden"; }, []);
  const closeModal = useCallback(() => { setIsModalOpen(false); document.body.style.overflow = "auto";   }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape" && isModalOpen) closeModal(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isModalOpen, closeModal]);

  const handleBackdropClick = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) closeModal();
  }, [closeModal]);

  const handleCertificateClick = useCallback((link) => {
    if (link && link !== "#") window.open(link, "_blank");
  }, []);

  const STATS = [
    { value: `${aboutData.projectCount}+`,    label: "Projects" },
    { value: `${aboutData.experienceYears}+`, label: "Yrs exp"  },
    { value: "100%",                           label: "Committed"},
    { value: "∞",                              label: "Learning" },
  ];

  return (
    <div ref={sectionRef} id="about" className="relative py-24 bg-black overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={DOT_BG} />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">

        {/* ── Section header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-5">
            <Terminal className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[11px] font-mono text-white/40 tracking-[0.15em] uppercase">about me</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            Who I Am
          </h2>
          <p className="text-sm text-white/35 font-mono">
            <span className="text-white/15">{"// "}</span>
            developer · creator · problem solver
          </p>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — Photo + stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Photo card */}
            <div className="relative group">
              {/* Corner accents — outside overflow-hidden so they're visible */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-white/25 rounded-tl-sm z-10" />
              <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-white/25 rounded-tr-sm z-10" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-white/25 rounded-bl-sm z-10" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-white/25 rounded-br-sm z-10" />

              {/* Inner clipping frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] h-[460px]">
                <img
                  src={profile}
                  alt={aboutData.name}
                  className="w-full h-full object-cover object-[center_15%] group-hover:scale-[1.03] transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-xl font-bold text-white leading-tight">{aboutData.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-4 h-px bg-white/30" />
                    <span className="text-[11px] font-mono text-white/45 tracking-wider">{aboutData.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <MapPin className="w-3 h-3 text-white/30" />
                    <span className="text-[10px] font-mono text-white/30">Bangladesh · Remote</span>
                    <span className="ml-1 flex items-center gap-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/70" />
                      </span>
                      <span className="text-[10px] font-mono text-white/30">Open to work</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-1 py-4 rounded-xl border border-white/6 bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.04] transition-all duration-200"
                >
                  <span className="text-xl font-bold text-white/90">{s.value}</span>
                  <span className="text-[9px] font-mono text-white/25 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {[
                { icon: Github,   href: aboutData.social.github,               label: "GitHub"   },
                { icon: Linkedin, href: aboutData.social.linkedin,             label: "LinkedIn" },
                { icon: Mail,     href: `mailto:${aboutData.social.email}`,    label: "Email"    },
              ].map((s) => {
                const SIcon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center gap-2 px-4 py-2.5 border border-white/8 rounded-xl text-white/35 hover:text-white hover:border-white/20 hover:bg-white/4 transition-all duration-200"
                  >
                    <SIcon className="w-3.5 h-3.5" />
                    <span className="text-xs font-mono">{s.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT — Bio + values + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="flex flex-col gap-6"
          >
            {/* Bio card */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-3.5 h-3.5 text-white/30" />
                <span className="text-[11px] font-mono text-white/30 tracking-[0.15em] uppercase">My Journey</span>
              </div>
              <p className="text-white/55 text-[15px] leading-relaxed mb-5">
                {aboutData.story}
              </p>

              {/* Quick facts */}
              <div className="space-y-2.5 mb-6">
                {[
                  `${aboutData.experienceYears}+ years of real-world development experience`,
                  `${aboutData.projectCount}+ projects delivered across different domains`,
                  "Co-founded Trilance agency · Internship at Programming Hero",
                  "Currently building scalable products at AK2 Technologies",
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <ChevronRight className="w-3 h-3 text-white/20 mt-0.5 shrink-0" />
                    <span className="text-white/45 text-xs leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>

              {/* Full story button */}
              <button
                onClick={openModal}
                className="group w-full flex items-center justify-between px-5 py-3.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors duration-200"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4" />
                  Read Full Story
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>

            {/* Values card */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 mb-5">
                <Heart className="w-3.5 h-3.5 text-white/30" />
                <span className="text-[11px] font-mono text-white/30 tracking-[0.15em] uppercase">Core Values</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {aboutData.values.map((v, i) => {
                  const VIcon = v.icon;
                  return (
                    <motion.div
                      key={v.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.07 }}
                      className="group flex items-start gap-3 p-3.5 rounded-xl border border-white/6 bg-white/[0.015] hover:border-white/12 hover:bg-white/[0.035] transition-all duration-200"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/[0.06] group-hover:bg-white/10 flex items-center justify-center shrink-0 transition-colors duration-200">
                        <VIcon className="w-3.5 h-3.5 text-white/50 group-hover:text-white/75 transition-colors duration-200" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white/70 mb-0.5">{v.title}</div>
                        <div className="text-[10px] text-white/35 leading-relaxed">{v.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Terminal footer strip */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/6 bg-white/[0.02]">
              <Terminal className="w-3.5 h-3.5 text-white/20 shrink-0" />
              <span className="text-[11px] font-mono text-white/25 truncate">
                $ echo "Ready to build something amazing?" &amp;&amp; echo "Let's connect →"
              </span>
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-1.5 h-3.5 bg-white/30 rounded-sm shrink-0"
              />
            </div>
          </motion.div>
        </div>
      </div>

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

export default AboutMeSection;
