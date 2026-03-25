const mainFallsImg = require("../../assets/main-falls.png");
const devilsPoolImg = require("../../assets/devils-pool.png");
const rainforestWalkImg = require("../../assets/rainforest-walk.png");
export interface StoreProduct {
  id: string;
  name: string;
  shortName: string;
  image: any; // Image source
  rentPrice?: number; // USD/day, undefined if no rent
  buyPrice: number; // USD
  description: string;
  details: string[];
  category: "raincoat" | "silverware";
}

export type { StoreProduct as StoreProductType };

export const storeProducts: StoreProduct[] = [
  // Raincoats (essential for mist/rain)
  {
    id: "poncho-heavy",
    name: "Heavy Duty Mist Poncho",
    shortName: "Mist Poncho",
    image: rainforestWalkImg, // Reuse for now
    rentPrice: 5,
    buyPrice: 25,
    description:
      "Premium waterproof poncho designed for Victoria Falls mist. Full coverage.",
    details: [
      "100% waterproof nylon",
      "Adjustable hood & snaps",
      "Packed size: palm-sized",
    ],
    category: "raincoat",
  },
  {
    id: "raincoat-pro",
    name: "Professional Rain Suit",
    shortName: "Pro Rain Suit",
    image: mainFallsImg,
    rentPrice: 8,
    buyPrice: 45,
    description:
      "Complete 2-piece rain gear for rainforest walks and gorge trails.",
    details: ["Breathable fabric", "Reinforced seams", "Reflective strips"],
    category: "raincoat",
  },
  {
    id: "kids-poncho",
    name: "Kid's Adventure Poncho",
    shortName: "Kids Poncho",
    image: rainforestWalkImg,
    rentPrice: 3,
    buyPrice: 18,
    description: "Colorful ponchos for young explorers. Sizes 4-12 years.",
    details: ["Fun patterns", "Easy pull-on design", "Machine washable"],
    category: "raincoat",
  },
  // Silverware (souvenirs)
  {
    id: "silver-set-basic",
    name: "Zambezi Silverware Set (6pc)",
    shortName: "6pc Silver Set",
    image: mainFallsImg, // Reuse
    rentPrice: undefined,
    buyPrice: 65,
    description:
      "Handcrafted silver-plated cutlery set inspired by Zambezi river motifs.",
    details: [
      "6 pieces: knife, fork, spoon x2",
      "Tonga tribal engravings",
      "Gift box included",
    ],
    category: "silverware",
  },
  {
    id: "silver-set-deluxe",
    name: "Mosi-oa-Tunya Deluxe Set (12pc)",
    shortName: "12pc Deluxe",
    image: rainforestWalkImg,
    rentPrice: undefined,
    buyPrice: 135,
    description:
      "Premium 12-piece set with serving pieces. UNESCO heritage design.",
    details: [
      "Sterling silver plate",
      "12 pieces + servers",
      "Engraved presentation box",
    ],
    category: "silverware",
  },
  {
    id: "silver-souvenir",
    name: "Falls Souvenir Spoon",
    shortName: "Souvenir Spoon",
    image: mainFallsImg,
    rentPrice: undefined,
    buyPrice: 22,
    description: "Collectible silver spoon with falls engraving. Perfect gift.",
    details: ["3D falls relief", "Velvet pouch", "Limited edition"],
    category: "silverware",
  },
];
