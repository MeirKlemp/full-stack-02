import { Minesweeper, Modes } from './game.js';
const BLOCK_SIZE_PX = 40;
const BOMB_IMAGE_PATH = "/media/Minesweeper/bomb.png";
const NO_BOMB_IMAGE_PATH = "/media/Minesweeper/no-bomb.png";
// Status images' pathes.
const PLAYING_IMAGE_PATH = "/media/Minesweeper/happy.png";
const CLICKING_IMAGE_PATH = "/media/Minesweeper/surprised.png";
const WINNER_IMAGE_PATH = "/media/Minesweeper/cool.png";
const LOSER_IMAGE_PATH = "/media/Minesweeper/dead.png";
// The blocks of the HTML board.
const blocks = new Array();
let game = new Minesweeper(10, 10, 10);
// Handle to the interval that updates the seconds on the screen.
let timerInterval = null;
/**
 * Restarts the minesweeper game and creates the UI board content.
 */
function loadGame() {
    setStatusImage(PLAYING_IMAGE_PATH);
    const [rows, columns, bombs] = getGameProperties();
    game.reset(rows, columns, bombs);
    // Resets the board's content and size.
    const styleWidth = columns * BLOCK_SIZE_PX + "px";
    const board = document.getElementById("board");
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    board.style.width = styleWidth;
    board.style.height = `${rows * BLOCK_SIZE_PX}px`;
    board.innerHTML = '';
    const dashboard = document.getElementById("dashboard");
    dashboard.style.maxWidth = styleWidth;
    // Creates the board's grid.
    blocks.length = game.board.length;
    for (let i = 0; i < blocks.length; ++i) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.classList.add("block-hidden");
        block.addEventListener("mouseup", blockMouseUp);
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
function blockMouseUp(ev) {
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
    setStatusImage(PLAYING_IMAGE_PATH);
    // On left click play the current block.
    let visibleBlocks = game.play(idx);
    // Make all new visible blocks visible.
    for (let i of visibleBlocks) {
        makeBlockVisible(blocks[i], game.board[i]);
    }
    if (game.gameOver) {
        // Make board unclickable.
        for (const block of blocks) {
            block.removeEventListener("mouseup", blockMouseUp);
            block.style.cursor = "auto";
        }
        // Stop timer.
        updateTimer();
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        if (game.won) {
            setStatusImage(WINNER_IMAGE_PATH);
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
            setStatusImage(LOSER_IMAGE_PATH);
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
    block.removeEventListener("mouseup", blockMouseUp);
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
    timer.textContent = Math.min(game.seconds, 99999).toString();
}
/**
 * Retrives the number of rows, columns and bombs from the difficulty level.
 * @return tuple containing rows, columns and bombs numbers.
 */
function getGameProperties() {
    const difficulty = document.getElementById("difficulty").value;
    switch (difficulty.toLowerCase()) {
        case "easy":
            return [10, 10, 10];
        case "medium":
            return [16, 16, 40];
        case "hard":
            return [16, 30, 99];
        default:
            throw new Error("Unknown difficulty level...");
    }
}
/**
 * Mouse down event that changes the status to clicking on left click.
 */
function clickingStatusMouseDown(ev) {
    if (ev.button !== 2 && !game.gameOver) {
        setStatusImage(CLICKING_IMAGE_PATH);
    }
}
/**
 * Mouse up event that sets the status back to normal when done left clicking.
 */
function clickingStatusMouseUp(ev) {
    // Set status back to normal when done clicking.
    if (ev.button !== 2 && !game.gameOver) {
        setStatusImage(PLAYING_IMAGE_PATH);
    }
}
/**
 * Sets the status image according to the given image.
 * @param path path to a new image to be the new status.
 */
function setStatusImage(path) {
    const stat = document.getElementById("status");
    stat.src = path;
}
window.onload = () => {
    // Loads the game whenever the user clicks on the reset button, or changes
    // difficulty.
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", loadGame);
    const difficultySelector = document.getElementById("difficulty");
    difficultySelector.addEventListener("change", loadGame);
    // Set status clicking events.
    const board = document.getElementById("board");
    board.addEventListener("mousedown", clickingStatusMouseDown);
    document.body.addEventListener("mouseup", clickingStatusMouseUp);
    loadGame();
};
