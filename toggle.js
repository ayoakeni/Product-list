// Popup message for alerts
const pop = document.querySelector('.pop-message');
const closeUploadMessage = document.getElementById("close-message");

function uploadMessage(){
  pop.classList.add("openPopup");
}
closeUploadMessage.addEventListener("click", () => {
  pop.classList.remove("openPopup");
});

// Toggle for printing
const printCheckbox = document.getElementById('printCheckbox');

function togglePrinting() {
  const isActive = printCheckbox.classList.toggle('active');
  // Save the printing state to localStorage
  localStorage.setItem('printingEnabled', isActive ? 'true' : 'false');
  if (!isActive){
    const printSubject = document.getElementById('print-subject');
    printSubject.textContent = 'Printing disabled.';
    uploadMessage()
  }
  else{
    uploadMessage()
  }
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


// Reset button
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function() {
  // Reset printing toggle
  printCheckbox.classList.remove('active');
  localStorage.setItem('printingEnabled', 'false');
  
  // Reset cloud storage toggle
  cloudStorageCheckbox.classList.remove('active');
  
  // Reset update toggle
  updateCheckbox.classList.remove('active');
});
