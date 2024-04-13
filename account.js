document.addEventListener('DOMContentLoaded', () => {
  const editProfileBtn = document.getElementById('editProfileBtn');
  const editProfileForm = document.querySelector('.edit-profile');
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  const profileImage = document.getElementById('profileImage');
  const imageInput = document.getElementById('imageInput');
  const editProfileImage = document.getElementById('editProfileImage');
  const editProfileName = document.getElementById('editProfileName');
  const editProfileAddress = document.getElementById('editProfileAddress');

  // Add event listener to the edit profile button
  editProfileBtn.addEventListener('click', () => {
    // Update the image in the edit profile section
    editProfileImage.src = profileImage.src;
    editProfileForm.style.display = 'block';
    editProfileBtn.parentNode.style.display = 'none'; // Hide the editProfileBtn container
  });

  // Add event listener to the save button
  saveProfileBtn.addEventListener('click', () => {
    // Update the profile information
    profileImage.src = editProfileImage.src;
    profileName.innerHTML = `<label for="profileName">Name :</label>${editProfileName.value}`;
    profileAddress.innerHTML = `<label for="profileAddress">Address :</label>${editProfileAddress.value}`;

    // Hide the edit profile form
    editProfileForm.style.display = 'none';
    editProfileBtn.parentNode.style.display = 'block'; // Show the editProfileBtn container
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