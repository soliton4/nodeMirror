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
    var Callback = promiseland.Callback;
if (promiseland._hasModule({ hashStr: "ab24c895ca1a002e87ecc896086d15d3" })){ return promiseland._getModule("ab24c895ca1a002e87ecc896086d15d3"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "ab24c895ca1a002e87ecc896086d15d3", "module": PL$1, promising: true });
var PL$5/*promiseland*/;try{PL$5/*promiseland*/ = promiseland;}catch(e){};
var PL$21/*Callback*/;try{PL$21/*Callback*/ = Callback;}catch(e){};
var PL$22/*setTimeout*/;try{PL$22/*setTimeout*/ = setTimeout;}catch(e){};
var PL$25/*Promise*/;try{PL$25/*Promise*/ = Promise;}catch(e){};
var PL$29/*console*/;try{PL$29/*console*/ = console;}catch(e){};
var PL$33/*io*/;try{PL$33/*io*/ = io;}catch(e){};
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
var PL$6/*Eventemitter*/;
var PL$8/*ServerFrame*/;
var PL$10/*ServerNoAuthFrame*/;
var PL$12/*serverFrame*/;
var PL$13/*serverNoAuthFrame*/;
var PL$14/*wait*/;
var PL$24/*connectPs*/;
var PL$26/*authPs*/;
var PL$27/*startConnect*/;
var PL$45/*Client*/;
var PL$28/*client*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  PL$5/*promiseland*/["addLocalFrameName"]("client");
  __requireFun("./Eventemitter").then(PL$3/*promiseland exception catcher*/(function(PL$7){PL$6/*Eventemitter*/ = PL$7;
  PL$8/*ServerFrame*/ = (function(){var PL$9/*inherited*/ = {};
  var res = promiseland.createClass({
    "name": "server"
  }, [PL$5/*promiseland*/["FrameBaseClass"]], PL$9/*inherited*/);
  return res; })();
  PL$10/*ServerNoAuthFrame*/ = (function(){var PL$11/*inherited*/ = {};
  var res = promiseland.createClass({
    "name": "serverNoAuth"
  }, [PL$5/*promiseland*/["FrameBaseClass"]], PL$11/*inherited*/);
  return res; })();
  PL$12/*serverFrame*/ = new PL$8/*ServerFrame*/();
  PL$5/*promiseland*/["addFrame"](PL$12/*serverFrame*/);
  PL$13/*serverNoAuthFrame*/ = new PL$10/*ServerNoAuthFrame*/();
  PL$5/*promiseland*/["addFrame"](PL$13/*serverNoAuthFrame*/);
  PL$14/*wait*/ = (function(PL$15/*parMs*/){
  var PL$16 = new __Promise();
  var PL$18/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$16.reject(e);
      };
    };
  };
  var PL$19/*catch rejected*/ = function(e){
    PL$16.reject(e);
  };
  var PL$20/*cb*/;
  PL$18/*promiseland exception catcher*/(function(){
  
    ;
    PL$20/*cb*/ = new PL$21/*Callback*/();
    PL$22/*setTimeout*/(PL$20/*cb*/, (PL$15/*parMs*/ || 2000));
    PL$20/*cb*/["promise"].then(PL$18/*promiseland exception catcher*/(function(PL$23){PL$23;
    PL$16.resolve(); return;}), PL$19/*catch rejected*/);
    ;
  })();return PL$16;
  });
  PL$24/*connectPs*/ = new PL$25/*Promise*/();
  PL$26/*authPs*/ = new PL$25/*Promise*/();
  PL$27/*startConnect*/ = (function(PL$28/*client*/){
  
    ;
    PL$29/*console*/["log"]("start connecting");
    var PL$30/*serverConnection*/;
    ;
    var PL$31/*authConnection*/;
    ;
    var PL$32/*socket*/ = PL$33/*io*/["connect"](null, {
      "timeout": 10
    });
    ;
    var PL$34/*failFun*/ = (function(){
    
      ;
      if(PL$28/*client*/["connected"]){
        PL$28/*client*/["connected"] = false;
        PL$28/*client*/["_newPromises"]();
        PL$28/*client*/["emit"]("disconnect");
      };
      ;
      PL$29/*console*/["log"]("connection failed");
      try
      {
        if(PL$30/*serverConnection*/){
          PL$30/*serverConnection*/["disconnect"]();
          PL$30/*serverConnection*/ = undefined;
        };
        ;
        if(PL$31/*authConnection*/){
          PL$31/*authConnection*/["disconnect"]();
          PL$31/*authConnection*/ = undefined;
        };
        ;}catch(PL$35/*e*/){};
      ;
      ;});
    ;
    PL$32/*socket*/["on"]("connect_timeout", PL$34/*failFun*/);
    PL$32/*socket*/["on"]("reconnect_attempt", (function(){
    
      ;
      PL$29/*console*/["log"]("reconnect_attempt");
      ;}));
    PL$32/*socket*/["on"]("reconnecting", (function(){
    
      ;
      PL$29/*console*/["log"]("reconnecting");
      ;}));
    PL$32/*socket*/["on"]("reconnect_error", PL$34/*failFun*/);
    PL$32/*socket*/["on"]("reconnect_failed", PL$34/*failFun*/);
    var PL$36/*connectFun*/ = (function(){
    
      ;
      PL$29/*console*/["log"]("connected");
      if(PL$30/*serverConnection*/){
        PL$29/*console*/["log"]("something is strange");
      };
      ;
      PL$28/*client*/["connected"] = true;
      PL$30/*serverConnection*/ = new PL$12/*serverFrame*/["ConnectionBaseClass"]();
      PL$30/*serverConnection*/["send"] = (function(PL$37/*data*/){
      
        ;
        PL$32/*socket*/["emit"]("pl", PL$37/*data*/);
        ;});
      PL$12/*serverFrame*/["newConnection"](PL$30/*serverConnection*/);
      PL$28/*client*/["_resolveConnectPs"]();
      PL$28/*client*/["emit"]("connect");
      PL$31/*authConnection*/ = new PL$12/*serverFrame*/["ConnectionBaseClass"]();
      PL$31/*authConnection*/["send"] = (function(PL$37/*data*/){
      
        ;
        PL$32/*socket*/["emit"]("a", PL$37/*data*/);
        ;});
      PL$13/*serverNoAuthFrame*/["newConnection"](PL$31/*authConnection*/);
      PL$28/*client*/["_resolveAuthPs"]();
      PL$28/*client*/["emit"]("auth_connect");
      ;});
    ;
    PL$32/*socket*/["on"]("pl", (function(PL$37/*data*/){
    
      ;
      PL$30/*serverConnection*/["data"](PL$37/*data*/);
      ;}));
    PL$32/*socket*/["on"]("a", (function(PL$37/*data*/){
    
      ;
      PL$31/*authConnection*/["data"](PL$37/*data*/);
      ;}));
    PL$32/*socket*/["on"]("connect", PL$36/*connectFun*/);
    PL$32/*socket*/["on"]("disconnect", PL$34/*failFun*/);
    ;});
  PL$45/*Client*/ = (function(){var PL$38/*inherited*/ = {};
  var res = promiseland.createClass({
    "connected": false,
    "constructor": (function(){
    
      ;
      this["_newPromises"]();
      var PL$39/*self*/ = this;
      ;
      (function(){
      var PL$40 = new __Promise();
      var PL$42/*promiseland exception catcher*/ = function(code){
        return function(res){
          try{ code(res); }catch(e){
            PL$40.reject(e);
          };
        };
      };
      var PL$43/*catch rejected*/ = function(e){
        PL$40.reject(e);
      };
      PL$42/*promiseland exception catcher*/(function(){
      
        ;
        PL$14/*wait*/(100).then(PL$42/*promiseland exception catcher*/(function(PL$44){PL$44;
        PL$27/*startConnect*/(PL$39/*self*/);
        PL$40.resolve(); return;}), PL$43/*catch rejected*/);
        ;
      })();return PL$40;
      })();
      ;}),
    "_newPromises": (function(){
    
      ;
      this["_connectPs"] = new PL$25/*Promise*/();
      this["_authPs"] = new PL$25/*Promise*/();
      ;}),
    "_resolveConnectPs": (function(){
    
      ;
      try
      {
        this["_connectPs"]["resolve"]();}catch(PL$35/*e*/){
        PL$29/*console*/["log"](PL$35/*e*/);};
      ;
      ;}),
    "_resolveAuthPs": (function(){
    
      ;
      try
      {
        this["_connectPs"]["resolve"]();}catch(PL$35/*e*/){
        PL$29/*console*/["log"](PL$35/*e*/);};
      ;
      ;}),
    "getConnectPs": (function(){
    
      ;
      return this["_connectPs"];
      ;}),
    "getAuthPs": (function(){
    
      ;
      return this["_authPs"];
      ;})
  }, [PL$6/*Eventemitter*/], PL$38/*inherited*/);
  return res; })();PL$45/*Client*/;
  PL$28/*client*/ = new PL$45/*Client*/();
  PL$1.resolve(PL$28/*client*/); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();