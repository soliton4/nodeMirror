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
if (promiseland._hasModule({ hashStr: "8115065bde670d9a7f3a47ba09d7015f" })){ return promiseland._getModule("8115065bde670d9a7f3a47ba09d7015f"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "8115065bde670d9a7f3a47ba09d7015f", "module": PL$1, promising: true });
var PL$14/*Callback*/;try{PL$14/*Callback*/ = Callback;}catch(e){};
var PL$25/*console*/;try{PL$25/*console*/ = console;}catch(e){};
var PL$34/*promiseland*/;try{PL$34/*promiseland*/ = promiseland;}catch(e){};
var PL$47/*process*/;try{PL$47/*process*/ = process;}catch(e){};
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
var PL$5/*fs*/;
var PL$7/*compileDir*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  __requireFun("fs").then(PL$3/*promiseland exception catcher*/(function(PL$6){PL$5/*fs*/ = PL$6;
  PL$7/*compileDir*/ = (function(PL$8/*parDir*/){
  var PL$9 = new __Promise();
  var PL$11/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$9.reject(e);
      };
    };
  };
  var PL$12/*catch rejected*/ = function(e){
    PL$9.reject(e);
  };
  var PL$13/*callback*/;
  var PL$15/*files*/;
  var PL$18/*i*/;
  var PL$22/*filename*/;
  var PL$23/*completeFilename*/;
  var PL$26/*jsStr*/;
  var PL$31/*codeStr*/;
  var PL$33/*parser*/;
  var PL$35/*res*/;
  var PL$39/*stats*/;
  PL$11/*promiseland exception catcher*/(function(){
  
    ;
    PL$13/*callback*/ = new PL$14/*Callback*/();
    PL$5/*fs*/["readdir"](PL$8/*parDir*/, PL$13/*callback*/);
    PL$13/*callback*/["promise"].then(PL$11/*promiseland exception catcher*/(function(PL$16){PL$15/*files*/ = PL$16[1];
    
    var PL$17 = new __Promise();if(PL$15/*files*/){
      PL$18/*i*/ = 0;var PL$20 = new __Promise();
      var PL$19 = function(){var PL$21 = new __Promise();
      if((PL$18/*i*/ < PL$15/*files*/["length"])){
      PL$13/*callback*/ = new PL$14/*Callback*/();
      PL$22/*filename*/ = PL$15/*files*/[PL$18/*i*/];
      PL$23/*completeFilename*/ = ((PL$8/*parDir*/ + "/") + PL$22/*filename*/);
      
      var PL$24 = new __Promise();if((PL$22/*filename*/["substr"]((PL$22/*filename*/["length"] - 6)) == ".pland")){
        PL$25/*console*/["log"](("processing:" + PL$23/*completeFilename*/));
        PL$26/*jsStr*/ = "";
        var PL$27 = new __Promise();
        var PL$28 = new __Promise();
        var PL$29/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$28.resolve(e); }; }; };
        var PL$30 = function(e){ PL$28.resolve(e); };
        PL$29/*try catch*/(function(){
          PL$5/*fs*/["readFile"](PL$23/*completeFilename*/, {
            "encoding": "utf8"
          }, PL$13/*callback*/["callback"]);
          PL$13/*callback*/["promise"].then(PL$29/*try catch*/(function(PL$32){PL$31/*codeStr*/ = PL$32[1];
          PL$33/*parser*/ = new PL$34/*promiseland*/["Parser"]();
          PL$33/*parser*/["parse"](PL$31/*codeStr*/).then(PL$29/*try catch*/(function(PL$36){PL$35/*res*/ = PL$36;
          if((PL$35/*res*/["errors"] && PL$35/*res*/["errors"]["length"])){
            PL$25/*console*/["log"](PL$35/*res*/["errors"][0]);
            PL$26/*jsStr*/ = "";
          }else{
          PL$26/*jsStr*/ = PL$35/*res*/["javascript"];
          };
          ;
          PL$27.resolve();}), PL$30);
        ;}), PL$30);
        ;})();
        PL$28.then(PL$11/*promiseland exception catcher*/(function(PL$37/*e*/){
          PL$25/*console*/["log"](PL$37/*e*/);
          PL$25/*console*/["log"]("error");
          PL$27.resolve();;}));
        PL$27.then(PL$11/*promiseland exception catcher*/(function(){;
        ;
        PL$13/*callback*/ = new PL$14/*Callback*/();
        PL$5/*fs*/["writeFile"]((PL$23/*completeFilename*/["substr"](0, (PL$23/*completeFilename*/["length"] - 6)) + ".js"), PL$26/*jsStr*/, PL$13/*callback*/["callback"]);
        PL$13/*callback*/["promise"].then(PL$11/*promiseland exception catcher*/(function(PL$38){PL$38;
        PL$24.resolve();;}), PL$12/*catch rejected*/);
        ;}), PL$12/*catch rejected*/)
      }else{
      PL$13/*callback*/ = new PL$14/*Callback*/();
      PL$5/*fs*/["stat"](PL$23/*completeFilename*/, PL$13/*callback*/);
      PL$13/*callback*/["promise"].then(PL$11/*promiseland exception catcher*/(function(PL$40){PL$39/*stats*/ = PL$40[1];
      
      var PL$41 = new __Promise();if((((PL$22/*filename*/ != "node_modules") && PL$39/*stats*/) && PL$39/*stats*/["isDirectory"]())){
        PL$7/*compileDir*/(PL$23/*completeFilename*/).then(PL$11/*promiseland exception catcher*/(function(PL$42){PL$42;
        PL$41.resolve();;}), PL$12/*catch rejected*/);
        ;
      }else{PL$41.resolve();
      };PL$41.then(PL$11/*promiseland exception catcher*/(function(PL$43){PL$43;;
      ;
      PL$24.resolve();;}), PL$12/*catch rejected*/);
      ;}), PL$12/*catch rejected*/);
      ;
      };PL$24.then(PL$11/*promiseland exception catcher*/(function(PL$44){PL$44;;
      ;
      PL$21.resolve(true); return PL$21; /* continue */
      ;}), PL$12/*catch rejected*/);
      ;}else{
      PL$21.resolve(false); return PL$21; /* break */
      
      };
      PL$21;return PL$21;
      };
      var PL$45 = function(){PL$19().then(function(contLoop){
      if (contLoop){++PL$18/*i*/;PL$45();}else{PL$20.resolve();};
      });
      };
      PL$45();
      PL$20.then(function(){;
      ;
      PL$17.resolve();;});
    }else{PL$17.resolve();
    };PL$17.then(PL$11/*promiseland exception catcher*/(function(PL$46){PL$46;;
    ;
    PL$9.resolve(); return;}), PL$12/*catch rejected*/);
    ;}), PL$12/*catch rejected*/);
    ;
  })();return PL$9;
  });
  PL$7/*compileDir*/(PL$47/*process*/["cwd"]());
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();