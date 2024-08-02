// src/components/ExperienceCalculator.js
import React, { useState } from 'react';

const ExperienceCalculator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [experience, setExperience] = useState(null);

  const calculateExperience = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const difference = end - start;

      if (difference < 0) {
        setExperience('End date should be after start date.');
        return;
      }

      const totalDays = difference / (1000 * 3600 * 24);
      const totalMonths = Math.floor(totalDays / 30);
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const days = Math.floor(totalDays % 30);

      setExperience({
        years,
        months,
        days,
        totalMonths,
        totalDays
      });
    } else {
      setExperience('Please provide valid dates.');
    }
  };

  return (
    <div>
      <h2>Experience Calculator</h2>
      <div>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={calculateExperience}>Calculate Experience</button>
      {experience && typeof experience === 'object' && (
        <div>
          <strong>Experience:</strong> {experience.years} years, {experience.months} months, {experience.days} days
          <br />
          <strong>Total Months:</strong> {experience.totalMonths}
          <br />
          <strong>Total Days:</strong> {Math.round(experience.totalDays)}
        </div>
      )}
      {experience && typeof experience === 'string' && <div>{experience}</div>}
    </div>
  );
};

export default ExperienceCalculator;
