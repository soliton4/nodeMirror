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
if (promiseland._hasModule({ hashStr: "dc01d7039f5b3fa03ccb1991f4aef666" })){ return promiseland._getModule("dc01d7039f5b3fa03ccb1991f4aef666"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "dc01d7039f5b3fa03ccb1991f4aef666", "module": PL$1, promising: true });
var PL$11/*Callback*/;try{PL$11/*Callback*/ = Callback;}catch(e){};
var PL$12/*setTimeout*/;try{PL$12/*setTimeout*/ = setTimeout;}catch(e){};
var PL$2 = (function(){
"use strict";
var PL$3/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$1.reject(e);
    };
  };
};
var PL$4/*catch rejected*/ = function(e){
  PL$1.reject(e);
};
var PL$5/*p*/;
var PL$14/*res*/;
var PL$15/*x*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  PL$5/*p*/ = (function(){
  var PL$6 = new __Promise();
  var PL$8/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$6.reject(e);
      };
    };
  };
  var PL$9/*catch rejected*/ = function(e){
    PL$6.reject(e);
  };
  var PL$10/*c*/;
  PL$8/*promiseland exception catcher*/(function(){
  
    ;
    PL$10/*c*/ = new PL$11/*Callback*/();
    PL$12/*setTimeout*/(PL$10/*c*/, 100);
    PL$10/*c*/["promise"].then(PL$8/*promiseland exception catcher*/(function(PL$13){PL$13;
    PL$6.resolve(); return;
    PL$6.resolve(); return;}), PL$9/*catch rejected*/);
    ;
  })();return PL$6;
  });
  PL$14/*res*/ = {
    
  };
  PL$15/*x*/ = (function(PL$16/*para*/, PL$17/*parb*/){
  var PL$18 = new __Promise();
  var PL$20/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$18.reject(e);
      };
    };
  };
  var PL$21/*catch rejected*/ = function(e){
    PL$18.reject(e);
  };
  var PL$23/*arguments*/ = arguments;
  PL$20/*promiseland exception catcher*/(function(){
  
    ;
    PL$14/*res*/["a"] = PL$16/*para*/;
    PL$5/*p*/().then(PL$20/*promiseland exception catcher*/(function(PL$22){PL$22;
    PL$14/*res*/["b"] = PL$17/*parb*/;
    PL$14/*res*/["c"] = PL$23/*arguments*/[2];
    PL$18.resolve(); return;}), PL$21/*catch rejected*/);
    ;
  })();return PL$18;
  });
  PL$15/*x*/(1, 1, 2).then(PL$3/*promiseland exception catcher*/(function(PL$24){PL$24;
  PL$1.resolve(((PL$14/*res*/["a"] + PL$14/*res*/["b"]) + PL$14/*res*/["c"])); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();