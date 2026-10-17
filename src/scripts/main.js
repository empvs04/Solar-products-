/**
 * Vidhyut Saathi - Main Application Entrypoint
 */

import '../styles/bundle.css';

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

  // 7. Smooth Anchor Link Handler
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
});
