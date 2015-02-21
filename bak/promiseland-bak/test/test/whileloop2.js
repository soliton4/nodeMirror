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
if (promiseland._hasModule({ hashStr: "9c6570a898dcb766ee6ffe5c83918b6e" })){ return promiseland._getModule("9c6570a898dcb766ee6ffe5c83918b6e"); };
var PL$9/*Callback*/;try{PL$9/*Callback*/ = Callback;}catch(e){};
var PL$10/*setTimeout*/;try{PL$10/*setTimeout*/ = setTimeout;}catch(e){};
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
  PL$6/*promiseland exception catcher*/(function(){
  
    ;
    PL$8/*c*/ = new PL$9/*Callback*/();
    PL$10/*setTimeout*/(PL$8/*c*/["callback"], 100);
    PL$8/*c*/["promise"].then(PL$6/*promiseland exception catcher*/(function(PL$11){PL$11;
    PL$4.resolve((PL$3/*par*/ + 1)); return;
    PL$4.resolve(); return;}), PL$7/*catch rejected*/);
    ;
  })();return PL$4;
  });
  ;
  var PL$12/*fourfun*/ = (function(){
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
  PL$15/*promiseland exception catcher*/(function(){
  
    ;
    PL$13.resolve(4); return;
    PL$13.resolve(); return;
  })();return PL$13;
  });
  ;
  return {
    "fun": (function(){
    var PL$17 = new __Promise();
    var PL$19/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$17.reject(e);
        };
      };
    };
    var PL$20/*catch rejected*/ = function(e){
      PL$17.reject(e);
    };
    var PL$21/*a*/;
    var PL$22/*i*/;
    PL$19/*promiseland exception catcher*/(function(){
    
      ;
      PL$21/*a*/ = 1;
      PL$22/*i*/ = 0;
      var PL$25 = new __Promise();
      var PL$24 = function(){var PL$26 = new __Promise();
      PL$12/*fourfun*/().then(PL$19/*promiseland exception catcher*/(function(PL$23){if((PL$22/*i*/ < PL$23)){
      PL$2/*somefun*/(PL$22/*i*/).then(PL$19/*promiseland exception catcher*/(function(PL$27){PL$22/*i*/ = PL$27;
      PL$21/*a*/ = (PL$21/*a*/ + 1);
      PL$26.resolve(true); return PL$26; /* continue */
      ;}), PL$20/*catch rejected*/);
      ;}else{
      PL$26.resolve(false); return PL$26; /* break */
      
      };
      }), PL$20/*catch rejected*/);
      ;PL$26;return PL$26;
      };
      var PL$28 = function(){PL$24().then(function(contLoop){
      if (contLoop){PL$28();}else{PL$25.resolve();};
      });
      };
      PL$28();
      PL$25.then(function(){;
      ;
      if((PL$21/*a*/ == 5)){
        PL$17.resolve(4); return;
      };
      ;
      PL$17.resolve(0); return;
      PL$17.resolve(); return;});
    })();return PL$17;
    })
  };
  ;})();
;return PL$1;
});
})();