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

if (promiseland._hasModule({ hashStr: "ab5c44392ce9b1c0b80c13161fb244c0" })){ return promiseland._getModule("ab5c44392ce9b1c0b80c13161fb244c0"); };
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*C1*/ = (function(){var PL$3/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(){
    
      ;
      this["a"] = 1;
      ;}),
    "b": 1,
    "doSomething": (function(){
    
      ;
      return (this["a"] + this["b"]);
      ;})
  }, [], PL$3/*inherited*/);
  return res; })();
  ;
  var PL$4/*c*/ = new PL$2/*C1*/();
  ;
  if((((PL$4/*c*/["a"] == 1) && (PL$4/*c*/["b"] == 1)) && (PL$4/*c*/["doSomething"]() == 2))){
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