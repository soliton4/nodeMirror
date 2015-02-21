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
if (promiseland._hasModule({ hashStr: "5a8727f5d27e395d615f6beceb415ee1" })){ return promiseland._getModule("5a8727f5d27e395d615f6beceb415ee1"); };
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
  PL$6/*promiseland exception catcher*/(function(){
  
    ;
    PL$4.resolve((PL$3/*par*/ + 1)); return;
    PL$4.resolve(); return;
  })();return PL$4;
  });
  ;
  return {
    "fun": (function(){
    var PL$8 = new __Promise();
    var PL$10/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$8.reject(e);
        };
      };
    };
    var PL$11/*catch rejected*/ = function(e){
      PL$8.reject(e);
    };
    var PL$12/*a*/;
    PL$10/*promiseland exception catcher*/(function(){
    
      ;
      PL$12/*a*/ = 1;
      PL$2/*somefun*/(PL$12/*a*/).then(PL$10/*promiseland exception catcher*/(function(PL$13){if((PL$13 == 2)){
        PL$8.resolve(4); return;
      };
      ;
      PL$8.resolve(0); return;
      PL$8.resolve(); return;}), PL$11/*catch rejected*/);
      ;
    })();return PL$8;
    })
  };
  ;})();
;return PL$1;
});
})();