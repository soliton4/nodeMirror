define([
  "dojo/_base/declare"
], function(
  declare
){
  return declare([], {
    constructor: function(fun, par){
      this.fun = fun;
      this.delay = (par && par.delay) || 0;
    }
    
    , exec: function(){
      if (this.sceduled){
        return;
      };
      var self = this;
      self.sceduled = true;
      setTimeout(function(){
        self.sceduled = false;
        self.fun();
      }, this.delay);
    }
    
    , execNow: function(){
      this.cancel();
      this.fun();
    }
    
    , cancel: function(){
      if (self.sceduled){
        self.sceduled = false;
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
