import React, { useState } from 'react';
import { Phone, MessageCircle, HelpCircle } from 'lucide-react';
import {
  BAKERY_PHONE_1,
  BAKERY_PHONE_1_RAW,
  BAKERY_PHONE_2,
  BAKERY_PHONE_2_RAW
} from '../data/bakeryData';

export const NeedHelpSection: React.FC = () => {
  const [selectedWhatsAppPhone, setSelectedWhatsAppPhone] = useState<string>('919328161200');

  const whatsappUrl = `https://wa.me/${selectedWhatsAppPhone}?text=${encodeURIComponent(
    'Hello Dhanya Bakers! I need help deciding on an order for my craving.'
  )}`;

  return (
    <section className="py-12 bg-[#FAF3EC] border-t border-b border-[#E8DCCF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#7A3E26] bg-white px-3 py-1 rounded-full border border-[#E8DCCF]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Customer Assistance</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2420]">
            Need help deciding?
          </h2>
          <p className="text-sm sm:text-base text-[#532E1C]/80 max-w-xl mx-auto">
            Have a specific requirement or unsure what to choose? Talk to Dhanya Bakers.
          </p>
        </div>

        {/* Buttons conforming to Section 2 & Section 24 */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Call Phone 1 */}
          <a
            href={`tel:${BAKERY_PHONE_1_RAW}`}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#7A3E26] hover:bg-[#63321E] active:scale-[0.98] rounded-xl shadow-sm transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call {BAKERY_PHONE_1}</span>
          </a>

          {/* Call Phone 2 */}
          <a
            href={`tel:${BAKERY_PHONE_2_RAW}`}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#532E1C] bg-white hover:bg-[#F2ECE4] border border-[#E8DCCF] active:scale-[0.98] rounded-xl shadow-sm transition-all"
          >
            <Phone className="w-4 h-4 text-[#7A3E26]" />
            <span>Call {BAKERY_PHONE_2}</span>
          </a>

          {/* WhatsApp Us */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#1F5E3B] bg-[#E2F2E7] hover:bg-[#D4EBDC] active:scale-[0.98] rounded-xl shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-[#1F5E3B]" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* WhatsApp Number Selection */}
        <div className="pt-2 text-xs text-[#532E1C]/75 flex items-center justify-center gap-2">
          <span>Preferred WhatsApp connection:</span>
          <button
            onClick={() => setSelectedWhatsAppPhone('919328161200')}
            className={`cursor-pointer underline transition-colors ${
              selectedWhatsAppPhone === '919328161200' ? 'font-bold text-[#7A3E26]' : 'text-[#532E1C]'
            }`}
          >
            {BAKERY_PHONE_1}
          </button>
          <span>or</span>
          <button
            onClick={() => setSelectedWhatsAppPhone('919409037507')}
            className={`cursor-pointer underline transition-colors ${
              selectedWhatsAppPhone === '919409037507' ? 'font-bold text-[#7A3E26]' : 'text-[#532E1C]'
            }`}
          >
            {BAKERY_PHONE_2}
          </button>
        </div>

      </div>
    </section>
  );
};
