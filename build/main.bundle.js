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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.time = exports.bulletList = exports.p = exports.two = undefined;
exports.setTime = setTime;

var _player = __webpack_require__(6);

var _physics = __webpack_require__(5);

var _render = __webpack_require__(7);

var _input = __webpack_require__(2);

// setting up renderer
var elem = document.getElementById("game");
var params = { fullscreen: true };
var two = exports.two = new Two(params).appendTo(elem);

// setting up player
var p = exports.p = new _player.player();

var bulletList = exports.bulletList = [];

// setting up other variables
var playing = false;
var time = exports.time = 1;

function setTime(t) {
  exports.time = time = t;
}

// storing html elements
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Guns = Guns;
exports.fireBullet = fireBullet;

var _pistol = __webpack_require__(11);

var _machineGun = __webpack_require__(10);

var _main = __webpack_require__(0);

var _bullet = __webpack_require__(3);

function Guns() {
  this.pistol = _pistol.pistol;
  this.machineGun = _machineGun.machineGun;
}

function fireBullet(p, curve) {
  _main.bulletList.push(new _bullet.bullet(p, p.gunAngle, p.pos.x + p.gunShape.vertices[1].x * Math.cos(p.facingAngle) - -p.gunShape.vertices[1].y * Math.sin(p.facingAngle), p.pos.y + (p.gunShape.vertices[1].x * Math.sin(p.facingAngle) + -p.gunShape.vertices[1].y * Math.cos(p.facingAngle)), curve ? p.timer : 0));
}

/***/ }),
/* 2 */
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
  this.x = [false];
  this.y = [false];
  this.b = [false];

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
      this.x[i] = this.x[i - 1];
      this.y[i] = this.y[i - 1];
      this.b[i] = this.b[i - 1];
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
            this.b[0] = gamepad.buttons[1].pressed;
            this.x[0] = gamepad.buttons[2].pressed;
            this.y[0] = gamepad.buttons[3].pressed;
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bullet = bullet;

var _main = __webpack_require__(0);

var _Vec = __webpack_require__(4);

function bullet(p, angle, posx, posy, curve) {
  this.owner = p;

  this.pos = new _Vec.Vec(posx, posy);

  this.angle = angle;

  this.vel = new _Vec.Vec(Math.cos(this.angle) * 30, Math.sin(this.angle) * 30);

  this.curvePower = curve;

  this.life = 0;

  this.shell = _main.two.makeCircle(0, 0, 5);
  this.shell.translation.set(_main.two.width / 2 + this.pos.x, _main.two.height / 2 + this.pos.y);
  this.shell.fill = "#dddd33";
  this.shell.noStroke();

  this.physics = function () {
    this.life += _main.time;
    if (this.life > 100) {
      return true;
    }
    var angleChange = 0;
    if (this.life < 20) {
      angleChange = -this.curvePower / Math.max(1, 20 - this.life) * 0.05 * _main.time;
    } else {
      angleChange = -this.curvePower / (this.life - 19) * 0.1 * _main.time;
    }

    this.vel.x = this.vel.x * Math.cos(angleChange) - this.vel.y * Math.sin(angleChange);
    this.vel.y = this.vel.x * Math.sin(angleChange) + this.vel.y * Math.cos(angleChange);

    this.pos.x += this.vel.x * _main.time;
    this.pos.y += this.vel.y * _main.time;
    return false;
  };
}

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.physics = physics;

var _main = __webpack_require__(0);

var _bullet = __webpack_require__(3);

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

  if (p.input.rMagnitude[0] > 0) {
    p.facingAngle = p.input.rAngle[0];
  }
  p.gunAngle = p.facingAngle;

  p.stateMachine[p.currentState].main(p);

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

  (0, _main.setTime)(Math.max(0.25, 1 - p.input.lTrigger[0]));

  p.pos.x += p.vel.x * 6 * _main.time;
  p.pos.y += p.vel.y * 6 * _main.time;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.player = player;

var _Vec = __webpack_require__(4);

var _CircleCollider = __webpack_require__(13);

var _main = __webpack_require__(0);

var _input = __webpack_require__(2);

var _Guns = __webpack_require__(1);

var _StateMachine = __webpack_require__(8);

function player() {
  this.pos = new _Vec.Vec();

  this.vel = new _Vec.Vec();
  this.friction = 0.15;
  this.walkSpeed = 1.7;

  this.gunLockout = false;
  this.gunLockoutTimer = 0;

  this.guns = new _Guns.Guns();
  this.currentGun = 0;
  this.gunList = ["pistol", "machineGun"];
  this.stateMachine = new _StateMachine.StateMachine();
  this.currentState = "wait";
  this.timer = 0;

  this.switchGun = function (move) {
    this.currentGun += move;
    if (this.currentGun > this.gunList.length - 1) {
      this.currentGun = 0;
    } else if (this.currentGun < 0) {
      this.currentGun = this.gunList.length - 1;
    }
  };

  this.bulletTimeActive = false;

  this.facingAngle = Math.PI / 2;
  this.gunAngle = Math.PI / 2;

  this.collider = new _CircleCollider.CircleCollider();

  this.head = _main.two.makeCircle(0, 0, 20);

  this.head.fill = "#c89";
  this.head.noStroke();

  this.upperArm = _main.two.makeLine(0, 0, 0, 0);
  this.foreArm = _main.two.makeLine(0, 0, 0, 0);

  this.upperArmAngle = Math.PI / 8;
  this.upperArmLength = 30;
  this.upperArm.stroke = "#c89";
  this.upperArm.linewidth = 5;

  this.foreArmAngle = -Math.PI / 8;
  this.foreArmLength = 30;
  this.foreArm.stroke = "#c89";
  this.foreArm.linewidth = 5;

  this.arm = _main.two.makeGroup(this.upperArm, this.foreArm);
  //this.arm.stroke = "#fff";
  //this.arm.linewidth = 5;

  this.gunShape = _main.two.makeLine(0, 0, 0, 0);
  this.gunShape.stroke = "#000";
  this.gunShape.linewidth = 8;

  this.leftLeg = _main.two.makeLine(0, -15, 0, -15);
  this.rightLeg = _main.two.makeLine(0, 15, 0, 15);
  this.legs = _main.two.makeGroup(this.leftLeg, this.rightLeg);
  this.legs.stroke = "#c89";
  this.legs.linewidth = 5;

  this.walkCycle = 0;
  this.walkDirection = 1;

  // used for animations
  this.skeleton = {
    leftLeg: [new _Vec.Vec(0, -15), new _Vec.Vec(0, -15)],
    rightLeg: [new _Vec.Vec(0, 15), new _Vec.Vec(0, 15)],

    upperArm: [new _Vec.Vec(0, 0), new _Vec.Vec(0, 0)],
    upperArmAngle: Math.PI / 8,
    upperArmLength: 30,

    foreArm: [new _Vec.Vec(0, 0), new _Vec.Vec(0, 0)],
    foreArmAngle: -Math.PI / 8,
    foreArmLength: 30
  };

  this.body = _main.two.makeGroup(this.legs, this.arm, this.gunShape, this.head);
  this.body.translation.set(_main.two.width / 2, _main.two.height / 2);

  this.input = new _input.input();
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _main = __webpack_require__(0);

function render(p) {

  p.upperArm.vertices[1].x = Math.cos(-p.skeleton.upperArmAngle) * p.upperArmLength;
  p.upperArm.vertices[1].y = -Math.sin(-p.skeleton.upperArmAngle) * p.upperArmLength;

  p.foreArm.vertices[0].x = p.upperArm.vertices[1].x;
  p.foreArm.vertices[0].y = p.upperArm.vertices[1].y;

  p.foreArm.vertices[1].x = p.foreArm.vertices[0].x + Math.cos(-p.skeleton.foreArmAngle) * p.foreArmLength;
  p.foreArm.vertices[1].y = p.foreArm.vertices[0].y - Math.sin(-p.skeleton.foreArmAngle) * p.foreArmLength;

  p.gunShape.vertices[0].x = p.foreArm.vertices[1].x;
  p.gunShape.vertices[0].y = p.foreArm.vertices[1].y;
  p.gunShape.vertices[1].x = p.gunShape.vertices[0].x + Math.cos(p.gunAngle - p.facingAngle) * 15;
  p.gunShape.vertices[1].y = p.gunShape.vertices[0].y - Math.sin(p.gunAngle - p.facingAngle) * 15;

  if (Math.abs(p.vel.x) > 0 || Math.abs(p.vel.y) > 0) {
    var magnitude = Math.sqrt(Math.pow(p.vel.x, 2) + Math.pow(p.vel.y, 2));
    p.walkCycle += p.walkDirection * magnitude * 0.1 * _main.time;
    if (p.walkDirection * p.walkCycle > 1) {
      p.walkDirection *= -1;
    }
  } else {
    var sign = Math.sign(p.walkCycle);
    p.walkCycle -= sign * 0.1;
    if (Math.sign(p.walkCycle) != sign) {
      p.walkCycle = 0;
    }
  }
  p.leftLeg.vertices[1].x = p.walkCycle * 30;
  p.rightLeg.vertices[1].x = -p.walkCycle * 30;

  for (var i = 0; i < _main.bulletList.length; i++) {
    _main.bulletList[i].shell.translation.set(_main.two.width / 2 + _main.bulletList[i].pos.x, _main.two.height / 2 - _main.bulletList[i].pos.y);
  }

  p.body.translation.set(_main.two.width / 2 + p.pos.x, _main.two.height / 2 + p.pos.y * -1);
  p.body.rotation = -p.facingAngle;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateMachine = StateMachine;

var _wait = __webpack_require__(12);

var _curve = __webpack_require__(9);

function StateMachine() {
  this.wait = _wait.wait;
  this.curve = _curve.curve;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curve = undefined;

var _wait = __webpack_require__(12);

var _main = __webpack_require__(0);

var curve = exports.curve = {
  init: function init(p) {
    p.currentState = "curve";
    p.timer = 0;
    this.main(p);
  },
  main: function main(p) {
    p.timer += _main.time;
    if (!this.interrupt(p)) {

      p.gunAngle = p.facingAngle - p.skeleton.foreArmAngle - Math.PI / 16;

      if (p.timer < 7) {
        p.skeleton.upperArmAngle -= p.timer * 0.05 * _main.time;
        p.skeleton.foreArmAngle -= p.timer * 0.1 * _main.time;
        p.guns[p.gunList[p.currentGun]](p, true);
      } else if (p.timer > 23) {
        p.skeleton.upperArmAngle -= (p.timer - 25) * -0.01 * _main.time;
        p.skeleton.foreArmAngle -= (p.timer - 25) * -0.02 * _main.time;
        p.guns[p.gunList[p.currentGun]](p);
      } else {
        p.guns[p.gunList[p.currentGun]](p);
      }
    } else {
      this.exit(p);
    }
  },
  interrupt: function interrupt(p) {
    if (p.timer >= 40) {
      _wait.wait.init(p);
      return true;
    }
    return false;
  },
  exit: function exit(p) {
    p.skeleton.upperArmAngle = Math.PI / 8;
    p.skeleton.foreArmAngle = -Math.PI / 8;
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.machineGun = machineGun;

var _main = __webpack_require__(0);

var _Guns = __webpack_require__(1);

function machineGun(p) {
  var curve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!p.gunLockout) {
    if (p.input.rTrigger[0] >= 0.3) {
      (0, _Guns.fireBullet)(p, curve);
      p.gunLockout = true;
      p.gunLockoutTimer = 5;
    }
  } else {
    if (p.gunLockoutTimer > 0) {
      p.gunLockoutTimer -= _main.time;
    } else {
      p.gunLockout = false;
    }
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pistol = pistol;

var _Guns = __webpack_require__(1);

function pistol(p) {
  var curve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!p.gunLockout) {
    if (p.input.rTrigger[0] >= 0.3) {
      (0, _Guns.fireBullet)(p, curve);
      p.gunLockout = true;
    }
  } else if (p.input.rTrigger[0] < 0.3) {
    p.gunLockout = false;
  }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = undefined;

var _curve = __webpack_require__(9);

var wait = exports.wait = {
  init: function init(p) {
    p.currentState = "wait";
    this.main(p);
  },
  main: function main(p) {
    if (!this.interrupt(p)) {
      if (p.input.x[0] && !p.input.x[1]) {
        p.switchGun(1);
      }
      p.guns[p.gunList[p.currentGun]](p);
    }
  },
  interrupt: function interrupt(p) {
    if (p.input.lBumper[0] && !p.input.lBumper[1]) {
      _curve.curve.init(p);
      return true;
    }
    return false;
  },
  exit: function exit(p) {}
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleCollider = CircleCollider;

var _Point = __webpack_require__(14);

function CircleCollider() {
  var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Point.Point();

  this.radius = radius;
  this.point = point;
}

/***/ }),
/* 14 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map