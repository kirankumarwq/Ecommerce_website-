import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-56 bg-neutral-300"></div>
      <div className="p-4 flex flex-col h-[calc(100%-14rem)]">
        <div className="flex-grow">
          <div className="h-4 bg-neutral-300 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-neutral-300 rounded w-3/4 mb-2"></div>
          <div className="h-5 bg-neutral-300 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-neutral-300 rounded w-1/3"></div>
        </div>
        <div className="mt-4">
            <div className="h-10 bg-neutral-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
