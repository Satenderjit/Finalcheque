import React, { useState } from 'react';
import axios from 'axios';
import styles from './ChequeVerification.module.css';

const ChequeVerification = () => {
  const [name, setName] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !chequeNumber) {
      setError('Please enter both name and cheque number');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:5000/api/cheques/verify', {
        name,
        chequeNumber
      });

      setStatus(response.data);
    } catch (err) {
      setError('Error verifying cheque. Please try again.');
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setChequeNumber('');
    setStatus(null);
    setError(null);
  };

  return (
    <div className={styles.container}>
      <h2>Verify Cheque Status</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name on Cheque:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the name on the cheque"
            className={styles.input}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="chequeNumber">Cheque Number:</label>
          <input
            type="text"
            id="chequeNumber"
            value={chequeNumber}
            onChange={(e) => setChequeNumber(e.target.value)}
            placeholder="Enter the cheque number"
            className={styles.input}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className={`${styles.button} ${styles.primaryButton}`}
        >
          {loading ? 'Verifying...' : 'Verify Cheque'}
        </button>
        
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
      </form>

      {status && !loading && (
        <div className={styles.resultContainer}>
          <h3>Verification Result</h3>
          
          <div className={`${styles.statusCard} ${styles[status.status.toLowerCase()]}`}>
            <h4>Cheque Status: <span className={styles.statusText}>{status.status}</span></h4>
            <p><strong>Name:</strong> {status.cheque?.name || name}</p>
            <p><strong>Cheque Number:</strong> {status.cheque?.chequeNumber || chequeNumber}</p>
            <p><strong>Message:</strong> {status.message}</p>
          </div>
          
          <button 
            onClick={resetForm}
            className={`${styles.button} ${styles.secondaryButton}`}
          >
            Check Another Cheque
          </button>
        </div>
      )}
      
      <div className={styles.infoSection}>
        <h3>How to Use</h3>
        <ul>
          <li>Enter the name as it appears on the cheque</li>
          <li>Enter the cheque number exactly as it appears</li>
          <li>Status will be displayed as either "Available", "Used", or "Not Found"</li>
        </ul>
      </div>
    </div>
  );
};

export default ChequeVerification;