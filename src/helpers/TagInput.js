import React, { useState } from 'react';
import '../css/TagInput.css';  // Make sure to import the CSS styles

const TagInput = ({ tags, setTags }) => {
    const [input, setInput] = useState('');

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (['Enter', ','].includes(event.key)) {
            event.preventDefault();
            const value = input.trim();

            if (value && !tags.includes(value)) {
                setTags([...tags, value]);
                setInput('');
            }
        }

        if (event.key === 'Backspace' && !input) {
            removeTag(tags.length - 1);
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();
        const paste = event.clipboardData.getData('text');
        const skills = paste.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0 && !tags.includes(skill));

        setTags([...tags, ...skills]);
    };

    const removeTag = (index) => {
        setTags(tags.filter((tag, i) => i !== index));
    };

    return (
        <div className="tag-input-container">
            {tags.map((tag, index) => (
                <div key={index} className="tag">
                    {tag}
                    <span onClick={() => removeTag(index)}>×</span>
                </div>
            ))}
            <input
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder="Add skills"
            />
        </div>
    );
};

export default TagInput;
