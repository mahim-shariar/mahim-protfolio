import React, { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import {
  User,
  FileText,
  Save,
  X,
  ArrowLeft,
  CheckCircle,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Calendar,
  Briefcase,
  Palette,
  Plus,
  Trash2,
  ExternalLink,
} from "lucide-react";

const Content = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Content state - Simplified structure
  const [content, setContent] = useState({
    // Basic Info
    name: "",
    title: "",
    resume: "",

    // Social Links
    social: {
      linkedin: "",
      github: "",
      twitter: "",
      instagram: "",
      tidycal: "",
    },

    // Certificates
    certificates: [],

    // Counts
    projectCount: 0,
    experienceYears: 0,

    // Theme
    theme: {
      primaryColor: "#3B82F6",
      secondaryColor: "#1E40AF",
    },
  });

  // Form states
  const [newCertificate, setNewCertificate] = useState("");
  const [newResume, setNewResume] = useState("");

  // Tabs configuration
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "social", label: "Social Links", icon: Linkedin },
    { id: "counts", label: "Stats", icon: Briefcase },
    { id: "certificates", label: "Certificates", icon: FileText },
    { id: "theme", label: "Theme", icon: Palette },
  ];
  const [activeTab, setActiveTab] = useState("profile");

  // Fetch content data
  const fetchContentData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/content");
      setContent(response.data);
    } catch (error) {
      console.error("Error fetching content data:", error);
      alert("Failed to load content data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContentData();
  }, []);

  // Save functions
  const handleSaveAll = async () => {
    setSaveLoading(true);
    try {
      await api.put("/content", content);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert(error.message || "Failed to save content");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSaveSection = async () => {
    setSaveLoading(true);
    try {
      await api.patch("/content/section", {
        section: activeTab,
        data:
          activeTab === "social"
            ? content.social
            : activeTab === "theme"
            ? content.theme
            : activeTab === "certificates"
            ? content.certificates
            : activeTab === "counts"
            ? {
                projectCount: content.projectCount,
                experienceYears: content.experienceYears,
              }
            : {
                name: content.name,
                title: content.title,
                resume: content.resume,
              },
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert(error.message || "Failed to save section");
    } finally {
      setSaveLoading(false);
    }
  };

  // Update resume link
  const handleUpdateResume = async () => {
    if (!newResume.trim()) {
      alert("Resume URL is required");
      return;
    }

    try {
      await api.post("/content/resume", { url: newResume });
      setContent({ ...content, resume: newResume });
      setNewResume("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert(error.message || "Failed to update resume link");
    }
  };

  // Add certificate
  const handleAddCertificate = async () => {
    if (!newCertificate.trim()) {
      alert("Certificate URL is required");
      return;
    }

    try {
      await api.post("/content/certificates", { url: newCertificate });
      setContent({
        ...content,
        certificates: [...content.certificates, newCertificate],
      });
      setNewCertificate("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert(error.message || "Failed to add certificate");
    }
  };

  // Remove certificate
  const handleRemoveCertificate = async (index) => {
    if (window.confirm("Are you sure you want to remove this certificate?")) {
      try {
        await api.delete(`/content/certificates/${index}`);
        const newCertificates = [...content.certificates];
        newCertificates.splice(index, 1);
        setContent({ ...content, certificates: newCertificates });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (error) {
        alert(error.message || "Failed to remove certificate");
      }
    }
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={content.name}
                  onChange={(e) =>
                    setContent({ ...content, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) =>
                    setContent({ ...content, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                  placeholder="Your title/position"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Resume</label>
              <div className="space-y-4">
                {content.resume && (
                  <div className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <a
                      href={content.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-blue-400 hover:text-blue-300 truncate"
                    >
                      {content.resume}
                    </a>
                    <button
                      onClick={() => window.open(content.resume, "_blank")}
                      className="p-1 hover:bg-white/10 rounded"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newResume}
                    onChange={(e) => setNewResume(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                    placeholder="Google Drive preview link"
                  />
                  <button
                    onClick={handleUpdateResume}
                    className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Update
                  </button>
                </div>
                <p className="text-xs text-white/60">
                  Note: Use Google Drive's "Share → Get link → Change to 'Anyone
                  with the link' → Copy preview link"
                </p>
              </div>
            </div>
          </div>
        );

      case "social":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn URL
              </label>
              <input
                type="url"
                value={content.social.linkedin}
                onChange={(e) =>
                  setContent({
                    ...content,
                    social: { ...content.social, linkedin: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub URL
              </label>
              <input
                type="url"
                value={content.social.github}
                onChange={(e) =>
                  setContent({
                    ...content,
                    social: { ...content.social, github: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                placeholder="https://github.com/yourusername"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter URL
              </label>
              <input
                type="url"
                value={content.social.twitter}
                onChange={(e) =>
                  setContent({
                    ...content,
                    social: { ...content.social, twitter: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                placeholder="https://twitter.com/yourhandle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram URL
              </label>
              <input
                type="url"
                value={content.social.instagram}
                onChange={(e) =>
                  setContent({
                    ...content,
                    social: { ...content.social, instagram: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                TidyCal URL
              </label>
              <input
                type="url"
                value={content.social.tidycal}
                onChange={(e) =>
                  setContent({
                    ...content,
                    social: { ...content.social, tidycal: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                placeholder="https://tidycal.com/yourcalendar"
              />
            </div>
          </div>
        );

      case "counts":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Project Count
              </label>
              <input
                type="number"
                value={content.projectCount}
                onChange={(e) =>
                  setContent({
                    ...content,
                    projectCount: parseInt(e.target.value) || 0,
                  })
                }
                min="0"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                placeholder="Number of projects"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Years of Experience
              </label>
              <input
                type="number"
                value={content.experienceYears}
                onChange={(e) =>
                  setContent({
                    ...content,
                    experienceYears: parseInt(e.target.value) || 0,
                  })
                }
                min="0"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                placeholder="Years of experience"
              />
            </div>
          </div>
        );

      case "certificates":
        return (
          <div className="space-y-6">
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h3 className="font-medium mb-4">Add Certificate</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCertificate}
                    onChange={(e) => setNewCertificate(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                    placeholder="Google Drive preview link"
                  />
                  <button
                    onClick={handleAddCertificate}
                    className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                <p className="text-xs text-white/60">
                  Add Google Drive preview links for your certificates
                </p>
              </div>
            </div>

            {/* Certificates List */}
            <div className="space-y-3">
              <h3 className="font-medium">Your Certificates</h3>
              {content.certificates.length === 0 ? (
                <p className="text-white/60 text-sm">
                  No certificates added yet
                </p>
              ) : (
                <div className="space-y-2">
                  {content.certificates.map((certificate, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-lg"
                    >
                      <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <a
                        href={certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-blue-400 hover:text-blue-300 truncate text-sm"
                      >
                        {certificate}
                      </a>
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(certificate, "_blank")}
                          className="p-1 hover:bg-white/10 rounded"
                          title="Open"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveCertificate(index)}
                          className="p-1 hover:bg-red-500/10 rounded text-red-400 hover:text-red-300"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "theme":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={content.theme.primaryColor}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      theme: { ...content.theme, primaryColor: e.target.value },
                    })
                  }
                  className="w-16 h-16 cursor-pointer rounded-lg border border-white/10"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={content.theme.primaryColor}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        theme: {
                          ...content.theme,
                          primaryColor: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                    placeholder="#3B82F6"
                  />
                  <p className="text-xs text-white/60 mt-1">
                    Main color used for buttons and highlights
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Secondary Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={content.theme.secondaryColor}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      theme: {
                        ...content.theme,
                        secondaryColor: e.target.value,
                      },
                    })
                  }
                  className="w-16 h-16 cursor-pointer rounded-lg border border-white/10"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={content.theme.secondaryColor}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        theme: {
                          ...content.theme,
                          secondaryColor: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                    placeholder="#1E40AF"
                  />
                  <p className="text-xs text-white/60 mt-1">
                    Secondary color used for hover states and accents
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Content Management</h1>
              <p className="text-white/60 text-sm">
                Manage your portfolio content
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {success && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-500 text-sm">
                  Saved successfully!
                </span>
              </div>
            )}
            <button
              onClick={handleSaveSection}
              disabled={saveLoading || loading}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saveLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </>
              )}
            </button>
            <button
              onClick={handleSaveAll}
              disabled={saveLoading || loading}
              className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {saveLoading ? "Saving..." : "Save All"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex space-x-1 border-b border-white/10 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg border-b-2 transition-all flex-shrink-0 ${
                  activeTab === tab.id
                    ? "border-white text-white bg-white/5"
                    : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="mt-4 text-white/60">Loading content...</p>
            </div>
          ) : (
            renderTabContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
