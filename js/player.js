import {Vec} from "./utils/Vec";
import {CircleCollider} from "./utils/CircleCollider";
import {two} from "./main";
import {input} from "./input";

export function player() {
  this.pos = new Vec();

  this.vel = new Vec();
  this.friction = 0.15;
  this.walkSpeed = 1.7;

  this.gunLockout = false;

  this.armAngle = Math.PI/2;

  this.collider = new CircleCollider();

  this.head = two.makeCircle(0, 0, 20);
  
  this.head.fill = "#fff";
  this.head.noStroke();

  this.armLength = 55;
  this.arm = two.makeLine(0, 0, 0, 0);
  this.arm.stroke = "#fff";
  this.arm.linewidth = 5;

  this.body = two.makeGroup(this.head, this.arm);
  this.body.translation.set(two.width/2, two.height/2);

  this.input = new input();
}