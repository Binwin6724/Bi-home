// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import SquareFeetConverter from './components/SquareFeetConverter';
import HeightConverter from './components/HeightConverter';
import './App.css';
import FacebookWebhook from './components/FacebookWebhook';
import Home from './components/Home';
import ExpenseTracker from './components/ExpenseTracker';
import ExperienceCalculator from './components/ExperienceCalculator';
import CVMaker from './components/CVMaker';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="tab-navigation">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Home</NavLink>
          <NavLink to="/converter" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Square Feet</NavLink>
          <NavLink to="/height-converter" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Height Converter</NavLink>
          <NavLink to="/expense-tracker" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Expense Tracker</NavLink>
          <NavLink to="/experience-calculator" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Experience Calculator</NavLink>
          <NavLink to="/cv-maker" className={({ isActive }) => (isActive ? 'active-tab' : '')}>CV Maker</NavLink>
        </nav>
        <div className="tab-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/converter" element={<SquareFeetConverter />} />
            <Route path="/height-converter" element={<HeightConverter />} />
            <Route path="/expense-tracker" element={<ExpenseTracker />} />
            <Route path="/experience-calculator" element={<ExperienceCalculator />} />
            <Route path="/cv-maker" element={<CVMaker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
