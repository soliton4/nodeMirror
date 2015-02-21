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
if (promiseland._hasModule({ hashStr: "651db8f5c5e2a5af36d3c64ac8f972d2" })){ return promiseland._getModule("651db8f5c5e2a5af36d3c64ac8f972d2"); };
var PL$1 = (function(){
"use strict";
var PL$3/*Mt1*/;
var PL$6/*Type1*/;
var PL$9/*Type2*/;
var PL$11/*a*/;
var PL$12/*b*/;

/* ---------------------------- */
/* type Mt1 */
var PL$2/*type:Mt1*/ = classSystem._createProvisionalClass();
PL$3/*Mt1*/ = PL$2/*type:Mt1*/
var PL$4/*Mt1-constructor*/ = undefined;
classSystem.readyPromise(PL$2/*type:Mt1*/).then(function(parType){
  PL$2/*type:Mt1*/ = parType;
  PL$4/*Mt1-constructor*/ = classSystem.getTypeConstructor(PL$2/*type:Mt1*/);
});
/* ---------------------------- */


/* ---------------------------- */
/* type Type1 */
var PL$5/*type:Type1*/ = classSystem._createProvisionalClass();
PL$6/*Type1*/ = PL$5/*type:Type1*/
var PL$7/*Type1-constructor*/ = undefined;
classSystem.readyPromise(PL$5/*type:Type1*/).then(function(parType){
  PL$5/*type:Type1*/ = parType;
  PL$7/*Type1-constructor*/ = classSystem.getTypeConstructor(PL$5/*type:Type1*/);
});
/* ---------------------------- */


/* ---------------------------- */
/* type Type2 */
var PL$8/*type:Type2*/ = classSystem._createProvisionalClass();
PL$9/*Type2*/ = PL$8/*type:Type2*/
var PL$10/*Type2-constructor*/ = undefined;
classSystem.readyPromise(PL$8/*type:Type2*/).then(function(parType){
  PL$8/*type:Type2*/ = parType;
  PL$10/*Type2-constructor*/ = classSystem.getTypeConstructor(PL$8/*type:Type2*/);
});
/* ---------------------------- */


  ;
  classSystem._resolveProvisional(PL$2/*type:Mt1*/, classSystem.createClass({className: "Mt1",members: [{"name":"a1","type":classSystem.getBuiltinType("var")},{"name":"a2","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "hashStr": "651db8f5c5e2a5af36d3c64ac8f972d2", "name": "Mt1"}, {"a1": 20, "a2": 30}));PL$3/*Mt1*/;
  classSystem._resolveProvisional(PL$5/*type:Type1*/, classSystem.createClass({className: "Type1",members: [{"name":"a","type":classSystem.getBuiltinType("var")},{"name":"b","type":classSystem.getBuiltinType("var")},{"name":"m1","type":PL$2/*type:Mt1*/}], "extends": [], "hasFreePart": true, "hashStr": "651db8f5c5e2a5af36d3c64ac8f972d2", "name": "Type1"}, {"a": 1, "b": 2, "m1": undefined}));PL$6/*Type1*/;
  classSystem._resolveProvisional(PL$8/*type:Type2*/, classSystem.createClass({className: "Type2",members: [{"name":"x","type":classSystem.getBuiltinType("var")},{"name":"y","type":classSystem.getBuiltinType("var")},{"name":"m2","type":PL$2/*type:Mt1*/}], "extends": [], "hasFreePart": true, "hashStr": "651db8f5c5e2a5af36d3c64ac8f972d2", "name": "Type2"}, {"x": 3, "y": 4, "m2": undefined}));PL$9/*Type2*/;
  try
  {
    PL$11/*a*/ = new PL$7/*Type1-constructor*/();
    PL$12/*b*/ = new PL$10/*Type2-constructor*/();
    PL$12/*b*/[4] = 10;
    PL$12/*b*/[3] = PL$11/*a*/[3];
    PL$11/*a*/[5] = new PL$4/*Mt1-constructor*/();
    PL$11/*a*/[5][3] = 40;
    PL$12/*b*/[5] = PL$11/*a*/[5];
    if((PL$12/*b*/[5] !== PL$11/*a*/[5])){
      return {
        "success": false
      };
    };
    if((PL$12/*b*/[5][3] == 40)){
      return {
        "success": true
      };
    };}catch(PL$13/*e*/){
    return {
      "success": false
    };};
  return {
    "success": false
  };
  ;})();
;return PL$1;
});
})();