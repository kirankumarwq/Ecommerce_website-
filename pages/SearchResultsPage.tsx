
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { Product } from '../types';
import Modal from '../components/Modal';
import QuickView from '../components/QuickView';
import { ICONS } from '../constants';

const SearchResultsPage: React.FC = () => {
  const { products, loading } = useAppContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const searchResults = useMemo(() => {
    if (!query) {
      return [];
    }
    const lowercasedQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercasedQuery) ||
      product.category.toLowerCase().includes(lowercasedQuery)
    );
  }, [products, query]);

  const handleCloseModal = () => {
    setQuickViewProduct(null);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
            {query ? (
                <>
                    <h1 className="text-3xl font-extrabold text-neutral-800">
                        Search Results for "<span className="text-primary">{query}</span>"
                    </h1>
                    <p className="mt-2 text-lg text-neutral-600">
                        {loading ? 'Searching...' : `${searchResults.length} products found.`}
                    </p>
                </>
            ) : (
                 <h1 className="text-3xl font-extrabold text-neutral-800">
                    Please enter a search term
                </h1>
            )}
        </header>

        {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)}
            </div>
        ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {searchResults.map(product => (
                    <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                 <div className="inline-block p-4 bg-neutral-100 rounded-full text-neutral-500">
                    {React.cloneElement(ICONS.search, { className: 'h-12 w-12' })}
                 </div>
                <h2 className="mt-4 text-2xl font-bold text-neutral-800">No products found for "{query}"</h2>
                <p className="mt-2 text-neutral-600">Try searching for something else or check your spelling.</p>
            </div>
        )}
      </div>
      {quickViewProduct && (
          <Modal isOpen={!!quickViewProduct} onClose={handleCloseModal}>
            <QuickView product={quickViewProduct} onClose={handleCloseModal} />
          </Modal>
        )}
    </>
  );
};

export default SearchResultsPage;
