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
    if (promiseland._hasModule({ hashStr: "ed73882bcafd492071159f4fa7e7ae26" })){ return promiseland._getModule("ed73882bcafd492071159f4fa7e7ae26"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "ed73882bcafd492071159f4fa7e7ae26", "module": PL$1, promising: true });
var PL$28/*console*/;try{PL$28/*console*/ = console;}catch(e){};
var PL$31/*Promise*/;try{PL$31/*Promise*/ = Promise;}catch(e){};
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
var PL$29/*funReturning4*/;
var PL$33/*funReturning4debug*/;
var PL$34/*returning4*/;
var PL$58/*modRes4*/;
var PL$106/*c*/;
var PL$107/*s*/;
var PL$108/*f*/;
var PL$109/*m*/;
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
  var PL$7/*successFun*/;
  var PL$8/*mod*/;
  var PL$23/*res*/;
  PL$16/*promiseland exception catcher*/(function(){
  
    ;
    if(! PL$13/*parFun*/){
      PL$13/*parFun*/ = PL$7/*successFun*/;
    };
    ;
    PL$5/*testObj*/[PL$12/*parModuleName*/] = false;
    PL$7/*successFun*/ = (function(){
    
      ;
      PL$5/*testObj*/[PL$12/*parModuleName*/] = true;
      ;});
    var PL$18 = new __Promise();
    var PL$19 = new __Promise();
    var PL$20/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$19.resolve(e); }; }; };
    var PL$21 = function(e){ PL$19.resolve(e); };
    PL$20/*try catch*/(function(){
      __requireFun(("./" + PL$12/*parModuleName*/)).then(PL$20/*try catch*/(function(PL$22){PL$8/*mod*/ = PL$22;
      PL$23/*res*/ = PL$13/*parFun*/(PL$8/*mod*/, PL$7/*successFun*/);
      
      var PL$24 = new __Promise();if((PL$23/*res*/ && PL$23/*res*/["then"])){
        PL$23/*res*/.then(PL$20/*try catch*/(function(PL$25){PL$25;
        PL$24.resolve();;}), PL$21);
        ;
      }else{PL$24.resolve();
      };PL$24.then(PL$20/*try catch*/(function(PL$26){PL$26;;
      ;
      PL$18.resolve();}), PL$21);
    ;}), PL$21);
    ;})();
    PL$19.then(PL$16/*promiseland exception catcher*/(function(PL$27/*e*/){
      PL$28/*console*/["log"]("something went wrong");
      PL$18.resolve();;}));
    PL$18.then(PL$16/*promiseland exception catcher*/(function(){;
    ;
    PL$14.resolve(); return;}), PL$17/*catch rejected*/)
  })();return PL$14;
  });
  PL$29/*funReturning4*/ = (function(PL$8/*mod*/, PL$9/*success*/){
  
    ;
    var PL$30/*p*/ = new PL$31/*Promise*/();
    ;
    try
    {
      PL$8/*mod*/["fun"]()["then"]((function(PL$32/*value*/){
      
        ;
        if((PL$32/*value*/ == 4)){
          PL$9/*success*/();
        };
        ;
        PL$30/*p*/["resolve"]();
        ;}));}catch(PL$27/*e*/){};
    ;
    return PL$30/*p*/;
    ;});
  PL$33/*funReturning4debug*/ = (function(PL$8/*mod*/, PL$9/*success*/){
  
    ;
    try
    {
      PL$8/*mod*/["fun"]()["then"]((function(PL$32/*value*/){
      
        ;
        if((PL$32/*value*/ == 4)){
          PL$9/*success*/();
        }else{
        PL$28/*console*/["log"]("error:");
        PL$28/*console*/["log"](PL$32/*value*/);
        };
        ;}));}catch(PL$27/*e*/){
      PL$28/*console*/["log"]("error:");
      PL$28/*console*/["log"](PL$27/*e*/);};
    ;
    ;});
  PL$34/*returning4*/ = (function(PL$8/*mod*/, PL$9/*success*/){
  
    ;
    if((PL$8/*mod*/ == 4)){
      PL$9/*success*/();
    };
    ;
    ;});
  PL$11/*createTest*/("basicmodule", (function(PL$8/*mod*/, PL$9/*success*/){
  
    ;
    if((typeof PL$8/*mod*/ == "object")){
      PL$9/*success*/();
    };
    ;
    ;})).then(PL$3/*promiseland exception catcher*/(function(PL$35){PL$35;
  PL$11/*createTest*/("function/funExpr", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$36){PL$36;
  PL$11/*createTest*/("creatingpromise", PL$29/*funReturning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$37){PL$37;
  PL$11/*createTest*/("creatingpromise2", PL$29/*funReturning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$38){PL$38;
  PL$11/*createTest*/("creatingpromise3", PL$29/*funReturning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$39){PL$39;
  PL$11/*createTest*/("simpleArray", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$40){PL$40;
  PL$11/*createTest*/("newParameter", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$41){PL$41;
  PL$11/*createTest*/("class", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$42){PL$42;
  PL$11/*createTest*/("classInheritence", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$43){PL$43;
  PL$11/*createTest*/("conditional", PL$29/*funReturning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$44){PL$44;
  PL$11/*createTest*/("conditional2", PL$29/*funReturning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$45){PL$45;
  PL$11/*createTest*/("conditional3", PL$29/*funReturning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$46){PL$46;
  PL$11/*createTest*/("switch", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$47){PL$47;
  PL$11/*createTest*/("switchPromising", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$48){PL$48;
  PL$11/*createTest*/("callback", PL$29/*funReturning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$49){PL$49;
  PL$11/*createTest*/("callback2", PL$29/*funReturning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$50){PL$50;
  PL$11/*createTest*/("forloop", PL$29/*funReturning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$51){PL$51;
  PL$11/*createTest*/("forloop2", PL$33/*funReturning4debug*/).then(PL$3/*promiseland exception catcher*/(function(PL$52){PL$52;
  PL$11/*createTest*/("for/forIn", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$53){PL$53;
  PL$11/*createTest*/("for/forInP", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$54){PL$54;
  PL$11/*createTest*/("whileloop", PL$29/*funReturning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$55){PL$55;
  PL$11/*createTest*/("whileloop2", PL$29/*funReturning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$56){PL$56;
  PL$11/*createTest*/("functionDeclaration", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$57){PL$57;
  PL$58/*modRes4*/ = (function(PL$8/*mod*/, PL$9/*success*/){
  
    ;
    if((PL$8/*mod*/["res"] == 4)){
      PL$9/*success*/();
    };
    ;
    ;});
  PL$11/*createTest*/("tryCatch", PL$58/*modRes4*/).then(PL$3/*promiseland exception catcher*/(function(PL$59){PL$59;
  PL$11/*createTest*/("tryCatch2", PL$58/*modRes4*/).then(PL$3/*promiseland exception catcher*/(function(PL$60){PL$60;
  PL$11/*createTest*/("require", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$61){PL$61;
  PL$11/*createTest*/("string", (function(PL$8/*mod*/, PL$9/*success*/){
  
    ;
    if(((PL$8/*mod*/["a"] == "\n\r\u2028\u2029\"'") && (PL$8/*mod*/["b"] == "xxx\n  xxx"))){
      PL$9/*success*/();
    };
    ;
    ;})).then(PL$3/*promiseland exception catcher*/(function(PL$62){PL$62;
  PL$11/*createTest*/("simpleModule", (function(PL$8/*mod*/, PL$9/*success*/){
  
    ;
    if((PL$8/*mod*/ && (PL$8/*mod*/["member"] === 4))){
      PL$9/*success*/();
    };
    ;
    ;})).then(PL$3/*promiseland exception catcher*/(function(PL$63){PL$63;
  PL$11/*createTest*/("nonReturningFunction", PL$58/*modRes4*/).then(PL$3/*promiseland exception catcher*/(function(PL$64){PL$64;
  PL$11/*createTest*/("arguments", PL$34/*returning4*/).then(PL$3/*promiseland exception catcher*/(function(PL$65){PL$65;
  PL$11/*createTest*/("requireException", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$66){PL$66;
  PL$11/*createTest*/("typesafetyassign", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$67){PL$67;
  PL$11/*createTest*/("typesafetyMembers", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$68){PL$68;
  PL$11/*createTest*/("typesafetyMembers2", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$69){PL$69;
  PL$11/*createTest*/("typesafetyMembers3", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$70){PL$70;
  PL$11/*createTest*/("typesafetyDelayedDefinition", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$71){PL$71;
  PL$11/*createTest*/("typesafetyFunction", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$72){PL$72;
  PL$11/*createTest*/("typesafetyFunction2", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$73){PL$73;
  PL$11/*createTest*/("typesafetyDynamic", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$74){PL$74;
  PL$11/*createTest*/("typesafetyMemberFunction", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$75){PL$75;
  PL$11/*createTest*/("typesafetyMemberFunction2", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$76){PL$76;
  PL$11/*createTest*/("typesafetyConstructor", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$77){PL$77;
  PL$11/*createTest*/("typesafetyConstructor2", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$78){PL$78;
  PL$11/*createTest*/("typesafetyDestructor", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$79){PL$79;
  PL$11/*createTest*/("typesafetyDestructorMember", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$80){PL$80;
  PL$11/*createTest*/("typesafetyDestructorOrder", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$81){PL$81;
  PL$11/*createTest*/("typesafetyeDestructorCircular", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$82){PL$82;
  PL$11/*createTest*/("typesafetyDestructorParameter", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$83){PL$83;
  PL$11/*createTest*/("typesafetyDestructorReturn", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$84){PL$84;
  PL$11/*createTest*/("typesafetyPromising", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$85){PL$85;
  PL$11/*createTest*/("connect", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$86){PL$86;
  PL$11/*createTest*/("connect2", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$87){PL$87;
  PL$11/*createTest*/("extraRequire", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$88){PL$88;
  PL$11/*createTest*/("typeUnique", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$89){PL$89;
  PL$11/*createTest*/("typeUnique2", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$90){PL$90;
  PL$11/*createTest*/("savable", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$91){PL$91;
  PL$11/*createTest*/("savable2", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$92){PL$92;
  PL$11/*createTest*/("leaveCatch", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$93){PL$93;
  PL$11/*createTest*/("leaveCatchAsync", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$94){PL$94;
  PL$11/*createTest*/("leaveTry", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$95){PL$95;
  PL$11/*createTest*/("storage/setStorageEngine", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$96){PL$96;
  PL$11/*createTest*/("storage/meta", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$97){PL$97;
  PL$11/*createTest*/("promise/catchAfterIf", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$98){PL$98;
  PL$11/*createTest*/("map", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$99){PL$99;
  PL$11/*createTest*/("for/forNoParam", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$100){PL$100;
  PL$11/*createTest*/("while/doWhile", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$101){PL$101;
  PL$11/*createTest*/("while/doWhileP", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$102){PL$102;
  PL$11/*createTest*/("var/varList", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$103){PL$103;
  PL$11/*createTest*/("int/declaration", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$104){PL$104;
  PL$11/*createTest*/("int/initialization", PL$7/*successFun*/).then(PL$3/*promiseland exception catcher*/(function(PL$105){PL$105;
  PL$106/*c*/ = 0;
  PL$107/*s*/ = 0;
  PL$108/*f*/ = 0;
  for(PL$109/*m*/ in PL$5/*testObj*/){
    PL$106/*c*/++;
    if(PL$5/*testObj*/[PL$109/*m*/]){
      PL$107/*s*/++;
    }else{
    PL$28/*console*/["log"]((PL$109/*m*/ + " failed!"));
    PL$108/*f*/++;
    };
    ;};
  ;
  PL$28/*console*/["log"]((((((("run " + PL$106/*c*/) + " tests. ") + PL$107/*s*/) + " successful, ") + PL$108/*f*/) + " failed"));
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