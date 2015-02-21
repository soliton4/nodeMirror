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
    if (promiseland._hasModule({ hashStr: "21ccfc28f0fdcf08919f0baeadba6f3e" })){ return promiseland._getModule("21ccfc28f0fdcf08919f0baeadba6f3e"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "21ccfc28f0fdcf08919f0baeadba6f3e", "module": PL$1, promising: true });
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
  PL$1.resolve((function(PL$19/*parInstance*/, PL$20/*par*/){
  
    ;
    var PL$21/*f*/ = (function(PL$20/*par*/){
    
      ;
      var PL$22/*self*/ = this;
      ;
      this["isSimpleType"] = (function(PL$23/*parType*/){
      
        ;
        if(this["isVar"](PL$23/*parType*/)){
          return true;
        };
        ;
        return false;
        ;});
      this["isVar"] = (function(PL$23/*parType*/){
      
        ;
        if((typeof PL$23/*parType*/ == "function")){
          return PL$7/*classSystem*/["isVar"](PL$23/*parType*/);
        };
        ;
        return false;
        ;});
      this["canSkipVarHeusting"] = (function(PL$23/*parType*/){
      
        ;
        if(this["isVar"](PL$23/*parType*/)){
          return true;
        };
        ;
        return false;
        ;});
      this["typeIsAvailableByName"] = (function(PL$23/*parType*/){
      
        ;
        if((typeof PL$23/*parType*/ == "function")){
          return PL$7/*classSystem*/["isAvailableByName"](PL$23/*parType*/);
        };
        ;
        return false;
        ;});
      this["types"] = new PL$5/*Map*/()["mixin"](PL$20/*par*/["types"]);
      PL$7/*classSystem*/["getBuiltinTypesMap"]()["forEach"]((function(PL$24/*type*/, PL$25/*key*/){
      
        ;
        if(! PL$22/*self*/["typeIsAvailableByName"](PL$24/*type*/)){
          return;
        };
        ;
        PL$22/*self*/["types"]["set"](PL$25/*key*/, {
          "name": PL$25/*key*/,
          "type": PL$24/*type*/
        });
        ;}));
      this["compareTypes"] = (function(PL$26/*par1*/, PL$27/*par2*/){
      
        ;
        return (PL$26/*par1*/ === PL$27/*par2*/);
        ;});
      this["resolveFunctionType"] = (function(PL$20/*par*/, PL$28/*parsed*/){
      
        ;
        var PL$29/*name*/ = PL$16/*identifierName*/(PL$20/*par*/["name"]);
        ;
        var PL$30/*entry*/ = this["localVariables"]["get"](PL$29/*name*/);
        ;
        if(PL$30/*entry*/["needsResolving"]){
          PL$30/*entry*/["needsResolving"] = false;
          var PL$31/*t*/ = PL$30/*entry*/["type"];
          ;
          PL$30/*entry*/["type"] = PL$20/*par*/["type"];
          this["resolveProvisional"](PL$31/*t*/, PL$20/*par*/["type"]);
        }else{
        this["addLocalVariable"]({
          "name": PL$20/*par*/["name"],
          "type": PL$20/*par*/["type"],
          "declaration": true
        }, PL$28/*parsed*/);
        };
        ;
        ;});
      this["getProvisionalType"] = (function(PL$32/*parParsed*/){
      
        ;
        if(! PL$32/*parParsed*/){
          PL$10/*errorFun*/({
            
          }, PL$11/*errorMsg*/["internalParserInfoMissing"]);
        };
        ;
        var PL$24/*type*/ = PL$7/*classSystem*/["_createProvisionalClass"]();
        ;
        var PL$33/*ps*/ = this["addError"](PL$32/*parParsed*/, PL$11/*errorMsg*/["unresolvedType"]);
        ;
        PL$7/*classSystem*/["definitionPromise"](PL$24/*type*/)["then"]((function(){
        
          ;
          PL$33/*ps*/["resolve"]();
          ;}));
        return PL$24/*type*/;
        ;});
      this["resolveProvisional"] = (function(PL$23/*parType*/, PL$34/*parResult*/){
      
        ;
        return PL$7/*classSystem*/["_resolveProvisional"](PL$23/*parType*/, PL$34/*parResult*/);
        ;});
      this["getUniqueTypeMacro"] = (function(PL$29/*name*/){
      
        ;
        var PL$35/*uniqueStr*/ = this["getUniqueName"]();
        ;
        var PL$36/*res*/ = (((("/* " + PL$35/*uniqueStr*/) + " ") + (PL$29/*name*/ || "")) + " start */");
        ;
        PL$36/*res*/ += this["runtimeErrorNoWarning"](PL$11/*errorMsg*/["failedToDetermineType"]);
        PL$36/*res*/ += (((("/* " + PL$35/*uniqueStr*/) + " ") + (PL$29/*name*/ || "")) + " end */");
        return PL$36/*res*/;
        ;});
      this["renderType"] = (function(PL$23/*parType*/, PL$32/*parParsed*/){
      
        ;
        var PL$36/*res*/ = this["newResult"]();
        ;
        PL$36/*res*/["setType"]("var");
        var PL$22/*self*/ = this;
        ;
        var PL$37/*typeExpression*/;
        ;
        var PL$38/*renderTypeName*/ = (function(PL$39/*parType1*/, PL$40/*parType2*/){
        
          ;
          var PL$41/*i*/;
          ;
          var PL$42/*typesAr*/ = PL$22/*self*/["types"]["getArray"]();
          ;
          for(PL$41/*i*/ = 0;(PL$41/*i*/ < PL$42/*typesAr*/["length"]);++PL$41/*i*/){{
            if((PL$22/*self*/["isSameType"](PL$42/*typesAr*/[PL$41/*i*/]["value"]["type"], PL$39/*parType1*/) || PL$22/*self*/["isSameType"](PL$42/*typesAr*/[PL$41/*i*/]["value"]["type"], PL$40/*parType2*/))){
              if(PL$22/*self*/["isVar"](PL$42/*typesAr*/[PL$41/*i*/]["value"]["type"])){
                PL$22/*self*/["common"]["useClassSystem"] = true;
                return "classSystem.getBuiltinType(\"var\")";
              };
              ;
              var PL$29/*name*/ = PL$42/*typesAr*/[PL$41/*i*/]["key"];
              ;
              if(! PL$22/*self*/["common"]["givenTypeNames"][PL$29/*name*/]){
                PL$22/*self*/["common"]["givenTypeNames"][PL$29/*name*/] = (((PL$22/*self*/["getUniqueName"]() + "/*type:") + PL$29/*name*/) + "*/");
              };
              ;
              return PL$22/*self*/["common"]["givenTypeNames"][PL$29/*name*/];
            };
            ;}};
          ;
          ;});
        ;
        if((typeof PL$23/*parType*/ == "function")){
          var PL$43/*errPs*/ = this["addError"](PL$32/*parParsed*/, PL$11/*errorMsg*/["internalMissingType"], (function(){
          
            ;
            debugger;
            ;}));
          ;
          PL$7/*classSystem*/["readyPromise"](PL$23/*parType*/)["then"]((function(PL$44/*resolvedType*/){
          
            ;
            try
            {
              var PL$45/*replace*/ = PL$22/*self*/["newResult"]();
              ;
              var PL$37/*typeExpression*/ = PL$38/*renderTypeName*/(PL$23/*parType*/, PL$44/*resolvedType*/);
              ;
              if(PL$37/*typeExpression*/){
                PL$45/*replace*/["push"](PL$37/*typeExpression*/);
                PL$36/*res*/["push"](PL$45/*replace*/);
                PL$43/*errPs*/["resolve"]();
                return;
              };
              ;
              if(PL$7/*classSystem*/["isFunctionType"](PL$44/*resolvedType*/)){
                var PL$41/*i*/;
                ;
                PL$22/*self*/["common"]["useClassSystem"] = true;
                PL$45/*replace*/["push"]("(classSystem.createFunctionType({ \"return\": ");
                PL$45/*replace*/["push"](PL$22/*self*/["renderType"](PL$22/*self*/["getClassFromTemporaryTracked"](PL$22/*self*/["getFunctionReturnType"](PL$44/*resolvedType*/, PL$32/*parParsed*/), PL$32/*parParsed*/), PL$32/*parParsed*/));
                PL$45/*replace*/["push"](", arguments: [");
                var PL$46/*l*/ = PL$22/*self*/["getFunctionArgumentCount"](PL$44/*resolvedType*/);
                ;
                for(PL$41/*i*/ = 0;(PL$41/*i*/ < PL$46/*l*/);++PL$41/*i*/){{
                  if(PL$41/*i*/){
                    PL$45/*replace*/["push"](", ");
                  };
                  ;
                  PL$45/*replace*/["push"](PL$22/*self*/["renderType"](PL$22/*self*/["getClassFromTemporaryTracked"](PL$22/*self*/["getFunctionArgumentType"](PL$44/*resolvedType*/, PL$41/*i*/, PL$32/*parParsed*/), PL$32/*parParsed*/), PL$32/*parParsed*/));}};
                ;
                PL$45/*replace*/["push"]("]}))");
                PL$36/*res*/["push"](PL$45/*replace*/);
                PL$43/*errPs*/["resolve"]();
                return;
              };
              ;
              debugger;}catch(PL$47/*e*/){
              debugger;};
            ;
            ;}));
          return PL$36/*res*/;
        }else{
        if(PL$23/*parType*/["isDynamic"]){
          PL$37/*typeExpression*/ = PL$38/*renderTypeName*/(PL$23/*parType*/, PL$23/*parType*/);
          if(PL$37/*typeExpression*/){
            PL$36/*res*/["push"](PL$37/*typeExpression*/);
          }else{
          PL$36/*res*/["push"](this["addError"](PL$32/*parParsed*/, PL$11/*errorMsg*/["internalMissingType"], (function(){
          
            ;
            debugger;
            ;})));
          };
          ;
        }else{
        var PL$29/*name*/ = PL$16/*identifierName*/(PL$23/*parType*/);
        ;
        PL$23/*parType*/ = this["getType"](PL$29/*name*/, PL$32/*parParsed*/);
        PL$37/*typeExpression*/ = PL$38/*renderTypeName*/(PL$23/*parType*/, PL$23/*parType*/);
        if(PL$37/*typeExpression*/){
          PL$36/*res*/["push"](PL$37/*typeExpression*/);
        }else{
        PL$36/*res*/["push"](this["addError"](PL$32/*parParsed*/, PL$11/*errorMsg*/["internalMissingType"], (function(){
        
          ;
          debugger;
          ;})));
        };
        ;
        };
        };
        ;
        return PL$36/*res*/;
        ;});
      this["getFunctionType"] = (function(PL$20/*par*/){
      
        ;
        var PL$48/*isTyped*/ = false;
        ;
        var PL$49/*functionTypeParam*/ = {
          "return": this["getType"]("var"),
          "arguments": [
            
          ]
        };
        ;
        var PL$50/*functionInfo*/ = this["functionInfo"](PL$20/*par*/);
        ;
        if(PL$50/*functionInfo*/["hasReturnType"]){
          PL$48/*isTyped*/ = true;
          PL$49/*functionTypeParam*/["return"] = PL$50/*functionInfo*/["returnType"];
        };
        ;
        if((PL$20/*par*/["params"] && PL$20/*par*/["params"]["length"])){
          var PL$41/*i*/ = 0;
          ;
          var PL$46/*l*/ = PL$20/*par*/["params"]["length"];
          ;
          for(PL$41/*i*/;(PL$41/*i*/ < PL$46/*l*/);++PL$41/*i*/){{
            var PL$51/*tempTypename*/ = PL$16/*identifierName*/((PL$20/*par*/["params"][PL$41/*i*/]["typename"] || "var"));
            ;
            PL$49/*functionTypeParam*/["arguments"]["push"](this["getType"](PL$51/*tempTypename*/, PL$20/*par*/));
            if((PL$51/*tempTypename*/ != "var")){
              PL$48/*isTyped*/ = true;
            };
            ;}};
          ;
        };
        ;
        if(PL$48/*isTyped*/){
          return this["createFunctionType"](PL$49/*functionTypeParam*/);
        };
        ;
        return this["getType"]("var");
        ;});
      this["createFunctionType"] = (function(PL$20/*par*/){
      
        ;
        var PL$52/*isDynamic*/ = false;
        ;
        if(PL$20/*par*/["return"]["isDynamic"]){
          PL$52/*isDynamic*/ = true;
        };
        ;
        var PL$41/*i*/ = 0;
        ;
        for(PL$41/*i*/ = 0;(PL$41/*i*/ < PL$20/*par*/["arguments"]["length"]);++PL$41/*i*/){{
          if(PL$20/*par*/["arguments"][PL$41/*i*/]["isDynamic"]){
            PL$52/*isDynamic*/ = true;
          };
          ;}};
        ;
        if(PL$52/*isDynamic*/){
          debugger;
        }else{
        return PL$7/*classSystem*/["createFunctionType"](PL$20/*par*/);
        };
        ;
        ;});
      this["addType"] = (function(PL$20/*par*/, PL$32/*parParsed*/){
      
        ;
        var PL$29/*name*/ = PL$16/*identifierName*/(PL$20/*par*/["name"]);
        ;
        if(this["types"]["has"](PL$29/*name*/)){
          this["error"](PL$32/*parParsed*/, PL$11/*errorMsg*/["typeExists"]);
        };
        ;
        var PL$24/*type*/;
        ;
        if(PL$20/*par*/["dynamic"]){
          PL$24/*type*/ = {
            "isDynamic": true,
            "extraRes": PL$20/*par*/["extraRes"]
          };
        }else{
        PL$24/*type*/ = this["getProvisionalType"](PL$32/*parParsed*/);
        };
        ;
        this["types"]["set"](PL$29/*name*/, {
          "name": PL$29/*name*/,
          "type": PL$24/*type*/,
          "isDynamic": PL$24/*type*/["isDynamic"],
          "extraRes": PL$20/*par*/["extraRes"]
        });
        ;});
      this["getTypeName"] = (function(PL$23/*parType*/, PL$32/*parParsed*/){
      
        ;
        var PL$29/*name*/;
        ;
        var PL$42/*typesAr*/ = this["types"]["getArray"]();
        ;
        var PL$41/*i*/;
        ;
        for(PL$41/*i*/ = 0;(PL$41/*i*/ < PL$42/*typesAr*/["length"]);++PL$41/*i*/){{
          PL$29/*name*/ = PL$42/*typesAr*/[PL$41/*i*/]["key"];
          if((this["types"]["get"](PL$29/*name*/)["type"] === PL$23/*parType*/)){
            return this["types"]["get"](PL$29/*name*/)["name"];
          };
          ;}};
        ;
        this["error"](PL$32/*parParsed*/, PL$11/*errorMsg*/["internalTypeHasNoName"]);
        ;});
      this["createType"] = (function(PL$20/*par*/){
      
        ;
        var PL$29/*name*/ = PL$16/*identifierName*/(PL$20/*par*/["name"]);
        ;
        var PL$30/*entry*/ = this["_getTypeEntry"](PL$20/*par*/["name"]);
        ;
        if(PL$30/*entry*/["type"]["isDynamic"]){
          this["error"](PL$20/*par*/["par"], PL$11/*errorMsg*/["dynamicTypeCantBeDefined"]);
        };
        ;
        if(PL$30/*entry*/["isDefined"]){
          this["error"](PL$20/*par*/["par"], PL$11/*errorMsg*/["typeRedefinition"]);
        };
        ;
        var PL$24/*type*/ = PL$7/*classSystem*/["createClass"](PL$20/*par*/["literal"], {
          
        });
        ;
        var PL$53/*provisional*/ = PL$30/*entry*/["type"];
        ;
        PL$30/*entry*/["type"] = PL$24/*type*/;
        try
        {
          this["resolveProvisional"](PL$53/*provisional*/, PL$24/*type*/);}catch(PL$47/*e*/){
          this["error"](PL$20/*par*/["par"], PL$11/*errorMsg*/["typeRedefinition"]);};
        ;
        PL$30/*entry*/["isDefined"] = true;
        ;});
      this["_getTypeEntry"] = (function(PL$54/*parName*/, PL$32/*parParsed*/, PL$20/*par*/){
      
        ;
        var PL$29/*name*/ = PL$16/*identifierName*/(PL$54/*parName*/);
        ;
        var PL$55/*throwError*/ = true;
        ;
        if((PL$20/*par*/ && PL$20/*par*/["dontThrow"])){
          PL$55/*throwError*/ = false;
        };
        ;
        if(this["types"]["has"](PL$29/*name*/)){
          return this["types"]["get"](PL$29/*name*/);
        };
        ;
        if((PL$29/*name*/[(PL$29/*name*/["length"] - 1)] == "*")){
          var PL$56/*typename*/ = PL$29/*name*/["substr"](0, (PL$29/*name*/["length"] - 1));
          ;
          var PL$57/*typeEntry*/ = this["_getTypeEntry"](PL$56/*typename*/, PL$32/*parParsed*/, PL$20/*par*/);
          ;
          if(PL$57/*typeEntry*/){
            if((PL$57/*typeEntry*/["type"] && this["isVar"](PL$57/*typeEntry*/["type"]))){
              this["types"]["set"](PL$29/*name*/, {
                "name": PL$29/*name*/,
                "type": PL$57/*typeEntry*/["type"],
                "isDynamic": false
              });
              return this["types"]["get"](PL$29/*name*/);
            };
            ;
            var PL$58/*extraRes*/ = PL$57/*typeEntry*/["extraRes"];
            ;
            this["types"]["set"](PL$29/*name*/, {
              "name": PL$29/*name*/,
              "type": PL$7/*classSystem*/["_createPromiseOfClass"](PL$57/*typeEntry*/["type"]),
              "isDynamic": false,
              "extraRes": PL$58/*extraRes*/
            });
            PL$58/*extraRes*/["push"]("var ");
            PL$58/*extraRes*/["push"](this["renderType"](PL$29/*name*/));
            this["common"]["useClassSystem"] = true;
            PL$58/*extraRes*/["push"](" = classSystem._createPromiseOfClass(");
            PL$58/*extraRes*/["push"](this["renderType"](PL$56/*typename*/));
            PL$58/*extraRes*/["push"](");");
            PL$58/*extraRes*/["push"](this["newLine"]());
            PL$58/*extraRes*/["push"]("var ");
            PL$58/*extraRes*/["push"]((this["getVariableName"](PL$29/*name*/) + " = "));
            PL$58/*extraRes*/["push"](this["renderType"](PL$29/*name*/));
            PL$58/*extraRes*/["push"](";");
            PL$58/*extraRes*/["push"](this["newLine"]());
            PL$58/*extraRes*/["push"]((("var " + this["getConstructorName"](PL$29/*name*/)) + " = undefined;"));
            PL$58/*extraRes*/["push"](this["_typeReadyCode"]({
              "typename": PL$29/*name*/,
              "noConstructor": false
            }));
            return this["types"]["get"](PL$29/*name*/);
          };
          ;
        };
        ;
        if(! PL$55/*throwError*/){
          return;
        };
        ;
        this["error"](PL$32/*parParsed*/, PL$11/*errorMsg*/["typeUndeclared"], {
          "name": PL$29/*name*/
        });
        ;});
      this["getType"] = (function(PL$54/*parName*/, PL$32/*parParsed*/, PL$20/*par*/){
      
        ;
        var PL$30/*entry*/ = this["_getTypeEntry"](PL$54/*parName*/, PL$32/*parParsed*/, PL$20/*par*/);
        ;
        if(PL$30/*entry*/){
          return PL$30/*entry*/["type"];
        };
        ;
        ;});
      this["getReturnType"] = (function(){
      
        ;
        if(this["_returnType"]){
          return this["_returnType"];
        };
        ;
        return this["getType"]("var");
        ;});
      this["expectTypeVar"] = (function(PL$20/*par*/){
      
        ;
        if((PL$20/*par*/["getType"]() === this["getType"]("var"))){
          return PL$20/*par*/;
        };
        ;
        var PL$22/*self*/ = this;
        ;
        var PL$47/*e*/ = this["addError"](PL$20/*par*/["getParsed"](), PL$11/*errorMsg*/["expectedVar"]);
        ;
        PL$7/*classSystem*/["definitionPromise"](PL$20/*par*/["getType"]())["then"]((function(PL$31/*t*/){
        
          ;
          if((PL$31/*t*/ === PL$22/*self*/["getType"]("var"))){
            PL$47/*e*/["resolve"]();
          };
          ;
          ;}));
        return PL$20/*par*/;
        ;});
      this["isSameType"] = (function(PL$59/*type1*/, PL$60/*type2*/){
      
        ;
        if((this["isDynamicType"](PL$59/*type1*/) || this["isDynamicType"](PL$60/*type2*/))){
          return (PL$59/*type1*/ === PL$60/*type2*/);
        }else{
        return PL$7/*classSystem*/["isSameType"](PL$59/*type1*/, PL$60/*type2*/);
        };
        ;
        ;});
      this["getResultType"] = (function(PL$20/*par*/){
      
        ;
        if(! PL$20/*par*/){
          return undefined;
        };
        ;
        if((typeof PL$20/*par*/ == "string")){
          return undefined;
        };
        ;
        var PL$31/*t*/ = PL$20/*par*/["getType"]();
        ;
        if((typeof PL$31/*t*/ == "string")){
          return this["getType"](PL$31/*t*/);
        };
        ;
        return PL$31/*t*/;
        ;});
      this["getFunctionArgumentType"] = (function(PL$23/*parType*/, PL$61/*parIndex*/, PL$28/*parsed*/){
      
        ;
        var PL$62/*retType*/ = this["getProvisionalType"](PL$28/*parsed*/);
        ;
        var PL$22/*self*/ = this;
        ;
        PL$7/*classSystem*/["readyPromise"](PL$23/*parType*/)["then"]((function(PL$23/*parType*/){
        
          ;
          PL$22/*self*/["resolveProvisional"](PL$62/*retType*/, PL$7/*classSystem*/["getFunctionArgumentType"](PL$23/*parType*/, PL$61/*parIndex*/));
          ;}));
        return PL$62/*retType*/;
        ;});
      this["getFunctionReturnType"] = (function(PL$23/*parType*/, PL$28/*parsed*/){
      
        ;
        var PL$31/*t*/ = this["getProvisionalType"](PL$28/*parsed*/);
        ;
        var PL$22/*self*/ = this;
        ;
        PL$7/*classSystem*/["readyPromise"](PL$23/*parType*/)["then"]((function(PL$63/*newt*/){
        
          ;
          PL$22/*self*/["resolveProvisional"](PL$31/*t*/, PL$7/*classSystem*/["getFunctionReturnType"](PL$63/*newt*/, PL$28/*parsed*/));
          ;}));
        return PL$31/*t*/;
        ;});
      ;});
    ;
    PL$21/*f*/["apply"](PL$19/*parInstance*/, [
      PL$20/*par*/
    ]);
    ;})); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();