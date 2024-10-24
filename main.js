//creating the game
const rs = require('readline-sync');


// Define board structure:
function createBoard(size){
   const board = [];
   for (let i =0; i< size; i++){
      const row = [];
      for (let j =0; j< size; j++){
         row.push('-');
      }
      board.push(row);
   }
   return board;
}
// Place ship on the board at random
//Helper function to random integer
function getRandomInt(min, max){
   return Math.floor(Math.random() * (max - min +1)) +min;
}
//checking is shipt can be place at location
function canPlaceShip(board,startX, startY, shipLength, direction){
   const size = board.length;

   if (direction === 'horizontal'){
      if (startX + shipLength > size) return false;
      for (let i =0; i < shipLength; i++){
         if (board[startY][startX +i] !== '-') return false;
      }
   } else if (direction === 'vertical'){
      if (startY + shipLength > size) return false;
      for (let i =0; i < shipLength; i++){
         if (board[startY +i][startX] !== '-') return false;
      }
   }
   return true;
}
// placing ship on the board
function placeShip(board, shipLength, shipType){
   const directions = ['horizontal', 'vertical'];
   let placed = false;

   while (!placed) {
      const startX = getRandomInt(0, board.length -1);
      const startY = getRandomInt(0, board.length -1);
      const direction = directions[getRandomInt(0, 1)];

      if (canPlaceShip(board,startX, startY, shipLength, direction)) {
         if (direction === 'horizontal'){
            for (let i =0; i < shipLength; i++){
               board[startY][startX +i] = shipType;
            }
         } else if (direction === 'vertical'){
            for (let i =0; i < shipLength; i++){
               board[startY +i][startX] = shipType;
            }
         }
         placed = true;
      }
   }
}
//Rendering the board
//placing ship on the board 
function renderBoard(board){
   const displayBoard = board.map((row, index) => {
      const rowObject = {};
      row.forEach((cell, cellIndex) => {
         if(cell === '-' || cell ==='small' || cell === 'large'){
            rowObject[cellIndex +1] = '-';
         }else if(cell === 'miss'){
            rowObject[cellIndex +1] = '❗';
         }else if(cell === 'orange'){
            rowObject[cellIndex +1] = '🟠';
         }else if(cell === 'blue'){
            rowObject[cellIndex +1] = '🔵';
         }
      });
      return { [String.fromCharCode(65 + index)]: rowObject };
   });
   const formattedBoard = displayBoard.reduce((acc, curr) => {
      return {...acc, ...curr};
   }, {});
   console.table(formattedBoard);
}
//handling user guesses
function makeGuess(board, x, y, remainingShips) {
   if (board[y][x] === '-'){
      console.log('Miss! Try again...');
      board[y][x] = 'miss';
   } else if(board[y][x] === 'small'){
      console.log(' You Hit a small ship!');
      board[y][x] = 'orange';
      remainingShips--;
   } else if(board[y][x] === 'large'){
      console.log('You Hit a large ship!');
      board[y][x] = 'blue';
      remainingShips--;
   } else {
      console.log('You already guessed that position!');
   }
   return remainingShips;
}

function initGame(){
   //greeting
   console.log('Welcome to Battleship 🚢');
   //Asking what size board to play: 4, 5, or 6
   items = ['4x4', '5x5', '6x6'];
   let boardSizeIndex = rs.keyInSelect(items,'choose a Board Size');

   if (boardSizeIndex === -1) {
      console.log('Game Ended');
      return null;
   }
   const boardSize = boardSizeIndex +4;

   const board = createBoard(boardSize);

   let remainingShips = 0;

   if(boardSize === 4) {
      placeShip(board, 3, 'large');
      placeShip(board, 2, 'small');
      remainingShips = 5;
   } else if(boardSize === 5){
      placeShip(board, 3, 'large');
      placeShip(board, 2, 'small');
      placeShip(board, 2, 'small');
      remainingShips = 7;
   } else if(boardSize === 6){
      placeShip(board, 3, 'large');
      placeShip(board, 3, 'large');
      placeShip(board, 2, 'small');
      placeShip(board, 2, 'small');
      remainingShips = 10;
   }

   renderBoard(board);
   return {board, remainingShips};
}
//Game flow
function playGame(){
   const game = initGame();

   if(!game) return;
   let { board, remainingShips} = game;

   while (remainingShips >0){
      const guess = rs.question('Enter your guess (eg.: A1, B2,...or type "Quit" to exit.):').toUpperCase();
      if (guess === 'Quit'){
         console.log('Game Over: You quit the game')
         return;
      }
      const y = guess.charCodeAt(0) -65;
      const x = parseInt(guess[1], 10);

      if (isNaN(x) || y < 0 || y >= board.length || x < 0 || x >= board.length) {
         console.log('Invalid input. Please try again.');
         continue;
      }

      remainingShips = makeGuess(board, x, y, remainingShips);
      renderBoard(board);

      if (remainingShips === 0){
         console.log('Congratulation!!! You hav sunk all the ships.');
      }
   }
}
//end game
playGame();
//🟠
//🔵
//❗