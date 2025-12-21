import React, { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Shield,
  Key,
  User,
  LogOut,
  ArrowLeft,
  MessageSquare,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Mail,
} from "lucide-react";

const Privacy = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  // Profile data
  const [profile, setProfile] = useState(null);
  const [existingQuestions, setExistingQuestions] = useState([]);

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Security questions form
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    questions: [
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
    ],
  });
  const [showSecurityAnswers, setShowSecurityAnswers] = useState([
    false,
    false,
    false,
  ]);
  const [securityErrors, setSecurityErrors] = useState({});
  const [securitySuccess, setSecuritySuccess] = useState(false);

  const availableQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What elementary school did you attend?",
    "What is the name of the town where you were born?",
    "What was your childhood nickname?",
    "What is your favorite book?",
    "What is the name of your favorite teacher?",
    "What is your father's middle name?",
    "What is your favorite movie?",
    "What street did you grow up on?",
  ];

  // Tabs configuration
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "password", label: "Password", icon: Key },
    { id: "security", label: "Security Questions", icon: MessageSquare },
  ];

  // Fetch profile and security questions
  const fetchProfileData = async () => {
    setLoading(true);
    try {
      // Fetch profile
      const profileData = await api.get("/admin/profile");
      setProfile(profileData.data);

      // Fetch security questions
      try {
        const questionsData = await api.get("/admin/security-questions");
        setExistingQuestions(questionsData.data.questions || []);
      } catch (error) {
        console.log("No security questions set");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      alert("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await api.post("/admin/logout");
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // Password functions
  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    setLoading(true);
    try {
      await api.put("/admin/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordSuccess(true);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({});

      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error) {
      alert(error.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  // Security Questions functions
  const validateSecurityForm = () => {
    const newErrors = {};

    if (!securityForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    const seenQuestions = new Set();
    for (let i = 0; i < 3; i++) {
      const question = securityForm.questions[i];

      if (!question.question) {
        newErrors[`question${i}`] = "Please select a question";
      } else if (seenQuestions.has(question.question)) {
        newErrors[`question${i}`] = "Duplicate questions are not allowed";
      } else {
        seenQuestions.add(question.question);
      }

      if (!question.answer) {
        newErrors[`answer${i}`] = "Please provide an answer";
      } else if (question.answer.length < 2) {
        newErrors[`answer${i}`] = "Answer must be at least 2 characters";
      }
    }

    setSecurityErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateSecurityQuestions = async (e) => {
    e.preventDefault();

    if (!validateSecurityForm()) {
      return;
    }

    setLoading(true);
    try {
      await api.put("/admin/security-questions", {
        currentPassword: securityForm.currentPassword,
        securityQuestions: securityForm.questions,
      });

      setSecuritySuccess(true);
      setSecurityForm({
        currentPassword: "",
        questions: [
          { question: "", answer: "" },
          { question: "", answer: "" },
          { question: "", answer: "" },
        ],
      });
      setSecurityErrors({});

      // Refresh existing questions
      fetchProfileData();

      setTimeout(() => setSecuritySuccess(false), 3000);
    } catch (error) {
      alert(error.message || "Failed to update security questions");
    } finally {
      setLoading(false);
    }
  };

  const selectQuestion = (index, question) => {
    const newQuestions = [...securityForm.questions];
    newQuestions[index].question = question;
    newQuestions[index].answer = "";
    setSecurityForm({ ...securityForm, questions: newQuestions });
    const newErrors = { ...securityErrors };
    delete newErrors[`question${index}`];
    delete newErrors[`answer${index}`];
    setSecurityErrors(newErrors);
  };

  const updateSecurityAnswer = (index, answer) => {
    const newQuestions = [...securityForm.questions];
    newQuestions[index].answer = answer;
    setSecurityForm({ ...securityForm, questions: newQuestions });
    const newErrors = { ...securityErrors };
    delete newErrors[`answer${index}`];
    setSecurityErrors(newErrors);
  };

  const toggleSecurityAnswerVisibility = (index) => {
    const newVisibility = [...showSecurityAnswers];
    newVisibility[index] = !newVisibility[index];
    setShowSecurityAnswers(newVisibility);
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </h2>

            {profile ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Name
                  </label>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    {profile.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Email
                  </label>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    {profile.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Role
                  </label>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    {profile.role}
                  </div>
                </div>

                {profile.lastLogin && (
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Last Login
                    </label>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                      {new Date(profile.lastLogin).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              </div>
            )}
          </div>
        );

      case "password":
        return (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Key className="w-5 h-5" />
              Change Password
            </h2>

            {/* Success Message */}
            {passwordSuccess && (
              <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">
                    Password changed successfully!
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 bg-white/5 border rounded-lg focus:outline-none focus:border-white/30 ${
                      passwordErrors.currentPassword
                        ? "border-red-500/50"
                        : "border-white/10"
                    }`}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 bg-white/5 border rounded-lg focus:outline-none focus:border-white/30 ${
                      passwordErrors.newPassword
                        ? "border-red-500/50"
                        : "border-white/10"
                    }`}
                    placeholder="Enter new password"
                    minLength="8"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {passwordErrors.newPassword}
                  </p>
                )}
                <p className="text-xs text-white/60 mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 bg-white/5 border rounded-lg focus:outline-none focus:border-white/30 ${
                      passwordErrors.confirmPassword
                        ? "border-red-500/50"
                        : "border-white/10"
                    }`}
                    placeholder="Confirm new password"
                    minLength="8"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Changing Password..." : "Change Password"}
              </button>
            </form>
          </div>
        );

      case "security":
        return (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Security Questions
            </h2>

            {/* Success Message */}
            {securitySuccess && (
              <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">
                    Security questions updated successfully!
                  </span>
                </div>
              </div>
            )}

            {/* Existing Questions */}
            {existingQuestions.length > 0 && (
              <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                <h3 className="font-medium mb-3">Current Security Questions</h3>
                <div className="space-y-2">
                  {existingQuestions.map((q, index) => (
                    <div key={index} className="text-sm">
                      <span className="text-white/60">Q{index + 1}: </span>
                      {q.question}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Update Form */}
            <form
              onSubmit={handleUpdateSecurityQuestions}
              className="space-y-6"
            >
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={securityForm.currentPassword}
                  onChange={(e) =>
                    setSecurityForm({
                      ...securityForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 bg-white/5 border rounded-lg focus:outline-none focus:border-white/30 ${
                    securityErrors.currentPassword
                      ? "border-red-500/50"
                      : "border-white/10"
                  }`}
                  placeholder="Enter your current password"
                />
                {securityErrors.currentPassword && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {securityErrors.currentPassword}
                  </p>
                )}
                <p className="text-xs text-white/60 mt-1">
                  Required to update security questions
                </p>
              </div>

              {/* Security Questions */}
              <div className="space-y-4">
                <h3 className="font-medium">Select 3 Security Questions</h3>

                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <label className="block text-sm font-medium mb-2">
                      Question {index + 1}
                    </label>

                    {/* Question Selector */}
                    <select
                      value={securityForm.questions[index].question}
                      onChange={(e) => selectQuestion(index, e.target.value)}
                      className={`w-full  px-4 py-2 bg-white/5 border rounded-lg focus:outline-none focus:border-white/30 mb-3 ${
                        securityErrors[`question${index}`]
                          ? "border-red-500/50"
                          : "border-white/10"
                      }`}
                    >
                      <option className="text-black" value="">
                        Select a question
                      </option>
                      {availableQuestions.map((q) => (
                        <option className="text-black" key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                    {securityErrors[`question${index}`] && (
                      <p className="text-sm text-red-500 mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {securityErrors[`question${index}`]}
                      </p>
                    )}

                    {/* Answer Input */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Answer
                      </label>
                      <div className="relative">
                        <input
                          type={
                            showSecurityAnswers[index] ? "text" : "password"
                          }
                          value={securityForm.questions[index].answer}
                          onChange={(e) =>
                            updateSecurityAnswer(index, e.target.value)
                          }
                          className={`w-full px-4 py-2 bg-white/5 border rounded-lg focus:outline-none focus:border-white/30 ${
                            securityErrors[`answer${index}`]
                              ? "border-red-500/50"
                              : "border-white/10"
                          }`}
                          placeholder="Enter your answer"
                        />
                        <button
                          type="button"
                          onClick={() => toggleSecurityAnswerVisibility(index)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                        >
                          {showSecurityAnswers[index] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {securityErrors[`answer${index}`] && (
                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {securityErrors[`answer${index}`]}
                        </p>
                      )}
                      <p className="text-xs text-white/60 mt-1">
                        Answer must be at least 2 characters
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/60">
                    Security questions are used for password recovery. Make sure
                    to remember your answers. Answers are case-insensitive.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {loading
                  ? "Updating Security Questions..."
                  : "Update Security Questions"}
              </button>
            </form>
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
              <h1 className="text-2xl font-bold">Privacy & Security</h1>
              <p className="text-white/60 text-sm">
                Manage your account security
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex space-x-1 border-b border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg border-b-2 transition-all ${
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
      <div className="max-w-4xl mx-auto">{renderTabContent()}</div>
    </div>
  );
};

export default Privacy;
