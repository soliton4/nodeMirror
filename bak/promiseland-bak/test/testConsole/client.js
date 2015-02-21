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
    if (promiseland._hasModule({ hashStr: "dad109106b66194f53ef31dbb39e0a88" })){ return promiseland._getModule("dad109106b66194f53ef31dbb39e0a88"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "dad109106b66194f53ef31dbb39e0a88", "module": PL$1, promising: true });
var PL$5/*promiseland*/;try{PL$5/*promiseland*/ = promiseland;}catch(e){};
var PL$12/*io*/;try{PL$12/*io*/ = io;}catch(e){};
var PL$30/*document*/;try{PL$30/*document*/ = document;}catch(e){};
var PL$2 = (function(){
"use strict";
var PL$3/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$1.reject(e);
    };
  };
};
var PL$4/*catch rejected*/ = function(e){
  PL$1.reject(e);
};
var PL$6/*ServerProfile*/;
var PL$7/*ServerConnection*/;
var PL$11/*serverProfile*/;
var PL$8/*socket*/;
var PL$14/*Button*/;
var PL$16/*TableContainer*/;
var PL$18/*Text*/;
var PL$20/*main*/;
var PL$22/*tc*/;
var PL$23/*runTests*/;
var PL$40/*b*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  PL$5/*promiseland*/["set"]("profile", "client");
  PL$6/*ServerProfile*/ = (function(){
  
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
  PL$6/*ServerProfile*/["prototype"] = new PL$5/*promiseland*/["ProfileBaseClass"]();
  PL$7/*ServerConnection*/ = (function(PL$8/*socket*/){
  
    ;
    this["socket"] = PL$8/*socket*/;
    var PL$9/*self*/ = this;
    ;
    PL$8/*socket*/["on"]("pl", (function(PL$10/*data*/){
    
      ;
      PL$9/*self*/["emit"]("data", PL$10/*data*/);
      ;}));
    this["send"] = (function(PL$10/*data*/){
    
      ;
      PL$8/*socket*/["emit"]("pl", PL$10/*data*/);
      ;});
    ;});
  PL$7/*ServerConnection*/["prototype"] = new PL$5/*promiseland*/["ConnectionBaseClass"]();
  PL$11/*serverProfile*/ = new PL$6/*ServerProfile*/();
  PL$5/*promiseland*/["addProfile"](PL$11/*serverProfile*/);
  PL$8/*socket*/ = PL$12/*io*/["connect"]();
  PL$8/*socket*/["on"]("connect", (function(){
  
    ;
    var PL$13/*connection*/ = new PL$7/*ServerConnection*/(PL$8/*socket*/);
    ;
    PL$11/*serverProfile*/["connection"] = PL$13/*connection*/;
    PL$11/*serverProfile*/["emit"]("connection", PL$13/*connection*/);
    ;}));
  PL$8/*socket*/["on"]("disconnect", (function(){
  
    ;
    PL$11/*serverProfile*/["connection"]["emit"]("disconnect");
    PL$11/*serverProfile*/["connection"] = undefined;
    ;}));
  __requireFun("dijit/form/Button").then(PL$3/*promiseland exception catcher*/(function(PL$15){PL$14/*Button*/ = PL$15;
  __requireFun("dojox/layout/TableContainer").then(PL$3/*promiseland exception catcher*/(function(PL$17){PL$16/*TableContainer*/ = PL$17;
  __requireFun("./Text").then(PL$3/*promiseland exception catcher*/(function(PL$19){PL$18/*Text*/ = PL$19;
  __requireFun("testConsole/main").then(PL$3/*promiseland exception catcher*/(function(PL$21){PL$20/*main*/ = PL$21;
  PL$22/*tc*/;
  PL$23/*runTests*/ = (function(){
  var PL$24 = new __Promise();
  var PL$26/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$24.reject(e);
      };
    };
  };
  var PL$27/*catch rejected*/ = function(e){
    PL$24.reject(e);
  };
  var PL$28/*results*/;
  var PL$31/*f*/;
  var PL$32/*t*/;
  var PL$33/*testRes*/;
  var PL$34/*cnt*/;
  var PL$35/*successCnt*/;
  var PL$36/*testName*/;
  var PL$37/*errorStr*/;
  var PL$38/*textStr*/;
  var PL$39/*w*/;
  PL$26/*promiseland exception catcher*/(function(){
  
    ;
    PL$20/*main*/["runTests"]().then(PL$26/*promiseland exception catcher*/(function(PL$29){PL$28/*results*/ = PL$29;
    if(PL$22/*tc*/){
      PL$22/*tc*/["destroy"]();
    };
    ;
    PL$22/*tc*/ = new PL$16/*TableContainer*/({
      
    });
    PL$22/*tc*/["placeAt"](PL$30/*document*/["body"]);
    if(PL$28/*results*/["failed"]){
      PL$31/*f*/ = new PL$18/*Text*/({
        "label": "failed",
        "text": "-"
      });
      PL$22/*tc*/["addChild"](PL$31/*f*/);
    }else{
    PL$32/*t*/;
    for(PL$32/*t*/ in PL$28/*results*/){
      PL$33/*testRes*/ = PL$28/*results*/[PL$32/*t*/];
      PL$34/*cnt*/ = 0;
      PL$35/*successCnt*/ = 0;
      PL$36/*testName*/;
      PL$37/*errorStr*/ = "";
      for(PL$36/*testName*/ in PL$33/*testRes*/){
        ++PL$34/*cnt*/;
        if(PL$33/*testRes*/[PL$36/*testName*/]){
          ++PL$35/*successCnt*/;
        }else{
        PL$37/*errorStr*/ += (PL$36/*testName*/ + " failed; \n");
        };
        ;};
      ;
      PL$38/*textStr*/ = (("run " + PL$34/*cnt*/) + " tests. \n");
      PL$38/*textStr*/ += ((PL$34/*cnt*/ - PL$35/*successCnt*/) + " failed. \n");
      PL$38/*textStr*/ += PL$37/*errorStr*/;
      PL$39/*w*/ = new PL$18/*Text*/({
        "label": PL$32/*t*/,
        "text": PL$38/*textStr*/
      });
      PL$22/*tc*/["addChild"](PL$39/*w*/);};
    ;
    };
    ;
    PL$22/*tc*/["startup"]();
    PL$24.resolve(); return;}), PL$27/*catch rejected*/);
    ;
  })();return PL$24;
  });
  PL$40/*b*/ = new PL$14/*Button*/({
    "label": "test",
    "onClick": PL$23/*runTests*/
  });
  PL$40/*b*/["placeAt"](PL$30/*document*/["body"]);
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();