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
if (promiseland._hasModule({ hashStr: "9f2bfe7de73bd330103c1112cef8efc3" })){ return promiseland._getModule("9f2bfe7de73bd330103c1112cef8efc3"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "9f2bfe7de73bd330103c1112cef8efc3", "module": PL$1, promising: true });
var PL$12/*domoreStuff*/;try{PL$12/*domoreStuff*/ = domoreStuff;}catch(e){};
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
var PL$6/*dootherStuff*/;
var PL$7/*dostuff*/;
var PL$13/*x*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  PL$5/*result*/ = {
    "res": 1
  };
  PL$6/*dootherStuff*/ = (function(){
  
    ;
    PL$5/*result*/["res"] = 4;
    ;});
  PL$7/*dostuff*/ = (function(){
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
  PL$10/*promiseland exception catcher*/(function(){
  
    ;
    PL$8.resolve(PL$12/*domoreStuff*/()); return;
    PL$8.resolve(); return;
  })();return PL$8;
  });
  PL$13/*x*/ = (function(){
  var PL$14 = new __Promise();
  var PL$16/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$14.reject(e);
      };
    };
  };
  var PL$17/*catch rejected*/ = function(e){
    PL$14.reject(e);
  };
  PL$16/*promiseland exception catcher*/(function(){
  
    ;
    var PL$18 = new __Promise();
    var PL$19 = new __Promise();
    var PL$20/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$19.resolve(e); }; }; };
    var PL$21 = function(e){ PL$19.resolve(e); };
    PL$20/*try catch*/(function(){
      PL$7/*dostuff*/().then(PL$20/*try catch*/(function(PL$22){PL$22;
      PL$18.resolve();}), PL$21);
    ;})();
    PL$19.then(PL$16/*promiseland exception catcher*/(function(PL$23/*e*/){
      PL$6/*dootherStuff*/();
      PL$18.resolve();;}));
    PL$18.then(PL$16/*promiseland exception catcher*/(function(){;
    ;
    PL$14.resolve(); return;}), PL$17/*catch rejected*/)
  })();return PL$14;
  });
  PL$13/*x*/().then(PL$3/*promiseland exception catcher*/(function(PL$24){PL$24;
  PL$1.resolve(PL$5/*result*/); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();