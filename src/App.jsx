
//@import { container, essence, page } from './components/index.js'
import React, { useState } from "react";
import { Item, Group } from "./components";


const MOCK_LOAD = {
  groups: [
    {
      id: "container1",
      name: "Container One",
      position: { x: 100, y: 100 },
      size: { x: 200, y: 200 },
      items: [
        {
          name: "essenceONE",
          position: { x: 20, y: 20 },
          size: { x: 40, y: 40 },
        },
      ],
      groups: [], // Nested containers
    },
  ],
};

function App() {
  //*const [isHovered, setIsHovered] = useState(false);
  //?const [position, setPosition] = useState({ x: 50, y: 50 });
  const [groups, setGroups] = useState(MOCK_LOAD.groups)

  const updateGroup = (path, updateFn) => {
    setGroups((prevGroups) => 
      prevGroups.map((group) => 
        group.path === path 
          ? {
            ...group,
            ...updateFn(group),
          }
        : group
      ))
  }


  const handleDropItem = (itemPath, groupId, newPosition) => {
    console.log(itemPath, groupId, newPosition)
    updateGroup(groupId, (group) => ({
      items: group.items.map((item) =>
      item.path === itemPath
        ? { ...item, position: newPosition }
        : item
    ),
    }))
  }

  const handleDropGroup = (childGroupPath, parentGroupPath, newPosition) => {
    console.log('HANDLE DROP GROUP:', childGroupPath, parentGroupPath, newPosition)
  }

  const handleDropAreaDrop = (e) => {
    e.preventDefault();
    const name = e.dataTransfer.getData("text/plain");
    console.log(name)
    const newPosition = {
      x: e.clientX - 25,
      y: e.clientY - 25,
    };
    handleDrop(name, newPosition);
  };

  return (
    <main
      className="bg-gray-200 absolute top-0 right-0 left-0 bottom-0">
      {groups.map((group) => (
        <Group
          key={group.name}
          {...group}
          onDropItem={handleDropItem}
          onDropGroup={handleDropGroup}
          />
      ))}
    </main>
  );
}

export default App;

 