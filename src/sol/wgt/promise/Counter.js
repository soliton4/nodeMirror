define([
  "dojo/Deferred"
, "dojo/_base/declare"
], function(
  Deferred
, declare
){
  
  var Counter = declare([], {
    constructor: function(){
      this.count = 0;
    }
    
    , inc: function(){
      this.count++;
    }
    , dec: function(){
      this.count--;
      this._checkCounter();
    }
    
    , then: function(par1, par2){
      if (!this.def){
        this.def = new Deferred();
        this._checkCounter();
      };
      this.def.then(par1, par2);
    }
    
    , _checkCounter: function(){
      if (this.count || !this.def){
        return;
      };
      this.def.resolve();
    }
  });
  
  return Counter;
});
