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
        console.log(`${currentPlayer.name} wins!`)
        winnerContainer.textContent = `${currentPlayer.name} wins!`
        gameOver = true
      }
    }

    if (!board.includes('')) {
      console.log('It\'s a tie!')
      gameOver = true
    }
  }

  const isGameOver = () => gameOver

  const getCurrentPlayer = () => currentPlayer

  return { switchPlayer, checkWinner, isGameOver, getCurrentPlayer }
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
    gameStatus.textContent = 'Game ongoing...';
  }

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('button')
    cell.classList.add('cell')
    cell.textContent = board[i]

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

  const winnerContainer = document.querySelector('.winner-container');
  winnerContainer.textContent = '';
  const gameStatus = document.querySelector('.game-status')
  gameStatus.textContent = 'Game not yet started.'
  
  renderBoard();
};

renderBoard()
const resetButton = document.querySelector('.stats-container button')
resetButton.addEventListener('click', resetGame)
