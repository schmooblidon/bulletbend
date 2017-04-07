import {bulletList} from "./main";
import {bullet} from "./bullet"; 

export function physics(p) {
  if (p.input.magnitude[0] > 0) {
    let maxSpeed = p.input.magnitude[0]*p.walkSpeed;
    let angles = [Math.cos(p.input.angle[0]), Math.sin(p.input.angle[0])];
    let angledMax = [maxSpeed*angles[0], maxSpeed*angles[1]];
    if (angledMax[0] > 0) {
      if (p.vel.x > angledMax[0]) {
        p.vel.x -= angles[0]*p.friction;
        if (p.vel.x < angledMax[0]) {
          p.vel.x = angledMax[0];
        }
      }
      else {
        p.vel.x = Math.cos(p.input.angle[0])*p.input.magnitude[0]*p.walkSpeed;
      }
    }
    else {
      if (p.vel.x < angledMax[0]) {
        p.vel.x -= angles[0]*p.friction;
        if (p.vel.x > angledMax[0]) {
          p.vel.x = angledMax[0];
        }
      }
      else {
        p.vel.x = Math.cos(p.input.angle[0])*p.input.magnitude[0]*p.walkSpeed;
      }
    }

    if (angledMax[1] > 0) {
      if (p.vel.y > angledMax[1]) {
        p.vel.y -= angles[1]*p.friction;
        if (p.vel.y < angledMax[1]) {
          p.vel.y = angledMax[1];
        }
      }
      else {
        p.vel.y = Math.sin(p.input.angle[0])*p.input.magnitude[0]*p.walkSpeed;
      }
    }
    else {
      if (p.vel.y < angledMax[1]) {
        p.vel.y -= angles[1]*p.friction;
        if (p.vel.y > angledMax[1]) {
          p.vel.y = angledMax[1];
        }
      }
      else {
        p.vel.y = Math.sin(p.input.angle[0])*p.input.magnitude[0]*p.walkSpeed;
      }
    }
  }
  else {
    let angle = Math.atan2(p.vel.y, p.vel.x);
    let startSigns = [Math.sign(p.vel.x), Math.sign(p.vel.y)];
    p.vel.x -= Math.cos(angle)*p.friction;
    p.vel.y -= Math.sin(angle)*p.friction;
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
      bulletList.push(new bullet(p, p.armAngle, p.pos.x + Math.cos(p.armAngle) * p.armLength, p.pos.y + Math.sin(p.armAngle) * p.armLength));
      p.gunLockout = true;
    }
  }
  else if (p.input.rTrigger[0] < 0.3) {
    p.gunLockout = false;
  }

  let destroyQueue = [];
  for (let i=0;i<bulletList.length;i++) {
    if (bulletList[i].physics()) {
      destroyQueue.push(i);
    }
  }
  for (let i=0;i<destroyQueue.length;i++) {
    bulletList[destroyQueue[i]-i].shell.remove();
    bulletList.splice(destroyQueue[i]-i,1);
  }
}