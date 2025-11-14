import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import ChequeVerification from './components/ChequeVerification';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Cheque Verification System</h1>
          <p>Check the status of your cheques using our AI-powered system</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/verify" element={<ChequeVerification />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;