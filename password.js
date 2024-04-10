// Get the form element
const passwordForm = document.querySelector('.password form');

// Add event listener to the form submit button
passwordForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the new password and confirm password fields
  const newPassword = document.querySelector('.password input[type="password"]').value;
  const confirmPassword = document.querySelector('.password input[type="password"]:last-of-type').value;

  // Check if the passwords match
  if (newPassword === confirmPassword) {
    // Passwords match, save the new password
    localStorage.setItem('password', newPassword);
    alert('Password changed successfully!');
  } else {
    // Passwords don't match, show an error message
    alert('Passwords do not match. Please try again.');
  }

  // Reset the form
  passwordForm.reset();
});
