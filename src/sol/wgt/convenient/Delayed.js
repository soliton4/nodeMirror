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
    
    , exec: function(parDelay){
      this.cancel();
      try{
        var delay = parDelay !== undefined ? parDelay : this.delay;
        this.timeout = setTimeout(this.fun, delay);
      }catch(e){
        this.timeout = setTimeout(this.fun, this.delay);
      };
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
