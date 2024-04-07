// Toggle Darkmode
// Function to toggle dark mode
function toggleDarkMode() {
  const darkModeCheckbox = document.getElementById('darkModeCheckbox');
  // Update UI
  document.body.classList.toggle('dark-mode', darkModeCheckbox.checked);
  // Save state to localStorage
  localStorage.setItem('darkModeEnabled', darkModeCheckbox.checked);
}

// Check if dark mode was previously enabled
const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
// Set initial state
document.body.classList.toggle('dark-mode', darkModeEnabled);
document.getElementById('darkModeCheckbox').checked = darkModeEnabled;
