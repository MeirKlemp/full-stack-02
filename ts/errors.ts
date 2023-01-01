import GameObject from "./Game/GameObject"

type Constructor<T> = new (...args: any[]) => T;

export const GAME_OBJECT_ERROR = "The animation must hav a game object."
export const NULL_CONTEXT_ERROR = "The given canvas context is null."
export const NO_HEX_ERROR = "the given string is not hex string."
export const GAME_MANAGER_NOT_FOUND = "Cant found the game manager!"
export const GAME_SCORES_NOT_FOUND = "cant found the fame scores!"
export const BAD_CREDENTIALS = "Cant check the account! the browser must enable cookies!"
export const PLAYER_LIVES_NOT_FOUND = "cant find the player lives"
export const NO_PARAM_ERROR = (param:string) => `can't fing param ${param}`
export const GAME_OBJECT_NOT_FOUND = (gameObject:Constructor<GameObject>)=> `cant find ${gameObject}!`
export const NO_GAMES_CONTAINER = "cant find the games container!"