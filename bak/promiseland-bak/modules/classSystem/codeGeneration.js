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
  defineFun([], function(){
var __execute = function(promiseland, extra){ __execute = undefined; var __require = requireFun;

if (promiseland._hasModule({ hashStr: "3e48548823c9c531a7d309d84dc1a0ee" })){ return promiseland._getModule("3e48548823c9c531a7d309d84dc1a0ee"); };
var PL$3/*extra*/;try{PL$3/*extra*/ = extra;}catch(e){};
var PL$44/*Array*/;try{PL$44/*Array*/ = Array;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  ;
  var PL$2/*errorMsg*/ = PL$3/*extra*/["errorMsg"];
  ;
  return (function(PL$4/*classSystem*/, PL$5/*internals*/){
  var PL$27/*indentCode*/;
  var PL$42/*assembleResult*/;
  var PL$18/*assembleCode*/;
  
    ;
    var PL$6/*cs*/ = PL$4/*classSystem*/;
    ;
    var PL$7/*classHider*/ = PL$5/*internals*/["classHider"];
    ;
    var PL$8/*getClass*/ = PL$5/*internals*/["getClass"];
    ;
    var PL$9/*TrackedPromise*/ = PL$5/*internals*/["TrackedPromise"];
    ;
    var PL$10/*DynInstance*/ = PL$5/*internals*/["DynInstance"];
    ;
    var PL$11/*stringEncodeStr*/ = PL$5/*internals*/["stringEncodeStr"];
    ;
    var PL$12/*makro*/ = PL$5/*internals*/["makro"];
    ;
    var PL$13/*pcs*/ = PL$5/*internals*/["privateClassSystem"];
    ;
    var PL$14/*runtimeError*/ = (function(PL$15/*par*/, PL$16/*par2*/){
    
      ;
      if((PL$16/*par2*/ && PL$16/*par2*/["errorFun"])){
        PL$16/*par2*/["errorFun"](PL$15/*par*/);
      };
      ;
      return (((("(function(){ throw { id:" + PL$15/*par*/["id"]) + ", msg: ") + PL$11/*stringEncodeStr*/(PL$15/*par*/["msg"])) + " } })()");
      ;});
    ;
    PL$5/*internals*/["runtimeError"] = PL$14/*runtimeError*/;
    PL$6/*cs*/["getGetPropertyCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$17/*cDef*/ = PL$8/*getClass*/(PL$15/*par*/["type"]);
      ;
      if(PL$17/*cDef*/["isVar"]){
        if((PL$15/*par*/["asmMode"] && ! PL$15/*par*/["propertyValue"])){
          return PL$18/*assembleCode*/([
            PL$12/*makro*/["SELF"], 
            ".", 
            PL$15/*par*/["property"]
          ], PL$15/*par*/);
        };
        ;
        return PL$18/*assembleCode*/([
          PL$12/*makro*/["SELF"], 
          "[", 
          PL$12/*makro*/["PROPERTYVALUE"], 
          "]"
        ], PL$15/*par*/);
      };
      ;
      var PL$19/*map*/ = PL$17/*cDef*/["map"];
      ;
      if(PL$15/*par*/["property"]){
        if(PL$19/*map*/["members"][PL$15/*par*/["property"]]){
          return PL$18/*assembleCode*/(PL$19/*map*/["members"][PL$15/*par*/["property"]]["getCode"], PL$15/*par*/);
        };
        ;
      };
      ;
      if(PL$19/*map*/["getMemberCode"]){
        return PL$18/*assembleCode*/(PL$19/*map*/["getMemberCode"], PL$15/*par*/);
      };
      ;
      return PL$14/*runtimeError*/(PL$2/*errorMsg*/["accessNotAllowd"], PL$15/*par*/);
      ;});
    PL$6/*cs*/["getSetPropertyCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$17/*cDef*/ = PL$8/*getClass*/(PL$15/*par*/["type"]);
      ;
      if(PL$17/*cDef*/["isVar"]){
        if(! this["canSet"](this["getBuiltinType"]("var"), PL$15/*par*/["valueType"])){
          return PL$14/*runtimeError*/(PL$2/*errorMsg*/["typeMissmatch"], PL$15/*par*/);
        };
        ;
        return PL$18/*assembleCode*/([
          PL$12/*makro*/["SELF"], 
          "[", 
          PL$12/*makro*/["PROPERTYVALUE"], 
          "] ", 
          PL$12/*makro*/["OPERATOR"], 
          " ", 
          PL$12/*makro*/["VALUE"]
        ], PL$15/*par*/);
      };
      ;
      var PL$19/*map*/ = PL$17/*cDef*/["map"];
      ;
      if((PL$19/*map*/ && PL$15/*par*/["property"])){
        if(PL$19/*map*/["members"][PL$15/*par*/["property"]]){
          var PL$20/*propertyType*/ = this["getPropertyType"]({
            "type": PL$15/*par*/["type"],
            "property": PL$15/*par*/["property"]
          });
          ;
          if(! this["canSet"](PL$20/*propertyType*/, PL$15/*par*/["valueType"])){
            if(this["canSet"](PL$20/*propertyType*/, this["getClassFromTemporaryTracked"](PL$15/*par*/["valueType"]))){
              return PL$18/*assembleCode*/(PL$19/*map*/["members"][PL$15/*par*/["property"]]["setCodeFromTemporary"], PL$15/*par*/);
            };
            ;
            return PL$14/*runtimeError*/(PL$2/*errorMsg*/["typeMissmatch"], PL$15/*par*/);
          };
          ;
          return PL$18/*assembleCode*/(PL$19/*map*/["members"][PL$15/*par*/["property"]]["setCode"], PL$15/*par*/);
        };
        ;
      };
      ;
      if((PL$19/*map*/ && PL$19/*map*/["setMemberCode"])){
        if(! this["canSet"](this["getBuiltinType"]("var"), PL$15/*par*/["valueType"])){
          return PL$14/*runtimeError*/(PL$2/*errorMsg*/["typeMissmatch"], PL$15/*par*/);
        };
        ;
        return PL$18/*assembleCode*/(PL$19/*map*/["setMemberCode"], PL$15/*par*/);
      };
      ;
      return PL$14/*runtimeError*/(PL$2/*errorMsg*/["accessNotAllowd"], PL$15/*par*/);
      ;});
    PL$6/*cs*/["getConnectCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$17/*cDef*/ = PL$8/*getClass*/(PL$15/*par*/["type"]);
      ;
      var PL$19/*map*/ = PL$17/*cDef*/["map"];
      ;
      if(PL$15/*par*/["valueProperty"]){
        var PL$21/*valuePropertyType*/ = this["getPropertyType"]({
          "type": PL$15/*par*/["valueType"],
          "property": PL$15/*par*/["valueProperty"]
        });
        ;
        if(! this["canConnect"](PL$15/*par*/["type"], PL$15/*par*/["property"], PL$21/*valuePropertyType*/)){
          return PL$14/*runtimeError*/(PL$2/*errorMsg*/["connectNotPossible"], PL$15/*par*/);
        };
        ;
        PL$15/*par*/["valueProperty"] = ("" + this["getPropertyAlias"]({
          "type": PL$15/*par*/["valueType"],
          "property": PL$15/*par*/["valueProperty"]
        }));
        return PL$18/*assembleCode*/(PL$19/*map*/["members"][PL$15/*par*/["property"]]["connectSlotCode"], PL$15/*par*/);
      }else{
      if(! this["canConnect"](PL$15/*par*/["type"], PL$15/*par*/["property"], PL$15/*par*/["valueType"])){
        return PL$14/*runtimeError*/(PL$2/*errorMsg*/["connectNotPossible"], PL$15/*par*/);
      };
      ;
      return PL$18/*assembleCode*/(PL$19/*map*/["members"][PL$15/*par*/["property"]]["connectFunCode"], PL$15/*par*/);
      };
      ;
      return PL$14/*runtimeError*/(PL$2/*errorMsg*/["connectNotPossible"], PL$15/*par*/);
      ;});
    PL$6/*cs*/["getPassAsTypeCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$17/*cDef*/ = PL$8/*getClass*/(PL$15/*par*/["type"]);
      ;
      var PL$22/*vcDef*/ = PL$8/*getClass*/(PL$15/*par*/["valueType"]);
      ;
      if(PL$15/*par*/["value"]){
        PL$15/*par*/["instance"] = PL$15/*par*/["value"];
        return PL$18/*assembleCode*/(PL$13/*pcs*/["getCasting"](PL$15/*par*/["type"], PL$15/*par*/["valueType"], PL$15/*par*/["errorFun"]), PL$15/*par*/);
      };
      ;
      return PL$14/*runtimeError*/(PL$2/*errorMsg*/["missingVariable"], PL$15/*par*/);
      ;});
    PL$13/*pcs*/["createTemporaryClassMakro"] = (function(PL$23/*parType*/, PL$24/*parValue*/){
    
      ;
      if(PL$6/*cs*/["isTemporaryTrackedClass"](PL$23/*parType*/)){
        return [
          PL$12/*makro*/["VALUE"]
        ];
      };
      ;
      if(! PL$6/*cs*/["isTrackedClass"](PL$23/*parType*/)){
        return [
          PL$12/*makro*/["VALUE"]
        ];
      };
      ;
      var PL$17/*cDef*/ = PL$8/*getClass*/(PL$23/*parType*/);
      ;
      var PL$25/*codeAr*/ = [
        (("(function(v){ if(!v){ return; }; return [v, v[" + PL$17/*cDef*/["map"]["trackRootIdx"]) + "]()];})("), 
        (PL$24/*parValue*/ || PL$12/*makro*/["VALUE"]), 
        ")"
      ];
      ;
      return PL$25/*codeAr*/;
      ;});
    PL$6/*cs*/["getCreateTemporaryClassCode"] = (function(PL$15/*par*/){
    
      ;
      return PL$18/*assembleCode*/(PL$13/*pcs*/["createTemporaryClassMakro"](PL$15/*par*/["valueType"]), PL$15/*par*/);
      ;});
    PL$6/*cs*/["getDestroyTemporaryClassCode"] = (function(PL$15/*par*/){
    
      ;
      if(! this["isTemporaryTrackedClass"](PL$15/*par*/["valueType"])){
        if(PL$15/*par*/["noValueRequired"]){
          return PL$18/*assembleCode*/([
            
          ], PL$15/*par*/);
        };
        ;
        return PL$18/*assembleCode*/([
          PL$12/*makro*/["VALUE"]
        ], PL$15/*par*/);
      };
      ;
      var PL$25/*codeAr*/ = [
        "(function(v){ v[1](); return v[0]; })(", 
        PL$12/*makro*/["VALUE"], 
        ")"
      ];
      ;
      return PL$18/*assembleCode*/(PL$25/*codeAr*/, PL$15/*par*/);
      ;});
    PL$6/*cs*/["dereferencePromisePreCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$25/*codeAr*/ = [
        PL$12/*makro*/["VALUE"], 
        ".then("
      ];
      ;
      if(this["isTemporaryTrackedClass"](PL$15/*par*/["valueType"])){
        PL$25/*codeAr*/ = [
          "/*temptracked promise*/(function(vAr){", 
          PL$12/*makro*/["NEWLINE"], 
          "var r = vAr[0].thenReuse(vAr[1], "
        ];
      };
      ;
      return PL$18/*assembleCode*/(PL$25/*codeAr*/, PL$15/*par*/);
      ;});
    PL$6/*cs*/["dereferencePromisePostCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$25/*codeAr*/ = [
        ");", 
        PL$12/*makro*/["NEWLINE"]
      ];
      ;
      if(this["isTemporaryTrackedClass"](PL$15/*par*/["valueType"])){
        PL$25/*codeAr*/ = [
          ");", 
          PL$12/*makro*/["NEWLINE"], 
          "return r;", 
          PL$12/*makro*/["NEWLINE"], 
          "})(", 
          PL$12/*makro*/["VALUE"], 
          ");/*temptracked promise end*/", 
          PL$12/*makro*/["NEWLINE"], 
          ""
        ];
      };
      ;
      return PL$18/*assembleCode*/(PL$25/*codeAr*/, PL$15/*par*/);
      ;});
    PL$6/*cs*/["promisingReturnTypeCheck"] = (function(PL$15/*par*/){
    
      ;
      if(! this["isPromiseOfClass"](PL$15/*par*/["type"])){
        var PL$17/*cDef*/ = PL$8/*getClass*/(PL$15/*par*/["type"]);
        ;
        if(! PL$17/*cDef*/["isVar"]){
          return PL$14/*runtimeError*/(PL$2/*errorMsg*/["notAPromise"], PL$15/*par*/);
        };
        ;
      };
      ;
      return PL$18/*assembleCode*/([
        
      ], PL$15/*par*/);
      ;});
    PL$6/*cs*/["getSetVariableCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$17/*cDef*/ = PL$8/*getClass*/(PL$15/*par*/["type"]);
      ;
      var PL$22/*vcDef*/ = PL$8/*getClass*/(PL$15/*par*/["valueType"]);
      ;
      if(PL$15/*par*/["instance"]){
        var PL$26/*operator*/ = (PL$15/*par*/["operator"] || "=");
        ;
        if((PL$26/*operator*/ != "=")){
          if(! (PL$17/*cDef*/["isVar"] && PL$22/*vcDef*/["isVar"])){
            return PL$14/*runtimeError*/(PL$2/*errorMsg*/["operatorMissmatch"], PL$15/*par*/);
          };
          ;
        };
        ;
        if(! this["canSet"](PL$15/*par*/["type"], PL$15/*par*/["valueType"])){
          if(this["canSet"](PL$15/*par*/["type"], this["getClassFromTemporaryTracked"](PL$15/*par*/["valueType"]))){
            if((PL$15/*par*/["assignmentType"] == "Identifier")){
              return PL$18/*assembleCode*/([
                "/*temp tracked assign*/(function(vAr){", 
                PL$27/*indentCode*/([
                  "if (_T", 
                  PL$12/*makro*/["SELF"], 
                  "){ _T", 
                  PL$12/*makro*/["SELF"], 
                  "(); };", 
                  PL$12/*makro*/["NEWLINE"], 
                  "if(vAr){", 
                  PL$27/*indentCode*/([
                    "var v = vAr[0];", 
                    PL$12/*makro*/["NEWLINE"], 
                    PL$12/*makro*/["SELF"], 
                    " ", 
                    PL$26/*operator*/, 
                    " v;", 
                    PL$12/*makro*/["NEWLINE"], 
                    "_T", 
                    PL$12/*makro*/["SELF"], 
                    " = vAr[1];", 
                    PL$12/*makro*/["NEWLINE"], 
                    "return v;"
                  ]), 
                  "}else{", 
                  PL$27/*indentCode*/([
                    PL$12/*makro*/["SELF"], 
                    " ", 
                    PL$26/*operator*/, 
                    " undefined; ", 
                    PL$12/*makro*/["NEWLINE"], 
                    "_T", 
                    PL$12/*makro*/["SELF"], 
                    " = undefined;", 
                    PL$12/*makro*/["NEWLINE"], 
                    "return;"
                  ]), 
                  "};"
                ]), 
                "})", 
                "(", 
                PL$12/*makro*/["VALUE"], 
                ")/*end temp assign*/"
              ], PL$15/*par*/);
            };
            ;
          };
          ;
          return PL$14/*runtimeError*/(PL$2/*errorMsg*/["typeMissmatch"], PL$15/*par*/);
        };
        ;
        if(this["isTrackedClass"](PL$15/*par*/["type"])){
          if((PL$15/*par*/["assignmentType"] == "Identifier")){
            return PL$18/*assembleCode*/([
              "/*tracked assign*/(function(v){", 
              PL$12/*makro*/["NEWLINE"], 
              "if (_T", 
              PL$12/*makro*/["SELF"], 
              "){ _T", 
              PL$12/*makro*/["SELF"], 
              "(); };", 
              PL$12/*makro*/["NEWLINE"], 
              PL$12/*makro*/["SELF"], 
              " ", 
              PL$26/*operator*/, 
              " v;", 
              PL$12/*makro*/["NEWLINE"], 
              "if (v){", 
              PL$12/*makro*/["NEWLINE"], 
              "_T", 
              PL$12/*makro*/["SELF"], 
              ((" = v[" + PL$22/*vcDef*/["map"]["trackRootIdx"]) + "]();"), 
              PL$12/*makro*/["NEWLINE"], 
              "}else{", 
              PL$12/*makro*/["NEWLINE"], 
              "_T", 
              PL$12/*makro*/["SELF"], 
              " = undefined;", 
              PL$12/*makro*/["NEWLINE"], 
              "};", 
              PL$12/*makro*/["NEWLINE"], 
              "return v;", 
              PL$12/*makro*/["NEWLINE"], 
              "})", 
              "(", 
              PL$12/*makro*/["VALUE"], 
              ")/*end assign*/", 
              PL$12/*makro*/["NEWLINE"]
            ], PL$15/*par*/);
          };
          ;
          return PL$14/*runtimeError*/(PL$2/*errorMsg*/["typeMissmatch"], PL$15/*par*/);
        };
        ;
        return PL$18/*assembleCode*/([
          PL$12/*makro*/["SELF"], 
          " ", 
          PL$26/*operator*/, 
          " ", 
          PL$12/*makro*/["VALUE"]
        ], PL$15/*par*/);
      };
      ;
      return PL$14/*runtimeError*/(PL$2/*errorMsg*/["missingVariable"], PL$15/*par*/);
      ;});
    PL$6/*cs*/["declareReturnPromiseCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$28/*retType*/ = PL$15/*par*/["type"];
      ;
      var PL$29/*track*/ = false;
      ;
      if(this["isTemporaryTrackedClass"](PL$28/*retType*/)){
        PL$29/*track*/ = true;
        PL$28/*retType*/ = this["getClassFromTemporaryTracked"](PL$28/*retType*/);
      };
      ;
      if(this["isTrackedClass"](PL$28/*retType*/)){
        PL$29/*track*/ = true;
      };
      ;
      var PL$30/*assemblyAr*/;
      ;
      if(PL$29/*track*/){
        PL$30/*assemblyAr*/ = [
          "var ", 
          PL$15/*par*/["name"], 
          ";", 
          PL$12/*makro*/["NEWLINE"], 
          "var _T", 
          PL$15/*par*/["name"], 
          ";", 
          PL$12/*makro*/["NEWLINE"], 
          "(function(){ var vAr = new ", 
          PL$12/*makro*/["CONSTRUCTOR"], 
          "(); ", 
          PL$15/*par*/["name"], 
          " = vAr[0]; _T", 
          PL$15/*par*/["name"], 
          " = vAr[1]; })();"
        ];
      }else{
      PL$30/*assemblyAr*/ = [
        "var ", 
        PL$15/*par*/["name"], 
        " = new __Promise();", 
        PL$12/*makro*/["NEWLINE"], 
        ""
      ];
      };
      ;
      return PL$18/*assembleCode*/(PL$30/*assemblyAr*/, PL$15/*par*/);
      ;});
    PL$6/*cs*/["returnReturnPromiseCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$28/*retType*/ = PL$15/*par*/["type"];
      ;
      var PL$29/*track*/ = false;
      ;
      if(this["isTemporaryTrackedClass"](PL$28/*retType*/)){
        PL$29/*track*/ = true;
        PL$28/*retType*/ = this["getClassFromTemporaryTracked"](PL$28/*retType*/);
      };
      ;
      if(this["isTrackedClass"](PL$28/*retType*/)){
        PL$29/*track*/ = true;
      };
      ;
      var PL$30/*assemblyAr*/;
      ;
      if(PL$29/*track*/){
        PL$30/*assemblyAr*/ = [
          "return [", 
          PL$15/*par*/["name"], 
          ", _T", 
          PL$15/*par*/["name"], 
          "];", 
          PL$12/*makro*/["NEWLINE"], 
          ""
        ];
      }else{
      PL$30/*assemblyAr*/ = [
        "return ", 
        PL$15/*par*/["name"], 
        ";", 
        PL$12/*makro*/["NEWLINE"], 
        ""
      ];
      };
      ;
      return PL$18/*assembleCode*/(PL$30/*assemblyAr*/, PL$15/*par*/);
      ;});
    PL$6/*cs*/["getDeclareVariableCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$17/*cDef*/ = PL$8/*getClass*/(PL$15/*par*/["type"]);
      ;
      var PL$30/*assemblyAr*/ = [
        
      ];
      ;
      if((PL$15/*par*/["declaration"] || PL$17/*cDef*/["needsInitialization"])){
        PL$30/*assemblyAr*/["push"]("var ");
        PL$30/*assemblyAr*/["push"](PL$15/*par*/["name"]);
        if(PL$15/*par*/["value"]){
          PL$30/*assemblyAr*/["push"](" = ");
          PL$30/*assemblyAr*/["push"]({
            "_internFun": "getPassAsTypeCode",
            "type": PL$15/*par*/["type"],
            "value": PL$15/*par*/["value"],
            "valueType": PL$15/*par*/["valueType"]
          });
        }else{
        if(PL$17/*cDef*/["initializationValue"]){
          PL$30/*assemblyAr*/["push"](" = ");
          var PL$31/*i*/ = 0;
          ;
          for(PL$31/*i*/ = 0;(PL$31/*i*/ < PL$17/*cDef*/["initializationValue"]["length"]);++PL$31/*i*/){{
            PL$30/*assemblyAr*/["push"](PL$17/*cDef*/["initializationValue"][PL$31/*i*/]);}};
          ;
        };
        };
        ;
        PL$30/*assemblyAr*/["push"](";");
        PL$30/*assemblyAr*/["push"](PL$12/*makro*/["NEWLINE"]);
      };
      ;
      if(PL$17/*cDef*/["track"]){
        PL$30/*assemblyAr*/["push"]("var _T");
        PL$30/*assemblyAr*/["push"](PL$15/*par*/["name"]);
        PL$30/*assemblyAr*/["push"](";");
        PL$30/*assemblyAr*/["push"](PL$12/*makro*/["NEWLINE"]);
      };
      ;
      return PL$18/*assembleCode*/(PL$30/*assemblyAr*/, PL$15/*par*/);
      ;});
    PL$6/*cs*/["getProcessParameterCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$17/*cDef*/ = PL$8/*getClass*/(PL$15/*par*/["type"]);
      ;
      var PL$30/*assemblyAr*/ = [
        
      ];
      ;
      if(PL$17/*cDef*/["track"]){
        PL$30/*assemblyAr*/["push"]("var _T");
        PL$30/*assemblyAr*/["push"](PL$15/*par*/["name"]);
        PL$30/*assemblyAr*/["push"](";");
        PL$30/*assemblyAr*/["push"](PL$12/*makro*/["NEWLINE"]);
        PL$30/*assemblyAr*/["push"]("if(");
        PL$30/*assemblyAr*/["push"](PL$15/*par*/["name"]);
        PL$30/*assemblyAr*/["push"]("){ _T");
        PL$30/*assemblyAr*/["push"](PL$15/*par*/["name"]);
        PL$30/*assemblyAr*/["push"](" = ");
        PL$30/*assemblyAr*/["push"](PL$15/*par*/["name"]);
        PL$30/*assemblyAr*/["push"]("[1];");
        PL$30/*assemblyAr*/["push"](PL$12/*makro*/["NEWLINE"]);
        PL$30/*assemblyAr*/["push"](PL$15/*par*/["name"]);
        PL$30/*assemblyAr*/["push"](" = ");
        PL$30/*assemblyAr*/["push"](PL$15/*par*/["name"]);
        PL$30/*assemblyAr*/["push"]("[0];}");
        PL$30/*assemblyAr*/["push"](PL$12/*makro*/["NEWLINE"]);
      };
      ;
      return PL$18/*assembleCode*/(PL$30/*assemblyAr*/, PL$15/*par*/);
      ;});
    PL$6/*cs*/["getDestroyVariableCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$17/*cDef*/ = PL$8/*getClass*/(PL$15/*par*/["type"]);
      ;
      var PL$30/*assemblyAr*/ = [
        
      ];
      ;
      if(PL$17/*cDef*/["track"]){
        PL$30/*assemblyAr*/["push"]("if (_T");
        PL$30/*assemblyAr*/["push"](PL$15/*par*/["name"]);
        PL$30/*assemblyAr*/["push"]("){ _T");
        PL$30/*assemblyAr*/["push"](PL$15/*par*/["name"]);
        PL$30/*assemblyAr*/["push"]("();};");
      };
      ;
      return PL$18/*assembleCode*/(PL$30/*assemblyAr*/, PL$15/*par*/);
      ;});
    PL$6/*cs*/["getCallCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$17/*cDef*/ = PL$8/*getClass*/(PL$15/*par*/["type"]);
      ;
      var PL$31/*i*/;
      ;
      var PL$32/*l*/;
      ;
      var PL$33/*args*/;
      ;
      var PL$30/*assemblyAr*/;
      ;
      if(PL$17/*cDef*/["isVar"]){
        PL$33/*args*/ = PL$15/*par*/["arguments"];
        PL$32/*l*/ = PL$33/*args*/["length"];
        PL$30/*assemblyAr*/ = [
          PL$12/*makro*/["SELF"], 
          "("
        ];
        for(PL$31/*i*/ = 0;(PL$31/*i*/ < PL$32/*l*/);++PL$31/*i*/){{
          if((PL$31/*i*/ > 0)){
            PL$30/*assemblyAr*/["push"](", ");
          };
          ;
          PL$30/*assemblyAr*/["push"]({
            "_internFun": "getPassAsTypeCode",
            "type": this["getBuiltinType"]("var"),
            "value": PL$33/*args*/[PL$31/*i*/]["value"],
            "valueType": PL$33/*args*/[PL$31/*i*/]["type"]
          });}};
        ;
        PL$30/*assemblyAr*/["push"](")");
        return PL$18/*assembleCode*/(PL$30/*assemblyAr*/, PL$15/*par*/);
      };
      ;
      if(! PL$17/*cDef*/["isFunction"]){
        return PL$14/*runtimeError*/(PL$2/*errorMsg*/["expectedCallable"], PL$15/*par*/);
      };
      ;
      PL$33/*args*/ = PL$15/*par*/["arguments"];
      PL$32/*l*/ = PL$33/*args*/["length"];
      PL$30/*assemblyAr*/ = [
        PL$12/*makro*/["SELF"], 
        "("
      ];
      for(PL$31/*i*/ = 0;(PL$31/*i*/ < PL$32/*l*/);++PL$31/*i*/){{
        if((PL$31/*i*/ > 0)){
          PL$30/*assemblyAr*/["push"](", ");
        };
        ;
        PL$30/*assemblyAr*/["push"]({
          "_internFun": "getPassAsTypeCode",
          "type": (PL$17/*cDef*/["arguments"][PL$31/*i*/] || this["getBuiltinType"]("var")),
          "value": PL$33/*args*/[PL$31/*i*/]["value"],
          "valueType": PL$33/*args*/[PL$31/*i*/]["type"]
        });}};
      ;
      PL$30/*assemblyAr*/["push"](")");
      return PL$18/*assembleCode*/(PL$30/*assemblyAr*/, PL$15/*par*/);
      ;});
    PL$6/*cs*/["getBinaryExpressionCode"] = (function(PL$15/*par*/){
    
      ;
      var PL$34/*lcDef*/ = PL$8/*getClass*/(PL$15/*par*/["leftType"]);
      ;
      var PL$35/*rcDef*/ = PL$8/*getClass*/(PL$15/*par*/["rightType"]);
      ;
      if((PL$34/*lcDef*/["isVar"] && PL$35/*rcDef*/["isVar"])){
        return PL$18/*assembleCode*/([
          "(", 
          PL$12/*makro*/["LEFT"], 
          " ", 
          PL$12/*makro*/["OPERATOR"], 
          " ", 
          PL$12/*makro*/["RIGHT"], 
          ")"
        ], PL$15/*par*/);
      };
      ;
      switch (PL$15/*par*/["operator"]){
        case "==":
          
        case "===":
          
        case "!=":
          
        case "!==":
          
          return PL$18/*assembleCode*/([
            "(", 
            PL$12/*makro*/["LEFT"], 
            " ", 
            PL$12/*makro*/["OPERATOR"], 
            " ", 
            PL$12/*makro*/["RIGHT"], 
            ")"
          ], PL$15/*par*/);
        
      };
      ;
      return PL$14/*runtimeError*/(PL$2/*errorMsg*/["operatorMissmatch"], PL$15/*par*/);
      ;});
    var PL$36/*presets*/ = {
      "getMemberCode": (function(PL$37/*freePart*/){
      
        ;
        return [
          PL$12/*makro*/["SELF"], 
          (("[" + PL$37/*freePart*/) + "]["), 
          PL$12/*makro*/["PROPERTYVALUE"], 
          "]"
        ];
        ;}),
      "setMemberCode": (function(PL$37/*freePart*/){
      
        ;
        return [
          PL$12/*makro*/["SELF"], 
          (("[" + PL$37/*freePart*/) + "]["), 
          PL$12/*makro*/["PROPERTYVALUE"], 
          "] ", 
          PL$12/*makro*/["OPERATOR"], 
          " ", 
          PL$12/*makro*/["VALUE"]
        ];
        ;})
    };
    ;
    PL$5/*internals*/["presets"] = PL$36/*presets*/;
    PL$27/*indentCode*/ = (function(PL$38/*ar*/){
    
      ;
      return {
        "_indentAssembly": true,
        "fun": (function(PL$15/*par*/, PL$39/*res*/){
        
          ;
          var PL$40/*indentRes*/ = PL$39/*res*/;
          ;
          var PL$41/*hasExtraRes*/ = false;
          ;
          if(PL$15/*par*/["getIndentRes"]){
            PL$40/*indentRes*/ = PL$15/*par*/["getIndentRes"]();
            PL$41/*hasExtraRes*/ = true;
          };
          ;
          PL$42/*assembleResult*/([
            PL$12/*makro*/["NEWLINE"]
          ], PL$15/*par*/, PL$40/*indentRes*/);
          PL$42/*assembleResult*/(PL$38/*ar*/, PL$15/*par*/, PL$40/*indentRes*/);
          if(PL$41/*hasExtraRes*/){
            PL$39/*res*/["push"](PL$40/*indentRes*/);
          };
          ;
          PL$42/*assembleResult*/([
            PL$12/*makro*/["NEWLINE"]
          ], PL$15/*par*/, PL$39/*res*/);
          ;})
      };
      ;});
    var PL$43/*_newResult*/ = (function(PL$15/*par*/){
    
      ;
      if(PL$15/*par*/["newResult"]){
        return PL$15/*par*/["newResult"]();
      };
      ;
      ;});
    ;
    PL$42/*assembleResult*/ = (function(PL$38/*ar*/, PL$15/*par*/, PL$39/*res*/){
    
      ;
      var PL$31/*i*/ = 0;
      ;
      for(PL$31/*i*/ = 0;(PL$31/*i*/ < PL$38/*ar*/["length"]);++PL$31/*i*/){{
        if((typeof PL$38/*ar*/[PL$31/*i*/] == "string")){
          PL$39/*res*/["push"](PL$38/*ar*/[PL$31/*i*/]);
        }else{
        if(PL$44/*Array*/["isArray"](PL$38/*ar*/[PL$31/*i*/])){
          PL$42/*assembleResult*/(PL$38/*ar*/[PL$31/*i*/], PL$15/*par*/, PL$39/*res*/);
        }else{
        if(PL$38/*ar*/[PL$31/*i*/]["_indentAssembly"]){
          PL$38/*ar*/[PL$31/*i*/]["fun"](PL$15/*par*/, PL$39/*res*/);
        }else{
        if(PL$38/*ar*/[PL$31/*i*/]["_internFun"]){
          var PL$45/*tempPar*/ = PL$38/*ar*/[PL$31/*i*/];
          ;
          PL$45/*tempPar*/["result"] = PL$43/*_newResult*/(PL$15/*par*/);
          PL$45/*tempPar*/["errorFun"] = PL$15/*par*/["errorFun"];
          PL$39/*res*/["push"](PL$4/*classSystem*/[PL$38/*ar*/[PL$31/*i*/]["_internFun"]](PL$45/*tempPar*/));
        }else{
        switch (PL$38/*ar*/[PL$31/*i*/]){
          case PL$12/*makro*/["SELF"]:
            
            PL$39/*res*/["push"](PL$15/*par*/["instance"]);
            break;;
          case PL$12/*makro*/["PROPERTY"]:
            
            PL$39/*res*/["push"](PL$15/*par*/["property"]);
            break;;
          case PL$12/*makro*/["PROPERTYSTRING"]:
            
            PL$39/*res*/["push"](PL$11/*stringEncodeStr*/(PL$15/*par*/["property"]));
            break;;
          case PL$12/*makro*/["PROPERTYVALUE"]:
            
            if(PL$15/*par*/["propertyValue"]){
              PL$39/*res*/["push"](PL$15/*par*/["propertyValue"]);
            }else{
            PL$39/*res*/["push"](PL$11/*stringEncodeStr*/(PL$15/*par*/["property"]));
            };
            ;
            break;;
          case PL$12/*makro*/["VALUE"]:
            
            PL$39/*res*/["push"](PL$15/*par*/["value"]);
            break;;
          case PL$12/*makro*/["VALUEPROPERTY"]:
            
            PL$39/*res*/["push"](PL$15/*par*/["valueProperty"]);
            break;;
          case PL$12/*makro*/["LEFT"]:
            
            PL$39/*res*/["push"](PL$15/*par*/["left"]);
            break;;
          case PL$12/*makro*/["RIGHT"]:
            
            PL$39/*res*/["push"](PL$15/*par*/["right"]);
            break;;
          case PL$12/*makro*/["OPERATOR"]:
            
            PL$39/*res*/["push"](PL$15/*par*/["operator"]);
            break;;
          case PL$12/*makro*/["RESOLVEFUN"]:
            
            PL$39/*res*/["push"]((PL$15/*par*/["resolveFun"] || "undefined"));
            break;;
          case PL$12/*makro*/["REJECTFUN"]:
            
            PL$39/*res*/["push"]((PL$15/*par*/["rejectFun"] || "undefined"));
            break;;
          case PL$12/*makro*/["TYPEVALUE"]:
            
            PL$39/*res*/["push"](PL$15/*par*/["typeValue"]);
            break;;
          case PL$12/*makro*/["CONSTRUCTOR"]:
            
            PL$39/*res*/["push"](PL$15/*par*/["constructorName"]);
            break;;
          case PL$12/*makro*/["NEWLINE"]:
            
            PL$39/*res*/["push"]((PL$15/*par*/["newLine"] || "\n"));
          
        };
        ;
        };
        };
        };
        };
        ;}};
      ;
      return PL$39/*res*/;
      ;});
    PL$18/*assembleCode*/ = (function(PL$38/*ar*/, PL$15/*par*/){
    
      ;
      var PL$46/*returnRes*/ = true;
      ;
      var PL$39/*res*/ = PL$15/*par*/["result"];
      ;
      var PL$47/*resStr*/ = "";
      ;
      if(! PL$39/*res*/){
        PL$46/*returnRes*/ = false;
        PL$39/*res*/ = {
          "push": (function(PL$48/*parStr*/){
          
            ;
            PL$47/*resStr*/ += PL$48/*parStr*/;
            ;})
        };
      };
      ;
      PL$42/*assembleResult*/(PL$38/*ar*/, PL$15/*par*/, PL$39/*res*/);
      if(PL$46/*returnRes*/){
        return PL$39/*res*/;
      };
      ;
      return PL$47/*resStr*/;
      ;});
    ;});
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();