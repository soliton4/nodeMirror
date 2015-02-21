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
  defineFun(["./classSystem/DynInstance", "./classSystem/Wrapper", "./classSystem/TrackedPromise", "./classSystem/provisional", "./classSystem/temporary", "./classSystem/promiseOf", "./classSystem/sync", "./classSystem/savable", "./classSystem/codeGeneration", "./Map", "./classSystem/makro"], function(PL$4/*DynInstance*/, PL$5/*Wrapper*/, PL$6/*TrackedPromise*/, PL$7/*provisional*/, PL$8/*temporary*/, PL$9/*promiseOf*/, PL$10/*sync*/, PL$11/*savable*/, PL$13/*codeGeneration*/, PL$14/*Map*/, PL$12/*makroModule*/){
var __execute = function(promiseland, extra){ __execute = undefined; var __require = requireFun;

var __Promise = promiseland.Promise;
var Promise = promiseland.Promise;
var Map = promiseland.Map;
if (promiseland._hasModule({ hashStr: "254d4bda343bf4cdd8ecb497318d854f" })){ return promiseland._getModule("254d4bda343bf4cdd8ecb497318d854f"); };
var PL$3/*extra*/;try{PL$3/*extra*/ = extra;}catch(e){};
var PL$35/*JSON*/;try{PL$35/*JSON*/ = JSON;}catch(e){};
var PL$53/*Object*/;try{PL$53/*Object*/ = Object;}catch(e){};
var PL$87/*Promise*/;try{PL$87/*Promise*/ = Promise;}catch(e){};
var PL$168/*promiseland*/;try{PL$168/*promiseland*/ = promiseland;}catch(e){};
var PL$207/*RegExp*/;try{PL$207/*RegExp*/ = RegExp;}catch(e){};
var PL$1 = (function(){
"use strict";
var PL$64/*pcs*/;
var PL$39/*classSystem*/;
var PL$61/*cs*/;
var PL$69/*internals*/;
var PL$175/*registerSyncClass*/;
var PL$172/*destroySynced*/;
var PL$122/*syncFun*/;
var PL$126/*syncFunctionFun*/;
var PL$101/*internalObjects*/;
var PL$100/*getNewInternalId*/;
var PL$51/*makro*/;
var PL$130/*runtimeError*/;
var PL$103/*presets*/;

  ;
  ;
  var PL$2/*errorMsg*/ = PL$3/*extra*/["errorMsg"];
  ;
  PL$4/*DynInstance*/ = PL$3/*extra*/["getModule"](PL$4/*DynInstance*/);
  PL$5/*Wrapper*/ = PL$3/*extra*/["getModule"](PL$5/*Wrapper*/);
  PL$6/*TrackedPromise*/ = PL$3/*extra*/["getModule"](PL$6/*TrackedPromise*/);
  PL$7/*provisional*/ = PL$3/*extra*/["getModule"](PL$7/*provisional*/);
  PL$8/*temporary*/ = PL$3/*extra*/["getModule"](PL$8/*temporary*/);
  PL$9/*promiseOf*/ = PL$3/*extra*/["getModule"](PL$9/*promiseOf*/);
  PL$10/*sync*/ = PL$3/*extra*/["getModule"](PL$10/*sync*/);
  PL$11/*savable*/ = PL$3/*extra*/["getModule"](PL$11/*savable*/);
  PL$12/*makroModule*/ = PL$3/*extra*/["getModule"](PL$12/*makroModule*/);
  PL$13/*codeGeneration*/ = PL$3/*extra*/["getModule"](PL$13/*codeGeneration*/);
  PL$14/*Map*/ = PL$3/*extra*/["getModule"](PL$14/*Map*/);
  var PL$15/*getModuleData*/;
  ;
  (function(){
  var PL$16 = new __Promise();
  var PL$18/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$16.reject(e);
      };
    };
  };
  var PL$19/*catch rejected*/ = function(e){
    PL$16.reject(e);
  };
  PL$18/*promiseland exception catcher*/(function(){
  
    ;
    PL$3/*extra*/["moduleSystemPs"].then(PL$18/*promiseland exception catcher*/(function(PL$20){PL$15/*getModuleData*/ = PL$20["getModuleData"];
    PL$16.resolve(); return;}), PL$19/*catch rejected*/);
    ;
  })();return PL$16;
  })();
  var PL$21/*Tracker*/;
  ;
  (function(){
  var PL$22 = new __Promise();
  var PL$24/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$22.reject(e);
      };
    };
  };
  var PL$25/*catch rejected*/ = function(e){
    PL$22.reject(e);
  };
  PL$24/*promiseland exception catcher*/(function(){
  
    ;
    PL$3/*extra*/["TrackerPs"].then(PL$24/*promiseland exception catcher*/(function(PL$26){PL$21/*Tracker*/ = PL$26["Tracker"];
    PL$22.resolve(); return;}), PL$25/*catch rejected*/);
    ;
  })();return PL$22;
  })();
  var PL$27/*Chainable*/;
  ;
  (function(){
  var PL$28 = new __Promise();
  var PL$30/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$28.reject(e);
      };
    };
  };
  var PL$31/*catch rejected*/ = function(e){
    PL$28.reject(e);
  };
  PL$30/*promiseland exception catcher*/(function(){
  
    ;
    PL$3/*extra*/["ChainablePs"].then(PL$30/*promiseland exception catcher*/(function(PL$32){PL$27/*Chainable*/ = PL$32["Chainable"];
    PL$28.resolve(); return;}), PL$31/*catch rejected*/);
    ;
  })();return PL$28;
  })();
  var PL$33/*stringify*/ = (function(PL$34/*par*/){
  
    ;
    return PL$35/*JSON*/["stringify"](PL$34/*par*/);
    ;});
  ;
  var PL$36/*stringifyInstance*/ = (function(PL$37/*parType*/, PL$38/*parInstance*/){
  
    ;
    if(! PL$39/*classSystem*/["isUniqueClass"](PL$37/*parType*/)){
      throw PL$2/*errorMsg*/["onlyUniqueCanBeStringified"];
    };
    ;
    ;});
  ;
  var PL$40/*_actClass*/;
  ;
  var PL$41/*getClass*/ = (function(PL$42/*cf*/){
  
    ;
    PL$40/*_actClass*/ = undefined;
    PL$42/*cf*/();
    return PL$40/*_actClass*/;
    ;});
  ;
  var PL$43/*classHider*/ = (function(PL$44/*toHide*/){
  
    ;
    return (function(){
    
      ;
      PL$40/*_actClass*/ = PL$44/*toHide*/;
      ;});
    ;});
  ;
  var PL$45/*buildInTypesMap*/ = new PL$14/*Map*/();
  ;
  PL$45/*buildInTypesMap*/["set"]("var", PL$43/*classHider*/({
    "isVar": true,
    "isReady": true,
    "availableByName": true,
    "builtin": true
  }));
  PL$45/*buildInTypesMap*/["set"]("statement", PL$43/*classHider*/({
    "isStatement": true,
    "isReady": true,
    "availableByName": false,
    "builtin": true
  }));
  PL$45/*buildInTypesMap*/["set"]("int", PL$43/*classHider*/({
    "isInt": true,
    "isReady": true,
    "availableByName": true,
    "builtin": true,
    "needsInitialization": true,
    "initializationValue": [
      "0"
    ]
  }));
  PL$45/*buildInTypesMap*/["set"]("double", PL$43/*classHider*/({
    "isDouble": true,
    "isReady": true,
    "availableByName": true,
    "builtin": true,
    "needsInitialization": true,
    "initializationValue": [
      "0.0"
    ]
  }));
  var PL$46/*addCast*/ = (function(PL$47/*parToType*/, PL$48/*parCast*/){
  
    ;
    var PL$49/*cDef*/ = PL$41/*getClass*/(PL$47/*parToType*/);
    ;
    if(! PL$49/*cDef*/["cast"]){
      PL$49/*cDef*/["cast"] = [
        
      ];
    };
    ;
    PL$49/*cDef*/["cast"]["push"](PL$48/*parCast*/);
    ;});
  ;
  var PL$50/*createCastings*/ = (function(){
  
    ;
    PL$46/*addCast*/(PL$45/*buildInTypesMap*/["get"]("var"), {
      "type": PL$45/*buildInTypesMap*/["get"]("int")
    });
    PL$46/*addCast*/(PL$45/*buildInTypesMap*/["get"]("int"), {
      "type": PL$45/*buildInTypesMap*/["get"]("var"),
      "makro": [
        "((", 
        PL$51/*makro*/["SELF"], 
        ")|0)"
      ]
    });
    PL$46/*addCast*/(PL$45/*buildInTypesMap*/["get"]("var"), {
      "type": PL$45/*buildInTypesMap*/["get"]("double")
    });
    PL$46/*addCast*/(PL$45/*buildInTypesMap*/["get"]("double"), {
      "type": PL$45/*buildInTypesMap*/["get"]("var"),
      "makro": [
        "(+(", 
        PL$51/*makro*/["SELF"], 
        "))"
      ]
    });
    ;});
  ;
  var PL$52/*hasOwnProperty*/ = PL$53/*Object*/["prototype"]["hasOwnProperty"];
  ;
  var PL$54/*privateClassSystem*/ = {
    "stringifyInstance": PL$36/*stringifyInstance*/,
    "stringify": PL$33/*stringify*/,
    "getMemberByName": (function(PL$37/*parType*/, PL$38/*parInstance*/, PL$55/*parMemberName*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      var PL$56/*mDef*/ = PL$49/*cDef*/["map"]["members"][PL$55/*parMemberName*/];
      ;
      if(PL$56/*mDef*/){
        return PL$38/*parInstance*/[PL$56/*mDef*/["index"]];
      };
      ;
      if((PL$49/*cDef*/["map"]["freePart"] !== undefined)){
        return PL$38/*parInstance*/[PL$49/*cDef*/["map"]["freePart"]][PL$55/*parMemberName*/];
      };
      ;
      return;
      ;}),
    "getCasting": (function(PL$47/*parToType*/, PL$57/*parFromType*/, PL$58/*parErrorFun*/){
    
      ;
      var PL$59/*fromCDef*/ = PL$41/*getClass*/(PL$57/*parFromType*/);
      ;
      var PL$60/*toCDef*/ = PL$41/*getClass*/(PL$47/*parToType*/);
      ;
      if(((PL$59/*fromCDef*/ === PL$60/*toCDef*/) || PL$61/*cs*/["isSameType"](PL$57/*parFromType*/, PL$47/*parToType*/))){
        return [
          PL$51/*makro*/["SELF"]
        ];
      };
      ;
      if(PL$60/*toCDef*/["cast"]){
        var PL$62/*casts*/ = PL$60/*toCDef*/["cast"];
        ;
        var PL$63/*i*/ = 0;
        ;
        for(PL$63/*i*/ = 0;(PL$63/*i*/ < PL$62/*casts*/["length"]);++PL$63/*i*/){{
          if((PL$62/*casts*/[PL$63/*i*/]["type"] === PL$57/*parFromType*/)){
            if(PL$62/*casts*/[PL$63/*i*/]["makro"]){
              return PL$62/*casts*/[PL$63/*i*/]["makro"];
            }else{
            return [
              PL$51/*makro*/["SELF"]
            ];
            };
            ;
          };
          ;}};
        ;
      };
      ;
      if(PL$61/*cs*/["isTemporaryTrackedClass"](PL$47/*parToType*/)){
        if(PL$61/*cs*/["isTemporaryTrackedClass"](PL$57/*parFromType*/)){
          return this["getCasting"](PL$61/*cs*/["getClassFromTemporaryTracked"](PL$47/*parToType*/), PL$61/*cs*/["getClassFromTemporaryTracked"](PL$57/*parFromType*/), PL$58/*parErrorFun*/);
        };
        ;
        return PL$64/*pcs*/["createTemporaryClassMakro"](PL$61/*cs*/["getClassFromTemporaryTracked"](PL$47/*parToType*/), this["getCasting"](PL$61/*cs*/["getClassFromTemporaryTracked"](PL$47/*parToType*/), PL$57/*parFromType*/));
      };
      ;
      if((((PL$61/*cs*/["isFunctionType"](PL$47/*parToType*/) && PL$61/*cs*/["isFunctionType"](PL$57/*parFromType*/)) && PL$61/*cs*/["canSet"](PL$61/*cs*/["getFunctionReturnType"](PL$47/*parToType*/), PL$61/*cs*/["getFunctionReturnType"](PL$57/*parFromType*/))) && (PL$60/*toCDef*/["parameters"]["length"] == PL$59/*fromCDef*/["parameters"]["length"]))){
        var PL$65/*allOk*/ = true;
        ;
        PL$63/*i*/ = 0;
        var PL$66/*l*/ = PL$60/*toCDef*/["parameters"]["length"];
        ;
        for(PL$63/*i*/;(PL$63/*i*/ < PL$66/*l*/);++PL$63/*i*/){{
          var PL$67/*tp*/ = PL$60/*toCDef*/["parameters"][PL$63/*i*/];
          ;
          var PL$68/*sp*/ = PL$59/*fromCDef*/["parameters"][PL$63/*i*/];
          ;
          if(! PL$61/*cs*/["canSet"](PL$68/*sp*/, PL$67/*tp*/)){
            PL$65/*allOk*/ = false;
          };
          ;}};
        ;
        if(PL$65/*allOk*/){
          return [
            PL$51/*makro*/["SELF"]
          ];
        };
        ;
      };
      ;
      debugger;
      return [
        PL$69/*internals*/["runtimeError"](PL$2/*errorMsg*/["typeMissmatch"], {
          "errorFun": PL$58/*parErrorFun*/
        })
      ];
      ;}),
    "getTrackerFromInstance": (function(PL$37/*parType*/, PL$38/*parInstance*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      return PL$38/*parInstance*/[PL$49/*cDef*/["map"]["trackerIdx"]];
      ;}),
    "setMemberByDefFromInstance": (function(PL$37/*parType*/, PL$38/*parInstance*/, PL$70/*parMemberDefinition*/, PL$71/*parValueInstance*/){
    
      ;
      var PL$72/*realInstance*/ = PL$54/*privateClassSystem*/["getRealInstance"](PL$37/*parType*/, PL$38/*parInstance*/);
      ;
      PL$72/*realInstance*/[PL$70/*parMemberDefinition*/["index"]] = PL$71/*parValueInstance*/;
      if(PL$39/*classSystem*/["isTrackedClass"](PL$70/*parMemberDefinition*/["type"])){
        var PL$73/*tracker*/ = PL$39/*classSystem*/["getTrackerFromInstance"](PL$37/*parType*/, PL$72/*realInstance*/);
        ;
        var PL$49/*cDef*/ = PL$41/*getClass*/(PL$70/*parMemberDefinition*/["type"]);
        ;
        var PL$74/*trackMemberIdx*/ = PL$49/*cDef*/["map"]["trackMemberIdx"];
        ;
        if(PL$72/*realInstance*/[PL$70/*parMemberDefinition*/["trackIndex"]]){
          PL$72/*realInstance*/[PL$70/*parMemberDefinition*/["trackIndex"]]();
        };
        ;
        PL$72/*realInstance*/[PL$70/*parMemberDefinition*/["trackIndex"]] = PL$71/*parValueInstance*/[PL$74/*trackMemberIdx*/](PL$73/*tracker*/);
      };
      ;
      ;}),
    "getRealInstance": (function(PL$37/*parType*/, PL$38/*parInstance*/){
    
      ;
      if(PL$39/*classSystem*/["isTemporaryTrackedClass"](PL$37/*parType*/)){
        return PL$38/*parInstance*/[0];
      };
      ;
      return PL$38/*parInstance*/;
      ;}),
    "getNonTemporaryType": (function(PL$37/*parType*/){
    
      ;
      if(PL$39/*classSystem*/["isTemporaryTrackedClass"](PL$37/*parType*/)){
        return PL$39/*classSystem*/["getClassFromTemporaryTracked"](PL$37/*parType*/);
      };
      ;
      return PL$37/*parType*/;
      ;}),
    "untrack": (function(PL$37/*parType*/, PL$38/*parInstance*/){
    
      ;
      if((PL$38/*parInstance*/ && PL$39/*classSystem*/["isTemporaryTrackedClass"](PL$37/*parType*/))){
        PL$38/*parInstance*/[1]();
      };
      ;
      ;}),
    "hasOwnProperty": (function(PL$75/*obj*/, PL$76/*property*/){
    
      ;
      return PL$52/*hasOwnProperty*/["apply"](PL$75/*obj*/, [
        PL$76/*property*/
      ]);
      ;}),
    "resolvePromise": (function(PL$37/*parType*/, PL$77/*parPromise*/, PL$38/*parInstance*/){
    
      ;
      this["getRealInstance"](PL$37/*parType*/, PL$77/*parPromise*/)["resolve"](PL$38/*parInstance*/);
      return PL$77/*parPromise*/;
      ;}),
    "rejectPromise": (function(PL$37/*parType*/, PL$77/*parPromise*/, PL$38/*parInstance*/){
    
      ;
      this["getRealInstance"](PL$37/*parType*/, PL$77/*parPromise*/)["reject"](PL$38/*parInstance*/);
      return PL$77/*parPromise*/;
      ;})
  };
  ;
  PL$64/*pcs*/ = PL$54/*privateClassSystem*/;
  PL$39/*classSystem*/ = {
    "isSameType": (function(PL$78/*type1*/, PL$79/*type2*/){
    
      ;
      if((PL$78/*type1*/ === PL$79/*type2*/)){
        return true;
      };
      ;
      var PL$80/*cDef1*/ = PL$41/*getClass*/(PL$78/*type1*/);
      ;
      if(PL$80/*cDef1*/["provisional"]){
        if(! PL$80/*cDef1*/["type"]){
          return false;
        };
        ;
        PL$78/*type1*/ = PL$80/*cDef1*/["type"];
        PL$80/*cDef1*/ = PL$41/*getClass*/(PL$78/*type1*/);
      };
      ;
      var PL$81/*cDef2*/ = PL$41/*getClass*/(PL$79/*type2*/);
      ;
      if(PL$81/*cDef2*/["provisional"]){
        if(! PL$81/*cDef2*/["type"]){
          return false;
        };
        ;
        PL$79/*type2*/ = PL$81/*cDef2*/["type"];
        PL$81/*cDef2*/ = PL$41/*getClass*/(PL$79/*type2*/);
      };
      ;
      if((PL$78/*type1*/ === PL$79/*type2*/)){
        return true;
      };
      ;
      return false;
      ;}),
    "createClass": (function(PL$82/*classLiteral*/, PL$83/*parDefaults*/){
    
      ;
      var PL$84/*self*/ = this;
      ;
      return PL$84/*self*/["_createClass"](PL$82/*classLiteral*/, PL$83/*parDefaults*/);
      ;}),
    "_membersDefined": (function(PL$82/*classLiteral*/){
    
      ;
      var PL$84/*self*/ = this;
      ;
      var PL$85/*cnt*/ = 1;
      ;
      var PL$86/*retPs*/ = new PL$87/*Promise*/();
      ;
      var PL$88/*check*/ = (function(){
      
        ;
        if(PL$85/*cnt*/){
          return;
        };
        ;
        PL$86/*retPs*/["resolve"](PL$82/*classLiteral*/);
        ;});
      ;
      var PL$89/*addMember*/ = (function(PL$90/*m*/){
      
        ;
        ++PL$85/*cnt*/;
        PL$84/*self*/["definitionPromise"](PL$90/*m*/["type"])["then"]((function(PL$91/*definedType*/){
        
          ;
          PL$90/*m*/["type"] = PL$91/*definedType*/;
          --PL$85/*cnt*/;
          PL$88/*check*/();
          ;}));
        ;});
      ;
      if(PL$82/*classLiteral*/["members"]){
        var PL$63/*i*/ = 0;
        ;
        for(PL$63/*i*/;(PL$63/*i*/ < PL$82/*classLiteral*/["members"]["length"]);++PL$63/*i*/){{
          PL$89/*addMember*/(PL$82/*classLiteral*/["members"][PL$63/*i*/]);}};
        ;
      };
      ;
      --PL$85/*cnt*/;
      PL$88/*check*/();
      return PL$86/*retPs*/;
      ;}),
    "_createClass": (function(PL$82/*classLiteral*/, PL$83/*parDefaults*/){
    
      ;
      var PL$92/*cAr*/ = [
        
      ];
      ;
      var PL$84/*self*/ = this;
      ;
      var PL$93/*map*/ = {
        "members": {
          
        },
        "membersByIndex": {
          
        },
        "membersAr": [
          
        ],
        "extends": [
          
        ]
      };
      ;
      var PL$49/*cDef*/ = {
        "constructor": undefined,
        "map": PL$93/*map*/,
        "isReady": false,
        "track": ((PL$82/*classLiteral*/["track"] || PL$82/*classLiteral*/["sync"]) ? true : false),
        "sync": PL$82/*classLiteral*/["sync"],
        "unique": PL$82/*classLiteral*/["unique"],
        "savable": PL$82/*classLiteral*/["savable"],
        "readyPromise": new PL$87/*Promise*/(),
        "syncMembers": [
          
        ],
        "moduleName": PL$82/*classLiteral*/["moduleName"],
        "className": PL$82/*classLiteral*/["className"],
        "moduleHash": PL$82/*classLiteral*/["hashStr"]
      };
      ;
      var PL$42/*cf*/ = PL$43/*classHider*/(PL$49/*cDef*/);
      ;
      if(PL$49/*cDef*/["sync"]){
        if(PL$49/*cDef*/["sync"]["serve"]){
          PL$49/*cDef*/["syncServe"] = true;
        };
        ;
      };
      ;
      if(PL$49/*cDef*/["savable"]){
        PL$49/*cDef*/["unique"] = true;
      };
      ;
      PL$92/*cAr*/["push"](PL$42/*cf*/);
      var PL$10/*sync*/ = (PL$82/*classLiteral*/["sync"] ? true : false);
      ;
      var PL$94/*syncAll*/ = false;
      ;
      if(PL$10/*sync*/){
        if(PL$82/*classLiteral*/["sync"]["all"]){
          PL$94/*syncAll*/ = true;
        };
        ;
      };
      ;
      var PL$95/*syncCnt*/ = 0;
      ;
      var PL$96/*trackerIdx*/;
      ;
      var PL$97/*trackRootIdx*/;
      ;
      var PL$74/*trackMemberIdx*/;
      ;
      if(PL$49/*cDef*/["track"]){
        PL$93/*map*/["trackerIdx"] = PL$92/*cAr*/["length"];
        PL$92/*cAr*/["push"](undefined);
        PL$93/*map*/["trackRootIdx"] = PL$92/*cAr*/["length"];
        PL$92/*cAr*/["push"](undefined);
        PL$93/*map*/["trackMemberIdx"] = PL$92/*cAr*/["length"];
        PL$92/*cAr*/["push"](undefined);
        PL$96/*trackerIdx*/ = PL$93/*map*/["trackerIdx"];
        PL$97/*trackRootIdx*/ = PL$93/*map*/["trackRootIdx"];
        PL$74/*trackMemberIdx*/ = PL$93/*map*/["trackMemberIdx"];
      };
      ;
      if(PL$10/*sync*/){
        PL$93/*map*/["syncDataIdx"] = PL$92/*cAr*/["length"];
        PL$92/*cAr*/["push"]((function(){
        
          ;
          var PL$84/*self*/ = this;
          ;
          var PL$98/*internalId*/;
          ;
          var PL$99/*syncData*/ = {
            "getInternalId": (function(){
            
              ;
              if(PL$98/*internalId*/){
                return PL$98/*internalId*/;
              };
              ;
              PL$98/*internalId*/ = PL$100/*getNewInternalId*/();
              PL$101/*internalObjects*/[PL$98/*internalId*/] = PL$84/*self*/;
              PL$99/*syncData*/["internalId"] = PL$98/*internalId*/;
              return PL$98/*internalId*/;
              ;}),
            "transports": [
              
            ]
          };
          ;
          this[PL$93/*map*/["syncDataIdx"]] = (function(){
          
            ;
            return PL$99/*syncData*/;
            ;});
          return PL$99/*syncData*/;
          ;}));
      };
      ;
      if(PL$82/*classLiteral*/["hasFreePart"]){
        var PL$102/*freepart*/ = {
          
        };
        ;
        PL$93/*map*/["freePart"] = PL$92/*cAr*/["length"];
        PL$92/*cAr*/["push"](PL$102/*freepart*/);
        PL$93/*map*/["getMemberCode"] = PL$103/*presets*/["getMemberCode"](PL$93/*map*/["freePart"]);
        PL$93/*map*/["setMemberCode"] = PL$103/*presets*/["setMemberCode"](PL$93/*map*/["freePart"]);
      };
      ;
      var PL$104/*helpAr*/ = [
        
      ];
      ;
      var PL$105/*makeHelpAr*/ = (function(){
      
        ;
        return PL$104/*helpAr*/["slice"]();
        ;});
      ;
      PL$93/*map*/["connectIdx"] = PL$92/*cAr*/["length"];
      var PL$106/*conIdx*/ = PL$93/*map*/["connectIdx"];
      ;
      PL$92/*cAr*/["push"]((function(){
      var PL$111/*arguments*/ = arguments;
      
        ;
        var PL$104/*helpAr*/ = PL$105/*makeHelpAr*/();
        ;
        this[PL$106/*conIdx*/] = (function(PL$107/*idx*/, PL$108/*fun*/, PL$109/*base*/){
        
          ;
          var PL$110/*chain*/ = PL$104/*helpAr*/[PL$107/*idx*/];
          ;
          if(! PL$110/*chain*/){
            PL$110/*chain*/ = PL$27/*Chainable*/(this, PL$107/*idx*/);
            PL$104/*helpAr*/[PL$107/*idx*/] = PL$110/*chain*/;
          };
          ;
          return PL$110/*chain*/(PL$108/*fun*/, PL$109/*base*/);
          ;});
        return this[PL$106/*conIdx*/]["apply"](this, PL$111/*arguments*/);
        ;}));
      var PL$112/*constructorDef*/;
      ;
      var PL$113/*constructorFun*/;
      ;
      var PL$114/*destroyDef*/;
      ;
      var PL$115/*destroyFun*/;
      ;
      var PL$116/*untrackIdxAr*/ = [
        
      ];
      ;
      var PL$89/*addMember*/ = (function(PL$90/*m*/){
      
        ;
        var PL$56/*mDef*/ = {
          "index": PL$92/*cAr*/["length"],
          "name": PL$90/*m*/["name"]
        };
        ;
        if((PL$94/*syncAll*/ || PL$90/*m*/["sync"])){
          PL$56/*mDef*/["sync"] = true;
        };
        ;
        if(PL$90/*m*/["meta"]){
          PL$56/*mDef*/["meta"] = PL$90/*m*/["meta"];
        };
        ;
        PL$56/*mDef*/["type"] = PL$90/*m*/["type"];
        var PL$117/*mType*/ = PL$90/*m*/["type"];
        ;
        var PL$118/*isFunction*/ = PL$84/*self*/["isFunctionType"](PL$56/*mDef*/["type"]);
        ;
        var PL$119/*memberIdx*/ = PL$56/*mDef*/["index"];
        ;
        var PL$120/*isTrackedMember*/ = PL$84/*self*/["isTrackedClass"](PL$56/*mDef*/["type"]);
        ;
        if(PL$49/*cDef*/["unique"]){
          if((PL$90/*m*/["name"] == "id")){
            PL$49/*cDef*/["idIndex"] = PL$119/*memberIdx*/;
            PL$49/*cDef*/["idDef"] = PL$56/*mDef*/;
          };
          ;
        };
        ;
        if(PL$56/*mDef*/["sync"]){
          PL$56/*mDef*/["hasSetter"] = true;
          if(PL$120/*isTrackedMember*/){
            PL$56/*mDef*/["defaultSetter"] = (function(PL$121/*vAr*/){
            
              ;
              PL$122/*syncFun*/(this, PL$119/*memberIdx*/, PL$117/*mType*/, PL$121/*vAr*/[0]);
              return PL$121/*vAr*/;
              ;});
          }else{
          PL$56/*mDef*/["defaultSetter"] = (function(PL$123/*v*/){
          
            ;
            PL$122/*syncFun*/(this, PL$119/*memberIdx*/, PL$117/*mType*/, PL$123/*v*/);
            return PL$123/*v*/;
            ;});
          };
          ;
          PL$49/*cDef*/["syncMembers"]["push"](PL$56/*mDef*/);
        };
        ;
        if(PL$90/*m*/["noSave"]){
          PL$56/*mDef*/["noSave"] = true;
        };
        ;
        PL$93/*map*/["members"][PL$90/*m*/["name"]] = PL$56/*mDef*/;
        PL$93/*map*/["membersByIndex"][PL$56/*mDef*/["index"]] = PL$56/*mDef*/;
        PL$93/*map*/["membersAr"]["push"](PL$56/*mDef*/);
        var PL$124/*def*/ = (PL$83/*parDefaults*/ ? PL$83/*parDefaults*/[PL$90/*m*/["name"]] : undefined);
        ;
        PL$56/*mDef*/["defaultValue"] = PL$124/*def*/;
        if((PL$118/*isFunction*/ && PL$56/*mDef*/["sync"])){
          if(! ((PL$90/*m*/["name"] == "constructor") || (PL$90/*m*/["name"] == "destroy"))){
            var PL$125/*originalFun*/ = PL$124/*def*/;
            ;
            PL$124/*def*/ = (function(){
            var PL$111/*arguments*/ = arguments;
            
              ;
              PL$126/*syncFunctionFun*/(this, PL$119/*memberIdx*/, PL$117/*mType*/, PL$111/*arguments*/);
              return PL$125/*originalFun*/["apply"](this, PL$111/*arguments*/);
              ;});
          };
          ;
        };
        ;
        PL$92/*cAr*/["push"](PL$124/*def*/);
        if(PL$56/*mDef*/["hasSetter"]){
          PL$56/*mDef*/["setterIdx"] = PL$92/*cAr*/["length"];
          PL$92/*cAr*/["push"](PL$56/*mDef*/["defaultSetter"]);
        };
        ;
        if((PL$90/*m*/["name"] == "constructor")){
          PL$112/*constructorDef*/ = PL$56/*mDef*/;
          PL$113/*constructorFun*/ = PL$124/*def*/;
        };
        ;
        if((PL$90/*m*/["name"] == "destroy")){
          PL$114/*destroyDef*/ = PL$56/*mDef*/;
          PL$115/*destroyFun*/ = PL$124/*def*/;
        };
        ;
        PL$56/*mDef*/["getCode"] = [
          PL$51/*makro*/["SELF"], 
          (("[" + PL$56/*mDef*/["index"]) + "]")
        ];
        if(PL$56/*mDef*/["hasSetter"]){
          PL$56/*mDef*/["setCode"] = [
            (((("(function(s, v){ v = s[" + PL$56/*mDef*/["setterIdx"]) + "](v); s[") + PL$56/*mDef*/["index"]) + "] "), 
            PL$51/*makro*/["OPERATOR"], 
            " v; return v; })(", 
            PL$51/*makro*/["SELF"], 
            ", ", 
            PL$51/*makro*/["VALUE"], 
            ")"
          ];
        }else{
        PL$56/*mDef*/["setCode"] = [
          PL$51/*makro*/["SELF"], 
          (("[" + PL$56/*mDef*/["index"]) + "] "), 
          PL$51/*makro*/["OPERATOR"], 
          " ", 
          PL$51/*makro*/["VALUE"]
        ];
        };
        ;
        if(PL$120/*isTrackedMember*/){
          var PL$127/*mCDef*/ = PL$41/*getClass*/(PL$56/*mDef*/["type"]);
          ;
          var PL$128/*memberTrackMemberIdx*/ = PL$127/*mCDef*/["map"]["trackMemberIdx"];
          ;
          var PL$129/*memberTrackRootIdx*/ = PL$127/*mCDef*/["map"]["trackRootIdx"];
          ;
          PL$56/*mDef*/["trackIndex"] = PL$92/*cAr*/["length"];
          PL$92/*cAr*/["push"](undefined);
          PL$116/*untrackIdxAr*/["push"](PL$56/*mDef*/["trackIndex"]);
          if(PL$49/*cDef*/["track"]){
            if(PL$56/*mDef*/["hasSetter"]){
              PL$56/*mDef*/["setCode"] = [
                (((((("(function(s, v){ var vAr = [v, v[" + PL$129/*memberTrackRootIdx*/) + "]()]; vAr = s[") + PL$56/*mDef*/["setterIdx"]) + "](vAr); s[") + PL$56/*mDef*/["index"]) + "] "), 
                PL$51/*makro*/["OPERATOR"], 
                ((((((((((" v; if(s[" + PL$56/*mDef*/["trackIndex"]) + "]){ s[") + PL$56/*mDef*/["trackIndex"]) + "](); }; s[") + PL$56/*mDef*/["trackIndex"]) + "] = v[") + PL$128/*memberTrackMemberIdx*/) + "](s[") + PL$96/*trackerIdx*/) + "]); vAr[1](); return v; })("), 
                PL$51/*makro*/["SELF"], 
                ", ", 
                PL$51/*makro*/["VALUE"], 
                ")"
              ];
              PL$56/*mDef*/["setCodeFromTemporary"] = [
                (((("(function(s, vAr){ vAr = s[" + PL$56/*mDef*/["setterIdx"]) + "](vAr); var v = vAr[0]; s[") + PL$56/*mDef*/["index"]) + "] "), 
                PL$51/*makro*/["OPERATOR"], 
                ((((((((((" v; if(s[" + PL$56/*mDef*/["trackIndex"]) + "]){ s[") + PL$56/*mDef*/["trackIndex"]) + "](); }; s[") + PL$56/*mDef*/["trackIndex"]) + "] = v[") + PL$128/*memberTrackMemberIdx*/) + "](s[") + PL$96/*trackerIdx*/) + "]); vAr[1](); return v; })("), 
                PL$51/*makro*/["SELF"], 
                ", ", 
                PL$51/*makro*/["VALUE"], 
                ")"
              ];
            }else{
            PL$56/*mDef*/["setCode"] = [
              (("(function(s, v){ s[" + PL$56/*mDef*/["index"]) + "] "), 
              PL$51/*makro*/["OPERATOR"], 
              ((((((((((" v; if(s[" + PL$56/*mDef*/["trackIndex"]) + "]){ s[") + PL$56/*mDef*/["trackIndex"]) + "](); }; s[") + PL$56/*mDef*/["trackIndex"]) + "] = v[") + PL$128/*memberTrackMemberIdx*/) + "](s[") + PL$96/*trackerIdx*/) + "]); return v; })("), 
              PL$51/*makro*/["SELF"], 
              ", ", 
              PL$51/*makro*/["VALUE"], 
              ")"
            ];
            PL$56/*mDef*/["setCodeFromTemporary"] = [
              (("(function(s, vAr){ var v = vAr[0]; s[" + PL$56/*mDef*/["index"]) + "] "), 
              PL$51/*makro*/["OPERATOR"], 
              ((((((((((" v; if(s[" + PL$56/*mDef*/["trackIndex"]) + "]){ s[") + PL$56/*mDef*/["trackIndex"]) + "](); }; s[") + PL$56/*mDef*/["trackIndex"]) + "] = v[") + PL$128/*memberTrackMemberIdx*/) + "](s[") + PL$96/*trackerIdx*/) + "]); vAr[1](); return v; })("), 
              PL$51/*makro*/["SELF"], 
              ", ", 
              PL$51/*makro*/["VALUE"], 
              ")"
            ];
            };
            ;
          }else{
          PL$56/*mDef*/["setCode"] = [
            PL$130/*runtimeError*/(PL$2/*errorMsg*/["onlyTrackedClassesCanContainTrackedMembers"])
          ];
          PL$56/*mDef*/["setCodeFromTemporary"] = [
            PL$130/*runtimeError*/(PL$2/*errorMsg*/["onlyTrackedClassesCanContainTrackedMembers"])
          ];
          };
          ;
        };
        ;
        PL$56/*mDef*/["connectFunCode"] = [
          PL$51/*makro*/["SELF"], 
          (((("[" + PL$93/*map*/["connectIdx"]) + "](") + PL$56/*mDef*/["index"]) + ", "), 
          PL$51/*makro*/["VALUE"], 
          ")"
        ];
        PL$56/*mDef*/["connectSlotCode"] = [
          PL$51/*makro*/["SELF"], 
          (((("[" + PL$93/*map*/["connectIdx"]) + "](") + PL$56/*mDef*/["index"]) + ", "), 
          PL$51/*makro*/["VALUE"], 
          "[", 
          PL$51/*makro*/["VALUEPROPERTY"], 
          "], ", 
          PL$51/*makro*/["VALUE"], 
          ")"
        ];
        ;});
      ;
      var PL$131/*createMembersPs*/ = (function(){
      
        ;
        var PL$132/*donePs*/ = new PL$87/*Promise*/();
        ;
        PL$84/*self*/["_membersDefined"](PL$82/*classLiteral*/)["then"]((function(){
        
          ;
          var PL$63/*i*/;
          ;
          var PL$133/*passedConstructorType*/;
          ;
          if(PL$82/*classLiteral*/["members"]){
            for(PL$63/*i*/ = 0;(PL$63/*i*/ < PL$82/*classLiteral*/["members"]["length"]);++PL$63/*i*/){{
              var PL$90/*m*/ = PL$82/*classLiteral*/["members"][PL$63/*i*/];
              ;
              if((PL$90/*m*/["name"] == "constructor")){
                PL$133/*passedConstructorType*/ = PL$90/*m*/["type"];
                break;;
              };
              ;}};
            ;
          };
          ;
          if(PL$133/*passedConstructorType*/){
            var PL$134/*conDef*/ = PL$41/*getClass*/(PL$133/*passedConstructorType*/);
            ;
            PL$49/*cDef*/["constructorType"] = PL$84/*self*/["createFunctionType"]({
              "return": PL$42/*cf*/,
              "arguments": PL$134/*conDef*/["arguments"]
            });
          }else{
          PL$49/*cDef*/["constructorType"] = PL$84/*self*/["createFunctionType"]({
            "return": PL$42/*cf*/
          });
          };
          ;
          PL$49/*cDef*/["constructorTypeIntern"] = PL$49/*cDef*/["constructorType"];
          if(PL$49/*cDef*/["unique"]){
            PL$82/*classLiteral*/["members"] = (PL$82/*classLiteral*/["members"] || [
              
            ]);
            PL$49/*cDef*/["idType"] = PL$84/*self*/["getFunctionArgumentType"](PL$49/*cDef*/["constructorTypeIntern"], 0);
            PL$82/*classLiteral*/["members"]["unshift"]({
              "name": "id",
              "type": PL$49/*cDef*/["idType"]
            });
            if(PL$49/*cDef*/["savable"]){
              PL$82/*classLiteral*/["members"]["unshift"]({
                "name": "save",
                "type": PL$39/*classSystem*/["getBuiltinType"]("var"),
                "noSave": true
              });
              PL$83/*parDefaults*/["save"] = (function(){
              var PL$135 = new __Promise();
              var PL$137/*promiseland exception catcher*/ = function(code){
                return function(res){
                  try{ code(res); }catch(e){
                    PL$135.reject(e);
                  };
                };
              };
              var PL$138/*catch rejected*/ = function(e){
                PL$135.reject(e);
              };
              var PL$139/*this*/ = this;
              PL$137/*promiseland exception catcher*/(function(){
              
                ;
                PL$64/*pcs*/["saveInstance"](PL$42/*cf*/, PL$139/*this*/).then(PL$137/*promiseland exception catcher*/(function(PL$140){PL$140;
                PL$135.resolve(); return;}), PL$138/*catch rejected*/);
                ;
              })();return PL$135;
              });
              PL$82/*classLiteral*/["members"]["unshift"]({
                "name": "load",
                "type": PL$39/*classSystem*/["getBuiltinType"]("var"),
                "noSave": true
              });
              PL$83/*parDefaults*/["load"] = (function(){
              var PL$141 = new __Promise();
              var PL$143/*promiseland exception catcher*/ = function(code){
                return function(res){
                  try{ code(res); }catch(e){
                    PL$141.reject(e);
                  };
                };
              };
              var PL$144/*catch rejected*/ = function(e){
                PL$141.reject(e);
              };
              var PL$145/*this*/ = this;
              PL$143/*promiseland exception catcher*/(function(){
              
                ;
                PL$64/*pcs*/["loadInstance"](PL$42/*cf*/, PL$145/*this*/).then(PL$143/*promiseland exception catcher*/(function(PL$146){PL$146;
                PL$141.resolve(); return;}), PL$144/*catch rejected*/);
                ;
              })();return PL$141;
              });
              PL$134/*conDef*/ = PL$41/*getClass*/(PL$49/*cDef*/["constructorTypeIntern"]);
              PL$49/*cDef*/["constructorReturnType"] = PL$84/*self*/["_createPromiseOfClass"](PL$64/*pcs*/["getNonTemporaryType"](PL$134/*conDef*/["return"]));
              PL$49/*cDef*/["constructorType"] = PL$84/*self*/["createFunctionType"]({
                "return": PL$49/*cDef*/["constructorReturnType"],
                "arguments": PL$134/*conDef*/["arguments"]
              });
              PL$49/*cDef*/["constructorReturnType"] = PL$61/*cs*/["getFunctionReturnType"](PL$49/*cDef*/["constructorType"]);
            };
            ;
          };
          ;
          if(PL$82/*classLiteral*/["members"]){
            PL$63/*i*/ = 0;
            for(PL$63/*i*/;(PL$63/*i*/ < PL$82/*classLiteral*/["members"]["length"]);++PL$63/*i*/){{
              PL$89/*addMember*/(PL$82/*classLiteral*/["members"][PL$63/*i*/]);}};
            ;
          };
          ;
          PL$132/*donePs*/["resolve"]();
          ;}));
        return PL$132/*donePs*/;
        ;});
      ;
      var PL$147/*memberPs*/ = PL$131/*createMembersPs*/();
      ;
      var PL$63/*i*/;
      ;
      var PL$148/*finalPs*/ = new PL$87/*Promise*/();
      ;
      PL$147/*memberPs*/["then"]((function(){
      
        ;
        var PL$63/*i*/;
        ;
        var PL$149/*simpleConstructor*/ = true;
        ;
        var PL$150/*hasDestructor*/ = false;
        ;
        if((PL$49/*cDef*/["track"] || PL$49/*cDef*/["unique"])){
          PL$149/*simpleConstructor*/ = false;
        };
        ;
        if((PL$49/*cDef*/["track"] || PL$10/*sync*/)){
          PL$150/*hasDestructor*/ = true;
        };
        ;
        for(PL$63/*i*/ = 0;(PL$63/*i*/ < PL$92/*cAr*/["length"]);++PL$63/*i*/){{
          PL$104/*helpAr*/["push"](undefined);}};
        ;
        PL$49/*cDef*/["constructorArguments"] = [
          
        ];
        if(PL$149/*simpleConstructor*/){
          if(PL$82/*classLiteral*/["hasFreePart"]){
            var PL$151/*proto*/ = {
              
            };
            ;
            if(PL$83/*parDefaults*/){
              for(PL$63/*i*/ in PL$83/*parDefaults*/){
                if(! PL$93/*map*/["members"][PL$63/*i*/]){
                  PL$151/*proto*/[PL$63/*i*/] = PL$83/*parDefaults*/[PL$63/*i*/];
                };
                ;};
              ;
            };
            ;
            var PL$152/*freeFun*/ = (function(){
            
              ;
              ;});
            ;
            PL$152/*freeFun*/["prototype"] = PL$151/*proto*/;
            var PL$153/*f*/ = PL$93/*map*/["freePart"];
            ;
            PL$49/*cDef*/["constructor"] = (function(){
            
              ;
              var PL$154/*r*/ = PL$92/*cAr*/["slice"]();
              ;
              PL$154/*r*/[PL$153/*f*/] = new PL$152/*freeFun*/();
              return PL$154/*r*/;
              ;});
          }else{
          PL$49/*cDef*/["constructor"] = (function(){
          
            ;
            return PL$92/*cAr*/["slice"]();
            ;});
          };
          ;
          if(PL$112/*constructorDef*/){
            var PL$155/*realConstructor*/ = PL$49/*cDef*/["constructor"];
            ;
            PL$49/*cDef*/["constructor"] = (function(){
            var PL$111/*arguments*/ = arguments;
            
              ;
              var PL$156/*instance*/ = PL$155/*realConstructor*/();
              ;
              PL$113/*constructorFun*/["apply"](PL$156/*instance*/, PL$111/*arguments*/);
              return PL$156/*instance*/;
              ;});
          };
          ;
        }else{
        var PL$157/*constructorStr*/ = "";
        ;
        var PL$158/*importObj*/ = {
          
        };
        ;
        var PL$159/*importVar*/ = (function(PL$123/*v*/, PL$160/*name*/){
        
          ;
          PL$158/*importObj*/[PL$160/*name*/] = PL$123/*v*/;
          ;});
        ;
        PL$157/*constructorStr*/ += "var r;";
        if(PL$49/*cDef*/["unique"]){
          var PL$161/*uniqueMap*/ = new PL$14/*Map*/();
          ;
          var PL$162/*hasVarId*/ = PL$84/*self*/["isVar"](PL$49/*cDef*/["idType"]);
          ;
          var PL$163/*idType*/ = PL$49/*cDef*/["idType"];
          ;
          PL$159/*importVar*/(PL$163/*idType*/, "idType");
          var PL$164/*idDef*/ = PL$49/*cDef*/["idDef"];
          ;
          if(PL$49/*cDef*/["savable"]){
            PL$159/*importVar*/(PL$61/*cs*/, "cs");
            PL$159/*importVar*/(PL$49/*cDef*/, "cDef");
            PL$159/*importVar*/(PL$61/*cs*/["getTypeConstructor"](PL$64/*pcs*/["getNonTemporaryType"](PL$49/*cDef*/["constructorReturnType"])), "returnPromiseConstructor");
            PL$157/*constructorStr*/ += "var resPs = new returnPromiseConstructor;";
          };
          ;
          if(PL$162/*hasVarId*/){
            PL$159/*importVar*/(PL$33/*stringify*/, "stringify");
            PL$157/*constructorStr*/ += "var key = stringify(arguments[0]);";
          }else{
          PL$159/*importVar*/(PL$33/*stringify*/, "stringifyInstance");
          PL$157/*constructorStr*/ += "var key = stringifyInstance(idType, arguments[0]);";
          };
          ;
          PL$159/*importVar*/(PL$161/*uniqueMap*/, "uniqueMap");
          PL$159/*importVar*/(PL$54/*privateClassSystem*/, "privateClassSystem");
          PL$157/*constructorStr*/ += "r = uniqueMap.get(key);";
          PL$157/*constructorStr*/ += "if (r){";
          PL$157/*constructorStr*/ += "if (arguments[0]){";
          PL$157/*constructorStr*/ += "privateClassSystem.untrack(idType, arguments[0]);";
          PL$157/*constructorStr*/ += "};";
          PL$157/*constructorStr*/ += "}else{";
        };
        ;
        PL$159/*importVar*/(PL$92/*cAr*/, "cAr");
        PL$157/*constructorStr*/ += "r = cAr.slice();";
        if(PL$82/*classLiteral*/["hasFreePart"]){
          PL$151/*proto*/ = {
            
          };
          if(PL$83/*parDefaults*/){
            for(PL$63/*i*/ in PL$83/*parDefaults*/){
              if(! PL$93/*map*/["members"][PL$63/*i*/]){
                PL$151/*proto*/[PL$63/*i*/] = PL$83/*parDefaults*/[PL$63/*i*/];
              };
              ;};
            ;
          };
          ;
          PL$152/*freeFun*/ = (function(){
          
            ;
            ;});
          PL$152/*freeFun*/["prototype"] = PL$151/*proto*/;
          var PL$165/*freeIndex*/ = PL$93/*map*/["freePart"];
          ;
          PL$159/*importVar*/(PL$152/*freeFun*/, "freeFun");
          PL$159/*importVar*/(PL$165/*freeIndex*/, "freeIndex");
          PL$157/*constructorStr*/ += "r[freeIndex] = new freeFun();";
        };
        ;
        if(PL$49/*cDef*/["unique"]){
          PL$159/*importVar*/(PL$42/*cf*/, "cf");
          PL$159/*importVar*/(PL$164/*idDef*/, "idDef");
          PL$157/*constructorStr*/ += "privateClassSystem.setMemberByDefFromInstance(cf, r, idDef, arguments[0]);";
          PL$157/*constructorStr*/ += "uniqueMap.set(key, r);";
          PL$157/*constructorStr*/ += "r.map = uniqueMap;";
          PL$157/*constructorStr*/ += "r.key = key;";
          if(PL$49/*cDef*/["savable"]){
            PL$157/*constructorStr*/ += "var doLoad = true;";
          };
          ;
          PL$157/*constructorStr*/ += "};";
        };
        ;
        PL$157/*constructorStr*/ += "var realInstance = r;";
        if(PL$49/*cDef*/["track"]){
          PL$159/*importVar*/(PL$21/*Tracker*/, "Tracker");
          PL$159/*importVar*/((function(){
          var PL$111/*arguments*/ = arguments;
          
            ;
            PL$115/*destroyFun*/["apply"](this, PL$111/*arguments*/);
            ;}), "destroyFun");
          PL$159/*importVar*/(PL$96/*trackerIdx*/, "trackerIdx");
          PL$159/*importVar*/(PL$97/*trackRootIdx*/, "trackRootIdx");
          PL$159/*importVar*/(PL$74/*trackMemberIdx*/, "trackMemberIdx");
          PL$157/*constructorStr*/ += "var t = Tracker(function(){";
          PL$157/*constructorStr*/ += "destroyFun.apply(realInstance);";
          PL$157/*constructorStr*/ += "});";
          PL$157/*constructorStr*/ += "realInstance[trackerIdx] = t[0];";
          PL$157/*constructorStr*/ += "realInstance[trackRootIdx] = t[1];";
          PL$157/*constructorStr*/ += "realInstance[trackMemberIdx] = t[2];";
          PL$157/*constructorStr*/ += "r = [realInstance, realInstance[trackRootIdx]()];";
        };
        ;
        PL$157/*constructorStr*/ += "var nonPromiseResult = r;";
        if(PL$49/*cDef*/["savable"]){
          PL$159/*importVar*/(PL$64/*pcs*/, "pcs");
          PL$157/*constructorStr*/ += "if (doLoad){";
          PL$157/*constructorStr*/ += "pcs.loadInstance(cf, realInstance).then(function(){";
          PL$157/*constructorStr*/ += "pcs.resolvePromise(cDef.constructorReturnType, resPs, nonPromiseResult);";
          PL$157/*constructorStr*/ += "}, function(e){ pcs.rejectPromise(cDef.constructorReturnType, resPs, e); });";
          PL$157/*constructorStr*/ += "}else{";
          PL$157/*constructorStr*/ += "pcs.resolvePromise(cDef.constructorReturnType, resPs, nonPromiseResult);";
          PL$157/*constructorStr*/ += "};";
          PL$157/*constructorStr*/ += "r = resPs;";
        };
        ;
        if(PL$112/*constructorDef*/){
          PL$159/*importVar*/(PL$113/*constructorFun*/, "constructorFun");
          PL$157/*constructorStr*/ += "constructorFun.apply(realInstance, arguments);";
        };
        ;
        PL$157/*constructorStr*/ += "return r;";
        var PL$166/*constructorObj*/ = {
          
        };
        ;
        PL$159/*importVar*/(PL$166/*constructorObj*/, "constructorObj");
        var PL$167/*wrapStr*/ = (("constructorObj.fun = function(){" + PL$157/*constructorStr*/) + "};");
        ;
        PL$168/*promiseland*/["javascriptEval"](PL$167/*wrapStr*/, PL$158/*importObj*/);
        PL$49/*cDef*/["constructor"] = PL$166/*constructorObj*/["fun"];
        };
        ;
        if(PL$150/*hasDestructor*/){
          var PL$169/*destructorStr*/ = "";
          ;
          var PL$170/*destructorImportObj*/ = {
            
          };
          ;
          var PL$171/*destructorImportVar*/ = (function(PL$123/*v*/, PL$160/*name*/){
          
            ;
            PL$170/*destructorImportObj*/[PL$160/*name*/] = PL$123/*v*/;
            ;});
          ;
          if(PL$10/*sync*/){
            PL$171/*destructorImportVar*/(PL$172/*destroySynced*/, "destroySynced");
            PL$171/*destructorImportVar*/(PL$39/*classSystem*/, "classSystem");
            PL$169/*destructorStr*/ += "var syncData = classSystem.getSyncData(this);";
            PL$169/*destructorStr*/ += "destroySynced(syncData);";
          };
          ;
          if(PL$49/*cDef*/["track"]){
            var PL$173/*_destroyFun*/;
            ;
            if(PL$116/*untrackIdxAr*/["length"]){
              PL$171/*destructorImportVar*/(PL$116/*untrackIdxAr*/, "untrackIdxAr");
              PL$169/*destructorStr*/ += "var i;";
              PL$169/*destructorStr*/ += "for (i = 0; i < untrackIdxAr.length; ++i){";
              PL$169/*destructorStr*/ += "var curIdx = untrackIdxAr[i];";
              PL$169/*destructorStr*/ += "var tFun = this[curIdx];";
              PL$169/*destructorStr*/ += "this[curIdx] = undefined;";
              PL$169/*destructorStr*/ += "if (tFun){";
              PL$169/*destructorStr*/ += "tFun();";
              PL$169/*destructorStr*/ += "};";
              PL$169/*destructorStr*/ += "};";
            };
            ;
            if(PL$49/*cDef*/["unique"]){
              PL$169/*destructorStr*/ += "this.map.delete(this.key);";
            };
            ;
          };
          ;
          if(PL$114/*destroyDef*/){
            PL$171/*destructorImportVar*/(PL$115/*destroyFun*/, "_destroyFun");
            PL$169/*destructorStr*/ += "_destroyFun.apply(this);";
          };
          ;
          PL$169/*destructorStr*/ += "this.splice(0,this.length);";
          var PL$174/*destructorObj*/ = {
            
          };
          ;
          PL$171/*destructorImportVar*/(PL$174/*destructorObj*/, "destructorObj");
          PL$167/*wrapStr*/ = (("destructorObj.fun = function(){" + PL$169/*destructorStr*/) + "};");
          PL$168/*promiseland*/["javascriptEval"](PL$167/*wrapStr*/, PL$170/*destructorImportObj*/);
          PL$115/*destroyFun*/ = PL$174/*destructorObj*/["fun"];
        };
        ;
        PL$148/*finalPs*/["resolve"]();
        ;}));
      PL$148/*finalPs*/["then"]((function(){
      
        ;
        PL$49/*cDef*/["isReady"] = true;
        if(PL$49/*cDef*/["savable"]){
          PL$54/*privateClassSystem*/["registerSavableClass"](PL$42/*cf*/);
        };
        ;
        PL$49/*cDef*/["readyPromise"]["resolve"](PL$42/*cf*/);
        ;}));
      if(PL$10/*sync*/){
        if(PL$82/*classLiteral*/["name"]){
          PL$49/*cDef*/["syncId"] = {
            "hash": PL$82/*classLiteral*/["hashStr"],
            "name": PL$82/*classLiteral*/["name"]
          };
          PL$175/*registerSyncClass*/(PL$82/*classLiteral*/["hashStr"], PL$82/*classLiteral*/["name"], PL$42/*cf*/);
        };
        ;
      };
      ;
      return PL$42/*cf*/;
      ;}),
    "getConstructorReturnType": (function(PL$37/*parType*/){
    
      ;
      if(this["isProvisional"](PL$37/*parType*/)){
        var PL$176/*pr*/ = this["_createProvisionalClass"]();
        ;
        var PL$84/*self*/ = this;
        ;
        (function(){
        var PL$177 = new __Promise();
        var PL$179/*promiseland exception catcher*/ = function(code){
          return function(res){
            try{ code(res); }catch(e){
              PL$177.reject(e);
            };
          };
        };
        var PL$180/*catch rejected*/ = function(e){
          PL$177.reject(e);
        };
        var PL$91/*definedType*/;
        PL$179/*promiseland exception catcher*/(function(){
        
          ;
          PL$84/*self*/["definitionPromise"](PL$37/*parType*/).then(PL$179/*promiseland exception catcher*/(function(PL$181){PL$91/*definedType*/ = PL$181;
          PL$84/*self*/["_resolveProvisional"](PL$176/*pr*/, PL$84/*self*/["getConstructorReturnType"](PL$91/*definedType*/));
          PL$177.resolve(); return;}), PL$180/*catch rejected*/);
          ;
        })();return PL$177;
        })();
        return PL$176/*pr*/;
      };
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      if(PL$49/*cDef*/["constructorReturnType"]){
        return PL$49/*cDef*/["constructorReturnType"];
      };
      ;
      return PL$61/*cs*/["getFunctionReturnType"](PL$49/*cDef*/["constructorType"]);
      ;}),
    "getTypeFromInstance": (function(PL$38/*parInstance*/){
    
      ;
      if((typeof PL$38/*parInstance*/[0] === "function")){
        return PL$38/*parInstance*/[0];
      };
      ;
      if((PL$38/*parInstance*/["length"] === 2)){
        return this["_createTemporaryTrackedClass"](PL$38/*parInstance*/[0][0]);
      };
      ;
      throw PL$2/*errorMsg*/["unknownInstanceType"];
      ;}),
    "isFunctionType": (function(PL$37/*parType*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      if(PL$49/*cDef*/["isFunction"]){
        return true;
      };
      ;
      return false;
      ;}),
    "isTrackedClass": (function(PL$37/*parType*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      if(PL$49/*cDef*/["track"]){
        return true;
      };
      ;
      return false;
      ;}),
    "isUniqueClass": (function(PL$37/*parType*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      if(PL$49/*cDef*/["unique"]){
        return true;
      };
      ;
      return false;
      ;}),
    "createFunctionType": (function(PL$34/*par*/){
    var PL$183/*makeTemporaries*/;
    
      ;
      var PL$84/*self*/ = this;
      ;
      var PL$49/*cDef*/ = {
        "isFunction": true,
        "return": (PL$34/*par*/["return"] || this["getBuiltinType"]("var")),
        "arguments": (PL$34/*par*/["arguments"] || [
          
        ]),
        "isReady": false
      };
      ;
      var PL$182/*checkReady*/ = (function(){
      
        ;
        PL$183/*makeTemporaries*/();
        ;});
      ;
      PL$183/*makeTemporaries*/ = (function(){
      
        ;
        PL$49/*cDef*/["return"] = PL$84/*self*/["_createTemporaryTrackedClass"](PL$49/*cDef*/["return"]);
        var PL$63/*i*/ = 0;
        ;
        for(PL$63/*i*/ = 0;(PL$63/*i*/ < PL$49/*cDef*/["arguments"]["length"]);++PL$63/*i*/){{
          PL$49/*cDef*/["arguments"][PL$63/*i*/] = PL$84/*self*/["_createTemporaryTrackedClass"](PL$49/*cDef*/["arguments"][PL$63/*i*/]);}};
        ;
        ;});
      var PL$184/*isReady*/ = true;
      ;
      if(PL$84/*self*/["isProvisional"](PL$49/*cDef*/["return"])){
        PL$184/*isReady*/ = false;
        PL$84/*self*/["definitionPromise"](PL$49/*cDef*/["return"])["then"]((function(PL$37/*parType*/){
        
          ;
          PL$49/*cDef*/["return"] = PL$37/*parType*/;
          PL$182/*checkReady*/();
          ;}));
      };
      ;
      var PL$185/*resolveTypeFun*/ = (function(PL$186/*parI*/){
      
        ;
        return (function(PL$37/*parType*/){
        
          ;
          PL$49/*cDef*/["arguments"][PL$186/*parI*/] = PL$37/*parType*/;
          PL$182/*checkReady*/();
          ;});
        ;});
      ;
      var PL$63/*i*/ = 0;
      ;
      for(PL$63/*i*/ = 0;(PL$63/*i*/ < PL$49/*cDef*/["arguments"]["length"]);++PL$63/*i*/){{
        if(PL$84/*self*/["isProvisional"](PL$49/*cDef*/["arguments"][PL$63/*i*/])){
          PL$184/*isReady*/ = false;
          PL$84/*self*/["definitionPromise"](PL$49/*cDef*/["arguments"][PL$63/*i*/])["then"](PL$185/*resolveTypeFun*/(PL$63/*i*/));
        };
        ;}};
      ;
      var PL$42/*cf*/ = PL$43/*classHider*/(PL$49/*cDef*/);
      ;
      if(! PL$184/*isReady*/){
        PL$49/*cDef*/["readyPromise"] = new PL$87/*Promise*/();
        PL$182/*checkReady*/ = (function(){
        
          ;
          if(PL$84/*self*/["isProvisional"](PL$49/*cDef*/["return"])){
            return;
          };
          ;
          var PL$63/*i*/ = 0;
          ;
          for(PL$63/*i*/ = 0;(PL$63/*i*/ < PL$49/*cDef*/["arguments"]["length"]);++PL$63/*i*/){{
            if(PL$84/*self*/["isProvisional"](PL$49/*cDef*/["arguments"][PL$63/*i*/])){
              return;
            };
            ;}};
          ;
          PL$183/*makeTemporaries*/();
          PL$49/*cDef*/["isReady"] = true;
          PL$49/*cDef*/["readyPromise"]["resolve"](PL$42/*cf*/);
          ;});
        PL$182/*checkReady*/();
      }else{
      PL$182/*checkReady*/();
      PL$49/*cDef*/["isReady"] = true;
      };
      ;
      return PL$42/*cf*/;
      ;}),
    "isVar": (function(PL$37/*parType*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      if(PL$49/*cDef*/["isVar"]){
        return true;
      };
      ;
      return false;
      ;}),
    "isStatementType": (function(PL$37/*parType*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      if(PL$49/*cDef*/["isStatement"]){
        return true;
      };
      ;
      return false;
      ;}),
    "isAvailableByName": (function(PL$37/*parType*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      if(PL$49/*cDef*/["availableByName"]){
        return true;
      };
      ;
      return false;
      ;}),
    "getFunctionReturnType": (function(PL$37/*parType*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      if(PL$49/*cDef*/["isVar"]){
        return this["getBuiltinType"]("var");
      };
      ;
      return PL$49/*cDef*/["return"];
      ;}),
    "getFunctionArgumentCount": (function(PL$37/*parType*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      if(PL$49/*cDef*/["arguments"]){
        return PL$49/*cDef*/["arguments"]["length"];
      };
      ;
      return 0;
      ;}),
    "getFunctionArgumentType": (function(PL$37/*parType*/, PL$187/*parIndex*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      if((PL$49/*cDef*/["arguments"] && PL$49/*cDef*/["arguments"][PL$187/*parIndex*/])){
        return PL$49/*cDef*/["arguments"][PL$187/*parIndex*/];
      };
      return this["getBuiltinType"]("var");
      ;}),
    "getConstructorArgumentType": (function(PL$37/*parType*/, PL$187/*parIndex*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      var PL$188/*t*/;
      ;
      if(PL$49/*cDef*/["constructorArguments"]){
        PL$188/*t*/ = PL$49/*cDef*/["constructorArguments"][PL$187/*parIndex*/];
      };
      ;
      if(PL$188/*t*/){
        return PL$188/*t*/;
      };
      ;
      return this["getBuiltinType"]("var");
      ;}),
    "getTypeConstructor": (function(PL$37/*parType*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      return PL$49/*cDef*/["constructor"];
      ;}),
    "getBuiltinType": (function(PL$189/*parName*/){
    
      ;
      return PL$45/*buildInTypesMap*/["get"](PL$189/*parName*/);
      ;}),
    "getBuiltinTypesMap": (function(PL$189/*parName*/){
    
      ;
      return PL$45/*buildInTypesMap*/["clone"]();
      ;}),
    "getPropertyAlias": (function(PL$34/*par*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$34/*par*/["type"]);
      ;
      if(PL$49/*cDef*/["isVar"]){
        return PL$34/*par*/["property"];
      };
      ;
      var PL$93/*map*/ = PL$49/*cDef*/["map"];
      ;
      if(((PL$93/*map*/ && PL$93/*map*/["members"]) && PL$93/*map*/["members"][PL$34/*par*/["property"]])){
        return PL$93/*map*/["members"][PL$34/*par*/["property"]]["index"];
      };
      ;
      return PL$34/*par*/["property"];
      ;}),
    "getPropertyType": (function(PL$34/*par*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$34/*par*/["type"]);
      ;
      if(PL$49/*cDef*/["isVar"]){
        return this["getBuiltinType"]("var");
      };
      ;
      var PL$93/*map*/ = PL$49/*cDef*/["map"];
      ;
      if(PL$93/*map*/["members"][PL$34/*par*/["property"]]){
        if(PL$34/*par*/["original"]){
          return (PL$93/*map*/["members"][PL$34/*par*/["property"]]["originalType"] || PL$93/*map*/["members"][PL$34/*par*/["property"]]["type"]);
        }else{
        return PL$93/*map*/["members"][PL$34/*par*/["property"]]["type"];
        };
        ;
      };
      ;
      return this["getBuiltinType"]("var");
      ;}),
    "getConstructorType": (function(PL$34/*par*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$34/*par*/["type"]);
      ;
      if(PL$49/*cDef*/["isVar"]){
        return this["getBuiltinType"]("var");
      };
      ;
      if(PL$49/*cDef*/["constructorType"]){
        return PL$49/*cDef*/["constructorType"];
      };
      ;
      throw PL$2/*errorMsg*/["noConstructorAvailable"];
      ;}),
    "setMemberByDef": (function(PL$190/*parDynInstance*/, PL$70/*parMemberDefinition*/, PL$191/*parValueDynInstance*/){
    
      ;
      var PL$72/*realInstance*/ = PL$190/*parDynInstance*/["instance"];
      ;
      PL$72/*realInstance*/[PL$70/*parMemberDefinition*/["index"]] = PL$191/*parValueDynInstance*/["getInstanceAsType"](PL$70/*parMemberDefinition*/["type"]);
      if(this["isTrackedClass"](PL$70/*parMemberDefinition*/["type"])){
        var PL$73/*tracker*/ = this["getTrackerFromDynInstance"](PL$190/*parDynInstance*/);
        ;
        var PL$49/*cDef*/ = PL$41/*getClass*/(PL$191/*parValueDynInstance*/["type"]);
        ;
        var PL$74/*trackMemberIdx*/ = PL$49/*cDef*/["map"]["trackMemberIdx"];
        ;
        if(PL$72/*realInstance*/[PL$70/*parMemberDefinition*/["trackIndex"]]){
          PL$72/*realInstance*/[PL$70/*parMemberDefinition*/["trackIndex"]]();
        };
        ;
        PL$72/*realInstance*/[PL$70/*parMemberDefinition*/["trackIndex"]] = PL$191/*parValueDynInstance*/["instance"][PL$74/*trackMemberIdx*/](PL$73/*tracker*/);
      };
      ;
      ;}),
    "getTrack": (function(PL$38/*parInstance*/){
    
      ;
      if(! PL$38/*parInstance*/){
        return;
      };
      ;
      var PL$192/*type*/ = PL$38/*parInstance*/[0];
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$192/*type*/);
      ;
      return PL$38/*parInstance*/[PL$49/*cDef*/["map"]["trackRootIdx"]]();
      ;}),
    "canSet": (function(PL$193/*parTargetType*/, PL$194/*parSourceType*/){
    
      ;
      if(((PL$193/*parTargetType*/ === undefined) && (PL$194/*parSourceType*/ === undefined))){
        return true;
      };
      ;
      if(((PL$193/*parTargetType*/ === undefined) || (PL$194/*parSourceType*/ === undefined))){
        return false;
      };
      ;
      if((PL$193/*parTargetType*/ === PL$194/*parSourceType*/)){
        return true;
      };
      ;
      if(this["isTemporaryTrackedClass"](PL$194/*parSourceType*/)){
        if(this["isTemporaryTrackedClass"](PL$193/*parTargetType*/)){
          return this["canSet"](this["getClassFromTemporaryTracked"](PL$193/*parTargetType*/), this["getClassFromTemporaryTracked"](PL$194/*parSourceType*/));
        };
        ;
        return false;
      };
      ;
      if(this["isTemporaryTrackedClass"](PL$193/*parTargetType*/)){
        return this["canSet"](this["getClassFromTemporaryTracked"](PL$193/*parTargetType*/), PL$194/*parSourceType*/);
      };
      ;
      if((((PL$193/*parTargetType*/["isFunction"] && PL$194/*parSourceType*/["isFunction"]) && this["canSet"](PL$193/*parTargetType*/["returnType"], PL$194/*parSourceType*/["returnType"])) && (PL$193/*parTargetType*/["parameters"]["length"] == PL$194/*parSourceType*/["parameters"]["length"]))){
        var PL$65/*allOk*/ = true;
        ;
        var PL$63/*i*/ = 0;
        ;
        var PL$66/*l*/ = PL$193/*parTargetType*/["parameters"]["length"];
        ;
        for(PL$63/*i*/;(PL$63/*i*/ < PL$66/*l*/);++PL$63/*i*/){{
          var PL$67/*tp*/ = PL$193/*parTargetType*/["parameters"][PL$63/*i*/];
          ;
          var PL$68/*sp*/ = PL$194/*parSourceType*/["parameters"][PL$63/*i*/];
          ;
          if(! this["canSet"](PL$68/*sp*/, PL$67/*tp*/)){
            PL$65/*allOk*/ = false;
          };
          ;}};
        ;
        if(PL$65/*allOk*/){
          return true;
        };
        ;
      };
      ;
      return false;
      ;}),
    "canConnect": (function(PL$37/*parType*/, PL$195/*parProperty*/, PL$196/*parFunType*/){
    
      ;
      var PL$49/*cDef*/ = PL$41/*getClass*/(PL$37/*parType*/);
      ;
      var PL$93/*map*/ = PL$49/*cDef*/["map"];
      ;
      if(PL$93/*map*/["members"][PL$195/*parProperty*/]){
        var PL$56/*mDef*/ = PL$93/*map*/["members"][PL$195/*parProperty*/];
        ;
        var PL$197/*propertyType*/ = this["getPropertyType"]({
          "type": PL$37/*parType*/,
          "property": PL$195/*parProperty*/
        });
        ;
        if(! this["canSet"](PL$197/*propertyType*/, PL$196/*parFunType*/)){
          return false;
        };
        ;
        if(! (this["isVar"](PL$197/*propertyType*/) || this["isFunctionType"](PL$197/*propertyType*/))){
          return false;
        };
        ;
        if(! (this["isVar"](PL$196/*parFunType*/) || this["isFunctionType"](PL$196/*parFunType*/))){
          return false;
        };
        ;
        return true;
      };
      ;
      return false;
      ;})
  };
  PL$61/*cs*/ = PL$39/*classSystem*/;
  var PL$198/*getEffectiveFunctionResultType*/ = (function(PL$196/*parFunType*/){
  
    ;
    var PL$199/*res*/ = {
      "promiseResolveType": PL$39/*classSystem*/["getBuiltinType"]("var"),
      "isTemporary": false,
      "originalResultType": PL$39/*classSystem*/["getFunctionReturnType"](PL$196/*parFunType*/),
      "resolvePromise": (function(PL$77/*parPromise*/, PL$200/*parValue*/){
      
        ;
        PL$77/*parPromise*/["resolve"](PL$200/*parValue*/);
        ;}),
      "rejectPromise": (function(PL$77/*parPromise*/, PL$200/*parValue*/){
      
        ;
        PL$77/*parPromise*/["reject"](PL$200/*parValue*/);
        ;})
    };
    ;
    var PL$201/*resultType*/ = PL$199/*res*/["originalResultType"];
    ;
    PL$199/*res*/["newPromise"] = (function(){
    
      ;
      return new PL$87/*Promise*/();
      ;});
    if(PL$39/*classSystem*/["isTemporaryTrackedClass"](PL$201/*resultType*/)){
      PL$199/*res*/["isTemporary"] = true;
      var PL$202/*unTrackedType*/ = PL$39/*classSystem*/["getClassFromTemporaryTracked"](PL$201/*resultType*/);
      ;
      if(PL$39/*classSystem*/["isPromiseOfClass"](PL$202/*unTrackedType*/)){
        var PL$203/*promiseConstructor*/ = PL$39/*classSystem*/["getTypeConstructor"](PL$202/*unTrackedType*/);
        ;
        PL$199/*res*/["newPromise"] = (function(){
        
          ;
          return PL$203/*promiseConstructor*/();
          ;});
        PL$199/*res*/["resolvePromise"] = (function(PL$77/*parPromise*/, PL$200/*parValue*/){
        
          ;
          PL$77/*parPromise*/[0]["resolve"](PL$200/*parValue*/);
          ;});
        PL$199/*res*/["rejectPromise"] = (function(PL$77/*parPromise*/, PL$200/*parValue*/){
        
          ;
          PL$77/*parPromise*/[0]["reject"](PL$200/*parValue*/);
          ;});
        var PL$204/*promiseResolveType*/ = PL$39/*classSystem*/["getClassFromPromiseOf"](PL$202/*unTrackedType*/);
        ;
        PL$199/*res*/["promiseResolveType"] = PL$204/*promiseResolveType*/;
      };
      ;
    };
    ;
    return PL$199/*res*/;
    ;});
  ;
  var PL$205/*_stringEncodeStr*/ = (function(PL$34/*par*/){
  
    ;
    var PL$206/*s*/ = PL$34/*par*/["replace"](new PL$207/*RegExp*/("\\\\", "g"), "\\\\");
    ;
    PL$206/*s*/ = PL$206/*s*/["replace"](new PL$207/*RegExp*/("\\n", "g"), "\\n");
    PL$206/*s*/ = PL$206/*s*/["replace"](new PL$207/*RegExp*/("\\r", "g"), "\\r");
    PL$206/*s*/ = PL$206/*s*/["replace"](new PL$207/*RegExp*/("\\\"", "g"), "\\\"");
    PL$206/*s*/ = PL$206/*s*/["replace"](new PL$207/*RegExp*/("\\u2028", "g"), "\\u2028");
    PL$206/*s*/ = PL$206/*s*/["replace"](new PL$207/*RegExp*/("\\u2029", "g"), "\\u2029");
    return PL$206/*s*/;
    ;});
  ;
  var PL$208/*stringEncodeStr*/ = (function(PL$34/*par*/){
  
    ;
    return (("\"" + PL$205/*_stringEncodeStr*/(PL$34/*par*/)) + "\"");
    ;});
  ;
  PL$69/*internals*/ = {
    "classHider": PL$43/*classHider*/,
    "getClass": PL$41/*getClass*/,
    "TrackedPromise": PL$6/*TrackedPromise*/,
    "DynInstance": PL$4/*DynInstance*/,
    "stringEncodeStr": PL$208/*stringEncodeStr*/,
    "getEffectiveFunctionResultType": PL$198/*getEffectiveFunctionResultType*/,
    "privateClassSystem": PL$54/*privateClassSystem*/
  };
  PL$7/*provisional*/(PL$39/*classSystem*/, PL$69/*internals*/);
  PL$8/*temporary*/(PL$39/*classSystem*/, PL$69/*internals*/);
  PL$9/*promiseOf*/(PL$39/*classSystem*/, PL$69/*internals*/);
  PL$10/*sync*/(PL$39/*classSystem*/, PL$69/*internals*/);
  PL$175/*registerSyncClass*/ = PL$69/*internals*/["registerSyncClass"];
  PL$172/*destroySynced*/ = PL$69/*internals*/["destroySynced"];
  var PL$209/*getClassBySyncId*/ = PL$69/*internals*/["getClassBySyncId"];
  ;
  PL$122/*syncFun*/ = PL$69/*internals*/["syncFun"];
  PL$126/*syncFunctionFun*/ = PL$69/*internals*/["syncFunctionFun"];
  PL$101/*internalObjects*/ = PL$69/*internals*/["internalObjects"];
  PL$100/*getNewInternalId*/ = PL$69/*internals*/["getNewInternalId"];
  PL$11/*savable*/(PL$39/*classSystem*/, PL$69/*internals*/);
  PL$12/*makroModule*/(PL$39/*classSystem*/, PL$69/*internals*/);
  PL$51/*makro*/ = PL$69/*internals*/["makro"];
  PL$50/*createCastings*/();
  PL$13/*codeGeneration*/(PL$39/*classSystem*/, PL$69/*internals*/);
  PL$130/*runtimeError*/ = PL$69/*internals*/["runtimeError"];
  PL$103/*presets*/ = PL$69/*internals*/["presets"];
  PL$168/*promiseland*/["classSystem"] = PL$39/*classSystem*/;
  PL$3/*extra*/["classSystemPs"]["resolve"]({
    "classSystem": PL$39/*classSystem*/,
    "privateClassSystem": PL$54/*privateClassSystem*/,
    "internalObjects": PL$101/*internalObjects*/,
    "getClassBySyncId": PL$209/*getClassBySyncId*/,
    "DynInstance": PL$4/*DynInstance*/,
    "getEffectiveFunctionResultType": PL$198/*getEffectiveFunctionResultType*/
  });
  return PL$39/*classSystem*/;
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();