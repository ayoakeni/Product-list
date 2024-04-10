// Toggle for printing
const printCheckbox = document.getElementById('printCheckbox');

function togglePrinting() {
  const isActive = printCheckbox.classList.toggle('active');
  // Save the printing state to localStorage
  localStorage.setItem('printingEnabled', isActive ? 'true' : 'false');
}
printCheckbox.addEventListener('click', togglePrinting);
// Load the printing state from localStorage and update the toggle button
const printingEnabled = localStorage.getItem('printingEnabled') === 'true';
document.getElementById('printCheckbox').classList.toggle('active', printingEnabled);


// Toggle for cloudStorage
const cloudStorageCheckbox = document.getElementById('cloudStorageCheckbox');
cloudStorageCheckbox.addEventListener('click', function() {
  cloudStorageCheckbox.classList.toggle('active');
});


// Toggle for updateCheckbox
const updateCheckbox = document.getElementById('updateCheckbox');
updateCheckbox.addEventListener('click', function() {
  updateCheckbox.classList.toggle('active');
});