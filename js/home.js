import { NO_GAMES_CONTAINER } from "./errors.js";
import $ from "./tools/fastAccess.js";
const imagesPath = "../images/game-covers/";
const games = [
    {
        gameName: "Minesweeper",
        src: "mine sweeper.jfif",
        available: true,
        link: "minesweeper.html",
        prefix: "ms",
        bestFunc: (a, b) => 1 / (b - 1) - 1 / (a - 1),
    },
    {
        gameName: "space invaders",
        src: "space invaders.jfif",
        available: true,
        link: "spaceInvaders.html",
        prefix: "si",
        bestFunc: (a, b) => b - a,
    },
    {
        gameName: "Stunt-Car-Racer",
        src: "Stunt-Car-Racer-1989.webp",
        available: false,
    },
    { gameName: "street fighter", src: "sf.jfif", available: false },
    { gameName: "qubert", src: "qubert.jfif", available: false },
    { gameName: "pacman", src: "pacman.jfif", available: false },
    { gameName: "Fix-it-Felix", src: "fix-felix.jfif", available: false },
    { gameName: "Donkey Kong", src: "DK.webp", available: false },
    { gameName: "batman", src: "batman.jfif", available: false },
];
const container = $.id("games-container");
if (!container) {
    throw new Error(NO_GAMES_CONTAINER);
}
const maxImagesInRow = 3;
let imagesInRow = 0;
let nextRow = document.createElement("div");
nextRow.className = "row";
for (const game of games) {
    if (imagesInRow == maxImagesInRow) {
        container.appendChild(nextRow);
        nextRow = document.createElement("div");
        nextRow.className = "row";
        imagesInRow = 0;
    }
    imagesInRow++;
    const col = document.createElement("div");
    col.className = "col";
    const figure = document.createElement("figure");
    figure.className = `p-3 shadow-lg ${game.available ? "available" : ""}`;
    const img = new Image();
    img.src = `${imagesPath}${game.src}`;
    img.className = "w-100 card-img-top";
    img.width = 100;
    img.height = 300;
    const caption = document.createElement("figcaption");
    caption.className = "p-4 card-img-bottom";
    const h2 = document.createElement("h1");
    h2.className = "h1 font-weight-bold mb-2";
    h2.innerHTML = game.gameName;
    const p = document.createElement("p");
    p.innerHTML = game.available ? "Play Now!" : "Not Available Yet:(";
    if (game.available &&
        $.loadLocale(`${$.session("currentUsername")}_${game.prefix}`)) {
        const scores = $.loadLocale(`${$.session("currentUsername")}_${game.prefix}`);
        const myBest = Object.keys(scores)
            .map((s) => scores[s].bestScores)
            .filter((s) => s != null)
            .sort(game.bestFunc)[0];
        const bestPlayer = $.loadLocale("users").map((u) => {
            const uScores = $.loadLocale(`${u.username}_${game.prefix}`);
            if (!uScores) {
                return { user: u.username, score: 0 };
            }
            return {
                user: u.username,
                score: Object.keys(uScores)
                    .map((s) => uScores[s].bestScores)
                    .filter((s) => s != null)
                    .sort(game.bestFunc)[0],
            };
        }).sort((a, b) => game.bestFunc(a.score, b.score))[0];
        p.innerHTML = `Your best scores is ${myBest} and ${bestPlayer.user} is the best player with ${bestPlayer.score}!`;
    }
    caption.appendChild(h2);
    caption.appendChild(p);
    figure.appendChild(img);
    figure.appendChild(caption);
    col.appendChild(figure);
    col.onclick = () => handleGameChoose(game.link);
    nextRow.appendChild(col);
}
container.appendChild(nextRow);
nextRow = document.createElement("div");
nextRow.className = "row";
function handleGameChoose(gameUrl) {
    if (gameUrl) {
        location.replace(gameUrl);
    }
}
