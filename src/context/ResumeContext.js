// src/context/ResumeContext.js
import React, { createContext, useState } from 'react';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [extractedData, setExtractedData] = useState({});

  return (
    <ResumeContext.Provider value={{ extractedData, setExtractedData }}>
      {children}
    </ResumeContext.Provider>
  );
};
