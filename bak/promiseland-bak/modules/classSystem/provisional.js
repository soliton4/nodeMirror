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
if (promiseland._hasModule({ hashStr: "c72038a1ddad16a0b5bfd21bed1bba34" })){ return promiseland._getModule("c72038a1ddad16a0b5bfd21bed1bba34"); };
var PL$3/*extra*/;try{PL$3/*extra*/ = extra;}catch(e){};
var PL$10/*Promise*/;try{PL$10/*Promise*/ = Promise;}catch(e){};
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
    PL$6/*cs*/["_createProvisionalClass"] = (function(){
    
      ;
      var PL$9/*cDef*/ = {
        "provisional": true,
        "promise": new PL$10/*Promise*/(),
        "type": undefined
      };
      ;
      PL$9/*cDef*/["promise"]["then"]((function(PL$11/*type*/){
      
        ;
        PL$9/*cDef*/["type"] = PL$11/*type*/;
        ;}));
      var PL$12/*cf*/ = PL$7/*classHider*/(PL$9/*cDef*/);
      ;
      return PL$12/*cf*/;
      ;});
    PL$6/*cs*/["_resolveProvisional"] = (function(PL$13/*parType*/, PL$14/*parResult*/){
    
      ;
      var PL$15/*self*/ = this;
      ;
      var PL$16/*typeDef*/ = PL$8/*getClass*/(PL$13/*parType*/);
      ;
      var PL$17/*resultDef*/ = PL$8/*getClass*/(PL$14/*parResult*/);
      ;
      if(PL$17/*resultDef*/["provisional"]){
        PL$17/*resultDef*/["promise"]["then"]((function(PL$18/*result*/){
        
          ;
          PL$15/*self*/["resolveProvisional"](PL$13/*parType*/, PL$18/*result*/);
          ;}));
      }else{
      PL$16/*typeDef*/["promise"]["resolve"](PL$14/*parResult*/);
      };
      ;
      ;});
    PL$6/*cs*/["isProvisional"] = (function(PL$13/*parType*/){
    
      ;
      var PL$16/*typeDef*/ = PL$8/*getClass*/(PL$13/*parType*/);
      ;
      if(PL$16/*typeDef*/["provisional"]){
        return true;
      };
      ;
      return false;
      ;});
    PL$6/*cs*/["definitionPromise"] = (function(PL$13/*parType*/){
    
      ;
      var PL$16/*typeDef*/ = PL$8/*getClass*/(PL$13/*parType*/);
      ;
      if(PL$16/*typeDef*/["provisional"]){
        return PL$16/*typeDef*/["promise"];
      };
      ;
      var PL$19/*p*/ = new PL$10/*Promise*/();
      ;
      PL$19/*p*/["resolve"](PL$13/*parType*/);
      return PL$19/*p*/;
      ;});
    PL$6/*cs*/["readyPromise"] = (function(PL$20/*_parType*/){
    
      ;
      var PL$19/*p*/ = new PL$10/*Promise*/();
      ;
      this["definitionPromise"](PL$20/*_parType*/)["then"]((function(PL$13/*parType*/){
      
        ;
        var PL$16/*typeDef*/ = PL$8/*getClass*/(PL$13/*parType*/);
        ;
        if(PL$16/*typeDef*/["isReady"]){
          PL$19/*p*/["resolve"](PL$13/*parType*/);
          return;
        };
        ;
        PL$16/*typeDef*/["readyPromise"]["then"]((function(PL$13/*parType*/){
        
          ;
          PL$19/*p*/["resolve"](PL$13/*parType*/);
          ;}));
        return;
        ;}));
      return PL$19/*p*/;
      ;});
    ;});
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();