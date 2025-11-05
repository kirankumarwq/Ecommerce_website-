import React, { useState, useEffect } from 'react';

const CursorFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      if (target && window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer') {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const size = isPointer ? 40 : 20;

  return (
    <div
      className="hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-200 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(${position.x - size / 2}px, ${position.y - size / 2}px)`,
        backgroundColor: 'rgba(249, 115, 22, 0.3)',
        border: isPointer ? '2px solid #F97316' : 'none',
      }}
      aria-hidden="true"
    />
  );
};

export default CursorFollower;
