/**
 * Vidhyut Saathi - Distributorship Registration Form Controller
 *
 * Validates the 9 required distributor fields:
 * 1. first_name (Text input, Required)
 * 2. last_name (Text input, Required)
 * 3. mobile_number (Tel input, Required, Indian mobile validation with optional +91)
 * 4. email (Email input, Required, valid email format)
 * 5. address_line_1 (Text input, Required)
 * 6. address_line_2 (Text input, Optional)
 * 7. city (Text input, Required)
 * 8. state (Select dropdown, Required, 36 Indian states & UTs)
 * 9. pincode (Numeric input, Required, 6-digit Indian PIN code)
 *
 * Button text: "Submit Distributorship Enquiry"
 * Success message: "Thank you for your interest in Vidhyut Saathi distributorship. Your enquiry has been submitted successfully."
 * Privacy notice: "Your information will be used to process your distributorship enquiry and contact you regarding your request."
 */

export class DistributorshipFormController {
  constructor(formId = 'vsDistributorForm') {
    this.form = document.getElementById(formId);
    if (!this.form) return;
    this.init();
  }

  init() {
    this.firstNameInput = document.getElementById('distributorFirstName');
    this.lastNameInput = document.getElementById('distributorLastName');
    this.mobileInput = document.getElementById('distributorMobile');
    this.emailInput = document.getElementById('distributorEmail');
    this.address1Input = document.getElementById('distributorAddress1');
    this.address2Input = document.getElementById('distributorAddress2');
    this.cityInput = document.getElementById('distributorCity');
    this.stateSelect = document.getElementById('distributorState');
    this.pincodeInput = document.getElementById('distributorPincode');

    this.submitBtn = document.getElementById('distributorSubmitBtn');
    this.alertSuccess = document.getElementById('distributorAlertSuccess');
    this.alertError = document.getElementById('distributorAlertError');

    this.bindLiveValidation();
    this.bindSubmit();
  }

  bindLiveValidation() {
    const inputs = [
      this.firstNameInput,
      this.lastNameInput,
      this.mobileInput,
      this.emailInput,
      this.address1Input,
      this.address2Input,
      this.cityInput,
      this.stateSelect,
      this.pincodeInput
    ];

    inputs.forEach((input) => {
      if (!input) return;
      const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(eventType, () => {
        this.clearFieldError(input);
      });
    });

    // Formatting helper for pincode: numeric only, max 6 digits
    if (this.pincodeInput) {
      this.pincodeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
      });
    }

    // Formatting helper for mobile: allow +, digits, spaces, hyphens
    if (this.mobileInput) {
      this.mobileInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d+ \-]/g, '');
      });
    }
  }

  bindSubmit() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset global banner alerts
      if (this.alertSuccess) {
        this.alertSuccess.classList.remove('is-visible');
        this.alertSuccess.setAttribute('aria-hidden', 'true');
      }
      if (this.alertError) {
        this.alertError.classList.remove('is-visible');
        this.alertError.setAttribute('aria-hidden', 'true');
      }

      const isValid = this.validateForm();

      if (!isValid) {
        // Focus first invalid field for accessibility
        const firstErrorField = this.form.querySelector('.is-invalid');
        if (firstErrorField) {
          firstErrorField.focus();
        }
        return;
      }

      // Collect data model
      const formData = {
        first_name: this.firstNameInput.value.trim(),
        last_name: this.lastNameInput.value.trim(),
        mobile_number: this.mobileInput.value.trim(),
        email: this.emailInput.value.trim(),
        address_line_1: this.address1Input.value.trim(),
        address_line_2: this.address2Input ? this.address2Input.value.trim() : '',
        city: this.cityInput.value.trim(),
        state: this.stateSelect.value,
        pincode: this.pincodeInput.value.trim(),
        submitted_at: new Date().toISOString()
      };

      // Set submission loading state (prevent accidental duplicate submissions)
      this.setSubmitting(true);

      try {
        const result = await this.submitEnquiry(formData);

        if (result.success) {
          if (this.alertSuccess) {
            this.alertSuccess.classList.add('is-visible');
            this.alertSuccess.removeAttribute('aria-hidden');
            this.alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          this.form.reset();
          // Clear field success/error classes
          this.clearAllFieldStates();
        } else {
          this.showErrorAlert(result.message || 'Submission failed. Please check your information and try again.');
        }
      } catch (err) {
        this.showErrorAlert('An unexpected connection error occurred. Please try again or contact us directly at +91-8199036060.');
      } finally {
        this.setSubmitting(false);
      }
    });
  }

  validateForm() {
    let isValid = true;

    // 1. First Name
    if (!this.firstNameInput || !this.firstNameInput.value.trim()) {
      this.setFieldError(this.firstNameInput, 'Please enter your first name.');
      isValid = false;
    } else if (this.firstNameInput.value.trim().length < 2) {
      this.setFieldError(this.firstNameInput, 'First name must be at least 2 characters.');
      isValid = false;
    } else {
      this.setFieldSuccess(this.firstNameInput);
    }

    // 2. Last Name
    if (!this.lastNameInput || !this.lastNameInput.value.trim()) {
      this.setFieldError(this.lastNameInput, 'Please enter your last name.');
      isValid = false;
    } else if (this.lastNameInput.value.trim().length < 1) {
      this.setFieldError(this.lastNameInput, 'Please enter a valid last name.');
      isValid = false;
    } else {
      this.setFieldSuccess(this.lastNameInput);
    }

    // 3. Mobile Number (Indian mobile format: optional +91 prefix, starts with 6,7,8,9, exactly 10 digits)
    if (!this.mobileInput || !this.mobileInput.value.trim()) {
      this.setFieldError(this.mobileInput, 'Please enter your 10-digit mobile number.');
      isValid = false;
    } else {
      const rawMobile = this.mobileInput.value.trim();
      // Strip spaces, dashes, parentheses
      const cleanMobile = rawMobile.replace(/[\s\-()]/g, '');
      // Match optional +91 or 91 prefix followed by 10 digits starting with 6-9, or directly 10 digits starting with 6-9
      const indianPhoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
      if (!indianPhoneRegex.test(cleanMobile)) {
        this.setFieldError(this.mobileInput, 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210 or +91 9876543210).');
        isValid = false;
      } else {
        this.setFieldSuccess(this.mobileInput);
      }
    }

    // 4. Email ID
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!this.emailInput || !this.emailInput.value.trim()) {
      this.setFieldError(this.emailInput, 'Please enter your email ID.');
      isValid = false;
    } else if (!emailPattern.test(this.emailInput.value.trim())) {
      this.setFieldError(this.emailInput, 'Please enter a valid email address (e.g. name@domain.com).');
      isValid = false;
    } else {
      this.setFieldSuccess(this.emailInput);
    }

    // 5. Address Line 1
    if (!this.address1Input || !this.address1Input.value.trim()) {
      this.setFieldError(this.address1Input, 'Please enter Address Line 1 (Street, Shop/Office No., Landmark).');
      isValid = false;
    } else if (this.address1Input.value.trim().length < 5) {
      this.setFieldError(this.address1Input, 'Address Line 1 must be at least 5 characters.');
      isValid = false;
    } else {
      this.setFieldSuccess(this.address1Input);
    }

    // 6. Address Line 2 (Optional)
    if (this.address2Input && this.address2Input.value.trim()) {
      this.setFieldSuccess(this.address2Input);
    } else if (this.address2Input) {
      this.clearFieldError(this.address2Input);
    }

    // 7. City
    if (!this.cityInput || !this.cityInput.value.trim()) {
      this.setFieldError(this.cityInput, 'Please enter your city.');
      isValid = false;
    } else if (this.cityInput.value.trim().length < 2) {
      this.setFieldError(this.cityInput, 'City name must be at least 2 characters.');
      isValid = false;
    } else {
      this.setFieldSuccess(this.cityInput);
    }

    // 8. State
    if (!this.stateSelect || !this.stateSelect.value || this.stateSelect.value === '') {
      this.setFieldError(this.stateSelect, 'Please select your state or union territory.');
      isValid = false;
    } else {
      this.setFieldSuccess(this.stateSelect);
    }

    // 9. PIN Code (6-digit Indian postal code: first digit 1-9, followed by 5 digits)
    const pincodePattern = /^[1-9][0-9]{5}$/;
    if (!this.pincodeInput || !this.pincodeInput.value.trim()) {
      this.setFieldError(this.pincodeInput, 'Please enter your 6-digit PIN code.');
      isValid = false;
    } else if (!pincodePattern.test(this.pincodeInput.value.trim())) {
      this.setFieldError(this.pincodeInput, 'Please enter a valid 6-digit Indian PIN code (e.g. 124001).');
      isValid = false;
    } else {
      this.setFieldSuccess(this.pincodeInput);
    }

    return isValid;
  }

  async submitEnquiry(data) {
    // Check if a dedicated backend endpoint is provided via data attribute or form action
    const actionUrl = this.form.getAttribute('action');
    const isDedicatedBackend = actionUrl && actionUrl !== '#' && !actionUrl.startsWith('javascript:');

    if (isDedicatedBackend) {
      const response = await fetch(actionUrl, {
        method: this.form.getAttribute('method') || 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      return { success: true };
    }

    // If no external backend API is configured, simulate realistic async processing (650ms)
    // and store in secure session storage for integration verification
    await new Promise((resolve) => setTimeout(resolve, 650));

    try {
      const existingEnquiries = JSON.parse(sessionStorage.getItem('vs_distributor_enquiries') || '[]');
      existingEnquiries.push({
        id: 'VS-DIST-' + Date.now(),
        ...data
      });
      sessionStorage.setItem('vs_distributor_enquiries', JSON.stringify(existingEnquiries));
    } catch (e) {
      // Session storage might be unavailable in private browsing mode, continue safely
    }

    return { success: true };
  }

  setFieldError(input, message) {
    if (!input) return;
    const formGroup = input.closest('.vs-form-group');
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    input.setAttribute('aria-invalid', 'true');

    if (formGroup) {
      let errorEl = formGroup.querySelector('.vs-field-error');
      if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'vs-field-error';
        errorEl.setAttribute('role', 'alert');
        formGroup.appendChild(errorEl);
      }
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  setFieldSuccess(input) {
    if (!input) return;
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.removeAttribute('aria-invalid');

    const formGroup = input.closest('.vs-form-group');
    if (formGroup) {
      const errorEl = formGroup.querySelector('.vs-field-error');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    }
  }

  clearFieldError(input) {
    if (!input) return;
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');

    const formGroup = input.closest('.vs-form-group');
    if (formGroup) {
      const errorEl = formGroup.querySelector('.vs-field-error');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    }
  }

  clearAllFieldStates() {
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      input.classList.remove('is-valid', 'is-invalid');
      input.removeAttribute('aria-invalid');
      const formGroup = input.closest('.vs-form-group');
      if (formGroup) {
        const errorEl = formGroup.querySelector('.vs-field-error');
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.style.display = 'none';
        }
      }
    });
  }

  setSubmitting(isSubmitting) {
    if (!this.submitBtn) return;
    this.submitBtn.disabled = isSubmitting;
    if (isSubmitting) {
      this.submitBtn.classList.add('is-loading');
      this.submitBtn.setAttribute('data-original-text', this.submitBtn.innerHTML);
      this.submitBtn.innerHTML = `
        <span class="vs-spinner" aria-hidden="true"></span>
        <span>Submitting Enquiry...</span>
      `;
    } else {
      this.submitBtn.classList.remove('is-loading');
      const originalText = this.submitBtn.getAttribute('data-original-text');
      if (originalText) {
        this.submitBtn.innerHTML = originalText;
      } else {
        this.submitBtn.innerHTML = `
          <span>Submit Distributorship Enquiry</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="vs-btn-icon" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        `;
      }
    }
  }

  showErrorAlert(message) {
    if (this.alertError) {
      const msgEl = this.alertError.querySelector('.vs-alert-message') || this.alertError;
      msgEl.textContent = message;
      this.alertError.classList.add('is-visible');
      this.alertError.removeAttribute('aria-hidden');
      this.alertError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}
