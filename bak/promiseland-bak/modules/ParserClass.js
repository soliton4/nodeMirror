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
    if (promiseland._hasModule({ hashStr: "e4c234be799fc7ee31d761315b957bf4" })){ return promiseland._getModule("e4c234be799fc7ee31d761315b957bf4"); };
var PL$25/*promiseland*/;try{PL$25/*promiseland*/ = promiseland;}catch(e){};
var PL$1 = (function(){
"use strict";
var PL$4/*_getParserPromise*/;

  ;
  ;
  var PL$2/*_parserPs*/;
  ;
  var PL$3/*_getParser*/ = (function(){
  
    ;
    if(PL$2/*_parserPs*/){
      return PL$2/*_parserPs*/;
    };
    ;
    PL$2/*_parserPs*/ = PL$4/*_getParserPromise*/();
    return PL$2/*_parserPs*/;
    ;});
  ;
  PL$4/*_getParserPromise*/ = (function(){
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
  var PL$9/*parser*/;
  PL$7/*promiseland exception catcher*/(function(){
  
    ;
    __requireFun("./parser/parser").then(PL$7/*promiseland exception catcher*/(function(PL$10){PL$9/*parser*/ = PL$10;
    PL$5.resolve(PL$9/*parser*/); return;
    PL$5.resolve(); return;}), PL$8/*catch rejected*/);
    ;
  })();return PL$5;
  });
  var PL$11/*ParserClass*/ = (function(PL$12/*par*/){
  
    ;
    this["parse"] = (function(PL$13/*parStr*/){
    var PL$14 = new __Promise();
    var PL$16/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$14.reject(e);
        };
      };
    };
    var PL$17/*catch rejected*/ = function(e){
      PL$14.reject(e);
    };
    var PL$9/*parser*/;
    PL$16/*promiseland exception catcher*/(function(){
    
      ;
      var PL$18 = new __Promise();
      var PL$19 = new __Promise();
      var PL$20/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$19.resolve(e); }; }; };
      var PL$21 = function(e){ PL$19.resolve(e); };
      PL$20/*try catch*/(function(){
        PL$3/*_getParser*/().then(PL$20/*try catch*/(function(PL$22){PL$9/*parser*/ = PL$22;
        PL$9/*parser*/["parse"](PL$13/*parStr*/).then(PL$20/*try catch*/(function(PL$23){PL$14.resolve(PL$23); return;
        PL$18.resolve();}), PL$21);
      ;}), PL$21);
      ;})();
      PL$19.then(PL$16/*promiseland exception catcher*/(function(PL$24/*e*/){
        if(! PL$24/*e*/["msg"]){
          PL$24/*e*/["msg"] = PL$24/*e*/["message"];
        };
        ;
        throw PL$24/*e*/;
        PL$18.resolve();;}));
      PL$18.then(PL$16/*promiseland exception catcher*/(function(){;
      ;
      PL$14.resolve(); return;}), PL$17/*catch rejected*/)
    })();return PL$14;
    });
    ;});
  ;
  PL$25/*promiseland*/["Parser"] = PL$11/*ParserClass*/;
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();