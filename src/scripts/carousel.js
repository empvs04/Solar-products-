/**
 * Vidhyut Saathi - Hero Carousel Controller
 * Features:
 * - 4 Shopify-managed banner slides
 * - Smooth fade/scale transitions
 * - Auto-slide with configurable interval
 * - Pause on hover & focus
 * - Full touch swipe support (mobile & tablet)
 * - Keyboard navigation (Left/Right arrows)
 * - ARIA accessibility compliance
 * - Respects prefers-reduced-motion
 */

export class HeroCarousel {
  constructor(carouselElement, config = {}) {
    this.carousel = carouselElement;
    this.config = Object.assign(
      {
        autoplay: true,
        autoplayIntervalMs: 5500,
        pauseOnHover: true,
        swipeThresholdPx: 40
      },
      config
    );

    this.slides = Array.from(this.carousel.querySelectorAll('.vs-carousel-slide'));
    this.dots = Array.from(this.carousel.querySelectorAll('.vs-carousel-dot'));
    this.prevBtn = this.carousel.querySelector('.vs-carousel-arrow-prev');
    this.nextBtn = this.carousel.querySelector('.vs-carousel-arrow-next');
    this.progressBar = this.carousel.querySelector('.vs-carousel-progress-bar');

    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.autoplayTimer = null;
    this.progressStartTime = null;
    this.progressReqId = null;
    this.isPaused = false;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Touch tracking state
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.isSwiping = false;

    this.init();
  }

  init() {
    if (this.totalSlides <= 1) return;

    // Set initial ARIA and active states
    this.updateSlides(this.currentIndex);

    // Event listeners
    this.bindEvents();

    // Start autoplay if enabled and not reduced motion
    if (this.config.autoplay && !this.isReducedMotion) {
      this.startAutoplay();
    }
  }

  bindEvents() {
    // Arrow buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.resetAutoplay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoplay();
      });
    }

    // Dot indicators
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goTo(index);
        this.resetAutoplay();
      });
    });

    // Keyboard navigation
    this.carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev();
        this.resetAutoplay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next();
        this.resetAutoplay();
      }
    });

    // Pause on hover
    if (this.config.pauseOnHover) {
      this.carousel.addEventListener('mouseenter', () => this.pause());
      this.carousel.addEventListener('mouseleave', () => this.resume());
      this.carousel.addEventListener('focusin', () => this.pause());
      this.carousel.addEventListener('focusout', () => this.resume());
    }

    // Touch swipe gestures
    this.carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.carousel.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    this.carousel.addEventListener('touchend', () => this.handleTouchEnd(), { passive: true });

    // Listen for reduced motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.isReducedMotion = e.matches;
      if (this.isReducedMotion) {
        this.stopAutoplay();
      } else if (this.config.autoplay) {
        this.startAutoplay();
      }
    });
  }

  handleTouchStart(e) {
    if (!e.touches || e.touches.length === 0) return;
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.touchEndX = this.touchStartX;
    this.touchEndY = this.touchStartY;
    this.isSwiping = true;
    this.pause();
  }

  handleTouchMove(e) {
    if (!this.isSwiping || !e.touches || e.touches.length === 0) return;
    this.touchEndX = e.touches[0].clientX;
    this.touchEndY = e.touches[0].clientY;
  }

  handleTouchEnd() {
    if (!this.isSwiping) return;
    this.isSwiping = false;

    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // Horizontal swipe threshold (ensure it was a horizontal gesture, not a vertical scroll)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.config.swipeThresholdPx) {
      if (deltaX < 0) {
        // Swiped Left -> Next slide
        this.next();
      } else {
        // Swiped Right -> Prev slide
        this.prev();
      }
    }

    this.resume();
  }

  updateSlides(newIndex) {
    this.slides.forEach((slide, idx) => {
      const isActive = idx === newIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', (!isActive).toString());
      slide.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    this.dots.forEach((dot, idx) => {
      const isActive = idx === newIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive.toString());
    });

    this.currentIndex = newIndex;
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateSlides(nextIndex);
  }

  prev() {
    const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlides(prevIndex);
  }

  goTo(index) {
    if (index >= 0 && index < this.totalSlides && index !== this.currentIndex) {
      this.updateSlides(index);
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    this.progressStartTime = performance.now();
    this.animateProgressBar();

    this.autoplayTimer = setInterval(() => {
      if (!this.isPaused) {
        this.next();
        this.progressStartTime = performance.now();
      }
    }, this.config.autoplayIntervalMs);
  }

  animateProgressBar() {
    if (!this.progressBar || this.isReducedMotion) return;

    const duration = this.config.autoplayIntervalMs;

    const frame = (now) => {
      if (!this.isPaused && this.progressStartTime) {
        const elapsed = (now - this.progressStartTime) % duration;
        const pct = Math.min((elapsed / duration) * 100, 100);
        this.progressBar.style.width = `${pct}%`;
      }
      this.progressReqId = requestAnimationFrame(frame);
    };

    this.progressReqId = requestAnimationFrame(frame);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
    if (this.progressReqId) {
      cancelAnimationFrame(this.progressReqId);
      this.progressReqId = null;
    }
    if (this.progressBar) {
      this.progressBar.style.width = '0%';
    }
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
    this.progressStartTime = performance.now();
  }

  resetAutoplay() {
    if (this.config.autoplay && !this.isReducedMotion) {
      this.startAutoplay();
    }
  }
}
