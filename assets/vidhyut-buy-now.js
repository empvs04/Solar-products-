/**
 * Vidhyut Saathi - Shopify Theme Buy Now Page Controller
 */
(function() {
  var productsData = [
    // --- Solar Lights Category ---
    {
      id: "solar-lights",
      categoryId: "solar-lights",
      name: "Solar Lights",
      fullName: "Solar Street Lights — All-in-One Outdoor Luminaire",
      category: "Solar Solutions",
      badge: "Renewable Energy",
      description: "All-in-one solar luminaires and street lighting with integrated PV panels, lithium storage, and dusk-to-dawn sensors for autonomous outdoor illumination.",
      fullDescription: "Vidhyut Saathi All-in-One Solar Street Lights combine high-efficiency monocrystalline solar panels, Grade-A LiFePO4 lithium batteries, high-lumen Bridgelux LED arrays, and an intelligent MPPT charge controller in a durable weather-proof housing. Engineered for Indian climate extremes, providing dependable dusk-to-dawn illumination for roads, gated communities, farms, and industrial perimeters.",
      image: "solar-lights.jpg",
      basePrice: 2499,
      availability: "In Stock - Dispatch within 24h",
      variants: [
        { id: "sl-15w", name: "15W Compact Luminaire", wattage: "15W", price: 2499, originalPrice: 3200, recommended: "Residential & Pathways" },
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
      id: "solar-street-light",
      categoryId: "solar-lights",
      name: "All-in-One Solar Street Light",
      fullName: "All-in-One Solar Street Light — Integrated Luminaire",
      category: "Solar Solutions",
      badge: "Commercial Grade",
      description: "Integrated solar luminaire with monocrystalline PV panel, LiFePO4 battery storage, and dusk-to-dawn radar sensor for streets and campuses.",
      fullDescription: "Commercial-grade solar street luminaire designed for continuous dusk-to-dawn illumination of roadways, gated communities, and industrial premises. Integrated monocrystalline panel and LiFePO4 battery eliminate trenching and external wiring.",
      image: "solar-lights.jpg",
      basePrice: 2499,
      availability: "In Stock - Dispatch within 24h",
      variants: [
        { id: "sl-15w", name: "15W Compact Luminaire", wattage: "15W", price: 2499, originalPrice: 3200, recommended: "Pathways & Parks" },
        { id: "sl-30w", name: "30W Standard Street Light", wattage: "30W", price: 3999, originalPrice: 5200, recommended: "Colonies & Roads", isPopular: true },
        { id: "sl-60w", name: "60W Heavy-Duty Luminaire", wattage: "60W", price: 6499, originalPrice: 8500, recommended: "Highways & Yards" }
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
      categoryId: "solar-lights",
      name: "Solar Step & Deck Pathway Lights (Pack of 4)",
      fullName: "Solar Step & Deck Pathway Lights — 4-Piece Ambient Kit",
      category: "Solar Solutions",
      badge: "Outdoor Ambience",
      description: "Weatherproof compact solar luminaires designed for staircases, perimeter fences, outdoor decks, and garden borders.",
      fullDescription: "Compact outdoor step and deck lights fitted with high-efficiency polycrystalline solar cells and rechargeable Ni-MH batteries. Provides gentle warm illumination to highlight outdoor stairways and perimeter fences automatically at night.",
      image: "solar-lights-1.jpg",
      basePrice: 1199,
      availability: "In Stock - Multipack Ready",
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
      categoryId: "solar-lights",
      name: "Solar Motion Sensor Security Wall Light",
      fullName: "Solar Motion Sensor Security Wall Light with Infrared Remote",
      category: "Solar Solutions",
      badge: "Remote Controlled",
      description: "Multi-segment wide-angle LED outdoor luminaire with sensitive PIR human motion sensor, wall-mount bracket, and infrared remote.",
      fullDescription: "Autonomous solar security floodlight with multi-angle LED matrix and high-sensitivity PIR sensor. Features 3 operating modes including motion boost and continuous dim ambient night lighting with IR remote control.",
      image: "solar-led-lamps-2.jpg",
      basePrice: 1599,
      availability: "In Stock - Remote Included",
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
      categoryId: "solar-lights",
      name: "Vintage Solar Wall Lantern Sconce",
      fullName: "Vintage Outdoor Solar Wall Lantern Sconce with Filament LED",
      category: "Solar Solutions",
      badge: "Architectural Decor",
      description: "Classic outdoor carriage wall sconce featuring ambient LED filament lighting, top solar panel, and dusk-to-dawn optical switch.",
      fullDescription: "Combines timeless heritage aesthetics with zero-electricity solar efficiency. Features clear weatherproof walls, an amber LED filament, and an integrated top solar panel with dusk-to-dawn automation.",
      image: "solar-led-lamps-3.jpg",
      basePrice: 1399,
      availability: "In Stock - Ready to Ship",
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
    },

    // --- LED Lamps Category ---
    {
      id: "led-lamps",
      categoryId: "led-lamps",
      name: "LED Lamps",
      fullName: "Smart Architectural LED Lamps & Suspended Luminaires",
      category: "Commercial & Indoor",
      badge: "Architectural Grade",
      description: "Modern architectural linear lamps, downlights, and suspended luminaires designed for glare-free, uniform light distribution across workspaces and living areas.",
      fullDescription: "Engineered for optimal brightness, visual comfort, and architectural elegance. Vidhyut Saathi LED Lamps incorporate premium polycarbonate diffusers, high-CRI LEDs, and isolated flicker-free drivers to eliminate eye strain across corporate offices, retail spaces, educational institutions, and modern homes.",
      image: "led-lamps.jpg",
      basePrice: 1299,
      availability: "In Stock - Dispatch within 24h",
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
      id: "led-linear-architectural",
      categoryId: "led-lamps",
      name: "Architectural Linear Suspended LED Luminaire",
      fullName: "Architectural Linear Suspended LED Luminaire & Downlight",
      category: "Commercial & Indoor",
      badge: "Architectural Grade",
      description: "Anodized aluminum suspended luminaire and downlight providing glare-free, uniform light distribution for modern offices and homes.",
      fullDescription: "Precision extruded aluminum linear luminaire with high-efficacy SMD LED boards and isolated flicker-free driver for fatigue-free commercial and residential illumination.",
      image: "led-lamps.jpg",
      basePrice: 1299,
      availability: "In Stock - Dispatch within 24h",
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
      categoryId: "led-lamps",
      name: "IP66 Heavy-Duty Rechargeable Flood Work Lamp",
      fullName: "IP66 Heavy-Duty Portable Rechargeable LED Flood Work Lamp",
      category: "Commercial & Indoor",
      badge: "Dual Solar & USB",
      description: "Multi-cell portable work floodlight with solar charging panel, phone power bank USB output, 180° kickstand, and IP66 casing.",
      fullDescription: "Rugged multi-quadrant LED flood work lamp built for construction sites, electricians, vehicle repair, and outdoor events. Features dual solar and USB charging, power bank output for mobile phones, and 4 brightness modes.",
      image: "solar-led-lamps-1.jpg",
      basePrice: 1899,
      availability: "In Stock - Includes Cables",
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
      categoryId: "led-lamps",
      name: "360° Multi-Tube Emergency Rechargeable Light Tower",
      fullName: "360° Multi-Tube Emergency Rechargeable Light Tower & Lantern",
      category: "Commercial & Indoor",
      badge: "Omni-Directional",
      description: "Four-sided 360-degree high-lumen rechargeable emergency light lantern with dual AC mains and solar charging ports.",
      fullDescription: "Omni-directional high-brightness rechargeable lamp with 4 vertical LED tubes providing 360-degree room illumination during power cuts. Includes built-in AC mains charging cable and secondary DC/solar input.",
      image: "solar-led-lamps-4.jpg",
      basePrice: 1499,
      availability: "In Stock - Includes AC Cord",
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
      categoryId: "led-lamps",
      name: "Solar Architectural Wall Luminaire Lamp",
      fullName: "Solar Architectural Wall Luminaire Lamp with Ambient Sensor",
      category: "Commercial & Indoor",
      badge: "Accent Luminaire",
      description: "Modern architectural outdoor wall lamp with integrated solar array, clear diffusion chamber, and zero wiring installation.",
      fullDescription: "Sleek wall-mount accent luminaire featuring solar monocrystalline array and auto-switching light sensor. Provides warm perimeter and corridor illumination with zero electric cabling.",
      image: "solar-led-lamps-3.jpg",
      basePrice: 1399,
      availability: "In Stock - Ready to Ship",
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
    },

    // --- LED Bulbs Category ---
    {
      id: "led-bulbs",
      categoryId: "led-bulbs",
      name: "LED Bulbs",
      fullName: "High-Efficiency LED Bulbs (Multipack Value Editions)",
      category: "Energy Saving",
      badge: "High Efficiency",
      description: "High-efficacy, long-life LED bulbs engineered with robust thermal dissipation and high lumen output to ensure durable daily performance.",
      fullDescription: "Vidhyut Saathi LED Bulbs deliver maximum lumens with minimum wattage consumption. Fitted with heavy-gauge aluminum heat sinks and wide-angle frosted diffusers, they provide consistent, shadow-free illumination while drastically reducing household and commercial electricity bills.",
      image: "led-bulbs.jpg",
      basePrice: 449,
      availability: "In Stock - Multipack Ready to Ship",
      variants: [
        { id: "lb-9w-4p", name: "9W Cool Day (B22 Base) — Pack of 4", wattage: "9W x 4", price: 449, originalPrice: 650, recommended: "Everyday Household Use", isPopular: true },
        { id: "lb-12w-4p", name: "12W Bright White (B22 Base) — Pack of 4", wattage: "12W x 4", price: 599, originalPrice: 850, recommended: "Kitchens & Large Rooms" },
        { id: "lb-18w-2p", name: "18W High-Lumen Master — Pack of 2", wattage: "18W x 2", price: 499, originalPrice: 700, recommended: "Commercial Showrooms & Garages" }
      ],
      specs: [
        { label: "Base Cap", value: "Standard B22 Pin (Standard Indian Base)" },
        { label: "Luminous Efficacy", value: "> 105 Lumens / Watt" },
        { label: "Voltage Range", value: "140V - 285V AC (Wide Range)" },
        { label: "Lifespan", value: "25,000 Hours (Rated)" }
      ]
    },
    {
      id: "high-efficiency-led-bulb",
      categoryId: "led-bulbs",
      name: "High-Efficiency LED Household Bulbs (Multipack)",
      fullName: "High-Efficiency B22 Household LED Bulbs (Value Multipacks)",
      category: "Energy Saving",
      badge: "B22 Household Standard",
      description: "Heavy-gauge aluminum heat-sink LED bulbs with wide-spread frosted diffusers and surge-protected drivers for everyday reliability.",
      fullDescription: "Engineered for durability against Indian voltage fluctuations. Features high-lumen LED chips, insulated constant current driver, and shatterproof frosted diffuser with standard B22 base.",
      image: "led-bulbs.jpg",
      basePrice: 449,
      availability: "In Stock - Multipack Ready",
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
      categoryId: "led-bulbs",
      name: "Solar Hanging Filament Camping LED Bulb",
      fullName: "Solar Hanging Filament Camping LED Bulb with Carabiner Clip",
      category: "Energy Saving",
      badge: "Portable Solar Clip",
      description: "Portable hanging bulb with vintage amber filament, integrated mini solar cell, top carabiner clip, and USB rechargeable battery.",
      fullDescription: "Versatile hanging solar bulb with warm amber filament lighting. Includes built-in solar charging panel, USB recharging port, and metal carabiner clip for camping tents, balconies, and nighttime outdoor use.",
      image: "led-bulb-1.jpg",
      basePrice: 699,
      availability: "In Stock - Clip Included",
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
      categoryId: "led-bulbs",
      name: "12V DC Emergency Hanging Bulb with Battery Clips",
      fullName: "12V DC Hanging Emergency LED Bulb with Alligator Battery Clips",
      category: "Energy Saving",
      badge: "Direct 12V Battery Ready",
      description: "Heavy-duty 12-Volt DC LED bulb with pre-wired insulated cable and alligator clamps for direct connection to solar battery banks.",
      fullDescription: "High-efficiency 12V DC bulb built with insulated copper leads and color-coded alligator clamps. Connects directly to solar home batteries, inverter batteries, or automotive terminals with zero power inversion losses.",
      image: "led-bulb-2.jpg",
      basePrice: 349,
      availability: "In Stock - Includes Leads",
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
      categoryId: "led-bulbs",
      name: "Solar Crystal Bubble Globe Festoon String Bulbs",
      fullName: "Solar Crystal Bubble Globe Festoon String Bulbs (Garland Chain)",
      category: "Energy Saving",
      badge: "Outdoor Festoon Chain",
      description: "Decorative outdoor crystal bubble globe string lights with high-efficiency ground-spike solar panel and 8 lighting modes.",
      fullDescription: "Waterproof crystal bubble globe garland powered by an adjustable solar ground spike. Features 8 enchanting lighting modes and durable rubberized wiring for outdoor trees, balconies, and festive illumination.",
      image: "led-bulb-4.jpg",
      basePrice: 899,
      availability: "In Stock - Spike Included",
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
    },

    // --- Clamp Meters Category ---
    {
      id: "clamp-meters",
      categoryId: "clamp-meters",
      name: "Clamp Meters",
      fullName: "Precision Digital Clamp Meter & Electrical Multimeter",
      category: "Electrical Testing",
      badge: "Precision Testing",
      description: "Rugged digital clamp meters offering accurate AC/DC current, voltage, and continuity testing for professional electricians and maintenance teams.",
      fullDescription: "Designed for industrial electricians, solar plant technicians, and HVAC engineers. Vidhyut Saathi Digital Clamp Meters deliver True-RMS accuracy, non-contact AC voltage detection (NCV), low-impedance testing, and overload protection in an impact-resistant ergonomic casing.",
      image: "clamp-meters.jpg",
      basePrice: 1699,
      availability: "In Stock - Includes Test Leads & Case",
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
      ]
    },
    {
      id: "meco-27-auto-clamp-meter",
      categoryId: "clamp-meters",
      name: "MECO 27-AUTO Digital Clamp Meter (400A AC)",
      fullName: "MECO 27-AUTO Digital Clamp Meter (400A AC / 600V CAT III)",
      category: "Electrical Testing",
      badge: "400A AC Auto-Ranging",
      description: "Compact auto-ranging digital clamp meter with non-contact voltage (NCV) detection, data hold, audible continuity, and CAT III 600V safety.",
      fullDescription: "High-reliability auto-ranging clamp meter from MECO. Delivers accurate AC current measurements up to 400A, built-in non-contact voltage (NCV) detection with LED indicator, data hold, and CAT III 600V safety compliance.",
      image: "clamp-meter-1.jpg",
      basePrice: 1599,
      availability: "In Stock - Includes Test Leads",
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
      categoryId: "clamp-meters",
      name: "Themisto TH-M88 True RMS Digital Clamp Multimeter",
      fullName: "Themisto TH-M88 True RMS Digital Clamp Multimeter with Pouch",
      category: "Electrical Testing",
      badge: "True RMS with Zip Case",
      description: "4000-count True RMS digital clamp multimeter complete with thermocouple temperature probe, zipper carry pouch, and heavy-duty leads.",
      fullDescription: "Professional True RMS clamp multimeter featuring AC/DC voltage measurement, AC current up to 400A, capacitance, frequency, and contact temperature measurement via K-type thermocouple probe.",
      image: "clamp-meter-2.jpg",
      basePrice: 1899,
      availability: "In Stock - Complete Case Kit",
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
      categoryId: "clamp-meters",
      name: "DT-87 Handheld Pocket Digital Clamp Meter",
      fullName: "DT-87 Handheld Pocket Digital Clamp Meter with Test Leads",
      category: "Electrical Testing",
      badge: "Compact Handheld",
      description: "Lightweight ergonomic pocket clamp meter for quick AC current measurements, continuity tests, and domestic electrical maintenance.",
      fullDescription: "Ultra-portable handheld digital clamp meter ideal for quick diagnostic checks by domestic electricians and technicians. Features one-hand operation, data hold, and overload protection.",
      image: "clamp-meter-3.jpg",
      basePrice: 999,
      availability: "In Stock - Includes Test Probes",
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
      categoryId: "clamp-meters",
      name: "SIGMA SG 997 True RMS Auto-Ranging Clamp Multimeter",
      fullName: "SIGMA SG 997 True RMS Auto-Ranging Digital Clamp Multimeter",
      category: "Electrical Testing",
      badge: "Dual Display True RMS",
      description: "Industrial auto-ranging clamp meter with large backlit digital display, temperature measurement, NCV detector, and MAX 600V rating.",
      fullDescription: "Heavy-duty industrial clamp meter engineered for solar power plants and distribution substations. Features True RMS current measurement, dual LCD display, non-contact AC voltage sensing, and impact-resistant double insulation.",
      image: "clamp-meter-4.jpg",
      basePrice: 2499,
      availability: "In Stock - Pro Certified",
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
  ];

  function initBuyNowPage() {
    var activeProductId = 'solar-lights';
    var selectedVariant = null;
    var quantity = 1;
    var cart = [];

    try {
      var saved = localStorage.getItem('vs_cart');
      if (saved) cart = JSON.parse(saved);
    } catch(e) {}

    // Read URL param ?product=
    var params = new URLSearchParams(window.location.search);
    var pParam = params.get('product');
    for (var i = 0; i < productsData.length; i++) {
      if (productsData[i].id === pParam) {
        activeProductId = pParam;
        break;
      }
    }

    function getActiveProduct() {
      for (var i = 0; i < productsData.length; i++) {
        if (productsData[i].id === activeProductId) return productsData[i];
      }
      return productsData[0];
    }

    function renderProduct(scroll) {
      var product = getActiveProduct();
      selectedVariant = product.variants[0];
      for (var v = 0; v < product.variants.length; v++) {
        if (product.variants[v].isPopular) {
          selectedVariant = product.variants[v];
          break;
        }
      }
      quantity = 1;

      // Update tabs
      var tabs = document.querySelectorAll('.vs-category-tab');
      tabs.forEach(function(tab) {
        var tabId = tab.getAttribute('data-product-id');
        if (tabId === product.id || tabId === product.categoryId) {
          tab.classList.add('is-active');
        } else {
          tab.classList.remove('is-active');
        }
      });

      // Update Media
      var mainImg = document.getElementById('mainProductImg');
      var mediaBadge = document.getElementById('mediaCategoryBadge');
      if (mainImg) {
        // Find existing image or asset url
        var currentSrc = mainImg.src;
        var dir = currentSrc.substring(0, currentSrc.lastIndexOf('/') + 1);
        mainImg.src = dir + product.image;
        mainImg.alt = product.fullName;
      }
      if (mediaBadge) mediaBadge.textContent = product.badge || product.category;

      // Update Meta
      var metaCat = document.getElementById('productMetaCategory');
      var nameEl = document.getElementById('productName');
      var descEl = document.getElementById('productDesc');
      var stockEl = document.getElementById('productStockBadge');

      if (metaCat) metaCat.textContent = product.category;
      if (nameEl) nameEl.textContent = product.fullName;
      if (descEl) descEl.textContent = product.fullDescription;
      if (stockEl) stockEl.textContent = product.availability;

      // Render Variants
      renderVariantsList(product);

      // Render Specs
      renderSpecsTable(product);

      // Update Price
      updatePrice();

      // Render Recommendations
      renderRecs(product.id);

      if (scroll) {
        var showcase = document.getElementById('productShowcase');
        if (showcase) {
          var top = showcase.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    }

    function renderVariantsList(product) {
      var wrap = document.getElementById('variantCardsWrap');
      var lbl = document.getElementById('selectedVariantLabel');
      if (!wrap) return;

      wrap.innerHTML = '';
      if (lbl && selectedVariant) lbl.textContent = selectedVariant.name;

      product.variants.forEach(function(variant) {
        var card = document.createElement('div');
        card.className = 'vs-variant-card ' + (variant.id === selectedVariant.id ? 'is-selected' : '');
        card.setAttribute('data-variant-id', variant.id);

        card.innerHTML = [
          '<div class="vs-variant-left">',
            '<div class="vs-variant-radio"></div>',
            '<div>',
              '<div class="vs-variant-name">' + variant.name + '</div>',
              '<div class="vs-variant-desc">' + (variant.recommended || variant.wattage) + '</div>',
            '</div>',
          '</div>',
          '<div class="vs-variant-right">',
            (variant.isPopular ? '<span class="vs-variant-badge">Popular</span>' : ''),
            '<div class="vs-variant-price">₹' + variant.price.toLocaleString('en-IN') + '</div>',
          '</div>'
        ].join('');

        card.addEventListener('click', function() {
          selectedVariant = variant;
          if (lbl) lbl.textContent = variant.name;
          wrap.querySelectorAll('.vs-variant-card').forEach(function(c) { c.classList.remove('is-selected'); });
          card.classList.add('is-selected');
          updatePrice();
        });

        wrap.appendChild(card);
      });
    }

    function renderSpecsTable(product) {
      var tbody = document.getElementById('specsTableBody');
      if (!tbody) return;
      tbody.innerHTML = '';
      if (product.specs) {
        product.specs.forEach(function(spec) {
          var tr = document.createElement('tr');
          tr.innerHTML = '<td class="vs-specs-label">' + spec.label + '</td><td class="vs-specs-val">' + spec.value + '</td>';
          tbody.appendChild(tr);
        });
      }
    }

    function updatePrice() {
      if (!selectedVariant) return;
      var cur = document.getElementById('priceCurrent');
      var orig = document.getElementById('priceOriginal');
      var disc = document.getElementById('priceDiscount');
      var sub = document.getElementById('subtotalVal');

      var unit = selectedVariant.price;
      var origVal = selectedVariant.originalPrice;
      var subtotal = unit * quantity;

      if (cur) cur.textContent = '₹' + unit.toLocaleString('en-IN');
      if (orig && origVal) orig.textContent = '₹' + origVal.toLocaleString('en-IN');
      if (disc && origVal) {
        var pct = Math.round(((origVal - unit) / origVal) * 100);
        disc.textContent = pct + '% OFF';
      }
      if (sub) sub.textContent = '₹' + subtotal.toLocaleString('en-IN');
    }

    function renderRecs(currentId) {
      var grid = document.getElementById('recGrid');
      if (!grid) return;
      grid.innerHTML = '';

      var mainImg = document.getElementById('mainProductImg');
      var dir = '';
      if (mainImg) {
        var currentSrc = mainImg.src;
        dir = currentSrc.substring(0, currentSrc.lastIndexOf('/') + 1);
      }

      productsData.forEach(function(p) {
        if (p.id === currentId) return;

        var card = document.createElement('div');
        card.className = 'vs-rec-card';
        card.innerHTML = [
          '<div class="vs-rec-img-wrap">',
            '<img src="' + (dir + p.image) + '" alt="' + p.name + '" class="vs-rec-img" loading="lazy">',
            '<span class="vs-rec-badge-pill">' + (p.badge || p.category) + '</span>',
          '</div>',
          '<div class="vs-rec-body">',
            '<div class="vs-rec-name">' + p.name + '</div>',
            '<div class="vs-rec-price-hint">Starting from <strong>₹' + p.basePrice.toLocaleString('en-IN') + '</strong></div>',
            '<button type="button" class="vs-rec-btn" data-switch-to="' + p.id + '">',
              '<span>Buy Now</span>',
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>',
            '</button>',
          '</div>'
        ].join('');

        card.querySelector('.vs-rec-btn').addEventListener('click', function(e) {
          e.preventDefault();
          activeProductId = p.id;
          var newUrl = window.location.pathname + '?product=' + encodeURIComponent(p.id);
          window.history.pushState({ product: p.id }, '', newUrl);
          renderProduct(true);
        });

        grid.appendChild(card);
      });
    }

    // Attach Tab Clicks
    document.querySelectorAll('.vs-category-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        var pid = tab.getAttribute('data-product-id');
        if (pid && pid !== activeProductId) {
          activeProductId = pid;
          var newUrl = window.location.pathname + '?product=' + encodeURIComponent(pid);
          window.history.pushState({ product: pid }, '', newUrl);
          renderProduct(true);
        }
      });
    });

    // Quantity Picker
    var decBtn = document.getElementById('qtyDec');
    var incBtn = document.getElementById('qtyInc');
    var qtyInput = document.getElementById('qtyInput');

    if (decBtn) decBtn.addEventListener('click', function() {
      quantity = Math.max(1, quantity - 1);
      if (qtyInput) qtyInput.value = quantity;
      updatePrice();
    });
    if (incBtn) incBtn.addEventListener('click', function() {
      quantity = Math.min(99, quantity + 1);
      if (qtyInput) qtyInput.value = quantity;
      updatePrice();
    });
    if (qtyInput) qtyInput.addEventListener('change', function(e) {
      var v = parseInt(e.target.value, 10);
      quantity = isNaN(v) ? 1 : Math.max(1, Math.min(99, v));
      qtyInput.value = quantity;
      updatePrice();
    });

    // Cart Drawer Elements
    var drawer = document.getElementById('cartDrawer');
    var backdrop = document.getElementById('cartDrawerBackdrop');
    var closeBtn = document.getElementById('cartDrawerClose');
    var floatBtn = document.getElementById('floatingCartBtn');
    var checkoutBtn = document.getElementById('cartCheckoutBtn');

    function openCart() {
      if (drawer && backdrop) {
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        renderCart();
      }
    }

    function closeCart() {
      if (drawer && backdrop) {
        drawer.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }

    if (floatBtn) floatBtn.addEventListener('click', openCart);
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (backdrop) backdrop.addEventListener('click', closeCart);

    function updateCartCount() {
      var total = cart.reduce(function(acc, item) { return acc + item.quantity; }, 0);
      var bCount = document.getElementById('cartBadgeCount');
      var fBadge = document.getElementById('floatingCartBadge');
      if (bCount) bCount.textContent = total;
      if (fBadge) fBadge.textContent = total;
    }

    function renderCart() {
      var wrap = document.getElementById('cartItemsWrap');
      var totalEl = document.getElementById('cartTotalVal');
      if (!wrap) return;

      if (cart.length === 0) {
        wrap.innerHTML = '<div class="vs-cart-empty"><p>Your shopping cart is empty.</p></div>';
        if (totalEl) totalEl.textContent = '₹0';
        return;
      }

      var grandTotal = 0;
      wrap.innerHTML = '';
      cart.forEach(function(item, idx) {
        var sub = item.price * item.quantity;
        grandTotal += sub;

        var el = document.createElement('div');
        el.className = 'vs-cart-item';
        el.innerHTML = [
          '<div class="vs-cart-item-info">',
            '<div class="vs-cart-item-name">' + item.name + '</div>',
            '<div class="vs-cart-item-variant">' + item.variantName + ' × ' + item.quantity + '</div>',
            '<div class="vs-cart-item-bottom">',
              '<span class="vs-cart-item-price">₹' + sub.toLocaleString('en-IN') + '</span>',
              '<button type="button" class="vs-cart-item-remove" data-idx="' + idx + '">Remove</button>',
            '</div>',
          '</div>'
        ].join('');

        el.querySelector('.vs-cart-item-remove').addEventListener('click', function() {
          cart.splice(idx, 1);
          try { localStorage.setItem('vs_cart', JSON.stringify(cart)); } catch(e){}
          updateCartCount();
          renderCart();
        });

        wrap.appendChild(el);
      });

      if (totalEl) totalEl.textContent = '₹' + grandTotal.toLocaleString('en-IN');
    }

    // Add to Cart Click
    var addBtn = document.getElementById('addToCartBtn');
    if (addBtn) {
      addBtn.addEventListener('click', function() {
        var p = getActiveProduct();
        if (!p || !selectedVariant) return;

        var existing = -1;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].productId === p.id && cart[i].variantId === selectedVariant.id) {
            existing = i;
            break;
          }
        }

        if (existing > -1) {
          cart[existing].quantity += quantity;
        } else {
          cart.push({
            productId: p.id,
            variantId: selectedVariant.id,
            name: p.name,
            variantName: selectedVariant.name,
            price: selectedVariant.price,
            quantity: quantity
          });
        }

        try { localStorage.setItem('vs_cart', JSON.stringify(cart)); } catch(e){}
        updateCartCount();
        openCart();
      });
    }

    // Direct Buy Now / Checkout Click
    var buyBtn = document.getElementById('buyNowDirectBtn');
    if (buyBtn) {
      buyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var p = getActiveProduct();
        if (!p || !selectedVariant) return;

        var total = selectedVariant.price * quantity;
        var text = 'Hello Vidhyut Saathi, I want to purchase:\n\nProduct: ' + p.fullName + '\nModel: ' + selectedVariant.name + '\nQuantity: ' + quantity + '\nTotal Amount: ₹' + total.toLocaleString('en-IN') + ' (incl. GST)\n\nPlease share delivery details.';
        window.open('https://wa.me/918199036060?text=' + encodeURIComponent(text), '_blank');
      });
    }

    // Checkout button inside cart drawer
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) return;
        var summary = 'Vidhyut Saathi Order Inquiry:\n\n';
        var total = 0;
        cart.forEach(function(item, idx) {
          var itemTotal = item.price * item.quantity;
          total += itemTotal;
          summary += (idx + 1) + '. ' + item.name + ' (' + item.variantName + ') - Qty: ' + item.quantity + ' - ₹' + itemTotal.toLocaleString('en-IN') + '\n';
        });
        summary += '\nTotal: ₹' + total.toLocaleString('en-IN') + ' (incl. GST)';
        window.open('https://wa.me/918199036060?text=' + encodeURIComponent(summary), '_blank');
      });
    }

    // Popstate
    window.addEventListener('popstate', function() {
      var p = new URLSearchParams(window.location.search).get('product');
      if (p && p !== activeProductId) {
        for (var i = 0; i < productsData.length; i++) {
          if (productsData[i].id === p) {
            activeProductId = p;
            renderProduct(false);
            break;
          }
        }
      }
    });

    renderProduct(false);
    updateCartCount();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBuyNowPage);
  } else {
    initBuyNowPage();
  }
})();
