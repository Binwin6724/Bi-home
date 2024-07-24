import React, { useState } from "react";
import "../css/HeightConverter.css";

const HeightConverter = () => {
  const [height, setHeight] = useState("");
  const [inputUnit, setInputUnit] = useState("cm");
  const [outputUnit, setOutputUnit] = useState("feet");
  const [result, setResult] = useState("");

  const convertHeight = () => {
    if (isNaN(height) || height === "") {
      setResult("Please enter a valid number");
      return;
    }

    let heightInCm;

    switch (inputUnit) {
      case "feet":
        heightInCm = parseFloat(height) * 30.48;
        break;
      case "inches":
        heightInCm = parseFloat(height) * 2.54;
        break;
      case "cm":
        heightInCm = parseFloat(height);
        break;
      case "mm":
        heightInCm = parseFloat(height) / 10;
        break;
      default:
        heightInCm = parseFloat(height);
    }

    let convertedHeight;

    switch (outputUnit) {
      case "feet":
        convertedHeight = heightInCm / 30.48;
        break;
      case "inches":
        convertedHeight = heightInCm / 2.54;
        break;
      case "cm":
        convertedHeight = heightInCm;
        break;
      case "mm":
        convertedHeight = heightInCm * 10;
        break;
      default:
        convertedHeight = heightInCm;
    }

    setResult(`Height: ${convertedHeight.toFixed(2)} ${outputUnit}`);
  };

  return (
    <div className="container">
      <h2>Convert Height</h2>
      <label htmlFor="inputUnit">Input Unit:</label>
      <select
        id="inputUnit"
        value={inputUnit}
        onChange={(e) => setInputUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="inches">Inches</option>
        <option value="cm">Centimeters</option>
        <option value="mm">Millimeters</option>
      </select>

      <label htmlFor="height">Height ({inputUnit}):</label>
      <input
        type="number"
        id="height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder={`Enter height in ${inputUnit}`}
      />

      <label htmlFor="outputUnit">Output Unit:</label>
      <select
        id="outputUnit"
        value={outputUnit}
        onChange={(e) => setOutputUnit(e.target.value)}
      >
        <option value="feet">Feet</option>
        <option value="inches">Inches</option>
        <option value="cm">Centimeters</option>
        <option value="mm">Millimeters</option>
      </select>

      <button onClick={convertHeight}>Convert</button>

      <h3>{result}</h3>
    </div>
  );
};
export default HeightConverter;
