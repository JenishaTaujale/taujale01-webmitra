import React from "react";
import { motion } from "motion/react";
import { 
  Sparkles, ArrowRight, ShoppingBag, TrendingUp, Package, MapPin, Smartphone, Globe, Link2,
  Store, CreditCard, Boxes, Truck, BarChart3
} from "lucide-react";
import laptopDashboard from "../assets/images/laptop_dashboard_mockup_1780972541110.png";
import developerWorkspace from "../assets/images/developer_desk_workspace_1780973301716.png";

interface HomeProps {
  onGetStarted: () => void;
  onTabChange: (tab: "home" | "product" | "about" | "contact") => void;
}

export default function Home({ onGetStarted, onTabChange }: HomeProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-28 px-6 overflow-hidden bg-[#fcf8f8]" id="home-hero">
        <div className="mx-auto max-w-7xl text-center z-10 relative">
          {/* Badge Capsule */}
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-[#f3efef] border border-[#e8dfdf] mb-8 select-none shadow-sm" id="home-badge">
            <span className="w-2 h-2 rounded-full bg-[#55642b] animate-pulse" />
            <span className="font-sans text-[11px] font-semibold tracking-wide text-brand-ink/80">
              Empowering Nepal's Digital Revolution
            </span>
          </div>

          {/* Redesigned Title to match the reference exactly */}
          <h1 className="font-serif text-5xl md:text-[80px] font-bold max-w-5xl mx-auto mb-8 text-[#1c1b1b] leading-[1.1] tracking-tight" id="home-heading">
            Build Your Online Store <br className="hidden md:block" />
            <span className="text-[#366272]">Without Any Coding</span>
          </h1>

          {/* Redesigned Subtitle description */}
          <p className="font-sans text-brand-ink/75 max-w-2xl mx-auto mb-10 leading-relaxed text-sm md:text-base font-medium" id="home-description">
            Helping Nepali small businesses create professional e-commerce <br className="hidden sm:block" /> websites without technical skills. Start selling to the world today.
          </p>

          {/* Redesigned Action Button */}
          <div className="flex justify-center mb-16" id="home-cta-container">
            <motion.button 
              id="home-start-button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGetStarted}
              className="px-9 py-4.5 rounded-full bg-[#366272] hover:bg-[#366272]/95 text-white font-bold transition-all shadow-[0_12px_24px_rgba(54,98,114,0.18)] text-sm cursor-pointer select-none"
            >
              Start Building
            </motion.button>
          </div>

          {/* New Sleek Premium Showcase Section Inspired by the reference design */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6" id="home-hero-showcase">
            <div className="relative rounded-[32px] overflow-hidden bg-white/20 p-2 sm:p-4 border border-brand-ink/5 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.08)]">
              <div className="rounded-[24px] overflow-hidden bg-[#0d0d0d] aspect-[16/10]">
                <img
                  src={laptopDashboard}
                  alt="WebMitra Admin Dashboard on laptop"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-101"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Muted Premium Tech Partners Row */}
            <div className="mt-14 mb-4 flex justify-center items-center gap-10 sm:gap-16 md:gap-24 text-[22px] sm:text-[28px] font-semibold tracking-tight text-[#b9c3c6] font-jakarta select-none" id="home-partners-row">
              <span className="hover:text-[#366272] transition-colors duration-300 cursor-pointer">Gemini</span>
              <span className="hover:text-[#55642b] transition-colors duration-300 cursor-pointer">eSewa</span>
              <span className="hover:text-[#366272] transition-colors duration-300 cursor-pointer">Netlify</span>
            </div>
          </div>
        </div>
      </section>

      {/* Everything a Nepali Business Needs Section */}
      <section className="py-12 md:py-16 bg-[#FAF8F7] border-t border-[#1a1a1a]/5 text-center px-6" id="nepali-features-section">
        <div className="max-w-4xl mx-auto">
          {/* Badge Capsule */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#e8ecee]/70 border border-[#d9e1e4]/70 mb-3" id="nepali-features-badge animate-fade-in">
            <span className="font-sans text-[9px] font-bold tracking-widest text-[#366272] uppercase">
              Features
            </span>
          </div>

          {/* Large Serif Title */}
          <h2 className="font-serif text-3xl md:text-[42px] font-bold tracking-tight text-[#1c1b1b] leading-tight" id="nepali-features-title">
            Everything a Nepali Business Needs
          </h2>

          {/* Subheading text */}
          <p className="font-sans text-[#1c1b1b]/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-2" id="nepali-features-desc">
            From Kathmandu to Pokhara — sell online with tools built for how Nepal actually does business.
          </p>

          {/* Premium Mockup Feature Card */}
          <div className="mt-8 max-w-4xl mx-auto bg-white border border-[#1a1a1a]/5 rounded-[24px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-left animate-fade-in" id="nepali-features-card">
            {/* Left Column Content */}
            <div className="flex-1 space-y-4 flex flex-col justify-between h-full" id="nepali-features-card-left">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-[#366272]/10 rounded-xl flex items-center justify-center text-[#366272]" id="nepali-features-card-icon">
                  <Link2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl md:text-[30px] font-semibold text-[#1c1b1b] leading-tight" id="nepali-features-card-title">
                  Expensive Developers?
                </h3>
                <p className="font-sans text-brand-ink/70 text-xs md:text-sm leading-relaxed" id="nepali-features-card-text">
                  Forget hiring expensive tech teams. Our drag-and-drop builder allows you to launch in hours, not months. Manage everything yourself with absolute confidence.
                </p>
              </div>
              <div className="pt-2" id="nepali-features-card-cta">
                <button 
                  onClick={() => onGetStarted()}
                  className="inline-flex items-center gap-2 font-sans text-xs font-bold text-[#366272] hover:text-[#366272]/85 transition-colors group cursor-pointer"
                >
                  <span>Learn More</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 font-mono text-sm leading-none">➔</span>
                </button>
              </div>
            </div>

            {/* Right Column Image showcasing code editing setup */}
            <div className="flex-1 w-full" id="nepali-features-card-right">
              <div className="rounded-[18px] overflow-hidden bg-[#fafafc] border border-brand-ink/5 p-1">
                <img 
                  src={developerWorkspace} 
                  alt="Modern workspace with laptop code editor" 
                  className="w-full max-h-[220px] md:max-h-[260px] rounded-[14px] object-cover aspect-[4/3] shadow-sm hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scalable features for growing brands Section */}
      <motion.section 
        id="home-features"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-20 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16" id="scalable-features-header">
            <h2 className="font-serif text-3xl md:text-[44px] font-bold tracking-tight text-[#1c1b1b]">
              Scalable features for growing brands
            </h2>
            <p className="font-sans text-[#1c1b1b]/70 text-sm md:text-base mt-2.5 max-w-xl mx-auto">
              Everything you need to dominate the Nepali digital marketplace.
            </p>
          </div>

          {/* Features Grid - 3 Columns Desktop, 1 Column Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" id="scalable-features-grid">
            {/* Card 1: Instant Store Setup */}
            <div className="bg-[#FAF8F7] border border-[#1a1a1a]/5 rounded-[28px] p-8 md:p-10 flex flex-col justify-start space-y-5 shadow-sm hover:shadow-md transition-shadow" id="scalable-feature-1">
              <div className="w-12 h-12 bg-[#366272]/10 rounded-2xl flex items-center justify-center text-[#366272]">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1c1b1b]">
                Instant Store Setup
              </h3>
              <p className="font-sans text-brand-ink/70 text-xs md:text-sm leading-relaxed">
                Go live in under 5 minutes. No coding, no designer needed. Just add your products and share your link.
              </p>
            </div>

            {/* Card 2: Local Payment Gateways */}
            <div className="bg-[#FAF8F7] border border-[#1a1a1a]/5 rounded-[28px] p-8 md:p-10 flex flex-col justify-start space-y-5 shadow-sm hover:shadow-md transition-shadow" id="scalable-feature-2">
              <div className="w-12 h-12 bg-[#366272]/10 rounded-2xl flex items-center justify-center text-[#366272]">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1c1b1b]">
                Local Payment Gateways
              </h3>
              <p className="font-sans text-brand-ink/70 text-xs md:text-sm leading-relaxed">
                Accept payments via eSewa, FonePay, ConnectIPS, and cash on delivery — out of the box.
              </p>
            </div>

            {/* Card 3: Inventory & Orders */}
            <div className="bg-[#FAF8F7] border border-[#1a1a1a]/5 rounded-[28px] p-8 md:p-10 flex flex-col justify-start space-y-5 shadow-sm hover:shadow-md transition-shadow" id="scalable-feature-3">
              <div className="w-12 h-12 bg-[#366272]/10 rounded-2xl flex items-center justify-center text-[#366272]">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1c1b1b]">
                Inventory &amp; Orders
              </h3>
              <p className="font-sans text-brand-ink/70 text-xs md:text-sm leading-relaxed">
                Track stock, manage orders, and get notified in real-time. Never miss a sale again.
              </p>
            </div>

            {/* Card 4: Delivery Integration */}
            <div className="bg-[#FAF8F7] border border-[#1a1a1a]/5 rounded-[28px] p-8 md:p-10 flex flex-col justify-start space-y-5 shadow-sm hover:shadow-md transition-shadow" id="scalable-feature-4">
              <div className="w-12 h-12 bg-[#366272]/10 rounded-2xl flex items-center justify-center text-[#366272]">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1c1b1b]">
                Delivery Integration
              </h3>
              <p className="font-sans text-brand-ink/70 text-xs md:text-sm leading-relaxed">
                Connect with Pathao, Lalamove, and local couriers directly from your dashboard.
              </p>
            </div>

            {/* Card 5: Mobile-First Stores */}
            <div className="bg-[#FAF8F7] border border-[#1a1a1a]/5 rounded-[28px] p-8 md:p-10 flex flex-col justify-start space-y-5 shadow-sm hover:shadow-md transition-shadow" id="scalable-feature-5">
              <div className="w-12 h-12 bg-[#366272]/10 rounded-2xl flex items-center justify-center text-[#366272]">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1c1b1b]">
                Mobile-First Stores
              </h3>
              <p className="font-sans text-brand-ink/70 text-xs md:text-sm leading-relaxed">
                Your storefront looks stunning on every phone — because most Nepali shoppers buy on mobile.
              </p>
            </div>

            {/* Card 6: Sales Analytics */}
            <div className="bg-[#FAF8F7] border border-[#1a1a1a]/5 rounded-[28px] p-8 md:p-10 flex flex-col justify-start space-y-5 shadow-sm hover:shadow-md transition-shadow" id="scalable-feature-6">
              <div className="w-12 h-12 bg-[#366272]/10 rounded-2xl flex items-center justify-center text-[#366272]">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1c1b1b]">
                Sales Analytics
              </h3>
              <p className="font-sans text-brand-ink/70 text-xs md:text-sm leading-relaxed">
                See what's selling, where your customers come from, and how your revenue is growing.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

    </>
  );
}
