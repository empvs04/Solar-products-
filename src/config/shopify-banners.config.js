/**
 * Vidhyut Saathi - Shopify Banners Configuration Layer
 * 
 * Supports:
 * - Exactly four configurable banner slides
 * - Separate desktop and mobile banner images (Shopify CDN URLs or local paths)
 * - Responsive picture elements to avoid distortion or mobile cropping
 */

export const shopifyBannersConfig = {
  // Global carousel settings (configurable in Shopify Theme settings)
  autoplay: true,
  autoplayIntervalMs: 5500,
  pauseOnHover: true,
  swipeThresholdPx: 40,

  // Exactly four configurable visual banner slides
  slides: [
    {
      id: "slide-1",
      title: "",
      subtitle: "",
      ctaText: "",
      ctaLink: "",
      ctaSecondaryText: "",
      ctaSecondaryLink: "",
      altText: "Vidhyut Saathi modern solar street lights illuminating an urban avenue at dusk",
      desktopImage: "/assets/images/banners/banner-solar-lights.jpg",
      mobileImage: "/assets/images/banners/banner-solar-lights-mobile.jpg",
      badge: ""
    },
    {
      id: "slide-2",
      title: "",
      subtitle: "",
      ctaText: "",
      ctaLink: "",
      ctaSecondaryText: "",
      ctaSecondaryLink: "",
      altText: "Modern architectural LED suspended luminaire lamps in a commercial corporate building",
      desktopImage: "/assets/images/banners/banner-led-lamps.jpg",
      mobileImage: "/assets/images/banners/banner-led-lamps-mobile.jpg",
      badge: ""
    },
    {
      id: "slide-3",
      title: "",
      subtitle: "",
      ctaText: "",
      ctaLink: "",
      ctaSecondaryText: "",
      ctaSecondaryLink: "",
      altText: "Premium glowing warm LED bulbs in contemporary lighting fixtures",
      desktopImage: "/assets/images/banners/banner-led-bulbs.jpg",
      mobileImage: "/assets/images/banners/banner-led-bulbs-mobile.jpg",
      badge: ""
    },
    {
      id: "slide-4",
      title: "",
      subtitle: "",
      ctaText: "",
      ctaLink: "",
      ctaSecondaryText: "",
      ctaSecondaryLink: "",
      altText: "Electrical technician using a digital clamp meter to test industrial distribution panels",
      desktopImage: "/assets/images/banners/banner-clamp-meters.jpg",
      mobileImage: "/assets/images/banners/banner-clamp-meters-mobile.jpg",
      badge: ""
    }
  ]
};
