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

var __Promise = promiseland.Promise;
var Promise = promiseland.Promise;
var Callback = promiseland.Callback;
if (promiseland._hasModule({ hashStr: "b84ffe21642945e905a4c3f179551605" })){ return promiseland._getModule("b84ffe21642945e905a4c3f179551605"); };
var PL$9/*Callback*/;try{PL$9/*Callback*/ = Callback;}catch(e){};
var PL$10/*setTimeout*/;try{PL$10/*setTimeout*/ = setTimeout;}catch(e){};
var PL$18/*console*/;try{PL$18/*console*/ = console;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*somefun*/ = (function(PL$3/*par*/){
  var PL$4 = new __Promise();
  var PL$6/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$4.reject(e);
      };
    };
  };
  var PL$7/*catch rejected*/ = function(e){
    PL$4.reject(e);
  };
  var PL$8/*c*/;
  var PL$11/*x*/;
  PL$6/*promiseland exception catcher*/(function(){
  
    ;
    PL$8/*c*/ = new PL$9/*Callback*/();
    PL$10/*setTimeout*/((function(){
    
      ;
      PL$8/*c*/["callback"](5);
      ;}), 100);
    PL$8/*c*/["promise"].then(PL$6/*promiseland exception catcher*/(function(PL$12){PL$11/*x*/ = PL$12[0];
    PL$4.resolve((PL$3/*par*/ + PL$11/*x*/)); return;
    PL$4.resolve(); return;}), PL$7/*catch rejected*/);
    ;
  })();return PL$4;
  });
  ;
  return {
    "fun": (function(){
    var PL$13 = new __Promise();
    var PL$15/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$13.reject(e);
        };
      };
    };
    var PL$16/*catch rejected*/ = function(e){
      PL$13.reject(e);
    };
    var PL$17/*a*/;
    PL$15/*promiseland exception catcher*/(function(){
    
      ;
      PL$17/*a*/ = 1;
      PL$18/*console*/["log"]("1");
      PL$2/*somefun*/(PL$17/*a*/).then(PL$15/*promiseland exception catcher*/(function(PL$19){if((PL$19 == 6)){
        PL$13.resolve(4); return;
      };
      ;
      PL$13.resolve(0); return;
      PL$13.resolve(); return;}), PL$16/*catch rejected*/);
      ;
    })();return PL$13;
    })
  };
  ;})();
;return PL$1;
});
})();