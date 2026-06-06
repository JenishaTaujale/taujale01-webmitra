import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  onScrollToHome?: () => void;
  onScrollToProduct?: () => void;
  onScrollToAbout?: () => void;
  onScrollToContact?: () => void;
}

export default function Footer({
  onScrollToHome,
  onScrollToProduct,
  onScrollToAbout,
  onScrollToContact,
}: FooterProps) {
  return (
    <footer className="bg-white pt-20 pb-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-x-16 lg:gap-x-24 mb-16">
          {/* Column 1: Brand description and Social links */}
          <div className="md:col-span-6 flex flex-col items-start">
            <h3 className="font-serif text-3xl font-bold text-brand-ink mb-5 select-none">
              WebMitra
            </h3>
            <p className="font-sans text-sm leading-relaxed text-brand-ink/65 max-w-[340px] mb-6">
              Empowering Nepal's digital economy through professional commerce infrastructure and AI-driven growth tools.
            </p>
            {/* Social Icons Row */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-brand-ink/35 hover:text-brand-ink hover:scale-105 transition-all"
              >
                <Facebook className="w-5 h-5 stroke-[1.5]" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-brand-ink/35 hover:text-brand-ink hover:scale-105 transition-all"
              >
                <Instagram className="w-5 h-5 stroke-[1.5]" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-brand-ink/35 hover:text-brand-ink hover:scale-105 transition-all"
              >
                <Twitter className="w-5 h-5 stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col items-start md:pl-4">
            <h4 className="font-serif text-lg font-bold text-brand-ink mb-6 select-none">
              Quick Links
            </h4>
            <ul className="space-y-4 font-sans text-sm font-medium text-brand-ink/65">
              <li>
                <button
                  onClick={onScrollToHome}
                  className="hover:text-[#366272] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToProduct}
                  className="hover:text-[#366272] transition-colors cursor-pointer text-left"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToAbout}
                  className="hover:text-[#366272] transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToContact}
                  className="hover:text-[#366272] transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-3 flex flex-col items-start">
            <h4 className="font-serif text-lg font-bold text-brand-ink mb-6 select-none">
              Contact
            </h4>
            <ul className="space-y-4 font-sans text-sm font-medium text-brand-ink/65">
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-brand-ink/35 flex-shrink-0 stroke-[1.5] group-hover:text-[#366272] transition-colors" />
                <a href="mailto:info@webmitra.com" className="hover:text-[#366272] transition-colors">
                  info@webmitra.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-brand-ink/35 flex-shrink-0 stroke-[1.5] group-hover:text-[#366272] transition-colors" />
                <a href="tel:+97711456789" className="hover:text-[#366272] transition-colors">
                  +977 11-456789
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-brand-ink/35 mt-0.5 flex-shrink-0 stroke-[1.5] group-hover:text-[#366272] transition-colors" />
                <span className="leading-relaxed">
                  Banepa, Kavre, Nepal
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright centered text and thin divider */}
        <div className="pt-10 border-t border-brand-ink/5 text-center">
          <p className="font-sans text-xs font-medium text-brand-ink/40 select-none tracking-wide">
            © 2026 WebMitra. Built for Nepali small businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}

