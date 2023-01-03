import { BAD_CREDENTIALS, NO_PARAM_ERROR } from "../errors.js";
import runGame from "../Game/gameEngine/runner.js";
import Color from "../Game/util/Color.js";
import Transform from "../Game/util/Trsansform.js";
import Vector from "../Game/util/Vector.js";
import $ from "../tools/fastAccess.js";
import EnemyGroup from "./game-objects/EnemyGroup.js";
import GameManager from "./game-objects/GameManager.js";
import GameScores from "./game-objects/GameScores.js";
import PlayerLives from "./game-objects/player-lives/PlayerLives.js";
import Player from "./game-objects/Player.js";
import Shild from "./game-objects/shild/Shild.js";
import ScoresState from "./ScoresState.js";
//set function out of teh module
const w = window;
w.setDifficulty = setDifficulty;
const CONTAINER_ID = "game-container";
const diffParam = $.param("diff");
if (!diffParam) {
    throw new Error(NO_PARAM_ERROR("diff"));
}
const difficulty = diffParam;
setHighScoresTable();
runGame(CONTAINER_ID, initGame, new Vector(800, 720));
function initGame(game) {
    setGameManager(game);
    let username = $.session("currentUsername");
    if (!username) {
        throw new Error(BAD_CREDENTIALS);
    }
    username = `${username}_si`;
    const localDataSave = game.loadState(username);
    const scoresState = ScoresState.load(localDataSave);
    const scoresData = scoresState[difficulty];
    game.drawer.backgroundColor = Color.rgb(50, 50, 50);
    game.addGameObject(new PlayerLives(game, 3));
    setScores(game, scoresData);
    game.addGameObject(new EnemyGroup(game));
    game.addGameObject(new Player(game));
    setShilds(game);
}
function setScores(game, scoresData) {
    const scoresTransform = new Transform(Vector.zero, new Vector(20, 40), Vector.zero);
    const isWin = $.getCookie("win");
    const scores = new GameScores(game, scoresTransform);
    scores.scores = 0;
    if (isWin != null && (isWin == 'true')) {
        scores.scores = scoresData.lastScores;
        $.cookie = 'win=false';
    }
    game.addGameObject(scores);
    const bestScoresTransform = new Transform(Vector.zero, new Vector(300, 40));
    const bestScores = new GameScores(game, bestScoresTransform);
    bestScores.scores = scoresData.bestScores;
    bestScores.title = "B E S T";
    game.addGameObject(bestScores);
}
function setGameManager(game) {
    const manager = new GameManager(game, difficulty);
    game.addGameObject(manager);
}
function setShilds(game) {
    game.addGameObject(new Shild(game, game.boundary.sub(new Vector(150, 130))));
    game.addGameObject(new Shild(game, game.boundary.sub(new Vector(350, 130))));
    game.addGameObject(new Shild(game, game.boundary.sub(new Vector(550, 130))));
    game.addGameObject(new Shild(game, game.boundary.sub(new Vector(750, 130))));
}
function setDifficulty(diff) {
    location.replace(`http://${location.host}${location.pathname}?diff=${diff}`);
}
function setHighScoresTable() {
    if (!difficulty) {
        return;
    }
    const users = $.loadLocale('users');
    let usersScores = users.map(u => {
        const user = u.username;
        const scoresStr = $.loadLocale(`${user}_si`);
        return { socres: ScoresState.load(scoresStr)[difficulty], userName: user };
    });
    usersScores = usersScores.sort((a, b) => b.socres.bestScores - a.socres.bestScores);
    //set up the ui
    const container = $.id('highscores-container');
    //set up the title
    const titleColumn = $.ui.col;
    titleColumn.innerHTML = "high scores";
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
