import React from 'react';
import Resource from './Resource';
import AddResourceForm from './AddResourceForm';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../dndTypes';
import './Module.css';

const Module = ({ module, index, moveModule, updateModule, deleteModule, modules, setModules }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.MODULE,
    hover(draggedModule) {
      if (draggedModule.index !== index) {
        moveModule(draggedModule.index, index);
        draggedModule.index = index;
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.MODULE,
    item: { type: ItemTypes.MODULE, id: module.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  const addResource = (resource) => {
    const updatedModules = modules.map(m =>
      m.id === module.id ? { ...m, resources: [...m.resources, resource] } : m
    );
    setModules(updatedModules);
  };

  const updateResource = (resourceId, updatedResource) => {
    const updatedModules = modules.map(m => {
      if (m.id === module.id) {
        const updatedResources = m.resources.map(r =>
          r.id === resourceId ? updatedResource : r
        );
        return { ...m, resources: updatedResources };
      }
      return m;
    });
    setModules(updatedModules);
  };

  const deleteResource = (resourceId) => {
    const updatedModules = modules.map(m => {
      if (m.id === module.id) {
        const updatedResources = m.resources.filter(r => r.id !== resourceId);
        return { ...m, resources: updatedResources };
      }
      return m;
    });
    setModules(updatedModules);
  };

  return (
    <div ref={node => drag(drop(node))} className="module" style={{ opacity }}>
      <h3>{module.name}</h3>
      <button onClick={() => updateModule(module.id, prompt('New name:'))}>Rename Module</button>
      <button className="delete" onClick={() => deleteModule(module.id)}>Delete Module</button>
      <AddResourceForm addResource={addResource} />
      {module.resources.map((resource, index) => (
        <Resource
          key={resource.id}
          resource={resource}
          index={index}
          moduleId={module.id}
          modules={modules}
          setModules={setModules}
          updateResource={updateResource}
          deleteResource={deleteResource}
        />
      ))}
    </div>
  );
};

export default Module;
