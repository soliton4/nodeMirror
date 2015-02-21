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

var __Promise = promiseland.Promise;
var Promise = promiseland.Promise;
var __requireFun = function(parModule){
      var returnPromise = new __Promise();
      try{__require([parModule], function(m){
        if (promiseland.isPromiseLandPromisingModule(m)){
          m.then(function(realm){returnPromise.resolve(realm);}, function(e){returnPromise.reject(e);});
        }else{
          returnPromise.resolve(m);
        };
        }, function(err){ returnPromise.reject(err); });
      }catch(e){ returnPromise.reject(e); };
      return returnPromise.promise;};
    if (promiseland._hasModule({ hashStr: "1378438d98057a9df1d8cc99242e8cfb" })){ return promiseland._getModule("1378438d98057a9df1d8cc99242e8cfb"); };
var PL$2/*promiseland*/;try{PL$2/*promiseland*/ = promiseland;}catch(e){};
var PL$9/*io*/;try{PL$9/*io*/ = io;}catch(e){};
var PL$15/*window*/;try{PL$15/*window*/ = window;}catch(e){};
var PL$16/*KeysValues*/;try{PL$16/*KeysValues*/ = KeysValues;}catch(e){};
var PL$17/*i*/;try{PL$17/*i*/ = i;}catch(e){};
var PL$18/*KeyValue*/;try{PL$18/*KeyValue*/ = KeyValue;}catch(e){};
var PL$23/*console*/;try{PL$23/*console*/ = console;}catch(e){};
var PL$1 = (function(){
"use strict";
var PL$11/*runTests*/;
function PL$12/*querySt*/(PL$13/*Key*/){

  ;
  var PL$14/*url*/ = PL$15/*window*/["location"]["href"];
  ;
  PL$16/*KeysValues*/ = PL$14/*url*/["split"](/[\?&]+/);
  for(PL$17/*i*/ = 0;(PL$17/*i*/ < PL$16/*KeysValues*/["length"]);PL$17/*i*/++){{
    PL$18/*KeyValue*/ = PL$16/*KeysValues*/[PL$17/*i*/]["split"]("=");
    if((PL$18/*KeyValue*/[0] == PL$13/*Key*/)){
      return PL$18/*KeyValue*/[1];
    };
    ;}};
  ;
  ;};

  ;
  PL$2/*promiseland*/["set"]("profile", "client");
  var PL$3/*ServerProfile*/ = (function(){
  
    ;
    this["name"] = (function(){
    
      ;
      return "server";
      ;});
    this["find"] = (function(){
    
      ;
      return this["connection"];
      ;});
    ;});
  ;
  PL$3/*ServerProfile*/["prototype"] = new PL$2/*promiseland*/["ProfileBaseClass"]();
  var PL$4/*ServerConnection*/ = (function(PL$5/*socket*/){
  
    ;
    this["socket"] = PL$5/*socket*/;
    var PL$6/*self*/ = this;
    ;
    PL$5/*socket*/["on"]("pl", (function(PL$7/*data*/){
    
      ;
      PL$6/*self*/["emit"]("data", PL$7/*data*/);
      ;}));
    this["send"] = (function(PL$7/*data*/){
    
      ;
      PL$5/*socket*/["emit"]("pl", PL$7/*data*/);
      ;});
    ;});
  ;
  PL$4/*ServerConnection*/["prototype"] = new PL$2/*promiseland*/["ConnectionBaseClass"]();
  var PL$8/*serverProfile*/ = new PL$3/*ServerProfile*/();
  ;
  PL$2/*promiseland*/["addProfile"](PL$8/*serverProfile*/);
  var PL$5/*socket*/ = PL$9/*io*/["connect"]();
  ;
  PL$5/*socket*/["on"]("connect", (function(){
  
    ;
    var PL$10/*connection*/ = new PL$4/*ServerConnection*/(PL$5/*socket*/);
    ;
    PL$8/*serverProfile*/["connection"] = PL$10/*connection*/;
    PL$8/*serverProfile*/["emit"]("connection", PL$10/*connection*/);
    PL$11/*runTests*/();
    ;}));
  PL$5/*socket*/["on"]("disconnect", (function(){
  
    ;
    PL$8/*serverProfile*/["connection"]["emit"]("disconnect");
    PL$8/*serverProfile*/["connection"] = undefined;
    ;}));
  /* function querySt (){} - hoisted */;
  ;
  PL$11/*runTests*/ = (function(){
  var PL$19 = new __Promise();
  var PL$21/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$19.reject(e);
      };
    };
  };
  var PL$22/*catch rejected*/ = function(e){
    PL$19.reject(e);
  };
  var PL$24/*testObj*/;
  var PL$27/*collector*/;
  var PL$29/*type*/;
  PL$21/*promiseland exception catcher*/(function(){
  
    ;
    PL$23/*console*/["log"]("running tests");
    __requireFun("test/simpleTests").then(PL$21/*promiseland exception catcher*/(function(PL$25){PL$24/*testObj*/ = PL$25;
    __requireFun("test/frameTests").then(PL$21/*promiseland exception catcher*/(function(PL$26){PL$26;
    __requireFun("./testCollector").then(PL$21/*promiseland exception catcher*/(function(PL$28){PL$27/*collector*/ = PL$28;
    debugger;
    PL$29/*type*/ = (PL$12/*querySt*/("type") || "unknown");
    PL$27/*collector*/["postResult"](PL$29/*type*/, PL$24/*testObj*/);
    PL$27/*collector*/["waitForFinish"](PL$29/*type*/).then(PL$21/*promiseland exception catcher*/(function(PL$30){PL$30;
    PL$15/*window*/["close"]();
    PL$19.resolve(); return;}), PL$22/*catch rejected*/);
    ;}), PL$22/*catch rejected*/);
    ;}), PL$22/*catch rejected*/);
    ;}), PL$22/*catch rejected*/);
    ;
  })();return PL$19;
  });
  ;})();
;return PL$1;
});
})();