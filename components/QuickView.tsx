import React, { useState } from 'react';
import { Product } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import StarRating from './StarRating';
import Button from './Button';

interface QuickViewProps {
  product: Product;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, onClose }) => {
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsPulsing(true);
    setTimeout(() => {
        setIsPulsing(false);
        onClose(); // Close modal after animation completes
    }, 700); // Animation duration
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock, prev + amount)));
  };

  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      value = 1;
    }
    const clampedValue = Math.min(value, product.stock);
    setQuantity(clampedValue);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <div>
        <img src={product.image} alt={product.name} className="w-full h-auto max-h-[70vh] object-contain rounded-lg" />
      </div>
      <div>
        <span className="text-sm font-semibold text-primary uppercase">{product.category}</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>
        <div className="mt-4">
          <StarRating rating={product.rating.rate} count={product.rating.count} />
        </div>
        <p className="text-3xl font-bold text-neutral-800 mt-4">₹{product.price.toLocaleString()}</p>
        <p className="mt-4 text-neutral-600 h-24 overflow-y-auto">{product.description}</p>
        
        <div className="mt-6">
          <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        <div className="mt-8 flex items-center space-x-4">
          <div className="flex items-center border border-neutral-300 rounded-lg">
            <button type="button" onClick={() => handleQuantityChange(-1)} className="px-4 py-2 text-lg font-bold text-neutral-700 hover:bg-neutral-100 rounded-l-lg" aria-label="Decrease quantity">-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityInputChange}
              min="1"
              max={product.stock}
              className="w-16 text-center bg-transparent border-none text-neutral-900 focus:ring-0 focus:outline-none"
              aria-label="Product quantity"
            />
            <button type="button" onClick={() => handleQuantityChange(1)} className="px-4 py-2 text-lg font-bold text-neutral-700 hover:bg-neutral-100 rounded-r-lg" aria-label="Increase quantity">+</button>
          </div>
          <Button onClick={handleAddToCart} disabled={product.stock === 0} className={`flex-1 ${isPulsing ? 'animate-pulse-once' : ''}`}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default QuickView;