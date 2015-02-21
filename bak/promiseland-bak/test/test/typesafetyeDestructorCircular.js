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
if (promiseland._hasModule({ hashStr: "d5c4130fe09db261b4e797ff99b23065" })){ return promiseland._getModule("d5c4130fe09db261b4e797ff99b23065"); };
var PL$1 = (function(){
"use strict";
var PL$3/*C1*/;
var PL$6/*C2*/;
var PL$11/*v1*/;
var _TPL$11/*v1*/;
var PL$12/*v2*/;
var _TPL$12/*v2*/;

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
  classSystem._resolveProvisional(PL$2/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"circ","type":PL$2/*type:C1*/},{"name":"id","type":classSystem.getBuiltinType("var")},{"name":"destroy","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "track": true, "hashStr": "d5c4130fe09db261b4e797ff99b23065", "name": "C1"}, {"circ": undefined, "id": 0, "destroy": (function(){
  
    ;
    var PL$10/*checkid*/ = this[8];
    ;
    PL$9/*cnt*/++;
    ;})}));PL$3/*C1*/;
  classSystem._resolveProvisional(PL$5/*type:C2*/, classSystem.createClass({className: "C2",members: [{"name":"m1","type":PL$2/*type:C1*/}], "extends": [], "hasFreePart": true, "track": true, "hashStr": "d5c4130fe09db261b4e797ff99b23065", "name": "C2"}, {"m1": undefined}));PL$6/*C2*/;
  /*temp tracked assign*/(function(vAr){
    if (_TPL$11/*v1*/){ _TPL$11/*v1*/(); };
    if(vAr){
      var v = vAr[0];
      PL$11/*v1*/ = v;
      _TPL$11/*v1*/ = vAr[1];
      return v;
    }else{
      PL$11/*v1*/ = undefined; 
      _TPL$11/*v1*/ = undefined;
      return;
    };
  })(new PL$7/*C2-constructor*/())/*end temp assign*/;
  /*temp tracked assign*/(function(vAr){
    if (_TPL$12/*v2*/){ _TPL$12/*v2*/(); };
    if(vAr){
      var v = vAr[0];
      PL$12/*v2*/ = v;
      _TPL$12/*v2*/ = vAr[1];
      return v;
    }else{
      PL$12/*v2*/ = undefined; 
      _TPL$12/*v2*/ = undefined;
      return;
    };
  })(new PL$7/*C2-constructor*/())/*end temp assign*/;
  var PL$13/*cntSupposed*/ = (function(PL$14/*s*/){
  
    ;
    if((PL$9/*cnt*/ == PL$14/*s*/)){
      return;
    };
    ;
    PL$8/*failed*/ = true;
    ;});
  ;
  PL$13/*cntSupposed*/(0);
  (function(s, vAr){ var v = vAr[0]; s[6] = v; if(s[7]){ s[7](); }; s[7] = v[3](s[1]); vAr[1](); return v; })(PL$11/*v1*/, new PL$4/*C1-constructor*/());
  PL$11/*v1*/[6][8] = 1;
  (function(s, v){ s[6] = v; if(s[7]){ s[7](); }; s[7] = v[3](s[1]); return v; })(PL$12/*v2*/, PL$11/*v1*/[6]);
  (function(s, vAr){ var v = vAr[0]; s[6] = v; if(s[7]){ s[7](); }; s[7] = v[3](s[1]); vAr[1](); return v; })(PL$11/*v1*/[6], new PL$4/*C1-constructor*/());
  PL$11/*v1*/[6][6][8] = 2;
  (function(s, vAr){ var v = vAr[0]; s[6] = v; if(s[7]){ s[7](); }; s[7] = v[3](s[1]); vAr[1](); return v; })(PL$11/*v1*/[6][6], new PL$4/*C1-constructor*/());
  PL$11/*v1*/[6][6][6][8] = 5;
  (function(s, v){ s[6] = v; if(s[7]){ s[7](); }; s[7] = v[3](s[1]); return v; })(PL$11/*v1*/[6][6][6], PL$11/*v1*/[6]);
  (function(s, vAr){ var v = vAr[0]; s[6] = v; if(s[7]){ s[7](); }; s[7] = v[3](s[1]); vAr[1](); return v; })(PL$11/*v1*/, new PL$4/*C1-constructor*/());
  PL$11/*v1*/[6][8] = 3;
  PL$13/*cntSupposed*/(0);
  (function(s, vAr){ var v = vAr[0]; s[6] = v; if(s[7]){ s[7](); }; s[7] = v[3](s[1]); vAr[1](); return v; })(PL$12/*v2*/, new PL$4/*C1-constructor*/());
  PL$12/*v2*/[6][8] = 4;
  PL$13/*cntSupposed*/(3);
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