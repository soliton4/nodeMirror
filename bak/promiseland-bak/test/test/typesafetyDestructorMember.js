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
if (promiseland._hasModule({ hashStr: "575c4be1e0319423fd58de62903afcaf" })){ return promiseland._getModule("575c4be1e0319423fd58de62903afcaf"); };
var PL$1 = (function(){
"use strict";
var PL$3/*C1*/;
var PL$6/*C2*/;

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
  var PL$8/*i*/ = 2;
  ;
  classSystem._resolveProvisional(PL$2/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"destroy","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "track": true, "hashStr": "575c4be1e0319423fd58de62903afcaf", "name": "C1"}, {"destroy": (function(){
  
    ;
    --PL$8/*i*/;
    ;})}));PL$3/*C1*/;
  classSystem._resolveProvisional(PL$5/*type:C2*/, classSystem.createClass({className: "C2",members: [{"name":"m","type":PL$2/*type:C1*/}], "extends": [], "hasFreePart": true, "track": true, "hashStr": "575c4be1e0319423fd58de62903afcaf", "name": "C2"}, {"m": undefined}));PL$6/*C2*/;
  (function(){
  var PL$9/*m*/;
  var _TPL$9/*m*/;
  var PL$10/*v*/;
  var _TPL$10/*v*/;
  
    try{;
    /*temp tracked assign*/(function(vAr){
      if (_TPL$9/*m*/){ _TPL$9/*m*/(); };
      if(vAr){
        var v = vAr[0];
        PL$9/*m*/ = v;
        _TPL$9/*m*/ = vAr[1];
        return v;
      }else{
        PL$9/*m*/ = undefined; 
        _TPL$9/*m*/ = undefined;
        return;
      };
    })(new PL$4/*C1-constructor*/())/*end temp assign*/;
    /*temp tracked assign*/(function(vAr){
      if (_TPL$10/*v*/){ _TPL$10/*v*/(); };
      if(vAr){
        var v = vAr[0];
        PL$10/*v*/ = v;
        _TPL$10/*v*/ = vAr[1];
        return v;
      }else{
        PL$10/*v*/ = undefined; 
        _TPL$10/*v*/ = undefined;
        return;
      };
    })(new PL$7/*C2-constructor*/())/*end temp assign*/;
    (function(s, v){ s[6] = v; if(s[7]){ s[7](); }; s[7] = v[3](s[1]); return v; })(PL$10/*v*/, PL$9/*m*/);
    (function(s, vAr){ var v = vAr[0]; s[6] = v; if(s[7]){ s[7](); }; s[7] = v[3](s[1]); vAr[1](); return v; })(PL$10/*v*/, new PL$4/*C1-constructor*/());
    if (_TPL$9/*m*/){ _TPL$9/*m*/();};if (_TPL$10/*v*/){ _TPL$10/*v*/();};}catch(e){if (_TPL$9/*m*/){ _TPL$9/*m*/();};if (_TPL$10/*v*/){ _TPL$10/*v*/();};throw e};;})();
  if((PL$8/*i*/ == 0)){
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