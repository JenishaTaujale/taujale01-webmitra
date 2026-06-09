import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, X, Sparkles, AlertCircle } from "lucide-react";
import { StoreConfig } from "../types";

interface ChatMessage {
  sender: "architect" | "user";
  text: string;
}

interface WebsiteArchitectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoreCreated: (config: StoreConfig) => void;
}

export default function WebsiteArchitectModal({ isOpen, onClose, onStoreCreated }: WebsiteArchitectModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "architect",
      text: "Welcome to the Website Architect! I'm here to build your professional e-commerce site. To start, what is your business name and what products will you be selling?"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isGenerating]);

  if (!isOpen) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;

    const userMessage = inputText.trim();
    // Clear input
    setInputText("");
    setError(null);

    // Append user message
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setIsGenerating(true);

    try {
      // Map message history
      const history = messages.map((m) => ({
        sender: m.sender === "user" ? "user" : "assistant",
        text: m.text
      }));

      const response = await fetch("/api/conversational-architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history
        })
      });

      const data = await response.json();
      if (data.success) {
        // Add Architect's response
        setMessages((prev) => [...prev, { sender: "architect", text: data.reply }]);
        
        // If config was successfully built, trigger store completion!
        if (data.hasConfig && data.storeConfig) {
          onStoreCreated(data.storeConfig);
        }
      } else {
        throw new Error(data.error || "Failed to generate reply.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Unable to connect with the Website Architect. Please verify your internet connection or API key.");
      setMessages((prev) => [
        ...prev,
        {
          sender: "architect",
          text: "I was unable to compile that. Can you please specify your business name and product category again?"
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#1a1a1a]/40 backdrop-blur-md"
      />

      {/* Main Dialog Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.45 }}
        className="relative bg-[#faf7f5] rounded-[32px] w-full max-w-[700px] flex flex-col h-[560px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-[#1a1a1a]/10 overflow-hidden"
        id="website-architect-dialog"
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#1a1a1a]/5 flex justify-between items-center" id="architect-header">
          <div className="flex items-center gap-4">
            {/* Custom rounded robot avatar */}
            <div className="w-12 h-12 rounded-2xl bg-[#eef1f3] border border-[#d3dade] flex items-center justify-center text-[#366272] shadow-sm flex-shrink-0" id="architect-avatar">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1c1b1b] leading-tight flex items-center gap-2">
                <span>Website Architect</span>
              </h2>
              <p className="font-sans text-[11px] text-[#366272] tracking-wider uppercase font-extrabold" id="architect-subtitle">
                Designing your e-commerce experience
              </p>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#1c1b1b]/40 hover:text-[#1c1b1b] hover:bg-[#1a1a1a]/5 transition-all cursor-pointer flex-shrink-0"
            id="architect-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6" id="architect-chat-history">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              {msg.sender === "architect" && (
                <div className="w-9 h-9 rounded-xl bg-white border border-[#1a1a1a]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="text-sm">🤖</span>
                </div>
              )}
              <div 
                className={`max-w-[80%] rounded-[24px] px-5 py-4 border text-sm leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#366272] text-white border-transparent"
                    : "bg-white text-[#1c1b1b] border-[#1a1a1a]/5"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator / Designing Simulation */}
          {isGenerating && (
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#1a1a1a]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                <span className="text-sm">🤖</span>
              </div>
              <div className="bg-white border border-[#1a1a1a]/5 rounded-[24px] px-5 py-4 shadow-sm text-sm text-[#1c1b1b]/60 flex items-center gap-3">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-[#366272] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#366272] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#366272] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="font-semibold text-xs tracking-wider text-[#366272] animate-pulse">Architect is designing your store...</span>
              </div>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3 text-red-800 text-xs shadow-sm">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div className="p-6 bg-white border-t border-[#1a1a1a]/5 flex flex-col gap-3" id="architect-footer">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tell the Architect about your store..."
              className="w-full bg-[#f3f4f6] border-0 rounded-[28px] pl-6 pr-14 py-4.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#366272]/20 text-[#1c1b1b] placeholder:text-[#1c1b1b]/40 pr-16"
              disabled={isGenerating}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isGenerating}
              className={`absolute right-2.5 top-[50%] -translate-y-[50%] w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                inputText.trim() && !isGenerating
                  ? "bg-[#366272] hover:bg-[#366272]/95 text-white shadow-md cursor-pointer"
                  : "bg-[#1c1b1b]/5 text-[#1c1b1b]/20 cursor-not-allowed"
              }`}
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
          
          <p className="text-[11px] text-center text-[#1c1b1b]/40 tracking-tight select-none">
            WebMitra AI will generate a professional e-commerce site based on your description.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
