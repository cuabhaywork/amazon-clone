import { useMemo, useState } from 'react'
import './App.css'

const PRODUCTS = [
  {
    id: 'wireless-headphones',
    name: 'Wireless Headphones',
    image:
      'https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 2499,
    originalPrice: 4199,
    discountLabel: '-40%',
    rating: '★★★★☆',
    reviews: '1,245',
  },
  {
    id: 'smart-watch',
    name: 'Smart Watch',
    image:
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 3999,
    originalPrice: 6199,
    discountLabel: '-35%',
    rating: '★★★★★',
    reviews: '2,341',
  },
  {
    id: 'usb-c-cable',
    name: 'USB-C Charging Cable',
    image:
      'https://images.pexels.com/photos/7308058/pexels-photo-7308058.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 299,
    originalPrice: 399,
    discountLabel: '-25%',
    rating: '★★★★☆',
    reviews: '856',
  },
  {
    id: 'portable-speaker',
    name: 'Portable Speaker',
    image:
      'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 1799,
    originalPrice: 2299,
    discountLabel: '-20%',
    rating: '★★★★★',
    reviews: '1,567',
  },
  {
    id: 'phone-case',
    name: 'Phone Case & Screen Protector',
    image:
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 399,
    originalPrice: 599,
    discountLabel: '-30%',
    rating: '★★★★☆',
    reviews: '2,134',
  },
  {
    id: 'webcam',
    name: 'Webcam HD 1080p',
    image:
      'https://images.pexels.com/photos/6898859/pexels-photo-6898859.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 1299,
    originalPrice: 2399,
    discountLabel: '-45%',
    rating: '★★★★★',
    reviews: '945',
  },
  {
    id: 'over-ear-headphones',
    name: 'Over-Ear Headphones',
    image:
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 2499,
    originalPrice: 4999,
    discountLabel: '-50%',
    rating: '★★★★★',
    reviews: '3,421',
  },
  {
    id: 'fitness-watch',
    name: 'Fitness Smart Watch',
    image:
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 5999,
    originalPrice: 7099,
    discountLabel: '-15%',
    rating: '★★★★☆',
    reviews: '1,876',
  },
]

const DEALS = [
  {
    id: 'deal-70',
    title: 'Mega Electronics Sale',
    discount: 70,
    description: 'Laptops, headphones & more',
    cta: 'Shop mega deals',
    color: '#ff6b6b',
  },
  {
    id: 'deal-60',
    title: 'Smartwatch Bonanza',
    discount: 60,
    description: 'Top brands, smart prices',
    cta: 'View smartwatches',
    color: '#ff9900',
  },
  {
    id: 'deal-50',
    title: 'Accessories Festival',
    discount: 50,
    description: 'Cables, cases, chargers',
    cta: 'Upgrade accessories',
    color: '#7ed321',
  },
  {
    id: 'deal-55',
    title: 'Audio & Speakers',
    discount: 55,
    description: 'Speakers, soundbars & more',
    cta: 'Boost your sound',
    color: '#50e3c2',
  },
]

function App() {
  const [cart, setCart] = useState({})
  const [lastAdded, setLastAdded] = useState(null)

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart],
  )

  const cartTotal = useMemo(
    () =>
      Object.entries(cart).reduce((sum, [id, qty]) => {
        const product = PRODUCTS.find((p) => p.id === id)
        if (!product) return sum
        return sum + product.price * qty
      }, 0),
    [cart],
  )

  const handleAddToCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
    setLastAdded(productId)
  }

  const lastAddedProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === lastAdded) || null,
    [lastAdded],
  )

  return (
    <div className="app-root">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          {/* Amazon Logo */}
          <div className="nav-logo">
            <a href="#">
              <svg width="50" height="32" viewBox="0 0 50 32">
                <path
                  d="M8.5 8C2.6 8 0 10.8 0 16c0 5.1 2.6 8 8.5 8 3.5 0 5.8-1.2 7.5-3.5v3.3c0 2.5-1.3 4.2-4.2 4.2-2.3 0-3.5-1.3-3.8-2.8h-4c.4 4.3 4.1 7 8.2 7 5.1 0 8.5-3.1 8.5-8.8v-11C27.7 10.8 25.1 8 19.2 8c-4.8 0-8.2 2.5-8.2 7.3 0 3.8 2.3 6.2 5.9 6.2 2.8 0 5.1-1.3 6.2-3.5-1.2 3.3-4.1 5.5-8.2 5.5-4.1 0-7.4-2.2-8.4-5.7h-4c1 5.1 4.7 9 12.4 9 7 0 12.4-4.3 12.4-11.3v-11.1z"
                  fill="white"
                />
              </svg>
            </a>
          </div>

          {/* Location */}
          <div className="nav-location">
            <i className="fas fa-map-marker-alt" />
            <div>
              <span className="small">Delivering to</span>
              <span className="location">India</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="nav-search">
            <select className="search-select">
              <option>All Categories</option>
              <option>Alexa Skills</option>
              <option>Amazon Devices</option>
              <option>Amazon Global</option>
              <option>Beauty</option>
              <option>Books</option>
            </select>
            <input type="text" placeholder="Search Amazon.in" />
            <button className="search-btn">
              <i className="fas fa-search" />
            </button>
          </div>

          {/* Language & Account */}
          <div className="nav-language">
            <i className="fas fa-globe" />
            <span>EN</span>
          </div>

          {/* Account */}
          <div className="nav-account">
            <span className="small">Hello, Sign in</span>
            <span className="account">Account &amp; Lists</span>
          </div>

          {/* Returns */}
          <div className="nav-returns">
            <span className="small">Returns</span>
            <span className="returns">&amp; Orders</span>
          </div>

          {/* Cart */}
          <div className="nav-cart">
            <i className="fas fa-shopping-cart" />
            <span className="cart-count">{cartCount}</span>
            <span>Cart</span>
          </div>
        </div>
      </nav>

      {/* Secondary Navigation */}
      <div className="secondary-nav">
        <div className="nav-container">
          <button className="menu-btn">
            <i className="fas fa-bars" /> All
          </button>
          <a href="#">Best Sellers</a>
          <a href="#">Today's Deals</a>
          <a href="#">Customer Service</a>
          <a href="#">Gift Cards</a>
          <a href="#">Electronics</a>
          <a href="#">Fashion</a>
          <a href="#">Home &amp; Kitchen</a>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="hero-banner">
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1500' height='600'%3E%3Crect fill='%23FF9900' width='1500' height='600'/%3E%3Ctext x='750' y='300' font-size='48' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='bold'%3EAmazon Deals%3C/text%3E%3Ctext x='750' y='400' font-size='32' fill='white' text-anchor='middle' dominant-baseline='middle'%3EUp to 70%25 OFF%3C/text%3E%3C/svg%3E"
          alt="Hero Banner"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Carousel Section */}
        <section className="carousel-section">
          <h2 className="section-title">Your Recently Viewed Items</h2>
          <div className="carousel-container">
            <button className="carousel-btn prev">
              <i className="fas fa-chevron-left" />
            </button>
            <div className="carousel-items">
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
                  alt="Wireless Headphones"
                />
                <p>Wireless Headphones</p>
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Smart Watch"
                />
                <p>Smart Watch</p>
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/7308058/pexels-photo-7308058.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="USB-C Cable"
                />
                <p>USB-C Cable</p>
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Portable Speaker"
                />
                <p>Portable Speaker</p>
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Phone Accessories"
                />
                <p>Phone Accessories</p>
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/6898859/pexels-photo-6898859.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Webcam HD 1080p"
                />
                <p>Webcam HD 1080p</p>
              </div>
            </div>
            <button className="carousel-btn next">
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </section>

        {/* Category Cards */}
        <section className="category-section">
          <div className="category-card">
            <h3>Electronics</h3>
            <img
              src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
              alt="Electronics"
            />
            <a href="#">Shop Now</a>
          </div>
          <div className="category-card">
            <h3>Mobiles &amp; Accessories</h3>
            <img
              src="https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Mobiles & Accessories"
            />
            <a href="#">Shop Now</a>
          </div>
          <div className="category-card">
            <h3>Home &amp; Kitchen</h3>
            <img
              src="https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Home & Kitchen"
            />
            <a href="#">Shop Now</a>
          </div>
          <div className="category-card">
            <h3>Computer Accessories</h3>
            <img
              src="https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Computer Accessories"
            />
            <a href="#">Shop Now</a>
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-section">
          <div className="products-header">
            <h2 className="section-title">Recommended For You</h2>
            <div className="mini-cart-summary">
              <span>
                Cart:{' '}
                <strong>
                  {cartCount} item{cartCount === 1 ? '' : 's'}
                </strong>
              </span>
              <span className="mini-cart-total">
                Subtotal:{' '}
                <strong>
                  ₹{cartTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </strong>
              </span>
            </div>
          </div>

          {lastAddedProduct && (
            <div className="last-added-banner">
              <i className="fas fa-check-circle" />
              <span>
                Added <strong>{lastAddedProduct.name}</strong> to your cart.
              </span>
            </div>
          )}

          <div className="products-grid">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="discount-badge">{product.discountLabel}</span>
                </div>
                <div className="product-info">
                  <p className="product-name">{product.name}</p>
                  <div className="rating">
                    <span className="stars">{product.rating}</span>
                    <span className="reviews">({product.reviews})</span>
                  </div>
                  <div className="price-section">
                    <span className="price">
                      ₹{product.price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                    <span className="original-price">
                      ₹{product.originalPrice.toLocaleString('en-IN', {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <p className="delivery">Free Delivery by Amazon</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Banner 2 */}
        <section className="banner-section">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1500' height='300'%3E%3Crect fill='%234A90E2' width='1500' height='300'/%3E%3Ctext x='750' y='120' font-size='42' fill='white' text-anchor='middle' dominant-baseline='middle' font-weight='bold'%3ESpecial Offers%3C/text%3E%3Ctext x='750' y='200' font-size='28' fill='white' text-anchor='middle' dominant-baseline='middle'%3EExclusive Deals on Best Sellers%3C/text%3E%3C/svg%3E"
            alt="Promotional Banner"
          />
        </section>

        {/* Today's Deals Section */}
        <section className="deals-section">
          <div className="deals-header">
            <h2 className="section-title">Today's Deals</h2>
            <span className="deals-subtitle">Hand-picked offers ending soon</span>
          </div>
          <div className="carousel-container">
            <button className="carousel-btn prev">
              <i className="fas fa-chevron-left" />
            </button>
            <div className="carousel-items">
              {DEALS.map((deal) => (
                <div key={deal.id} className="deal-card">
                  <span className="deal-badge">LIMITED TIME</span>
                  <div
                    className="deal-body"
                    style={{ backgroundColor: deal.color }}
                  >
                    <div className="deal-discount">
                      <span className="deal-discount-number">{deal.discount}%</span>
                      <span className="deal-discount-label">OFF</span>
                    </div>
                    <p className="deal-title">{deal.title}</p>
                    <p className="deal-description">{deal.description}</p>
                    <button className="deal-cta">
                      {deal.cta} <i className="fas fa-chevron-right" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-btn next">
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Get to Know Us</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press Releases</a>
            <a href="#">Amazon Science</a>
          </div>
          <div className="footer-section">
            <h4>Connect with Us</h4>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
          <div className="footer-section">
            <h4>Make Money with Us</h4>
            <a href="#">Sell on Amazon</a>
            <a href="#">Sell under Amazon Accelerator</a>
            <a href="#">Amazon Global Selling</a>
            <a href="#">Become an Affiliate</a>
          </div>
          <div className="footer-section">
            <h4>Let Us Help You</h4>
            <a href="#">Your Account</a>
            <a href="#">Returns Centre</a>
            <a href="#">100% Purchase Protection</a>
            <a href="#">Amazon Prime</a>
          </div>
        </div>
        <div className="footer-bottom">
          <a href="#" className="back-to-top">
            Back to Top
          </a>
          <div className="footer-info">
            <p>&copy; 1996-2024 Amazon.com, Inc. or its affiliates</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
