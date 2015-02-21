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
if (promiseland._hasModule({ hashStr: "16f719639b8b7ffd2a1f279569fb858b" })){ return promiseland._getModule("16f719639b8b7ffd2a1f279569fb858b"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "16f719639b8b7ffd2a1f279569fb858b", "module": PL$1, promising: true });
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
var PL$6/*namesStr*/;
var PL$7/*cnt*/;
var PL$8/*p*/;
var PL$9/*i*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  PL$5/*a*/ = {
    "a": 1,
    "b": 2,
    "c": 3
  };
  PL$6/*namesStr*/ = "";
  PL$7/*cnt*/ = 0;
  PL$8/*p*/;
  var PL$10 = [];for(PL$9/*i*/ in PL$5/*a*/){PL$10.push(PL$9/*i*/);};PL$9/*i*/ = PL$10[0];var PL$11 = 0;var PL$13 = new __Promise();
  var PL$12 = function(){var PL$14 = new __Promise();
  if(PL$11 < PL$10.length){
  PL$6/*namesStr*/ += PL$9/*i*/;
  PL$7/*cnt*/ += PL$5/*a*/[PL$9/*i*/];
  
  var PL$15 = new __Promise();if(false){
    PL$8/*p*/.then(PL$3/*promiseland exception catcher*/(function(PL$16){PL$16;
    PL$15.resolve();;}), PL$4/*catch rejected*/);
    ;
  }else{PL$15.resolve();
  };PL$15.then(PL$3/*promiseland exception catcher*/(function(PL$17){PL$17;;
  ;
  PL$14.resolve(true); return PL$14; /* continue */
  ;}), PL$4/*catch rejected*/);
  ;}else{
  PL$14.resolve(false); return PL$14; /* break */
  
  };
  PL$14;return PL$14;
  };
  var PL$18 = function(){PL$12().then(function(contLoop){
  if (contLoop){PL$11++;PL$9/*i*/ = PL$10[PL$11];;PL$18();}else{PL$13.resolve();};
  });
  };
  PL$18();
  PL$13.then(function(){;
  ;
  if((PL$6/*namesStr*/["length"] != 3)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  if((PL$7/*cnt*/ != 6)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  PL$1.resolve({
    "success": true
  }); return;
  PL$1.resolve(); return;});
})();return PL$1;
})();
;;
return PL$1});
})();