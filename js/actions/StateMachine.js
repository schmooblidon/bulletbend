import {wait} from "./wait";
import {curve} from "./curve";

export function StateMachine() {
  this.wait = wait;
  this.curve = curve;
}