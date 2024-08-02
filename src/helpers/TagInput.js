// src/components/TagInput.js
import React, { useState } from 'react';
import '../css/TagInput.css';

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input) {
      if (!tags.includes(input)) {
        setTags([...tags, input]);
      }
      setInput('');
    } else if (e.key === 'Backspace' && !input) {
      removeTag(tags.length - 1);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="tag-input-container">
      {tags.map((tag, index) => (
        <div className="tag" key={index}>
          {tag}
          <span onClick={() => removeTag(index)}>x</span>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Press enter to add skills"
      />
    </div>
  );
};

export default TagInput;
