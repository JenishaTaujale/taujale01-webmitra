import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Bot, RotateCcw, Plus, Minus } from "lucide-react";
import { ChatMessage } from "../types";

export default function Contact() {
  // Frequently Asked Questions state
  const [activeFaq, setActiveFaq] = useState<number | null>(1); // Is WebMitra suitable... open by default matching mockup

  // Interactive inline WebMitra Assistant chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "bot",
      text: "Hello! I am your WebMitra assistant. How can I help you build your dream website today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput.trim();
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-6)
        })
      });

      const data = await response.json();
      if (data.success) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: "Namaste! I faced a temporary gateway sync issue. Let's try again in a bit.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "init",
        sender: "bot",
        text: "Hello! I am your WebMitra assistant. How can I help you build your dream website today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const faqData = [
    {
      question: "How quickly can I expect a response?",
      answer: "We endeavor to answer all messages and support inquiries within 2 to 4 business hours. Our dedicated merchant team based in Kathmandu operates Monday through Saturday from 9 AM to 6 PM."
    },
    {
      question: "Is WebMitra suitable for non-tech businesses?",
      answer: "Absolutely. WebMitra was built specifically for Nepali small businesses that want a professional digital presence without needing technical expertise. Our tools are intuitive and our support team is always here to guide you."
    },
    {
      question: "Do you offer custom pricing for large teams?",
      answer: "Yes! For wholesale collectives, handicraft associations, and multinational exporters, we offer custom apex domains, unlimited multi-user roles, and zero-commission exports. Contact our support desk at sales@webmitra.com."
    },
    {
      question: "What kind of support is included?",
      answer: "All plans include access to our automated Himalayan AI advisory, community chat rooms, and central help manual. Growth & Pro plans unlock 24/7 priority live WhatsApp chat escalation and instant dispatch support."
    }
  ];

  return (
    <>
      {/* Contact Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden" id="contact-hero">
        <div className="max-w-7xl mx-auto px-6 text-center text-brand-ink space-y-4">
          <span className="bg-[#eef3f6] text-[#366272] text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-widest inline-block">
            Connect With Us
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold max-w-4xl mx-auto tracking-tight leading-none text-[#1c1b1b]" id="contact-title">
            Let’s build your digital presence, <span className="italic text-[#366272]">together.</span>
          </h1>
          <p className="text-sm md:text-base text-[#1c1b1b]/60 max-w-xl mx-auto leading-relaxed">
            Have questions about our tools, local wallet integrations, or need technical help? Tell us more about your offline boutique or spiced farm store.
          </p>
        </div>
      </section>

      {/* 1st Reference Image Section: WebMitra Assistant interactive widget */}
      <motion.section 
        id="contact-assistant-section"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="pt-8 pb-16 max-w-5xl mx-auto px-6"
      >
        <div className="bg-white rounded-[32px] border border-[#1a1a1a]/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-[520px]" id="contact-assistant-container">
          {/* Assistant Header */}
          <div className="bg-[#366272] px-6 py-4 flex justify-between items-center text-white" id="contact-assistant-header">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#366272] shadow-sm">
                <Bot className="w-5.5 h-5.5" />
              </div>
              <div className="text-left">
                <h4 className="font-serif font-bold text-base leading-tight">WebMitra Assistant</h4>
                <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
                  Sync Enabled
                </p>
              </div>
            </div>
            <button 
              onClick={handleResetChat}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white rounded-lg transition-colors uppercase tracking-wider"
              id="contact-assistant-reset-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          {/* Assistant Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50" id="contact-assistant-chat-pane">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start text-left"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full border border-gray-100 bg-white flex items-center justify-center text-[#366272] flex-shrink-0 shadow-sm mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div 
                  className={`px-5 py-4 rounded-3xl max-w-[80%] text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-[#366272] text-white rounded-tr-none text-right"
                      : "bg-white border border-[#1a1a1a]/5 text-[#1c1b1b] rounded-tl-none font-sans"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[9px] mt-1 tracking-wider ${msg.sender === "user" ? "text-white/60 text-right" : "text-gray-400"}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {chatLoading && (
              <div className="flex gap-3 justify-start text-left">
                <div className="w-8 h-8 rounded-full border border-gray-100 bg-white flex items-center justify-center text-[#366272] flex-shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-[#1a1a1a]/5 px-5 py-4 rounded-3xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#366272]/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#366272]/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#366272]/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Assistant Input Bar */}
          <form 
            onSubmit={handleSendChatMessage} 
            className="p-4 border-t border-[#1a1a1a]/10 bg-white flex gap-3 items-center" 
            id="contact-assistant-input-form"
          >
            <input 
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-grow border border-[#1a1a1a]/10 rounded-full px-5 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-[#366272] focus:border-[#366272] bg-gray-50/50 font-sans"
              id="contact-assistant-input"
            />
            <button 
              type="submit"
              className="bg-[#366272] text-white p-3 rounded-full hover:bg-[#366272]/90 flex-shrink-0 cursor-pointer shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.section>

      {/* 2nd Reference Image Section: Contact Info details side-by-side with Headquarters image */}
      <motion.section 
        id="contact-info-section"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 max-w-6xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-2 gap-8" id="contact-info-grid">
          {/* Solid Teal Information panel */}
          <div className="bg-[#4b7182] text-white p-10 md:p-14 rounded-[36px] flex flex-col justify-center space-y-8 text-left shadow-sm" id="contact-info-card">
            <h2 className="font-serif text-3xl md:text-[40px] font-bold tracking-tight text-white/95 leading-tight">
              Contact Information
            </h2>

            <div className="space-y-6">
              {/* Email item */}
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-white/10 rounded-2xl text-white flex-shrink-0">
                  <Mail className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-white/60 mb-0.5">Email Us</span>
                  <span className="font-sans text-sm md:text-base font-semibold text-white/95">hello@webmitra.com.np</span>
                </div>
              </div>

              {/* Phone item */}
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-white/10 rounded-2xl text-white flex-shrink-0">
                  <Phone className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-white/60 mb-0.5">Call Us</span>
                  <span className="font-sans text-sm md:text-base font-semibold text-white/95">+977 1 4567890</span>
                </div>
              </div>

              {/* Address item */}
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-white/10 rounded-2xl text-white flex-shrink-0">
                  <MapPin className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-white/60 mb-0.5">Visit Us</span>
                  <span className="font-sans text-sm md:text-base font-semibold text-white/95">123 Maitighar, Kathmandu, Nepal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Headquarters card details */}
          <div className="relative rounded-[36px] overflow-hidden aspect-[4/3] md:aspect-auto h-full group shadow-sm text-left border border-gray-100" id="contact-headquarters-card">
            <img 
              alt="Our headquarters office workspace" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUqHUJ35x3AyQN4h4BR6IbLy0cgUcCJW94o2pcV39TR-KqNc37ow2rl0EkxGyxgw3Bdc_EHrO4yz8KIejnIADy9ZJX1pr0phFa5y_egDBmhkwAri66uqeg0QxNPoFKAm8VVeO2bY-n23WG7kmBLJiMggO_1O45CUDgbxysX4iMo52owq9uzo7M41L_1W1s_ZajHhbB7DsPN9AZma6V9QJsZlKaBB59cWIpL6VmrkRgFWIJ_-WKzjNodfgQJ87bO1F6K4qjcQDoZZo"
              referrerPolicy="no-referrer"
            />
            {/* Ambient Darkened bottom text gradient */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-8 pt-20 flex items-end">
              <p className="font-sans text-white text-sm md:text-base font-medium tracking-wide">
                Our headquarters in the heart of Kathmandu.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3rd Reference Image Section: Frequently Asked Questions accordions */}
      <motion.section 
        id="contact-faq-section"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-[#fafbfc] border-t border-[#1a1a1a]/5"
      >
        <div className="max-w-3xl mx-auto px-6" id="contact-faq-wrapper">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-[42px] font-bold text-[#1c1b1b] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-[#1c1b1b]/70 text-sm md:text-base mt-2.5">
              Quick answers to questions you may have.
            </p>
          </div>

          <div className="space-y-4 text-left" id="faqs-accordion-list">
            {faqData.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  id={`contact-faq-item-${idx}`}
                  className="bg-white rounded-[20px] border border-[#1a1a1a]/5 overflow-hidden shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-350"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-6 font-sans font-semibold text-sm md:text-base hover:bg-gray-50/50 text-[#1c1b1b] transition-colors cursor-pointer text-left"
                  >
                    <span className={isOpen ? "text-[#366272]" : ""}>{faq.question}</span>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#dbf0f5]/60 text-blue-500">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#366272] transition-transform duration-300 rotate-180" />
                      ) : (
                        <Plus className="w-4 h-4 text-[#366272] transition-transform duration-300" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 text-[#1c1b1b]/70 text-xs md:text-sm leading-relaxed border-t border-[#1a1a1a]/5 bg-gray-50/20 font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </>
  );
}
