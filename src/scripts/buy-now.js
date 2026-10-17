/**
 * Vidhyut Saathi - Buy Now Page Controller
 * Handles URL product parameter routing, interactive variant selection,
 * dynamic pricing, quantity calculation, cart persistence, and recommendations.
 */

import '../styles/bundle.css';
import { productsConfig } from '../config/products.config.js';
import { MobileNav } from './mobile-nav.js';
import { initSharedCart } from './cart.js';

export class BuyNowController {
  constructor() {
    this.products = productsConfig;
    this.activeProductId = 'solar-lights';
    this.selectedVariant = null;
    this.quantity = 1;
    this.cartManager = window.vsCart || initSharedCart();

    this.init();
  }

  init() {
    // 1. Initialize mobile drawer
    new MobileNav();

    // 2. Synchronize shared cart UI and render dedicated review section
    this.cartManager.updateBadges();
    this.cartManager.renderCartPage();

    // 3. Determine initial product from URL search params
    const params = new URLSearchParams(window.location.search);
    const paramProduct = params.get('product');
    const matched = this.products.find(p => p.id === paramProduct);
    if (matched) {
      this.activeProductId = matched.id;
    } else {
      this.activeProductId = this.products[0].id;
    }

    // 4. Render current product
    this.renderCurrentProduct(false);

    // 5. Attach Category Tab Clicks
    document.querySelectorAll('.vs-category-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const productId = tab.getAttribute('data-product-id');
        if (productId && productId !== this.activeProductId) {
          this.switchProduct(productId);
        }
      });
    });

    // 6. Quantity Buttons
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

    // 7. Add to Cart & Buy Now Action Buttons
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

    // 8. Listen to browser popstate (back/forward)
    window.addEventListener('popstate', () => {
      const p = new URLSearchParams(window.location.search).get('product');
      if (p && p !== this.activeProductId && this.products.find(item => item.id === p)) {
        this.activeProductId = p;
        this.renderCurrentProduct(false);
      }
    });
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
      const tabCat = tab.getAttribute('data-product-id');
      if (tabCat === product.id || tabCat === product.categoryId) {
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
    const recommendations = this.products.filter(p => p.id !== currentId && p.categoryId).slice(0, 4);

    recommendations.forEach(rec => {
      const card = document.createElement('div');
      card.className = 'vs-rec-card';
      card.innerHTML = `
        <div class="vs-rec-img-wrap">
          <img src="${rec.image}" alt="${rec.altText || rec.name}" class="vs-rec-img" loading="lazy" onerror="window.vidhyutAssetFallback && window.vidhyutAssetFallback(this, 'solar-lights.jpg');">
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

    this.cartManager.addItem({
      productId: product.id,
      variantId: this.selectedVariant.id,
      name: product.fullName || product.name,
      variantName: this.selectedVariant.name,
      price: this.selectedVariant.price,
      quantity: this.quantity,
      image: product.image
    });
  }

  directBuyNow() {
    const product = this.products.find(p => p.id === this.activeProductId);
    if (!product || !this.selectedVariant) return;

    this.cartManager.addItem({
      productId: product.id,
      variantId: this.selectedVariant.id,
      name: product.fullName || product.name,
      variantName: this.selectedVariant.name,
      price: this.selectedVariant.price,
      quantity: this.quantity,
      image: product.image
    });

    this.cartManager.proceedToCheckout();
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  new BuyNowController();
});
