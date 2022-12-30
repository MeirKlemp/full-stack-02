import { Minesweeper, Modes } from './game.js';
const BLOCK_SIZE_PX = 40;
const BOMB_IMAGE_PATH = "/media/Minesweeper/bomb.png";
const NO_BOMB_IMAGE_PATH = "/media/Minesweeper/no-bomb.png";
const MIN_ROWS = 1;
const MAX_ROWS = 100;
const MIN_COLUMNS = 1;
const MAX_COLUMNS = 100;
const MIN_BOMBS = 1;
const MAX_BOMBS = 2500;
// The blocks of the HTML board.
const blocks = new Array();
let game = new Minesweeper(10, 10, 10);
// Handle to the interval that updates the seconds on the screen.
let timerInterval = null;
/**
 * Restarts the minesweeper game and creates the UI board content.
 */
function loadGame() {
    // Extract rows, columns and bombs from the input fields.
    const rows = parseIntInRange("Rows", MIN_ROWS, MAX_ROWS, document.getElementById("rows").value);
    const columns = parseIntInRange("Columns", MIN_COLUMNS, MAX_COLUMNS, document.getElementById("columns").value);
    const bombs = parseIntInRange("Bombs", MIN_BOMBS, MAX_BOMBS, document.getElementById("bombs").value);
    if (rows === null || columns === null || bombs === null) {
        return;
    }
    game.reset(rows, columns, bombs);
    // Resets the board's content and size.
    const board = document.getElementById("board");
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    board.style.width = `${columns * BLOCK_SIZE_PX}px`;
    board.style.height = `${rows * BLOCK_SIZE_PX}px`;
    board.innerHTML = '';
    // Creates the board's grid.
    blocks.length = game.board.length;
    for (let i = 0; i < blocks.length; ++i) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.classList.add("block-hidden");
        block.addEventListener("mouseup", blockClicked);
        block.oncontextmenu = () => false;
        blocks[i] = block;
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
    const idx = blocks.indexOf(this);
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
        makeBlockVisible(blocks[i], game.board[i]);
    }
    if (game.gameOver) {
        // Make board unclickable.
        for (const block of blocks) {
            block.removeEventListener("mouseup", blockClicked);
            block.style.cursor = "auto";
        }
        // Stop timer.
        updateTimer();
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        if (game.won) {
            alert(`You won in ${game.seconds} seconds!`);
        }
        else {
            // Show all not flagged bombs and all missed flags.
            for (let i = 0; i < blocks.length; ++i) {
                if (i === idx)
                    continue;
                const block = game.board[i];
                if (block.isBomb && block.mode !== Modes.FLAGGED ||
                    !block.isBomb && block.mode === Modes.FLAGGED) {
                    makeBlockVisible(blocks[i], block);
                }
            }
            alert("Booom! Game Over!");
        }
    }
}
/**
 * Makes a HTML block that was hidden to be visible.
 * @param block     the HTML block to be visible.
 * @param gameBlock the game's block that correspondes to the HTML block.
 */
function makeBlockVisible(block, gameBlock) {
    block.classList.add("block-visible");
    block.classList.remove("block-hidden");
    block.classList.remove("block-flagged");
    block.removeEventListener("click", blockClicked);
    if (gameBlock.isBomb) {
        // Show bomb image if the block has a bomb.
        const content = document.createElement("img");
        content.src = BOMB_IMAGE_PATH;
        block.appendChild(content);
        // Show different style for the clicked block that had the bomb.
        if (gameBlock.mode === Modes.VISIBLE) {
            block.classList.add("bomb-clicked");
        }
    }
    else if (gameBlock.mode === Modes.FLAGGED) {
        // Show no-bomb image if the block doesn't have a bomb but is flagged.
        const content = document.createElement("img");
        content.src = NO_BOMB_IMAGE_PATH;
        block.appendChild(content);
    }
    else if (gameBlock.nearBombs !== 0) {
        // Show near bombs number if block nearby bombs.
        const content = document.createElement("p");
        content.textContent = gameBlock.nearBombs.toString();
        block.appendChild(content);
    }
}
/**
 * Updates the timer to show seconds since the start of the game.
 */
function updateTimer() {
    const timer = document.getElementById("timer");
    timer.textContent = game.seconds.toString();
}
/**
 * Parses an integer within a specific range from a string. If the string is
 * not a number, or not in the range, the function will alert the user with
 * a property name.
 *
 * @param name  the property name to show the user on error.
 * @param min   the minimum value of the integer's range.
 * @param max   the maximum value of the integer's range.
 * @param s     the string to parse.
 * @return the parsed integer if in range, or `null` otherwise.
 */
function parseIntInRange(name, min, max, s) {
    const int = parseInt(s);
    if (min <= int && int <= max) {
        return int;
    }
    alert(`${name} must be a number between ${min} and ${max}!`);
    return null;
}
window.onload = () => {
    // Loads the game whenever the user clicks on the reset button.
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", loadGame);
    loadGame();
};
