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
if (promiseland._hasModule({ hashStr: "e643581b5bf99c16f02e46ed934f17d4" })){ return promiseland._getModule("e643581b5bf99c16f02e46ed934f17d4"); };
var PL$1 = (function(){
"use strict";
var PL$3/*Emitter*/;
var PL$6/*Reciever*/;
var PL$9/*e*/;
var PL$10/*r*/;

/* ---------------------------- */
/* type Emitter */
var PL$2/*type:Emitter*/ = classSystem._createProvisionalClass();
PL$3/*Emitter*/ = PL$2/*type:Emitter*/
var PL$4/*Emitter-constructor*/ = undefined;
classSystem.readyPromise(PL$2/*type:Emitter*/).then(function(parType){
  PL$2/*type:Emitter*/ = parType;
  PL$4/*Emitter-constructor*/ = classSystem.getTypeConstructor(PL$2/*type:Emitter*/);
});
/* ---------------------------- */


/* ---------------------------- */
/* type Reciever */
var PL$5/*type:Reciever*/ = classSystem._createProvisionalClass();
PL$6/*Reciever*/ = PL$5/*type:Reciever*/
var PL$7/*Reciever-constructor*/ = undefined;
classSystem.readyPromise(PL$5/*type:Reciever*/).then(function(parType){
  PL$5/*type:Reciever*/ = parType;
  PL$7/*Reciever-constructor*/ = classSystem.getTypeConstructor(PL$5/*type:Reciever*/);
});
/* ---------------------------- */


  ;
  classSystem._resolveProvisional(PL$2/*type:Emitter*/, classSystem.createClass({className: "Emitter",members: [{"name":"event","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "hashStr": "e643581b5bf99c16f02e46ed934f17d4", "name": "Emitter"}, {"event": (function(PL$8/*amount*/){
  
    ;
    ;})}));PL$3/*Emitter*/;
  classSystem._resolveProvisional(PL$5/*type:Reciever*/, classSystem.createClass({className: "Reciever",members: [{"name":"eventSlot","type":classSystem.getBuiltinType("var")},{"name":"amount","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "hashStr": "e643581b5bf99c16f02e46ed934f17d4", "name": "Reciever"}, {"eventSlot": (function(PL$8/*amount*/){
  
    ;
    this[4] += PL$8/*amount*/;
    ;}), "amount": 1}));PL$6/*Reciever*/;
  PL$9/*e*/ = new PL$4/*Emitter-constructor*/();
  PL$10/*r*/ = new PL$7/*Reciever-constructor*/();
  var PL$11/*c*/ = PL$9/*e*/[2](3, PL$10/*r*/[3], PL$10/*r*/);
  ;
  PL$9/*e*/[3](2);
  if((PL$10/*r*/[4] == 3)){
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