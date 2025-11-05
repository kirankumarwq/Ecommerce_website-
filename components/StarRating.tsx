
import React from 'react';
import { ICONS } from '../constants';

interface StarRatingProps {
  rating: number;
  count?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, count }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < Math.round(rating) ? 'text-accent' : 'text-neutral-300'}>
            {ICONS.star}
          </span>
        ))}
      </div>
      {count && <span className="text-neutral-500 text-sm ml-2">({count} reviews)</span>}
    </div>
  );
};

export default StarRating;
