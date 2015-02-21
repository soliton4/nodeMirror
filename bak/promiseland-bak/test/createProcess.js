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
var __requireFun = function(parModule){
      var returnPromise = new __Promise();
      try{__require([parModule], function(m){
        if (promiseland.isPromiseLandPromisingModule(m)){
          m.then(function(realm){returnPromise.resolve(realm);}, function(e){returnPromise.reject(e);});
        }else{
          returnPromise.resolve(m);
        };
        }, function(err){ returnPromise.reject(err); });
      }catch(e){ returnPromise.reject(e); };
      return returnPromise.promise;};
    var Callback = promiseland.Callback;
if (promiseland._hasModule({ hashStr: "7bcee4e8f400a6b3c39266689c1fbb58" })){ return promiseland._getModule("7bcee4e8f400a6b3c39266689c1fbb58"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "7bcee4e8f400a6b3c39266689c1fbb58", "module": PL$1, promising: true });
var PL$14/*console*/;try{PL$14/*console*/ = console;}catch(e){};
var PL$17/*Callback*/;try{PL$17/*Callback*/ = Callback;}catch(e){};
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
var PL$5/*child_process*/;
var PL$7/*spawn*/;
var PL$8/*fork*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  __requireFun("child_process").then(PL$3/*promiseland exception catcher*/(function(PL$6){PL$5/*child_process*/ = PL$6;
  PL$7/*spawn*/ = PL$5/*child_process*/["spawn"];
  PL$8/*fork*/ = PL$5/*child_process*/["fork"];
  PL$1.resolve((function(PL$9/*cmdStr*/, PL$10/*parAr*/, PL$11/*options*/){
  
    ;
    if(! PL$10/*parAr*/){
      PL$10/*parAr*/ = [
        
      ];
    };
    ;
    var PL$12/*child*/;
    ;
    if((PL$11/*options*/ && PL$11/*options*/["fork"])){
      PL$12/*child*/ = PL$8/*fork*/(PL$9/*cmdStr*/, PL$10/*parAr*/, PL$11/*options*/);
    }else{
    PL$12/*child*/ = PL$7/*spawn*/(PL$9/*cmdStr*/, PL$10/*parAr*/);
    };
    ;
    PL$12/*child*/["on"]("error", (function(PL$13/*err*/){
    
      ;
      PL$14/*console*/["log"]("spawn error:");
      PL$14/*console*/["log"](PL$13/*err*/);
      ;}));
    if(PL$12/*child*/["stdout"]){
      PL$12/*child*/["stdout"]["on"]("data", (function(PL$15/*data*/){
      
        ;
        PL$14/*console*/["log"](("stdout: " + PL$15/*data*/));
        ;}));
      PL$12/*child*/["stdout"]["on"]("error", (function(PL$15/*data*/){
      
        ;
        PL$14/*console*/["log"](("stdout error: " + PL$15/*data*/));
        ;}));
    };
    ;
    if(PL$12/*child*/["stderr"]){
      PL$12/*child*/["stderr"]["on"]("data", (function(PL$15/*data*/){
      
        ;
        PL$14/*console*/["log"](("stderr: " + PL$15/*data*/));
        ;}));
    };
    ;
    var PL$16/*cb*/ = new PL$17/*Callback*/();
    ;
    PL$12/*child*/["on"]("close", PL$16/*cb*/);
    var PL$18/*result*/ = (function(){
    var PL$19 = new __Promise();
    var PL$21/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$19.reject(e);
        };
      };
    };
    var PL$22/*catch rejected*/ = function(e){
      PL$19.reject(e);
    };
    PL$21/*promiseland exception catcher*/(function(){
    
      ;
      PL$16/*cb*/["promise"].then(PL$21/*promiseland exception catcher*/(function(PL$23){PL$19.resolve(PL$23[0]); return;
      PL$19.resolve(); return;}), PL$22/*catch rejected*/);
      ;
    })();return PL$19;
    });
    ;
    return {
      "child": PL$12/*child*/,
      "result": PL$18/*result*/()
    };
    ;})); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();