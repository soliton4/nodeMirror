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
if (promiseland._hasModule({ hashStr: "bc1568d607cb387e986a2b9e12779dd2" })){ return promiseland._getModule("bc1568d607cb387e986a2b9e12779dd2"); };
var PL$3/*extra*/;try{PL$3/*extra*/ = extra;}catch(e){};
var PL$1 = (function(){
"use strict";
var PL$13/*Wrapper*/;

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
  PL$13/*Wrapper*/ = (function(){var PL$10/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(PL$11/*parType*/, PL$12/*parInstance*/){
    
      ;
      if(! PL$11/*parType*/){
        PL$11/*parType*/ = PL$4/*classSystem*/["getTypeFromInstance"](PL$12/*parInstance*/);
      };
      ;
      this["instance"] = PL$12/*parInstance*/;
      this["type"] = PL$11/*parType*/;
      ;}),
    "getTrack": (function(){
    
      ;
      if(PL$4/*classSystem*/["isTrackedClass"](this["type"])){
        return PL$4/*classSystem*/["getTrack"](this["instance"]);
      };
      ;
      return (function(){
      
        ;
        ;});
      ;})
  }, [], PL$10/*inherited*/);
  return res; })();PL$13/*Wrapper*/;
  return PL$13/*Wrapper*/;
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();