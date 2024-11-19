
//@import { container, essence, page } from './components/index.js'
import React, { useState } from "react";

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(position));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
    setIsHovered(false);
  };

  return (
    <>
      <div
        className={`relative w-[400px] h-[400px] mx-auto mt-10 border-2 ${ 
          isHovered ? "border-blue-500" : "border-black"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsHovered(true);
        }}
        onDragLeave={() => setIsHovered(false)}
        onDrop={handleDrop}
      >
      </div>

      <div
        className="absolute w-[50px] h-[50px] bg-red-500 cursor-grab"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
        draggable="true"
        onDragStart={handleDragStart}
      ></div>

    </>
  );
}

export default App;

 