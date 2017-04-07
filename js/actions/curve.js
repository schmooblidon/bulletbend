export const curve = {
  init : function(p) {
    p.action = "curve";
    this.main(p);
  },
  main : function(p) {
    if (!this.interrupt(p)) {

    }
  },
  interrupt : function(p) {
    return false;
  },
  exit : function(p) {

  }
}