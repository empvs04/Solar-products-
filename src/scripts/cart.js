/**
 * Vidhyut Saathi - Unified Shared Shopping Cart Engine
 *
 * Manages shared cart across all pages (Home, Categories, Buy Now, Drawer).
 * Persists in localStorage ('vs_cart') and synchronizes across tabs & navigation.
 */

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

export class VidhyutCart {
  constructor() {
    this.storageKey = 'vs_cart';
    this.cart = this.loadCart();
    this.isDrawerOpen = false;
    this.processingVariant = null;

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
    const subtotal = this.getSubtotal();

    if (cleanCode === 'VIDHYUT10') {
      if (subtotal >= 1999) {
        this.couponDiscount = Math.round(subtotal * 0.10);
        this.couponCode = cleanCode;
        this.showToast(`Coupon VIDHYUT10 applied! You saved ₹${this.couponDiscount.toLocaleString('en-IN')}`);
        this.renderDrawer();
      } else {
        this.showToast('Coupon VIDHYUT10 is valid on orders of ₹1,999 or more.');
      }
    } else if (cleanCode === 'FREESHIP') {
      this.showToast('FREESHIP is already active! Standard delivery is 100% Free.');
    } else {
      this.showToast(`Coupon ${cleanCode} is invalid or expired.`);
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
              You haven't added any items to your shopping cart yet. Browse our solar lighting and electrical product range below to get started.
            </p>
            <div class="vs-empty-actions">
              <a href="${getProductsPageUrl()}" class="vs-btn vs-btn-accent">
                Explore Products
              </a>
            </div>
          </div>
        </div>
      `;
      return;
    }

    pageContainer.innerHTML = `
      <div class="vs-cart-review-layout">
        <!-- Left: Line Items List -->
        <div class="vs-cart-items-column">
          <div class="vs-cart-items-header">
            <span class="vs-cart-col-prod">Product</span>
            <span class="vs-cart-col-price">Unit Price</span>
            <span class="vs-cart-col-qty">Quantity</span>
            <span class="vs-cart-col-total">Total</span>
          </div>

          <div class="vs-cart-table-rows">
            ${this.cart.map(item => `
              <div class="vs-cart-table-row" data-variant-id="${item.variantId}">
                <div class="vs-cart-cell-prod">
                  <img src="${resolveItemImage(item)}" alt="${item.name}" class="vs-cart-row-thumb" width="72" height="72" loading="lazy" onerror="window.vidhyutAssetFallback && window.vidhyutAssetFallback(this, 'solar-lights.jpg');">
                  <div class="vs-cart-row-details">
                    <h3 class="vs-cart-row-title">${item.name}</h3>
                    <div class="vs-cart-row-variant">${item.variantName}</div>
                    <button type="button" class="vs-cart-row-remove" data-remove="${item.variantId}">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div class="vs-cart-cell-price">
                  ₹${item.price.toLocaleString('en-IN')}
                </div>

                <div class="vs-cart-cell-qty">
                  <div class="vs-table-stepper">
                    <button type="button" class="vs-stepper-btn" data-step-dec="${item.variantId}" aria-label="Decrease quantity">&minus;</button>
                    <input type="number" class="vs-stepper-input" value="${item.quantity}" min="1" max="99" data-input-qty="${item.variantId}">
                    <button type="button" class="vs-stepper-btn" data-step-inc="${item.variantId}" aria-label="Increase quantity">&plus;</button>
                  </div>
                </div>

                <div class="vs-cart-cell-total">
                  ₹${(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            `).join('')}
          </div>

          <div class="vs-cart-table-footer">
            <a href="${getProductsPageUrl()}" class="vs-continue-shopping-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
              <span>Continue Shopping</span>
            </a>
            <button type="button" class="vs-clear-cart-link" id="clearCartBtn">
              Clear All Items
            </button>
          </div>
        </div>

        <!-- Right: Order Summary Sidebar -->
        <div class="vs-cart-summary-column">
          <div class="vs-order-summary-card">
            <h3 class="vs-summary-heading">Order Summary</h3>

            <div class="vs-summary-rows">
              <div class="vs-summary-row">
                <span>Items in Cart (${count})</span>
                <span>₹${subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div class="vs-summary-row">
                <span>GST Tax (Included)</span>
                <span class="vs-summary-badge-free">Included (18%)</span>
              </div>
              <div class="vs-summary-row">
                <span>Standard Delivery</span>
                <span class="vs-summary-badge-free">FREE</span>
              </div>
              <div class="vs-summary-divider"></div>
              <div class="vs-summary-row vs-summary-total">
                <span>Estimated Total</span>
                <span class="vs-summary-grand-total">₹${subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button type="button" class="vs-btn vs-btn-accent vs-btn-block vs-btn-checkout-primary" id="pageCheckoutBtn">
              <span>Proceed to Payment</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <div class="vs-summary-security">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>Authentic Brand Warranty &bull; GST Invoice Provided</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach row events on dedicated page
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

    pageContainer.querySelectorAll('[data-input-qty]').forEach(input => {
      input.addEventListener('change', (e) => {
        const id = input.getAttribute('data-input-qty');
        const val = parseInt(e.target.value, 10);
        this.updateQuantity(id, isNaN(val) ? 1 : val);
      });
    });

    pageContainer.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove');
        this.removeItem(id);
      });
    });

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

    // Direct to Payment Gateway Coming Soon Page
    const targetUrl = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root ? window.Shopify.routes.root : '/') + 'pages/payment-coming-soon';
    window.location.href = targetUrl;
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
