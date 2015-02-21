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
if (promiseland._hasModule({ hashStr: "7f01c5214ab9b1fbd9f64764f2f0ae7c" })){ return promiseland._getModule("7f01c5214ab9b1fbd9f64764f2f0ae7c"); };
var PL$3/*extra*/;try{PL$3/*extra*/ = extra;}catch(e){};
var PL$17/*Promise*/;try{PL$17/*Promise*/ = Promise;}catch(e){};
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
    var PL$9/*TrackedPromise*/ = PL$5/*internals*/["TrackedPromise"];
    ;
    PL$6/*cs*/["_createPromiseOfClass"] = (function(PL$10/*parType*/){
    
      ;
      var PL$11/*self*/ = this;
      ;
      if(this["isProvisional"](PL$10/*parType*/)){
        var PL$12/*pr*/ = this["_createProvisionalClass"]();
        ;
        this["definitionPromise"](PL$10/*parType*/)["then"]((function(PL$13/*parDefinedClass*/){
        
          ;
          PL$11/*self*/["_resolveProvisional"](PL$12/*pr*/, PL$11/*self*/["_createPromiseOfClass"](PL$13/*parDefinedClass*/));
          ;}));
        return PL$12/*pr*/;
      };
      ;
      if(this["isVar"](PL$10/*parType*/)){
        return PL$10/*parType*/;
      };
      ;
      var PL$14/*track*/ = false;
      ;
      if(this["isTrackedClass"](PL$10/*parType*/)){
        PL$14/*track*/ = true;
      };
      ;
      var PL$15/*map*/ = {
        
      };
      ;
      var PL$16/*cDef*/ = {
        "promiseOf": true,
        "type": PL$10/*parType*/,
        "isReady": true,
        "readyPromise": new PL$17/*Promise*/(),
        "track": PL$14/*track*/,
        "map": PL$15/*map*/
      };
      ;
      var PL$18/*cf*/ = PL$7/*classHider*/(PL$16/*cDef*/);
      ;
      if(PL$14/*track*/){
        PL$16/*cDef*/["map"]["trackRootIdx"] = "rootTrack";
        PL$16/*cDef*/["map"]["trackMemberIdx"] = "memberTrack";
        var PL$19/*pcDef*/ = PL$8/*getClass*/(PL$10/*parType*/);
        ;
        var PL$20/*memberTrackMemberIdx*/ = PL$19/*pcDef*/["map"]["trackMemberIdx"];
        ;
        PL$16/*cDef*/["constructor"] = (function(){
        
          ;
          var PL$21/*r*/ = new PL$9/*TrackedPromise*/((function(PL$22/*parTempValue*/, PL$23/*parTracker*/){
          
            ;
            var PL$24/*v*/ = PL$22/*parTempValue*/[0];
            ;
            var PL$25/*l*/ = PL$24/*v*/[PL$20/*memberTrackMemberIdx*/](PL$23/*parTracker*/);
            ;
            PL$22/*parTempValue*/[1]();
            return PL$25/*l*/;
            ;}));
          ;
          return [
            PL$21/*r*/, 
            PL$21/*r*/["rootTrack"]()
          ];
          ;});
      }else{
      PL$16/*cDef*/["constructor"] = PL$17/*Promise*/;
      };
      ;
      PL$16/*cDef*/["readyPromise"]["resolve"](PL$18/*cf*/);
      return PL$18/*cf*/;
      ;});
    PL$6/*cs*/["isPromiseOfClass"] = (function(PL$10/*parType*/){
    
      ;
      var PL$16/*cDef*/ = PL$8/*getClass*/(PL$10/*parType*/);
      ;
      if(PL$16/*cDef*/["promiseOf"]){
        return true;
      };
      ;
      return false;
      ;});
    PL$6/*cs*/["getClassFromPromiseOf"] = (function(PL$10/*parType*/){
    
      ;
      var PL$11/*self*/ = this;
      ;
      if(this["isProvisional"](PL$10/*parType*/)){
        var PL$12/*pr*/ = this["_createProvisionalClass"]();
        ;
        this["definitionPromise"](PL$10/*parType*/)["then"]((function(PL$13/*parDefinedClass*/){
        
          ;
          PL$11/*self*/["_resolveProvisional"](PL$12/*pr*/, PL$11/*self*/["getClassFromPromiseOf"](PL$13/*parDefinedClass*/));
          ;}));
        return PL$12/*pr*/;
      };
      ;
      if(this["isTemporaryTrackedClass"](PL$10/*parType*/)){
        return this["getClassFromPromiseOf"](this["getClassFromTemporaryTracked"](PL$10/*parType*/));
      };
      ;
      if(this["isPromiseOfClass"](PL$10/*parType*/)){
        var PL$16/*cDef*/ = PL$8/*getClass*/(PL$10/*parType*/);
        ;
        return this["_createTemporaryTrackedClass"](PL$16/*cDef*/["type"]);
      };
      ;
      return PL$10/*parType*/;
      ;});
    ;});
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();