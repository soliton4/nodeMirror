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

if (promiseland._hasModule({ hashStr: "36fd2cecbc7c12901444ff42e0149fc5" })){ return promiseland._getModule("36fd2cecbc7c12901444ff42e0149fc5"); };
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*x*/ = (function PL$3/*f*/(PL$4/*stdlib*/, PL$5/*foreign*/, PL$6/*heap*/){
  "use asm";
  
  
    ;
    function PL$3/*f*/(){
    
      ;
      var PL$2/*x*/ = 0;
      ;
      var PL$7/*y*/ = 0;
      ;
      PL$2/*x*/ = (((PL$2/*x*/ | 0) % (PL$7/*y*/ | 0)) | 0);
      ;};
    return {
      
    };
    ;});
  ;
  ;})();
;return PL$1;
});
})();