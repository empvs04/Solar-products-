/**
 * Vidhyut Saathi - Mobile Navigation Controller
 * Handles mobile hamburger toggle, backdrop, body scroll locking,
 * keyboard accessibility (Escape key), and focus management.
 */

export class MobileNav {
  constructor() {
    this.toggleBtn = document.getElementById('vsNavToggle');
    this.closeBtn = document.getElementById('vsMobileCloseBtn');
    this.drawer = document.getElementById('vsMobileDrawer');
    this.backdrop = document.getElementById('vsNavBackdrop');
    this.navLinks = document.querySelectorAll('.vs-mobile-nav-link, .vs-mobile-actions .vs-btn');

    this.isOpen = false;

    if (this.toggleBtn && this.drawer && this.backdrop) {
      this.init();
    }
  }

  init() {
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
    this.drawer.classList.add('is-open');
    this.backdrop.classList.add('is-open');
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
    this.backdrop.classList.remove('is-open');
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}
