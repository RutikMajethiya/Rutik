import React, { useState, useId } from 'react';
import { Plus, Check, Info, Sparkles } from 'lucide-react';
import {
  cookieVarieties,
  cookiePricing,
  CookieVariety
} from '../data/bakeryData';

export interface CookieOrderItem {
  id: string;
  category: 'cookie';
  variety: CookieVariety;
  weightGrams: number;
  sweetenerType: 'Traditional Raw Sugar' | 'Alternative Natural Sweetener';
  basePrice: number;
  sweetenerSurcharge: number;
  totalPrice: number;
  specialNotes: string;
}

interface CookieBuilderProps {
  onAddCookieToOrder: (cookie: CookieOrderItem) => void;
}

export const CookieBuilder: React.FC<CookieBuilderProps> = ({ onAddCookieToOrder }) => {
  const [selectedVariety, setSelectedVariety] = useState<CookieVariety>(cookieVarieties[0]);
  const [weightGrams, setWeightGrams] = useState<number>(500); // 500g default
  const [sweetenerType, setSweetenerType] = useState<'Traditional Raw Sugar' | 'Alternative Natural Sweetener'>('Traditional Raw Sugar');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const cookieNotesInputId = useId();

  // Pricing calculations:
  // Base price per 250g is ₹450
  // Alternative sweetener is +₹100 per 250g
  const portionsOf250g = weightGrams / 250;
  const baseCookiePrice = Math.round(cookiePricing.basePricePer250g * portionsOf250g);
  const sweetenerSurcharge = sweetenerType === 'Alternative Natural Sweetener'
    ? Math.round(cookiePricing.alternativeSweetenerSurchargePer250g * portionsOf250g)
    : 0;
  const totalCookiePrice = baseCookiePrice + sweetenerSurcharge;

  const handleAddOrder = () => {
    const item: CookieOrderItem = {
      id: `cookie-${Date.now()}`,
      category: 'cookie',
      variety: selectedVariety,
      weightGrams,
      sweetenerType,
      basePrice: baseCookiePrice,
      sweetenerSurcharge,
      totalPrice: totalCookiePrice,
      specialNotes
    };

    onAddCookieToOrder(item);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Category Banner */}
      <div className="bg-[#FAF3EC] border border-[#E8DCCF] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A3E26] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisan Cookie Batch</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2C2420]">
            Cookies
          </h2>
          <p className="text-sm italic font-serif text-[#7A3E26]">
            "Something crisp, buttery and delicious."
          </p>
          <p className="text-xs text-[#532E1C]/80 mt-1 max-w-xl">
            Slow baked with pure creamery butter, single-origin chocolate chunks, and wholesome nuts. Available with traditional raw sugar or alternative natural sweeteners.
          </p>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E8DCCF] text-center sm:text-right shrink-0">
          <span className="text-xs text-[#532E1C]/70 block">Base Price</span>
          <span className="text-2xl font-serif font-bold text-[#7A3E26] tabular-nums">
            ₹{cookiePricing.basePricePer250g}
          </span>
          <span className="text-xs text-[#532E1C]/70 block">per 250 grams</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Customization Area */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* Step 1: Cookie Variety */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                  Step 1
                </span>
                <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                  Choose Cookie Variety
                </h3>
              </div>
              <span className="text-xs text-[#532E1C]/70">
                Freshly Baked Batches
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {cookieVarieties.map((variety) => {
                const isSelected = selectedVariety.id === variety.id;
                return (
                  <button
                    key={variety.id}
                    onClick={() => setSelectedVariety(variety)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#7A3E26] bg-[#FAF3EC] shadow-sm ring-1 ring-[#7A3E26]'
                        : 'border-[#E8DCCF] bg-white hover:border-[#D6C4B0]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-[#2C2420]">
                        {variety.name}
                      </h4>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#7A3E26] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[#532E1C]/75 mt-1 leading-relaxed">
                      {variety.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Weight Selection */}
          <div className="space-y-3 pt-2 border-t border-[#E8DCCF]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                  Step 2
                </span>
                <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                  Select Weight (Grams)
                </h3>
              </div>
              <span className="text-xs text-[#532E1C]/80">
                Standard ₹450 / 250g
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[250, 500, 750, 1000].map((grams) => {
                const isSelected = weightGrams === grams;
                const portion = grams / 250;
                const price = cookiePricing.basePricePer250g * portion;

                return (
                  <button
                    key={grams}
                    onClick={() => setWeightGrams(grams)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#7A3E26] text-white border-[#7A3E26] shadow-sm'
                        : 'bg-white hover:bg-[#FAF3EC] text-[#2C2420] border-[#E8DCCF]'
                    }`}
                  >
                    <span className="text-base font-bold block tabular-nums">
                      {grams >= 1000 ? `${grams / 1000} kg` : `${grams}g`}
                    </span>
                    <span
                      className={`text-xs block tabular-nums ${
                        isSelected ? 'text-white/80' : 'text-[#7A3E26] font-medium'
                      }`}
                    >
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Sweetener Preference */}
          <div className="space-y-3 pt-2 border-t border-[#E8DCCF]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                Step 3
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                Sweetener Preference
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setSweetenerType('Traditional Raw Sugar')}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  sweetenerType === 'Traditional Raw Sugar'
                    ? 'border-[#7A3E26] bg-[#FAF3EC] shadow-sm ring-1 ring-[#7A3E26]'
                    : 'border-[#E8DCCF] bg-white hover:border-[#D6C4B0]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#2C2420]">Traditional Raw Sugar</span>
                  <span className="text-xs text-[#7A3E26] font-medium">Included</span>
                </div>
                <p className="text-xs text-[#532E1C]/70 mt-1">
                  Classic caramelized bakery crunch and melt-in-mouth tenderness.
                </p>
              </button>

              <button
                onClick={() => setSweetenerType('Alternative Natural Sweetener')}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  sweetenerType === 'Alternative Natural Sweetener'
                    ? 'border-[#7A3E26] bg-[#FAF3EC] shadow-sm ring-1 ring-[#7A3E26]'
                    : 'border-[#E8DCCF] bg-white hover:border-[#D6C4B0]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#2C2420]">Alternative Sweetener</span>
                  <span className="text-xs text-[#7A3E26] font-bold tabular-nums">
                    +₹{cookiePricing.alternativeSweetenerSurchargePer250g}/250g
                  </span>
                </div>
                <p className="text-xs text-[#532E1C]/70 mt-1">
                  Crafted using unrefined organic jaggery and date reduction blends.
                </p>
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="pt-2 border-t border-[#E8DCCF]">
            <label htmlFor={cookieNotesInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
              Dietary notes or packaging requests (Optional)
            </label>
            <textarea
              id={cookieNotesInputId}
              rows={2}
              placeholder="e.g. Extra crisp, tin pack requested, eggless batch..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
            />
          </div>

        </div>

        {/* Right Live Summary */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-2xl p-6 border border-[#E8DCCF] shadow-sm space-y-5">
            
            <div className="border-b border-[#F0E6DA] pb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7A3E26] block">
                Your Cookie Selection
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2C2420] mt-0.5">
                {selectedVariety.name}
              </h3>
              <p className="text-xs text-[#532E1C]/80 mt-1">
                {weightGrams}g · {sweetenerType}
              </p>
            </div>

            {/* Price lines */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-[#532E1C]">
                <div>
                  <span>Base Cookie Price</span>
                  <p className="text-[11px] text-[#532E1C]/70">
                    ₹{cookiePricing.basePricePer250g} × {portionsOf250g} ({weightGrams}g)
                  </p>
                </div>
                <span className="font-semibold tabular-nums text-[#2C2420]">
                  ₹{baseCookiePrice.toLocaleString('en-IN')}
                </span>
              </div>

              {sweetenerSurcharge > 0 && (
                <div className="flex items-center justify-between text-[#532E1C]">
                  <div>
                    <span>Alternative Sweetener</span>
                    <p className="text-[11px] text-[#532E1C]/70">
                      ₹{cookiePricing.alternativeSweetenerSurchargePer250g} × {portionsOf250g}
                    </p>
                  </div>
                  <span className="font-semibold tabular-nums text-[#2C2420]">
                    +₹{sweetenerSurcharge.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>

            {/* Estimated Total */}
            <div className="pt-3 border-t border-[#F0E6DA]">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-base font-serif font-bold text-[#2C2420]">
                  Estimated Total
                </span>
                <span className="text-2xl font-serif font-bold text-[#7A3E26] tabular-nums">
                  ₹{totalCookiePrice.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-[#532E1C]/70">
                Packed in airtight freshness packaging.
              </p>
            </div>

            {/* Add to Order Button */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleAddOrder}
                className="w-full py-3.5 px-4 text-sm font-semibold text-white bg-[#7A3E26] hover:bg-[#63321E] active:scale-[0.98] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Almost ready to bake · Add to Creation</span>
              </button>

              {addedNotice && (
                <p className="text-xs text-center text-[#1F5E3B] font-semibold animate-in fade-in">
                  ✓ Cookies added to your creation summary!
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#532E1C]/75 pt-1">
              <Info className="w-3.5 h-3.5 text-[#7A3E26] shrink-0" />
              <span>Baked with 100% pure butter and natural ingredients.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
