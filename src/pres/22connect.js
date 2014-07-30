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
if (promiseland._hasModule({ hashStr: "29cd8181c12dd07c75f84b3ca042a1c3" })){ return promiseland._getModule("29cd8181c12dd07c75f84b3ca042a1c3"); };
var _V13/*console*/;try{_V13/*console*/ = console;}catch(e){};
var _V9/*type:var*/ = __classSystem.getBuiltinType("var");
var _V1 = (function(){
"use strict";
var _V3/*Emitter*/;
var _V6/*Reciever*/;
var _V10/*e*/;
var _V11/*r*/;
var _V12/*c*/;
var _V2/*type:Emitter*/ = classSystem._createProvisionalClass();
_V3/*Emitter*/ = _V2/*type:Emitter*/;
var _V4/*Emitter-constructor*/ = undefined;classSystem.readyPromise(_V2/*type:Emitter*/).then(function(parType){_V2/*type:Emitter*/ = parType;_V4/*Emitter-constructor*/ = classSystem.getTypeConstructor(_V2/*type:Emitter*/);});var _V5/*type:Reciever*/ = classSystem._createProvisionalClass();
_V6/*Reciever*/ = _V5/*type:Reciever*/;
var _V7/*Reciever-constructor*/ = undefined;classSystem.readyPromise(_V5/*type:Reciever*/).then(function(parType){_V5/*type:Reciever*/ = parType;_V7/*Reciever-constructor*/ = classSystem.getTypeConstructor(_V5/*type:Reciever*/);});;
classSystem._resolveProvisional(_V2/*type:Emitter*/, classSystem.createClass({members: [{"name":"event","type":_V9/*type:var*/}], "extends": [], "hasFreePart": true}, {"event": (function(_V8/*amount*/){
;
;
})}));_V3/*Emitter*/;;
classSystem._resolveProvisional(_V5/*type:Reciever*/, classSystem.createClass({members: [{"name":"eventSlot","type":_V9/*type:var*/},{"name":"amount","type":_V9/*type:var*/}], "extends": [], "hasFreePart": true}, {"eventSlot": (function(_V8/*amount*/){
;
this[4] += _V8/*amount*/;;
;
}), "amount": 1}));_V6/*Reciever*/;;
_V10/*e*/ = new _V4/*Emitter-constructor*/();
_V11/*r*/ = new _V7/*Reciever-constructor*/();
_V12/*c*/ = _V10/*e*/[2](3, _V11/*r*/[3], _V11/*r*/);
_V10/*e*/[3](2);;
_V13/*console*/["log"](_V11/*r*/[4]);;
;
})();
;promiseland._registerModule({ hashStr: "29cd8181c12dd07c75f84b3ca042a1c3", "module": _V1, promising: false });
return _V1;
});
})();