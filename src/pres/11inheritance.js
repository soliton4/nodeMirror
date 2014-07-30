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
if (promiseland._hasModule({ hashStr: "b568444105105d036ff1e8bac606b74a" })){ return promiseland._getModule("b568444105105d036ff1e8bac606b74a"); };
var _V8/*console*/;try{_V8/*console*/ = console;}catch(e){};
var _V9/*type:var*/ = __classSystem.getBuiltinType("var");
var _V1 = (function(){
"use strict";
var _V3/*C1*/;
var _V6/*C2*/;
var _V7/*a*/;
;
_V3/*C1*/ = (function(){var _V2/*inherited*/ = {};
var res = promiseland.createClass({"a": (function(){
;
return 1;;
;
}),
"b": 3}, [], _V2/*inherited*/);
return res; })();_V3/*C1*/;;
_V6/*C2*/ = (function(){var _V4/*inherited*/ = {};
var res = promiseland.createClass({"a": (function(){
;
return (_V5/*inherited a*/.apply(this, []) + 1);;
;
})}, [_V3/*C1*/], _V4/*inherited*/);
var _V5/*inherited a*/ = _V4/*inherited*/["a"];
return res; })();_V6/*C2*/;;
_V7/*a*/ = new _V6/*C2*/();
_V8/*console*/["log"](_V7/*a*/["b"]);;
_V8/*console*/["log"](_V7/*a*/["a"]());;
;
})();
;promiseland._registerModule({ hashStr: "b568444105105d036ff1e8bac606b74a", "module": _V1, promising: false });
return _V1;
});
})();