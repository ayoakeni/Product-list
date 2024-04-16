document.addEventListener('DOMContentLoaded', function() {
  const splashScreen = document.getElementById('splash-screen');
  const loginContainer = document.querySelector('.login-container');
  const contentBody = document.getElementById('content-body');

  // Hide the splash screen and display the login container
  splashScreen.style.display = 'none';
  loginContainer.style.display = 'flex';

  // Retrieve the stored password from localStorage
  const storedPassword = localStorage.getItem('password') || '12345'; // Default password

  // Submit the login form
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;

    // Check if the entered password matches the stored password
    if (password === storedPassword) {
      loginContainer.style.display = 'none'; // Hide the login container
      contentBody.style.display = 'block'; // Display the content body
    } else {
      const loginError = document.getElementById('login-error');
      loginError.style.display="block";
      loginError.textContent = 'Incorrect password. Please try again.';
    }
  });

  // Handle the "Forgot Password?" link click
  document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
    event.preventDefault();
    // Implement your logic to handle the password reset process, such as showing a modal or redirecting to a password reset page
    alert('Forgot Password functionality not implemented.');
  });
});
