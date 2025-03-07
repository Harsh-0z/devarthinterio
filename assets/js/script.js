'use strict';

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

// Function to open the navbar
const openNavbar = function () {
  navbar.classList.add("active"); // Add active class to show the navbar
  overlay.classList.add("active"); // Show the overlay
  navbar.style.transform = "translateX(300px)"; // Move menu into view
};

// Function to close the navbar
const closeNavbar = function () {
  navbar.classList.remove("active"); // Remove active class to hide the navbar
  overlay.classList.remove("active"); // Hide the overlay
  navbar.style.transform = "translateX(0)"; // Reset menu position
};

// Toggle navbar on menu button click
addEventOnElem(navTogglers, "click", function () {
  if (navbar.classList.contains("active")) {
    closeNavbar();
  } else {
    openNavbar();
  }
});

// Close navbar when clicking outside or on the overlay
overlay.addEventListener("click", closeNavbar);

// Ensure the navbar is closed initially
window.addEventListener("DOMContentLoaded", closeNavbar);

//scroll
document.getElementById("scrollDown").addEventListener("click", function() {
  document.getElementById("scrollDownTarget").scrollIntoView({
      behavior: "smooth"
  });
});

//search
const products = [
  { name: "Trophies", link: "trophies.html" },
  { name: "Keychains", link: "keychains.html" },
  { name: "Pens", link: "pens.html" },
  { name: "Diaries", link: "diary.html" },
  { name: "Photo Frames", link: "photoframe.html" },
  { name: "Mugs", link: "mugs.html" },
  { name: "Name Plates", link: "nameplates.html" },
  { name: "House Name Plates", link: "housenameplates.html" },
  { name: "Mementos", link: "memento.html" },
  { name: "Bottles", link: "bottle.html" },
  { name: "UV DTF Stickers", link: "uv.html" },
  { name: "Neon Lights", link: "neon.html" }
];

// Function to update suggestions based on input
function updateSuggestions(input) {
  const suggestionBox = document.getElementById('suggestionsList');
  suggestionBox.innerHTML = '';  // Clear previous suggestions

  const inputVal = input.value.toLowerCase();

  if (inputVal) {
      // Filter suggestions based on input
      const filteredProducts = products.filter(product =>
          product.name.toLowerCase().includes(inputVal)
      );

      // Show suggestions
      filteredProducts.forEach(product => {
          const li = document.createElement('li');
          li.textContent = product.name;
          li.style.cursor = 'pointer';
          li.addEventListener('click', function() {
              window.open(product.link, '_blank');  // Open the link in a new tab
          });
          suggestionBox.appendChild(li);
      });
  }
}

// Attach the event listener to search bar input
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', function() {
  updateSuggestions(this);
});

//popup fn
document.addEventListener("DOMContentLoaded", function () {
  const quickViewButtons = document.querySelectorAll('[aria-label="quick view"]');
  const popup = document.getElementById("quick-view-popup");
  const closeBtn = document.getElementById("close-popup");
  const popupDetails = document.getElementById("popup-details");

  quickViewButtons.forEach(button => {
    button.addEventListener("click", function (event) {

      const productCard = event.currentTarget.closest('.product-card');
      const productDetails = productCard.querySelector('.card-content').innerHTML;
      const productImage = productCard.querySelector('.img-cover').outerHTML;


      popupDetails.innerHTML = productImage + productDetails;
      popup.classList.remove("hidden");
    });
  });

  closeBtn.addEventListener("click", function () {
    popup.classList.add("hidden");
  });

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.classList.add("hidden");
    }
  });
});


const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedBtn = filterBtn[0];

const filter = function () {
  lastClickedBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (filterItems[i].dataset.filter === this.dataset.filterBtn) {
      filterItems[i].style.display = "block";
    } else {
      filterItems[i].style.display = "none";
    }
  }
}

addEventOnElem(filterBtn, "click", filter);