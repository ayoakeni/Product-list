document.addEventListener('DOMContentLoaded', function() {
  const splashScreen = document.getElementById('splash-screen');
  const loginContainer = document.querySelector('.login-container');
  const contentBody = document.getElementById('content-body');

  // Hide the splash screen and display the login container
  splashScreen.style.display = 'none';
  loginContainer.style.display = 'flex';

  // Retrieve the stored password from localStorage
  const storedPassword = localStorage.getItem('password');

  // Submit the login form
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;

    // Check if the entered password matches the stored password
    if (password === storedPassword) {
      loginContainer.style.display = 'none'; // Hide the login container
      contentBody.style.display = 'block'; // Display the content body
    } else {
      alert('Incorrect password. Please try again.');
    }
  });
});
