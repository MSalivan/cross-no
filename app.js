const btnPlay = document.getElementById('button-play');
const game = document.getElementById('field');
const symbolSelection = document.getElementById('symbol-selection');
const cross = document.getElementById('symbol-cross');
const nought = document.getElementById('symbol-nought');
const btnRestart = document.getElementById('button-restart');

let currentPlayer; 
let board = Array(9).fill(null); 
let isGameActive = false; 


function startGame(player) {
    currentPlayer = player;
    isGameActive = true;
    symbolSelection.style.display = 'none';
    game.style.display = 'table'; 
    btnRestart.style.display = 'flex';
    console.log(`Выбран ${currentPlayer}`);
}


btnPlay.addEventListener('click', function() {
    symbolSelection.style.display = 'flex';  
    btnPlay.style.display = 'none';  
});


cross.addEventListener('click', function() {
    startGame('X');
});


nought.addEventListener('click', function() {
    startGame('O');
});


function restartGame() {
    board = Array(9).fill(null); 
    isGameActive = false; 
    document.querySelectorAll('.field td').forEach(cell => {
        cell.innerHTML = ''; 
        cell.addEventListener('click', handleCellClick); 
    });
    game.style.display = 'none';  
    btnRestart.style.display = 'none';  
    btnPlay.style.display = 'block'; 
    console.log('Игра перезапущена');
}


btnRestart.addEventListener('click', function() {
    restartGame();
});


function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] || !isGameActive) {
        return;
    }

   
    board[index] = currentPlayer;


    const img = document.createElement('img');
    img.src = currentPlayer === 'X' ? 'close.png' : 'o.png';
    img.alt = currentPlayer;
    img.classList.add('symbol'); 
    cell.appendChild(img); 
 
    if (checkWin()) {
        alert(`${currentPlayer} выиграл!`);
        isGameActive = false;
        return;
    }


    if (board.every(cell => cell)) {
        alert("Ничья!");
        isGameActive = false;
        return;
    }


    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6] 
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}


document.querySelectorAll('.field td').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
