import {Minesweeper, Modes, Block} from './game.js';

const COLUMN_SIZE_PX = 40;
const BOMB_IMAGE_PATH = "/media/Minesweeper/bomb.png";
const NO_BOMB_IMAGE_PATH = "/media/Minesweeper/no-bomb.png";

// The blocks of the HTML board.
const blocks = new Array<HTMLElement>();
let game = new Minesweeper(10, 10, 10);
// Handle to the interval that updates the seconds on the screen.
let timerInterval: number | null = null;

function loadGame(rows:number, columns:number, bombs:number):void {
    game.reset(rows, columns, bombs);

    // Resets the board's content and size.
    const board = document.getElementById("board")!;
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`
    board.style.width = `${columns * COLUMN_SIZE_PX}px`;
    board.style.height = `${rows * COLUMN_SIZE_PX}px`;
    board.innerHTML = '';

    // Clear the blocks array.
    blocks.length = 0;
    blocks.length = game.board.length;

    // Creates the board's grid.
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
    const timer = document.getElementById("timer")!;
    timer.textContent = "0";
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Resets the bombs left counter.
    const bombsLeft = document.getElementById("bombsLeft")!;
    bombsLeft.textContent = game.bombsLeft.toString();
}

function blockClicked(this: HTMLElement, ev: any):void {
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

            alert("Booom! Game Over!");
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
    block.removeEventListener("click", blockClicked);

    if (gameBlock.isBomb) {
        // Show bomb image if the block has a bomb.
        const content = document.createElement("img")
        content.src = BOMB_IMAGE_PATH;
        block.appendChild(content);

        // Show different style for the clicked block that had the bomb.
        if (gameBlock.mode === Modes.VISIBLE) {
            block.classList.add("bomb-clicked");
        }
    } else if (gameBlock.mode === Modes.FLAGGED) {
        // Show no-bomb image if the block doesn't have a bomb but is flagged.
        const content = document.createElement("img")
        content.src = NO_BOMB_IMAGE_PATH;
        block.appendChild(content);
    } else if (gameBlock.nearBombs !== 0) {
        // Show near bombs number if block nearby bombs.
        const content = document.createElement("p")
        content.textContent = gameBlock.nearBombs.toString();
        block.appendChild(content);
    }
}

/**
 * Updates the timer to show seconds since the start of the game.
 */
function updateTimer() {
    const timer = document.getElementById("timer")!;
    timer.textContent = game.seconds.toString();
}

window.onload = () => {
    // Loads the game whenever the user clicks on the reset button.
    const resetButton = document.getElementById("reset")!;
    resetButton.addEventListener("click", () => loadGame(10, 10, 10));

    loadGame(10, 10, 10);
}
