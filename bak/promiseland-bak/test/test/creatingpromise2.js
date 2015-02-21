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
if (promiseland._hasModule({ hashStr: "cfd61e183b4bf6d2ea80744ad61d0e79" })){ return promiseland._getModule("cfd61e183b4bf6d2ea80744ad61d0e79"); };
var PL$1 = (function(){
"use strict";

  ;
  return {
    "fun": (function(){
    var PL$2 = new __Promise();
    var PL$4/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$2.reject(e);
        };
      };
    };
    var PL$5/*catch rejected*/ = function(e){
      PL$2.reject(e);
    };
    PL$4/*promiseland exception catcher*/(function(){
    
      ;
      PL$2.resolve(4); return;
      PL$2.resolve(); return;
    })();return PL$2;
    })
  };
  ;})();
;return PL$1;
});
})();