/**
 * Vidhyut Saathi - Contact Form & FAQ Accordion Controller (Shopify Theme Asset)
 */
(function() {
  function initContactPage() {
    const form = document.getElementById('vsContactForm');
    const faqItems = document.querySelectorAll('.vs-faq-item');

    // 1. FAQ Accordion
    if (faqItems && faqItems.length > 0) {
      faqItems.forEach((item) => {
        const questionBtn = item.querySelector('.vs-faq-question');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');

          faqItems.forEach((other) => {
            if (other !== item && other.classList.contains('is-open')) {
              other.classList.remove('is-open');
              const otherBtn = other.querySelector('.vs-faq-question');
              if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            }
          });

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

    // 2. Form Validation
    if (!form) return;

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const enquiryTypeSelect = document.getElementById('contactEnquiryType');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const submitBtn = document.getElementById('contactSubmitBtn');
    const alertSuccess = document.getElementById('contactAlertSuccess');
    const alertError = document.getElementById('contactAlertError');

    const inputsToWatch = [nameInput, emailInput, phoneInput, enquiryTypeSelect, subjectInput, messageInput];
    inputsToWatch.forEach((input) => {
      if (!input) return;
      const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(eventType, () => {
        clearFieldError(input);
      });
    });

    function setFieldError(inputEl, message) {
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

    function clearFieldError(inputEl) {
      if (!inputEl) return;
      inputEl.classList.remove('is-invalid');
      const group = inputEl.closest('.vs-form-group');
      if (group) {
        group.classList.remove('has-error');
      }
    }

    function setFieldSuccess(inputEl) {
      if (!inputEl) return;
      inputEl.classList.remove('is-invalid');
      inputEl.classList.add('is-valid');
      const group = inputEl.closest('.vs-form-group');
      if (group) {
        group.classList.remove('has-error');
      }
    }

    form.addEventListener('submit', (e) => {
      const isShopifyNative = form.hasAttribute('data-shopify-form');
      let isValid = true;

      if (alertSuccess) alertSuccess.classList.remove('is-visible');
      if (alertError) alertError.classList.remove('is-visible');

      // 1. Full Name
      if (!nameInput || !nameInput.value.trim()) {
        setFieldError(nameInput, 'Please enter your full name.');
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'Name must be at least 2 characters.');
        isValid = false;
      } else {
        setFieldSuccess(nameInput);
      }

      // 2. Email Address
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailInput || !emailInput.value.trim()) {
        setFieldError(emailInput, 'Please enter your email address.');
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        setFieldError(emailInput, 'Please enter a valid email address (e.g. name@domain.com).');
        isValid = false;
      } else {
        setFieldSuccess(emailInput);
      }

      // 3. Phone (Optional)
      if (phoneInput && phoneInput.value.trim()) {
        const cleanedPhone = phoneInput.value.replace(/[\s\-\(\)\+]/g, '');
        if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
          setFieldError(phoneInput, 'Please enter a valid phone number (7-15 digits).');
          isValid = false;
        } else {
          setFieldSuccess(phoneInput);
        }
      } else if (phoneInput) {
        clearFieldError(phoneInput);
      }

      // 4. Enquiry Type
      if (!enquiryTypeSelect || !enquiryTypeSelect.value || enquiryTypeSelect.value === '') {
        setFieldError(enquiryTypeSelect, 'Please select an enquiry category.');
        isValid = false;
      } else {
        setFieldSuccess(enquiryTypeSelect);
      }

      // 5. Subject
      if (!subjectInput || !subjectInput.value.trim()) {
        setFieldError(subjectInput, 'Please enter an enquiry subject.');
        isValid = false;
      } else if (subjectInput.value.trim().length < 3) {
        setFieldError(subjectInput, 'Subject must be at least 3 characters.');
        isValid = false;
      } else {
        setFieldSuccess(subjectInput);
      }

      // 6. Message
      if (!messageInput || !messageInput.value.trim()) {
        setFieldError(messageInput, 'Please enter your message details.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        setFieldError(messageInput, 'Please provide more details in your message (minimum 10 characters).');
        isValid = false;
      } else {
        setFieldSuccess(messageInput);
      }

      if (!isValid) {
        e.preventDefault();
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      if (!isShopifyNative) {
        e.preventDefault();
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

          form.reset();
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactPage);
  } else {
    initContactPage();
  }
})();
