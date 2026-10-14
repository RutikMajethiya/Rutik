import React, { useState, useId } from 'react';
import { Plus, Check, Info, Sparkles } from 'lucide-react';
import { biscuitVarieties, BiscuitVariety } from '../data/bakeryData';

export interface BiscuitsOrderItem {
  id: string;
  category: 'biscuits';
  variety: BiscuitVariety;
  quantityBoxes: number;
  boxSize: string;
  dietaryPreference: string;
  specialInstructions: string;
}

interface BiscuitsBuilderProps {
  onAddBiscuitsToOrder: (biscuits: BiscuitsOrderItem) => void;
}

export const BiscuitsBuilder: React.FC<BiscuitsBuilderProps> = ({ onAddBiscuitsToOrder }) => {
  const [selectedVariety, setSelectedVariety] = useState<BiscuitVariety>(biscuitVarieties[0]);
  const [quantityBoxes, setQuantityBoxes] = useState<number>(1);
  const [boxSize, setBoxSize] = useState<string>('Standard Box (approx. 400g)');
  const [dietaryPreference, setDietaryPreference] = useState<string>('100% Pure Ghee / Butter (Traditional)');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const biscuitsBoxSizeInputId = useId();
  const biscuitsDietaryInputId = useId();
  const biscuitsInstructionsInputId = useId();

  const handleAddOrder = () => {
    const item: BiscuitsOrderItem = {
      id: `biscuit-${Date.now()}`,
      category: 'biscuits',
      variety: selectedVariety,
      quantityBoxes,
      boxSize,
      dietaryPreference,
      specialInstructions
    };

    onAddBiscuitsToOrder(item);
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
            <span>Classic Heritage Bakes</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2C2420]">
            Biscuits
          </h2>
          <p className="text-sm italic font-serif text-[#7A3E26]">
            "Classic bites for everyday cravings."
          </p>
          <p className="text-xs text-[#532E1C]/80 mt-1 max-w-xl">
            From traditional melt-in-mouth Nankhatai to crispy Jeera Butter, our biscuits are baked in small batches to preserve heirloom recipes and crisp crunch.
          </p>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E8DCCF] text-center sm:text-right shrink-0">
          <span className="text-xs text-[#532E1C]/70 block">Pricing</span>
          <span className="text-base font-serif font-bold text-[#7A3E26]">
            Price to be confirmed
          </span>
          <span className="text-xs text-[#532E1C]/70 block">based on requirement</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Options */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* Step 1: Biscuit Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                  Step 1
                </span>
                <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                  Select Biscuit Variety
                </h3>
              </div>
              <span className="text-xs text-[#532E1C]/70">
                7 Classic Varieties
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {biscuitVarieties.map((variety) => {
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

          {/* Step 2: Box Size & Quantity */}
          <div className="space-y-3 pt-2 border-t border-[#E8DCCF]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                Step 2
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                Packaging & Quantity
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={biscuitsBoxSizeInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Box Size
                </label>
                <select
                  id={biscuitsBoxSizeInputId}
                  value={boxSize}
                  onChange={(e) => setBoxSize(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                >
                  <option value="Small Jar (approx. 200g)">Small Jar (approx. 200g)</option>
                  <option value="Standard Box (approx. 400g)">Standard Box (approx. 400g)</option>
                  <option value="Large Celebration Tin (approx. 800g)">Large Celebration Tin (approx. 800g)</option>
                  <option value="Custom Bulk Pack (kg)">Custom Bulk Pack</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Number of Boxes / Tins
                </label>
                <div className="flex items-center border border-[#E8DCCF] rounded-xl bg-white overflow-hidden max-w-[160px]">
                  <button
                    onClick={() => setQuantityBoxes(Math.max(1, quantityBoxes - 1))}
                    className="px-3.5 py-2 text-xs font-bold text-[#532E1C] hover:bg-[#FAF3EC] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-xs font-semibold tabular-nums text-[#2C2420]">
                    {quantityBoxes}
                  </span>
                  <button
                    onClick={() => setQuantityBoxes(quantityBoxes + 1)}
                    className="px-3.5 py-2 text-xs font-bold text-[#532E1C] hover:bg-[#FAF3EC] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Dietary & Instructions */}
          <div className="space-y-3 pt-2 border-t border-[#E8DCCF]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                Step 3
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                Dietary & Baking Notes
              </h3>
            </div>

            <div>
              <label htmlFor={biscuitsDietaryInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                Baking Fat / Sweetness Preference
              </label>
              <select
                id={biscuitsDietaryInputId}
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
              >
                <option value="100% Pure Ghee / Butter (Traditional)">100% Pure Ghee / Dairy Butter (Traditional)</option>
                <option value="Eggless Guaranteed">Eggless Guaranteed</option>
                <option value="Low Sugar / Mild Sweetness">Low Sugar / Mild Sweetness</option>
                <option value="Jain Preparation (No garlic/onion/potato starch)">Jain Preparation</option>
              </select>
            </div>

            <div>
              <label htmlFor={biscuitsInstructionsInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                Custom requirements (Optional)
              </label>
              <textarea
                id={biscuitsInstructionsInputId}
                rows={2}
                placeholder="e.g. Festival gifting wrapper, assorted biscuit mix, extra jeera roasted..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
              />
            </div>
          </div>

        </div>

        {/* Right Live Summary */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-2xl p-6 border border-[#E8DCCF] shadow-sm space-y-5">
            
            <div className="border-b border-[#F0E6DA] pb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7A3E26] block">
                Your Biscuit Order
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2C2420] mt-0.5">
                {selectedVariety.name}
              </h3>
              <p className="text-xs text-[#532E1C]/80 mt-1">
                {quantityBoxes} × {boxSize} · {dietaryPreference}
              </p>
            </div>

            {/* Unpriced disclosure strictly conforming to Section 26 */}
            <div className="bg-[#FAF3EC] p-3.5 rounded-xl border border-[#E8DCCF] space-y-2">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-[#7A3E26] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#7A3E26] block">
                    Price to be confirmed based on your requirement.
                  </span>
                  <p className="text-[11px] text-[#532E1C]/80 mt-0.5 leading-relaxed">
                    Biscuit pricing is calculated based on exact batch weight, pure ghee/butter proportions, and packaging containers. We will confirm the total directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="pt-2 border-t border-[#F0E6DA] flex items-center justify-between text-sm">
              <span className="font-semibold text-[#2C2420]">Estimated Price:</span>
              <span className="text-sm font-bold text-[#7A3E26]">
                To be confirmed
              </span>
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
                  ✓ Biscuits added to your creation summary!
                </p>
              )}
            </div>

            <div className="text-xs text-[#532E1C]/75 pt-1">
              <span>Bespoke recipes made strictly fresh on order.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
