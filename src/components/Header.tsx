import { motion } from "motion/react";

interface HeaderProps {
  onScrollToHome: () => void;
  onScrollToProduct: () => void;
  onScrollToAbout: () => void;
  onScrollToContact: () => void;
  onGetStarted: () => void;
  onLogin: () => void;
  activeTab: string;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onProfileClick: () => void;
}

export default function Header({ 
  onScrollToHome, 
  onScrollToProduct, 
  onScrollToAbout, 
  onScrollToContact, 
  onGetStarted, 
  onLogin, 
  activeTab,
  user,
  onLogout,
  onProfileClick
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-20 border-b border-brand-ink/5 bg-brand-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={onScrollToHome}>
          <div className="w-10 h-10 rounded-xl bg-[#366272] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
            w
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1c1b1b] hover:text-brand-primary transition-all">WebMitra</span>
        </div>

        {/* Navigation Items */}
        <nav className="hidden items-center gap-8 md:flex">
          <button 
            onClick={onScrollToHome}
            className={`font-sans text-sm transition-all pb-1 cursor-pointer ${
              activeTab === "home"
                ? "text-brand-primary font-semibold border-b-2 border-brand-primary"
                : "text-brand-ink/70 font-medium hover:text-brand-primary"
            }`}
          >
            Home
          </button>
          <button 
            onClick={onScrollToProduct}
            className={`font-sans text-sm transition-all pb-1 cursor-pointer ${
              activeTab === "product"
                ? "text-brand-primary font-semibold border-b-2 border-brand-primary"
                : "text-brand-ink/70 font-medium hover:text-brand-primary"
            }`}
          >
            Product
          </button>
          <button 
            onClick={onScrollToAbout}
            className={`font-sans text-sm transition-all pb-1 cursor-pointer ${
              activeTab === "about"
                ? "text-brand-primary font-semibold border-b-2 border-brand-primary"
                : "text-brand-ink/70 font-medium hover:text-brand-primary"
            }`}
          >
            About Us
          </button>
          <button 
            onClick={onScrollToContact}
            className={`font-sans text-sm transition-all pb-1 cursor-pointer ${
              activeTab === "contact"
                ? "text-brand-primary font-semibold border-b-2 border-brand-primary"
                : "text-brand-ink/70 font-medium hover:text-brand-primary"
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Get Started Button and Login button or user profile panel */}
        {user ? (
          <div className="flex items-center gap-3.5 select-none">
            {/* User name & Profile/Logout column */}
            <div className="flex flex-col items-end leading-none">
              <span className="text-sm font-medium text-brand-ink font-sans mb-1.5 lowercase">
                {user.name}
              </span>
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider">
                <button
                  onClick={onProfileClick}
                  className="text-brand-ink/50 hover:text-brand-primary transition-colors cursor-pointer"
                >
                  PROFILE
                </button>
                <span className="text-brand-ink/20 font-light">|</span>
                <button
                  onClick={onLogout}
                  className="text-[#366272] hover:text-brand-primary font-bold transition-colors cursor-pointer"
                >
                  LOGOUT
                </button>
              </div>
            </div>

            {/* Circular Avatar */}
            <button
              onClick={onProfileClick}
              className="w-10.5 h-10.5 rounded-full bg-[#f4f4f4] border border-[#d9e2e5] flex items-center justify-center cursor-pointer hover:border-[#366272] hover:bg-brand-paper transition-all shadow-sm group"
            >
              <span className="text-[#366272] font-serif font-bold text-base leading-none uppercase select-none group-hover:scale-105 transition-transform">
                {user.name ? user.name.charAt(0) : "M"}
              </span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <button
              onClick={onLogin}
              className="font-sans text-sm font-semibold text-brand-ink/70 hover:text-brand-primary transition-colors cursor-pointer select-none"
            >
              Login
            </button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGetStarted}
              className="rounded-full bg-brand-primary px-6 py-2.5 font-sans text-xs font-semibold text-white shadow-md hover:bg-brand-primary/90 transition-all cursor-pointer"
            >
              Get Started
            </motion.button>
          </div>
        )}
      </div>
    </header>
  );
}
