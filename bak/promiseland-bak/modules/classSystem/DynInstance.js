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
if (promiseland._hasModule({ hashStr: "364f2bc6eb07ee5bf80941bae2e19f1b" })){ return promiseland._getModule("364f2bc6eb07ee5bf80941bae2e19f1b"); };
var PL$3/*extra*/;try{PL$3/*extra*/ = extra;}catch(e){};
var PL$1 = (function(){
"use strict";
var PL$17/*DynInstance*/;

  ;
  ;
  var PL$2/*errorMsg*/ = PL$3/*extra*/["errorMsg"];
  ;
  var PL$4/*classSystem*/;
  ;
  (function(){
  var PL$5 = new __Promise();
  var PL$7/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$5.reject(e);
      };
    };
  };
  var PL$8/*catch rejected*/ = function(e){
    PL$5.reject(e);
  };
  PL$7/*promiseland exception catcher*/(function(){
  
    ;
    PL$3/*extra*/["classSystemPs"].then(PL$7/*promiseland exception catcher*/(function(PL$9){PL$4/*classSystem*/ = PL$9["classSystem"];
    PL$5.resolve(); return;}), PL$8/*catch rejected*/);
    ;
  })();return PL$5;
  })();
  PL$17/*DynInstance*/ = (function(){var PL$10/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(PL$11/*parType*/, PL$12/*parInstance*/){
    
      ;
      this["extraTracks"] = [
        
      ];
      if(! PL$11/*parType*/){
        PL$11/*parType*/ = PL$4/*classSystem*/["getTypeFromInstance"](PL$12/*parInstance*/);
      };
      ;
      this["track"] = (function(){
      
        ;
        ;});
      if(PL$4/*classSystem*/["isVar"](PL$11/*parType*/)){
        this["instance"] = PL$12/*parInstance*/;
        this["type"] = PL$11/*parType*/;
        return;
      };
      ;
      var PL$13/*passedType*/ = PL$4/*classSystem*/["getTypeFromInstance"](PL$12/*parInstance*/);
      ;
      if(PL$4/*classSystem*/["isTemporaryTrackedClass"](PL$13/*passedType*/)){
        this["instance"] = PL$12/*parInstance*/[0];
        this["track"] = PL$12/*parInstance*/[1];
        this["_isTrack"] = true;
        this["type"] = PL$4/*classSystem*/["getClassFromTemporaryTracked"](PL$13/*passedType*/);
      }else{
      if(PL$4/*classSystem*/["isTrackedClass"](PL$13/*passedType*/)){
        this["instance"] = PL$12/*parInstance*/;
        this["track"] = PL$4/*classSystem*/["getTrack"](PL$12/*parInstance*/);
        ;
        this["_isTrack"] = true;
        this["type"] = PL$13/*passedType*/;
      }else{
      this["instance"] = PL$12/*parInstance*/;
      this["track"] = (function(){
      
        ;
        ;});
      this["type"] = PL$13/*passedType*/;
      };
      };
      ;
      ;}),
    "getInternalId": (function(){
    
      ;
      return PL$4/*classSystem*/["getInternalId"](this["instance"]);
      ;}),
    "getTrack": (function(){
    
      ;
      if(this["_isTrack"]){
        return PL$4/*classSystem*/["getTrack"](this["instance"]);
      };
      ;
      return (function(){
      
        ;
        ;});
      ;}),
    "isServe": (function(){
    
      ;
      return PL$4/*classSystem*/["isServe"](this["type"]);
      ;}),
    "getInstanceAsType": (function(PL$11/*parType*/){
    
      ;
      if(! PL$4/*classSystem*/["canSet"](PL$11/*parType*/, this["type"])){
        throw PL$2/*errorMsg*/["typeMissmatch"];
      };
      ;
      if(PL$4/*classSystem*/["isTemporaryTrackedClass"](PL$11/*parType*/)){
        var PL$14/*track*/ = this["getTrack"]();
        ;
        this["extraTracks"]["push"](PL$14/*track*/);
        return [
          this["instance"], 
          PL$14/*track*/
        ];
      };
      ;
      return this["instance"];
      ;}),
    "clearExtraTracks": (function(){
    
      ;
      var PL$15/*i*/ = 0;
      ;
      for(PL$15/*i*/ = 0;(PL$15/*i*/ < this["extraTracks"]["length"]);++PL$15/*i*/){{
        try
        {
          this["extraTracks"][PL$15/*i*/]();}catch(PL$16/*e*/){};
        ;}};
      ;
      ;})
  }, [], PL$10/*inherited*/);
  return res; })();PL$17/*DynInstance*/;
  return PL$17/*DynInstance*/;
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();