import React from 'react'
import { FaFacebookMessenger } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';

export default function Footer() {
  return (
    <>
      <footer>
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <h2>WPDean</h2>
              <p>Online brand created founded in 2008 in Japan. Heavily focuses on selling cozy, quality, and branded items, limited edition collectibles by local fashion designer.</p>
            </div>

            <div class="footer-links">
              <h3>About Us</h3>
              <ul>
                <li><a href="/information" class="footer-link">Information</a></li>
                <li><a href="/store-locator" class="footer-link">Store Locator</a></li>
                <li><a href="/bulk-purchase" class="footer-link">Bulk Purchase</a></li>
                <li><a href="/alteration" class="footer-link">Alteration Service</a></li>
                <li><a href="/gift-delivery" class="footer-link">Gift Delivery Service</a></li>
              </ul>
            </div>

            <div class="footer-links">
              <h3>Help</h3>
              <ul>
                <li><a href="/faq" class="footer-link">FAQ</a></li>
                <li><a href="/shopping-guide" class="footer-link">Online Shopping Guide</a></li>
                <li><a href="/return-policy" class="footer-link">Return Policy</a></li>
                <li><a href="/privacy" class="footer-link">Privacy Policy</a></li>
                <li><a href="/accessibility" class="footer-link">Accessibility</a></li>
                <li><a href="/contact" class="footer-link">Contact Us</a></li>
              </ul>
            </div>

            <div class="footer-links">
              <h3>Account</h3>
              <ul>
                <li><a href="/membership" class="footer-link">Membership</a></li>
                <li><a href="/profile" class="footer-link">Profile</a></li>
                <li><a href="/coupons" class="footer-link">Coupons</a></li>
              </ul>

              <h3 style={{ marginTop: '1.5rem' }}>Social Media</h3>
              <div class="social-icons">
                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-link"><FaFacebookMessenger /></a>
                <a href="#" class="social-link"><BsInstagram /></a>
                <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <p class="copyright">©WPDean 2025. All rights reserved.</p>
            <div class="footer-meta">
              <a href="/privacy" class="meta-link">Privacy Policy</a>
              <span class="separator">|</span>
              <a href="/terms" class="meta-link">Terms and Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
