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
var classSystem = promiseland.classSystem;
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
if (promiseland._hasModule({ hashStr: "120e06c54cdf04aabe8fa91a75678f0e" })){ return promiseland._getModule("120e06c54cdf04aabe8fa91a75678f0e"); };
var PL$8/*console*/;try{PL$8/*console*/ = console;}catch(e){};
var PL$15/*__dirname*/;try{PL$15/*__dirname*/ = __dirname;}catch(e){};
var PL$26/*Callback*/;try{PL$26/*Callback*/ = Callback;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*cp*/;
  ;
  (function(){
  if (!promiseland.profileHas("server")){
  var p = new __Promise();
  p.reject({id: 14, msg: "function does not execute in this frame."});
  return p;
  };
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
    __requireFun("../createProcess").then(PL$5/*promiseland exception catcher*/(function(PL$7){PL$2/*cp*/ = PL$7;
    PL$3.resolve(); return;}), PL$6/*catch rejected*/);
    ;
  })();return PL$3;
  })();
  PL$8/*console*/["log"]("loaded");
  var PL$9/*runTests*/ = ((function(f){
  promiseland.registerRemote("server", "120e06c54cdf04aabe8fa91a75678f0e", "PL$29", f, classSystem.getBuiltinType("var"));
  if (promiseland.profileHas("server")){
  return function(){
  var i = 0; var l = arguments.length; var newArgs = [undefined];
  for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
  return f.apply(this, newArgs);
  };
  }else{
  return function(){
  return promiseland.remoteExec("120e06c54cdf04aabe8fa91a75678f0e", "PL$29", arguments);
  }
  };
  })(function(PL$10/*session*/){
  var PL$11 = new __Promise();
  var PL$13/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$11.reject(e);
      };
    };
  };
  var PL$14/*catch rejected*/ = function(e){
    PL$11.reject(e);
  };
  var PL$24/*ts*/;
  var PL$25/*cb*/;
  PL$13/*promiseland exception catcher*/(function(){
  
    ;
    PL$8/*console*/["log"]("running tests");
    PL$8/*console*/["log"]("copy promiseland");
    PL$2/*cp*/("cp", [
      (PL$15/*__dirname*/ + "/../../../promiseland/promiseland.js"), 
      (PL$15/*__dirname*/ + "/../node_modules/promiseland/")
    ])["result"].then(PL$13/*promiseland exception catcher*/(function(PL$16){PL$8/*console*/["log"](PL$16);
    PL$2/*cp*/("cp", [
      (PL$15/*__dirname*/ + "/../../../promiseland/package.json"), 
      (PL$15/*__dirname*/ + "/../node_modules/promiseland/")
    ])["result"].then(PL$13/*promiseland exception catcher*/(function(PL$17){PL$8/*console*/["log"](PL$17);
    PL$2/*cp*/("cp", [
      (PL$15/*__dirname*/ + "/../../../promiseland/modules"), 
      (PL$15/*__dirname*/ + "/../node_modules/promiseland/"), 
      "-R"
    ])["result"].then(PL$13/*promiseland exception catcher*/(function(PL$18){PL$8/*console*/["log"](PL$18);
    PL$8/*console*/["log"]("running compileall");
    PL$2/*cp*/("node", [
      "compileAll.js"
    ])["result"].then(PL$13/*promiseland exception catcher*/(function(PL$19){PL$8/*console*/["log"](PL$19);
    PL$8/*console*/["log"]("starting tests");
    var PL$20 = new __Promise();
    var PL$21 = new __Promise();
    var PL$22/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$21.resolve(e); }; }; };
    var PL$23 = function(e){ PL$21.resolve(e); };
    PL$22/*try catch*/(function(){
      PL$24/*ts*/ = PL$2/*cp*/("./testServer", [
        
      ], {
        "fork": true
      });
      PL$25/*cb*/ = new PL$26/*Callback*/();
      PL$24/*ts*/["child"]["on"]("message", PL$25/*cb*/);
      PL$25/*cb*/["promise"].then(PL$22/*try catch*/(function(PL$27){PL$11.resolve(PL$27[0]); return;
      PL$20.resolve();}), PL$23);
    ;})();
    PL$21.then(PL$13/*promiseland exception catcher*/(function(PL$28/*e*/){
      PL$8/*console*/["log"]("error");
      PL$8/*console*/["log"](PL$28/*e*/);
      PL$11.resolve({
        "failed": true
      }); return;
      PL$20.resolve();;}));
    PL$20.then(PL$13/*promiseland exception catcher*/(function(){;
    ;
    PL$11.resolve(); return;}), PL$14/*catch rejected*/)}), PL$14/*catch rejected*/);
    ;}), PL$14/*catch rejected*/);
    ;}), PL$14/*catch rejected*/);
    ;}), PL$14/*catch rejected*/);
    ;
  })();return PL$11;
  }));
  ;
  return {
    "runTests": PL$9/*runTests*/
  };
  ;})();
;return PL$1;
});
})();