import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Terminal,
  Code,
  Cpu,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo-bg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: email, 2: questions, 3: new password

  const {
    login,
    initiatePasswordReset,
    verifySecurityQuestions,
    resetPassword,
  } = useAuth();
  const navigate = useNavigate();

  // Forgot password states
  const [resetToken, setResetToken] = useState("");
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle regular login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle forgot password initiation
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await initiatePasswordReset(email);
      if (response.success && response.data?.resetToken) {
        setResetToken(response.data.resetToken);
        setSecurityQuestions(response.data.questions || []);
        setResetStep(2);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle security questions verification
  const handleVerifyQuestions = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await verifySecurityQuestions(resetToken, answers);
      if (response.success && response.data?.verificationToken) {
        setResetToken(response.data.verificationToken);
        setResetStep(3);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPassword(resetToken, newPassword);
      if (response.success) {
        setError("");
        setForgotPasswordMode(false);
        setResetStep(1);
        setAnswers(["", "", ""]);
        setNewPassword("");
        setConfirmPassword("");
        alert(
          "Password reset successful! You can now login with your new password."
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Hand-drawn border component (same as navbar)
  const HandDrawnBorder = ({ color = "white", className = "" }) => (
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
          strokeOpacity="0.3"
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
          strokeOpacity="0.3"
          strokeLinecap="round"
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
    </div>
  );

  // Coding effect background (same as loader)
  const CodeBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-white/20 text-xs"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-20px",
          }}
          animate={{
            y: [0, window.innerHeight + 50],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <CodeBackground />

      {/* Header with logo */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative group">
          <div className="relative flex items-center justify-center transition-all duration-500 overflow-hidden p-2">
            <img
              src={logo}
              alt="FARBOD Logo"
              className="w-30 h-30 object-contain"
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-white text-2xl font-light tracking-widest">
            ADMIN PORTAL
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-white/40 text-sm">
            <Terminal className="w-4 h-4" />
            <span className="font-mono">secure access required</span>
          </div>
        </div>
      </motion.div>

      {/* Main login card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md relative"
      >
        <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <HandDrawnBorder />

          {/* Card header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">
                  <LogIn className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <h2 className="text-white text-lg font-medium">
                    {forgotPasswordMode ? "Reset Password" : "Admin Login"}
                  </h2>
                  <p className="text-white/40 text-sm">
                    {forgotPasswordMode
                      ? "Follow the steps to reset your password"
                      : "Enter your credentials to continue"}
                  </p>
                </div>
              </div>

              {/* Terminal dots */}
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          {/* Card content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Regular login form */}
              {!forgotPasswordMode ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLogin}
                  className="space-y-5"
                >
                  {/* Email field */}
                  <div>
                    <label className="block text-white/60 text-sm mb-2 font-medium">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 font-mono text-sm"
                        placeholder="admin@example.com"
                        required
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Code className="w-4 h-4 text-white/30" />
                      </div>
                    </div>
                  </div>

                  {/* Password field */}
                  <div>
                    <label className="block text-white/60 text-sm mb-2 font-medium">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Password
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 font-mono text-sm pr-12"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white/70 transition-colors duration-300"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Login button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        <span>Login to Dashboard</span>
                      </>
                    )}
                  </button>

                  {/* Forgot password link */}
                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordMode(true)}
                      className="text-white/50 hover:text-white/80 text-sm transition-colors duration-300 font-mono"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* Forgot password form */
                <motion.div
                  key="forgot-password"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  {/* Step indicator */}
                  <div className="flex items-center justify-between mb-6">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border ${
                            resetStep >= step
                              ? "bg-white/10 border-white/30 text-white"
                              : "bg-white/5 border-white/10 text-white/30"
                          }`}
                        >
                          {step}
                        </div>
                        {step < 3 && (
                          <div
                            className={`h-px w-12 mx-2 ${
                              resetStep > step ? "bg-white/30" : "bg-white/10"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step 1: Email input */}
                  {resetStep === 1 && (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">
                          Enter your email address to receive security questions
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-300 font-mono text-sm"
                          placeholder="admin@example.com"
                          required
                        />
                      </div>
                      {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                          {error}
                        </div>
                      )}
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setForgotPasswordMode(false)}
                          className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                        >
                          Back to Login
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all duration-300 disabled:opacity-50"
                        >
                          {isLoading ? "Loading..." : "Continue"}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 2: Security questions */}
                  {resetStep === 2 && securityQuestions.length > 0 && (
                    <form
                      onSubmit={handleVerifyQuestions}
                      className="space-y-4"
                    >
                      <div className="space-y-4">
                        {securityQuestions.map((q, index) => (
                          <div key={index}>
                            <label className="block text-white/60 text-sm mb-2">
                              {q.question}
                            </label>
                            <input
                              type="text"
                              value={answers[index]}
                              onChange={(e) => {
                                const newAnswers = [...answers];
                                newAnswers[index] = e.target.value;
                                setAnswers(newAnswers);
                              }}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-300 font-mono text-sm"
                              placeholder="Your answer"
                              required
                            />
                          </div>
                        ))}
                      </div>
                      {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                          {error}
                        </div>
                      )}
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setResetStep(1);
                            setError("");
                          }}
                          className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all duration-300 disabled:opacity-50"
                        >
                          {isLoading ? "Verifying..." : "Verify Answers"}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 3: New password */}
                  {resetStep === 3 && (
                    <form onSubmit={handlePasswordReset} className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-white/60 text-sm mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-300 font-mono text-sm pr-12"
                              placeholder="Minimum 8 characters"
                              required
                            />
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-white/60 text-sm mb-2">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-300 font-mono text-sm pr-12"
                              placeholder="Confirm your password"
                              required
                            />
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          </div>
                        </div>
                      </div>
                      {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                          {error}
                        </div>
                      )}
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setResetStep(2);
                            setError("");
                          }}
                          className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all duration-300 disabled:opacity-50"
                        >
                          {isLoading ? "Resetting..." : "Reset Password"}
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-4 text-white/30 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
              <span className="font-mono">SECURE</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span className="font-mono">ENCRYPTED</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
