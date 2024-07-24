import React, { useState } from "react";
import "../css/SquareFeetConverter.css";

const SquareFeetConverter = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [unit, setUnit] = useState("cm");
  const [amountPerSqFt, setAmountPerSqFt] = useState("");
  const [results, setResults] = useState({});

  const convertToSquareFeet = () => {
    if (isNaN(length) || isNaN(width) || length === "" || width === "") {
      setResults({ error: "Please enter valid dimensions" });
      return;
    }

    let lengthMeters, widthMeters;

    if (unit === "cm") {
      lengthMeters = length / 100;
      widthMeters = width / 100;
    } else {
      lengthMeters = length * 0.0254;
      widthMeters = width * 0.0254;
    }

    const areaSquareMeters = lengthMeters * widthMeters;
    const areaSquareFeet = areaSquareMeters * 10.7639;

    let totalCost = 0;
    if (!isNaN(amountPerSqFt) && amountPerSqFt !== "") {
      totalCost = areaSquareFeet * parseFloat(amountPerSqFt);
    }

    setResults({
      areaSquareFeet: areaSquareFeet.toFixed(2),
      totalCost: totalCost.toFixed(2),
    });
  };

  return (
    <div className="container">
      <h2>Convert to Square Feet and Calculate Cost</h2>
      <label htmlFor="unit">Unit:</label>
      <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="cm">Centimeters</option>
        <option value="inches">Inches</option>
      </select>

      <label htmlFor="length">Length ({unit}):</label>
      <input
        type="number"
        id="length"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        placeholder={`Enter length in ${unit}`}
      />

      <label htmlFor="width">Width ({unit}):</label>
      <input
        type="number"
        id="width"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
        placeholder={`Enter width in ${unit}`}
      />

      <label htmlFor="amountPerSqFt">Amount per Square Foot:</label>
      <input
        type="number"
        id="amountPerSqFt"
        value={amountPerSqFt}
        onChange={(e) => setAmountPerSqFt(e.target.value)}
        placeholder="Enter amount per square foot"
      />

      <button onClick={convertToSquareFeet}>Convert</button>

      {results.error ? (
        <p>{results.error}</p>
      ) : (
        <div>
          <h3>Results:</h3>
          <p>Area: {results.areaSquareFeet} square feet</p>
          <p>Total Cost: ₹{results.totalCost}</p>
        </div>
      )}
    </div>
  );
};

export default SquareFeetConverter;
