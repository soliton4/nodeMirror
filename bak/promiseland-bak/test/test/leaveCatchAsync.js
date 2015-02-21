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
if (promiseland._hasModule({ hashStr: "5f2f29c87d163a4cf698418b096fbed2" })){ return promiseland._getModule("5f2f29c87d163a4cf698418b096fbed2"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "5f2f29c87d163a4cf698418b096fbed2", "module": PL$1, promising: true });
var PL$10/*x*/;try{PL$10/*x*/ = x;}catch(e){};
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
var PL$5/*a*/;
var PL$12/*res*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  PL$5/*a*/ = (function(){
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
  PL$8/*promiseland exception catcher*/(function(){
  
    ;
    PL$10/*x*/.then(PL$8/*promiseland exception catcher*/(function(PL$11){PL$11;
    PL$6.resolve(1); return;
    PL$6.resolve(); return;}), PL$9/*catch rejected*/);
    ;
  })();return PL$6;
  });
  PL$12/*res*/;
  var PL$13 = new __Promise();
  var PL$14 = new __Promise();
  var PL$15/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$14.resolve(e); }; }; };
  var PL$16 = function(e){ PL$14.resolve(e); };
  PL$15/*try catch*/(function(){
    PL$5/*a*/().then(PL$15/*try catch*/(function(PL$17){PL$12/*res*/ = PL$17;
    PL$13.resolve();}), PL$16);
  ;})();
  PL$14.then(PL$3/*promiseland exception catcher*/(function(__dummy){PL$13.resolve();}));
  PL$13.then(PL$3/*promiseland exception catcher*/(function(){;
  ;
  if((PL$12/*res*/ == 1)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  PL$1.resolve({
    "success": true
  }); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/)
})();return PL$1;
})();
;;
return PL$1});
})();