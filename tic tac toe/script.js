const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins!`;
    isGameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = "X's turn";
}

resetGame();
