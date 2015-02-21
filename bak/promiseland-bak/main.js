(function(){
  var defineFun;
  var requireFun;
  
  if (typeof exports == "object" && typeof module == "object"){ // CommonJS
    module.exports = require("./promiseland.js");
    
  }else if (typeof define == "function" && define.amd){ // AMD
    define(["promiseland/promiseland"], function(promiseland){
      return promiseland;
    });
    
  }else{ // Plain browser env
    alert("not working out!");
    
  };
  
})();
