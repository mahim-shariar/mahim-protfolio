import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Terminal,
  ExternalLink,
  Github,
  Sparkles,
  Zap,
  Code2,
  Globe,
  ShoppingBag,
  Server,
  Palette,
  Database,
  Cpu,
  FolderOpen,
  LayoutDashboard,
  Building,
  Eye,
  Code,
  ChevronRight,
  X,
  Users,
  Clock,
  Calendar,
  GitBranch,
  Layers,
  Cloud,
  Shield,
  PenTool,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  XCircle,
  Star,
  Image as ImageIcon,
  Monitor,
  Globe as GlobeIcon,
  Maximize2,
  Minimize2,
  RefreshCw,
  Zap as Lightning,
  Cpu as CpuIcon,
  Cloud as CloudIcon,
} from "lucide-react";
import { useApi } from "../hooks/useApi";
import { BsViewList } from "react-icons/bs";

// HandDrawnBorder component
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

// Modern Desktop Frame with black gradients
const ModernDesktopFrame = memo(
  ({
    children,
    url = null,
    onRefresh = null,
    isFullScreen = false,
    showLoading = false,
  }) => {
    const [showGlitch, setShowGlitch] = useState(false);

    useEffect(() => {
      if (!showLoading) {
        const interval = setInterval(() => {
          if (Math.random() > 0.95) {
            setShowGlitch(true);
            setTimeout(() => setShowGlitch(false), 100);
          }
        }, 5000);
        return () => clearInterval(interval);
      }
    }, [showLoading]);

    return (
      <div
        className={`relative bg-black/90 rounded-xl border border-gray-800 overflow-hidden w-full h-full`}
      >
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 relative">
          {showGlitch && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50 animate-pulse"></div>
          )}

          <div className="flex items-center gap-3 z-10">
            {/* Browser Dots */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>

            {/* URL Bar */}
            {url && (
              <div className="ml-3 px-4 py-2 bg-black/80 rounded-lg text-sm text-gray-400 font-mono flex-1 max-w-md truncate border border-gray-800 group hover:border-gray-700 transition-all duration-300">
                <span className="text-gray-500">https://</span>
                <span className="text-gray-300">{url}</span>
              </div>
            )}
          </div>

          {/* Browser Controls */}
          <div className="flex items-center gap-3 z-10">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-2 bg-black/50 hover:bg-black/80 border border-gray-800 rounded-lg text-gray-400 hover:text-gray-300 transition-all duration-300 group"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            )}

            {/* Preview Indicator */}
            <div className="flex items-center gap-2 px-3 py-2 bg-black/80 rounded-lg border border-gray-800">
              <Monitor className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-300 font-medium">
                Live Preview
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative h-[calc(100%-3.5rem)] bg-gradient-to-br from-black via-gray-900 to-black">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-gray-400/5 font-mono text-xs"
                initial={{ y: -20, x: Math.random() * 100 }}
                animate={{ y: "100%" }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
              </motion.div>
            ))}
          </div>

          {children}
        </div>
      </div>
    );
  }
);

// ProjectCard component with black gradients
const ProjectCard = React.memo(
  ({ project, index, openModal, isHovered, setIsHovered }) => {
    const projectKey = `project-${project._id}`;
    const [showIframe, setShowIframe] = useState(false);
    const [imageError, setImageError] = useState(false);
    const iframeRef = useRef(null);
    const [cardHover, setCardHover] = useState(false);

    // Get image URL
    const getImageUrl = () => {
      if (project.thumbnail) return project.thumbnail;
      if (project.images && project.images.length > 0) {
        const primaryImage = project.images.find((img) => img.isPrimary);
        return primaryImage ? primaryImage.url : project.images[0].url;
      }
      return null;
    };

    // Extract domain from URL
    const getDomainFromUrl = (url) => {
      if (!url) return "project-preview.com";
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace("www.", "");
      } catch {
        return url;
      }
    };

    const imageUrl = getImageUrl();

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="relative group"
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        onMouseEnter={() => {
          setCardHover(true);
          setIsHovered((prev) => ({
            ...prev,
            [projectKey]: true,
          }));
        }}
        onMouseLeave={() => {
          setCardHover(false);
          setIsHovered((prev) => ({
            ...prev,
            [projectKey]: false,
          }));
          setShowIframe(false);
        }}
      >
        {/* Project Card */}
        <div className="relative h-full overflow-hidden rounded-2xl bg-black/80 backdrop-blur-sm border border-gray-800 group-hover:border-gray-700 group-hover:bg-black/90 transition-all duration-500">
          {/* Black gradient effect on hover */}
          <div
            className={`absolute -inset-1 bg-gradient-to-r from-black/0 via-black/20 to-black/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              cardHover ? "opacity-100" : ""
            }`}
          ></div>

          <HandDrawnBorder
            isActive={isHovered[projectKey]}
            color={cardHover ? "white" : "white"}
          />

          {/* Project Preview Section */}
          <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {project.liveUrl && isHovered[projectKey] && showIframe ? (
              <div className="w-full h-full">
                <ModernDesktopFrame url={getDomainFromUrl(project.liveUrl)}>
                  <div className="relative w-full h-full bg-black flex items-center justify-center">
                    <iframe
                      ref={iframeRef}
                      src={project.liveUrl}
                      title={`${project.title} Preview`}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      style={{
                        transform: "scale(0.85)",
                        transformOrigin: "center center",
                      }}
                    />
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="relative z-10 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-gray-300 text-xs font-medium">
                          Click for full-screen preview
                        </p>
                      </div>
                    </div>
                  </div>
                </ModernDesktopFrame>
              </div>
            ) : (
              <div className="relative w-full h-full">
                {imageUrl && !imageError ? (
                  <>
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      onError={() => setImageError(true)}
                      loading="lazy"
                    />
                    {/* Hover overlay with black gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end p-6">
                      <div className="text-center mb-4">
                        <div className="relative inline-block mb-3">
                          <Monitor className="w-10 h-10 text-gray-400/80 mx-auto" />
                          <div className="absolute -inset-2 bg-black/30 blur-lg rounded-full"></div>
                        </div>
                        <p className="text-gray-300 text-sm font-medium mb-1">
                          Live Preview Available
                        </p>
                        <p className="text-gray-500 text-xs">
                          Experience it in real-time
                        </p>
                      </div>
                      <div className="flex gap-3">
                        {project.liveUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowIframe(true);
                            }}
                            className="px-4 py-2 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-black/90 hover:border-gray-600 transition-all duration-300 flex items-center gap-2 group"
                          >
                            <GlobeIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            <span className="text-sm font-medium">
                              Live Preview
                            </span>
                            <div className="ml-1 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(project);
                          }}
                          className="px-4 py-2 bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-black/70 transition-all duration-300 flex items-center gap-2 group"
                        >
                          <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">Full View</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    <div className="relative w-20 h-20 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-800 flex items-center justify-center">
                        <Monitor className="w-10 h-10 text-gray-700" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/5 to-transparent animate-scan"></div>
                      </div>
                      <motion.div
                        className="absolute -bottom-3 -right-3 w-16 h-12 bg-gray-900/90 border-2 border-gray-800 rounded-lg flex items-center justify-center"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                        </div>
                      </motion.div>
                    </div>
                    <span className="text-gray-500 text-sm text-center max-w-[200px]">
                      {project.liveUrl
                        ? "Hover for live preview"
                        : "Preview not available"}
                    </span>
                    {project.liveUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(project);
                        }}
                        className="mt-3 px-3 py-1.5 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-lg text-gray-400 hover:text-gray-300 hover:border-gray-700 transition-all duration-300 text-xs"
                      >
                        View Full Preview
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 relative">
            {/* Title */}
            <div className="relative mb-3 overflow-hidden flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>

              {/* Performance indicator */}
              {project.performance && (
                <div className="flex flex-col items-end">
                  <div className="text-xs text-gray-500 mb-1">Perf</div>
                  <div className="relative">
                    <div className="w-10 h-2 bg-gray-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gray-700 to-gray-600 rounded-full"
                        style={{ width: `${project.performance}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold absolute -right-4 -top-1">
                      {project.performance}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.technologies?.slice(0, 4).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="relative px-3 py-1.5 bg-black/50 border border-gray-800 rounded-lg text-xs text-gray-400 group-hover:text-gray-300 group-hover:bg-black/70 group-hover:border-gray-700 transition-all duration-300 cursor-default overflow-hidden group/tech"
                >
                  <span className="relative z-10">{tech}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/30 to-black/0 translate-x-[-100%] group-hover/tech:translate-x-[100%] transition-transform duration-700"></div>
                </span>
              ))}
              {project.technologies?.length > 4 && (
                <span className="px-3 py-1.5 bg-black/50 border border-gray-800 rounded-lg text-xs text-gray-600 hover:text-gray-500 transition-colors duration-300">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>

            {/* Stats */}
            {(project.timeline || project.teamSize) && (
              <div className="flex items-center gap-4 mb-5 text-xs">
                {project.timeline && (
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{project.timeline}</span>
                  </div>
                )}
                {project.teamSize && (
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>Team: {project.teamSize}</span>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Buttons */}
            <div className="pt-4 border-t border-gray-800 group-hover:border-gray-700 transition-all duration-300">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => openModal(project)}
                  className="relative px-4 py-2 bg-black/50 border border-gray-800 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-black/70 hover:border-gray-700 transition-all duration-300 flex items-center gap-2 group/btn"
                >
                  <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Details</span>
                  <div className="absolute -right-2 -top-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                  </div>
                </button>

                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-10 h-10 bg-black/50 border border-gray-800 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-black/70 hover:border-gray-700 transition-all duration-300 flex items-center justify-center group/link"
                      title="Live Preview"
                    >
                      <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                      <div className="absolute -inset-1 bg-black/30 rounded-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-10 h-10 bg-black/50 border border-gray-800 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-black/70 hover:border-gray-700 transition-all duration-300 flex items-center justify-center group/link"
                      title="View Code"
                    >
                      <Code className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                      <div className="absolute -inset-1 bg-black/30 rounded-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

// ProjectModal component with black gradients
const ProjectModal = React.memo(
  ({ isModalOpen, selectedProject, closeModal, modalRef }) => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [showIframe, setShowIframe] = useState(true);
    const [iframeError, setIframeError] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [iframeKey, setIframeKey] = useState(0);
    const iframeRef = useRef(null);
    const [showScanEffect, setShowScanEffect] = useState(true);

    // Get all image URLs
    const getAllImageUrls = () => {
      if (!selectedProject?.images || !Array.isArray(selectedProject.images))
        return [];
      return selectedProject.images.map((img) => img.url || img);
    };

    // Get primary image
    const getPrimaryImage = () => {
      if (selectedProject?.thumbnail) return selectedProject.thumbnail;
      const urls = getAllImageUrls();
      return urls.length > 0 ? urls[0] : null;
    };

    // Reset state
    useEffect(() => {
      if (isModalOpen && selectedProject?.liveUrl) {
        setShowIframe(true);
        setIframeLoaded(false);
        setIframeError(false);
        setIsFullScreen(false);
        setIframeKey((prev) => prev + 1);
        setShowScanEffect(true);

        const timer = setTimeout(() => {
          setShowScanEffect(false);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }, [isModalOpen, selectedProject]);

    // Get domain from URL
    const getDomainFromUrl = (url) => {
      if (!url) return "project-preview.com";
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace("www.", "");
      } catch {
        return url;
      }
    };

    // Handle iframe load
    const handleIframeLoad = () => {
      setIframeLoaded(true);
      setShowScanEffect(false);
    };

    // Handle iframe error
    const handleIframeError = () => {
      setIframeError(true);
      setShowScanEffect(false);
    };

    // Refresh iframe
    const refreshIframe = () => {
      setIframeLoaded(false);
      setIframeError(false);
      setIframeKey((prev) => prev + 1);
      setShowScanEffect(true);
    };

    // Toggle full screen
    const toggleFullScreen = () => {
      setIsFullScreen(!isFullScreen);
    };

    if (!isModalOpen || !selectedProject) return null;

    const imageUrls = getAllImageUrls();
    const primaryImage = getPrimaryImage();

    return (
      <AnimatePresence>
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
            onClick={closeModal}
          >
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>
          </motion.div>

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              key="modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className={`relative ${
                isFullScreen ? "w-full h-full" : "w-full max-w-7xl h-[90vh]"
              } rounded-2xl bg-black/95 backdrop-blur-sm border border-gray-800 overflow-hidden shadow-2xl flex flex-col`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div
                  className="absolute inset-0 border-2 border-transparent animate-border-spin rounded-2xl"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, #333, transparent)`,
                    mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                    WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                  }}
                ></div>
              </div>

              <HandDrawnBorder isActive={true} color="white" />

              {/* Modal Header */}
              <div className="relative p-6 border-b border-gray-800 flex-shrink-0 flex items-center justify-between bg-gradient-to-r from-black via-gray-900 to-black">
                <div className="flex-1 pr-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 bg-black/80 backdrop-blur-sm rounded-lg border border-gray-700">
                      <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                        PROJECT
                      </span>
                    </div>
                    {selectedProject.isFeatured && (
                      <div className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-lg border border-yellow-500/30">
                        <span className="text-xs font-medium text-yellow-300 uppercase tracking-wider flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleFullScreen}
                    className="p-2 bg-black/50 hover:bg-black/80 border border-gray-800 rounded-lg text-gray-400 hover:text-gray-300 transition-all duration-300 flex-shrink-0 hover:border-gray-700 group"
                    title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                  >
                    {isFullScreen ? (
                      <Minimize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    ) : (
                      <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    )}
                  </button>

                  <button
                    onClick={closeModal}
                    className="p-2 bg-black/50 hover:bg-black/80 border border-gray-800 rounded-lg text-gray-400 hover:text-gray-300 transition-all duration-300 flex-shrink-0 hover:border-gray-700 group"
                  >
                    <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Iframe Preview Section */}
                <div
                  className={`${isFullScreen ? "w-full" : "lg:w-2/3"} p-6 ${
                    !isFullScreen && "border-r border-gray-800"
                  } overflow-hidden`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <div className="relative">
                          <GlobeIcon className="w-5 h-5 text-gray-400" />
                          <div className="absolute -inset-2 bg-black/30 blur-sm rounded-full"></div>
                        </div>
                        Live Preview
                      </h3>
                      {showScanEffect && (
                        <div className="flex items-center gap-2 px-2 py-1 bg-black/50 border border-gray-800 rounded">
                          <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-400">
                            SYNCING...
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {!isFullScreen && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowIframe(true)}
                            className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 flex items-center gap-2 ${
                              showIframe
                                ? "bg-black/80 text-white border border-gray-700"
                                : "bg-black/50 text-gray-400 border border-gray-800 hover:bg-black/70"
                            }`}
                          >
                            <GlobeIcon className="w-3 h-3" />
                            Live Site
                          </button>
                          <button
                            onClick={() => setShowIframe(false)}
                            className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 flex items-center gap-2 ${
                              !showIframe
                                ? "bg-black/80 text-white border border-gray-700"
                                : "bg-black/50 text-gray-400 border border-gray-800 hover:bg-black/70"
                            }`}
                          >
                            <ImageIcon className="w-3 h-3" />
                            Screenshots
                          </button>
                        </div>
                      )}

                      {showIframe && selectedProject.liveUrl && (
                        <button
                          onClick={refreshIframe}
                          className="p-2 bg-black/50 hover:bg-black/80 border border-gray-800 rounded-lg text-gray-400 hover:text-gray-300 transition-all duration-300 hover:border-gray-700 group"
                          title="Refresh Preview"
                        >
                          <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                      )}
                    </div>
                  </div>

                  {showIframe && selectedProject.liveUrl ? (
                    <div className="relative h-full min-h-[500px] rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-br from-black via-gray-900 to-black">
                      <ModernDesktopFrame
                        url={getDomainFromUrl(selectedProject.liveUrl)}
                        onRefresh={refreshIframe}
                        isFullScreen={isFullScreen}
                        showLoading={!iframeLoaded && !iframeError}
                      >
                        <div className="relative w-full h-full bg-black flex items-center justify-center">
                          {showScanEffect && (
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/5 to-transparent animate-scan z-20 pointer-events-none"></div>
                          )}

                          {!iframeLoaded && !iframeError && (
                            <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center z-10">
                              <div className="relative mb-6">
                                <div className="w-20 h-20 border-4 border-gray-800 border-t-gray-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="relative">
                                    <CpuIcon className="w-10 h-10 text-gray-600/60" />
                                    <div className="absolute -inset-4 bg-black/30 blur-lg rounded-full"></div>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-400 text-sm mt-4 font-medium">
                                Loading live preview...
                              </p>
                              <p className="text-gray-600 text-xs mt-2 max-w-md text-center">
                                Establishing secure connection to{" "}
                                {getDomainFromUrl(selectedProject.liveUrl)}
                              </p>
                              <div className="flex items-center gap-2 mt-4">
                                <div className="w-2 h-2 bg-gray-700 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-75"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                              </div>
                            </div>
                          )}

                          {iframeError ? (
                            <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-8">
                              <div className="relative w-24 h-24 mb-6">
                                <div className="absolute inset-0 bg-black/30 rounded-full animate-pulse"></div>
                                <div className="relative z-10 w-full h-full flex items-center justify-center">
                                  <CloudIcon className="w-full h-full text-gray-600/40" />
                                  <div className="absolute -inset-4 bg-black/30 blur-lg rounded-full"></div>
                                </div>
                              </div>
                              <p className="text-gray-400 text-center mb-4 max-w-md">
                                Unable to establish connection. The site might
                                have CORS restrictions or network issues.
                              </p>
                              <div className="flex gap-3">
                                <button
                                  onClick={refreshIframe}
                                  className="px-4 py-2 bg-black/80 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-black/90 transition-all duration-300 flex items-center gap-2"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                  Retry Connection
                                </button>
                                <a
                                  href={selectedProject.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Open Externally
                                </a>
                              </div>
                            </div>
                          ) : (
                            <iframe
                              key={iframeKey}
                              ref={iframeRef}
                              src={selectedProject.liveUrl}
                              title={`${selectedProject.title} Live Preview`}
                              className={`absolute top-0 left-0 w-full h-full border-0 ${
                                iframeLoaded ? "opacity-100" : "opacity-0"
                              }`}
                              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                              loading="eager"
                              referrerPolicy="no-referrer-when-downgrade"
                              onLoad={handleIframeLoad}
                              onError={handleIframeError}
                              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                              style={{
                                transform: "scale(0.9)",
                                transformOrigin: "center center",
                              }}
                            />
                          )}
                        </div>
                      </ModernDesktopFrame>
                    </div>
                  ) : (
                    <div className="h-full min-h-[500px] bg-gradient-to-br from-gray-900/50 via-black/80 to-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
                      {imageUrls.length > 0 ? (
                        <div className="h-full overflow-y-auto p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {imageUrls.map((image, index) => (
                              <div
                                key={index}
                                className="relative rounded-xl overflow-hidden border border-gray-800 group hover:border-gray-700 transition-all duration-300"
                              >
                                <img
                                  src={image}
                                  alt={`${selectedProject.title} screenshot ${
                                    index + 1
                                  }`}
                                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                                  <button
                                    onClick={() => window.open(image, "_blank")}
                                    className="px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-black/90 transition-all duration-300 text-sm"
                                  >
                                    View Full Size
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center p-8">
                          <div className="relative w-24 h-24 mb-4">
                            <ImageIcon className="w-full h-full text-gray-700" />
                            <div className="absolute -inset-4 bg-black/30 blur-lg rounded-full"></div>
                          </div>
                          <p className="text-gray-500 text-center">
                            No screenshots available for this project.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Details Section */}
                {!isFullScreen && (
                  <div className="lg:w-1/3 p-6 overflow-y-auto bg-gradient-to-b from-black/60 to-black/40">
                    {/* Full Description */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-gray-700 to-gray-600 rounded-full"></div>
                        Project Overview
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-gray-700 to-gray-600 rounded-full"></div>
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies?.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-black/50 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-gray-300 hover:border-gray-700 transition-all duration-300 hover:scale-105"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats Grid */}
                    {(selectedProject.complexity ||
                      selectedProject.security ||
                      selectedProject.performance ||
                      selectedProject.timeline ||
                      selectedProject.teamSize) && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <div className="w-1 h-4 bg-gradient-to-b from-gray-700 to-gray-600 rounded-full"></div>
                          Project Stats
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedProject.complexity && (
                            <div className="bg-black/50 border border-gray-800 rounded-lg p-3">
                              <div className="text-xs text-gray-500 mb-1">
                                Complexity
                              </div>
                              <div className="text-sm text-white font-medium">
                                {selectedProject.complexity}
                              </div>
                            </div>
                          )}
                          {selectedProject.security && (
                            <div className="bg-black/50 border border-gray-800 rounded-lg p-3">
                              <div className="text-xs text-gray-500 mb-1">
                                Security
                              </div>
                              <div className="text-sm text-white font-medium">
                                {selectedProject.security}
                              </div>
                            </div>
                          )}
                          {selectedProject.performance && (
                            <div className="bg-black/50 border border-gray-800 rounded-lg p-3">
                              <div className="text-xs text-gray-500 mb-1">
                                Performance
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-gray-700 to-gray-600 rounded-full"
                                    style={{
                                      width: `${selectedProject.performance}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-400 font-bold">
                                  {selectedProject.performance}%
                                </span>
                              </div>
                            </div>
                          )}
                          {selectedProject.timeline && (
                            <div className="bg-black/50 border border-gray-800 rounded-lg p-3">
                              <div className="text-xs text-gray-500 mb-1">
                                Timeline
                              </div>
                              <div className="text-sm text-white font-medium">
                                {selectedProject.timeline}
                              </div>
                            </div>
                          )}
                          {selectedProject.teamSize && (
                            <div className="bg-black/50 border border-gray-800 rounded-lg p-3">
                              <div className="text-xs text-gray-500 mb-1">
                                Team Size
                              </div>
                              <div className="text-sm text-white font-medium">
                                {selectedProject.teamSize}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    {selectedProject.features &&
                      selectedProject.features.length > 0 && (
                        <div>
                          <h4 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                            <div className="w-1 h-4 bg-gradient-to-b from-gray-700 to-gray-600 rounded-full"></div>
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {selectedProject.features.map((feature, index) => (
                              <li
                                key={index}
                                className="text-gray-400 flex items-start gap-2"
                              >
                                <ChevronRight className="w-4 h-4 text-gray-600/60 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {/* Challenges */}
                    {selectedProject.challenges &&
                      selectedProject.challenges.length > 0 && (
                        <div>
                          <h4 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                            <div className="w-1 h-4 bg-gradient-to-b from-gray-700 to-gray-600 rounded-full"></div>
                            Challenges
                          </h4>
                          <ul className="space-y-2">
                            {selectedProject.challenges.map(
                              (challenge, index) => (
                                <li
                                  key={index}
                                  className="text-gray-400 flex items-start gap-2"
                                >
                                  <Lightning className="w-3 h-3 text-gray-600/60 mt-1 flex-shrink-0" />
                                  <span>{challenge}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="relative p-6 border-t border-gray-800 bg-gradient-to-r from-black via-gray-900 to-black flex-shrink-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-black/80 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-black/90 transition-all duration-300 flex items-center gap-2 group"
                      >
                        <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        Visit Live Site
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 group"
                      >
                        <Code className="w-4 h-4" />
                        View Source Code
                      </a>
                    )}
                  </div>

                  {/* Iframe Status */}
                  {showIframe && selectedProject.liveUrl && (
                    <div className="text-sm flex items-center gap-2">
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                          iframeLoaded
                            ? "bg-black/50 border border-gray-800"
                            : iframeError
                            ? "bg-black/50 border border-gray-800"
                            : "bg-black/50 border border-gray-800"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            iframeLoaded
                              ? "bg-gray-600"
                              : iframeError
                              ? "bg-gray-700"
                              : "bg-gray-600"
                          } animate-pulse`}
                        ></div>
                        <span
                          className={
                            iframeLoaded
                              ? "text-gray-400"
                              : iframeError
                              ? "text-gray-500"
                              : "text-gray-400"
                          }
                        >
                          {iframeLoaded
                            ? "Connected"
                            : iframeError
                            ? "Connection Failed"
                            : "Connecting..."}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      </AnimatePresence>
    );
  }
);

// Main FeaturedProjects Component
const FeaturedProjects = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState({});
  const modalRef = useRef(null);
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.1,
    once: false,
  });

  // Use API hook
  const {
    get: getCategories,
    data: categoriesData,
    loading: categoriesLoading,
  } = useApi();

  const {
    get: getProjects,
    data: projectsData,
    loading: projectsLoading,
    reset: resetProjects,
  } = useApi();

  // Default tabs
  const defaultTabs = useMemo(
    () => [
      { id: "all", label: "ALL", icon: Terminal, count: 8 },
      { id: "portfolio", label: "PORTFOLIO", icon: Globe, count: 3 },
      { id: "ecommerce", label: "ECOMMERCE", icon: ShoppingBag, count: 2 },
      { id: "dashboard", label: "DASHBOARD", icon: LayoutDashboard, count: 2 },
      { id: "management", label: "MANAGEMENT", icon: Building, count: 1 },
    ],
    []
  );

  // State
  const [tabs, setTabs] = useState(defaultTabs);
  const [projects, setProjects] = useState([]);
  const [totalProjectsCount, setTotalProjectsCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Memoized functions
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

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories("/categories/dropdown");

        if (result?.data) {
          const apiTabs = result.data.map((category) => {
            let icon;
            const slug = category.slug.toLowerCase();
            switch (slug) {
              case "portfolio":
              case "portfolios":
                icon = Globe;
                break;
              case "ecommerce":
              case "e-commerce":
                icon = ShoppingBag;
                break;
              case "dashboard":
              case "dashboards":
                icon = LayoutDashboard;
                break;
              case "management":
              case "management-systems":
                icon = Building;
                break;
              case "web-app":
              case "web-applications":
                icon = Server;
                break;
              case "mobile-app":
              case "mobile-applications":
                icon = Cpu;
                break;
              case "design":
              case "design-systems":
                icon = Palette;
                break;
              case "api":
              case "apis":
                icon = Cloud;
                break;
              case "database":
              case "databases":
                icon = Database;
                break;
              case "ai":
              case "artificial-intelligence":
                icon = Sparkles;
                break;
              case "cloud":
              case "cloud-services":
                icon = Cloud;
                break;
              case "security":
              case "security-systems":
                icon = Shield;
                break;
              default:
                icon = Terminal;
            }

            return {
              id: category._id,
              label: category.name.toUpperCase(),
              icon: icon,
              count: category.projectCount || 0,
              color: category.color || "#FFFFFF",
              _id: category._id,
              slug: category.slug,
              originalData: category,
            };
          });

          const totalProjects = apiTabs.reduce(
            (sum, tab) => sum + (tab.count || 0),
            0
          );
          const allTab = {
            id: "all",
            label: "ALL",
            icon: Terminal,
            count: totalProjects,
            _id: "all",
          };

          setTabs([allTab, ...apiTabs]);
          setTotalProjectsCount(totalProjects);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setTabs(defaultTabs);
      }
    };

    fetchCategories();
  }, [getCategories, defaultTabs]);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      resetProjects();

      try {
        const filters = {};

        if (selectedCategory && selectedCategory !== "all") {
          filters.category = selectedCategory;
        }

        if (searchQuery) {
          filters.search = searchQuery;
        }

        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = `/projects?${queryParams}`;

        const result = await getProjects(endpoint);

        if (result?.data) {
          setProjects(result.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, [selectedCategory, searchQuery, getProjects, resetProjects]);

  // Handle tab click
  const handleTabClick = useCallback(
    async (index) => {
      setActiveTab(index);
      const selectedTab = tabs[index];

      if (selectedTab.id === "all") {
        setSelectedCategory(null);
      } else {
        setSelectedCategory(selectedTab.id);
      }
    },
    [tabs]
  );

  // Handle category filter
  const handleCategorySelect = useCallback(
    (categoryId) => {
      setSelectedCategory(categoryId === "all" ? null : categoryId);
      setCategoryFilterOpen(false);

      const tabIndex = tabs.findIndex(
        (tab) => tab.id === (categoryId === "all" ? "all" : categoryId)
      );
      if (tabIndex !== -1) {
        setActiveTab(tabIndex);
      }
    },
    [tabs]
  );

  // Clear filters
  const clearFilters = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery("");
    setActiveTab(0);
  }, []);

  // Determine visible tabs
  const visibleTabs = showAllCategories ? tabs : tabs.slice(0, 5);

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

  // Floating particles
  const FloatingBinaryParticles = React.memo(() => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 15 + 8;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute text-gray-400/10 font-mono"
            style={{
              fontSize: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: "-50px",
            }}
            initial={{ y: 0 }}
            animate={{
              y: ["-50px", "calc(100vh + 50px)"],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        );
      })}
    </div>
  ));

  // Pulsating orbs
  const PulsatingOrbs = React.memo(() => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(3)].map((_, i) => {
        const size = Math.random() * 200 + 100;
        const duration = Math.random() * 8 + 4;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                "radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.01, 0.04, 0.01],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  ));

  // Matrix background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let drops = [];

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const fontSize = 12;
      const columns = Math.floor(rect.width / fontSize);
      drops = Array(columns).fill(0);
    };

    setCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize();
    });

    resizeObserver.observe(canvas);

    const chars = "01";
    const fontSize = 12;
    const columns = Math.floor(
      canvas.width / (fontSize * (window.devicePixelRatio || 1))
    );

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `400 ${fontSize}px monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const opacity = Math.max(0, 1 - (y / canvas.height) * 2);

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
        ctx.fillText(char, x, y);

        drops[i] += 0.8;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="py-20"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-5"
        />

        <FloatingBinaryParticles />
        <PulsatingOrbs />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute top-8 right-8 z-30 hidden lg:block"
        >
          <PenTool className="w-6 h-6 text-white/10" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-block mb-8">
              <motion.div
                variants={itemVariants}
                className="relative bg-black/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 inline-block group hover:bg-black/80 transition-all duration-500"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, header: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, header: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.header} />

                <div className="flex gap-1.5 mb-6 justify-center">
                  {[0, 0.2, 0.4].map((delay, index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-2 rounded-full bg-white/20"
                      animate={{ scale: [1, 1.2, 1] }}
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
                  FEATURED PROJECTS
                </motion.h1>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center gap-3 mt-6"
                >
                  <Terminal className="w-5 h-5 text-white/40" />
                  <span className="text-white/40 font-mono text-sm">
                    $ cat featured_work.md
                  </span>
                </motion.div>
              </motion.div>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-white/60 text-lg max-w-2xl mx-auto font-light"
            >
              Showcasing featured web applications across different domains
            </motion.p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-auto md:flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-gray-700 focus:bg-black/80 transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-300"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="relative w-full md:w-auto">
                <button
                  onClick={() => setCategoryFilterOpen(!categoryFilterOpen)}
                  className="w-full md:w-auto px-6 py-3 bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl text-white/60 hover:text-white hover:bg-black/80 hover:border-gray-700 transition-all duration-300 flex items-center gap-3 justify-center"
                >
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">
                    {selectedCategory
                      ? tabs.find((t) => t.id === selectedCategory)?.label ||
                        "Filter"
                      : "All Categories"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      categoryFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {categoryFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-full md:w-64 bg-black/95 backdrop-blur-sm border border-gray-800 rounded-xl shadow-2xl z-40 overflow-hidden"
                    >
                      <div className="p-2">
                        <button
                          onClick={() => handleCategorySelect("all")}
                          className={`w-full px-4 py-3 rounded-lg text-left flex items-center justify-between transition-all duration-300 ${
                            !selectedCategory
                              ? "bg-black/80 text-white"
                              : "text-white/60 hover:bg-black/80 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Terminal className="w-4 h-4" />
                            <span className="font-medium">All Categories</span>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-black/80">
                            {totalProjectsCount}
                          </span>
                        </button>

                        <div className="h-px bg-gray-800 my-2" />

                        {tabs.slice(1).map((category) => (
                          <button
                            key={category._id}
                            onClick={() => handleCategorySelect(category.id)}
                            className={`w-full px-4 py-3 rounded-lg text-left flex items-center justify-between transition-all duration-300 ${
                              selectedCategory === category.id
                                ? "bg-black/80 text-white"
                                : "text-white/60 hover:bg-black/80 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <category.icon className="w-4 h-4" />
                              <span className="font-medium">
                                {category.label}
                              </span>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-black/80">
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {(selectedCategory || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="w-full md:w-auto px-6 py-3 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-xl text-white/60 hover:text-white hover:bg-black/90 hover:border-gray-700 transition-all duration-300 flex items-center gap-3 justify-center"
                >
                  <X className="w-5 h-5" />
                  <span className="font-medium">Clear Filters</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Active Filters */}
          {(selectedCategory || searchQuery) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white/60 text-sm">Active filters:</span>

                {selectedCategory && (
                  <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg px-3 py-1.5">
                    <span className="text-white/80 text-sm">
                      Category:{" "}
                      {tabs.find((t) => t.id === selectedCategory)?.label ||
                        selectedCategory}
                    </span>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-white/40 hover:text-white transition-colors duration-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {searchQuery && (
                  <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg px-3 py-1.5">
                    <span className="text-white/80 text-sm">
                      Search: "{searchQuery}"
                    </span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-white/40 hover:text-white transition-colors duration-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Tabs */}
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categoriesLoading ? (
              [...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative px-6 py-3 rounded-xl backdrop-blur-sm border border-gray-800 animate-pulse bg-black/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white/10 rounded"></div>
                    <div className="w-16 h-4 bg-white/10 rounded"></div>
                    <div className="w-6 h-4 bg-white/10 rounded-full"></div>
                  </div>
                </motion.div>
              ))
            ) : (
              <>
                {visibleTabs.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive =
                    (tab.id === "all" && !selectedCategory) ||
                    selectedCategory === tab.id;
                  const tabKey = `tab-${tab.id}`;

                  return (
                    <motion.button
                      key={tab.id || index}
                      variants={itemVariants}
                      onClick={() => handleTabClick(index)}
                      className={`relative px-6 py-3 rounded-xl backdrop-blur-sm border flex items-center gap-3 transition-all duration-300 group ${
                        isActive
                          ? "bg-black/80 border-gray-700 text-white"
                          : "bg-black/60 border-gray-800 text-white/60 hover:bg-black/80 hover:border-gray-700 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() =>
                        setIsHovered((prev) => ({ ...prev, [tabKey]: true }))
                      }
                      onMouseLeave={() =>
                        setIsHovered((prev) => ({ ...prev, [tabKey]: false }))
                      }
                    >
                      <HandDrawnBorder
                        isActive={isHovered[tabKey] || isActive}
                      />

                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      />
                      <span className="font-medium text-sm tracking-wider">
                        {tab.label}
                      </span>
                      <motion.span
                        className={`text-xs px-2 py-1 rounded-full transition-colors ${
                          isActive ? "bg-black/80" : "bg-black/60"
                        }`}
                        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {tab.count}
                      </motion.span>
                    </motion.button>
                  );
                })}

                {tabs.length > 5 && (
                  <motion.button
                    variants={itemVariants}
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className={`relative px-4 py-3 rounded-xl backdrop-blur-sm border flex items-center gap-2 transition-all duration-300 ${
                      showAllCategories
                        ? "bg-black/80 border-gray-700 text-white"
                        : "bg-black/60 border-gray-800 text-white/60 hover:bg-black/80 hover:border-gray-700 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() =>
                      setIsHovered((prev) => ({ ...prev, "view-all": true }))
                    }
                    onMouseLeave={() =>
                      setIsHovered((prev) => ({ ...prev, "view-all": false }))
                    }
                  >
                    <HandDrawnBorder
                      isActive={isHovered["view-all"] || showAllCategories}
                    />

                    {showAllCategories ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <BsViewList className="w-4 h-4" />
                    )}
                    <span className="font-medium text-sm tracking-wider">
                      {showAllCategories
                        ? "SHOW LESS"
                        : `VIEW ALL (${tabs.length - 5})`}
                    </span>
                  </motion.button>
                )}
              </>
            )}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            {categoriesLoading || projectsLoading ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[...Array(6)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative h-96 bg-black/60 backdrop-blur-sm border border-gray-800 rounded-2xl animate-pulse"
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`${selectedCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      index={index}
                      openModal={openModal}
                      isHovered={isHovered}
                      setIsHovered={setIsHovered}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-16">
                    <div className="inline-block bg-black/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                      <Terminal className="w-12 h-12 text-white/20 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white/80 mb-2">
                        No Featured Projects Found
                      </h3>
                      <p className="text-white/40">
                        {searchQuery
                          ? `No featured projects match "${searchQuery}"`
                          : selectedCategory
                          ? "There are no featured projects in this category yet."
                          : "There are no featured projects available yet."}
                      </p>
                      {(selectedCategory || searchQuery) && (
                        <button
                          onClick={clearFilters}
                          className="mt-4 px-4 py-2 bg-black/80 border border-gray-800 rounded-lg text-white/70 hover:text-white hover:bg-black/90 transition-all duration-300"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-12 text-center"
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 bg-black/60 border border-gray-800 rounded-xl relative group hover:bg-black/80 hover:border-gray-700 transition-all duration-300"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, footer: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, footer: false }))
              }
            >
              <HandDrawnBorder isActive={isHovered["footer"]} />

              <Terminal className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300" />
              <span className="text-white/40 font-mono text-sm group-hover:text-white/60 transition-colors duration-300">
                $ ls featured_projects/ | wc -l
              </span>
              <motion.div
                className="w-2 h-4 bg-white/60"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      <ProjectModal
        isModalOpen={isModalOpen}
        selectedProject={selectedProject}
        closeModal={closeModal}
        modalRef={modalRef}
      />
    </div>
  );
};

// Add these styles to your global CSS
const styles = `
  @keyframes scan {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  @keyframes border-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .animate-scan {
    animation: scan 2s linear infinite;
  }

  .animate-border-spin {
    animation: border-spin 3s linear infinite;
  }
`;

export default FeaturedProjects;
