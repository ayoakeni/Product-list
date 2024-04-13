// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
  const editProfileBtn = document.getElementById('editProfileBtn');
  const editProfileForm = document.querySelector('.edit-profile');
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  const profileImage = document.getElementById('profileImage');
  const imageInput = document.getElementById('imageInput');
  const editProfileImage = document.getElementById('editProfileImage');
  const editProfileName = document.getElementById('editProfileName');
  const editProfileAddress = document.getElementById('editProfileAddress');
  const defaultProfile = document.getElementById('defaultProfile');
  const profileName = document.getElementById('profileName');
  const profileAddress = document.getElementById('profileAddress');

  // Add event listener to the edit profile button
  editProfileBtn.addEventListener('click', () => {
    // Update the image in the edit profile section
    editProfileImage.src = profileImage.src;
    editProfileForm.style.display = 'block';
    defaultProfile.style.display = 'none'; // Hide the defaultProfile container
  });

  // Retrieve the profile name from local storage
  const storedProfileName = localStorage.getItem('profileName');
  if (storedProfileName) {
    
    // Update the default profile with the stored name
    profileName.innerHTML = `<label for="profileName">Name : </label>${storedProfileName}`;
    editProfileName.value = storedProfileName;
  }
  
  // Retrieve the profile Address from local storage
  const storedProfileAddress = localStorage.getItem('profileAddress');
  if (storedProfileAddress) {
    // Update the address in the profile section
    profileAddress.innerHTML = `<label for="profileAddress">Address : </label>${storedProfileAddress}`;
    // Update the edit profile form with the stored address
    editProfileAddress.value = storedProfileAddress;
  }

  // Add event listener to the save button
  saveProfileBtn.addEventListener('click', () => {
    // Update the profile information
    profileImage.src = editProfileImage.src;
    const newName = editProfileName.value;
    const newAddress = editProfileAddress.value;
    profileName.innerHTML = `<label for="profileName">Name : </label>${newName}`;
    profileAddress.innerHTML = `<label for="profileAddress">Address : </label>${newAddress}`;

    // Save the new name and address to local storage
    localStorage.setItem('profileName', newName);
    localStorage.setItem('profileAddress', newAddress);

    // Hide the edit profile form
    editProfileForm.style.display = 'none';
    defaultProfile.style.display = 'block'; // Show the editProfileBtn container
  });

  // Add event listener to the file input for change event
  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        editProfileImage.src = reader.result;
      };
    }
  });
});
