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

if (promiseland._hasModule({ hashStr: "0c9679b382a25f97d6a160eeec6748f6" })){ return promiseland._getModule("0c9679b382a25f97d6a160eeec6748f6"); };
var PL$1 = (function(){
"use strict";

  ;
  ;
  return (function(PL$2/*destroyFun*/){
  var PL$21/*checkFun*/;
  var PL$22/*getBest*/;
  
    ;
    var PL$3/*curToken*/;
    ;
    var PL$4/*bestLen*/ = 0;
    ;
    var PL$5/*best*/;
    ;
    var PL$6/*first*/;
    ;
    var PL$7/*last*/;
    ;
    var PL$8/*rootCnt*/ = 0;
    ;
    var PL$9/*bringFront*/ = (function(PL$10/*entry*/){
    
      ;
      PL$10/*entry*/["cut"]();
      PL$10/*entry*/["newNext"](PL$6/*first*/);
      PL$6/*first*/["newPrev"](PL$10/*entry*/);
      PL$6/*first*/ = PL$10/*entry*/;
      ;});
    ;
    var PL$11/*con*/ = (function(PL$12/*t*/){
    var PL$18/*cut*/;
    
      ;
      var PL$13/*next*/;
      ;
      var PL$14/*prev*/;
      ;
      var PL$10/*entry*/ = {
        "newNext": (function(PL$15/*parNext*/){
        
          ;
          if(PL$15/*parNext*/){
            PL$13/*next*/ = PL$15/*parNext*/;
          }else{
          PL$7/*last*/ = PL$10/*entry*/;
          PL$13/*next*/ = undefined;
          };
          ;
          ;}),
        "newPrev": (function(PL$16/*parPrev*/){
        
          ;
          if(PL$16/*parPrev*/){
            PL$14/*prev*/ = PL$16/*parPrev*/;
          }else{
          PL$6/*first*/ = PL$10/*entry*/;
          PL$14/*prev*/ = undefined;
          };
          ;
          ;}),
        "getNext": (function(){
        
          ;
          return PL$13/*next*/;
          ;}),
        "getCon": (function(PL$17/*token*/){
        
          ;
          return PL$12/*t*/["getCon"](PL$17/*token*/);
          ;}),
        "cut": PL$18/*cut*/
      };
      ;
      PL$18/*cut*/ = (function(){
      
        ;
        if(PL$14/*prev*/){
          PL$14/*prev*/["newNext"](PL$13/*next*/);
        };
        ;
        if(PL$13/*next*/){
          PL$13/*next*/["newPrev"](PL$14/*prev*/);
        };
        ;
        ;});
      var PL$19/*len*/ = PL$12/*t*/["quickCon"]();
      ;
      if(PL$6/*first*/){
        if(((PL$19/*len*/ && (PL$19/*len*/ < PL$4/*bestLen*/)) || ! PL$4/*bestLen*/)){
          PL$4/*bestLen*/ = PL$19/*len*/;
          PL$6/*first*/["newPrev"](PL$10/*entry*/);
          PL$13/*next*/ = PL$6/*first*/;
          PL$6/*first*/ = PL$10/*entry*/;
        }else{
        PL$7/*last*/["newNext"](PL$10/*entry*/);
        PL$14/*prev*/ = PL$7/*last*/;
        PL$7/*last*/ = PL$10/*entry*/;
        };
        ;
      }else{
      PL$4/*bestLen*/ = PL$19/*len*/;
      PL$6/*first*/ = PL$10/*entry*/;
      PL$7/*last*/ = PL$10/*entry*/;
      };
      ;
      var PL$20/*done*/ = false;
      ;
      return (function(){
      
        ;
        if(PL$20/*done*/){
          return;
        };
        ;
        PL$20/*done*/ = true;
        PL$18/*cut*/();
        if((PL$7/*last*/ === PL$10/*entry*/)){
          PL$7/*last*/ = PL$14/*prev*/;
        };
        ;
        if((PL$6/*first*/ === PL$10/*entry*/)){
          PL$6/*first*/ = PL$13/*next*/;
        };
        ;
        PL$21/*checkFun*/();
        ;});
      ;});
    ;
    PL$21/*checkFun*/ = (function(){
    
      ;
      if(! PL$22/*getBest*/()){
        var PL$23/*f*/ = PL$2/*destroyFun*/;
        ;
        PL$2/*destroyFun*/ = (function(){
        
          ;
          ;});
        PL$23/*f*/();
      };
      ;
      ;});
    PL$22/*getBest*/ = (function(PL$17/*token*/){
    
      ;
      if(PL$8/*rootCnt*/){
        return 1;
      };
      ;
      if(PL$17/*token*/){
        PL$3/*curToken*/ = PL$17/*token*/;
      }else{
      PL$3/*curToken*/ = {
        
      };
      };
      ;
      if(PL$6/*first*/){
        var PL$24/*b*/ = PL$6/*first*/["getCon"](PL$3/*curToken*/);
        ;
        if(PL$24/*b*/){
          if(! PL$17/*token*/){
            PL$4/*bestLen*/ = PL$24/*b*/;
          };
          ;
          return PL$24/*b*/;
        };
        ;
        var PL$25/*iterator*/ = PL$6/*first*/["getNext"]();
        ;
        var PL$26/*tempBestLen*/ = 0;
        ;
        var PL$27/*tempBest*/;
        ;
        while(PL$25/*iterator*/){
        {
          PL$24/*b*/ = PL$25/*iterator*/["getCon"](PL$3/*curToken*/);
          if(((PL$24/*b*/ && (PL$24/*b*/ < PL$26/*tempBestLen*/)) || ! PL$26/*tempBestLen*/)){
            PL$26/*tempBestLen*/ = PL$24/*b*/;
            PL$27/*tempBest*/ = PL$25/*iterator*/;
          };
          ;
          PL$25/*iterator*/ = PL$25/*iterator*/["getNext"]();}};
        ;
        if(PL$26/*tempBestLen*/){
          if(! PL$17/*token*/){
            PL$9/*bringFront*/(PL$27/*tempBest*/);
            PL$4/*bestLen*/ = PL$26/*tempBestLen*/;
          };
          ;
          return PL$26/*tempBestLen*/;
        };
        ;
      };
      ;
      return 0;
      ;});
    var PL$28/*tracker*/ = {
      "getCon": (function(PL$17/*token*/){
      
        ;
        if((PL$3/*curToken*/ === PL$17/*token*/)){
          return 0;
        };
        ;
        return PL$22/*getBest*/(PL$17/*token*/);
        ;}),
      "quickCon": (function(){
      
        ;
        if(PL$8/*rootCnt*/){
          return 2;
        };
        ;
        return (PL$4/*bestLen*/ + 1);
        ;})
    };
    ;
    return [
      PL$28/*tracker*/, 
      (function(){
      
        ;
        ++PL$8/*rootCnt*/;
        var PL$20/*done*/ = false;
        ;
        return (function(){
        
          ;
          if(PL$20/*done*/){
            return;
          };
          ;
          PL$20/*done*/ = true;
          if(! --PL$8/*rootCnt*/){
            PL$21/*checkFun*/({
              
            });
          };
          ;
          ;});
        ;}), 
      (function(PL$12/*t*/){
      
        ;
        return PL$11/*con*/(PL$12/*t*/);
        ;})
    ];
    ;});
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();