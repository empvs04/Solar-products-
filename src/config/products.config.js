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
    category: "Solar Solutions",
    description: "All-in-one solar luminaires and street lighting with integrated PV panels, lithium storage, and dusk-to-dawn sensors for autonomous outdoor illumination.",
    image: "/assets/images/products/solar-lights.jpg",
    altText: "Vidhyut Saathi all-in-one solar street light with integrated solar panel",
    link: "#products-solar-lights",
    badge: "Renewable Energy"
  },
  {
    id: "led-lamps",
    name: "LED Lamps",
    category: "Commercial & Indoor",
    description: "Modern architectural linear lamps, downlights, and suspended luminaires designed for glare-free, uniform light distribution across workspaces and living areas.",
    image: "/assets/images/products/led-lamps.jpg",
    altText: "Vidhyut Saathi modern architectural linear LED lamp",
    link: "#products-led-lamps",
    badge: "Architectural Grade"
  },
  {
    id: "led-bulbs",
    name: "LED Bulbs",
    category: "Energy Saving",
    description: "High-efficacy, long-life LED bulbs engineered with robust thermal dissipation and high lumen output to ensure durable daily performance.",
    image: "/assets/images/products/led-bulbs.jpg",
    altText: "Vidhyut Saathi high-efficiency LED bulb with thermal aluminum heat sink",
    link: "#products-led-bulbs",
    badge: "High Efficiency"
  },
  {
    id: "clamp-meters",
    name: "Clamp Meters",
    category: "Electrical Testing",
    description: "Rugged digital clamp meters offering accurate AC/DC current, voltage, and continuity testing for professional electricians and maintenance teams.",
    image: "/assets/images/products/clamp-meters.jpg",
    altText: "Vidhyut Saathi professional digital clamp meter electrical testing tool",
    link: "#products-clamp-meters",
    badge: "Precision Testing"
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
