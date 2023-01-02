import { Minesweeper } from './game.js';
const COLUMN_SIZE_PX = 40;
let game = new Minesweeper(10, 10, 10);
let timerInterval = null;
function loadGame(rows, columns, bombs) {
    game.reset(rows, columns, bombs);
    // Resets the board's content and size.
    const board = document.getElementById("board");
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    board.style.width = `${columns * COLUMN_SIZE_PX}px`;
    board.innerHTML = '';
    // Creates the board's grid.
    for (let i = 0; i < game.board.length; ++i) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.classList.add("block-hidden");
        block.addEventListener("mouseup", blockClicked);
        block.oncontextmenu = () => false;
        board.appendChild(block);
    }
    // Resets the timer.
    const timer = document.getElementById("timer");
    timer.textContent = "0";
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
    // Resets the bombs left counter.
    const bombsLeft = document.getElementById("bombsLeft");
    bombsLeft.textContent = game.bombsLeft.toString();
}
function blockClicked(ev) {
    const board = this.parentNode;
    const idx = Array.prototype.indexOf.call(board.children, this);
    if (ev.button === 2) {
        // On right click put or remvoe flag.
        if (game.flag(idx)) {
            this.classList.add("block-flagged");
        }
        else {
            this.classList.remove("block-flagged");
        }
        const bombsLeft = document.getElementById("bombsLeft");
        bombsLeft.textContent = game.bombsLeft.toString();
        return;
    }
    // On left click play the current block.
    let visibleBlocks = game.play(idx);
    // Make all new visible blocks visible.
    for (let i of visibleBlocks) {
        const block = board.children[i];
        block.classList.add("block-visible");
        block.classList.remove("block-hidden");
        block.classList.remove("block-flagged");
        block.removeEventListener("click", blockClicked);
        // Create block's content
        let content;
        if (game.board[i].isBomb) {
            content = document.createElement("img");
            content.src = "/media/Minesweeper/bomb.png";
            block.appendChild(content);
        }
        else {
            content = document.createElement("p");
            if (game.board[i].nearBombs !== 0) {
                content.textContent = game.board[i].nearBombs.toString();
                block.appendChild(content);
            }
        }
    }
    if (game.gameOver) {
        updateTimer();
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        if (game.won) {
            alert(`You won in ${game.seconds} seconds!`);
        }
        else {
            alert("Booom! Game Over!");
        }
    }
}
/**
 * Updates the timer to show seconds since the start of the game.
 */
function updateTimer() {
    const timer = document.getElementById("timer");
    timer.textContent = game.seconds.toString();
}
window.onload = () => {
    // Loads the game whenever the user clicks on the reset button.
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => loadGame(10, 10, 10));
    loadGame(10, 10, 10);
};
