import React, { useState } from "react";

const JSONValidator = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [prettyJson, setPrettyJson] = useState("");
  const [error, setError] = useState("");
  const [indentation, setIndentation] = useState(2);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setJsonInput(fileContent);
    };
    reader.readAsText(file);
  };

  const handleIndentationChange = (e) => {
    setIndentation(parseInt(e.target.value, 10));
  };

  const validateAndPrettifyJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setPrettyJson(JSON.stringify(parsedJson, null, indentation));
      setError("");
    } catch (err) {
      setError("Invalid JSON");
      setPrettyJson("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>JSON Validator and Prettifier</h2>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Enter JSON data here..."
        rows="10"
        cols="50"
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <br />

      <label className="custom-file-upload">
        Choose Files
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          style={{ marginBottom: "10px", margin: "20px" }}
        />
      </label>
      <br />
      <label style={{ marginRight: "10px" }}>Select Indentation:</label>
      <select
        value={indentation}
        onChange={handleIndentationChange}
        style={{ marginBottom: "10px" }}
      >
        <option value={2}>2 Spaces</option>
        <option value={4}>4 Spaces</option>
        <option value={6}>6 Spaces</option>
        <option value={8}>8 Spaces</option>
      </select>
      <br />
      <button onClick={validateAndPrettifyJson} style={{ marginTop: "10px" }}>
        Validate and Prettify
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {prettyJson && (
        <pre
          style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            marginTop: "10px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {prettyJson}
        </pre>
      )}
    </div>
  );
};

export default JSONValidator;
