export const wait = {
  init : function(p) {
    p.action = "wait";
    this.main(p);
  },
  main : function(p) {
    if (!this.interrupt(p)) {
      if (p.input.x[0] && !p.input.x[1]) {
        p.switchGun(1);
      }
      p.guns[p.gunList[p.currentGun]](p);
    }
  },
  interrupt : function(p) {
    return false;
  },
  exit : function(p) {

  }
}