import {two, time} from "./main";
import {Vec} from "./utils/Vec";

export function bullet(p, angle, posx, posy, curve) {
  this.owner = p;

  this.pos = new Vec(posx, posy);

  this.angle = angle;

  this.vel = new Vec(Math.cos(this.angle)*30, Math.sin(this.angle)*30);

  this.curvePower = curve;

  this.life = 0;

  this.shell = two.makeCircle(0,0, 5);
  this.shell.translation.set(two.width/2 + this.pos.x, two.height/2 + this.pos.y);
  this.shell.fill = "#dddd33";
  this.shell.noStroke();

  this.physics = function() {
    this.life += time;
    if (this.life > 100) {
      return true;
    }
    let angleChange = 0;
    if (this.life < 20) {
      angleChange = (-this.curvePower / Math.max(1, 20 - this.life)) * 0.05 * time;
    }
    else {
      angleChange = (-this.curvePower / (this.life-19)) * 0.1 * time;
    }
    
    this.vel.x = this.vel.x * Math.cos(angleChange) - this.vel.y * Math.sin(angleChange);
    this.vel.y = this.vel.x * Math.sin(angleChange) + this.vel.y * Math.cos(angleChange);

    this.pos.x += this.vel.x * time;
    this.pos.y += this.vel.y * time;
    return false;
  }
}