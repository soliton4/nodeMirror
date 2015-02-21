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
    if (promiseland._hasModule({ hashStr: "b5dea89b4a473183e97956a26cf37ce3" })){ return promiseland._getModule("b5dea89b4a473183e97956a26cf37ce3"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "b5dea89b4a473183e97956a26cf37ce3", "module": PL$1, promising: true });
var PL$6/*promiseland*/;try{PL$6/*promiseland*/ = promiseland;}catch(e){};
var PL$28/*Array*/;try{PL$28/*Array*/ = Array;}catch(e){};
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
var PL$5/*Map*/;
var PL$7/*classSystem*/;
var PL$8/*basics*/;
var PL$10/*errorFun*/;
var PL$11/*errorMsg*/;
var PL$12/*_stringEncodeStr*/;
var PL$13/*stringEncodeStr*/;
var PL$14/*VariableNames*/;
var PL$15/*mixin*/;
var PL$16/*identifierName*/;
var PL$17/*checkIsFunction*/;
var PL$18/*getExtraFromPar*/;
var PL$19/*statementType*/;
var PL$20/*checkPromising*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  PL$5/*Map*/ = PL$6/*promiseland*/["Map"];
  PL$7/*classSystem*/ = PL$6/*promiseland*/["classSystem"];
  __requireFun("./basics").then(PL$3/*promiseland exception catcher*/(function(PL$9){PL$8/*basics*/ = PL$9;
  PL$10/*errorFun*/ = PL$8/*basics*/["errorFun"];
  PL$11/*errorMsg*/ = PL$8/*basics*/["errorMsg"];
  PL$12/*_stringEncodeStr*/ = PL$8/*basics*/["_stringEncodeStr"];
  PL$13/*stringEncodeStr*/ = PL$8/*basics*/["stringEncodeStr"];
  PL$14/*VariableNames*/ = PL$8/*basics*/["VariableNames"];
  PL$15/*mixin*/ = PL$8/*basics*/["mixin"];
  PL$16/*identifierName*/ = PL$8/*basics*/["identifierName"];
  PL$17/*checkIsFunction*/ = PL$8/*basics*/["checkIsFunction"];
  PL$18/*getExtraFromPar*/ = PL$8/*basics*/["getExtraFromPar"];
  PL$19/*statementType*/ = PL$8/*basics*/["statementType"];
  PL$20/*checkPromising*/ = PL$8/*basics*/["checkPromising"];
  PL$1.resolve((function(PL$21/*parInstance*/, PL$22/*par*/){
  
    ;
    var PL$23/*f*/ = (function(PL$22/*par*/){
    
      ;
      this["expBlockStatement"] = (function(PL$22/*par*/){
      
        ;
        var PL$24/*res*/ = this["newResult"]();
        ;
        PL$22/*par*/["brackets"] = true;
        PL$24/*res*/["pushType"](this["blockCreator"](PL$22/*par*/));
        return PL$24/*res*/;
        ;});
      this["blockCreator"] = (function(PL$22/*par*/, PL$25/*parExtra*/){
      
        ;
        if(! PL$25/*parExtra*/){
          PL$25/*parExtra*/ = {
            
          };
        };
        ;
        var PL$24/*res*/ = this["newResult"]();
        ;
        PL$24/*res*/["setType"](PL$19/*statementType*/);
        if(PL$22/*par*/["brackets"]){
          PL$24/*res*/["push"]("{");
        };
        ;
        var PL$26/*blockRes*/ = this["newResult"]();
        ;
        var PL$27/*sAr*/ = [
          
        ];
        ;
        if((PL$22/*par*/ instanceof PL$28/*Array*/)){
          PL$27/*sAr*/ = PL$22/*par*/;
        }else{
        if((PL$22/*par*/["type"] == "BlockStatement")){
          PL$27/*sAr*/ = PL$22/*par*/["body"];
        }else{
        PL$27/*sAr*/["push"](this["parseExpression"](PL$22/*par*/));
        };
        ;
        };
        ;
        if(PL$25/*parExtra*/["preCode"]){
          PL$26/*blockRes*/["push"](this["newLine"]());
          PL$26/*blockRes*/["push"](this["makeStatement"](PL$25/*parExtra*/["preCode"]));
        };
        ;
        var PL$29/*i*/ = 0;
        ;
        var PL$30/*l*/ = PL$27/*sAr*/["length"];
        ;
        for(PL$29/*i*/;(PL$29/*i*/ < PL$30/*l*/);++PL$29/*i*/){{
          if(((PL$27/*sAr*/[PL$29/*i*/]["type"] == "TryStatement") && ! PL$27/*sAr*/[PL$29/*i*/]["block"])){
            var PL$31/*temp*/ = PL$27/*sAr*/[PL$29/*i*/];
            ;
            PL$31/*temp*/["block"] = PL$27/*sAr*/["splice"](0, PL$29/*i*/);
            PL$8/*basics*/["findPromises"](PL$31/*temp*/["block"]);
            PL$8/*basics*/["findPromises"](PL$27/*sAr*/);
            PL$29/*i*/ = 0;
            PL$30/*l*/ = PL$27/*sAr*/["length"];
          };
          ;}};
        ;
        PL$29/*i*/ = 0;
        PL$30/*l*/ = PL$27/*sAr*/["length"];
        for(PL$29/*i*/;(PL$29/*i*/ < PL$30/*l*/);++PL$29/*i*/){{
          if(PL$27/*sAr*/[PL$29/*i*/]["asmIgnore"]){
            continue;;
          };
          ;
          PL$26/*blockRes*/["push"](this["newLine"]());
          PL$27/*sAr*/[PL$29/*i*/]["isRegularStatement"] = true;
          PL$26/*blockRes*/["push"](this["makeStatement"](this["parseExpression"](PL$27/*sAr*/[PL$29/*i*/])));}};
        ;
        if(PL$25/*parExtra*/["postCode"]){
          PL$26/*blockRes*/["push"](this["newLine"]());
          PL$26/*blockRes*/["push"](this["makeStatement"](PL$25/*parExtra*/["postCode"]));
        };
        ;
        if((PL$22/*par*/["brackets"] || PL$22/*par*/["indent"])){
          PL$26/*blockRes*/ = this["indent"](PL$26/*blockRes*/);
        };
        ;
        PL$24/*res*/["push"](this["makeCompleteStatement"](PL$26/*blockRes*/));
        if(PL$22/*par*/["brackets"]){
          PL$24/*res*/["push"]("}");
        };
        ;
        return PL$24/*res*/;
        ;});
      ;});
    ;
    PL$23/*f*/["apply"](PL$21/*parInstance*/, [
      PL$22/*par*/
    ]);
    ;})); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();