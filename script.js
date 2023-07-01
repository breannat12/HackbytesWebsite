// Retrieve entries from local storage if available
var storedEntries = localStorage.getItem('entries');
entries = storedEntries ? JSON.parse(storedEntries) : [];

function saveEntriesToLocalStorage() {
  // Save entries to local storage
  localStorage.setItem('entries', JSON.stringify(entries));
}

function loadEntriesFromLocalStorage() {
  // Retrieve entries from local storage
  var storedEntries = localStorage.getItem('entries');
  entries = storedEntries ? JSON.parse(storedEntries) : [];
}

function addNewGridEntry(entry) {
  // Create a new grid entry element
  var newEntryElement = document.createElement('div');
  newEntryElement.className = 'grid-entry';
  newEntryElement.innerHTML = `
    <img src="${entry.image}" alt="${entry.title}">
    <h2>${entry.title}</h2>
    <p>Type: ${entry.type}</p>
    <p>Quantity: ${entry.quantity}</p>
    <p>Address: ${entry.address}</p>
  `;

  // Add click event to the new grid entry
  var entryIndex = entries.length - 1;
  newEntryElement.addEventListener('click', function() {
    viewEntry(entryIndex);
  });

  // Add new grid entry to the grid container
  var gridContainer = document.getElementById('grid-container');
  gridContainer.appendChild(newEntryElement);
}

document.getElementById('entry-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  var image = document.getElementById('image').value;
  var title = document.getElementById('title').value;
  var type = document.getElementById('type').value;
  var quantity = document.getElementById('quantity').value;
  var address = document.getElementById('address').value;

  // Create a new grid entry object
  var newEntry = {
    image: image,
    title: title,
    type: type,
    quantity: quantity,
    address: address
  };

  // Add new entry to the entries array
  entries.push(newEntry);

  // Save entries to local storage
  saveEntriesToLocalStorage();

  // Add new grid entry to the grid
  addNewGridEntry(newEntry);

  // Reset the form
  document.getElementById('entry-form').reset();
});

// Load entries from local storage on page load
loadEntriesFromLocalStorage();
entries.forEach(function(entry) {
  addNewGridEntry(entry);
});

    //TO RELOAD AND CLEAR

    // Clear entries from local storage when the user closes the website
    //window.addEventListener('beforeunload', function() {
    //localStorage.removeItem('entries');
    //});
