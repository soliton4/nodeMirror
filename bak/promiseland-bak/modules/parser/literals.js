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
    if (promiseland._hasModule({ hashStr: "bf7893d2ec7eb1ff2308d14e0078a753" })){ return promiseland._getModule("bf7893d2ec7eb1ff2308d14e0078a753"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "bf7893d2ec7eb1ff2308d14e0078a753", "module": PL$1, promising: true });
var PL$6/*promiseland*/;try{PL$6/*promiseland*/ = promiseland;}catch(e){};
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
      this["expObjectExpression"] = (function(PL$22/*par*/){
      
        ;
        var PL$24/*res*/ = this["newResult"]();
        ;
        var PL$25/*isClassObject*/ = this["isClassObject"];
        ;
        this["stack"]("isClassObject");
        this["isClassObject"] = false;
        PL$24/*res*/["push"]("{");
        var PL$26/*indentRes*/ = this["newResult"]();
        ;
        var PL$27/*i*/ = 0;
        ;
        var PL$28/*l*/ = ((PL$22/*par*/["properties"] && PL$22/*par*/["properties"]["length"]) || 0);
        ;
        for(PL$27/*i*/;(PL$27/*i*/ < PL$28/*l*/);++PL$27/*i*/){{
          this["isClassObject"] = false;
          var PL$29/*currentMember*/;
          ;
          if(PL$27/*i*/){
            PL$26/*indentRes*/["push"](",");
            PL$26/*indentRes*/["push"](this["newLine"]());
          };
          ;
          var PL$30/*prop*/ = PL$22/*par*/["properties"][PL$27/*i*/];
          ;
          if((PL$30/*prop*/["kind"] == "init")){
            PL$29/*currentMember*/ = PL$16/*identifierName*/(PL$30/*prop*/["key"]);
            if(this["inheritedSystem"]){
              this["inheritedSystem"]["setCurrent"](PL$29/*currentMember*/);
            };
            ;
            PL$26/*indentRes*/["push"]((PL$13/*stringEncodeStr*/(PL$16/*identifierName*/(PL$30/*prop*/["key"])) + ": "));
            if(PL$30/*prop*/["value"]){
              if(PL$17/*checkIsFunction*/(PL$30/*prop*/["value"])){
                if(PL$25/*isClassObject*/){
                  this["isClassObject"] = true;
                };
                ;
              };
              ;
              var PL$31/*v*/ = this["parseExpression"](PL$30/*prop*/["value"]);
              ;
              PL$26/*indentRes*/["push"](this["expectTypeVar"](this["getPassAsTypeCode"]({
                "value": PL$31/*v*/,
                "valueType": PL$31/*v*/["getType"](),
                "type": this["getType"]((PL$30/*prop*/["typename"] || "var"), PL$22/*par*/),
                "errorFun": this["getWarningFun"](PL$22/*par*/)
              })));
            };
            ;
          }else{
          if((PL$30/*prop*/["kind"] == "function")){
            if(PL$25/*isClassObject*/){
              this["isClassObject"] = true;
            };
            ;
            var PL$32/*name*/ = PL$16/*identifierName*/(PL$30/*prop*/["id"]);
            ;
            PL$29/*currentMember*/ = PL$32/*name*/;
            if(this["inheritedSystem"]){
              this["inheritedSystem"]["setCurrent"](PL$29/*currentMember*/);
            };
            ;
            PL$30/*prop*/["id"] = undefined;
            PL$26/*indentRes*/["push"]((PL$13/*stringEncodeStr*/(PL$32/*name*/) + ": "));
            var PL$33/*functionRes*/ = this["expectTypeVar"](this["parseExpression"](PL$30/*prop*/));
            ;
            PL$26/*indentRes*/["push"](PL$33/*functionRes*/);
          }else{
          if((PL$30/*prop*/["kind"] == "block")){
          }else{
          this["error"](PL$22/*par*/, PL$11/*errorMsg*/["unknownPropertyAssignmentType"]);
          };
          };
          };
          ;}};
        ;
        PL$24/*res*/["push"](this["indentNewLine"](PL$26/*indentRes*/));
        PL$24/*res*/["push"]("}");
        PL$24/*res*/["setType"]("var");
        this["unstack"]("isClassObject");
        return PL$24/*res*/;
        ;});
      this["expArrayExpression"] = (function(PL$22/*par*/){
      
        ;
        var PL$24/*res*/ = this["newResult"]();
        ;
        PL$24/*res*/["push"]("[");
        var PL$26/*indentRes*/ = this["newResult"]();
        ;
        var PL$27/*i*/ = 0;
        ;
        var PL$28/*l*/ = ((PL$22/*par*/["elements"] && PL$22/*par*/["elements"]["length"]) || 0);
        ;
        for(PL$27/*i*/;(PL$27/*i*/ < PL$28/*l*/);++PL$27/*i*/){{
          if(PL$27/*i*/){
            PL$26/*indentRes*/["push"](", ");
            PL$26/*indentRes*/["push"](this["newLine"]());
          };
          ;
          PL$26/*indentRes*/["push"](this["expectTypeVar"](this["parseExpression"](PL$22/*par*/["elements"][PL$27/*i*/])));}};
        ;
        PL$24/*res*/["push"](this["indentNewLine"](PL$26/*indentRes*/));
        PL$24/*res*/["push"]("]");
        PL$24/*res*/["setType"]("var");
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