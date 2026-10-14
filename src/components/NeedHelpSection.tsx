import React from 'react';
import { HelpCircle } from 'lucide-react';

export const NeedHelpSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#FAF3EC] border-t border-b border-[#E8DCCF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#7A3E26] bg-white px-3 py-1 rounded-full border border-[#E8DCCF]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Customer Assistance</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2420]">Need help deciding?</h2>
          <p className="text-sm sm:text-base text-[#532E1C]/80 max-w-xl mx-auto">
            Have a specific requirement or unsure what to choose? Review your selections before submitting an order enquiry.
          </p>
        </div>
      </div>
    </section>
  );
};
