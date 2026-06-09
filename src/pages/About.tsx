import React from "react";
import { motion } from "motion/react";
import { Award, Users, BookOpen, MapPin } from "lucide-react";

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
        className="py-20 md:py-24 max-w-7xl mx-auto px-6 bg-white"
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Narrative Content */}
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2 text-[#366272] font-bold text-xs md:text-sm">
              <BookOpen className="w-5 h-5 text-[#366272]" id="about-story-icon" />
              <span className="uppercase tracking-widest font-sans font-bold">OUR STORY</span>
            </div>
            <h2 className="font-serif text-3xl md:text-[42px] text-[#1c1b1b] font-bold leading-tight md:leading-[1.15]">
              Modernizing commerce in the shadow of Everest.
            </h2>
            <div className="space-y-5 font-sans text-[#1c1b1b]/70 text-sm md:text-base leading-relaxed">
              <p>
                WebMitra began in a small workspace in Kathmandu with a simple observation: Nepali businesses have world-class products but lacked world-class digital tools. We set out to change that by building a SaaS ecosystem tailored specifically for the unique logistics and payment landscapes of Nepal.
              </p>
              <p>
                Today, we serve thousands of merchants across the seven provinces, providing them with the intelligence and infrastructure once reserved for global giants.
              </p>
            </div>
          </div>

          {/* Logo Brand Mockup Card */}
          <div className="flex items-center justify-center p-2" id="about-logo-branded">
            <div className="bg-white border border-[#1a1a1a]/5 rounded-[32px] p-8 md:p-14 w-full max-w-md shadow-sm hover:shadow-md transition-shadow flex items-center justify-center aspect-[4/3]">
              <div className="w-full flex justify-center items-center">
                <svg viewBox="0 0 350 140" className="w-full h-auto select-none pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Beautiful continuous wave & shirorekha from the uploaded logo design */}
                  <path 
                    d="M 52,56 C 85,16 142,16 182,54 C 185,57 190,56 195,50 C 205,34 220,32 235,32 L 316,32" 
                    fill="none" 
                    stroke="#1d70cd" 
                    strokeWidth="6.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  {/* Left curly loop flag for Devanagari vowel sign 'i' in 'मि' */}
                  <path 
                    d="M 235,32 C 215,32 198,54 198,82 C 198,102 201,118 206,118 C 211,118 213,110 213,92 L 213,44" 
                    fill="none" 
                    stroke="#1d70cd" 
                    strokeWidth="5.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  {/* Flared stylized 'W' path */}
                  <path 
                    d="M 22,54 C 18,54 16,58 17,66 L 25,114 C 26,118 28,121 32,121 C 36,121 38,118 40,110 L 46,78 L 52,110 C 54,118 56,121 60,121 C 64,121 66,118 67,114 L 75,66 C 76,58 74,54 70,54 L 66,54 C 64,54 65,58 65,61 L 60,102 L 54,64 C 53,58 52,54 48,54 L 45,54 C 41,54 40,58 39,64 L 33,102 L 28,61 C 28,58 29,54 27,54 Z"
                    fill="#1d70cd"
                  />
                  {/* Flared stylized 'E' path */}
                  <path 
                    d="M 86,54 C 82,54 81,58 81,66 L 81,110 C 81,118 82,121 86,121 L 118,121 C 124,121 126,118 126,112 L 126,110 C 126,106 122,105 118,105 L 97,105 L 97,91 L 112,91 C 117,91 119,88 119,83 C 119,78 117,75 112,75 L 97,75 L 97,70 C 97,62 110,62 117,62 C 122,62 124,60 124,55 C 124,51 120,54 115,54 Z"
                    fill="#1d70cd"
                  />
                  {/* Flared stylized 'B' path */}
                  <path 
                    d="M 136,54 C 132,54 131,58 131,66 L 131,110 C 131,118 132,121 136,121 L 157,121 C 168,121 176,113 176,101 C 176,94 171,89 164,87 C 170,85 174,80 174,73 C 174,61 166,54 153,54 Z M 145,68 L 151,68 C 156,68 159,71 159,76 C 159,81 156,84 151,84 L 145,84 Z M 145,95 L 152,95 C 157,95 160,98 160,104 C 160,110 157,113 152,113 L 145,113 Z"
                    fill="#1d70cd"
                  />
                  {/* Devanagari character 'म' (m) path */}
                  <path 
                    d="M 235,46 L 235,84 L 218,84 C 214,84 212,87 212,94 C 212,101 214,103 218,103 L 235,103 L 235,108 C 235,116 232,119 226,119 C 221,119 219,116 219,112 L 219,109 C 219,105 215,104 211,104 C 207,104 205,107 205,112 C 205,120 213,124 225,124 C 237,124 246,118 246,106 L 246,46 Z"
                    fill="#1d70cd"
                  />
                  {/* The central vertical column bar of 'म' */}
                  <path 
                    d="M 246,46 L 246,120 C 246,124 249,124 252,124 C 255,124 257,121 257,118 L 257,46 Z"
                    fill="#1d70cd"
                  />
                  {/* Devanagari character 'त्र' (tra) + vertical stems representing the vowel sounds as premium vector shapes */}
                  {/* Left pointer branches of 'त्र' */}
                  <path 
                    d="M 268,78 C 268,78 280,68 285,62 C 289,57 287,54 282,54 C 278,54 274,58 271,62 L 261,72 C 258,75 258,78 261,81 L 273,95 C 276,99 281,99 284,95 C 287,91 285,88 281,84 Z"
                    fill="#1d70cd"
                  />
                  {/* Rightward lower kick/stem of 'त्र' */}
                  <path 
                    d="M 267,80 L 284,115 C 286,119 290,121 294,121 C 298,121 300,118 297,113 L 281,80 Z"
                    fill="#1d70cd"
                  />
                  {/* Right vertical column bar of 'त्र' */}
                  <path 
                    d="M 288,46 L 288,120 C 288,124 291,124 294,124 C 297,124 299,121 299,118 L 299,46 Z"
                    fill="#1d70cd"
                  />
                  {/* Right vowel stem 'ा' (aa kar) */}
                  <path 
                    d="M 310,46 L 310,120 C 310,124 313,124 316,124 C 319,124 321,121 321,118 L 321,46 Z"
                    fill="#1d70cd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Three Pillars Section */}
      <motion.section 
        id="about-pillars"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-20 md:py-24 bg-white border-t border-[#1a1a1a]/5 animate-fade-in"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="font-serif text-3xl md:text-[42px] font-bold text-[#1c1b1b] leading-tight" id="about-pillars-subheading">Rooted in Purpose</h2>
            <p className="font-sans text-[#1c1b1b]/70 text-base md:text-lg">Our mission is defined by three core pillars.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" id="about-pillars-grid">
            {/* Pillar 1: Quality First */}
            <div className="bg-white p-8 md:p-10 rounded-[32px] border border-[#1a1a1a]/5 hover:shadow-md transition-shadow duration-300 flex flex-col text-left" id="about-pillar-quality">
              <div className="w-14 h-14 bg-[#eef3f6] text-[#366272] rounded-full flex items-center justify-center mb-6">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1c1b1b] mb-4">Quality First</h3>
              <p className="font-sans text-sm md:text-base text-[#1c1b1b]/70 leading-relaxed">
                We don't believe in 'good enough for Nepal.' We build software that rivals Silicon Valley standards while respecting local nuances.
              </p>
            </div>

            {/* Pillar 2: Inclusive Growth */}
            <div className="bg-white p-8 md:p-10 rounded-[32px] border border-[#1a1a1a]/5 hover:shadow-md transition-shadow duration-300 flex flex-col text-left" id="about-pillar-inclusive">
              <div className="w-14 h-14 bg-[#eef3f6] text-[#366272] rounded-full flex items-center justify-center mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1c1b1b] mb-4">Inclusive Growth</h3>
              <p className="font-sans text-sm md:text-base text-[#1c1b1b]/70 leading-relaxed">
                Empowering micro-entrepreneurs from remote villages just as much as corporate offices in Lalitpur and Biratnagar.
              </p>
            </div>

            {/* Pillar 3: Digital Sovereignty */}
            <div className="bg-white p-8 md:p-10 rounded-[32px] border border-[#1a1a1a]/5 hover:shadow-md transition-shadow duration-300 flex flex-col text-left" id="about-pillar-sovereignty">
              <div className="w-14 h-14 bg-[#eef3f6] text-[#366272] rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1c1b1b] mb-4">Digital Sovereignty</h3>
              <p className="font-sans text-sm md:text-base text-[#1c1b1b]/70 leading-relaxed">
                Securing Nepal's business data within our borders while providing the connectivity needed to participate in the global economy.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
