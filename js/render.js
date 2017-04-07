import {two, bulletList} from "./main";

export function render(p) {

  p.arm.vertices[1].x = Math.cos(p.armAngle) * p.armLength;
  p.arm.vertices[1].y = -Math.sin(p.armAngle) * p.armLength;

  for (let i=0;i<bulletList.length;i++) {
    bulletList[i].shell.translation.set(two.width/2 + bulletList[i].pos.x, two.height/2 - bulletList[i].pos.y);
  }

  p.body.translation.set(two.width/2 + p.pos.x, two.height/2 + p.pos.y * -1);
}