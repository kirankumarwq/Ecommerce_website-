import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { Product } from '../types';
import Modal from '../components/Modal';
import QuickView from '../components/QuickView';
import CustomSelect from '../components/CustomSelect';
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams

const ShopPage: React.FC = () => {
  const { products, loading } = useAppContext();
  const [searchParams] = useSearchParams();
  const initialCategoryParam = searchParams.get('category');

  // Initialize selectedCategories based on URL parameter
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategoryParam ? [initialCategoryParam] : []
  );
  
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price), 0), [products]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: maxPrice });
  const [sortOption, setSortOption] = useState('newest'); // Initial sort option
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);

  // Effect to update selectedCategories when the URL category parameter changes.
  // This ensures that navigating via <Link to="/shop?category=X"> resets the filter.
  useEffect(() => {
    if (initialCategoryParam && (!selectedCategories.length || selectedCategories[0] !== initialCategoryParam)) {
      setSelectedCategories([initialCategoryParam]);
    } else if (!initialCategoryParam && selectedCategories.length === 1 && categories.includes(selectedCategories[0])) {
      // If no category in URL, and previously there was one set by URL, clear it.
      setSelectedCategories([]);
    } else if (!initialCategoryParam && selectedCategories.length > 1 && selectedCategories.some(c => categories.includes(c))) {
        // If URL category param is removed AND multiple categories were selected, clear them all
        // This is a more robust way to handle the "only show products related to it"
        setSelectedCategories([]);
    }
  }, [initialCategoryParam, categories]);


  // Reset currentPage to 1 whenever filters or sort options change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, sortOption, priceRange]);
  
  // Update priceRange max when maxPrice changes (e.g., initial load)
  useEffect(() => {
    if (maxPrice > 0 && priceRange.max === 0) {
      setPriceRange(prev => ({ ...prev, max: maxPrice }));
    }
  }, [maxPrice, priceRange.max]);


  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handlePriceChange = (value: number) => {
    setPriceRange(prev => ({ ...prev, max: value }));
  };

  const handleCloseModal = () => {
    setQuickViewProduct(null);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    filtered = filtered.filter(p => p.price <= priceRange.max);

    switch (sortOption) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating.rate - a.rating.rate);
      case 'newest':
      default:
        return filtered.sort((a, b) => b.id - a.id);
    }
  }, [products, selectedCategories, sortOption, priceRange]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  const sortOptions = useMemo(() => [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ], []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold">All Products</h1>
          <p className="mt-2 text-lg text-neutral-600">Find the perfect item from our collection.</p>
        </header>
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar 
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              maxPrice={maxPrice}
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-neutral-600">{loading ? 'Loading...' : `${filteredAndSortedProducts.length} Products Found`}</p>
              <CustomSelect
                options={sortOptions}
                value={sortOption}
                onChange={setSortOption}
                label="Sort by"
                className="w-48"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {loading ? (
                Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => <ProductCardSkeleton key={index} />)
              ) : (
                currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                ))
              )}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-neutral-200 text-neutral-700 hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      pageNumber === currentPage
                        ? 'bg-primary text-white'
                        : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                    }`}
                    aria-label={`Go to page ${pageNumber}`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md bg-neutral-200 text-neutral-700 hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            )}
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

export default ShopPage;