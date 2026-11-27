/**
 * Vidhyut Saathi - Unified Shared Shopping Cart Engine
 *
 * Manages shared cart across all pages (Home, Categories, Buy Now, Drawer).
 * Persists in localStorage ('vs_cart') and synchronizes across tabs & navigation.
 */

const SHOPIFY_VARIANT_MAP = {
  'meco-clamp-meter': '51169682128966',
  'vidhyut-saver-card': '51169684095046',
  'saver-card': '51169684095046',
  'industrial-clamp-series': '51169685831750',
  'new-product': '51169687470150',
  'sl-15w': '51169689043014',
  'sl-30w': '51169689108550',
  'sl-60w': '51169689141318',
  'step-4p': '51169691336774',
  'step-4pk': '51169691336774',
  'step-8p': '51169691369542',
  'step-8pk': '51169691369542',
  'sec-1x': '51169693073478',
  'mot-std': '51169693073478',
  'mot-remote': '51169693106246',
  'sec-2x': '51169693139014',
  'sconce-1x': '51169695531078',
  'vnt-1x': '51169695531078',
  'sconce-2x': '51169695563846',
  'vnt-2x': '51169695563846',
  'll-20w': '51169697333318',
  'll-36w': '51169697366086',
  'll-48w': '51169697398854',
  'work-50w': '51169699364934',
  'work-100w': '51169699397702',
  'tower-std': '51169701232710',
  'tower-pro': '51169701265478',
  'wal-1x': '51169703264326',
  'wal-2x': '51169703297094',
  'lb-9w-4p': '51169705132102',
  'lb-12w-4p': '51169705164870',
  'lb-18w-2p': '51169705197638',
  'sh-1b': '51169707556934',
  'sh-2b': '51169707589702',
  'dc-7w': '51169709260870',
  'dc-12w': '51169709293638',
  'dc-3pk': '51169709326406',
  'fest-5m': '51169710309446',
  'fest-10m': '51169710342214',
  'cm-400a': '51169710800966',
  'cm-600a': '51169710833734',
  'cm-1000a': '51169710866502',
  'meco-std': '51169711358022',
  'meco-cal': '51169711390790',
  'them-kit': '51169711849542',
  'dt87-std': '51169712799814',
  'sg997-pro': '51169714110534',
  'sg997-dlx': '51169714143302'
};

function resolveShopifyVariantId(item) {
  if (!item) return null;
  const candidates = [item.shopifyVariantId, item.variantId, item.productId];
  for (const c of candidates) {
    if (!c) continue;
    const mapped = SHOPIFY_VARIANT_MAP[String(c)];
    if (mapped) return Number(mapped);
    const num = Number(c);
    if (Number.isInteger(num) && num > 0) return num;
  }
  return null;
}

export function getAssetUrl(filename) {
  if (!filename) filename = 'solar-lights.jpg';
  if (typeof window !== 'undefined' && window.VidhyutThemeAssets && window.VidhyutThemeAssets[filename]) {
    return window.VidhyutThemeAssets[filename];
  }
  if (typeof window !== 'undefined' && (window.Shopify || (window.location && window.location.hostname && window.location.hostname.includes('myshopify.com')))) {
    const domAsset = document.querySelector('img[src*="/cdn/shop/t/"][src*="/assets/"]');
    if (domAsset && domAsset.src) {
      const prefix = domAsset.src.substring(0, domAsset.src.indexOf('/assets/') + 8);
      return prefix + filename;
    }
  }
  return `/assets/images/products/${filename}`;
}

export function getProductsPageUrl() {
  if (typeof window !== 'undefined' && (window.Shopify || (window.location && window.location.hostname && window.location.hostname.includes('myshopify.com')))) {
    return '/pages/products';
  }
  return '/products.html';
}

if (typeof window !== 'undefined') {
  window.vidhyutAssetUrl = getAssetUrl;
  window.vidhyutProductsUrl = getProductsPageUrl;
  window.vidhyutAssetFallback = function(imgEl, filename) {
    if (!imgEl || imgEl._hasFallenBack) return;
    imgEl._hasFallenBack = true;
    const target = getAssetUrl(filename || 'solar-lights.jpg');
    if (imgEl.src !== target) {
      imgEl.src = target;
    }
  };
}

export function resolveItemImage(item) {
  let raw = '';
  if (item && item.image && typeof item.image === 'string' && item.image.trim() !== '' && item.image !== 'undefined' && item.image !== 'null') {
    raw = item.image.trim();
  }

  if (raw) {
    if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('//') || raw.startsWith('data:') || raw.startsWith('blob:')) {
      return raw;
    }
  }

  // Extract filename from raw path
  let filename = '';
  if (raw) {
    const clean = raw.split('?')[0].split('#')[0];
    const lastSlash = clean.lastIndexOf('/');
    filename = lastSlash > -1 ? clean.substring(lastSlash + 1) : clean;
  }

  // Known asset alias map
  const aliasMap = {
    'solar-vintage-wall-lantern.jpg': 'solar-led-lamps-3.jpg',
    'solar-flood-lights.jpg': 'solar-led-lamps-1.jpg',
    'wires-cables.jpg': 'led-lamps.jpg'
  };
  if (aliasMap[filename]) {
    filename = aliasMap[filename];
  }

  const knownImages = [
    'solar-lights.jpg', 'solar-lights-1.jpg',
    'solar-led-lamps-1.jpg', 'solar-led-lamps-2.jpg', 'solar-led-lamps-3.jpg', 'solar-led-lamps-4.jpg',
    'led-lamps.jpg',
    'led-bulbs.jpg', 'led-bulb-1.jpg', 'led-bulb-2.jpg', 'led-bulb-3.jpg', 'led-bulb-4.jpg',
    'clamp-meters.jpg', 'clamp-meter-1.jpg', 'clamp-meter-2.jpg', 'clamp-meter-3.jpg', 'clamp-meter-4.jpg',
    'vidhyut-power-saver-card.jpg'
  ];

  if (filename && knownImages.includes(filename)) {
    return getAssetUrl(filename);
  }

  // Infer from product metadata if filename was missing or unknown
  const pid = (item?.productId || '').toLowerCase();
  const vid = (item?.variantId || '').toLowerCase();
  const name = (item?.name || '').toLowerCase();

  // Solar items
  if (pid.includes('solar-step') || vid.startsWith('step-') || name.includes('step') || name.includes('deck')) {
    return getAssetUrl('solar-lights-1.jpg');
  }
  if (pid.includes('motion') || vid.startsWith('sec-') || name.includes('motion') || name.includes('security')) {
    return getAssetUrl('solar-led-lamps-2.jpg');
  }
  if (pid.includes('vintage') || pid.includes('lantern') || vid.startsWith('sconce-') || name.includes('lantern') || name.includes('sconce')) {
    return getAssetUrl('solar-led-lamps-3.jpg');
  }
  if (pid.includes('work') || vid.startsWith('work-') || name.includes('work lamp') || name.includes('portable')) {
    return getAssetUrl('solar-led-lamps-1.jpg');
  }
  if (pid.includes('tower') || vid.startsWith('tower-') || name.includes('tower')) {
    return getAssetUrl('solar-led-lamps-4.jpg');
  }
  if (pid.includes('wal-') || vid.startsWith('wal-') || name.includes('architectural wall')) {
    return getAssetUrl('solar-led-lamps-3.jpg');
  }
  if (pid.includes('solar') || vid.startsWith('sl-') || name.includes('solar')) {
    return getAssetUrl('solar-lights.jpg');
  }

  // Bulbs
  if (pid.includes('camping') || vid.startsWith('sh-') || name.includes('camping') || name.includes('filament')) {
    return getAssetUrl('led-bulb-1.jpg');
  }
  if (pid.includes('battery-clip') || vid.startsWith('dc-') || name.includes('12v') || name.includes('battery clip')) {
    return getAssetUrl('led-bulb-2.jpg');
  }
  if (pid.includes('crystal') || pid.includes('festoon') || vid.startsWith('fest-') || name.includes('festoon') || name.includes('bubble globe')) {
    return getAssetUrl('led-bulb-4.jpg');
  }
  if (pid.includes('bulb') || vid.startsWith('lb-') || name.includes('bulb')) {
    return getAssetUrl('led-bulbs.jpg');
  }

  // Clamp meters
  if (pid.includes('meco') || vid.startsWith('meco-') || name.includes('meco')) {
    return getAssetUrl('clamp-meter-1.jpg');
  }
  if (pid.includes('themisto') || vid.startsWith('them-') || name.includes('themisto')) {
    return getAssetUrl('clamp-meter-2.jpg');
  }
  if (pid.includes('dt87') || vid.startsWith('dt87-') || name.includes('dt87')) {
    return getAssetUrl('clamp-meter-3.jpg');
  }
  if (pid.includes('sg997') || vid.startsWith('sg997-') || name.includes('sg997') || name.includes('sigma')) {
    return getAssetUrl('clamp-meter-4.jpg');
  }
  if (pid.includes('clamp') || vid.startsWith('cm-') || name.includes('clamp') || name.includes('meter')) {
    return getAssetUrl('clamp-meters.jpg');
  }

  // LED Lamps
  if (pid.includes('led-lamps') || pid.includes('led-linear') || vid.startsWith('ll-') || name.includes('led lamp') || name.includes('linear') || name.includes('suspended')) {
    return getAssetUrl('led-lamps.jpg');
  }

  // Vidhyut Saathi Power Saver Card
  if (pid.includes('saver-card') || pid.includes('vidhyut-saver') || vid.includes('card') || vid.startsWith('vsc-') || name.includes('saver card') || name.includes('power saver')) {
    return getAssetUrl('vidhyut-power-saver-card.jpg');
  }

  // Halonix Solar Floodlight
  if (pid.includes('halonix') || vid.startsWith('hx-') || name.includes('halonix')) {
    return getAssetUrl('solar-lights-1.jpg');
  }

  // Multiple Clamp Meters
  if (pid.includes('industrial-clamp') || name.includes('multiple clamp')) {
    return getAssetUrl('clamp-meters.jpg');
  }

  return getAssetUrl('solar-lights.jpg');
}

export function getItemPricing(item) {
  const price = Number(item.price) || 0;
  let mrp = Number(item.originalPrice || item.mrp);
  if (!mrp || mrp <= price) {
    if (price >= 3000) {
      mrp = Math.round((price * 1.35) / 100) * 100 - 1;
    } else if (price >= 1500) {
      mrp = Math.round((price * 1.45) / 100) * 100 - 1;
    } else if (price >= 800) {
      mrp = Math.round((price * 1.5) / 50) * 50 - 1;
    } else {
      mrp = Math.round((price * 1.6) / 50) * 50 - 1;
    }
  }
  const discount = mrp - price;
  const discountPercent = Math.max(5, Math.round((discount / mrp) * 100));
  return { price, mrp, discount, discountPercent };
}

export function startCartCountdown() {
  function tick() {
    const timerEls = document.querySelectorAll('.vs-cart-timer, #cartTimer');
    if (!timerEls.length) return;
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    let diffMs = midnight.getTime() - now.getTime();
    if (diffMs <= 0) diffMs = 12 * 3600 * 1000 + 8 * 60 * 1000 + 44 * 1000;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

    const hStr = hours < 10 ? '0' + hours : hours;
    const mStr = mins < 10 ? '0' + mins : mins;
    const sStr = secs < 10 ? '0' + secs : secs;
    const timeStr = `${hStr}h : ${mStr}m : ${sStr}s`;

    timerEls.forEach(el => {
      el.textContent = timeStr;
    });
  }
  tick();
  if (typeof window !== 'undefined' && !window._vsCartTimerSet) {
    window._vsCartTimerSet = true;
    setInterval(tick, 1000);
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const QUICK_ADD_UPSELLS = [
  {
    productId: 'new-product',
    variantId: 'new-product',
    name: 'BK-100 Solar Motion Wall Lamp',
    variantName: '600LM Solar + USB',
    price: 300,
    originalPrice: 599,
    image: 'https://vidhyutsaathi.in/cdn/shop/files/led_light.avif?v=1795679123&width=600'
  },
  {
    productId: 'dc-12v-battery-clip-bulb',
    variantId: 'dc-7w',
    name: '12V DC Emergency Bulb + Clips',
    variantName: '7W 12V DC Bulb',
    price: 349,
    originalPrice: 480,
    image: 'led-bulb-2.jpg'
  },
  {
    productId: 'dt87-pocket-clamp-meter',
    variantId: 'dt87-std',
    name: 'DT-87 Pocket Clamp Meter',
    variantName: 'Handheld Tester + Leads',
    price: 999,
    originalPrice: 1350,
    image: 'clamp-meter-3.jpg'
  }
];

export class VidhyutCart {
  constructor() {
    this.storageKey = 'vs_cart';
    this.cart = this.loadCart();
    this.isDrawerOpen = false;
    this.isCheckingOut = false;
    this.processingVariant = null;
    try {
      this.orderGstin = localStorage.getItem('vs_order_gstin') || '';
      this.orderNote = localStorage.getItem('vs_order_note') || '';
    } catch (e) {
      this.orderGstin = '';
      this.orderNote = '';
    }

    this.init();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];

      let modified = false;
      const sanitized = parsed.map(item => {
        const resolved = resolveItemImage(item);
        if (item.image !== resolved) {
          item.image = resolved;
          modified = true;
        }
        return item;
      });

      if (modified) {
        localStorage.setItem(this.storageKey, JSON.stringify(sanitized));
      }
      return sanitized;
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
      this.updateBadges();
      this.renderDrawer();
      this.renderCartPage();

      // Dispatch custom event for cross-component and multi-tab synchronization
      window.dispatchEvent(new CustomEvent('vs:cart-updated', {
        detail: { cart: this.cart, count: this.getItemCount(), subtotal: this.getSubtotal() }
      }));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }

  init() {
    // Synchronize across browser tabs
    window.addEventListener('storage', (e) => {
      if (e.key === this.storageKey) {
        this.cart = this.loadCart();
        this.updateBadges();
        this.renderDrawer();
        this.renderCartPage();
      }
    });

    // Update UI on load
    this.updateBadges();
    this.initDrawerUI();
    this.renderCartPage();

    // Listen for custom add-to-cart clicks from any product cards
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-add-to-cart]');
      if (!btn) return;
      e.preventDefault();

      if (btn.disabled || btn.classList.contains('is-loading')) return;

      const productId = btn.getAttribute('data-product-id');
      const variantId = btn.getAttribute('data-variant-id') || null;
      const qtyInput = btn.closest('.vs-product-card, .vs-gallery-card, .vs-product-showcase, .vs-all-prod-card')
        ?.querySelector('[data-qty-input]');
      const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;

      this.handleCardAdd(btn, productId, variantId, quantity);
    });

    // Listen for variant selection changes to dynamically update card price display
    document.addEventListener('change', (e) => {
      const select = e.target.closest('[data-variant-select]');
      if (!select) return;
      const card = select.closest('.vs-product-card, .vs-gallery-card, .vs-all-prod-card');
      if (!card) return;
      const priceDisplay = card.querySelector('.vs-all-prod-price, .vs-gallery-price, .vs-product-price, .vs-card-price-val');
      const selectedOpt = select.options[select.selectedIndex];
      const price = selectedOpt?.getAttribute('data-price');
      if (priceDisplay && price) {
        priceDisplay.textContent = `₹${parseInt(price, 10).toLocaleString('en-IN')}`;
      }
    });

    // Listen for catalogue filter button clicks
    document.addEventListener('click', (e) => {
      const filterBtn = e.target.closest('[data-catalogue-filter]');
      if (!filterBtn) return;
      e.preventDefault();
      const category = filterBtn.getAttribute('data-catalogue-filter');
      document.querySelectorAll('[data-catalogue-filter]').forEach(b => b.classList.remove('is-active'));
      filterBtn.classList.add('is-active');

      document.querySelectorAll('.vs-all-prod-card').forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  handleCardAdd(btn, productId, variantId, quantity = 1) {
    btn.disabled = true;
    btn.classList.add('is-loading');

    // Retrieve product metadata from card attributes or config
    const card = btn.closest('.vs-product-card, .vs-gallery-card, .vs-all-prod-card, .vs-product-showcase');
    const name = card?.getAttribute('data-product-name') || btn.getAttribute('data-product-name') || 'Vidhyut Saathi Product';
    const variantSelect = card?.querySelector('[data-variant-select]');
    const activeVariantId = variantSelect ? variantSelect.value : (variantId || btn.getAttribute('data-variant-id') || productId || 'standard');
    const variantName = variantSelect?.options[variantSelect.selectedIndex]?.text || btn.getAttribute('data-variant-name') || 'Standard Model';
    const priceAttr = variantSelect?.options[variantSelect.selectedIndex]?.getAttribute('data-price') || btn.getAttribute('data-price');
    const cleanPriceAttr = priceAttr ? priceAttr.toString().replace(/[^0-9]/g, '') : '';
    const price = cleanPriceAttr ? parseInt(cleanPriceAttr, 10) : 1999;
    const activeImg = card?.querySelector('.vs-product-image-wrap img, .vs-product-img, .vs-gallery-img, .vs-card-slide.is-active img, img');
    const cardImgSrc = activeImg ? (activeImg.currentSrc || activeImg.src || activeImg.getAttribute('src')) : '';
    const image = cardImgSrc || btn.getAttribute('data-image') || '/assets/images/products/solar-lights.jpg';

    this.addItem({
      productId: productId || 'product',
      variantId: activeVariantId,
      name,
      variantName,
      price,
      quantity,
      image
    });

    setTimeout(() => {
      btn.disabled = false;
      btn.classList.remove('is-loading');
    }, 400);
  }

  addItem(item) {
    if (!item || !item.variantId) return;

    const existingIndex = this.cart.findIndex(i => i.variantId === item.variantId);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += (item.quantity || 1);
      if (item.originalPrice && !this.cart[existingIndex].originalPrice) {
        this.cart[existingIndex].originalPrice = item.originalPrice;
      }
      if (!this.cart[existingIndex].image || this.cart[existingIndex].image === 'undefined') {
        this.cart[existingIndex].image = resolveItemImage(item);
      }
    } else {
      this.cart.push({
        productId: item.productId || 'product',
        variantId: item.variantId,
        name: item.name || 'Vidhyut Saathi Product',
        variantName: item.variantName || 'Standard Variant',
        price: Number(item.price) || 0,
        originalPrice: item.originalPrice || null,
        quantity: Math.max(1, Number(item.quantity) || 1),
        image: resolveItemImage(item)
      });
    }

    this.saveCart();
    this.showToast(`Added ${item.quantity || 1} × ${item.name} to cart.`);
    this.openDrawer();
  }

  updateQuantity(variantId, newQty) {
    const qty = parseInt(newQty, 10);
    const index = this.cart.findIndex(i => i.variantId === variantId);
    if (index === -1) return;

    if (isNaN(qty) || qty <= 0) {
      this.removeItem(variantId);
    } else {
      this.cart[index].quantity = Math.min(99, Math.max(1, qty));
      this.saveCart();
    }
  }

  removeItem(variantId) {
    const item = this.cart.find(i => i.variantId === variantId);
    const itemName = item ? item.name : 'Item';
    this.cart = this.cart.filter(i => i.variantId !== variantId);
    this.saveCart();
    this.showToast(`Removed ${itemName} from cart.`);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.showToast('Your shopping cart has been cleared.');
  }

  getItems() {
    return this.cart;
  }

  getItemCount() {
    return this.cart.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  getSubtotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateBadges() {
    const count = this.getItemCount();
    const countStr = count > 99 ? '99+' : count.toString();

    document.querySelectorAll('.vs-navbar-cart-count, #navbarCartBadge, #mobileNavbarCartBadge, #floatingCartBadge, #cartBadgeCount')
      .forEach(badge => {
        badge.textContent = countStr;
        if (count > 0) {
          badge.classList.add('has-items');
          badge.style.display = 'inline-flex';
        } else {
          badge.classList.remove('has-items');
          // Still show 0 or hide depending on badge design
          if (badge.id === 'navbarCartBadge' || badge.id === 'mobileNavbarCartBadge') {
            badge.style.display = count === 0 ? 'inline-flex' : 'inline-flex';
          }
        }
      });
  }

  initDrawerUI() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    const closeBtn = document.getElementById('cartDrawerClose');
    const floatingBtn = document.getElementById('floatingCartBtn');
    const checkoutBtn = document.getElementById('cartCheckoutBtn');
    const continueBtn = document.getElementById('cartContinueBtn');

    // Force hidden state on initialization to prevent any FOUC flash
    if (drawer && !drawer.classList.contains('is-open')) {
      drawer.style.display = 'none';
    }
    if (backdrop && !backdrop.classList.contains('is-open')) {
      backdrop.style.display = 'none';
    }

    if (floatingBtn) {
      floatingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeDrawer());
    }

    if (continueBtn) {
      continueBtn.addEventListener('click', () => this.closeDrawer());
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.proceedToCheckout());
    }

    // Initialize coupon accordion
    const couponToggle = document.getElementById('cartCouponToggle');
    const couponContent = document.getElementById('cartCouponContent');
    if (couponToggle && couponContent) {
      couponToggle.addEventListener('click', () => {
        const isOpen = couponContent.style.display !== 'none';
        couponContent.style.display = isOpen ? 'none' : 'block';
        couponToggle.setAttribute('aria-expanded', !isOpen);
        const chevron = couponToggle.querySelector('.vs-chevron-icon');
        if (chevron) chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    }

    // Coupon apply click handlers
    document.querySelectorAll('[data-apply-coupon]').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-apply-coupon');
        this.applyCoupon(code);
      });
    });

    const applyManualBtn = document.getElementById('applyCouponBtn');
    const couponInput = document.getElementById('couponCodeInput');
    if (applyManualBtn && couponInput) {
      applyManualBtn.addEventListener('click', () => {
        const code = couponInput.value.trim();
        if (code) {
          this.applyCoupon(code);
        }
      });
    }

    // Initialize order summary accordion
    const summaryToggle = document.getElementById('summaryToggle');
    const summaryDetails = document.getElementById('summaryDetails');
    if (summaryToggle && summaryDetails) {
      summaryToggle.addEventListener('click', () => {
        const isOpen = summaryDetails.style.display !== 'none';
        summaryDetails.style.display = isOpen ? 'none' : 'block';
        summaryToggle.setAttribute('aria-expanded', !isOpen);
        const chevron = summaryToggle.querySelector('.vs-summary-chevron');
        if (chevron) chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    }

    // Start real-time sale urgency timer
    startCartCountdown();

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isDrawerOpen) {
        this.closeDrawer();
      }
    });

    this.renderDrawer();
  }

  applyCoupon(code) {
    const cleanCode = (code || '').toUpperCase().trim();
    if (!cleanCode) return;

    if (cleanCode === 'FREESHIP') {
      this.couponCode = 'FREESHIP';
      this.couponDiscount = 0;
      this.showToast('Coupon FREESHIP applied! Free Delivery active.');
      this.renderDrawer();
      this.renderCartPage();
    } else {
      this.showToast(`Coupon "${cleanCode}" is invalid or expired.`);
    }
  }

  openDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (!drawer) return;

    this.renderDrawer();
    drawer.style.display = 'flex';
    if (backdrop) backdrop.style.display = 'block';
    // Force browser reflow so transition runs cleanly
    void drawer.offsetHeight;
    drawer.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.classList.add('vs-drawer-locked');
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (!drawer) return;

    drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.classList.remove('vs-drawer-locked');
    this.isDrawerOpen = false;

    // Remove from layout after slide animation finishes
    setTimeout(() => {
      if (!this.isDrawerOpen) {
        drawer.style.display = 'none';
        if (backdrop) backdrop.style.display = 'none';
      }
    }, 380);
  }

  renderDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const container = document.getElementById('cartItemsWrap');
    const totalEl = document.getElementById('cartTotalVal');
    const drawerBadge = document.getElementById('cartBadgeCount');
    const checkoutBtn = document.getElementById('cartCheckoutBtn');
    const urgencyBar = document.getElementById('cartUrgencyBar');
    const shippingBar = document.getElementById('cartShippingBar');
    const extraWidgets = document.getElementById('cartExtraWidgets');
    const footerEl = document.getElementById('cartDrawerFooter') || drawer?.querySelector('.vs-cart-footer');
    if (!container) return;

    const count = this.getItemCount();
    const subtotal = this.getSubtotal();

    if (drawerBadge) {
      drawerBadge.textContent = count > 0 ? `(${count})` : '(0)';
    }

    if (this.cart.length === 0) {
      if (urgencyBar) urgencyBar.style.display = 'none';
      if (shippingBar) shippingBar.style.display = 'none';
      if (extraWidgets) extraWidgets.style.display = 'none';
      if (footerEl) footerEl.style.display = 'none';

      container.innerHTML = `
        <div class="vs-cart-empty">
          <div class="vs-cart-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h4 class="vs-cart-empty-title">Your Cart is Empty</h4>
          <p class="vs-cart-empty-text">Browse our solar and electrical product lines and add items to your cart.</p>
          <a href="${getProductsPageUrl()}" class="vs-btn vs-btn-accent vs-btn-sm" onclick="window.vsCart?.closeDrawer()">
            Explore Products
          </a>
        </div>
      `;
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (urgencyBar) urgencyBar.style.display = 'flex';
    if (shippingBar) shippingBar.style.display = 'block';
    if (extraWidgets) extraWidgets.style.display = 'flex';
    if (footerEl) footerEl.style.display = 'flex';
    if (checkoutBtn) checkoutBtn.disabled = false;

    let totalMrp = 0;
    container.innerHTML = this.cart.map(item => {
      const pricing = getItemPricing(item);
      const lineMrp = pricing.mrp * item.quantity;
      totalMrp += lineMrp;
      const img = resolveItemImage(item);
      const variantName = item.variantName || 'Standard Variant';

      return `
        <div class="vs-cart-item" data-variant-id="${item.variantId}">
          <img src="${img}" alt="${item.name}" class="vs-cart-item-img" width="78" height="78" loading="lazy" onerror="window.vidhyutAssetFallback && window.vidhyutAssetFallback(this, 'solar-lights.jpg');">
          <div class="vs-cart-item-info">
            <h4 class="vs-cart-item-title">${item.name}</h4>
            
            <div class="vs-cart-item-price-row">
              <span class="vs-cart-item-price">₹${pricing.price.toLocaleString('en-IN')}</span>
              <span class="vs-cart-item-mrp">₹${pricing.mrp.toLocaleString('en-IN')}</span>
              <span class="vs-cart-item-discount">₹${pricing.discount.toLocaleString('en-IN')} OFF</span>
            </div>

            <div class="vs-cart-item-desc-lines">
              <div class="vs-cart-desc-line"><span class="vs-desc-label">Model:</span> <span class="vs-desc-val">${variantName}</span></div>
              <div class="vs-cart-desc-line"><span class="vs-desc-label">Warranty:</span> <span class="vs-desc-val">1 Year Official Brand Warranty</span></div>
            </div>

            <div class="vs-cart-item-bottom">
              <div class="vs-cart-item-stepper">
                <button type="button" class="vs-cart-step-btn" data-step-dec="${item.variantId}" aria-label="Decrease quantity">&minus;</button>
                <span class="vs-cart-step-val">${item.quantity}</span>
                <button type="button" class="vs-cart-step-btn" data-step-inc="${item.variantId}" aria-label="Increase quantity">&plus;</button>
              </div>
              <button type="button" class="vs-cart-item-remove" data-remove="${item.variantId}" aria-label="Remove item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const totalSavings = totalMrp - subtotal;
    const finalPayable = Math.max(0, subtotal - (this.couponDiscount || 0));

    if (totalEl) {
      totalEl.textContent = `Rs. ${finalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    const summaryMrpEl = document.getElementById('summaryMrpVal');
    if (summaryMrpEl) summaryMrpEl.textContent = `₹${totalMrp.toLocaleString('en-IN')}`;

    const summaryDiscountEl = document.getElementById('summaryDiscountVal');
    if (summaryDiscountEl) summaryDiscountEl.textContent = `-₹${(totalSavings + (this.couponDiscount || 0)).toLocaleString('en-IN')}`;

    const summaryCouponEl = document.getElementById('summaryCouponVal');
    if (summaryCouponEl) {
      if (this.couponCode) {
        if (this.couponDiscount > 0) {
          summaryCouponEl.textContent = `-₹${this.couponDiscount.toLocaleString('en-IN')} (${this.couponCode})`;
          summaryCouponEl.className = 'vs-text-green';
        } else {
          summaryCouponEl.textContent = `${this.couponCode} Applied ✓`;
          summaryCouponEl.className = 'vs-text-green';
        }
      } else {
        summaryCouponEl.textContent = 'No coupon applied';
        summaryCouponEl.className = 'vs-text-muted';
      }
    }

    // Attach row events
    container.querySelectorAll('[data-step-dec]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-step-dec');
        const item = this.cart.find(i => i.variantId === id);
        if (item) this.updateQuantity(id, item.quantity - 1);
      });
    });

    container.querySelectorAll('[data-step-inc]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-step-inc');
        const item = this.cart.find(i => i.variantId === id);
        if (item) this.updateQuantity(id, item.quantity + 1);
      });
    });

    container.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove');
        this.removeItem(id);
      });
    });
  }

  renderCartPage() {
    const pageContainer = document.getElementById('dedicatedCartReviewSection');
    if (!pageContainer) return;

    const subtotal = this.getSubtotal();
    const count = this.getItemCount();

    if (this.cart.length === 0) {
      pageContainer.innerHTML = `
        <div class="vs-cart-page-empty">
          <div class="vs-empty-state-card">
            <div class="vs-empty-cart-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h2 class="vs-empty-title">Your Cart is Empty</h2>
            <p class="vs-empty-desc">
              You haven't added any items to your shopping cart yet. Browse our solar lighting, smart saver card, and clamp meter lineup below.
            </p>
            <div class="vs-empty-actions">
              <a href="#productShowcase" class="vs-btn vs-btn-accent">
                Configure a Product
              </a>
            </div>
          </div>
        </div>
      `;
      return;
    }

    let totalMrp = 0;
    const rowsHtml = this.cart.map(item => {
      const pricing = getItemPricing(item);
      totalMrp += pricing.mrp * item.quantity;
      const img = resolveItemImage(item);
      const lineSave = pricing.discount * item.quantity;

      return `
        <div class="vs-cart-table-row" data-variant-id="${escapeHtml(item.variantId)}">
          <div class="vs-cart-cell-prod">
            <img src="${escapeHtml(img)}" alt="${escapeHtml(item.name)}" class="vs-cart-row-thumb" width="72" height="72" loading="lazy" onerror="window.vidhyutAssetFallback && window.vidhyutAssetFallback(this, 'solar-lights.jpg');">
            <div class="vs-cart-row-details">
              <h3 class="vs-cart-row-title">${escapeHtml(item.name)}</h3>
              <div class="vs-cart-row-variant">${escapeHtml(item.variantName)}</div>
              <div class="vs-cart-row-warranty">✓ 1-Year Brand Warranty &bull; GST Included</div>
              <button type="button" class="vs-cart-row-remove" data-remove="${escapeHtml(item.variantId)}">
                <span>Remove</span>
              </button>
            </div>
          </div>
          <div class="vs-cart-cell-price">
            <div class="vs-cart-row-pricing">
              <span>₹${pricing.price.toLocaleString('en-IN')}</span>
              <span class="vs-cart-row-mrp">₹${pricing.mrp.toLocaleString('en-IN')}</span>
              <span class="vs-cart-row-save">Save ₹${lineSave.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div class="vs-cart-cell-qty">
            <div class="vs-table-stepper">
              <button type="button" class="vs-stepper-btn" data-step-dec="${escapeHtml(item.variantId)}" aria-label="Decrease">&minus;</button>
              <span class="vs-stepper-val">${item.quantity}</span>
              <button type="button" class="vs-stepper-btn" data-step-inc="${escapeHtml(item.variantId)}" aria-label="Increase">&plus;</button>
            </div>
          </div>
          <div class="vs-cart-cell-total">₹${(pricing.price * item.quantity).toLocaleString('en-IN')}</div>
        </div>
      `;
    }).join('');

    const totalSavings = Math.max(0, totalMrp - subtotal) + (this.couponDiscount || 0);
    const finalPayable = Math.max(0, subtotal - (this.couponDiscount || 0));
    const paymentBadgesUrl = '/assets/images/payment-trust-badges.png';

    const upsellsHtml = QUICK_ADD_UPSELLS.map((up, idx) => {
      const upImg = up.image.startsWith('http') ? up.image : getAssetUrl(up.image);
      return `
        <div class="vs-cart-upsell-card">
          <img src="${escapeHtml(upImg)}" alt="${escapeHtml(up.name)}" class="vs-cart-upsell-img" loading="lazy">
          <div class="vs-cart-upsell-info">
            <div class="vs-cart-upsell-name">${escapeHtml(up.name)}</div>
            <div class="vs-cart-upsell-price">₹${up.price.toLocaleString('en-IN')}</div>
          </div>
          <button type="button" class="vs-cart-upsell-btn" data-upsell-idx="${idx}">+ Add</button>
        </div>
      `;
    }).join('');

    pageContainer.innerHTML = `
      <div class="vs-cart-savings-banner">
        <span>✓ <strong>Free Pan-India Express Delivery Unlocked</strong> &bull; Priority dispatch from Rohtak</span>
        <span>Total Savings: <strong>₹${totalSavings.toLocaleString('en-IN')}</strong></span>
      </div>

      <div class="vs-cart-review-layout">
        <div class="vs-cart-items-col-wrap">
          <div class="vs-cart-items-column">
            <div class="vs-cart-items-header">
              <span class="vs-cart-col-prod">Product</span>
              <span class="vs-cart-col-price">Unit Price</span>
              <span class="vs-cart-col-qty">Quantity</span>
              <span class="vs-cart-col-total">Total</span>
            </div>

            <div class="vs-cart-table-rows">${rowsHtml}</div>

            <div class="vs-cart-b2b-box">
              <div class="vs-cart-b2b-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                <span>B2B GST Invoice &amp; Delivery Instructions (Optional)</span>
              </div>
              <div class="vs-cart-b2b-grid">
                <input type="text" id="pageCartGstin" class="vs-cart-b2b-input" maxlength="15" placeholder="15-Digit GSTIN (for Business Tax Credit)" value="${escapeHtml(this.gstin || this.orderGstin)}">
                <input type="text" id="pageCartNote" class="vs-cart-b2b-input" maxlength="200" placeholder="Company Name or Delivery Instructions" value="${escapeHtml(this.orderNote)}">
              </div>
            </div>

            <div class="vs-cart-table-footer">
              <a href="#productShowcase" class="vs-continue-shopping-link">&larr; Add More Products</a>
              <button type="button" class="vs-clear-cart-link" id="clearCartBtn">Clear Cart</button>
            </div>
          </div>

          <div class="vs-cart-upsell-panel">
            <div class="vs-cart-upsell-heading">Frequently Added Accessories &amp; Tools</div>
            <div class="vs-cart-upsell-grid">${upsellsHtml}</div>
          </div>
        </div>

        <div class="vs-cart-summary-column">
          <div class="vs-order-summary-card">
            <h3 class="vs-summary-heading">Order Summary</h3>
            <div class="vs-cart-page-coupon-row">
              <input type="text" id="pageCouponInput" class="vs-coupon-input" placeholder="Promo code (e.g. FREESHIP)" value="${escapeHtml(this.couponCode || '')}">
              <button type="button" id="pageApplyCouponBtn" class="vs-coupon-apply-btn">Apply</button>
            </div>
            <div class="vs-summary-rows">
              <div class="vs-summary-row"><span>Bag Total (MRP)</span><span>₹${totalMrp.toLocaleString('en-IN')}</span></div>
              <div class="vs-summary-row vs-text-discount"><span>Total Savings (${count} items)</span><span>-₹${totalSavings.toLocaleString('en-IN')}</span></div>
              <div class="vs-summary-row"><span>Coupon Discount</span><span class="${this.couponCode ? 'vs-text-green' : 'vs-text-muted'}">${this.couponCode ? `${escapeHtml(this.couponCode)} Applied ✓` : 'No coupon applied'}</span></div>
              <div class="vs-summary-row"><span>Express Delivery</span><span class="vs-summary-badge-free">FREE</span></div>
              <div class="vs-summary-divider"></div>
              <div class="vs-summary-row vs-summary-total"><span>Total Payable</span><span class="vs-summary-grand-total">₹${finalPayable.toLocaleString('en-IN')}</span></div>
            </div>
            <button type="button" class="vs-btn vs-btn-accent vs-btn-block vs-btn-checkout-primary" id="pageCheckoutBtn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>Proceed to Checkout (PhonePe / UPI)</span>
            </button>
            <div class="vs-summary-payment-box">
              <div class="vs-summary-security" style="margin-top:0;">100% Secure Payment &bull; 7-Day Replacement &bull; Brand Warranty</div>
              <img src="${escapeHtml(paymentBadgesUrl)}" alt="PhonePe, GPay, Paytm, Visa, RuPay, Mastercard" class="vs-summary-payment-img" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    `;

    pageContainer.querySelectorAll('[data-step-dec]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-step-dec');
        const item = this.cart.find(i => i.variantId === id);
        if (item) this.updateQuantity(id, item.quantity - 1);
      });
    });

    pageContainer.querySelectorAll('[data-step-inc]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-step-inc');
        const item = this.cart.find(i => i.variantId === id);
        if (item) this.updateQuantity(id, item.quantity + 1);
      });
    });

    pageContainer.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove');
        this.removeItem(id);
      });
    });

    pageContainer.querySelectorAll('[data-upsell-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-upsell-idx'), 10);
        const up = QUICK_ADD_UPSELLS[idx];
        if (up) {
          this.addItem({
            productId: up.productId,
            variantId: up.variantId,
            name: up.name,
            variantName: up.variantName,
            price: up.price,
            originalPrice: up.originalPrice,
            quantity: 1,
            image: up.image
          });
        }
      });
    });

    const gstinInput = pageContainer.querySelector('#pageCartGstin');
    if (gstinInput) {
      gstinInput.addEventListener('input', (e) => {
        this.orderGstin = (e.target.value || '').toUpperCase().trim();
        try { localStorage.setItem('vs_order_gstin', this.orderGstin); } catch (err) {}
      });
    }

    const noteInput = pageContainer.querySelector('#pageCartNote');
    if (noteInput) {
      noteInput.addEventListener('input', (e) => {
        this.orderNote = (e.target.value || '').trim();
        try { localStorage.setItem('vs_order_note', this.orderNote); } catch (err) {}
      });
    }

    const pageCouponBtn = pageContainer.querySelector('#pageApplyCouponBtn');
    const pageCouponInput = pageContainer.querySelector('#pageCouponInput');
    if (pageCouponBtn && pageCouponInput) {
      pageCouponBtn.addEventListener('click', () => {
        const code = pageCouponInput.value.trim();
        if (code) this.applyCoupon(code);
      });
    }

    const clearBtn = pageContainer.querySelector('#clearCartBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove all items from your cart?')) {
          this.clearCart();
        }
      });
    }

    const pageCheckoutBtn = pageContainer.querySelector('#pageCheckoutBtn');
    if (pageCheckoutBtn) {
      pageCheckoutBtn.addEventListener('click', () => this.proceedToCheckout());
    }
  }

  proceedToCheckout() {
    if (this.cart.length === 0) {
      this.showToast('Your cart is empty. Please add products first.');
      return;
    }

    if (this.isCheckingOut) return;

    const aggregated = new Map();
    for (const item of this.cart) {
      const vid = resolveShopifyVariantId(item);
      if (vid) {
        const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
        aggregated.set(vid, (aggregated.get(vid) || 0) + qty);
      }
    }

    const shopifyItems = Array.from(aggregated.entries()).map(([id, quantity]) => ({ id, quantity }));
    const rootRaw = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) ? window.Shopify.routes.root : '/';
    const root = rootRaw.endsWith('/') ? rootRaw : `${rootRaw}/`;

    if (shopifyItems.length > 0) {
      this.isCheckingOut = true;
      setTimeout(() => { this.isCheckingOut = false; }, 6000);
      this.showToast('Connecting to secure checkout...');

      const permalink = `${root}cart/${shopifyItems.map(i => `${i.id}:${i.quantity}`).join(',')}`;

      fetch(`${root}cart/clear.js`, { method: 'POST', credentials: 'same-origin' })
        .then(() => fetch(`${root}cart/add.js`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: shopifyItems })
        }))
        .then(res => {
          if (!res.ok) throw new Error(`Shopify cart/add.js failed: ${res.status}`);
          if (this.orderGstin || this.orderNote) {
            const noteParts = [];
            if (this.orderGstin) noteParts.push(`GSTIN: ${this.orderGstin}`);
            if (this.orderNote) noteParts.push(this.orderNote);
            return fetch(`${root}cart/update.js`, {
              method: 'POST',
              credentials: 'same-origin',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                note: noteParts.join(' | '),
                attributes: {
                  GSTIN: this.orderGstin || '',
                  OrderNote: this.orderNote || ''
                }
              })
            }).catch(() => {});
          }
        })
        .then(() => {
          window.location.href = `${root}checkout`;
        })
        .catch(err => {
          console.warn('Shopify cart sync error, using cart permalink checkout:', err);
          window.location.href = permalink;
        });
      return;
    }

    this.openWhatsAppCheckout();
  }

  openWhatsAppCheckout() {
    let summary = 'Vidhyut Saathi — Official Order Placement:\n\n';
    let grandTotal = 0;
    this.cart.forEach((item, index) => {
      const lineTotal = item.price * item.quantity;
      grandTotal += lineTotal;
      summary += `${index + 1}. ${item.name}\n   Model: ${item.variantName}\n   Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')} = ₹${lineTotal.toLocaleString('en-IN')}\n\n`;
    });
    summary += `Total Order Value: ₹${grandTotal.toLocaleString('en-IN')} (incl. GST & Free Delivery)\n`;
    summary += `\nPlease confirm shipping address & invoice details to dispatch.`;

    const encoded = encodeURIComponent(summary);
    const whatsappUrl = `https://wa.me/918199036060?text=${encoded}`;

    this.showToast('Opening Vidhyut Saathi Order Placement Desk on WhatsApp...');

    const win = window.open(whatsappUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
  }

  showToast(message) {
    let toast = document.getElementById('vsCartToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vsCartToast';
      toast.className = 'vs-cart-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${message}</span>
    `;

    toast.classList.add('is-visible');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  }
}

// Global initialization singleton
export function initSharedCart() {
  if (!window.vsCart) {
    window.vsCart = new VidhyutCart();
  }
  return window.vsCart;
}
