import {time} from "../../main";
import {fireBullet} from "./Guns";

export function machineGun(p) {
  if (!p.gunLockout) {
    if (p.input.rTrigger[0] >= 0.3) {
      fireBullet(p);
      p.gunLockout = true;
      p.gunLockoutTimer = 5;
    }
  }
  else {
    if (p.gunLockoutTimer > 0) {
      p.gunLockoutTimer -= time;
    }
    else {
      p.gunLockout = false;
    }
  }
}