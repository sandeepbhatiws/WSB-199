import React from 'react'

export default function ProductDetails() {
  return (
    <>

    {/* <!-- Breadcrumb --> */}
        <nav class="breadcrumb">
          <a href="/">Home</a>
          <span class="breadcrumb-separator">
            <i class="fas fa-chevron-right"></i>
          </span>
          <a href="/products">Products</a>
          <span class="breadcrumb-separator">
            <i class="fas fa-chevron-right"></i>
          </span>
          <a href="/products/sweatshirts">sweatshirts</a>
          <span class="breadcrumb-separator">
            <i class="fas fa-chevron-right"></i>
          </span>
          <span class="current-page">Classic Comfort Sweatshirt</span>
        </nav>
      {/* <!-- Product layout --> */}
        <div class="product-layout">
          {/* <!-- Product images --> */}
          <div class="product-images">
            <div class="main-image">
              <img src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&auto=format&fit=crop&q=60" alt="Classic Comfort Sweatshirt - main image" id="main-product-image"/>
            </div>
            <div class="image-thumbnails">
              <button class="thumbnail-btn active" data-image="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&auto=format&fit=crop&q=60">
                <img src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&auto=format&fit=crop&q=60" alt="Classic Comfort Sweatshirt - view 1"/>
              </button>
              <button class="thumbnail-btn" data-image="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600&auto=format&fit=crop&q=60">
                <img src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600&auto=format&fit=crop&q=60" alt="Classic Comfort Sweatshirt - view 2"/>
              </button>
              <button class="thumbnail-btn" data-image="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&auto=format&fit=crop&q=60">
                <img src="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&auto=format&fit=crop&q=60" alt="Classic Comfort Sweatshirt - view 3"/>
              </button>
              <button class="thumbnail-btn" data-image="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=60">
                <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=60" alt="Classic Comfort Sweatshirt - view 4"/>
              </button>
              <button class="thumbnail-btn" data-image="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=60">
                <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=60" alt="Classic Comfort Sweatshirt - view 5"/>
              </button>
            </div>
          </div>

          {/* <!-- Product details --> */}
          <div class="product-details">
            <h1 class="product-title">Classic Comfort Sweatshirt</h1>
            <div class="rating">
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
              <span class="reviews-count">(243 reviews)</span>
            </div>

            <p class="product-description">A comfy collection, perfect for casual everyday wear.</p>

            <div class="product-price">
              <span class="current-price">$79.99</span>
              <span class="original-price">$95.00</span>
            </div>

            {/* <!-- Color selector --> */}
            <div class="color-selector">
              <div class="option-label">Color: <span id="selected-color">Sage Green</span></div>
              <div class="color-options">
                <button class="color-option selected" data-color-name="Sage Green">
                  <span class="color-swatch" style="background-color: #97a98f;"></span>
                </button>
                <button class="color-option" data-color-name="Soft Beige">
                  <span class="color-swatch" style="background-color: #f1deca;"></span>
                </button>
                <button class="color-option" data-color-name="Light Blue">
                  <span class="color-swatch" style="background-color: #b7c4cf;"></span>
                </button>
              </div>
            </div>

            {/* <!-- Size selector --> */}
            <div class="size-selector">
              <div class="option-label">Size: <span id="selected-size">S</span></div>
              <div class="size-options">
                <button class="size-option" data-size="XS">XS</button>
                <button class="size-option selected" data-size="S">S</button>
                <button class="size-option" data-size="M">M</button>
                <button class="size-option" data-size="L">L</button>
                <button class="size-option" data-size="XL">XL</button>
                <button class="size-option" data-size="XXL">XXL</button>
              </div>
            </div>

            {/* <!-- Action buttons --> */}
            <div class="actions">
              <button class="btn btn-primary" id="add-to-cart">Add to Cart</button>
              <button class="btn btn-outline">Buy Now</button>
            </div>

            {/* <!-- Product actions --> */}
            <div class="product-actions">
              <button class="action-btn">
                <i class="fas fa-heart"></i>
                <span>Save</span>
              </button>

              <div class="divider"></div>

              <button class="action-btn">
                <i class="fas fa-share-alt"></i>
                <span>Share</span>
              </button>
            </div>

            {/* <!-- Shipping info --> */}
            <div class="shipping-info">
              <h4 class="shipping-title">Shipping</h4>
              <p class="shipping-text">Free shipping on orders over $50</p>
              <p class="shipping-text">Estimated delivery: 3-5 business days</p>
            </div>
          </div>
        </div>

        {/* <!-- Tabs --> */}
        <div class="tabs">
          <div class="tab-buttons">
            <button class="tab-btn active" data-tab="details">Details</button>
            <button class="tab-btn" data-tab="reviews">Reviews</button>
            <button class="tab-btn" data-tab="questions">Questions</button>
          </div>

          <div class="tab-content">
            {/* <!-- Details tab --> */}
            <div class="tab-pane active" id="details-tab">
              <div class="max-w-3xl">
                <p>This collection features a simple and comfortable design in a vintage style look. We feature family-focused styles made with soft fabric that's perfect for everyday wear. The sweatshirt is made from a blend of organic cotton and recycled polyester, providing both comfort and sustainability.</p>

                <div class="mt-4">
                  <h3 class="font-medium mb-2">Features:</h3>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>Made with 80% organic cotton and 20% recycled polyester</li>
                    <li>Ribbed cuffs and hem</li>
                    <li>Regular fit</li>
                    <li>Machine washable</li>
                    <li>Imported</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- Reviews tab --> */}
            <div class="tab-pane" id="reviews-tab">
              <div class="reviews-container">
                <div class="reviews-summary">
                  <div class="reviews-card">
                    <div class="average-rating">4.9</div>
                    <div class="reviews-stars">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                    <div class="total-reviews">243 reviews</div>

                    <div class="rating-bars">
                      <div class="rating-bar">
                        <div class="star-label">5 ★</div>
                        <div class="bar-container">
                          <div class="bar-fill" style="width: 76%"></div>
                        </div>
                        <div class="bar-count">184</div>
                      </div>
                      <div class="rating-bar">
                        <div class="star-label">4 ★</div>
                        <div class="bar-container">
                          <div class="bar-fill" style="width: 18%"></div>
                        </div>
                        <div class="bar-count">43</div>
                      </div>
                      <div class="rating-bar">
                        <div class="star-label">3 ★</div>
                        <div class="bar-container">
                          <div class="bar-fill" style="width: 12%"></div>
                        </div>
                        <div class="bar-count">29</div>
                      </div>
                      <div class="rating-bar">
                        <div class="star-label">2 ★</div>
                        <div class="bar-container">
                          <div class="bar-fill" style="width: 2%"></div>
                        </div>
                        <div class="bar-count">5</div>
                      </div>
                      <div class="rating-bar">
                        <div class="star-label">1 ★</div>
                        <div class="bar-container">
                          <div class="bar-fill" style="width: 1%"></div>
                        </div>
                        <div class="bar-count">2</div>
                      </div>
                    </div>
                  </div>

                  <div class="write-review">
                    <button class="btn btn-outline" style="width: 100%">Write a Review</button>
                  </div>
                </div>

                <div class="reviews-list">
                  <div class="reviews-header">
                    <h3 class="reviews-title">Customer Reviews</h3>
                    <select class="sort-select">
                      <option>Most Recent</option>
                      <option>Highest Rating</option>
                      <option>Lowest Rating</option>
                    </select>
                  </div>

                  {/* <!-- Review items --> */}
                  <div class="review-item">
                    <div class="review-header">
                      <img class="reviewer-avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" alt="James Donner's profile"/>
                        <div class="reviewer-info">
                          <h4 class="reviewer-name">James Donner</h4>
                          <div class="reviewer-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                          </div>
                        </div>
                    </div>

                    <div class="review-content">
                      A simple classic look but makes this outfit seem real and beautiful, the material is soft, but when worn it often wrinkles because of sitting for too long.
                    </div>

                    <div class="review-actions">
                      <button class="review-action">
                        <i class="fas fa-thumbs-up"></i>
                        <span>8</span>
                      </button>
                      <button class="review-action">
                        <i class="fas fa-comment"></i>
                        <span>2</span>
                      </button>
                      <span class="review-date">March 15, 2025</span>
                    </div>
                  </div>

                  <div class="review-item">
                    <div class="review-header">
                      <img class="reviewer-avatar" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60" alt="Ray Hawkins's profile"/>
                        <div class="reviewer-info">
                          <h4 class="reviewer-name">Ray Hawkins</h4>
                          <div class="reviewer-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                          </div>
                        </div>
                    </div>

                    <div class="review-content">
                      Great classic style like promised and the fitting is just right!
                    </div>

                    <div class="review-actions">
                      <button class="review-action">
                        <i class="fas fa-thumbs-up"></i>
                        <span>2</span>
                      </button>
                      <button class="review-action">
                        <i class="fas fa-comment"></i>
                        <span>0</span>
                      </button>
                      <span class="review-date">February 2, 2025</span>
                    </div>
                  </div>

                  <div class="review-item">
                    <div class="review-header">
                      <img class="reviewer-avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" alt="Brooklyn Simmons's profile"/>
                        <div class="reviewer-info">
                          <h4 class="reviewer-name">Brooklyn Simmons</h4>
                          <div class="reviewer-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                          </div>
                        </div>
                    </div>

                    <div class="review-content">
                      Love the material, it's so comfortable. Bought two pcs.
                    </div>

                    <div class="review-actions">
                      <button class="review-action">
                        <i class="fas fa-thumbs-up"></i>
                        <span>1</span>
                      </button>
                      <button class="review-action">
                        <i class="fas fa-comment"></i>
                        <span>0</span>
                      </button>
                      <span class="review-date">January 18, 2025</span>
                    </div>
                  </div>

                  <div class="text-center" style="margin-top: 1.5rem;">
                    <button class="btn btn-outline">Load More Reviews</button>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Questions tab --> */}
            <div class="tab-pane" id="questions-tab">
              <div style="text-align: center; padding: 2rem 0;">
                <i class="fas fa-comment fa-3x" style="color: #e5e7eb; margin-bottom: 1rem;"></i>
                <h3 style="font-size: 1.125rem; font-weight: 500; margin-bottom: 0.5rem;">Have questions about this product?</h3>
                <p style="color: #6b7280; margin-bottom: 1rem;">Ask the community or share your knowledge</p>
                <button class="btn btn-outline">Ask a Question</button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
