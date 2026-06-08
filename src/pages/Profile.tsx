import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string } | null;
  onLogout?: () => void;
}

export default function Profile({ isOpen, onClose, user, onLogout }: ProfileProps) {
  return (
    <AnimatePresence>
      {isOpen && user && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" id="profile-modal-overlay">
          {/* Backdrop */}
          <motion.div
            id="profile-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/15 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            id="profile-modal-box"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-white rounded-[32px] w-full max-w-sm p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-brand-ink/5 z-10 text-center"
          >
            {/* Close Button */}
            <button
              id="profile-modal-close"
              onClick={onClose}
              className="absolute top-6 right-6 p-1.5 rounded-full text-brand-ink/40 hover:text-brand-ink hover:bg-brand-paper/50 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Avatar Initial matching the header */}
            <div className="w-20 h-20 rounded-full bg-[#f4f4f4] border-2 border-[#d9e2e5] flex items-center justify-center mx-auto mb-5 shadow-sm" id="profile-avatar">
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

            {/* Buttons */}
            <div className="flex flex-col gap-2.5">
              <button
                id="profile-done-button"
                onClick={onClose}
                className="w-full bg-[#366272] py-3.5 rounded-xl text-xs font-bold text-white hover:bg-[#366272]/95 transition-all shadow-md cursor-pointer"
              >
                Done
              </button>
              {onLogout && (
                <button
                  id="profile-logout-button"
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="w-full bg-red-50 text-red-600 hover:bg-red-100 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Log Out
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
