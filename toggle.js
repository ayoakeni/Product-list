// Popup message for alerts
const printpop = document.getElementById('printPop');
const closeMessage = document.querySelectorAll(".close-message-up");

function uploadMessage(){
  printpop.classList.add("openPopup");
}
closeMessage.forEach(closeMessage =>{
  closeMessage.addEventListener("click", () => {
    printpop.classList.remove("openPopup");
  });
});

// Toggle for printing
const printCheckbox = document.getElementById('printCheckbox');

function togglePrinting() {
  const isActive = printCheckbox.classList.toggle('active');

  // Save the printing state to localStorage
  localStorage.setItem('printingEnabled', isActive ? 'true' : 'false');

  // Display whither printing is enabled or not
  const printSubject = document.getElementById('print-subject');
  
  if (!isActive){
    printSubject.textContent = 'Printing disabled.';
    uploadMessage()
  }
  else{
    printSubject.textContent = 'Printing enabled.';
    uploadMessage()
  }
}
printCheckbox.addEventListener('click', togglePrinting);
// Load the printing state from localStorage and update the toggle button
const printingEnabled = localStorage.getItem('printingEnabled') === 'true';
printCheckbox.classList.toggle('active', printingEnabled);


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
