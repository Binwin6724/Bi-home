// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import SquareFeetConverter from './components/SquareFeetConverter';
import HeightConverter from './components/HeightConverter';
import './App.css';
import FacebookWebhook from './components/FacebookWebhook';
import Home from './components/Home';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
  // Sample data (replace this with actual data fetched from the API)
  const sampleData = {
    "entry": [
      {
        "id": "102282461379107",
        "time": 1721814860,
        "changes": [
          {
            "value": {
              "from": {
                "id": "102282461379107",
                "name": "binwin_17"
              },
              "link": "https://scontent.fcok4-1.fna.fbcdn.net/v/t39.30808-6/452631054_497929926081210_7991007688611399091_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e5c1b6&_nc_ohc=SWz0L8hoCrQQ7kNvgGPMZIK&_nc_ht=scontent.fcok4-1.fna&oh=00_AYAOk37GpQC8_RjIyxNJEwnpAlVNPUPkV8alMAnLmZS7BA&oe=66A6A298",
              "message": "r6",
              "post_id": "102282461379107_497929952747874",
              "created_time": 1721814853,
              "item": "photo",
              "photo_id": "497929929414543",
              "published": 1,
              "verb": "add"
            },
            "field": "feed"
          }
        ]
      }
    ],
    "object": "page"
  };
  return (
    <Router>
      <div className="app-container">
        <nav className="tab-navigation">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Home</NavLink>
          <NavLink to="/converter" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Square Feet</NavLink>
          <NavLink to="/height-converter" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Height Converter</NavLink>
          <NavLink to="/facebook-webhook" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Facebook Webhook</NavLink>
          <NavLink to="/expense-tracker" className={({ isActive }) => (isActive ? 'active-tab' : '')}>Expense Tracker</NavLink>
        </nav>
        <div className="tab-content">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/converter" element={<SquareFeetConverter />} />
          <Route path="/height-converter" element={<HeightConverter />} />
          <Route path="/facebook-webhook" element={<FacebookWebhook entries={sampleData.entry} />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;
