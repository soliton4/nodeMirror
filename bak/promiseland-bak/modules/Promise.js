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

if (promiseland._hasModule({ hashStr: "2689a263f04ed8c1cdcba51e5c9de07f" })){ return promiseland._getModule("2689a263f04ed8c1cdcba51e5c9de07f"); };
var PL$17/*promiseland*/;try{PL$17/*promiseland*/ = promiseland;}catch(e){};
var PL$37/*setTimeout*/;try{PL$37/*setTimeout*/ = setTimeout;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  ;
  var PL$2/*Promise*/ = (function(PL$3/*parCancelCallback*/){
  
    ;
    var PL$4/*thenAr*/ = [
      
    ];
    ;
    var PL$5/*elseAr*/ = [
      
    ];
    ;
    var PL$6/*thenFun*/ = (function(PL$7/*parThenFun*/, PL$8/*parElseFun*/){
    
      ;
      if(PL$7/*parThenFun*/){
        PL$4/*thenAr*/["push"](PL$7/*parThenFun*/);
      };
      ;
      if(PL$8/*parElseFun*/){
        PL$5/*elseAr*/["push"](PL$8/*parElseFun*/);
      };
      ;
      ;});
    ;
    this["resolve"] = (function(PL$9/*value*/){
    
      ;
      PL$6/*thenFun*/ = (function(PL$7/*parThenFun*/){
      
        ;
        try
        {
          PL$7/*parThenFun*/(PL$9/*value*/);}catch(PL$10/*e*/){};
        ;
        ;});
      if(! PL$4/*thenAr*/){
        return;
      };
      var PL$11/*i*/ = 0;
      ;
      var PL$12/*l*/ = PL$4/*thenAr*/["length"];
      ;
      for(PL$11/*i*/;(PL$11/*i*/ < PL$12/*l*/);++PL$11/*i*/){{
        try
        {
          PL$4/*thenAr*/[PL$11/*i*/](PL$9/*value*/);}catch(PL$10/*e*/){};}};
      ;
      PL$4/*thenAr*/ = undefined;
      PL$5/*elseAr*/ = undefined;
      ;});
    this["reject"] = (function(PL$9/*value*/){
    
      ;
      PL$6/*thenFun*/ = (function(PL$13/*u*/, PL$8/*parElseFun*/){
      
        ;
        if(PL$8/*parElseFun*/){
          try
          {
            PL$8/*parElseFun*/(PL$9/*value*/);}catch(PL$10/*e*/){};
          ;
        };
        ;
        ;});
      if(! PL$5/*elseAr*/){
        return;
      };
      var PL$11/*i*/ = 0;
      ;
      var PL$12/*l*/ = PL$5/*elseAr*/["length"];
      ;
      for(PL$11/*i*/;(PL$11/*i*/ < PL$12/*l*/);++PL$11/*i*/){{
        try
        {
          PL$5/*elseAr*/[PL$11/*i*/](PL$9/*value*/);}catch(PL$10/*e*/){};}};
      ;
      PL$4/*thenAr*/ = undefined;
      PL$5/*elseAr*/ = undefined;
      ;});
    this["then"] = (function(PL$14/*par1*/, PL$15/*par2*/){
    
      ;
      PL$6/*thenFun*/(PL$14/*par1*/, PL$15/*par2*/);
      ;});
    this["cancel"] = (function(PL$16/*parReason*/){
    
      ;
      this["cancel"] = (function(){
      
        ;
        ;});
      PL$6/*thenFun*/ = (function(){
      
        ;
        ;});
      if(PL$3/*parCancelCallback*/){
        PL$3/*parCancelCallback*/(PL$16/*parReason*/);
      };
      ;
      ;});
    this["promise"] = this["then"];
    this["then"]["then"] = this["then"];
    ;});
  ;
  PL$17/*promiseland*/["Promise"] = PL$2/*Promise*/;
  var PL$18/*all*/ = (function(PL$19/*promisesAr*/){
  var PL$23/*cnt*/;
  
    ;
    var PL$20/*res*/ = new PL$2/*Promise*/();
    ;
    var PL$21/*resAr*/ = (PL$19/*promisesAr*/ ? PL$19/*promisesAr*/["slice"]() : [
      
    ]);
    ;
    var PL$22/*check*/ = (function(){
    
      ;
      if(PL$23/*cnt*/){
        return;
      };
      ;
      PL$20/*res*/["resolve"](PL$21/*resAr*/);
      ;});
    ;
    PL$23/*cnt*/ = 1;
    var PL$6/*thenFun*/ = (function(PL$24/*parI*/){
    
      ;
      return (function(PL$25/*r*/){
      
        ;
        PL$21/*resAr*/[PL$24/*parI*/] = PL$25/*r*/;
        --PL$23/*cnt*/;
        PL$22/*check*/();
        ;});
      ;});
    ;
    var PL$11/*i*/ = 0;
    ;
    var PL$12/*l*/ = PL$21/*resAr*/["length"];
    ;
    for(PL$11/*i*/;(PL$11/*i*/ < PL$12/*l*/);++PL$11/*i*/){{
      ++PL$23/*cnt*/;
      PL$21/*resAr*/[PL$11/*i*/]["then"](PL$6/*thenFun*/(PL$11/*i*/));}};
    ;
    --PL$23/*cnt*/;
    PL$22/*check*/();
    return PL$20/*res*/;
    ;});
  ;
  PL$17/*promiseland*/["all"] = PL$18/*all*/;
  var PL$26/*Callback*/ = (function(){
  
    ;
    var PL$27/*promise*/ = new PL$2/*Promise*/();
    ;
    var PL$28/*callback*/ = (function(){
    var PL$29/*arguments*/ = arguments;
    
      ;
      PL$27/*promise*/["resolve"](PL$29/*arguments*/);
      ;});
    ;
    PL$28/*callback*/["promise"] = PL$27/*promise*/["promise"];
    PL$28/*callback*/["callback"] = PL$28/*callback*/;
    return PL$28/*callback*/;
    ;});
  ;
  PL$17/*promiseland*/["Callback"] = PL$26/*Callback*/;
  var PL$30/*CallbackErrorFirst*/ = (function(){
  
    ;
    var PL$27/*promise*/ = new PL$2/*Promise*/();
    ;
    var PL$28/*callback*/ = (function(PL$31/*err*/, PL$20/*res*/){
    
      ;
      if(PL$31/*err*/){
        PL$27/*promise*/["reject"](PL$31/*err*/);
        return;
      };
      ;
      PL$27/*promise*/["resolve"](PL$20/*res*/);
      ;});
    ;
    PL$28/*callback*/["promise"] = PL$27/*promise*/["promise"];
    PL$28/*callback*/["callback"] = PL$28/*callback*/;
    return PL$28/*callback*/;
    ;});
  ;
  PL$17/*promiseland*/["CallbackErrorFirst"] = PL$30/*CallbackErrorFirst*/;
  PL$17/*promiseland*/["getPromise"] = (function(PL$32/*par*/){
  
    ;
    return PL$32/*par*/;
    ;});
  PL$17/*promiseland*/["importPromise"] = (function(PL$32/*par*/){
  
    ;
    var PL$33/*p*/ = new PL$2/*Promise*/();
    ;
    PL$32/*par*/["then"]((function(PL$20/*res*/){
    
      ;
      PL$33/*p*/["resolve"](PL$20/*res*/);
      ;}), (function(PL$34/*rea*/){
    
      ;
      PL$33/*p*/["reject"](PL$34/*rea*/);
      ;}));
    return PL$33/*p*/["promise"];
    ;});
  PL$17/*promiseland*/["wait"] = (function(PL$35/*parMs*/){
  
    ;
    var PL$36/*cb*/ = new PL$26/*Callback*/();
    ;
    PL$37/*setTimeout*/(PL$36/*cb*/, (PL$35/*parMs*/ || 0));
    return PL$36/*cb*/["promise"];
    ;});
  return PL$2/*Promise*/;
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();