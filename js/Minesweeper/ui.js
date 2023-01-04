import { Minesweeper, Modes } from "./game.js";
import $ from "../tools/fastAccess.js";
import ScoresState from "./ScoresState.js";
// Width and height of a UI block.
const BLOCK_SIZE_PX = 40;
// The blocks of the HTML board.
const blocks = new Array();
const game = new Minesweeper(10, 10, 10);
// Handle to the interval that updates the seconds on the screen.
let timerInterval = null;
// Audio of clicking on a block.
const clickAudio = new Audio("/audio/Minesweeper/click.mp3");
// Audio of clicking on a bomb.
const bombAudio = new Audio("/audio/Minesweeper/bomb.mp3");
// Audio of winning the game.
const winAudio = new Audio("/audio/Minesweeper/win.mp3");
/**
 * The status classes of the status image.
 */
var Status;
(function (Status) {
    Status["NORMAL"] = "status-normal";
    Status["CLICKING"] = "status-clicking";
    Status["WINNER"] = "status-winner";
    Status["LOSER"] = "status-loser";
})(Status || (Status = {}));
/**
 * Restarts the minesweeper game and creates the UI board content.
 */
function loadGame() {
    setStatus(Status.NORMAL);
    const [rows, columns, bombs] = getGameProperties();
    game.reset(rows, columns, bombs);
    // Update game space's content and size.
    const gameSpace = document.getElementById("game-space");
    const board = document.getElementById("board");
    const dashboard = document.getElementById("dashboard");
    gameSpace.style.maxWidth = columns * BLOCK_SIZE_PX + "px";
    board.style.height = rows * BLOCK_SIZE_PX + "px";
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    board.innerHTML = "";
    // Creates the board's grid.
    blocks.length = game.board.length;
    for (let i = 0; i < blocks.length; ++i) {
        const block = document.createElement("button");
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
    //set the high scores table
    setHighScoresTable();
}
function blockMouseUp(ev) {
    var _a;
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
        // Make the board unclickable.
        for (const block of blocks) {
            block.removeEventListener("mouseup", blockMouseUp);
            block.disabled = true;
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
            //calculate the new high scores
            const username = $.session("currentUsername");
            const diff = ((_a = $.param("diff")) !== null && _a !== void 0 ? _a : "easy");
            const state = ScoresState.load($.loadLocale(`${username}_ms`));
            const highScores = state[diff];
            if (highScores.bestScores == 0 || game.seconds < highScores.bestScores) {
                highScores.bestScores = game.seconds;
            }
            $.saveLocale(`${username}_ms`, state);
        }
        else {
            // If got here, the player lost.
            // Show all not flagged bombs and all missed flags.
            for (let i = 0; i < blocks.length; ++i) {
                if (i === idx)
                    continue;
                const block = game.board[i];
                if ((block.isBomb && block.mode !== Modes.FLAGGED) ||
                    (!block.isBomb && block.mode === Modes.FLAGGED)) {
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
function makeBlockVisible(block, gameBlock) {
    block.disabled = true;
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
    }
    else if (gameBlock.mode === Modes.FLAGGED) {
        // Show no-bomb image if the block doesn't have a bomb but is flagged.
        block.classList.add("block-without-bomb");
    }
    else if (gameBlock.nearBombs !== 0) {
        // Show near bombs number if block nearby bombs.
        const content = document.createElement("p");
        content.textContent = gameBlock.nearBombs.toString();
        content.classList.add("block-num-" + gameBlock.nearBombs);
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
    var _a;
    const difficulty = ((_a = $.param("diff")) !== null && _a !== void 0 ? _a : "").toLowerCase();
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
function clickingStatusMouseDown(ev) {
    if (ev.button !== 2 && !game.gameOver) {
        setStatus(Status.CLICKING);
    }
}
/**
 * Mouse up event that sets the status back to normal when done left clicking.
 */
function clickingStatusMouseUp(ev) {
    // Set status back to normal when done clicking.
    if (ev.button !== 2 && !game.gameOver) {
        setStatus(Status.NORMAL);
    }
}
/**
 * Sets the status image according to the given status.
 */
function setStatus(stat) {
    const statusImage = document.getElementById("status");
    // Remove all other status classes.
    for (const s of Object.values(Status)) {
        statusImage.classList.remove(s);
    }
    statusImage.classList.add(stat);
}
window.onload = () => {
    // Loads the game whenever the user clicks on the reset button.
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", loadGame);
    // Set status clicking events.
    const board = document.getElementById("board");
    board.addEventListener("mousedown", clickingStatusMouseDown);
    document.body.addEventListener("mouseup", clickingStatusMouseUp);
    loadGame();
};
function setHighScoresTable() {
    var _a;
    const difficulty = ((_a = $.param("diff")) !== null && _a !== void 0 ? _a : "easy");
    const users = $.loadLocale("users");
    let usersScores = users.map((u) => {
        const user = u.username;
        const scoresStr = $.loadLocale(`${user}_ms`);
        return { socres: ScoresState.load(scoresStr)[difficulty], userName: user };
    }).filter(c => c.socres.bestScores != 0);
    usersScores = usersScores.sort((a, b) => a.socres.bestScores - b.socres.bestScores);
    //set up the ui
    const container = $.id("highscores-container");
    //set up the title
    const titleColumn = $.ui.col;
    titleColumn.innerHTML = "<h2>high scores</h2>";
    container.innerHTML = "";
    container.appendChild($.ui.row($.ui.col, titleColumn, $.ui.col));
    for (let i = 0; i < usersScores.length; i++) {
        addScoreElement(i + 1, usersScores[i].userName, usersScores[i].socres, container);
    }
}
function addScoreElement(place, name, score, father) {
    console.log(place, name, score.bestScores, father);
    //set the place column
    const placeCol = $.ui.col;
    placeCol.innerHTML = `#${place}`;
    //set the user name column
    const nameCol = $.ui.col;
    nameCol.innerHTML = name;
    //set the scores column
    const scoreCol = $.ui.col;
    scoreCol.innerHTML = `${score.bestScores}`;
    //put all in the father
    father.appendChild($.ui.row(placeCol, nameCol, scoreCol));
}
