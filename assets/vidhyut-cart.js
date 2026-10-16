/**
 * Vidhyut Saathi - Shopify Theme Shared Cart & Drawer Script
 */
(function() {
  function VidhyutCart() {
    this.storageKey = 'vs_cart';
    this.cart = this.loadCart();
    this.isDrawerOpen = false;
    this.init();
  }

  VidhyutCart.prototype.loadCart = function() {
    try {
      var data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
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
      var productId = btn.getAttribute('data-product-id') || card?.getAttribute('data-product-id') || 'product';
      var variantSelect = card ? card.querySelector('[data-variant-select]') : null;
      var variantId = variantSelect ? variantSelect.value : (btn.getAttribute('data-variant-id') || 'standard');
      var variantName = variantSelect && variantSelect.options[variantSelect.selectedIndex] ? variantSelect.options[variantSelect.selectedIndex].text : (btn.getAttribute('data-variant-name') || 'Standard Model');
      var priceAttr = variantSelect && variantSelect.options[variantSelect.selectedIndex] ? variantSelect.options[variantSelect.selectedIndex].getAttribute('data-price') : btn.getAttribute('data-price');
      var price = priceAttr ? parseInt(priceAttr, 10) : 1999;
      var name = btn.getAttribute('data-product-name') || card?.getAttribute('data-product-name') || 'Vidhyut Saathi Product';
      var image = btn.getAttribute('data-image') || (card && card.querySelector('img') ? card.querySelector('img').src : '');

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
    } else {
      this.cart.push({
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        variantName: item.variantName,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image
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

  VidhyutCart.prototype.initDrawerUI = function() {
    var self = this;
    var drawer = document.getElementById('cartDrawer');
    var backdrop = document.getElementById('cartDrawerBackdrop');
    var closeBtn = document.getElementById('cartDrawerClose');
    var floatBtn = document.getElementById('floatingCartBtn');
    var checkoutBtn = document.getElementById('cartCheckoutBtn');

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

    this.renderDrawer();
  };

  VidhyutCart.prototype.openDrawer = function() {
    var drawer = document.getElementById('cartDrawer');
    var backdrop = document.getElementById('cartDrawerBackdrop');
    if (!drawer) return;
    this.renderDrawer();
    drawer.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.classList.add('vs-drawer-locked');
    this.isDrawerOpen = true;
  };

  VidhyutCart.prototype.closeDrawer = function() {
    var drawer = document.getElementById('cartDrawer');
    var backdrop = document.getElementById('cartDrawerBackdrop');
    if (!drawer) return;
    drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.classList.remove('vs-drawer-locked');
    this.isDrawerOpen = false;
  };

  VidhyutCart.prototype.renderDrawer = function() {
    var container = document.getElementById('cartItemsWrap');
    var totalEl = document.getElementById('cartTotalVal');
    var drawerBadge = document.getElementById('cartBadgeCount');
    var checkoutBtn = document.getElementById('cartCheckoutBtn');
    if (!container) return;

    var count = this.getItemCount();
    var subtotal = this.getSubtotal();

    if (drawerBadge) drawerBadge.textContent = count.toString();
    if (totalEl) totalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');

    if (this.cart.length === 0) {
      container.innerHTML = '<div class="vs-cart-empty"><div class="vs-cart-empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div><h4 class="vs-cart-empty-title">Your Cart is Empty</h4><p class="vs-cart-empty-text">Browse our solar and electrical product lines and add items to your cart.</p><a href="/index.html#products" class="vs-btn vs-btn-accent vs-btn-sm">Explore Products</a></div>';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;

    var self = this;
    var html = '';
    this.cart.forEach(function(item) {
      html += '<div class="vs-cart-item" data-variant-id="' + item.variantId + '">';
      html += '<img src="' + item.image + '" alt="' + item.name + '" class="vs-cart-item-img" width="64" height="64" loading="lazy">';
      html += '<div class="vs-cart-item-info">';
      html += '<div class="vs-cart-item-top">';
      html += '<h4 class="vs-cart-item-title">' + item.name + '</h4>';
      html += '<button type="button" class="vs-cart-item-remove" data-remove="' + item.variantId + '">&times;</button>';
      html += '</div>';
      html += '<div class="vs-cart-item-variant">' + item.variantName + '</div>';
      html += '<div class="vs-cart-item-bottom">';
      html += '<div class="vs-cart-item-stepper">';
      html += '<button type="button" class="vs-cart-step-btn" data-step-dec="' + item.variantId + '">&minus;</button>';
      html += '<span class="vs-cart-step-val">' + item.quantity + '</span>';
      html += '<button type="button" class="vs-cart-step-btn" data-step-inc="' + item.variantId + '">&plus;</button>';
      html += '</div>';
      html += '<div class="vs-cart-item-price">₹' + (item.price * item.quantity).toLocaleString('en-IN') + '</div>';
      html += '</div></div></div>';
    });

    container.innerHTML = html;

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
      pageContainer.innerHTML = '<div class="vs-cart-page-empty"><div class="vs-empty-state-card"><div class="vs-empty-cart-icon"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div><h2 class="vs-empty-title">Your Cart is Empty</h2><p class="vs-empty-desc">You haven\'t added any items to your shopping cart yet. Browse our solar lighting and electrical product range to get started.</p><div class="vs-empty-actions"><a href="/#products" class="vs-btn vs-btn-accent">Explore Products</a></div></div></div>';
      return;
    }

    var html = '<div class="vs-cart-review-layout">';
    html += '<div class="vs-cart-items-column">';
    html += '<div class="vs-cart-items-header"><span class="vs-cart-col-prod">Product</span><span class="vs-cart-col-price">Unit Price</span><span class="vs-cart-col-qty">Quantity</span><span class="vs-cart-col-total">Total</span></div>';
    html += '<div class="vs-cart-table-rows">';

    this.cart.forEach(function(item) {
      html += '<div class="vs-cart-table-row" data-variant-id="' + item.variantId + '">';
      html += '<div class="vs-cart-cell-prod"><img src="' + item.image + '" alt="' + item.name + '" class="vs-cart-row-thumb" width="72" height="72" loading="lazy">';
      html += '<div class="vs-cart-row-details"><h3 class="vs-cart-row-title">' + item.name + '</h3><div class="vs-cart-row-variant">' + item.variantName + '</div><button type="button" class="vs-cart-row-remove" data-remove="' + item.variantId + '"><span>Remove</span></button></div></div>';
      html += '<div class="vs-cart-cell-price">₹' + item.price.toLocaleString('en-IN') + '</div>';
      html += '<div class="vs-cart-cell-qty"><div class="vs-table-stepper"><button type="button" class="vs-stepper-btn" data-step-dec="' + item.variantId + '">&minus;</button><span class="vs-stepper-val">' + item.quantity + '</span><button type="button" class="vs-stepper-btn" data-step-inc="' + item.variantId + '">&plus;</button></div></div>';
      html += '<div class="vs-cart-cell-total">₹' + (item.price * item.quantity).toLocaleString('en-IN') + '</div>';
      html += '</div>';
    });

    html += '</div>';
    html += '<div class="vs-cart-table-footer"><a href="/#products" class="vs-continue-shopping-link">&larr; Continue Shopping</a><button type="button" class="vs-clear-cart-link" id="clearCartBtn">Clear Cart</button></div>';
    html += '</div>';

    html += '<div class="vs-cart-summary-column"><div class="vs-order-summary-card">';
    html += '<h3 class="vs-summary-heading">Order Summary</h3>';
    html += '<div class="vs-summary-rows"><div class="vs-summary-row"><span>Items in Cart (' + count + ')</span><span>₹' + subtotal.toLocaleString('en-IN') + '</span></div>';
    html += '<div class="vs-summary-row"><span>GST Tax</span><span class="vs-summary-badge-free">Included (18%)</span></div>';
    html += '<div class="vs-summary-row"><span>Standard Delivery</span><span class="vs-summary-badge-free">FREE</span></div>';
    html += '<div class="vs-summary-divider"></div>';
    html += '<div class="vs-summary-row vs-summary-total"><span>Estimated Total</span><span class="vs-summary-grand-total">₹' + subtotal.toLocaleString('en-IN') + '</span></div></div>';
    html += '<button type="button" class="vs-btn vs-btn-accent vs-btn-block vs-btn-checkout-primary" id="pageCheckoutBtn">Proceed to Checkout &rarr;</button>';
    html += '<div class="vs-summary-security"><span>Authentic Brand Warranty &bull; GST Invoice Provided</span></div>';
    html += '</div></div></div>';

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
    if (this.cart.length === 0) return;
    if (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) {
      window.location.href = window.Shopify.routes.root + 'checkout';
      return;
    }
    var summary = 'Vidhyut Saathi — Official Order Placement:\n\n';
    var grandTotal = 0;
    this.cart.forEach(function(item, index) {
      var lineTotal = item.price * item.quantity;
      grandTotal += lineTotal;
      summary += (index + 1) + '. ' + item.name + ' (' + item.variantName + ') × ' + item.quantity + ' = ₹' + lineTotal.toLocaleString('en-IN') + '\n';
    });
    summary += '\nTotal: ₹' + grandTotal.toLocaleString('en-IN') + ' (incl. GST & Free Delivery)';
    window.open('https://wa.me/918199036060?text=' + encodeURIComponent(summary), '_blank');
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
