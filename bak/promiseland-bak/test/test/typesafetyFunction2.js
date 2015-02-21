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
if (promiseland._hasModule({ hashStr: "0c11ca25206ec42f77a70d97f2323884" })){ return promiseland._getModule("0c11ca25206ec42f77a70d97f2323884"); };
var PL$1 = (function(){
"use strict";
var PL$3/*C1*/;
var PL$5/*b*/;

/* ---------------------------- */
/* type C1 */
var PL$2/*type:C1*/ = classSystem._createProvisionalClass();
PL$3/*C1*/ = PL$2/*type:C1*/
var PL$4/*C1-constructor*/ = undefined;
classSystem.readyPromise(PL$2/*type:C1*/).then(function(parType){
  PL$2/*type:C1*/ = parType;
  PL$4/*C1-constructor*/ = classSystem.getTypeConstructor(PL$2/*type:C1*/);
});
/* ---------------------------- */

function PL$6/*fun1*/(){
var PL$7/*c*/;

  ;
  PL$7/*c*/ = new PL$4/*C1-constructor*/();
  PL$7/*c*/[3] = 2;
  return PL$7/*c*/;
  ;};

  ;
  classSystem._resolveProvisional(PL$2/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"a","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "hashStr": "0c11ca25206ec42f77a70d97f2323884", "name": "C1"}, {"a": 1}));PL$3/*C1*/;
  PL$5/*b*/ = new PL$4/*C1-constructor*/();
  /* function fun1 (){} - hoisted */;
  ;
  PL$5/*b*/ = PL$6/*fun1*/();
  if((PL$5/*b*/[3] == 2)){
    return {
      "success": true
    };
  };
  ;
  return {
    "success": false
  };
  ;})();
;return PL$1;
});
})();