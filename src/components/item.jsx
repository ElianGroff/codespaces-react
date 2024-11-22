import React, { useState } from "react";

export function Item({
    path,
    name, 
    color, 
    position, 
    size
}) {
    //&console.log(path, name, color, position, loadSize)
    //?const [position, setPosition] = useState(loadPosition)

    const handleDragStart = (e) => {
        e.dataTransfer.setData('type', 'item');
        e.dataTransfer.setData('path', path);
    };

    const handleDrop = (newPosition) => {
        console.log('handledrop ess')
        setPosition(newPosition);
        if (onDrop) onDrop(name, newPosition);
    };

    return (
       <div 
            className={`${color} absolute cursor-grab text-sm text-center`}
            draggable="true"
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                height: `${size.y}px`,
                width: `${size.x}px`,
              }}
            onDragStart={handleDragStart}
        >
            {name}
       </div>
    )
}