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
  defineFun([], function(){
var __execute = function(promiseland, extra){ __execute = undefined; var __require = requireFun;

var __Promise = promiseland.Promise;
var Promise = promiseland.Promise;
if (promiseland._hasModule({ hashStr: "41e1ee2d24050f7019670440eb08edd8" })){ return promiseland._getModule("41e1ee2d24050f7019670440eb08edd8"); };
var PL$3/*extra*/;try{PL$3/*extra*/ = extra;}catch(e){};
var PL$14/*Promise*/;try{PL$14/*Promise*/ = Promise;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  ;
  var PL$2/*errorMsg*/ = PL$3/*extra*/["errorMsg"];
  ;
  return (function(PL$4/*classSystem*/, PL$5/*internals*/){
  
    ;
    var PL$6/*cs*/ = PL$4/*classSystem*/;
    ;
    var PL$7/*classHider*/ = PL$5/*internals*/["classHider"];
    ;
    var PL$8/*getClass*/ = PL$5/*internals*/["getClass"];
    ;
    PL$6/*cs*/["_createTemporaryTrackedClass"] = (function(PL$9/*parType*/){
    
      ;
      var PL$10/*self*/ = this;
      ;
      if(this["isProvisional"](PL$9/*parType*/)){
        var PL$11/*pr*/ = this["_createProvisionalClass"]();
        ;
        this["definitionPromise"](PL$9/*parType*/)["then"]((function(PL$12/*parDefinedClass*/){
        
          ;
          PL$10/*self*/["_resolveProvisional"](PL$11/*pr*/, PL$10/*self*/["_createTemporaryTrackedClass"](PL$12/*parDefinedClass*/));
          ;}));
        return PL$11/*pr*/;
      };
      ;
      if(this["isTemporaryTrackedClass"](PL$9/*parType*/)){
        return PL$9/*parType*/;
      };
      ;
      if(! this["isTrackedClass"](PL$9/*parType*/)){
        return PL$9/*parType*/;
      };
      ;
      var PL$13/*cDef*/ = {
        "temporaryTracked": true,
        "type": PL$9/*parType*/,
        "isReady": false,
        "readyPromise": new PL$14/*Promise*/()
      };
      ;
      var PL$15/*cf*/ = PL$7/*classHider*/(PL$13/*cDef*/);
      ;
      PL$10/*self*/["readyPromise"](PL$9/*parType*/)["then"]((function(){
      
        ;
        PL$13/*cDef*/["ready"] = true;
        PL$13/*cDef*/["readyPromise"]["resolve"](PL$15/*cf*/);
        ;}));
      return PL$15/*cf*/;
      ;});
    PL$6/*cs*/["isTemporaryTrackedClass"] = (function(PL$9/*parType*/){
    
      ;
      var PL$13/*cDef*/ = PL$8/*getClass*/(PL$9/*parType*/);
      ;
      if(PL$13/*cDef*/["temporaryTracked"]){
        return true;
      };
      ;
      return false;
      ;});
    PL$6/*cs*/["getClassFromTemporaryTracked"] = (function(PL$9/*parType*/){
    
      ;
      if(this["isTemporaryTrackedClass"](PL$9/*parType*/)){
        var PL$13/*cDef*/ = PL$8/*getClass*/(PL$9/*parType*/);
        ;
        return PL$13/*cDef*/["type"];
      };
      ;
      return PL$9/*parType*/;
      ;});
    ;});
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();