// Node.js setup
import * as bingo from "./bingo.js";
const selectedNumbers = bingo.selectedNumbers;
let boards = [];
for (var i in bingo) {
  if (i.includes("board")) {
    boards.push(bingo[i]);
  }
}
// end Node.js setup

function rigBingo(firstOrLastToWin = "first") {
  let winningBoards = [];

  function markBoards(selectedNumber) {
    // filter out winners from the set of boards to mark
    boards = boards.filter((board, boardIdx) => {
      let isWinner = false;
      // mark the board
      board.map((square, i) => {
        if (square === selectedNumber) {
          board[i] = "x";
          // check for a winner; if so, flag it to be removed
          isWinner = checkForWinner(boards[boardIdx], selectedNumber);
        }
      });
      // only keep non-winners in the playable boards
      return !isWinner;
    });
  }

  function win(board, number) {
    winningBoards.push({ board: board, winningNumber: number });
  }

  function checkForWinner(board, number) {
    // check rows for winner
    for (let i = 0; i < board.length; i += 5) {
      // to avoid unnecessary memory leaks
      if (winningBoards.length && firstOrLastToWin === "first") break;
      const row = [
        board[i],
        board[i + 1],
        board[i + 2],
        board[i + 3],
        board[i + 4],
      ];
      if (row.every((cell) => cell === "x")) {
        win(board, number);
        return true;
      }
    }

    // check cols for winner
    for (let i = 0; i < 5; i++) {
      // to avoid unnecessary memory leaks
      if (winningBoards.length && firstOrLastToWin === "first") break;
      const col = [
        board[i],
        board[i + 5],
        board[i + 10],
        board[i + 15],
        board[i + 20],
      ];
      if (col.every((cell) => cell === "x")) {
        win(board, number);
        return true;
      }
    }
  }

  function calculateWinningScore() {
    // the "final" board will always be the last board in the array, because
    // if we are looking for the FIRST winning board, the game stops after the
    // first winning board is found (winningBoards.length === 1); but if we want
    // to find the LAST winning board, the game continues and pushes winners into
    // `winningBoards` until we run out of numbers (winningBoards.length === 100)
    const boardToCalculate = winningBoards[winningBoards.length - 1];

    const sumOfUnmarked = boardToCalculate.board.reduce((acc, cur) => {
      if (cur !== "x") {
        return (acc += cur);
      } else {
        return acc;
      }
    }, 0);
    return sumOfUnmarked * boardToCalculate.winningNumber;
  }

  // kicks off the game
  for (let i = 0; i < selectedNumbers.length; i++) {
    if (!winningBoards.length) {
      markBoards(selectedNumbers[i]);
    } else {
      if (firstOrLastToWin === "first") {
        break;
      } else {
        markBoards(selectedNumbers[i]);
      }
    }
  }

  return calculateWinningScore();
}

const scoreOfFirstBoardToWin = rigBingo("first");
console.log({ scoreOfFirstBoardToWin });

const scoreOfLastBoardToWin = rigBingo("last");
console.log({ scoreOfLastBoardToWin });
