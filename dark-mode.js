// Toggle Darkmode
// Define the toggleDarkMode function
function toggleDarkMode() {
  const darkModeCheckbox = document.getElementById('darkModeCheckbox');
  // Update UI
  document.body.classList.toggle('dark-mode', darkModeCheckbox.checked);
  // Save state to localStorage
  localStorage.setItem('darkModeEnabled', darkModeCheckbox.checked);
}

// Add event listener to the checkbox
document.addEventListener('DOMContentLoaded', () => {
  const darkModeCheckbox = document.getElementById('darkModeCheckbox');
  // Check if dark mode was previously enabled
  const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
  // Set initial state
  document.body.classList.toggle('dark-mode', darkModeEnabled);
  // Set checkbox state
  // darkModeCheckbox.checked = darkModeEnabled;
  darkModeCheckbox.classList.toggle('active');

  // Attach the event listener to the checkbox
  darkModeCheckbox.addEventListener('change', toggleDarkMode);
});


