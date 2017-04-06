"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.p = exports.two = undefined;

var _player = require("./player");

var _physics = require("./physics");

var _render = require("./render");

var _input = require("./input");

var _stage = require("./stage");

// setting up renderer
var elem = document.getElementById("game");
var params = { fullscreen: true };
var two = exports.two = new Two(params).appendTo(elem);

// build stage
(0, _stage.buildStage)();
// setting up player
var p = exports.p = new _player.player();

// setting up other variables
var playing = false;
var startPrompt = document.getElementById("startPrompt");
var pauseScreen = document.getElementById("pause");

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
    (0, _physics.physics)(p);
    (0, _stage.updateStage)();
    (0, _render.updateRenderObjects)(p);
  }
  setTimeout(function () {
    gameLoop();
  }, 16.666667);
}

// when page is loaded and it asks for input
function start() {
  if (!playing) {
    if ((0, _input.findInput)(p)) {
      // start game logic and render loops
      p.input.s[0] = true;
      playing = true;
      startPrompt.remove();
      gameLoop();
      two.play();
    }
    setTimeout(function () {
      start();
    }, 16.6666667);
  }
}

// overriding keyboard events to disable unwanted events and store properly
document.onkeydown = _input.overrideKeyboardEvent;
document.onkeyup = _input.overrideKeyboardEvent;

start();
