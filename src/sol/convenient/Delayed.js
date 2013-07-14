define([
  "dojo/_base/declare"
], function(
  declare
){
  return declare([], {
    constructor: function(par, fun){
      this.fun = fun;
      this.delay = par.delay || 100;
    }
    
    , exec: function(){
      this.cancel();
      this.timeout = setTimeout(this.fun, this.delay);
    }
    
    , execNow: function(){
      this.cancel();
      this.fun();
    }
    
    , cancel: function(){
      if (this.timeout){
        clearTimeout(this.timeout);
        delete this.timeout;
      };
    }
    
    , destroy: function(){
      this.inherited(arguments);
      this.cancel();
    }
    
  });
});
