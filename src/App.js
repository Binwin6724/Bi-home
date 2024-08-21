import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import SquareFeetConverter from "./components/SquareFeetConverter";
import HeightConverter from "./components/HeightConverter";
import Home from "./components/Home";
import ExpenseTracker from "./components/ExpenseTracker";
import ExperienceCalculator from "./components/ExperienceCalculator";
import ImageToPDF from "./components/ImageToPDF";
import AssetCustomizing from "./components/AssetCustomizing";
import "./App.css";
import EncryptDecrypt from "./components/EncryptDecrypt";
import TextSummarizer from "./components/TextSummarizer";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="tab-navigation">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-tab" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/converter"
            className={({ isActive }) => (isActive ? "active-tab" : "")}
          >
            Square Feet
          </NavLink>
          <NavLink
            to="/height-converter"
            className={({ isActive }) => (isActive ? "active-tab" : "")}
          >
            Height Converter
          </NavLink>
          <NavLink
            to="/expense-tracker"
            className={({ isActive }) => (isActive ? "active-tab" : "")}
          >
            Expense Tracker
          </NavLink>
          <NavLink
            to="/experience-calculator"
            className={({ isActive }) => (isActive ? "active-tab" : "")}
          >
            Experience Calculator
          </NavLink>
          <NavLink
            to="/image-to-pdf"
            className={({ isActive }) => (isActive ? "active-tab" : "")}
          >
            Image to PDF
          </NavLink>
          <NavLink
            to="/asset-customizing"
            className={({ isActive }) => (isActive ? "active-tab" : "")}
          >
            Asset Customizing
          </NavLink>
          <NavLink
            to="/encrypt-decrypt"
            className={({ isActive }) => (isActive ? "active-tab" : "")}
          >
            Encrypt & Decrypt
          </NavLink>
          <NavLink
            to="/text-summarizer"
            className={({ isActive }) => (isActive ? "active-tab" : "")}
          >
            Text Summarizer
          </NavLink>
        </nav>
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
