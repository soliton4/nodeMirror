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
if (promiseland._hasModule({ hashStr: "b01f33e378f7f08602d137a4491ddb72" })){ return promiseland._getModule("b01f33e378f7f08602d137a4491ddb72"); };
var PL$3/*extra*/;try{PL$3/*extra*/ = extra;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  ;
  var PL$2/*errorMsg*/ = PL$3/*extra*/["errorMsg"];
  ;
  var PL$4/*Tracker*/;
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
    PL$3/*extra*/["TrackerPs"].then(PL$7/*promiseland exception catcher*/(function(PL$9){PL$4/*Tracker*/ = PL$9["Tracker"];
    PL$5.resolve(); return;}), PL$8/*catch rejected*/);
    ;
  })();return PL$5;
  })();
  var PL$10/*TrackedPromise*/ = (function(PL$11/*parTrackFun*/){
  
    ;
    var PL$12/*self*/ = this;
    ;
    var PL$13/*lifeLine*/;
    ;
    var PL$14/*destroyFun*/ = (function(){
    
      ;
      if(PL$13/*lifeLine*/){
        PL$13/*lifeLine*/();
        PL$13/*lifeLine*/ = undefined;
      }else{
      PL$12/*self*/["then"]((function(){
      
        ;
        if(PL$13/*lifeLine*/){
          PL$13/*lifeLine*/();
          PL$13/*lifeLine*/ = undefined;
        };
        ;
        ;}));
      };
      ;
      ;});
    ;
    var PL$15/*t*/ = PL$4/*Tracker*/(PL$14/*destroyFun*/);
    ;
    var PL$16/*tracker*/ = PL$15/*t*/[0];
    ;
    this["rootTrack"] = PL$15/*t*/[1];
    this["memberTrack"] = PL$15/*t*/[2];
    var PL$17/*rootTrack*/ = this["rootTrack"];
    ;
    var PL$18/*thenAr*/ = [
      
    ];
    ;
    var PL$19/*elseAr*/ = [
      
    ];
    ;
    var PL$20/*thenFun*/ = (function(PL$21/*parThenFun*/, PL$22/*parElseFun*/){
    
      ;
      if(PL$21/*parThenFun*/){
        PL$18/*thenAr*/["push"]([
          PL$21/*parThenFun*/, 
          PL$17/*rootTrack*/()
        ]);
      };
      ;
      if(PL$22/*parElseFun*/){
        PL$19/*elseAr*/["push"](PL$22/*parElseFun*/);
      };
      ;
      ;});
    ;
    var PL$23/*thenReuseFun*/ = (function(PL$24/*parReuse*/, PL$21/*parThenFun*/, PL$22/*parElseFun*/){
    
      ;
      if(PL$21/*parThenFun*/){
        PL$18/*thenAr*/["push"]([
          PL$21/*parThenFun*/, 
          PL$24/*parReuse*/
        ]);
      }else{
      PL$24/*parReuse*/();
      };
      ;
      if(PL$22/*parElseFun*/){
        PL$19/*elseAr*/["push"](PL$22/*parElseFun*/);
      };
      ;
      ;});
    ;
    this["resolve"] = (function(PL$25/*value*/){
    
      ;
      if(PL$25/*value*/){
        var PL$26/*realValue*/ = PL$25/*value*/[0];
        ;
        PL$13/*lifeLine*/ = PL$11/*parTrackFun*/(PL$25/*value*/, PL$16/*tracker*/);
        PL$25/*value*/ = PL$26/*realValue*/;
      };
      ;
      PL$20/*thenFun*/ = (function(PL$21/*parThenFun*/){
      
        ;
        if(PL$21/*parThenFun*/){
          try
          {
            PL$21/*parThenFun*/([
              PL$25/*value*/, 
              PL$17/*rootTrack*/()
            ]);}catch(PL$27/*e*/){};
          ;
        };
        ;
        ;});
      PL$23/*thenReuseFun*/ = (function(PL$24/*parReuse*/, PL$21/*parThenFun*/){
      
        ;
        if(PL$21/*parThenFun*/){
          try
          {
            PL$21/*parThenFun*/([
              PL$25/*value*/, 
              PL$24/*parReuse*/
            ]);}catch(PL$27/*e*/){};
          ;
        }else{
        PL$24/*parReuse*/();
        };
        ;
        ;});
      if(! PL$18/*thenAr*/){
        return;
      };
      var PL$28/*i*/ = 0;
      ;
      var PL$29/*l*/ = PL$18/*thenAr*/["length"];
      ;
      for(PL$28/*i*/;(PL$28/*i*/ < PL$29/*l*/);++PL$28/*i*/){{
        try
        {
          var PL$30/*entryAr*/ = PL$18/*thenAr*/[PL$28/*i*/];
          ;
          PL$30/*entryAr*/[0]([
            PL$25/*value*/, 
            PL$30/*entryAr*/[1]
          ]);}catch(PL$27/*e*/){};
        ;}};
      ;
      PL$18/*thenAr*/ = undefined;
      PL$19/*elseAr*/ = undefined;
      this["resolve"] = undefined;
      this["reject"] = undefined;
      ;});
    this["reject"] = (function(PL$25/*value*/){
    
      ;
      PL$20/*thenFun*/ = (function(PL$31/*u*/, PL$22/*parElseFun*/){
      
        ;
        if(PL$22/*parElseFun*/){
          try
          {
            PL$22/*parElseFun*/(PL$25/*value*/);}catch(PL$27/*e*/){};
          ;
        };
        ;
        ;});
      PL$23/*thenReuseFun*/ = (function(PL$24/*parReuse*/, PL$31/*u*/, PL$22/*parElseFun*/){
      
        ;
        PL$24/*parReuse*/();
        if(PL$22/*parElseFun*/){
          try
          {
            PL$22/*parElseFun*/(PL$25/*value*/);}catch(PL$27/*e*/){};
          ;
        };
        ;
        ;});
      if(! PL$19/*elseAr*/){
        return;
      };
      var PL$28/*i*/ = 0;
      ;
      var PL$29/*l*/ = PL$19/*elseAr*/["length"];
      ;
      for(PL$28/*i*/;(PL$28/*i*/ < PL$29/*l*/);++PL$28/*i*/){{
        try
        {
          PL$19/*elseAr*/[PL$28/*i*/](PL$25/*value*/);}catch(PL$27/*e*/){};}};
      ;
      PL$18/*thenAr*/ = undefined;
      PL$19/*elseAr*/ = undefined;
      this["resolve"] = undefined;
      this["reject"] = undefined;
      ;});
    this["then"] = (function(PL$32/*par1*/, PL$33/*par2*/){
    
      ;
      PL$20/*thenFun*/(PL$32/*par1*/, PL$33/*par2*/);
      ;});
    this["thenReuse"] = (function(PL$24/*parReuse*/, PL$32/*par1*/, PL$33/*par2*/){
    
      ;
      PL$23/*thenReuseFun*/(PL$24/*parReuse*/, PL$32/*par1*/, PL$33/*par2*/);
      ;});
    this["promise"] = this["then"];
    this["then"]["then"] = this["then"];
    this["then"]["thenReuse"] = this["thenReuse"];
    ;});
  ;
  return PL$10/*TrackedPromise*/;
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();