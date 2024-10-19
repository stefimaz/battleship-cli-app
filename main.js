//creating the game
const rs = require('readline-sync');
/* Define board structure:
initialize_board(size):
    create empty 2D array of size
    for each cell in the board:
        set cell to "empty"
    return board
    */

// building a grid
function buildGrid(size){
   const grid = [];
   const rowLabels = Array.from({length: size}, (_,i) => String.fromCharCode('A'.charCodeAt(0) +i));
   const columnLabels = Array.from({length: size}, (_,i) => (i +1).toString().padStart(4));
   console.log(' '+ columnLabels.join(''));
   console.log('|--+'+'-'.repeat(size *4));

   for (let i =0; i <size; i++){
      grid.push(Array.from({lenght: size}, ()=> ' '));
      console.log(' '+ rowLabels[i]+ ' | '+ grid[i].join(' | '));
      if (i < size -1) {
         console.log('|--+-' + '-'.repeat(size *4));
      }
   }
}
//greeting
//Asking what size board to play: 4, 5, or 6
//printing the board
function printBoard(board, debug = false) {
   let displayBoard = board.map(row => 
     row.map(cell => 
       cell.hit 
         ? (cell.type === "large" ? "🔵" : cell.type === "small" ? "🟠" : "❗")
         : debug && cell.type !== "empty" ? (cell.type === "large" ? "🔵" : "🟠")
         : "-"
     )
   );
   console.table(displayBoard);
 }
//placing ship on the board 
//handling user guesses
//Game flow
//end game
buildGrid(6);