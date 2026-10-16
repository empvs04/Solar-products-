# Vidhyut Saathi – Solar Products Website

A premium, modern, production-grade frontend website for **Vidhyut Saathi**, an Indian electrical and solar products brand offering:
- **Solar Lights** (All-in-one solar luminaires and street lighting)
- **LED Lamps** (Architectural linear lamps, suspended fixtures, downlights)
- **LED Bulbs** (High-efficiency, thermal dissipation residential and commercial bulbs)
- **Clamp Meters** (Precision digital electrical testing and measurement instruments)

---

## 🎨 Design System

- **Primary Color:** Deep Navy Blue (`#223A5F`)
- **Secondary Color:** Midnight Navy (`#151E2B`)
- **Accent Color:** Vidhyut Solar Amber (`#E86014`)
- **Backgrounds:** Pure White (`#FFFFFF`), Very Light Blue (`#F0F5FA`), Slate Neutral (`#F8FAFC`)
- **Typography:** Plus Jakarta Sans & Inter
- **Aesthetic:** Corporate, trustworthy, clean borders, balanced whitespace, zero cluttered layout.

---

## 🚀 Features & Sections

1. **Header & Navigation:**
   - Official Vidhyut Saathi brand logo
   - Desktop navigation with clean active indicators: *Home*, *About Us*, *Products*, *Contact Us*
   - Direct CTA buttons: *Buy Now*, *Buy Distributorship*
   - Mobile responsive drawer with animated hamburger toggle, escape key handling, and background overlay lock.

2. **Hero Section (Four Shopify-Managed Banners):**
   - Full-width hero carousel with **exactly four configurable banner slides**
   - Separate desktop (`16:9`) and mobile (`3:4` portrait) images to prevent distortion or text cropping
   - Auto-slide with configurable interval (5.5s)
   - Pause on hover and keyboard focus
   - Mobile touch swipe support
   - Accessible pagination dots, previous/next controls, and autoplay progress bar
   - Eager priority loading on slide 1 to prevent layout shifts (CLS: 0)

3. **Featured Products Section ("Explore Our Products"):**
   - Four balanced cards: *Solar Lights*, *LED Lamps*, *LED Bulbs*, *Clamp Meters*
   - Genuine high-definition product imagery
   - Consistent card height and image aspect ratio
   - Desktop 4-column, tablet 2-column, mobile 1-column responsive grid

4. **Brand Introduction ("Powering a Brighter Tomorrow"):**
   - Two-column balanced layout with genuine project photography
   - Practical reliability floating badge
   - Focus on product usability and Indian environmental conditions

5. **Why Choose Vidhyut Saathi?:**
   - 4 compact feature cards with vector icons:
     - *Product-Focused Solutions*
     - *Solar Lighting Options*
     - *Electrical Product Range*
     - *Support for Business Partners*

6. **Buy Distributorship Section ("Grow Your Business with Vidhyut Saathi"):**
   - High-impact corporate partner CTA box
   - Key distributor highlights
   - Action buttons: *Buy Distributorship*, *Contact Us*

7. **Secondary Call to Action:**
   - Encourages product exploration and inquiries

8. **Corporate Footer:**
   - Official headquarters address: *SCO-77A, 3rd Floor, Ashoka Complex, Delhi Road, Rohtak - 124001, Haryana, India*
   - Verified contact email: *info@vidhyutsaathi.com*
   - Verified contact numbers: *+91-8199036060* / *+91-9053110707*
   - Structured links and copyright statement

---

## 🛍️ Shopify Banner Configuration

### Standalone Frontend Architecture
Configured via `src/config/shopify-banners.config.js`. Administrators can swap image paths for Shopify CDN URLs (e.g. `https://cdn.shopify.com/...`), customize slide headings, subheadings, CTA labels, and links.

### Shopify Theme Integration (Liquid)
A ready-to-use Shopify Liquid section is provided in:
`shopify-sections/vidhyut-hero-carousel.liquid`
- Copy this file into your Shopify theme's `sections/` folder
- Add the section through the Shopify Theme Editor (Online Store > Themes > Customize)
- Edit all 4 banners using native `image_picker` blocks without touching code

---

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
