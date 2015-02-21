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

if (promiseland._hasModule({ hashStr: "45793d21303f9b6bf6d65e96e3d6b248" })){ return promiseland._getModule("45793d21303f9b6bf6d65e96e3d6b248"); };
var PL$3/*__dirname*/;try{PL$3/*__dirname*/ = __dirname;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*isServer*/ = false;
  ;
  if(PL$3/*__dirname*/){
    PL$2/*isServer*/ = true;
  };
  ;
  var PL$4/*serverRun*/ = false;
  ;
  var PL$5/*clientRun*/ = false;
  ;
  var PL$6/*exs*/ = (function(){
  if (!promiseland.profileHas("server")){
  return;
  };
  
    ;
    PL$4/*serverRun*/ = true;
    ;});
  ;
  var PL$7/*exc*/ = (function(){
  if (!promiseland.profileHas("client")){
  return;
  };
  
    ;
    PL$5/*clientRun*/ = true;
    ;});
  ;
  PL$6/*exs*/();
  PL$7/*exc*/();
  if((PL$2/*isServer*/ && PL$5/*clientRun*/)){
    return {
      "success": false
    };
  };
  ;
  if((PL$2/*isServer*/ && ! PL$4/*serverRun*/)){
    return {
      "success": false
    };
  };
  ;
  if((! PL$2/*isServer*/ && PL$4/*serverRun*/)){
    return {
      "success": false
    };
  };
  ;
  if((! PL$2/*isServer*/ && ! PL$5/*clientRun*/)){
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