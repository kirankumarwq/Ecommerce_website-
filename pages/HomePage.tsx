import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import Button from '../components/Button';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { Testimonial, Product } from '../types';
import Modal from '../components/Modal';
import QuickView from '../components/QuickView';
// Removed: import SplineCanvas from '../components/SplineCanvas';

// Dummy data for testimonials as it's not provided elsewhere
const testimonials: Testimonial[] = [
  {
    quote: "Building my dream PC was a breeze with ShopVerse. The quality of components is top-notch and the delivery was super fast!",
    author: "Alex Johnson",
    build: "Gaming Rig Build",
  },
  {
    quote: "I found exactly what I was looking for. The variety is amazing, and the prices are competitive. Highly recommended!",
    author: "Samantha Miller",
    build: "Workstation Upgrade",
  },
  {
    quote: "Customer service was incredibly helpful in guiding me through my first build. 10/10 would shop here again.",
    author: "David Chen",
    build: "First PC Build",
  },
];

const categoryIcons: { [key: string]: string } = {
    'Processors (CPU)': '💻',
    'Graphics Cards (GPU)': '🎨',
    'Motherboards': '🔧',
    'Memory (RAM)': '🧠',
    'Storage': '💾',
    'Power Supplies (PSU)': '⚡',
    'PC Cases': '📦',
};

const HomePage: React.FC = () => {
  const { products, loading } = useAppContext();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const featuredProducts = useMemo(() => products.filter(p => p.rating.rate >= 4.8).slice(0, 4), [products]);
  const newArrivals = useMemo(() => [...products].sort((a, b) => b.id - a.id).slice(0, 4), [products]);

  const handleCloseModal = () => {
    setQuickViewProduct(null);
  };

  return (
    <>
      {/* Removed Spline full-screen background */}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white"> {/* Reverted to bg-white */}
        {/* Reinstated hero image div - MOVED TO APPEAR FIRST */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full animate-gradient-move"
            src="heroimg.png" // Assuming heroimg.png is in the public folder or correctly handled
            alt="Hero background with abstract gradient"
          />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"> {/* Reverted to bg-white */}
            {/* Reinstated SVG polygon for the angled background shape */}
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl animate-fade-in-up">
                  <span className="block">Build Your Dream PC</span>
                  <span className="block text-primary">With Premium Components</span>
                </h1>
                <p className="mt-3 text-base text-neutral-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 animate-fade-in-up [animation-delay:200ms]">
                    Discover a universe of top-tier computer parts. From blazing-fast CPUs to powerful GPUs, find everything you need for the ultimate setup.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start animate-fade-in-up [animation-delay:400ms]">
                  <div className="rounded-md shadow">
                        <Link to="/shop">
                          <Button className="w-full text-lg px-8 py-3">Shop Now</Button>
                        </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="bg-white py-20"> {/* Removed relative z-10 and shadow-lg */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-neutral-900 text-center">Featured Products</h2>
            <p className="mt-4 text-lg text-neutral-500 text-center">Handpicked for performance and quality.</p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
              ) : (
                featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                ))
              )}
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="bg-neutral-50 py-20"> {/* Removed relative z-10 and shadow-lg */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-neutral-900 text-center">Shop by Category</h2>
                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 text-center">
                    {categories.map(category => (
                        <Link key={category} to={`/shop?category=${encodeURIComponent(category)}`} className="group"> {/* Updated Link */}
                            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-white shadow-md mx-auto group-hover:bg-primary transition-all duration-300">
                                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{categoryIcons[category] || '🖥️'}</span>
                            </div>
                            <h3 className="mt-4 text-md font-semibold text-neutral-800 group-hover:text-primary">{category}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white py-20"> {/* Removed relative z-10 and shadow-lg */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-neutral-900 text-center">What Our Customers Say</h2>
            <div className="mt-12">
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="bg-neutral-50 py-20"> {/* Removed relative z-10 and shadow-lg */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-neutral-900 text-center">New Arrivals</h2>
            <p className="mt-4 text-lg text-neutral-500 text-center">Check out the latest additions to our collection.</p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
              ) : (
                newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                ))
              )}
            </div>
          </div>
        </section>
      {quickViewProduct && (
        <Modal isOpen={!!quickViewProduct} onClose={handleCloseModal}>
          <QuickView product={quickViewProduct} onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default HomePage;