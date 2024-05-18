import React, { useState } from 'react';
import { initialState } from '../data/initialState';
import Module from './Module';
import AddModuleForm from './AddModuleForm';

const CourseBuilder = () => {
  const [modules, setModules] = useState(initialState.modules);

  const addModule = (name) => {
    const newModule = { id: Date.now(), name, resources: [] };
    setModules([...modules, newModule]);
  };

  const updateModule = (id, name) => {
    const updatedModules = modules.map(module => 
      module.id === id ? { ...module, name } : module
    );
    setModules(updatedModules);
  };

  const deleteModule = (id) => {
    setModules(modules.filter(module => module.id !== id));
  };

  const moveModule = (fromIndex, toIndex) => {
    const updatedModules = [...modules];
    const [movedModule] = updatedModules.splice(fromIndex, 1);
    updatedModules.splice(toIndex, 0, movedModule);
    setModules(updatedModules);
  };

  return (
    <div className="course-builder">
    <header><h1>CourseBuilder</h1></header>
      <AddModuleForm addModule={addModule} />
      {modules.map((module, index) => (
        <Module
          key={module.id}
          module={module}
          index={index}
          moveModule={moveModule}
          updateModule={updateModule}
          deleteModule={deleteModule}
          modules={modules}
          setModules={setModules}
        />
      ))}
    </div>
  );
};

export default CourseBuilder;
