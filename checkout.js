let currentStep = 1;

// ===== STEP NAVIGATION =====
function nextStep() {
    const formSection = document.querySelector('.form-section.active');
    const inputs = formSection.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#c00';
        } else {
            input.style.borderColor = '#ddd';
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required fields');
        return;
    }

    if (currentStep < 3) {
        currentStep++;
        updateSteps();
        scrollToForm();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateSteps();
        scrollToForm();
    }
}

function updateSteps() {
    document.querySelectorAll('.form-section').forEach((section, index) => {
        section.classList.remove('active');
        if (index + 1 === currentStep) {
            section.classList.add('active');
        }
    });

    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 <= currentStep) {
            step.classList.add('active');
        }
    });
}

function scrollToForm() {
    document.querySelector('.checkout-form-section').scrollIntoView({ behavior: 'smooth' });
}

// ===== SHIPPING METHOD UPDATES =====
document.querySelectorAll('input[name="shipping"]').forEach(radio => {
    radio.addEventListener('change', function() {
        let cost = 'FREE';
        let total = 8373;

        if (this.value === 'express') {
            cost = '₹99';
            total = 8472;
        } else if (this.value === 'overnight') {
            cost = '₹299';
            total = 8672;
        }

        document.getElementById('shippingCost').textContent = cost;
        document.getElementById('totalAmount').textContent = '₹' + total.toLocaleString();
    });
});

// ===== PAYMENT METHOD SELECTION =====
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const cardForm = document.getElementById('cardForm');
        if (this.value === 'card') {
            cardForm.style.display = 'block';
        } else {
            cardForm.style.display = 'none';
        }
    });
});

// ===== CARD INPUT FORMATTING =====
document.querySelectorAll('input[placeholder="1234 5678 9012 3456"]').forEach(input => {
    input.addEventListener('input', function() {
        let value = this.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        this.value = formattedValue;
    });
});

document.querySelectorAll('input[placeholder="MM/YY"]').forEach(input => {
    input.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        this.value = value;
    });
});

// ===== PAYMENT OPTION SELECTION =====
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
   
        this.classList.add('active');
        this.querySelector('input[type="radio"]').checked = true;
        this.querySelector('input[type="radio"]').dispatchEvent(new Event('change'));
    });
});

// ===== SHIPPING OPTION SELECTION =====
document.querySelectorAll('.shipping-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.shipping-option').forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        this.querySelector('input[type="radio"]').checked = true;
        this.querySelector('input[type="radio"]').dispatchEvent(new Event('change'));
    });
});

// ===== PLACE ORDER =====
function placeOrder() {
    const cardForm = document.getElementById('cardForm');
    
    // Validate card details if card payment is selected
    if (cardForm.style.display !== 'none') {
        const cardInputs = cardForm.querySelectorAll('input[required]');
        let isValid = true;

        cardInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#c00';
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        if (!isValid) {
            showNotification('Please fill in all card details');
            return;
        }
    }

    showNotification('Processing your order...');
    
    setTimeout(() => {
        showSuccessModal();
    }, 1500);
}

function showSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Your order number is <strong>#AMZ987654321</strong></p>
            <p>You will receive a confirmation email shortly.</p>
            <p style="font-size: 12px; color: #666; margin-top: 15px;">
                Estimated delivery: 3-5 business days
            </p>
            <div class="modal-buttons">
                <button onclick="window.location.href='index.html'" class="modal-btn primary">Continue Shopping</button>
                <button onclick="window.location.href='#'" class="modal-btn secondary">View Orders</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// ===== NOTIFICATION FUNCTION =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #008000;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ===== FORM INPUT STYLING =====
document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#ff9900';
        this.style.boxShadow = '0 0 0 2px rgba(255, 153, 0, 0.1)';
    });

    input.addEventListener('blur', function() {
        this.style.borderColor = '#ddd';
        this.style.boxShadow = 'none';
    });
});

// ===== INITIALIZE =====
console.log('Checkout page loaded successfully!');
console.log('Current step:', currentStep);
