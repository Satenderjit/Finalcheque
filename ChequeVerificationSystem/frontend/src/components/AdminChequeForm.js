import React, { useState } from 'react';
import axios from 'axios';
import styles from './AdminChequeForm.module.css';

const AdminChequeForm = () => {
  const [name, setName] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  const [status, setStatus] = useState('Available');
  const [adminPassword, setAdminPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (!name || !chequeNumber || !adminPassword) {
      setError('Name, Cheque Number, and Admin Password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cheques/admin/add', {
        name,
        chequeNumber,
        status
      }, {
        headers: {
          'X-Admin-Password': adminPassword
        }
      });

      if (response.data.success) {
        setMessage('Cheque added successfully!');
        setName('');
        setChequeNumber('');
        setAdminPassword('');
        setStatus('Available');
      } else {
        setError(response.data.message || 'Failed to add cheque');
      }
    } catch (err) {
      setError('Error adding cheque. Please try again.');
      console.error('Add cheque error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Admin: Add New Cheque</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name:</label>
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

        <div className={styles.inputGroup}>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={styles.select}
          >
            <option value="Available">Available</option>
            <option value="Used">Used</option>
            <option value="Not Found">Not Found</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="adminPassword">Admin Password:</label>
          <input
            type="password"
            id="adminPassword"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter admin password"
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${styles.button} ${styles.primaryButton}`}
        >
          {loading ? 'Adding...' : 'Add Cheque'}
        </button>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {message && (
          <div className={styles.successMessage}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminChequeForm;