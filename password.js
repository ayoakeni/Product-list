// Get the form element
const passwordForm = document.querySelector('.password form');

// Add event listener to the form submit button
passwordForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the new password and confirm password fields
  const newPassword = document.querySelector('.password input[type="password"]').value;
  const confirmPassword = document.querySelector('.password input[type="password"]:last-of-type').value;

    // Popup message for Sucessfull Change
    const message = document.getElementById('sucessfull');
    const passMessage = document.getElementById('pass-message');
    const closeMessage = document.querySelector(".close-message-up");

    passMessage.textContent = 'Password changed successfully!';

    function uploadMessage(){
      message.classList.add("openPopup");
    }

    closeMessage.addEventListener("click", () => {
      message.classList.remove("openPopup");
    });
   
  const passwordError = document.getElementById('password-error');
  // Check if the passwords match
  if (newPassword === confirmPassword) {
    // Passwords match, save the new password
    localStorage.setItem('password', newPassword);
    uploadMessage()
    passwordError.style.display="none";
  } else {
    // Passwords don't match, show an error message
    passwordError.style.display="block";
    passwordError.textContent = 'Passwords do not match. Please try again.';
  }

  // Reset the form
  passwordForm.reset();
});
