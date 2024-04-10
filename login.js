// // Get the login form element
// const loginForm = document.getElementById('loginForm');

// // Add event listener to the form submit button
// loginForm.addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent the form from submitting

//   // Get the entered password
//   const enteredPassword = document.getElementById('password').value;

//   // Get the saved password from localStorage
//   const savedPassword = localStorage.getItem('password');

//   // Check if the entered password matches the saved password
//   if (enteredPassword === savedPassword) {
//     alert('Login successful!');
//     // Redirect to the account page
//     window.location.href = 'account.html';
//   } else {
//     alert('Incorrect password. Please try again.');
//     // Clear the password field
//     document.getElementById('password').value = '';
//   }
// });

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
