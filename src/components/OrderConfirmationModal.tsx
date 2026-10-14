import React, { useState } from 'react';
import { X, Phone, MessageCircle, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { CakeOrderItem } from './CakeBuilder';
import { CupcakeOrderItem } from './CupcakeBuilder';
import { BreadOrderItem } from './BreadBuilder';
import { CookieOrderItem } from './CookieBuilder';
import { BiscuitsOrderItem } from './BiscuitsBuilder';
import { CustomRequirementItem } from './CustomRequirementBuilder';
import {
  BAKERY_NAME,
  BAKERY_TAGLINE,
  BAKERY_PHONE_1,
  BAKERY_PHONE_1_RAW,
  BAKERY_PHONE_2,
  BAKERY_PHONE_2_RAW
} from '../data/bakeryData';

export type AnyOrderItem =
  | CakeOrderItem
  | CupcakeOrderItem
  | BreadOrderItem
  | CookieOrderItem
  | BiscuitsOrderItem
  | CustomRequirementItem;

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: AnyOrderItem[];
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  orderItems,
  onRemoveItem,
  onClearOrder
}) => {
  const [selectedWhatsAppNumber, setSelectedWhatsAppNumber] = useState<'phone1' | 'phone2'>('phone1');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');

  if (!isOpen) return null;

  // Calculate confirmed totals
  let calculatedPricedTotal = 0;
  let totalSavings = 0;
  let hasUnpricedItems = false;

  orderItems.forEach((item) => {
    if (item.category === 'cake') {
      calculatedPricedTotal += item.totalPrice;
      totalSavings += item.discountAmount;
      if (item.decorationType === 'Custom Themed Decor') hasUnpricedItems = true;
    } else if (item.category === 'cupcake') {
      calculatedPricedTotal += item.totalPrice;
      if (item.decoration === 'Custom' || item.packaging === 'Gift Packaging') {
        hasUnpricedItems = true;
      }
    } else if (item.category === 'bread') {
      calculatedPricedTotal += item.totalPrice;
    } else if (item.category === 'cookie') {
      calculatedPricedTotal += item.totalPrice;
    } else if (item.category === 'biscuits' || item.category === 'custom') {
      hasUnpricedItems = true;
    }
  });

  // Construct structured WhatsApp message
  const targetPhone = selectedWhatsAppNumber === 'phone1' ? '919328161200' : '919409037507';

  const generateWhatsAppMessage = () => {
    let msg = `*NEW ORDER ENQUIRY — ${BAKERY_NAME.toUpperCase()}*\n`;
    msg += `"${BAKERY_TAGLINE}"\n\n`;

    if (customerName) msg += `*Customer:* ${customerName}\n`;
    if (customerPhone) msg += `*Contact:* ${customerPhone}\n`;
    if (customerAddress) msg += `*Delivery / Pickup Note:* ${customerAddress}\n`;
    if (preferredDate) msg += `*Date/Time Needed:* ${preferredDate}\n`;
    msg += `------------------------------------\n`;
    msg += `*YOUR DELICACY ORDER BREAKDOWN:*\n\n`;

    orderItems.forEach((item, idx) => {
      msg += `${idx + 1}. `;
      if (item.category === 'cake') {
        msg += `*Cake: ${item.flavour.name}* (${item.weightKg} kg)\n`;
        msg += `   • Base: ${item.base.name} (+₹${item.baseSurcharge})\n`;
        msg += `   • Base Price: ₹${item.basePrice}\n`;
        if (item.discountAmount > 0) {
          msg += `   • Cake Weight Discount (${Math.round(item.discountRate * 100)}%): -₹${item.discountAmount}\n`;
        }
        if (item.message) msg += `   • Message on Cake: "${item.message}"\n`;
        if (item.occasion) msg += `   • Occasion: ${item.occasion}\n`;
        msg += `   • Decor: ${item.decorationType}\n`;
        if (item.customNotes) msg += `   • Notes: ${item.customNotes}\n`;
        msg += `   • Estimated Item Price: ₹${item.totalPrice}\n\n`;
      } else if (item.category === 'cupcake') {
        msg += `*Cupcakes: ${item.flavour.name}* (${item.quantity} pieces)\n`;
        msg += `   • Rate: ₹${item.unitPrice} each\n`;
        msg += `   • Decor: ${item.decoration}\n`;
        msg += `   • Frosting: ${item.frostingPreference}\n`;
        msg += `   • Packaging: ${item.packaging}\n`;
        if (item.message) msg += `   • Message/Name: "${item.message}"\n`;
        if (item.individualDesigns) msg += `   • Individual Designs: ${item.individualDesigns}\n`;
        msg += `   • Estimated Item Price: ₹${item.totalPrice}\n\n`;
      } else if (item.category === 'bread') {
        msg += `*Artisan Bread: ${item.breadType.name}* (${item.quantity} × ${item.weightKg} kg)\n`;
        msg += `   • Flour Base: ${item.base.name}\n`;
        msg += `   • Shape: ${item.shape}\n`;
        if (item.specialRequirements) msg += `   • Notes: ${item.specialRequirements}\n`;
        msg += `   • Estimated Item Price: ₹${item.totalPrice}\n\n`;
      } else if (item.category === 'cookie') {
        msg += `*Cookies: ${item.variety.name}* (${item.weightGrams}g)\n`;
        msg += `   • Sweetener: ${item.sweetenerType}\n`;
        if (item.specialNotes) msg += `   • Notes: ${item.specialNotes}\n`;
        msg += `   • Estimated Item Price: ₹${item.totalPrice}\n\n`;
      } else if (item.category === 'biscuits') {
        msg += `*Biscuits: ${item.variety.name}*\n`;
        msg += `   • Quantity: ${item.quantityBoxes} × ${item.boxSize}\n`;
        msg += `   • Dietary: ${item.dietaryPreference}\n`;
        if (item.specialInstructions) msg += `   • Special Instructions: ${item.specialInstructions}\n`;
        msg += `   • Price: To be confirmed based on requirement\n\n`;
      } else if (item.category === 'custom') {
        msg += `*Bespoke Custom Requirement*\n`;
        msg += `   • Occasion: ${item.occasionType} (${item.guestCount})\n`;
        msg += `   • Details: ${item.desiredItems}\n`;
        msg += `   • Dietary: ${item.dietaryPreferences.join(', ')}\n`;
        if (item.referenceNotes) msg += `   • Notes: ${item.referenceNotes}\n`;
        msg += `   • Price: To be confirmed based on requirement\n\n`;
      }
    });

    msg += `------------------------------------\n`;
    msg += `*ESTIMATED TOTAL: ₹${calculatedPricedTotal.toLocaleString('en-IN')}*\n`;
    if (totalSavings > 0) {
      msg += `*TOTAL SAVINGS: ₹${totalSavings.toLocaleString('en-IN')} (Quantity Discount)*\n`;
    }
    if (hasUnpricedItems) {
      msg += `*Custom / Unpriced items:* Will be confirmed by Dhanya Bakers\n`;
    }
    msg += `\nPlease confirm availability and dispatch schedule. Thank you!`;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#E8DCCF] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-[#E8DCCF] flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
              Order & Enquiry Confirmation
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#2C2420]">
              {BAKERY_NAME}
            </h2>
            <p className="text-xs italic font-serif text-[#7A3E26]">
              "{BAKERY_TAGLINE}"
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#532E1C] hover:bg-[#EFE6DC] rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {orderItems.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="text-base text-[#532E1C]/80 font-serif italic">
                Your creation tray is empty.
              </p>
              <p className="text-xs text-[#532E1C]/60 max-w-xs mx-auto">
                Customize any cake, cupcake box, artisan bread, or cookies to see your transparent price breakdown.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#7A3E26] hover:bg-[#63321E] rounded-xl cursor-pointer"
              >
                Start Crafting
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0E6DA] pb-2">
                  <h3 className="font-serif font-bold text-base text-[#2C2420]">
                    Your Creation Tray ({orderItems.length} {orderItems.length === 1 ? 'item' : 'items'})
                  </h3>
                  <button
                    onClick={onClearOrder}
                    className="text-xs text-[#7A3E26] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear all</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-[#E8DCCF] bg-[#FAF7F2] relative space-y-2"
                    >
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="absolute top-3 right-3 p-1.5 text-[#532E1C]/60 hover:text-red-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Cake Item Details */}
                      {item.category === 'cake' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#7A3E26] bg-[#EFE6DC] px-2 py-0.5 rounded">
                              Cake
                            </span>
                            <h4 className="font-serif font-bold text-base text-[#2C2420]">
                              {item.flavour.name}
                            </h4>
                          </div>

                          <div className="text-xs text-[#532E1C]/80 mt-1 space-y-0.5">
                            <p>Weight: <span className="font-semibold">{item.weightKg} kg</span> · Base: <span className="font-semibold">{item.base.name}</span></p>
                            {item.message && <p>Message on Cake: <span className="font-medium italic">"{item.message}"</span></p>}
                            <p>Decor: {item.decorationType} · Occasion: {item.occasion}</p>
                          </div>

                          {/* Price calculation lines */}
                          <div className="pt-2 mt-2 border-t border-[#E8DCCF]/60 flex flex-wrap items-center justify-between text-xs gap-2">
                            <div className="space-x-2 text-[#532E1C]">
                              <span>Base: ₹{item.basePrice.toLocaleString('en-IN')}</span>
                              {item.discountAmount > 0 && (
                                <span className="text-[#1F5E3B] font-semibold">
                                  Disc: −₹{item.discountAmount.toLocaleString('en-IN')} ({Math.round(item.discountRate * 100)}%)
                                </span>
                              )}
                              {item.baseSurcharge > 0 && (
                                <span>Base Surcharge: +₹{item.baseSurcharge.toLocaleString('en-IN')}</span>
                              )}
                            </div>
                            <span className="font-bold text-sm text-[#7A3E26] tabular-nums">
                              ₹{item.totalPrice.toLocaleString('en-IN')}
                            </span>
                          </div>

                          {item.discountAmount > 0 && (
                            <p className="text-[11px] text-[#1F5E3B] font-medium mt-1">
                              ✓ You save ₹{item.discountAmount.toLocaleString('en-IN')} with our quantity discount.
                            </p>
                          )}

                          {item.decorationType === 'Custom Themed Decor' && (
                            <p className="text-[11px] text-[#7A3E26] mt-1">
                              Additional customization charges: To be confirmed
                            </p>
                          )}
                        </div>
                      )}

                      {/* Cupcake Item Details */}
                      {item.category === 'cupcake' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#7A3E26] bg-[#EFE6DC] px-2 py-0.5 rounded">
                              Cupcake Box
                            </span>
                            <h4 className="font-serif font-bold text-base text-[#2C2420]">
                              {item.flavour.name} Cupcakes
                            </h4>
                          </div>

                          <div className="text-xs text-[#532E1C]/80 mt-1 space-y-0.5">
                            <p>Quantity: <span className="font-semibold">{item.quantity} pieces</span> (₹50 each)</p>
                            <p>Decor: {item.decoration} · Frosting: {item.frostingPreference}</p>
                            <p>Packaging: <span className="font-semibold">{item.packaging}</span></p>
                            {item.message && <p>Message: <span className="font-medium italic">"{item.message}"</span></p>}
                            {item.individualDesigns && <p>Individual Designs: {item.individualDesigns}</p>}
                          </div>

                          <div className="pt-2 mt-2 border-t border-[#E8DCCF]/60 flex items-center justify-between text-xs">
                            <span className="text-[#532E1C]">₹50 × {item.quantity}</span>
                            <span className="font-bold text-sm text-[#7A3E26] tabular-nums">
                              ₹{item.totalPrice.toLocaleString('en-IN')}
                            </span>
                          </div>

                          {item.packaging === 'Gift Packaging' && (
                            <p className="text-[11px] text-[#7A3E26] mt-1">
                              Gift packaging price to be confirmed
                            </p>
                          )}
                          {item.decorationNote && (
                            <p className="text-[11px] text-[#7A3E26] mt-0.5">
                              {item.decorationNote}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Bread Item Details */}
                      {item.category === 'bread' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#7A3E26] bg-[#EFE6DC] px-2 py-0.5 rounded">
                              Artisan Bread
                            </span>
                            <h4 className="font-serif font-bold text-base text-[#2C2420]">
                              {item.breadType.name}
                            </h4>
                          </div>

                          <div className="text-xs text-[#532E1C]/80 mt-1 space-y-0.5">
                            <p>Base: <span className="font-semibold">{item.base.name}</span> · Weight: <span className="font-semibold">{item.weightKg} kg</span></p>
                            <p>Shape: {item.shape} · Qty: {item.quantity}</p>
                            {item.specialRequirements && <p>Requirements: {item.specialRequirements}</p>}
                          </div>

                          <div className="pt-2 mt-2 border-t border-[#E8DCCF]/60 flex items-center justify-between text-xs">
                            <span className="text-[#532E1C]">
                              (₹450 {item.base.surchargePerKg > 0 ? `+ ₹${item.base.surchargePerKg}` : ''}) × {item.weightKg} kg × {item.quantity}
                            </span>
                            <span className="font-bold text-sm text-[#7A3E26] tabular-nums">
                              ₹{item.totalPrice.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Cookie Item Details */}
                      {item.category === 'cookie' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#7A3E26] bg-[#EFE6DC] px-2 py-0.5 rounded">
                              Cookies
                            </span>
                            <h4 className="font-serif font-bold text-base text-[#2C2420]">
                              {item.variety.name}
                            </h4>
                          </div>

                          <div className="text-xs text-[#532E1C]/80 mt-1 space-y-0.5">
                            <p>Weight: <span className="font-semibold">{item.weightGrams}g</span> · Sweetener: <span className="font-semibold">{item.sweetenerType}</span></p>
                            {item.specialNotes && <p>Notes: {item.specialNotes}</p>}
                          </div>

                          <div className="pt-2 mt-2 border-t border-[#E8DCCF]/60 flex items-center justify-between text-xs">
                            <span className="text-[#532E1C]">
                              Base ₹{item.basePrice} {item.sweetenerSurcharge > 0 ? `+ Alt Sweetener ₹${item.sweetenerSurcharge}` : ''}
                            </span>
                            <span className="font-bold text-sm text-[#7A3E26] tabular-nums">
                              ₹{item.totalPrice.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Biscuit Item Details */}
                      {item.category === 'biscuits' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#7A3E26] bg-[#EFE6DC] px-2 py-0.5 rounded">
                              Biscuits
                            </span>
                            <h4 className="font-serif font-bold text-base text-[#2C2420]">
                              {item.variety.name}
                            </h4>
                          </div>

                          <div className="text-xs text-[#532E1C]/80 mt-1 space-y-0.5">
                            <p>Quantity: {item.quantityBoxes} × {item.boxSize}</p>
                            <p>Dietary: {item.dietaryPreference}</p>
                            {item.specialInstructions && <p>Notes: {item.specialInstructions}</p>}
                          </div>

                          <div className="pt-2 mt-2 border-t border-[#E8DCCF]/60 flex items-center justify-between text-xs">
                            <span className="text-[#7A3E26] font-medium">
                              Price to be confirmed based on your requirement.
                            </span>
                            <span className="font-bold text-sm text-[#7A3E26]">
                              To be confirmed
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Custom Requirement Details */}
                      {item.category === 'custom' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#7A3E26] bg-[#EFE6DC] px-2 py-0.5 rounded">
                              Bespoke Requirement
                            </span>
                            <h4 className="font-serif font-bold text-base text-[#2C2420]">
                              {item.occasionType}
                            </h4>
                          </div>

                          <div className="text-xs text-[#532E1C]/80 mt-1 space-y-0.5">
                            <p>Guests: {item.guestCount} · Specs: {item.dietaryPreferences.join(', ')}</p>
                            <p className="line-clamp-2">Details: {item.desiredItems}</p>
                          </div>

                          <div className="pt-2 mt-2 border-t border-[#E8DCCF]/60 flex items-center justify-between text-xs">
                            <span className="text-[#7A3E26] font-medium">
                              Price to be confirmed based on your requirement.
                            </span>
                            <span className="font-bold text-sm text-[#7A3E26]">
                              To be confirmed
                            </span>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Contact Details for WhatsApp Pre-fill */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DCCF] space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26] block">
                  Delivery / Pickup Info (For Enquiry)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C2420] mb-0.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Patel"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full py-1.5 px-3 text-xs rounded-lg border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C2420] mb-0.5">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full py-1.5 px-3 text-xs rounded-lg border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C2420] mb-0.5">
                      Date & Time Needed
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tomorrow by 5 PM"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full py-1.5 px-3 text-xs rounded-lg border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C2420] mb-0.5">
                      Area / Address (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ahmedabad / Store Pickup"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full py-1.5 px-3 text-xs rounded-lg border border-[#E8DCCF] bg-white focus:outline-none focus:ring-1 focus:ring-[#7A3E26]"
                    />
                  </div>
                </div>
              </div>

              {/* Total Summary Card */}
              <div className="bg-[#241E1B] text-white p-5 rounded-xl space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-base font-serif font-bold">Estimated Total</span>
                  <span className="text-2xl font-serif font-bold text-[#E8DCCF] tabular-nums">
                    ₹{calculatedPricedTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex items-center justify-between text-xs text-[#9AE6B4] border-t border-white/10 pt-2">
                    <span>Total Cake Quantity Discount Savings:</span>
                    <span className="font-bold tabular-nums">−₹{totalSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {hasUnpricedItems && (
                  <p className="text-[11px] text-[#E8DCCF]/70 border-t border-white/10 pt-2">
                    * Additional customization charges or unpriced items will be confirmed directly by Dhanya Bakers.
                  </p>
                )}
              </div>
            </>
          )}

        </div>

        {/* Footer Actions */}
        {orderItems.length > 0 && (
          <div className="p-5 sm:p-6 bg-[#FAF7F2] border-t border-[#E8DCCF] space-y-4">
            
            {/* Number Selector for WhatsApp & Call */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-[#2C2420]">
                Choose Bakery Number to Contact:
              </span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="phoneSelect"
                    checked={selectedWhatsAppNumber === 'phone1'}
                    onChange={() => setSelectedWhatsAppNumber('phone1')}
                    className="accent-[#7A3E26]"
                  />
                  <span className="font-medium text-[#2C2420]">{BAKERY_PHONE_1}</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="phoneSelect"
                    checked={selectedWhatsAppNumber === 'phone2'}
                    onChange={() => setSelectedWhatsAppNumber('phone2')}
                    className="accent-[#7A3E26]"
                  />
                  <span className="font-medium text-[#2C2420]">{BAKERY_PHONE_2}</span>
                </label>
              </div>
            </div>

            {/* Action Buttons: WhatsApp Us & Call Dhanya Bakers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#1F5E3B] hover:bg-[#18492E] active:scale-[0.98] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`tel:${selectedWhatsAppNumber === 'phone1' ? BAKERY_PHONE_1_RAW : BAKERY_PHONE_2_RAW}`}
                className="py-3.5 px-4 text-xs sm:text-sm font-semibold text-[#532E1C] bg-white hover:bg-[#F2ECE4] border border-[#E8DCCF] active:scale-[0.98] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#7A3E26]" />
                <span>Call Dhanya Bakers</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
