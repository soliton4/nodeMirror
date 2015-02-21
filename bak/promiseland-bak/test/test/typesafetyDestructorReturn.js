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
if (promiseland._hasModule({ hashStr: "95e1f6e92615bcdaf9c56a0938f3df32" })){ return promiseland._getModule("95e1f6e92615bcdaf9c56a0938f3df32"); };
var PL$1 = (function(){
"use strict";
var PL$3/*C1*/;
var PL$11/*b*/;
var _TPL$11/*b*/;

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

function PL$9/*f1*/(){
var PL$10/*a*/;
var _TPL$10/*a*/;

  try{;
  /*temp tracked assign*/(function(vAr){
    if (_TPL$10/*a*/){ _TPL$10/*a*/(); };
    if(vAr){
      var v = vAr[0];
      PL$10/*a*/ = v;
      _TPL$10/*a*/ = vAr[1];
      return v;
    }else{
      PL$10/*a*/ = undefined; 
      _TPL$10/*a*/ = undefined;
      return;
    };
  })(new PL$4/*C1-constructor*/())/*end temp assign*/;
  return (function(ret){ if (_TPL$10/*a*/){ _TPL$10/*a*/();};return ret; })((function(v){ if(!v){ return; }; return [v, v[2]()];})(PL$10/*a*/));;
  if (_TPL$10/*a*/){ _TPL$10/*a*/();};}catch(e){if (_TPL$10/*a*/){ _TPL$10/*a*/();};throw e};;};

  ;
  var PL$5/*failed*/ = false;
  ;
  var PL$6/*cnt*/ = 0;
  ;
  classSystem._resolveProvisional(PL$2/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"destroy","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "track": true, "hashStr": "95e1f6e92615bcdaf9c56a0938f3df32", "name": "C1"}, {"destroy": (function(){
  
    ;
    PL$6/*cnt*/++;
    ;})}));PL$3/*C1*/;
  var PL$7/*cntSupposed*/ = (function(PL$8/*s*/){
  
    ;
    if((PL$6/*cnt*/ == PL$8/*s*/)){
      return;
    };
    ;
    PL$5/*failed*/ = true;
    ;});
  ;
  PL$7/*cntSupposed*/(0);
  /* function f1 (){} - hoisted */;
  ;
  /*temp tracked assign*/(function(vAr){
    if (_TPL$11/*b*/){ _TPL$11/*b*/(); };
    if(vAr){
      var v = vAr[0];
      PL$11/*b*/ = v;
      _TPL$11/*b*/ = vAr[1];
      return v;
    }else{
      PL$11/*b*/ = undefined; 
      _TPL$11/*b*/ = undefined;
      return;
    };
  })(PL$9/*f1*/())/*end temp assign*/;
  PL$7/*cntSupposed*/(0);
  (function(v){ v[1](); return v[0]; })(PL$9/*f1*/());
  PL$7/*cntSupposed*/(1);
  /*temp tracked assign*/(function(vAr){
    if (_TPL$11/*b*/){ _TPL$11/*b*/(); };
    if(vAr){
      var v = vAr[0];
      PL$11/*b*/ = v;
      _TPL$11/*b*/ = vAr[1];
      return v;
    }else{
      PL$11/*b*/ = undefined; 
      _TPL$11/*b*/ = undefined;
      return;
    };
  })(new PL$4/*C1-constructor*/())/*end temp assign*/;
  PL$7/*cntSupposed*/(2);
  if(PL$5/*failed*/){
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