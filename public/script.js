// Show FAQ
document.getElementById("faq").addEventListener("click", function() {
    const answerToFaq = document.getElementById("answerToFaq");
    answerToFaq.classList.toggle("hidden");
});

// Reset the board and clear game cells
function clearCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(element => {
        element.textContent = "";
        element.classList.remove("text-blue-300");
        element.classList.remove("text-pink-300");
    });
    currentPlayer = "X";
    updatePlayerDisplay();
    grid.addEventListener('click', handleCellClick);
}

// Reset game and add event listener for "clear" button
document.getElementById("clear").addEventListener("click", clearCells);

// Check if "clearBoard" exists and add event listener
if (document.getElementById("clearBoard")) {
    document.getElementById("clearBoard").addEventListener("click", clearCells);
}

// Change mode colors
const twoPlayers = document.getElementById("twoPlayers");
const easyGame = document.getElementById("easyGame");
const hardGame = document.getElementById("hardGame");

// Switch to 2-player mode
twoPlayers.addEventListener("click", function() {
    if (easyGame.classList.contains("text-white")) {
        easyGame.classList.remove("text-white");
        easyGame.classList.add("text-blue-300");
    }
    if (hardGame.classList.contains("text-white")) {
        hardGame.classList.remove("text-white");
        hardGame.classList.add("text-blue-300");
    }
    twoPlayers.classList.add("text-white");
    setTimeout(clearCells, 500);
    gameMode = '2P';
    resetGameMode();
});

// Switch to easy computer mode
easyGame.addEventListener("click", function() {
    if (twoPlayers.classList.contains("text-white")) {
        twoPlayers.classList.remove("text-white");
        twoPlayers.classList.add("text-blue-300");
    }
    if (hardGame.classList.contains("text-white")) {
        hardGame.classList.remove("text-white");
        hardGame.classList.add("text-blue-300");
    }
    easyGame.classList.add("text-white");
    setTimeout(clearCells, 500);
    gameMode = 'EASY';
    resetGameMode();
});

// Small screens

const twoP = document.getElementById("twoP");
const easyG = document.getElementById("easyG");
const hardG = document.getElementById("hardG");

// Switch to 2-player mode
twoP.addEventListener("click", function() {
    if (easyG.classList.contains("text-white")) {
        easyG.classList.remove("text-white");
        easyG.classList.add("text-blue-300");
    }
    if (hardG.classList.contains("text-white")) {
        hardG.classList.remove("text-white");
        hardG.classList.add("text-blue-300");
    }
    twoP.classList.add("text-white");
    setTimeout(clearCells, 500);
    gameMode = '2P';
    resetGameMode();
});

// Switch to easy computer mode
easyG.addEventListener("click", function() {
    if (twoP.classList.contains("text-white")) {
        twoP.classList.remove("text-white");
        twoP.classList.add("text-blue-300");
    }
    if (hardG.classList.contains("text-white")) {
        hardG.classList.remove("text-white");
        hardG.classList.add("text-blue-300");
    }
    easyG.classList.add("text-white");
    setTimeout(clearCells, 500);
    gameMode = 'EASY';
    resetGameMode();
});

// Switch to hard computer mode
hardG.addEventListener("click", function() {
    if (easyG.classList.contains("text-white")) {
        easyG.classList.remove("text-white");
        easyG.classList.add("text-blue-300");
    }
    if (twoP.classList.contains("text-white")) {
        twoP.classList.remove("text-white");
        twoP.classList.add("text-blue-300");
    }
    hardG.classList.add("text-white");
    setTimeout(clearCells, 500);
    gameMode = 'HARD';
    resetGameMode();
});


// Switch to hard computer mode
hardGame.addEventListener("click", function() {
    if (easyGame.classList.contains("text-white")) {
        easyGame.classList.remove("text-white");
        easyGame.classList.add("text-blue-300");
    }
    if (twoPlayers.classList.contains("text-white")) {
        twoPlayers.classList.remove("text-white");
        twoPlayers.classList.add("text-blue-300");
    }
    hardGame.classList.add("text-white");
    setTimeout(clearCells, 500);
    gameMode = 'HARD';
    resetGameMode();
});

// Show current player
const playerName = document.getElementById("player");
const players = {
    "X": "Player One (X)",
    "O": "Player Two (O)"
};
const grid = document.querySelector('#grd');
let currentPlayer = 'X';
let gameMode = '2P'; // Default to 2 Players

// Update player display
function updatePlayerDisplay() {
    playerName.textContent = players[currentPlayer];
    playerName.classList.toggle("text-pink-300", playerName.textContent === "Player One (X)");
    playerName.classList.toggle("text-blue-300", playerName.textContent === "Player Two (O)");
}

// Check for winner
function checkWinner(player) {
    const cells = document.querySelectorAll('.cell');
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => combination.every(index => cells[index].textContent === player));
}

// Check for draw
function checkDraw() {
    const cells = document.querySelectorAll('.cell');
    const allFilled = Array.from(cells).every(cell => cell.textContent !== '');
    if (allFilled && !checkWinner('X') && !checkWinner('O')) {
        playerName.textContent = "It's a draw🫱🏽‍🫲🏽";
        grid.removeEventListener('click', handleCellClick);
    }
}

// Handle cell click based on game mode
function handleCellClick(event) {
    const cell = event.target;

    if (currentPlayer === "X") {
        cell.classList.add("text-pink-300");
    }else{
        cell.classList.add("text-blue-300")
    }

    if (cell.classList.contains('cell') && cell.textContent === '') {
        cell.textContent = currentPlayer;
        if (checkWinner(currentPlayer)) {
            playerName.textContent = `${players[currentPlayer]} wins! 🎉`;
            grid.removeEventListener('click', handleCellClick);
        } else {
            checkDraw();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updatePlayerDisplay();
            if (gameMode !== '2P' && currentPlayer === 'O') {
                setTimeout(() => {
                    if (gameMode === 'EASY') {
                        easyComputerMove();
                    } else if (gameMode === 'HARD') {
                        hardComputerMove();
                    }
                }, 500);
            }
        }
    }
    checkDraw();
}

// Easy computer move
function easyComputerMove() {
    const cells = document.querySelectorAll(".cell");
    const emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = 'O';
        if (checkWinner('O')) {
            playerName.textContent = `${players['O']} wins! 🎉`;
            grid.removeEventListener('click', handleCellClick);
        } else {
            checkDraw();
            currentPlayer = 'X';
            updatePlayerDisplay();
        }
    }
}

// Hard computer move using minimax algorithm
function hardComputerMove() {
    const cells = document.querySelectorAll('.cell');
    const bestMove = minimax(Array.from(cells), 'O');
    cells[bestMove.index].textContent = 'O';
    if (checkWinner('O')) {
        playerName.textContent = `${players['O']} wins! 🎉`;
        grid.removeEventListener('click', handleCellClick);
    } else {
        checkDraw();
        currentPlayer = 'X';
        updatePlayerDisplay();
    }
}

// Minimax algorithm to find the best move
function minimax(newBoard, player) {
    const emptyCells = newBoard.filter(cell => cell.textContent === '');
    if (checkWinner('X')) return { score: -10 };
    if (checkWinner('O')) return { score: 10 };
    if (emptyCells.length === 0) return { score: 0 };

    const moves = [];
    for (let i = 0; i < emptyCells.length; i++) {
        const cell = emptyCells[i];
        const index = newBoard.indexOf(cell);
        const move = { index: index };
        newBoard[index].textContent = player;
        if (player === 'O') {
            const result = minimax(newBoard, 'X');
            move.score = result.score;
        } else {
            const result = minimax(newBoard, 'O');
            move.score = result.score;
        }
        newBoard[index].textContent = '';
        moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    }
    return bestMove;
}

// Reset game mode event listeners
function resetGameMode() {
    grid.removeEventListener('click', handleCellClick);
    if (gameMode === '2P') {
        grid.addEventListener('click', handleCellClick);
    } else if (gameMode === 'EASY') {
        grid.addEventListener('click', handleCellClick);
    } else if (gameMode === 'HARD') {
        grid.addEventListener('click', handleCellClick);
    }
}

// Initialize game
clearCells();
updatePlayerDisplay();
