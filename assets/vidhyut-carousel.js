/**
 * Vidhyut Saathi - Shopify Theme Carousel Controller
 */
(function() {
  function initCarousel() {
    var carouselEl = document.getElementById('vsHeroCarousel');
    if (!carouselEl) return;

    var slides = Array.from(carouselEl.querySelectorAll('.vs-carousel-slide'));
    var dots = Array.from(carouselEl.querySelectorAll('.vs-carousel-dot'));
    var prevBtn = carouselEl.querySelector('.vs-carousel-arrow-prev');
    var nextBtn = carouselEl.querySelector('.vs-carousel-arrow-next');
    var progressBar = carouselEl.querySelector('.vs-carousel-progress-bar');

    if (slides.length <= 1) return;

    var currentIndex = 0;
    var totalSlides = slides.length;
    var autoplayInterval = parseInt(carouselEl.getAttribute('data-interval'), 10) || 5500;
    var autoplayEnabled = carouselEl.getAttribute('data-autoplay') !== 'false';
    var autoplayTimer = null;
    var progressStartTime = null;
    var progressReqId = null;
    var isPaused = false;
    var isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function updateSlides(newIndex) {
      slides.forEach(function(slide, idx) {
        var isActive = idx === newIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', (!isActive).toString());
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

    function startAutoplay() {
      stopAutoplay();
      progressStartTime = performance.now();
      animateProgressBar();

      autoplayTimer = setInterval(function() {
        if (!isPaused) {
          next();
          progressStartTime = performance.now();
        }
      }, autoplayInterval);
    }

    function animateProgressBar() {
      if (!progressBar || isReducedMotion) return;
      function frame(now) {
        if (!isPaused && progressStartTime) {
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

    // Bind event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        prev();
        if (autoplayEnabled && !isReducedMotion) startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        next();
        if (autoplayEnabled && !isReducedMotion) startAutoplay();
      });
    }

    dots.forEach(function(dot, idx) {
      dot.addEventListener('click', function() {
        goTo(idx);
        if (autoplayEnabled && !isReducedMotion) startAutoplay();
      });
    });

    carouselEl.addEventListener('mouseenter', function() { isPaused = true; });
    carouselEl.addEventListener('mouseleave', function() { 
      isPaused = false; 
      progressStartTime = performance.now(); 
    });

    // Touch swipe gestures
    var touchStartX = 0;
    var touchEndX = 0;
    carouselEl.addEventListener('touchstart', function(e) {
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchEndX = touchStartX;
        isPaused = true;
      }
    }, { passive: true });

    carouselEl.addEventListener('touchmove', function(e) {
      if (e.touches && e.touches.length > 0) {
        touchEndX = e.touches[0].clientX;
      }
    }, { passive: true });

    carouselEl.addEventListener('touchend', function() {
      var deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          next();
        } else {
          prev();
        }
      }
      isPaused = false;
      progressStartTime = performance.now();
    });

    if (autoplayEnabled && !isReducedMotion) {
      startAutoplay();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }

  // Shopify Theme Editor support
  document.addEventListener('shopify:section:load', function(e) {
    if (e.target && e.target.querySelector('#vsHeroCarousel')) {
      initCarousel();
    }
  });
})();
