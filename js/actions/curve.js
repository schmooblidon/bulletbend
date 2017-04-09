import {wait} from "./wait";
import {time} from "../main";

export const curve = {
  init : function(p) {
    p.currentState = "curve";
    p.timer = 0;
    this.main(p);
  },
  main : function(p) {
    p.timer += time;
    if (!this.interrupt(p)) {

      p.gunAngle = p.facingAngle - p.skeleton.foreArmAngle - Math.PI/16;

      if (p.timer < 7) {
        p.skeleton.upperArmAngle -= p.timer * 0.05 * time;
        p.skeleton.foreArmAngle -= p.timer * 0.1 * time;
        p.guns[p.gunList[p.currentGun]](p, true);
      }
      else if (p.timer > 23) {
        p.skeleton.upperArmAngle -= (p.timer - 25) * -0.01 * time;
        p.skeleton.foreArmAngle -= (p.timer - 25) * -0.02 * time;
        p.guns[p.gunList[p.currentGun]](p);
      }
      else {
        p.guns[p.gunList[p.currentGun]](p);
      }
      
       
    } else {
      this.exit(p);
    }
  },
  interrupt : function(p) {
    if (p.timer >= 40) {
      wait.init(p);
      return true;
    }
    return false;
  },
  exit : function(p) {
    p.skeleton.upperArmAngle = Math.PI/8;
    p.skeleton.foreArmAngle = -Math.PI/8;
  }
}