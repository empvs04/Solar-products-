/**
 * Vidhyut Saathi - Shopify Theme Main Script
 */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Header elevation on scroll
    var header = document.querySelector('.vs-header');
    if (header) {
      var handleScroll = function() {
        if (window.scrollY > 20) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    // Smooth anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          var headerOffset = 80;
          var elementPosition = targetEl.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Product Card Image Slider (e.g. Card 3 Multiple Clamp Meters)
    function initCardSliders() {
      var sliders = document.querySelectorAll('[data-card-slider]');
      sliders.forEach(function(slider) {
        if (slider.dataset.initialized) return;
        slider.dataset.initialized = 'true';

        var slides = slider.querySelectorAll('.vs-card-slide');
        var dots = slider.querySelectorAll('.vs-card-dot');
        var prevBtn = slider.querySelector('[data-slider-prev]');
        var nextBtn = slider.querySelector('[data-slider-next]');
        var currentIndex = 0;
        var autoTimer = null;

        function goToSlide(index) {
          if (index < 0) index = slides.length - 1;
          if (index >= slides.length) index = 0;
          currentIndex = index;

          slides.forEach(function(slide, idx) {
            if (idx === currentIndex) {
              slide.classList.add('is-active');
            } else {
              slide.classList.remove('is-active');
            }
          });

          dots.forEach(function(dot, idx) {
            if (idx === currentIndex) {
              dot.classList.add('is-active');
            } else {
              dot.classList.remove('is-active');
            }
          });
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goToSlide(currentIndex - 1);
            resetAuto();
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goToSlide(currentIndex + 1);
            resetAuto();
          });
        }

        dots.forEach(function(dot, idx) {
          dot.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goToSlide(idx);
            resetAuto();
          });
        });

        var touchStartX = 0;
        slider.addEventListener('touchstart', function(e) {
          touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', function(e) {
          var touchEndX = e.changedTouches[0].screenX;
          var diff = touchStartX - touchEndX;
          if (Math.abs(diff) > 35) {
            if (diff > 0) goToSlide(currentIndex + 1);
            else goToSlide(currentIndex - 1);
            resetAuto();
          }
        }, { passive: true });

        function startAuto() {
          autoTimer = setInterval(function() {
            goToSlide(currentIndex + 1);
          }, 3800);
        }
        function stopAuto() {
          if (autoTimer) clearInterval(autoTimer);
        }
        function resetAuto() {
          stopAuto();
          startAuto();
        }

        slider.addEventListener('mouseenter', stopAuto);
        slider.addEventListener('mouseleave', startAuto);
        startAuto();
      });
    }

    initCardSliders();

    // Enterprise Scroll Reveal for sections & cards (respects reduced motion)
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced && 'IntersectionObserver' in window) {
      var revealTargets = document.querySelectorAll('.vs-why-card, .vs-about-image-card, .vs-about-content, .vs-distributor-box, .vs-secondary-cta-inner');
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

      revealTargets.forEach(function(el, idx) {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.95) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(18px)';
          el.style.transition = 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) ' + ((idx % 4) * 60) + 'ms, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ' + ((idx % 4) * 60) + 'ms';
          observer.observe(el);
        }
      });
    }
  });
})();
