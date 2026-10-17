/**
 * Vidhyut Saathi - Mobile Navigation Controller
 * Handles mobile hamburger toggle, backdrop, body scroll locking,
 * keyboard accessibility (Escape key), and focus management.
 */

export class MobileNav {
  constructor() {
    this.toggleBtn = document.getElementById('vsNavToggle') || document.getElementById('mobileMenuToggle');
    this.closeBtn = document.getElementById('vsMobileCloseBtn') || document.getElementById('mobileDrawerClose');
    this.drawer = document.getElementById('vsMobileDrawer') || document.getElementById('mobileNavDrawer');
    this.backdrop = document.getElementById('vsNavBackdrop') || document.getElementById('mobileDrawerBackdrop');
    this.navLinks = document.querySelectorAll('.vs-mobile-nav-link, .vs-drawer-link, .vs-mobile-actions .vs-btn, .vs-drawer-actions .vs-btn');

    this.isOpen = false;

    if (this.toggleBtn && this.drawer && this.backdrop) {
      this.init();
    }
  }

  init() {
    // Force hidden state on initialization to eliminate FOUC flash
    if (this.drawer && !this.drawer.classList.contains('is-open')) {
      this.drawer.style.display = 'none';
    }
    if (this.backdrop && !this.backdrop.classList.contains('is-open')) {
      this.backdrop.style.display = 'none';
    }

    // Open on hamburger click
    this.toggleBtn.addEventListener('click', () => this.toggle());

    // Close on close button click
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Close on backdrop click
    this.backdrop.addEventListener('click', () => this.close());

    // Close on navigation link click
    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        this.close();
      });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Close on window resize above mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && this.isOpen) {
        this.close();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.drawer.style.display = 'flex';
    if (this.backdrop) this.backdrop.style.display = 'block';
    void this.drawer.offsetHeight;
    this.drawer.classList.add('is-open');
    if (this.backdrop) this.backdrop.classList.add('is-open');
    this.toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Set focus to close button for screen reader convenience
    setTimeout(() => {
      if (this.closeBtn) this.closeBtn.focus();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.drawer.classList.remove('is-open');
    if (this.backdrop) this.backdrop.classList.remove('is-open');
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    setTimeout(() => {
      if (!this.isOpen) {
        this.drawer.style.display = 'none';
        if (this.backdrop) this.backdrop.style.display = 'none';
      }
    }, 320);
  }
}
