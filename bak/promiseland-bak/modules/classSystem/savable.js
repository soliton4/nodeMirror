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

var __Promise = promiseland.Promise;
var Promise = promiseland.Promise;
if (promiseland._hasModule({ hashStr: "6bd61b76756d51bc6ec2dc7c5402904d" })){ return promiseland._getModule("6bd61b76756d51bc6ec2dc7c5402904d"); };
var PL$3/*extra*/;try{PL$3/*extra*/ = extra;}catch(e){};
var PL$27/*Promise*/;try{PL$27/*Promise*/ = Promise;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  ;
  var PL$2/*errorMsg*/ = PL$3/*extra*/["errorMsg"];
  ;
  var PL$4/*getModuleData*/;
  ;
  (function(){
  var PL$5 = new __Promise();
  var PL$7/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$5.reject(e);
      };
    };
  };
  var PL$8/*catch rejected*/ = function(e){
    PL$5.reject(e);
  };
  PL$7/*promiseland exception catcher*/(function(){
  
    ;
    PL$3/*extra*/["moduleSystemPs"].then(PL$7/*promiseland exception catcher*/(function(PL$9){PL$4/*getModuleData*/ = PL$9["getModuleData"];
    PL$5.resolve(); return;}), PL$8/*catch rejected*/);
    ;
  })();return PL$5;
  })();
  var PL$10/*frames*/;
  ;
  var PL$11/*getInstanceFromTransportData*/;
  ;
  var PL$12/*getInstanceTransportData*/;
  ;
  var PL$13/*getEffectiveFunctionResultType*/;
  ;
  return (function(PL$14/*classSystem*/, PL$15/*internals*/){
  
    ;
    var PL$16/*privateClassSystem*/ = PL$15/*internals*/["privateClassSystem"];
    ;
    (function(){
    var PL$17 = new __Promise();
    var PL$19/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$17.reject(e);
        };
      };
    };
    var PL$20/*catch rejected*/ = function(e){
      PL$17.reject(e);
    };
    PL$19/*promiseland exception catcher*/(function(){
    
      ;
      PL$3/*extra*/["framesPs"].then(PL$19/*promiseland exception catcher*/(function(PL$21){PL$10/*frames*/ = PL$21;
      PL$17.resolve(); return;}), PL$20/*catch rejected*/);
      ;
    })();return PL$17;
    })();
    var PL$22/*cs*/ = PL$14/*classSystem*/;
    ;
    var PL$23/*pcs*/ = PL$16/*privateClassSystem*/;
    ;
    var PL$24/*getClass*/ = PL$15/*internals*/["getClass"];
    ;
    var PL$25/*DynInstance*/ = PL$15/*internals*/["DynInstance"];
    ;
    var PL$26/*storageEnginePs*/ = new PL$27/*Promise*/();
    ;
    PL$23/*pcs*/["isSavableType"] = (function(PL$28/*parType*/){
    
      ;
      if(PL$22/*cs*/["isVar"](PL$28/*parType*/)){
        return true;
      };
      ;
      var PL$29/*cDef*/ = PL$24/*getClass*/(PL$28/*parType*/);
      ;
      if(PL$29/*cDef*/["savable"]){
        return true;
      };
      ;
      return false;
      ;});
    PL$23/*pcs*/["registerSavableClass"] = (function(PL$28/*parType*/){
    var PL$30 = new __Promise();
    var PL$32/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$30.reject(e);
        };
      };
    };
    var PL$33/*catch rejected*/ = function(e){
      PL$30.reject(e);
    };
    var PL$29/*cDef*/;
    var PL$35/*engine*/;
    var PL$38/*propertiesAr*/;
    var PL$39/*properties*/;
    var PL$40/*map*/;
    var PL$41/*i*/;
    var PL$42/*mDef*/;
    var PL$43/*p*/;
    PL$32/*promiseland exception catcher*/(function(){
    
      ;
      PL$29/*cDef*/ = PL$24/*getClass*/(PL$28/*parType*/);
      
      var PL$34 = new __Promise();if(PL$29/*cDef*/["storageEngine"]){
        PL$35/*engine*/ = PL$29/*cDef*/["storageEngine"];
        PL$34.resolve();;
      }else{
      PL$26/*storageEnginePs*/.then(PL$32/*promiseland exception catcher*/(function(PL$36){PL$35/*engine*/ = PL$36;
      PL$34.resolve();;}), PL$33/*catch rejected*/);
      ;
      };PL$34.then(PL$32/*promiseland exception catcher*/(function(PL$37){PL$37;;
      ;
      PL$38/*propertiesAr*/ = [
        
      ];
      PL$39/*properties*/ = {
        
      };
      PL$40/*map*/ = PL$29/*cDef*/["map"];
      PL$41/*i*/ = 0;
      for(PL$41/*i*/ = 0;(PL$41/*i*/ < PL$40/*map*/["membersAr"]["length"]);++PL$41/*i*/){{
        PL$42/*mDef*/ = PL$40/*map*/["membersAr"][PL$41/*i*/];
        if((! PL$23/*pcs*/["isSavableType"](PL$42/*mDef*/["type"]) || PL$42/*mDef*/["noSave"])){
          continue;;
        };
        ;
        PL$43/*p*/ = {
          "name": PL$42/*mDef*/["name"],
          "type": PL$42/*mDef*/["type"],
          "isVar": PL$14/*classSystem*/["isVar"](PL$42/*mDef*/["type"]),
          "defaultValue": (PL$14/*classSystem*/["isVar"](PL$42/*mDef*/["type"]) ? PL$42/*mDef*/["defaultValue"] : PL$23/*pcs*/["stringifyInstance"](PL$42/*mDef*/["type"], PL$42/*mDef*/["defaultValue"]))
        };
        if(PL$42/*mDef*/["meta"]){
          PL$43/*p*/["meta"] = PL$42/*mDef*/["meta"];
        };
        ;
        PL$38/*propertiesAr*/["push"](PL$43/*p*/);
        PL$39/*properties*/[PL$42/*mDef*/["name"]] = PL$43/*p*/;}};
      ;
      try
      {
        if(PL$35/*engine*/["registerClass"]){
          PL$29/*cDef*/["storageHandler"] = PL$35/*engine*/["registerClass"]({
            "idType": PL$29/*cDef*/["idType"],
            "properties": PL$39/*properties*/,
            "propertiesAr": PL$38/*propertiesAr*/,
            "moduleName": PL$29/*cDef*/["moduleName"],
            "className": PL$29/*cDef*/["className"],
            "moduleHash": PL$29/*cDef*/["moduleHash"]
          });
        };
        ;}catch(PL$44/*e*/){};
      ;
      PL$30.resolve(); return;}), PL$33/*catch rejected*/);
      ;
    })();return PL$30;
    });
    PL$23/*pcs*/["saveInstance"] = (function(PL$28/*parType*/, PL$45/*parInstance*/){
    var PL$46 = new __Promise();
    var PL$48/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$46.reject(e);
        };
      };
    };
    var PL$49/*catch rejected*/ = function(e){
      PL$46.reject(e);
    };
    var PL$29/*cDef*/;
    var PL$50/*h*/;
    var PL$38/*propertiesAr*/;
    var PL$39/*properties*/;
    var PL$40/*map*/;
    var PL$41/*i*/;
    var PL$42/*mDef*/;
    var PL$43/*p*/;
    PL$48/*promiseland exception catcher*/(function(){
    
      ;
      PL$29/*cDef*/ = PL$24/*getClass*/(PL$28/*parType*/);
      PL$29/*cDef*/["storageHandler"].then(PL$48/*promiseland exception catcher*/(function(PL$51){PL$50/*h*/ = PL$51;
      PL$38/*propertiesAr*/ = [
        
      ];
      PL$39/*properties*/ = {
        
      };
      PL$40/*map*/ = PL$29/*cDef*/["map"];
      PL$41/*i*/ = 0;
      for(PL$41/*i*/ = 0;(PL$41/*i*/ < PL$40/*map*/["membersAr"]["length"]);++PL$41/*i*/){{
        PL$42/*mDef*/ = PL$40/*map*/["membersAr"][PL$41/*i*/];
        if((! PL$23/*pcs*/["isSavableType"](PL$42/*mDef*/["type"]) || PL$42/*mDef*/["noSave"])){
          continue;;
        };
        ;
        PL$43/*p*/ = {
          "name": PL$42/*mDef*/["name"],
          "type": PL$42/*mDef*/["type"],
          "isVar": PL$14/*classSystem*/["isVar"](PL$42/*mDef*/["type"]),
          "value": (PL$14/*classSystem*/["isVar"](PL$42/*mDef*/["type"]) ? PL$45/*parInstance*/[PL$42/*mDef*/["index"]] : PL$23/*pcs*/["stringifyInstance"](PL$42/*mDef*/["type"], PL$45/*parInstance*/[PL$42/*mDef*/["index"]]))
        };
        PL$38/*propertiesAr*/["push"](PL$43/*p*/);
        PL$39/*properties*/[PL$42/*mDef*/["name"]] = PL$43/*p*/;}};
      ;
      PL$50/*h*/["save"]({
        "properties": PL$39/*properties*/,
        "propertiesAr": PL$38/*propertiesAr*/
      }).then(PL$48/*promiseland exception catcher*/(function(PL$52){PL$46.resolve(PL$52); return;
      PL$46.resolve(); return;}), PL$49/*catch rejected*/);
      ;}), PL$49/*catch rejected*/);
      ;
    })();return PL$46;
    });
    PL$23/*pcs*/["loadInstance"] = (function(PL$28/*parType*/, PL$45/*parInstance*/){
    var PL$53 = new __Promise();
    var PL$55/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$53.reject(e);
        };
      };
    };
    var PL$56/*catch rejected*/ = function(e){
      PL$53.reject(e);
    };
    var PL$29/*cDef*/;
    var PL$50/*h*/;
    var PL$38/*propertiesAr*/;
    var PL$39/*properties*/;
    var PL$40/*map*/;
    var PL$41/*i*/;
    var PL$42/*mDef*/;
    var PL$43/*p*/;
    var PL$58/*loadVar*/;
    PL$55/*promiseland exception catcher*/(function(){
    
      ;
      PL$29/*cDef*/ = PL$24/*getClass*/(PL$28/*parType*/);
      PL$29/*cDef*/["storageHandler"].then(PL$55/*promiseland exception catcher*/(function(PL$57){PL$50/*h*/ = PL$57;
      PL$38/*propertiesAr*/ = [
        
      ];
      PL$39/*properties*/ = {
        
      };
      PL$40/*map*/ = PL$29/*cDef*/["map"];
      PL$41/*i*/ = 0;
      for(PL$41/*i*/ = 0;(PL$41/*i*/ < PL$40/*map*/["membersAr"]["length"]);++PL$41/*i*/){{
        PL$42/*mDef*/ = PL$40/*map*/["membersAr"][PL$41/*i*/];
        if((! PL$23/*pcs*/["isSavableType"](PL$42/*mDef*/["type"]) || PL$42/*mDef*/["noSave"])){
          continue;;
        };
        ;
        PL$43/*p*/ = {
          "name": PL$42/*mDef*/["name"],
          "type": PL$42/*mDef*/["type"],
          "isVar": PL$14/*classSystem*/["isVar"](PL$42/*mDef*/["type"])
        };
        if((PL$42/*mDef*/["name"] == "id")){
          PL$43/*p*/["value"] = (PL$14/*classSystem*/["isVar"](PL$42/*mDef*/["type"]) ? PL$45/*parInstance*/[PL$42/*mDef*/["index"]] : PL$23/*pcs*/["stringifyInstance"](PL$42/*mDef*/["type"], PL$45/*parInstance*/[PL$42/*mDef*/["index"]]));
        };
        ;
        PL$38/*propertiesAr*/["push"](PL$43/*p*/);
        PL$39/*properties*/[PL$42/*mDef*/["name"]] = PL$43/*p*/;}};
      ;
      PL$50/*h*/["load"]({
        "properties": PL$39/*properties*/,
        "propertiesAr": PL$38/*propertiesAr*/
      }).then(PL$55/*promiseland exception catcher*/(function(PL$59){PL$58/*loadVar*/ = PL$59;
      if(! PL$58/*loadVar*/){
        PL$53.resolve(); return;
      };
      ;
      for(PL$41/*i*/ = 0;(PL$41/*i*/ < PL$40/*map*/["membersAr"]["length"]);++PL$41/*i*/){{
        PL$42/*mDef*/ = PL$40/*map*/["membersAr"][PL$41/*i*/];
        if((! PL$23/*pcs*/["isSavableType"](PL$42/*mDef*/["type"]) || PL$42/*mDef*/["noSave"])){
          continue;;
        };
        ;
        if(PL$23/*pcs*/["hasOwnProperty"](PL$58/*loadVar*/, PL$42/*mDef*/["name"])){
          if(PL$14/*classSystem*/["isVar"](PL$42/*mDef*/["type"])){
            PL$23/*pcs*/["setMemberByDefFromInstance"](PL$28/*parType*/, PL$45/*parInstance*/, PL$42/*mDef*/, PL$58/*loadVar*/[PL$42/*mDef*/["name"]]);
          }else{
          };
          ;
        };
        ;}};
      ;
      PL$53.resolve(); return;}), PL$56/*catch rejected*/);
      ;}), PL$56/*catch rejected*/);
      ;
    })();return PL$53;
    });
    PL$22/*cs*/["setStorageEngine"] = (function(PL$60/*parStorageEngine*/, PL$28/*parType*/){
    var PL$61 = new __Promise();
    var PL$63/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$61.reject(e);
        };
      };
    };
    var PL$64/*catch rejected*/ = function(e){
      PL$61.reject(e);
    };
    var PL$66/*type*/;
    var PL$29/*cDef*/;
    PL$63/*promiseland exception catcher*/(function(){
    
      ;
      
      var PL$65 = new __Promise();if(PL$28/*parType*/){
        PL$22/*cs*/["readyPromise"](PL$28/*parType*/).then(PL$63/*promiseland exception catcher*/(function(PL$67){PL$66/*type*/ = PL$67;
        PL$29/*cDef*/ = PL$24/*getClass*/(PL$66/*type*/);
        PL$29/*cDef*/["storageEngine"] = PL$60/*parStorageEngine*/;
        PL$23/*pcs*/["registerSavableClass"](PL$66/*type*/);
        PL$61.resolve(); return;
        PL$65.resolve();;}), PL$64/*catch rejected*/);
        ;
      }else{PL$65.resolve();
      };PL$65.then(PL$63/*promiseland exception catcher*/(function(PL$68){PL$68;;
      ;
      try
      {
        PL$26/*storageEnginePs*/["resolve"](PL$60/*parStorageEngine*/);}catch(__dummy){};
      ;
      PL$26/*storageEnginePs*/ = new PL$27/*Promise*/();
      PL$26/*storageEnginePs*/["resolve"](PL$60/*parStorageEngine*/);
      PL$61.resolve(); return;}), PL$64/*catch rejected*/);
      ;
    })();return PL$61;
    });
    ;});
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();