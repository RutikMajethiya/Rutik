import React from 'react';
import { Sparkles, Award, ShieldCheck, Heart } from 'lucide-react';
import { BAKERY_NAME, BAKERY_TAGLINE } from '../data/bakeryData';

interface HeroProps {
  onExploreCakes: () => void;
  onExploreCupcakes: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCakes,
  onExploreCupcakes,
  onSelectCategory
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-[#E8DCCF]/80">
      {/* Subtle warm background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F3E8DB]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#EADCCB]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Brand & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#7A3E26] bg-[#EFE6DC] px-3.5 py-1.5 rounded-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted Confections & Artisan Breads</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2C2420] tracking-tight leading-[1.15]">
                {BAKERY_NAME}
              </h1>
              <p className="text-2xl sm:text-3xl font-serif italic text-[#7A3E26] font-medium">
                "{BAKERY_TAGLINE}"
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#532E1C]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Every celebration deserves a masterpiece. From bespoke layered cakes to gourmet cupcakes and pure butter artisan breads, we bake every delicacy fresh to your craving.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreCakes}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#7A3E26] hover:bg-[#63321E] active:scale-[0.98] rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                Let's make something delicious
              </button>

              <button
                onClick={onExploreCupcakes}
                className="px-5 py-3.5 text-sm font-semibold text-[#532E1C] bg-[#EFE6DC] hover:bg-[#E4D7C8] active:scale-[0.98] rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                Explore Cupcakes
              </button>

            </div>

          </div>

          {/* Right Showcase Card - Artisanal Showcase Feature */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DCCF] shadow-sm space-y-5">
              
              <div className="flex items-center justify-between border-b border-[#F0E6DA] pb-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#2C2420]">
                    Dhanya Bakers Guarantee
                  </h3>
                  <p className="text-xs text-[#532E1C]/70">Pure indulgence in every slice</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FAF3EC] flex items-center justify-center text-[#7A3E26]">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              {/* 3 Value Pillars */}
              <div className="space-y-3.5 text-xs text-[#532E1C]">
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#FAF7F2]">
                  <ShieldCheck className="w-4 h-4 text-[#7A3E26] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2C2420]">Pure Butter & Natural Flavours:</span>
                    <p className="text-[#532E1C]/80 mt-0.5">Bread baked with pure butter and sunflower oil. Cakes made with rich dairy crèmes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#FAF7F2]">
                  <Sparkles className="w-4 h-4 text-[#7A3E26] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2C2420]">Progressive Weight Discounts:</span>
                    <p className="text-[#532E1C]/80 mt-0.5">Save up to 30% on cakes (2 kg = 10% off, 3 kg = 20% off, 4 kg = 25% off, 5 kg = 30% off).</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#FAF7F2]">
                  <Heart className="w-4 h-4 text-[#7A3E26] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2C2420]">Tailored Bases & Diet:</span>
                    <p className="text-[#532E1C]/80 mt-0.5">Choice of Soft Maida, 100% Wheat, or pure Farali bases.</p>
                  </div>
                </div>
              </div>

              {/* Quick Jump Bar */}
              <div className="pt-2 border-t border-[#F0E6DA]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#532E1C]/70">Explore our creations:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCategory('bread')}
                      className="font-medium text-[#7A3E26] hover:underline cursor-pointer"
                    >
                      Breads
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => onSelectCategory('cookie')}
                      className="font-medium text-[#7A3E26] hover:underline cursor-pointer"
                    >
                      Cookies
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => onSelectCategory('biscuits')}
                      className="font-medium text-[#7A3E26] hover:underline cursor-pointer"
                    >
                      Biscuits
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
