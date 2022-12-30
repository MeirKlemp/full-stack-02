/**
 * File: this.ts
 * This file contains the logic of the minesweeper this.
 */

/**
 * This class handles the logic of minesweeper game.
 */
export class Minesweeper {
    private _rows: number;
    private _columns: number;
    private _numBombs: number;
    private _board: Block[];
    private _bombsLeft: number;
    private _startDate: Date | null;
    private _endDate: Date | null;
    private _gameOver: boolean;
    private _won: boolean;

    /**
     * The board's number of rows. To change the number of rows @see reset().
     */
    public get rows():number {
        return this._rows;
    }
    /**
     * The board's number of columns. To change the number of columns
     * @see reset().
     */
    public get columns():number {
        return this._columns;
    }
    /**
     * The number of bombs the board contains. To change the number of bombs
     * @see reset().
     */
    public get numBombs():number {
        return this._numBombs;
    }
    /**
     * The number of bombs minus the number of flags. This number shows the
     * player how many bombs left.
     */
    public get bombsLeft():number {
        return this._bombsLeft;
    }
    /**
     * The game board's blocks. If the game didn't start yet, the board has
     * default blocks that will change on the first play.
     */
    public get board():ReadonlyArray<Readonly<Block>> {
        return this._board;
    }
    /**
     * Returns `true` if game over. Otherwise, returns `false`. It is game over
     * when the player played a bomb or won the game. @see won() to know
     * whether the player won.
     */
    public get gameOver():boolean {
        return this._gameOver;
    }
    /**
     * Returns `true` if the player won the game. Otherwise, returns `false`.
     * The player wins when they played all the blocks that are not bombs.
     */
    public get won():boolean {
        return this._won;
    }
    /**
     * The number of seconds that passed since the start of the game up to now,
     * or up to game over. The game starts when the player plays his first
     * block. If the game didn't start yet, the number of seconds is 0.
     */
    public get seconds():number {
        if (this._startDate === null) {
            return 0;
        }
        const end = (this._endDate === null) ?
            new Date() : this._endDate;
        const diff = end.getTime() - this._startDate.getTime();
        return Math.floor(diff / 1000);
    }

    /**
     * Creates a new game of Minesweeper.
     * @param rows      the number of rows the game's board will have.
     * @param columns   the number of columns the game's board will have.
     * @param bombs     the number of bombs the game will have. It won't be
     *                  greater than the number of blocks in the board minus 1.
     */
    constructor(rows:number, columns:number, numBombs:number) {
        this._rows = rows;
        this._columns = columns;
        this._numBombs = Math.min(numBombs,
                                  this._rows * this._columns - 1);
        this._bombsLeft = this._numBombs;
        this._gameOver = false;
        this._won = false;
        this._startDate = null;
        this._endDate = null;

        this._board = Array<Block>(this._rows * this._columns);
        for (let i = 0; i < this._board.length; ++i) {
            this._board[i] = new Block();
        }
    }

    /**
     * Resets the Minesweeper game, while allows to change the game settings.
     * @param rows      the number of rows the game's board will have;
     *                  optional.
     * @param columns   the number of columns the game's board will have;
     *                  optional.
     * @param numBombs  the number of bombs the game will have; optional.
     */
    public reset(rows?:number, columns?:number, numBombs?:number):void {
        if (typeof rows !== "undefined" && this._rows !== rows) {
            this._rows = rows;
        }
        if (typeof columns !== "undefined" && this._columns !== columns) {
            this._columns = columns;
        }
        if (typeof numBombs !== "undefined" && this._numBombs != numBombs) {
            this._numBombs = Math.min(numBombs,
                                      this._rows * this._columns - 1);
        }
        if (this._board.length != this._rows * this._columns) {
            this._board = Array<Block>(this._rows * this._columns);
            for (let i = 0; i < this._board.length; ++i) {
                this._board[i] = new Block();
            }
        } else {
            for (let i = 0; i < this._board.length; ++i) {
                this._board[i].isBomb = false;
                this._board[i].nearBombs = 0;
                this._board[i].mode = Modes.HIDDEN;
            }
        }

        this._bombsLeft = this._numBombs;
        this._gameOver = false;
        this._won = false;
        this._startDate = null;
        this._endDate = null;
    }

    /**
     * Plays a block by its index on the game's board. If this is the
     * first move, the game's board will be generated, and the game will start
     * couting the seconds since start.
     *
     * If the player played a block with a bomb, they lose, and the played
     * block will be visible. @see gameOver and @see won to check the game
     * status.
     *
     * @param idx the index of the played block on the game's board.
     * @return the indices of the blocks that became visible. If it's game over
     * or the selected block is not hidden, returns an empty array.
     */
    public play(idx:number):number[] {
        // Cannot play if it's game over or the block is not hidden.
        if (this._gameOver || this._board[idx].mode !== Modes.HIDDEN) {
            return [];
        }

        // If first time playing, start the game.
        if (this._startDate === null) {
            this._startDate = new Date();
            this.generateBoard(idx);
        }

        const visibles:number[] = [idx];

        // Check if player have lost.
        if (this._board[idx].isBomb) {
            this._endDate = new Date();
            this._gameOver = true;
            this._won = false;
            this._board[idx].mode = Modes.VISIBLE;
            return visibles;
        }

        // If the played block is not near bombs, starts spreading the
        // visiblity to all neighbor blocks by bfs order.
        for (let i = 0; i < visibles.length; ++i) {
            this._board[visibles[i]].mode = Modes.VISIBLE;
            if (this._board[visibles[i]].nearBombs > 0) {
                continue;
            }

            // Spread the visiblity through the neighbors by pushing them into
            // the visibles array.
            const row = Math.floor(visibles[i] / this._columns);
            const column = visibles[i] % this._columns;
            for (let r = row-1; r < row+2; ++r) {
                if (r < 0) continue;
                if (r >= this._rows) break;
                for (let c = column-1; c < column+2; ++c) {
                    if (c < 0) continue;
                    if (c >= this._columns) break;
                    if (r === row && c === column) continue;

                    const neighIdx = r * this._columns + c;
                    if (this._board[neighIdx].mode === Modes.HIDDEN &&
                        visibles.indexOf(neighIdx) === -1) {
                        visibles.push(neighIdx);
                    }
                }
            }
        }

        // Check if the player won and game is over.
        let gameOver = true;
        for (let block of this._board) {
            if (block.mode !== Modes.VISIBLE && !block.isBomb) {
                gameOver = false;
                break;
            }
        }
        if (gameOver) {
            this._won = true;
            this._gameOver = true;
            this._endDate = new Date();
        }

        return visibles;
    }

    /**
     * Puts or removes a flag on a block by its index.
     * @param idx the index of the block in the board.
     * @return `true` if put the flag. Otherwise, returns `false`.
     */
    public flag(idx:number):boolean {
        if (!this._gameOver && this._board[idx].mode !== Modes.VISIBLE) {
            if (this._board[idx].mode === Modes.HIDDEN) {
                this._board[idx].mode = Modes.FLAGGED;
                this._bombsLeft -= 1;
                return true;
            } else {
                this._board[idx].mode = Modes.HIDDEN;
                this._bombsLeft += 1;
            }
        }
        return false;
    }

    /**
     * Generates the bombs on the board. The first played block won't have a
     * bomb.
     * @param firstPlay the index of the first played block on the board.
     */
    private generateBoard(firstPlay:number):void {
        // Initialize board and bomb-choooseable blocks. The first played block
        // is removed from the chooseable blocks.
        const chooseable = Array<number>(this._board.length - 1);
        for (let i = 0; i < this._board.length; ++i) {
            if (i < chooseable.length) {
                chooseable[i] = i;
            }
        }
        // Remove the first played block from the chooseable blocks.
        if (firstPlay !== chooseable.length) {
            chooseable[firstPlay] = chooseable.length;
        }

        // Generates bombs on the board.
        for (let i = 0; i < this._numBombs; ++i) {
            // Choose a block in the board to be a bomb.
            const randBlock = Math.floor(Math.random() * chooseable.length);
            this._board[chooseable[randBlock]].isBomb = true;

            // Increase the counters of all neighbor blocks.
            const row = Math.floor(chooseable[randBlock] / this._columns);
            const column = chooseable[randBlock] % this._columns;
            for (let r = row-1; r < row+2; ++r) {
                if (r < 0) continue;
                if (r >= this._rows) break;
                for (let c = column-1; c < column+2; ++c) {
                    if (c < 0) continue;
                    if (c >= this._columns) break;
                    if (r === row && c === column) continue;

                    const idx = r * this._columns + c;
                    this._board[idx].nearBombs += 1;
                }
            }

            // Make block unchooseable to be a bomb again.
            chooseable.splice(randBlock, 1);
            if (chooseable.length === 0) break;
        }
    }
}


/**
 * Possible modes of a Minesweeper game's {@link Block}.
 */
export enum Modes {
    /** The block is hidden. */
    HIDDEN = "hidden",
    /** The block is visible. */
    VISIBLE = "visible",
    /** The block is hidden with a flag on top. */
    FLAGGED = "flagged",
}

/**
 * Minesweeper game's block.
 */
export class Block {
    isBomb: boolean = false;
    nearBombs: number = 0;
    mode: Modes = Modes.HIDDEN;
}
