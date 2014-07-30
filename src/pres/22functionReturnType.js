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
if (promiseland._hasModule({ hashStr: "4c55d9b7ac7d9fa7e323485efa0206bf" })){ return promiseland._getModule("4c55d9b7ac7d9fa7e323485efa0206bf"); };
var _V8/*console*/;try{_V8/*console*/ = console;}catch(e){};
var _V5/*type:var*/ = __classSystem.getBuiltinType("var");
var _V1 = (function(){
"use strict";
var _V3/*C1*/;
var _V6/*typedFun*/;
var _V7/*v*/;
var _V2/*type:C1*/ = classSystem._createProvisionalClass();
_V3/*C1*/ = _V2/*type:C1*/;
var _V4/*C1-constructor*/ = undefined;classSystem.readyPromise(_V2/*type:C1*/).then(function(parType){_V2/*type:C1*/ = parType;_V4/*C1-constructor*/ = classSystem.getTypeConstructor(_V2/*type:C1*/);});var _V6/*typedFun*/ = function(){
;
return new _V4/*C1-constructor*/();;
;
};
;
classSystem._resolveProvisional(_V2/*type:C1*/, classSystem.createClass({members: [{"name":"a","type":_V5/*type:var*/}], "extends": [], "hasFreePart": true}, {"a": 1}));_V3/*C1*/;;
_V6/*typedFun*/;
;
_V7/*v*/ = _V6/*typedFun*/();
_V8/*console*/["log"](_V7/*v*/[3]);;
;
})();
;promiseland._registerModule({ hashStr: "4c55d9b7ac7d9fa7e323485efa0206bf", "module": _V1, promising: false });
return _V1;
});
})();