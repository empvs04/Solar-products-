/**
 * Vidhyut Saathi - Shopify Theme Carousel Controller
 * Features:
 * - 4 Shopify-managed banner slides
 * - Touch swipe gestures for mobile & tablet
 * - Auto-slide with configurable interval
 * - Full Shopify Theme Editor lifecycle integration:
 *   - shopify:block:select: immediately shows and pins the selected slide
 *   - shopify:block:deselect: resumes normal autoplay
 *   - shopify:section:select / shopify:section:deselect
 *   - shopify:section:load / shopify:section:unload
 */
(function() {
  'use strict';

  function createCarousel(carouselEl) {
    if (!carouselEl) return null;

    // Destroy any existing instance on this element
    if (carouselEl._vsCarouselInstance && typeof carouselEl._vsCarouselInstance.destroy === 'function') {
      carouselEl._vsCarouselInstance.destroy();
    }

    var slides = Array.from(carouselEl.querySelectorAll('.vs-carousel-slide'));
    var dots = Array.from(carouselEl.querySelectorAll('.vs-carousel-dot'));
    var prevBtn = carouselEl.querySelector('.vs-carousel-arrow-prev');
    var nextBtn = carouselEl.querySelector('.vs-carousel-arrow-next');
    var progressBar = carouselEl.querySelector('.vs-carousel-progress-bar');

    if (slides.length <= 1) return null;

    var currentIndex = 0;
    var totalSlides = slides.length;
    var autoplayInterval = parseInt(carouselEl.getAttribute('data-interval'), 10) || 5500;
    var autoplayEnabled = carouselEl.getAttribute('data-autoplay') !== 'false';
    var autoplayTimer = null;
    var progressStartTime = null;
    var progressReqId = null;
    var isPaused = false;
    var isThemeEditorInspecting = false;
    var isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Touch tracking state
    var touchStartX = 0;
    var touchStartY = 0;
    var touchEndX = 0;
    var touchEndY = 0;
    var isSwiping = false;

    function updateSlides(newIndex) {
      if (newIndex < 0 || newIndex >= totalSlides) return;

      slides.forEach(function(slide, idx) {
        var isActive = idx === newIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', (!isActive).toString());
        slide.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      dots.forEach(function(dot, idx) {
        var isActive = idx === newIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', isActive.toString());
      });

      currentIndex = newIndex;
    }

    function next() {
      updateSlides((currentIndex + 1) % totalSlides);
    }

    function prev() {
      updateSlides((currentIndex - 1 + totalSlides) % totalSlides);
    }

    function goTo(idx) {
      if (idx >= 0 && idx < totalSlides) {
        updateSlides(idx);
      }
    }

    function goToBlock(blockId) {
      if (!blockId) return;
      for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        if (
          slide.getAttribute('data-block-id') === blockId ||
          slide.id.indexOf(blockId) !== -1 ||
          slide.getAttribute('shopify-editor-block') === blockId
        ) {
          goTo(i);
          return;
        }
      }
    }

    function startAutoplay() {
      stopAutoplay();
      if (!autoplayEnabled || isReducedMotion || isThemeEditorInspecting) return;

      progressStartTime = performance.now();
      animateProgressBar();

      autoplayTimer = setInterval(function() {
        if (!isPaused && !isThemeEditorInspecting) {
          next();
          progressStartTime = performance.now();
        }
      }, autoplayInterval);
    }

    function animateProgressBar() {
      if (!progressBar || isReducedMotion) return;

      function frame(now) {
        if (!isPaused && !isThemeEditorInspecting && progressStartTime) {
          var elapsed = (now - progressStartTime) % autoplayInterval;
          var pct = Math.min((elapsed / autoplayInterval) * 100, 100);
          progressBar.style.width = pct + '%';
        }
        progressReqId = requestAnimationFrame(frame);
      }
      progressReqId = requestAnimationFrame(frame);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
      if (progressReqId) {
        cancelAnimationFrame(progressReqId);
        progressReqId = null;
      }
      if (progressBar) {
        progressBar.style.width = '0%';
      }
    }

    // Event Handlers
    function onPrevClick() {
      prev();
      if (autoplayEnabled && !isReducedMotion && !isThemeEditorInspecting) {
        startAutoplay();
      }
    }

    function onNextClick() {
      next();
      if (autoplayEnabled && !isReducedMotion && !isThemeEditorInspecting) {
        startAutoplay();
      }
    }

    function onDotClick(e) {
      var dotIndex = dots.indexOf(e.currentTarget);
      if (dotIndex !== -1) {
        goTo(dotIndex);
        if (autoplayEnabled && !isReducedMotion && !isThemeEditorInspecting) {
          startAutoplay();
        }
      }
    }

    function onMouseEnter() {
      isPaused = true;
    }

    function onMouseLeave() {
      isPaused = false;
      progressStartTime = performance.now();
    }

    function onTouchStart(e) {
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchEndX = touchStartX;
        touchEndY = touchStartY;
        isSwiping = true;
        isPaused = true;
      }
    }

    function onTouchMove(e) {
      if (!isSwiping || !e.touches || e.touches.length === 0) return;
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;

      var deltaX = touchEndX - touchStartX;
      var deltaY = touchEndY - touchStartY;

      // Prevent mobile browser horizontal viewport displacement / horizontal panning
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    }

    function onTouchEnd() {
      if (!isSwiping) return;
      isSwiping = false;

      var deltaX = touchEndX - touchStartX;
      var deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          next();
        } else {
          prev();
        }
      }
      isPaused = false;
      progressStartTime = performance.now();
    }

    function onKeyDown(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    }

    // Attach listeners
    if (prevBtn) prevBtn.addEventListener('click', onPrevClick);
    if (nextBtn) nextBtn.addEventListener('click', onNextClick);
    dots.forEach(function(dot) {
      dot.addEventListener('click', onDotClick);
    });

    carouselEl.addEventListener('mouseenter', onMouseEnter);
    carouselEl.addEventListener('mouseleave', onMouseLeave);
    carouselEl.addEventListener('focusin', onMouseEnter);
    carouselEl.addEventListener('focusout', onMouseLeave);
    carouselEl.addEventListener('keydown', onKeyDown);

    carouselEl.addEventListener('touchstart', onTouchStart, { passive: true });
    carouselEl.addEventListener('touchmove', onTouchMove, { passive: false });
    carouselEl.addEventListener('touchcancel', onTouchEnd, { passive: true });
    carouselEl.addEventListener('touchend', onTouchEnd, { passive: true });

    // Ensure first slide is active
    updateSlides(0);

    // Start autoplay
    if (autoplayEnabled && !isReducedMotion) {
      startAutoplay();
    }

    var instance = {
      goTo: goTo,
      goToBlock: goToBlock,
      next: next,
      prev: prev,
      pause: function() {
        isPaused = true;
      },
      resume: function() {
        isPaused = false;
        progressStartTime = performance.now();
      },
      setThemeEditorInspecting: function(isInspecting) {
        isThemeEditorInspecting = isInspecting;
        if (isInspecting) {
          stopAutoplay();
        } else if (autoplayEnabled && !isReducedMotion) {
          startAutoplay();
        }
      },
      destroy: function() {
        stopAutoplay();
        if (prevBtn) prevBtn.removeEventListener('click', onPrevClick);
        if (nextBtn) nextBtn.removeEventListener('click', onNextClick);
        dots.forEach(function(dot) {
          dot.removeEventListener('click', onDotClick);
        });
        carouselEl.removeEventListener('mouseenter', onMouseEnter);
        carouselEl.removeEventListener('mouseleave', onMouseLeave);
        carouselEl.removeEventListener('focusin', onMouseEnter);
        carouselEl.removeEventListener('focusout', onMouseLeave);
        carouselEl.removeEventListener('keydown', onKeyDown);
        carouselEl.removeEventListener('touchstart', onTouchStart);
        carouselEl.removeEventListener('touchmove', onTouchMove);
        carouselEl.removeEventListener('touchend', onTouchEnd);
        carouselEl.removeEventListener('touchcancel', onTouchEnd);
        carouselEl._vsCarouselInstance = null;
      }
    };

    carouselEl._vsCarouselInstance = instance;
    return instance;
  }

  function initAllCarousels() {
    var carousels = document.querySelectorAll('#vsHeroCarousel, .vs-carousel');
    carousels.forEach(function(el) {
      createCarousel(el);
    });
  }

  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCarousels);
  } else {
    initAllCarousels();
  }

  // =========================================================================
  // Shopify Theme Editor Integration
  // =========================================================================
  document.addEventListener('shopify:section:load', function(e) {
    if (e.target) {
      var carouselEl = e.target.querySelector('#vsHeroCarousel, .vs-carousel');
      if (carouselEl) {
        createCarousel(carouselEl);
      }
    }
  });

  document.addEventListener('shopify:section:unload', function(e) {
    if (e.target) {
      var carouselEl = e.target.querySelector('#vsHeroCarousel, .vs-carousel');
      if (carouselEl && carouselEl._vsCarouselInstance) {
        carouselEl._vsCarouselInstance.destroy();
      }
    }
  });

  document.addEventListener('shopify:section:select', function(e) {
    if (e.target) {
      var carouselEl = e.target.querySelector('#vsHeroCarousel, .vs-carousel');
      if (carouselEl && carouselEl._vsCarouselInstance) {
        carouselEl._vsCarouselInstance.setThemeEditorInspecting(true);
      }
    }
  });

  document.addEventListener('shopify:section:deselect', function(e) {
    if (e.target) {
      var carouselEl = e.target.querySelector('#vsHeroCarousel, .vs-carousel');
      if (carouselEl && carouselEl._vsCarouselInstance) {
        carouselEl._vsCarouselInstance.setThemeEditorInspecting(false);
      }
    }
  });

  document.addEventListener('shopify:block:select', function(e) {
    var blockEl = e.target;
    if (!blockEl) return;

    var carouselEl = blockEl.closest ? blockEl.closest('.vs-carousel') : document.getElementById('vsHeroCarousel');
    if (!carouselEl || !carouselEl._vsCarouselInstance) return;

    // Pause auto-sliding so the slide remains visible for editing/inspecting
    carouselEl._vsCarouselInstance.setThemeEditorInspecting(true);

    // Find the slide corresponding to the selected block
    var slideEl = blockEl.classList && blockEl.classList.contains('vs-carousel-slide')
      ? blockEl
      : (blockEl.closest ? blockEl.closest('.vs-carousel-slide') : null);

    if (slideEl) {
      var slideIndex = parseInt(slideEl.getAttribute('data-slide-index'), 10);
      if (!isNaN(slideIndex)) {
        carouselEl._vsCarouselInstance.goTo(slideIndex);
        return;
      }
    }

    if (e.detail && e.detail.blockId) {
      carouselEl._vsCarouselInstance.goToBlock(e.detail.blockId);
    }
  });

  document.addEventListener('shopify:block:deselect', function(e) {
    var blockEl = e.target;
    var carouselEl = blockEl && blockEl.closest ? blockEl.closest('.vs-carousel') : document.getElementById('vsHeroCarousel');
    if (carouselEl && carouselEl._vsCarouselInstance) {
      carouselEl._vsCarouselInstance.setThemeEditorInspecting(false);
    }
  });
})();
