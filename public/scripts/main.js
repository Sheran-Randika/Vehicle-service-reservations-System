// public/scripts/main.js

// This function fetches the user's profile data after successful authentication
function fetchUserProfile() {
    fetch('/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the JWT token in localStorage
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((user) => {
        // Display user profile data on the page
        const profileContainer = document.getElementById('profile-container');
        profileContainer.innerHTML = `
          <h2>User Profile</h2>
          <p>Username: ${user.username}</p>
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>
          <p>Contact Number: ${user.contactNumber}</p>
          <p>Country: ${user.country}</p>
        `;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  // Execute the fetchUserProfile function when the page loads
  window.addEventListener('load', fetchUserProfile);
  