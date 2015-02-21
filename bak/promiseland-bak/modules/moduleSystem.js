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

if (promiseland._hasModule({ hashStr: "b4d87d3050f4ff97d753b76790f08b0f" })){ return promiseland._getModule("b4d87d3050f4ff97d753b76790f08b0f"); };
var PL$3/*promiseland*/;try{PL$3/*promiseland*/ = promiseland;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  ;
  var PL$2/*modules*/ = {
    
  };
  ;
  PL$3/*promiseland*/["_registerModule"] = (function(PL$4/*par*/){
  
    ;
    if(this["_hasModule"](PL$4/*par*/["hashStr"])){
      return false;
    };
    ;
    PL$2/*modules*/[PL$4/*par*/["hashStr"]] = {
      "promising": PL$4/*par*/["promising"],
      "module": PL$4/*par*/["module"]
    };
    return true;
    ;});
  PL$3/*promiseland*/["_getModule"] = (function(PL$5/*parHashStr*/){
  
    ;
    return PL$2/*modules*/[PL$5/*parHashStr*/]["module"];
    ;});
  PL$3/*promiseland*/["_hasModule"] = (function(PL$5/*parHashStr*/){
  
    ;
    if(PL$2/*modules*/[PL$5/*parHashStr*/]){
      return true;
    };
    ;
    return false;
    ;});
  PL$3/*promiseland*/["isPromiseLandPromisingModule"] = (function(PL$6/*parM*/){
  
    ;
    var PL$7/*i*/;
    ;
    for(PL$7/*i*/ in PL$2/*modules*/){
      if((PL$2/*modules*/[PL$7/*i*/] && (PL$2/*modules*/[PL$7/*i*/]["module"] === PL$6/*parM*/))){
        return PL$2/*modules*/[PL$7/*i*/]["promising"];
      };
      ;};
    ;
    return false;
    ;});
  return PL$2/*modules*/;
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();