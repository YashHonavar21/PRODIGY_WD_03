let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let isSinglePlayer = false;

const statusText = document.getElementById('statusText');
const gameBoard = document.getElementById('gameBoard');
const endScreen = document.getElementById('endScreen');
const endMessage = document.getElementById('endMessage');

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function setMode(mode) {
  isSinglePlayer = mode === 'single';
  document.querySelector('.mode-selector').classList.add('hidden');
  document.querySelector('.game-container').classList.remove('hidden');
  gameActive = true;
}

function handleClick(index) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  document.querySelectorAll('.cell')[index].textContent = currentPlayer;

  if (checkWin()) {
    endGame(`${currentPlayer} wins!`);
    return;
  } else if (!board.includes('')) {
    endGame("It's a Draw!");
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  if (isSinglePlayer && currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let emptyIndices = board.map((v, i) => v === '' ? i : null).filter(i => i !== null);
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  handleClick(randomIndex);
}

function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function endGame(message) {
  gameActive = false;
  document.querySelector('.game-container').classList.add('hidden');
  endScreen.classList.remove('hidden');
  endMessage.textContent = message;
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
  document.querySelector('.game-container').classList.remove('hidden');
  endScreen.classList.add('hidden');
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

document.querySelectorAll('.cell').forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});
