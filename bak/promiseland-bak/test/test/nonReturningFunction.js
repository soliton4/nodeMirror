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
if (promiseland._hasModule({ hashStr: "4dd8251661c34aeeaf240280f100ff51" })){ return promiseland._getModule("4dd8251661c34aeeaf240280f100ff51"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "4dd8251661c34aeeaf240280f100ff51", "module": PL$1, promising: true });
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
var PL$5/*result*/;
var PL$6/*dostuff*/;
var PL$11/*x*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  PL$5/*result*/ = {
    "res": 1
  };
  PL$6/*dostuff*/ = (function(){
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
    PL$5/*result*/["res"] = 4;
    PL$7.resolve(); return;
  })();return PL$7;
  });
  PL$11/*x*/ = (function(){
  var PL$12 = new __Promise();
  var PL$14/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$12.reject(e);
      };
    };
  };
  var PL$15/*catch rejected*/ = function(e){
    PL$12.reject(e);
  };
  PL$14/*promiseland exception catcher*/(function(){
  
    ;
    PL$6/*dostuff*/().then(PL$14/*promiseland exception catcher*/(function(PL$16){PL$16;
    PL$12.resolve(); return;}), PL$15/*catch rejected*/);
    ;
  })();return PL$12;
  });
  PL$11/*x*/().then(PL$3/*promiseland exception catcher*/(function(PL$17){PL$17;
  PL$1.resolve(PL$5/*result*/); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();