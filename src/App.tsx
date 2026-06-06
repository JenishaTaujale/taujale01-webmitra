import React, { useState, useRef, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, ArrowRight, Play, ShoppingBag, Send, AlertCircle, 
  Layers, Lock, Smartphone, Globe, CheckCircle, Info, ChevronDown, ChevronUp,
  Mail, Phone, MapPin, TrendingUp, Package, Users, Shield, Award, Landmark, Check, X
} from "lucide-react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Chatbot from "./components/Chatbot";
import StoreBuilder from "./components/StoreBuilder";
import StorePreview from "./components/StorePreview";
import Auth from "./components/Auth";
import { StoreConfig } from "./types";
import { fetchStoreConfig, saveStoreConfig } from "./firestore-helper";

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

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("General Inquiry");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // FAQ interactive state
  const [activeFaq, setActiveFaq] = useState<number | null>(1); // Set second FAQ open by default like the mockup

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setContactSuccess(false);
    }, 5000);
  };

  const faqData = [
    {
      question: "How quickly can I expect a response?",
      answer: "We endeavor to answer all messages and support inquiries within 2 to 4 business hours. Our dedicated merchant team based in Kathmandu operates Monday through Saturday from 9 AM to 6 PM."
    },
    {
      question: "Is WebMitra suitable for non-tech businesses?",
      answer: "Absolutely. WebMitra was built specifically for Nepali small businesses that want a professional digital presence without needing technical expertise. Our tools are intuitive and our support team is always here to guide you."
    },
    {
      question: "Do you offer custom pricing for large teams?",
      answer: "Yes! For wholesale collectives, handicraft associations, and multinational exporters, we offer custom apex domains, unlimited multi-user roles, and zero-commission exports. Contact our support desk at sales@webmitra.com."
    },
    {
      question: "What kind of support is included?",
      answer: "All plans include access to our automated Himalayan AI advisory, community chat rooms, and central help manual. Growth & Pro plans unlock 24/7 priority live WhatsApp chat escalation and instant dispatch support."
    }
  ];

  return (
    <div className="bg-brand-paper min-h-screen text-brand-ink selection:bg-brand-primary selection:text-white flex flex-col font-sans transition-all duration-300">
      {/* Absolute fullscreen loading screen with custom Nepalese theme */}
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
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
              {/* Hero Section */}
              <section className="relative pt-24 pb-28 px-6 overflow-hidden bg-[#fcf8f8]">
                <div className="mx-auto max-w-7xl text-center z-10 relative">
                  {/* Badge Capsule */}
                  <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-[#f3efef] border border-[#e8dfdf] mb-8 select-none shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#55642b] animate-pulse" />
                    <span className="font-sans text-[11px] font-semibold tracking-wide text-brand-ink/80">
                      Empowering Nepal's Digital Revolution
                    </span>
                  </div>

                  {/* Redesigned Title to match the reference exactly */}
                  <h1 className="font-serif text-5xl md:text-[80px] font-bold max-w-5xl mx-auto mb-8 text-[#1c1b1b] leading-[1.1] tracking-tight">
                    Build Your Online Store <br className="hidden md:block" />
                    <span className="text-[#366272]">Without Any Coding</span>
                  </h1>

                  {/* Redesigned Subtitle description */}
                  <p className="font-sans text-brand-ink/75 max-w-2xl mx-auto mb-10 leading-relaxed text-sm md:text-base font-medium">
                    Helping Nepali small businesses create professional e-commerce <br className="hidden sm:block" /> websites without technical skills. Start selling to the world today.
                  </p>

                  {/* Redesigned Action Button */}
                  <div className="flex justify-center mb-6">
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setAuthInitialView("signup");
                        setIsAuthOpen(true);
                      }}
                      className="px-9 py-4.5 rounded-full bg-[#366272] hover:bg-[#366272]/95 text-white font-bold transition-all shadow-[0_12px_24px_rgba(54,98,114,0.18)] text-sm cursor-pointer select-none"
                    >
                      Start Building
                    </motion.button>
                  </div>
                </div>
              </section>

              {/* Partners Row */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="py-16 bg-brand-paper border-t border-b border-brand-ink/5"
              >
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-8 text-xl font-bold font-serif text-brand-ink/30 uppercase tracking-widest select-none">
                  <span>Analyx</span>
                  <span>PayCare</span>
                  <span>NEORICK</span>
                  <span>Colfare</span>
                </div>
              </motion.section>

              {/* Feature Bento Grid */}
              <motion.section 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="py-24 bg-white/40"
              >
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center mb-16 header-block">
                    <span className="text-[11px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/5 px-3 py-1 rounded-full mb-3 inline-block">
                      Core Assets
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-ink">
                      Core Digital Assets
                    </h2>
                    <p className="text-brand-ink/50 text-sm mt-3.5 max-w-md mx-auto">
                      Everything you need to scale from local shop to national brand.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* AI Builder component block */}
                    <div className="md:col-span-8 group bg-white p-8 rounded-[32px] border border-brand-ink/5 shadow-sm hover:border-brand-primary/30 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-6">
                          <div className="space-y-3">
                            <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                              <Sparkles className="w-6 h-6 animate-pulse" />
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-brand-ink">AI Website Builder</h3>
                            <p className="text-brand-ink/60 text-xs max-w-lg leading-relaxed">
                              Launch your storefront in minutes. Our AI understands your brand and crafts a tailored design that converts Nepali visitors into loyal customers.
                            </p>
                          </div>
                          <span className="text-brand-primary bg-brand-primary/10 font-bold text-[9px] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                            Live
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 rounded-2xl overflow-hidden border border-brand-ink/5 aspect-[21/9]">
                        <img 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 rounded-xl"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlXSBfxk3VJo2jvbt1HozEKrlF3BTM4jVLYEwPfcV2xlG4Sxc6RXWd69HbKkU6Twx9Aa5ttd93yWBIQKrwbKyC-5-CfAxHoFWuLEdn8s9qlGJ6fIcimbsirbSwKrJGJSGMtiyY4z-mI7jxOl7uXMTVAAyDLzGIKC-5RERB_dyQmCWfPnG0sjOhHriB0I3W_isaKZRB3aXslSUx_0GEXGGUXMZLe8flM4LVXX5FnbEtXQhKoBUpNMOeH72zygGJKlb2hnk1TLxOE8I"
                          alt="AI Web designer dashboard visual assets tool"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Unified Payments info block */}
                    <div className="md:col-span-4 bg-brand-secondary/10 p-8 rounded-[32px] border border-brand-secondary/20 text-brand-secondary flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-brand-secondary/20 rounded-2xl flex items-center justify-center text-brand-secondary">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold">Payment Integration</h3>
                        <p className="opacity-80 text-xs leading-relaxed">
                          Seamlessly accept eSewa, Khalti, and local bank mobile transfers with one unified checkout experience.
                        </p>
                      </div>
                      <div className="flex gap-2.5 mt-8">
                        <div className="flex-1 h-12 bg-white/50 backdrop-blur border rounded-2xl font-bold text-[10px] uppercase flex items-center justify-center">eSewa</div>
                        <div className="flex-1 h-12 bg-white/50 backdrop-blur border rounded-2xl font-bold text-[10px] uppercase flex items-center justify-center">Khalti</div>
                      </div>
                    </div>

                    {/* Inventory smart tracking */}
                    <div className="md:col-span-4 bg-white p-8 rounded-[32px] border border-brand-ink/5 shadow-sm space-y-4">
                      <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                        <Package className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-brand-ink">Smart Inventory</h4>
                      <p className="text-brand-ink/60 text-xs leading-relaxed">
                        Real-time tracking of stock levels across multiple locations with automated low-stock alerts.
                      </p>
                    </div>

                    {/* Order delivery logistics */}
                    <div className="md:col-span-4 bg-white p-8 rounded-[32px] border border-brand-ink/5 shadow-sm space-y-4">
                      <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-brand-ink">Order Workflow</h4>
                      <p className="text-brand-ink/60 text-xs leading-relaxed">
                        Manage the journey from purchase to delivery with integrated logistics partners in Kathmandu and beyond.
                      </p>
                    </div>

                    {/* Sales metrics data analysis */}
                    <div className="md:col-span-4 bg-brand-ink text-white p-8 rounded-[32px] space-y-4 shadow-xl">
                      <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-brand-secondary">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-white">Sales Analytics</h4>
                      <p className="text-white/70 text-xs leading-relaxed">
                        Data-driven insights to help you understand market trends and customer checkouts behavior in real-time.
                      </p>
                    </div>

                    {/* Mobile responsive display */}
                    <div className="md:col-span-6 bg-white p-8 rounded-[32px] border border-brand-ink/5 shadow-sm">
                      <div className="flex items-center gap-6 justify-between">
                        <div className="space-y-3 max-w-xs">
                          <h4 className="font-serif font-bold text-lg text-brand-ink">Mobile First Design</h4>
                          <p className="text-brand-ink/60 text-xs leading-relaxed">
                            Optimized for the mobile-heavy Nepali market. Fast-loading shops that work on every smartphone flawlessly.
                          </p>
                        </div>
                        <div className="w-24 h-32 bg-brand-paper border border-brand-ink/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Smartphone className="w-10 h-10 text-brand-primary/40 animate-bounce" />
                        </div>
                      </div>
                    </div>

                    {/* Brand apex domain names */}
                    <div className="md:col-span-6 bg-white p-8 rounded-[32px] border border-brand-ink/5 shadow-sm">
                      <div className="flex items-center gap-6 justify-between">
                        <div className="space-y-3 max-w-xs">
                          <h4 className="font-serif font-bold text-lg text-brand-ink">Custom Branding</h4>
                          <p className="text-brand-ink/60 text-xs leading-relaxed">
                            Connect your .com.np or .com domain easily. Own your identity with clean white-label solutions.
                          </p>
                        </div>
                        <div className="w-24 h-32 bg-brand-paper border border-brand-ink/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Globe className="w-10 h-10 text-brand-primary/40" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Simplified Pricing Component */}
              <Pricing />

              {/* Matrix Table Detail Sheet */}
              <motion.section 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="py-16 bg-white border-t border-brand-ink/5 font-sans"
              >
                <div className="max-w-4xl mx-auto px-6">
                  <h3 className="font-serif text-2xl font-bold tracking-tight text-center mb-8">Plan Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs text-brand-ink">
                      <thead>
                        <tr className="border-b border-brand-ink/15 font-bold uppercase tracking-wider text-[10px] text-brand-ink/50 bg-brand-paper/45">
                          <th className="py-4 px-4.5">Plans &amp; features</th>
                          <th className="py-4 px-4.5 text-center">Free (Starter)</th>
                          <th className="py-4 px-4.5 text-center text-brand-primary font-bold">Growth</th>
                          <th className="py-4 px-4.5 text-center">Pro (Sangh)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-ink/5 font-medium">
                        <tr>
                          <td className="py-3.5 px-4.5">AI Storefront Access</td>
                          <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                          <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                          <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4.5">Custom domain configuration (.com.np)</td>
                          <td className="py-3.5 px-4.5 text-center text-brand-ink/30">—</td>
                          <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                          <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4.5">Integrated local wallets (Esewa / Khalti)</td>
                          <td className="py-3.5 px-4.5 text-center text-brand-ink/30">—</td>
                          <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                          <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4.5">Inventory Management tracking</td>
                          <td className="py-3.5 px-4.5 text-center text-brand-ink/30">—</td>
                          <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                          <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4.5 font-bold">Multi-admin Support Seats</td>
                          <td className="py-3.5 px-4.5 text-center text-brand-ink/40">1 Seat</td>
                          <td className="py-3.5 px-4.5 text-center text-brand-primary font-bold">3 Seats</td>
                          <td className="py-3.5 px-4.5 text-center">Unlimited</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.section>

              {/* Success Overview Section */}
              <motion.section 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="py-24 bg-brand-paper"
              >
                <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold max-w-3xl mx-auto text-brand-ink">
                    From market research to internal reviews, we bring all your commerce into one place.
                  </h2>
                  <div className="relative max-w-4xl mx-auto aspect-video rounded-[36px] overflow-hidden border border-brand-ink/10 shadow-2xl">
                    <img 
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOo-A5FQHAgtzcullKAoMPEhVdJTlR63oBJLT9e0UC2vtsZlzNJT7U83z5h9M-0L-CkCtyzt7ZB1QAcLoaYItCRub02LmqCqJEKr4_SFUKO53kPI-ZBcGvFZV3C_i42lYux_SMnK4CXYRSBCm5osTIT3Fal7rxitHaoI3YZS1oMNsdsLK6Gj-LTdj45j1SRw3f247LFVFXrqb15ihIQ7L3qD9o8UB-6IPeMiVayCK_FaVxoR1lpJv5JHiBLg_AJjlWe8gucQtI4yk"
                      alt="Merchant teamwork planning layout backdrop"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-paper/50 to-transparent flex items-center justify-center">
                      <button 
                        onClick={() => handleTabChange("product")}
                        className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer"
                      >
                        <Play className="w-8 h-8 fill-white ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          )}

          {activeTab === "product" && (
            <motion.div
              key="product"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="py-12 bg-white"
            >
              {/* Product Live sandbox view */}
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                  <span className="text-[11px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1.5 rounded-full inline-block mb-3">
                    Merchant Interactive sandbox
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-ink mb-4">
                    Prompt & Launch Dynamically
                  </h2>
                  <p className="text-sm text-brand-ink/60 max-w-xl mx-auto">
                    Configure high-altitude store properties using AI. Change variables dynamically, catalog descriptions, checkout sandbox cash orders, and verify merchant dashboards.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5">
                    <StoreBuilder 
                      currentConfig={storeConfig} 
                      onGenerated={handleStoreConfigChange} 
                    />
                  </div>

                  <div className="lg:col-span-7">
                    <StorePreview config={storeConfig} />
                  </div>
                </div>
              </div>
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
              {/* Himalayan Cover */}
              <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-brand-ink">
                  <img 
                    alt="Nepal Himalayan Landscape Sunrise" 
                    className="w-full h-full object-cover opacity-35"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5_SvRZw5h34viNtblTv3IJTV38k73UkKo065lo65kcGXcqJ-_s-NPk3IDpXM-ZYiFM73NNVnddjHDXT7HJOn4vRSGWNAsoe4_DtUEGvGwA3CKL9R1slZa8ANDNFDJBDoYtwrMbV15k8laMh6bdqFZxaj0RqPdsCjdA5RhPoQfkFspeVZ5Rwv6EWYCt5z_2AdC8qzszwGlAWkqJoyFloc_vWCrxYy8-Ojrt2os1iMfv4j1ad1hVpcgEjPoPROHBzjzVe93gHnErcE"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                  <span className="font-sans text-xs uppercase tracking-widest text-brand-primary bg-white px-3 py-1.5 rounded-full font-bold mb-4 inline-block">
                    Our Heritage
                  </span>
                  <h1 className="font-serif text-5xl md:text-7xl text-white font-bold leading-tight mb-4 text-shadow">
                    Built in Nepal.<br />Built for Nepal.
                  </h1>
                  <p className="font-sans text-base text-white/80 max-w-xl mx-auto leading-relaxed">
                    WebMitra is a smart digital bridge for traditional micro-entrepreneurs to establish professional retail systems while staying rooted in high-altitude excellence.
                  </p>
                </div>
              </section>

              {/* Narrative Story Section */}
              <motion.section 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="py-24 max-w-7xl mx-auto px-6"
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-brand-secondary font-bold text-xs">
                      <Award className="w-5 h-5 text-brand-secondary" />
                      <span className="uppercase tracking-widest">Our Story</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-brand-ink font-bold leading-tight">
                      Modernizing commerce in the shadow of Everest.
                    </h2>
                    <p className="text-brand-ink/65 text-sm leading-relaxed">
                      WebMitra began in a small workspace in Kathmandu with a simple observation: Nepali businesses have world-class traditional organic products but lacked world-class digital selling tools. We set out to change that by building a SaaS ecosystem tailored specifically for the payment and logistical landscapes of Nepal.
                    </p>
                    <p className="text-brand-ink/65 text-sm leading-relaxed">
                      Today, we serve thousands of merchants across Nepal's seven provinces, providing them with advanced order tracking, automatic delivery sheets, the premium AI catalog builder and instant local receipts.
                    </p>
                  </div>

                  {/* Core metric count layout */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-[24px] p-6 border border-brand-ink/5 shadow-sm min-h-48 flex flex-col justify-end">
                      <div className="text-brand-primary font-serif text-[42px] font-bold leading-none mb-1.5">5k+</div>
                      <div className="font-sans text-[11px] font-semibold text-brand-ink/40 uppercase tracking-widest">Active Merchants</div>
                    </div>
                    <div className="bg-brand-secondary/15 rounded-[24px] p-6 border border-brand-secondary/20 min-h-48 flex flex-col justify-end">
                      <div className="text-brand-secondary font-serif text-[42px] font-bold leading-none mb-1.5">99%</div>
                      <div className="font-sans text-[11px] font-semibold text-brand-secondary uppercase tracking-widest">Local Uptime</div>
                    </div>
                    <div className="bg-amber-100/40 rounded-[24px] p-6 border border-amber-300/30 min-h-48 flex flex-col justify-end">
                      <div className="text-brand-ochre font-serif text-[42px] font-bold leading-none mb-1.5">12M</div>
                      <div className="font-sans text-[11px] font-semibold text-brand-ochre uppercase tracking-widest">NPR Processed</div>
                    </div>
                    <div className="bg-brand-primary/10 rounded-[24px] p-6 border border-brand-primary/20 min-h-48 flex flex-col justify-end">
                      <div className="text-brand-primary font-serif text-[42px] font-bold leading-none mb-1.5">7/7</div>
                      <div className="font-sans text-[11px] font-semibold text-brand-primary uppercase tracking-widest">Provinces Reached</div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Three Pillars Bento Grid */}
              <motion.section 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="py-24 bg-brand-paper border-t border-brand-ink/5"
              >
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl font-bold text-brand-ink">Rooted in Purpose</h2>
                    <p className="text-brand-ink/45 text-xs mt-2.5">Our mission is defined by three core values</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-[28px] border border-brand-ink/5 space-y-4 flex flex-col">
                      <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif font-bold text-lg">Quality First</h4>
                      <p className="text-xs text-brand-ink/50 leading-relaxed flex-grow">
                        We don't believe in "good enough for Nepal." We build software that rivals international standards while respecting high-altitude nuances.
                      </p>
                    </div>

                    <div className="bg-white p-8 rounded-[28px] border border-brand-ink/5 space-y-4 flex flex-col">
                      <div className="w-12 h-12 bg-brand-secondary/15 text-brand-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif font-bold text-lg">Inclusive Growth</h4>
                      <p className="text-xs text-brand-ink/50 leading-relaxed flex-grow">
                        Empowering micro-producers from remote districts just as much as large corporate boutiques in Lalitpur and Pokhara.
                      </p>
                    </div>

                    <div className="bg-white p-8 rounded-[28px] border border-brand-ink/5 space-y-4 flex flex-col">
                      <div className="w-12 h-12 bg-amber-100 text-brand-ochre rounded-xl flex items-center justify-center flex-shrink-0">
                        <Landmark className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif font-bold text-lg">Digital Sovereignty</h4>
                      <p className="text-xs text-brand-ink/50 leading-relaxed flex-grow">
                        Securing Nepal's operational business data safely within our boundaries, keeping systems private and local.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Renaissance City Details Layout */}
              <motion.section 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="py-24 max-w-7xl mx-auto px-6"
              >
                <div className="bg-brand-ink text-white rounded-[32px] overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="p-12 md:p-16 flex flex-col justify-center space-y-6">
                      <h2 className="font-serif text-3xl font-bold tracking-tight">Nepal's Digital Renaissance</h2>
                      <p className="text-white/70 text-xs leading-relaxed max-w-md">
                        The metrics tell a story of an industrious nation ready to transition to online trade. We are here to provide the cloud framework.
                      </p>
                      
                      <div className="space-y-6 pt-4">
                        <div className="flex gap-4.5">
                          <span className="font-serif text-[36px] font-bold text-brand-secondary leading-none">73%</span>
                          <div>
                            <h5 className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Mobile Internet Penetration</h5>
                            <p className="text-[11px] text-white/60">Over 20 million citizens are connected online directly.</p>
                          </div>
                        </div>

                        <div className="flex gap-4.5">
                          <span className="font-serif text-[36px] font-bold text-brand-secondary leading-none">40%</span>
                          <div>
                            <h5 className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Digital Wallet Surge</h5>
                            <p className="text-[11px] text-white/60">Year-on-year increase in local digital payments.</p>
                          </div>
                        </div>

                        <div className="flex gap-4.5">
                          <span className="font-serif text-[36px] font-bold text-brand-secondary leading-none">2.4M</span>
                          <div>
                            <h5 className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary">Registered SMEs & Boutiques</h5>
                            <p className="text-[11px] text-white/60">Unlocking structured revenue generation across towns.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-96 md:h-auto min-h-[380px] relative">
                      <img 
                        alt="Kathmandu Cityscape High Angle View" 
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGjg01FnFGK_wyN5J97M6K4ZeHt979hVEyEz4fQtUxFWZU9kHBqvfCXk5tFwvICtdFlbumpKbxNVlZBCvWQCZVOrO_Y8RqnHUVPFis4FTGcM-3RTXVfrzoJSd3YAa5OVl6DpubPN3ohdzzNVvBJbMV7n9o5oqdDotef3sfQ3YIwiqj56KgFaOFcRToZVdDhpYXNp6izbKRjy8shyC5YGewufBD0Z-2kLULG22NQ3ESTVKf4b8-fDgo0LQ5P6IRRql0pegfhAFGEbM"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-transparent to-transparent hidden md:block"></div>
                    </div>
                  </div>
                </div>
              </motion.section>
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
              {/* Contact Hero */}
              <section className="relative pt-20 pb-12 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center text-brand-ink space-y-4">
                  <span className="bg-brand-secondary/15 text-brand-secondary text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-widest inline-block">
                    Connect With Us
                  </span>
                  <h1 className="font-serif text-5xl md:text-7xl font-bold max-w-4xl mx-auto tracking-tight leading-none text-brand-ink">
                    Let’s build your digital presence, <span className="italic text-brand-primary">together.</span>
                  </h1>
                  <p className="text-sm text-brand-ink/50 max-w-xl mx-auto leading-relaxed">
                    Have questions about our tools, local wallet integrations, or need technical help? Tell us more about your offline boutique or spiced farm store.
                  </p>
                </div>
              </section>

              {/* Form & Card Info sections */}
              <motion.section 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="py-16 max-w-7xl mx-auto px-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Submission form */}
                  <div className="lg:col-span-7 bg-white border border-brand-ink/10 rounded-[32px] p-8 shadow-sm relative">
                    <h3 className="font-serif text-lg font-bold mb-6">Send a Message</h3>
                    
                    {contactSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-2xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary text-xs font-semibold flex items-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>Mero Mitra! Your message was transmitted to the Central Kathmandu desk. We'll reply within 2 hours.</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-left">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-brand-ink/40 uppercase mb-1">Full Name</label>
                          <input 
                            required
                            type="text" 
                            placeholder="e.g. Robin Shakya"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full border border-brand-ink/10 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-brand-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-brand-ink/40 uppercase mb-1">Email Address</label>
                          <input 
                            required
                            type="email" 
                            placeholder="e.g. robin@gmail.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full border border-brand-ink/10 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-brand-primary focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-brand-ink/40 uppercase mb-1">Subject</label>
                        <select 
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          className="w-full border border-brand-ink/10 rounded-xl px-3.5 py-3 text-xs focus:ring-1 focus:ring-brand-primary bg-white focus:outline-none"
                        >
                          <option value="General Inquiry">General Inquiry & Account Tries</option>
                          <option value="Technical Support">Technical Support (Esewa / Khalti setup)</option>
                          <option value="Sales & Partnerships">Sales & Exporters collectives</option>
                          <option value="Feedback">Feedback</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-brand-ink/40 uppercase mb-1">Your Message</label>
                        <textarea 
                          required
                          rows={5}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Tell us about the catalog count, delivery destination, or organic spices scale..."
                          className="w-full border border-brand-ink/10 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-brand-primary focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full font-bold bg-brand-primary text-white py-4 rounded-xl text-xs hover:bg-brand-primary/95 transition-all shadow-md cursor-pointer"
                      >
                        Transmit Support Request
                      </button>
                    </form>
                  </div>

                  {/* Sidebar Address cards */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-brand-primary text-white p-8 rounded-[32px] shadow-sm space-y-6 text-left">
                      <h3 className="font-serif text-xl font-bold">Contact Information</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 bg-white/10 rounded-xl text-white">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-white/50 tracking-wide mb-0.5">Email channel</p>
                            <p className="text-xs font-semibold">hello@webmitra.com.np</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2.5 bg-white/10 rounded-xl text-white">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-white/50 tracking-wide mb-0.5">Phone line</p>
                            <p className="text-xs font-semibold">+977 1 4567890</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2.5 bg-white/10 rounded-xl text-white">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-white/50 tracking-wide mb-0.5">Headquarters</p>
                            <p className="text-xs font-semibold">123 Maitighar, Kathmandu, Nepal</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Architectural visual */}
                    <div className="relative rounded-[32px] overflow-hidden aspect-video border shadow-sm">
                      <img 
                        alt="High quality headquarter picture" 
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUqHUJ35x3AyQN4h4BR6IbLy0cgUcCJW94o2pcV39TR-KqNc37ow2rl0EkxGyxgw3Bdc_EHrO4yz8KIejnIADy9ZJX1pr0phFa5y_egDBmhkwAri66uqeg0QxNPoFKAm8VVeO2bY-n23WG7kmBLJiMggO_1O45CUDgbxysX4iMo52owq9uzo7M41L_1W1s_ZajHhbB7DsPN9AZma6V9QJsZlKaBB59cWIpL6VmrkRgFWIJ_-WKzjNodfgQJ87bO1F6K4qjcQDoZZo"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Dynamic FAQ lists Accordions */}
              <motion.section 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="py-24 bg-brand-paper border-t border-brand-ink/5"
              >
                <div className="max-w-3xl mx-auto px-6">
                  <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl font-bold">Frequently Asked Questions</h2>
                    <p className="text-xs text-brand-ink/40 mt-2.5">Quick answers to support questions you may have</p>
                  </div>

                  <div className="space-y-4 text-left">
                    {faqData.map((faq, idx) => {
                      const isOpen = activeFaq === idx;
                      return (
                        <div 
                          key={idx}
                          className="bg-white rounded-2xl border border-brand-ink/5 overflow-hidden shadow-sm transition-all duration-300"
                        >
                          <button
                            onClick={() => setActiveFaq(isOpen ? null : idx)}
                            className="w-full flex justify-between items-center p-5 font-sans font-semibold text-sm hover:bg-brand-paper/40 text-brand-ink transition-colors cursor-pointer text-left"
                          >
                            <span className={isOpen ? "text-brand-primary" : ""}>{faq.question}</span>
                            {isOpen ? (
                              <ChevronDown className="w-4 h-4 text-brand-primary rotate-180 transition-transform duration-300" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-brand-ink/40 transition-transform duration-300" />
                            )}
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="px-5 pb-5 text-brand-ink/65 text-xs leading-relaxed border-t border-brand-ink/5 pt-3.5 bg-brand-paper/20">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.section>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVerificationEmail(null)}
              className="fixed inset-0 bg-black/15 backdrop-blur-md"
            />

            {/* Verification card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white rounded-[32px] w-full max-w-[460px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-brand-ink/5 z-20 text-center"
            >
              {/* Close Button or clear */}
              <button
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

      {/* Interactive Account Profile popup */}
      <AnimatePresence>
        {isProfileOpen && user && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="fixed inset-0 bg-black/15 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white rounded-[32px] w-full max-w-sm p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-brand-ink/5 z-10 text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsProfileOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded-full text-brand-ink/40 hover:text-brand-ink hover:bg-brand-paper/50 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Avatar Initial matching the header */}
              <div className="w-20 h-20 rounded-full bg-[#f4f4f4] border-2 border-[#d9e2e5] flex items-center justify-center mx-auto mb-5 shadow-sm">
                <span className="text-[#366272] font-serif font-bold text-3xl leading-none uppercase select-none">
                  {user.name ? user.name.charAt(0) : "M"}
                </span>
              </div>

              {/* Name and Email */}
              <h3 className="font-serif text-2xl font-bold text-[#1c1b1b] mb-1">
                {user.name}
              </h3>
              <p className="text-xs text-brand-ink/50 mb-6 font-sans">
                {user.email}
              </p>

              {/* Decorative detail */}
              <div className="bg-brand-paper rounded-2xl p-4 mb-6 text-left border border-brand-ink/5 select-none text-[#1c1b1b]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-brand-ink/40 font-bold uppercase tracking-wider">Account Role</span>
                  <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Nepal Merchant</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-brand-ink/40 font-bold uppercase tracking-wider">Status</span>
                  <span className="text-[10px] text-brand-secondary font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" /> Verified Mitra
                  </span>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => setIsProfileOpen(false)}
                className="w-full bg-[#366272] py-3.5 rounded-xl text-xs font-bold text-white hover:bg-[#366272]/95 transition-all shadow-md cursor-pointer"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
