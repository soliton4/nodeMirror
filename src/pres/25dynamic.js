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
if (promiseland._hasModule({ hashStr: "408dabd9b9ab807c014491f847755de1" })){ return promiseland._getModule("408dabd9b9ab807c014491f847755de1"); };
var _V29/*console*/;try{_V29/*console*/ = console;}catch(e){};
var _V8/*type:var*/ = __classSystem.getBuiltinType("var");
var _V1 = (function(){
"use strict";
var _V3/*T1*/;
var _V6/*T2*/;
var _V9/*a*/;
var _V26/*b*/;
var _V2/*type:T1*/ = classSystem._createProvisionalClass();
_V3/*T1*/ = _V2/*type:T1*/;
var _V4/*T1-constructor*/ = undefined;classSystem.readyPromise(_V2/*type:T1*/).then(function(parType){_V2/*type:T1*/ = parType;_V4/*T1-constructor*/ = classSystem.getTypeConstructor(_V2/*type:T1*/);});var _V5/*type:T2*/ = classSystem._createProvisionalClass();
_V6/*T2*/ = _V5/*type:T2*/;
var _V7/*T2-constructor*/ = undefined;classSystem.readyPromise(_V5/*type:T2*/).then(function(parType){_V5/*type:T2*/ = parType;_V7/*T2-constructor*/ = classSystem.getTypeConstructor(_V5/*type:T2*/);});;
classSystem._resolveProvisional(_V2/*type:T1*/, classSystem.createClass({members: [{"name":"a","type":_V8/*type:var*/},{"name":"b","type":_V8/*type:var*/}], "extends": [], "hasFreePart": true}, {"a": 1, "b": 2}));_V3/*T1*/;;
classSystem._resolveProvisional(_V5/*type:T2*/, classSystem.createClass({members: [{"name":"a","type":_V8/*type:var*/},{"name":"b","type":_V8/*type:var*/}], "extends": [], "hasFreePart": true}, {"a": 3, "b": 4}));_V6/*T2*/;;
_V9/*a*/ = ((function(){var _V10/*type:Tx*/ = _V3/*T1*/;
var _V11/*Tx*/ = _V10/*type:Tx*/
;var _V12/*Tx-constructor*/ = undefined;
classSystem.readyPromise(_V10/*type:Tx*/).then(function(parType){_V10/*type:Tx*/ = parType;_V12/*Tx-constructor*/ = classSystem.getTypeConstructor(_V10/*type:Tx*/);});var _V13/*type:Ty*/ = _V3/*T1*/;
var _V14/*Ty*/ = _V13/*type:Ty*/
;var _V15/*Ty-constructor*/ = undefined;
classSystem.readyPromise(_V13/*type:Ty*/).then(function(parType){_V13/*type:Ty*/ = parType;_V15/*Ty-constructor*/ = classSystem.getTypeConstructor(_V13/*type:Ty*/);});var communicator = {fun: undefined};
var /*extratyperender*/ _V17/*type:Tx::temporaryTracked*/ = classSystem._createTemporaryTrackedClass(_V10/*type:Tx*/);
var /*extratyperender*/ _V19/*type:Tx::temporaryTracked::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(_V17/*type:Tx::temporaryTracked*/);
var /*extratyperender*/ _V18/*type:Tx::property::constructor*/ = classSystem.getConstructorType({"type":_V10/*type:Tx*/, property: "constructor"});
var /*extratyperender*/ _V21/*type:Ty::temporaryTracked*/ = classSystem._createTemporaryTrackedClass(_V13/*type:Ty*/);
var /*extratyperender*/ _V23/*type:Ty::temporaryTracked::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(_V21/*type:Ty::temporaryTracked*/);
var /*extratyperender*/ _V22/*type:Ty::property::constructor*/ = classSystem.getConstructorType({"type":_V13/*type:Ty*/, property: "constructor"});
var /*extratyperender*/ _V24/*type:Ty::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(_V13/*type:Ty*/);
var /*extratyperender*/ _V25/*type:Ty::temporaryTrackedResolved::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(_V24/*type:Ty::temporaryTrackedResolved*/);
eval("communicator.fun = function(){\n" + classSystem.getDeclareVariableCode({"type":_V10/*type:Tx*/, "name":"_V16/*x*/"}) + "" + classSystem.getDeclareVariableCode({"type":_V13/*type:Ty*/, "name":"_V20/*y*/"}) + "" + ((classSystem.isTrackedClass(_V10/*type:Tx*/) && classSystem.isTrackedClass(_V13/*type:Ty*/)) ? ("try{") : ("")) + ";\n" + classSystem.getSetVariableCode({"instance":"_V16/*x*/", "type":_V10/*type:Tx*/, "value":"new _V12/*Tx-constructor*/()", "valueType":_V17/*type:Tx::temporaryTracked*/, "operator":"=", "assignmentType":"Identifier"}) + ";\n" + classSystem.getSetVariableCode({"instance":"_V20/*y*/", "type":_V13/*type:Ty*/, "value":"new _V15/*Ty-constructor*/()", "valueType":_V21/*type:Ty::temporaryTracked*/, "operator":"=", "assignmentType":"Identifier"}) + ";\n" + classSystem.getDestroyTemporaryClassCode({"value":"" + classSystem.getSetVariableCode({"instance":"_V16/*x*/", "type":_V10/*type:Tx*/, "value":"_V20/*y*/", "valueType":_V13/*type:Ty*/, "operator":"=", "assignmentType":"Identifier"}) + "", "valueType":_V24/*type:Ty::temporaryTrackedResolved*/}) + ";;\n" + ((classSystem.isTrackedClass(_V10/*type:Tx*/) && classSystem.isTrackedClass(_V13/*type:Ty*/)) ? ("" + ((classSystem.isTrackedClass(_V10/*type:Tx*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V10/*type:Tx*/, "name":"_V16/*x*/"}) + "") : ("")) + "" + ((classSystem.isTrackedClass(_V13/*type:Ty*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V13/*type:Ty*/, "name":"_V20/*y*/"}) + "") : ("")) + "") : ("")) + "" + ((classSystem.isTrackedClass(_V10/*type:Tx*/) && classSystem.isTrackedClass(_V13/*type:Ty*/)) ? ("}catch(e){" + ((classSystem.isTrackedClass(_V10/*type:Tx*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V10/*type:Tx*/, "name":"_V16/*x*/"}) + "") : ("")) + "" + ((classSystem.isTrackedClass(_V13/*type:Ty*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V13/*type:Ty*/, "name":"_V20/*y*/"}) + "") : ("")) + "throw e};") : ("")) + ";\n};"); return communicator.fun; })());
_V26/*b*/ = ((function(){var _V10/*type:Tx*/ = _V3/*T1*/;
var _V11/*Tx*/ = _V10/*type:Tx*/
;var _V27/*Tx-constructor*/ = undefined;
classSystem.readyPromise(_V10/*type:Tx*/).then(function(parType){_V10/*type:Tx*/ = parType;_V27/*Tx-constructor*/ = classSystem.getTypeConstructor(_V10/*type:Tx*/);});var _V13/*type:Ty*/ = _V6/*T2*/;
var _V14/*Ty*/ = _V13/*type:Ty*/
;var _V28/*Ty-constructor*/ = undefined;
classSystem.readyPromise(_V13/*type:Ty*/).then(function(parType){_V13/*type:Ty*/ = parType;_V28/*Ty-constructor*/ = classSystem.getTypeConstructor(_V13/*type:Ty*/);});var communicator = {fun: undefined};
var /*extratyperender*/ _V17/*type:Tx::temporaryTracked*/ = classSystem._createTemporaryTrackedClass(_V10/*type:Tx*/);
var /*extratyperender*/ _V19/*type:Tx::temporaryTracked::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(_V17/*type:Tx::temporaryTracked*/);
var /*extratyperender*/ _V18/*type:Tx::property::constructor*/ = classSystem.getConstructorType({"type":_V10/*type:Tx*/, property: "constructor"});
var /*extratyperender*/ _V21/*type:Ty::temporaryTracked*/ = classSystem._createTemporaryTrackedClass(_V13/*type:Ty*/);
var /*extratyperender*/ _V23/*type:Ty::temporaryTracked::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(_V21/*type:Ty::temporaryTracked*/);
var /*extratyperender*/ _V22/*type:Ty::property::constructor*/ = classSystem.getConstructorType({"type":_V13/*type:Ty*/, property: "constructor"});
var /*extratyperender*/ _V24/*type:Ty::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(_V13/*type:Ty*/);
var /*extratyperender*/ _V25/*type:Ty::temporaryTrackedResolved::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(_V24/*type:Ty::temporaryTrackedResolved*/);
eval("communicator.fun = function(){\n" + classSystem.getDeclareVariableCode({"type":_V10/*type:Tx*/, "name":"_V16/*x*/"}) + "" + classSystem.getDeclareVariableCode({"type":_V13/*type:Ty*/, "name":"_V20/*y*/"}) + "" + ((classSystem.isTrackedClass(_V10/*type:Tx*/) && classSystem.isTrackedClass(_V13/*type:Ty*/)) ? ("try{") : ("")) + ";\n" + classSystem.getSetVariableCode({"instance":"_V16/*x*/", "type":_V10/*type:Tx*/, "value":"new _V27/*Tx-constructor*/()", "valueType":_V17/*type:Tx::temporaryTracked*/, "operator":"=", "assignmentType":"Identifier"}) + ";\n" + classSystem.getSetVariableCode({"instance":"_V20/*y*/", "type":_V13/*type:Ty*/, "value":"new _V28/*Ty-constructor*/()", "valueType":_V21/*type:Ty::temporaryTracked*/, "operator":"=", "assignmentType":"Identifier"}) + ";\n" + classSystem.getDestroyTemporaryClassCode({"value":"" + classSystem.getSetVariableCode({"instance":"_V16/*x*/", "type":_V10/*type:Tx*/, "value":"_V20/*y*/", "valueType":_V13/*type:Ty*/, "operator":"=", "assignmentType":"Identifier"}) + "", "valueType":_V24/*type:Ty::temporaryTrackedResolved*/}) + ";;\n" + ((classSystem.isTrackedClass(_V10/*type:Tx*/) && classSystem.isTrackedClass(_V13/*type:Ty*/)) ? ("" + ((classSystem.isTrackedClass(_V10/*type:Tx*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V10/*type:Tx*/, "name":"_V16/*x*/"}) + "") : ("")) + "" + ((classSystem.isTrackedClass(_V13/*type:Ty*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V13/*type:Ty*/, "name":"_V20/*y*/"}) + "") : ("")) + "") : ("")) + "" + ((classSystem.isTrackedClass(_V10/*type:Tx*/) && classSystem.isTrackedClass(_V13/*type:Ty*/)) ? ("}catch(e){" + ((classSystem.isTrackedClass(_V10/*type:Tx*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V10/*type:Tx*/, "name":"_V16/*x*/"}) + "") : ("")) + "" + ((classSystem.isTrackedClass(_V13/*type:Ty*/)) ? ("" + classSystem.getDestroyVariableCode({"type":_V13/*type:Ty*/, "name":"_V20/*y*/"}) + "") : ("")) + "throw e};") : ("")) + ";\n};"); return communicator.fun; })());
_V9/*a*/();;
_V29/*console*/["log"]("so far so good");;
_V26/*b*/();;
;
})();
;promiseland._registerModule({ hashStr: "408dabd9b9ab807c014491f847755de1", "module": _V1, promising: false });
return _V1;
});
})();