// Simple CRUD app using Fetch API with JWT Authentication
const baseUrl = 'https://codepoit-desafio-backend.onrender.com';
let jwtToken = '';

// Authenticate and get JWT Token
async function loginUser(credentials) {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const result = await response.json();
    jwtToken = result.token; // Assuming the token is returned as 'token'
    console.log('Logged in successfully:', result);
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

// Register a new user
async function registerUser(userData) {
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const result = await response.json();
    console.log('User Registered:', result);
  } catch (error) {
    console.error('Error registering user:', error);
  }
}

// Create ODS
async function createODS(data) {
  try {
    const response = await fetch(`${baseUrl}/ods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log('ODS Created:', result);
  } catch (error) {
    console.error('Error creating ODS:', error);
  }
}

// Read ODS
async function getODS() {
  try {
    const response = await fetch(`${baseUrl}/ods`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });
    const odsList = await response.json();
    console.log('ODS List:', odsList);
  } catch (error) {
    console.error('Error fetching ODS:', error);
  }
}

// Get ODS Points
async function getODSPoints() {
  try {
    const response = await fetch(`${baseUrl}/ods/pontos`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });
    const points = await response.json();
    console.log('ODS Points:', points);
  } catch (error) {
    console.error('Error fetching ODS points:', error);
  }
}

// Update ODS
async function updateODS(id, updatedData) {
  try {
    const response = await fetch(`${baseUrl}/ods/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
      body: JSON.stringify(updatedData)
    });
    const result = await response.json();
    console.log('ODS Updated:', result);
  } catch (error) {
    console.error('Error updating ODS:', error);
  }
}

// Delete ODS
async function deleteODS(id) {
  try {
    const response = await fetch(`${baseUrl}/ods/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });
    if (response.ok) {
      console.log(`ODS with ID ${id} deleted.`);
    } else {
      console.error('Failed to delete ODS.');
    }
  } catch (error) {
    console.error('Error deleting ODS:', error);
  }
}

// Example Usage
// First, register or login to get the JWT token
// registerUser({ username: 'newuser', password: 'password123' });
// loginUser({ username: 'newuser', password: 'password123' }).then(() => {
//   getODS(); // Fetch ODS after login
//   createODS({ name: 'New ODS', description: 'This is a new ODS.' }); // Create a new ODS
//   updateODS(1, { name: 'Updated ODS', description: 'Updated description.' }); // Update ODS with ID 1
//   deleteODS(1); // Delete ODS with ID 1
//   getODSPoints(); // Get ODS points
// });
