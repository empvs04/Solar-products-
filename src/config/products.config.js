/**
 * Vidhyut Saathi - Product & Brand Configuration
 */

export const brandConfig = {
  name: "Vidhyut Saathi",
  tagline: "Powering a Brighter Tomorrow",
  description: "Vidhyut Saathi is an Indian electrical and solar products brand committed to dependable solar lighting, energy-efficient luminaires, and precision measurement equipment for homes, commercial establishments, and business partners.",
  contact: {
    headquarters: "SCO-77A, 3rd Floor, Ashoka Complex, Delhi Road, Rohtak - 124001, Haryana, India",
    email: "info@vidhyutsaathi.com",
    phones: ["+91-8199036060", "+91-9053110707"],
    operatingHours: "Mon - Sat: 9:30 AM - 6:30 PM IST"
  }
};

export const productsConfig = [
  {
    id: "solar-lights",
    name: "Solar Lights",
    fullName: "Solar Street Lights — All-in-One Outdoor Luminaire",
    category: "Solar Solutions",
    badge: "Renewable Energy",
    description: "All-in-one solar luminaires and street lighting with integrated PV panels, lithium storage, and dusk-to-dawn sensors for autonomous outdoor illumination.",
    fullDescription: "Vidhyut Saathi All-in-One Solar Street Lights combine high-efficiency monocrystalline solar panels, Grade-A LiFePO4 lithium batteries, high-lumen Bridgelux LED arrays, and an intelligent MPPT charge controller in a durable weather-proof housing. Engineered for Indian climate extremes, providing dependable dusk-to-dawn illumination for roads, gated communities, farms, and industrial perimeters.",
    image: "/assets/images/products/solar-lights.jpg",
    altText: "Vidhyut Saathi all-in-one solar street light with integrated solar panel",
    link: "/buy-now.html?product=solar-lights",
    shopifyHandle: "solar-street-lights",
    basePrice: 2499,
    availability: "In Stock - Dispatch within 24h",
    rating: "4.9 (128 Reviews)",
    variants: [
      { id: "sl-15w", name: "15W Compact Luminaire", wattage: "15W", price: 2499, originalPrice: 3200, recommended: "Residential & Pathways" },
      { id: "sl-30w", name: "30W Standard Street Light", wattage: "30W", price: 3999, originalPrice: 5200, recommended: "Colonies & Campus Roads", isPopular: true },
      { id: "sl-60w", name: "60W Heavy-Duty Luminaire", wattage: "60W", price: 6499, originalPrice: 8500, recommended: "Highways & Industrial Yards" }
    ],
    specs: [
      { label: "Solar Panel", value: "High-Efficiency Monocrystalline" },
      { label: "Battery Chemistry", value: "Grade-A LiFePO4 (2000+ Cycles)" },
      { label: "LED Efficacy", value: ">150 Lumens / Watt" },
      { label: "Weather Rating", value: "IP65 All-Weather Waterproof" },
      { label: "Autonomy", value: "2 - 3 Rainy Days Backup" },
      { label: "Sensor", value: "Smart Dusk-to-Dawn Radar Sensor" }
    ],
    features: [
      "Zero Electricity Cost — 100% solar powered operation",
      "Automatic Dusk-to-Dawn Radar motion sensing",
      "Corrosion-resistant aluminum alloy housing",
      "Easy pole or wall mounting without external cabling"
    ]
  },
  {
    id: "led-lamps",
    name: "LED Lamps",
    fullName: "Smart Architectural LED Lamps & Suspended Luminaires",
    category: "Commercial & Indoor",
    badge: "Architectural Grade",
    description: "Modern architectural linear lamps, downlights, and suspended luminaires designed for glare-free, uniform light distribution across workspaces and living areas.",
    fullDescription: "Engineered for optimal brightness, visual comfort, and architectural elegance. Vidhyut Saathi LED Lamps incorporate premium polycarbonate diffusers, high-CRI LEDs, and isolated flicker-free drivers to eliminate eye strain across corporate offices, retail spaces, educational institutions, and modern homes.",
    image: "/assets/images/products/led-lamps.jpg",
    altText: "Vidhyut Saathi modern architectural linear LED lamp",
    link: "/buy-now.html?product=led-lamps",
    shopifyHandle: "architectural-led-lamps",
    basePrice: 1299,
    availability: "In Stock - Dispatch within 24h",
    rating: "4.8 (94 Reviews)",
    variants: [
      { id: "ll-20w", name: "20W Linear Luminaire (Warm 3000K)", wattage: "20W", price: 1299, originalPrice: 1750, recommended: "Living Rooms & Hospitality" },
      { id: "ll-36w", name: "36W Downlight Panel (Neutral 4000K)", wattage: "36W", price: 1899, originalPrice: 2500, recommended: "Offices & Retail Spaces", isPopular: true },
      { id: "ll-48w", name: "48W Commercial Suspended (Cool 6500K)", wattage: "48W", price: 2499, originalPrice: 3300, recommended: "Conference Rooms & Halls" }
    ],
    specs: [
      { label: "Color Rendering (CRI)", value: "Ra > 85 for True Color Accuracy" },
      { label: "Power Factor", value: "> 0.95 High Power Factor" },
      { label: "Operating Voltage", value: "120V - 280V AC Surge Protected" },
      { label: "Housing Material", value: "Anodized Extruded Aluminum" },
      { label: "Driver Type", value: "Isolated Constant Current Driver" },
      { label: "Rated Lifespan", value: "50,000 Operating Hours" }
    ],
    features: [
      "Glare-free optical diffusion for fatigue-free viewing",
      "Isolated constant current driver with 4kV surge withstand",
      "Slim architectural form factor with ceiling suspension kit",
      "Up to 60% energy savings over standard fluorescent tubes"
    ]
  },
  {
    id: "led-bulbs",
    name: "LED Bulbs",
    fullName: "High-Efficiency LED Bulbs (Multipack Value Editions)",
    category: "Energy Saving",
    badge: "High Efficiency",
    description: "High-efficacy, long-life LED bulbs engineered with robust thermal dissipation and high lumen output to ensure durable daily performance.",
    fullDescription: "Vidhyut Saathi LED Bulbs deliver maximum lumens with minimum wattage consumption. Fitted with heavy-gauge aluminum heat sinks and wide-angle frosted diffusers, they provide consistent, shadow-free illumination while drastically reducing household and commercial electricity bills.",
    image: "/assets/images/products/led-bulbs.jpg",
    altText: "Vidhyut Saathi high-efficiency LED bulb with thermal aluminum heat sink",
    link: "/buy-now.html?product=led-bulbs",
    shopifyHandle: "high-efficiency-led-bulbs",
    basePrice: 449,
    availability: "In Stock - Multipack Ready to Ship",
    rating: "4.9 (240 Reviews)",
    variants: [
      { id: "lb-9w-4p", name: "9W Cool Day (B22 Base) — Pack of 4", wattage: "9W x 4", price: 449, originalPrice: 650, recommended: "Everyday Household Use", isPopular: true },
      { id: "lb-12w-4p", name: "12W Bright White (B22 Base) — Pack of 4", wattage: "12W x 4", price: 599, originalPrice: 850, recommended: "Kitchens & Large Rooms" },
      { id: "lb-18w-2p", name: "18W High-Lumen Master — Pack of 2", wattage: "18W x 2", price: 499, originalPrice: 700, recommended: "Commercial Showrooms & Garages" }
    ],
    specs: [
      { label: "Base Cap", value: "Standard B22 Pin (Standard Indian Base)" },
      { label: "Luminous Efficacy", value: "> 105 Lumens / Watt" },
      { label: "Voltage Range", value: "140V - 285V AC (Wide Range)" },
      { label: "Beam Angle", value: "220° Wide Angle Spread" },
      { label: "Thermal Management", value: "Aluminum Core Heat Sink" },
      { label: "Lifespan", value: "25,000 Hours (Rated)" }
    ],
    features: [
      "Instant turn-on with zero flicker and full brightness",
      "Engineered thermal dissipation to prevent luminous decay",
      "Surge protected against frequent Indian grid fluctuations",
      "Eco-friendly construction: No mercury, zero UV emissions"
    ]
  },
  {
    id: "clamp-meters",
    name: "Clamp Meters",
    fullName: "Precision Digital Clamp Meter & Electrical Multimeter",
    category: "Electrical Testing",
    badge: "Precision Testing",
    description: "Rugged digital clamp meters offering accurate AC/DC current, voltage, and continuity testing for professional electricians and maintenance teams.",
    fullDescription: "Designed for industrial electricians, solar plant technicians, and HVAC engineers. Vidhyut Saathi Digital Clamp Meters deliver True-RMS accuracy, non-contact AC voltage detection (NCV), low-impedance testing, and overload protection in an impact-resistant ergonomic casing.",
    image: "/assets/images/products/clamp-meters.jpg",
    altText: "Vidhyut Saathi professional digital clamp meter electrical testing tool",
    link: "/buy-now.html?product=clamp-meters",
    shopifyHandle: "precision-digital-clamp-meters",
    basePrice: 1699,
    availability: "In Stock - Includes Test Leads & Case",
    rating: "4.9 (185 Reviews)",
    variants: [
      { id: "cm-400a", name: "VS-CM400 True RMS AC Clamp (400A / 600V)", wattage: "400A AC", price: 1699, originalPrice: 2200, recommended: "Electricians & Home Testing", isPopular: true },
      { id: "cm-600a", name: "VS-CM600 AC/DC Digital Clamp (600A / 1000V)", wattage: "600A AC/DC", price: 2499, originalPrice: 3400, recommended: "Solar Installers & Inverters" },
      { id: "cm-1000a", name: "VS-CM1000 Industrial Heavy Duty (1000A True RMS)", wattage: "1000A AC/DC", price: 3899, originalPrice: 5100, recommended: "Industrial Plants & Sub-stations" }
    ],
    specs: [
      { label: "Jaw Opening", value: "30mm Large Conductive Jaw" },
      { label: "Display", value: "6000 Counts Backlit LCD Display" },
      { label: "Measurement", value: "True RMS Current, Voltage, Resistance" },
      { label: "Special Functions", value: "NCV Sensor, Diode, Continuity Beeper" },
      { label: "Safety Rating", value: "CAT III 600V / CAT II 1000V" },
      { label: "Included Accessories", value: "Heavy-duty Test Leads, Carry Case, Batteries" }
    ],
    features: [
      "True RMS measurement ensures accurate readings on noisy loads",
      "Non-contact voltage detection (NCV) with audio-visual alerts",
      "Ergonomic one-hand operation with data hold and auto-ranging",
      "Heavy-duty double-insulated housing with drop protection"
    ]
  }
];

export const whyChooseConfig = [
  {
    id: "product-solutions",
    title: "Product-Focused Solutions",
    description: "Engineered around everyday practical requirements, offering reliable electrical and solar gear that performs consistently in Indian conditions.",
    icon: "layers"
  },
  {
    id: "solar-options",
    title: "Solar Lighting Options",
    description: "Standalone outdoor solar lighting systems built to harvest maximum solar power with weather-resistant housings and intelligent power management.",
    icon: "sun"
  },
  {
    id: "electrical-range",
    title: "Electrical Product Range",
    description: "A diverse portfolio spanning architectural lamps, domestic LED bulbs, and industrial-grade digital clamp meters for multifaceted applications.",
    icon: "zap"
  },
  {
    id: "partner-support",
    title: "Support for Business Partners",
    description: "Dedicated assistance, commercial guidance, and structured distributorship programs to help regional partners expand their reach and grow.",
    icon: "users"
  }
];
