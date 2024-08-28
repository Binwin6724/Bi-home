// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import SquareFeetConverter from "./components/SquareFeetConverter";
import HeightConverter from "./components/HeightConverter";
import Home from "./components/Home";
import ExpenseTracker from "./components/ExpenseTracker";
import ExperienceCalculator from "./components/ExperienceCalculator";
import ImageToPDF from "./components/ImageToPDF";
import AssetCustomizing from "./components/AssetCustomizing";
import EncryptDecrypt from "./components/EncryptDecrypt";
import TextSummarizer from "./components/TextSummarizer";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="tab-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/converter" element={<SquareFeetConverter />} />
          <Route path="/height-converter" element={<HeightConverter />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route
            path="/experience-calculator"
            element={<ExperienceCalculator />}
          />
          <Route path="/image-to-pdf" element={<ImageToPDF />} />
          <Route path="/asset-customizing" element={<AssetCustomizing />} />
          <Route path="/encrypt-decrypt" element={<EncryptDecrypt />} />
          <Route path="/text-summarizer" element={<TextSummarizer />} />
          <Route path="/todo-list" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
