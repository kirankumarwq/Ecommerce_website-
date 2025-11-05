import React from 'react';
import Spline from '@splinetool/react-spline'; // Correct import for React SPA

interface SplineCanvasProps {
  sceneUrl: string;
  className?: string;
}

const SplineCanvas: React.FC<SplineCanvasProps> = ({ sceneUrl, className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Spline scene={sceneUrl} />
    </div>
  );
};

export default SplineCanvas;