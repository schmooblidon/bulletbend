import {Vec} from "./utils/Vec";
import {CircleCollider} from "./utils/CircleCollider";
import {two} from "./main";
import {input} from "./input";
import {Guns} from "./actions/guns/Guns";
import {StateMachine} from "./actions/StateMachine";

export function player() {
  this.pos = new Vec();

  this.vel = new Vec();
  this.friction = 0.15;
  this.walkSpeed = 1.7;

  this.gunLockout = false;
  this.gunLockoutTimer = 0;

  this.guns = new Guns();
  this.currentGun = 0;
  this.gunList = ["pistol", "machineGun"];
  this.stateMachine = new StateMachine();
  this.currentState = "wait";
  this.timer = 0;

  this.switchGun = function(move) {
    this.currentGun += move;
    if (this.currentGun > this.gunList.length - 1) {
      this.currentGun = 0;
    }
    else if (this.currentGun < 0) {
      this.currentGun = this.gunList.length - 1;
    }
  }

  this.bulletTimeActive = false;

  this.facingAngle = Math.PI/2;
  this.gunAngle = Math.PI/2;

  this.collider = new CircleCollider();

  this.head = two.makeCircle(0, 0, 20);
  
  this.head.fill = "#c89";
  this.head.noStroke();

  this.upperArm = two.makeLine(0, 0, 0, 0);
  this.foreArm = two.makeLine(0, 0, 0, 0);

  this.upperArmAngle = Math.PI/8;
  this.upperArmLength = 30;
  this.upperArm.stroke = "#c89";
  this.upperArm.linewidth = 5;

  this.foreArmAngle = -Math.PI/8;
  this.foreArmLength = 30;
  this.foreArm.stroke = "#c89";
  this.foreArm.linewidth = 5;

  this.arm = two.makeGroup(this.upperArm, this.foreArm);
  //this.arm.stroke = "#fff";
  //this.arm.linewidth = 5;

  this.gunShape = two.makeLine(0, 0, 0, 0);
  this.gunShape.stroke = "#000";
  this.gunShape.linewidth = 8;

  this.leftLeg = two.makeLine(0, -15, 0, -15);
  this.rightLeg = two.makeLine(0, 15, 0, 15);
  this.legs = two.makeGroup(this.leftLeg, this.rightLeg);
  this.legs.stroke = "#c89";
  this.legs.linewidth = 5;

  this.walkCycle = 0;
  this.walkDirection = 1;

  // used for animations
  this.skeleton = {
    leftLeg : [new Vec(0, -15), new Vec(0, -15)],
    rightLeg : [new Vec(0, 15), new Vec(0, 15)],

    upperArm : [new Vec(0, 0), new Vec(0, 0)],
    upperArmAngle : Math.PI/8,
    upperArmLength : 30,

    foreArm : [new Vec(0, 0), new Vec(0, 0)],
    foreArmAngle : -Math.PI/8,
    foreArmLength : 30
  }

  this.body = two.makeGroup(this.legs, this.arm, this.gunShape, this.head);
  this.body.translation.set(two.width/2, two.height/2);

  this.input = new input();
}