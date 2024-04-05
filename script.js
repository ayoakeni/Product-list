const searchInput = document.querySelector('input[type="search"]');
const contentBox = document.querySelector('.content-box');
const notFound = document.querySelector('.not-found');

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

      let closeButton = item.querySelector('.close');
      closeButton.addEventListener('click', () => {
        item.remove();
        updateTotalPrice();
        updateCartQuantity();
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

  html2canvas(itemBox, {
    onrendered: function(canvas) {
      let imgData = canvas.toDataURL('image/png');
      let a = document.createElement('a');
      a.href = imgData;
      a.download = 'receipt.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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