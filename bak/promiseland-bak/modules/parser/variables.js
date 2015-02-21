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
    if (promiseland._hasModule({ hashStr: "6a9c18560997faa13ad3f8a76025888e" })){ return promiseland._getModule("6a9c18560997faa13ad3f8a76025888e"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "6a9c18560997faa13ad3f8a76025888e", "module": PL$1, promising: true });
var PL$6/*promiseland*/;try{PL$6/*promiseland*/ = promiseland;}catch(e){};
var PL$32/*Promise*/;try{PL$32/*Promise*/ = Promise;}catch(e){};
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
      this["variables"] = new PL$5/*Map*/()["mixin"](PL$20/*par*/["variables"]);
      this["localVariables"] = new PL$5/*Map*/();
      this["addLocalVariable"] = (function(PL$20/*par*/, PL$22/*parParsed*/){
      
        ;
        var PL$23/*self*/ = this;
        ;
        var PL$24/*name*/ = PL$16/*identifierName*/(PL$20/*par*/["name"]);
        ;
        if(this["localVariables"]["has"](PL$24/*name*/)){
          if((! PL$20/*par*/["type"] && ! PL$20/*par*/["typename"])){
          }else{
          var PL$25/*newType*/ = (PL$20/*par*/["type"] || this["getType"](PL$20/*par*/["typename"], PL$22/*parParsed*/));
          ;
          var PL$26/*existing*/ = this["_getVariableType"](this["localVariables"]["get"](PL$24/*name*/));
          ;
          PL$7/*classSystem*/["definitionPromise"](PL$25/*newType*/)["then"]((function(PL$27/*type1*/){
          
            ;
            PL$7/*classSystem*/["definitionPromise"](PL$26/*existing*/)["then"]((function(PL$28/*type2*/){
            
              ;
              if(! PL$7/*classSystem*/["isSameType"](PL$27/*type1*/, PL$28/*type2*/)){
                PL$23/*self*/["addError"](PL$22/*parParsed*/, PL$11/*errorMsg*/["variableRedefinition"]);
              };
              ;
              ;}));
            ;}));
          };
          ;
        }else{
        this["localVariables"]["set"](PL$24/*name*/, {
          "typename": PL$20/*par*/["typename"],
          "type": PL$20/*par*/["type"],
          "name": PL$24/*name*/
        });
        if((! PL$20/*par*/["typename"] && ! PL$20/*par*/["type"])){
          this["localVariables"]["get"](PL$24/*name*/)["type"] = this["getProvisionalType"](PL$22/*parParsed*/);
          this["localVariables"]["get"](PL$24/*name*/)["needsResolving"] = true;
        };
        ;
        };
        ;
        if(PL$20/*par*/["declaration"]){
          this["localVariables"]["get"](PL$24/*name*/)["declaration"] = PL$20/*par*/["declaration"];
          this["localVariables"]["get"](PL$24/*name*/)["needsDeclaration"] = true;
        };
        ;
        if(PL$20/*par*/["localFunction"]){
          this["localVariables"]["get"](PL$24/*name*/)["localFunction"] = PL$20/*par*/["localFunction"];
        };
        ;
        if(PL$20/*par*/["parameter"]){
          this["localVariables"]["get"](PL$24/*name*/)["parameter"] = PL$20/*par*/["parameter"];
        };
        ;
        if(PL$20/*par*/["isFunction"]){
          this["localVariables"]["get"](PL$24/*name*/)["function"] = PL$20/*par*/["function"];
          this["localVariables"]["get"](PL$24/*name*/)["isFunction"] = true;
        };
        ;
        this["variables"]["set"](PL$24/*name*/, this["localVariables"]["get"](PL$24/*name*/));
        ;});
      this["addLocalVariableTemporary"] = (function(PL$20/*par*/, PL$22/*parParsed*/){
      
        ;
        var PL$23/*self*/ = this;
        ;
        var PL$24/*name*/ = PL$16/*identifierName*/(PL$20/*par*/["name"]);
        ;
        var PL$29/*originalEntry*/;
        ;
        if(this["variables"]["has"](PL$24/*name*/)){
          PL$29/*originalEntry*/ = this["variables"]["get"](PL$24/*name*/);
        };
        ;
        var PL$30/*entry*/ = {
          "typename": PL$20/*par*/["typename"],
          "type": PL$20/*par*/["type"],
          "name": PL$24/*name*/
        };
        ;
        if((! PL$20/*par*/["typename"] && ! PL$20/*par*/["type"])){
          PL$30/*entry*/["type"] = this["getProvisionalType"](PL$22/*parParsed*/);
          PL$30/*entry*/["needsResolving"] = true;
        };
        ;
        if(PL$20/*par*/["parameter"]){
          PL$30/*entry*/["parameter"] = PL$20/*par*/["parameter"];
        };
        ;
        if(PL$20/*par*/["isFunction"]){
          PL$30/*entry*/["function"] = PL$20/*par*/["function"];
        };
        ;
        PL$30/*entry*/["temporary"] = true;
        this["variables"]["set"](PL$24/*name*/, PL$30/*entry*/);
        var PL$31/*resPs*/ = new PL$32/*Promise*/();
        ;
        (function(){
        var PL$33 = new __Promise();
        var PL$35/*promiseland exception catcher*/ = function(code){
          return function(res){
            try{ code(res); }catch(e){
              PL$33.reject(e);
            };
          };
        };
        var PL$36/*catch rejected*/ = function(e){
          PL$33.reject(e);
        };
        PL$35/*promiseland exception catcher*/(function(){
        
          ;
          PL$31/*resPs*/.then(PL$35/*promiseland exception catcher*/(function(PL$37){PL$37;
          if(PL$29/*originalEntry*/){
            PL$23/*self*/["variables"]["set"](PL$24/*name*/, PL$29/*originalEntry*/);
          }else{
          PL$23/*self*/["variables"]["delete"](PL$24/*name*/);
          };
          ;
          PL$33.resolve(); return;}), PL$36/*catch rejected*/);
          ;
        })();return PL$33;
        })();
        return PL$31/*resPs*/;
        ;});
      this["_getVariableType"] = (function(PL$38/*parEntry*/){
      
        ;
        if(PL$38/*parEntry*/["type"]){
          return PL$38/*parEntry*/["type"];
        };
        ;
        return this["getType"](PL$38/*parEntry*/["typename"]);
        ;});
      this["getVariableType"] = (function(PL$39/*parName*/, PL$20/*par*/){
      
        ;
        var PL$24/*name*/ = PL$16/*identifierName*/(PL$39/*parName*/);
        ;
        this["_addUsedVariable"](PL$24/*name*/);
        if(this["variables"]["has"](PL$24/*name*/)){
          var PL$30/*entry*/ = this["variables"]["get"](PL$24/*name*/);
          ;
          return this["_getVariableType"](PL$30/*entry*/);
        };
        ;
        return this["getType"]("var");
        ;});
      this["usedVariablesMap"] = new PL$5/*Map*/();
      this["_addUsedVariable"] = (function(PL$20/*par*/){
      
        ;
        var PL$24/*name*/ = PL$16/*identifierName*/(PL$20/*par*/);
        ;
        if((PL$24/*name*/ === "undefined")){
          return;
        };
        ;
        if(this["variables"]["has"](PL$24/*name*/)){
          if(this["variables"]["get"](PL$24/*name*/)["temporary"]){
            return;
          };
          ;
        };
        ;
        this["usedVariablesMap"]["set"](PL$24/*name*/, true);
        ;});
      this["_getUsedVairablesMap"] = (function(){
      
        ;
        return this["usedVariablesMap"];
        ;});
      this["getVariableName"] = (function(PL$24/*name*/){
      
        ;
        return this["common"]["variableNames"]["get"](PL$24/*name*/);
        ;});
      this["findVariables"] = (function(PL$20/*par*/){
      
        ;
        var PL$23/*self*/ = this;
        ;
        if((! PL$20/*par*/ || (typeof PL$20/*par*/ == "string"))){
          return;
        };
        ;
        if((PL$20/*par*/["type"] == "VariableDeclaration")){
          this["addLocalVariable"]({
            "name": PL$16/*identifierName*/(PL$20/*par*/["id"]),
            "typename": PL$16/*identifierName*/(PL$20/*par*/["typename"]),
            "declaration": true
          }, PL$20/*par*/);
        }else{
        if((PL$20/*par*/["type"] == "Class")){
          var PL$40/*ci*/ = PL$23/*self*/["identifyClass"](PL$20/*par*/);
          ;
          if(PL$40/*ci*/["hasName"]){
            this["addLocalVariable"]({
              "name": PL$16/*identifierName*/(PL$20/*par*/["name"]),
              "typename": "var",
              "declaration": true
            }, PL$20/*par*/);
          };
          ;
          return;
        }else{
        if(PL$17/*checkIsFunction*/(PL$20/*par*/)){
          var PL$41/*functionInfo*/ = this["functionInfo"](PL$20/*par*/);
          ;
          if(PL$41/*functionInfo*/["hasExternalName"]){
            this["addLocalVariable"]({
              "name": PL$41/*functionInfo*/["nameStr"],
              "isFunction": true
            }, PL$20/*par*/);
          };
          ;
          return;
        };
        };
        };
        ;
        var PL$42/*i*/;
        ;
        for(PL$42/*i*/ in PL$20/*par*/){
          if((PL$42/*i*/ == "_extrainfo")){
            continue;;
          };
          ;
          this["findVariables"](PL$20/*par*/[PL$42/*i*/]);};
        ;
        ;});
      this["getVariable"] = (function(PL$20/*par*/){
      
        ;
        var PL$43/*res*/ = this["newResult"]();
        ;
        this["_addUsedVariable"](PL$20/*par*/);
        PL$43/*res*/["push"](this["getVariableName"](PL$20/*par*/));
        PL$43/*res*/["setType"](this["getVariableType"](PL$20/*par*/));
        return PL$43/*res*/;
        ;});
      this["expVariableStatement"] = (function(PL$20/*par*/){
      
        ;
        var PL$43/*res*/ = this["newResult"]();
        ;
        var PL$44/*declarations*/ = PL$20/*par*/["declarations"];
        ;
        if(! PL$44/*declarations*/){
          this["error"](PL$20/*par*/, PL$11/*errorMsg*/["missingDeclarations"]);
          return "";
        };
        ;
        var PL$42/*i*/ = 0;
        ;
        var PL$45/*l*/ = PL$44/*declarations*/["length"];
        ;
        var PL$46/*usedType*/ = this["getType"](PL$16/*identifierName*/(PL$20/*par*/["typename"]), PL$20/*par*/);
        ;
        var PL$47/*addVar*/ = false;
        ;
        if((! this["promising"] && (PL$45/*l*/ > 0))){
          PL$47/*addVar*/ = true;
          for(PL$42/*i*/ = 0;(PL$42/*i*/ < PL$45/*l*/);++PL$42/*i*/){{
            var PL$48/*varName*/ = PL$16/*identifierName*/(PL$44/*declarations*/[PL$42/*i*/]["id"]);
            ;
            if(this["usedVariablesMap"]["get"](PL$48/*varName*/)){
              PL$47/*addVar*/ = false;
            };
            ;
            if(! this["localVariables"]["get"](PL$48/*varName*/)["needsDeclaration"]){
              PL$47/*addVar*/ = false;
            };
            ;}};
          ;
        };
        ;
        if(! PL$20/*par*/["isRegularStatement"]){
          PL$47/*addVar*/ = false;
        };
        ;
        if(! this["isSimpleType"](PL$46/*usedType*/)){
          PL$47/*addVar*/ = false;
        };
        ;
        if(! this["canSkipVarHeusting"](PL$46/*usedType*/)){
          PL$47/*addVar*/ = false;
        };
        ;
        if(PL$47/*addVar*/){
          for(PL$42/*i*/ = 0;(PL$42/*i*/ < PL$45/*l*/);++PL$42/*i*/){{
            PL$48/*varName*/ = PL$16/*identifierName*/(PL$44/*declarations*/[PL$42/*i*/]["id"]);
            this["localVariables"]["get"](PL$48/*varName*/)["needsDeclaration"] = false;}};
          ;
        };
        ;
        for(PL$42/*i*/ = 0;(PL$42/*i*/ < PL$45/*l*/);++PL$42/*i*/){{
          if((PL$42/*i*/ > 0)){
            if(PL$47/*addVar*/){
              PL$43/*res*/["push"](";");
              PL$43/*res*/["push"](this["newLine"]());
            }else{
            PL$43/*res*/["push"](", ");
            };
            ;
          };
          ;
          if((PL$44/*declarations*/[PL$42/*i*/]["type"] == "VariableDeclaration")){
            if(PL$47/*addVar*/){
              PL$48/*varName*/ = PL$16/*identifierName*/(PL$44/*declarations*/[PL$42/*i*/]["id"]);
              PL$43/*res*/["push"](this["getDeclareVariableCode"]({
                "name": this["getVariableName"](PL$48/*varName*/),
                "type": PL$46/*usedType*/,
                "errorFun": this["getWarningFun"](PL$20/*par*/),
                "parsed": PL$20/*par*/,
                "declaration": true,
                "value": (PL$44/*declarations*/[PL$42/*i*/]["init"] ? this["parseExpression"](PL$44/*declarations*/[PL$42/*i*/]["init"]) : undefined)
              }));
            }else{
            PL$43/*res*/["push"](this["parseExpression"](PL$44/*declarations*/[PL$42/*i*/]));
            };
            ;
          }else{
          this["error"](PL$44/*declarations*/[PL$42/*i*/], PL$11/*errorMsg*/["unknownType"]);
          };
          ;}};
        ;
        PL$43/*res*/["setType"](PL$46/*usedType*/);
        return PL$43/*res*/;
        ;});
      this["expVariableDeclaration"] = (function(PL$20/*par*/){
      
        ;
        var PL$43/*res*/ = this["newResult"]();
        ;
        if(PL$20/*par*/["init"]){
          PL$43/*res*/["pushType"](this["getSetVariableCode"]({
            "instance": this["getVariable"](PL$16/*identifierName*/(PL$20/*par*/["id"])),
            "assignmentType": PL$20/*par*/["id"]["type"],
            "value": this["parseExpression"](PL$20/*par*/["init"]),
            "operator": "=",
            "errorFun": this["getWarningFun"](PL$20/*par*/)
          }));
        }else{
        PL$43/*res*/["pushType"](this["getVariable"](PL$16/*identifierName*/(PL$20/*par*/["id"])));
        };
        ;
        return PL$43/*res*/;
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