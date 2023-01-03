import {Minesweeper, Modes, Block} from './game.js';
import $ from '../tools/fastAccess.js';

// Width and height of a UI block.
const BLOCK_SIZE_PX = 40;

// The blocks of the HTML board.
const blocks = new Array<HTMLElement>();
const game = new Minesweeper(10, 10, 10);
// Handle to the interval that updates the seconds on the screen.
let timerInterval:number | null = null;

// Audio of clicking on a block.
const clickAudio = new Audio("/audio/Minesweeper/click.mp3");
// Audio of clicking on a bomb.
const bombAudio = new Audio("/audio/Minesweeper/bomb.mp3");
// Audio of winning the game.
const winAudio = new Audio("/audio/Minesweeper/win.mp3");

/**
 * The status classes of the status image.
 */
enum Status {
    NORMAL = "status-normal",
    CLICKING = "status-clicking",
    WINNER = "status-winner",
    LOSER = "status-loser",
}

/**
 * Restarts the minesweeper game and creates the UI board content.
 */
function loadGame():void {
    setStatus(Status.NORMAL);

    const [rows, columns, bombs] = getGameProperties();
    game.reset(rows, columns, bombs);

    // Resets the board's content and size.
    const styleWidth = columns * BLOCK_SIZE_PX + "px";
    const board = document.getElementById("board")!;
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
    board.style.width = styleWidth;
    board.style.height = `${rows * BLOCK_SIZE_PX}px`;
    board.innerHTML = '';

    const dashboard = document.getElementById("dashboard")!;
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
    const timer = document.getElementById("timer")!;
    timer.textContent = "0";
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Resets the bombs left counter.
    const bombsLeft = document.getElementById("bombsLeft")!;
    bombsLeft.textContent = game.bombsLeft.toString();
}

function blockMouseUp(this:HTMLElement, ev:any):void {
    const idx = blocks.indexOf(this);

    if (ev.button === 2) {
        // On right click put or remvoe flag.
        if (game.flag(idx)) {
            this.classList.add("block-flagged");
        } else {
            this.classList.remove("block-flagged");
        }
        const bombsLeft = document.getElementById("bombsLeft")!;
        bombsLeft.textContent = game.bombsLeft.toString();
        return;
    }

    setStatus(Status.NORMAL);

    // On left click play the current block.
    let visibleBlocks = game.play(idx);

    if (visibleBlocks.length >= 1) {
        clickAudio.play();
    }

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
            setStatus(Status.WINNER);
            winAudio.play();
        } else {
            // Show all not flagged bombs and all missed flags.
            for (let i = 0; i < blocks.length; ++i) {
                if (i === idx) continue;
                const block = game.board[i];
                if (block.isBomb && block.mode !== Modes.FLAGGED ||
                   !block.isBomb && block.mode === Modes.FLAGGED) {
                    makeBlockVisible(blocks[i], block);
                }
            }

            setStatus(Status.LOSER);
            bombAudio.play();
        }
    }
}

/**
 * Makes a HTML block that was hidden to be visible.
 * @param block     the HTML block to be visible.
 * @param gameBlock the game's block that correspondes to the HTML block.
 */
function makeBlockVisible(block:HTMLElement, gameBlock:Block):void {
    block.classList.add("block-visible");
    block.classList.remove("block-hidden");
    block.classList.remove("block-flagged");
    block.removeEventListener("mouseup", blockMouseUp);

    if (gameBlock.isBomb) {
        // Show bomb image if the block has a bomb.
        block.classList.add("block-with-bomb");

        // Show different style for the clicked block that had the bomb.
        if (gameBlock.mode === Modes.VISIBLE) {
            block.classList.add("block-with-bomb-clicked");
        }
    } else if (gameBlock.mode === Modes.FLAGGED) {
        // Show no-bomb image if the block doesn't have a bomb but is flagged.
        block.classList.add("block-without-bomb");
    } else if (gameBlock.nearBombs !== 0) {
        // Show near bombs number if block nearby bombs.
        const content = document.createElement("p")
        content.textContent = gameBlock.nearBombs.toString();
        content.classList.add("block-num-" + gameBlock.nearBombs);
        block.appendChild(content);
    }
}

/**
 * Updates the timer to show seconds since the start of the game.
 */
function updateTimer() {
    const timer = document.getElementById("timer")!;
    timer.textContent = Math.min(game.seconds, 99999).toString();
}

/**
 * Retrives the number of rows, columns and bombs from the difficulty level.
 * @return tuple containing rows, columns and bombs numbers.
 */
function getGameProperties():[number, number, number] {
    const difficulty = ($.param("diff") ?? "").toLowerCase();
    switch (difficulty) {
    case "medium":
        return [16, 16, 40];
    case "hard":
        return [16, 30, 99];
    default:
    case "easy":
        return [10, 10, 10];
    }
}

/**
 * Mouse down event that changes the status to clicking on left click.
 */
function clickingStatusMouseDown(this:HTMLElement, ev:any):void {
    if (ev.button !== 2 && !game.gameOver) {
        setStatus(Status.CLICKING);
    }
}

/**
 * Mouse up event that sets the status back to normal when done left clicking.
 */
function clickingStatusMouseUp(this:HTMLElement, ev:any):void {
    // Set status back to normal when done clicking.
    if (ev.button !== 2 && !game.gameOver) {
        setStatus(Status.NORMAL);
    }
}

/**
 * Sets the status image according to the given status.
 */
function setStatus(stat:Status):void {
    const statusImage = document.getElementById("status")!;
    // Remove all other status classes.
    for (const s of Object.values(Status)) {
        statusImage.classList.remove(s);
    }
    statusImage.classList.add(stat);
}

window.onload = () => {
    // Loads the game whenever the user clicks on the reset button.
    const resetButton = document.getElementById("reset")!;
    resetButton.addEventListener("click", loadGame);

    // Set status clicking events.
    const board = document.getElementById("board")!;
    board.addEventListener("mousedown", clickingStatusMouseDown);
    document.body.addEventListener("mouseup", clickingStatusMouseUp);

    loadGame();
}
