import React, { useState, useId } from 'react';
import { Sparkles, Check, Info, Plus, Percent } from 'lucide-react';
import {
  cakeFlavours,
  cakeBases,
  standardCakeWeights,
  getCakeDiscount,
  CakeFlavour,
  CakeBase
} from '../data/bakeryData';

export interface CakeOrderItem {
  id: string;
  category: 'cake';
  flavour: CakeFlavour;
  weightKg: number;
  base: CakeBase;
  basePrice: number;
  discountRate: number;
  discountAmount: number;
  baseSurcharge: number;
  totalPrice: number;
  message: string;
  occasion: string;
  customNotes: string;
  decorationType: string;
}

interface CakeBuilderProps {
  onAddCakeToOrder: (cake: CakeOrderItem) => void;
}

export const CakeBuilder: React.FC<CakeBuilderProps> = ({ onAddCakeToOrder }) => {
  const [selectedFlavour, setSelectedFlavour] = useState<CakeFlavour>(cakeFlavours[0]);
  const [selectedWeight, setSelectedWeight] = useState<number>(2);
  const [customWeightInput, setCustomWeightInput] = useState<string>('');
  const [isCustomWeight, setIsCustomWeight] = useState<boolean>(false);
  const [selectedBase, setSelectedBase] = useState<CakeBase>(cakeBases[0]);
  const [messageOnCake, setMessageOnCake] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Birthday');
  const [decorationType, setDecorationType] = useState<string>('Classic Swirls');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const customWeightInputId = useId();
  const cakeOccasionInputId = useId();
  const cakeDecorationInputId = useId();
  const cakeMessageInputId = useId();
  const cakeNotesInputId = useId();

  // Active weight calculation
  const effectiveWeight = isCustomWeight
    ? Math.max(0.5, Math.min(15, parseFloat(customWeightInput) || 1))
    : selectedWeight;

  // Pricing calculations conforming to rules:
  // Base cake price = flavourPricePerKg * weightKg
  const baseCakePrice = Math.round(selectedFlavour.pricePerKg * effectiveWeight);
  
  // Discount percentage from getCakeDiscount
  const discountRate = getCakeDiscount(effectiveWeight);
  const discountAmount = Math.round(baseCakePrice * discountRate);

  // Base surcharge calculated according to the selected cake weight
  const baseSurcharge = Math.round(selectedBase.surchargePerKg * effectiveWeight);

  // Final Estimated Total
  const estimatedTotal = baseCakePrice - discountAmount + baseSurcharge;

  const handleSelectWeight = (wt: number) => {
    setIsCustomWeight(false);
    setSelectedWeight(wt);
  };

  const handleCustomWeightChange = (val: string) => {
    setCustomWeightInput(val);
    setIsCustomWeight(true);
  };

  const handleAddOrder = () => {
    const item: CakeOrderItem = {
      id: `cake-${Date.now()}`,
      category: 'cake',
      flavour: selectedFlavour,
      weightKg: effectiveWeight,
      base: selectedBase,
      basePrice: baseCakePrice,
      discountRate,
      discountAmount,
      baseSurcharge,
      totalPrice: estimatedTotal,
      message: messageOnCake,
      occasion,
      customNotes,
      decorationType
    };

    onAddCakeToOrder(item);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* 23. Tasteful Promotional Banner */}
      <div className="bg-gradient-to-r from-[#FAF3EC] via-[#F5EADB] to-[#FAF3EC] border border-[#E8DCCF] rounded-2xl p-5 sm:p-6 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A3E26] uppercase tracking-wider mb-1">
          <Percent className="w-3.5 h-3.5" />
          <span>More Cake. More Celebration. More Savings.</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2420]">
          Enjoy up to 30% off on larger cakes
        </h3>
        <p className="text-xs sm:text-sm text-[#532E1C]/80 mt-1 max-w-xl mx-auto">
          Planning a party or family gathering? The larger the cake, the greater the celebration discount.
        </p>

        {/* Tier Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-4 max-w-2xl mx-auto">
          <div className="bg-white/90 rounded-xl p-2.5 border border-[#E8DCCF]">
            <span className="text-xs text-[#532E1C]/80 block">2 kg cake</span>
            <span className="text-base font-bold text-[#7A3E26] tabular-nums">10% OFF</span>
          </div>
          <div className="bg-white/90 rounded-xl p-2.5 border border-[#E8DCCF]">
            <span className="text-xs text-[#532E1C]/80 block">3 kg cake</span>
            <span className="text-base font-bold text-[#7A3E26] tabular-nums">20% OFF</span>
          </div>
          <div className="bg-white/90 rounded-xl p-2.5 border border-[#E8DCCF]">
            <span className="text-xs text-[#532E1C]/80 block">4 kg cake</span>
            <span className="text-base font-bold text-[#7A3E26] tabular-nums">25% OFF</span>
          </div>
          <div className="bg-white/90 rounded-xl p-2.5 border border-[#E8DCCF]">
            <span className="text-xs text-[#532E1C]/80 block">5 kg & above</span>
            <span className="text-base font-bold text-[#7A3E26] tabular-nums">30% OFF</span>
          </div>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Customization Controls */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* 1. Flavour Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                  Step 1
                </span>
                <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                  Choose Your Cake Flavour
                </h3>
              </div>
              <span className="text-xs text-[#532E1C]/70">
                10 Artisan Flavours
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {cakeFlavours.map((flavour) => {
                const isSelected = selectedFlavour.id === flavour.id;
                return (
                  <button
                    key={flavour.id}
                    onClick={() => setSelectedFlavour(flavour)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#7A3E26] bg-[#FAF3EC] shadow-sm ring-1 ring-[#7A3E26]'
                        : 'border-[#E8DCCF] bg-white hover:border-[#D6C4B0]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-semibold text-sm text-[#2C2420]">
                            {flavour.name}
                          </h4>
                          {flavour.badge && (
                            <span className="text-[10px] font-semibold text-[#7A3E26] bg-[#EFE6DC] px-1.5 py-0.5 rounded">
                              {flavour.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#532E1C]/75 mt-1 line-clamp-2 leading-relaxed">
                          {flavour.description}
                        </p>
                      </div>
                      
                      {/* Price per Kg */}
                      <span className="text-xs font-bold text-[#7A3E26] tabular-nums shrink-0">
                        ₹{flavour.pricePerKg.toLocaleString('en-IN')}/kg
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#7A3E26] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Cake Weight & Progressive Discount */}
          <div className="space-y-3 pt-2 border-t border-[#E8DCCF]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                  Step 2
                </span>
                <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                  Select Cake Weight
                </h3>
              </div>
              {discountRate > 0 ? (
                <span className="text-xs font-bold text-[#1F5E3B] bg-[#E2F2E7] px-2.5 py-1 rounded-md">
                  {Math.round(discountRate * 100)}% Weight Discount Applied!
                </span>
              ) : (
                <span className="text-xs text-[#532E1C]/70">
                  Select 2 kg+ to unlock discount
                </span>
              )}
            </div>

            {/* Standard Weight Buttons */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {standardCakeWeights.map((wt) => {
                const isSelected = !isCustomWeight && selectedWeight === wt;
                const tierDisc = getCakeDiscount(wt);

                return (
                  <button
                    key={wt}
                    onClick={() => handleSelectWeight(wt)}
                    className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#7A3E26] text-white border-[#7A3E26] shadow-sm'
                        : 'bg-white hover:bg-[#FAF3EC] text-[#2C2420] border-[#E8DCCF]'
                    }`}
                  >
                    <span className="text-sm font-bold block tabular-nums">
                      {wt} kg
                    </span>
                    <span
                      className={`text-[10px] block ${
                        isSelected
                          ? 'text-white/80'
                          : tierDisc > 0
                          ? 'text-[#1F5E3B] font-semibold'
                          : 'text-[#532E1C]/50'
                      }`}
                    >
                      {tierDisc > 0 ? `-${Math.round(tierDisc * 100)}%` : '0%'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Weight Input */}
            <div className="pt-2 flex items-center gap-3">
              <label htmlFor={customWeightInputId} className="text-xs text-[#532E1C] font-medium whitespace-nowrap">
                Need a specific weight?
              </label>
              <div className="relative max-w-[140px]">
                <input
                  id={customWeightInputId}
                  type="number"
                  min="0.5"
                  max="20"
                  step="0.5"
                  placeholder="e.g. 3.5"
                  value={customWeightInput}
                  onChange={(e) => handleCustomWeightChange(e.target.value)}
                  className={`w-full py-1.5 px-3 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26] ${
                    isCustomWeight ? 'border-[#7A3E26] ring-1 ring-[#7A3E26]' : 'border-[#E8DCCF]'
                  }`}
                />
                <span className="absolute right-3 top-1.5 text-xs text-[#532E1C]/60 pointer-events-none">
                  kg
                </span>
              </div>
              {isCustomWeight && (
                <button
                  onClick={() => setIsCustomWeight(false)}
                  className="text-xs text-[#7A3E26] hover:underline"
                >
                  Reset to presets
                </button>
              )}
            </div>
          </div>

          {/* 3. Cake Base Flour Options */}
          <div className="space-y-3 pt-2 border-t border-[#E8DCCF]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                Step 3
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                Choose Cake Base
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {cakeBases.map((base) => {
                const isSelected = selectedBase.id === base.id;
                return (
                  <button
                    key={base.id}
                    onClick={() => setSelectedBase(base)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#7A3E26] bg-[#FAF3EC] shadow-sm ring-1 ring-[#7A3E26]'
                        : 'border-[#E8DCCF] bg-white hover:border-[#D6C4B0]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-sm text-[#2C2420]">
                        {base.name}
                      </h4>
                      <span className="text-xs font-bold text-[#7A3E26] tabular-nums">
                        {base.surchargePerKg === 0 ? 'Included' : `+₹${base.surchargePerKg}/kg`}
                      </span>
                    </div>
                    <p className="text-xs text-[#532E1C]/75 mt-1 leading-relaxed">
                      {base.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Occasion, Name / Message & Customization */}
          <div className="space-y-4 pt-2 border-t border-[#E8DCCF]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                Step 4
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                Personalize & Special Requests
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={cakeOccasionInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Occasion
                </label>
                <select
                  id={cakeOccasionInputId}
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Festive Celebration">Festive Celebration</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Party">Party</option>
                  <option value="Just Because">Just Because</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor={cakeDecorationInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Decoration Style
                </label>
                <select
                  id={cakeDecorationInputId}
                  value={decorationType}
                  onChange={(e) => setDecorationType(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                >
                  <option value="Classic Swirls">Classic Swirls (Included)</option>
                  <option value="Elegant Floral Crest">Elegant Floral Crest (Included)</option>
                  <option value="Rich Chocolate Curls">Rich Chocolate Curls (Included)</option>
                  <option value="Festive Sprinkles">Festive Sprinkles (Included)</option>
                  <option value="Custom Themed Decor">Custom Design (To be confirmed)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor={cakeMessageInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                Name or Message on Cake (Optional)
              </label>
              <input
                id={cakeMessageInputId}
                type="text"
                placeholder="e.g. Happy Birthday Aarav!"
                value={messageOnCake}
                onChange={(e) => setMessageOnCake(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
              />
            </div>

            <div>
              <label htmlFor={cakeNotesInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                Dietary notes or special cake instructions (Optional)
              </label>
              <textarea
                id={cakeNotesInputId}
                rows={2}
                placeholder="e.g. 100% Eggless, less sweetness, golden candle required..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
              />
            </div>
          </div>

        </div>

        {/* Right Live Price Breakdown UI (Sticky & Detailed) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-2xl p-6 border border-[#E8DCCF] shadow-sm space-y-5">
            
            {/* Header */}
            <div className="border-b border-[#F0E6DA] pb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7A3E26] block">
                Your Creation
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2C2420] mt-0.5">
                {selectedFlavour.name}
              </h3>
              <p className="text-xs text-[#532E1C]/80 mt-1">
                {effectiveWeight} kg · {selectedBase.name} · {occasion}
              </p>
            </div>

            {/* Price Line Items conforming to Section 7 & Section 22 */}
            <div className="space-y-3 text-sm">
              
              {/* Base Cake Price */}
              <div className="flex items-center justify-between text-[#532E1C]">
                <div>
                  <span>Base cake price</span>
                  <p className="text-[11px] text-[#532E1C]/70">
                    ₹{selectedFlavour.pricePerKg.toLocaleString('en-IN')} × {effectiveWeight} kg
                  </p>
                </div>
                <span className="font-semibold tabular-nums text-[#2C2420]">
                  ₹{baseCakePrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Cake Quantity Discount */}
              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-[#1F5E3B] bg-[#E2F2E7]/60 p-2.5 rounded-lg">
                  <div>
                    <span className="font-semibold">
                      Cake quantity discount ({Math.round(discountRate * 100)}%)
                    </span>
                    <p className="text-[11px] text-[#1F5E3B]">
                      Applied on {effectiveWeight} kg order
                    </p>
                  </div>
                  <span className="font-bold tabular-nums">
                    −₹{discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {/* Base Surcharge */}
              {baseSurcharge > 0 && (
                <div className="flex items-center justify-between text-[#532E1C]">
                  <div>
                    <span>{selectedBase.name} surcharge</span>
                    <p className="text-[11px] text-[#532E1C]/70">
                      ₹{selectedBase.surchargePerKg} × {effectiveWeight} kg
                    </p>
                  </div>
                  <span className="font-semibold tabular-nums text-[#2C2420]">
                    +₹{baseSurcharge.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {/* Customization Surcharges note */}
              {decorationType === 'Custom Themed Decor' && (
                <div className="text-xs text-[#7A3E26] bg-[#FAF3EC] p-2.5 rounded-lg border border-[#E8DCCF]">
                  <span className="font-semibold block">Additional customization charges:</span>
                  <span>To be confirmed based on your design requirement</span>
                </div>
              )}

            </div>

            {/* Savings Callout */}
            {discountAmount > 0 && (
              <div className="bg-[#FAF3EC] border border-[#E8DCCF] rounded-xl p-3 text-center">
                <p className="text-xs font-bold text-[#7A3E26]">
                  🎉 You save ₹{discountAmount.toLocaleString('en-IN')} with our quantity discount.
                </p>
              </div>
            )}

            {/* Estimated Total */}
            <div className="pt-3 border-t border-[#F0E6DA]">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-base font-serif font-bold text-[#2C2420]">
                  Estimated Total
                </span>
                <span className="text-2xl font-serif font-bold text-[#7A3E26] tabular-nums">
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-[#532E1C]/70">
                Transparent live pricing. Freshly baked on order.
              </p>
            </div>

            {/* Add to Order / Enquire Button */}
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
                  ✓ Added to your creation summary!
                </p>
              )}
            </div>

            {/* Reassurance note */}
            <div className="flex items-center gap-2 text-xs text-[#532E1C]/75 pt-1">
              <Info className="w-3.5 h-3.5 text-[#7A3E26] shrink-0" />
              <span>We confirm your order details and delivery window directly.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
