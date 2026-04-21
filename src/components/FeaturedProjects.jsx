import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import {
  Terminal,
  ExternalLink,
  Github,
  X,
  ChevronRight,
  RefreshCw,
  Monitor,
} from "lucide-react";
import { useApi } from "../hooks/useApi";

export const HandDrawnBorder = memo(({ isActive, color = "white" }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <svg
      className="absolute top-0 left-0 w-full h-1 transition-all duration-500 ease-in-out"
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
        className="transition-all duration-500 ease-in-out"
      />
    </svg>
    <svg
      className="absolute top-0 right-0 w-1 h-full transition-all duration-500 ease-in-out"
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
        className="transition-all duration-500 ease-in-out"
      />
    </svg>
    <svg
      className="absolute bottom-0 left-0 w-full h-1 transition-all duration-500 ease-in-out"
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
        className="transition-all duration-500 ease-in-out"
      />
    </svg>
    <svg
      className="absolute top-0 left-0 w-1 h-full transition-all duration-500 ease-in-out"
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
        className="transition-all duration-500 ease-in-out"
      />
    </svg>
  </div>
));

const getImageUrl = (project) => {
  if (project.thumbnail) return project.thumbnail;
  if (project.images && project.images.length > 0) {
    const primary = project.images.find((img) => img.isPrimary);
    return primary ? primary.url : project.images[0].url;
  }
  return null;
};

const getDomain = (url) => {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

const formatIndex = (i) => String(i + 1).padStart(2, "0");

const dotPatternStyle = {
  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

const ProjectCard = memo(({ project, index, isFeatured, openModal }) => {
  const [imgErr, setImgErr] = useState(false);
  const imageUrl = getImageUrl(project);
  const category = project.category?.name || project.categoryName || "Project";

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springRotX = useSpring(rotX, { stiffness: 220, damping: 22, mass: 0.5 });
  const springRotY = useSpring(rotY, { stiffness: 220, damping: 22, mass: 0.5 });
  const shimmer = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.08), transparent 60%)`;

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
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        transformPerspective: 1000,
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => openModal(project)}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
        isFeatured ? "sm:col-span-2 h-[420px]" : "h-[300px]"
      }`}
    >
      {/* Holographic shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: shimmer }}
      />

      {imageUrl && !imgErr ? (
        <img
          src={imageUrl}
          alt={project.title}
          onError={() => setImgErr(true)}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 bg-linear-to-br from-gray-900 via-black to-gray-800"
          style={{ opacity: 1 }}
        >
          <div
            className="absolute inset-0"
            style={{ ...dotPatternStyle, opacity: 0.07 }}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

      <div className="absolute top-4 left-4 font-mono text-white/30 text-xs tracking-widest select-none">
        {formatIndex(index)}
      </div>

      <div className="absolute top-4 right-4">
        <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 text-[11px] font-medium tracking-wide">
          {category}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2">
        <p className="text-white/0 group-hover:text-white/70 text-sm leading-relaxed transition-all duration-300 translate-y-2 group-hover:translate-y-0 line-clamp-2">
          {project.description}
        </p>

        <h3
          className={`font-bold text-white leading-tight ${
            isFeatured ? "text-2xl lg:text-3xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {project.technologies.slice(0, 5).map((tech, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="w-1 h-1 rounded-full bg-white/25 inline-block" />}
                <span className="text-white/50 text-xs">{tech}</span>
              </React.Fragment>
            ))}
            {project.technologies.length > 5 && (
              <span className="text-white/30 text-xs">+{project.technologies.length - 5}</span>
            )}
          </div>
        )}

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
          <button
            onClick={(e) => { e.stopPropagation(); openModal(project); }}
            className="px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            View Case →
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium rounded-full hover:bg-white/20 transition-colors"
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

const ProjectModal = memo(({ project, onClose, modalRef }) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    setIframeKey((k) => k + 1);
    setIframeLoaded(false);
    setIframeError(false);
    setActiveTab("preview");
  }, [project?._id]);

  if (!project) return null;

  const category = project.category?.name || project.categoryName || "Project";

  const refreshIframe = () => {
    setIframeKey((k) => k + 1);
    setIframeLoaded(false);
    setIframeError(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          ref={modalRef}
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-6xl h-[88vh] rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="px-2.5 py-1 rounded-full bg-white/6 border border-white/8 text-white/50 text-[11px] font-medium tracking-wide shrink-0">
                {category}
              </span>
              <h2 className="text-white font-semibold text-base truncate">{project.title}</h2>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              {/* Tab switcher — only on < lg (on lg+ both panels are always visible) */}
              <div className="flex lg:hidden rounded-lg overflow-hidden border border-white/8">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${activeTab === "preview" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${activeTab === "details" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  Details
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/6 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Preview panel */}
            <div className={`flex-1 p-4 min-h-0 border-r border-white/8 ${activeTab === "preview" ? "flex" : "hidden lg:flex"} flex-col`}>
              <div className="flex-1 rounded-xl overflow-hidden border border-white/8 bg-[#111] flex flex-col min-h-0">
                {/* Browser bar */}
                <div className="flex items-center gap-3 px-4 py-2.5 bg-[#161616] border-b border-white/8 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 px-3 py-1 bg-black/50 rounded-md text-xs text-white/40 font-mono truncate border border-white/5">
                    {project.liveUrl ? getDomain(project.liveUrl) : "no-preview"}
                  </div>
                  {project.liveUrl && (
                    <button onClick={refreshIframe} className="p-1 text-white/30 hover:text-white/70 transition-colors" title="Refresh">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {/* Iframe area */}
                <div className="flex-1 relative min-h-0">
                  {project.liveUrl && !iframeError ? (
                    <>
                      {!iframeLoaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#111] z-10">
                          <div className="w-8 h-8 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
                          <span className="text-white/30 text-xs">Loading preview…</span>
                        </div>
                      )}
                      <iframe
                        key={iframeKey}
                        src={project.liveUrl}
                        title={project.title}
                        className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-300 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                        loading="eager"
                        referrerPolicy="no-referrer-when-downgrade"
                        onLoad={() => setIframeLoaded(true)}
                        onError={() => { setIframeError(true); setIframeLoaded(true); }}
                      />
                    </>
                  ) : iframeError ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                      <Monitor className="w-10 h-10 text-white/15" />
                      <div className="text-center">
                        <p className="text-white/50 text-sm mb-1">Preview blocked</p>
                        <p className="text-white/25 text-xs">The site may restrict embedding via X-Frame-Options</p>
                      </div>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open in New Tab
                      </a>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <Monitor className="w-10 h-10 text-white/10" />
                      <p className="text-white/25 text-xs">No live URL provided</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details panel */}
            <div className={`w-full lg:w-72 shrink-0 overflow-y-auto p-5 gap-5 ${activeTab === "details" ? "flex" : "hidden lg:flex"} flex-col`}>
              {project.description && (
                <div>
                  <h3 className="text-white/40 text-[11px] font-semibold uppercase tracking-widest mb-2">About</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>
                </div>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-white/40 text-[11px] font-semibold uppercase tracking-widest mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/8 rounded-lg text-white/60 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-white/40 text-[11px] font-semibold uppercase tracking-widest mb-2">Features</h3>
                  <ul className="flex flex-col gap-1.5">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/55 text-xs leading-relaxed">
                        <ChevronRight className="w-3 h-3 text-white/25 mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-auto flex flex-col gap-2 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-white text-black text-sm font-semibold rounded-xl text-center hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit Live Site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 border border-white/15 text-white/70 text-sm font-medium rounded-xl text-center hover:border-white/30 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Github className="w-3.5 h-3.5" />
                    View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

const FeaturedProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tabs, setTabs] = useState([{ id: "all", label: "All", count: 0 }]);
  const modalRef = useRef(null);
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { amount: 0.1, once: false });

  const { get: getCategories, loading: categoriesLoading } = useApi();
  const {
    get: getProjects,
    loading: projectsLoading,
    reset: resetProjects,
  } = useApi();

  const openModal = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      document.body.style.overflow = "auto";
    }, 300);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories("/categories/dropdown");
        if (result?.data) {
          const totalCount = result.data.reduce(
            (sum, c) => sum + (c.projectCount || 0),
            0
          );
          const allTab = { id: "all", label: "All", count: totalCount };
          const categoryTabs = result.data.map((c) => ({
            id: c._id,
            label: c.name,
            count: c.projectCount || 0,
            slug: c.slug,
          }));
          setTabs([allTab, ...categoryTabs]);
        }
      } catch {
        setTabs([{ id: "all", label: "All", count: 0 }]);
      }
    };
    fetchCategories();
  }, [getCategories]);

  useEffect(() => {
    const fetchProjects = async () => {
      resetProjects();
      try {
        const filters = {};
        if (selectedCategory && selectedCategory !== "all") {
          filters.category = selectedCategory;
        }
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = `/projects?${queryParams}`;
        const result = await getProjects(endpoint);
        if (result?.data) {
          setProjects(result.data);
        }
      } catch {
        setProjects([]);
      }
    };
    fetchProjects();
  }, [selectedCategory, getProjects, resetProjects]);

  const handlePillClick = useCallback((tabId) => {
    setSelectedCategory(tabId === "all" ? null : tabId);
  }, []);

  const isActive = (tabId) =>
    tabId === "all" ? !selectedCategory : selectedCategory === tabId;

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ ...dotPatternStyle, opacity: 0.025 }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/0 to-black pointer-events-none" />

      {/* Aurora orb */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ x: [0, 20, -25, 0], y: [0, -15, 20, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 650, height: 550, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)",
          filter: "blur(90px)", bottom: "5%", left: "-8%",
        }}
      />
      {/* Noise grain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025] mix-blend-overlay" style={{ zIndex: 1 }}>
        <filter id="proj-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#proj-noise)" />
      </svg>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 py-24"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-white/30 text-xs font-mono tracking-[0.3em] uppercase mb-4">
              Selected Work
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">
              Featured Projects
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {categoriesLoading ? (
              [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 rounded-full animate-pulse bg-white/3 border border-white/5"
                />
              ))
            ) : (
              tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handlePillClick(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    isActive(tab.id)
                      ? "bg-white text-black border-white"
                      : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/75"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`ml-1.5 text-[10px] ${isActive(tab.id) ? "opacity-50" : "opacity-40"}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {categoriesLoading || projectsLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl animate-pulse bg-white/3 border border-white/5 ${
                      i === 0 ? "sm:col-span-2 h-[420px]" : "h-[300px]"
                    }`}
                  />
                ))}
              </motion.div>
            ) : projects.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="col-span-full flex flex-col items-center justify-center py-24 gap-4"
              >
                <Terminal className="w-10 h-10 text-white/15" />
                <p className="text-white/40 text-sm">No projects found</p>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-4 py-1.5 rounded-full border border-white/10 text-white/50 text-sm hover:border-white/25 hover:text-white/75 transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory ?? "all"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {projects.map((project, i) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={i}
                    isFeatured={i === 0 && projects.length > 1}
                    openModal={openModal}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {isModalOpen && selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeModal}
          modalRef={modalRef}
        />
      )}
    </div>
  );
};

export default FeaturedProjects;
