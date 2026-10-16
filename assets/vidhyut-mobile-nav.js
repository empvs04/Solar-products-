/**
 * Vidhyut Saathi - Shopify Theme Mobile Navigation Controller
 */
(function() {
  function initMobileNav() {
    var toggleBtn = document.getElementById('vsNavToggle');
    var closeBtn = document.getElementById('vsMobileCloseBtn');
    var drawer = document.getElementById('vsMobileDrawer');
    var backdrop = document.getElementById('vsNavBackdrop');
    var navLinks = document.querySelectorAll('.vs-mobile-nav-link, .vs-mobile-actions .vs-btn');

    if (!toggleBtn || !drawer || !backdrop) return;

    var isOpen = false;

    function open() {
      isOpen = true;
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      setTimeout(function() {
        if (closeBtn) closeBtn.focus();
      }, 100);
    }

    function close() {
      isOpen = false;
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', function() {
      if (isOpen) {
        close();
      } else {
        open();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);

    navLinks.forEach(function(link) {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) close();
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth > 1024 && isOpen) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
