import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './Common/Header'
import { toast } from 'react-toastify'

import Footer from './Common/Footer';
import ProductCard from './Common/ProductCard';

export default function Home() {

  const [products, setProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);


  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/mens-shirts?limit=4')
      .then((result) => {
        setProducts(result.data.products)
      })
      .catch(() => {
        toast.error('Something went wrong !')
      })
  }, [])

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/tops?limit=4')
      .then((result) => {
        setWomenProducts(result.data.products)
      })
      .catch(() => {
        toast.error('Something went wrong !')
      })
  }, [])


  return (
    <>
      

      {/* <!-- Main content --> */}
      <main class="container">
        {/* <!-- Related products --> */}
        <section class="related-products">
          <h2 class="section-title w-100 text-center">Men Products</h2>
          <div class="products-grid">
            {/* <!-- Product 1 --> */}
            
            {
              products.map((value, index) => {
                return(
                  <ProductCard key={index} product={ value }/>
                )
              })
            }

          </div>
        </section>


        <section class="related-products">
          <h2 class="section-title w-100 text-center">Womend Products</h2>
          <div class="products-grid">
            {/* <!-- Product 1 --> */}
            
            {
              womenProducts.map((value, index) => {
                return(
                  <ProductCard key={index} product={ value }/>
                )
              })
            }

          </div>
        </section>
      </main>

      {/* <!-- Cart drawer --> */}
      <div class="drawer-backdrop" id="drawer-backdrop"></div>
      <div class="drawer" id="cart-drawer">
        <div class="drawer-header">
          <h3 class="drawer-title">Your Cart</h3>
        </div>
        <div class="drawer-content">
          <div class="cart-item">
            <div class="cart-item-info">
              <div class="cart-item-image">
                <img src="https://images.unsplash.com/photo-1572495175742-35d0f10406f6?w=600&auto=format&fit=crop&q=60" alt="Classic Comfort Sweatshirt"/>
              </div>
              <div>
                <h4>Classic Comfort Sweatshirt</h4>
                <p class="cart-item-meta">Size: S | Color: Sage</p>
                <p class="cart-item-price">$79.99</p>
              </div>
            </div>
            <div class="cart-item-actions">
              <button class="remove-btn">
                <i class="fas fa-times"></i>
              </button>
              <div class="quantity-controls">
                <button class="qty-btn qty-minus">
                  <i class="fas fa-minus"></i>
                </button>
                <span class="qty-display">1</span>
                <button class="qty-btn qty-plus">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="cart-summary-section">
            <span class="summary-label">Subtotal</span>
            <span class="summary-value" id="cart-subtotal">$79.99</span>
          </div>

          <button class="btn btn-primary" style={{ width: '100%' }}>Checkout</button>
        </div>
      </div>

      
    </>
  )
}
