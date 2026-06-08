import React from "react";
import { motion } from "motion/react";
import StoreBuilder from "../components/StoreBuilder";
import StorePreview from "../components/StorePreview";
import { StoreConfig } from "../types";

interface ProductsProps {
  storeConfig: StoreConfig;
  onStoreConfigChange: (config: StoreConfig) => void;
}

export default function Products({ storeConfig, onStoreConfigChange }: ProductsProps) {
  return (
    <div className="py-12 bg-white" id="products-container">
      {/* Product Live sandbox view */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12" id="products-header">
          <span className="text-[11px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1.5 rounded-full inline-block mb-3">
            Merchant Interactive sandbox
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-ink mb-4">
            Prompt & Launch Dynamically
          </h2>
          <p className="text-sm text-brand-ink/65 max-w-xl mx-auto">
            Configure high-altitude store properties using AI. Change variables dynamically, catalog descriptions, checkout sandbox cash orders, and verify merchant dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="products-sandbox-grid">
          <div className="lg:col-span-5" id="products-builder-column">
            <StoreBuilder 
              currentConfig={storeConfig} 
              onGenerated={onStoreConfigChange} 
            />
          </div>

          <div className="lg:col-span-7" id="products-preview-column">
            <StorePreview config={storeConfig} />
          </div>
        </div>
      </div>
    </div>
  );
}
