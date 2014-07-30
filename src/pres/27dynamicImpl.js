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
if (promiseland._hasModule({ hashStr: "059d71f06ceb2a4499659d6a146f962b" })){ return promiseland._getModule("059d71f06ceb2a4499659d6a146f962b"); };
var _V1 = new __Promise();
promiseland._registerModule({ hashStr: "059d71f06ceb2a4499659d6a146f962b", "module": _V1, promising: true });
var _V22/*type:var*/ = __classSystem.getBuiltinType("var");
var _V2 = (function(){
"use strict";
var _V3 = function(code){ return function(res){ try{code(res);}catch(e){ _V1.reject(e); }; }; };
var _V4 = function(e){ _V1.reject(e); };
var _V5/*src*/;
var _V7/*fun*/;
_V3(function(){;
__requireFun("./26dynamicSrc").then(_V3(function(_V6){_V5/*src*/ = _V6;
_V7/*fun*/ = ((function(){var _V8/*type:C1*/ = _V5/*src*/["C1"];
var _V9/*C1*/ = _V8/*type:C1*/
;var _V10/*C1-constructor*/ = undefined;
classSystem.readyPromise(_V8/*type:C1*/).then(function(parType){_V8/*type:C1*/ = parType;_V10/*C1-constructor*/ = classSystem.getTypeConstructor(_V8/*type:C1*/);});var _V11/*type:C2*/ = _V5/*src*/["C2"];
var _V12/*C2*/ = _V11/*type:C2*/
;var _V13/*C2-constructor*/ = undefined;
classSystem.readyPromise(_V11/*type:C2*/).then(function(parType){_V11/*type:C2*/ = parType;_V13/*C2-constructor*/ = classSystem.getTypeConstructor(_V11/*type:C2*/);});var communicator = {fun: undefined};
var /*extratyperender*/ _V16/*type:C2::temporaryTracked*/ = classSystem._createTemporaryTrackedClass(_V11/*type:C2*/);
var /*extratyperender*/ _V18/*type:C2::temporaryTracked::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(_V16/*type:C2::temporaryTracked*/);
var /*extratyperender*/ _V17/*type:C2::property::constructor*/ = classSystem.getConstructorType({"type":_V11/*type:C2*/, property: "constructor"});
var /*extratyperender*/ _V19/*type:C2::property::m*/ = classSystem.getPropertyType({"type":_V11/*type:C2*/, property: "m"});
var /*extratyperender*/ _V20/*type:C2::property::m::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(_V19/*type:C2::property::m*/);
var /*extratyperender*/ _V21/*type:C2::property::m::temporaryTrackedResolved::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(_V20/*type:C2::property::m::temporaryTrackedResolved*/);
eval("communicator.fun = function(){\n" + classSystem.getDeclareVariableCode({"type":_V8/*type:C1*/, "name":"_V14/*v*/"}) + "" + classSystem.getDeclareVariableCode({"type":_V11/*type:C2*/, "name":"_V15/*instance*/"}) + "" + ((classSystem.isTrackedClass(_V8/*type:C1*/) && classSystem.isTrackedClass(_V11/*type:C2*/)) ? ("try{") : ("")) + ";\n_V14/*v*/;\n" + classSystem.getSetVariableCode({"instance":"_V15/*instance*/", "type":_V11/*type:C2*/, "value":"new _V13/*C2-constructor*/()", "valueType":_V16/*type:C2::temporaryTracked*/, "operator":"=", "assignmentType":"Identifier"}) + ";\n" + classSystem.getDestroyTemporaryClassCode({"value":"" + classSystem.getSetVariableCode({"instance":"_V14/*v*/", "type":_V8/*type:C1*/, "value":"" + classSystem.getGetPropertyCode({"instance":"_V15/*instance*/", "type":_V11/*type:C2*/, "property":"m"}) + "", "valueType":_V19/*type:C2::property::m*/, "operator":"=", "assignmentType":"Identifier"}) + "", "valueType":_V20/*type:C2::property::m::temporaryTrackedResolved*/}) + ";;\n" + ((classSystem.isTrackedClass(_V8/*type:C1*/) && classSystem.isTrackedClass(_V11/*type:C2*/)) ? ("" + ((classSystem.isTrackedClass(_V8/*type:C1*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V8/*type:C1*/, "name":"_V14/*v*/"}) + "") : ("")) + "" + ((classSystem.isTrackedClass(_V11/*type:C2*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V11/*type:C2*/, "name":"_V15/*instance*/"}) + "") : ("")) + "") : ("")) + "" + ((classSystem.isTrackedClass(_V8/*type:C1*/) && classSystem.isTrackedClass(_V11/*type:C2*/)) ? ("}catch(e){" + ((classSystem.isTrackedClass(_V8/*type:C1*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V8/*type:C1*/, "name":"_V14/*v*/"}) + "") : ("")) + "" + ((classSystem.isTrackedClass(_V11/*type:C2*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V11/*type:C2*/, "name":"_V15/*instance*/"}) + "") : ("")) + "throw e};") : ("")) + ";\n};"); return communicator.fun; })());
_V7/*fun*/();;
_V1.resolve(); return;;
}));})();
return _V1;
})();
;;
return _V1});
})();