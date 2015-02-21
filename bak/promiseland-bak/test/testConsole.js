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
    if (promiseland._hasModule({ hashStr: "683fdae8bbd3e166602b5b40faa9b2e5" })){ return promiseland._getModule("683fdae8bbd3e166602b5b40faa9b2e5"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "683fdae8bbd3e166602b5b40faa9b2e5", "module": PL$1, promising: true });
var PL$20/*__dirname*/;try{PL$20/*__dirname*/ = __dirname;}catch(e){};
var PL$21/*promiseland*/;try{PL$21/*promiseland*/ = promiseland;}catch(e){};
var PL$30/*console*/;try{PL$30/*console*/ = console;}catch(e){};
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
var PL$5/*express*/;
var PL$7/*http*/;
var PL$9/*fs*/;
var PL$11/*socketIo*/;
var PL$13/*app*/;
var PL$14/*server*/;
var PL$22/*ClientProfile*/;
var PL$27/*clientProfile*/;
var PL$28/*mainio*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  __requireFun("express").then(PL$3/*promiseland exception catcher*/(function(PL$6){PL$5/*express*/ = PL$6;
  __requireFun("http").then(PL$3/*promiseland exception catcher*/(function(PL$8){PL$7/*http*/ = PL$8;
  __requireFun("fs").then(PL$3/*promiseland exception catcher*/(function(PL$10){PL$9/*fs*/ = PL$10;
  __requireFun("socket.io").then(PL$3/*promiseland exception catcher*/(function(PL$12){PL$11/*socketIo*/ = PL$12;
  PL$13/*app*/ = PL$5/*express*/();
  PL$14/*server*/ = PL$7/*http*/["createServer"](PL$13/*app*/);
  PL$13/*app*/["get"]("/", (function(PL$15/*req*/, PL$16/*res*/){
  
    ;
    PL$16/*res*/["setHeader"]("Content-Type", "text/html");
    PL$9/*fs*/["readFile"]("./testConsole/testConsole.html", (function(PL$17/*err*/, PL$18/*data*/){
    
      ;
      if(PL$17/*err*/){
        PL$16/*res*/["end"](PL$17/*err*/);
        return;
      };
      ;
      var PL$19/*s*/ = PL$18/*data*/["toString"]();
      ;
      PL$16/*res*/["end"](PL$19/*s*/);
      ;}));
    ;}));
  PL$13/*app*/["use"]("/promiseland", PL$5/*express*/["static"]((PL$20/*__dirname*/ + "/../")));
  PL$13/*app*/["use"]("/pl", PL$5/*express*/["static"]((PL$20/*__dirname*/ + "/../")));
  PL$13/*app*/["use"]("/requirejs", PL$5/*express*/["static"]("./requirejs"));
  PL$13/*app*/["use"]("/testmodules", PL$5/*express*/["static"]("./testmodules"));
  PL$13/*app*/["use"]("/test", PL$5/*express*/["static"](PL$20/*__dirname*/));
  PL$13/*app*/["use"]("/testConsole", PL$5/*express*/["static"]("./testConsole"));
  PL$13/*app*/["use"]("/dojo", PL$5/*express*/["static"]("./dojo"));
  PL$13/*app*/["use"]("/dojox", PL$5/*express*/["static"]("./dojox"));
  PL$13/*app*/["use"]("/dijit", PL$5/*express*/["static"]("./dijit"));
  PL$14/*server*/["listen"](3007);
  PL$21/*promiseland*/["set"]("profile", "server");
  PL$22/*ClientProfile*/ = (function(){
  
    ;
    this["name"] = (function(){
    
      ;
      return "client";
      ;});
    this["connections"] = {
      
    };
    this["find"] = (function(PL$23/*parId*/){
    
      ;
      return this["connections"][PL$23/*parId*/];
      ;});
    var PL$24/*nextid*/ = 1;
    ;
    this["addConnection"] = (function(PL$25/*connection*/){
    
      ;
      var PL$26/*id*/ = PL$24/*nextid*/;
      ;
      PL$24/*nextid*/++;
      this["connections"][PL$26/*id*/] = PL$25/*connection*/;
      this["emit"]("connection", PL$25/*connection*/);
      ;});
    ;});
  PL$22/*ClientProfile*/["prototype"] = new PL$21/*promiseland*/["ProfileBaseClass"]();
  PL$27/*clientProfile*/ = new PL$22/*ClientProfile*/();
  PL$21/*promiseland*/["addProfile"](PL$27/*clientProfile*/);
  PL$28/*mainio*/ = PL$11/*socketIo*/["listen"](PL$14/*server*/);
  PL$28/*mainio*/["on"]("connection", (function(PL$29/*socket*/){
  
    ;
    PL$30/*console*/["log"]("got connected");
    var PL$25/*connection*/ = new PL$21/*promiseland*/["ConnectionBaseClass"]();
    ;
    PL$25/*connection*/["socket"] = PL$29/*socket*/;
    PL$29/*socket*/["on"]("pl", (function(PL$18/*data*/){
    
      ;
      PL$25/*connection*/["emit"]("data", PL$18/*data*/);
      ;}));
    PL$25/*connection*/["send"] = (function(PL$18/*data*/){
    
      ;
      PL$29/*socket*/["emit"]("pl", PL$18/*data*/);
      ;});
    PL$27/*clientProfile*/["addConnection"](PL$25/*connection*/);
    PL$29/*socket*/["on"]("disconnect", (function(){
    
      ;
      PL$25/*connection*/["emit"]("disconnect");
      ;}));
    return;
    ;}));
  __requireFun("./testConsole/main").then(PL$3/*promiseland exception catcher*/(function(PL$31){PL$31;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();