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
  });
})();
