import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import {
  BAKERY_NAME,
  BAKERY_PHONE_1,
  BAKERY_PHONE_1_RAW,
  BAKERY_PHONE_2,
  BAKERY_PHONE_2_RAW
} from '../data/bakeryData';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  orderItemCount: number;
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  orderItemCount,
  onOpenOrderModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCallDropdown, setShowCallDropdown] = useState(false);

  const navLinks = [
    { id: 'cake', label: 'Cakes' },
    { id: 'cupcake', label: 'Cupcakes' },
    { id: 'cookie', label: 'Cookies' },
    { id: 'bread', label: 'Bread' },
    { id: 'biscuits', label: 'Biscuits' },
    { id: 'custom', label: 'Custom Orders' }
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DCCF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <button
          onClick={() => handleNavClick('cake')}
          className="text-2xl font-serif font-bold tracking-tight text-[#2C2420] hover:text-[#7A3E26] transition-colors text-left"
        >
          {BAKERY_NAME}
        </button>

        {/* Zone 2: 4–6 nav links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#532E1C]/80">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#7A3E26] font-semibold'
                    : 'hover:text-[#2C2420]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A3E26] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Quick Call Dropdown / Button */}
          <div className="relative">
            <button
              onClick={() => setShowCallDropdown(!showCallDropdown)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#532E1C] bg-[#EFE6DC] hover:bg-[#E4D7C8] rounded-lg transition-colors cursor-pointer"
              title="Call Dhanya Bakers"
            >
              <Phone className="w-3.5 h-3.5 text-[#7A3E26]" />
              <span>Call Dhanya Bakers</span>
            </button>

            {showCallDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E8DCCF] p-2 z-50 animate-in fade-in zoom-in-95">
                <p className="px-3 py-1.5 text-xs text-[#7A3E26] font-semibold">
                  Official Bakery Contacts
                </p>
                <a
                  href={`tel:${BAKERY_PHONE_1_RAW}`}
                  onClick={() => setShowCallDropdown(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[#2C2420] hover:bg-[#FAF7F2] rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7A3E26]" />
                  <span>{BAKERY_PHONE_1}</span>
                </a>
                <a
                  href={`tel:${BAKERY_PHONE_2_RAW}`}
                  onClick={() => setShowCallDropdown(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[#2C2420] hover:bg-[#FAF7F2] rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7A3E26]" />
                  <span>{BAKERY_PHONE_2}</span>
                </a>
              </div>
            )}
          </div>

          {/* Review / Enquiry Order Action */}
          <button
            onClick={onOpenOrderModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#7A3E26] hover:bg-[#63321E] active:scale-[0.98] rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>Your Creation</span>
            {orderItemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white/20 text-white text-[11px] flex items-center justify-center font-bold">
                {orderItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#532E1C] hover:bg-[#EFE6DC] rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8DCCF] px-4 pt-3 pb-5 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E8DCCF]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeTab === link.id
                    ? 'bg-[#EFE6DC] text-[#7A3E26] font-semibold'
                    : 'text-[#2C2420] hover:bg-[#F2ECE4]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-1.5">
            <p className="text-xs text-[#7A3E26] font-semibold px-2">Official Bakery Numbers</p>
            <a
              href={`tel:${BAKERY_PHONE_1_RAW}`}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#2C2420] bg-white rounded-lg border border-[#E8DCCF]"
            >
              <Phone className="w-4 h-4 text-[#7A3E26]" />
              <span>{BAKERY_PHONE_1}</span>
            </a>
            <a
              href={`tel:${BAKERY_PHONE_2_RAW}`}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#2C2420] bg-white rounded-lg border border-[#E8DCCF]"
            >
              <Phone className="w-4 h-4 text-[#7A3E26]" />
              <span>{BAKERY_PHONE_2}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
