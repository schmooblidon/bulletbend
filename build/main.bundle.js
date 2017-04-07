/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input = input;
exports.findInput = findInput;
exports.overrideKeyboardEvent = overrideKeyboardEvent;
function input() {
  this.controllerIndex = -1;
  this.controllerType = "None";
  this.lStickX = [0];
  this.lStickY = [0];
  this.rStickX = [0];
  this.rStickY = [0];
  this.lTrigger = [0];
  this.rTrigger = [0];
  this.lBumper = [false];
  this.rBumper = [false];
  this.a = [false];
  this.s = [false];

  this.angle = [0];
  this.magnitude = [0];

  this.rAngle = [0];
  this.rMagnitude = [0];

  this.updateInput = function () {
    // push inputs back a frame in history
    for (var i = 4; i > 0; i--) {
      this.lStickX[i] = this.lStickX[i - 1];
      this.lStickY[i] = this.lStickY[i - 1];
      this.rStickX[i] = this.rStickX[i - 1];
      this.rStickY[i] = this.rStickY[i - 1];
      this.a[i] = this.a[i - 1];
      this.lTrigger[i] = this.lTrigger[i - 1];
      this.rTrigger[i] = this.rTrigger[i - 1];
      this.lBumper[i] = this.lBumper[i - 1];
      this.rBumper[i] = this.rBumper[i - 1];
      this.s[i] = this.s[i - 1];
      this.angle[i] = this.angle[i - 1];
      this.magnitude[i] = this.magnitude[i - 1];
      this.rAngle[i] = this.rAngle[i - 1];
      this.rMagnitude[i] = this.rMagnitude[i - 1];
    }

    // if using keyboard
    if (this.controllerIndex === -1) {
      this.lStickX[0] = (keys[39] ? 1 : 0) + (keys[37] ? -1 : 0);
      this.lStickY[0] = (keys[38] ? 1 : 0) + (keys[40] ? -1 : 0);
      this.rTrigger[0] = keys[32] ? 1 : 0;
      this.lTrigger[0] = keys[16] ? 1 : 0;
      this.lBumper[0] = keys[87];
      this.rBumper[0] = keys[69];
      this.s[0] = keys[13] || keys[80];
    }
    // else if using a gamepad
    else {
        var gamepads = navigator.getGamepads();
        var gamepad = gamepads[this.controllerIndex];
        // if gamepad is unplugged or removed. change to keyboard
        if (gamepad === null || gamepad === undefined) {
          this.controllerIndex = -1;
        } else {
          this.lStickX[0] = gamepad.axes[0];
          this.lStickY[0] = gamepad.axes[1] * -1;
          if (Math.abs(this.lStickY[0]) < 0.3 && Math.abs(this.lStickX[0]) < 0.3) {
            this.lStickX[0] = 0;
            this.lStickY[0] = 0;
          }

          this.rStickX[0] = gamepad.axes[2];
          this.rStickY[0] = gamepad.axes[3] * -1;
          if (Math.abs(this.rStickY[0]) < 0.3 && Math.abs(this.rStickX[0]) < 0.3) {
            this.rStickX[0] = 0;
            this.rStickY[0] = 0;
          }

          if (this.controllerType === "Xbox") {
            this.a[0] = gamepad.buttons[0].pressed;
            this.lTrigger[0] = gamepad.buttons[6].value;
            this.rTrigger[0] = gamepad.buttons[7].value;
            this.lBumper[0] = gamepad.buttons[4].pressed;
            this.rBumper[0] = gamepad.buttons[5].pressed;
            this.s[0] = gamepad.buttons[9].pressed;
          } else if (this.controllerType === "Mayflash") {
            this.a[0] = gamepad.buttons[1].pressed;
            this.lTrigger[0] = gamepad.axes[3] + 0.8 < 0.3 ? 0 : Math.min(1, gamepad.axes[3] + 0.8);
            this.rTrigger[0] = gamepad.axes[4] + 0.8 < 0.3 ? 0 : Math.min(1, gamepad.axes[4] + 0.8);
            this.lBumper[0] = gamepad.buttons[3].pressed;
            this.rBumper[0] = gamepad.buttons[0].pressed;
            this.s[0] = gamepad.buttons[9].pressed;
          }
        }
      }

    // calculate new inputs
    this.angle[0] = Math.atan2(this.lStickY[0], this.lStickX[0]);
    this.magnitude[0] = Math.min(1, Math.sqrt(Math.pow(this.lStickX[0], 2) + Math.pow(this.lStickY[0], 2)));

    this.rAngle[0] = Math.atan2(this.rStickY[0], this.rStickX[0]);
    this.rMagnitude[0] = Math.min(1, Math.sqrt(Math.pow(this.rStickX[0], 2) + Math.pow(this.rStickY[0], 2)));
  };
}

function findInput(p) {
  // if enter or space is hit
  if (keys[13] || keys[32]) {
    p.input.controllerIndex = -1;
    return true;
  }
  // else look for a button press on a gamepad
  else {
      var gamepads = navigator.getGamepads();
      for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i] !== null && gamepads[i] !== undefined) {
          for (var j = 0; j < gamepads[i].buttons.length; j++) {
            if (gamepads[i].buttons[j].pressed) {
              p.input.controllerIndex = i;
              if (gamepads[i].id === "Xbox 360 Controller (XInput STANDARD GAMEPAD)") {
                p.input.controllerType = "Xbox";
              } else if (gamepads[i].id === "MAYFLASH GameCube Controller Adapter (Vendor: 0079 Product: 1843)") {
                p.input.controllerType = "Mayflash";
              } else {
                console.log(gamepads[i].id);
              }
              return true;
            }
          }
        }
      }
    }
  return false;
}

var keys = exports.keys = {};

function overrideKeyboardEvent(e) {
  // do this for all keys except f5 and f11
  if (e.keyCode != 122 && e.keyCode != 116) {
    switch (e.type) {
      case "keydown":
        if (!keys[e.keyCode]) {
          keys[e.keyCode] = true;
        }
        break;
      case "keyup":
        delete keys[e.keyCode];
        break;
    }
    disabledEventPropagation(e);
    e.preventDefault();
    return false;
  } else {
    return true;
  }
}

function disabledEventPropagation(e) {
  if (e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (event) {
      event.cancelBubble = true;
    }
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bulletList = exports.p = exports.two = undefined;

var _player = __webpack_require__(3);

var _physics = __webpack_require__(2);

var _render = __webpack_require__(4);

var _input = __webpack_require__(0);

// setting up renderer
var elem = document.getElementById("game");
var params = { fullscreen: true };
var two = exports.two = new Two(params).appendTo(elem);

// setting up player
var p = exports.p = new _player.player();

var bulletList = exports.bulletList = [];

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
    (0, _render.render)(p);
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.physics = physics;

var _main = __webpack_require__(1);

var _bullet = __webpack_require__(8);

function physics(p) {
  if (p.input.magnitude[0] > 0) {
    var maxSpeed = p.input.magnitude[0] * p.walkSpeed;
    var angles = [Math.cos(p.input.angle[0]), Math.sin(p.input.angle[0])];
    var angledMax = [maxSpeed * angles[0], maxSpeed * angles[1]];
    if (angledMax[0] > 0) {
      if (p.vel.x > angledMax[0]) {
        p.vel.x -= angles[0] * p.friction;
        if (p.vel.x < angledMax[0]) {
          p.vel.x = angledMax[0];
        }
      } else {
        p.vel.x = Math.cos(p.input.angle[0]) * p.input.magnitude[0] * p.walkSpeed;
      }
    } else {
      if (p.vel.x < angledMax[0]) {
        p.vel.x -= angles[0] * p.friction;
        if (p.vel.x > angledMax[0]) {
          p.vel.x = angledMax[0];
        }
      } else {
        p.vel.x = Math.cos(p.input.angle[0]) * p.input.magnitude[0] * p.walkSpeed;
      }
    }

    if (angledMax[1] > 0) {
      if (p.vel.y > angledMax[1]) {
        p.vel.y -= angles[1] * p.friction;
        if (p.vel.y < angledMax[1]) {
          p.vel.y = angledMax[1];
        }
      } else {
        p.vel.y = Math.sin(p.input.angle[0]) * p.input.magnitude[0] * p.walkSpeed;
      }
    } else {
      if (p.vel.y < angledMax[1]) {
        p.vel.y -= angles[1] * p.friction;
        if (p.vel.y > angledMax[1]) {
          p.vel.y = angledMax[1];
        }
      } else {
        p.vel.y = Math.sin(p.input.angle[0]) * p.input.magnitude[0] * p.walkSpeed;
      }
    }
  } else {
    var angle = Math.atan2(p.vel.y, p.vel.x);
    var startSigns = [Math.sign(p.vel.x), Math.sign(p.vel.y)];
    p.vel.x -= Math.cos(angle) * p.friction;
    p.vel.y -= Math.sin(angle) * p.friction;
    if (Math.sign(p.vel.x) != startSigns[0]) {
      p.vel.x = 0;
    }
    if (Math.sign(p.vel.y) != startSigns[1]) {
      p.vel.y = 0;
    }
  }

  p.pos.x += p.vel.x * 6;
  p.pos.y += p.vel.y * 6;

  if (p.input.rMagnitude[0] > 0) {
    p.armAngle = p.input.rAngle[0];
  }

  if (!p.gunLockout) {
    if (p.input.rTrigger[0] >= 0.3) {
      _main.bulletList.push(new _bullet.bullet(p, p.armAngle, p.pos.x + Math.cos(p.armAngle) * p.armLength, p.pos.y + Math.sin(p.armAngle) * p.armLength));
      p.gunLockout = true;
    }
  } else if (p.input.rTrigger[0] < 0.3) {
    p.gunLockout = false;
  }

  var destroyQueue = [];
  for (var i = 0; i < _main.bulletList.length; i++) {
    if (_main.bulletList[i].physics()) {
      destroyQueue.push(i);
    }
  }
  for (var _i = 0; _i < destroyQueue.length; _i++) {
    _main.bulletList[destroyQueue[_i] - _i].shell.remove();
    _main.bulletList.splice(destroyQueue[_i] - _i, 1);
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.player = player;

var _Vec = __webpack_require__(7);

var _CircleCollider = __webpack_require__(5);

var _main = __webpack_require__(1);

var _input = __webpack_require__(0);

function player() {
  this.pos = new _Vec.Vec();

  this.vel = new _Vec.Vec();
  this.friction = 0.15;
  this.walkSpeed = 1.7;

  this.gunLockout = false;

  this.armAngle = Math.PI / 2;

  this.collider = new _CircleCollider.CircleCollider();

  this.head = _main.two.makeCircle(0, 0, 20);

  this.head.fill = "#fff";
  this.head.noStroke();

  this.armLength = 55;
  this.arm = _main.two.makeLine(0, 0, 0, 0);
  this.arm.stroke = "#fff";
  this.arm.linewidth = 5;

  this.body = _main.two.makeGroup(this.head, this.arm);
  this.body.translation.set(_main.two.width / 2, _main.two.height / 2);

  this.input = new _input.input();
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _main = __webpack_require__(1);

function render(p) {

  p.arm.vertices[1].x = Math.cos(p.armAngle) * p.armLength;
  p.arm.vertices[1].y = -Math.sin(p.armAngle) * p.armLength;

  for (var i = 0; i < _main.bulletList.length; i++) {
    _main.bulletList[i].shell.translation.set(_main.two.width / 2 + _main.bulletList[i].pos.x, _main.two.height / 2 - _main.bulletList[i].pos.y);
  }

  p.body.translation.set(_main.two.width / 2 + p.pos.x, _main.two.height / 2 + p.pos.y * -1);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleCollider = CircleCollider;

var _Point = __webpack_require__(6);

function CircleCollider() {
  var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Point.Point();

  this.radius = radius;
  this.point = point;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = Point;
function Point() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  this.x = x;
  this.y = y;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec = Vec;
function Vec() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  this.x = x;
  this.y = y;

  this.Dot = function (vec) {
    return this.x * vec.x + this.y * vec.y;
  };
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bullet = bullet;

var _main = __webpack_require__(1);

var _Vec = __webpack_require__(7);

function bullet(p, angle, posx, posy) {
  this.owner = p;

  this.pos = new _Vec.Vec(posx, posy);

  this.angle = angle;

  this.speed = 20;

  this.life = 0;

  this.shell = _main.two.makeCircle(0, 0, 5);
  this.shell.translation.set(_main.two.width / 2 + this.pos.x, _main.two.height / 2 + this.pos.y);
  this.shell.fill = "#bb3333";
  this.shell.noStroke();

  this.physics = function () {
    this.life++;
    if (this.life > 100) {
      return true;
    }
    this.pos.x += Math.cos(this.angle) * this.speed;
    this.pos.y += Math.sin(this.angle) * this.speed;
    return false;
  };
}

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map