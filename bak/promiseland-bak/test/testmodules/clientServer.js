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
if (promiseland._hasModule({ hashStr: "89342948269bd1a24ae0574b30c9497c" })){ return promiseland._getModule("89342948269bd1a24ae0574b30c9497c"); };
var PL$16/*console*/;try{PL$16/*console*/ = console;}catch(e){};
var PL$18/*Callback*/;try{PL$18/*Callback*/ = Callback;}catch(e){};
var PL$20/*__dirname*/;try{PL$20/*__dirname*/ = __dirname;}catch(e){};
var PL$23/*setTimeout*/;try{PL$23/*setTimeout*/ = setTimeout;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*fs*/;
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
    __requireFun("fs").then(PL$5/*promiseland exception catcher*/(function(PL$7){PL$2/*fs*/ = PL$7;
    PL$3.resolve(); return;}), PL$6/*catch rejected*/);
    ;
  })();return PL$3;
  })();
  var PL$8/*x*/ = ((function(f){
  promiseland.registerRemote("server", "89342948269bd1a24ae0574b30c9497c", "PL$22", f, classSystem.getBuiltinType("var"));
  if (promiseland.profileHas("server")){
  return function(){
  var i = 0; var l = arguments.length; var newArgs = [undefined];
  for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
  return f.apply(this, newArgs);
  };
  }else{
  return function(){
  return promiseland.remoteExec("89342948269bd1a24ae0574b30c9497c", "PL$22", arguments);
  }
  };
  })(function(PL$9/*session*/, PL$10/*par1*/, PL$11/*par2*/){
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
  var PL$17/*cb*/;
  var PL$19/*filenameStr*/;
  PL$14/*promiseland exception catcher*/(function(){
  
    ;
    PL$16/*console*/["log"]("doing the request");
    PL$17/*cb*/ = new PL$18/*Callback*/();
    PL$19/*filenameStr*/ = (PL$20/*__dirname*/ + "/test.txt");
    PL$16/*console*/["log"](PL$10/*par1*/);
    PL$16/*console*/["log"](PL$11/*par2*/);
    PL$2/*fs*/["readFile"](PL$19/*filenameStr*/, {
      "encoding": "utf8"
    }, PL$17/*cb*/);
    PL$17/*cb*/["promise"].then(PL$14/*promiseland exception catcher*/(function(PL$21){PL$12.resolve(PL$21[1]); return;
    PL$12.resolve(); return;}), PL$15/*catch rejected*/);
    ;
  })();return PL$12;
  }));
  ;
  PL$23/*setTimeout*/((function(){
  var PL$24 = new __Promise();
  var PL$26/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$24.reject(e);
      };
    };
  };
  var PL$27/*catch rejected*/ = function(e){
    PL$24.reject(e);
  };
  PL$26/*promiseland exception catcher*/(function(){
  
    ;
    PL$8/*x*/("par1", {
      "par": "2"
    }).then(PL$26/*promiseland exception catcher*/(function(PL$28){PL$16/*console*/["log"](PL$28);
    PL$24.resolve(); return;}), PL$27/*catch rejected*/);
    ;
  })();return PL$24;
  }), 1000);
  ;})();
;return PL$1;
});
})();