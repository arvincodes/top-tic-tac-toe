const Gameboard = (() => {
  let board = ['', '', '', '', '', '', '', '', '']

  const getBoard = () => board

  const updateCell = (index, playerSymbol) => {
    if (board[index] === '') {
      board[index] = playerSymbol
    } else {
      console.log('Cell is already occupied!')
    }
  }

  return { getBoard, updateCell }
})()

const Player = (name, symbol) => {
  return { name, symbol }
}

const Game = (() => {
  let currentPlayer = Player('Player 1', '1')
  let gameOver = false
  let player1Score = 0;
  let player2Score = 0;

  const switchPlayer = () => {
    currentPlayer = (currentPlayer.symbol === '1') ? Player('Player 2', '0') : Player('Player 1', '1')
  }

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    const board = Gameboard.getBoard()
    const winnerContainer = document.querySelector('.winner-container')

    for (let combination of winningCombinations) {
      const [a, b, c] = combination

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winnerContainer.textContent = `${currentPlayer.name} wins!`
        gameOver = true
        if (currentPlayer.symbol === '1') {
          player1Score++;
        } else {
          player2Score++;
        }

        updateScores()
        return
      }
    }

    if (!board.includes('')) {
      winnerContainer.textContent = `It's a draw!`
      gameOver = true
    }
  }

  const updateScores = () => {
    document.querySelector('.p1-score').textContent = `P1 Score: ${player1Score}`;
    document.querySelector('.p2-score').textContent = `P2 Score: ${player2Score}`;
  }

  const isGameOver = () => gameOver

  const getCurrentPlayer = () => currentPlayer

  const setGameOver = (state) => {
    gameOver = state;
  };

  const setCurrentPlayer = (player) => {
    currentPlayer = player;
  };

  return {
    switchPlayer,
    checkWinner,
    isGameOver,
    getCurrentPlayer,
    setGameOver,
    setCurrentPlayer,
    updateScores
  };
})()

const renderBoard = () => {
  const gameContainer = document.querySelector('.game-container')
  gameContainer.innerHTML = ''

  const gameStatus = document.querySelector('.game-status')
  const board = Gameboard.getBoard()
  const currentPlayer = Game.getCurrentPlayer()

  if (Game.isGameOver()) {
    gameStatus.textContent = 'Game over!';
  } else if (board.every(cell => cell === '')) {
    gameStatus.textContent = 'Game not yet started.';
  } else {
    const currentPlayer = Game.getCurrentPlayer(); // Get the current player
    gameStatus.textContent = `${currentPlayer.name}'s turn...`; // Dynamically update with the current player's name
  }

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('button')
    cell.classList.add('cell')
    cell.textContent = board[i]

    if (board[i] !== '') {
      cell.disabled = true; // Disable the cell if it is already occupied
    }

    cell.addEventListener('click', () => {
      if (!Game.isGameOver()) {
        Gameboard.updateCell(i, currentPlayer.symbol)   
        Game.checkWinner() 
        Game.switchPlayer() 
        renderBoard()
      }
    })

    gameContainer.appendChild(cell)
  }
}


const resetGame = () => {
  Gameboard.getBoard().fill('');

  Game.setGameOver(false);  // Properly call the setGameOver method
  Game.setCurrentPlayer(Player('Player 1', '1'))

  const winnerContainer = document.querySelector('.winner-container');
  winnerContainer.textContent = '';
  const gameStatus = document.querySelector('.game-status')
  gameStatus.textContent = 'Game not yet started.'
  
  renderBoard();
};

renderBoard()
const resetButton = document.querySelector('.stats-container button')
resetButton.addEventListener('click', resetGame)
