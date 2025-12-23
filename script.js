// ===== CAROUSEL FUNCTIONALITY =====
document.querySelectorAll('.carousel-container').forEach((container) => {
    const prevBtn = container.querySelector('.carousel-btn.prev');
    
    const nextBtn = container.querySelector('.carousel-btn.next');
    const items = container.querySelector('.carousel-items');

    if (prevBtn && nextBtn && items) {
        prevBtn.addEventListener('click', () => {
            items.scrollBy({ left: -200, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            items.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }
});

// ===== ADD TO CART FUNCTIONALITY =====
document.querySelectorAll('.add-to-cart-btn').forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const cartCount = document.querySelector('.cart-count');
        let currentCount = parseInt(cartCount.textContent);
        currentCount++;
        cartCount.textContent = currentCount;

        // Visual feedback
        btn.textContent = '✓ Added';
        btn.style.backgroundColor = '#008000';
        btn.style.borderColor = '#008000';

        setTimeout(() => {
            btn.textContent = 'Add to Cart';
            btn.style.backgroundColor = '#ff9900';
            btn.style.borderColor = '#ff9900';
        }, 1500);

        // Show notification
        showNotification('Item added to cart!');
    });
});

// ===== NOTIFICATION SYSTEM =====
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

// ===== ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== SEARCH FUNCTIONALITY =====
document.querySelector('.search-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('.nav-search input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        showNotification(`Searching for: ${searchTerm}`);
        searchInput.value = '';
    }
});

document.querySelector('.nav-search input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = e.target.value.trim();
        if (searchTerm) {
            showNotification(`Searching for: ${searchTerm}`);
            e.target.value = '';
        }
    }
});

// ===== PRODUCT CARD INTERACTIONS =====
document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => {
        const productName = card.querySelector('.product-name').textContent;
        showNotification(`Viewing: ${productName}`);
    });
});

// ===== CATEGORY CARD INTERACTIONS =====
document.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', () => {
        const categoryName = card.querySelector('h3').textContent;
        showNotification(`Browsing: ${categoryName}`);
    });
});

// ===== DEAL CARD INTERACTIONS =====
document.querySelectorAll('.deal-card').forEach((card) => {
    card.addEventListener('click', () => {
        const dealName = card.querySelector('.deal-name').textContent;
        showNotification(`View Deal: ${dealName}`);
    });
});

// ===== ACCOUNT MENU =====
document.querySelector('.nav-account').addEventListener('click', () => {
    showNotification('Redirecting to Account Page...');
});

// ===== CART CLICK =====
document.querySelector('.nav-cart').addEventListener('click', () => {
    const count = document.querySelector('.cart-count').textContent;
    showNotification(`Cart has ${count} items`);
});

// ===== BACK TO TOP =====
document.querySelector('.back-to-top').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== RESPONSIVE MENU =====
document.querySelector('.menu-btn').addEventListener('click', () => {
    showNotification('Menu opened - More categories available');
});

// ===== LOCATION SELECTOR =====
document.querySelector('.nav-location').addEventListener('click', () => {
    showNotification('Choose your delivery location');
});

// ===== LANGUAGE SELECTOR =====
document.querySelector('.nav-language').addEventListener('click', () => {
    showNotification('Language & Region settings');
});

// ===== INITIALIZE =====
console.log('Amazon UI Clone loaded successfully!');
console.log('Features: Cart system, Search, Notifications, Carousel, Product interactions');
