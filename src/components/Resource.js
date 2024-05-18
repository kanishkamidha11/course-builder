import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../dndTypes';
import './Resource.css';

const Resource = ({ resource, index, moduleId, modules, setModules, updateResource, deleteResource }) => {
  const moveResource = (fromIndex, toIndex) => {
    const updatedModules = modules.map(m => {
      if (m.id === moduleId) {
        const updatedResources = [...m.resources];
        const [movedResource] = updatedResources.splice(fromIndex, 1);
        updatedResources.splice(toIndex, 0, movedResource);
        return { ...m, resources: updatedResources };
      }
      return m;
    });
    setModules(updatedModules);
  };

  const [, drop] = useDrop({
    accept: ItemTypes.RESOURCE,
    hover(draggedResource) {
      if (draggedResource.index !== index) {
        moveResource(draggedResource.index, index);
        draggedResource.index = index;
        draggedResource.moduleId = moduleId;
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.RESOURCE,
    item: { type: ItemTypes.RESOURCE, id: resource.id, index, moduleId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const handleRename = () => {
    const newName = prompt('New name:', resource.name);
    if (newName) {
      updateResource(resource.id, { ...resource, name: newName });
    }
  };

  return (
    <div ref={node => drag(drop(node))} className="resource" style={{ opacity: isDragging ? 0.4 : 1 }}>
      <div className="resource-content">
        <p>{resource.name}</p>
        {resource.type === 'link' && <a href={resource.url} target="_blank" rel="noopener noreferrer">Visit Link</a>}
        {resource.type === 'image' && <img src={resource.url} alt={resource.name} className="resource-image" />}
        {resource.type === 'pdf' && <a href={resource.url} target="_blank" rel="noopener noreferrer">View PDF</a>}
      </div>
      <div className="resource-buttons">
        <button onClick={handleRename}>Rename</button>
        <button className="delete" onClick={() => deleteResource(resource.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Resource;
