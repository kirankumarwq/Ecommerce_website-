import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import StarRating from '../components/StarRating';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import ProductDetailSkeleton from '../components/ProductDetailSkeleton';
import { Product } from '../types';
import Modal from '../components/Modal';
import QuickView from '../components/QuickView';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, addToCart, loading } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }
  
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
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

  const handleCloseModal = () => {
    setQuickViewProduct(null);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
          </div>

          {/* Product Details */}
          <div>
            <span className="text-sm font-semibold text-primary uppercase">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>
            <div className="mt-4">
              <StarRating rating={product.rating.rate} count={product.rating.count} />
            </div>
            <p className="text-3xl font-bold text-neutral-800 mt-4">₹{product.price.toLocaleString()}</p>
            <p className="mt-4 text-neutral-600">{product.description}</p>
            
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
              <Button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1">Add to Cart</Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center">Related Products</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </div>
      {quickViewProduct && (
        <Modal isOpen={!!quickViewProduct} onClose={handleCloseModal}>
          <QuickView product={quickViewProduct} onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default ProductDetailPage;