import React, { useState, useId } from 'react';
import { Plus, Info, HeartHandshake, Sparkles } from 'lucide-react';

export interface CustomRequirementItem {
  id: string;
  category: 'custom';
  occasionType: string;
  guestCount: string;
  desiredItems: string;
  dietaryPreferences: string[];
  referenceNotes: string;
  customerName: string;
  customerPhone: string;
}

interface CustomRequirementBuilderProps {
  onAddCustomRequirementToOrder: (req: CustomRequirementItem) => void;
}

export const CustomRequirementBuilder: React.FC<CustomRequirementBuilderProps> = ({
  onAddCustomRequirementToOrder
}) => {
  const [occasionType, setOccasionType] = useState<string>('Grand Celebration Cake');
  const [guestCount, setGuestCount] = useState<string>('25-50 guests');
  const [desiredItems, setDesiredItems] = useState<string>('');
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(['100% Eggless']);
  const [referenceNotes, setReferenceNotes] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const customOccasionInputId = useId();
  const customGuestsInputId = useId();
  const customItemsInputId = useId();
  const customNotesInputId = useId();
  const customNameInputId = useId();
  const customPhoneInputId = useId();

  const dietaryOptions = [
    '100% Eggless',
    'Jain Baking (No garlic/potato starch)',
    '100% Whole Wheat',
    'Farali (Fasting Compliant)',
    'Sugar-Free / Natural Jaggery',
    'Nut-Free Preparation'
  ];

  const toggleDietary = (item: string) => {
    if (dietaryPreferences.includes(item)) {
      setDietaryPreferences(dietaryPreferences.filter((d) => d !== item));
    } else {
      setDietaryPreferences([...dietaryPreferences, item]);
    }
  };

  const handleAddOrder = () => {
    const item: CustomRequirementItem = {
      id: `custom-${Date.now()}`,
      category: 'custom',
      occasionType,
      guestCount,
      desiredItems: desiredItems || 'Custom dessert table & bespoke confections',
      dietaryPreferences,
      referenceNotes,
      customerName,
      customerPhone
    };

    onAddCustomRequirementToOrder(item);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Category Banner */}
      <div className="bg-[#FAF3EC] border border-[#E8DCCF] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A3E26] uppercase tracking-wider mb-1">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Bespoke Creations</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2C2420]">
            Custom Requirement
          </h2>
          <p className="text-sm italic font-serif text-[#7A3E26]">
            "Have something else in mind? Tell us what you need."
          </p>
          <p className="text-xs text-[#532E1C]/80 mt-1 max-w-xl">
            Whether you envision a multi-tiered designer wedding cake, an elaborate dessert table, corporate festival hampers, or dietary adaptations, we make your vision a reality.
          </p>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E8DCCF] text-center sm:text-right shrink-0">
          <span className="text-xs text-[#532E1C]/70 block">Pricing</span>
          <span className="text-base font-serif font-bold text-[#7A3E26]">
            Price to be confirmed
          </span>
          <span className="text-xs text-[#532E1C]/70 block">based on your requirement</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={customOccasionInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                Occasion / Celebration Type
              </label>
              <select
                id={customOccasionInputId}
                value={occasionType}
                onChange={(e) => setOccasionType(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
              >
                <option value="Multi-tier Wedding Cake">Multi-tier Wedding Cake</option>
                <option value="Grand Celebration Cake">Grand Celebration Cake</option>
                <option value="Themed Baby Shower">Themed Baby Shower</option>
                <option value="Corporate Gift Hampers">Corporate Gift Hampers</option>
                <option value="Festival Sweet & Savory Box">Festival Sweet & Savory Box</option>
                <option value="Full Dessert Grazing Table">Full Dessert Grazing Table</option>
                <option value="Bespoke Dietary Confection">Bespoke Dietary Confection</option>
                <option value="Other Specific Craving">Other Specific Craving</option>
              </select>
            </div>

            <div>
              <label htmlFor={customGuestsInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                Estimated Guest Count
              </label>
              <select
                id={customGuestsInputId}
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
              >
                <option value="Intimate (5-15 guests)">Intimate (5-15 guests)</option>
                <option value="Family Gathering (15-30 guests)">Family Gathering (15-30 guests)</option>
                <option value="Party (30-60 guests)">Party (30-60 guests)</option>
                <option value="Large Banquet (60-120 guests)">Large Banquet (60-120 guests)</option>
                <option value="Grand Event (120+ guests)">Grand Event (120+ guests)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor={customItemsInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
              Describe your dream bake or requirement
            </label>
            <textarea
              id={customItemsInputId}
              rows={3}
              placeholder="e.g. 3-tier cake with fresh red roses, 24 matching chocolate cupcakes, and 2 kg garlic pull-apart bread for welcome starters..."
              value={desiredItems}
              onChange={(e) => setDesiredItems(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2C2420] mb-2">
              Dietary & Flour Preferences
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dietaryOptions.map((diet) => {
                const isSelected = dietaryPreferences.includes(diet);
                return (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => toggleDietary(diet)}
                    className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#7A3E26] bg-[#FAF3EC] text-[#7A3E26] font-semibold'
                        : 'border-[#E8DCCF] bg-white text-[#2C2420]'
                    }`}
                  >
                    {diet}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor={customNotesInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
              Theme, color palette, or design inspiration notes
            </label>
            <textarea
              id={customNotesInputId}
              rows={2}
              placeholder="e.g. Vintage Victorian theme, pastel ivory with gold foil accents, reference image available on WhatsApp..."
              value={referenceNotes}
              onChange={(e) => setReferenceNotes(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E8DCCF]">
            <div>
              <label htmlFor={customNameInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                Your Name
              </label>
              <input
                id={customNameInputId}
                type="text"
                placeholder="e.g. Aarav Patel"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
              />
            </div>

            <div>
              <label htmlFor={customPhoneInputId} className="block text-xs font-semibold text-[#2C2420] mb-1">
                Your Contact Number
              </label>
              <input
                id={customPhoneInputId}
                type="tel"
                placeholder="e.g. 98765 43210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
              />
            </div>
          </div>

        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-2xl p-6 border border-[#E8DCCF] shadow-sm space-y-5">
            
            <div className="border-b border-[#F0E6DA] pb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7A3E26] block">
                Bespoke Order Request
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2C2420] mt-0.5">
                {occasionType}
              </h3>
              <p className="text-xs text-[#532E1C]/80 mt-1">
                {guestCount} · {dietaryPreferences.length} dietary specs
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
                    Custom designs, tiered cake armatures, sculpted figurines, and delivery logistics are priced personally to ensure fair, transparent execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Estimated Total */}
            <div className="pt-2 border-t border-[#F0E6DA] flex items-center justify-between text-sm">
              <span className="font-semibold text-[#2C2420]">Estimated Pricing:</span>
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
                  ✓ Custom requirement added to your creation summary!
                </p>
              )}
            </div>

            <div className="text-xs text-[#532E1C]/75 pt-1">
              <span>Talk to our master baker directly via WhatsApp or phone.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
