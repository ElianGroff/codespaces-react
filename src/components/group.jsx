import React, { useState } from 'react';
import { Item } from '.';

export function Group({
    path,
    name,
    position,
    size,
    //*texture,
    items,
    groups,
    onDropItem,
    onDropGroup
}) {

    const handleDrop = (e) => {
        e.preventDefault();
        const itemType = e.dataTransfer.getData('type');
        const itemPath = e.dataTransfer.getData('path');

        const newPosition = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        }

        switch(itemType){
            case 'item':
                onDropItem(itemPath, path, newPosition)
            case 'group':
                onDropGroup(itemPath, path, newPosition)
        }
    }


    return (
        <div
            className='absolute border border-black'
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                width: `${size.x}px`,
                height: `${size.y}px`,
            }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <div className='text-center'>{name}</div>
            {items.map((item) => {
                <Item key={item.path} {...item} />
            })}
            {groups.map((group) => (
                <Group
                    key={group.path}
                    {...group}
                    onDropItem={onDropItem}
                    onDropGroup={onDropGroup}
                />
            ))}

        </div>
    )
}