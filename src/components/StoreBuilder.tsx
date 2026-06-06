import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Store, ShoppingBag, Settings, PenTool } from "lucide-react";
import { StoreConfig } from "../types";

interface StoreBuilderProps {
  onGenerated: (config: StoreConfig) => void;
  currentConfig: StoreConfig;
}

export default function StoreBuilder({ onGenerated, currentConfig }: StoreBuilderProps) {
  const [businessName, setBusinessName] = useState("Himalayan Herbs");
  const [category, setCategory] = useState("Organic Tea & Specialty Spices");
  const [description, setDescription] = useState("We farm and source wild, organic Himalayan tea leaves and pure high-altitude timur pepper.");
  const [brandTone, setBrandTone] = useState("luxury & artisanal");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isManualEdit, setIsManualEdit] = useState(false);

  // Manual Edit state
  const [manualTagline, setManualTagline] = useState(currentConfig.tagline);
  const [manualDescription, setManualDescription] = useState(currentConfig.description);
  const [manualAccent, setManualAccent] = useState(currentConfig.accentColor);

  const categories = [
    "Organic Tea & Specialty Spices",
    "Cashmere Pashmina & Traditional Textiles",
    "Handcrafted Newari Wood & Bronze Handicrafts",
    "Himalayan Honey & Local Pharmacy",
    "Kathmandu Specialty Bakery & Coffee Roastery"
  ];

  const handleGenerateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !category) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          category,
          description,
          brandTone
        })
      });

      const data = await response.json();
      if (data.success) {
        onGenerated(data.storeConfig);
        setIsManualEdit(false);
        // Refresh manual states
        setManualTagline(data.storeConfig.tagline);
        setManualDescription(data.storeConfig.description);
        setManualAccent(data.storeConfig.accentColor);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Encountered an issue with your AI Store builder. Local simulation fallback handles configuration.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleManualSave = () => {
    onGenerated({
      ...currentConfig,
      tagline: manualTagline,
      description: manualDescription,
      accentColor: manualAccent,
    });
    setIsManualEdit(false);
  };

  return (
    <div className="w-full bg-white border border-brand-ink/10 rounded-[32px] p-6 md:p-8 shadow-sm font-sans max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-brand-primary/10 p-2 rounded-xl text-brand-primary">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-brand-ink">AI Launch Control</h3>
            <p className="text-xs text-brand-ink/50">Configure your brand details</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsManualEdit(!isManualEdit);
            setManualTagline(currentConfig.tagline);
            setManualDescription(currentConfig.description);
            setManualAccent(currentConfig.accentColor);
          }}
          className="flex items-center gap-1.5 border border-brand-ink/10 px-3 py-1.5 rounded-full text-xs font-semibold text-brand-ink/60 hover:text-brand-primary hover:border-brand-primary transition-all cursor-pointer"
        >
          <PenTool className="w-3.5 h-3.5" />
          {isManualEdit ? "Cancel Manual" : "Tweak Values"}
        </button>
      </div>

      {!isManualEdit ? (
        <form onSubmit={handleGenerateStore} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-ink/60 mb-1 z-10">Store/Business Name</label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g., Mustang Spices"
              className="w-full border border-brand-ink/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-brand-primary bg-brand-paper/40 focus:bg-white transition-all text-brand-ink"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-ink/60 mb-1">E-commerce Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-brand-ink/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-brand-primary bg-brand-paper/40 focus:bg-white transition-all text-brand-ink"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-ink/60 mb-1">Short Mission / Bio (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Describe your Himalayan craftsmanship or organic ingredients..."
              className="w-full border border-brand-ink/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-brand-primary bg-brand-paper/40 focus:bg-white transition-all text-brand-ink"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-ink/60 mb-1">Brand Voice</label>
              <select
                value={brandTone}
                onChange={(e) => setBrandTone(e.target.value)}
                className="w-full border border-brand-ink/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-brand-primary bg-brand-paper/40 focus:bg-white transition-all text-brand-ink"
              >
                <option value="luxury & artisanal">Luxury & Artisanal</option>
                <option value="rustic & organic">Rustic & Organic</option>
                <option value="modern & minimalist">Modern & Minimalist</option>
                <option value="dynamic & bold">Dynamic & Bold</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-ink/60 mb-1">Gateway Default</label>
              <div className="flex h-11 items-center px-4 rounded-2xl border border-brand-ink/5 bg-brand-secondary/5 text-brand-secondary font-semibold text-[11px] gap-2">
                <ShoppingBag className="w-4 h-4 text-brand-secondary" />
                <span>Esewa + Khalti + COD</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: isGenerating ? 1 : 1.01 }}
            whileTap={{ scale: isGenerating ? 1 : 0.99 }}
            type="submit"
            disabled={isGenerating}
            className="w-full btn-shimmer flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 py-4.5 text-xs font-bold text-white hover:bg-brand-primary/95 transition-all text-center cursor-pointer shadow-md"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Gemini creating your catalog...</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-4.5 h-4.5 text-white animate-pulse" />
                <span>Generate E-Commerce Shop Profile</span>
              </>
            )}
          </motion.button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-ink/60 mb-1">Manual Tagline</label>
            <input
              type="text"
              value={manualTagline}
              onChange={(e) => setManualTagline(e.target.value)}
              className="w-full border border-brand-ink/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-brand-primary bg-brand-paper/40 focus:bg-white text-brand-ink"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-ink/60 mb-1">Manual Description</label>
            <textarea
              value={manualDescription}
              onChange={(e) => setManualDescription(e.target.value)}
              rows={3}
              className="w-full border border-brand-ink/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-brand-primary bg-brand-paper/40 focus:bg-white text-brand-ink"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-ink/60 mb-1">Theme Brand Accent Color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={manualAccent}
                onChange={(e) => setManualAccent(e.target.value)}
                className="w-12 h-12 border-0 bg-transparent cursor-pointer rounded-xl flex-shrink-0"
              />
              <span className="text-xs font-mono text-brand-ink/50 uppercase">{manualAccent}</span>
            </div>
          </div>

          <button
            onClick={handleManualSave}
            className="w-full rounded-2xl bg-brand-secondary p-4 text-xs font-bold text-white hover:bg-brand-secondary/90 cursor-pointer text-center"
          >
            Apply Manual Tweaks
          </button>
        </div>
      )}
    </div>
  );
}
