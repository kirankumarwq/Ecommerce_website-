import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ICONS } from '../constants';
import { useAppContext } from '../hooks/useAppContext';
import SearchForm from './SearchForm'; // Import the new SearchForm component

const NavLinks: React.FC<{ className?: string, onLinkClick?: () => void }> = ({ className, onLinkClick }) => (
    <nav className={className}>
        <NavLink to="/" onClick={onLinkClick} className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary' : 'text-neutral-600 hover:text-primary'}`}>Home</NavLink>
        <NavLink to="/shop" onClick={onLinkClick} className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary' : 'text-neutral-600 hover:text-primary'}`}>Shop</NavLink>
        <NavLink to="/about" onClick={onLinkClick} className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary' : 'text-neutral-600 hover:text-primary'}`}>About</NavLink>
        <NavLink to="/contact" onClick={onLinkClick} className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary' : 'text-neutral-600 hover:text-primary'}`}>Contact</NavLink>
    </nav>
);

const Header: React.FC = () => {
    const { cart, wishlist, products } = useAppContext(); // Get products for search suggestions
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isWishlistIconBouncing, setIsWishlistIconBouncing] = useState(false);
    const prevWishlistCount = useRef(wishlist.length);
    const navigate = useNavigate();
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleSearchSubmit = (query: string) => {
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
            if (isMenuOpen) setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (wishlist.length > prevWishlistCount.current) {
            // Item added to wishlist
            setIsWishlistIconBouncing(true);
            const timer = setTimeout(() => setIsWishlistIconBouncing(false), 700);
            return () => clearTimeout(timer);
        }
        prevWishlistCount.current = wishlist.length;
    }, [wishlist.length]);

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Side: Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-primary">ShopVerse</Link>
                    </div>

                    {/* Center: Main Navigation (Desktop) */}
                    <div className="hidden md:block">
                        <NavLinks className="flex items-baseline space-x-4" />
                    </div>

                    {/* Right Side: Search, Icons & Mobile Menu Button */}
                    <div className="flex items-center">
                        <SearchForm
                            products={products}
                            onSearchSubmit={handleSearchSubmit}
                            className="hidden md:block w-56 mr-4"
                        />
                        
                        <div className="flex items-center space-x-4">
                            <Link to="/account" className="text-neutral-600 hover:text-primary">{ICONS.user}</Link>
                            <Link to="/wishlist" className={`relative text-neutral-600 hover:text-primary ${isWishlistIconBouncing ? 'animate-bounce-once' : ''}`}>
                                {ICONS.wishlist}
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-accent text-white text-xs rounded-full">{wishlist.length}</span>
                                )}
                            </Link>
                            <Link to="/cart" className="relative text-neutral-600 hover:text-primary">
                                {ICONS.cart}
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-accent text-white text-xs rounded-full">{cartItemCount}</span>
                                )}
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden ml-4">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-neutral-600 hover:text-primary">
                                {isMenuOpen ? ICONS.close : ICONS.menu}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden border-t border-neutral-200 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}>
                <div className="p-4">
                    <SearchForm 
                        products={products}
                        onSearchSubmit={handleSearchSubmit}
                        onCloseMobileMenu={() => setIsMenuOpen(false)}
                    />
                </div>
                <NavLinks
                    className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col"
                    onLinkClick={() => setIsMenuOpen(false)}
                />
            </div>
        </header>
    );
};

export default Header;