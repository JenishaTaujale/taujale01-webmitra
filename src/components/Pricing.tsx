import { useState } from "react";
import { motion } from "motion/react";
import { Check, Info, HelpCircle } from "lucide-react";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");

  const plans = [
    {
      name: "Starter (Nirmata)",
      description: "Perfect for home cooks, local knitters and micro boutiques launching online.",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "Up to 5 catalog listings",
        "Cash on Delivery support",
        "Himalayan themed web page",
        "WebMitra shared sub-domain",
        "Standard Unicode supports"
      ],
      cta: "Launch Free",
      popular: false
    },
    {
      name: "Growth (Ascent)",
      description: "Designed for established spices brands, tea weavers & local coffee shops ready to scale.",
      monthlyPrice: 1500,
      yearlyPrice: 1200,
      features: [
        "Unlimited product catalog list",
        "Esewa + Khalti sandbox integration",
        "Pathao automatic dispatch API",
        "Fulfillment analytics panel",
        "Custom brand color theme",
        "Support WhatsApp & Chat helper"
      ],
      cta: "Start 14-Day Free Trial",
      popular: true
    },
    {
      name: "Co-Operative (Sangh)",
      description: "For exporter collectives, multi-retailer groups, & high-value artisanal exporters.",
      monthlyPrice: 4000,
      yearlyPrice: 3200,
      features: [
        "Custom apex domain configuration",
        "Multi-city admin accounts",
        "Currency switcher (NPR/USD)",
        "Direct export logistics integrations",
        "24/7 dedicated success advisor",
        "0% platform transaction fees"
      ],
      cta: "Contact Enterprise",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-brand-paper font-sans">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <span className="text-[11px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1.5 rounded-full inline-block mb-4">
          Fair & transparent plans
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-ink mb-4">
          Simple, Scalable Pricing
        </h2>
        <p className="text-sm text-brand-ink/60 mb-10 max-w-lg mx-auto leading-relaxed">
          Unlock code-free selling. Zero commissions. Zero hidden compliance fees. Select the tier tailored for your scale.
        </p>

        {/* Toggle billing period */}
        <div className="flex items-center justify-center gap-4.5 mb-14">
          <span className={`text-xs font-semibold ${billingPeriod === "monthly" ? "text-brand-ink" : "text-brand-ink/40"}`}>
            Billed Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
            className="w-12 h-6.5 rounded-full bg-brand-primary/20 relative p-1 transition-colors cursor-pointer"
          >
            <motion.span
              layout
              className="w-4.5 h-4.5 rounded-full bg-brand-primary block"
              animate={{ x: billingPeriod === "monthly" ? 0 : 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-xs ... font-semibold flex items-center gap-1.5 ${billingPeriod === "yearly" ? "text-brand-primary" : "text-brand-ink/40"}`}>
            Billed Yearly
            <span className="bg-brand-secondary/15 text-brand-secondary text-[9px] font-bold px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>

        {/* Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded-[32px] p-6 text-left flex flex-col justify-between relative transition-all ${
                plan.popular 
                  ? "border-brand-primary ring-1 ring-brand-primary shadow-xl" 
                  : "border-brand-ink/10 shadow-sm"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[9px] font-bold uppercase py-1 px-3.5 rounded-full tracking-wider">
                  Recommended for Nepali Retailers
                </span>
              )}

              <div>
                <h3 className="font-serif font-bold text-lg text-brand-ink mb-2">{plan.name}</h3>
                <p className="text-xs text-brand-ink/50 min-h-[48px] leading-relaxed mb-6">{plan.description}</p>

                {/* Pricing amount */}
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-xs font-bold text-brand-ink/60">NPR</span>
                  <span className="font-mono text-4xl font-bold text-brand-ink">
                    {billingPeriod === "monthly" ? plan.monthlyPrice.toLocaleString() : plan.yearlyPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-brand-ink/40">/month</span>
                </div>

                <div className="border-t border-brand-ink/5 pt-6 space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex gap-2.5 items-center text-xs text-brand-ink">
                      <div className="text-brand-secondary bg-brand-secondary/10 p-0.5 rounded-full flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-brand-ink/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer text-center ${
                    plan.popular
                      ? "bg-brand-primary text-white shadow-md hover:bg-brand-primary/95"
                      : "bg-brand-paper hover:bg-brand-ink/5 text-brand-ink border border-brand-ink/10"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
