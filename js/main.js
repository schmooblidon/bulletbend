import {player} from "./player";
import {physics} from "./physics";
import {render} from "./render";
import {overrideKeyboardEvent, findInput} from "./input";

// setting up renderer
const elem = document.getElementById("game");
const params = {fullscreen : true};
export const two = new Two(params).appendTo(elem);

// setting up player
export const p = new player();

export let bulletList = [];

// setting up other variables
let playing = false;
export let time = 1;

export function setTime(t) {
  time = t;
}

// storing html elements
const startPrompt = document.getElementById("startPrompt");
const pauseScreen = document.getElementById("pause");

// always handy to have this ready to inspect
console.log(navigator.getGamepads());

// defining the game logic loop
function gameLoop() {
  // get current input
  p.input.updateInput();
  // if hit start, pause/unpause
  if (p.input.s[0] && !p.input.s[1]) {
    playing ^= true;
    pauseScreen.style.display = playing ? "none" : "block";
  }
  if (playing) {
    physics(p);
    render(p);
  }
  setTimeout(function(){gameLoop()}, 16.666667);
}

// when page is loaded and it asks for input
function start() {
  if (!playing) {
    if (findInput(p)){
      // start game logic and render loops
      p.input.s[0] = true;
      playing = true;
      startPrompt.remove();
      gameLoop();
      two.play();
    }
    setTimeout(function(){start()}, 16.6666667);
  }
}

// overriding keyboard events to disable unwanted events and store properly
document.onkeydown = overrideKeyboardEvent;
document.onkeyup = overrideKeyboardEvent;

start();