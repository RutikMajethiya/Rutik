import React from 'react';
import { Cake, Sparkles, Cookie, Wheat, Coffee, HeartHandshake } from 'lucide-react';
import { bakeryCategories, CategoryItem } from '../data/bakeryData';

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cake':
        return <Cake className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Cookie':
        return <Cookie className="w-5 h-5" />;
      case 'Wheat':
        return <Wheat className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      default:
        return <Cake className="w-5 h-5" />;
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-7">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#7A3E26] mb-1.5">
            Artisanal Collections
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2420]">
            What are you craving today?
          </h2>
          <p className="text-sm text-[#532E1C]/80 mt-1">
            Choose a delicacy to customize your flavour, weight, flour base, and handcrafted details.
          </p>
        </div>

        {/* 6 Choices Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {bakeryCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative flex flex-col text-left p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#7A3E26] text-white shadow-md -translate-y-1'
                    : 'bg-white hover:bg-[#FAF3EC] text-[#2C2420] border border-[#E8DCCF]'
                }`}
              >
                {/* Header Icon + Optional Badge */}
                <div className="flex items-center justify-between mb-3 w-full">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-white/15 text-white'
                        : 'bg-[#FAF3EC] text-[#7A3E26]'
                    }`}
                  >
                    {getIcon(cat.iconName)}
                  </div>

                  {cat.badge && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[#EFE6DC] text-[#7A3E26]'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-base sm:text-lg mb-1 leading-snug">
                  {cat.title}
                </h3>

                {/* Exact Tagline description */}
                <p
                  className={`text-xs leading-relaxed mt-auto ${
                    isSelected ? 'text-white/85' : 'text-[#532E1C]/75'
                  }`}
                >
                  "{cat.tagline}"
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
