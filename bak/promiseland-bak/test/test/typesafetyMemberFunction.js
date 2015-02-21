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
if (promiseland._hasModule({ hashStr: "0ed06f66d2783c4b7f338ed58b63db59" })){ return promiseland._getModule("0ed06f66d2783c4b7f338ed58b63db59"); };
var PL$1 = (function(){
"use strict";
var PL$3/*C1*/;
var PL$5/*v1*/;
var PL$6/*v2*/;

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


  ;
  classSystem._resolveProvisional(PL$2/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"a","type":classSystem.getBuiltinType("var")},{"name":"b","type":classSystem.getBuiltinType("var")},{"name":"c","type":(classSystem.createFunctionType({ "return": PL$2/*type:C1*/, arguments: []}))}], "extends": [], "hasFreePart": true, "hashStr": "0ed06f66d2783c4b7f338ed58b63db59", "name": "C1"}, {"a": 1, "b": (function(){
  
    ;
    this[3] = 2;
    ;}), "c": (function(){
  
    ;
    return this;
    ;})}));PL$3/*C1*/;
  PL$5/*v1*/ = new PL$4/*C1-constructor*/();
  PL$6/*v2*/ = PL$5/*v1*/[5]();
  PL$5/*v1*/[4]();
  if((PL$6/*v2*/[3] == 2)){
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