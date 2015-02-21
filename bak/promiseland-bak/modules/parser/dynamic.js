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
    if (promiseland._hasModule({ hashStr: "6381652be7903fc4952ac14575d0cd75" })){ return promiseland._getModule("6381652be7903fc4952ac14575d0cd75"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "6381652be7903fc4952ac14575d0cd75", "module": PL$1, promising: true });
var PL$6/*promiseland*/;try{PL$6/*promiseland*/ = promiseland;}catch(e){};
var PL$50/*Promise*/;try{PL$50/*Promise*/ = Promise;}catch(e){};
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
var PL$21/*blocksModule*/;
var PL$23/*loopsModule*/;
var PL$25/*conditionalsModule*/;
var PL$27/*literalsModule*/;
var PL$29/*classModule*/;
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
  __requireFun("./blocks").then(PL$3/*promiseland exception catcher*/(function(PL$22){PL$21/*blocksModule*/ = PL$22;
  __requireFun("./loops").then(PL$3/*promiseland exception catcher*/(function(PL$24){PL$23/*loopsModule*/ = PL$24;
  __requireFun("./conditionals").then(PL$3/*promiseland exception catcher*/(function(PL$26){PL$25/*conditionalsModule*/ = PL$26;
  __requireFun("./literals").then(PL$3/*promiseland exception catcher*/(function(PL$28){PL$27/*literalsModule*/ = PL$28;
  __requireFun("./class").then(PL$3/*promiseland exception catcher*/(function(PL$30){PL$29/*classModule*/ = PL$30;
  PL$1.resolve((function(PL$31/*parInstance*/, PL$32/*par*/){
  
    ;
    var PL$33/*f*/ = (function(PL$32/*par*/){
    
      ;
      this["isDynamicType"] = (function(PL$34/*parType*/){
      
        ;
        if(PL$34/*parType*/["isDynamic"]){
          return true;
        };
        ;
        return false;
        ;});
      this["callClassSystem"] = (function(PL$35/*parFun*/, PL$32/*par*/){
      
        ;
        var PL$36/*dynamic*/ = false;
        ;
        var PL$37/*typeProps*/ = {
          "type": true,
          "valueType": true,
          "leftType": true,
          "rightType": true
        };
        ;
        var PL$38/*ignoreProps*/ = {
          "errorFun": true,
          "parsed": true
        };
        ;
        var PL$39/*i*/ = 0;
        ;
        var PL$40/*p*/;
        ;
        var PL$41/*promises*/ = [
          
        ];
        ;
        var PL$42/*parsed*/ = PL$32/*par*/["parsed"];
        ;
        PL$42/*parsed*/ = (PL$42/*parsed*/ || (PL$32/*par*/["value"] && PL$32/*par*/["value"]["getParsed"]()));
        PL$42/*parsed*/ = (PL$42/*parsed*/ || (PL$32/*par*/["instance"] && PL$32/*par*/["instance"]["getParsed"]()));
        PL$42/*parsed*/ = (PL$42/*parsed*/ || (PL$32/*par*/["left"] && PL$32/*par*/["left"]["getParsed"]()));
        PL$42/*parsed*/ = (PL$42/*parsed*/ || (PL$32/*par*/["right"] && PL$32/*par*/["right"]["getParsed"]()));
        if(! PL$42/*parsed*/){
          PL$10/*errorFun*/({
            
          }, PL$11/*errorMsg*/["internalParserInfoMissing"]);
          ;
        };
        ;
        var PL$43/*errRes*/ = this["runtimeError"](PL$42/*parsed*/, PL$11/*errorMsg*/["typeLookupFailed"]);
        ;
        var PL$44/*self*/ = this;
        ;
        var PL$45/*resolveType*/ = (function(PL$46/*prop*/, PL$47/*ps*/, PL$48/*parArgument*/){
        
          ;
          var PL$49/*res*/ = new PL$50/*Promise*/();
          ;
          PL$47/*ps*/["then"]((function(PL$51/*t*/){
          
            ;
            if(PL$48/*parArgument*/){
              PL$32/*par*/["arguments"][PL$46/*prop*/]["type"] = PL$51/*t*/;
            }else{
            PL$32/*par*/[PL$46/*prop*/] = PL$51/*t*/;
            };
            ;
            PL$49/*res*/["resolve"]();
            ;}));
          PL$41/*promises*/["push"](PL$49/*res*/);
          return PL$49/*res*/;
          ;});
        ;
        var PL$51/*t*/;
        ;
        for(PL$40/*p*/ in PL$37/*typeProps*/){
          PL$51/*t*/ = PL$32/*par*/[PL$40/*p*/];
          if(PL$51/*t*/){
            if(PL$51/*t*/["isDynamic"]){
              PL$36/*dynamic*/ = true;
            }else{
            PL$45/*resolveType*/(PL$40/*p*/, PL$7/*classSystem*/["readyPromise"](PL$51/*t*/));
            };
            ;
          };
          ;};
        ;
        if(PL$32/*par*/["arguments"]){
          for(PL$39/*i*/ = 0;(PL$39/*i*/ < PL$32/*par*/["arguments"]["length"]);++PL$39/*i*/){{
            PL$51/*t*/ = PL$32/*par*/["arguments"][PL$39/*i*/]["type"];
            if(PL$51/*t*/){
              if(PL$51/*t*/["isDynamic"]){
                PL$36/*dynamic*/ = true;
              }else{
              PL$45/*resolveType*/(PL$39/*i*/, PL$7/*classSystem*/["readyPromise"](PL$51/*t*/), true);
              };
              ;
            };
            ;}};
          ;
        };
        ;
        PL$6/*promiseland*/["all"](PL$41/*promises*/)["then"]((function(){
        
          ;
          var PL$40/*p*/;
          ;
          if(PL$36/*dynamic*/){
            PL$44/*self*/["common"]["useClassSystem"] = true;
            var PL$49/*res*/ = PL$44/*self*/["newResult"]();
            ;
            PL$49/*res*/["push"]("classSystem.");
            PL$49/*res*/["push"](PL$35/*parFun*/);
            PL$49/*res*/["push"]("({");
            var PL$52/*propsStarted*/ = false;
            ;
            var PL$53/*addProperty*/ = (function(PL$40/*p*/){
            
              ;
              if(PL$52/*propsStarted*/){
                PL$49/*res*/["push"](", ");
              };
              ;
              PL$52/*propsStarted*/ = true;
              PL$49/*res*/["push"](PL$13/*stringEncodeStr*/(PL$40/*p*/));
              PL$49/*res*/["push"](":");
              ;});
            ;
            for(PL$40/*p*/ in PL$32/*par*/){
              if((! PL$32/*par*/[PL$40/*p*/] || PL$38/*ignoreProps*/[PL$40/*p*/])){
              }else{
              if(PL$37/*typeProps*/[PL$40/*p*/]){
                PL$53/*addProperty*/(PL$40/*p*/);
                PL$49/*res*/["push"](PL$44/*self*/["renderType"](PL$32/*par*/[PL$40/*p*/], PL$42/*parsed*/));
              }else{
              PL$53/*addProperty*/(PL$40/*p*/);
              if((typeof PL$32/*par*/[PL$40/*p*/] == "boolean")){
                var PL$54/*tempStr*/ = "";
                ;
                PL$54/*tempStr*/ += PL$32/*par*/[PL$40/*p*/];
                PL$49/*res*/["push"](PL$54/*tempStr*/);
              }else{
              PL$49/*res*/["push"](PL$44/*self*/["makeCompleteStatementDynamic"](PL$32/*par*/[PL$40/*p*/]));
              };
              ;
              };
              };
              ;};
            ;
            PL$49/*res*/["push"]("})");
            var PL$55/*dynRes*/ = PL$44/*self*/["newResult"]();
            ;
            PL$55/*dynRes*/["push"](PL$44/*self*/["makeCompleteStatement"](PL$49/*res*/), undefined, {
              "dynamic": true
            });
            PL$43/*errRes*/["resolve"](PL$55/*dynRes*/);
          }else{
          var PL$56/*tempRes*/ = PL$44/*self*/["newResult"]();
          ;
          PL$32/*par*/["result"] = PL$56/*tempRes*/;
          PL$32/*par*/["newLine"] = (PL$32/*par*/["newLine"] || PL$44/*self*/["newLine"]());
          PL$32/*par*/["getIndentRes"] = (function(){
          
            ;
            return PL$44/*self*/["indent"]();
            ;});
          PL$32/*par*/["newResult"] = (function(){
          
            ;
            return PL$44/*self*/["newResult"]();
            ;});
          PL$43/*errRes*/["resolve"](PL$6/*promiseland*/["classSystem"][PL$35/*parFun*/](PL$32/*par*/));
          };
          ;
          ;}));
        return PL$43/*errRes*/;
        ;});
      this["isTrackedClassConRes"] = (function(PL$34/*parType*/, PL$57/*parParsed*/){
      
        ;
        var PL$44/*self*/ = this;
        ;
        if(PL$34/*parType*/["isDynamic"]){
          var PL$49/*res*/ = PL$44/*self*/["newResult"]();
          ;
          PL$44/*self*/["common"]["useClassSystem"] = true;
          PL$49/*res*/["push"]("classSystem.isTrackedClass");
          PL$49/*res*/["push"]("(");
          PL$49/*res*/["push"](PL$44/*self*/["renderType"](PL$34/*parType*/, PL$57/*parParsed*/));
          PL$49/*res*/["push"](")");
          return PL$49/*res*/;
        };
        ;
        if(PL$7/*classSystem*/["isProvisional"](PL$34/*parType*/)){
          var PL$58/*pr*/ = new PL$50/*Promise*/();
          ;
          PL$7/*classSystem*/["definitionPromise"](PL$34/*parType*/)["then"]((function(PL$34/*parType*/){
          
            ;
            PL$58/*pr*/["resolve"](PL$7/*classSystem*/["isTrackedClass"](PL$34/*parType*/));
            ;}));
          return PL$58/*pr*/;
        };
        ;
        return PL$7/*classSystem*/["isTrackedClass"](PL$34/*parType*/);
        ;});
      this["isTrackedClass"] = (function(PL$34/*parType*/){
      
        ;
        return PL$7/*classSystem*/["isTrackedClass"](PL$34/*parType*/);
        ;});
      this["createTemporaryTrackedClass"] = (function(PL$34/*parType*/, PL$57/*parParsed*/){
      
        ;
        if(PL$34/*parType*/["isDynamic"]){
          return this["createExtraDynamicType"](PL$34/*parType*/, {
            "temporaryTracked": true
          }, PL$57/*parParsed*/);
        };
        ;
        return PL$7/*classSystem*/["_createTemporaryTrackedClass"](PL$34/*parType*/);
        ;});
      this["getConstructorReturnType"] = (function(PL$34/*parType*/, PL$57/*parParsed*/){
      
        ;
        if(PL$34/*parType*/["isDynamic"]){
          return this["createExtraDynamicType"](PL$34/*parType*/, {
            "constructorReturn": true
          }, PL$57/*parParsed*/);
        };
        ;
        return PL$7/*classSystem*/["getConstructorReturnType"](PL$34/*parType*/);
        ;});
      this["parseAsType"] = (function(PL$34/*parType*/, PL$32/*par*/){
      
        ;
        var PL$59/*value*/ = this["parseExpression"](PL$32/*par*/);
        ;
        return this["getPassAsTypeCode"]({
          "value": PL$59/*value*/,
          "valueType": PL$59/*value*/["getType"](),
          "type": PL$34/*parType*/,
          "errorFun": this["getWarningFun"](PL$32/*par*/),
          "parsed": PL$32/*par*/
        });
        ;});
      this["getPassAsTypeCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("getPassAsTypeCode", {
          "type": PL$32/*par*/["type"],
          "value": PL$32/*par*/["value"],
          "valueType": this["getResultType"](PL$32/*par*/["value"], PL$32/*par*/),
          "errorFun": PL$32/*par*/["errorFun"]
        }));
        PL$49/*res*/["setType"](PL$32/*par*/["type"]);
        return PL$49/*res*/;
        ;});
      this["getDestroyTemporaryClassCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        var PL$59/*value*/ = PL$32/*par*/["value"];
        ;
        var PL$60/*valueType*/ = PL$59/*value*/["getType"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("getDestroyTemporaryClassCode", {
          "value": PL$59/*value*/,
          "valueType": PL$59/*value*/["getType"](),
          "errorFun": PL$32/*par*/["errorFun"],
          "noValueRequired": (PL$32/*par*/ ? PL$32/*par*/["noValueRequired"] : undefined)
        }));
        PL$49/*res*/["setType"](this["getClassFromTemporaryTracked"](PL$60/*valueType*/, PL$59/*value*/["getParsed"]()));
        return PL$49/*res*/;
        ;});
      this["getClassFromTemporaryTracked"] = (function(PL$34/*parType*/, PL$57/*parParsed*/){
      
        ;
        var PL$44/*self*/ = this;
        ;
        if(PL$34/*parType*/["isDynamic"]){
          return this["createExtraDynamicType"](PL$34/*parType*/, {
            "temporaryTrackedResolved": true
          }, PL$57/*parParsed*/);
        };
        ;
        var PL$61/*resType*/ = this["getProvisionalType"](PL$57/*parParsed*/, PL$57/*parParsed*/);
        ;
        PL$7/*classSystem*/["definitionPromise"](PL$34/*parType*/)["then"]((function(PL$62/*parDefinedType*/){
        
          ;
          PL$44/*self*/["resolveProvisional"](PL$61/*resType*/, PL$7/*classSystem*/["getClassFromTemporaryTracked"](PL$62/*parDefinedType*/));
          ;}));
        return PL$61/*resType*/;
        ;});
      this["getSetPropertyCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("getSetPropertyCode", {
          "instance": PL$32/*par*/["instance"],
          "type": this["getResultType"](PL$32/*par*/["instance"]),
          "property": PL$32/*par*/["property"],
          "propertyValue": PL$32/*par*/["propertyValue"],
          "computed": PL$32/*par*/["computed"],
          "value": PL$32/*par*/["value"],
          "valueType": this["getResultType"](PL$32/*par*/["value"]),
          "operator": (PL$32/*par*/["operator"] || "="),
          "errorFun": PL$32/*par*/["errorFun"]
        }));
        PL$49/*res*/["setType"](this["getPropertyType"]({
          "type": this["getResultType"](PL$32/*par*/["instance"]),
          "property": PL$32/*par*/["property"]
        }, PL$32/*par*/["instance"]));
        return PL$49/*res*/;
        ;});
      this["getSetVariableCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("getSetVariableCode", {
          "instance": PL$32/*par*/["instance"],
          "type": this["getResultType"](PL$32/*par*/["instance"]),
          "value": PL$32/*par*/["value"],
          "valueType": this["getResultType"](PL$32/*par*/["value"]),
          "operator": (PL$32/*par*/["operator"] || "="),
          "errorFun": PL$32/*par*/["errorFun"],
          "assignmentType": PL$32/*par*/["assignmentType"]
        }));
        PL$49/*res*/["setType"](this["getClassFromTemporaryTracked"](this["getResultType"](PL$32/*par*/["value"]), PL$32/*par*/["value"]["getParsed"]()));
        return PL$49/*res*/;
        ;});
      this["declareReturnPromiseCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        this["common"]["usePromise"] = true;
        PL$49/*res*/["push"](this["callClassSystem"]("declareReturnPromiseCode", {
          "type": PL$32/*par*/["type"],
          "name": PL$32/*par*/["name"],
          "constructorName": PL$32/*par*/["constructorName"],
          "errorFun": PL$32/*par*/["errorFun"],
          "parsed": PL$32/*par*/["parsed"]
        }));
        PL$49/*res*/["setType"](PL$19/*statementType*/);
        return PL$49/*res*/;
        ;});
      this["returnReturnPromiseCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("returnReturnPromiseCode", {
          "type": PL$32/*par*/["type"],
          "name": PL$32/*par*/["name"],
          "errorFun": PL$32/*par*/["errorFun"],
          "parsed": PL$32/*par*/["parsed"]
        }));
        PL$49/*res*/["setType"](PL$19/*statementType*/);
        return PL$49/*res*/;
        ;});
      this["getDeclareVariableCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("getDeclareVariableCode", {
          "type": PL$32/*par*/["type"],
          "name": PL$32/*par*/["name"],
          "errorFun": PL$32/*par*/["errorFun"],
          "parsed": PL$32/*par*/["parsed"],
          "declaration": PL$32/*par*/["declaration"],
          "value": PL$32/*par*/["value"],
          "valueType": this["getResultType"](PL$32/*par*/["value"])
        }));
        PL$49/*res*/["setType"](PL$19/*statementType*/);
        return PL$49/*res*/;
        ;});
      this["getProcessParameterCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("getProcessParameterCode", {
          "type": PL$32/*par*/["type"],
          "name": PL$32/*par*/["name"],
          "errorFun": PL$32/*par*/["errorFun"],
          "parsed": PL$32/*par*/["parsed"]
        }));
        PL$49/*res*/["setType"](PL$19/*statementType*/);
        return PL$49/*res*/;
        ;});
      this["getDestroyVariableCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("getDestroyVariableCode", {
          "type": PL$32/*par*/["type"],
          "name": PL$32/*par*/["name"],
          "errorFun": PL$32/*par*/["errorFun"],
          "parsed": PL$32/*par*/["parsed"]
        }));
        PL$49/*res*/["setType"](PL$19/*statementType*/);
        return PL$49/*res*/;
        ;});
      this["connectFunCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("getConnectCode", {
          "instance": PL$32/*par*/["signalObject"],
          "type": this["getResultType"](PL$32/*par*/["signalObject"]),
          "property": PL$32/*par*/["signalProperty"],
          "value": PL$32/*par*/["fun"],
          "valueType": this["getResultType"](PL$32/*par*/["fun"]),
          "errorFun": PL$32/*par*/["errorFun"]
        }));
        PL$49/*res*/["setType"]("var");
        return PL$49/*res*/;
        ;});
      this["connectSlotCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("getConnectCode", {
          "instance": PL$32/*par*/["signalObject"],
          "type": this["getResultType"](PL$32/*par*/["signalObject"]),
          "property": PL$32/*par*/["signalProperty"],
          "value": PL$32/*par*/["slotObject"],
          "valueType": this["getResultType"](PL$32/*par*/["slotObject"]),
          "valueProperty": PL$32/*par*/["slotProperty"],
          "errorFun": PL$32/*par*/["errorFun"]
        }));
        PL$49/*res*/["setType"]("var");
        return PL$49/*res*/;
        ;});
      this["dereferencePromisePreCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("dereferencePromisePreCode", {
          "value": PL$32/*par*/["value"],
          "valueType": this["getResultType"](PL$32/*par*/["value"]),
          "errorFun": PL$32/*par*/["errorFun"]
        }));
        PL$49/*res*/["setType"](PL$19/*statementType*/);
        return PL$49/*res*/;
        ;});
      this["dereferencePromisePostCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("dereferencePromisePostCode", {
          "value": PL$32/*par*/["value"],
          "valueType": this["getResultType"](PL$32/*par*/["value"]),
          "errorFun": PL$32/*par*/["errorFun"]
        }));
        PL$49/*res*/["setType"](PL$19/*statementType*/);
        return PL$49/*res*/;
        ;});
      this["promisingReturnTypeCheck"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("promisingReturnTypeCheck", {
          "type": PL$32/*par*/["type"],
          "errorFun": PL$32/*par*/["errorFun"],
          "parsed": PL$32/*par*/["parsed"]
        }));
        PL$49/*res*/["setType"](PL$19/*statementType*/);
        return PL$49/*res*/;
        ;});
      this["getClassFromPromiseOf"] = (function(PL$34/*parType*/){
      
        ;
        return PL$7/*classSystem*/["getClassFromPromiseOf"](PL$34/*parType*/);
        ;});
      this["getPropertyType"] = (function(PL$32/*par*/, PL$57/*parParsed*/){
      
        ;
        var PL$63/*type*/ = PL$32/*par*/["type"];
        ;
        var PL$44/*self*/ = this;
        ;
        if(PL$63/*type*/["isDynamic"]){
          return this["createExtraDynamicType"](PL$63/*type*/, {
            "property": PL$32/*par*/["property"]
          }, PL$57/*parParsed*/);
        }else{
        var PL$64/*r*/ = this["getProvisionalType"](PL$57/*parParsed*/);
        ;
        PL$7/*classSystem*/["readyPromise"](PL$32/*par*/["type"])["then"]((function(PL$65/*resultType*/){
        
          ;
          PL$44/*self*/["resolveProvisional"](PL$64/*r*/, PL$6/*promiseland*/["classSystem"]["getPropertyType"]({
            "type": PL$65/*resultType*/,
            "property": PL$32/*par*/["property"]
          }));
          ;}));
        return PL$64/*r*/;
        };
        ;
        ;});
      this["getConstructorType"] = (function(PL$32/*par*/, PL$57/*parParsed*/){
      
        ;
        var PL$63/*type*/ = PL$32/*par*/["type"];
        ;
        var PL$44/*self*/ = this;
        ;
        if(PL$63/*type*/["isDynamic"]){
          return this["createExtraDynamicType"](PL$63/*type*/, {
            "property": "constructor"
          }, PL$57/*parParsed*/);
        }else{
        var PL$64/*r*/ = this["getProvisionalType"](PL$57/*parParsed*/);
        ;
        PL$7/*classSystem*/["readyPromise"](PL$32/*par*/["type"])["then"]((function(PL$65/*resultType*/){
        
          ;
          try
          {
            PL$44/*self*/["resolveProvisional"](PL$64/*r*/, PL$6/*promiseland*/["classSystem"]["getConstructorType"]({
              "type": PL$65/*resultType*/
            }));}catch(PL$66/*e*/){
            PL$44/*self*/["error"](PL$57/*parParsed*/, PL$66/*e*/);};
          ;
          ;}));
        return PL$64/*r*/;
        };
        ;
        ;});
      this["getGetPropertyCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("getGetPropertyCode", {
          "instance": PL$32/*par*/["instance"],
          "type": this["getResultType"](PL$32/*par*/["instance"]),
          "property": PL$32/*par*/["property"],
          "propertyValue": PL$32/*par*/["propertyValue"],
          "errorFun": PL$32/*par*/["errorFun"],
          "asmMode": (this["asmMode"] || false)
        }));
        if(PL$32/*par*/["property"]){
          PL$49/*res*/["setType"](this["getPropertyType"]({
            "type": this["getResultType"](PL$32/*par*/["instance"]),
            "property": PL$32/*par*/["property"]
          }, PL$32/*par*/["instance"]));
        }else{
        PL$49/*res*/["setType"]("var");
        };
        ;
        return PL$49/*res*/;
        ;});
      this["getBinaryExpressionCode"] = (function(PL$32/*par*/){
      
        ;
        var PL$49/*res*/ = this["newResult"]();
        ;
        PL$49/*res*/["push"](this["callClassSystem"]("getBinaryExpressionCode", {
          "left": PL$32/*par*/["left"],
          "leftType": this["getResultType"](PL$32/*par*/["left"]),
          "right": PL$32/*par*/["right"],
          "rightType": this["getResultType"](PL$32/*par*/["right"]),
          "operator": PL$32/*par*/["operator"],
          "errorFun": PL$32/*par*/["errorFun"]
        }));
        PL$49/*res*/["setType"]("var");
        return PL$49/*res*/;
        ;});
      this["makeCompleteStatementDynamic"] = (function(PL$32/*par*/){
      
        ;
        var PL$64/*r*/ = this["newResult"]();
        ;
        var PL$67/*d*/ = this["newResult"]();
        ;
        PL$67/*d*/["push"](this["makeCompleteStatement"](PL$32/*par*/), undefined, {
          "stringEncode": true
        });
        PL$64/*r*/["push"]("\"");
        PL$64/*r*/["push"](PL$67/*d*/);
        PL$64/*r*/["push"]("\"");
        return PL$64/*r*/;
        ;});
      this["createExtraDynamicType"] = (function(PL$34/*parType*/, PL$32/*par*/, PL$57/*parParsed*/){
      
        ;
        var PL$68/*name*/;
        ;
        if(PL$32/*par*/["property"]){
          PL$68/*name*/ = ((this["getTypeName"](PL$34/*parType*/, PL$57/*parParsed*/) + "::property::") + PL$32/*par*/["property"]);
        }else{
        if(PL$32/*par*/["temporaryTracked"]){
          PL$68/*name*/ = (this["getTypeName"](PL$34/*parType*/, PL$57/*parParsed*/) + "::temporaryTracked");
        }else{
        if(PL$32/*par*/["temporaryTrackedResolved"]){
          PL$68/*name*/ = (this["getTypeName"](PL$34/*parType*/, PL$57/*parParsed*/) + "::temporaryTrackedResolved");
        }else{
        if(PL$32/*par*/["constructorReturn"]){
          PL$68/*name*/ = (this["getTypeName"](PL$34/*parType*/, PL$57/*parParsed*/) + "::constructorReturn");
        }else{
        this["error"](PL$11/*errorMsg*/["internalMissingTypeProperty"]);
        };
        };
        };
        };
        ;
        if(! PL$34/*parType*/["extraTypes"]){
          PL$34/*parType*/["extraTypes"] = [
            
          ];
        };
        ;
        if(! PL$34/*parType*/["extraTypeMap"]){
          PL$34/*parType*/["extraTypeMap"] = new PL$5/*Map*/();
        };
        ;
        if(PL$34/*parType*/["extraTypeMap"]["has"](PL$68/*name*/)){
          return PL$34/*parType*/["extraTypeMap"]["get"](PL$68/*name*/);
        };
        ;
        var PL$69/*entry*/ = {
          "res": this["newResult"]()
        };
        ;
        PL$34/*parType*/["extraTypes"]["push"](PL$69/*entry*/);
        var PL$49/*res*/ = PL$69/*entry*/["res"];
        ;
        this["addType"]({
          "name": PL$68/*name*/,
          "dynamic": true
        }, PL$57/*parParsed*/);
        PL$49/*res*/["push"]("var /*extratyperender*/ ");
        PL$49/*res*/["push"](this["renderType"](PL$68/*name*/));
        PL$49/*res*/["push"](" = ");
        this["common"]["useClassSystem"] = true;
        if(PL$32/*par*/["property"]){
          if((PL$32/*par*/["property"] == "constructor")){
            PL$49/*res*/["push"]("classSystem.getConstructorType({\"type\":");
          }else{
          PL$49/*res*/["push"]("classSystem.getPropertyType({\"type\":");
          };
          ;
          PL$49/*res*/["push"](this["renderType"](PL$34/*parType*/));
          PL$49/*res*/["push"]((", property: " + PL$13/*stringEncodeStr*/(PL$32/*par*/["property"])));
          PL$49/*res*/["push"]("});");
          PL$49/*res*/["push"](this["newLine"]());
        }else{
        if(PL$32/*par*/["temporaryTracked"]){
          PL$49/*res*/["push"]("classSystem._createTemporaryTrackedClass(");
          PL$49/*res*/["push"](this["renderType"](PL$34/*parType*/));
          PL$49/*res*/["push"](");");
          PL$49/*res*/["push"](this["newLine"]());
        }else{
        if(PL$32/*par*/["temporaryTrackedResolved"]){
          PL$49/*res*/["push"]("classSystem.getClassFromTemporaryTracked(");
          PL$49/*res*/["push"](this["renderType"](PL$34/*parType*/));
          PL$49/*res*/["push"](");");
          PL$49/*res*/["push"](this["newLine"]());
        }else{
        if(PL$32/*par*/["constructorReturn"]){
          PL$49/*res*/["push"]("classSystem.getConstructorReturnType(");
          PL$49/*res*/["push"](this["renderType"](PL$34/*parType*/));
          PL$49/*res*/["push"](");");
          PL$49/*res*/["push"](this["newLine"]());
        };
        };
        };
        };
        ;
        var PL$70/*newType*/ = this["getType"](PL$68/*name*/, PL$57/*parParsed*/);
        ;
        PL$69/*entry*/["type"] = PL$70/*newType*/;
        PL$34/*parType*/["extraTypeMap"]["set"](PL$68/*name*/, PL$70/*newType*/);
        return PL$70/*newType*/;
        ;});
      ;});
    ;
    PL$33/*f*/["apply"](PL$31/*parInstance*/, [
      PL$32/*par*/
    ]);
    ;})); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
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