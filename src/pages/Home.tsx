import React from "react";
import { motion } from "motion/react";
import { 
  Sparkles, ArrowRight, Play, ShoppingBag, TrendingUp, Package, MapPin, Smartphone, Globe 
} from "lucide-react";
import Pricing from "../components/Pricing";

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
          <div className="flex justify-center mb-6" id="home-cta-container">
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
        </div>
      </section>

      {/* Partners Row */}
      <motion.section 
        id="home-partners"
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
        id="home-features"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-24 bg-white/40"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 header-block" id="home-features-header">
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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="home-features-grid">
            {/* AI Builder component block */}
            <div className="md:col-span-8 group bg-white p-8 rounded-[32px] border border-brand-ink/5 shadow-sm hover:border-brand-primary/30 transition-all flex flex-col justify-between" id="home-feature-ai">
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
            <div className="md:col-span-4 bg-brand-secondary/10 p-8 rounded-[32px] border border-brand-secondary/20 text-brand-secondary flex flex-col justify-between" id="home-feature-payments">
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
            <div className="md:col-span-4 bg-white p-8 rounded-[32px] border border-brand-ink/5 shadow-sm space-y-4" id="home-feature-inventory">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-brand-ink">Smart Inventory</h4>
              <p className="text-brand-ink/60 text-xs leading-relaxed">
                Real-time tracking of stock levels across multiple locations with automated low-stock alerts.
              </p>
            </div>

            {/* Order delivery logistics */}
            <div className="md:col-span-4 bg-white p-8 rounded-[32px] border border-brand-ink/5 shadow-sm space-y-4" id="home-feature-workflow">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-brand-ink">Order Workflow</h4>
              <p className="text-brand-ink/60 text-xs leading-relaxed">
                Manage the journey from purchase to delivery with integrated logistics partners in Kathmandu and beyond.
              </p>
            </div>

            {/* Sales metrics data analysis */}
            <div className="md:col-span-4 bg-brand-ink text-white p-8 rounded-[32px] space-y-4 shadow-xl" id="home-feature-analytics">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-brand-secondary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-white">Sales Analytics</h4>
              <p className="text-white/70 text-xs leading-relaxed">
                Data-driven insights to help you understand market trends and customer checkouts behavior in real-time.
              </p>
            </div>

            {/* Mobile responsive display */}
            <div className="md:col-span-6 bg-white p-8 rounded-[32px] border border-brand-ink/5 shadow-sm" id="home-feature-mobile">
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
            <div className="md:col-span-6 bg-white p-8 rounded-[32px] border border-brand-ink/5 shadow-sm" id="home-feature-domain">
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
        id="home-comparison"
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
                  <th className="py-4 px-4.5 text-center text-brand-primary font-bold bg-brand-secondary/5">Growth</th>
                  <th className="py-4 px-4.5 text-center">Pro (Sangh)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-ink/5 font-medium">
                <tr>
                  <td className="py-3.5 px-4.5">AI Storefront Access</td>
                  <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                  <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary bg-brand-secondary/5">✓</td>
                  <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4.5">Custom domain configuration (.com.np)</td>
                  <td className="py-3.5 px-4.5 text-center text-brand-ink/30">—</td>
                  <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary bg-brand-secondary/5">✓</td>
                  <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4.5">Integrated local wallets (Esewa / Khalti)</td>
                  <td className="py-3.5 px-4.5 text-center text-brand-ink/30">—</td>
                  <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary bg-brand-secondary/5">✓</td>
                  <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4.5">Inventory Management tracking</td>
                  <td className="py-3.5 px-4.5 text-center text-brand-ink/30">—</td>
                  <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary bg-brand-secondary/5">✓</td>
                  <td className="py-3.5 px-4.5 text-center font-bold text-brand-secondary">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4.5 font-bold">Multi-admin Support Seats</td>
                  <td className="py-3.5 px-4.5 text-center text-brand-ink/40">1 Seat</td>
                  <td className="py-3.5 px-4.5 text-center text-brand-primary font-bold bg-brand-secondary/5">3 Seats</td>
                  <td className="py-3.5 px-4.5 text-center">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* Success Overview Section */}
      <motion.section 
        id="home-success"
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
          <div className="relative max-w-4xl mx-auto aspect-video rounded-[36px] overflow-hidden border border-brand-ink/10 shadow-2xl" id="home-video-container">
            <img 
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOo-A5FQHAgtzcullKAoMPEhVdJTlR63oBJLT9e0UC2vtsZlzNJT7U83z5h9M-0L-CkCtyzt7ZB1QAcLoaYItCRub02LmqCqJEKr4_SFUKO53kPI-ZBcGvFZV3C_i42lYux_SMnK4CXYRSBCm5osTIT3Fal7rxitHaoI3YZS1oMNsdsLK6Gj-LTdj45j1SRw3f247LFVFXrqb15ihIQ7L3qD9o8UB-6IPeMiVayCK_FaVxoR1lpJv5JHiBLg_AJjlWe8gucQtI4yk"
              alt="Merchant teamwork planning layout backdrop"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-paper/50 to-transparent flex items-center justify-center">
              <button 
                id="home-play-button"
                onClick={() => onTabChange("product")}
                className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer"
              >
                <Play className="w-8 h-8 fill-white ml-1" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
