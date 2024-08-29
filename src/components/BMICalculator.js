import React, { useState } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const calculateBMI = () => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      if (bmiValue < 18.5) {
        setMessage('You are underweight.');
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setMessage('You have a normal weight.');
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setMessage('You are overweight.');
      } else {
        setMessage('You are obese.');
      }
    } else {
      setMessage('Please enter valid height and weight.');
      setBmi(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>BMI Calculator</h2>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={handleHeightChange}
          placeholder="Enter height in cm"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={handleWeightChange}
          placeholder="Enter weight in kg"
        />
      </div>
      <button onClick={calculateBMI} style={{ marginTop: '10px' }}>
        Calculate BMI
      </button>
      {bmi && (
        <div style={{ marginTop: '20px' }}>
          <h3>Your BMI: {bmi}</h3>
          <p>{message}</p>
        </div>
      )}
      {!bmi && message && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
