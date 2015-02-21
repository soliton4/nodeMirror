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

if (promiseland._hasModule({ hashStr: "6b462038a9171eb6ac94e6b855660e0f" })){ return promiseland._getModule("6b462038a9171eb6ac94e6b855660e0f"); };
var PL$5/*dostuff*/;try{PL$5/*dostuff*/ = dostuff;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*result*/ = {
    "res": 1
  };
  ;
  var PL$3/*dootherStuff*/ = (function(){
  
    ;
    PL$2/*result*/["res"] = 4;
    ;});
  ;
  var PL$4/*x*/ = (function(){
  
    ;
    try
    {
      PL$5/*dostuff*/();}catch(PL$6/*e*/){
      PL$3/*dootherStuff*/();};
    ;
    ;});
  ;
  PL$4/*x*/();
  return PL$2/*result*/;
  ;})();
;return PL$1;
});
})();