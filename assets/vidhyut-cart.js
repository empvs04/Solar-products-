/**
 * Vidhyut Saathi - Shopify Theme Shared Cart & Drawer Script
 */
(function() {
  function getAssetUrl(filename) {
    if (!filename) filename = 'solar-lights.jpg';
    if (window.VidhyutThemeAssets && window.VidhyutThemeAssets[filename]) {
      return window.VidhyutThemeAssets[filename];
    }
    // Dynamic inspection of Shopify CDN prefix from any loaded asset in the DOM
    if (window.Shopify || (window.location && window.location.hostname && window.location.hostname.indexOf('myshopify.com') > -1)) {
      var domAsset = document.querySelector('img[src*="/cdn/shop/t/"][src*="/assets/"]');
      if (domAsset && domAsset.src) {
        var prefix = domAsset.src.substring(0, domAsset.src.indexOf('/assets/') + 8);
        return prefix + filename;
      }
    }
    return '/assets/images/products/' + filename;
  }
  window.vidhyutAssetUrl = getAssetUrl;

  window.vidhyutAssetFallback = function(imgEl, filename) {
    if (!imgEl || imgEl._hasFallenBack) return;
    imgEl._hasFallenBack = true;
    var target = getAssetUrl(filename || 'solar-lights.jpg');
    if (imgEl.src !== target) {
      imgEl.src = target;
    }
  };

  function resolveItemImage(item) {
    var raw = '';
    if (item && item.image && typeof item.image === 'string' && item.image.trim() !== '' && item.image !== 'undefined' && item.image !== 'null') {
      raw = item.image.trim();
    }

    if (raw) {
      if (raw.indexOf('http://') === 0 || raw.indexOf('https://') === 0 || raw.indexOf('//') === 0 || raw.indexOf('data:') === 0 || raw.indexOf('blob:') === 0) {
        return raw;
      }
    }

    // Extract filename from raw path
    var filename = '';
    if (raw) {
      var clean = raw.split('?')[0].split('#')[0];
      var lastSlash = clean.lastIndexOf('/');
      filename = lastSlash > -1 ? clean.substring(lastSlash + 1) : clean;
    }

    // Known asset alias map
    var aliasMap = {
      'solar-vintage-wall-lantern.jpg': 'solar-led-lamps-3.jpg',
      'solar-flood-lights.jpg': 'solar-led-lamps-1.jpg',
      'wires-cables.jpg': 'led-lamps.jpg'
    };
    if (aliasMap[filename]) {
      filename = aliasMap[filename];
    }

    var knownImages = [
      'solar-lights.jpg', 'solar-lights-1.jpg',
      'solar-led-lamps-1.jpg', 'solar-led-lamps-2.jpg', 'solar-led-lamps-3.jpg', 'solar-led-lamps-4.jpg',
      'led-lamps.jpg',
      'led-bulbs.jpg', 'led-bulb-1.jpg', 'led-bulb-2.jpg', 'led-bulb-3.jpg', 'led-bulb-4.jpg',
      'clamp-meters.jpg', 'clamp-meter-1.jpg', 'clamp-meter-2.jpg', 'clamp-meter-3.jpg', 'clamp-meter-4.jpg',
      'vidhyut-power-saver-card.jpg'
    ];

    if (filename && knownImages.indexOf(filename) > -1) {
      return getAssetUrl(filename);
    }

    // Infer from product metadata if filename was missing or unknown
    var pid = (item && item.productId ? item.productId : '').toLowerCase();
    var vid = (item && item.variantId ? item.variantId : '').toLowerCase();
    var name = (item && item.name ? item.name : '').toLowerCase();

    // Solar items
    if (pid.indexOf('solar-step') > -1 || vid.indexOf('step-') === 0 || name.indexOf('step') > -1 || name.indexOf('deck') > -1) {
      return getAssetUrl('solar-lights-1.jpg');
    }
    if (pid.indexOf('motion') > -1 || vid.indexOf('sec-') === 0 || name.indexOf('motion') > -1 || name.indexOf('security') > -1) {
      return getAssetUrl('solar-led-lamps-2.jpg');
    }
    if (pid.indexOf('vintage') > -1 || pid.indexOf('lantern') > -1 || vid.indexOf('sconce-') === 0 || name.indexOf('lantern') > -1 || name.indexOf('sconce') > -1) {
      return getAssetUrl('solar-led-lamps-3.jpg');
    }
    if (pid.indexOf('work') > -1 || vid.indexOf('work-') === 0 || name.indexOf('work lamp') > -1 || name.indexOf('portable') > -1) {
      return getAssetUrl('solar-led-lamps-1.jpg');
    }
    if (pid.indexOf('tower') > -1 || vid.indexOf('tower-') === 0 || name.indexOf('tower') > -1) {
      return getAssetUrl('solar-led-lamps-4.jpg');
    }
    if (pid.indexOf('wal-') > -1 || vid.indexOf('wal-') === 0 || name.indexOf('architectural wall') > -1) {
      return getAssetUrl('solar-led-lamps-3.jpg');
    }
    if (pid.indexOf('solar') > -1 || vid.indexOf('sl-') === 0 || name.indexOf('solar') > -1) {
      return getAssetUrl('solar-lights.jpg');
    }

    // Bulbs
    if (pid.indexOf('camping') > -1 || vid.indexOf('sh-') === 0 || name.indexOf('camping') > -1 || name.indexOf('filament') > -1) {
      return getAssetUrl('led-bulb-1.jpg');
    }
    if (pid.indexOf('battery-clip') > -1 || vid.indexOf('dc-') === 0 || name.indexOf('12v') > -1 || name.indexOf('battery clip') > -1) {
      return getAssetUrl('led-bulb-2.jpg');
    }
    if (pid.indexOf('crystal') > -1 || pid.indexOf('festoon') > -1 || vid.indexOf('fest-') === 0 || name.indexOf('festoon') > -1 || name.indexOf('bubble globe') > -1) {
      return getAssetUrl('led-bulb-4.jpg');
    }
    if (pid.indexOf('bulb') > -1 || vid.indexOf('lb-') === 0 || name.indexOf('bulb') > -1) {
      return getAssetUrl('led-bulbs.jpg');
    }

    // Clamp meters
    if (pid.indexOf('meco') > -1 || vid.indexOf('meco-') === 0 || name.indexOf('meco') > -1) {
      return getAssetUrl('clamp-meter-1.jpg');
    }
    if (pid.indexOf('themisto') > -1 || vid.indexOf('them-') === 0 || name.indexOf('themisto') > -1) {
      return getAssetUrl('clamp-meter-2.jpg');
    }
    if (pid.indexOf('dt87') > -1 || vid.indexOf('dt87-') === 0 || name.indexOf('dt87') > -1) {
      return getAssetUrl('clamp-meter-3.jpg');
    }
    if (pid.indexOf('sg997') > -1 || vid.indexOf('sg997-') === 0 || name.indexOf('sg997') > -1 || name.indexOf('sigma') > -1) {
      return getAssetUrl('clamp-meter-4.jpg');
    }
    if (pid.indexOf('clamp') > -1 || vid.indexOf('cm-') === 0 || name.indexOf('clamp') > -1 || name.indexOf('meter') > -1) {
      return getAssetUrl('clamp-meters.jpg');
    }

    // LED Lamps
    if (pid.indexOf('led-lamps') > -1 || pid.indexOf('led-linear') > -1 || vid.indexOf('ll-') === 0 || name.indexOf('led lamp') > -1 || name.indexOf('linear') > -1 || name.indexOf('suspended') > -1) {
      return getAssetUrl('led-lamps.jpg');
    }

    // Vidhyut Saathi Power Saver Card
    if (pid.indexOf('saver-card') > -1 || pid.indexOf('vidhyut-saver') > -1 || vid.indexOf('card') > -1 || vid.indexOf('vsc-') > -1 || name.indexOf('saver card') > -1 || name.indexOf('power saver') > -1) {
      return getAssetUrl('vidhyut-power-saver-card.jpg');
    }

    // Halonix Solar Floodlight
    if (pid.indexOf('halonix') > -1 || vid.indexOf('hx-') > -1 || name.indexOf('halonix') > -1) {
      return getAssetUrl('solar-lights-1.jpg');
    }

    // Multiple Clamp Meters
    if (pid.indexOf('industrial-clamp') > -1 || name.indexOf('multiple clamp') > -1) {
      return getAssetUrl('clamp-meters.jpg');
    }

    return getAssetUrl('solar-lights.jpg');
  }

  var SHOPIFY_VARIANT_MAP = {
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
    var candidates = [item.shopifyVariantId, item.variantId, item.productId];
    for (var i = 0; i < candidates.length; i++) {
      var c = candidates[i];
      if (!c) continue;
      var mapped = SHOPIFY_VARIANT_MAP[String(c)];
      if (mapped) return Number(mapped);
      var num = Number(c);
      if (Number.isInteger(num) && num > 0) return num;
    }
    return null;
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var QUICK_ADD_UPSELLS = [
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

  function VidhyutCart() {
    this.storageKey = 'vs_cart';
    this.cart = this.loadCart();
    this.isDrawerOpen = false;
    this.isCheckingOut = false;
    try {
      this.orderGstin = localStorage.getItem('vs_order_gstin') || '';
      this.orderNote = localStorage.getItem('vs_order_note') || '';
    } catch (e) {
      this.orderGstin = '';
      this.orderNote = '';
    }
    this.init();
  }

  VidhyutCart.prototype.loadCart = function() {
    try {
      var data = localStorage.getItem(this.storageKey);
      if (!data) return [];
      var parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];

      var modified = false;
      var sanitized = parsed.map(function(item) {
        var resolved = resolveItemImage(item);
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
    } catch(e) {
      return [];
    }
  };

  VidhyutCart.prototype.saveCart = function() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
      this.updateBadges();
      this.renderDrawer();
      this.renderCartPage();
    } catch(e) {}
  };

  VidhyutCart.prototype.init = function() {
    var self = this;
    window.addEventListener('storage', function(e) {
      if (e.key === self.storageKey) {
        self.cart = self.loadCart();
        self.updateBadges();
        self.renderDrawer();
        self.renderCartPage();
      }
    });

    this.updateBadges();
    this.initDrawerUI();
    this.renderCartPage();

    document.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-add-to-cart]');
      if (!btn) return;
      e.preventDefault();
      if (btn.disabled) return;

      var card = btn.closest('.vs-product-card, .vs-gallery-card, .vs-all-prod-card, .vs-product-showcase');
      var productId = btn.getAttribute('data-product-id') || (card ? card.getAttribute('data-product-id') : null) || 'product';
      var variantSelect = card ? card.querySelector('[data-variant-select]') : null;
      var variantId = variantSelect ? variantSelect.value : (btn.getAttribute('data-variant-id') || productId || 'standard');
      var variantName = variantSelect && variantSelect.options[variantSelect.selectedIndex] ? variantSelect.options[variantSelect.selectedIndex].text : (btn.getAttribute('data-variant-name') || 'Standard Model');
      var priceAttr = variantSelect && variantSelect.options[variantSelect.selectedIndex] ? variantSelect.options[variantSelect.selectedIndex].getAttribute('data-price') : btn.getAttribute('data-price');
      var cleanPriceAttr = priceAttr ? priceAttr.toString().replace(/[^0-9]/g, '') : '';
      var price = cleanPriceAttr ? parseInt(cleanPriceAttr, 10) : 1999;
      var name = btn.getAttribute('data-product-name') || (card ? card.getAttribute('data-product-name') : null) || 'Vidhyut Saathi Product';
      var activeImg = card ? card.querySelector('.vs-product-image-wrap img, .vs-product-img, .vs-gallery-img, .vs-card-slide.is-active img, img') : null;
      var cardImgSrc = activeImg ? (activeImg.currentSrc || activeImg.src) : '';
      var image = cardImgSrc || btn.getAttribute('data-image') || '';

      self.addItem({
        productId: productId,
        variantId: variantId,
        name: name,
        variantName: variantName,
        price: price,
        quantity: 1,
        image: image
      });
    });

    document.addEventListener('change', function(e) {
      var select = e.target.closest('[data-variant-select]');
      if (!select) return;
      var card = select.closest('.vs-product-card, .vs-gallery-card, .vs-all-prod-card');
      if (!card) return;
      var priceDisplay = card.querySelector('.vs-all-prod-price, .vs-gallery-price, .vs-product-price, .vs-card-price-val');
      var selectedOpt = select.options[select.selectedIndex];
      var price = selectedOpt ? selectedOpt.getAttribute('data-price') : null;
      if (priceDisplay && price) {
        priceDisplay.textContent = '₹' + parseInt(price, 10).toLocaleString('en-IN');
      }
    });

    document.addEventListener('click', function(e) {
      var filterBtn = e.target.closest('[data-catalogue-filter]');
      if (!filterBtn) return;
      e.preventDefault();
      var category = filterBtn.getAttribute('data-catalogue-filter');
      document.querySelectorAll('[data-catalogue-filter]').forEach(function(b) { b.classList.remove('is-active'); });
      filterBtn.classList.add('is-active');

      document.querySelectorAll('.vs-all-prod-card').forEach(function(card) {
        var cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  };

  VidhyutCart.prototype.addItem = function(item) {
    if (!item || !item.variantId) return;
    var existing = -1;
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].variantId === item.variantId) {
        existing = i;
        break;
      }
    }

    if (existing > -1) {
      this.cart[existing].quantity += (item.quantity || 1);
      if (item.originalPrice && !this.cart[existing].originalPrice) {
        this.cart[existing].originalPrice = item.originalPrice;
      }
    } else {
      this.cart.push({
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        variantName: item.variantName,
        price: item.price,
        originalPrice: item.originalPrice || null,
        quantity: item.quantity || 1,
        image: resolveItemImage(item)
      });
    }

    this.saveCart();
    this.showToast('Added ' + (item.quantity || 1) + ' × ' + item.name + ' to cart.');
    this.openDrawer();
  };

  VidhyutCart.prototype.updateQuantity = function(variantId, newQty) {
    var qty = parseInt(newQty, 10);
    var index = -1;
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].variantId === variantId) {
        index = i;
        break;
      }
    }
    if (index === -1) return;

    if (isNaN(qty) || qty <= 0) {
      this.removeItem(variantId);
    } else {
      this.cart[index].quantity = Math.min(99, Math.max(1, qty));
      this.saveCart();
    }
  };

  VidhyutCart.prototype.removeItem = function(variantId) {
    this.cart = this.cart.filter(function(i) { return i.variantId !== variantId; });
    this.saveCart();
    this.showToast('Item removed from cart.');
  };

  VidhyutCart.prototype.clearCart = function() {
    this.cart = [];
    this.saveCart();
  };

  VidhyutCart.prototype.getItemCount = function() {
    return this.cart.reduce(function(total, item) { return total + (item.quantity || 0); }, 0);
  };

  VidhyutCart.prototype.getSubtotal = function() {
    return this.cart.reduce(function(total, item) { return total + (item.price * item.quantity); }, 0);
  };

  VidhyutCart.prototype.updateBadges = function() {
    var count = this.getItemCount();
    var badges = document.querySelectorAll('.vs-navbar-cart-count, #navbarCartBadge, #mobileNavbarCartBadge, #floatingCartBadge, #cartBadgeCount');
    badges.forEach(function(b) {
      b.textContent = count > 99 ? '99+' : count.toString();
      if (count > 0) {
        b.classList.add('has-items');
        b.style.display = 'inline-flex';
      } else {
        b.classList.remove('has-items');
      }
    });
  };

  function getItemPricing(item) {
    var price = Number(item.price) || 0;
    var mrp = Number(item.originalPrice || item.mrp);
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
    var discount = mrp - price;
    var discountPercent = Math.max(5, Math.round((discount / mrp) * 100));
    return { price: price, mrp: mrp, discount: discount, discountPercent: discountPercent };
  }

  function startCartCountdown() {
    function tick() {
      var timerEls = document.querySelectorAll('.vs-cart-timer, #cartTimer');
      if (!timerEls.length) return;
      var now = new Date();
      var midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      var diffMs = midnight.getTime() - now.getTime();
      if (diffMs <= 0) diffMs = 12 * 3600 * 1000 + 8 * 60 * 1000 + 44 * 1000;

      var hours = Math.floor(diffMs / (1000 * 60 * 60));
      var mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      var secs = Math.floor((diffMs % (1000 * 60)) / 1000);

      var hStr = hours < 10 ? '0' + hours : hours;
      var mStr = mins < 10 ? '0' + mins : mins;
      var sStr = secs < 10 ? '0' + secs : secs;
      var timeStr = hStr + 'h : ' + mStr + 'm : ' + sStr + 's';

      for (var i = 0; i < timerEls.length; i++) {
        timerEls[i].textContent = timeStr;
      }
    }
    tick();
    if (typeof window !== 'undefined' && !window._vsCartTimerSet) {
      window._vsCartTimerSet = true;
      setInterval(tick, 1000);
    }
  }

  VidhyutCart.prototype.applyCoupon = function(code) {
    var cleanCode = (code || '').toUpperCase().trim();
    if (!cleanCode) return;

    if (cleanCode === 'FREESHIP') {
      this.couponCode = 'FREESHIP';
      this.couponDiscount = 0;
      this.showToast('Coupon FREESHIP applied! Free Delivery active.');
      this.renderDrawer();
      this.renderCartPage();
    } else {
      this.showToast('Coupon "' + cleanCode + '" is invalid or expired.');
    }
  };

  VidhyutCart.prototype.initDrawerUI = function() {
    var self = this;
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && self.isDrawerOpen) {
        self.closeDrawer();
      }
    });
    var drawer = document.getElementById('cartDrawer');
    var backdrop = document.getElementById('cartDrawerBackdrop');
    var closeBtn = document.getElementById('cartDrawerClose');
    var floatBtn = document.getElementById('floatingCartBtn');
    var checkoutBtn = document.getElementById('cartCheckoutBtn');

    // Force hidden state on initialization to prevent any FOUC flash
    if (drawer && !drawer.classList.contains('is-open')) {
      drawer.style.display = 'none';
    }
    if (backdrop && !backdrop.classList.contains('is-open')) {
      backdrop.style.display = 'none';
    }

    if (floatBtn) {
      floatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        self.openDrawer();
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function() { self.closeDrawer(); });
    }
    if (backdrop) {
      backdrop.addEventListener('click', function() { self.closeDrawer(); });
    }
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() { self.proceedToCheckout(); });
    }

    // Coupon accordion
    var couponToggle = document.getElementById('cartCouponToggle');
    var couponContent = document.getElementById('cartCouponContent');
    if (couponToggle && couponContent) {
      couponToggle.addEventListener('click', function() {
        var isOpen = couponContent.style.display !== 'none';
        couponContent.style.display = isOpen ? 'none' : 'block';
        couponToggle.setAttribute('aria-expanded', !isOpen);
        var chevron = couponToggle.querySelector('.vs-chevron-icon');
        if (chevron) chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    }

    document.querySelectorAll('[data-apply-coupon]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var code = btn.getAttribute('data-apply-coupon');
        self.applyCoupon(code);
      });
    });

    var applyManualBtn = document.getElementById('applyCouponBtn');
    var couponInput = document.getElementById('couponCodeInput');
    if (applyManualBtn && couponInput) {
      applyManualBtn.addEventListener('click', function() {
        var code = couponInput.value.trim();
        if (code) self.applyCoupon(code);
      });
    }

    // Order summary accordion
    var summaryToggle = document.getElementById('summaryToggle');
    var summaryDetails = document.getElementById('summaryDetails');
    if (summaryToggle && summaryDetails) {
      summaryToggle.addEventListener('click', function() {
        var isOpen = summaryDetails.style.display !== 'none';
        summaryDetails.style.display = isOpen ? 'none' : 'block';
        summaryToggle.setAttribute('aria-expanded', !isOpen);
        var chevron = summaryToggle.querySelector('.vs-summary-chevron');
        if (chevron) chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    }

    startCartCountdown();

    this.renderDrawer();
  };

  VidhyutCart.prototype.openDrawer = function() {
    var drawer = document.getElementById('cartDrawer');
    var backdrop = document.getElementById('cartDrawerBackdrop');
    if (!drawer) return;
    this.renderDrawer();
    drawer.style.display = 'flex';
    if (backdrop) backdrop.style.display = 'block';
    void drawer.offsetHeight;
    drawer.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.classList.add('vs-drawer-locked');
    this.isDrawerOpen = true;
  };

  VidhyutCart.prototype.closeDrawer = function() {
    var self = this;
    var drawer = document.getElementById('cartDrawer');
    var backdrop = document.getElementById('cartDrawerBackdrop');
    if (!drawer) return;
    drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.classList.remove('vs-drawer-locked');
    this.isDrawerOpen = false;

    setTimeout(function() {
      if (!self.isDrawerOpen) {
        drawer.style.display = 'none';
        if (backdrop) backdrop.style.display = 'none';
      }
    }, 380);
  };

  VidhyutCart.prototype.renderDrawer = function() {
    var drawer = document.getElementById('cartDrawer');
    var container = document.getElementById('cartItemsWrap');
    var totalEl = document.getElementById('cartTotalVal');
    var drawerBadge = document.getElementById('cartBadgeCount');
    var checkoutBtn = document.getElementById('cartCheckoutBtn');
    var urgencyBar = document.getElementById('cartUrgencyBar');
    var shippingBar = document.getElementById('cartShippingBar');
    var extraWidgets = document.getElementById('cartExtraWidgets');
    var footerEl = document.getElementById('cartDrawerFooter') || (drawer ? drawer.querySelector('.vs-cart-footer') : null);
    if (!container) return;

    var count = this.getItemCount();
    var subtotal = this.getSubtotal();

    if (drawerBadge) {
      drawerBadge.textContent = count > 0 ? '(' + count + ')' : '(0)';
    }

    if (this.cart.length === 0) {
      if (urgencyBar) urgencyBar.style.display = 'none';
      if (shippingBar) shippingBar.style.display = 'none';
      if (extraWidgets) extraWidgets.style.display = 'none';
      if (footerEl) footerEl.style.display = 'none';

      container.innerHTML = '<div class="vs-cart-empty"><div class="vs-cart-empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div><h4 class="vs-cart-empty-title">Your Cart is Empty</h4><p class="vs-cart-empty-text">Browse our solar and electrical product lines and add items to your cart.</p><a href="/#products" class="vs-btn vs-btn-accent vs-btn-sm">Explore Products</a></div>';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (urgencyBar) urgencyBar.style.display = 'flex';
    if (shippingBar) shippingBar.style.display = 'block';
    if (extraWidgets) extraWidgets.style.display = 'flex';
    if (footerEl) footerEl.style.display = 'flex';
    if (checkoutBtn) checkoutBtn.disabled = false;

    var self = this;
    var html = '';
    var totalMrp = 0;

    this.cart.forEach(function(item) {
      var pricing = getItemPricing(item);
      var lineMrp = pricing.mrp * item.quantity;
      totalMrp += lineMrp;
      var img = resolveItemImage(item);
      var variantName = item.variantName || 'Standard Variant';

      html += '<div class="vs-cart-item" data-variant-id="' + item.variantId + '">';
      html += '<img src="' + img + '" alt="' + item.name + '" class="vs-cart-item-img" width="78" height="78" loading="lazy" onerror="window.vidhyutAssetFallback && window.vidhyutAssetFallback(this, \'solar-lights.jpg\');">';
      html += '<div class="vs-cart-item-info">';
      html += '<h4 class="vs-cart-item-title">' + item.name + '</h4>';
      html += '<div class="vs-cart-item-price-row">';
      html += '<span class="vs-cart-item-price">₹' + pricing.price.toLocaleString('en-IN') + '</span>';
      html += '<span class="vs-cart-item-mrp">₹' + pricing.mrp.toLocaleString('en-IN') + '</span>';
      html += '<span class="vs-cart-item-discount">₹' + pricing.discount.toLocaleString('en-IN') + ' OFF</span>';
      html += '</div>';
      html += '<div class="vs-cart-item-desc-lines">';
      html += '<div class="vs-cart-desc-line"><span class="vs-desc-label">Model:</span> <span class="vs-desc-val">' + variantName + '</span></div>';
      html += '<div class="vs-cart-desc-line"><span class="vs-desc-label">Warranty:</span> <span class="vs-desc-val">1 Year Official Brand Warranty</span></div>';
      html += '</div>';
      html += '<div class="vs-cart-item-bottom">';
      html += '<div class="vs-cart-item-stepper">';
      html += '<button type="button" class="vs-cart-step-btn" data-step-dec="' + item.variantId + '" aria-label="Decrease">&minus;</button>';
      html += '<span class="vs-cart-step-val">' + item.quantity + '</span>';
      html += '<button type="button" class="vs-cart-step-btn" data-step-inc="' + item.variantId + '" aria-label="Increase">&plus;</button>';
      html += '</div>';
      html += '<button type="button" class="vs-cart-item-remove" data-remove="' + item.variantId + '" aria-label="Remove item">';
      html += '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
      html += '</button>';
      html += '</div></div></div>';
    });

    container.innerHTML = html;

    var totalSavings = totalMrp - subtotal;
    var finalPayable = Math.max(0, subtotal - (this.couponDiscount || 0));

    if (totalEl) {
      totalEl.textContent = 'Rs. ' + finalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    var summaryMrpEl = document.getElementById('summaryMrpVal');
    if (summaryMrpEl) summaryMrpEl.textContent = '₹' + totalMrp.toLocaleString('en-IN');

    var summaryDiscountEl = document.getElementById('summaryDiscountVal');
    if (summaryDiscountEl) summaryDiscountEl.textContent = '-₹' + (totalSavings + (this.couponDiscount || 0)).toLocaleString('en-IN');

    var summaryCouponEl = document.getElementById('summaryCouponVal');
    if (summaryCouponEl) {
      if (this.couponCode) {
        if (this.couponDiscount > 0) {
          summaryCouponEl.textContent = '-₹' + this.couponDiscount.toLocaleString('en-IN') + ' (' + this.couponCode + ')';
          summaryCouponEl.className = 'vs-text-green';
        } else {
          summaryCouponEl.textContent = this.couponCode + ' Applied ✓';
          summaryCouponEl.className = 'vs-text-green';
        }
      } else {
        summaryCouponEl.textContent = 'No coupon applied';
        summaryCouponEl.className = 'vs-text-muted';
      }
    }

    container.querySelectorAll('[data-step-dec]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-step-dec');
        var itm = self.cart.find(function(i) { return i.variantId === id; });
        if (itm) self.updateQuantity(id, itm.quantity - 1);
      });
    });

    container.querySelectorAll('[data-step-inc]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-step-inc');
        var itm = self.cart.find(function(i) { return i.variantId === id; });
        if (itm) self.updateQuantity(id, itm.quantity + 1);
      });
    });

    container.querySelectorAll('[data-remove]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-remove');
        self.removeItem(id);
      });
    });
  };

  VidhyutCart.prototype.renderCartPage = function() {
    var pageContainer = document.getElementById('dedicatedCartReviewSection');
    if (!pageContainer) return;

    var subtotal = this.getSubtotal();
    var count = this.getItemCount();
    var self = this;

    if (this.cart.length === 0) {
      pageContainer.innerHTML = '<div class="vs-cart-page-empty"><div class="vs-empty-state-card"><div class="vs-empty-cart-icon"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div><h2 class="vs-empty-title">Your Cart is Empty</h2><p class="vs-empty-desc">You haven\'t added any items to your shopping cart yet. Browse our solar lighting, smart saver card, and clamp meter lineup below.</p><div class="vs-empty-actions"><a href="#productShowcase" class="vs-btn vs-btn-accent">Configure a Product</a></div></div></div>';
      return;
    }

    var totalMrp = 0;
    var rowsHtml = '';
    this.cart.forEach(function(item) {
      var pricing = getItemPricing(item);
      totalMrp += pricing.mrp * item.quantity;
      var img = resolveItemImage(item);
      var lineSave = pricing.discount * item.quantity;

      rowsHtml += '<div class="vs-cart-table-row" data-variant-id="' + escapeHtml(item.variantId) + '">';
      rowsHtml += '<div class="vs-cart-cell-prod"><img src="' + escapeHtml(img) + '" alt="' + escapeHtml(item.name) + '" class="vs-cart-row-thumb" width="72" height="72" loading="lazy" onerror="window.vidhyutAssetFallback && window.vidhyutAssetFallback(this, \'solar-lights.jpg\');">';
      rowsHtml += '<div class="vs-cart-row-details"><h3 class="vs-cart-row-title">' + escapeHtml(item.name) + '</h3><div class="vs-cart-row-variant">' + escapeHtml(item.variantName) + '</div><div class="vs-cart-row-warranty">✓ 1-Year Brand Warranty &bull; GST Included</div><button type="button" class="vs-cart-row-remove" data-remove="' + escapeHtml(item.variantId) + '"><span>Remove</span></button></div></div>';
      rowsHtml += '<div class="vs-cart-cell-price"><div class="vs-cart-row-pricing"><span>₹' + pricing.price.toLocaleString('en-IN') + '</span><span class="vs-cart-row-mrp">₹' + pricing.mrp.toLocaleString('en-IN') + '</span><span class="vs-cart-row-save">Save ₹' + lineSave.toLocaleString('en-IN') + '</span></div></div>';
      rowsHtml += '<div class="vs-cart-cell-qty"><div class="vs-table-stepper"><button type="button" class="vs-stepper-btn" data-step-dec="' + escapeHtml(item.variantId) + '" aria-label="Decrease">&minus;</button><span class="vs-stepper-val">' + item.quantity + '</span><button type="button" class="vs-stepper-btn" data-step-inc="' + escapeHtml(item.variantId) + '" aria-label="Increase">&plus;</button></div></div>';
      rowsHtml += '<div class="vs-cart-cell-total">₹' + (pricing.price * item.quantity).toLocaleString('en-IN') + '</div>';
      rowsHtml += '</div>';
    });

    var totalSavings = Math.max(0, totalMrp - subtotal) + (this.couponDiscount || 0);
    var finalPayable = Math.max(0, subtotal - (this.couponDiscount || 0));
    var paymentBadgesUrl = getAssetUrl('payment-trust-badges.png');

    var html = '<div class="vs-cart-savings-banner">';
    html += '<span>✓ <strong>Free Pan-India Express Delivery Unlocked</strong> &bull; Priority dispatch from Rohtak</span>';
    html += '<span>Total Savings: <strong>₹' + totalSavings.toLocaleString('en-IN') + '</strong></span>';
    html += '</div>';

    html += '<div class="vs-cart-review-layout">';
    html += '<div class="vs-cart-items-col-wrap">';
    html += '<div class="vs-cart-items-column">';
    html += '<div class="vs-cart-items-header"><span class="vs-cart-col-prod">Product</span><span class="vs-cart-col-price">Unit Price</span><span class="vs-cart-col-qty">Quantity</span><span class="vs-cart-col-total">Total</span></div>';
    html += '<div class="vs-cart-table-rows">' + rowsHtml + '</div>';

    html += '<div class="vs-cart-b2b-box">';
    html += '<div class="vs-cart-b2b-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg><span>B2B GST Invoice &amp; Delivery Instructions (Optional)</span></div>';
    html += '<div class="vs-cart-b2b-grid">';
    html += '<input type="text" id="pageCartGstin" class="vs-cart-b2b-input" maxlength="15" placeholder="15-Digit GSTIN (for Business Tax Credit)" value="' + escapeHtml(this.gstin || this.orderGstin) + '">';
    html += '<input type="text" id="pageCartNote" class="vs-cart-b2b-input" maxlength="200" placeholder="Company Name or Delivery Instructions" value="' + escapeHtml(this.orderNote) + '">';
    html += '</div></div>';

    html += '<div class="vs-cart-table-footer"><a href="#productShowcase" class="vs-continue-shopping-link">&larr; Add More Products</a><button type="button" class="vs-clear-cart-link" id="clearCartBtn">Clear Cart</button></div>';
    html += '</div>';

    // Quick-Add Accessories Panel
    html += '<div class="vs-cart-upsell-panel">';
    html += '<div class="vs-cart-upsell-heading">Frequently Added Accessories &amp; Tools</div>';
    html += '<div class="vs-cart-upsell-grid">';
    QUICK_ADD_UPSELLS.forEach(function(up, idx) {
      var upImg = up.image.indexOf('http') === 0 ? up.image : getAssetUrl(up.image);
      html += '<div class="vs-cart-upsell-card">';
      html += '<img src="' + escapeHtml(upImg) + '" alt="' + escapeHtml(up.name) + '" class="vs-cart-upsell-img" loading="lazy">';
      html += '<div class="vs-cart-upsell-info"><div class="vs-cart-upsell-name">' + escapeHtml(up.name) + '</div><div class="vs-cart-upsell-price">₹' + up.price.toLocaleString('en-IN') + '</div></div>';
      html += '<button type="button" class="vs-cart-upsell-btn" data-upsell-idx="' + idx + '">+ Add</button>';
      html += '</div>';
    });
    html += '</div></div>';
    html += '</div>';

    html += '<div class="vs-cart-summary-column"><div class="vs-order-summary-card">';
    html += '<h3 class="vs-summary-heading">Order Summary</h3>';
    html += '<div class="vs-cart-page-coupon-row">';
    html += '<input type="text" id="pageCouponInput" class="vs-coupon-input" placeholder="Promo code (e.g. FREESHIP)" value="' + escapeHtml(this.couponCode || '') + '">';
    html += '<button type="button" id="pageApplyCouponBtn" class="vs-coupon-apply-btn">Apply</button>';
    html += '</div>';
    html += '<div class="vs-summary-rows">';
    html += '<div class="vs-summary-row"><span>Bag Total (MRP)</span><span>₹' + totalMrp.toLocaleString('en-IN') + '</span></div>';
    html += '<div class="vs-summary-row vs-text-discount"><span>Total Savings (' + count + ' items)</span><span>-₹' + totalSavings.toLocaleString('en-IN') + '</span></div>';
    html += '<div class="vs-summary-row"><span>GST (18%)</span><span class="vs-summary-badge-free">Included</span></div>';
    html += '<div class="vs-summary-row"><span>Express Delivery</span><span class="vs-summary-badge-free">FREE</span></div>';
    html += '<div class="vs-summary-divider"></div>';
    html += '<div class="vs-summary-row vs-summary-total"><span>Total Payable</span><span class="vs-summary-grand-total">₹' + finalPayable.toLocaleString('en-IN') + '</span></div>';
    html += '</div>';
    html += '<button type="button" class="vs-btn vs-btn-accent vs-btn-block vs-btn-checkout-primary" id="pageCheckoutBtn">';
    html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
    html += '<span>Proceed to Checkout (PhonePe / UPI)</span></button>';
    html += '<div class="vs-summary-payment-box">';
    html += '<div class="vs-summary-security" style="margin-top:0;">100% Secure Payment &bull; 7-Day Replacement &bull; Brand Warranty</div>';
    html += '<img src="' + escapeHtml(paymentBadgesUrl) + '" alt="PhonePe, GPay, Paytm, Visa, RuPay, Mastercard" class="vs-summary-payment-img" loading="lazy">';
    html += '</div></div></div></div>';

    pageContainer.innerHTML = html;

    pageContainer.querySelectorAll('[data-step-dec]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-step-dec');
        var itm = self.cart.find(function(i) { return i.variantId === id; });
        if (itm) self.updateQuantity(id, itm.quantity - 1);
      });
    });

    pageContainer.querySelectorAll('[data-step-inc]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-step-inc');
        var itm = self.cart.find(function(i) { return i.variantId === id; });
        if (itm) self.updateQuantity(id, itm.quantity + 1);
      });
    });

    pageContainer.querySelectorAll('[data-remove]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-remove');
        self.removeItem(id);
      });
    });

    pageContainer.querySelectorAll('[data-upsell-idx]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var idx = parseInt(btn.getAttribute('data-upsell-idx'), 10);
        var up = QUICK_ADD_UPSELLS[idx];
        if (up) {
          self.addItem({
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

    var gstinInput = pageContainer.querySelector('#pageCartGstin');
    if (gstinInput) {
      gstinInput.addEventListener('input', function(e) {
        self.orderGstin = (e.target.value || '').toUpperCase().trim();
        try { localStorage.setItem('vs_order_gstin', self.orderGstin); } catch (err) {}
      });
    }

    var noteInput = pageContainer.querySelector('#pageCartNote');
    if (noteInput) {
      noteInput.addEventListener('input', function(e) {
        self.orderNote = (e.target.value || '').trim();
        try { localStorage.setItem('vs_order_note', self.orderNote); } catch (err) {}
      });
    }

    var pageCouponBtn = pageContainer.querySelector('#pageApplyCouponBtn');
    var pageCouponInput = pageContainer.querySelector('#pageCouponInput');
    if (pageCouponBtn && pageCouponInput) {
      pageCouponBtn.addEventListener('click', function() {
        var code = pageCouponInput.value.trim();
        if (code) self.applyCoupon(code);
      });
    }

    var clearBtn = pageContainer.querySelector('#clearCartBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your cart?')) {
          self.clearCart();
        }
      });
    }

    var checkoutBtn = pageContainer.querySelector('#pageCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() { self.proceedToCheckout(); });
    }
  };

  VidhyutCart.prototype.proceedToCheckout = function() {
    if (this.cart.length === 0) {
      this.showToast('Your cart is empty. Please add products first.');
      return;
    }

    if (this.isCheckingOut) return;

    var aggregated = {};
    for (var i = 0; i < this.cart.length; i++) {
      var item = this.cart[i];
      var vid = resolveShopifyVariantId(item);
      if (vid) {
        var qty = Math.max(1, parseInt(item.quantity, 10) || 1);
        aggregated[vid] = (aggregated[vid] || 0) + qty;
      }
    }

    var shopifyItems = Object.keys(aggregated).map(function(id) {
      return { id: Number(id), quantity: aggregated[id] };
    });

    var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) ? window.Shopify.routes.root : '/';
    if (root.charAt(root.length - 1) !== '/') root += '/';

    if (shopifyItems.length > 0) {
      var self = this;
      self.isCheckingOut = true;
      setTimeout(function() { self.isCheckingOut = false; }, 6000);
      self.showToast('Connecting to secure checkout...');

      var permalink = root + 'cart/' + shopifyItems.map(function(it) {
        return it.id + ':' + it.quantity;
      }).join(',');

      fetch(root + 'cart/clear.js', { method: 'POST', credentials: 'same-origin' })
        .then(function() {
          return fetch(root + 'cart/add.js', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: shopifyItems })
          });
        })
        .then(function(res) {
          if (!res.ok) throw new Error('Shopify cart/add.js failed: ' + res.status);
          if (self.orderGstin || self.orderNote) {
            var noteParts = [];
            if (self.orderGstin) noteParts.push('GSTIN: ' + self.orderGstin);
            if (self.orderNote) noteParts.push(self.orderNote);
            return fetch(root + 'cart/update.js', {
              method: 'POST',
              credentials: 'same-origin',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                note: noteParts.join(' | '),
                attributes: {
                  GSTIN: self.orderGstin || '',
                  OrderNote: self.orderNote || ''
                }
              })
            }).catch(function() {});
          }
        })
        .then(function() {
          window.location.href = root + 'checkout';
        })
        .catch(function(err) {
          console.warn('Shopify cart sync error, using cart permalink checkout:', err);
          window.location.href = permalink;
        });
      return;
    }

    this.openWhatsAppCheckout();
  };

  VidhyutCart.prototype.openWhatsAppCheckout = function() {
    var summary = 'Vidhyut Saathi — Official Order Placement:\n\n';
    var grandTotal = 0;
    this.cart.forEach(function(item, index) {
      var lineTotal = item.price * item.quantity;
      grandTotal += lineTotal;
      summary += (index + 1) + '. ' + item.name + ' (' + item.variantName + ') × ' + item.quantity + ' = ₹' + lineTotal.toLocaleString('en-IN') + '\n';
    });
    summary += '\nTotal: ₹' + grandTotal.toLocaleString('en-IN') + ' (incl. GST & Free Delivery)\n';
    summary += '\nPlease confirm shipping address & invoice details to dispatch.';

    this.showToast('Opening Vidhyut Saathi Order Desk on WhatsApp...');

    var whatsappUrl = 'https://wa.me/918199036060?text=' + encodeURIComponent(summary);
    var win = window.open(whatsappUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
  };

  VidhyutCart.prototype.showToast = function(msg) {
    var toast = document.getElementById('vsCartToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vsCartToast';
      toast.className = 'vs-cart-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<span>' + msg + '</span>';
    toast.classList.add('is-visible');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(function() {
      toast.classList.remove('is-visible');
    }, 3000);
  };

  document.addEventListener('DOMContentLoaded', function() {
    window.vsCart = new VidhyutCart();
  });
})();
