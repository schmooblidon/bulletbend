export function input() {
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

  this.updateInput = function() {
    // push inputs back a frame in history
    for (let i=4;i>0;i--) {
      this.lStickX[i] = this.lStickX[i-1];
      this.lStickY[i] = this.lStickY[i-1];
      this.rStickX[i] = this.rStickX[i-1];
      this.rStickY[i] = this.rStickY[i-1];
      this.a[i] = this.a[i-1];
      this.x[i] = this.x[i-1];
      this.y[i] = this.y[i-1];
      this.b[i] = this.b[i-1];
      this.lTrigger[i] = this.lTrigger[i-1];
      this.rTrigger[i] = this.rTrigger[i-1];
      this.lBumper[i] = this.lBumper[i-1];
      this.rBumper[i] = this.rBumper[i-1];
      this.s[i] = this.s[i-1];
      this.angle[i] = this.angle[i-1];
      this.magnitude[i] = this.magnitude[i-1];
      this.rAngle[i] = this.rAngle[i-1];
      this.rMagnitude[i] = this.rMagnitude[i-1];
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
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[this.controllerIndex];
      // if gamepad is unplugged or removed. change to keyboard
      if (gamepad === null || gamepad === undefined) {
        this.controllerIndex = -1;
      }
      else {
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
        }
        else if (this.controllerType === "Mayflash") {
          this.a[0] = gamepad.buttons[1].pressed;
          this.lTrigger[0] = (gamepad.axes[3] + 0.8) < 0.3 ? 0 : Math.min(1, gamepad.axes[3] + 0.8);
          this.rTrigger[0] = (gamepad.axes[4] + 0.8) < 0.3 ? 0 : Math.min(1, gamepad.axes[4] + 0.8);
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
  }
}

export function findInput(p) {
  // if enter or space is hit
  if (keys[13] || keys[32]) {
    p.input.controllerIndex = -1;
    return true;
  }
  // else look for a button press on a gamepad
  else {
    const gamepads = navigator.getGamepads();
    for (let i=0;i<gamepads.length;i++) {
      if (gamepads[i] !== null && gamepads[i] !== undefined) {
        for (let j=0;j<gamepads[i].buttons.length;j++) {
          if (gamepads[i].buttons[j].pressed) {
            p.input.controllerIndex = i;
            if (gamepads[i].id === "Xbox 360 Controller (XInput STANDARD GAMEPAD)") {
              p.input.controllerType = "Xbox";
            }
            else if (gamepads[i].id === "MAYFLASH GameCube Controller Adapter (Vendor: 0079 Product: 1843)") {
              p.input.controllerType = "Mayflash";
            }
            else {
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

export const keys = {};

export function overrideKeyboardEvent (e){
  // do this for all keys except f5 and f11
  if (e.keyCode != 122 && e.keyCode != 116){
    switch(e.type){
      case "keydown":
        if (!keys[e.keyCode]) {
          keys[e.keyCode] = true;
        }
        break;
      case "keyup":
        delete(keys[e.keyCode]);
        break;
    }
    disabledEventPropagation(e);
    e.preventDefault();
    return false;
  } else {
    return true;
  }
}

function disabledEventPropagation (e){
  if(e){
    if(e.stopPropagation){
      e.stopPropagation();
    } else if(event){
       event.cancelBubble = true;
    }
  }
}