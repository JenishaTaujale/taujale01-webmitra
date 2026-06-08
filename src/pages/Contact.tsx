import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Mail, Phone, MapPin, ChevronDown } from "lucide-react";

export default function Contact() {
  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("General Inquiry");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // FAQ interactive state
  const [activeFaq, setActiveFaq] = useState<number | null>(1); // Set second FAQ open by default like the mockup

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setContactSuccess(false);
    }, 5000);
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
      <section className="relative pt-20 pb-12 overflow-hidden" id="contact-hero">
        <div className="max-w-7xl mx-auto px-6 text-center text-brand-ink space-y-4">
          <span className="bg-brand-secondary/15 text-brand-secondary text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-widest inline-block">
            Connect With Us
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold max-w-4xl mx-auto tracking-tight leading-none text-brand-ink" id="contact-title">
            Let’s build your digital presence, <span className="italic text-brand-primary">together.</span>
          </h1>
          <p className="text-sm text-brand-ink/50 max-w-xl mx-auto leading-relaxed">
            Have questions about our tools, local wallet integrations, or need technical help? Tell us more about your offline boutique or spiced farm store.
          </p>
        </div>
      </section>

      {/* Form & Card Info sections */}
      <motion.section 
        id="contact-details"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-16 max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submission form */}
          <div className="lg:col-span-7 bg-white border border-brand-ink/10 rounded-[32px] p-8 shadow-sm relative text-left" id="contact-form-container">
            <h3 className="font-serif text-lg font-bold mb-6">Send a Message</h3>
            
            {contactSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary text-xs font-semibold flex items-center gap-2"
                id="contact-success-alert"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Mero Mitra! Your message was transmitted to the Central Kathmandu desk. We'll reply within 2 hours.</span>
              </motion.div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4 font-sans" id="contact-form">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-brand-ink/40 uppercase mb-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Robin Shakya"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full border border-brand-ink/10 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white font-sans text-brand-ink"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-ink/40 uppercase mb-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="e.g. robin@gmail.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full border border-brand-ink/10 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white font-sans text-brand-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-brand-ink/40 uppercase mb-1">Subject</label>
                <select 
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full border border-brand-ink/10 rounded-xl px-3.5 py-3 text-xs focus:ring-1 focus:ring-brand-primary bg-white focus:outline-none font-sans text-brand-ink"
                >
                  <option value="General Inquiry">General Inquiry & Account Tries</option>
                  <option value="Technical Support">Technical Support (Esewa / Khalti setup)</option>
                  <option value="Sales & Partnerships">Sales & Exporters collectives</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-brand-ink/40 uppercase mb-1">Your Message</label>
                <textarea 
                  required
                  rows={5}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Tell us about the catalog count, delivery destination, or organic spices scale..."
                  className="w-full border border-brand-ink/10 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white font-sans text-brand-ink"
                />
              </div>

              <button
                type="submit"
                className="w-full font-bold bg-brand-primary text-white py-4 rounded-xl text-xs hover:bg-brand-primary/95 transition-all shadow-md cursor-pointer"
              >
                Transmit Support Request
              </button>
            </form>
          </div>

          {/* Sidebar Address cards */}
          <div className="lg:col-span-5 space-y-6 text-left" id="contact-info-container">
            <div className="bg-brand-primary text-white p-8 rounded-[32px] shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white/10 rounded-xl text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/50 tracking-wide mb-0.5">Email channel</p>
                    <p className="text-xs font-semibold">hello@webmitra.com.np</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white/10 rounded-xl text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/50 tracking-wide mb-0.5">Phone line</p>
                    <p className="text-xs font-semibold">+977 1 4567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white/10 rounded-xl text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/50 tracking-wide mb-0.5">Headquarters</p>
                    <p className="text-xs font-semibold">123 Maitighar, Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architectural visual */}
            <div className="relative rounded-[32px] overflow-hidden aspect-video border shadow-sm" id="contact-image-container">
              <img 
                alt="High quality headquarter picture" 
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUqHUJ35x3AyQN4h4BR6IbLy0cgUcCJW94o2pcV39TR-KqNc37ow2rl0EkxGyxgw3Bdc_EHrO4yz8KIejnIADy9ZJX1pr0phFa5y_egDBmhkwAri66uqeg0QxNPoFKAm8VVeO2bY-n23WG7kmBLJiMggO_1O45CUDgbxysX4iMo52owq9uzo7M41L_1W1s_ZajHhbB7DsPN9AZma6V9QJsZlKaBB59cWIpL6VmrkRgFWIJ_-WKzjNodfgQJ87bO1F6K4qjcQDoZZo"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Dynamic FAQ lists Accordions */}
      <motion.section 
        id="contact-faqs"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-24 bg-brand-paper border-t border-brand-ink/5"
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-xs text-brand-ink/40 mt-2.5">Quick answers to support questions you may have</p>
          </div>

          <div className="space-y-4 text-left" id="faqs-list">
            {faqData.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-brand-ink/5 overflow-hidden shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-5 font-sans font-semibold text-sm hover:bg-brand-paper/40 text-brand-ink transition-colors cursor-pointer text-left"
                  >
                    <span className={isOpen ? "text-brand-primary" : ""}>{faq.question}</span>
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-brand-primary rotate-180 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-brand-ink/40 transition-transform duration-300" />
                    )}
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 text-brand-ink/65 text-xs leading-relaxed border-t border-brand-ink/5 pt-3.5 bg-brand-paper/20">
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
