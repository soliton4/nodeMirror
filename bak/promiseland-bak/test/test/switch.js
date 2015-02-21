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

if (promiseland._hasModule({ hashStr: "09ebe1b3c68f338fa924f0dd9ebf6d7e" })){ return promiseland._getModule("09ebe1b3c68f338fa924f0dd9ebf6d7e"); };
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*a*/ = 1;
  ;
  var PL$3/*c1*/;
  ;
  var PL$4/*c2*/;
  ;
  var PL$5/*f1*/;
  ;
  var PL$6/*f2*/;
  ;
  switch (PL$2/*a*/){
    case 2:
      
      PL$5/*f1*/ = true;
    case 1:
      
      PL$3/*c1*/ = true;
    case 3:
      
      PL$4/*c2*/ = true;
      break;;
    case 4:
      
      PL$6/*f2*/ = true;
    
  };
  ;
  if((PL$3/*c1*/ && PL$4/*c2*/)){
    if((! PL$5/*f1*/ && ! PL$6/*f2*/)){
      return {
        "success": true
      };
    };
    ;
  };
  ;
  return {
    "success": false
  };
  ;})();
;return PL$1;
});
})();