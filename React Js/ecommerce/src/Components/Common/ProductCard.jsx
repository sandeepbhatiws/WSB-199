import React from 'react'

export default function ProductCard({product}) {
    return (
        <>
            <div class="product-card">
                <div class="new-tag">{product.category}</div>
                <div class="product-card-image">
                    <img src={product.thumbnail} alt={product.title} />
                    <button class="product-card-wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <h3 class="product-card-name">{product.title}</h3>
                <div class="product-card-rating">
                    <div class="product-card-stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <span class="product-card-review-count">({product.reviews.length})</span>
                </div>
                <div class="product-card-price">
                    <span class="product-card-current-price">${product.price}</span>
                </div>
            </div>
        </>
    )
}
