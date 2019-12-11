document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
function createBoard(grid) {
  
  //create local variables
  var board = new Object()
  board.cells = []
  var arr = 0

  //loop through grid row and col
  for(i = 0; i < grid; i++){
    for(j = 0; j < grid; j++){

      //set likelihood of mine to 20%
      let mine = Math.random() >= 0.8;

      board.cells[arr] = {row: i, col: j, isMine: mine, isMarked: false, hidden: true}
      arr++
    }
  }
  return board
}

//Create instance of board object
let board = createBoard(5)

function startGame () {
  
  for(var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(i)
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard() 

  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  for(i = 0; i < board.cells.length; i++) {
    if(board.cells[i].isMine == true && board.cells[i].isMarked == false) {
      return
    }
    if(board.cells[i].isMine == false  && board.cells[i].hidden) {
      return
    } 
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  
  var surrounding = lib.getSurroundingCells(board.cells[cell].row, board.cells[cell].col)
  var count = 0
  
  for(var i = 0; i < surrounding.length; i++) {
    if(surrounding[i].isMine) {
      count++;
    }
  }
}

