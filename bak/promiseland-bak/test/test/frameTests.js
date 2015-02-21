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
    if (promiseland._hasModule({ hashStr: "b7c344699fcf102e9f85d6bca5e70730" })){ return promiseland._getModule("b7c344699fcf102e9f85d6bca5e70730"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "b7c344699fcf102e9f85d6bca5e70730", "module": PL$1, promising: true });
var PL$18/*console*/;try{PL$18/*console*/ = console;}catch(e){};
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
var PL$5/*testObj*/;
var PL$7/*successFun*/;
var PL$10/*successFunDbg*/;
var PL$11/*createTest*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  __requireFun("./testObj").then(PL$3/*promiseland exception catcher*/(function(PL$6){PL$5/*testObj*/ = PL$6;
  PL$7/*successFun*/ = (function(PL$8/*mod*/, PL$9/*success*/){
  
    ;
    if((PL$8/*mod*/ && PL$8/*mod*/["success"])){
      PL$9/*success*/();
    };
    ;
    ;});
  PL$10/*successFunDbg*/ = (function(PL$8/*mod*/, PL$9/*success*/){
  
    ;
    debugger;
    if((PL$8/*mod*/ && PL$8/*mod*/["success"])){
      PL$9/*success*/();
    };
    ;
    ;});
  PL$11/*createTest*/ = (function(PL$12/*parModuleName*/, PL$13/*parFun*/){
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
  var PL$19/*sFun*/;
  var PL$8/*mod*/;
  PL$16/*promiseland exception catcher*/(function(){
  
    ;
    PL$18/*console*/["log"](("running " + PL$12/*parModuleName*/));
    if(! PL$13/*parFun*/){
      PL$13/*parFun*/ = PL$7/*successFun*/;
    };
    ;
    PL$5/*testObj*/[PL$12/*parModuleName*/] = false;
    PL$19/*sFun*/ = (function(){
    
      ;
      PL$5/*testObj*/[PL$12/*parModuleName*/] = true;
      ;});
    var PL$20 = new __Promise();
    var PL$21 = new __Promise();
    var PL$22/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$21.resolve(e); }; }; };
    var PL$23 = function(e){ PL$21.resolve(e); };
    PL$22/*try catch*/(function(){
      __requireFun(("./frames/" + PL$12/*parModuleName*/)).then(PL$22/*try catch*/(function(PL$24){PL$8/*mod*/ = PL$24;
      PL$13/*parFun*/(PL$8/*mod*/, PL$19/*sFun*/);
      PL$20.resolve();}), PL$23);
    ;})();
    PL$21.then(PL$16/*promiseland exception catcher*/(function(PL$25/*e*/){
      PL$18/*console*/["log"]("something went wrong");
      PL$18/*console*/["log"](PL$25/*e*/);
      PL$20.resolve();;}));
    PL$20.then(PL$16/*promiseland exception catcher*/(function(){;
    ;
    PL$14.resolve(); return;}), PL$17/*catch rejected*/)
  })();return PL$14;
  });
  PL$11/*createTest*/("clientServer").then(PL$3/*promiseland exception catcher*/(function(PL$26){PL$26;
  PL$11/*createTest*/("emptyReturn").then(PL$3/*promiseland exception catcher*/(function(PL$27){PL$27;
  PL$11/*createTest*/("frameParameter").then(PL$3/*promiseland exception catcher*/(function(PL$28){PL$28;
  PL$11/*createTest*/("exclusive").then(PL$3/*promiseland exception catcher*/(function(PL$29){PL$29;
  PL$11/*createTest*/("syncReturn").then(PL$3/*promiseland exception catcher*/(function(PL$30){PL$30;
  PL$11/*createTest*/("syncServerDestroy").then(PL$3/*promiseland exception catcher*/(function(PL$31){PL$31;
  PL$11/*createTest*/("syncServerDestroy2").then(PL$3/*promiseland exception catcher*/(function(PL$32){PL$32;
  PL$11/*createTest*/("syncServe").then(PL$3/*promiseland exception catcher*/(function(PL$33){PL$33;
  PL$11/*createTest*/("syncServe2").then(PL$3/*promiseland exception catcher*/(function(PL$34){PL$34;
  PL$11/*createTest*/("syncParameter").then(PL$3/*promiseland exception catcher*/(function(PL$35){PL$35;
  PL$11/*createTest*/("syncMember").then(PL$3/*promiseland exception catcher*/(function(PL$36){PL$36;
  PL$11/*createTest*/("syncMemberNonTrivial").then(PL$3/*promiseland exception catcher*/(function(PL$37){PL$37;
  PL$11/*createTest*/("syncEvents").then(PL$3/*promiseland exception catcher*/(function(PL$38){PL$38;
  PL$11/*createTest*/("syncEvents2").then(PL$3/*promiseland exception catcher*/(function(PL$39){PL$39;
  PL$1.resolve(PL$5/*testObj*/); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
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