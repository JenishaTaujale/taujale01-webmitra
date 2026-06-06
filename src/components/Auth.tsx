import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle, Eye, EyeOff, X, Mail, Lock, User } from "lucide-react";
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  signInWithPopup, 
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut
} from "firebase/auth";

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "signup" | "login";
  onSuccess?: (user: { name: string; email: string }) => void;
  onVerificationRequired?: (email: string) => void;
}

export default function Auth({ isOpen, onClose, initialView = "signup", onSuccess, onVerificationRequired }: AuthProps) {
  const [view, setView] = useState<"signup" | "login">(initialView);

  React.useEffect(() => {
    setView(initialView);
  }, [initialView]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);

    try {
      if (view === "signup") {
        if (!fullName.trim()) {
          throw new Error("Please enter your full name.");
        }
        
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Save full name as displayName
        await updateProfile(userCredential.user, {
          displayName: fullName.trim()
        });

        // Send confirmation email
        await sendEmailVerification(userCredential.user);

        // Sign out immediately so we do not sign in automatically
        await signOut(auth);

        setStatusMsg({
          type: "success",
          text: "Verification email sent successfully! Please verify it.",
        });

        if (onVerificationRequired) {
          setTimeout(() => {
            onVerificationRequired(email);
            onClose();
          }, 1500);
        }
      } else {
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Check if email is verified
        if (!userCredential.user.emailVerified) {
          console.log(`Access blocked: User email is not verified. Log access for: ${email}`);
          
          try {
            await sendEmailVerification(userCredential.user);
          } catch (verifErr) {
            console.warn("Could not send verification email:", verifErr);
          }

          // Sign out immediately
          await signOut(auth);

          setStatusMsg({
            type: "error",
            text: "Your email is not verified. We sent you a brand new verification link.",
          });

          if (onVerificationRequired) {
            setTimeout(() => {
              onVerificationRequired(email);
              onClose();
            }, 1500);
          }
          return;
        }

        const displayName = userCredential.user.displayName || userCredential.user.email?.split("@")[0] || "Mitra";

        setStatusMsg({
          type: "success",
          text: "Logged in successfully! Redirecting you...",
        });

        if (onSuccess) {
          setTimeout(() => {
            onSuccess({ name: displayName, email: userCredential.user.email || email });
            onClose();
          }, 1000);
        }
      }
    } catch (err: any) {
      let message = err.message || "An unexpected error occurred.";
      if (err.code) {
        switch (err.code) {
          case "auth/email-already-in-use":
            message = "This email address is already in use by another account.";
            break;
          case "auth/invalid-email":
            message = "The email address is badly formatted.";
            break;
          case "auth/weak-password":
            message = "The password must be at least 6 characters long.";
            break;
          case "auth/wrong-password":
          case "auth/user-not-found":
          case "auth/invalid-credential":
            message = "Incorrect email address or password.";
            break;
          case "auth/popup-closed-by-user":
            message = "The login popup was closed before completion.";
            break;
        }
      }
      setStatusMsg({
        type: "error",
        text: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setStatusMsg(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setStatusMsg({
        type: "success",
        text: "Connected with Google authentication successfully!",
      });

      if (onSuccess) {
        setTimeout(() => {
          onSuccess({ 
            name: user.displayName || user.email?.split("@")[0] || "Google Mitra", 
            email: user.email || "" 
          });
          onClose();
        }, 1000);
      }
    } catch (err: any) {
      let message = err.message || "An unexpected error occurred.";
      if (err.code === "auth/popup-closed-by-user") {
        message = "The log-in popup was closed before completion.";
      }
      setStatusMsg({
        type: "error",
        text: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/15 backdrop-blur-md"
          />

          {/* Modal Card content Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-white rounded-[32px] w-full max-w-[460px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-brand-ink/5 z-10"
          >
            {/* Close button X */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-1.5 rounded-full text-brand-ink/40 hover:text-brand-ink hover:bg-brand-paper/50 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Text */}
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl font-bold text-[#1c1b1b] mb-1.5">
                {view === "signup" ? "Create your account" : "Welcome Back"}
              </h1>
              <p className="text-xs text-brand-ink/50 leading-relaxed font-sans">
                {view === "signup"
                  ? "Join WebMitra to empower your small business with modern digital tools."
                  : "Sign in to manage your business"}
              </p>
            </div>

            {statusMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 rounded-2xl mb-6 text-xs flex items-start gap-2.5 ${
                  statusMsg.type === "success"
                    ? "bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary"
                    : "bg-red-50 border border-red-100 text-red-600"
                }`}
              >
                {statusMsg.type === "success" ? (
                  <CheckCircle className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                )}
                <span>{statusMsg.text}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {view === "signup" && (
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-brand-ink/35">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 text-xs bg-brand-paper/40 rounded-xl focus:bg-white border border-brand-ink/10 focus:ring-1 focus:ring-brand-primary focus:outline-none text-brand-ink transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <div className="absolute left-4 top-3.5 text-brand-ink/35">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 text-xs bg-brand-paper/40 rounded-xl focus:bg-white border border-brand-ink/10 focus:ring-1 focus:ring-brand-primary focus:outline-none text-brand-ink transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-3.5 text-brand-ink/35">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 text-xs bg-brand-paper/40 rounded-xl focus:bg-white border border-brand-ink/10 focus:ring-1 focus:ring-brand-primary focus:outline-none text-brand-ink transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-brand-ink/35 hover:text-brand-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>

              {view === "login" && (
                <div className="flex justify-end pr-1">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!email) {
                        setStatusMsg({
                          type: "error",
                          text: "Please enter your email address first so we can send you a password reset link.",
                        });
                        return;
                      }
                      setIsLoading(true);
                      setStatusMsg(null);
                      try {
                        await sendPasswordResetEmail(auth, email);
                        setStatusMsg({
                          type: "success",
                          text: `A password reset link has been successfully sent to ${email}.`,
                        });
                      } catch (err: any) {
                        let msg = err.message || "Could not send password reset email.";
                        if (err.code === "auth/invalid-email") {
                          msg = "The email address is invalid.";
                        } else if (err.code === "auth/user-not-found") {
                          msg = "There is no user registered with this email address.";
                        }
                        setStatusMsg({
                          type: "error",
                          text: msg,
                        });
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    className="text-[10px] font-semibold text-brand-primary hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#366272] py-4 rounded-xl font-bold text-xs text-white hover:bg-[#366272]/95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Please wait...</span>
                  </>
                ) : (
                  <span>{view === "signup" ? "Create Account" : "Sign In"}</span>
                )}
              </motion.button>
            </form>

            {/* Social Divider */}
            <div className="relative flex items-center py-4 my-2">
              <div className="flex-grow border-t border-brand-ink/10"></div>
              <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-brand-ink/30">Or continue with</span>
              <div className="flex-grow border-t border-brand-ink/10"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3 border border-brand-ink/10 rounded-full font-semibold text-xs text-[#1c1b1b] hover:bg-brand-paper/50 cursor-pointer transition-all"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
              </svg>
              <span>Sign up with Google</span>
            </button>

            {/* Toggle Screen Trigger */}
            <div className="mt-8 text-center text-xs">
              <span className="text-brand-ink/50">
                {view === "signup" ? "Already have an account?" : "Don't have an account?"}
              </span>
              <button
                onClick={() => {
                  setView(view === "signup" ? "login" : "signup");
                  setStatusMsg(null);
                }}
                className="ml-1.5 font-bold text-brand-primary hover:underline transition-all cursor-pointer"
              >
                {view === "signup" ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
