/*
start_game():
    initialize board (empty 2D array)
    randomly place ships on board
    while game is not over:
        print board (hide un-hit ships)
        get player input (coordinate)
        check if valid input
        if hit:
            mark hit on board
            display hit message
        else:
            mark miss on board
            display miss message
        check if all ships are sunk
    display victory message
*/
// Create a board of the selected size
const rs = require('readline-sync');

function createBoard(size) {
   const board = [];
   for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
         row.push('-'); // Initially, all positions are hidden
      }
      board.push(row);
   }
   return board;
}

// Helper function to get random integer between min and max
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Check if a ship can be placed at a given location
function canPlaceShip(board, startX, startY, shipLength, direction) {
   const size = board.length;

   if (direction === 'horizontal') {
      if (startX + shipLength > size) return false;
      for (let i = 0; i < shipLength; i++) {
         if (board[startY][startX + i] !== '-') return false;
      }
   } else if (direction === 'vertical') {
      if (startY + shipLength > size) return false;
      for (let i = 0; i < shipLength; i++) {
         if (board[startY + i][startX] !== '-') return false;
      }
   }
   return true;
}

// Place a ship on the board
function placeShip(board, shipLength, shipType) {
   const directions = ['horizontal', 'vertical'];
   let placed = false;

   while (!placed) {
      const startX = getRandomInt(0, board.length - 1);
      const startY = getRandomInt(0, board.length - 1);
      const direction = directions[getRandomInt(0, 1)];

      if (canPlaceShip(board, startX, startY, shipLength, direction)) {
         if (direction === 'horizontal') {
            for (let i = 0; i < shipLength; i++) {
               board[startY][startX + i] = shipType;
            }
         } else if (direction === 'vertical') {
            for (let i = 0; i < shipLength; i++) {
               board[startY + i][startX] = shipType;
            }
         }
         placed = true;
      }
   }
}

// Render the board, showing ships as "S" (for debugging)
function renderBoard(board) {
   const boardSize = board.length;
   let header = "  ";

   for (let i = 0; i < boardSize; i++) {
      header += i + " ";
   }
   console.log(header);
   console.log("  +" + "- ".repeat(boardSize));

   for (let y = 0; y < boardSize; y++) {
      let row = String.fromCharCode(65 + y) + "|"; // Using A, B, C... for rows
      for (let x = 0; x < boardSize; x++) {
         if (board[y][x] === '-') {
            row += "- ";
         } else if (board[y][x] === 'small') {
            row += "S "; // Small ship, visible as "S"
         } else if (board[y][x] === 'large') {
            row += "L "; // Large ship, visible as "L"
         }
      }
      console.log(row);
   }
}

// Function to handle guesses and reveal hits or misses
function makeGuess(board, x, y) {
   if (board[y][x] === '-') {
      console.log('Miss!');
      board[y][x] = 'miss'; // Mark the miss
   } else if (board[y][x] === 'small') {
      console.log('Hit a small ship!');
      board[y][x] = 'orange'; // Mark the hit as an orange circle
   } else if (board[y][x] === 'large') {
      console.log('Hit a large ship!');
      board[y][x] = 'blue'; // Mark the hit as a blue circle
   }
}

// Initialize game, asking the user for the board size
function initGame() {
   let boardSize = rs.prompt('Welcome to Battleship 🚢\nChoose a board size: 4, 5, or 6');
   boardSize = parseInt(boardSize);

   const board = createBoard(boardSize);

   // Based on the board size, determine how many ships to place
   if (boardSize === 4) {
      placeShip(board, 3, 'large'); // 1 large
      placeShip(board, 2, 'small'); // 1 small
   } else if (boardSize === 5) {
      placeShip(board, 3, 'large'); // 1 large
      placeShip(board, 2, 'small'); // 2 small
      placeShip(board, 2, 'small');
   } else if (boardSize === 6) {
      placeShip(board, 3, 'large'); // 2 large
      placeShip(board, 3, 'large');
      placeShip(board, 2, 'small'); // 2 small
      placeShip(board, 2, 'small');
   }

   renderBoard(board);
   return board;
}

// Sample game loop for making guesses (can be expanded later)
function playGame() {
   const board = initGame();
   makeGuess(board, 2, 3); // Example guess
   makeGuess(board, 0, 1); // Example guess
   renderBoard(board); // Show the board after guesses
}

playGame();
