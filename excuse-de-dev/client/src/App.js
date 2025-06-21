import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LostPage from './components/LostPage';
import ErrorPage from './components/ErrorPage';
import HttpCodePage from './components/HttpCodePage';

 // Composant principal de l'application, gère le routage et la structure de base
 // return l'application React avec le système de routage configuré


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lost" element={<LostPage />} />
          <Route path="/:httpCode" element={<HttpCodePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;