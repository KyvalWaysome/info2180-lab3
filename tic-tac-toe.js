// Function to check if there is a winner
function checkWin(grid) {
    const size = 3; // The game board is 3x3
    let winner = null;
  
    // Check rows for a win
    for (let row = 0; row < size; row++) {
      if (grid[row][0] && grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2]) {
        winner = grid[row][0]; // Set the winner as "X" or "O"
      }
    }
  
    // Check columns for a win
    for (let col = 0; col < size; col++) {
      if (grid[0][col] && grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col]) {
        winner = grid[0][col]; // Set the winner
      }
    }
  
    // Check main diagonal (top-left to bottom-right)
    if (grid[0][0] && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      winner = grid[0][0];
    }
  
    // Check anti-diagonal (top-right to bottom-left)
    if (grid[0][2] && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      winner = grid[0][2];
    }
  
    // If there's a winner, update the status message
    if (winner) {
      const status = document.getElementById("status");
      status.textContent = `Congratulations! ${winner} is the Winner!`;
      status.classList.add("you-won");
    }
  }
  
  // Function to initialize the board and add event listeners
  function setupBoard() {
    const squares = document.querySelectorAll("#board > div");
    let row = 0;
    let col = 0;
  
    // Style each square and set data attributes for row and column
    squares.forEach((square) => {
      square.classList.add("square");
      square.setAttribute("data-row", row);
      square.setAttribute("data-col", col);
  
      // Move to the next column, and wrap to the next row if needed
      col++;
      if (col === 3) {
        col = 0;
        row++;
      }
  
      // Add hover effect
      square.addEventListener("mouseover", () => square.classList.add("hover"));
      square.addEventListener("mouseleave", () => square.classList.remove("hover"));
    });
  }
  
  // Main function that runs when the page loads
  window.onload = () => {
    setupBoard(); // Set up the board
  
    const grid = [
      ["", "", ""], // Row 1
      ["", "", ""], // Row 2
      ["", "", ""], // Row 3
    ];
  
    let currentPlayer = "X"; // Start with player "X"
  
    // Add click event to each square
    const squares = document.querySelectorAll("#board > div");
    squares.forEach((square) => {
      square.addEventListener("click", () => {
        if (square.textContent === "") {
          // Set the square to the current player's symbol
          square.textContent = currentPlayer;
          square.classList.add(currentPlayer);
  
          // Update the grid with the player's move
          const row = square.getAttribute("data-row");
          const col = square.getAttribute("data-col");
          grid[row][col] = currentPlayer;
  
          // Check for a winner
          checkWin(grid);
  
          // Switch to the next player
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      });
    });
  
    // Reset button functionality
    const resetButton = document.querySelector(".btn");
    resetButton.addEventListener("click", () => {
      // Clear the grid
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          grid[row][col] = "";
        }
      }
  
      // Clear the squares
      squares.forEach((square) => {
        square.textContent = "";
        square.classList.remove("X", "O");
      });
  
      // Reset the status message
      const status = document.getElementById("status");
      status.textContent = "Move your mouse over a square and click to play an X or an O.";
      status.classList.remove("you-won");
  
      // Reset the current player to "X"
      currentPlayer = "X";
    });
  };
  