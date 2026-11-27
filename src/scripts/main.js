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
import { initPolicyModal } from './policy-modal.js';
import { initLuxuryBannerSliders } from './banner-slider.js';

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

  // 7. Initialize Interactive Policy Pop-up Modal (Privacy, Disclaimer, Terms, Return/Refund)
  window.vsPolicyModal = initPolicyModal();

  // 8. Smooth Anchor Link Handler
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId || targetId.startsWith('#policy-')) return;

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

  // 9. Initialize Product Card Image Slider (Card 3 Multiple Clamp Meters)
  const initCardSliders = () => {
    const sliders = document.querySelectorAll('[data-card-slider]');
    sliders.forEach((slider) => {
      if (slider.dataset.initialized) return;
      slider.dataset.initialized = 'true';

      const slides = slider.querySelectorAll('.vs-card-slide');
      const dots = slider.querySelectorAll('.vs-card-dot');
      const prevBtn = slider.querySelector('[data-slider-prev]');
      const nextBtn = slider.querySelector('[data-slider-next]');
      let currentIndex = 0;
      let autoTimer = null;

      const goToSlide = (index) => {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;

        slides.forEach((slide, idx) => {
          if (idx === currentIndex) {
            slide.classList.add('is-active');
          } else {
            slide.classList.remove('is-active');
          }
        });

        dots.forEach((dot, idx) => {
          if (idx === currentIndex) {
            dot.classList.add('is-active');
          } else {
            dot.classList.remove('is-active');
          }
        });
      };

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          goToSlide(currentIndex - 1);
          resetAuto();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          goToSlide(currentIndex + 1);
          resetAuto();
        });
      }

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          goToSlide(idx);
          resetAuto();
        });
      });

      let touchStartX = 0;
      slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      slider.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 35) {
          if (diff > 0) goToSlide(currentIndex + 1);
          else goToSlide(currentIndex - 1);
          resetAuto();
        }
      }, { passive: true });

      const startAuto = () => {
        autoTimer = setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 3800);
      };
      const stopAuto = () => {
        if (autoTimer) clearInterval(autoTimer);
      };
      const resetAuto = () => {
        stopAuto();
        startAuto();
      };

      slider.addEventListener('mouseenter', stopAuto);
      slider.addEventListener('mouseleave', startAuto);
      startAuto();
    });
  };

  initCardSliders();

  // 10. Initialize Luxury Showcase Banner Slider
  initLuxuryBannerSliders();

  // 11. Enterprise Scroll Reveal for sections & cards (respects reduced motion)
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll('.vs-why-card, .vs-about-image-card, .vs-about-content, .vs-distributor-box, .vs-secondary-cta-inner');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    revealTargets.forEach((el, idx) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.95) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = `opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${(idx % 4) * 60}ms, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${(idx % 4) * 60}ms`;
        observer.observe(el);
      }
    });
  }
});
