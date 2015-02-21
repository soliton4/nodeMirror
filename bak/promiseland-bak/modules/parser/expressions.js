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
    if (promiseland._hasModule({ hashStr: "2ced2f8c7d6434d0cddcc03a987d8c21" })){ return promiseland._getModule("2ced2f8c7d6434d0cddcc03a987d8c21"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "2ced2f8c7d6434d0cddcc03a987d8c21", "module": PL$1, promising: true });
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
      PL$21/*blocksModule*/(this, PL$32/*par*/);
      PL$23/*loopsModule*/(this, PL$32/*par*/);
      PL$25/*conditionalsModule*/(this, PL$32/*par*/);
      PL$27/*literalsModule*/(this, PL$32/*par*/);
      PL$29/*classModule*/(this, PL$32/*par*/);
      this["parseExpression"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["_parseExpression"](PL$32/*par*/);
        ;
        if(! PL$34/*res*/["getType"]()){
          this["error"](PL$32/*par*/, PL$11/*errorMsg*/["internalMissingResultType"]);
        };
        ;
        PL$34/*res*/["setParsed"](PL$32/*par*/);
        return PL$34/*res*/;
        ;});
      this["_parseExpression"] = (function(PL$35/*value*/){
      
        ;
        var PL$34/*res*/;
        ;
        switch (PL$35/*value*/["type"]){
          case "ArrayExpression":
            
            return this["expArrayExpression"](PL$35/*value*/);
          case "AssignmentExpression":
            
            return this["expAssignmentExpression"](PL$35/*value*/);
          case "BinaryExpression":
            
            return this["expBinaryExpression"](PL$35/*value*/);
          case "BlockStatement":
            
            return this["expBlockStatement"](PL$35/*value*/);
          case "BreakStatement":
            
            return this["expBreakStatement"](PL$35/*value*/);
          case "CallExpression":
            
            return this["expCallExpression"](PL$35/*value*/);
          case "Class":
            
            return this["expClassStatement"](PL$35/*value*/);
          case "ClassObjectExpression":
            
            return this["expClassObjectExpression"](PL$35/*value*/);
          case "ConditionalExpression":
            
            return this["conditionalExpression"](PL$35/*value*/);
          case "ConnectExpression":
            
            return this["connectExpression"](PL$35/*value*/);
          case "ContinueStatement":
            
            return this["expContinueStatement"](PL$35/*value*/);
          case "DebuggerStatement":
            
            return this["expDebuggerStatement"](PL$35/*value*/);
          case "DoWhileStatement":
            
            return this["expDoWhileStatement"](PL$35/*value*/);
          case "EmptyStatement":
            
            PL$34/*res*/ = this["newResult"]();
            PL$34/*res*/["setType"]("var");
            return PL$34/*res*/;
          case "ExpressionStatement":
            
            return this["expExpressionStatement"](PL$35/*value*/);
          case "ForInStatement":
            
            return this["expForInStatement"](PL$35/*value*/);
          case "ForStatement":
            
            return this["expForStatement"](PL$35/*value*/);
          case "FunctionExpression":
            
            return this["expFunctionExpression"](PL$35/*value*/);
          case "FunctionDeclaration":
            
            return this["expFunctionDeclaration"](PL$35/*value*/);
          case "MemberFunction":
            
            return this["expMemberFunction"](PL$35/*value*/);
          case "Identifier":
            
            return this["expIdentifier"](PL$35/*value*/);
          case "IfStatement":
            
            return this["expIfStatement"](PL$35/*value*/);
          case "InheritedExpression":
            
            return this["expInheritedExpression"](PL$35/*value*/);
          case "Literal":
            
            return this["expLiteral"](PL$35/*value*/);
          case "MemberExpression":
            
            return this["expMemberExpression"](PL$35/*value*/);
          case "NewExpression":
            
            return this["expNewExpression"](PL$35/*value*/);
          case "ObjectExpression":
            
            return this["expObjectExpression"](PL$35/*value*/);
          case "ReturnStatement":
            
            return this["expReturnStatement"](PL$35/*value*/);
          case "SequenceExpression":
            
            return this["expSequenceExpression"](PL$35/*value*/);
          case "SwitchStatement":
            
            return this["expSwitchStatement"](PL$35/*value*/);
          case "ThisExpression":
            
            return this["expThisExpression"](PL$35/*value*/);
          case "ThrowStatement":
            
            return this["expThrowStatement"](PL$35/*value*/);
          case "TryStatement":
            
            return this["expTryStatement"](PL$35/*value*/);
          case "UnaryExpression":
            
            if((PL$35/*value*/["operator"] == "*")){
              return this["expPromiseExpression"](PL$35/*value*/["argument"]);
            };
            ;
            if((PL$35/*value*/["operator"] == "require")){
              return this["expRequireExpression"](PL$35/*value*/["argument"]);
            };
            ;
            return this["expUnaryExpression"](PL$35/*value*/);
          case "UpdateExpression":
            
            return this["expUpdateExpression"](PL$35/*value*/);
          case "VariableStatement":
            
            return this["expVariableStatement"](PL$35/*value*/);
          case "VariableDeclaration":
            
            return this["expVariableDeclaration"](PL$35/*value*/);
          case "WhileStatement":
            
            return this["whileStatement"](PL$35/*value*/);
          default:
            
            debugger;
            this["error"](PL$35/*value*/, PL$11/*errorMsg*/["unknownType"]);
          
        };
        ;
        return "/*this should not happen*/";
        ;});
      this["expExpressionStatement"] = (function(PL$36/*parParsed*/){
      
        ;
        var PL$34/*res*/ = this["getDestroyTemporaryClassCode"]({
          "value": this["parseExpression"](PL$36/*parParsed*/["expression"])
        });
        ;
        return PL$34/*res*/;
        ;});
      this["expThisExpression"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        if(! this["promising"]){
          PL$34/*res*/["push"]("this");
        }else{
        if(! this["usingThis"]){
          this["usingThis"] = true;
          this["thisExpression"] = this["getUniqueName"]("this");
        };
        ;
        PL$34/*res*/["push"](this["thisExpression"]);
        };
        ;
        PL$34/*res*/["setType"](this["thisType"]);
        return PL$34/*res*/;
        ;});
      this["expSequenceExpression"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        if((PL$32/*par*/["expressions"] && PL$32/*par*/["expressions"]["length"])){
          var PL$37/*i*/ = 0;
          ;
          for(PL$37/*i*/ = 0;(PL$37/*i*/ < PL$32/*par*/["expressions"]["length"]);++PL$37/*i*/){{
            if((PL$37/*i*/ > 0)){
              PL$34/*res*/["push"](",");
            };
            ;
            PL$34/*res*/["push"](this["expectTypeVar"](this["parseExpression"](PL$32/*par*/["expressions"][PL$37/*i*/])));}};
          ;
        };
        ;
        PL$34/*res*/["setType"]("var");
        return PL$34/*res*/;
        ;});
      this["expThrowStatement"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        PL$34/*res*/["push"]("throw ");
        PL$34/*res*/["push"](this["expectTypeVar"](this["parseExpression"](PL$32/*par*/["argument"])));
        PL$34/*res*/["setType"](PL$19/*statementType*/);
        return PL$34/*res*/;
        ;});
      this["expTryStatement"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        var PL$38/*catchPromise*/;
        ;
        var PL$39/*continuePromise*/;
        ;
        if(PL$20/*checkPromising*/(PL$32/*par*/)){
          this["stack"]("tryCatchFunctionStr");
          this["stack"]("catchFunctionStr");
          PL$39/*continuePromise*/ = this["getUniqueName"]();
          PL$34/*res*/["addPre"]((((("var " + PL$39/*continuePromise*/) + " = ") + this["newPromiseStr"]()) + ";"));
          PL$34/*res*/["addPre"](this["newLine"]());
          PL$38/*catchPromise*/ = this["getUniqueName"]();
          PL$34/*res*/["addPre"]((((("var " + PL$38/*catchPromise*/) + " = ") + this["newPromiseStr"]()) + ";"));
          PL$34/*res*/["addPre"](this["newLine"]());
          this["tryCatchFunctionStr"] = (this["getUniqueName"]() + "/*try catch*/");
          PL$34/*res*/["addPre"]((((("var " + this["tryCatchFunctionStr"]) + " = function(code){ return function(res){ try{code(res);}catch(e){ ") + PL$38/*catchPromise*/) + ".resolve(e); }; }; };"));
          PL$34/*res*/["addPre"](this["newLine"]());
          this["catchFunctionStr"] = this["getUniqueName"]();
          PL$34/*res*/["addPre"]((((("var " + this["catchFunctionStr"]) + " = function(e){ ") + PL$38/*catchPromise*/) + ".resolve(e); };"));
          PL$34/*res*/["addPre"](this["newLine"]());
          PL$34/*res*/["push"]((this["tryCatchFunctionStr"] + "(function()"));
        }else{
        PL$34/*res*/["push"]("try");
        PL$34/*res*/["push"](this["newLine"]());
        };
        ;
        var PL$40/*b*/ = PL$32/*par*/["block"];
        ;
        var PL$41/*extraPar*/ = {
          
        };
        ;
        PL$40/*b*/["brackets"] = true;
        if(PL$20/*checkPromising*/(PL$32/*par*/)){
          PL$41/*extraPar*/["postCode"] = this["newResult"]((PL$39/*continuePromise*/ + ".resolve()"));
        };
        ;
        PL$34/*res*/["push"](this["makeCompleteStatement"](this["blockCreator"](PL$40/*b*/, PL$41/*extraPar*/)));
        if(PL$20/*checkPromising*/(PL$32/*par*/)){
          this["unstack"]("tryCatchFunctionStr");
          this["unstack"]("catchFunctionStr");
          PL$34/*res*/["push"](")();");
          PL$34/*res*/["push"](this["newLine"]());
          PL$34/*res*/["push"]((((PL$38/*catchPromise*/ + ".then(") + this["tryCatchFunctionStr"]) + "(function("));
        }else{
        PL$34/*res*/["push"]("catch(");
        };
        ;
        var PL$42/*temporaryPs*/;
        ;
        if((PL$32/*par*/["handler"] && PL$32/*par*/["handler"]["param"])){
          PL$34/*res*/["push"](this["getVariableName"](PL$16/*identifierName*/(PL$32/*par*/["handler"]["param"])));
          PL$42/*temporaryPs*/ = this["addLocalVariableTemporary"]({
            "name": PL$16/*identifierName*/(PL$32/*par*/["handler"]["param"]),
            "typename": "var",
            "parameter": true
          }, PL$32/*par*/["handler"]);
        }else{
        PL$34/*res*/["push"]("__dummy");
        };
        ;
        PL$34/*res*/["push"](")");
        if(PL$32/*par*/["handler"]){
          PL$40/*b*/ = PL$32/*par*/["handler"]["body"];
          PL$41/*extraPar*/ = {
            
          };
          PL$40/*b*/["brackets"] = true;
          if(PL$20/*checkPromising*/(PL$32/*par*/)){
            PL$41/*extraPar*/["postCode"] = this["newResult"]((PL$39/*continuePromise*/ + ".resolve();"));
          };
          ;
          PL$34/*res*/["push"](this["makeCompleteStatement"](this["blockCreator"](PL$40/*b*/, PL$41/*extraPar*/)));
        }else{
        PL$34/*res*/["push"]("{");
        if(PL$20/*checkPromising*/(PL$32/*par*/)){
          PL$34/*res*/["push"]((PL$39/*continuePromise*/ + ".resolve();"));
        };
        ;
        PL$34/*res*/["push"]("}");
        };
        ;
        if(PL$20/*checkPromising*/(PL$32/*par*/)){
          PL$34/*res*/["push"]("));");
          PL$34/*res*/["push"](this["newLine"]());
          PL$34/*res*/["push"](PL$39/*continuePromise*/);
          PL$34/*res*/["push"](((".then(" + this["tryCatchFunctionStr"]) + "(function(){"));
          PL$34/*res*/["addPost"]((("}), " + this["catchFunctionStr"]) + ")"));
        };
        ;
        if(PL$32/*par*/["finally"]){
          PL$34/*res*/["push"]("finally");
          PL$40/*b*/ = PL$32/*par*/["finally"];
          PL$40/*b*/["brackers"] = true;
          PL$34/*res*/["push"](this["makeCompleteStatement"](this["blockCreator"](PL$40/*b*/)));
        };
        ;
        if(PL$42/*temporaryPs*/){
          PL$42/*temporaryPs*/["resolve"]();
        };
        ;
        PL$34/*res*/["setType"](PL$19/*statementType*/);
        return PL$34/*res*/;
        ;});
      this["expDebuggerStatement"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        PL$34/*res*/["push"]("debugger");
        PL$34/*res*/["setType"](PL$19/*statementType*/);
        return PL$34/*res*/;
        ;});
      this["expUpdateExpression"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        if(PL$32/*par*/["prefix"]){
          PL$34/*res*/["push"](PL$32/*par*/["operator"]);
        };
        ;
        PL$34/*res*/["pushType"](this["expectTypeVar"](this["parseExpression"](PL$32/*par*/["argument"])));
        if(! PL$32/*par*/["prefix"]){
          PL$34/*res*/["push"](PL$32/*par*/["operator"]);
        };
        ;
        return PL$34/*res*/;
        ;});
      this["expIdentifier"] = (function(PL$32/*par*/){
      
        ;
        return this["getVariable"](PL$16/*identifierName*/(PL$32/*par*/["name"]));
        ;});
      this["expLiteral"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        if(! PL$32/*par*/["originalText"]){
          this["error"](PL$32/*par*/, PL$11/*errorMsg*/["internalOriginalTextMissing"]);
        };
        ;
        switch (typeof PL$32/*par*/["value"]){
          case "string":
            
            PL$34/*res*/["push"](PL$13/*stringEncodeStr*/(PL$32/*par*/["value"]));
            break;;
          case "number":
            
            if(this["asmMode"]){
              PL$34/*res*/["push"](("" + PL$32/*par*/["originalText"]));
              break;;
            };
            ;
            PL$34/*res*/["push"](("" + PL$32/*par*/["value"]));
            break;;
          case "boolean":
            
            if(PL$32/*par*/["value"]){
              PL$34/*res*/["push"]("true");
            }else{
            PL$34/*res*/["push"]("false");
            };
            ;
            break;;
          default:
            
            if((PL$32/*par*/["value"] === null)){
              PL$34/*res*/["push"]("null");
            }else{
            if((PL$32/*par*/["value"] && PL$32/*par*/["value"]["exec"])){
              PL$34/*res*/["push"](("" + PL$32/*par*/["value"]));
            }else{
            this["error"](PL$32/*par*/, PL$11/*errorMsg*/["internalUnknownLiteralType"]);
            };
            };
            ;
          
        };
        ;
        PL$34/*res*/["setType"](this["getType"]("var"));
        return PL$34/*res*/;
        ;});
      this["expPromiseExpression"] = (function(PL$43/*parExpression*/){
      
        ;
        return this["dereference"](this["parseExpression"](PL$43/*parExpression*/));
        ;});
      this["dereference"] = (function(PL$44/*parRes*/){
      
        ;
        if(this["asmMode"]){
          this["error"](PL$44/*parRes*/, PL$11/*errorMsg*/["notPossibleWithinAsm"]);
        };
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        var PL$45/*expressionRes*/ = PL$44/*parRes*/;
        ;
        if((typeof PL$44/*parRes*/ == "string")){
          PL$45/*expressionRes*/ = this["newResult"]();
          PL$45/*expressionRes*/["push"](PL$44/*parRes*/);
        };
        ;
        var PL$46/*promiseNameStr*/ = this["getUniqueName"]();
        ;
        PL$34/*res*/["makePromising"]();
        PL$34/*res*/["setPromiseName"](PL$46/*promiseNameStr*/);
        var PL$47/*dereferencePre*/ = this["dereferencePromisePreCode"]({
          "value": PL$45/*expressionRes*/
        });
        ;
        var PL$48/*preRes*/ = this["newResult"]();
        ;
        PL$48/*preRes*/["push"](PL$47/*dereferencePre*/);
        PL$48/*preRes*/["push"]((this["tryCatchFunctionStr"] + "(function("));
        PL$48/*preRes*/["push"](PL$46/*promiseNameStr*/);
        PL$48/*preRes*/["push"]("){");
        PL$34/*res*/["addPre"](PL$48/*preRes*/);
        var PL$49/*dereferencePost*/ = this["dereferencePromisePostCode"]({
          "value": PL$45/*expressionRes*/
        });
        ;
        var PL$50/*postRes*/ = this["newResult"]();
        ;
        PL$50/*postRes*/["push"](("}), " + this["catchFunctionStr"]));
        PL$50/*postRes*/["push"](PL$49/*dereferencePost*/);
        PL$50/*postRes*/["push"](";");
        PL$34/*res*/["addPost"](PL$50/*postRes*/);
        var PL$51/*promiseType*/ = PL$45/*expressionRes*/["getType"]();
        ;
        PL$34/*res*/["setType"](this["getClassFromPromiseOf"](PL$51/*promiseType*/));
        return PL$34/*res*/;
        ;});
      this["dereferenceStatement"] = (function(PL$44/*parRes*/){
      
        ;
        return this["makeStatement"](this["dereference"](PL$44/*parRes*/));
        ;});
      this["expUnaryExpression"] = (function(PL$43/*parExpression*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        PL$34/*res*/["push"](PL$43/*parExpression*/["operator"]);
        PL$34/*res*/["push"](" ");
        PL$34/*res*/["pushType"](this["expectTypeVar"](this["parseExpression"](PL$43/*parExpression*/["argument"])));
        return PL$34/*res*/;
        ;});
      this["expRequireExpression"] = (function(PL$43/*parExpression*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        this["common"]["useRequire"] = true;
        var PL$45/*expressionRes*/ = this["newResult"]();
        ;
        PL$45/*expressionRes*/["push"]("__requireFun(");
        PL$45/*expressionRes*/["push"](this["parseExpression"](PL$43/*parExpression*/));
        PL$45/*expressionRes*/["push"](")");
        PL$45/*expressionRes*/["setType"]("var");
        var PL$46/*promiseNameStr*/ = this["getUniqueName"]();
        ;
        PL$34/*res*/["makePromising"]();
        PL$34/*res*/["setPromiseName"](PL$46/*promiseNameStr*/);
        var PL$47/*dereferencePre*/ = this["dereferencePromisePreCode"]({
          "value": PL$45/*expressionRes*/
        });
        ;
        var PL$48/*preRes*/ = this["newResult"]();
        ;
        PL$48/*preRes*/["push"](PL$47/*dereferencePre*/);
        PL$48/*preRes*/["push"]((this["tryCatchFunctionStr"] + "(function("));
        PL$48/*preRes*/["push"](PL$46/*promiseNameStr*/);
        PL$48/*preRes*/["push"]("){");
        PL$34/*res*/["addPre"](PL$48/*preRes*/);
        var PL$49/*dereferencePost*/ = this["dereferencePromisePostCode"]({
          "value": PL$45/*expressionRes*/
        });
        ;
        var PL$50/*postRes*/ = this["newResult"]();
        ;
        PL$50/*postRes*/["push"](("}), " + this["catchFunctionStr"]));
        PL$50/*postRes*/["push"](PL$49/*dereferencePost*/);
        PL$50/*postRes*/["push"](";");
        PL$34/*res*/["addPost"](PL$50/*postRes*/);
        PL$34/*res*/["setType"]("var");
        return PL$34/*res*/;
        ;});
      this["expNewExpression"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        var PL$52/*typed*/ = false;
        ;
        var PL$53/*type*/ = "var";
        ;
        if((PL$32/*par*/["callee"] && (PL$32/*par*/["callee"]["type"] == "Identifier"))){
          PL$53/*type*/ = this["getType"](PL$16/*identifierName*/(PL$32/*par*/["callee"]), PL$32/*par*/, {
            "dontThrow": true
          });
          if(PL$53/*type*/){
            PL$34/*res*/["push"]("new ");
            PL$34/*res*/["push"](this["getConstructorName"](PL$32/*par*/["callee"]));
            PL$34/*res*/["push"]("(");
            PL$52/*typed*/ = true;
            PL$34/*res*/["setType"](this["getConstructorReturnType"](PL$53/*type*/));
          };
          ;
        };
        ;
        if(! PL$52/*typed*/){
          PL$34/*res*/["push"]("new ");
          PL$34/*res*/["push"](this["expectTypeVar"](this["parseExpression"](PL$32/*par*/["callee"])));
          PL$34/*res*/["push"]("(");
        };
        ;
        var PL$37/*i*/ = 0;
        ;
        var PL$54/*constructorType*/;
        ;
        if(PL$52/*typed*/){
          PL$54/*constructorType*/ = this["getConstructorType"]({
            "type": PL$53/*type*/
          }, PL$32/*par*/);
        };
        ;
        for(PL$37/*i*/;(PL$37/*i*/ < PL$32/*par*/["arguments"]["length"]);++PL$37/*i*/){{
          if(PL$37/*i*/){
            PL$34/*res*/["push"](", ");
          };
          ;
          var PL$55/*expression*/ = this["parseExpression"](PL$32/*par*/["arguments"][PL$37/*i*/]);
          ;
          if(PL$52/*typed*/){
            PL$34/*res*/["push"](this["getPassAsTypeCode"]({
              "value": PL$55/*expression*/,
              "valueType": PL$55/*expression*/["getType"](),
              "type": this["getFunctionArgumentType"](PL$54/*constructorType*/, PL$37/*i*/, PL$32/*par*/),
              "errorFun": this["getWarningFun"](PL$32/*par*/)
            }));
          }else{
          PL$34/*res*/["push"](this["expectTypeVar"](PL$55/*expression*/));
          };
          ;}};
        ;
        PL$34/*res*/["push"](")");
        if(! PL$52/*typed*/){
          PL$34/*res*/["setType"]("var");
        };
        ;
        return PL$34/*res*/;
        ;});
      this["connectExpression"] = (function(PL$36/*parParsed*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        if((PL$36/*parParsed*/["signal"]["type"] != "MemberExpression")){
          this["error"](PL$36/*parParsed*/["signal"], PL$11/*errorMsg*/["expectedMemberExpression"]);
        };
        ;
        if(PL$36/*parParsed*/["signal"]["computed"]){
          this["error"](PL$36/*parParsed*/["signal"], PL$11/*errorMsg*/["noComputedMembersAllowed"]);
        };
        ;
        var PL$56/*signalObject*/ = this["parseExpression"](PL$36/*parParsed*/["signal"]["object"]);
        ;
        var PL$57/*signalProperty*/ = PL$16/*identifierName*/(PL$36/*parParsed*/["signal"]["property"]);
        ;
        if(PL$36/*parParsed*/["slot"]){
          if((PL$36/*parParsed*/["slot"]["type"] != "MemberExpression")){
            this["error"](PL$36/*parParsed*/["slot"], PL$11/*errorMsg*/["expectedMemberExpression"]);
          };
          ;
          if(PL$36/*parParsed*/["slot"]["computed"]){
            this["error"](PL$36/*parParsed*/["slot"], PL$11/*errorMsg*/["noComputedMembersAllowed"]);
          };
          ;
          var PL$58/*slotObject*/ = this["parseExpression"](PL$36/*parParsed*/["slot"]["object"]);
          ;
          var PL$59/*slotProperty*/ = PL$16/*identifierName*/(PL$36/*parParsed*/["slot"]["property"]);
          ;
          PL$34/*res*/["push"](this["connectSlotCode"]({
            "signalObject": PL$56/*signalObject*/,
            "signalProperty": PL$57/*signalProperty*/,
            "slotObject": PL$58/*slotObject*/,
            "slotProperty": PL$59/*slotProperty*/,
            "errorFun": this["getWarningFun"](PL$36/*parParsed*/)
          }));
        }else{
        if(PL$36/*parParsed*/["fun"]){
          var PL$60/*fun*/ = this["parseExpression"](PL$36/*parParsed*/["fun"]);
          ;
          PL$34/*res*/["push"](this["connectFunCode"]({
            "signalObject": PL$56/*signalObject*/,
            "signalProperty": PL$57/*signalProperty*/,
            "fun": PL$60/*fun*/,
            "errorFun": this["getWarningFun"](PL$36/*parParsed*/)
          }));
        }else{
        this["error"](PL$36/*parParsed*/, PL$11/*errorMsg*/["unknownConnect"]);
        };
        };
        ;
        PL$34/*res*/["setType"]("var");
        return PL$34/*res*/;
        ;});
      this["expBinaryExpression"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        var PL$61/*left*/ = this["parseExpression"](PL$32/*par*/["left"]);
        ;
        var PL$62/*right*/ = this["parseExpression"](PL$32/*par*/["right"]);
        ;
        PL$34/*res*/["setType"]("var");
        if(((PL$32/*par*/["operator"] == "||") && PL$32/*par*/["right"]["promising"])){
          var PL$63/*ltype*/ = PL$61/*left*/["getType"]();
          ;
          var PL$64/*rtype*/ = PL$62/*right*/["getType"]();
          ;
          if(((PL$63/*ltype*/ !== this["getType"]("var")) || (PL$64/*rtype*/ !== this["getType"]("var")))){
            this["error"](PL$32/*par*/, PL$11/*errorMsg*/["notImplemented"]);
          };
          ;
          PL$34/*res*/["makePromising"]();
          var PL$65/*tempPromise*/ = this["getUniqueName"]();
          ;
          var PL$66/*tempValue*/ = this["getUniqueName"]();
          ;
          PL$34/*res*/["addPre"]("var ");
          PL$34/*res*/["addPre"](PL$65/*tempPromise*/);
          PL$34/*res*/["addPre"](((" = " + this["newPromiseStr"]()) + ";"));
          PL$34/*res*/["addPre"](this["newLine"]());
          PL$34/*res*/["addPre"]("var ");
          PL$34/*res*/["addPre"](PL$66/*tempValue*/);
          PL$34/*res*/["addPre"](" = ");
          PL$34/*res*/["addPre"](PL$61/*left*/);
          PL$34/*res*/["addPre"](";");
          PL$34/*res*/["addPre"](this["newLine"]());
          PL$34/*res*/["addPre"]("if (");
          PL$34/*res*/["addPre"](PL$66/*tempValue*/);
          PL$34/*res*/["addPre"]("){ ");
          PL$34/*res*/["addPre"](PL$65/*tempPromise*/);
          PL$34/*res*/["addPre"](".resolve(");
          PL$34/*res*/["addPre"](PL$66/*tempValue*/);
          PL$34/*res*/["addPre"](") }else{ ");
          var PL$67/*rightExtraCode*/ = this["newResult"]();
          ;
          PL$67/*rightExtraCode*/["push"](PL$65/*tempPromise*/);
          PL$67/*rightExtraCode*/["push"](".resolve(");
          PL$67/*rightExtraCode*/["push"](PL$62/*right*/);
          PL$67/*rightExtraCode*/["push"](");");
          PL$67/*rightExtraCode*/["push"](this["newLine"]());
          PL$34/*res*/["addPre"](this["makeCompleteStatement"](PL$67/*rightExtraCode*/));
          PL$34/*res*/["addPre"]("};");
          PL$34/*res*/["addPre"](this["newLine"]());
          PL$34/*res*/["addPre"](PL$65/*tempPromise*/);
          PL$34/*res*/["addPre"](".then(");
          PL$34/*res*/["setPromiseName"](this["getUniqueName"]());
          PL$34/*res*/["addPre"](PL$34/*res*/["getPromiseName"]());
          PL$34/*res*/["addPre"]("){");
          PL$34/*res*/["addPost"]("});");
        }else{
        PL$34/*res*/["push"](this["getBinaryExpressionCode"]({
          "left": PL$61/*left*/,
          "right": PL$62/*right*/,
          "operator": PL$32/*par*/["operator"],
          "errorFun": this["getWarningFun"](PL$32/*par*/)
        }));
        };
        ;
        return PL$34/*res*/;
        ;});
      this["expMemberExpression"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        var PL$68/*base*/ = this["parseExpression"](PL$32/*par*/["object"]);
        ;
        PL$34/*res*/["pushType"](this["getGetPropertyCode"]({
          "instance": PL$68/*base*/,
          "property": (PL$32/*par*/["computed"] ? undefined : PL$16/*identifierName*/(PL$32/*par*/["property"])),
          "propertyValue": (PL$32/*par*/["computed"] ? this["expectTypeVar"](this["parseExpression"](PL$32/*par*/["property"])) : undefined),
          "errorFun": this["getWarningFun"](PL$32/*par*/)
        }));
        return PL$34/*res*/;
        ;});
      this["expAssignmentExpression"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        if((PL$32/*par*/["left"]["type"] == "MemberExpression")){
          var PL$68/*base*/ = this["parseExpression"](PL$32/*par*/["left"]["object"]);
          ;
          var PL$69/*property*/;
          ;
          var PL$70/*propertyValue*/;
          ;
          if(PL$32/*par*/["left"]["computed"]){
            PL$70/*propertyValue*/ = this["expectTypeVar"](this["parseExpression"](PL$32/*par*/["left"]["property"]));
          }else{
          PL$69/*property*/ = PL$16/*identifierName*/(PL$32/*par*/["left"]["property"]);
          };
          ;
          PL$34/*res*/["pushType"](this["getSetPropertyCode"]({
            "instance": PL$68/*base*/,
            "propertyValue": PL$70/*propertyValue*/,
            "property": PL$69/*property*/,
            "computed": PL$32/*par*/["left"]["computed"],
            "value": this["parseExpression"](PL$32/*par*/["right"]),
            "operator": PL$32/*par*/["operator"],
            "errorFun": this["getWarningFun"](PL$32/*par*/)
          }));
        }else{
        PL$34/*res*/["pushType"](this["getSetVariableCode"]({
          "instance": this["parseExpression"](PL$32/*par*/["left"]),
          "assignmentType": PL$32/*par*/["left"]["type"],
          "value": this["parseExpression"](PL$32/*par*/["right"]),
          "operator": PL$32/*par*/["operator"],
          "errorFun": this["getWarningFun"](PL$32/*par*/)
        }));
        };
        ;
        return PL$34/*res*/;
        ;});
      this["expCallExpression"] = (function(PL$32/*par*/){
      
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        var PL$37/*i*/ = 0;
        ;
        var PL$71/*l*/;
        ;
        var PL$72/*calleeRes*/ = this["parseExpression"](PL$32/*par*/["callee"]);
        ;
        var PL$73/*args*/ = [
          
        ];
        ;
        if(PL$32/*par*/["arguments"]){
          PL$71/*l*/ = PL$32/*par*/["arguments"]["length"];
          for(PL$37/*i*/ = 0;(PL$37/*i*/ < PL$71/*l*/);++PL$37/*i*/){{
            var PL$74/*argType*/ = this["getFunctionArgumentType"](PL$72/*calleeRes*/["getType"](), PL$37/*i*/, PL$32/*par*/["arguments"][PL$37/*i*/]);
            ;
            var PL$75/*argRes*/ = this["parseExpression"](PL$32/*par*/["arguments"][PL$37/*i*/]);
            ;
            PL$75/*argRes*/ = this["getPassAsTypeCode"]({
              "value": PL$75/*argRes*/,
              "valueType": PL$75/*argRes*/["getType"](),
              "type": PL$74/*argType*/,
              "errorFun": this["getWarningFun"](PL$32/*par*/)
            });
            PL$73/*args*/["push"]({
              "type": PL$75/*argRes*/["getType"](),
              "value": PL$75/*argRes*/
            });}};
          ;
        };
        ;
        PL$34/*res*/["push"](this["callClassSystem"]("getCallCode", {
          "type": PL$72/*calleeRes*/["getType"](),
          "instance": PL$72/*calleeRes*/,
          "arguments": PL$73/*args*/
        }));
        PL$34/*res*/["setType"](this["getFunctionReturnType"](PL$72/*calleeRes*/["getType"](), PL$32/*par*/));
        return PL$34/*res*/;
        ;});
      this["expReturnStatement"] = (function(PL$32/*par*/, PL$76/*closingFun*/){
      
        ;
        if(this["preventreturn"]){
          this["error"](PL$32/*par*/, PL$11/*errorMsg*/["returnNotAllowedHere"]);
        };
        ;
        var PL$34/*res*/ = this["newResult"]();
        ;
        var PL$77/*valueRes*/;
        ;
        if(PL$32/*par*/["argument"]){
          PL$77/*valueRes*/ = this["newResult"]();
          var PL$78/*passAsType*/ = this["getReturnType"]();
          ;
          if(this["promising"]){
            PL$78/*passAsType*/ = this["getClassFromPromiseOf"](PL$78/*passAsType*/);
          };
          ;
          PL$78/*passAsType*/ = this["createTemporaryTrackedClass"](PL$78/*passAsType*/);
          var PL$79/*v*/ = this["parseExpression"](PL$32/*par*/["argument"]);
          ;
          PL$77/*valueRes*/["push"](this["getPassAsTypeCode"]({
            "value": PL$79/*v*/,
            "valueType": PL$79/*v*/["getType"](),
            "type": PL$78/*passAsType*/,
            "errorFun": this["getWarningFun"](PL$32/*par*/)
          }));
        };
        ;
        PL$34/*res*/["push"](this["getReturnCode"]({
          "return": true,
          "value": PL$77/*valueRes*/
        }), PL$32/*par*/);
        PL$34/*res*/["setType"](PL$19/*statementType*/);
        return PL$34/*res*/;
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