(function(){
  var defineFun;
  var requireFun;
  
  if (typeof exports == "object" && typeof module == "object"){ // CommonJS
    module.exports = require("./promiseLand.js");
    
  }else if (typeof define == "function" && define.amd){ // AMD
    define(["promiseland/promiseLand"], function(promiseLand){
      return promiseLand;
    });
    
  }else{ // Plain browser env
    alert("not working out!");
    
  };
  
})();
