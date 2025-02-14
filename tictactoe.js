function createPlayer(name, symbol) {
    return { name, symbol };
}

function manageBoard() {

    const checkWin = function(board, turn) {
        for (let [a, b, c] of winningCombos) {
            if (board[a] && board[a] === board[a] && board[a] === board[b] && board[a] === board[c]) {
                highlightWin([a, b, c]);
                return board[a];
            }
        }
        if (turn === 9) {
            return "Tie";
        } else {
            return null;
        }
    }
    
    const updateBoard = function(board, event) {
        let i = event.target.dataset.index;
        if (board[i] === undefined && !game.winner) {
            board[i] = game.currentPlayer;
            updateSpace(i, game.currentPlayer);

            game.turn++;

            game.winner = checkWin(board, game.turn);
            if (game.winner) {
                updateWin(game.winner);
                return
            };
            
            game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";

            console.log(game.xPlayer);
            console.log(game.oPlayer);
            if (game.currentPlayer === "X" && game.xPlayer) {
                updateState(game.xPlayer);
            } else if (game.currentPlayer === "O" && game.oPlayer) {
                updateState(game.oPlayer);
            } else {
                updateState(game.currentPlayer);
            }
            

        } 
    };

    const updateSpace = function(index, sym) {
        const spaceUpdate = document.querySelector(`[data-index="${index}"]`);
        spaceUpdate.textContent = sym;
    }

    const updateState = function(sym) {
        const stateSpace = document.querySelector(`.state`);
        stateSpace.textContent = `It's ${sym}'s turn!`;
    }

    const updateWin = function(sym) {
        const stateSpace = document.querySelector(`.state`);
        if (sym === "Tie") {
            stateSpace.textContent = `Tie!`;
        } else {
            if (sym === "X" && game.xPlayer) {
                stateSpace.textContent = `${game.xPlayer} wins!`;
            } else if (sym === "O" && game.oPlayer) {
                stateSpace.textContent = `${game.oPlayer} wins!`;
            } else {
                stateSpace.textContent = `Player ${sym} wins!`;
            }
        };
    }

    const highlightWin = function([a, b, c]) {
        const winningIndexes = [a, b, c];
        winningIndexes.forEach( index => {
            let winSpace = document.querySelector(`[data-index="${index}"]`);
            winSpace.classList.add('win');
        }); 
    }

    const firstPlayer = function() {
        return Math.random() < 0.5 ? "X" : "O"; 
    }

    const resetBoard = function(board, ) {
        game.currentPlayer = firstPlayer();
        updateState(game.currentPlayer);
        board.forEach((item, index) => {
            const space = document.querySelector(`[data-index="${index}"]`);
            space.textContent = "";
            if(space.classList.contains('win')) {
                space.classList.remove('win');
            }
        });
        board.fill(undefined);
        game.winner = null;
        game.turn = 0;
    }

    const winningCombos = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6]  // Diagonal from top-right to bottom-left
      ];

    return { updateBoard, resetBoard, updateState, firstPlayer };
}

const game = (function () {
    const { updateBoard, resetBoard, updateState, firstPlayer } = manageBoard();

    let turn = 0;
    let winner = null;
    let currentPlayer = firstPlayer();
    updateState(currentPlayer);
    let xPlayer = null;
    let oPlayer = null;
    let board = new Array(9).fill(undefined);

    
    
    const reset = document.querySelector('.reset button');
    reset.addEventListener('click', (e) => {
        resetBoard(board);
    });

    const playerXSubmit = document.querySelector('#x');
    playerXSubmit.addEventListener('click', (e) => {
        let playerX = document.getElementById("playerXName").value;
        game.xPlayer = createPlayer(playerX, "X").name;
        document.getElementById("playerXName").value = "";
    });

    const playerOSubmit = document.querySelector('#o');
    playerOSubmit.addEventListener('click', (e) => {
        let playerO = document.getElementById("playerOName").value;
        game.oPlayer = createPlayer(playerO, "O").name;
        document.getElementById("playerOName").value = "";
    });

    const gameBoard = document.querySelector('.board');
    board.forEach((item, index) => {
        const space = document.createElement('div');
        space.classList.add('space');
        space.setAttribute('data-index', index);

        space.addEventListener('click', (e) => {
            updateBoard(board, e);
        });

        gameBoard.appendChild(space);
    });

    return {board, turn, currentPlayer, winner, xPlayer, oPlayer};
})();