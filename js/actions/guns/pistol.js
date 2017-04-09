import {fireBullet} from "./Guns";

export function pistol(p, curve = false) {
  if (!p.gunLockout) {
    if (p.input.rTrigger[0] >= 0.3) {
      fireBullet(p, curve);
      p.gunLockout = true;
    }
  }
  else if (p.input.rTrigger[0] < 0.3) {
    p.gunLockout = false;
  }
}