window.addEventListener('DOMContentLoaded', () => {
    const leaderboard = document.getElementById('leaderboard');
    const addUserForm = document.getElementById('add-user-form');
    const nameInput = document.getElementById('name-input');
    const itemsInput = document.getElementById('items-input');
    const addPointsBtn = document.getElementById('add-points-btn');
    const itemSelect = document.getElementById('selectItem');
  
  
  
  
     //-------------CLEAR ALL DATA---------------
      /*const clearLeaderboardData = () => {
        localStorage.removeItem('leaderboardData');
        leaderboardData = []; // Clear the leaderboard data in memory
        updateLeaderboard(); // Update the leaderboard display
      };
   
   
      clearLeaderboardData();*/
  
  
  
  
  
  
  
  
  
  
    // Get the leaderboard data from localStorage or use a default value
    let leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];
  
  
  
  
    // Function to update the leaderboard
    const updateLeaderboard = () => {
      // Sort the leaderboard data based on score in descending order
      leaderboardData.sort((a, b) => b.score - a.score);
  
  
      // Get the first row (header row) of the leaderboard table
      const headerRow = leaderboard.querySelector('tr:first-child');
  
  
      // Clear all rows except the header row
      while (leaderboard.rows.length > 1) {
        leaderboard.deleteRow(1);
      }
  
  
      // Rebuild the leaderboard starting from the second row
      leaderboardData.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${index + 1}</td><td>${entry.name}</td><td>${entry.score}</td><td>${entry.water}</td><td>${entry.cotton}</td>`;
        leaderboard.appendChild(row);
      });
  
  
      // Reinsert the header row
      leaderboard.insertBefore(headerRow, leaderboard.firstChild);
  
  
      // Save the updated leaderboard data to localStorage
      localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
    };
  
  
    // Function to add a new user
    const addUser = (event) => {
      event.preventDefault();
      const name = nameInput.value.trim();
      const selectedItem = itemSelect.value;
      const score = itemsInput.value.trim() * selectedItem;
      let water, cotton;
  
  
      if (name !== '') {
        let existingUser = false;
  
  
        for (const key in leaderboardData) {
          if (leaderboardData.hasOwnProperty(key) && leaderboardData[key].name === name) {
            leaderboardData[key].score += score;
  
  
            if (selectedItem == 20) {
              water = itemsInput.value.trim() * 590;
              cotton = itemsInput.value.trim() * 0.55;
            } else if (selectedItem == 30) {
              water = itemsInput.value.trim() * 800;
              cotton = itemsInput.value.trim() * 0.78;
            } else if (selectedItem == 40) {
              water = itemsInput.value.trim() * 884;
              cotton = itemsInput.value.trim() * 0.94;
            } else if (selectedItem == 60) {
              water = itemsInput.value.trim() * 2600;
              cotton = itemsInput.value.trim() * 1.5;
            } else if (selectedItem == 10) {
              water = itemsInput.value.trim() * 880;
              cotton = itemsInput.value.trim() * 0.38;
            }
  
  
            leaderboardData[key].water += water;
            leaderboardData[key].cotton += cotton;
            existingUser = true;
            break;
          }
        }
  
  
        if (!existingUser) {
          if (selectedItem == 20) {
            water = itemsInput.value.trim() * 590;
            cotton = itemsInput.value.trim() * 0.55;
          } else if (selectedItem == 30) {
            water = itemsInput.value.trim() * 800;
            cotton = itemsInput.value.trim() * 0.78;
          } else if (selectedItem == 40) {
            water = itemsInput.value.trim() * 884;
            cotton = itemsInput.value.trim() * 0.94;
          } else if (selectedItem == 60) {
            water = itemsInput.value.trim() * 2600;
            cotton = itemsInput.value.trim() * 1.5;
          } else if (selectedItem == 10) {
            water = itemsInput.value.trim() * 880;
            cotton = itemsInput.value.trim() * 0.38;
          }
  
  
          leaderboardData.push({ name: name, score: score, water: water, cotton: cotton });
        }
  
  
        nameInput.value = '';
        itemsInput.value = '';
        updateLeaderboard();
      }
    };
  
  
    // Add event listener to the "Add User" form
    addUserForm.addEventListener('submit', addUser);
  
  
    // Initial population of the leaderboard
    updateLeaderboard();
  });
    