/**
 * Vidhyut Saathi - Shopify Asset Distributorship Form Script
 */
(function() {
  function initDistributorForm() {
    var form = document.getElementById('vsDistributorForm');
    if (!form) return;

    var firstNameInput = document.getElementById('distributorFirstName');
    var lastNameInput = document.getElementById('distributorLastName');
    var mobileInput = document.getElementById('distributorMobile');
    var emailInput = document.getElementById('distributorEmail');
    var address1Input = document.getElementById('distributorAddress1');
    var address2Input = document.getElementById('distributorAddress2');
    var cityInput = document.getElementById('distributorCity');
    var stateSelect = document.getElementById('distributorState');
    var pincodeInput = document.getElementById('distributorPincode');

    var submitBtn = document.getElementById('distributorSubmitBtn');
    var alertSuccess = document.getElementById('distributorAlertSuccess');
    var alertError = document.getElementById('distributorAlertError');

    var inputs = [
      firstNameInput, lastNameInput, mobileInput, emailInput,
      address1Input, address2Input, cityInput, stateSelect, pincodeInput
    ];

    inputs.forEach(function(input) {
      if (!input) return;
      var evt = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(evt, function() {
        clearFieldError(input);
      });
    });

    if (pincodeInput) {
      pincodeInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
      });
    }

    if (mobileInput) {
      mobileInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^\d+ \-]/g, '');
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (alertSuccess) {
        alertSuccess.classList.remove('is-visible');
        alertSuccess.setAttribute('aria-hidden', 'true');
      }
      if (alertError) {
        alertError.classList.remove('is-visible');
        alertError.setAttribute('aria-hidden', 'true');
      }

      var isValid = validate();
      if (!isValid) {
        var firstError = form.querySelector('.is-invalid');
        if (firstError) firstError.focus();
        return;
      }

      var formData = {
        first_name: firstNameInput.value.trim(),
        last_name: lastNameInput.value.trim(),
        mobile_number: mobileInput.value.trim(),
        email: emailInput.value.trim(),
        address_line_1: address1Input.value.trim(),
        address_line_2: address2Input ? address2Input.value.trim() : '',
        city: cityInput.value.trim(),
        state: stateSelect.value,
        pincode: pincodeInput.value.trim(),
        submitted_at: new Date().toISOString()
      };

      setLoading(true);

      setTimeout(function() {
        setLoading(false);
        try {
          var existing = JSON.parse(sessionStorage.getItem('vs_distributor_enquiries') || '[]');
          existing.push({ id: 'VS-DIST-' + Date.now(), data: formData });
          sessionStorage.setItem('vs_distributor_enquiries', JSON.stringify(existing));
        } catch(err) {}

        if (alertSuccess) {
          alertSuccess.classList.add('is-visible');
          alertSuccess.removeAttribute('aria-hidden');
          alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        form.reset();
        clearAllStates();
      }, 650);
    });

    function validate() {
      var ok = true;

      if (!firstNameInput || !firstNameInput.value.trim() || firstNameInput.value.trim().length < 2) {
        setFieldError(firstNameInput, 'Please enter your first name (minimum 2 characters).');
        ok = false;
      } else {
        setFieldSuccess(firstNameInput);
      }

      if (!lastNameInput || !lastNameInput.value.trim()) {
        setFieldError(lastNameInput, 'Please enter your last name.');
        ok = false;
      } else {
        setFieldSuccess(lastNameInput);
      }

      if (!mobileInput || !mobileInput.value.trim()) {
        setFieldError(mobileInput, 'Please enter your 10-digit mobile number.');
        ok = false;
      } else {
        var cleanMobile = mobileInput.value.trim().replace(/[\s\-()]/g, '');
        var phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
        if (!phoneRegex.test(cleanMobile)) {
          setFieldError(mobileInput, 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210 or +91 9876543210).');
          ok = false;
        } else {
          setFieldSuccess(mobileInput);
        }
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailInput || !emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        setFieldError(emailInput, 'Please enter a valid email address (e.g. name@domain.com).');
        ok = false;
      } else {
        setFieldSuccess(emailInput);
      }

      if (!address1Input || !address1Input.value.trim() || address1Input.value.trim().length < 5) {
        setFieldError(address1Input, 'Please enter Address Line 1 (minimum 5 characters).');
        ok = false;
      } else {
        setFieldSuccess(address1Input);
      }

      if (address2Input && address2Input.value.trim()) {
        setFieldSuccess(address2Input);
      } else if (address2Input) {
        clearFieldError(address2Input);
      }

      if (!cityInput || !cityInput.value.trim() || cityInput.value.trim().length < 2) {
        setFieldError(cityInput, 'Please enter your city.');
        ok = false;
      } else {
        setFieldSuccess(cityInput);
      }

      if (!stateSelect || !stateSelect.value || stateSelect.value === '') {
        setFieldError(stateSelect, 'Please select your state or union territory.');
        ok = false;
      } else {
        setFieldSuccess(stateSelect);
      }

      var pinRegex = /^[1-9][0-9]{5}$/;
      if (!pincodeInput || !pincodeInput.value.trim() || !pinRegex.test(pincodeInput.value.trim())) {
        setFieldError(pincodeInput, 'Please enter a valid 6-digit Indian PIN code (e.g. 124001).');
        ok = false;
      } else {
        setFieldSuccess(pincodeInput);
      }

      return ok;
    }

    function setFieldError(input, msg) {
      if (!input) return;
      var grp = input.closest('.vs-form-group');
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      input.setAttribute('aria-invalid', 'true');
      if (grp) {
        var err = grp.querySelector('.vs-field-error');
        if (!err) {
          err = document.createElement('div');
          err.className = 'vs-field-error';
          err.setAttribute('role', 'alert');
          grp.appendChild(err);
        }
        err.textContent = msg;
        err.style.display = 'block';
      }
    }

    function setFieldSuccess(input) {
      if (!input) return;
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      input.removeAttribute('aria-invalid');
      var grp = input.closest('.vs-form-group');
      if (grp) {
        var err = grp.querySelector('.vs-field-error');
        if (err) {
          err.textContent = '';
          err.style.display = 'none';
        }
      }
    }

    function clearFieldError(input) {
      if (!input) return;
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      var grp = input.closest('.vs-form-group');
      if (grp) {
        var err = grp.querySelector('.vs-field-error');
        if (err) {
          err.textContent = '';
          err.style.display = 'none';
        }
      }
    }

    function clearAllStates() {
      var all = form.querySelectorAll('input, select, textarea');
      all.forEach(function(i) {
        i.classList.remove('is-valid', 'is-invalid');
        i.removeAttribute('aria-invalid');
        var grp = i.closest('.vs-form-group');
        if (grp) {
          var err = grp.querySelector('.vs-field-error');
          if (err) {
            err.textContent = '';
            err.style.display = 'none';
          }
        }
      });
    }

    function setLoading(isLoading) {
      if (!submitBtn) return;
      submitBtn.disabled = isLoading;
      if (isLoading) {
        submitBtn.classList.add('is-loading');
        submitBtn.setAttribute('data-original-text', submitBtn.innerHTML);
        submitBtn.innerHTML = '<span class="vs-spinner" aria-hidden="true"></span><span>Submitting Enquiry...</span>';
      } else {
        submitBtn.classList.remove('is-loading');
        var orig = submitBtn.getAttribute('data-original-text');
        if (orig) submitBtn.innerHTML = orig;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', initDistributorForm);
})();
