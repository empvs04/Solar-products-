/**
 * Vidhyut Saathi - Buy Now Page Controller
 * Handles URL product parameter routing, interactive variant selection,
 * dynamic pricing, quantity calculation, cart persistence, and recommendations.
 */

import { productsConfig } from '../config/products.config.js';
import { MobileNav } from './mobile-nav.js';

export class BuyNowController {
  constructor() {
    this.products = productsConfig;
    this.activeProductId = 'solar-lights';
    this.selectedVariant = null;
    this.quantity = 1;
    this.cart = this.loadCart();

    this.init();
  }

  loadCart() {
    try {
      const data = localStorage.getItem('vs_cart');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('vs_cart', JSON.stringify(this.cart));
      this.updateCartUI();
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  init() {
    // 1. Initialize mobile drawer
    new MobileNav();

    // 2. Determine initial product from URL search params
    const params = new URLSearchParams(window.location.search);
    const paramProduct = params.get('product');
    const matched = this.products.find(p => p.id === paramProduct);
    if (matched) {
      this.activeProductId = matched.id;
    } else {
      this.activeProductId = this.products[0].id;
    }

    // 3. Render current product
    this.renderCurrentProduct(false);

    // 4. Attach Category Tab Clicks
    document.querySelectorAll('.vs-category-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const productId = tab.getAttribute('data-product-id');
        if (productId && productId !== this.activeProductId) {
          this.switchProduct(productId);
        }
      });
    });

    // 5. Quantity Buttons
    const decBtn = document.getElementById('qtyDec');
    const incBtn = document.getElementById('qtyInc');
    const qtyInput = document.getElementById('qtyInput');

    if (decBtn && incBtn && qtyInput) {
      decBtn.addEventListener('click', () => {
        this.setQuantity(this.quantity - 1);
      });
      incBtn.addEventListener('click', () => {
        this.setQuantity(this.quantity + 1);
      });
      qtyInput.addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        this.setQuantity(isNaN(val) ? 1 : val);
      });
    }

    // 6. Add to Cart & Buy Now Action Buttons
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowDirectBtn = document.getElementById('buyNowDirectBtn');

    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => this.addToCart());
    }
    if (buyNowDirectBtn) {
      buyNowDirectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.directBuyNow();
      });
    }

    // 7. Cart Drawer Controls
    this.initCartDrawer();

    // 8. Listen to browser popstate (back/forward)
    window.addEventListener('popstate', () => {
      const p = new URLSearchParams(window.location.search).get('product');
      if (p && p !== this.activeProductId && this.products.find(item => item.id === p)) {
        this.activeProductId = p;
        this.renderCurrentProduct(false);
      }
    });

    // Initial cart UI update
    this.updateCartUI();
  }

  switchProduct(productId) {
    this.activeProductId = productId;
    // Update URL parameter without reload
    const newUrl = `${window.location.pathname}?product=${encodeURIComponent(productId)}`;
    window.history.pushState({ product: productId }, '', newUrl);

    this.renderCurrentProduct(true);
  }

  renderCurrentProduct(scrollIntoView = false) {
    const product = this.products.find(p => p.id === this.activeProductId) || this.products[0];
    if (!product) return;

    // Reset default variant & quantity
    this.selectedVariant = product.variants.find(v => v.isPopular) || product.variants[0];
    this.quantity = 1;

    // Update Category Tabs active state
    document.querySelectorAll('.vs-category-tab').forEach(tab => {
      if (tab.getAttribute('data-product-id') === product.id) {
        tab.classList.add('is-active');
      } else {
        tab.classList.remove('is-active');
      }
    });

    // Update Product Image & Alt
    const mainImg = document.getElementById('mainProductImg');
    const mediaBadge = document.getElementById('mediaCategoryBadge');
    if (mainImg) {
      mainImg.src = product.image;
      mainImg.alt = product.altText || product.fullName || product.name;
    }
    if (mediaBadge) {
      mediaBadge.textContent = product.badge || product.category;
    }

    // Update Header Meta
    const metaCategory = document.getElementById('productMetaCategory');
    const productNameEl = document.getElementById('productName');
    const productDescEl = document.getElementById('productDesc');
    const stockBadge = document.getElementById('productStockBadge');

    if (metaCategory) metaCategory.textContent = product.category;
    if (productNameEl) productNameEl.textContent = product.fullName || product.name;
    if (productDescEl) productDescEl.textContent = product.fullDescription || product.description;
    if (stockBadge) stockBadge.textContent = product.availability || 'In Stock - Ready to Dispatch';

    // Render Variants
    this.renderVariants(product);

    // Render Specifications Table
    this.renderSpecs(product);

    // Update Price Box & Subtotal
    this.updatePriceDisplay();

    // Render Recommendations (other 3 products)
    this.renderRecommendations(product.id);

    // Scroll to showcase if user switched products
    if (scrollIntoView) {
      const showcaseEl = document.getElementById('productShowcase');
      if (showcaseEl) {
        const top = showcaseEl.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }

  renderVariants(product) {
    const container = document.getElementById('variantCardsWrap');
    const selectedLabel = document.getElementById('selectedVariantLabel');
    if (!container) return;

    container.innerHTML = '';
    if (selectedLabel && this.selectedVariant) {
      selectedLabel.textContent = this.selectedVariant.name;
    }

    product.variants.forEach(variant => {
      const card = document.createElement('div');
      card.className = `vs-variant-card ${variant.id === this.selectedVariant.id ? 'is-selected' : ''}`;
      card.setAttribute('data-variant-id', variant.id);

      card.innerHTML = `
        <div class="vs-variant-left">
          <div class="vs-variant-radio"></div>
          <div>
            <div class="vs-variant-name">${variant.name}</div>
            <div class="vs-variant-desc">${variant.recommended || variant.wattage}</div>
          </div>
        </div>
        <div class="vs-variant-right">
          ${variant.isPopular ? '<span class="vs-variant-badge">Popular</span>' : ''}
          <div class="vs-variant-price">₹${variant.price.toLocaleString('en-IN')}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectedVariant = variant;
        if (selectedLabel) selectedLabel.textContent = variant.name;
        container.querySelectorAll('.vs-variant-card').forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
        this.updatePriceDisplay();
      });

      container.appendChild(card);
    });
  }

  renderSpecs(product) {
    const tableBody = document.getElementById('specsTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    if (product.specs && product.specs.length > 0) {
      product.specs.forEach(spec => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="vs-specs-label">${spec.label}</td>
          <td class="vs-specs-val">${spec.value}</td>
        `;
        tableBody.appendChild(tr);
      });
    }
  }

  setQuantity(newQty) {
    this.quantity = Math.max(1, Math.min(99, newQty));
    const qtyInput = document.getElementById('qtyInput');
    if (qtyInput) qtyInput.value = this.quantity;
    this.updatePriceDisplay();
  }

  updatePriceDisplay() {
    if (!this.selectedVariant) return;

    const priceCurrent = document.getElementById('priceCurrent');
    const priceOriginal = document.getElementById('priceOriginal');
    const priceDiscount = document.getElementById('priceDiscount');
    const subtotalEl = document.getElementById('subtotalVal');

    const unitPrice = this.selectedVariant.price;
    const origPrice = this.selectedVariant.originalPrice;
    const subtotal = unitPrice * this.quantity;

    if (priceCurrent) priceCurrent.textContent = `₹${unitPrice.toLocaleString('en-IN')}`;
    if (priceOriginal && origPrice) priceOriginal.textContent = `₹${origPrice.toLocaleString('en-IN')}`;

    if (priceDiscount && origPrice) {
      const discountPct = Math.round(((origPrice - unitPrice) / origPrice) * 100);
      priceDiscount.textContent = `${discountPct}% OFF`;
      priceDiscount.style.display = 'inline-block';
    } else if (priceDiscount) {
      priceDiscount.style.display = 'none';
    }

    if (subtotalEl) {
      subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    }
  }

  renderRecommendations(currentId) {
    const grid = document.getElementById('recGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const recommendations = this.products.filter(p => p.id !== currentId);

    recommendations.forEach(rec => {
      const card = document.createElement('div');
      card.className = 'vs-rec-card';
      card.innerHTML = `
        <div class="vs-rec-img-wrap">
          <img src="${rec.image}" alt="${rec.altText || rec.name}" class="vs-rec-img" loading="lazy">
          <span class="vs-rec-badge-pill">${rec.badge || rec.category}</span>
        </div>
        <div class="vs-rec-body">
          <div class="vs-rec-name">${rec.name}</div>
          <div class="vs-rec-price-hint">Starting from <strong>₹${rec.basePrice.toLocaleString('en-IN')}</strong></div>
          <button type="button" class="vs-rec-btn" data-switch-to="${rec.id}">
            <span>Buy Now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      `;

      card.querySelector('.vs-rec-btn').addEventListener('click', (e) => {
        e.preventDefault();
        this.switchProduct(rec.id);
      });

      grid.appendChild(card);
    });
  }

  addToCart() {
    const product = this.products.find(p => p.id === this.activeProductId);
    if (!product || !this.selectedVariant) return;

    const existingIndex = this.cart.findIndex(
      item => item.productId === product.id && item.variantId === this.selectedVariant.id
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += this.quantity;
    } else {
      this.cart.push({
        productId: product.id,
        variantId: this.selectedVariant.id,
        name: product.name,
        variantName: this.selectedVariant.name,
        price: this.selectedVariant.price,
        quantity: this.quantity,
        image: product.image
      });
    }

    this.saveCart();
    this.showToast(`Added ${this.quantity} × ${product.name} to cart.`);
    this.openCart();
  }

  directBuyNow() {
    const product = this.products.find(p => p.id === this.activeProductId);
    if (!product || !this.selectedVariant) return;

    // Add item to cart first
    this.addToCart();

    // Prepare direct order inquiry message via WhatsApp / Email
    const totalAmount = this.selectedVariant.price * this.quantity;
    const msg = `Hello Vidhyut Saathi, I want to purchase:\n\nProduct: ${product.fullName || product.name}\nModel: ${this.selectedVariant.name}\nQuantity: ${this.quantity}\nTotal Amount: ₹${totalAmount.toLocaleString('en-IN')} (incl. GST)\n\nPlease share delivery details and dispatch timeline.`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/918199036060?text=${encodedMsg}`;

    // Open checkout dispatch modal / options
    window.open(whatsappUrl, '_blank');
  }

  initCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    const closeBtn = document.getElementById('cartDrawerClose');
    const openBtn = document.getElementById('floatingCartBtn');
    const checkoutBtn = document.getElementById('cartCheckoutBtn');

    if (openBtn) {
      openBtn.addEventListener('click', () => this.openCart());
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCart());
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeCart());
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.cart.length === 0) return;
        let cartSummary = 'Vidhyut Saathi Order Inquiry:\n\n';
        let grandTotal = 0;
        this.cart.forEach((item, idx) => {
          const itemTotal = item.price * item.quantity;
          grandTotal += itemTotal;
          cartSummary += `${idx + 1}. ${item.name} (${item.variantName}) - Qty: ${item.quantity} - ₹${itemTotal.toLocaleString('en-IN')}\n`;
        });
        cartSummary += `\nTotal: ₹${grandTotal.toLocaleString('en-IN')} (incl. GST)`;

        const whatsappUrl = `https://wa.me/918199036060?text=${encodeURIComponent(cartSummary)}`;
        window.open(whatsappUrl, '_blank');
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
        this.closeCart();
      }
    });
  }

  openCart() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (drawer && backdrop) {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      this.renderCartItems();
    }
  }

  closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  updateCartUI() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badgeCount = document.getElementById('cartBadgeCount');
    const floatBadge = document.getElementById('floatingCartBadge');

    if (badgeCount) badgeCount.textContent = totalCount;
    if (floatBadge) floatBadge.textContent = totalCount;

    this.renderCartItems();
  }

  renderCartItems() {
    const itemsWrap = document.getElementById('cartItemsWrap');
    const cartTotalEl = document.getElementById('cartTotalVal');
    if (!itemsWrap) return;

    if (this.cart.length === 0) {
      itemsWrap.innerHTML = `
        <div class="vs-cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <p>Your shopping cart is currently empty.</p>
        </div>
      `;
      if (cartTotalEl) cartTotalEl.textContent = '₹0';
      return;
    }

    let grandTotal = 0;
    itemsWrap.innerHTML = '';

    this.cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      grandTotal += itemTotal;

      const itemEl = document.createElement('div');
      itemEl.className = 'vs-cart-item';
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="vs-cart-item-img">
        <div class="vs-cart-item-info">
          <div class="vs-cart-item-name">${item.name}</div>
          <div class="vs-cart-item-variant">${item.variantName} × ${item.quantity}</div>
          <div class="vs-cart-item-bottom">
            <span class="vs-cart-item-price">₹${itemTotal.toLocaleString('en-IN')}</span>
            <button type="button" class="vs-cart-item-remove" data-remove-index="${index}">Remove</button>
          </div>
        </div>
      `;

      itemEl.querySelector('.vs-cart-item-remove').addEventListener('click', () => {
        this.cart.splice(index, 1);
        this.saveCart();
      });

      itemsWrap.appendChild(itemEl);
    });

    if (cartTotalEl) {
      cartTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
    }
  }

  showToast(message) {
    let toast = document.getElementById('vsToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vsToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 24px;
        background-color: #151E2B;
        color: #FFFFFF;
        padding: 14px 22px;
        border-radius: 8px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        border: 1px solid rgba(255,255,255,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E86014" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      <span>${message}</span>
    `;

    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
    }, 3500);
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  new BuyNowController();
});
