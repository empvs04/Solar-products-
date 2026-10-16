/**
 * Vidhyut Saathi - Contact Form & FAQ Accordion Controller
 */

export class ContactPageController {
  constructor() {
    this.form = document.getElementById('vsContactForm');
    this.faqItems = document.querySelectorAll('.vs-faq-item');
    this.init();
  }

  init() {
    this.initFormValidation();
    this.initFaqAccordion();
  }

  initFormValidation() {
    if (!this.form) return;

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const enquiryTypeSelect = document.getElementById('contactEnquiryType');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const submitBtn = document.getElementById('contactSubmitBtn');
    const alertSuccess = document.getElementById('contactAlertSuccess');
    const alertError = document.getElementById('contactAlertError');

    // Live validation clearance on user input
    const inputsToWatch = [nameInput, emailInput, phoneInput, enquiryTypeSelect, subjectInput, messageInput];
    inputsToWatch.forEach((input) => {
      if (!input) return;
      const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(eventType, () => {
        this.clearFieldError(input);
      });
    });

    this.form.addEventListener('submit', (e) => {
      // In Shopify native Liquid environment with action="/contact#contact_form", 
      // if valid and having action attribute pointing to a real endpoint, let it submit.
      // In static frontend environment (no server action), intercept with client-side validation.
      const isShopifyNative = this.form.hasAttribute('data-shopify-form');

      let isValid = true;
      if (alertSuccess) alertSuccess.classList.remove('is-visible');
      if (alertError) alertError.classList.remove('is-visible');

      // 1. Full Name Validation
      if (!nameInput || !nameInput.value.trim()) {
        this.setFieldError(nameInput, 'Please enter your full name.');
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        this.setFieldError(nameInput, 'Name must be at least 2 characters.');
        isValid = false;
      } else {
        this.setFieldSuccess(nameInput);
      }

      // 2. Email Address Validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailInput || !emailInput.value.trim()) {
        this.setFieldError(emailInput, 'Please enter your email address.');
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        this.setFieldError(emailInput, 'Please enter a valid email address (e.g. name@domain.com).');
        isValid = false;
      } else {
        this.setFieldSuccess(emailInput);
      }

      // 3. Phone Number (Optional, but if filled, validate reasonable length)
      if (phoneInput && phoneInput.value.trim()) {
        const cleanedPhone = phoneInput.value.replace(/[\s\-\(\)\+]/g, '');
        if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
          this.setFieldError(phoneInput, 'Please enter a valid phone number (7-15 digits).');
          isValid = false;
        } else {
          this.setFieldSuccess(phoneInput);
        }
      } else if (phoneInput) {
        this.clearFieldError(phoneInput);
      }

      // 4. Enquiry Type Validation
      if (!enquiryTypeSelect || !enquiryTypeSelect.value || enquiryTypeSelect.value === '') {
        this.setFieldError(enquiryTypeSelect, 'Please select an enquiry category.');
        isValid = false;
      } else {
        this.setFieldSuccess(enquiryTypeSelect);
      }

      // 5. Subject Validation
      if (!subjectInput || !subjectInput.value.trim()) {
        this.setFieldError(subjectInput, 'Please enter an enquiry subject.');
        isValid = false;
      } else if (subjectInput.value.trim().length < 3) {
        this.setFieldError(subjectInput, 'Subject must be at least 3 characters.');
        isValid = false;
      } else {
        this.setFieldSuccess(subjectInput);
      }

      // 6. Message Validation
      if (!messageInput || !messageInput.value.trim()) {
        this.setFieldError(messageInput, 'Please enter your message details.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        this.setFieldError(messageInput, 'Please provide more details in your message (minimum 10 characters).');
        isValid = false;
      } else {
        this.setFieldSuccess(messageInput);
      }

      if (!isValid) {
        e.preventDefault();
        // Scroll first invalid field into comfortable view
        const firstInvalid = this.form.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // If standalone frontend (not submitting to Shopify backend endpoint)
      if (!isShopifyNative) {
        e.preventDefault();

        // Prevent duplicate submissions
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add('is-loading');
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('is-loading');
          }

          if (alertSuccess) {
            alertSuccess.classList.add('is-visible');
            alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          this.form.reset();
          inputsToWatch.forEach((input) => {
            if (input) {
              input.classList.remove('is-valid');
              input.classList.remove('is-invalid');
            }
          });
        }, 800);
      }
    });
  }

  setFieldError(inputEl, message) {
    if (!inputEl) return;
    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');
    const group = inputEl.closest('.vs-form-group');
    if (group) {
      group.classList.add('has-error');
      const errEl = group.querySelector('.vs-field-error-text');
      if (errEl) errEl.textContent = message;
    }
  }

  clearFieldError(inputEl) {
    if (!inputEl) return;
    inputEl.classList.remove('is-invalid');
    const group = inputEl.closest('.vs-form-group');
    if (group) {
      group.classList.remove('has-error');
    }
  }

  setFieldSuccess(inputEl) {
    if (!inputEl) return;
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
    const group = inputEl.closest('.vs-form-group');
    if (group) {
      group.classList.remove('has-error');
    }
  }

  initFaqAccordion() {
    if (!this.faqItems || this.faqItems.length === 0) return;

    this.faqItems.forEach((item) => {
      const questionBtn = item.querySelector('.vs-faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close other accordion items for clean accordion UX
        this.faqItems.forEach((other) => {
          if (other !== item && other.classList.contains('is-open')) {
            other.classList.remove('is-open');
            const otherBtn = other.querySelector('.vs-faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('is-open');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
}
