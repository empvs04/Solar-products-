/**
 * Vidhyut Saathi - Shopify Banners Configuration Layer
 * 
 * In a standalone frontend, this configuration layer represents the editable
 * settings that would be managed via the Shopify Theme Editor.
 * 
 * Supports:
 * - Exactly four configurable banner slides
 * - Separate desktop and mobile banner images (Shopify CDN URLs or local paths)
 * - Editable headings, supporting text, CTA label, CTA link, and accessible alt text
 * - Responsive picture elements to avoid distortion or mobile cropping
 */

export const shopifyBannersConfig = {
  // Global carousel settings (configurable in Shopify Theme settings)
  autoplay: true,
  autoplayIntervalMs: 5500,
  pauseOnHover: true,
  swipeThresholdPx: 40,

  // Exactly four configurable slides matching the product lines
  slides: [
    {
      id: "slide-1",
      title: "Solar Lighting Solutions",
      subtitle: "Harness clean energy with durable, high-efficiency solar street & outdoor lighting systems.",
      ctaText: "Explore Solar Lights",
      ctaLink: "#products",
      ctaSecondaryText: "Contact Us",
      ctaSecondaryLink: "#contact",
      altText: "Vidhyut Saathi modern solar street lights illuminating an urban avenue at dusk",
      // Desktop: 16:9 banner | Mobile: 3:4 portrait banner
      desktopImage: "/assets/images/banners/banner-solar-lights.jpg",
      mobileImage: "/assets/images/banners/banner-solar-lights-mobile.jpg",
      badge: "Clean Solar Energy"
    },
    {
      id: "slide-2",
      title: "Smart LED Luminaires & Lamps",
      subtitle: "Engineered for optimal brightness, architectural elegance, and commercial reliability.",
      ctaText: "Discover LED Lamps",
      ctaLink: "#products",
      ctaSecondaryText: "Buy Distributorship",
      ctaSecondaryLink: "/buy-distributorship.html",
      altText: "Modern architectural LED suspended luminaire lamps in a commercial corporate building",
      desktopImage: "/assets/images/banners/banner-led-lamps.jpg",
      mobileImage: "/assets/images/banners/banner-led-lamps-mobile.jpg",
      badge: "Commercial & Retail"
    },
    {
      id: "slide-3",
      title: "High-Efficiency LED Bulbs",
      subtitle: "Superior luminous output with advanced thermal dissipation for household & commercial savings.",
      ctaText: "View LED Bulbs",
      ctaLink: "#products",
      ctaSecondaryText: "Buy Now",
      ctaSecondaryLink: "/buy-now.html",
      altText: "Premium glowing warm LED bulbs in contemporary lighting fixtures",
      desktopImage: "/assets/images/banners/banner-led-bulbs.jpg",
      mobileImage: "/assets/images/banners/banner-led-bulbs-mobile.jpg",
      badge: "Maximum Energy Savings"
    },
    {
      id: "slide-4",
      title: "Precision Digital Clamp Meters",
      subtitle: "Accurate, dependable electrical testing and measurement tools for engineers and technicians.",
      ctaText: "Explore Clamp Meters",
      ctaLink: "#products",
      ctaSecondaryText: "Partner With Us",
      ctaSecondaryLink: "/buy-distributorship.html",
      altText: "Electrical technician using a digital clamp meter to test industrial distribution panels",
      desktopImage: "/assets/images/banners/banner-clamp-meters.jpg",
      mobileImage: "/assets/images/banners/banner-clamp-meters-mobile.jpg",
      badge: "Industrial Testing"
    }
  ]
};
