// Test script for cheque verification API
const axios = require('axios');

async function testAPI() {
  console.log('Testing Cheque Verification API...\n');
  
  try {
    // Test 1: Valid available cheque
    console.log('Test 1: Checking available cheque');
    const response1 = await axios.post('http://localhost:5000/api/cheques/verify', {
      name: 'John Doe',
      chequeNumber: 'CK001'
    });
    console.log('Response:', response1.data);
    console.log('Status:', response1.data.status);
    console.log('Success:', response1.data.success);
    console.log('---\n');
    
    // Test 2: Used cheque
    console.log('Test 2: Checking used cheque');
    const response2 = await axios.post('http://localhost:5000/api/cheques/verify', {
      name: 'Jane Smith',
      chequeNumber: 'CK002'
    });
    console.log('Response:', response2.data);
    console.log('Status:', response2.data.status);
    console.log('Success:', response2.data.success);
    console.log('---\n');
    
    // Test 3: Cheque not found
    console.log('Test 3: Checking non-existent cheque');
    const response3 = await axios.post('http://localhost:5000/api/cheques/verify', {
      name: 'Non Existent',
      chequeNumber: 'CK999'
    });
    console.log('Response:', response3.data);
    console.log('Status:', response3.data.status);
    console.log('Success:', response3.data.success);
    console.log('---\n');
    
    // Test 4: Missing parameters
    console.log('Test 4: Missing parameters');
    try {
      const response4 = await axios.post('http://localhost:5000/api/cheques/verify', {
        name: 'John Doe'
        // Missing chequeNumber
      });
      console.log('Response:', response4.data);
    } catch (error) {
      console.log('Error as expected:', error.response.data.message);
    }
    console.log('---\n');
    
    console.log('All tests completed successfully!');
    
  } catch (error) {
    console.error('Error during testing:', error.message);
  }
}

// Run the test
testAPI();