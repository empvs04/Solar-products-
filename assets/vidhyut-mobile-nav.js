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

    if (drawer && !drawer.classList.contains('is-open')) {
      drawer.style.display = 'none';
    }
    if (backdrop && !backdrop.classList.contains('is-open')) {
      backdrop.style.display = 'none';
    }

    function open() {
      isOpen = true;
      drawer.style.display = 'flex';
      if (backdrop) backdrop.style.display = 'block';
      void drawer.offsetHeight;
      drawer.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      setTimeout(function() {
        if (closeBtn) closeBtn.focus();
      }, 100);
    }

    function close() {
      isOpen = false;
      drawer.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      setTimeout(function() {
        if (!isOpen) {
          drawer.style.display = 'none';
          if (backdrop) backdrop.style.display = 'none';
        }
      }, 320);
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
