const GRID_WIDTH = 3;
const gridSquares = document.querySelectorAll('.grid-square');
const gameHeading = document.getElementById('game-heading');
const restartButton = document.getElementById('restart-button');

let grid = createGrid();
let currPlayer = 1;
let numMoves = 0;

gridSquares.forEach((square,i) => {
    square.addEventListener('click', () => {
        const row = Math.floor(i / GRID_WIDTH);
        const col = i % GRID_WIDTH;
        makeMove(row,col,square);
    });
});

restartButton.addEventListener('click', restartGame);

function makeMove(row,col,square){
    grid[row][col] = currPlayer;
    square.disabled = true;
    square.textContent = currPlayer === 1 ? "X" : "0";
    numMoves++;

    if(currPlayerWins(currPlayer)){
        gameHeading.textContent = `Player ${currPlayer} wins!`;
        endGame();
    } else if (numMoves >= GRID_WIDTH * GRID_WIDTH){
        gameHeading.textContent = "Tie Game";
        endGame();
    } else {
        currPlayer = currPlayer === 1 ? 2 : 1;
        updateHeading(currPlayer);
    }
}

function endGame() {
    restartButton.style.display = 'block';
    gridSquares.forEach(square => {
        square.disabled = true;
    });
}

function restartGame() {
    restartButton.style.display = 'none';
    currPlayer = 1;
    numMoves = 0;
    updateHeading(currPlayer);
    grid = createGrid();
    gridSquares.forEach(square => {
        square.textContent = "";
        square.disabled = false;
    })
}

function currPlayerWins(currPlayer) {
    const rows = [0,1,2];
    const cols = [0,1,2];

    const winHorizontal = rows.some(row => {
        return (
            grid[row][0] === currPlayer &&
            grid[row][1] === currPlayer && 
            grid[row][2] === currPlayer
        );
    });

    const winVertically = cols.some(col => {
        return (
            grid[0][col] === currPlayer &&
            grid[1][col] === currPlayer &&
            grid[2][col] === currPlayer
        );
    });

    const winTopLeftToBottomRight = (
        grid[0][0] === currPlayer &&
        grid[1][1] === currPlayer &&
        grid[2][2] === currPlayer
    );

    const winTopRightToBottomLeft = (
        grid[0][2] === currPlayer &&
        grid[1][1] === currPlayer &&
        grid[2][0] === currPlayer
    );

    return (
        winHorizontal || winVertically ||
        winTopLeftToBottomRight || winTopRightToBottomLeft
    );
}

function createGrid() {
    return new Array(GRID_WIDTH)
        .fill()
        .map(() => new Array(GRID_WIDTH).fill());
}

function updateHeading(currPlayer){
    gameHeading.textContent = `Player ${currPlayer}'s Turn`;
}
