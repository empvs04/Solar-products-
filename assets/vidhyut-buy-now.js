/**
 * Vidhyut Saathi - Shopify Theme Buy Now Page Controller
 */
(function() {
  var productsData = [
    {
      id: "solar-lights",
      name: "Solar Lights",
      fullName: "Solar Street Lights — All-in-One Outdoor Luminaire",
      category: "Solar Solutions",
      badge: "Renewable Energy",
      description: "All-in-one solar luminaires and street lighting with integrated PV panels, lithium storage, and dusk-to-dawn sensors for autonomous outdoor illumination.",
      fullDescription: "Vidhyut Saathi All-in-One Solar Street Lights combine high-efficiency monocrystalline solar panels, Grade-A LiFePO4 lithium batteries, high-lumen Bridgelux LED arrays, and an intelligent MPPT charge controller in a durable weather-proof housing. Engineered for Indian climate extremes, providing dependable dusk-to-dawn illumination for roads, gated communities, farms, and industrial perimeters.",
      image: "solar-lights.jpg",
      basePrice: 2499,
      availability: "In Stock - Dispatch within 24h",
      variants: [
        { id: "sl-15w", name: "15W Compact Luminaire", wattage: "15W", price: 2499, originalPrice: 3200, recommended: "Residential & Pathways" },
        { id: "sl-30w", name: "30W Standard Street Light", wattage: "30W", price: 3999, originalPrice: 5200, recommended: "Colonies & Campus Roads", isPopular: true },
        { id: "sl-60w", name: "60W Heavy-Duty Luminaire", wattage: "60W", price: 6499, originalPrice: 8500, recommended: "Highways & Industrial Yards" }
      ],
      specs: [
        { label: "Solar Panel", value: "High-Efficiency Monocrystalline" },
        { label: "Battery Chemistry", value: "Grade-A LiFePO4 (2000+ Cycles)" },
        { label: "LED Efficacy", value: ">150 Lumens / Watt" },
        { label: "Weather Rating", value: "IP65 All-Weather Waterproof" },
        { label: "Autonomy", value: "2 - 3 Rainy Days Backup" },
        { label: "Sensor", value: "Smart Dusk-to-Dawn Radar Sensor" }
      ]
    },
    {
      id: "led-lamps",
      name: "LED Lamps",
      fullName: "Smart Architectural LED Lamps & Suspended Luminaires",
      category: "Commercial & Indoor",
      badge: "Architectural Grade",
      description: "Modern architectural linear lamps, downlights, and suspended luminaires designed for glare-free, uniform light distribution across workspaces and living areas.",
      fullDescription: "Engineered for optimal brightness, visual comfort, and architectural elegance. Vidhyut Saathi LED Lamps incorporate premium polycarbonate diffusers, high-CRI LEDs, and isolated flicker-free drivers to eliminate eye strain across corporate offices, retail spaces, educational institutions, and modern homes.",
      image: "led-lamps.jpg",
      basePrice: 1299,
      availability: "In Stock - Dispatch within 24h",
      variants: [
        { id: "ll-20w", name: "20W Linear Luminaire (Warm 3000K)", wattage: "20W", price: 1299, originalPrice: 1750, recommended: "Living Rooms & Hospitality" },
        { id: "ll-36w", name: "36W Downlight Panel (Neutral 4000K)", wattage: "36W", price: 1899, originalPrice: 2500, recommended: "Offices & Retail Spaces", isPopular: true },
        { id: "ll-48w", name: "48W Commercial Suspended (Cool 6500K)", wattage: "48W", price: 2499, originalPrice: 3300, recommended: "Conference Rooms & Halls" }
      ],
      specs: [
        { label: "Color Rendering (CRI)", value: "Ra > 85 for True Color Accuracy" },
        { label: "Power Factor", value: "> 0.95 High Power Factor" },
        { label: "Operating Voltage", value: "120V - 280V AC Surge Protected" },
        { label: "Housing Material", value: "Anodized Extruded Aluminum" },
        { label: "Driver Type", value: "Isolated Constant Current Driver" },
        { label: "Rated Lifespan", value: "50,000 Operating Hours" }
      ]
    },
    {
      id: "led-bulbs",
      name: "LED Bulbs",
      fullName: "High-Efficiency LED Bulbs (Multipack Value Editions)",
      category: "Energy Saving",
      badge: "High Efficiency",
      description: "High-efficacy, long-life LED bulbs engineered with robust thermal dissipation and high lumen output to ensure durable daily performance.",
      fullDescription: "Vidhyut Saathi LED Bulbs deliver maximum lumens with minimum wattage consumption. Fitted with heavy-gauge aluminum heat sinks and wide-angle frosted diffusers, they provide consistent, shadow-free illumination while drastically reducing household and commercial electricity bills.",
      image: "led-bulbs.jpg",
      basePrice: 449,
      availability: "In Stock - Multipack Ready to Ship",
      variants: [
        { id: "lb-9w-4p", name: "9W Cool Day (B22 Base) — Pack of 4", wattage: "9W x 4", price: 449, originalPrice: 650, recommended: "Everyday Household Use", isPopular: true },
        { id: "lb-12w-4p", name: "12W Bright White (B22 Base) — Pack of 4", wattage: "12W x 4", price: 599, originalPrice: 850, recommended: "Kitchens & Large Rooms" },
        { id: "lb-18w-2p", name: "18W High-Lumen Master — Pack of 2", wattage: "18W x 2", price: 499, originalPrice: 700, recommended: "Commercial Showrooms & Garages" }
      ],
      specs: [
        { label: "Base Cap", value: "Standard B22 Pin (Standard Indian Base)" },
        { label: "Luminous Efficacy", value: "> 105 Lumens / Watt" },
        { label: "Voltage Range", value: "140V - 285V AC (Wide Range)" },
        { label: "Beam Angle", value: "220° Wide Angle Spread" },
        { label: "Thermal Management", value: "Aluminum Core Heat Sink" },
        { label: "Lifespan", value: "25,000 Hours (Rated)" }
      ]
    },
    {
      id: "clamp-meters",
      name: "Clamp Meters",
      fullName: "Precision Digital Clamp Meter & Electrical Multimeter",
      category: "Electrical Testing",
      badge: "Precision Testing",
      description: "Rugged digital clamp meters offering accurate AC/DC current, voltage, and continuity testing for professional electricians and maintenance teams.",
      fullDescription: "Designed for industrial electricians, solar plant technicians, and HVAC engineers. Vidhyut Saathi Digital Clamp Meters deliver True-RMS accuracy, non-contact AC voltage detection (NCV), low-impedance testing, and overload protection in an impact-resistant ergonomic casing.",
      image: "clamp-meters.jpg",
      basePrice: 1699,
      availability: "In Stock - Includes Test Leads & Case",
      variants: [
        { id: "cm-400a", name: "VS-CM400 True RMS AC Clamp (400A / 600V)", wattage: "400A AC", price: 1699, originalPrice: 2200, recommended: "Electricians & Home Testing", isPopular: true },
        { id: "cm-600a", name: "VS-CM600 AC/DC Digital Clamp (600A / 1000V)", wattage: "600A AC/DC", price: 2499, originalPrice: 3400, recommended: "Solar Installers & Inverters" },
        { id: "cm-1000a", name: "VS-CM1000 Industrial Heavy Duty (1000A True RMS)", wattage: "1000A AC/DC", price: 3899, originalPrice: 5100, recommended: "Industrial Plants & Sub-stations" }
      ],
      specs: [
        { label: "Jaw Opening", value: "30mm Large Conductive Jaw" },
        { label: "Display", value: "6000 Counts Backlit LCD Display" },
        { label: "Measurement", value: "True RMS Current, Voltage, Resistance" },
        { label: "Special Functions", value: "NCV Sensor, Diode, Continuity Beeper" },
        { label: "Safety Rating", value: "CAT III 600V / CAT II 1000V" },
        { label: "Included Accessories", value: "Heavy-duty Test Leads, Carry Case, Batteries" }
      ]
    }
  ];

  function initBuyNowPage() {
    var activeProductId = 'solar-lights';
    var selectedVariant = null;
    var quantity = 1;
    var cart = [];

    try {
      var saved = localStorage.getItem('vs_cart');
      if (saved) cart = JSON.parse(saved);
    } catch(e) {}

    // Read URL param ?product=
    var params = new URLSearchParams(window.location.search);
    var pParam = params.get('product');
    for (var i = 0; i < productsData.length; i++) {
      if (productsData[i].id === pParam) {
        activeProductId = pParam;
        break;
      }
    }

    function getActiveProduct() {
      for (var i = 0; i < productsData.length; i++) {
        if (productsData[i].id === activeProductId) return productsData[i];
      }
      return productsData[0];
    }

    function renderProduct(scroll) {
      var product = getActiveProduct();
      selectedVariant = product.variants[0];
      for (var v = 0; v < product.variants.length; v++) {
        if (product.variants[v].isPopular) {
          selectedVariant = product.variants[v];
          break;
        }
      }
      quantity = 1;

      // Update tabs
      var tabs = document.querySelectorAll('.vs-category-tab');
      tabs.forEach(function(tab) {
        if (tab.getAttribute('data-product-id') === product.id) {
          tab.classList.add('is-active');
        } else {
          tab.classList.remove('is-active');
        }
      });

      // Update Media
      var mainImg = document.getElementById('mainProductImg');
      var mediaBadge = document.getElementById('mediaCategoryBadge');
      if (mainImg) {
        // Find existing image or asset url
        var currentSrc = mainImg.src;
        var dir = currentSrc.substring(0, currentSrc.lastIndexOf('/') + 1);
        mainImg.src = dir + product.image;
        mainImg.alt = product.fullName;
      }
      if (mediaBadge) mediaBadge.textContent = product.badge || product.category;

      // Update Meta
      var metaCat = document.getElementById('productMetaCategory');
      var nameEl = document.getElementById('productName');
      var descEl = document.getElementById('productDesc');
      var stockEl = document.getElementById('productStockBadge');

      if (metaCat) metaCat.textContent = product.category;
      if (nameEl) nameEl.textContent = product.fullName;
      if (descEl) descEl.textContent = product.fullDescription;
      if (stockEl) stockEl.textContent = product.availability;

      // Render Variants
      renderVariantsList(product);

      // Render Specs
      renderSpecsTable(product);

      // Update Price
      updatePrice();

      // Render Recommendations
      renderRecs(product.id);

      if (scroll) {
        var showcase = document.getElementById('productShowcase');
        if (showcase) {
          var top = showcase.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    }

    function renderVariantsList(product) {
      var wrap = document.getElementById('variantCardsWrap');
      var lbl = document.getElementById('selectedVariantLabel');
      if (!wrap) return;

      wrap.innerHTML = '';
      if (lbl && selectedVariant) lbl.textContent = selectedVariant.name;

      product.variants.forEach(function(variant) {
        var card = document.createElement('div');
        card.className = 'vs-variant-card ' + (variant.id === selectedVariant.id ? 'is-selected' : '');
        card.setAttribute('data-variant-id', variant.id);

        card.innerHTML = [
          '<div class="vs-variant-left">',
            '<div class="vs-variant-radio"></div>',
            '<div>',
              '<div class="vs-variant-name">' + variant.name + '</div>',
              '<div class="vs-variant-desc">' + (variant.recommended || variant.wattage) + '</div>',
            '</div>',
          '</div>',
          '<div class="vs-variant-right">',
            (variant.isPopular ? '<span class="vs-variant-badge">Popular</span>' : ''),
            '<div class="vs-variant-price">₹' + variant.price.toLocaleString('en-IN') + '</div>',
          '</div>'
        ].join('');

        card.addEventListener('click', function() {
          selectedVariant = variant;
          if (lbl) lbl.textContent = variant.name;
          wrap.querySelectorAll('.vs-variant-card').forEach(function(c) { c.classList.remove('is-selected'); });
          card.classList.add('is-selected');
          updatePrice();
        });

        wrap.appendChild(card);
      });
    }

    function renderSpecsTable(product) {
      var tbody = document.getElementById('specsTableBody');
      if (!tbody) return;
      tbody.innerHTML = '';
      if (product.specs) {
        product.specs.forEach(function(spec) {
          var tr = document.createElement('tr');
          tr.innerHTML = '<td class="vs-specs-label">' + spec.label + '</td><td class="vs-specs-val">' + spec.value + '</td>';
          tbody.appendChild(tr);
        });
      }
    }

    function updatePrice() {
      if (!selectedVariant) return;
      var cur = document.getElementById('priceCurrent');
      var orig = document.getElementById('priceOriginal');
      var disc = document.getElementById('priceDiscount');
      var sub = document.getElementById('subtotalVal');

      var unit = selectedVariant.price;
      var origVal = selectedVariant.originalPrice;
      var subtotal = unit * quantity;

      if (cur) cur.textContent = '₹' + unit.toLocaleString('en-IN');
      if (orig && origVal) orig.textContent = '₹' + origVal.toLocaleString('en-IN');
      if (disc && origVal) {
        var pct = Math.round(((origVal - unit) / origVal) * 100);
        disc.textContent = pct + '% OFF';
      }
      if (sub) sub.textContent = '₹' + subtotal.toLocaleString('en-IN');
    }

    function renderRecs(currentId) {
      var grid = document.getElementById('recGrid');
      if (!grid) return;
      grid.innerHTML = '';

      var mainImg = document.getElementById('mainProductImg');
      var dir = '';
      if (mainImg) {
        var currentSrc = mainImg.src;
        dir = currentSrc.substring(0, currentSrc.lastIndexOf('/') + 1);
      }

      productsData.forEach(function(p) {
        if (p.id === currentId) return;

        var card = document.createElement('div');
        card.className = 'vs-rec-card';
        card.innerHTML = [
          '<div class="vs-rec-img-wrap">',
            '<img src="' + (dir + p.image) + '" alt="' + p.name + '" class="vs-rec-img" loading="lazy">',
            '<span class="vs-rec-badge-pill">' + (p.badge || p.category) + '</span>',
          '</div>',
          '<div class="vs-rec-body">',
            '<div class="vs-rec-name">' + p.name + '</div>',
            '<div class="vs-rec-price-hint">Starting from <strong>₹' + p.basePrice.toLocaleString('en-IN') + '</strong></div>',
            '<button type="button" class="vs-rec-btn" data-switch-to="' + p.id + '">',
              '<span>Buy Now</span>',
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>',
            '</button>',
          '</div>'
        ].join('');

        card.querySelector('.vs-rec-btn').addEventListener('click', function(e) {
          e.preventDefault();
          activeProductId = p.id;
          var newUrl = window.location.pathname + '?product=' + encodeURIComponent(p.id);
          window.history.pushState({ product: p.id }, '', newUrl);
          renderProduct(true);
        });

        grid.appendChild(card);
      });
    }

    // Attach Tab Clicks
    document.querySelectorAll('.vs-category-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        var pid = tab.getAttribute('data-product-id');
        if (pid && pid !== activeProductId) {
          activeProductId = pid;
          var newUrl = window.location.pathname + '?product=' + encodeURIComponent(pid);
          window.history.pushState({ product: pid }, '', newUrl);
          renderProduct(true);
        }
      });
    });

    // Quantity Picker
    var decBtn = document.getElementById('qtyDec');
    var incBtn = document.getElementById('qtyInc');
    var qtyInput = document.getElementById('qtyInput');

    if (decBtn) decBtn.addEventListener('click', function() {
      quantity = Math.max(1, quantity - 1);
      if (qtyInput) qtyInput.value = quantity;
      updatePrice();
    });
    if (incBtn) incBtn.addEventListener('click', function() {
      quantity = Math.min(99, quantity + 1);
      if (qtyInput) qtyInput.value = quantity;
      updatePrice();
    });
    if (qtyInput) qtyInput.addEventListener('change', function(e) {
      var v = parseInt(e.target.value, 10);
      quantity = isNaN(v) ? 1 : Math.max(1, Math.min(99, v));
      qtyInput.value = quantity;
      updatePrice();
    });

    // Cart Drawer Elements
    var drawer = document.getElementById('cartDrawer');
    var backdrop = document.getElementById('cartDrawerBackdrop');
    var closeBtn = document.getElementById('cartDrawerClose');
    var floatBtn = document.getElementById('floatingCartBtn');
    var checkoutBtn = document.getElementById('cartCheckoutBtn');

    function openCart() {
      if (drawer && backdrop) {
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        renderCart();
      }
    }

    function closeCart() {
      if (drawer && backdrop) {
        drawer.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }

    if (floatBtn) floatBtn.addEventListener('click', openCart);
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (backdrop) backdrop.addEventListener('click', closeCart);

    function updateCartCount() {
      var total = cart.reduce(function(acc, item) { return acc + item.quantity; }, 0);
      var bCount = document.getElementById('cartBadgeCount');
      var fBadge = document.getElementById('floatingCartBadge');
      if (bCount) bCount.textContent = total;
      if (fBadge) fBadge.textContent = total;
    }

    function renderCart() {
      var wrap = document.getElementById('cartItemsWrap');
      var totalEl = document.getElementById('cartTotalVal');
      if (!wrap) return;

      if (cart.length === 0) {
        wrap.innerHTML = '<div class="vs-cart-empty"><p>Your shopping cart is empty.</p></div>';
        if (totalEl) totalEl.textContent = '₹0';
        return;
      }

      var grandTotal = 0;
      wrap.innerHTML = '';
      cart.forEach(function(item, idx) {
        var sub = item.price * item.quantity;
        grandTotal += sub;

        var el = document.createElement('div');
        el.className = 'vs-cart-item';
        el.innerHTML = [
          '<div class="vs-cart-item-info">',
            '<div class="vs-cart-item-name">' + item.name + '</div>',
            '<div class="vs-cart-item-variant">' + item.variantName + ' × ' + item.quantity + '</div>',
            '<div class="vs-cart-item-bottom">',
              '<span class="vs-cart-item-price">₹' + sub.toLocaleString('en-IN') + '</span>',
              '<button type="button" class="vs-cart-item-remove" data-idx="' + idx + '">Remove</button>',
            '</div>',
          '</div>'
        ].join('');

        el.querySelector('.vs-cart-item-remove').addEventListener('click', function() {
          cart.splice(idx, 1);
          try { localStorage.setItem('vs_cart', JSON.stringify(cart)); } catch(e){}
          updateCartCount();
          renderCart();
        });

        wrap.appendChild(el);
      });

      if (totalEl) totalEl.textContent = '₹' + grandTotal.toLocaleString('en-IN');
    }

    // Add to Cart Click
    var addBtn = document.getElementById('addToCartBtn');
    if (addBtn) {
      addBtn.addEventListener('click', function() {
        var p = getActiveProduct();
        if (!p || !selectedVariant) return;

        var existing = -1;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].productId === p.id && cart[i].variantId === selectedVariant.id) {
            existing = i;
            break;
          }
        }

        if (existing > -1) {
          cart[existing].quantity += quantity;
        } else {
          cart.push({
            productId: p.id,
            variantId: selectedVariant.id,
            name: p.name,
            variantName: selectedVariant.name,
            price: selectedVariant.price,
            quantity: quantity
          });
        }

        try { localStorage.setItem('vs_cart', JSON.stringify(cart)); } catch(e){}
        updateCartCount();
        openCart();
      });
    }

    // Direct Buy Now / Checkout Click
    var buyBtn = document.getElementById('buyNowDirectBtn');
    if (buyBtn) {
      buyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var p = getActiveProduct();
        if (!p || !selectedVariant) return;

        var total = selectedVariant.price * quantity;
        var text = 'Hello Vidhyut Saathi, I want to purchase:\n\nProduct: ' + p.fullName + '\nModel: ' + selectedVariant.name + '\nQuantity: ' + quantity + '\nTotal Amount: ₹' + total.toLocaleString('en-IN') + ' (incl. GST)\n\nPlease share delivery details.';
        window.open('https://wa.me/918199036060?text=' + encodeURIComponent(text), '_blank');
      });
    }

    // Checkout button inside cart drawer
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) return;
        var summary = 'Vidhyut Saathi Order Inquiry:\n\n';
        var total = 0;
        cart.forEach(function(item, idx) {
          var itemTotal = item.price * item.quantity;
          total += itemTotal;
          summary += (idx + 1) + '. ' + item.name + ' (' + item.variantName + ') - Qty: ' + item.quantity + ' - ₹' + itemTotal.toLocaleString('en-IN') + '\n';
        });
        summary += '\nTotal: ₹' + total.toLocaleString('en-IN') + ' (incl. GST)';
        window.open('https://wa.me/918199036060?text=' + encodeURIComponent(summary), '_blank');
      });
    }

    // Popstate
    window.addEventListener('popstate', function() {
      var p = new URLSearchParams(window.location.search).get('product');
      if (p && p !== activeProductId) {
        for (var i = 0; i < productsData.length; i++) {
          if (productsData[i].id === p) {
            activeProductId = p;
            renderProduct(false);
            break;
          }
        }
      }
    });

    renderProduct(false);
    updateCartCount();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBuyNowPage);
  } else {
    initBuyNowPage();
  }
})();
