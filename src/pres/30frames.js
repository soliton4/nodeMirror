(function(){
  var defineFun;
  var requireFun;
  
  if (typeof exports == "object" && typeof module == "object"){ // CommonJS
    requireFun = function(modulesAr, callback){
      var i = 0;
      var l = modulesAr.length;
      var args = [];
      for (i; i < l; ++i){
        args.push(require(modulesAr[i]));
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
    requireFun = require;
    
  }else{ // Plain browser env
    alert("not working out!");
    
  };
  
defineFun(["promiseland"], function(promiseland){ var __require = requireFun;

  var __Promise = promiseland.Promise;
  var __modulePromise = new __Promise();
  var classSystem = promiseland.classSystem; 
  var __requireFun = function(parModule){
    var returnPromise = new __Promise();
    try{__require([parModule], function(m){
    if (promiseland.isPromiseLandPromisingModule(m)){
      m.then(function(realm){returnPromise.resolve(realm);}, function(e){returnPromise.reject(e);});
    }else{
      returnPromise.resolve(m);
    };
    });
    }catch(e){returnPromise.reject(e);};
  return returnPromise.promise;};
  var __classSystem = promiseland.classSystem;
  
  
var Callback = promiseland.Callback;
if (promiseland._hasModule({ hashStr: "7138c977051ba7eaacf6b8037e4a56ea" })){ return promiseland._getModule("7138c977051ba7eaacf6b8037e4a56ea"); };
var _V1 = new __Promise();
promiseland._registerModule({ hashStr: "7138c977051ba7eaacf6b8037e4a56ea", "module": _V1, promising: true });
var _V17/*Callback*/;try{_V17/*Callback*/ = Callback;}catch(e){};
var _V19/*__dirname*/;try{_V19/*__dirname*/ = __dirname;}catch(e){};
var _V24/*console*/;try{_V24/*console*/ = console;}catch(e){};
var _V22/*type:var*/ = __classSystem.getBuiltinType("var");
var _V2 = (function(){
"use strict";
var _V3 = function(code){ return function(res){ try{code(res);}catch(e){ _V1.reject(e); }; }; };
var _V4 = function(e){ _V1.reject(e); };
var _V5/*fs*/;
var _V11/*exFun*/;
var _V12/*serverFun*/;
var _V11/*exFun*/ = function(){
if (!promiseland.profileHas("server")){
var p = new __Promise();
p.reject({id: 14, msg: "function does not execute in this frame."});
return p;
};
var _V6 = new __Promise();
var _V8 = function(code){ return function(res){ try{code(res);}catch(e){ _V6.reject(e); }; }; };
var _V9 = function(e){ _V6.reject(e); };
_V8(function(){;
__requireFun("fs").then(_V8(function(_V10){_V5/*fs*/ = _V10;;
_V6.resolve(); return;;
}));})();
return _V6;
};
_V3(function(){;
_V5/*fs*/;
_V11/*exFun*/;
;
_V11/*exFun*/();;
_V12/*serverFun*/ = ((function(f){
promiseland.registerRemote("server", "7138c977051ba7eaacf6b8037e4a56ea", "_V21", f, _V22/*type:var*/);
if (promiseland.profileHas("server")){
return f;
}else{
return function(){
var _V23/*temp returnpromise*/ = new __Promise();

promiseland.remoteExec("7138c977051ba7eaacf6b8037e4a56ea", "_V21", arguments, _V23/*temp returnpromise*/);
return _V23/*temp returnpromise*/;
}
};
})(function(){
var _V13 = new __Promise();
var _V14 = function(code){ return function(res){ try{code(res);}catch(e){ _V13.reject(e); }; }; };
var _V15 = function(e){ _V13.reject(e); };
var _V16/*cb*/;
var _V18/*filenameStr*/;
_V14(function(){;
_V16/*cb*/ = new _V17/*Callback*/();
_V18/*filenameStr*/ = (_V19/*__dirname*/ + "/test.txt");
_V5/*fs*/["readFile"](_V18/*filenameStr*/, {"encoding": "utf8"}, _V16/*cb*/);;
_V16/*cb*/["promise"].then(_V14(function(_V20){_V13.resolve(_V20[1]); return;;
_V13.resolve(); return;;
}), _V15);
;})();
return _V13;
}));
_V12/*serverFun*/().then(_V3(function(_V25){_V24/*console*/["log"](_V25);;
_V1.resolve(); return;;
}), _V4);
;})();
return _V1;
})();
;;
return _V1});
})();