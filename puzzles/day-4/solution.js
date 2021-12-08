// Node.js setup
import * as bingo from "./bingo.js";
const selectedNumbers = bingo.selectedNumbers;
const boards = [];
for (var i in bingo) {
  if (i.includes("board")) {
    boards.push(bingo[i]);
  }
}
// end Node.js setup

function rigBingo() {
  let winningBoard = null;
  let winningNumber = null;
  let winningScore = null;

  function markBoards(selectedNumber) {
    boards.forEach((board, boardIdx) => {
      return board.map((square, i) => {
        if (square === selectedNumber) {
          board[i] = "x";
          checkForWinner(boards[boardIdx], selectedNumber);
        }
      });
    });
  }

  function win(board, number) {
    winningBoard = board;
    winningNumber = number;
    winningScore = calculateWinningScore(winningBoard);
  }

  function checkForWinner(board, number) {
    // check rows for winner
    for (let i = 0; i < board.length; i += 5) {
      if (winningBoard) break;
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
      if (winningBoard) break;
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

  function calculateWinningScore(board) {
    const sumOfUnmarked = board.reduce((acc, cur) => {
      if (cur !== "x") {
        return (acc += cur);
      } else {
        return acc;
      }
    }, 0);
    return sumOfUnmarked * winningNumber;
  }

  // kicks off the game
  for (let i = 0; i < selectedNumbers.length; i++) {
    if (!winningBoard) {
      markBoards(selectedNumbers[i]);
    } else {
      break;
    }
  }

  return winningScore;
}

const scoreOfFirstBoardToWin = rigBingo();
console.log({ scoreOfFirstBoardToWin });
