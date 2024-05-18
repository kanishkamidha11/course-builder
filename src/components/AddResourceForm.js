import React, { useState } from 'react';
import './AddResourceForm.css';

const AddResourceForm = ({ addResource }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('link'); // Default to 'link'

  const handleSubmit = (e) => {
    e.preventDefault();
    let resourceUrl = url;
    if (type === 'image' || type === 'pdf') {
      if (file) {
        resourceUrl = URL.createObjectURL(file);
      } else {
        alert('Please select a file to upload');
        return;
      }
    }
    const newResource = {
      id: Date.now(),
      name,
      url: resourceUrl,
      type
    };
    addResource(newResource);
    setName('');
    setUrl('');
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="add-resource-form">
      <input
        type="text"
        placeholder="Resource Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {type === 'link' && (
        <input
          type="text"
          placeholder="Resource URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      )}
      {(type === 'image' || type === 'pdf') && (
        <input
          type="file"
          accept={type === 'image' ? 'image/*' : 'application/pdf'}
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      )}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="link">Link</option>
        <option value="image">Image</option>
        <option value="pdf">PDF</option>
      </select>
      <button type="submit">Add Resource</button>
    </form>
  );
};

export default AddResourceForm;
