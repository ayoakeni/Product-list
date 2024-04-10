// Splash Screen & Onboarding
let currentScreen = 0;

function startApp() {
  // Set the flag indicating that onboarding is completed
  localStorage.setItem("onboardingCompleted", "true");
  document.getElementById("onboarding").style.display = "none";
  document.getElementById("content-body").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function() {
  const splashShown = sessionStorage.getItem("splashShown");

  if (!splashShown) {
    // Show the splash screen
    document.getElementById("splash-screen").style.display = "block";
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

function nextScreen() {
  const screens = document.querySelectorAll(".onboarding-screen");
  if (currentScreen < screens.length - 1) {
    screens[currentScreen].style.display = "none";
    currentScreen++;
    screens[currentScreen].style.display = "block";
  } else {
    localStorage.setItem("onboardingCompleted", "true");
    startApp();
  }
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


// Search input
const searchInput = document.querySelector('input[type="search"]');
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

// Print and Download
const printButton = document.getElementById('print');
const downloadButton = document.getElementById('download');

printButton.addEventListener('click', () => {
  let printContents = document.querySelector('.item-box').innerHTML;
  let originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
});

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



// const download = document.getElementById('download');

// download.addEventListener('click', ()=> {
//   let printContents = document.querySelector('.item-box').innerHTML;
//   let blob = new Blob([printContents], { type: 'text/html' });
//   let url = URL.createObjectURL(blob);
//   let a = document.createElement('a');
//   a.href = url;
//   a.download = 'receipt.html';
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// });

// // PDF donload
// download.addEventListener('click', ()=> {
//   let pdf = new jsPDF();
//   pdf.text("Receipt", 10, 10); // Title for the PDF
//   pdf.fromHTML(document.querySelector('.item-box'), 15, 15); // Convert HTML to PDF

//   // Download the PDF file
//   pdf.save('receipt.pdf');
// });
