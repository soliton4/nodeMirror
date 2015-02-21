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
if (promiseland._hasModule({ hashStr: "54c5b667b0d94bacc1162b8a20e2c8f4" })){ return promiseland._getModule("54c5b667b0d94bacc1162b8a20e2c8f4"); };
var PL$1 = (function(){
"use strict";
var PL$3/*C1*/;

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
  var PL$5/*i*/ = 1;
  ;
  classSystem._resolveProvisional(PL$2/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"destroy","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "track": true, "hashStr": "54c5b667b0d94bacc1162b8a20e2c8f4", "name": "C1"}, {"destroy": (function(){
  
    ;
    --PL$5/*i*/;
    ;})}));PL$3/*C1*/;
  (function(){
  var PL$6/*v*/;
  var _TPL$6/*v*/;
  
    try{;
    /*temp tracked assign*/(function(vAr){
      if (_TPL$6/*v*/){ _TPL$6/*v*/(); };
      if(vAr){
        var v = vAr[0];
        PL$6/*v*/ = v;
        _TPL$6/*v*/ = vAr[1];
        return v;
      }else{
        PL$6/*v*/ = undefined; 
        _TPL$6/*v*/ = undefined;
        return;
      };
    })(new PL$4/*C1-constructor*/())/*end temp assign*/;
    if (_TPL$6/*v*/){ _TPL$6/*v*/();};}catch(e){if (_TPL$6/*v*/){ _TPL$6/*v*/();};throw e};;})();
  if((PL$5/*i*/ == 1)){
    return {
      "success": false
    };
  };
  ;
  return {
    "success": true
  };
  ;})();
;return PL$1;
});
})();