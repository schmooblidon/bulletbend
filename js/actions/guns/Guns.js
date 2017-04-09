import {pistol} from "./pistol";
import {machineGun} from "./machineGun";
import {bulletList} from "../../main";
import {bullet} from "../../bullet";

export function Guns() {
  this.pistol = pistol;
  this.machineGun = machineGun;
}

export function fireBullet(p, curve) {
  bulletList.push(new bullet(p, p.gunAngle, p.pos.x + p.gunShape.vertices[1].x * Math.cos(p.facingAngle) - -p.gunShape.vertices[1].y * Math.sin(p.facingAngle), p.pos.y + (p.gunShape.vertices[1].x * Math.sin(p.facingAngle) + -p.gunShape.vertices[1].y * Math.cos(p.facingAngle)), curve ? p.timer : 0));
}