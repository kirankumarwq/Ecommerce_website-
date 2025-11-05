import React from 'react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: { min: number; max: number };
  onPriceChange: (value: number) => void;
  maxPrice: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
    categories, 
    selectedCategories, 
    onCategoryChange, 
    priceRange,
    onPriceChange,
    maxPrice
}) => {
  return (
    <aside className="w-full lg:w-64 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map(category => (
          <div key={category} className="flex items-center">
            <input
              id={category}
              name={category}
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryChange(category)}
              className="h-4 w-4 text-primary bg-white border border-neutral-700 rounded focus:ring-primary"
            />
            <label htmlFor={category} className="ml-3 text-sm text-neutral-600">
              {category}
            </label>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">Price Range</h3>
      <div>
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={priceRange.max}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-neutral-600 mt-2">
          <span>₹0</span>
          <span>₹{priceRange.max.toLocaleString()}</span>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;