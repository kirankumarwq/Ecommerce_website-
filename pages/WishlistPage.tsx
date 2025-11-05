
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Product } from '../types';
import Button from '../components/Button';
import { ICONS } from '../constants';

const WishlistItemCard: React.FC<{item: Product}> = ({item}) => {
    const { addToCart, removeFromWishlist } = useAppContext();
    
    const handleMoveToCart = () => {
        addToCart(item, 1);
        removeFromWishlist(item.id);
    };

    return (
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
            <div className="ml-4 flex-grow">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-neutral-600">₹{item.price.toLocaleString()}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleMoveToCart} variant="secondary" className="text-sm px-3 py-1.5">Move to Cart</Button>
                <Button onClick={() => removeFromWishlist(item.id)} variant="ghost" className="text-sm px-3 py-1.5">
                    <span className="flex items-center gap-1">{ICONS.trash} Remove</span>
                </Button>
            </div>
        </div>
    );
};

const WishlistPage: React.FC = () => {
  const { wishlist } = useAppContext();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold">Your Wishlist is Empty</h1>
        <p className="mt-4 text-neutral-600">Add products you love to your wishlist to see them here.</p>
        <div className="mt-6">
            <Link to="/shop">
                <Button>Explore Products</Button>
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      <div className="space-y-4">
        {wishlist.map(item => <WishlistItemCard key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default WishlistPage;
