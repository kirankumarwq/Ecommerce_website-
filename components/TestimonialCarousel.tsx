import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearTimeout(timer);
  }, [currentIndex, testimonials.length]);

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full flex-shrink-0 text-center px-8">
            <blockquote className="text-xl text-neutral-600 italic">"{testimonial.quote}"</blockquote>
            <cite className="block mt-4 not-italic">
              <span className="font-semibold text-neutral-800">{testimonial.author}</span>
              <span className="text-neutral-500"> — {testimonial.build}</span>
            </cite>
          </div>
        ))}
      </div>
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-primary' : 'bg-neutral-300 hover:bg-neutral-400'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
