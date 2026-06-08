import React from "react";
import { motion } from "motion/react";
import { Award, Users, Landmark, Check } from "lucide-react";

export default function About() {
  return (
    <>
      {/* Himalayan Cover */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden" id="about-cover">
        <div className="absolute inset-0 z-0 bg-brand-ink">
          <img 
            alt="Nepal Himalayan Landscape Sunrise" 
            className="w-full h-full object-cover opacity-35"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5_SvRZw5h34viNtblTv3IJTV38k73UkKo065lo65kcGXcqJ-_s-NPk3IDpXM-ZYiFM73NNVnddjHDXT7HJOn4vRSGWNAsoe4_DtUEGvGwA3CKL9R1slZa8ANDNFDJBDoYtwrMbV15k8laMh6bdqFZxaj0RqPdsCjdA5RhPoQfkFspeVZ5Rwv6EWYCt5z_2AdC8qzszwGlAWkqJoyFloc_vWCrxYy8-Ojrt2os1iMfv4j1ad1hVpcgEjPoPROHBzjzVe93gHnErcE"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="font-sans text-xs uppercase tracking-widest text-brand-primary bg-white px-3 py-1.5 rounded-full font-bold mb-4 inline-block shadow-sm">
            Our Heritage
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-bold leading-tight mb-4 text-shadow" id="about-title">
            Built in Nepal.<br />Built for Nepal.
          </h1>
          <p className="font-sans text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            WebMitra is a smart digital bridge for traditional micro-entrepreneurs to establish professional retail systems while staying rooted in high-altitude excellence.
          </p>
        </div>
      </section>

      {/* Narrative Story Section */}
      <motion.section 
        id="about-narrative"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-24 max-w-7xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
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
          <div className="grid grid-cols-2 gap-4" id="about-metrics-grid">
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
        id="about-pillars"
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

          <div className="grid md:grid-cols-3 gap-6" id="about-pillars-grid">
            <div className="bg-white p-8 rounded-[28px] border border-brand-ink/5 space-y-4 flex flex-col text-left">
              <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg">Quality First</h4>
              <p className="text-xs text-brand-ink/50 leading-relaxed flex-grow">
                We don't believe in "good enough for Nepal." We build software that rivals international standards while respecting high-altitude nuances.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[28px] border border-brand-ink/5 space-y-4 flex flex-col text-left">
              <div className="w-12 h-12 bg-brand-secondary/15 text-brand-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg">Inclusive Growth</h4>
              <p className="text-xs text-brand-ink/50 leading-relaxed flex-grow">
                Empowering micro-producers from remote districts just as much as large corporate boutiques in Lalitpur and Pokhara.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[28px] border border-brand-ink/5 space-y-4 flex flex-col text-left">
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
        id="about-renaissance"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-24 max-w-7xl mx-auto px-6"
      >
        <div className="bg-brand-ink text-white rounded-[32px] overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-12 md:p-16 flex flex-col justify-center space-y-6 text-left">
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
    </>
  );
}
