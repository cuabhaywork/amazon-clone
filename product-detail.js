// ===== THUMBNAIL IMAGE SELECTION =====
document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const mainImage = document.getElementById('mainImage');
        mainImage.src = this.src;
        
        // Remove active class from all thumbnails
        document.querySelectorAll('.thumbnail').forEach(img => {
            img.classList.remove('active');
        });
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
    });
});

// ===== QUANTITY SELECTOR =====
const quantityInput = document.getElementById('quantityInput');
const decreaseBtn = document.getElementById('decreaseQty');
const increaseBtn = document.getElementById('increaseQty');

decreaseBtn.addEventListener('click', () => {
    let current = parseInt(quantityInput.value);
    if (current > 1) {
        quantityInput.value = current - 1;
    }
});

increaseBtn.addEventListener('click', () => {
    let current = parseInt(quantityInput.value);
    if (current < 10) {
        quantityInput.value = current + 1;
    }
});

quantityInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    if (value < 1) this.value = 1;
    if (value > 10) this.value = 10;
});

// ===== COLOR SELECTION =====
document.querySelectorAll('.color-btn').forEach((btn, index) => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        showNotification('Color selected: ' + ['Black', 'Silver', 'Blue', 'Pink'][index]);
    });
});

// ===== ADD TO CART (PRODUCT DETAIL) =====
document.querySelector('.add-to-cart-btn-large').addEventListener('click', function() {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const cartCount = document.querySelector('.cart-count');
    let currentCount = parseInt(cartCount.textContent);
    currentCount += quantity;
    cartCount.textContent = currentCount;
    
    this.textContent = '✓ Added to Cart';
    this.style.backgroundColor = '#008000';
    
    setTimeout(() => {
        this.textContent = 'Add to Cart';
        this.style.backgroundColor = '#ff9900';
    }, 2000);
    
    showNotification(`${quantity} item(s) added to cart!`);
});

// ===== BUY NOW =====
document.querySelector('.buy-now-btn').addEventListener('click', function() {
    showNotification('Proceeding to checkout...');
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 1000);
});

// ===== WISHLIST =====
document.querySelector('.wishlist-btn').addEventListener('click', function() {
    this.classList.toggle('active');
    if (this.classList.contains('active')) {
        this.innerHTML = '<i class="fas fa-heart"></i>';
        showNotification('Added to Wishlist');
    } else {
        this.innerHTML = '<i class="far fa-heart"></i>';
        showNotification('Removed from Wishlist');
    }
});

// ===== TAB SWITCHING =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// ===== SHARE BUTTONS =====

document.querySelectorAll('.share-buttons button').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const platforms = ['Facebook', 'Twitter', 'WhatsApp', 'Copy Link'];
        showNotification(`Sharing on ${platforms[index]}...`);
    });
});

// ===== ZOOM EFFECT ON IMAGE HOVER =====
const mainImage = document.querySelector('.main-image img');
if (mainImage) {
    mainImage.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        this.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        this.style.transform = 'scale(1.2)';
    });
    
    mainImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// ===== ANSWER QUESTIONS =====
document.querySelector('.answer-questions').addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Opening Q&A section...');
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

console.log('Product detail page loaded successfully!');
