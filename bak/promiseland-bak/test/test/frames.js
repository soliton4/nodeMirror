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
    if (promiseland._hasModule({ hashStr: "cae0507e04a7312601e16db3b4c02736" })){ return promiseland._getModule("cae0507e04a7312601e16db3b4c02736"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "cae0507e04a7312601e16db3b4c02736", "module": PL$1, promising: true });
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
var PL$12/*getter*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
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
    __requireFun("fs").then(PL$8/*promiseland exception catcher*/(function(PL$10){PL$6.resolve(PL$10); return;
    PL$6.resolve(); return;}), PL$9/*catch rejected*/);
    ;
  })();return PL$6;
  })().then(PL$3/*promiseland exception catcher*/(function(PL$11){PL$5/*fs*/ = PL$11;
  PL$12/*getter*/ = ((function(f){
  promiseland.registerRemote("server", "cae0507e04a7312601e16db3b4c02736", "PL$18", f, classSystem.getBuiltinType("var"));
  if (promiseland.profileHas("server")){
  return function(){
  var i = 0; var l = arguments.length; var newArgs = [undefined];
  for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
  return f.apply(this, newArgs);
  };
  }else{
  return function(){
  return promiseland.remoteExec("cae0507e04a7312601e16db3b4c02736", "PL$18", arguments);
  }
  };
  })(function(PL$13/*session*/){
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
    PL$14.resolve(PL$5/*fs*/["readFile"]("somefile.txt")); return;
    PL$14.resolve(); return;
  })();return PL$14;
  }));
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();