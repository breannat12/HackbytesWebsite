// Retrieve entries from local storage if available
var storedEntries = localStorage.getItem('entries');
var entries = storedEntries ? JSON.parse(storedEntries) : [];

// Load entries from local storage on page load
function loadEntriesFromLocalStorage() {
  var storedEntries = localStorage.getItem('entries');
  entries = storedEntries ? JSON.parse(storedEntries) : [];
}

function saveEntriesToLocalStorage() {
  localStorage.setItem('entries', JSON.stringify(entries));
}

// Add a new grid entry
function addNewGridEntry(entry) {
  var newEntryElement = document.createElement('div');
  newEntryElement.className = 'grid-entry';
  newEntryElement.innerHTML = `
    <img src="${entry.image}" alt="${entry.title}">
    <h2>${entry.title}</h2>
    <p>Type: ${entry.type}</p>
    <p>Quantity: ${entry.quantity}</p>
    <p>Address: ${entry.address}</p>
  `;

  var entryIndex = entries.length - 1;
  newEntryElement.addEventListener('click', function() {
    viewEntry(entryIndex);
  });

  var gridContainer = document.getElementById('grid-container');
  gridContainer.appendChild(newEntryElement);
}

document.getElementById('entry-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var image = document.getElementById('image').value;
  var title = document.getElementById('title').value;
  var type = document.getElementById('type').value;
  var quantity = document.getElementById('quantity').value;
  var address = document.getElementById('address').value;

  var newEntry = {
    image: image,
    title: title,
    type: type,
    quantity: quantity,
    address: address
  };

  entries.push(newEntry);
  saveEntriesToLocalStorage();
  addNewGridEntry(newEntry);
  document.getElementById('entry-form').reset();
});

// Filter entries based on the selected type
function filterEntries(type) {
  var filteredEntries = type === 'all' ? entries : entries.filter(function(entry) {
    return entry.type === type;
  });

  var gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = ''; // Clear existing grid entries

  filteredEntries.forEach(function(entry) {
    addNewGridEntry(entry);
  });
}

document.getElementById('filter-buttons').addEventListener('click', function(event) {
  if (event.target.matches('.filter-button')) {
    var type = event.target.dataset.type;
    filterEntries(type);
  }
});

// Load entries from local storage on page load
loadEntriesFromLocalStorage();
entries.forEach(function(entry) {
  addNewGridEntry(entry);
});

// Add event listeners to the filter buttons
var filterButtons = document.getElementsByClassName('filter-button');
for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener('click', function() {
    var type = this.dataset.type;
    filterEntries(type);
  });
} 