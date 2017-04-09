import {curve} from "./curve";

export const wait = {
  init : function(p) {
    p.currentState = "wait";
    this.main(p);
  },
  main : function(p) {
    if (!this.interrupt(p)) {
      if (p.input.x[0] && !p.input.x[1]) {
        p.switchGun(1);
      }
      p.guns[p.gunList[p.currentGun]](p);
    }
  },
  interrupt : function(p) {
    if (p.input.lBumper[0] && !p.input.lBumper[1]) {
      curve.init(p);
      return true;
    }
    return false;
  },
  exit : function(p) {

  }
}