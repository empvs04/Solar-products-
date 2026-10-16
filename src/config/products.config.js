/**
 * Vidhyut Saathi - Product, Category & Brand Configuration
 * Supports 4 core categories and genuine multi-product catalogue
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

/**
 * 4 Product Categories with 4 genuine products each
 */
export const categoryGalleries = {
  "solar-lights": {
    id: "solar-lights",
    name: "Solar Lights",
    badge: "Renewable Outdoor Lighting",
    heading: "Solar Lights Collection",
    intro: "Autonomous solar illumination systems engineered for outdoor dependability, Indian weather resistance, and zero electricity costs.",
    route: "/collections/solar-lights",
    shopifyCollection: "/collections/solar-lights",
    heroImage: "/assets/images/products/solar-lights.jpg",
    products: [
      {
        id: "solar-street-light",
        name: "All-in-One Solar Street Light",
        category: "Solar Lights",
        categoryId: "solar-lights",
        badge: "Commercial Grade",
        description: "Integrated solar luminaire with monocrystalline PV panel, LiFePO4 battery storage, and dusk-to-dawn radar sensor for streets and campuses.",
        image: "/assets/images/products/solar-lights.jpg",
        shopifyAsset: "solar-lights.jpg",
        basePrice: 2499,
        availability: "In Stock - Dispatch within 24h",
        rating: "4.9 (128 Reviews)",
        variants: [
          { id: "sl-15w", name: "15W Compact Luminaire", wattage: "15W", price: 2499, originalPrice: 3200, recommended: "Residential Pathways" },
          { id: "sl-30w", name: "30W Standard Street Light", wattage: "30W", price: 3999, originalPrice: 5200, recommended: "Colonies & Campus Roads", isPopular: true },
          { id: "sl-60w", name: "60W Heavy-Duty Luminaire", wattage: "60W", price: 6499, originalPrice: 8500, recommended: "Highways & Industrial Yards" }
        ],
        specs: [
          { label: "Solar Panel", value: "High-Efficiency Monocrystalline" },
          { label: "Battery Chemistry", value: "Grade-A LiFePO4 (2000+ Cycles)" },
          { label: "LED Efficacy", value: ">150 Lumens / Watt" },
          { label: "Weather Rating", value: "IP65 All-Weather Waterproof" }
        ]
      },
      {
        id: "solar-step-deck-lights",
        name: "Solar Step & Deck Pathway Lights (Pack of 4)",
        category: "Solar Lights",
        categoryId: "solar-lights",
        badge: "Outdoor Ambience",
        description: "Weatherproof compact solar luminaires designed for staircases, perimeter fences, outdoor decks, and garden borders.",
        image: "/assets/images/products/solar-lights-1.jpg",
        shopifyAsset: "solar-lights-1.jpg",
        basePrice: 1199,
        availability: "In Stock - Multipack Ready",
        rating: "4.8 (86 Reviews)",
        variants: [
          { id: "step-4p", name: "Pack of 4 Warm White Units", wattage: "4 x Solar Cells", price: 1199, originalPrice: 1599, recommended: "Garden Steps & Patios", isPopular: true },
          { id: "step-8p", name: "Pack of 8 Value Bundle", wattage: "8 x Solar Cells", price: 2199, originalPrice: 2999, recommended: "Full Perimeter Fences" }
        ],
        specs: [
          { label: "Solar Cell", value: "Polycrystalline 2V 100mA" },
          { label: "Battery", value: "1.2V 600mAh Ni-MH Rechargeable" },
          { label: "Lighting Time", value: "8 - 10 Hours on Full Charge" },
          { label: "Ingress Protection", value: "IP65 Waterproof & Dustproof" }
        ]
      },
      {
        id: "solar-motion-security-light",
        name: "Solar Motion Sensor Security Wall Light",
        category: "Solar Lights",
        categoryId: "solar-lights",
        badge: "Remote Controlled",
        description: "Multi-segment wide-angle LED outdoor luminaire with sensitive PIR human motion sensor, wall-mount bracket, and infrared remote.",
        image: "/assets/images/products/solar-led-lamps-2.jpg",
        shopifyAsset: "solar-led-lamps-2.jpg",
        basePrice: 1599,
        availability: "In Stock - Remote Included",
        rating: "4.9 (112 Reviews)",
        variants: [
          { id: "sec-1x", name: "Single Luminaire with Remote", wattage: "40W Equiv", price: 1599, originalPrice: 2100, recommended: "Home Gate & Driveway", isPopular: true },
          { id: "sec-2x", name: "Twin Pack Security Kit", wattage: "2 x 40W Equiv", price: 2899, originalPrice: 3900, recommended: "Warehouse & Boundary" }
        ],
        specs: [
          { label: "Sensor Type", value: "PIR Motion Sensor (120° Angle)" },
          { label: "Sensing Distance", value: "5 - 8 Metres Range" },
          { label: "Operating Modes", value: "3 Modes (Sensor, Dim, Continuous)" },
          { label: "Remote Control", value: "Wireless IR Remote Included" }
        ]
      },
      {
        id: "solar-vintage-wall-lantern",
        name: "Vintage Solar Wall Lantern Sconce",
        category: "Solar Lights",
        categoryId: "solar-lights",
        badge: "Architectural Decor",
        description: "Classic outdoor carriage wall sconce featuring ambient LED filament lighting, top solar panel, and dusk-to-dawn optical switch.",
        image: "/assets/images/products/solar-led-lamps-3.jpg",
        shopifyAsset: "solar-led-lamps-3.jpg",
        basePrice: 1399,
        availability: "In Stock - Ready to Ship",
        rating: "4.7 (74 Reviews)",
        variants: [
          { id: "sconce-1x", name: "Single Wall Lantern (Warm 2700K)", wattage: "Warm Filament", price: 1399, originalPrice: 1850, recommended: "Balcony & Porch", isPopular: true },
          { id: "sconce-2x", name: "Pair of 2 Architectural Lanterns", wattage: "Dual Sconces", price: 2599, originalPrice: 3500, recommended: "Main Entrance Pillars" }
        ],
        specs: [
          { label: "Dimensions", value: "170mm (H) x 120mm (W) x 58mm (D)" },
          { label: "Light Source", value: "Warm Vintage LED Filament" },
          { label: "Sensor", value: "Dusk-to-Dawn Ambient Light Sensor" },
          { label: "Housing", value: "Weather-Resistant Polycarbonate" }
        ]
      }
    ]
  },

  "led-lamps": {
    id: "led-lamps",
    name: "LED Lamps",
    badge: "Commercial & Emergency Lighting",
    heading: "LED Lamps Collection",
    intro: "High-performance architectural luminaires, portable work lamps, and rechargeable emergency systems designed for uniform glare-free light.",
    route: "/collections/led-lamps",
    shopifyCollection: "/collections/led-lamps",
    heroImage: "/assets/images/products/led-lamps.jpg",
    products: [
      {
        id: "led-linear-architectural",
        name: "Architectural Linear Suspended LED Luminaire",
        category: "LED Lamps",
        categoryId: "led-lamps",
        badge: "Architectural Grade",
        description: "Anodized aluminum suspended luminaire and downlight providing glare-free, uniform light distribution for modern offices and homes.",
        image: "/assets/images/products/led-lamps.jpg",
        shopifyAsset: "led-lamps.jpg",
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
          { label: "Lifespan", value: "50,000 Operating Hours" }
        ]
      },
      {
        id: "portable-solar-flood-lamp",
        name: "IP66 Heavy-Duty Rechargeable Flood Work Lamp",
        category: "LED Lamps",
        categoryId: "led-lamps",
        badge: "Dual Solar & USB",
        description: "Multi-cell portable work floodlight with solar charging panel, phone power bank USB output, 180° kickstand, and IP66 casing.",
        image: "/assets/images/products/solar-led-lamps-1.jpg",
        shopifyAsset: "solar-led-lamps-1.jpg",
        basePrice: 1899,
        availability: "In Stock - Includes Cables",
        rating: "4.9 (140 Reviews)",
        variants: [
          { id: "work-50w", name: "50W High-Intensity Portable", wattage: "50W", price: 1899, originalPrice: 2499, recommended: "Electricians & Site Work", isPopular: true },
          { id: "work-100w", name: "100W Dual-Battery Workmaster", wattage: "100W", price: 2799, originalPrice: 3700, recommended: "Industrial & Outdoor Projects" }
        ],
        specs: [
          { label: "Waterproof Rating", value: "IP66 Heavy Rainproof" },
          { label: "Charging Options", value: "Solar Panel (Back) + USB 5V Input" },
          { label: "Power Bank Feature", value: "USB Output for Mobile Emergency Charging" },
          { label: "Light Modes", value: "High, Medium, Low, SOS Emergency Strobe" }
        ]
      },
      {
        id: "rechargeable-emergency-lamp-tower",
        name: "360° Multi-Tube Emergency Rechargeable Light Tower",
        category: "LED Lamps",
        categoryId: "led-lamps",
        badge: "Omni-Directional",
        description: "Four-sided 360-degree high-lumen rechargeable emergency light lantern with dual AC mains and solar charging ports.",
        image: "/assets/images/products/solar-led-lamps-4.jpg",
        shopifyAsset: "solar-led-lamps-4.jpg",
        basePrice: 1499,
        availability: "In Stock - Includes AC Cord",
        rating: "4.8 (105 Reviews)",
        variants: [
          { id: "tower-std", name: "Standard 360° Light Tower", wattage: "Multi-Tube LED", price: 1499, originalPrice: 1999, recommended: "Home Power Backup", isPopular: true },
          { id: "tower-pro", name: "Pro High-Capacity Li-Ion Tower", wattage: "High-Lumen Extended", price: 1999, originalPrice: 2600, recommended: "Farms & Continuous Commercial Use" }
        ],
        specs: [
          { label: "Beam Angle", value: "360° Full Room Illumination" },
          { label: "Dual Charging", value: "Direct AC 220V Cord + 6V Solar Input" },
          { label: "Battery", value: "High-Capacity Rechargeable Lead/Li-Ion" },
          { label: "Carry Handle", value: "Heavy-Duty Foldable Hanging Handle" }
        ]
      },
      {
        id: "solar-architectural-wall-lamp",
        name: "Solar Architectural Wall Luminaire Lamp",
        category: "LED Lamps",
        categoryId: "led-lamps",
        badge: "Accent Luminaire",
        description: "Modern architectural outdoor wall lamp with integrated solar array, clear diffusion chamber, and zero wiring installation.",
        image: "/assets/images/products/solar-led-lamps-3.jpg",
        shopifyAsset: "solar-led-lamps-3.jpg",
        basePrice: 1399,
        availability: "In Stock - Ready to Ship",
        rating: "4.7 (68 Reviews)",
        variants: [
          { id: "wal-1x", name: "Single Luminaire Unit", wattage: "Solar LED", price: 1399, originalPrice: 1800, recommended: "Balcony & Porch", isPopular: true },
          { id: "wal-2x", name: "Twin Architectural Pack", wattage: "2 x Solar LED", price: 2599, originalPrice: 3400, recommended: "Corridors & Gate Pillars" }
        ],
        specs: [
          { label: "Solar Module", value: "Monocrystalline Top Panel" },
          { label: "Diffuser", value: "Clear High-Transparency Acrylic" },
          { label: "Switch", value: "Internal Auto Dusk-to-Dawn Switch" },
          { label: "Mounting", value: "Flush Wall Mount Screws Included" }
        ]
      }
    ]
  },

  "led-bulbs": {
    id: "led-bulbs",
    name: "LED Bulbs",
    badge: "Energy Saving Solutions",
    heading: "LED Bulbs Collection",
    intro: "High-efficacy, long-life LED bulbs and specialty DC/solar lamps engineered with thermal management for consistent brightness.",
    route: "/collections/led-bulbs",
    shopifyCollection: "/collections/led-bulbs",
    heroImage: "/assets/images/products/led-bulbs.jpg",
    products: [
      {
        id: "high-efficiency-led-bulb",
        name: "High-Efficiency LED Household Bulbs (Multipack)",
        category: "LED Bulbs",
        categoryId: "led-bulbs",
        badge: "B22 Household Standard",
        description: "Heavy-gauge aluminum heat-sink LED bulbs with wide-spread frosted diffusers and surge-protected drivers for everyday reliability.",
        image: "/assets/images/products/led-bulbs.jpg",
        shopifyAsset: "led-bulbs.jpg",
        basePrice: 449,
        availability: "In Stock - Multipack Ready",
        rating: "4.9 (240 Reviews)",
        variants: [
          { id: "lb-9w-4p", name: "9W Cool Day (B22 Base) — Pack of 4", wattage: "9W x 4", price: 449, originalPrice: 650, recommended: "Everyday Household Use", isPopular: true },
          { id: "lb-12w-4p", name: "12W Bright White (B22 Base) — Pack of 4", wattage: "12W x 4", price: 599, originalPrice: 850, recommended: "Kitchens & Large Rooms" },
          { id: "lb-18w-2p", name: "18W High-Lumen Master — Pack of 2", wattage: "18W x 2", price: 499, originalPrice: 700, recommended: "Commercial Showrooms & Garages" }
        ],
        specs: [
          { label: "Base Cap", value: "Standard B22 Pin (Standard Indian Base)" },
          { label: "Luminous Efficacy", value: "> 105 Lumens / Watt" },
          { label: "Voltage Range", value: "140V - 285V AC (Surge Protected)" },
          { label: "Lifespan", value: "25,000 Rated Operating Hours" }
        ]
      },
      {
        id: "solar-hanging-filament-bulb",
        name: "Solar Hanging Filament Camping LED Bulb",
        category: "LED Bulbs",
        categoryId: "led-bulbs",
        badge: "Portable Solar Clip",
        description: "Portable hanging bulb with vintage amber filament, integrated mini solar cell, top carabiner clip, and USB rechargeable battery.",
        image: "/assets/images/products/led-bulb-1.jpg",
        shopifyAsset: "led-bulb-1.jpg",
        basePrice: 699,
        availability: "In Stock - Clip Included",
        rating: "4.8 (92 Reviews)",
        variants: [
          { id: "sh-1b", name: "Single Hanging Bulb with Clip", wattage: "Solar LED Filament", price: 699, originalPrice: 950, recommended: "Camping & Balcony Hook", isPopular: true },
          { id: "sh-2b", name: "Twin Adventure Pack", wattage: "2 x Solar Filament Bulbs", price: 1299, originalPrice: 1800, recommended: "Tents & Garden Patios" }
        ],
        specs: [
          { label: "Solar Module", value: "Integrated Micro PV Strip" },
          { label: "Hanging Fixture", value: "Carabiner Clip with Security Latch" },
          { label: "Battery", value: "Rechargeable Lithium Battery" },
          { label: "Light Tone", value: "Warm Golden Filament Glow (2400K)" }
        ]
      },
      {
        id: "dc-12v-battery-clip-bulb",
        name: "12V DC Emergency Hanging Bulb with Battery Clips",
        category: "LED Bulbs",
        categoryId: "led-bulbs",
        badge: "Direct 12V Battery Ready",
        description: "Heavy-duty 12-Volt DC LED bulb with pre-wired insulated cable and alligator clamps for direct connection to solar battery banks.",
        image: "/assets/images/products/led-bulb-2.jpg",
        shopifyAsset: "led-bulb-2.jpg",
        basePrice: 349,
        availability: "In Stock - Includes Leads",
        rating: "4.9 (165 Reviews)",
        variants: [
          { id: "dc-7w", name: "7W 12V DC Bulb with Clips", wattage: "7W DC", price: 349, originalPrice: 480, recommended: "Solar Home Inverters" },
          { id: "dc-12w", name: "12W 12V DC High-Output Bulb", wattage: "12W DC", price: 449, originalPrice: 600, recommended: "Farmhouses & Night Stalls", isPopular: true },
          { id: "dc-3pk", name: "3-Piece Multi-Room 12V DC Bundle", wattage: "3 x 12W DC", price: 999, originalPrice: 1500, recommended: "Complete Solar Kit Setup" }
        ],
        specs: [
          { label: "Operating Voltage", value: "12V DC Constant" },
          { label: "Connection", value: "Heavy-Duty Red/Black Alligator Clips" },
          { label: "Cable Length", value: "1.5 Metre Copper Insulated Lead" },
          { label: "Hanger", value: "Integrated Top Swivel Hanging Hook" }
        ]
      },
      {
        id: "solar-crystal-globe-string-bulbs",
        name: "Solar Crystal Bubble Globe Festoon String Bulbs",
        category: "LED Bulbs",
        categoryId: "led-bulbs",
        badge: "Outdoor Festoon Chain",
        description: "Decorative outdoor crystal bubble globe string lights with high-efficiency ground-spike solar panel and 8 lighting modes.",
        image: "/assets/images/products/led-bulb-4.jpg",
        shopifyAsset: "led-bulb-4.jpg",
        basePrice: 899,
        availability: "In Stock - Spike Included",
        rating: "4.8 (118 Reviews)",
        variants: [
          { id: "fest-5m", name: "20-Bulb 5-Metre String (Warm Glow)", wattage: "20 Crystal Globes", price: 899, originalPrice: 1250, recommended: "Balconies & Gazebos", isPopular: true },
          { id: "fest-10m", name: "50-Bulb 10-Metre Deluxe String", wattage: "50 Crystal Globes", price: 1499, originalPrice: 2100, recommended: "Gardens, Trees & Events" }
        ],
        specs: [
          { label: "Globe Design", value: "Crystal Bubble Impact-Proof Acrylic" },
          { label: "Solar Spike", value: "Adjustable Angle Monocrystalline Unit" },
          { label: "Lighting Modes", value: "8 Modes (Waves, Chasing, Steady, etc.)" },
          { label: "Weatherproofing", value: "IP65 Outdoor Waterproof" }
        ]
      }
    ]
  },

  "clamp-meters": {
    id: "clamp-meters",
    name: "Clamp Meters",
    badge: "Precision Electrical Testing",
    heading: "Digital Clamp Meters Collection",
    intro: "Rugged digital clamp multimeters and current testers offering True-RMS accuracy, CAT III safety ratings, and reliable field diagnostics.",
    route: "/collections/clamp-meters",
    shopifyCollection: "/collections/clamp-meters",
    heroImage: "/assets/images/products/clamp-meters.jpg",
    products: [
      {
        id: "meco-27-auto-clamp-meter",
        name: "MECO 27-AUTO Digital Clamp Meter (400A AC)",
        category: "Clamp Meters",
        categoryId: "clamp-meters",
        badge: "400A AC Auto-Ranging",
        description: "Compact auto-ranging digital clamp meter with non-contact voltage (NCV) detection, data hold, audible continuity, and CAT III 600V safety.",
        image: "/assets/images/products/clamp-meter-1.jpg",
        shopifyAsset: "clamp-meter-1.jpg",
        basePrice: 1599,
        availability: "In Stock - Includes Test Leads",
        rating: "4.9 (135 Reviews)",
        variants: [
          { id: "meco-std", name: "Standard Kit with Test Leads", wattage: "400A AC", price: 1599, originalPrice: 2100, recommended: "Electricians & Technicians", isPopular: true },
          { id: "meco-cal", name: "Calibration Certified Pro Kit", wattage: "400A AC Calibrated", price: 2099, originalPrice: 2700, recommended: "Commercial Contractors" }
        ],
        specs: [
          { label: "Current Range", value: "2A / 20A / 200A / 400A AC Auto" },
          { label: "Safety Rating", value: "CAT III 600V Overvoltage Protection" },
          { label: "Special Feature", value: "Non-Contact Voltage (NCV) Sensor" },
          { label: "Display", value: "3¾ Digit LCD with Max Display 4000" }
        ]
      },
      {
        id: "themisto-th-m88-clamp-meter",
        name: "Themisto TH-M88 True RMS Digital Clamp Multimeter",
        category: "Clamp Meters",
        categoryId: "clamp-meters",
        badge: "True RMS with Zip Case",
        description: "4000-count True RMS digital clamp multimeter complete with thermocouple temperature probe, zipper carry pouch, and heavy-duty leads.",
        image: "/assets/images/products/clamp-meter-2.jpg",
        shopifyAsset: "clamp-meter-2.jpg",
        basePrice: 1899,
        availability: "In Stock - Complete Case Kit",
        rating: "4.9 (172 Reviews)",
        variants: [
          { id: "them-kit", name: "Complete Kit with Pouch & Thermocouple", wattage: "True RMS 400A", price: 1899, originalPrice: 2500, recommended: "HVAC & Solar Technicians", isPopular: true }
        ],
        specs: [
          { label: "Measurement", value: "True RMS AC Current, AC/DC Voltage, Resistance, Capacitance" },
          { label: "Temperature Probe", value: "-20°C to 1000°C K-Type Thermocouple" },
          { label: "Display", value: "4000 Counts Backlit LCD with Flashlight" },
          { label: "Included", value: "Zipper Storage Case, Test Probes, Manual" }
        ]
      },
      {
        id: "dt87-pocket-clamp-meter",
        name: "DT-87 Handheld Pocket Digital Clamp Meter",
        category: "Clamp Meters",
        categoryId: "clamp-meters",
        badge: "Compact Handheld",
        description: "Lightweight ergonomic pocket clamp meter for quick AC current measurements, continuity tests, and domestic electrical maintenance.",
        image: "/assets/images/products/clamp-meter-3.jpg",
        shopifyAsset: "clamp-meter-3.jpg",
        basePrice: 999,
        availability: "In Stock - Includes Test Probes",
        rating: "4.7 (89 Reviews)",
        variants: [
          { id: "dt87-std", name: "Handheld Tester with Test Leads", wattage: "400A AC Handheld", price: 999, originalPrice: 1350, recommended: "Home & DIY Electrical Testing", isPopular: true }
        ],
        specs: [
          { label: "Current Range", value: "20A / 200A / 400A AC" },
          { label: "Voltage Range", value: "AC 450V / DC 600V" },
          { label: "Data Hold", value: "One-Click Data Freeze Button" },
          { label: "Safety", value: "CAT II 600V Protection" }
        ]
      },
      {
        id: "sigma-sg-997-clamp-meter",
        name: "SIGMA SG 997 True RMS Auto-Ranging Clamp Multimeter",
        category: "Clamp Meters",
        categoryId: "clamp-meters",
        badge: "Dual Display True RMS",
        description: "Industrial auto-ranging clamp meter with large backlit digital display, temperature measurement, NCV detector, and MAX 600V rating.",
        image: "/assets/images/products/clamp-meter-4.jpg",
        shopifyAsset: "clamp-meter-4.jpg",
        basePrice: 2499,
        availability: "In Stock - Pro Certified",
        rating: "4.9 (115 Reviews)",
        variants: [
          { id: "sg997-pro", name: "SG-997 Pro True RMS Multimeter", wattage: "600A AC/DC True RMS", price: 2499, originalPrice: 3400, recommended: "Industrial Electricians", isPopular: true },
          { id: "sg997-dlx", name: "Deluxe Kit with Calibration Certificate", wattage: "Certified Calibrated", price: 2999, originalPrice: 3999, recommended: "Substations & Plant Maintenance" }
        ],
        specs: [
          { label: "Measurement", value: "True RMS AC/DC Current, Frequency, Temp" },
          { label: "Display", value: "High-Contrast Backlit Digital Screen" },
          { label: "NCV Alert", value: "Audio-Visual High-Voltage Indicator" },
          { label: "Housing", value: "Double-Insulated Anti-Shock Enclosure" }
        ]
      }
    ]
  }
};

/**
 * Flat array of all products across all categories,
 * PLUS category-level alias keys so that links like `?product=solar-lights`
 * continue to seamlessly resolve to the flagship product!
 */
export const productsConfig = [
  // Solar Lights Flagship (Category Alias)
  {
    ...categoryGalleries["solar-lights"].products[0],
    id: "solar-lights",
    name: "Solar Lights",
    fullName: "Solar Street Lights — All-in-One Outdoor Luminaire",
    description: "All-in-one solar luminaires and street lighting with integrated PV panels, lithium storage, and dusk-to-dawn sensors for autonomous outdoor illumination."
  },
  // LED Lamps Flagship (Category Alias)
  {
    ...categoryGalleries["led-lamps"].products[0],
    id: "led-lamps",
    name: "LED Lamps",
    fullName: "Smart Architectural LED Lamps & Suspended Luminaires",
    description: "Modern architectural linear lamps, downlights, and suspended luminaires designed for glare-free, uniform light distribution across workspaces and living areas."
  },
  // LED Bulbs Flagship (Category Alias)
  {
    ...categoryGalleries["led-bulbs"].products[0],
    id: "led-bulbs",
    name: "LED Bulbs",
    fullName: "High-Efficiency LED Bulbs (Multipack Value Editions)",
    description: "High-efficacy, long-life LED bulbs engineered with robust thermal dissipation and high lumen output to ensure durable daily performance."
  },
  // Clamp Meters Flagship (Category Alias)
  {
    ...categoryGalleries["clamp-meters"].products[0],
    id: "clamp-meters",
    name: "Clamp Meters",
    fullName: "Precision Digital Clamp Meter & Electrical Multimeter",
    description: "Rugged digital clamp meters offering accurate AC/DC current, voltage, and continuity testing for professional electricians and maintenance teams."
  },
  // All specific products
  ...categoryGalleries["solar-lights"].products,
  ...categoryGalleries["led-lamps"].products,
  ...categoryGalleries["led-bulbs"].products,
  ...categoryGalleries["clamp-meters"].products
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
