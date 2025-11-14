import React, { useState } from 'react';
import AdminChequeForm from '../components/AdminChequeForm';
import ChequeVerification from '../components/ChequeVerification';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('verification'); // 'verification' or 'admin'

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Cheque Verification System - Admin Panel</h1>
      </header>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'verification' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('verification')}
        >
          Verify Cheque Status
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'admin' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('admin')}
        >
          Add New Cheque
        </button>
      </div>

      <main className={styles.main}>
        {activeTab === 'verification' ? (
          <ChequeVerification />
        ) : (
          <AdminChequeForm />
        )}
      </main>
    </div>
  );
};

export default AdminPage;