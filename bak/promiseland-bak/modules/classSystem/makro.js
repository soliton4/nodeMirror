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
  defineFun([], function(){
var __execute = function(promiseland, extra){ __execute = undefined; var __require = requireFun;

if (promiseland._hasModule({ hashStr: "fe20d8708e88b33927a054bc4c9cf0f3" })){ return promiseland._getModule("fe20d8708e88b33927a054bc4c9cf0f3"); };
var PL$3/*extra*/;try{PL$3/*extra*/ = extra;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  ;
  var PL$2/*errorMsg*/ = PL$3/*extra*/["errorMsg"];
  ;
  return (function(PL$4/*classSystem*/, PL$5/*internals*/){
  
    ;
    var PL$6/*makro*/ = {
      "SELF": 0,
      "PROPERTY": 1,
      "PROPERTYSTRING": 2,
      "PROPERTYVALUE": 3,
      "VALUE": 4,
      "LEFT": 5,
      "OPERATOR": 6,
      "RIGHT": 7,
      "VALUEPROPERTY": 8,
      "RESOLVEFUN": 9,
      "REJECTFUN": 10,
      "TYPEVALUE": 11,
      "CONSTRUCTOR": 12,
      "NEWLINE": 13
    };
    ;
    PL$5/*internals*/["makro"] = PL$6/*makro*/;
    PL$5/*internals*/["xxx1"] = PL$6/*makro*/;
    return PL$6/*makro*/;
    ;});
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();