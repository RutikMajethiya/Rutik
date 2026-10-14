import React, { useState, useId } from 'react';
import { Plus, Check, Info, ShieldCheck } from 'lucide-react';
import {
  breadBases,
  breadTypes,
  breadShapes,
  BREAD_BASE_PRICE_PER_KG,
  BREAD_PROMINENT_NOTE,
  BreadBase,
  BreadType
} from '../data/bakeryData';

export interface BreadOrderItem {
  id: string;
  category: 'bread';
  breadType: BreadType;
  base: BreadBase;
  weightKg: number;
  shape: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specialRequirements: string;
}

interface BreadBuilderProps {
  onAddBreadToOrder: (bread: BreadOrderItem) => void;
}

export const BreadBuilder: React.FC<BreadBuilderProps> = ({ onAddBreadToOrder }) => {
  const [selectedType, setSelectedType] = useState<BreadType>(breadTypes[0]);
  const [selectedBase, setSelectedBase] = useState<BreadBase>(breadBases[0]);
  const [weightKg, setWeightKg] = useState<number>(1);
  const [shape, setShape] = useState<string>(breadShapes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [specialRequirements, setSpecialRequirements] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const breadWeightInputId = useId();
  const breadShapeInputId = useId();
  const breadNotesInputId = useId();

  // Formula conforming to Section 18:
  // Bread price = (₹450 + applicable base surcharge) × weight in kg
  const effectiveBaseRate = BREAD_BASE_PRICE_PER_KG + selectedBase.surchargePerKg;
  const unitBreadPrice = Math.round(effectiveBaseRate * weightKg);
  const totalBreadPrice = unitBreadPrice * quantity;

  const handleAddOrder = () => {
    const item: BreadOrderItem = {
      id: `bread-${Date.now()}`,
      category: 'bread',
      breadType: selectedType,
      base: selectedBase,
      weightKg,
      shape,
      quantity,
      unitPrice: unitBreadPrice,
      totalPrice: totalBreadPrice,
      specialRequirements
    };

    onAddBreadToOrder(item);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* 15. Prominent Banner with exact required statement */}
      <div className="bg-[#FAF3EC] border border-[#E8DCCF] rounded-2xl p-5 sm:p-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A3E26] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Pure Craftsmanship</span>
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#2C2420]">
          Artisan Breads
        </h2>
        <p className="text-base sm:text-lg font-serif italic text-[#7A3E26] font-medium">
          "{BREAD_PROMINENT_NOTE}"
        </p>
        <p className="text-xs text-[#532E1C]/80 max-w-2xl leading-relaxed">
          Naturally risen, deeply aromatic loaves baked without artificial bread improvers, palm oil, or preservatives. Slow fermented for tenderness and digestibility.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Options */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* Step 1: Bread Type */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                  Step 1
                </span>
                <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                  Select Bread Type
                </h3>
              </div>
              <span className="text-xs text-[#532E1C]/70">
                Base ₹{BREAD_BASE_PRICE_PER_KG}/kg
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {breadTypes.map((type) => {
                const isSelected = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#7A3E26] bg-[#FAF3EC] shadow-sm ring-1 ring-[#7A3E26]'
                        : 'border-[#E8DCCF] bg-white hover:border-[#D6C4B0]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-[#2C2420]">
                        {type.name}
                      </h4>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#7A3E26] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[#532E1C]/75 mt-1 leading-relaxed">
                      {type.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Flour / Base Options conforming to Section 16 */}
          <div className="space-y-3 pt-2 border-t border-[#E8DCCF]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                Step 2
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                Choose Flour / Base
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {breadBases.map((b) => {
                const isSelected = selectedBase.id === b.id;
                const totalRatePerKg = BREAD_BASE_PRICE_PER_KG + b.surchargePerKg;

                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBase(b)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#7A3E26] bg-[#FAF3EC] shadow-sm ring-1 ring-[#7A3E26]'
                        : 'border-[#E8DCCF] bg-white hover:border-[#D6C4B0]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-sm text-[#2C2420]">
                        {b.name}
                      </h4>
                      <span className="text-xs font-bold text-[#7A3E26] tabular-nums">
                        ₹{totalRatePerKg}/kg
                      </span>
                    </div>
                    <p className="text-xs text-[#532E1C]/75 mt-1 leading-relaxed">
                      {b.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Weight, Shape & Quantity */}
          <div className="space-y-4 pt-2 border-t border-[#E8DCCF]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                Step 3
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                Weight, Shape & Quantity
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor={breadWeightInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Weight per Loaf
                </label>
                <select
                  id={breadWeightInputId}
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                >
                  <option value={0.5}>0.5 kg (Small Loaf)</option>
                  <option value={1}>1.0 kg (Standard Loaf)</option>
                  <option value={1.5}>1.5 kg (Family Loaf)</option>
                  <option value={2}>2.0 kg (Party Loaf)</option>
                  <option value={3}>3.0 kg (Jumbo Loaf)</option>
                </select>
              </div>

              <div>
                <label htmlFor={breadShapeInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Bread Shape / Cut
                </label>
                <select
                  id={breadShapeInputId}
                  value={shape}
                  onChange={(e) => setShape(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                >
                  {breadShapes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Number of Loaves
                </label>
                <div className="flex items-center border border-[#E8DCCF] rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs font-bold text-[#532E1C] hover:bg-[#FAF3EC] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-xs font-semibold tabular-nums text-[#2C2420]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs font-bold text-[#532E1C] hover:bg-[#FAF3EC] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor={breadNotesInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                Special baking requirements (Optional)
              </label>
              <textarea
                id={breadNotesInputId}
                rows={2}
                placeholder="e.g. Extra herb butter brush on crust, thick slices, warm evening dispatch..."
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
              />
            </div>

          </div>

        </div>

        {/* Right Live Calculation Summary conforming to Section 18 */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-2xl p-6 border border-[#E8DCCF] shadow-sm space-y-5">
            
            <div className="border-b border-[#F0E6DA] pb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7A3E26] block">
                Your Artisan Bread
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2C2420] mt-0.5">
                {selectedType.name}
              </h3>
              <p className="text-xs text-[#532E1C]/80 mt-1">
                {selectedBase.name} · {weightKg} kg · {shape}
              </p>
            </div>

            {/* Price calculation formula conforming to Section 18 */}
            <div className="space-y-3 text-sm">
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DCCF] space-y-1">
                <span className="text-xs font-bold text-[#7A3E26]">Formula:</span>
                <p className="text-xs font-mono text-[#2C2420]">
                  (₹{BREAD_BASE_PRICE_PER_KG} {selectedBase.surchargePerKg > 0 ? `+ ₹${selectedBase.surchargePerKg}` : ''}) × {weightKg} kg = ₹{unitBreadPrice.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="flex items-center justify-between text-[#532E1C]">
                <div>
                  <span>Base rate ({selectedBase.name})</span>
                </div>
                <span className="font-semibold tabular-nums text-[#2C2420]">
                  ₹{effectiveBaseRate}/kg
                </span>
              </div>

              <div className="flex items-center justify-between text-[#532E1C]">
                <div>
                  <span>Weight per loaf</span>
                </div>
                <span className="font-semibold tabular-nums text-[#2C2420]">
                  {weightKg} kg
                </span>
              </div>

              {quantity > 1 && (
                <div className="flex items-center justify-between text-[#532E1C]">
                  <div>
                    <span>Quantity</span>
                  </div>
                  <span className="font-semibold tabular-nums text-[#2C2420]">
                    × {quantity}
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
                  ₹{totalBreadPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-[#532E1C]/70">
                Freshly baked each morning using pure butter & sunflower oil.
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
                  ✓ Bread added to your creation summary!
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#532E1C]/75 pt-1">
              <Info className="w-3.5 h-3.5 text-[#7A3E26] shrink-0" />
              <span>Zero chemical preservatives or palm oil guaranteed.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
