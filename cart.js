// ===== QUANTITY CONTROLS =====
document.querySelectorAll('.cart-item').forEach(item => {
    const decreaseBtn = item.querySelector('.qty-btn:first-child');
    const increaseBtn = item.querySelector('.qty-btn:last-child');
    const qtyInput = item.querySelector('.qty-selector input');

    decreaseBtn.addEventListener('click', () => {
        let current = parseInt(qtyInput.value);
        if (current > 1) {
            qtyInput.value = current - 1;
            updateCart();
        }
    });

    increaseBtn.addEventListener('click', () => {
        let current = parseInt(qtyInput.value);
        qtyInput.value = current + 1;
        updateCart();
    });

    qtyInput.addEventListener('change', updateCart);
});

// ===== REMOVE ITEM FROM CART =====
document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const cartItem = this.closest('.cart-item');
        cartItem.style.opacity = '0.5';
        
        setTimeout(() => {
            cartItem.remove();
            updateCart();
            checkCartEmpty();
            showNotification('Item removed from cart');
        }, 300);
    });
});

// ===== UPDATE CART CALCULATIONS =====
function updateCart() {
    let subtotal = 0;
    
    document.querySelectorAll('.cart-item').forEach(item => {
        const priceText = item.querySelector('.item-price .price').textContent.replace('₹', '');
        const quantity = parseInt(item.querySelector('.qty-selector input').value);
        const itemTotal = parseInt(priceText) * quantity;
        subtotal += itemTotal;
    });

    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = '₹' + subtotal.toLocaleString();
    document.getElementById('tax').textContent = '₹' + tax.toLocaleString();
    document.getElementById('total').textContent = '₹' + total.toLocaleString();

    // Update cart count
    let itemCount = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        itemCount += parseInt(item.querySelector('.qty-selector input').value);
    });
    document.querySelector('.cart-count').textContent = itemCount;
}

// ===== CHECK IF CART IS EMPTY =====
function checkCartEmpty() {
    const items = document.querySelectorAll('.cart-item').length;
    if (items === 0) {
        document.querySelector('.empty-cart-message').style.display = 'block';
        document.querySelector('.cart-items-list').style.display = 'none';
    }
}

// ===== APPLY PROMO CODE =====
document.getElementById('applyPromo').addEventListener('click', function() {
    const promoCode = document.getElementById('promoCode').value.trim().toUpperCase();
    const subtotal = parseInt(document.getElementById('subtotal').textContent.replace('₹', ''));
    
    let discount = 0;
    
    if (promoCode === 'SAVE500') {
        discount = 500;
        showNotification('Promo code applied! Saving ₹500');
    } else if (promoCode === 'SAVE1000') {
        discount = 1000;
        showNotification('Promo code applied! Saving ₹1000');
    } else if (promoCode === 'SAVE2000') {
        discount = 2000;
        showNotification('Promo code applied! Saving ₹2000');
    } else if (promoCode === '') {
        showNotification('Please enter a promo code');
    } else {
        showNotification('Invalid promo code');
        return;
    }

    document.getElementById('promoDiscount').textContent = '−₹' + discount.toLocaleString();
    
    const tax = Math.round((subtotal - discount) * 0.18);
    const total = subtotal - discount + tax;
    
    document.getElementById('tax').textContent = '₹' + tax.toLocaleString();
    document.getElementById('total').textContent = '₹' + total.toLocaleString();
    
    document.getElementById('promoCode').value = '';
});

// ===== CHECKOUT =====
document.querySelector('.checkout-btn').addEventListener('click', function() {
    const itemCount = document.querySelectorAll('.cart-item').length;
    if (itemCount === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Proceeding to checkout...');
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 1000);
});

// ===== SAVE FOR LATER =====
document.querySelector('.save-for-later-btn').addEventListener('click', function() {
    showNotification('Items saved to Wishlist');
});

// ===== ADD TO CART (RELATED PRODUCTS) =====
document.querySelectorAll('.related-products-section .add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productName = this.closest('.product-card').querySelector('.product-name').textContent;
        showNotification(`${productName} added to cart!`);
        
        this.textContent = '✓ Added';
        this.style.backgroundColor = '#008000';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.backgroundColor = '#ff9900';
        }, 1500);
    });
});

// ===== CONTINUE SHOPPING =====
document.querySelectorAll('.continue-shopping-link a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });
});

// ===== BACK TO TOP =====
document.querySelector('.back-to-top')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

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

// ===== INITIALIZE =====
updateCart();
console.log('Cart page loaded successfully!');
console.log('Available promo codes: SAVE500, SAVE1000, SAVE2000');
