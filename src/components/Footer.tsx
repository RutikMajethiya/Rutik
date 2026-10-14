import React from 'react';
import { Phone } from 'lucide-react';
import {
  BAKERY_NAME,
  BAKERY_TAGLINE,
  BAKERY_PHONE_1,
  BAKERY_PHONE_1_RAW,
  BAKERY_PHONE_2,
  BAKERY_PHONE_2_RAW
} from '../data/bakeryData';

interface FooterProps {
  onSelectNav: (id: string) => void;
  onScrollToContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNav, onScrollToContact }) => {
  return (
    <footer className="bg-[#241E1B] text-[#E8DCCF] pt-12 pb-10 border-t border-[#3A322C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#3A322C]">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              {BAKERY_NAME}
            </h3>
            <p className="text-base font-serif italic text-[#D8B498]">
              "{BAKERY_TAGLINE}"
            </p>
            <p className="text-xs text-[#A8988C] max-w-sm leading-relaxed">
              Bespoke celebration cakes, gourmet cupcakes, butter cookies, and pure butter artisan breads handcrafted fresh to order.
            </p>
          </div>

          {/* Navigation Links strictly conforming to Section 25 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D8B498]">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onSelectNav('cake')}
                className="text-left text-[#E8DCCF]/85 hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => onSelectNav('cake')}
                className="text-left text-[#E8DCCF]/85 hover:text-white transition-colors cursor-pointer"
              >
                Cakes
              </button>
              <button
                onClick={() => onSelectNav('cupcake')}
                className="text-left text-[#E8DCCF]/85 hover:text-white transition-colors cursor-pointer"
              >
                Cupcakes
              </button>
              <button
                onClick={() => onSelectNav('cookie')}
                className="text-left text-[#E8DCCF]/85 hover:text-white transition-colors cursor-pointer"
              >
                Cookies
              </button>
              <button
                onClick={() => onSelectNav('bread')}
                className="text-left text-[#E8DCCF]/85 hover:text-white transition-colors cursor-pointer"
              >
                Bread
              </button>
              <button
                onClick={() => onSelectNav('biscuits')}
                className="text-left text-[#E8DCCF]/85 hover:text-white transition-colors cursor-pointer"
              >
                Biscuits
              </button>
              <button
                onClick={() => onSelectNav('custom')}
                className="text-left text-[#E8DCCF]/85 hover:text-white transition-colors cursor-pointer"
              >
                Custom Orders
              </button>
              <button
                onClick={onScrollToContact}
                className="text-left text-[#E8DCCF]/85 hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Official Contact Details strictly conforming to Section 25 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D8B498]">
              Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${BAKERY_PHONE_1_RAW}`}
                className="flex items-center gap-2 text-[#E8DCCF] hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D8B498]" />
                <span className="tabular-nums">{BAKERY_PHONE_1}</span>
              </a>
              <a
                href={`tel:${BAKERY_PHONE_2_RAW}`}
                className="flex items-center gap-2 text-[#E8DCCF] hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D8B498]" />
                <span className="tabular-nums">{BAKERY_PHONE_2}</span>
              </a>
            </div>
            <p className="text-[11px] text-[#A8988C] pt-1">
              Clickable on mobile for direct dialing.
            </p>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7B70] gap-2">
          <span>© {BAKERY_NAME}</span>
          <span>Freshly baked delicacies for every celebration.</span>
        </div>
      </div>
    </footer>
  );
};
