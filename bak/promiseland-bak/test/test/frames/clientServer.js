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
if (promiseland._hasModule({ hashStr: "305873103956dbcac355c242894d9641" })){ return promiseland._getModule("305873103956dbcac355c242894d9641"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "305873103956dbcac355c242894d9641", "module": PL$1, promising: true });
var PL$18/*Callback*/;try{PL$18/*Callback*/ = Callback;}catch(e){};
var PL$20/*__dirname*/;try{PL$20/*__dirname*/ = __dirname;}catch(e){};
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
var PL$5/*fs*/;
var PL$11/*x*/;
var PL$23/*res*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  PL$5/*fs*/;
  (function(){
  if (!promiseland.profileHas("server")){
  var p = new __Promise();
  p.reject({id: 14, msg: "function does not execute in this frame."});
  return p;
  };
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
    __requireFun("fs").then(PL$8/*promiseland exception catcher*/(function(PL$10){PL$5/*fs*/ = PL$10;
    PL$6.resolve(); return;}), PL$9/*catch rejected*/);
    ;
  })();return PL$6;
  })();
  PL$11/*x*/ = ((function(f){
  promiseland.registerRemote("server", "305873103956dbcac355c242894d9641", "PL$22", f, classSystem.getBuiltinType("var"));
  if (promiseland.profileHas("server")){
  return function(){
  var i = 0; var l = arguments.length; var newArgs = [undefined];
  for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
  return f.apply(this, newArgs);
  };
  }else{
  return function(){
  return promiseland.remoteExec("305873103956dbcac355c242894d9641", "PL$22", arguments);
  }
  };
  })(function(PL$12/*session*/){
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
  var PL$17/*cb*/;
  var PL$19/*filenameStr*/;
  PL$15/*promiseland exception catcher*/(function(){
  
    ;
    PL$17/*cb*/ = new PL$18/*Callback*/();
    PL$19/*filenameStr*/ = (PL$20/*__dirname*/ + "/clientServer.txt");
    PL$5/*fs*/["readFile"](PL$19/*filenameStr*/, {
      "encoding": "utf8"
    }, PL$17/*cb*/);
    PL$17/*cb*/["promise"].then(PL$15/*promiseland exception catcher*/(function(PL$21){PL$13.resolve(PL$21[1]); return;
    PL$13.resolve(); return;}), PL$16/*catch rejected*/);
    ;
  })();return PL$13;
  }));
  PL$11/*x*/().then(PL$3/*promiseland exception catcher*/(function(PL$24){PL$23/*res*/ = PL$24;
  if((PL$23/*res*/ == "the test content")){
    PL$1.resolve({
      "success": true
    }); return;
  };
  ;
  PL$1.resolve({
    "success": false
  }); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();