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
    if (promiseland._hasModule({ hashStr: "164ccf5abcf35b0ec84da2fedf993f06" })){ return promiseland._getModule("164ccf5abcf35b0ec84da2fedf993f06"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "164ccf5abcf35b0ec84da2fedf993f06", "module": PL$1, promising: true });
var PL$6/*promiseland*/;try{PL$6/*promiseland*/ = promiseland;}catch(e){};
var PL$56/*JSON*/;try{PL$56/*JSON*/ = JSON;}catch(e){};
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
    var PL$29/*InheritedSystem*/;
    
      ;
      this["expClassObjectExpression"] = (function(PL$22/*par*/){
      
        ;
        this["stack"]("isClassObject");
        this["isClassObject"] = true;
        var PL$24/*res*/ = this["expObjectExpression"](PL$22/*par*/);
        ;
        this["unstack"]("isClassObject");
        return PL$24/*res*/;
        ;});
      this["expInheritedExpression"] = (function(PL$22/*par*/){
      
        ;
        if(! this["inheritedAvailable"]){
          this["error"](PL$22/*par*/, PL$11/*errorMsg*/["inheritedOnlyInMember"]);
          return;
        };
        ;
        var PL$24/*res*/ = this["newResult"]();
        ;
        var PL$25/*i*/ = 0;
        ;
        var PL$26/*l*/;
        ;
        PL$24/*res*/["push"](this["inheritedSystem"]["getCurrent"]());
        PL$24/*res*/["push"](".apply(this");
        var PL$27/*args*/ = [
          
        ];
        ;
        if(PL$22/*par*/["arguments"]){
          PL$24/*res*/["push"](", [");
          PL$26/*l*/ = PL$22/*par*/["arguments"]["length"];
          for(PL$25/*i*/ = 0;(PL$25/*i*/ < PL$26/*l*/);++PL$25/*i*/){{
            if(PL$25/*i*/){
              PL$24/*res*/["push"](", ");
            };
            ;
            var PL$28/*argRes*/ = this["expectTypeVar"](this["parseExpression"](PL$22/*par*/["arguments"][PL$25/*i*/]));
            ;
            PL$24/*res*/["push"](PL$28/*argRes*/);}};
          ;
          PL$24/*res*/["push"]("]");
        }else{
        if(PL$22/*par*/["expression"]){
          PL$24/*res*/["push"](", ");
          this["expectTypeVar"](this["parseExpression"](PL$22/*par*/["expression"]));
        };
        };
        ;
        PL$24/*res*/["push"](")");
        PL$24/*res*/["setType"]("var");
        return PL$24/*res*/;
        ;});
      this["newInherited"] = (function(){
      
        ;
        return new PL$29/*InheritedSystem*/(this);
        ;});
      PL$29/*InheritedSystem*/ = (function(PL$22/*par*/){
      
        ;
        this["instance"] = PL$22/*par*/;
        this["used"] = {
          
        };
        ;});
      PL$29/*InheritedSystem*/["prototype"] = {
        "setCurrent": (function(PL$22/*par*/){
        
          ;
          this["currentMember"] = PL$22/*par*/;
          ;}),
        "getCurrent": (function(){
        
          ;
          if(! this["used"][this["currentMember"]]){
            this["used"][this["currentMember"]] = this["instance"]["getUniqueName"](("inherited " + this["currentMember"]));
          };
          ;
          return this["used"][this["currentMember"]];
          ;})
      };
      this["expClassStatement"] = (function(PL$22/*par*/){
      var PL$25/*i*/;
      
        ;
        var PL$24/*res*/ = this["newResult"]();
        ;
        var PL$30/*classRes*/ = this["newResult"]();
        ;
        var PL$31/*ci*/ = this["identifyClass"](PL$22/*par*/);
        ;
        var PL$32/*hasName*/ = PL$31/*ci*/["hasName"];
        ;
        var PL$33/*name*/;
        ;
        if(PL$32/*hasName*/){
          PL$33/*name*/ = PL$16/*identifierName*/(PL$22/*par*/["name"]);
        };
        ;
        var PL$34/*isTyped*/ = PL$31/*ci*/["isTyped"];
        ;
        var PL$35/*extendsClause*/ = PL$22/*par*/["extendsClause"];
        ;
        var PL$36/*syncClause*/ = PL$31/*ci*/["syncClause"];
        ;
        var PL$37/*trackClause*/ = PL$31/*ci*/["trackClause"];
        ;
        var PL$38/*resultType*/ = this["getType"]("var");
        ;
        this["stack"]("inheritedSystem");
        this["inheritedSystem"] = this["newInherited"]();
        if(PL$34/*isTyped*/){
          this["common"]["useClassSystem"] = true;
          PL$30/*classRes*/["push"]("classSystem.createClass(");
          if(PL$22/*par*/["body"]["literal"]){
            if(PL$32/*hasName*/){
              this["inheritedSystem"]["type"] = this["getType"](PL$33/*name*/, PL$22/*par*/);
            };
            ;
            this["stack"]("isClassObject");
            this["isClassObject"] = true;
            var PL$39/*literal*/ = this["createClassLiteral"](PL$22/*par*/["body"]["literal"], PL$31/*ci*/, PL$33/*name*/);
            ;
            PL$30/*classRes*/["push"](this["stringifyClassLiteral"](PL$39/*literal*/, PL$33/*name*/));
            PL$30/*classRes*/["push"](", ");
            PL$30/*classRes*/["push"](this["createClassDefaults"](PL$22/*par*/["body"]["literal"]));
            this["unstack"]("isClassObject");
            if(PL$32/*hasName*/){
              var PL$40/*type*/ = this["createType"]({
                "name": PL$33/*name*/,
                "literal": PL$39/*literal*/,
                "par": PL$22/*par*/
              });
              ;
            };
            ;
          }else{
          PL$30/*classRes*/["push"]("{}, ");
          PL$30/*classRes*/["push"](this["parseExpression"](PL$22/*par*/["body"]["expression"]));
          };
          ;
          PL$30/*classRes*/["push"](")");
        }else{
        var PL$41/*inheritedObjName*/ = this["getUniqueName"]("inherited");
        ;
        PL$30/*classRes*/["push"]("(function(){");
        if(PL$22/*par*/["body"]["literal"]){
          this["stack"]("preventreturn");
          this["preventreturn"] = true;
          var PL$42/*lit*/ = PL$22/*par*/["body"]["literal"];
          ;
          var PL$26/*l*/ = ((PL$42/*lit*/["properties"] && PL$42/*lit*/["properties"]["length"]) || 0);
          ;
          for(PL$25/*i*/;(PL$25/*i*/ < PL$26/*l*/);++PL$25/*i*/){{
            var PL$43/*prop*/ = PL$42/*lit*/["properties"][PL$25/*i*/];
            ;
            if((PL$43/*prop*/["kind"] == "block")){
              PL$30/*classRes*/["push"](this["parseExpression"](PL$43/*prop*/));
            };
            ;}};
          ;
          this["unstack"]("preventreturn");
        };
        ;
        PL$30/*classRes*/["push"]((("var " + PL$41/*inheritedObjName*/) + " = {};"));
        PL$30/*classRes*/["push"](this["newLine"]());
        var PL$44/*tempRes*/ = this["newResult"]();
        ;
        PL$44/*tempRes*/["push"]("var res = promiseland.createClass(");
        if(PL$22/*par*/["body"]["literal"]){
          PL$44/*tempRes*/["push"](this["expectTypeVar"](this["parseExpression"](PL$22/*par*/["body"]["literal"])));
        }else{
        PL$44/*tempRes*/["push"](this["expectTypeVar"](this["parseExpression"](PL$22/*par*/["body"]["expression"])));
        };
        ;
        PL$44/*tempRes*/["push"](", [");
        var PL$45/*baseClasses*/ = ((PL$35/*extendsClause*/ && PL$35/*extendsClause*/["baseClasses"]) || [
          
        ]);
        ;
        PL$25/*i*/ = 0;
        for(PL$25/*i*/ = 0;(PL$25/*i*/ < PL$45/*baseClasses*/["length"]);++PL$25/*i*/){{
          if(PL$25/*i*/){
            PL$44/*tempRes*/["push"](", ");
          };
          ;
          PL$44/*tempRes*/["push"](this["expectTypeVar"](this["parseExpression"](PL$45/*baseClasses*/[PL$25/*i*/])));}};
        ;
        PL$44/*tempRes*/["push"]("], ");
        PL$44/*tempRes*/["push"](PL$41/*inheritedObjName*/);
        PL$44/*tempRes*/["push"](");");
        PL$30/*classRes*/["push"](PL$44/*tempRes*/);
        PL$30/*classRes*/["push"](this["newLine"]());
        var PL$46/*used*/ = this["inheritedSystem"]["used"];
        ;
        var PL$47/*u*/;
        ;
        for(PL$47/*u*/ in PL$46/*used*/){
          PL$30/*classRes*/["push"]((((((("var " + PL$46/*used*/[PL$47/*u*/]) + " = ") + PL$41/*inheritedObjName*/) + "[") + PL$13/*stringEncodeStr*/(PL$47/*u*/)) + "];"));
          PL$30/*classRes*/["push"](this["newLine"]());};
        ;
        PL$30/*classRes*/["push"]("return res; })()");
        };
        ;
        if(PL$32/*hasName*/){
          if(PL$34/*isTyped*/){
            PL$24/*res*/["addPre"](this["_resolveClassCode"]({
              "name": PL$22/*par*/["name"],
              "classRes": PL$30/*classRes*/,
              "parsed": PL$22/*par*/
            }));
          }else{
          PL$24/*res*/["addPre"]((this["getVariableName"](PL$22/*par*/["name"]) + " = "));
          PL$24/*res*/["addPre"](PL$30/*classRes*/);
          PL$24/*res*/["addPre"](";");
          };
          ;
          PL$24/*res*/["push"](this["getVariableName"](PL$22/*par*/["name"]));
        }else{
        PL$24/*res*/["push"](PL$30/*classRes*/);
        };
        ;
        PL$24/*res*/["setType"](PL$38/*resultType*/);
        this["unstack"]("inheritedSystem");
        return PL$24/*res*/;
        ;});
      this["_resolveClassCode"] = (function(PL$22/*par*/){
      
        ;
        var PL$48/*parsed*/ = PL$22/*par*/["parsed"];
        ;
        var PL$24/*res*/ = this["newResult"]();
        ;
        this["common"]["useClassSystem"] = true;
        PL$24/*res*/["push"]("classSystem._resolveProvisional(", PL$48/*parsed*/);
        PL$24/*res*/["push"](this["renderType"](PL$22/*par*/["name"], PL$48/*parsed*/), PL$48/*parsed*/);
        PL$24/*res*/["push"](", ", PL$48/*parsed*/);
        PL$24/*res*/["push"](PL$22/*par*/["classRes"], PL$48/*parsed*/);
        PL$24/*res*/["push"](");", PL$48/*parsed*/);
        return PL$24/*res*/;
        ;});
      this["createClassLiteral"] = (function(PL$22/*par*/, PL$31/*ci*/, PL$49/*parName*/){
      
        ;
        var PL$50/*ret*/ = {
          "members": [
            
          ],
          "extends": [
            
          ],
          "hasFreePart": true,
          "parsed": PL$22/*par*/,
          "track": (PL$31/*ci*/["trackClause"] ? true : false),
          "sync": PL$31/*ci*/["syncClause"],
          "unique": PL$31/*ci*/["uniqueClause"],
          "savable": PL$31/*ci*/["savableClause"],
          "name": PL$49/*parName*/,
          "hashStr": this["getModuleHashStr"]()
        };
        ;
        var PL$25/*i*/ = 0;
        ;
        var PL$26/*l*/ = ((PL$22/*par*/["properties"] && PL$22/*par*/["properties"]["length"]) || 0);
        ;
        for(PL$25/*i*/;(PL$25/*i*/ < PL$26/*l*/);++PL$25/*i*/){{
          var PL$43/*prop*/ = PL$22/*par*/["properties"][PL$25/*i*/];
          ;
          var PL$51/*defaultValue*/;
          ;
          var PL$40/*type*/;
          ;
          if((PL$43/*prop*/["kind"] == "init")){
            PL$40/*type*/ = (PL$43/*prop*/["typename"] ? this["getType"](PL$43/*prop*/["typename"], PL$22/*par*/) : undefined);
            if(PL$43/*prop*/["value"]){
              if(PL$40/*type*/){
                PL$51/*defaultValue*/ = this["parseAsType"](PL$40/*type*/, PL$43/*prop*/["value"]);
              }else{
              PL$51/*defaultValue*/ = this["parseExpression"](PL$43/*prop*/["value"]);
              PL$40/*type*/ = PL$51/*defaultValue*/["getType"]();
              };
              ;
            };
            ;
            if(! PL$40/*type*/){
              PL$40/*type*/ = this["getType"]("var");
            };
            ;
            var PL$52/*m*/ = {
              "name": PL$16/*identifierName*/(PL$43/*prop*/["key"]),
              "type": PL$40/*type*/,
              "defaultValue": PL$51/*defaultValue*/
            };
            ;
            var PL$53/*keywords*/ = PL$43/*prop*/["keywords"];
            ;
            if((PL$53/*keywords*/ && PL$53/*keywords*/["length"])){
              var PL$54/*k*/;
              ;
              for(PL$54/*k*/ = 0;(PL$54/*k*/ < PL$53/*keywords*/["length"]);++PL$54/*k*/){{
                switch (PL$53/*keywords*/[PL$54/*k*/]["type"]){
                  case "const":
                    
                    PL$52/*m*/["const"] = true;
                    break;;
                  case "meta":
                    
                    PL$52/*m*/["meta"] = PL$53/*keywords*/[PL$54/*k*/];
                    break;;
                  case "sync":
                    
                    PL$52/*m*/["sync"] = true;
                    break;;
                  
                };
                ;}};
              ;
            };
            ;
            PL$50/*ret*/["members"]["push"](PL$52/*m*/);
          }else{
          if((PL$43/*prop*/["kind"] == "function")){
            debugger;
            var PL$33/*name*/ = PL$16/*identifierName*/((PL$43/*prop*/["id"] || PL$43/*prop*/["_name"]));
            ;
            PL$43/*prop*/["id"] = undefined;
            PL$43/*prop*/["_name"] = PL$33/*name*/;
            PL$51/*defaultValue*/ = this["parseExpression"](PL$43/*prop*/);
            PL$40/*type*/ = PL$51/*defaultValue*/["getType"]();
            PL$52/*m*/ = {
              "name": PL$33/*name*/,
              "type": PL$40/*type*/,
              "defaultValue": PL$51/*defaultValue*/
            };
            PL$53/*keywords*/ = PL$43/*prop*/["keywords"];
            if((PL$53/*keywords*/ && PL$53/*keywords*/["length"])){
              PL$54/*k*/;
              for(PL$54/*k*/ = 0;(PL$54/*k*/ < PL$53/*keywords*/["length"]);++PL$54/*k*/){{
                switch (PL$53/*keywords*/[PL$54/*k*/]["type"]){
                  case "const":
                    
                    PL$52/*m*/["const"] = true;
                    break;;
                  case "meta":
                    
                    PL$52/*m*/["meta"] = PL$53/*keywords*/[PL$54/*k*/];
                    break;;
                  case "sync":
                    
                    PL$52/*m*/["sync"] = true;
                    break;;
                  
                };
                ;}};
              ;
            };
            ;
            PL$50/*ret*/["members"]["push"](PL$52/*m*/);
          }else{
          this["error"](PL$43/*prop*/, PL$11/*errorMsg*/["unknownPropertyAssignmentType"]);
          };
          };
          ;}};
        ;
        return PL$50/*ret*/;
        ;});
      this["stringifyClassLiteral"] = (function(PL$22/*par*/, PL$55/*parClassNameStr*/){
      
        ;
        var PL$24/*res*/ = this["newResult"]();
        ;
        PL$24/*res*/["push"]("{");
        if(this["common"]["name"]){
          PL$24/*res*/["push"]((("moduleName: " + PL$13/*stringEncodeStr*/(PL$16/*identifierName*/(this["common"]["name"]))) + ","));
        };
        ;
        if(PL$55/*parClassNameStr*/){
          PL$24/*res*/["push"]((("className: " + PL$13/*stringEncodeStr*/(PL$16/*identifierName*/(PL$55/*parClassNameStr*/))) + ","));
        };
        ;
        PL$24/*res*/["push"]("members: [");
        var PL$25/*i*/ = 0;
        ;
        var PL$26/*l*/ = PL$22/*par*/["members"]["length"];
        ;
        for(PL$25/*i*/;(PL$25/*i*/ < PL$26/*l*/);++PL$25/*i*/){{
          var PL$52/*m*/ = PL$22/*par*/["members"][PL$25/*i*/];
          ;
          if(PL$25/*i*/){
            PL$24/*res*/["push"](",");
          };
          ;
          PL$24/*res*/["push"]("{");
          PL$24/*res*/["push"](("\"name\":" + PL$13/*stringEncodeStr*/(PL$52/*m*/["name"])));
          PL$24/*res*/["push"](",\"type\":");
          PL$24/*res*/["push"](this["renderType"](PL$52/*m*/["type"], PL$22/*par*/["parsed"]));
          if(PL$52/*m*/["meta"]){
            PL$24/*res*/["push"](",\"meta\":");
            PL$24/*res*/["push"](this["parseExpression"](PL$52/*m*/["meta"]["expression"]));
          };
          ;
          if(PL$52/*m*/["sync"]){
            PL$24/*res*/["push"](",\"sync\": true");
          };
          ;
          PL$24/*res*/["push"]("}");}};
        ;
        PL$24/*res*/["push"]("]");
        PL$24/*res*/["push"](", \"extends\": []");
        PL$24/*res*/["push"](", \"hasFreePart\": true");
        if(PL$22/*par*/["track"]){
          PL$24/*res*/["push"](", \"track\": true");
        };
        ;
        if(PL$22/*par*/["sync"]){
          PL$24/*res*/["push"](", \"sync\": ");
          PL$24/*res*/["push"](PL$56/*JSON*/["stringify"](PL$22/*par*/["sync"]));
        };
        ;
        PL$24/*res*/["push"]((", \"hashStr\": " + PL$13/*stringEncodeStr*/(PL$22/*par*/["hashStr"])));
        PL$24/*res*/["push"]((", \"name\": " + PL$13/*stringEncodeStr*/(PL$22/*par*/["name"])));
        if(PL$22/*par*/["unique"]){
          PL$24/*res*/["push"](", \"unique\": true");
        };
        ;
        if(PL$22/*par*/["savable"]){
          PL$24/*res*/["push"](", \"savable\": true");
        };
        ;
        PL$24/*res*/["push"]("}");
        return PL$24/*res*/;
        ;});
      this["createClassDefaults"] = (function(PL$22/*par*/){
      
        ;
        var PL$24/*res*/ = this["newResult"]();
        ;
        PL$24/*res*/["push"]("{");
        var PL$25/*i*/ = 0;
        ;
        var PL$26/*l*/ = ((PL$22/*par*/["properties"] && PL$22/*par*/["properties"]["length"]) || 0);
        ;
        var PL$57/*comma*/;
        ;
        for(PL$25/*i*/;(PL$25/*i*/ < PL$26/*l*/);++PL$25/*i*/){{
          var PL$43/*prop*/ = PL$22/*par*/["properties"][PL$25/*i*/];
          ;
          if((PL$43/*prop*/["kind"] == "init")){
            if(PL$57/*comma*/){
              PL$24/*res*/["push"](", ");
            };
            ;
            PL$24/*res*/["push"]((PL$13/*stringEncodeStr*/(PL$16/*identifierName*/(PL$43/*prop*/["key"])) + ": "));
            if(PL$43/*prop*/["value"]){
              PL$24/*res*/["push"](this["parseExpression"](PL$43/*prop*/["value"]));
            }else{
            PL$24/*res*/["push"]("undefined");
            };
            ;
            PL$57/*comma*/ = true;
          }else{
          if((PL$43/*prop*/["kind"] == "function")){
            if(PL$57/*comma*/){
              PL$24/*res*/["push"](", ");
            };
            ;
            var PL$33/*name*/ = PL$16/*identifierName*/((PL$43/*prop*/["id"] || PL$43/*prop*/["_name"]));
            ;
            PL$43/*prop*/["id"] = undefined;
            PL$43/*prop*/["_name"] = PL$33/*name*/;
            PL$24/*res*/["push"]((PL$13/*stringEncodeStr*/(PL$16/*identifierName*/(PL$33/*name*/)) + ": "));
            PL$24/*res*/["push"](this["parseExpression"](PL$43/*prop*/));
            PL$57/*comma*/ = true;
          };
          };
          ;}};
        ;
        PL$24/*res*/["push"]("}");
        return PL$24/*res*/;
        ;});
      this["localClassConstructors"] = {
        
      };
      this["getConstructorName"] = (function(PL$49/*parName*/){
      
        ;
        var PL$33/*name*/ = PL$16/*identifierName*/(PL$49/*parName*/);
        ;
        if(this["types"]["has"](PL$33/*name*/)){
          var PL$58/*t*/ = this["types"]["get"](PL$33/*name*/);
          ;
          if(! PL$58/*t*/["constructorName"]){
            PL$58/*t*/["constructorName"] = this["getUniqueName"]((PL$33/*name*/ + "-constructor"));
            if(! PL$58/*t*/["isDynamic"]){
              this["localClassConstructors"][PL$33/*name*/] = PL$58/*t*/["constructorName"];
            };
            ;
          };
          ;
          return PL$58/*t*/["constructorName"];
        };
        ;
        this["error"](PL$49/*parName*/, PL$11/*errorMsg*/["typeUndeclared"], {
          "name": PL$33/*name*/
        });
        ;});
      this["identifyClass"] = (function(PL$22/*par*/){
      
        ;
        var PL$59/*r*/ = {
          
        };
        ;
        var PL$33/*name*/;
        ;
        if(PL$22/*par*/["name"]){
          PL$33/*name*/ = PL$16/*identifierName*/(PL$22/*par*/["name"]);
        };
        PL$59/*r*/["hasName"] = (PL$33/*name*/ && PL$33/*name*/["length"]);
        var PL$53/*keywords*/ = PL$22/*par*/["keywords"];
        ;
        if((PL$53/*keywords*/ && PL$53/*keywords*/["length"])){
          var PL$25/*i*/;
          ;
          for(PL$25/*i*/ = 0;(PL$25/*i*/ < PL$53/*keywords*/["length"]);++PL$25/*i*/){{
            switch (PL$53/*keywords*/[PL$25/*i*/]["type"]){
              case "type":
                
                PL$59/*r*/["isTyped"] = true;
                break;;
              case "extends":
                
                PL$59/*r*/["extendsClause"] = PL$53/*keywords*/[PL$25/*i*/];
                break;;
              case "sync":
                
                PL$59/*r*/["syncClause"] = PL$53/*keywords*/[PL$25/*i*/];
                break;;
              case "track":
                
                PL$59/*r*/["trackClause"] = PL$53/*keywords*/[PL$25/*i*/];
                break;;
              case "unique":
                
                PL$59/*r*/["uniqueClause"] = PL$53/*keywords*/[PL$25/*i*/];
                break;;
              case "savable":
                
                PL$59/*r*/["savableClause"] = PL$53/*keywords*/[PL$25/*i*/];
                break;;
              
            };
            ;}};
          ;
        };
        ;
        return PL$59/*r*/;
        ;});
      this["findClasses"] = (function(PL$22/*par*/, PL$24/*res*/){
      
        ;
        if(! PL$24/*res*/){
          PL$24/*res*/ = this["newResult"]();
        };
        ;
        if((! PL$22/*par*/ || (typeof PL$22/*par*/ == "string"))){
          return PL$24/*res*/;
        };
        ;
        if(PL$17/*checkIsFunction*/(PL$22/*par*/)){
          return PL$24/*res*/;
        };
        ;
        if((PL$22/*par*/["type"] == "Class")){
          var PL$31/*ci*/ = this["identifyClass"](PL$22/*par*/);
          ;
          if(PL$31/*ci*/["isTyped"]){
            if(PL$22/*par*/["body"]["literal"]){
              if(PL$31/*ci*/["hasName"]){
                var PL$33/*name*/ = PL$16/*identifierName*/(PL$22/*par*/["name"]);
                ;
                PL$24/*res*/["push"](this["newLine"]());
                PL$24/*res*/["push"]("/* ---------------------------- */");
                PL$24/*res*/["push"](this["newLine"]());
                PL$24/*res*/["push"]((("/* type " + PL$33/*name*/) + " */"));
                PL$24/*res*/["push"](this["newLine"]());
                var PL$60/*extraRes*/ = this["newResult"]();
                ;
                this["addType"]({
                  "name": PL$33/*name*/,
                  "extraRes": PL$60/*extraRes*/
                }, PL$22/*par*/);
                PL$24/*res*/["push"]("var ");
                PL$24/*res*/["push"](this["renderType"](PL$33/*name*/));
                PL$24/*res*/["push"](" = classSystem._createProvisionalClass();");
                PL$24/*res*/["push"](this["newLine"]());
                this["common"]["useClassSystem"] = true;
                PL$24/*res*/["push"]((this["getVariableName"](PL$33/*name*/) + " = "));
                PL$24/*res*/["push"](this["renderType"](PL$33/*name*/));
                PL$24/*res*/["push"](this["newLine"]());
                PL$24/*res*/["push"]((("var " + this["getConstructorName"](PL$33/*name*/)) + " = undefined;"));
                PL$24/*res*/["push"](this["newLine"]());
                PL$24/*res*/["push"](this["_typeReadyCode"]({
                  "typename": PL$33/*name*/
                }));
                PL$24/*res*/["push"](PL$60/*extraRes*/);
                PL$24/*res*/["push"]("/* ---------------------------- */");
                PL$24/*res*/["push"](this["newLine"]());
                PL$24/*res*/["push"](this["newLine"]());
              };
              ;
            };
            ;
          };
          ;
          return PL$24/*res*/;
        };
        ;
        var PL$25/*i*/;
        ;
        for(PL$25/*i*/ in PL$22/*par*/){
          this["findClasses"](PL$22/*par*/[PL$25/*i*/], PL$24/*res*/);};
        ;
        return PL$24/*res*/;
        ;});
      this["_typeReadyCode"] = (function(PL$22/*par*/){
      
        ;
        var PL$24/*res*/ = this["newResult"]();
        ;
        this["common"]["useClassSystem"] = true;
        PL$24/*res*/["push"]([
          "classSystem.readyPromise(", 
          this["renderType"](PL$22/*par*/["typename"]), 
          ").then(function(parType){"
        ]);
        var PL$61/*tempAr*/ = [
          this["renderType"](PL$22/*par*/["typename"]), 
          " = parType;"
        ];
        ;
        if(! PL$22/*par*/["noConstructor"]){
          PL$61/*tempAr*/["push"](this["newLine"]());
          PL$61/*tempAr*/["push"]((this["getConstructorName"](PL$22/*par*/["typename"]) + " = classSystem.getTypeConstructor("));
          PL$61/*tempAr*/["push"](this["renderType"](PL$22/*par*/["typename"]));
          PL$61/*tempAr*/["push"](");");
        };
        ;
        PL$24/*res*/["push"](this["indentNewLine"](PL$61/*tempAr*/));
        PL$24/*res*/["push"]([
          "});", 
          this["newLine"]()
        ]);
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