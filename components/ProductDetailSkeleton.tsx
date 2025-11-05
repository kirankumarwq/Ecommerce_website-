import React from 'react';

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Skeleton */}
        <div>
          <div className="w-full h-96 bg-neutral-300 rounded-lg"></div>
        </div>

        {/* Details Skeleton */}
        <div>
          <div className="h-4 bg-neutral-300 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-neutral-300 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-neutral-300 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-neutral-300 rounded w-1/3 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-neutral-300 rounded"></div>
            <div className="h-4 bg-neutral-300 rounded w-5/6"></div>
            <div className="h-4 bg-neutral-300 rounded w-4/6"></div>
          </div>
          <div className="h-5 bg-neutral-300 rounded w-1/4 mt-6"></div>
          <div className="mt-8 flex items-center space-x-4">
            <div className="h-12 w-32 bg-neutral-300 rounded-lg"></div>
            <div className="h-12 flex-1 bg-neutral-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
