import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import StarRating from './StarRating';
import Button from './Button';
import { useAppContext } from '../hooks/useAppContext';
import { ICONS } from '../constants';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();
  const isWishlisted = isInWishlist(product.id);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleWishlistToggle = () => {
    if(isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 700); // Animation duration
  };

  const handleAddToCartClick = () => {
    addToCart(product, 1);
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 700); // Animation duration
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
        </Link>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button 
                onClick={() => onQuickView(product)}
                variant="ghost"
                className="bg-white/90 text-neutral-800 hover:bg-white"
            >
                Quick View
            </Button>
        </div>
        {product.stock === 0 && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
             <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
        {product.stock > 0 && product.rating.rate >= 4.8 && (
            <div className="absolute top-2 left-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
                Featured
            </div>
        )}
        <button 
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-2 rounded-full bg-white/70 backdrop-blur-sm transition-colors duration-300 ${isWishlisted ? 'text-red-500' : 'text-neutral-500 hover:text-red-500'} ${isBouncing ? 'animate-bounce-once' : ''}`}
        >
          {React.cloneElement(ICONS.wishlist, { className: `h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`})}
        </button>
      </div>
      <div className="p-4 flex flex-col h-[calc(100%-14rem)]">
        <div className="flex-grow">
          <h3 className="text-sm text-neutral-500">{product.category}</h3>
          <h2 className="text-lg font-semibold text-neutral-800 truncate">
            <Link to={`/product/${product.id}`} className="hover:text-primary">{product.name}</Link>
          </h2>
          <div className="mt-1">
            <StarRating rating={product.rating.rate} />
          </div>
          <p className="mt-2 text-xl font-bold text-neutral-900">₹{product.price.toLocaleString()}</p>
        </div>
        <div className="mt-4">
          <Button 
            onClick={handleAddToCartClick} 
            className={`w-full ${isPulsing ? 'animate-pulse-once' : ''}`} 
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;