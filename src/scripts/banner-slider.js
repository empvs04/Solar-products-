/**
 * Vidhyut Saathi - Showcase Luxury Banner Slider Controller
 */

export class LuxuryBannerSlider {
  constructor(cardEl) {
    if (!cardEl) return;
    this.container = cardEl;
    this.track = cardEl.querySelector('.vs-luxury-track');
    this.slides = Array.from(cardEl.querySelectorAll('.vs-luxury-slide'));
    this.prevBtn = cardEl.querySelector('.vs-luxury-arrow-prev');
    this.nextBtn = cardEl.querySelector('.vs-luxury-arrow-next');
    this.dots = Array.from(cardEl.querySelectorAll('.vs-luxury-dot'));

    this.currentIndex = 0;
    this.slideCount = this.slides.length;
    if (this.slideCount <= 1) {
      if (this.prevBtn) this.prevBtn.style.display = 'none';
      if (this.nextBtn) this.nextBtn.style.display = 'none';
      if (cardEl.querySelector('.vs-luxury-dots')) {
        cardEl.querySelector('.vs-luxury-dots').style.display = 'none';
      }
      return;
    }

    this.autoplayEnabled = cardEl.dataset.autoplay !== 'false';
    this.autoplayInterval = parseInt(cardEl.dataset.interval, 10) || 5000;
    this.timer = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.startAutoplay();
    this.goToSlide(0);
  }

  goToSlide(index) {
    if (index < 0) {
      this.currentIndex = this.slideCount - 1;
    } else if (index >= this.slideCount) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = index;
    }

    const translateVal = -(this.currentIndex * 100);
    if (this.track) {
      this.track.style.transform = `translateX(${translateVal}%)`;
    }

    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === this.currentIndex);
      dot.setAttribute('aria-selected', i === this.currentIndex ? 'true' : 'false');
    });
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  startAutoplay() {
    if (!this.autoplayEnabled || this.slideCount <= 1) return;
    this.stopAutoplay();
    this.timer = setInterval(() => {
      this.nextSlide();
    }, this.autoplayInterval);
  }

  stopAutoplay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.startAutoplay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.startAutoplay();
      });
    }

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.startAutoplay();
      });
    });

    // Pause autoplay on mouse enter
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => this.startAutoplay());

    // Touch swipe support
    let startX = 0;
    let endX = 0;

    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      this.stopAutoplay();
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
      this.startAutoplay();
    }, { passive: true });
  }
}

export function initLuxuryBannerSliders() {
  const cards = document.querySelectorAll('.vs-luxury-slider-card');
  cards.forEach((c) => {
    if (!c.__luxurySliderInit) {
      c.__luxurySliderInit = new LuxuryBannerSlider(c);
    }
  });
}
