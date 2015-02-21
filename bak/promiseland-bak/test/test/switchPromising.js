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
if (promiseland._hasModule({ hashStr: "34a2b95271fad1ae02b401a78a5186a5" })){ return promiseland._getModule("34a2b95271fad1ae02b401a78a5186a5"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "34a2b95271fad1ae02b401a78a5186a5", "module": PL$1, promising: true });
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
var PL$5/*ps1*/;
var PL$14/*case2*/;
var PL$20/*a*/;
var PL$21/*c1*/;
var PL$22/*c2*/;
var PL$23/*f1*/;
var PL$24/*f2*/;
var PL$36/*x*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  PL$5/*ps1*/ = (function(){
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
  PL$14/*case2*/ = (function(){
  var PL$15 = new __Promise();
  var PL$17/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$15.reject(e);
      };
    };
  };
  var PL$18/*catch rejected*/ = function(e){
    PL$15.reject(e);
  };
  PL$17/*promiseland exception catcher*/(function(){
  
    ;
    PL$5/*ps1*/().then(PL$17/*promiseland exception catcher*/(function(PL$19){PL$19;
    PL$15.resolve(2); return;
    PL$15.resolve(); return;}), PL$18/*catch rejected*/);
    ;
  })();return PL$15;
  });
  PL$20/*a*/ = 1;
  PL$21/*c1*/;
  PL$22/*c2*/;
  PL$23/*f1*/;
  PL$24/*f2*/;
  var PL$25 = new __Promise();
  var PL$26/*discriminant*/ = PL$20/*a*/;
  var PL$28 = function(){PL$14/*case2*/().then(PL$3/*promiseland exception catcher*/(function(PL$35){if(PL$26/*discriminant*/ === PL$35){PL$27(); return; };
  PL$30()}), PL$4/*catch rejected*/);
  ;};
  var PL$27 = function(){
  PL$36/*x*/ = "label1";
  PL$23/*f1*/ = true;
  PL$29(); return;;};
  var PL$30 = function(){if(PL$26/*discriminant*/ === 1){PL$29(); return; };
  PL$32()};
  var PL$29 = function(){
  PL$21/*c1*/ = true;
  PL$31(); return;;};
  var PL$32 = function(){if(PL$26/*discriminant*/ === 3){PL$31(); return; };
  PL$34()};
  var PL$31 = function(){
  PL$22/*c2*/ = true;
  PL$25.resolve(); return;;
  PL$33(); return;;};
  var PL$34 = function(){if(PL$26/*discriminant*/ === 4){PL$33(); return; };
  PL$25.resolve(); return;};
  var PL$33 = function(){
  PL$24/*f2*/ = true;
  PL$25.resolve(); return;;};
  PL$28(); PL$25.then(function(){;
  ;
  if((PL$21/*c1*/ && PL$22/*c2*/)){
    if((! PL$23/*f1*/ && ! PL$24/*f2*/)){
      PL$1.resolve({
        "success": true
      }); return;
    };
    ;
  };
  ;
  PL$1.resolve({
    "success": false
  }); return;
  PL$1.resolve(); return;});
})();return PL$1;
})();
;;
return PL$1});
})();