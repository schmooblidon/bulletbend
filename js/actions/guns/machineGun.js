import {time} from "../../main";
import {fireBullet} from "./Guns";

export function machineGun(p, curve = false) {
  if (!p.gunLockout) {
    if (p.input.rTrigger[0] >= 0.3) {
      fireBullet(p, curve);
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