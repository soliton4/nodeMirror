(function(){
  var defineFun;
  var requireFun;
  
  if (typeof exports == "object" && typeof module == "object"){ // CommonJS
    requireFun = function(modulesAr, callback, errBack){
      try{
        var i = 0;
        var l = modulesAr.length;
        var args = [];
        for (i; i < l; ++i){
          args.push(require(modulesAr[i]));
        };
      }catch(e){
        errBack(e);
        return;
      };
      callback.apply(callback, args);
    };
    defineFun = function(requireAr, callback){
      requireFun(requireAr, function(){
        module.exports = callback.apply(callback, arguments);
      });
    };
    
  }else if (typeof define == "function" && define.amd){ // AMD
    var _define = define;
    requireFun = require;
    
    defineFun = function(par1, par2){
      if (par1 instanceof Array){
        par1.unshift("require");
      }else{
        par2 = par1;
        par1 = ["require"];
      };
      _define(par1, function(){
        requireFun = arguments[0];
        var args = [];
        for (var i = 1; i < arguments.length; ++i){
          args.push(arguments[i]);
        };
        return par2.apply(par2, args);
      });
    };
    
  }else{ // Plain browser env
    alert("not working out!");
    
  };
  defineFun(["promiseland"], function(promiseland){
var __require = requireFun;

if (promiseland._hasModule({ hashStr: "ee5b5da42a294a2f1d77d2f4f93f0add" })){ return promiseland._getModule("ee5b5da42a294a2f1d77d2f4f93f0add"); };
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*T*/ = (function(PL$3/*par*/){
  
    ;
    this["par"] = PL$3/*par*/;
    ;});
  ;
  var PL$4/*t*/ = new PL$2/*T*/({
    "id": 4
  });
  ;
  if((PL$4/*t*/["par"] && (PL$4/*t*/["par"]["id"] == 4))){
    return {
      "success": true
    };
  };
  return {
    "success": false
  };
  ;})();
;return PL$1;
});
})();