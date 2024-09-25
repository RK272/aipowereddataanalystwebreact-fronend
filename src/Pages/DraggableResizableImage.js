import React, { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useImageContext1 } from './ImageContext1';

const DraggableResizableImage = ({ src, onRemove, index, initialPosition, initialDimensions }) => {
  const { updateImagePosition } = useImageContext1();
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  useEffect(() => {
    updateImagePosition(index, position, dimensions);
  }, [position, dimensions, index, updateImagePosition]);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('resize-handle')) {
      setIsResizing(true);
    } else {
      setIsDragging(true);
    }
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startDrag.x;
      const deltaY = e.clientY - startDrag.y;

      setPosition((prevPosition) => {
        const newX = Math.max(0, Math.min(prevPosition.x + deltaX, window.innerWidth - dimensions.width));
        const newY = Math.max(60, Math.min(prevPosition.y + deltaY, window.innerHeight - dimensions.height));
        return { x: newX, y: newY };
      });

      setStartDrag({ x: e.clientX, y: e.clientY });
    } else if (isResizing) {
      const deltaX = e.clientX - startDrag.x;
      const deltaY = e.clientY - startDrag.y;

      setDimensions((prevDimensions) => ({
        width: Math.max(100, prevDimensions.width + deltaX),
        height: Math.max(100, prevDimensions.height + deltaY),
      }));

      setStartDrag({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div
      className={`absolute cursor-${isDragging ? 'grabbing' : 'grab'} transition-all`}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img
        src={src}
        alt={`Dashboard ${index + 1}`}
        className="w-full h-full object-cover pointer-events-none"
      />
      <div
        className="resize-handle absolute bottom-0 right-0 w-4 h-4 bg-transparent cursor-nwse-resize"
        onMouseDown={handleMouseDown}
      ></div>
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-white text-white px-2 py-1 rounded-lg hover:bg-red-600"
      >
        <RxCross2 />
      </button>
    </div>
  );
};

export default DraggableResizableImage;
