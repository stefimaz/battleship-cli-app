//creating the game
const rs = require('readline-sync');

// Define board structure:
function board(size){
   const board = [];
   for (let i =0; i< size; i++){
      const row = [];
      for (let j =0; j< size; j++){
         row.push("-");
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
         if (board[startY][startX +1] !== 'empty') return false;
      }
   } else if (diretion === 'vertical'){
      if (startY + shipLength > size) return false;
      for (let i =0; i < shipLength; i++){
         if (board[startY +1][startX] !== 'empty') return false;
      }
   }
   return true;
}
// placing ship on the board
function placeShip(board, shipLength, shipType){
   const direction = ['horizontal', 'vertical'];
   let placed = false;
   while (!placed) {
      const startX = getRandomInt(0, board.length -1);
      const startY = getRandomInt(0, board.length -1);
      const direction = direction[getRandomInt(0, 1)];

      if (canPlaceShip(board,startX, startY, shipLength, direction)) {
         if (direction === 'horizontal'){
            for (let i =0; i < shipLength; i++){
               board[startY][startX +1] = shipType;
            }
         } else if (direction === 'vertical'){
            for (let i =0; i < shipLength; i++){
               board[startY +1][startX] = shipType;
            }
         }
         placed = true;
      }
   }
}

//greeting
//Asking what size board to play: 4, 5, or 6
//printing the board

//placing ship on the board 
//handling user guesses
//Game flow
//end game
console.table(board(5));