/**
 * Dhanya Bakers - Central Bakery Data & Pricing Configuration
 * "Made Just for Your Craving."
 */

export interface CakeFlavour {
  id: string;
  name: string;
  pricePerKg: number;
  description: string;
  badge?: string;
}

export interface CakeBase {
  id: string;
  name: string;
  surchargePerKg: number;
  description: string;
}

export interface CupcakeFlavour {
  id: string;
  name: string;
  pricePerUnit: number;
  description: string;
}

export interface BreadType {
  id: string;
  name: string;
  description: string;
}

export interface BreadBase {
  id: string;
  name: string;
  surchargePerKg: number;
  description: string;
}

export interface CookieVariety {
  id: string;
  name: string;
  description: string;
}

export interface BiscuitVariety {
  id: string;
  name: string;
  description: string;
}

// 1. Official Bakery Contacts (Do not invent any other details)
export const BAKERY_PHONE_1 = "+91 93281 61200";
export const BAKERY_PHONE_1_RAW = "+919328161200";
export const BAKERY_PHONE_2 = "+91 94090 37507";
export const BAKERY_PHONE_2_RAW = "+919409037507";

export const BAKERY_NAME = "Dhanya Bakers";
export const BAKERY_TAGLINE = "Made Just for Your Craving.";

// 2. Cake Flavours & Pricing
export const cakeFlavours: CakeFlavour[] = [
  {
    id: "chocolate-fudge",
    name: "Chocolate Fudge",
    pricePerKg: 1300,
    description: "Rich Dutch-processed dark cocoa layered with decadent velvety fudge.",
    badge: "Bestseller"
  },
  {
    id: "caramel-cream",
    name: "Caramel Cream",
    pricePerKg: 1100,
    description: "Handcrafted golden salted caramel swirled into silky dairy cream.",
    badge: "Popular"
  },
  {
    id: "rasmalai-rasgulla-bliss",
    name: "Rasmalai Rasgulla Bliss",
    pricePerKg: 1100,
    description: "Traditional royal sweet infused with aromatic cardamom, saffron & tender cottage cheese dumplings.",
    badge: "Signature"
  },
  {
    id: "citrus-splash",
    name: "Citrus Splash",
    pricePerKg: 1050,
    description: "Zesty lemon and lime curd layered with refreshing sun-kissed sponge."
  },
  {
    id: "crunchy-butterscotch-delight",
    name: "Crunchy Butterscotch Delight",
    pricePerKg: 1050,
    description: "Caramelized praline crunch folded into luscious brown butter cream."
  },
  {
    id: "fresh-strawberry",
    name: "Fresh Strawberry",
    pricePerKg: 1050,
    description: "Lush real strawberry compote layered with light airy vanilla sponge."
  },
  {
    id: "mango-indulgence",
    name: "Mango Indulgence",
    pricePerKg: 1050,
    description: "Ripe Alphonso mango cream reduction paired with tender white sponge."
  },
  {
    id: "pineapple-punch",
    name: "Pineapple Punch",
    pricePerKg: 1050,
    description: "Tangy-sweet roasted pineapple titbits laced with fresh whipped cream."
  },
  {
    id: "tangy-orange",
    name: "Tangy Orange",
    pricePerKg: 1050,
    description: "Bright Valencia orange glaze with delicate aromatic citrus sponge."
  },
  {
    id: "the-iconic-vanilla",
    name: "The Iconic Vanilla",
    pricePerKg: 1050,
    description: "Classic Madagascar bourbon vanilla bean crumb layered with silky frosting."
  }
];

// 3. Cake Base Options
export const cakeBases: CakeBase[] = [
  {
    id: "maida",
    name: "Maida Base",
    surchargePerKg: 0,
    description: "Made with maida by default to enhance softness."
  },
  {
    id: "wheat",
    name: "100% Wheat Base",
    surchargePerKg: 50,
    description: "Wholesome stone-ground wheat flour for a rich, hearty texture (+₹50/kg)."
  },
  {
    id: "farali",
    name: "Farali Base",
    surchargePerKg: 100,
    description: "Fasting-compliant specialized flour blend crafted with utmost purity (+₹100/kg)."
  }
];

// 4. Cake Weights & Progressive Cake Discount
export const standardCakeWeights = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];

/**
 * Cake Weight Discount System
 * 0.5 kg -> 0%
 * 1 kg   -> 0%
 * 1.5 kg -> 0%
 * 2 kg   -> 10%
 * 2.5 kg -> 15%
 * 3 kg   -> 20%
 * 4 kg   -> 25%
 * 5 kg   -> 30% (Max discount: 30%)
 */
export function getCakeDiscount(weightKg: number): number {
  if (weightKg >= 5) return 0.30;
  if (weightKg >= 4) return 0.25;
  if (weightKg >= 3) return 0.20;
  if (weightKg >= 2.5) return 0.15;
  if (weightKg >= 2) return 0.10;
  return 0;
}

// 5. Cupcake Configuration (₹50 per cupcake across all flavours)
export const CUPCAKE_PRICE = 50;

export const cupcakeFlavours: CupcakeFlavour[] = [
  { id: "caramel-cream", name: "Caramel Cream", pricePerUnit: CUPCAKE_PRICE, description: "Silky salted caramel swirl frosting." },
  { id: "chocolate-fudge", name: "Chocolate Fudge", pricePerUnit: CUPCAKE_PRICE, description: "Decadent dark chocolate fudge crown." },
  { id: "citrus-splash", name: "Citrus Splash", pricePerUnit: CUPCAKE_PRICE, description: "Zingy citrus blossom icing." },
  { id: "crunchy-butterscotch-delight", name: "Crunchy Butterscotch Delight", pricePerUnit: CUPCAKE_PRICE, description: "Buttery praline crunch topped." },
  { id: "fresh-strawberry", name: "Fresh Strawberry", pricePerUnit: CUPCAKE_PRICE, description: "Real strawberry glaze with vanilla frosting." },
  { id: "mango-indulgence", name: "Mango Indulgence", pricePerUnit: CUPCAKE_PRICE, description: "Alphonso mango cream swirl." },
  { id: "pineapple-punch", name: "Pineapple Punch", pricePerUnit: CUPCAKE_PRICE, description: "Tropical pineapple cream delight." },
  { id: "rasmalai-rasgulla-bliss", name: "Rasmalai Rasgulla Bliss", pricePerUnit: CUPCAKE_PRICE, description: "Cardamom & saffron sweet blend." },
  { id: "tangy-orange", name: "Tangy Orange", pricePerUnit: CUPCAKE_PRICE, description: "Tangy orange zest swirl." },
  { id: "the-iconic-vanilla", name: "The Iconic Vanilla", pricePerUnit: CUPCAKE_PRICE, description: "Pure vanilla bean buttercream." }
];

export const standardCupcakeQuantities = [1, 2, 4, 6, 9, 12, 18, 24, 30, 50, 100];

export const cupcakeDecorations = [
  { id: "simple", name: "Simple", note: "Included" },
  { id: "elegant", name: "Elegant", note: "Included" },
  { id: "floral", name: "Floral", note: "Included" },
  { id: "chocolate", name: "Chocolate", note: "Included" },
  { id: "sprinkles", name: "Sprinkles", note: "Included" },
  { id: "theme-based", name: "Theme-based", note: "Included" },
  { id: "custom", name: "Custom", note: "Additional decoration charges will be confirmed based on your requirement." }
];

export const cupcakeOccasions = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Baby Shower",
  "Festive",
  "Corporate",
  "Party",
  "Just Because",
  "Other"
];

export const cupcakeFrostingOptions = [
  "Whipped Cream (Light & Fluffy)",
  "Silky Buttercream",
  "Chocolate Ganache",
  "Cream Cheese Frosting",
  "Light Frosting",
  "No Frosting (Muffin style)"
];

// 6. Bread Configuration (₹450 per kg)
export const BREAD_BASE_PRICE_PER_KG = 450;
export const BREAD_PROMINENT_NOTE = "Made with pure butter, sunflower oil and maida.";

export const breadBases: BreadBase[] = [
  {
    id: "maida",
    name: "Maida",
    surchargePerKg: 0,
    description: "Classic soft bakery loaf (₹450/kg)."
  },
  {
    id: "suji",
    name: "Suji (Semolina)",
    surchargePerKg: 50,
    description: "Nutty semolina crumb (+₹50/kg → ₹500/kg)."
  },
  {
    id: "whole-wheat",
    name: "Whole Wheat Flour",
    surchargePerKg: 50,
    description: "100% wholesome fiber-rich wheat (+₹50/kg → ₹500/kg)."
  }
];

export const breadTypes: BreadType[] = [
  { id: "milk-bread", name: "Milk Bread", description: "Ultra-soft bakery classic with rich golden crust." },
  { id: "whole-wheat-bread", name: "Whole Wheat Bread", description: "Hearty stoneground loaf with roasted nutty notes." },
  { id: "multigrain-bread", name: "Multigrain Bread", description: "Loaded with flax, sunflower, sesame, and pumpkin seeds." },
  { id: "garlic-bread", name: "Garlic Bread", description: "Infused with roasted garlic butter and fragrant herbs." },
  { id: "brioche", name: "Brioche", description: "Tender, pillowy enriched crumb with golden gloss." },
  { id: "suji-bread", name: "Suji Bread", description: "Textured semolina crumb, light on digestion." },
  { id: "custom-bread", name: "Custom Bread", description: "Tailored to your specific recipe, dietary needs, or flavor." }
];

export const breadShapes = [
  "Standard Loaf (Unsliced)",
  "Pre-Sliced Sandwich Loaf",
  "Artisan Pull-Apart Rolls",
  "Burger / Dinner Buns (Pack)",
  "Rustic Baguette"
];

// 7. Cookie Configuration (₹450 per 250g, Alternative sweetener +₹100/250g)
export const cookiePricing = {
  basePricePer250g: 450,
  alternativeSweetenerSurchargePer250g: 100
};

export const cookieVarieties: CookieVariety[] = [
  { id: "choco-chip", name: "Gourmet Choco Chip", description: "Loaded with melting Belgian chocolate drops and pure butter." },
  { id: "double-chocolate", name: "Double Chocolate Indulgence", description: "Dutch cocoa dough folded with bittersweet dark chunks." },
  { id: "butter-cookies", name: "Royal Butter Cookies", description: "Melt-in-mouth golden swirl cookies made with 100% dairy butter." },
  { id: "oats-raisin", name: "Oats & Golden Raisin", description: "Rolled oats, warm cinnamon aroma, and plump raisins." },
  { id: "almond-crunch", name: "Roasted Almond Crunch", description: "Crisp butter shortbread packed with slivered roasted almonds." },
  { id: "pistachio-cardamom", name: "Pistachio & Cardamom Bliss", description: "Subtle desi royal notes of crushed green pista and cardamom." }
];

// 8. Biscuits Configuration (Unpriced - "Price to be confirmed based on your requirement.")
export const biscuitVarieties: BiscuitVariety[] = [
  { id: "nankhatai", name: "Traditional Nankhatai", description: "Authentic cardamom shortbread spiced with pure ghee and crushed nuts." },
  { id: "jeera-butter", name: "Jeera Butter Biscuits", description: "Savory-sweet crisp bites roasted with whole cumin seeds." },
  { id: "cashew-delight", name: "Cashew Butter Drops", description: "Crumbly golden biscuits with slow-roasted cashew nut halves." },
  { id: "shrewsbury", name: "Shrewsbury Butter Biscuits", description: "Classic British tea-time butter biscuit with tender crumb." },
  { id: "milk-rusk", name: "Crispy Cardamom Milk Rusk", description: "Double-baked golden crunchy toast, ideal for morning chai." },
  { id: "ajwain-crisps", name: "Ajwain Savory Crisps", description: "Flaky tea biscuit seasoned with aromatic carom seeds." },
  { id: "custom-biscuits", name: "Custom Crafted Biscuits", description: "Handmade to your preferred flavour, sugar-free, or festival theme." }
];

// 9. Categories
export interface CategoryItem {
  id: "cake" | "cupcake" | "cookie" | "bread" | "biscuits" | "custom";
  title: string;
  tagline: string;
  badge?: string;
  iconName: string;
}

export const bakeryCategories: CategoryItem[] = [
  {
    id: "cake",
    title: "Cake",
    tagline: "Celebrate, surprise, or simply indulge.",
    badge: "Up to 30% Off",
    iconName: "Cake"
  },
  {
    id: "cupcake",
    title: "Cupcake",
    tagline: "Small treats, big cravings.",
    badge: "₹50 Each",
    iconName: "Sparkles"
  },
  {
    id: "cookie",
    title: "Cookie",
    tagline: "Something crisp, buttery and delicious.",
    badge: "From ₹450 / 250g",
    iconName: "Cookie"
  },
  {
    id: "bread",
    title: "Bread",
    tagline: "Freshly baked goodness for every table.",
    badge: "Pure Butter & Oil",
    iconName: "Wheat"
  },
  {
    id: "biscuits",
    title: "Biscuits",
    tagline: "Classic bites for everyday cravings.",
    badge: "Custom Baked",
    iconName: "Coffee"
  },
  {
    id: "custom",
    title: "Custom Requirement",
    tagline: "Have something else in mind? Tell us what you need.",
    badge: "Bespoke Orders",
    iconName: "HeartHandshake"
  }
];
