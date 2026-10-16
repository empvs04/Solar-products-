/**
 * Vidhyut Saathi - Main Application Entrypoint
 */

import '../styles/index.css';
import '../styles/header.css';
import '../styles/hero.css';
import '../styles/products.css';
import '../styles/about-intro.css';
import '../styles/why-choose.css';
import '../styles/distributorship.css';
import '../styles/secondary-cta.css';
import '../styles/about-page.css';
import '../styles/contact-page.css';
import '../styles/collection-gallery.css';
import '../styles/cart.css';
import '../styles/footer.css';

import { shopifyBannersConfig } from '../config/shopify-banners.config.js';
import { HeroCarousel } from './carousel.js';
import { MobileNav } from './mobile-nav.js';
import { ContactPageController } from './contact-form.js';
import { DistributorshipFormController } from './distributorship-form.js';
import { initSharedCart } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Sticky Header Elevation
  const header = document.querySelector('.vs-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Initialize Mobile Navigation
  new MobileNav();

  // 3. Initialize Hero Carousel
  const carouselEl = document.getElementById('vsHeroCarousel');
  if (carouselEl) {
    new HeroCarousel(carouselEl, shopifyBannersConfig);
  }

  // 4. Initialize Contact Page Controller
  if (document.getElementById('vsContactForm') || document.querySelector('.vs-contact-section')) {
    new ContactPageController();
  }

  // 5. Initialize Buy Distributorship Form Controller
  if (document.getElementById('vsDistributorForm')) {
    new DistributorshipFormController('vsDistributorForm');
  }

  // 6. Initialize Universal Shared Shopping Cart & Drawer
  window.vsCart = initSharedCart();

  // 5. Smooth Anchor Link Handler
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Accessible Toast Notification for Route Placeholders
  const showToast = (message) => {
    let toast = document.getElementById('vsToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vsToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background-color: #151E2B;
        color: #FFFFFF;
        padding: 14px 22px;
        border-radius: 8px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        border: 1px solid rgba(255,255,255,0.15);
        z-index: 9999;
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E86014" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      <span>${message}</span>
    `;

    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
    }, 3800);
  };

  // Attach informative toast to placeholder routes
  document.querySelectorAll('[data-route-placeholder]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const pageName = el.getAttribute('data-route-placeholder');
      showToast(`${pageName} page link ready for Phase 2 integration.`);
    });
  });
});
