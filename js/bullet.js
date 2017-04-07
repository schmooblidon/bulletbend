import {two, time} from "./main";
import {Vec} from "./utils/Vec";

export function bullet(p, angle, posx, posy) {
  this.owner = p;

  this.pos = new Vec(posx, posy);

  this.angle = angle;

  this.speed = 30;

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
    this.pos.x += Math.cos(this.angle) * this.speed * time;
    this.pos.y += Math.sin(this.angle) * this.speed * time;
    return false;
  }
}