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
    if (promiseland._hasModule({ hashStr: "79243ba00d9ef7180240a8bc6ca5eaa7" })){ return promiseland._getModule("79243ba00d9ef7180240a8bc6ca5eaa7"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "79243ba00d9ef7180240a8bc6ca5eaa7", "module": PL$1, promising: true });
var PL$41/*Promise*/;try{PL$41/*Promise*/ = Promise;}catch(e){};
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
var PL$5/*basics*/;
var PL$7/*errorFun*/;
var PL$8/*errorMsg*/;
var PL$9/*_stringEncodeStr*/;
var PL$10/*stringEncodeStr*/;
var PL$11/*VariableNames*/;
var PL$12/*mixin*/;
var PL$13/*identifierName*/;
var PL$14/*checkIsFunction*/;
var PL$15/*getExtraFromPar*/;
var PL$16/*statementType*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  __requireFun("./basics").then(PL$3/*promiseland exception catcher*/(function(PL$6){PL$5/*basics*/ = PL$6;
  PL$7/*errorFun*/ = PL$5/*basics*/["errorFun"];
  PL$8/*errorMsg*/ = PL$5/*basics*/["errorMsg"];
  PL$9/*_stringEncodeStr*/ = PL$5/*basics*/["_stringEncodeStr"];
  PL$10/*stringEncodeStr*/ = PL$5/*basics*/["stringEncodeStr"];
  PL$11/*VariableNames*/ = PL$5/*basics*/["VariableNames"];
  PL$12/*mixin*/ = PL$5/*basics*/["mixin"];
  PL$13/*identifierName*/ = PL$5/*basics*/["identifierName"];
  PL$14/*checkIsFunction*/ = PL$5/*basics*/["checkIsFunction"];
  PL$15/*getExtraFromPar*/ = PL$5/*basics*/["getExtraFromPar"];
  PL$16/*statementType*/ = PL$5/*basics*/["statementType"];
  PL$1.resolve((function(PL$17/*parInstance*/, PL$18/*par*/){
  
    ;
    var PL$19/*f*/ = (function(PL$18/*par*/){
    
      ;
      this["parseFunction"] = (function(PL$20/*parsed*/){
      
        ;
        this["stack"]("isFunction");
        this["isFunction"] = true;
        var PL$21/*res*/ = this["_parseFunction"](PL$20/*parsed*/);
        ;
        this["unstack"]("isFunction");
        if(this["isAsmFun"](PL$20/*parsed*/)){
          var PL$22/*asmRes*/ = this["newResult"]();
          ;
          PL$22/*asmRes*/["pushType"](PL$21/*res*/);
          PL$22/*asmRes*/["checkasm"] = true;
          PL$22/*asmRes*/["setParsed"](PL$20/*parsed*/);
          return PL$22/*asmRes*/;
        };
        ;
        return PL$21/*res*/;
        ;});
      this["functionInfo"] = (function(PL$20/*parsed*/){
      
        ;
        var PL$21/*res*/ = {
          "hasName": false,
          "hasReturnType": false,
          "returnTypeNameStr": undefined,
          "nameStr": undefined
        };
        ;
        if(PL$20/*parsed*/["id"]){
          PL$21/*res*/["hasName"] = true;
          PL$21/*res*/["nameStr"] = PL$13/*identifierName*/(PL$20/*parsed*/["id"]);
        };
        ;
        if(PL$20/*parsed*/["returnTypename"]){
          var PL$23/*typeNameStr*/ = PL$13/*identifierName*/(PL$20/*parsed*/["returnTypename"]);
          ;
          if(PL$21/*res*/["hasName"]){
            PL$21/*res*/["returnType"] = this["getType"](PL$23/*typeNameStr*/, PL$20/*parsed*/);
            PL$21/*res*/["returnTypeNameStr"] = PL$23/*typeNameStr*/;
            PL$21/*res*/["hasReturnType"] = true;
          }else{
          var PL$24/*type*/ = this["getType"](PL$23/*typeNameStr*/, PL$20/*parsed*/, {
            "dontThrow": true
          });
          ;
          if(PL$24/*type*/){
            PL$21/*res*/["returnType"] = PL$24/*type*/;
            PL$21/*res*/["returnTypeNameStr"] = PL$23/*typeNameStr*/;
            PL$21/*res*/["hasReturnType"] = true;
          }else{
          PL$21/*res*/["hasName"] = true;
          PL$21/*res*/["nameStr"] = PL$23/*typeNameStr*/;
          };
          ;
          };
          ;
        };
        ;
        if(! PL$21/*res*/["hasReturnType"]){
          PL$21/*res*/["returnType"] = this["getType"]("var");
        };
        ;
        if((PL$20/*parsed*/["type"] == "FunctionDeclaration")){
          PL$21/*res*/["declaration"] = true;
          if(PL$21/*res*/["hasName"]){
            PL$21/*res*/["hasExternalName"] = true;
          };
          ;
        };
        ;
        return PL$21/*res*/;
        ;});
      this["_parseFunction"] = (function(PL$18/*par*/, PL$25/*parJsn*/){
      
        ;
        PL$25/*parJsn*/ = (PL$25/*parJsn*/ || {
          
        });
        var PL$26/*parGivenPromiseNameStr*/ = PL$25/*parJsn*/["promiseName"];
        ;
        var PL$27/*noUntrack*/ = PL$25/*parJsn*/["noUntrack"];
        ;
        var PL$28/*hasFrameInfo*/ = false;
        ;
        var PL$29/*runRemote*/ = false;
        ;
        var PL$30/*runExclusive*/ = false;
        ;
        var PL$31/*i*/ = 0;
        ;
        var PL$32/*typename*/;
        ;
        var PL$33/*parParsed*/ = PL$18/*par*/;
        ;
        var PL$34/*funClosure*/;
        ;
        var PL$35/*self*/ = this;
        ;
        var PL$36/*functionInfo*/ = this["functionInfo"](PL$33/*parParsed*/);
        ;
        var PL$37/*hasName*/ = PL$36/*functionInfo*/["hasName"];
        ;
        var PL$38/*nameStr*/ = PL$36/*functionInfo*/["nameStr"];
        ;
        var PL$39/*hasReturnTypeName*/ = PL$36/*functionInfo*/["hasReturnType"];
        ;
        this["_returnType"] = PL$36/*functionInfo*/["returnType"];
        var PL$40/*thisFunType*/ = this["getFunctionType"](PL$18/*par*/);
        ;
        if((PL$37/*hasName*/ && PL$33/*parParsed*/["useLocalVariableName"])){
          this["addLocalVariable"]({
            "name": PL$38/*nameStr*/,
            "isFunction": true,
            "type": PL$40/*thisFunType*/,
            "localFunction": true
          }, PL$33/*parParsed*/);
        };
        ;
        this["stack"]("inheritedAvailable");
        this["stack"]("thisType");
        if(this["isClassObject"]){
          this["inheritedAvailable"] = true;
          this["thisType"] = (this["inheritedSystem"]["type"] || this["getType"]("var"));
        }else{
        this["inheritedAvailable"] = false;
        this["thisType"] = this["getType"]("var");
        };
        ;
        this["runBeforeReturnRes"] = this["newResult"]();
        this["beforeReturnExistsPs"] = new PL$41/*Promise*/();
        this["additionalCodeFrontRes"] = this["newResult"]();
        this["additionalCodeEndRes"] = this["newResult"]();
        this["stack"]("isClassObject");
        this["isClassObject"] = false;
        var PL$42/*keywords*/ = PL$18/*par*/["keywords"];
        ;
        var PL$43/*frameName*/;
        ;
        if((PL$42/*keywords*/ && PL$42/*keywords*/["length"])){
          var PL$44/*k*/;
          ;
          for(PL$44/*k*/ = 0;(PL$44/*k*/ < PL$42/*keywords*/["length"]);++PL$44/*k*/){{
            switch (PL$42/*keywords*/[PL$44/*k*/]["type"]){
              case "const":
                
                break;;
              case "sync":
                
                break;;
              case "frame":
                
                PL$28/*hasFrameInfo*/ = true;
                PL$29/*runRemote*/ = true;
                PL$18/*par*/["promising"] = true;
                if(this["dynamicCode"]){
                  this["error"](PL$18/*par*/, PL$8/*errorMsg*/["functionFrameInDynamicCode"]);
                };
                ;
                PL$43/*frameName*/ = PL$42/*keywords*/[PL$44/*k*/]["name"];
                break;;
              case "exclusive":
                
                PL$28/*hasFrameInfo*/ = true;
                PL$30/*runExclusive*/ = true;
                PL$43/*frameName*/ = PL$42/*keywords*/[PL$44/*k*/]["name"];
                break;;
              
            };
            ;}};
          ;
        };
        ;
        var PL$45/*templateTypesAr*/ = [
          
        ];
        ;
        if((PL$18/*par*/["template"] && PL$18/*par*/["template"]["properties"]["length"])){
          var PL$46/*templateTypes*/ = this["getTemplateProperty"](PL$18/*par*/["template"], "types", "ObjectExpression");
          ;
          if(PL$46/*templateTypes*/){
            var PL$47/*typeVarInit*/ = this["newResult"]();
            ;
            for(PL$31/*i*/ = 0;(PL$31/*i*/ < PL$46/*templateTypes*/["properties"]["length"]);++PL$31/*i*/){{
              var PL$48/*p*/ = PL$46/*templateTypes*/["properties"][PL$31/*i*/];
              ;
              PL$32/*typename*/ = PL$13/*identifierName*/(PL$48/*p*/["key"]);
              this["addType"]({
                "name": PL$32/*typename*/,
                "dynamic": true
              }, PL$48/*p*/["value"]);
              if(! PL$34/*funClosure*/){
                PL$34/*funClosure*/ = this["newResult"]();
                PL$34/*funClosure*/["push"]("(function(){");
              };
              ;
              PL$47/*typeVarInit*/["push"]("var ");
              PL$47/*typeVarInit*/["push"](this["renderType"](PL$32/*typename*/));
              PL$47/*typeVarInit*/["push"](" = ");
              PL$47/*typeVarInit*/["push"](this["expectTypeVar"](this["parseExpression"](PL$48/*p*/["value"])));
              PL$47/*typeVarInit*/["push"](";");
              PL$47/*typeVarInit*/["push"](this["newLine"]());
              PL$47/*typeVarInit*/["push"]((("var " + this["getVariableName"](PL$32/*typename*/)) + " = "));
              PL$47/*typeVarInit*/["push"](this["renderType"](PL$32/*typename*/));
              PL$47/*typeVarInit*/["push"](this["newLine"]());
              PL$47/*typeVarInit*/["push"](";");
              PL$47/*typeVarInit*/["push"]((("var " + this["getConstructorName"](PL$32/*typename*/)) + " = undefined;"));
              PL$47/*typeVarInit*/["push"](this["newLine"]());
              PL$47/*typeVarInit*/["push"](this["_typeReadyCode"]({
                "typename": PL$32/*typename*/
              }));
              PL$45/*templateTypesAr*/["push"](PL$32/*typename*/);}};
            ;
            PL$34/*funClosure*/["push"](PL$47/*typeVarInit*/);
          };
          ;
        };
        ;
        var PL$49/*extraTypesRes*/ = this["newResult"]();
        ;
        if(PL$34/*funClosure*/){
          PL$34/*funClosure*/["push"]("var communicator = {fun: undefined};");
          PL$34/*funClosure*/["push"](this["newLine"]());
          PL$34/*funClosure*/["push"](PL$49/*extraTypesRes*/);
          PL$34/*funClosure*/["push"]("eval(\"communicator.fun = ");
        };
        ;
        var PL$21/*res*/ = this["newResult"]();
        ;
        var PL$50/*funDecl*/ = this["newResult"]();
        ;
        var PL$51/*funRes*/ = this["newResult"]();
        ;
        PL$31/*i*/ = 0;
        PL$50/*funDecl*/["push"]("function");
        var PL$52/*nameRes*/;
        ;
        if(PL$37/*hasName*/){
          this["functionName"] = PL$38/*nameStr*/;
          PL$50/*funDecl*/["push"](" ");
          PL$52/*nameRes*/ = this["newResult"]();
          PL$52/*nameRes*/["push"](this["getVariableName"](PL$38/*nameStr*/));
          PL$50/*funDecl*/["push"](PL$52/*nameRes*/);
        };
        ;
        PL$50/*funDecl*/["push"]("(");
        var PL$53/*params*/ = [
          
        ];
        ;
        if(PL$29/*runRemote*/){
          PL$53/*params*/["push"]({
            "name": "session",
            "typename": "var",
            "parsed": PL$33/*parParsed*/
          });
        };
        ;
        if((PL$18/*par*/["params"] && PL$18/*par*/["params"]["length"])){
          PL$31/*i*/ = 0;
          var PL$54/*l*/ = PL$18/*par*/["params"]["length"];
          ;
          for(PL$31/*i*/;(PL$31/*i*/ < PL$54/*l*/);++PL$31/*i*/){{
            PL$53/*params*/["push"]({
              "name": PL$13/*identifierName*/(PL$18/*par*/["params"][PL$31/*i*/]["name"]),
              "typename": (PL$18/*par*/["params"][PL$31/*i*/]["typename"] || "var"),
              "parsed": PL$18/*par*/["params"][PL$31/*i*/]
            });}};
          ;
        };
        ;
        if(PL$53/*params*/["length"]){
          PL$31/*i*/ = 0;
          PL$54/*l*/ = PL$53/*params*/["length"];
          for(PL$31/*i*/;(PL$31/*i*/ < PL$54/*l*/);++PL$31/*i*/){{
            if(PL$31/*i*/){
              PL$50/*funDecl*/["push"](", ");
            };
            ;
            PL$50/*funDecl*/["push"](this["getVariableName"](PL$13/*identifierName*/(PL$53/*params*/[PL$31/*i*/]["name"])));
            this["addLocalVariable"]({
              "name": PL$53/*params*/[PL$31/*i*/]["name"],
              "typename": (PL$53/*params*/[PL$31/*i*/]["typename"] || "var"),
              "parameter": true
            }, PL$53/*params*/[PL$31/*i*/]["parsed"]);}};
          ;
        };
        ;
        PL$50/*funDecl*/["push"]("){");
        if(this["isAsmFun"](PL$33/*parParsed*/)){
          PL$50/*funDecl*/["push"](this["newLine"]());
          PL$50/*funDecl*/["push"]("\"use asm\";");
          PL$50/*funDecl*/["push"](this["newLine"]());
          this["asmMode"] = true;
        };
        ;
        PL$51/*funRes*/["push"](this["newLine"]());
        var PL$55/*classesRes*/ = this["findClasses"](PL$18/*par*/["body"]);
        ;
        this["findVariables"](PL$18/*par*/["body"]);
        if(PL$30/*runExclusive*/){
          PL$51/*funRes*/["push"]((("if (!promiseland.profileHas(" + PL$10/*stringEncodeStr*/(PL$43/*frameName*/["value"])) + ")){"));
          PL$51/*funRes*/["push"](this["newLine"]());
          if(PL$18/*par*/["promising"]){
            PL$51/*funRes*/["push"]((("var p = " + this["newPromiseStr"]()) + ";"));
            PL$51/*funRes*/["push"](this["newLine"]());
            PL$51/*funRes*/["push"]("p.reject({id: 14, msg: \"function does not execute in this frame.\"});");
            PL$51/*funRes*/["push"](this["newLine"]());
            PL$51/*funRes*/["push"]("return p;");
            PL$51/*funRes*/["push"](this["newLine"]());
          }else{
          PL$51/*funRes*/["push"]("return;");
          PL$51/*funRes*/["push"](this["newLine"]());
          };
          ;
          PL$51/*funRes*/["push"]("};");
          PL$51/*funRes*/["push"](this["newLine"]());
        };
        ;
        var PL$56/*addFront*/ = PL$15/*getExtraFromPar*/(PL$18/*par*/, "addFront");
        ;
        if(PL$56/*addFront*/){
          PL$51/*funRes*/["push"](PL$56/*addFront*/);
        };
        ;
        if(PL$18/*par*/["promising"]){
          if(PL$26/*parGivenPromiseNameStr*/){
            this["returnPromise"] = PL$26/*parGivenPromiseNameStr*/;
          }else{
          this["returnPromise"] = this["getUniqueName"]();
          PL$51/*funRes*/["push"](this["declareReturnPromiseCode"]({
            "type": this["_returnType"],
            "name": this["returnPromise"],
            "constructorName": this["getConstructorName"](this["getTypeName"](this["_returnType"], PL$33/*parParsed*/)),
            "parsed": PL$33/*parParsed*/,
            "errorFun": this["getWarningFun"](PL$33/*parParsed*/)
          }));
          };
          ;
          this["tryCatchFunctionStr"] = this["getUniqueName"]("promiseland exception catcher");
          PL$51/*funRes*/["push"]([
            (("var " + this["tryCatchFunctionStr"]) + " = function(code){"), 
            this["indent"]([
              this["newLine"](), 
              "return function(res){", 
              this["indentNewLine"]([
                "try{ code(res); }catch(e){", 
                this["indentNewLine"]([
                  this["runBeforeReturnRes"], 
                  (this["returnPromise"] + ".reject(e);")
                ]), 
                "};"
              ]), 
              "};"
            ]), 
            this["newLine"](), 
            "};"
          ]);
          PL$51/*funRes*/["push"](this["newLine"]());
          this["catchFunctionStr"] = this["getUniqueName"]("catch rejected");
          PL$51/*funRes*/["push"]([
            (("var " + this["catchFunctionStr"]) + " = function(e){"), 
            this["indentNewLine"]([
              this["runBeforeReturnRes"], 
              (this["returnPromise"] + ".reject(e);")
            ]), 
            "};", 
            this["newLine"]()
          ]);
          this["promising"] = true;
          PL$21/*res*/["makePromising"]();
        };
        ;
        var PL$57/*b*/ = PL$18/*par*/["body"];
        ;
        var PL$58/*extraPar*/ = {
          
        };
        ;
        PL$57/*b*/["brackets"] = false;
        PL$58/*extraPar*/["preCode"] = this["additionalCodeFrontRes"];
        PL$58/*extraPar*/["postCode"] = this["newResult"]();
        PL$58/*extraPar*/["postCode"]["push"](this["getReturnCode"]({
          
        }, PL$33/*parParsed*/));
        PL$58/*extraPar*/["postCode"]["push"](this["additionalCodeEndRes"]);
        var PL$59/*block*/ = this["blockCreator"](PL$57/*b*/, PL$58/*extraPar*/);
        ;
        var PL$60/*localVariablesAr*/ = this["localVariables"]["getArray"]();
        ;
        for(PL$31/*i*/ = 0;(PL$31/*i*/ < PL$60/*localVariablesAr*/["length"]);++PL$31/*i*/){{
          var PL$61/*varname*/ = PL$60/*localVariablesAr*/[PL$31/*i*/]["key"];
          ;
          var PL$24/*type*/ = this["getVariableType"](PL$61/*varname*/);
          ;
          if(PL$60/*localVariablesAr*/[PL$31/*i*/]["value"]["localFunction"]){
          }else{
          if(PL$60/*localVariablesAr*/[PL$31/*i*/]["value"]["parameter"]){
            PL$51/*funRes*/["push"](this["getProcessParameterCode"]({
              "name": this["getVariableName"](PL$61/*varname*/),
              "type": PL$24/*type*/,
              "errorFun": this["getWarningFun"](PL$18/*par*/),
              "parsed": PL$18/*par*/
            }));
          }else{
          if(PL$60/*localVariablesAr*/[PL$31/*i*/]["value"]["declaration"]){
            PL$51/*funRes*/["push"](this["getDeclareVariableCode"]({
              "name": this["getVariableName"](PL$61/*varname*/),
              "type": PL$24/*type*/,
              "errorFun": this["getWarningFun"](PL$18/*par*/),
              "parsed": PL$18/*par*/,
              "declaration": PL$60/*localVariablesAr*/[PL$31/*i*/]["value"]["needsDeclaration"]
            }));
          }else{
          if(PL$60/*localVariablesAr*/[PL$31/*i*/]["value"]["isFunction"]){
          }else{
          debugger;
          };
          };
          };
          };
          if(! PL$27/*noUntrack*/){
            this["addBeforeReturn"](this["getDestroyVariableCode"]({
              "name": this["getVariableName"](PL$61/*varname*/),
              "type": PL$24/*type*/,
              "errorFun": this["getWarningFun"](PL$18/*par*/),
              "parsed": PL$18/*par*/
            }), this["isTrackedClassConRes"](PL$24/*type*/, PL$18/*par*/), PL$33/*parParsed*/);
          };
          ;
          this["usedVariablesMap"]["set"](PL$61/*varname*/, false);}};
        ;
        if(this["usedVariablesMap"]["get"]("arguments")){
          PL$51/*funRes*/["push"]((("var " + this["getVariableName"]("arguments")) + " = arguments;"));
          PL$51/*funRes*/["push"](this["newLine"]());
          this["usedVariablesMap"]["set"]("arguments", false);
        };
        ;
        PL$51/*funRes*/["push"](PL$55/*classesRes*/);
        for(PL$31/*i*/ = 0;(PL$31/*i*/ < this["functionsAr"]["length"]);++PL$31/*i*/){{
          PL$51/*funRes*/["push"](this["functionsAr"][PL$31/*i*/]["res"]);
          PL$51/*funRes*/["push"](";");
          PL$51/*funRes*/["push"](this["newLine"]());}};
        ;
        if(PL$18/*par*/["promising"]){
          if(this["usingThis"]){
            PL$51/*funRes*/["push"]((("var " + this["thisExpression"]) + " = this;"));
            PL$51/*funRes*/["push"](this["newLine"]());
          };
          ;
          PL$51/*funRes*/["push"]((this["tryCatchFunctionStr"] + "(function(){"));
          PL$51/*funRes*/["push"](this["newLine"]());
        };
        ;
        PL$51/*funRes*/["push"](this["indent"](PL$59/*block*/));
        PL$50/*funDecl*/["push"](PL$51/*funRes*/);
        if(PL$18/*par*/["promising"]){
          PL$50/*funDecl*/["addPost"]("})();");
          PL$50/*funDecl*/["push"](this["newLine"]());
          PL$50/*funDecl*/["addPost"](this["returnReturnPromiseCode"]({
            "type": this["_returnType"],
            "name": this["returnPromise"],
            "parsed": PL$33/*parParsed*/,
            "errorFun": this["getWarningFun"](PL$33/*parParsed*/)
          }));
          PL$50/*funDecl*/["addPost"]("}");
        }else{
        PL$50/*funDecl*/["push"]("}");
        };
        ;
        var PL$62/*completeFun*/ = this["makeCompleteStatement"](PL$50/*funDecl*/);
        ;
        var PL$63/*funNameScrewUp*/ = false;
        ;
        if((this["promising"] && PL$39/*hasReturnTypeName*/)){
          var PL$64/*returnTypePromiseCheck*/ = this["newResult"]();
          ;
          PL$64/*returnTypePromiseCheck*/["push"]("(function(t){");
          PL$64/*returnTypePromiseCheck*/["push"](this["promisingReturnTypeCheck"]({
            "type": this["_returnType"],
            "errorFun": this["getWarningFun"](PL$33/*parParsed*/),
            "parsed": PL$33/*parParsed*/
          }));
          PL$64/*returnTypePromiseCheck*/["push"]("return t;})(");
          PL$64/*returnTypePromiseCheck*/["push"](PL$62/*completeFun*/);
          PL$64/*returnTypePromiseCheck*/["push"](")");
          PL$62/*completeFun*/ = PL$64/*returnTypePromiseCheck*/;
          PL$63/*funNameScrewUp*/ = true;
        };
        ;
        if(PL$34/*funClosure*/){
          var PL$65/*handleExtras*/ = (function(PL$66/*dt*/){
          
            ;
            if(PL$66/*dt*/["extraTypes"]){
              var PL$31/*i*/ = 0;
              ;
              for(PL$31/*i*/ = 0;(PL$31/*i*/ < PL$66/*dt*/["extraTypes"]["length"]);++PL$31/*i*/){{
                PL$49/*extraTypesRes*/["push"](PL$66/*dt*/["extraTypes"][PL$31/*i*/]["res"]);
                PL$65/*handleExtras*/(PL$66/*dt*/["extraTypes"][PL$31/*i*/]["type"]);}};
              ;
            };
            ;
            ;});
          ;
          for(PL$31/*i*/ = 0;(PL$31/*i*/ < PL$45/*templateTypesAr*/["length"]);++PL$31/*i*/){{
            var PL$66/*dt*/ = this["getType"](PL$45/*templateTypesAr*/[PL$31/*i*/], PL$18/*par*/);
            ;
            PL$65/*handleExtras*/(PL$66/*dt*/);}};
          ;
          PL$34/*funClosure*/["push"](PL$62/*completeFun*/, PL$18/*par*/, {
            "stringEncode": true
          });
          PL$34/*funClosure*/["push"](";\"); return communicator.fun; })()");
          PL$62/*completeFun*/ = this["makeCompleteStatement"](PL$34/*funClosure*/);
          PL$63/*funNameScrewUp*/ = true;
        };
        ;
        var PL$67/*uniqueNameStr*/;
        ;
        if(PL$29/*runRemote*/){
          var PL$68/*remoteClosure*/ = this["newResult"]();
          ;
          PL$67/*uniqueNameStr*/ = this["getUniqueName"]();
          PL$68/*remoteClosure*/["push"]("(function(f){");
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"](("promiseland.registerRemote(" + PL$10/*stringEncodeStr*/(PL$43/*frameName*/["value"])));
          PL$68/*remoteClosure*/["push"](((((", " + PL$10/*stringEncodeStr*/(this["getModuleHashStr"]())) + ", ") + PL$10/*stringEncodeStr*/(PL$67/*uniqueNameStr*/)) + ", f, "));
          PL$68/*remoteClosure*/["push"](this["renderType"](PL$40/*thisFunType*/, PL$33/*parParsed*/));
          PL$68/*remoteClosure*/["push"](");");
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]((("if (promiseland.profileHas(" + PL$10/*stringEncodeStr*/(PL$43/*frameName*/["value"])) + ")){"));
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]("return ");
          PL$68/*remoteClosure*/["push"]("function(){");
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]("var i = 0; var l = arguments.length; var newArgs = [undefined];");
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]("for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };");
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]("return f.apply(this, newArgs);");
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]("};");
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]("}else{");
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]("return function(){");
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]((((("return promiseland.remoteExec(" + PL$10/*stringEncodeStr*/(this["getModuleHashStr"]())) + ", ") + PL$10/*stringEncodeStr*/(PL$67/*uniqueNameStr*/)) + ", arguments);"));
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]("}");
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]("};");
          PL$68/*remoteClosure*/["push"](this["newLine"]());
          PL$68/*remoteClosure*/["push"]("})(");
          PL$68/*remoteClosure*/["push"](PL$62/*completeFun*/);
          PL$68/*remoteClosure*/["push"](")");
          PL$21/*res*/["push"](PL$68/*remoteClosure*/);
          PL$63/*funNameScrewUp*/ = true;
        }else{
        PL$21/*res*/["push"](PL$62/*completeFun*/);
        };
        ;
        PL$21/*res*/["setType"](PL$40/*thisFunType*/);
        this["unstack"]("isClassObject");
        this["unstack"]("inheritedAvailable");
        this["unstack"]("thisType");
        var PL$69/*finalResult*/ = this["newResult"]();
        ;
        if(((PL$63/*funNameScrewUp*/ && PL$37/*hasName*/) && PL$36/*functionInfo*/["declaration"])){
          PL$69/*finalResult*/["push"]("var ");
          PL$69/*finalResult*/["push"](this["getVariableName"](PL$38/*nameStr*/));
          PL$69/*finalResult*/["push"](" = ");
          PL$52/*nameRes*/["replace"]("");
        };
        ;
        PL$69/*finalResult*/["push"](this["makeCompleteStatement"](PL$21/*res*/));
        PL$69/*finalResult*/["setType"](PL$40/*thisFunType*/);
        return PL$69/*finalResult*/;
        ;});
      this["expFunctionExpression"] = (function(PL$70/*value*/, PL$71/*declaration*/){
      
        ;
        if(! PL$71/*declaration*/){
          PL$70/*value*/["useLocalVariableName"] = true;
        };
        ;
        var PL$72/*cp*/ = this["newInstance"](PL$70/*value*/, {
          "dynamicCode": (this["dynamicCode"] || this["isFunction"]),
          "asmMode": this["asmMode"]
        });
        ;
        var PL$73/*funName*/ = PL$72/*cp*/["getFunctionName"]();
        ;
        var PL$51/*funRes*/ = PL$72/*cp*/["getFunctionRes"]();
        ;
        var PL$74/*uv*/ = PL$72/*cp*/["_getUsedVairablesMap"]();
        ;
        var PL$75/*name*/;
        ;
        PL$74/*uv*/["forEach"]((function(PL$70/*value*/, PL$75/*name*/){
        
          ;
          if((PL$70/*value*/ === true)){
            this["_addUsedVariable"](PL$75/*name*/);
          };
          ;
          ;}), this);
        var PL$21/*res*/;
        ;
        if(((PL$73/*funName*/ && PL$51/*funRes*/) && PL$71/*declaration*/)){
          if(this["asmMode"]){
            PL$70/*value*/["hoist"] = false;
            this["addFunction"](PL$51/*funRes*/, PL$73/*funName*/, PL$70/*value*/);
          }else{
          PL$70/*value*/["hoist"] = true;
          this["addFunction"](PL$51/*funRes*/, PL$73/*funName*/, PL$70/*value*/);
          if(PL$71/*declaration*/){
            PL$21/*res*/ = this["newResult"]((("/* function " + PL$73/*funName*/) + " (){} - hoisted */"));
            PL$21/*res*/["setType"](PL$16/*statementType*/);
          }else{
          PL$21/*res*/ = this["newResult"](this["getVariableName"](PL$73/*funName*/));
          PL$21/*res*/["setType"](PL$51/*funRes*/["getType"]());
          };
          ;
          return PL$21/*res*/;
          };
          ;
        };
        ;
        PL$21/*res*/ = this["newResult"]();
        if(! PL$71/*declaration*/){
          PL$21/*res*/["push"]("(");
        };
        ;
        PL$21/*res*/["pushType"]((PL$51/*funRes*/ || PL$72/*cp*/["getResult"]()));
        if(! PL$71/*declaration*/){
          PL$21/*res*/["push"](")");
        };
        ;
        return PL$21/*res*/;
        ;});
      this["expFunctionDeclaration"] = (function(PL$70/*value*/){
      
        ;
        return this["expFunctionExpression"](PL$70/*value*/, true);
        ;});
      this["expMemberFunction"] = (function(PL$70/*value*/){
      
        ;
        return this["expFunctionExpression"](PL$70/*value*/);
        ;});
      this["functionsAr"] = [
        
      ];
      this["addFunction"] = (function(PL$21/*res*/, PL$75/*name*/, PL$20/*parsed*/){
      
        ;
        this["resolveFunctionType"]({
          "name": PL$13/*identifierName*/(PL$75/*name*/),
          "type": PL$21/*res*/["getType"]()
        }, PL$20/*parsed*/);
        if(PL$20/*parsed*/["hoist"]){
          this["functionsAr"]["push"]({
            "res": PL$21/*res*/,
            "name": PL$75/*name*/
          });
        };
        ;
        ;});
      this["getReturnCode"] = (function(PL$18/*par*/, PL$33/*parParsed*/){
      
        ;
        var PL$35/*self*/ = this;
        ;
        var PL$21/*res*/ = this["newResult"]();
        ;
        if(this["promising"]){
          PL$21/*res*/["push"]((this["returnPromise"] + ".resolve("));
          if(PL$18/*par*/["value"]){
            PL$21/*res*/["push"](PL$18/*par*/["value"]);
          };
          ;
          PL$21/*res*/["push"]("); return");
        }else{
        if((PL$18/*par*/["return"] || PL$18/*par*/["value"])){
          PL$21/*res*/["push"]("return");
        };
        ;
        if(PL$18/*par*/["value"]){
          PL$21/*res*/["push"](" ");
          PL$21/*res*/["push"](PL$18/*par*/["value"]);
        };
        ;
        if((PL$18/*par*/["return"] || PL$18/*par*/["value"])){
        };
        ;
        };
        ;
        var PL$76/*falseRes*/ = PL$21/*res*/;
        ;
        var PL$77/*beforeReturnCode*/ = this["runBeforeReturnRes"];
        ;
        var PL$78/*newRes*/ = PL$35/*self*/["newResult"]();
        ;
        var PL$79/*valueRes*/ = PL$35/*self*/["newResult"]();
        ;
        if(PL$18/*par*/["value"]){
          PL$79/*valueRes*/["push"]("(function(ret){ ");
          PL$79/*valueRes*/["push"](PL$77/*beforeReturnCode*/);
          PL$79/*valueRes*/["push"]("return ret; })(");
          PL$79/*valueRes*/["push"](PL$18/*par*/["value"]);
          PL$79/*valueRes*/["push"](")");
        };
        ;
        if(PL$35/*self*/["promising"]){
          if(PL$18/*par*/["value"]){
            PL$78/*newRes*/["push"]((PL$35/*self*/["returnPromise"] + ".resolve("));
            PL$78/*newRes*/["push"](PL$79/*valueRes*/);
            PL$78/*newRes*/["push"]("); return;");
          }else{
          PL$78/*newRes*/["push"](PL$77/*beforeReturnCode*/);
          PL$78/*newRes*/["push"]((PL$35/*self*/["returnPromise"] + ".resolve("));
          PL$78/*newRes*/["push"]("); return;");
          };
          ;
        }else{
        if(PL$18/*par*/["value"]){
          PL$78/*newRes*/["push"]("return ");
          PL$78/*newRes*/["push"](PL$79/*valueRes*/);
          PL$78/*newRes*/["push"](";");
        }else{
        PL$78/*newRes*/["push"](PL$77/*beforeReturnCode*/);
        if(PL$18/*par*/["return"]){
          PL$78/*newRes*/["push"]("return;");
        };
        ;
        };
        ;
        };
        ;
        var PL$80/*trueRes*/ = PL$78/*newRes*/;
        ;
        var PL$81/*conditional*/ = this["createConditionalCode"](PL$80/*trueRes*/, PL$76/*falseRes*/, PL$33/*parParsed*/);
        ;
        this["addBeforeReturnConditionFun"]((function(PL$82/*con*/){
        
          ;
          PL$81/*conditional*/["addCondition"](PL$82/*con*/);
          ;}));
        return PL$81/*conditional*/["res"];
        ;});
      this["addBeforeReturn"] = (function(PL$83/*parRes*/, PL$84/*parCondition*/, PL$33/*parParsed*/){
      
        ;
        var PL$85/*condition*/ = PL$84/*parCondition*/;
        ;
        if((PL$84/*parCondition*/ === undefined)){
          PL$85/*condition*/ = true;
        };
        ;
        var PL$81/*conditional*/ = this["createConditionalCode"](PL$83/*parRes*/, undefined, PL$33/*parParsed*/);
        ;
        PL$81/*conditional*/["addCondition"](PL$85/*condition*/);
        this["runBeforeReturnRes"]["push"](PL$81/*conditional*/["res"]);
        if(! this["beforeReturnExists"]){
          this["beforeReturnExists"] = true;
          var PL$86/*frontRes*/ = this["newResult"]();
          ;
          var PL$87/*endRes*/ = this["newResult"]();
          ;
          this["beforeReturnFrontConditional"] = this["createConditionalCode"](PL$86/*frontRes*/, undefined, PL$33/*parParsed*/);
          this["beforeReturnEndConditional"] = this["createConditionalCode"](PL$87/*endRes*/, undefined, PL$33/*parParsed*/);
          this["beforeReturnExistsPs"]["resolve"](this["runBeforeReturnRes"]);
          if(! this["promising"]){
            PL$86/*frontRes*/["push"]("try{");
            this["additionalCodeFrontRes"]["push"](this["beforeReturnFrontConditional"]["res"]);
            PL$87/*endRes*/["push"]("}catch(e){");
            PL$87/*endRes*/["push"](this["runBeforeReturnRes"]);
            PL$87/*endRes*/["push"]("throw e};");
            this["additionalCodeEndRes"]["push"](this["beforeReturnEndConditional"]["res"]);
          };
          ;
        };
        ;
        this["beforeReturnFrontConditional"]["addCondition"](PL$85/*condition*/);
        this["beforeReturnEndConditional"]["addCondition"](PL$85/*condition*/);
        this["addBeforeReturnCondition"](PL$85/*condition*/);
        ;});
      this["beforeReturnConditions"] = [
        
      ];
      this["addBeforeReturnCondition"] = (function(PL$84/*parCondition*/){
      
        ;
        this["beforeReturnConditions"]["push"](PL$84/*parCondition*/);
        var PL$31/*i*/ = 0;
        ;
        for(PL$31/*i*/ = 0;(PL$31/*i*/ < this["beforeReturnConditionFuns"]["length"]);++PL$31/*i*/){{
          this["beforeReturnConditionFuns"][PL$31/*i*/](PL$84/*parCondition*/);}};
        ;
        ;});
      this["beforeReturnConditionFuns"] = [
        
      ];
      this["addBeforeReturnConditionFun"] = (function(PL$88/*parFun*/){
      
        ;
        this["beforeReturnConditionFuns"]["push"](PL$88/*parFun*/);
        var PL$31/*i*/ = 0;
        ;
        for(PL$31/*i*/ = 0;(PL$31/*i*/ < this["beforeReturnConditions"]["length"]);++PL$31/*i*/){{
          PL$88/*parFun*/(this["beforeReturnConditions"][PL$31/*i*/]);}};
        ;
        ;});
      this["createConditionalCode"] = (function(PL$89/*parTrueRes*/, PL$90/*parFalseRes*/, PL$33/*parParsed*/){
      
        ;
        var PL$35/*self*/ = this;
        ;
        PL$89/*parTrueRes*/ = (PL$89/*parTrueRes*/ || this["newResult"]());
        PL$90/*parFalseRes*/ = (PL$90/*parFalseRes*/ || this["newResult"]());
        var PL$91/*isDecided*/ = false;
        ;
        var PL$92/*conditions*/ = [
          
        ];
        ;
        var PL$21/*res*/ = this["newResult"]();
        ;
        PL$21/*res*/["replace"](PL$90/*parFalseRes*/);
        var PL$93/*promisesWaiting*/ = 0;
        ;
        var PL$94/*errRes*/;
        ;
        var PL$95/*addCondition*/ = (function(PL$84/*parCondition*/){
        
          ;
          if(PL$91/*isDecided*/){
            return;
          };
          ;
          if((PL$84/*parCondition*/ === true)){
            PL$91/*isDecided*/ = true;
            PL$21/*res*/["replace"](PL$89/*parTrueRes*/);
            return;
          };
          ;
          if((PL$84/*parCondition*/ === false)){
            return;
          };
          ;
          if(PL$84/*parCondition*/["then"]){
            if(! PL$94/*errRes*/){
              PL$94/*errRes*/ = PL$35/*self*/["runtimeError"](PL$33/*parParsed*/, PL$8/*errorMsg*/["unresolvedPromise"]);
            };
            ;
            PL$93/*promisesWaiting*/++;
            PL$21/*res*/["replace"](PL$94/*errRes*/);
            (function(){
            var PL$96 = new __Promise();
            var PL$98/*promiseland exception catcher*/ = function(code){
              return function(res){
                try{ code(res); }catch(e){
                  PL$96.reject(e);
                };
              };
            };
            var PL$99/*catch rejected*/ = function(e){
              PL$96.reject(e);
            };
            var PL$85/*condition*/;
            PL$98/*promiseland exception catcher*/(function(){
            
              ;
              PL$84/*parCondition*/.then(PL$98/*promiseland exception catcher*/(function(PL$100){PL$85/*condition*/ = PL$100;
              PL$93/*promisesWaiting*/--;
              if(! PL$93/*promisesWaiting*/){
                if(PL$94/*errRes*/){
                  PL$94/*errRes*/["resolve"]("");
                  PL$94/*errRes*/ = undefined;
                };
                ;
                if(! PL$91/*isDecided*/){
                  PL$21/*res*/["replace"](PL$90/*parFalseRes*/);
                };
                ;
              };
              ;
              PL$95/*addCondition*/(PL$85/*condition*/);
              PL$96.resolve(); return;}), PL$99/*catch rejected*/);
              ;
            })();return PL$96;
            })();
            return;
          };
          ;
          PL$92/*conditions*/["push"](PL$84/*parCondition*/);
          var PL$101/*ifRes*/ = PL$35/*self*/["newResult"]();
          ;
          PL$101/*ifRes*/["push"]("((");
          var PL$31/*i*/ = 0;
          ;
          for(PL$31/*i*/ = 0;(PL$31/*i*/ < PL$92/*conditions*/["length"]);++PL$31/*i*/){{
            if(PL$31/*i*/){
              PL$101/*ifRes*/["push"](" && ");
            };
            ;
            PL$101/*ifRes*/["push"](PL$92/*conditions*/[PL$31/*i*/]);}};
          ;
          PL$101/*ifRes*/["push"](") ? (");
          PL$101/*ifRes*/["push"](PL$35/*self*/["makeCompleteStatementDynamic"](PL$89/*parTrueRes*/));
          PL$101/*ifRes*/["push"](") : (");
          PL$101/*ifRes*/["push"](PL$35/*self*/["makeCompleteStatementDynamic"](PL$90/*parFalseRes*/));
          PL$101/*ifRes*/["push"]("))");
          var PL$102/*dynRes*/ = PL$35/*self*/["newResult"]();
          ;
          PL$102/*dynRes*/["push"](PL$35/*self*/["makeCompleteStatement"](PL$101/*ifRes*/), undefined, {
            "dynamic": true
          });
          PL$21/*res*/["replace"](PL$102/*dynRes*/);
          ;});
        ;
        return {
          "res": PL$21/*res*/,
          "addCondition": PL$95/*addCondition*/
        };
        ;});
      ;});
    ;
    PL$19/*f*/["apply"](PL$17/*parInstance*/, [
      PL$18/*par*/
    ]);
    ;})); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();