import React, { useState, useId } from 'react';
import { Plus, Check, Gift, Sparkles, Info } from 'lucide-react';
import {
  cupcakeFlavours,
  standardCupcakeQuantities,
  cupcakeDecorations,
  cupcakeOccasions,
  cupcakeFrostingOptions,
  CUPCAKE_PRICE,
  CupcakeFlavour
} from '../data/bakeryData';

export interface CupcakeOrderItem {
  id: string;
  category: 'cupcake';
  flavour: CupcakeFlavour;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  colourTheme: string;
  decoration: string;
  decorationNote?: string;
  frostingPreference: string;
  packaging: 'Regular Packaging' | 'Gift Packaging';
  packagingPriceNote?: string;
  message: string;
  individualDesigns: string;
  occasion: string;
  customRequirement: string;
}

interface CupcakeBuilderProps {
  onAddCupcakeToOrder: (cupcake: CupcakeOrderItem) => void;
}

export const CupcakeBuilder: React.FC<CupcakeBuilderProps> = ({ onAddCupcakeToOrder }) => {
  const [selectedFlavour, setSelectedFlavour] = useState<CupcakeFlavour>(cupcakeFlavours[1]); // Chocolate Fudge default
  const [selectedQuantity, setSelectedQuantity] = useState<number>(6);
  const [customQtyInput, setCustomQtyInput] = useState<string>('');
  const [isCustomQty, setIsCustomQty] = useState<boolean>(false);
  const [colourTheme, setColourTheme] = useState<string>('Pastel Cream & Chocolate');
  const [selectedDecoration, setSelectedDecoration] = useState<string>('Simple');
  const [frostingPreference, setFrostingPreference] = useState<string>(cupcakeFrostingOptions[0]);
  const [packaging, setPackaging] = useState<'Regular Packaging' | 'Gift Packaging'>('Regular Packaging');
  const [message, setMessage] = useState<string>('');
  const [individualDesigns, setIndividualDesigns] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Birthday');
  const [customRequirement, setCustomRequirement] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const customQtyInputId = useId();
  const cupcakeThemeInputId = useId();
  const cupcakeFrostingInputId = useId();
  const cupcakeOccasionInputId = useId();
  const cupcakeMessageInputId = useId();
  const cupcakeDesignsInputId = useId();
  const cupcakeRequirementInputId = useId();

  // Effective Quantity
  const effectiveQty = isCustomQty
    ? Math.max(1, parseInt(customQtyInput, 10) || 1)
    : selectedQuantity;

  // Cupcake calculation: ₹50 × quantity
  const totalCupcakePrice = CUPCAKE_PRICE * effectiveQty;

  const currentDecoration = cupcakeDecorations.find((d) => d.name === selectedDecoration);
  const isCustomDecoration = selectedDecoration === 'Custom';

  const handleSelectQuantity = (qty: number) => {
    setIsCustomQty(false);
    setSelectedQuantity(qty);
  };

  const handleCustomQtyChange = (val: string) => {
    setCustomQtyInput(val);
    setIsCustomQty(true);
  };

  const handleAddOrder = () => {
    const item: CupcakeOrderItem = {
      id: `cupcake-${Date.now()}`,
      category: 'cupcake',
      flavour: selectedFlavour,
      quantity: effectiveQty,
      unitPrice: CUPCAKE_PRICE,
      totalPrice: totalCupcakePrice,
      colourTheme,
      decoration: selectedDecoration,
      decorationNote: isCustomDecoration
        ? 'Additional decoration charges will be confirmed based on your requirement.'
        : undefined,
      frostingPreference,
      packaging,
      packagingPriceNote: packaging === 'Gift Packaging' ? 'Price to be confirmed' : undefined,
      message,
      individualDesigns,
      occasion,
      customRequirement
    };

    onAddCupcakeToOrder(item);
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
            <span>New Product Category</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2C2420]">
            Cupcakes
          </h2>
          <p className="text-sm italic font-serif text-[#7A3E26]">
            "Small treats, big cravings."
          </p>
          <p className="text-xs text-[#532E1C]/80 mt-1">
            Available in all 10 signature flavours at a flat ₹50 each. Perfect for gift hampers, office treats, and party dessert tables.
          </p>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E8DCCF] text-center sm:text-right shrink-0">
          <span className="text-xs text-[#532E1C]/70 block">Base Price</span>
          <span className="text-2xl font-serif font-bold text-[#7A3E26] tabular-nums">
            ₹50
          </span>
          <span className="text-xs text-[#532E1C]/70 block">per cupcake</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Customization Area */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* Step 1: Flavour Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                  Step 1
                </span>
                <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                  Select Cupcake Flavour
                </h3>
              </div>
              <span className="text-xs font-bold text-[#7A3E26] tabular-nums">
                ₹50 each
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {cupcakeFlavours.map((flavour) => {
                const isSelected = selectedFlavour.id === flavour.id;
                return (
                  <button
                    key={flavour.id}
                    onClick={() => setSelectedFlavour(flavour)}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#7A3E26] bg-[#FAF3EC] shadow-sm ring-1 ring-[#7A3E26]'
                        : 'border-[#E8DCCF] bg-white hover:border-[#D6C4B0]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-[#2C2420]">
                        {flavour.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#7A3E26] tabular-nums">
                        ₹50
                      </span>
                    </div>
                    <p className="text-xs text-[#532E1C]/70 mt-0.5">
                      {flavour.description}
                    </p>

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

          {/* Step 2: Quantity Selection */}
          <div className="space-y-3 pt-2 border-t border-[#E8DCCF]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                  Step 2
                </span>
                <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                  Select Quantity
                </h3>
              </div>
              <span className="text-xs text-[#532E1C]/80">
                Formula: ₹50 × quantity
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {standardCupcakeQuantities.map((qty) => {
                const isSelected = !isCustomQty && selectedQuantity === qty;
                const price = CUPCAKE_PRICE * qty;

                return (
                  <button
                    key={qty}
                    onClick={() => handleSelectQuantity(qty)}
                    className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#7A3E26] text-white border-[#7A3E26] shadow-sm'
                        : 'bg-white hover:bg-[#FAF3EC] text-[#2C2420] border-[#E8DCCF]'
                    }`}
                  >
                    <span className="text-sm font-bold block tabular-nums">
                      {qty}
                    </span>
                    <span
                      className={`text-[10px] block tabular-nums ${
                        isSelected ? 'text-white/80' : 'text-[#7A3E26] font-medium'
                      }`}
                    >
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Quantity */}
            <div className="pt-2 flex items-center gap-3">
              <label htmlFor={customQtyInputId} className="text-xs text-[#532E1C] font-medium whitespace-nowrap">
                Custom Quantity:
              </label>
              <div className="relative max-w-[130px]">
                <input
                  id={customQtyInputId}
                  type="number"
                  min="1"
                  max="500"
                  placeholder="e.g. 15"
                  value={customQtyInput}
                  onChange={(e) => handleCustomQtyChange(e.target.value)}
                  className={`w-full py-1.5 px-3 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26] ${
                    isCustomQty ? 'border-[#7A3E26] ring-1 ring-[#7A3E26]' : 'border-[#E8DCCF]'
                  }`}
                />
              </div>
              {isCustomQty && (
                <span className="text-xs font-semibold text-[#7A3E26] tabular-nums">
                  = ₹{(CUPCAKE_PRICE * effectiveQty).toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Step 3: Decoration, Frosting & Occasion */}
          <div className="space-y-4 pt-2 border-t border-[#E8DCCF]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
                Step 3
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                Customization & Theme
              </h3>
            </div>

            {/* Decoration Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#2C2420] mb-1.5">
                Decoration Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {cupcakeDecorations.map((dec) => {
                  const isSelected = selectedDecoration === dec.name;
                  return (
                    <button
                      key={dec.id}
                      onClick={() => setSelectedDecoration(dec.name)}
                      className={`p-2.5 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#7A3E26] bg-[#FAF3EC] font-bold text-[#7A3E26] shadow-sm'
                          : 'border-[#E8DCCF] bg-white text-[#2C2420] hover:border-[#D6C4B0]'
                      }`}
                    >
                      {dec.name}
                    </button>
                  );
                })}
              </div>

              {isCustomDecoration && (
                <p className="text-xs text-[#7A3E26] bg-[#FAF3EC] p-2 rounded-lg border border-[#E8DCCF] mt-2">
                  ℹ️ Additional decoration charges will be confirmed based on your requirement.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor={cupcakeThemeInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Colour / Theme
                </label>
                <input
                  id={cupcakeThemeInputId}
                  type="text"
                  placeholder="e.g. Pastel Pink, Rose Gold"
                  value={colourTheme}
                  onChange={(e) => setColourTheme(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                />
              </div>

              <div>
                <label htmlFor={cupcakeFrostingInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Frosting Preference
                </label>
                <select
                  id={cupcakeFrostingInputId}
                  value={frostingPreference}
                  onChange={(e) => setFrostingPreference(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                >
                  {cupcakeFrostingOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={cupcakeOccasionInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Occasion
                </label>
                <select
                  id={cupcakeOccasionInputId}
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                >
                  {cupcakeOccasions.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Packaging Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#2C2420] mb-1.5">
                Packaging
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setPackaging('Regular Packaging')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    packaging === 'Regular Packaging'
                      ? 'border-[#7A3E26] bg-[#FAF3EC] shadow-sm ring-1 ring-[#7A3E26]'
                      : 'border-[#E8DCCF] bg-white hover:border-[#D6C4B0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#2C2420]">Regular Packaging</span>
                    <span className="text-xs text-[#7A3E26] font-medium">Included</span>
                  </div>
                  <p className="text-[11px] text-[#532E1C]/70 mt-0.5">
                    Sturdy bakery pastry box with safety cupcake divider inserts.
                  </p>
                </button>

                <button
                  onClick={() => setPackaging('Gift Packaging')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    packaging === 'Gift Packaging'
                      ? 'border-[#7A3E26] bg-[#FAF3EC] shadow-sm ring-1 ring-[#7A3E26]'
                      : 'border-[#E8DCCF] bg-white hover:border-[#D6C4B0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#7A3E26]" />
                      <span className="font-semibold text-xs text-[#2C2420]">Gift Packaging</span>
                    </div>
                    <span className="text-xs text-[#7A3E26] font-semibold">Price to be confirmed</span>
                  </div>
                  <p className="text-[11px] text-[#532E1C]/70 mt-0.5">
                    Luxe satin ribbon box, custom gift card, and window reveal hamper.
                  </p>
                </button>
              </div>
            </div>

            {/* Step 4: Message & Large Order Custom Notes */}
            <div className="space-y-3 pt-2 border-t border-[#E8DCCF]">
              <div>
                <label htmlFor={cupcakeMessageInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Message / Name (Optional)
                </label>
                <input
                  id={cupcakeMessageInputId}
                  type="text"
                  placeholder="e.g. Happy Birthday Aarav!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                />
              </div>

              {effectiveQty >= 12 && (
                <div>
                  <label htmlFor={cupcakeDesignsInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                    Individual name / design requirements (For larger orders)
                  </label>
                  <textarea
                    id={cupcakeDesignsInputId}
                    rows={2}
                    placeholder="Specify individual cupcake toppers or initials (e.g., 6 with 'A', 6 with 'R', floral swirls on others)..."
                    value={individualDesigns}
                    onChange={(e) => setIndividualDesigns(e.target.value)}
                    className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                  />
                </div>
              )}

              <div>
                <label htmlFor={cupcakeRequirementInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                  Custom requirement or dietary preference
                </label>
                <textarea
                  id={cupcakeRequirementInputId}
                  rows={2}
                  placeholder="e.g. 100% Eggless, Jain preparation, no food colouring..."
                  value={customRequirement}
                  onChange={(e) => setCustomRequirement(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Right Live Price Summary */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-2xl p-6 border border-[#E8DCCF] shadow-sm space-y-5">
            
            <div className="border-b border-[#F0E6DA] pb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7A3E26] block">
                Your Cupcake Box
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2C2420] mt-0.5">
                {selectedFlavour.name} Cupcakes
              </h3>
              <p className="text-xs text-[#532E1C]/80 mt-1">
                {effectiveQty} pieces · {selectedDecoration} Decor · {packaging}
              </p>
            </div>

            {/* Itemized Calculation */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-[#532E1C]">
                <div>
                  <span>Base Cupcake Price</span>
                  <p className="text-[11px] text-[#532E1C]/70">
                    ₹{CUPCAKE_PRICE} × {effectiveQty} cupcakes
                  </p>
                </div>
                <span className="font-semibold tabular-nums text-[#2C2420]">
                  ₹{totalCupcakePrice.toLocaleString('en-IN')}
                </span>
              </div>

              {isCustomDecoration && (
                <div className="text-xs text-[#7A3E26] bg-[#FAF3EC] p-2.5 rounded-lg border border-[#E8DCCF]">
                  <span className="font-semibold block">Additional decoration charges:</span>
                  <span>To be confirmed based on your requirement</span>
                </div>
              )}

              {packaging === 'Gift Packaging' && (
                <div className="text-xs text-[#7A3E26] bg-[#FAF3EC] p-2.5 rounded-lg border border-[#E8DCCF]">
                  <span className="font-semibold block">Gift packaging:</span>
                  <span>Price to be confirmed</span>
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
                  ₹{totalCupcakePrice.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-[#532E1C]/70">
                Transparent flat pricing at ₹50 per cupcake.
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
                  ✓ Cupcakes added to your creation summary!
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#532E1C]/75 pt-1">
              <Info className="w-3.5 h-3.5 text-[#7A3E26] shrink-0" />
              <span>Baked fresh in small batches on order confirmation.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
