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

if (promiseland._hasModule({ hashStr: "95cdb6b721e461f5c0ac0b3b37c4f61b" })){ return promiseland._getModule("95cdb6b721e461f5c0ac0b3b37c4f61b"); };
var PL$4/*funName*/;try{PL$4/*funName*/ = funName;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*calledCnt*/ = 0;
  ;
  var PL$3/*x*/ = (function PL$4/*funName*/(PL$5/*par*/){
  
    ;
    PL$2/*calledCnt*/ += 1;
    if(PL$5/*par*/){
      return;
    };
    ;
    PL$4/*funName*/(true);
    ;});
  ;
  PL$3/*x*/();
  try
  {
    PL$4/*funName*/();}catch(PL$6/*e*/){};
  ;
  if((PL$2/*calledCnt*/ == 2)){
    return {
      "success": true
    };
  };
  ;
  return {
    "success": false
  };
  ;})();
;return PL$1;
});
})();