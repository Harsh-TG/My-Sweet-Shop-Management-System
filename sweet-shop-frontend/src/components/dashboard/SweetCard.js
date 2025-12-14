import React, { useState } from 'react';
import './SweetCard.css';

function SweetCard({ sweet, onPurchase }) {
    const [quantity, setQuantity] = useState(1);

    const handlePurchase = () => {
        if (quantity > 0 && quantity <= sweet.quantityInStock) {
            onPurchase(sweet.id, quantity);
            setQuantity(1);
        }
    };

    const isOutOfStock = sweet.quantityInStock === 0;

    return (
        <div className="sweet-card">
            {/* Top Section */}
            <div className="sweet-top">
                <span className="category-pill">
                    {sweet.category}
                </span>
                <h3 className="sweet-title">{sweet.name}</h3>
            </div>

            {/* Middle Info */}
            <div className="sweet-info">
                <div className="price-section">
                    <span className="currency">$</span>
                    <span className="amount">{sweet.price.toFixed(2)}</span>
                </div>

                <div className={`stock-status ${isOutOfStock ? 'out' : 'in'}`}>
                    {isOutOfStock
                        ? 'Out of Stock'
                        : `Available: ${sweet.quantityInStock}`}
                </div>
            </div>

            {/* Action */}
            <div className="sweet-action">
                <input
                    type="number"
                    min="1"
                    max={sweet.quantityInStock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    disabled={isOutOfStock}
                />
                <button
                    className="buy-btn"
                    onClick={handlePurchase}
                    disabled={isOutOfStock || quantity > sweet.quantityInStock}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}

export default SweetCard;
