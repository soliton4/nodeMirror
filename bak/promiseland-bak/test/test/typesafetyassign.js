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
if (promiseland._hasModule({ hashStr: "1521f2775b4173c536ae637258c8a819" })){ return promiseland._getModule("1521f2775b4173c536ae637258c8a819"); };
var PL$1 = (function(){
"use strict";
var PL$3/*Type1*/;
var PL$6/*Type2*/;
var PL$8/*a*/;
var PL$9/*b*/;
var PL$11/*c*/;
var PL$12/*d*/;

/* ---------------------------- */
/* type Type1 */
var PL$2/*type:Type1*/ = classSystem._createProvisionalClass();
PL$3/*Type1*/ = PL$2/*type:Type1*/
var PL$4/*Type1-constructor*/ = undefined;
classSystem.readyPromise(PL$2/*type:Type1*/).then(function(parType){
  PL$2/*type:Type1*/ = parType;
  PL$4/*Type1-constructor*/ = classSystem.getTypeConstructor(PL$2/*type:Type1*/);
});
/* ---------------------------- */


/* ---------------------------- */
/* type Type2 */
var PL$5/*type:Type2*/ = classSystem._createProvisionalClass();
PL$6/*Type2*/ = PL$5/*type:Type2*/
var PL$7/*Type2-constructor*/ = undefined;
classSystem.readyPromise(PL$5/*type:Type2*/).then(function(parType){
  PL$5/*type:Type2*/ = parType;
  PL$7/*Type2-constructor*/ = classSystem.getTypeConstructor(PL$5/*type:Type2*/);
});
/* ---------------------------- */


  ;
  classSystem._resolveProvisional(PL$2/*type:Type1*/, classSystem.createClass({className: "Type1",members: [], "extends": [], "hasFreePart": true, "hashStr": "1521f2775b4173c536ae637258c8a819", "name": "Type1"}, {}));PL$3/*Type1*/;
  classSystem._resolveProvisional(PL$5/*type:Type2*/, classSystem.createClass({className: "Type2",members: [], "extends": [], "hasFreePart": true, "hashStr": "1521f2775b4173c536ae637258c8a819", "name": "Type2"}, {}));PL$6/*Type2*/;
  try
  {
    PL$8/*a*/;
    PL$9/*b*/;
    PL$8/*a*/ = PL$9/*b*/;}catch(PL$10/*e*/){
    return {
      "success": false
    };};
  try
  {
    PL$11/*c*/;
    PL$12/*d*/;
    (function(){ throw { id:201, msg: "type missmatch" } })();}catch(PL$10/*e*/){
    return {
      "success": true
    };};
  return {
    "success": false
  };
  ;})();
;return PL$1;
});
})();