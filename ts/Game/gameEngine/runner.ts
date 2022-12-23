import Game from "./Game"


export default function runGame(){
    //TODO :: get the canvas to the runner
    const game = new Game();
    const fps = 60
    game.start();
    setInterval(game.update,1000/fps)

    return game;
}