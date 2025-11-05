import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../constants';
import { Product } from '../types';

interface SearchFormProps {
    products: Product[];
    onSearchSubmit: (query: string) => void;
    onCloseMobileMenu?: () => void; // Optional: to close mobile menu after search or suggestion click
    className?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ products, onSearchSubmit, onCloseMobileMenu, className = '' }) => {
    const [internalSearchQuery, setInternalSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debounceTimeoutRef = useRef<number | undefined>(undefined);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Effect for handling search suggestions with debounce
    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        const trimmedQuery = internalSearchQuery.trim();

        if (trimmedQuery.length > 0) {
            debounceTimeoutRef.current = setTimeout(() => {
                const lowercasedQuery = trimmedQuery.toLowerCase();
                const filteredSuggestions = products.filter(product =>
                    product.name.toLowerCase().includes(lowercasedQuery) ||
                    product.category.toLowerCase().includes(lowercasedQuery)
                ).slice(0, 5); // Limit to 5 suggestions
                setSuggestions(filteredSuggestions);
                setShowSuggestions(true);
            }, 300) as unknown as number; // Debounce for 300ms
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [internalSearchQuery, products]);

    // Effect to close suggestions when clicking outside the search form
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInternalSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalSearchQuery(e.target.value);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearchSubmit(internalSearchQuery);
        setInternalSearchQuery(''); // Clear input after submission
        setShowSuggestions(false); // Hide suggestions
        if (onCloseMobileMenu) onCloseMobileMenu();
    };

    const handleSuggestionClick = (product: Product) => {
        navigate(`/product/${product.id}`);
        setInternalSearchQuery(''); // Clear input after selection
        setSuggestions([]); // Clear suggestions
        setShowSuggestions(false); // Hide suggestions
        if (onCloseMobileMenu) onCloseMobileMenu();
    };

    return (
        <div className={`relative ${className}`} ref={searchContainerRef}>
            <form onSubmit={handleFormSubmit} className="relative flex items-center">
                <input
                    type="text"
                    value={internalSearchQuery}
                    onChange={handleInternalSearchChange}
                    onFocus={() => internalSearchQuery.trim().length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 bg-white border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                    aria-label="Search for products"
                />
                <button type="submit" className="absolute right-0 top-0 h-full px-3 text-neutral-500 hover:text-primary" aria-label="Submit search">
                    {React.cloneElement(ICONS.search, { className: 'h-5 w-5' })}
                </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {suggestions.map(product => (
                        <li
                            key={product.id}
                            className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-neutral-900 hover:bg-neutral-100"
                            onClick={() => handleSuggestionClick(product)}
                            role="option"
                        >
                            <span className="block truncate">{product.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-500 text-xs">
                                in {product.category}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchForm;