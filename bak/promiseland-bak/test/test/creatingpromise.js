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
if (promiseland._hasModule({ hashStr: "7e2ff512946bcef40a808431919fd11a" })){ return promiseland._getModule("7e2ff512946bcef40a808431919fd11a"); };
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*b*/ = (function(){
  var PL$3 = new __Promise();
  var PL$5/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$3.reject(e);
      };
    };
  };
  var PL$6/*catch rejected*/ = function(e){
    PL$3.reject(e);
  };
  PL$5/*promiseland exception catcher*/(function(){
  
    ;
    PL$3.resolve(); return;
  })();return PL$3;
  });
  ;
  return {
    "fun": (function(){
    var PL$7 = new __Promise();
    var PL$9/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$7.reject(e);
        };
      };
    };
    var PL$10/*catch rejected*/ = function(e){
      PL$7.reject(e);
    };
    PL$9/*promiseland exception catcher*/(function(){
    
      ;
      
      var PL$11 = new __Promise();if((1 < 0)){
        PL$2/*b*/.then(PL$9/*promiseland exception catcher*/(function(PL$12){PL$12;
        PL$11.resolve();;}), PL$10/*catch rejected*/);
        ;
      }else{PL$11.resolve();
      };PL$11.then(PL$9/*promiseland exception catcher*/(function(PL$13){PL$13;;
      ;
      PL$7.resolve(4); return;
      PL$7.resolve(); return;}), PL$10/*catch rejected*/);
      ;
    })();return PL$7;
    })
  };
  ;})();
;return PL$1;
});
})();