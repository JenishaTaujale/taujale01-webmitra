import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, X } from "lucide-react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Auth from "./components/Auth";
import { StoreConfig } from "./types";
import { fetchStoreConfig, saveStoreConfig } from "./firestore-helper";

// Page Views Imports
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

export default function App() {
  const [activeTab, setActiveTabState] = useState<"home" | "product" | "about" | "contact">("home");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState<"signup" | "login">("signup");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        if (!firebaseUser.emailVerified) {
          console.log(`Access blocked: User email is not verified. Log access for: ${firebaseUser.email}`);
          setVerificationEmail(firebaseUser.email || "");
          signOut(auth);
          setUser(null);
        } else {
          setUser({
            name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Mitra",
            email: firebaseUser.email || "",
          });
          // Retrieve stored configuration from Firestore database
          fetchStoreConfig(firebaseUser.uid)
            .then((loadedConfig) => {
              if (loadedConfig) {
                setStoreConfig(loadedConfig);
              }
            })
            .catch((err) => {
              console.error("Failed to load store configuration from Firestore:", err);
            });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleTabChange("home");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const [storeConfig, setStoreConfig] = useState<StoreConfig>({
    name: "Mustang Royal Spices",
    category: "Organic Herbs & Hill Spices",
    tagline: "Sourced directly from lady grower networks in high alpine hills.",
    description: "Bringing unadulterated mountain timur pepper, pure Himalayan rock salt and mountain honey directly from traditional micro-farms to tables across Nepal.",
    accentColor: "#55642b",
    slug: "mustang-royal-spices",
    paymentGateways: ["esewa", "khalti", "cod"],
    courierService: "pathao",
    products: [
      {
        id: "prod-1",
        name: "Premium Mountain Timur Peppercorn",
        description: "Hand-picked in Mustang. Yields an extremely pungent, tingling lemon citrus signature aroma.",
        price: 650,
        category: "Spices",
        image: "https://picsum.photos/seed/timur/400/400"
      },
      {
        id: "prod-2",
        name: "Wild Hand-Pressed Himalayan Honey",
        description: "Medicinal honey sustainably harvested from wild Gorkha mountain cliffs by veteran gurung tribes.",
        price: 2100,
        category: "Organic Food",
        image: "https://picsum.photos/seed/honey/400/400"
      },
      {
        id: "prod-3",
        name: "Traditional Newari Wood Carving Tray",
        description: "Intricately handcarved mahogany tray reflecting heritage patterns by Bhaktapur carpenters.",
        price: 3450,
        category: "Handicrafts",
        image: "https://picsum.photos/seed/woodtray/400/400"
      }
    ]
  });

  const handleStoreConfigChange = async (config: StoreConfig) => {
    setStoreConfig(config);
    if (auth.currentUser) {
      try {
        await saveStoreConfig(auth.currentUser.uid, config);
        console.log("Successfully saved store configuration with Firestore!");
      } catch (err) {
        console.error("Error saving store configuration to Firestore:", err);
      }
    }
  };

  const handleTabChange = (tab: "home" | "product" | "about" | "contact") => {
    setIsPageLoading(true);
    setTimeout(() => {
      setActiveTabState(tab);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setIsPageLoading(false);
      }, 150);
    }, 400);
  };

  return (
    <div className="bg-brand-paper min-h-screen text-brand-ink selection:bg-brand-primary selection:text-white flex flex-col font-sans transition-all duration-300" id="main-app-container">
      {/* Absolute fullscreen loading screen with custom Nepalese theme */}
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            id="initial-loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
            className="fixed inset-0 z-[200] bg-[#fcf8f8] flex flex-col items-center justify-center text-center px-6"
          >
            {/* Elegant Spinning Ring & WM Initial */}
            <div className="relative mb-6 w-16 h-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-solid border-[#366272]/15 border-t-[#366272]"
              />
              <div className="absolute inset-2.5 bg-white rounded-full shadow-sm flex items-center justify-center border border-brand-ink/5">
                <span className="text-[#366272] font-serif font-black text-xs tracking-wider select-none">WM</span>
              </div>
            </div>

            {/* Title / Brand Text */}
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="font-serif text-2xl font-black text-[#1c1b1b] tracking-tight mb-2 select-none"
            >
              WebMitra
            </motion.h2>

            {/* Subtext and pulse */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 justify-center text-[9px] font-bold text-brand-ink/40 uppercase tracking-widest select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#366272] animate-ping" />
              Empowering Nepal's Digital Revolution
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top absolute loading progress bar */}
      <AnimatePresence>
        {isPageLoading && (
          <div className="fixed top-20 left-0 right-0 h-1 z-[110] overflow-hidden bg-brand-primary/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-brand-primary to-[#366272] w-full"
            />
          </div>
        )}
      </AnimatePresence>

      <Header 
        activeTab={activeTab}
        onScrollToHome={() => handleTabChange("home")} 
        onScrollToProduct={() => handleTabChange("product")} 
        onScrollToAbout={() => handleTabChange("about")} 
        onScrollToContact={() => handleTabChange("contact")} 
        onGetStarted={() => {
          setAuthInitialView("signup");
          setIsAuthOpen(true);
        }} 
        onLogin={() => {
          setAuthInitialView("login");
          setIsAuthOpen(true);
        }}
        user={user}
        onLogout={handleLogout}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      {/* Main Page Area with crossfade effects */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Home 
                onGetStarted={() => {
                  setAuthInitialView("signup");
                  setIsAuthOpen(true);
                }}
                onTabChange={handleTabChange}
              />
            </motion.div>
          )}

          {activeTab === "product" && (
            <motion.div
              key="product"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Products 
                storeConfig={storeConfig}
                onStoreConfigChange={handleStoreConfigChange}
              />
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <About />
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Auth popup modal */}
      <Auth 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView={authInitialView}
        onSuccess={(user) => {
          handleTabChange("home");
        }}
        onVerificationRequired={(email) => {
          setVerificationEmail(email);
        }}
      />

      {/* Verification overlay screen */}
      <AnimatePresence>
        {verificationEmail && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              id="verification-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVerificationEmail(null)}
              className="fixed inset-0 bg-black/15 backdrop-blur-md"
            />

            {/* Verification card */}
            <motion.div
              id="verification-card-box"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white rounded-[32px] w-full max-w-[460px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-brand-ink/5 z-20 text-center"
            >
              {/* Close Button */}
              <button
                id="verification-close"
                onClick={() => setVerificationEmail(null)}
                className="absolute top-6 right-6 p-1.5 rounded-full text-brand-ink/40 hover:text-brand-ink hover:bg-brand-paper/50 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Envelope Animation Icon */}
              <div className="w-16 h-16 rounded-full bg-[#fcf8f8] border-2 border-brand-primary/10 flex items-center justify-center mx-auto mb-6 shadow-sm text-brand-primary">
                <Mail className="w-8 h-8 animate-pulse" />
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#1c1b1b] mb-4">
                Verify Your Account
              </h2>

              <p className="text-sm text-brand-ink/65 leading-relaxed mb-8">
                we have send you a verification email to <strong className="text-brand-ink font-semibold">{verificationEmail}</strong>. verify it and login
              </p>

              {/* Login Button which closes this screen and forces the login modal */}
              <button
                id="verification-login-trigger"
                onClick={() => {
                  setVerificationEmail(null);
                  setAuthInitialView("login");
                  setIsAuthOpen(true);
                }}
                className="w-full bg-[#366272] py-4 rounded-xl font-bold text-xs text-white hover:bg-[#366272]/95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Login</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Account Profile component popup */}
      <Profile 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={handleLogout}
      />

      {/* CTA Boxed row */}
      <section className="py-16 bg-brand-paper border-t border-brand-ink/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-brand-ink rounded-[40px] text-white p-12 md:p-16 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-xl text-left">
              <h3 className="font-serif text-3xl font-bold text-white mb-2 pb-1.5 border-b border-white/10">Ready to elevate your business?</h3>
              <p className="text-white/70 text-xs">Join 500+ traditional Nepali merchants using WebMitra to digitalize local checkout sales.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => {
                  setAuthInitialView("signup");
                  setIsAuthOpen(true);
                }}
                className="bg-brand-primary px-8 py-3.5 rounded-full font-bold text-xs text-white hover:opacity-90 transition-all cursor-pointer"
              >
                Get Started Free
              </button>
              <button 
                onClick={() => handleTabChange("contact")}
                className="bg-white/10 hover:bg-white/15 px-8 py-3.5 border border-white/10 rounded-full font-bold text-xs text-white transition-all cursor-pointer"
              >
                Book Assistance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Persistent helper Chatbot */}
      <Chatbot />

      <Footer 
        onScrollToHome={() => handleTabChange("home")}
        onScrollToProduct={() => handleTabChange("product")}
        onScrollToAbout={() => handleTabChange("about")}
        onScrollToContact={() => handleTabChange("contact")}
      />
    </div>
  );
}
