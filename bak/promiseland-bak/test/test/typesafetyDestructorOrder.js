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
if (promiseland._hasModule({ hashStr: "9d4c45c6545311d7a14ef435c0a3d1c0" })){ return promiseland._getModule("9d4c45c6545311d7a14ef435c0a3d1c0"); };
var PL$1 = (function(){
"use strict";
var PL$3/*C1*/;
var PL$6/*C2*/;
var PL$12/*c2*/;
var _TPL$12/*c2*/;

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


/* ---------------------------- */
/* type C2 */
var PL$5/*type:C2*/ = classSystem._createProvisionalClass();
PL$6/*C2*/ = PL$5/*type:C2*/
var PL$7/*C2-constructor*/ = undefined;
classSystem.readyPromise(PL$5/*type:C2*/).then(function(parType){
  PL$5/*type:C2*/ = parType;
  PL$7/*C2-constructor*/ = classSystem.getTypeConstructor(PL$5/*type:C2*/);
});
/* ---------------------------- */


  ;
  var PL$8/*failed*/ = false;
  ;
  var PL$9/*cnt*/ = 0;
  ;
  classSystem._resolveProvisional(PL$2/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"destroy","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "track": true, "hashStr": "9d4c45c6545311d7a14ef435c0a3d1c0", "name": "C1"}, {"destroy": (function(){
  
    ;
    PL$9/*cnt*/++;
    ;})}));PL$3/*C1*/;
  classSystem._resolveProvisional(PL$5/*type:C2*/, classSystem.createClass({className: "C2",members: [{"name":"m1","type":PL$2/*type:C1*/}], "extends": [], "hasFreePart": true, "track": true, "hashStr": "9d4c45c6545311d7a14ef435c0a3d1c0", "name": "C2"}, {"m1": undefined}));PL$6/*C2*/;
  var PL$10/*cntSupposed*/ = (function(PL$11/*s*/){
  
    ;
    if((PL$9/*cnt*/ == PL$11/*s*/)){
      return;
    };
    ;
    PL$8/*failed*/ = true;
    ;});
  ;
  PL$10/*cntSupposed*/(0);
  /*temp tracked assign*/(function(vAr){
    if (_TPL$12/*c2*/){ _TPL$12/*c2*/(); };
    if(vAr){
      var v = vAr[0];
      PL$12/*c2*/ = v;
      _TPL$12/*c2*/ = vAr[1];
      return v;
    }else{
      PL$12/*c2*/ = undefined; 
      _TPL$12/*c2*/ = undefined;
      return;
    };
  })(new PL$7/*C2-constructor*/())/*end temp assign*/;
  PL$10/*cntSupposed*/(0);
  var PL$13/*fun*/ = (function(){
  var PL$14/*v1*/;
  var _TPL$14/*v1*/;
  var PL$15/*v2*/;
  var _TPL$15/*v2*/;
  var PL$16/*v3*/;
  var _TPL$16/*v3*/;
  
    try{;
    PL$14/*v1*/;
    PL$15/*v2*/;
    PL$16/*v3*/;
    PL$10/*cntSupposed*/(0);
    (function(v){ v[1](); return v[0]; })(new PL$4/*C1-constructor*/());
    PL$10/*cntSupposed*/(1);
    /*temp tracked assign*/(function(vAr){
      if (_TPL$14/*v1*/){ _TPL$14/*v1*/(); };
      if(vAr){
        var v = vAr[0];
        PL$14/*v1*/ = v;
        _TPL$14/*v1*/ = vAr[1];
        return v;
      }else{
        PL$14/*v1*/ = undefined; 
        _TPL$14/*v1*/ = undefined;
        return;
      };
    })(new PL$4/*C1-constructor*/())/*end temp assign*/;
    PL$10/*cntSupposed*/(1);
    /*temp tracked assign*/(function(vAr){
      if (_TPL$14/*v1*/){ _TPL$14/*v1*/(); };
      if(vAr){
        var v = vAr[0];
        PL$14/*v1*/ = v;
        _TPL$14/*v1*/ = vAr[1];
        return v;
      }else{
        PL$14/*v1*/ = undefined; 
        _TPL$14/*v1*/ = undefined;
        return;
      };
    })(new PL$4/*C1-constructor*/())/*end temp assign*/;
    PL$10/*cntSupposed*/(2);
    /*temp tracked assign*/(function(vAr){
      if (_TPL$15/*v2*/){ _TPL$15/*v2*/(); };
      if(vAr){
        var v = vAr[0];
        PL$15/*v2*/ = v;
        _TPL$15/*v2*/ = vAr[1];
        return v;
      }else{
        PL$15/*v2*/ = undefined; 
        _TPL$15/*v2*/ = undefined;
        return;
      };
    })(new PL$4/*C1-constructor*/())/*end temp assign*/;
    /*temp tracked assign*/(function(vAr){
      if (_TPL$16/*v3*/){ _TPL$16/*v3*/(); };
      if(vAr){
        var v = vAr[0];
        PL$16/*v3*/ = v;
        _TPL$16/*v3*/ = vAr[1];
        return v;
      }else{
        PL$16/*v3*/ = undefined; 
        _TPL$16/*v3*/ = undefined;
        return;
      };
    })(new PL$4/*C1-constructor*/())/*end temp assign*/;
    (function(s, vAr){ var v = vAr[0]; s[6] = v; if(s[7]){ s[7](); }; s[7] = v[3](s[1]); vAr[1](); return v; })(PL$12/*c2*/, new PL$4/*C1-constructor*/());
    PL$10/*cntSupposed*/(2);
    (function(s, v){ s[6] = v; if(s[7]){ s[7](); }; s[7] = v[3](s[1]); return v; })(PL$12/*c2*/, PL$16/*v3*/);
    PL$10/*cntSupposed*/(3);
    if (_TPL$14/*v1*/){ _TPL$14/*v1*/();};if (_TPL$15/*v2*/){ _TPL$15/*v2*/();};if (_TPL$16/*v3*/){ _TPL$16/*v3*/();};}catch(e){if (_TPL$14/*v1*/){ _TPL$14/*v1*/();};if (_TPL$15/*v2*/){ _TPL$15/*v2*/();};if (_TPL$16/*v3*/){ _TPL$16/*v3*/();};throw e};;});
  ;
  PL$13/*fun*/();
  PL$10/*cntSupposed*/(5);
  if(PL$8/*failed*/){
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