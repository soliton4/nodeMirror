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

if (promiseland._hasModule({ hashStr: "2154142e298e5f0d8297b28f9c829070" })){ return promiseland._getModule("2154142e298e5f0d8297b28f9c829070"); };
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*a*/ = 2;
  ;
  return (function(){
  var PL$4/*C1*/;
  var PL$9/*C2*/;
  
    ;
    PL$4/*C1*/ = (function(){var PL$3/*inherited*/ = {};
    var res = promiseland.createClass({
      "a": (function(){
      
        ;
        return 1;
        ;}),
      "b": 3
    }, [], PL$3/*inherited*/);
    return res; })();PL$4/*C1*/;
    var PL$5/*v2*/ = PL$2/*a*/;
    ;
    var PL$6/*v1*/ = new PL$4/*C1*/();
    ;
    if((PL$5/*v2*/ != 2)){
      return {
        "success": false
      };
    };
    ;
    PL$9/*C2*/ = (function(){var PL$7/*inherited*/ = {};
    var res = promiseland.createClass({
      "a": (function(){
      
        ;
        return (PL$8/*inherited a*/.apply(this, []) + 1);
        ;})
    }, [PL$4/*C1*/], PL$7/*inherited*/);
    var PL$8/*inherited a*/ = PL$7/*inherited*/["a"];
    return res; })();PL$9/*C2*/;
    var PL$10/*v3*/ = new PL$9/*C2*/();
    ;
    if(((PL$10/*v3*/["a"]() != 2) || (PL$10/*v3*/["b"] != 3))){
      return {
        "success": false
      };
    };
    ;
    return {
      "success": true
    };
    ;})();
  ;})();
;return PL$1;
});
})();