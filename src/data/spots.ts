const mainFallsImg = "./main-falls.png";
const devilsPoolImg = "./devils-pool.png";
const rainforestWalkImg = "./rainforest-walk.png";
const vicFallsBridgeImg = "./vic-falls-bridge.png";
const boilingPotImg = "./boiling-pot.png";
const nationalParkImg = "./national-park.png";
const zambeziNationalParkImg = "./hero-falls.png";
const elephantsWalkImg = "./rainforest-walk.png";
const cassiaRestaurantImg = "./hero-falls.png";
const bomaDinnerImg = "./vic-falls-bridge.png";
const lookoutCafeImg = "./boiling-pot.png";
const dustyRoadImg = "./devils-pool.png";
const threeMonkeysImg = "./main-falls.png";

export interface TouristSpot {
  id: string;
  name: string;
  shortName: string;
  image: string;
  lat: number;
  lng: number;
  description: string;
  history: string;
  funFacts: string[];
  culturalSignificance: string;
  openingHours: string;
  entryFee: string;
  safetyTips: string[];
  category: string;
}

export interface VicFallsAttraction {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  hours: string;
  category: string;
  address: string;
  maps_link: string;
  details: string;
}

export interface VicFallsRestaurant {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  hours: string;
  category: string;
  address: string;
  maps_link: string;
  signature_dishes: string[];
  details: string;
}

export const touristSpots: TouristSpot[] = [
  {
    id: "main-falls",
    name: "Main Falls (Mosi-oa-Tunya)",
    shortName: "Main Falls",
    image: mainFallsImg,
    lat: -17.9243,
    lng: 25.8572,
    description:
      "The largest curtain of falling water in the world, stretching 1,708 metres wide. The Main Falls plunge over 100 metres into the First Gorge, generating a permanent cloud of spray visible from 50 km away.",
    history:
      "Known locally as Mosi-oa-Tunya — 'The Smoke That Thunders' — the falls were first seen by European explorer David Livingstone in 1855. They have been a UNESCO World Heritage Site since 1989.",
    funFacts: [
      "During peak flow, 500 million litres of water cascade per minute.",
      "The spray can rise over 400 metres high.",
      "It is the largest sheet of falling water on Earth by combined width and height.",
    ],
    culturalSignificance:
      "The Tonga people, original inhabitants, have revered the falls for centuries as a sacred site where ancestral spirits dwell in the mist.",
    openingHours: "6:00 AM – 6:00 PM daily",
    entryFee: "$30 USD (international) / $7 USD (SADC residents)",
    safetyTips: [
      "Wear waterproof clothing — the spray is intense.",
      "Use waterproof cases for electronics.",
      "Stay behind safety barriers at all times.",
    ],
    category: "waterfall",
  },
  {
    id: "devils-pool",
    name: "Devil's Pool",
    shortName: "Devil's Pool",
    image: devilsPoolImg,
    lat: -17.9235,
    lng: 25.8565,
    description:
      "A natural rock pool on the edge of the falls where adventurous swimmers can peer over the 100-metre precipice. Only accessible from the Zambian side during low-water season (September–December).",
    history:
      "Devil's Pool became a world-famous tourist attraction in the early 2000s. The natural rock lip prevents swimmers from being swept over, making it one of the most thrilling swimming spots on Earth.",
    funFacts: [
      "Only accessible when the Zambezi River is at its lowest.",
      "A submerged rock wall acts as a natural barrier at the edge.",
      "Guides accompany every swimmer for safety.",
    ],
    culturalSignificance:
      "Local legends warn that the pool is guarded by spirits, and only the brave may enter.",
    openingHours: "7:00 AM – 5:00 PM (seasonal, Sep–Dec)",
    entryFee: "$25 USD per person",
    safetyTips: [
      "Only visit with a licensed guide.",
      "Not available during high-water season (Feb–May).",
      "Wear water shoes for grip on wet rocks.",
    ],
    category: "adventure",
  },
  {
    id: "rainforest-walk",
    name: "Rainforest Walk",
    shortName: "Rainforest Walk",
    image: rainforestWalkImg,
    lat: -17.9255,
    lng: 25.858,
    description:
      "A lush, ever-green strip of tropical rainforest sustained entirely by the constant spray from the falls. The trail offers 16 viewpoints along the gorge rim.",
    history:
      "This unique micro-ecosystem has evolved over thousands of years, fed only by the perpetual mist. It's one of the few places in southern Africa where you'll find true rainforest species.",
    funFacts: [
      "The forest receives 'rain' 24/7, 365 days a year from the falls' spray.",
      "Rare plant species found nowhere else in Zimbabwe grow here.",
      "Baboons, warthogs, and vervet monkeys frequent the trail.",
    ],
    culturalSignificance:
      "The rainforest is considered a healing place by the local Tonga people, who believe the mist carries blessings from their ancestors.",
    openingHours: "6:00 AM – 6:00 PM daily",
    entryFee: "Included with Victoria Falls park entry",
    safetyTips: [
      "Bring a raincoat — you will get soaked.",
      "Paths can be slippery — wear sturdy shoes.",
      "Keep belongings in waterproof bags.",
    ],
    category: "nature",
  },
  {
    id: "victoria-falls-bridge",
    name: "Victoria Falls Bridge",
    shortName: "Vic Falls Bridge",
    image: vicFallsBridgeImg,
    lat: -17.928,
    lng: 25.861,
    description:
      "A spectacular steel arch bridge spanning the Second Gorge, connecting Zimbabwe and Zambia. It offers bungee jumping, bridge swings, zip-lining, and stunning views of the falls.",
    history:
      "Designed by George Andrew Hobson and completed in 1905, the bridge was commissioned by Cecil Rhodes as part of his Cape-to-Cairo railway dream. It stands 128 metres above the Zambezi.",
    funFacts: [
      "The 111-metre bungee jump is one of the world's highest commercial jumps.",
      "The bridge was prefabricated in England and shipped to Africa.",
      "It carries road, rail, and foot traffic between two countries.",
    ],
    culturalSignificance:
      "The bridge represents a living connection between Zimbabwe and Zambia, symbolizing shared heritage and cross-border unity.",
    openingHours: "Open 24 hours (activities: 8:00 AM – 5:00 PM)",
    entryFee: "Bungee: $160 USD / Bridge tour: $45 USD",
    safetyTips: [
      "Carry your passport — this is an international border crossing.",
      "Follow all operator instructions for adventure activities.",
      "Hold railings when walking — wind can be strong.",
    ],
    category: "landmark",
  },
  {
    id: "boiling-pot",
    name: "The Boiling Pot",
    shortName: "Boiling Pot",
    image: boilingPotImg,
    lat: -17.9275,
    lng: 25.856,
    description:
      "A dramatic whirlpool at the base of the First Gorge where the Zambezi churns after plunging over the falls. Reached via a steep, rocky path descending into the gorge.",
    history:
      "Named by early European explorers who thought the turbulent water looked like a boiling cauldron. It has been a point of fascination and a challenging hike for over a century.",
    funFacts: [
      "The hike down is about 200 metres of steep descent.",
      "During low water, you can see the whirlpool clearly from above.",
      "Crocodiles have been spotted in the calmer pools nearby.",
    ],
    culturalSignificance:
      "Local tradition holds that the Boiling Pot is where the river spirits are at their most powerful.",
    openingHours: "6:00 AM – 5:00 PM daily",
    entryFee: "Free (within park boundaries)",
    safetyTips: [
      "The hike is steep and strenuous — bring water.",
      "Do not swim — currents are extremely dangerous.",
      "Watch for loose rocks on the path.",
    ],
    category: "nature",
  },
];

export const emergencyContacts = [
  {
    name: "Victoria Falls Emergency Services",
    number: "+263 13 44288",
    type: "emergency",
  },
  {
    name: "Zimbabwe Parks & Wildlife (Rangers)",
    number: "+263 13 44566",
    type: "ranger",
  },
  { name: "Victoria Falls Hospital", number: "+263 13 44583", type: "medical" },
  { name: "Zimbabwe Tourism Authority", number: "+263 13 44202", type: "info" },
  { name: "Police (Victoria Falls)", number: "+263 13 44206", type: "police" },
];

export const parkRules = [
  "Stay on marked paths and behind safety barriers.",
  "Do not feed or approach wildlife.",
  "No littering — carry all waste with you.",
  "No drones without a permit.",
  "Respect cultural sites and sacred areas.",
  "Alcohol is prohibited within park boundaries.",
  "Swimming is only permitted in designated areas with guides.",
];

export const vicFallsTourism = {
  attractions: [
    {
      id: "att_001",
      name: "Victoria Falls National Park",
      imageUrl: nationalParkImg,
      rating: 4.9,
      hours: "06:00 – 18:00",
      category: "Nature / UNESCO Site",
      address: "Livingstone Way, Victoria Falls",
      maps_link: "https://maps.app.goo.gl/uXN4VbX8Z6Zz9Kz97",
      details:
        "Home to the main falls. Entry: $50 Intl / $30 SADC / $10 Local. Raincoats highly recommended Feb–June.",
    },
    {
      id: "att_002",
      name: "Victoria Falls Bridge",
      imageUrl: vicFallsBridgeImg,
      rating: 4.8,
      hours: "08:00 – 17:00",
      category: "Adrenaline / Engineering",
      address: "Livingstone Way (Border Crossing)",
      maps_link: "https://maps.app.goo.gl/bZ1ZzKz97uXN4VbX8",
      details:
        "Historic 1905 bridge. Famous for 111m Bungee, Bridge Swing, and Slide. Carry passport for access.",
    },
    {
      id: "att_003",
      name: "Zambezi National Park",
      imageUrl: zambeziNationalParkImg,
      rating: 4.5,
      hours: "06:00 – 18:00",
      category: "Wildlife Safari",
      address: "Zambezi Drive, Victoria Falls",
      maps_link: "https://maps.app.goo.gl/VbX8Z6Zz9Kz97uXN4",
      details:
        "Pristine wilderness. Best for river-side game drives. Frequent elephant and buffalo sightings.",
    },
    {
      id: "att_004",
      name: "Elephant's Walk Shopping Village",
      imageUrl: elephantsWalkImg,
      rating: 4.4,
      hours: "08:00 – 17:00",
      category: "Culture / Arts",
      address: "Adam Stander Drive, Victoria Falls",
      maps_link: "https://maps.app.goo.gl/Zz9Kz97uXN4VbX8Z6",
      details:
        "Authentic Zimbabwean crafts, Jafuta Heritage Museum, and local art studios.",
    },
  ] as VicFallsAttraction[],
  restaurants: [
    {
      id: "res_001",
      name: "The Cassia Restaurant",
      imageUrl: cassiaRestaurantImg,
      rating: 4.8,
      hours: "06:30 – 21:30",
      category: "Fine Dining",
      address: "411 Livingstone Way, Victoria Falls",
      maps_link: "https://maps.app.goo.gl/Kz97uXN4VbX8Z6Zz9",
      signature_dishes: ["Kudu Wellington", "Crocodile Risotto"],
      details:
        "Located at Ilala Lodge. Elegant al fresco dining within earshot of the Falls' roar.",
    },
    {
      id: "res_002",
      name: "The Boma - Dinner & Drum Show",
      imageUrl: bomaDinnerImg,
      rating: 4.6,
      hours: "18:30 – 22:00",
      category: "Interactive / Cultural",
      address: "Squire Cummings Ave, Victoria Falls",
      maps_link: "https://maps.app.goo.gl/uXN4VbX8Z6Zz9Kz97",
      signature_dishes: ["Warthog Fillet", "Mopane Worms"],
      details:
        "Immersive 4-course feast with face painting, drumming, and traditional dancing.",
    },
    {
      id: "res_003",
      name: "The Lookout Cafe",
      imageUrl: lookoutCafeImg,
      rating: 4.7,
      hours: "08:00 – 21:30",
      category: "Casual / Views",
      address: "Bakota Gorge, Victoria Falls",
      maps_link: "https://maps.app.goo.gl/bZ1ZzKz97uXN4VbX8",
      signature_dishes: ["Ostrich Fan Fillet", "Sherry-infused Ribs"],
      details: "Best view in the city. Perched 120m above the Batoka Gorge.",
    },
    {
      id: "res_004",
      name: "Dusty Road Township Experience",
      imageUrl: dustyRoadImg,
      rating: 4.8,
      hours: "12:00 – 22:00",
      category: "Authentic / Community",
      address: "Stand 1195 Chinotimba, Victoria Falls",
      maps_link: "https://maps.app.goo.gl/VbX8Z6Zz9Kz97uXN4",
      signature_dishes: ["Chicken in Peanut Butter Sauce", "Zambezi Bream"],
      details:
        "Traditional cooking in the heart of Chinotimba township. Focuses on female empowerment.",
    },
    {
      id: "res_005",
      name: "The Three Monkeys",
      imageUrl: threeMonkeysImg,
      rating: 4.5,
      hours: "11:00 – 23:00",
      category: "Modern social",
      address: "Corner Livingstone Way & Adam Stander Dr",
      maps_link: "https://maps.app.goo.gl/Zz9Kz97uXN4VbX8Z6",
      signature_dishes: ["Marula Burger", "Wood-Fired Pizza"],
      details:
        "Centrally located hub known for a vibrant atmosphere and great cocktails.",
    },
  ] as VicFallsRestaurant[],
} as const;
