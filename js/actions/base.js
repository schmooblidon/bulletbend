export const name = {
  init : function(p) {
    p.action = "name";
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