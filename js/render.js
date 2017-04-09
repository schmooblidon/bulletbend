import {two, bulletList, time} from "./main";

export function render(p) {


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
    let magnitude = Math.sqrt(Math.pow(p.vel.x, 2) + Math.pow(p.vel.y, 2));
    p.walkCycle += p.walkDirection * magnitude * 0.1 * time;
    if (p.walkDirection * p.walkCycle > 1) {
      p.walkDirection *= -1;
    }
  }
  else {
    let sign = Math.sign(p.walkCycle);
    p.walkCycle -= sign * 0.1;
    if (Math.sign(p.walkCycle) != sign) {
      p.walkCycle = 0;
    }
  }
  p.leftLeg.vertices[1].x = p.walkCycle * 30;
  p.rightLeg.vertices[1].x = -p.walkCycle * 30;


  for (let i=0;i<bulletList.length;i++) {
    bulletList[i].shell.translation.set(two.width/2 + bulletList[i].pos.x, two.height/2 - bulletList[i].pos.y);
  }

  p.body.translation.set(two.width/2 + p.pos.x, two.height/2 + p.pos.y * -1);
  p.body.rotation = -p.facingAngle;
}