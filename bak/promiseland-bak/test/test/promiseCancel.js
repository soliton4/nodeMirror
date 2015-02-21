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
if (promiseland._hasModule({ hashStr: "a12c7718386b905ee1f92a2f1bb071c8" })){ return promiseland._getModule("a12c7718386b905ee1f92a2f1bb071c8"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "a12c7718386b905ee1f92a2f1bb071c8", "module": PL$1, promising: true });
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
var PL$14/*cancelReason*/;
var PL$15/*runThrough*/;
var PL$26/*res*/;
function PL$5/*wait*/(){
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
var PL$10/*cb*/;
PL$8/*promiseland exception catcher*/(function(){

  ;
  PL$10/*cb*/ = new PL$11/*Callback*/();
  PL$12/*setTimeout*/(PL$10/*cb*/, 100);
  PL$10/*cb*/["promise"].then(PL$8/*promiseland exception catcher*/(function(PL$13){PL$13;
  PL$6.resolve(); return;}), PL$9/*catch rejected*/);
  ;
})();return PL$6;
};
function PL$16/*f*/(){
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
PL$19/*promiseland exception catcher*/(function(){

  ;
  var PL$21 = new __Promise();
  var PL$22 = new __Promise();
  var PL$23/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$22.resolve(e); }; }; };
  var PL$24 = function(e){ PL$22.resolve(e); };
  PL$23/*try catch*/(function(){
    PL$5/*wait*/().then(PL$23/*try catch*/(function(PL$25){PL$25;
    PL$17.resolve(); return;
    PL$21.resolve();}), PL$24);
  ;})();
  PL$22.then(PL$19/*promiseland exception catcher*/(function(__dummy){PL$21.resolve();}));
  PL$21.then(PL$19/*promiseland exception catcher*/(function(){;
  ;
  PL$15/*runThrough*/ = true;
  PL$17.resolve(); return;}), PL$20/*catch rejected*/)
})();return PL$17;
};
PL$3/*promiseland exception catcher*/(function(){

  ;
  /* function wait (){} - hoisted */;
  PL$14/*cancelReason*/;
  PL$15/*runThrough*/;
  /* function f (){} - hoisted */;
  ;
  PL$26/*res*/ = PL$16/*f*/();
  PL$26/*res*/["cancel"](4);
  PL$5/*wait*/().then(PL$3/*promiseland exception catcher*/(function(PL$27){PL$27;
  PL$5/*wait*/().then(PL$3/*promiseland exception catcher*/(function(PL$28){PL$28;
  if((PL$14/*cancelReason*/ != 4)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  if(PL$15/*runThrough*/){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  PL$1.resolve({
    "success": true
  }); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();