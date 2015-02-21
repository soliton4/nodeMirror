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

if (promiseland._hasModule({ hashStr: "79c549d14aa5895c8d6f86036d9300e5" })){ return promiseland._getModule("79c549d14aa5895c8d6f86036d9300e5"); };
var PL$2/*x*/;try{PL$2/*x*/ = x;}catch(e){};
var PL$5/*xxx*/;try{PL$5/*xxx*/ = xxx;}catch(e){};
var PL$6/*y*/;try{PL$6/*y*/ = y;}catch(e){};
var PL$1 = (function(){
"use strict";
function PL$3/*a*/(){

  ;
  ;};

  ;
  PL$2/*x*/ = 1;
  /* function a (){} - hoisted */;
  ;
  var PL$4/*b*/ = (function(){
  
    ;
    PL$5/*xxx*/();
    ;});
  ;
  PL$6/*y*/ = 2;
  ;})();
;return PL$1;
});
})();