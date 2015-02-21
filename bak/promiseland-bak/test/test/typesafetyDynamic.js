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

var classSystem = promiseland.classSystem;
if (promiseland._hasModule({ hashStr: "4db307fb9b844be7414aa21cea92b0ac" })){ return promiseland._getModule("4db307fb9b844be7414aa21cea92b0ac"); };
var PL$1 = (function(){
"use strict";
var PL$3/*T1*/;
var PL$6/*T2*/;

/* ---------------------------- */
/* type T1 */
var PL$2/*type:T1*/ = classSystem._createProvisionalClass();
PL$3/*T1*/ = PL$2/*type:T1*/
var PL$4/*T1-constructor*/ = undefined;
classSystem.readyPromise(PL$2/*type:T1*/).then(function(parType){
  PL$2/*type:T1*/ = parType;
  PL$4/*T1-constructor*/ = classSystem.getTypeConstructor(PL$2/*type:T1*/);
});
/* ---------------------------- */


/* ---------------------------- */
/* type T2 */
var PL$5/*type:T2*/ = classSystem._createProvisionalClass();
PL$6/*T2*/ = PL$5/*type:T2*/
var PL$7/*T2-constructor*/ = undefined;
classSystem.readyPromise(PL$5/*type:T2*/).then(function(parType){
  PL$5/*type:T2*/ = parType;
  PL$7/*T2-constructor*/ = classSystem.getTypeConstructor(PL$5/*type:T2*/);
});
/* ---------------------------- */


  ;
  classSystem._resolveProvisional(PL$2/*type:T1*/, classSystem.createClass({className: "T1",members: [{"name":"a","type":classSystem.getBuiltinType("var")},{"name":"b","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "hashStr": "4db307fb9b844be7414aa21cea92b0ac", "name": "T1"}, {"a": 1, "b": 2}));PL$3/*T1*/;
  classSystem._resolveProvisional(PL$5/*type:T2*/, classSystem.createClass({className: "T2",members: [{"name":"a","type":classSystem.getBuiltinType("var")},{"name":"b","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "hashStr": "4db307fb9b844be7414aa21cea92b0ac", "name": "T2"}, {"a": 3, "b": 4}));PL$6/*T2*/;
  var PL$8/*a*/ = ((function(){var PL$9/*type:Tx*/ = PL$3/*T1*/;
  var PL$10/*Tx*/ = PL$9/*type:Tx*/
  ;var PL$11/*Tx-constructor*/ = undefined;
  classSystem.readyPromise(PL$9/*type:Tx*/).then(function(parType){
    PL$9/*type:Tx*/ = parType;
    PL$11/*Tx-constructor*/ = classSystem.getTypeConstructor(PL$9/*type:Tx*/);
  });
  var PL$12/*type:Ty*/ = PL$6/*T2*/;
  var PL$13/*Ty*/ = PL$12/*type:Ty*/
  ;var PL$14/*Ty-constructor*/ = undefined;
  classSystem.readyPromise(PL$12/*type:Ty*/).then(function(parType){
    PL$12/*type:Ty*/ = parType;
    PL$14/*Ty-constructor*/ = classSystem.getTypeConstructor(PL$12/*type:Ty*/);
  });
  var communicator = {fun: undefined};
  var /*extratyperender*/ PL$16/*type:Tx::constructorReturn*/ = classSystem.getConstructorReturnType(PL$9/*type:Tx*/);
  var /*extratyperender*/ PL$18/*type:Tx::constructorReturn::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(PL$16/*type:Tx::constructorReturn*/);
  var /*extratyperender*/ PL$17/*type:Tx::property::constructor*/ = classSystem.getConstructorType({"type":PL$9/*type:Tx*/, property: "constructor"});
  var /*extratyperender*/ PL$20/*type:Ty::constructorReturn*/ = classSystem.getConstructorReturnType(PL$12/*type:Ty*/);
  var /*extratyperender*/ PL$22/*type:Ty::constructorReturn::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(PL$20/*type:Ty::constructorReturn*/);
  var /*extratyperender*/ PL$21/*type:Ty::property::constructor*/ = classSystem.getConstructorType({"type":PL$12/*type:Ty*/, property: "constructor"});
  var /*extratyperender*/ PL$23/*type:Ty::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(PL$12/*type:Ty*/);
  var /*extratyperender*/ PL$24/*type:Ty::temporaryTrackedResolved::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(PL$23/*type:Ty::temporaryTrackedResolved*/);
  eval("communicator.fun = function(){\n  " + classSystem.getDeclareVariableCode({"type":PL$9/*type:Tx*/, "name":"PL$15/*x*/", "declaration":true}) + "" + classSystem.getDeclareVariableCode({"type":PL$12/*type:Ty*/, "name":"PL$19/*y*/", "declaration":true}) + "\n    " + ((classSystem.isTrackedClass(PL$9/*type:Tx*/) && classSystem.isTrackedClass(PL$12/*type:Ty*/)) ? ("try{") : ("")) + ";\n    " + classSystem.getSetVariableCode({"instance":"PL$15/*x*/", "type":PL$9/*type:Tx*/, "value":"new PL$11/*Tx-constructor*/()", "valueType":PL$16/*type:Tx::constructorReturn*/, "operator":"=", "assignmentType":"Identifier"}) + ";\n    " + classSystem.getSetVariableCode({"instance":"PL$19/*y*/", "type":PL$12/*type:Ty*/, "value":"new PL$14/*Ty-constructor*/()", "valueType":PL$20/*type:Ty::constructorReturn*/, "operator":"=", "assignmentType":"Identifier"}) + ";\n    " + classSystem.getDestroyTemporaryClassCode({"value":"" + classSystem.getSetVariableCode({"instance":"PL$15/*x*/", "type":PL$9/*type:Tx*/, "value":"PL$19/*y*/", "valueType":PL$12/*type:Ty*/, "operator":"=", "assignmentType":"Identifier"}) + "", "valueType":PL$23/*type:Ty::temporaryTrackedResolved*/}) + ";\n    " + ((classSystem.isTrackedClass(PL$9/*type:Tx*/) && classSystem.isTrackedClass(PL$12/*type:Ty*/)) ? ("" + ((classSystem.isTrackedClass(PL$9/*type:Tx*/)) ? ("" + classSystem.getDestroyVariableCode({"type":PL$9/*type:Tx*/, "name":"PL$15/*x*/"}) + "") : ("")) + "" + ((classSystem.isTrackedClass(PL$12/*type:Ty*/)) ? ("" + classSystem.getDestroyVariableCode({"type":PL$12/*type:Ty*/, "name":"PL$19/*y*/"}) + "") : ("")) + "") : ("")) + "" + ((classSystem.isTrackedClass(PL$9/*type:Tx*/) && classSystem.isTrackedClass(PL$12/*type:Ty*/)) ? ("}catch(e){" + ((classSystem.isTrackedClass(PL$9/*type:Tx*/)) ? ("" + classSystem.getDestroyVariableCode({"type":PL$9/*type:Tx*/, "name":"PL$15/*x*/"}) + "") : ("")) + "" + ((classSystem.isTrackedClass(PL$12/*type:Ty*/)) ? ("" + classSystem.getDestroyVariableCode({"type":PL$12/*type:Ty*/, "name":"PL$19/*y*/"}) + "") : ("")) + "throw e};") : ("")) + ";};"); return communicator.fun; })());
  ;
  var PL$25/*b*/ = ((function(){var PL$9/*type:Tx*/ = PL$3/*T1*/;
  var PL$10/*Tx*/ = PL$9/*type:Tx*/
  ;var PL$26/*Tx-constructor*/ = undefined;
  classSystem.readyPromise(PL$9/*type:Tx*/).then(function(parType){
    PL$9/*type:Tx*/ = parType;
    PL$26/*Tx-constructor*/ = classSystem.getTypeConstructor(PL$9/*type:Tx*/);
  });
  var PL$12/*type:Ty*/ = PL$3/*T1*/;
  var PL$13/*Ty*/ = PL$12/*type:Ty*/
  ;var PL$27/*Ty-constructor*/ = undefined;
  classSystem.readyPromise(PL$12/*type:Ty*/).then(function(parType){
    PL$12/*type:Ty*/ = parType;
    PL$27/*Ty-constructor*/ = classSystem.getTypeConstructor(PL$12/*type:Ty*/);
  });
  var communicator = {fun: undefined};
  var /*extratyperender*/ PL$16/*type:Tx::constructorReturn*/ = classSystem.getConstructorReturnType(PL$9/*type:Tx*/);
  var /*extratyperender*/ PL$18/*type:Tx::constructorReturn::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(PL$16/*type:Tx::constructorReturn*/);
  var /*extratyperender*/ PL$17/*type:Tx::property::constructor*/ = classSystem.getConstructorType({"type":PL$9/*type:Tx*/, property: "constructor"});
  var /*extratyperender*/ PL$20/*type:Ty::constructorReturn*/ = classSystem.getConstructorReturnType(PL$12/*type:Ty*/);
  var /*extratyperender*/ PL$22/*type:Ty::constructorReturn::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(PL$20/*type:Ty::constructorReturn*/);
  var /*extratyperender*/ PL$21/*type:Ty::property::constructor*/ = classSystem.getConstructorType({"type":PL$12/*type:Ty*/, property: "constructor"});
  var /*extratyperender*/ PL$23/*type:Ty::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(PL$12/*type:Ty*/);
  var /*extratyperender*/ PL$24/*type:Ty::temporaryTrackedResolved::temporaryTrackedResolved*/ = classSystem.getClassFromTemporaryTracked(PL$23/*type:Ty::temporaryTrackedResolved*/);
  eval("communicator.fun = function(){\n  " + classSystem.getDeclareVariableCode({"type":PL$9/*type:Tx*/, "name":"PL$15/*x*/", "declaration":true}) + "" + classSystem.getDeclareVariableCode({"type":PL$12/*type:Ty*/, "name":"PL$19/*y*/", "declaration":true}) + "\n    " + ((classSystem.isTrackedClass(PL$9/*type:Tx*/) && classSystem.isTrackedClass(PL$12/*type:Ty*/)) ? ("try{") : ("")) + ";\n    " + classSystem.getSetVariableCode({"instance":"PL$15/*x*/", "type":PL$9/*type:Tx*/, "value":"new PL$26/*Tx-constructor*/()", "valueType":PL$16/*type:Tx::constructorReturn*/, "operator":"=", "assignmentType":"Identifier"}) + ";\n    " + classSystem.getSetVariableCode({"instance":"PL$19/*y*/", "type":PL$12/*type:Ty*/, "value":"new PL$27/*Ty-constructor*/()", "valueType":PL$20/*type:Ty::constructorReturn*/, "operator":"=", "assignmentType":"Identifier"}) + ";\n    " + classSystem.getDestroyTemporaryClassCode({"value":"" + classSystem.getSetVariableCode({"instance":"PL$15/*x*/", "type":PL$9/*type:Tx*/, "value":"PL$19/*y*/", "valueType":PL$12/*type:Ty*/, "operator":"=", "assignmentType":"Identifier"}) + "", "valueType":PL$23/*type:Ty::temporaryTrackedResolved*/}) + ";\n    " + ((classSystem.isTrackedClass(PL$9/*type:Tx*/) && classSystem.isTrackedClass(PL$12/*type:Ty*/)) ? ("" + ((classSystem.isTrackedClass(PL$9/*type:Tx*/)) ? ("" + classSystem.getDestroyVariableCode({"type":PL$9/*type:Tx*/, "name":"PL$15/*x*/"}) + "") : ("")) + "" + ((classSystem.isTrackedClass(PL$12/*type:Ty*/)) ? ("" + classSystem.getDestroyVariableCode({"type":PL$12/*type:Ty*/, "name":"PL$19/*y*/"}) + "") : ("")) + "") : ("")) + "" + ((classSystem.isTrackedClass(PL$9/*type:Tx*/) && classSystem.isTrackedClass(PL$12/*type:Ty*/)) ? ("}catch(e){" + ((classSystem.isTrackedClass(PL$9/*type:Tx*/)) ? ("" + classSystem.getDestroyVariableCode({"type":PL$9/*type:Tx*/, "name":"PL$15/*x*/"}) + "") : ("")) + "" + ((classSystem.isTrackedClass(PL$12/*type:Ty*/)) ? ("" + classSystem.getDestroyVariableCode({"type":PL$12/*type:Ty*/, "name":"PL$19/*y*/"}) + "") : ("")) + "throw e};") : ("")) + ";};"); return communicator.fun; })());
  ;
  var PL$28/*catched*/ = false;
  ;
  try
  {
    PL$8/*a*/();}catch(PL$29/*e*/){
    PL$28/*catched*/ = true;};
  if(! PL$28/*catched*/){
    return {
      "success": false
    };
  };
  ;
  try
  {
    PL$25/*b*/();}catch(PL$29/*e*/){
    return {
      "success": false
    };};
  return {
    "success": true
  };
  ;})();
;return PL$1;
});
})();