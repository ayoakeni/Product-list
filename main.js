import { addProductToFirestore, uploadImageToStorage } from './firebase.js';

// Splash Screen & Onboarding
let currentScreen = 0;

document.addEventListener("DOMContentLoaded", function() {
  const splashShown = sessionStorage.getItem("splashShown");

  if (!splashShown) {
    // Show the splash screen
    document.getElementById("splash-screen").style.display = "flex";
    setTimeout(function() {
      document.getElementById("splash-screen").style.display = "none";
      sessionStorage.setItem("splashShown", "true");
    }, 3000); // Display splash screen for 3 seconds
  } else {
    document.getElementById("splash-screen").style.display = "none";
    document.getElementById("content-body").style.display = "block";
  }

  const screens = document.querySelectorAll(".onboarding-screen");
  if (!localStorage.getItem("onboardingCompleted")) {
    screens[0].style.display = "block";
  } else {
    document.getElementById("onboarding").style.display = "none";
    document.getElementById("content-body").style.display = "block";
  }

  const backButton = document.querySelector(".set-title a");
  if (backButton) {
    backButton.addEventListener("click", goBack);
  }
});

const nextScreen = document.querySelectorAll('.nextScreen');
nextScreen.forEach( nextScreen =>{
  nextScreen.addEventListener('click', () => {
    const screens = document.querySelectorAll(".onboarding-screen");
  if (currentScreen < screens.length - 1) {
    screens[currentScreen].style.display = "none";
    currentScreen++;
    screens[currentScreen].style.display = "block";
  } else {
    localStorage.setItem("onboardingCompleted", "true");
    startAp();
  }
  });
});

const startApp = document.getElementById('startApp');
startApp.addEventListener('click', () => {
  startAp()
});

function startAp() {
  // Set the flag indicating that onboarding is completed
  localStorage.setItem("onboardingCompleted", "true");
  document.getElementById("onboarding").style.display = "none";
  document.getElementById("content-body").style.display = "block";
}

function goBack() {
  const currentUrl = window.location.href;
  const mainPageUrl = "index.html"; // Replace this with the URL of your main page
  const isMainPage = currentUrl.endsWith(mainPageUrl);

  if (isMainPage) {
    const splashScreen = document.getElementById("splash-screen");
    if (splashScreen) {
      splashScreen.style.display = "none";
    }
  }

  history.back();
}

// Upadating the Navbar store name from Account profile
document.addEventListener('DOMContentLoaded', () => {
  const storedProfileName = localStorage.getItem('profileName');
  if (storedProfileName) {
    document.getElementById('store-name').textContent = storedProfileName;
  }
});


// Popup message for alerts
const uploadpop = document.getElementById('uploadPop');
const printpop = document.getElementById('printPop');
const closeMessage = document.querySelectorAll(".close-message-up");

function uploadMessage(){
  uploadpop.classList.add("openPopup");
  printpop.classList.add("openPopup");
}
closeMessage.forEach(closeMessage =>{
  closeMessage.addEventListener("click", () => {
    uploadpop.classList.remove("openPopup");
    printpop.classList.remove("openPopup");
  });
});

// Search input
const searchInput = document.getElementById('search');
const contentBox = document.querySelector('.content-box');
const notFound = document.querySelector('.not-found');
const emptyCart = document.querySelector('.empty-cart'); // Select the empty cart element

searchInput.addEventListener('input', () => {
  let searchTerm = searchInput.value.toLowerCase();
  let items = contentBox.querySelectorAll('.content');
  let found = false;

  items.forEach(item => {
    let itemName = item.querySelector('.details span:first-child').innerText.toLowerCase();
    if (itemName.includes(searchTerm)) {
      item.style.display = 'flex';
      found = true;
    } else {
      item.style.display = 'none';
    }
  });

  if (!found) {
    notFound.style.display = 'flex';
  } else {
    notFound.style.display = 'none';
  }
});

// Barcode scanning
const barcode = document.getElementById('barcode');
const resultElement = document.getElementById('result');

barcode.addEventListener('input', () => {
  let cleanedValue = barcode.value.replace(/\D/g, ''); // Remove non-numeric characters
  barcode.value = cleanedValue; // Update the input value
  
  if (barcode.value.length === 13) {
    submitBarcode();
    resultElement.style.display = 'flex';
    contentBox.style.display = "none";
  } else {
    resultElement.style.display = 'none';
    contentBox.style.display = "flex";
  }
});

function submitBarcode() {
  const apiKey = 'YOUR_API_KEY'; // Replace with your API key
  fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode.value}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data && data.items && data.items.length > 0) {
        const product = data.items[0];
        resultElement.innerText = `
        <div class="content">
          <img src="${productImage}" alt="img">
          <div class="details">
            <span>${product.title}\n</span>
            Brand: ${product.brand}\n
            <span>Price: $${product.description}</span>
            <button class="add-to-cart-btn">Add to cart</button>
          </div>
        </div>
       `;
      } else {
        resultElement.innerText = 'Product not found';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultElement.innerText = "Error: " + error.message;
    });
}

const addToCartButtons = document.querySelectorAll('.content-box button');
const itemsNo = document.getElementById('items-no');
const totalPriceElement = document.querySelector('.total span');

let totalPrice = 0;
let totalQuantity = 0;

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    let content = button.closest('.content');
    let itemName = content.querySelector('.details span:first-child').innerText;
    let itemPrice = parseFloat(content.querySelector('.details span:nth-child(2)').innerText.split('$')[1]);

    let item = document.querySelector(`.item-lists .items[data-name="${itemName}"]`);
    if (item) {
      let quantityElement = item.querySelector('.p-q span:nth-child(2)');
      let quantity = parseInt(quantityElement.innerText.split(': ')[1]);
      quantityElement.innerText = `Quantity: ${quantity + 1}`;
    } else {
      item = document.createElement('div');
      item.classList.add('items');
      item.setAttribute('data-name', itemName);
      item.innerHTML = `
        <img src="${content.querySelector('img').src}" alt="${itemName}">
        <div class="item-txt">
          <span class="product">${itemName}</span>
          <div class="p-q">
            <span>Price: $${itemPrice.toFixed(2)}</span>
            <span>Quantity: 1</span>
          </div>
          <span class="close"><i class="fa-regular fa-circle-xmark"></i></span>
        </div>
      `;
      emptyCart.style.display = 'none'; // Hide the empty cart message when adding items to the cart
      let closeButton = item.querySelector('.close');
      closeButton.addEventListener('click', () => {
        item.remove();
        updateTotalPrice();
        updateCartQuantity();
        checkCartEmpty(); // Check if the cart is empty after removing an item
      });

      let itemList = document.querySelector('.item-lists');
      itemList.appendChild(item);
    }

    totalPrice += itemPrice;
    totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;

    totalQuantity++;
    itemsNo.innerText = totalQuantity;
  });
});

function updateTotalPrice() {
  let items = document.querySelectorAll('.items');
  totalPrice = 0;
  items.forEach(item => {
    let price = parseFloat(item.querySelector('.p-q span:first-child').innerText.split('$')[1]);
    let quantity = parseInt(item.querySelector('.p-q span:nth-child(2)').innerText.split(': ')[1]);
    totalPrice += price * quantity;
  });
  totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
}

function updateCartQuantity() {
  totalQuantity = document.querySelectorAll('.items').length;
  itemsNo.innerText = totalQuantity;
}

function checkCartEmpty() {
  if (document.querySelectorAll('.items').length === 0) {
    emptyCart.style.display = 'flex'; // Display the empty cart message if the cart is empty
  }
}

// Upload
// Open upload popup
const uploadItems = document.getElementById('upload-items');
  uploadItems.addEventListener('click', () =>{
  document.getElementById("upload-popup").style.display = "flex";
  resetUploadPopup(); // Reset the upload popup content when opening
})

// Close upload popup
function closeupload(){
  document.getElementById("upload-popup").style.display = "none";
  resetUploadPopup(); // Reset the upload popup content when closing
}
document.querySelector('.close-btn').addEventListener('click', closeupload);

// Reset upload popup content
function resetUploadPopup() {
  const uploadContent = document.querySelector('.popup-content');
  const imagePreview = uploadContent.querySelector('img');
  if (imagePreview) {
    imagePreview.remove(); // Remove the image preview if it exists
  }

  const removeButton = uploadContent.querySelector('.remove-image-button');
  if (removeButton) {
    removeButton.remove(); // Remove the remove image button if it exists
  }

  const imageInput = document.getElementById('imageInput');
  const productNameInput = document.getElementById('productName');
  const productPriceInput = document.getElementById('productPrice');

  // Clear the product name and price inputs
  productNameInput.value = '';
  productPriceInput.value = '';

  // Reset the file input
  imageInput.value = '';

  // Reset the label text
  fileInputLabel.innerText = 'Choose Image';

  // Hide the image error
  imageError.style.display = 'none';
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  
  // Check if a file was actually selected
  if (file) {
    let reader = new FileReader();

    reader.onload = function(e) {
      const imagePreview = document.createElement('img');
      imagePreview.classList.add('image-preview');
      imagePreview.src = e.target.result;
      imagePreview.alt = 'img';
      imagePreview.width = 180;
      imagePreview.height = 130;

      const removeButton = document.createElement('span');
      removeButton.classList.add('remove-image-button');
      removeButton.innerHTML = '<i class="fa-solid fa-square-xmark"></i>';
      removeButton.addEventListener('click', function() {
        imagePreview.remove();
        removeButton.remove();
        // Clear the file input
        document.getElementById('imageInput').value = '';
        updateLabelText(); // Update the label text after removing image
      });

      let previewContainer = document.querySelector('.image-preview-container');
      if (previewContainer) {
        // Clear existing preview container
        previewContainer.innerHTML = '';
      } else {
        // Create a new preview container if none exists
        const uploadPopup = document.querySelector('.upload-popup');
        const uploadContent = uploadPopup.querySelector('.popup-content');
        const uploadTitle = uploadPopup.querySelector('.upload-title');
        previewContainer = document.createElement('div');
        previewContainer.classList.add('image-preview-container');
        uploadContent.insertBefore(previewContainer, uploadTitle.nextSibling);
      }

      // Add image and remove button to the preview container
      previewContainer.appendChild(imagePreview);
      previewContainer.appendChild(removeButton);
    };

    reader.readAsDataURL(file);
  }
}

// Get the file input element
const imageInput = document.getElementById('imageInput');
// Get the label for the file input
const fileInputLabel = document.querySelector('.custom-file-input');

// Function to update the label text
function updateLabelText() {
  if (imageInput.files.length > 0) {
    fileInputLabel.innerText = `${imageInput.files[0].name}`;
  } else {
    fileInputLabel.innerText = 'Choose Image';
  }
}

// Event listener for file input change
imageInput.addEventListener('change', function() {
  // Hide the error message
  const imageError = document.getElementById('imageError');
  imageError.style.display = 'none';
  // Also update the image preview
  handleImageUpload(event);
  // Also update the label text
  updateLabelText();
});

function addToCart(productName, productPrice) {
  let item = document.querySelector(`.item-lists .items[data-name="${productName}"]`);
  if (item) {
    let quantityElement = item.querySelector('.p-q span:nth-child(2)');
    let quantity = parseInt(quantityElement.innerText.split(': ')[1]);
    quantityElement.innerText = `Quantity: ${quantity + 1}`;
  } else {
    item = document.createElement('div');
    item.classList.add('items');
    item.setAttribute('data-name', productName);
    item.innerHTML = `
      <img src="image/${productName.toLowerCase().replace(/\s/g, '-')}.jpg" alt="${productName}">
      <div class="item-txt">
        <span class="product">${productName}</span>
        <div class="p-q">
          <span>Price: $${productPrice.toFixed(2)}</span>
          <span>Quantity: 1</span>
        </div>
        <span class="close"><i class="fa-regular fa-circle-xmark"></i></span>
      </div>
    `;

    // Append the item to the end of the cart list
    let itemList = document.querySelector('.item-lists');
    itemList.appendChild(item);
    
    let closeButton = item.querySelector('.close');
    closeButton.addEventListener('click', () => {
      item.remove();
      updateTotalPrice();
      updateCartQuantity();
      checkCartEmpty();
    });
  }

  totalPrice += productPrice;
  totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;

  totalQuantity++;
  itemsNo.innerText = totalQuantity;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const productImageFile = document.getElementById('imageInput').files[0];

  // If an image is not selected, display an error message and return
  if (!productImageFile) {
    const imageError = document.getElementById('imageError');
    imageError.style.display = 'flex';
    return;
  }

  // Proceed with form submission
  const productImageElement = document.querySelector('.popup-content img');
  const productImage = productImageElement ? productImageElement.src : '';

  // Upload Product to Firebase Storage
  uploadImageToStorage(productImageFile)
  .then((imageUrl) => {
    // Add the new product to Firestore
    addProductToFirestore({ name: productName, price: parseFloat(productPrice.replace('$', '')), image: imageUrl });
    // Add the new product to the content box
    const contentBox = document.querySelector('.content-box');
    const newProduct = `
      <div class="content">
        <img src="${productImage}" alt="img">
        <div class="details">
          <span>${productName}</span>
          <span>Price: $${productPrice}.99</span>
          <button class="add-to-cart-btn">Add to cart</button>
        </div>
      </div>
    `;
    contentBox.insertAdjacentHTML('beforeend', newProduct);
    // Alert the user for successful upload
    uploadMessage();
  })
  .catch((error) => {
    console.error('Error uploading image:', error);
    // Handle error (e.g., display an error message to the user)
    alert("Failed to upload. Please try again.");
  });

  // Reset upload popup content
  resetUploadPopup();
}

document.getElementById('uploadForm').addEventListener('submit', handleFormSubmit);

// Add event listener to the content box for handling "Add to cart" button clicks
document.querySelector('.content-box').addEventListener('click', function(event) {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const productName = event.target.parentNode.querySelector('span').innerText;
    const productPrice = parseFloat(event.target.parentNode.querySelector('span:nth-child(2)').innerText.replace('Price: $', ''));
    addToCart(productName, productPrice);
  }
});

// For Printing
const printButton = document.getElementById('print');
printButton.addEventListener('click', () => {
  const printingEnabled = localStorage.getItem('printingEnabled') === 'true';
  if (printingEnabled) {
    let printContents = document.querySelector('.item-box').innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  } else {
    uploadMessage()
  }
});

// For Download
const downloadButton = document.getElementById('download');
downloadButton.addEventListener('click', () => {
  let itemBox = document.querySelector('.item-box');
  let itemLists = document.querySelector('.item-lists');
  let itemListContainer = document.createElement('div');
  itemListContainer.classList.add('item-list-container');

  // Add store name to the header
  let headerDetails = document.createElement('div');
  headerDetails.innerHTML = `
  <div class="store-name">CAMILI VENTURES AND LIMITED</div>
  <div>Address: 10 Allen junction, opposite Uba ikeja lagos.</div>
  <div>Date: ${new Date().toLocaleDateString()}</div>
  <div>Time: ${new Date().toLocaleTimeString()}</div>
  `;
  headerDetails.style.fontWeight = 'bold';
  headerDetails.style.fontSize = '30px';
  headerDetails.style.marginBottom = '10px';
  itemListContainer.appendChild(headerDetails);

  // Clone the item-lists content into the container
  itemListContainer.innerHTML += itemLists.innerHTML;

  // Add additional content
  let additionalContent = document.createElement('div');
  additionalContent.innerHTML = `
  <div>Note: Goods bought in good condition are not returnable.</div>
  <div>No Refund of Cash Payment</div>
  <div>ThANKS FOR YOUR PATRONAGE.....</div>
  <div> Camali Ventures: Your Prefered Mall To Shop</div>
  `;
  itemListContainer.appendChild(additionalContent);

  // Append the container to the body to capture its content
  document.body.appendChild(itemListContainer);

  html2canvas(itemListContainer, {
    onrendered: function(canvas) {
      let imgData = canvas.toDataURL('image/png');
      let a = document.createElement('a');
      a.href = imgData;
      a.download = 'receipt.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Remove the container from the body
      document.body.removeChild(itemListContainer);
    }
  });
});