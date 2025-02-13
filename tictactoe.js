function createPlayer(name, symbol) {
    return { name, symbol };
}

function createBoard() {
    let turn = 0;
    let winner = null;
    let board = new Array(9).fill(undefined);

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

    const checkWin = function(board) {
        for (let [a, b, c] of winningCombos) {
            if (board[a] && board[a] === board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }
    
    const updateBoard = function(i, sym) {
        board[i] = sym;
        turn++;
        console.log(turn);

        winner = checkWin(board);
        if (winner) {
            console.log(winner);
            return winner;
        }
        
        return board;
    };

    const resetBoard = function() {
        board.fill(undefined);
        winner = null;
        turn = 0;
    }

    return { board, turn, updateBoard, resetBoard };
}

const game = (function () {
    const { board, turn, updateBoard, resetBoard } = createBoard(); //can remove board and turn maybe?
    
    const reset = document.querySelector('.reset button');
    reset.addEventListener('click', (e) => {
        resetBoard();
    });

    const playerXSubmit = document.querySelector('#x');
    reset.addEventListener('click', (e) => {
        let playerX = document.getElementById("playerXName").value;
        createPlayer(playerX, "X");
        //updatescreen
    });

    const playerOSubmit = document.querySelector('#o');
    reset.addEventListener('click', (e) => {
        let playerO = document.getElementById("playerOName").value;
        createPlayer(playerO, "O");
        //updatescreen
    });

    const gameBoard = document.querySelector('.board');
    board.forEach((item, index) => {
        const space = document.createElement('div');
        space.classList.add('space');
        space.setAttribute('data-index', index);

        space.addEventListener('click', (e) => {
            updateBoard(e);
        });

        gameBoard.appendChild(space);
    });

    return {board, turn, updateBoard, resetBoard};
})();

console.log(game);
game.updateBoard(1, "X");
console.log(game.board);
game.updateBoard(2, "X");
console.log(game.board);
console.log(game.updateBoard(5, "X"));
game.updateBoard(0, "X");
console.log(game.board);


//check every other to see if it's the right turn
//check the array if it has a value
//screen updater
