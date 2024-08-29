import React, { useState } from 'react';

const EncodingDecodingTool = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [encodingType, setEncodingType] = useState('base64');
  const [action, setAction] = useState('encode');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEncodingTypeChange = (e) => {
    setEncodingType(e.target.value);
  };

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleConvert = () => {
    try {
      let result = '';
      if (action === 'encode') {
        if (encodingType === 'base64') {
          result = btoa(inputText);
        } else if (encodingType === 'url') {
          result = encodeURIComponent(inputText);
        } else if (encodingType === 'hex') {
          result = inputText.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
        } else if (encodingType === 'rot13') {
          result = inputText.replace(/[a-zA-Z]/g, c =>
            String.fromCharCode(
              (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
            )
          );
        }
      } else if (action === 'decode') {
        if (encodingType === 'base64') {
          result = atob(inputText);
        } else if (encodingType === 'url') {
          result = decodeURIComponent(inputText);
        } else if (encodingType === 'hex') {
          result = inputText.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
        } else if (encodingType === 'rot13') {
          result = inputText.replace(/[a-zA-Z]/g, c =>
            String.fromCharCode(
              (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
            )
          );
        }
      }
      setOutputText(result);
    } catch (err) {
      setOutputText('Error: Invalid input for selected encoding/decoding option.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Encoding and Decoding Tool</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text here..."
        rows="5"
        cols="50"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <br />
      <label style={{ marginRight: '10px' }}>Select Encoding Type:</label>
      <select value={encodingType} onChange={handleEncodingTypeChange} style={{ marginBottom: '10px' }}>
        <option value="base64">Base64</option>
        <option value="url">URL Encoding</option>
        <option value="hex">Hexadecimal</option>
        <option value="rot13">ROT13</option>
        {/* Add more encoding options here if needed */}
      </select>
      <br />
      <label style={{ marginRight: '10px' }}>Select Action:</label>
      <select value={action} onChange={handleActionChange} style={{ marginBottom: '10px' }}>
        <option value="encode">Encode</option>
        <option value="decode">Decode</option>
      </select>
      <br />
      <button onClick={handleConvert} style={{ marginTop: '10px' }}>
        Convert
      </button>
      <textarea
        value={outputText}
        placeholder="Output will appear here..."
        rows="5"
        cols="50"
        readOnly
        style={{ width: '100%', marginTop: '10px', backgroundColor: '#f0f0f0' }}
      />
    </div>
  );
};

export default EncodingDecodingTool;
