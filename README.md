# Vidhyut Saathi – Solar Products Website & Shopify Theme

A premium, modern, production-grade **Shopify Theme & Frontend** for **Vidhyut Saathi**, an Indian electrical and solar products brand offering:
- **Solar Lights** (All-in-one solar luminaires and street lighting)
- **LED Lamps** (Architectural linear lamps, suspended fixtures, downlights)
- **LED Bulbs** (High-efficiency, thermal dissipation residential and commercial bulbs)
- **Clamp Meters** (Precision digital electrical testing and measurement instruments)

---

## 🛍️ Shopify GitHub Integration

This repository follows the official **Shopify Theme Architecture (Online Store 2.0)**:
```
├── assets/          # Theme stylesheets, scripts, and product/banner images
├── config/          # settings_schema.json & settings_data.json
├── layout/          # theme.liquid
├── locales/         # en.default.json
├── sections/        # Liquid sections with Theme Editor schema & image_picker
├── templates/       # index.json, page.json, product.json, collection.json, 404.json
├── snippets/        # Liquid helper snippets
└── src/             # Source files for standalone development
```

### How to connect with Shopify Store:
1. Go to **Shopify Admin** > **Online Store** > **Themes**.
2. Click **Add Theme** > **Connect from GitHub**.
3. Select your repository: `empvs04/Solar-products-` and branch `main`.
4. Shopify will automatically validate the theme structure and import it into your store without errors.
5. Click **Customize** to manage the 4 Hero Banners and content directly through the Shopify Theme Editor!

---

## 🎨 Design System

- **Primary Color:** Deep Navy Blue (`#223A5F`)
- **Secondary Color:** Midnight Navy (`#151E2B`)
- **Accent Color:** Vidhyut Solar Amber (`#E86014`)
- **Backgrounds:** Pure White (`#FFFFFF`), Very Light Blue (`#F0F5FA`), Slate Neutral (`#F8FAFC`)
- **Typography:** Plus Jakarta Sans & Inter
- **Aesthetic:** Corporate, trustworthy, clean borders, balanced whitespace, zero cluttered layout.

---

## 🚀 Sections Included

1. **Header & Navigation (`sections/vidhyut-header.liquid`):**
   - Brand logo, desktop navigation, action buttons (`Buy Now`, `Buy Distributorship`), mobile hamburger drawer.
2. **Hero Section (`sections/vidhyut-hero-carousel.liquid`):**
   - 4 Shopify-managed banner slides with native `image_picker` settings for desktop and mobile images.
   - Auto-slide with hover/focus pause, touch swipe gestures, and pagination dots.
3. **Featured Products (`sections/vidhyut-products.liquid`):**
   - 4 balanced product cards: *Solar Lights*, *LED Lamps*, *LED Bulbs*, *Clamp Meters*.
4. **Brand Introduction (`sections/vidhyut-about-intro.liquid`):**
   - 2-column layout ("Powering a Brighter Tomorrow") with genuine photography and quality pillars.
5. **Why Choose Vidhyut Saathi? (`sections/vidhyut-why-choose.liquid`):**
   - 4 compact benefit cards with vector icons.
6. **Buy Distributorship (`sections/vidhyut-distributorship.liquid`):**
   - High-impact corporate partner CTA box.
7. **Secondary Call to Action (`sections/vidhyut-secondary-cta.liquid`):**
   - Conversion section for product inquiries.
8. **Corporate Footer (`sections/vidhyut-footer.liquid`):**
   - Verified headquarters address (*SCO-77A, 3rd Floor, Ashoka Complex, Delhi Road, Rohtak - 124001, Haryana*), email (*info@vidhyutsaathi.com*), and phone numbers (*+91-8199036060*, *+91-9053110707*).

---

## 🛠️ Local Development (Vite)

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build
```
