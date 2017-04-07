import {pistol} from "./pistol";
import {machineGun} from "./machineGun";
import {bulletList} from "../../main";
import {bullet} from "../../bullet";

export function Guns() {
  this.pistol = pistol;
  this.machineGun = machineGun;
}

export function fireBullet(p) {
  bulletList.push(new bullet(p, p.facingAngle, p.pos.x + Math.cos(p.facingAngle) * p.gunShape.vertices[1].x, p.pos.y + Math.sin(p.facingAngle) * p.gunShape.vertices[1].x));
}