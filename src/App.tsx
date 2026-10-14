/**
 * Dhanya Bakers - Official Web Application
 * "Made Just for Your Craving."
 */

import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySelector } from './components/CategorySelector';
import { CakeBuilder, CakeOrderItem } from './components/CakeBuilder';
import { CupcakeBuilder, CupcakeOrderItem } from './components/CupcakeBuilder';
import { BreadBuilder, BreadOrderItem } from './components/BreadBuilder';
import { CookieBuilder, CookieOrderItem } from './components/CookieBuilder';
import { BiscuitsBuilder, BiscuitsOrderItem } from './components/BiscuitsBuilder';
import { CustomRequirementBuilder, CustomRequirementItem } from './components/CustomRequirementBuilder';
import { NeedHelpSection } from './components/NeedHelpSection';
import { Footer } from './components/Footer';
import { OrderConfirmationModal, AnyOrderItem } from './components/OrderConfirmationModal';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('cake');
  const [orderItems, setOrderItems] = useState<AnyOrderItem[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);

  const builderSectionRef = useRef<HTMLDivElement>(null);
  const helpSectionRef = useRef<HTMLDivElement>(null);

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    if (builderSectionRef.current) {
      builderSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToContact = () => {
    if (helpSectionRef.current) {
      helpSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddItem = (item: AnyOrderItem) => {
    setOrderItems((prev) => [...prev, item]);
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2420] flex flex-col font-sans selection:bg-[#E8DCCF] selection:text-[#532E1C]">
      
      {/* 1. Header & Navigation (3-zone contract) */}
      <Navbar
        activeTab={activeCategory}
        onSelectTab={handleSelectCategory}
        orderItemCount={orderItems.length}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />

      {/* 2. Hero Section */}
      <Hero
        onExploreCakes={() => handleSelectCategory('cake')}
        onExploreCupcakes={() => handleSelectCategory('cupcake')}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Category Selector (6 Main Choices) */}
      <CategorySelector
        selectedCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 4. Active Builder Section */}
      <main ref={builderSectionRef} className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* Friendly Microcopy Prompt */}
        <div className="mb-6 flex items-center justify-between border-b border-[#E8DCCF] pb-3">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#7A3E26]">
            {activeCategory === 'cake' && "Let's make something delicious · Handcrafted Celebration Cake"}
            {activeCategory === 'cupcake' && "Make it yours · Artisanal Cupcakes at ₹50 Each"}
            {activeCategory === 'cookie' && "Crisp, buttery and delicious · Fresh Cookie Batches"}
            {activeCategory === 'bread' && "Baked with pure butter & sunflower oil · Artisan Loaves"}
            {activeCategory === 'biscuits' && "Classic bites for everyday cravings · Traditional Bakes"}
            {activeCategory === 'custom' && "Something special in mind? Let's bring your vision to life"}
          </p>
          <span className="text-xs text-[#532E1C]/60 hidden sm:inline">
            Your creation is coming together
          </span>
        </div>

        {/* Dynamic Category View */}
        {activeCategory === 'cake' && (
          <CakeBuilder onAddCakeToOrder={handleAddItem} />
        )}

        {activeCategory === 'cupcake' && (
          <CupcakeBuilder onAddCupcakeToOrder={handleAddItem} />
        )}

        {activeCategory === 'bread' && (
          <BreadBuilder onAddBreadToOrder={handleAddItem} />
        )}

        {activeCategory === 'cookie' && (
          <CookieBuilder onAddCookieToOrder={handleAddItem} />
        )}

        {activeCategory === 'biscuits' && (
          <BiscuitsBuilder onAddBiscuitsToOrder={handleAddItem} />
        )}

        {activeCategory === 'custom' && (
          <CustomRequirementBuilder onAddCustomRequirementToOrder={handleAddItem} />
        )}

      </main>

      {/* 5. Contact / Need Help Section */}
      <div ref={helpSectionRef}>
        <NeedHelpSection />
      </div>

      {/* 6. Footer (Strictly conforming to Section 25) */}
      <Footer
        onSelectNav={handleSelectCategory}
        onScrollToContact={handleScrollToContact}
      />

      {/* 7. Order Confirmation & Breakdown Drawer / Modal */}
      <OrderConfirmationModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        orderItems={orderItems}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
      />

      {/* Floating Mobile Cart Bar if items exist */}
      {orderItems.length > 0 && !isOrderModalOpen && (
        <aside
          aria-label="Floating order summary"
          className="fixed bottom-4 left-4 right-4 sm:hidden z-40 bg-[#7A3E26] text-white p-3.5 rounded-xl shadow-xl flex items-center justify-between animate-in slide-in-from-bottom-3"
        >
          <div className="text-xs">
            <span className="font-semibold block">{orderItems.length} {orderItems.length === 1 ? 'creation' : 'creations'} added</span>
            <span className="text-white/80">Tap to review price breakdown</span>
          </div>
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="px-3.5 py-1.5 bg-white text-[#7A3E26] font-semibold text-xs rounded-lg shadow-sm cursor-pointer"
          >
            Review Tray
          </button>
        </aside>
      )}

    </div>
  );
}
