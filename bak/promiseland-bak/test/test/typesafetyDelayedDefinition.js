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
if (promiseland._hasModule({ hashStr: "c343dbdffd29eb3b97bc22a9b7978e0e" })){ return promiseland._getModule("c343dbdffd29eb3b97bc22a9b7978e0e"); };
var PL$1 = (function(){
"use strict";
var PL$3/*C1*/;
var PL$6/*C2*/;
var PL$8/*v1*/;
var PL$9/*v2*/;

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
  classSystem._resolveProvisional(PL$2/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"m1","type":PL$5/*type:C2*/}], "extends": [], "hasFreePart": true, "hashStr": "c343dbdffd29eb3b97bc22a9b7978e0e", "name": "C1"}, {"m1": undefined}));PL$3/*C1*/;
  classSystem._resolveProvisional(PL$5/*type:C2*/, classSystem.createClass({className: "C2",members: [{"name":"m2","type":PL$2/*type:C1*/},{"name":"a","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "hashStr": "c343dbdffd29eb3b97bc22a9b7978e0e", "name": "C2"}, {"m2": undefined, "a": 1}));PL$6/*C2*/;
  PL$8/*v1*/ = new PL$4/*C1-constructor*/();
  PL$9/*v2*/ = new PL$7/*C2-constructor*/();
  PL$8/*v1*/[3] = PL$9/*v2*/;
  if((PL$8/*v1*/[3][4] == 1)){
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