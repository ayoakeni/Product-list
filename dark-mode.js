// Function to toggle dark mode and update styles
function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Initialize dark mode state and apply styles
document.addEventListener('DOMContentLoaded', function() {
  const darkModeState = localStorage.getItem('darkMode');
  const isDarkMode = darkModeState === 'enabled';

  // Apply dark mode to the body
  document.body.classList.toggle('dark-mode', isDarkMode);

  // Set the initial state of the toggle container
  const toggleContainer = document.getElementById('darkMode');
  toggleContainer.classList.toggle('active', isDarkMode);

  // Add click event listener to the toggle container
  toggleContainer.addEventListener('click', () => {
    // Toggle dark mode
    toggleDarkMode();

    // Update the 'active' class on the toggle container
    toggleContainer.classList.toggle('active');
  });
});