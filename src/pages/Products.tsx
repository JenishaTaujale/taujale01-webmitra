import React from "react";
import { motion } from "motion/react";
import { StoreConfig } from "../types";
import StorePreview from "../components/StorePreview";
import { Sparkles, RefreshCw } from "lucide-react";

interface ProductsProps {
  onGetStarted: () => void;
  user: { name: string; email: string } | null;
  storeConfig: StoreConfig;
  isCustomStoreBuilt: boolean;
  onOpenArchitect: () => void;
}

export default function Products({ 
  onGetStarted, 
  user, 
  storeConfig, 
  isCustomStoreBuilt, 
  onOpenArchitect 
}: ProductsProps) {
  
  if (isCustomStoreBuilt) {
    return (
      <div className="bg-[#fcf8f8] min-h-[calc(100vh-160px)] py-12 px-6" id="products-store-preview-container">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Quick rebuild control bar */}
          <div className="bg-white border border-[#1a1a1a]/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl border border-emerald-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-[#1c1b1b]">Your E-Commerce Store is Live!</h3>
                <p className="text-xs text-[#1c1b1b]/50">Designed conversational with WebMitra AI Architect.</p>
              </div>
            </div>
            
            <button
              onClick={onOpenArchitect}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#366272] hover:bg-[#366272]/95 text-white font-bold transition-all shadow-sm text-xs cursor-pointer select-none"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ask Architect to Rebuild</span>
            </button>
          </div>

          {/* Embedded live store preview sandbox */}
          <StorePreview config={storeConfig} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfbfa] min-h-[calc(100vh-160px)] flex flex-col justify-center" id="products-container">
      {/* Inspired Premium Hero Section */}
      <section className="relative pt-24 pb-20 px-6 text-center select-none" id="products-hero">
        <div className="max-w-4xl mx-auto">
          {/* Mockup Pill Badge */}
          <div className="inline-flex items-center px-4.5 py-1.5 rounded-full bg-[#e8ecee] border border-[#d9e1e4] mb-8" id="products-hero-badge">
            <span className="font-sans text-[10px] font-bold tracking-widest text-[#366272] uppercase">
              The Ultimate Website Builder
            </span>
          </div>

          {/* Large Serif Heading */}
          <h1 className="font-serif text-5xl md:text-[68px] font-bold tracking-tight text-[#1c1b1b] leading-[1.1] mb-6" id="products-hero-title">
            Get your job done <br />
            <span className="text-[#366272]">with WebMitra.</span>
          </h1>

          {/* Subheading text matching mockup */}
          <p className="font-sans text-[#1c1b1b]/70 text-base md:text-[17px] leading-relaxed max-w-2xl mx-auto mb-4" id="products-hero-desc">
            Make your own site easily with WebMitra. Build, customize, and deploy your vision to the world in minutes.
          </p>

          {/* Smaller attribution info details */}
          <p className="font-sans text-[11px] text-[#1a1a1a]/45 mb-10" id="products-hero-attribution">
            AI Architect inspired by top-tier templates from Dribbble, Unbounce, and ThemeWagon.
          </p>

          {/* CTA Trigger button */}
          <div className="flex justify-center" id="products-hero-cta">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGetStarted}
              className="px-8 py-3.5 rounded-full bg-[#366272] hover:bg-[#366272]/95 text-white font-bold transition-all shadow-[0_12px_24px_rgba(54,98,114,0.15)] text-sm cursor-pointer select-none flex items-center gap-2"
            >
              <span>Get Started</span>
              <span className="text-white/80 font-mono text-xs">➔</span>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
