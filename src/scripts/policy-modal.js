/**
 * Vidhyut Saathi - Interactive Policy Modal Controller
 * Handles pop-up display for Privacy Policy, Disclaimer, Terms & Conditions,
 * and Return & Refund Policy (Strict No-Refund).
 */

const POLICY_DATA = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'Effective: October 2026 • Vidhyut Saathi Data Protection',
    badge: 'Privacy & Security',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    content: `
      <div class="vs-policy-alert vs-policy-alert-info">
        <div class="vs-policy-alert-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </div>
        <div class="vs-policy-alert-content">
          <span class="vs-policy-alert-title">Commitment to Your Privacy</span>
          Vidhyut Saathi is committed to protecting your personal information. We do not sell, rent, or trade your contact or business data with third-party advertisers.
        </div>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
          1. Information We Collect
        </h4>
        <p>When you purchase products, apply for distributorship, or contact our technical team, we collect necessary operational details:</p>
        <ul class="vs-policy-list">
          <li><strong>Contact Details:</strong> Full name, verified mobile/WhatsApp number, delivery address, pin code, and email address for order dispatches and GST invoicing.</li>
          <li><strong>Business & GST Information:</strong> Business legal name, GSTIN number, and trade details when booking B2B bulk distributorship packages.</li>
          <li><strong>Order & Transaction Records:</strong> Purchase history, payment verification codes, and warranty registration details. Payment card numbers or bank credentials are processed directly by RBI-certified, encrypted gateways; we do not store raw card numbers.</li>
          <li><strong>Session Cookies:</strong> Non-intrusive local storage cookies used strictly for cart persistence and seamless browsing navigation.</li>
        </ul>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          2. How We Use Your Information
        </h4>
        <p>The information gathered is utilized strictly for commercial and logistical execution:</p>
        <ul class="vs-policy-list">
          <li>To pack, insure, and dispatch your solar lights, LED luminaires, and clamp meters via reliable surface or express couriers.</li>
          <li>To generate GST-compliant tax invoices for your business input tax credit.</li>
          <li>To issue tracking updates, delivery notifications, and respond to technical installation queries.</li>
          <li>To manage warranty records and authenticate transit replacement claims.</li>
        </ul>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          3. Data Security & Storage
        </h4>
        <p>We deploy modern encryption standards (SSL/TLS 256-bit) across our platform. Customer contact details are shared strictly on a need-to-know basis with dispatch delivery personnel and courier partners solely for physical parcel delivery.</p>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          4. Contacting Our Privacy Officer
        </h4>
        <p>For inquiries regarding stored billing records or to update your contact preferences, please reach out directly:</p>
        <div class="vs-policy-contact-box">
          <div class="vs-policy-contact-text">
            <h5>Vidhyut Saathi Privacy Desk</h5>
            <p>SCO-77A, 3rd Floor, Ashoka Complex, Delhi Road, Rohtak - 124001, Haryana, India</p>
          </div>
          <div class="vs-policy-contact-actions">
            <a href="mailto:info@vidhyutsaathi.com" class="vs-policy-contact-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              info@vidhyutsaathi.com
            </a>
            <a href="tel:+918199036060" class="vs-policy-contact-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +91-8199036060
            </a>
          </div>
        </div>
      </div>
    `
  },

  disclaimer: {
    id: 'disclaimer',
    title: 'Disclaimer',
    subtitle: 'Effective: October 2026 • Technical Parameters & Safety Notice',
    badge: 'Operational Guidelines',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    content: `
      <div class="vs-policy-alert vs-policy-alert-warning">
        <div class="vs-policy-alert-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
        <div class="vs-policy-alert-content">
          <span class="vs-policy-alert-title">Solar & Electrical Operating Factors</span>
          Solar lighting autonomy and battery discharge timings depend on environmental solar irradiance, mounting orientation, and weather factors. All high-voltage installations must be conducted by certified electricians.
        </div>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          1. Solar Lighting Performance & Weather Dependency
        </h4>
        <p>Vidhyut Saathi solar lights (All-in-One street lights, solar flood lights) are powered by integrated monocrystalline panels and Lithium LiFePO4 batteries. Rated performance is calculated under standard test conditions (1000 W/m² irradiance):</p>
        <ul class="vs-policy-list">
          <li><strong>Sunlight Intensity & Duration:</strong> Backup duration (10–14 hours) requires 6 to 8 hours of direct, unobstructed sunlight during the daytime.</li>
          <li><strong>Seasonal & Weather Variations:</strong> During continuous monsoon rain, heavy cloud cover, dense winter smog, or snow, solar panels generate lower charging current. Shortened illumination hours during such meteorological conditions do not constitute a product defect.</li>
          <li><strong>Mounting Angle & Obstructions:</strong> Solar lights installed under tree branches, building shadows, or billboards will experience diminished battery recharge. Regular cleaning of dust accumulation from solar glass surfaces is required for optimal efficiency.</li>
        </ul>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
          2. Electrical Safety & Professional Installation
        </h4>
        <p>AC electrical equipment (commercial LED lamps, high-bay fittings, LED bulbs) must be installed following the National Electrical Code (NEC) of India. Vidhyut Saathi is not responsible for damages, component burning, or electrical shock caused by:</p>
        <ul class="vs-policy-list">
          <li>Severe phase-to-phase overvoltage spikes or lightning strikes without adequate surge protective devices (SPD).</li>
          <li>Improper neutral connections, inadequate earth grounding, or loose wiring terminals.</li>
          <li>Submersion of fixtures in water beyond their certified ingress protection rating (IP65/IP66).</li>
        </ul>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          3. Testing Instruments & Measurement Tools
        </h4>
        <p>Clamp meters and digital testing multimeters should only be used within their stated voltage/current limits (e.g., CAT III 600V). Operators must verify lead integrity and insulation prior to live electrical line testing. Vidhyut Saathi accepts no liability for misuse or equipment damage resulting from over-range testing.</p>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          4. Continuous Engineering & Product Iteration
        </h4>
        <p>Vidhyut Saathi continually upgrades LED chips, optical lenses, charge controllers, and heat sinks. Product photographs, shell aesthetics, and dimensions shown on the website represent standard production units and may undergo minor cosmetic or engineering refinements without notice.</p>
      </div>
    `
  },

  terms: {
    id: 'terms',
    title: 'Terms & Conditions',
    subtitle: 'Effective: October 2026 • Commercial Sales & Warranty Agreement',
    badge: 'Legal Terms',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    content: `
      <div class="vs-policy-alert vs-policy-alert-info">
        <div class="vs-policy-alert-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        </div>
        <div class="vs-policy-alert-content">
          <span class="vs-policy-alert-title">Commercial Agreement</span>
          By purchasing from Vidhyut Saathi online or through regional authorized distribution channels, you agree to comply with and be bound by the following Terms & Conditions.
        </div>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          1. Pricing, Invoicing & GST Compliance
        </h4>
        <p>All prices quoted on the website are in Indian Rupees (INR) and are inclusive of standard GST unless specifically stated as ex-factory wholesale quotations for verified distributors.</p>
        <ul class="vs-policy-list">
          <li>A valid GST tax invoice is issued with each shipment mentioning accurate HSN codes (e.g. 9405 for solar lighting fixtures, 9030 for clamp meters).</li>
          <li>For registered B2B entities, input tax credit details are transmitted through GSTR-1 as per government filing schedules.</li>
        </ul>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
          2. Order Confirmation & Dispatch
        </h4>
        <p>Orders are processed following payment confirmation. Dispatches are routed through our central logistics facility in Rohtak, Haryana, using recognized Indian logistics carriers. Transit times are estimated between 3 to 7 working days depending on destination pin code.</p>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          3. Standard Manufacturer Warranty
        </h4>
        <p>Vidhyut Saathi products are backed by standard limited warranties against manufacturing defects in internal electronic drivers, solar charge controllers, and LED clusters:</p>
        <ul class="vs-policy-list">
          <li><strong>Coverage:</strong> Repair or component replacement for manufacturing defects occurring under regular operational parameters.</li>
          <li><strong>Warranty Voids:</strong> Warranty does NOT cover physical breakage, dropped units, cracked solar panels, burnt motherboards due to direct lightning strikes or ungrounded high voltage surges, ingress of water caused by opened cable glands, or unauthorized third-party repairs.</li>
        </ul>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
          4. Intellectual Property
        </h4>
        <p>All brand logos, technical datasheets, product photographs, diagrams, and written content are the exclusive intellectual property of Vidhyut Saathi. Reproduction without written consent is strictly prohibited.</p>
      </div>

      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l8-4 8 4v14"></path></svg>
          5. Governing Law & Legal Jurisdiction
        </h4>
        <p>These terms are governed by and construed in accordance with the laws of India. Any legal dispute, arbitration, or proceedings shall be subject to the exclusive jurisdiction of the competent courts in <strong>Rohtak, Haryana, India</strong>.</p>
      </div>
    `
  },

  refund: {
    id: 'refund',
    title: 'Return & 7-Day Replacement Policy',
    subtitle: 'Effective: October 2026 • 100% Free Replacement for Damaged & Broken Products',
    badge: '7-Day Free Replacement',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
    content: `
      <!-- Top Highlight Banner: 7-Day Replacement Guarantee -->
      <div class="vs-policy-alert" style="border-left: 4px solid #16a34a; background: linear-gradient(135deg, rgba(22, 163, 74, 0.12) 0%, rgba(22, 163, 74, 0.03) 100%); border-color: rgba(22, 163, 74, 0.35); padding: 16px; border-radius: 8px; margin-bottom: 22px;">
        <div class="vs-policy-alert-icon" style="color: #16a34a;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div class="vs-policy-alert-content">
          <span class="vs-policy-alert-title" style="color: #15803d; font-weight: 700; font-size: 1.02rem;">7-Day Free Replacement Guarantee (Damaged &amp; Broken Products)</span>
          <p style="margin: 6px 0 0 0; color: #1e293b; font-size: 0.94rem; line-height: 1.6;">
            Agar delivery ke waqt aapko koi bhi product <strong>damaged, toota hua (physically broken), ya defective</strong> milta hai, toh Vidhyut Saathi aapko <strong>7 DIN KE ANDAR 100% FREE REPLACEMENT</strong> provide karta hai. Claim verify hone ke turant baad bina kisi additional shipping charge ke fresh replacement product dispatch kar diya jayega.
          </p>
        </div>
      </div>

      <!-- Section 1: 7-Day Replacement Policy -->
      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          1. 7-Day Free Replacement Coverage
        </h4>
        <p>Hum apne sabhi solar products, LED luminaires aur electrical clamp meters par customer satisfaction aur transit security ensure karte hain:</p>
        <ul class="vs-policy-list">
          <li><strong>Eligible Issues:</strong> Transit ke dauran toota hua glass, bent casing, physical damage, courier rough handling, ya Dead-on-Arrival (DOA) manufacturing fault.</li>
          <li><strong>7-Day Inspection Window:</strong> Parcel receive hone ke <strong>7 days ke andar</strong> aapko support team ko damage report karna hoga.</li>
          <li><strong>Zero Cost to Customer:</strong> Replacement unit dispatch karne ka koi bhi extra delivery ya shipping charge customer se nahi liya jayega.</li>
        </ul>
      </div>

      <!-- Section 2: How to Claim Replacement -->
      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          2. Replacement Claim Process (3 Simple Steps)
        </h4>
        <p>Damaged ya broken product ka replacement paane ke liye ye aasan steps follow karein:</p>
        <ul class="vs-policy-list">
          <li><strong>Step 1 (Photo / Video):</strong> Damaged ya toote hue product aur outer box shipping label ki clear photos ya unboxing video record karein.</li>
          <li><strong>Step 2 (Report in 7 Days):</strong> Apne Order Number ke sath WhatsApp (<strong>+91-8199036060</strong>) ya Email (<strong>support@vidhyutsaathi.com</strong>) par 7 din ke andar send karein.</li>
          <li><strong>Step 3 (Free Replacement Dispatch):</strong> Hamari technical team 24 business hours ke andar claim review karke aapko fresh replacement unit courier kar degi.</li>
        </ul>
      </div>

      <!-- Section 3: Replacement Resolution & Zero Cash Refund -->
      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          3. Replacement vs. Cash Refund Policy
        </h4>
        <p>Calibrated electrical measurement components aur certified Lithium LiFePO4 battery safety standards ke chalte:</p>
        <ul class="vs-policy-list">
          <li><strong>Direct Product Replacement:</strong> Kisi bhi damaged ya defective product ke badle customer ko <strong>1-to-1 brand new replacement</strong> diya jata hai.</li>
          <li><strong>No Monetary Cash Refunds:</strong> Change-of-mind ya order dispatch ke baad cancellation par cash/bank refund nahi hota; samasya ka 100% solution free replacement ya official warranty service ke zariye diya jata hai.</li>
          <li><strong>Warranty Assurance:</strong> Replacement ke baad bhi aapka product standard manufacturer warranty ke tahat fully covered rehta hai.</li>
        </ul>
      </div>

      <!-- Section 4: Non-Eligible Scenarios -->
      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          4. Non-Eligible Scenarios
        </h4>
        <ul class="vs-policy-list">
          <li>Customer dwara galat installation, short-circuit, ya delivery ke baad accidental dropping se hua damage.</li>
          <li>Delivery ke 7 days bit jaane ke baad raise kiye gaye transit damage claims (ye issue warranty repair me cover honge, replacement me nahi).</li>
          <li>Customer dwara bina technical defect ke sirf 'change of mind' par product wapas karna.</li>
        </ul>
      </div>

      <!-- Section 5: Direct Support Contact -->
      <div class="vs-policy-section">
        <h4 class="vs-policy-sec-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          5. Contact Support for 7-Day Replacement
        </h4>
        <p>Agar aapko damaged ya broken product receive hua hai, toh turant hamari dedicated replacement desk se sampark karein:</p>
        <div class="vs-policy-contact-box" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px;">
          <div class="vs-policy-contact-text">
            <h5 style="margin: 0 0 4px 0; color: #0f172a; font-size: 1rem;">Vidhyut Saathi 7-Day Replacement Desk</h5>
            <p style="margin: 0; color: #64748b; font-size: 0.88rem;">Apne Order ID aur parcel video ke sath humein message karein (Mon - Sat, 9:00 AM - 7:00 PM IST)</p>
          </div>
          <div class="vs-policy-contact-actions" style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 10px;">
            <a href="https://wa.me/918199036060?text=Hello%2C%20I%20received%20a%20damaged%20product%20and%20need%20a%207-day%20replacement." target="_blank" rel="noopener noreferrer" class="vs-policy-contact-link" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: #22c55e; color: #ffffff; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.88rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              WhatsApp: +91-8199036060
            </a>
            <a href="mailto:support@vidhyutsaathi.com?subject=7-Day%20Replacement%20Request%20-%20Damaged%20Product" class="vs-policy-contact-link" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: #223a5f; color: #ffffff; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.88rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              support@vidhyutsaathi.com
            </a>
          </div>
        </div>
      </div>
    `
  }
};

export class PolicyModalController {
  constructor() {
    this.modalEl = null;
    this.currentPolicy = 'privacy';
    this.lastFocusedEl = null;

    this.init();
  }

  init() {
    this.injectModalMarkup();
    this.bindTriggers();
    this.checkInitialHash();
  }

  injectModalMarkup() {
    if (document.getElementById('vsPolicyModal')) {
      this.modalEl = document.getElementById('vsPolicyModal');
      return;
    }

    const modalMarkup = `
      <div class="vs-policy-backdrop" id="vsPolicyModal" role="dialog" aria-modal="true" aria-labelledby="vsPolicyModalTitle">
        <div class="vs-policy-dialog" role="document">
          <!-- Header -->
          <div class="vs-policy-header">
            <div class="vs-policy-header-left">
              <div class="vs-policy-header-icon" id="vsPolicyHeaderIcon">
                ${POLICY_DATA.privacy.icon}
              </div>
              <div class="vs-policy-header-meta">
                <h3 class="vs-policy-title" id="vsPolicyModalTitle">${POLICY_DATA.privacy.title}</h3>
                <p class="vs-policy-subtitle" id="vsPolicyModalSubtitle">${POLICY_DATA.privacy.subtitle}</p>
              </div>
            </div>
            <button type="button" class="vs-policy-close-btn" id="vsPolicyCloseBtn" aria-label="Close policy dialog">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Tabs Navigation -->
          <nav class="vs-policy-tabs-nav" aria-label="Policy Navigation">
            <button type="button" class="vs-policy-tab-btn is-active" data-tab="privacy">
              🔒 Privacy Policy
            </button>
            <button type="button" class="vs-policy-tab-btn" data-tab="disclaimer">
              ⚠️ Disclaimer
            </button>
            <button type="button" class="vs-policy-tab-btn" data-tab="terms">
              📄 Terms & Conditions
            </button>
            <button type="button" class="vs-policy-tab-btn" data-tab="refund">
              🔄 Return &amp; Replacement
              <span class="vs-tab-badge" style="background: #16a34a !important; color: #ffffff !important;">7-Day Replace</span>
            </button>
          </nav>

          <!-- Scrollable Body -->
          <div class="vs-policy-body" id="vsPolicyBody">
            <div class="vs-policy-pane is-active" id="pane-privacy">${POLICY_DATA.privacy.content}</div>
            <div class="vs-policy-pane" id="pane-disclaimer">${POLICY_DATA.disclaimer.content}</div>
            <div class="vs-policy-pane" id="pane-terms">${POLICY_DATA.terms.content}</div>
            <div class="vs-policy-pane" id="pane-refund">${POLICY_DATA.refund.content}</div>
          </div>

          <!-- Footer -->
          <div class="vs-policy-footer">
            <div class="vs-policy-footer-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
              <span>Need help? Call +91-8199036060 or info@vidhyutsaathi.com</span>
            </div>
            <button type="button" class="vs-policy-done-btn" id="vsPolicyDoneBtn">
              Close Window
            </button>
          </div>
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalMarkup;
    this.modalEl = wrapper.firstElementChild;
    document.body.appendChild(this.modalEl);

    // Bind modal internal clicks
    const closeBtn = document.getElementById('vsPolicyCloseBtn');
    const doneBtn = document.getElementById('vsPolicyDoneBtn');

    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (doneBtn) doneBtn.addEventListener('click', () => this.close());

    // Backdrop click
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });

    // Tab buttons
    this.modalEl.querySelectorAll('.vs-policy-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab && POLICY_DATA[tab]) {
          this.switchTab(tab);
        }
      });
    });

    // Keydown for ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  bindTriggers() {
    // Select elements that want to open a policy
    // Patterns:
    // [data-policy="privacy"], [data-policy="disclaimer"], [data-policy="terms"], [data-policy="refund"]
    // a[href="#policy-privacy"], a[href="#policy-disclaimer"], etc.
    const selector = `
      [data-policy],
      [data-open-policy],
      .vs-policy-btn,
      a[href^="#policy-"]
    `;

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest(selector);
      if (!trigger) return;

      e.preventDefault();
      this.lastFocusedEl = trigger;

      let policyKey = trigger.getAttribute('data-policy') || trigger.getAttribute('data-open-policy');

      if (!policyKey) {
        const href = trigger.getAttribute('href') || '';
        if (href.startsWith('#policy-')) {
          policyKey = href.replace('#policy-', '');
        }
      }

      // Map alias names if needed
      if (policyKey === 'terms-of-service' || policyKey === 'terms-and-conditions') policyKey = 'terms';
      if (policyKey === 'return-policy' || policyKey === 'refund-policy') policyKey = 'refund';
      if (policyKey === 'privacy-policy') policyKey = 'privacy';

      if (policyKey && POLICY_DATA[policyKey]) {
        this.open(policyKey);
      } else {
        this.open('privacy');
      }
    });
  }

  switchTab(policyKey) {
    if (!POLICY_DATA[policyKey]) return;
    this.currentPolicy = policyKey;

    const data = POLICY_DATA[policyKey];

    // Update Header
    const iconEl = document.getElementById('vsPolicyHeaderIcon');
    const titleEl = document.getElementById('vsPolicyModalTitle');
    const subtitleEl = document.getElementById('vsPolicyModalSubtitle');

    if (iconEl) iconEl.innerHTML = data.icon;
    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;

    // Update Tabs
    this.modalEl.querySelectorAll('.vs-policy-tab-btn').forEach((btn) => {
      if (btn.getAttribute('data-tab') === policyKey) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update Panes
    this.modalEl.querySelectorAll('.vs-policy-pane').forEach((pane) => {
      if (pane.id === `pane-${policyKey}`) {
        pane.classList.add('is-active');
      } else {
        pane.classList.remove('is-active');
      }
    });

    // Reset scroll of body
    const bodyEl = document.getElementById('vsPolicyBody');
    if (bodyEl) bodyEl.scrollTop = 0;
  }

  open(policyKey = 'privacy') {
    if (!this.modalEl) this.injectModalMarkup();

    this.switchTab(policyKey);

    this.modalEl.classList.add('is-open');
    document.body.classList.add('vs-policy-modal-open');

    // Accessibility focus
    setTimeout(() => {
      const closeBtn = document.getElementById('vsPolicyCloseBtn');
      if (closeBtn) closeBtn.focus();
    }, 100);
  }

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('is-open');
    document.body.classList.remove('vs-policy-modal-open');

    if (this.lastFocusedEl && typeof this.lastFocusedEl.focus === 'function') {
      this.lastFocusedEl.focus();
    }
  }

  isOpen() {
    return this.modalEl && this.modalEl.classList.contains('is-open');
  }

  checkInitialHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#policy-')) {
      const key = hash.replace('#policy-', '');
      if (POLICY_DATA[key]) {
        setTimeout(() => this.open(key), 300);
      }
    }
  }
}

let policyModalInstance = null;

export function initPolicyModal() {
  if (!policyModalInstance) {
    policyModalInstance = new PolicyModalController();
  }
  return policyModalInstance;
}
