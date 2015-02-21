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
if (promiseland._hasModule({ hashStr: "2a9fad46f944e8d4ac0f7cf994c4f66d" })){ return promiseland._getModule("2a9fad46f944e8d4ac0f7cf994c4f66d"); };
var PL$11/*extra*/;try{PL$11/*extra*/ = extra;}catch(e){};
var PL$40/*Promise*/;try{PL$40/*Promise*/ = Promise;}catch(e){};
var PL$52/*console*/;try{PL$52/*console*/ = console;}catch(e){};
var PL$102/*JSON*/;try{PL$102/*JSON*/ = JSON;}catch(e){};
var PL$152/*promiseland*/;try{PL$152/*promiseland*/ = promiseland;}catch(e){};
var PL$1 = (function(){
"use strict";
var PL$41/*ContentBase*/;
var PL$44/*Request*/;
var PL$46/*Answer*/;
var PL$48/*Message*/;
var PL$65/*Package*/;
var PL$121/*Transport*/;
var PL$168/*getInstanceTransportData*/;
var PL$160/*getInstanceFromTransportData*/;
var PL$174/*getTypeTransportData*/;
var PL$206/*getTypeFromTransportData*/;
var PL$149/*getModuleData*/;
var PL$250/*Session*/;

  ;
  ;
  var PL$2/*classSystem*/;
  ;
  var PL$3/*internalObjects*/;
  ;
  var PL$4/*getClassBySyncId*/;
  ;
  var PL$5/*DynInstance*/;
  ;
  var PL$6/*getEffectiveFunctionResultType*/;
  ;
  (function(){
  var PL$7 = new __Promise();
  var PL$9/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$7.reject(e);
      };
    };
  };
  var PL$10/*catch rejected*/ = function(e){
    PL$7.reject(e);
  };
  PL$9/*promiseland exception catcher*/(function(){
  
    ;
    PL$11/*extra*/["classSystemPs"].then(PL$9/*promiseland exception catcher*/(function(PL$12){PL$2/*classSystem*/ = PL$12["classSystem"];
    PL$11/*extra*/["classSystemPs"].then(PL$9/*promiseland exception catcher*/(function(PL$13){PL$3/*internalObjects*/ = PL$13["internalObjects"];
    PL$11/*extra*/["classSystemPs"].then(PL$9/*promiseland exception catcher*/(function(PL$14){PL$4/*getClassBySyncId*/ = PL$14["getClassBySyncId"];
    PL$11/*extra*/["classSystemPs"].then(PL$9/*promiseland exception catcher*/(function(PL$15){PL$5/*DynInstance*/ = PL$15["DynInstance"];
    PL$11/*extra*/["classSystemPs"].then(PL$9/*promiseland exception catcher*/(function(PL$16){PL$6/*getEffectiveFunctionResultType*/ = PL$16["getEffectiveFunctionResultType"];
    PL$7.resolve(); return;}), PL$10/*catch rejected*/);
    ;}), PL$10/*catch rejected*/);
    ;}), PL$10/*catch rejected*/);
    ;}), PL$10/*catch rejected*/);
    ;}), PL$10/*catch rejected*/);
    ;
  })();return PL$7;
  })();
  var PL$17/*config*/ = PL$11/*extra*/["config"];
  ;
  var PL$18/*errorMsg*/ = PL$11/*extra*/["errorMsg"];
  ;
  var PL$19/*moduleData*/ = {
    
  };
  ;
  var PL$20/*profiles*/ = {
    
  };
  ;
  var PL$21/*_emitFun*/ = (function(PL$22/*parEventStr*/, PL$23/*parData*/){
  
    ;
    if(this["_on"][PL$22/*parEventStr*/]){
      var PL$24/*i*/ = 0;
      ;
      var PL$25/*l*/ = this["_on"][PL$22/*parEventStr*/]["length"];
      ;
      for(PL$24/*i*/;(PL$24/*i*/ < PL$25/*l*/);++PL$24/*i*/){{
        try
        {
          this["_on"][PL$22/*parEventStr*/][PL$24/*i*/](PL$23/*parData*/);}catch(PL$26/*e*/){};
        ;}};
      ;
    };
    ;
    ;});
  ;
  var PL$27/*_onFun*/ = (function(PL$22/*parEventStr*/, PL$28/*parFun*/){
  
    ;
    if(this["_on"][PL$22/*parEventStr*/]){
      this["_on"][PL$22/*parEventStr*/]["push"](PL$28/*parFun*/);
    };
    ;
    ;});
  ;
  var PL$29/*Profile*/ = (function(){
  
    ;
    this["_on"] = {
      "connection": [
        
      ]
    };
    ;});
  ;
  PL$29/*Profile*/["prototype"] = {
    "name": (function(){
    
      ;
      ;}),
    "emit": PL$21/*_emitFun*/,
    "find": (function(PL$30/*parId*/){
    
      ;
      ;}),
    "on": PL$27/*_onFun*/
  };
  var PL$31/*Connection*/ = (function(){
  
    ;
    this["_on"] = {
      "data": [
        
      ],
      "disconnect": [
        
      ]
    };
    ;});
  ;
  PL$31/*Connection*/["prototype"] = {
    "send": (function(PL$32/*parStr*/){
    
      ;
      ;}),
    "emit": PL$21/*_emitFun*/,
    "on": PL$27/*_onFun*/
  };
  var PL$33/*maxId*/ = 10000000;
  ;
  var PL$34/*MAKRO_REQUEST*/ = 1;
  ;
  var PL$35/*MAKRO_MESSAGE*/ = 2;
  ;
  var PL$36/*MAKRO_ANSWER*/ = 3;
  ;
  var PL$37/*handlers*/ = {
    
  };
  ;
  PL$41/*ContentBase*/ = (function(){var PL$38/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(PL$39/*parParent*/, PL$23/*parData*/){
    
      ;
      this["parent"] = PL$39/*parParent*/;
      this["sendPs"] = new PL$40/*Promise*/();
      this["dataAr"] = (PL$23/*parData*/ || [
        
      ]);
      ;}),
    "newMessage": (function(){
    
      ;
      return this["parent"]["newMessage"]();
      ;}),
    "newRequest": (function(){
    
      ;
      return this["parent"]["newRequest"]();
      ;}),
    "send": (function(){
    
      ;
      this["sendPs"]["resolve"]();
      ;}),
    "setData": (function(PL$23/*parData*/){
    
      ;
      this["dataAr"][1] = PL$23/*parData*/;
      ;}),
    "getData": (function(){
    
      ;
      return this["dataAr"][1];
      ;}),
    "getType": (function(){
    
      ;
      return this["getData"]()["type"];
      ;}),
    "getTransport": (function(){
    
      ;
      return this["parent"]["getTransport"]();
      ;}),
    "getRequest": (function(PL$30/*parId*/){
    
      ;
      return this["parent"]["getRequest"](PL$30/*parId*/);
      ;})
  }, [], PL$38/*inherited*/);
  return res; })();PL$41/*ContentBase*/;
  PL$44/*Request*/ = (function(){var PL$42/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(PL$39/*parParent*/, PL$23/*parData*/){
    
      ;
      this["dataAr"][0] = PL$34/*MAKRO_REQUEST*/;
      this["answerPs"] = new PL$40/*Promise*/();
      this["localPs"] = new PL$40/*Promise*/();
      ;}),
    "setId": (function(PL$30/*parId*/){
    
      ;
      this["dataAr"][2] = PL$30/*parId*/;
      ;}),
    "getId": (function(){
    
      ;
      return this["dataAr"][2];
      ;}),
    "createAnswer": (function(){
    
      ;
      var PL$43/*a*/ = this["parent"]["_createAnswer"]();
      ;
      PL$43/*a*/["setId"](this["getId"]());
      return PL$43/*a*/;
      ;})
  }, [PL$41/*ContentBase*/], PL$42/*inherited*/);
  return res; })();PL$44/*Request*/;
  PL$46/*Answer*/ = (function(){var PL$45/*inherited*/ = {};
  var res = promiseland.createClass({
    "isAnswer": true,
    "constructor": (function(PL$39/*parParent*/, PL$23/*parData*/){
    
      ;
      this["dataAr"][0] = PL$36/*MAKRO_ANSWER*/;
      ;}),
    "setId": (function(PL$30/*parId*/){
    
      ;
      this["dataAr"][2] = PL$30/*parId*/;
      ;}),
    "getId": (function(){
    
      ;
      return this["dataAr"][2];
      ;})
  }, [PL$41/*ContentBase*/], PL$45/*inherited*/);
  return res; })();PL$46/*Answer*/;
  PL$48/*Message*/ = (function(){var PL$47/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(PL$39/*parParent*/, PL$23/*parData*/){
    
      ;
      this["dataAr"][0] = PL$35/*MAKRO_MESSAGE*/;
      this["localPs"] = new PL$40/*Promise*/();
      ;})
  }, [PL$41/*ContentBase*/], PL$47/*inherited*/);
  return res; })();PL$48/*Message*/;
  PL$65/*Package*/ = (function(){var PL$49/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(PL$39/*parParent*/, PL$23/*parData*/){
    
      ;
      this["parent"] = PL$39/*parParent*/;
      this["requests"] = {
        
      };
      this["dataAr"] = [
        undefined
      ];
      this["content"] = [
        
      ];
      if(PL$23/*parData*/){
        try
        {
          this["answers"] = [
            
          ];
          var PL$24/*i*/;
          ;
          for(PL$24/*i*/ = 1;(PL$24/*i*/ < PL$23/*parData*/["length"]);++PL$24/*i*/){{
            var PL$50/*d*/ = PL$23/*parData*/[PL$24/*i*/];
            ;
            switch (PL$50/*d*/[0]){
              case PL$34/*MAKRO_REQUEST*/:
                
                var PL$51/*r*/ = this["newRequest"](PL$50/*d*/);
                ;
                this["requests"][PL$51/*r*/["getId"]()] = PL$51/*r*/;
                break;;
              case PL$35/*MAKRO_MESSAGE*/:
                
                this["newMessage"](PL$50/*d*/);
                break;;
              case PL$36/*MAKRO_ANSWER*/:
                
                this["newAnswer"](PL$50/*d*/);
                break;;
              default:
                
                PL$39/*parParent*/["error"]();
              
            };
            ;}};
          ;}catch(PL$26/*e*/){
          PL$52/*console*/["log"]("package error");
          PL$52/*console*/["log"](PL$26/*e*/);};
        this["dataAr"] = PL$23/*parData*/;
      }else{
      this["sendPs"] = new PL$40/*Promise*/();
      };
      ;
      ;}),
    "getRequest": (function(PL$30/*parId*/){
    
      ;
      return this["requests"][PL$30/*parId*/];
      ;}),
    "handle": (function(){
    
      ;
      try
      {
        var PL$24/*i*/ = 0;
        ;
        while((PL$24/*i*/ < this["content"]["length"])){
        {
          var PL$53/*c*/ = this["content"][PL$24/*i*/];
          ;
          if(PL$53/*c*/["isAnswer"]){
            this["parent"]["handleAnswer"](PL$53/*c*/, this);
          }else{
          var PL$54/*type*/ = PL$53/*c*/["getType"]();
          ;
          if(PL$37/*handlers*/[PL$54/*type*/]){
            PL$37/*handlers*/[PL$54/*type*/](PL$53/*c*/, this);
          }else{
          this["parent"]["error"]();
          };
          ;
          };
          ;
          ++PL$24/*i*/;}};
        ;}catch(PL$26/*e*/){
        PL$52/*console*/["log"]("handle error");
        PL$52/*console*/["log"](PL$26/*e*/);};
      ;
      ;}),
    "getTransport": (function(){
    
      ;
      return this["parent"];
      ;}),
    "newRequest": (function(PL$23/*parData*/){
    
      ;
      var PL$51/*r*/ = this["parent"]["_newRequest"](this, PL$23/*parData*/);
      ;
      this["requests"][PL$51/*r*/["id"]] = PL$51/*r*/;
      this["dataAr"]["push"](PL$51/*r*/["dataAr"]);
      this["content"]["push"](PL$51/*r*/);
      return PL$51/*r*/;
      ;}),
    "newMessage": (function(PL$23/*parData*/){
    
      ;
      var PL$51/*r*/ = this["parent"]["_newMessage"](this, PL$23/*parData*/);
      ;
      this["dataAr"]["push"](PL$51/*r*/["dataAr"]);
      this["content"]["push"](PL$51/*r*/);
      return PL$51/*r*/;
      ;}),
    "_createAnswer": (function(PL$23/*parData*/){
    
      ;
      return this["parent"]["newAnswer"](PL$23/*parData*/);
      ;}),
    "newAnswer": (function(PL$23/*parData*/){
    
      ;
      var PL$51/*r*/ = this["parent"]["_newAnswer"](this, PL$23/*parData*/);
      ;
      this["dataAr"]["push"](PL$51/*r*/["dataAr"]);
      this["content"]["push"](PL$51/*r*/);
      return PL$51/*r*/;
      ;}),
    "send": (function(){
    var PL$55 = new __Promise();
    var PL$57/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$55.reject(e);
        };
      };
    };
    var PL$58/*catch rejected*/ = function(e){
      PL$55.reject(e);
    };
    var PL$24/*i*/;
    var PL$59/*this*/ = this;
    PL$57/*promiseland exception catcher*/(function(){
    
      ;
      PL$24/*i*/ = 0;
      var PL$61 = new __Promise();
      var PL$60 = function(){var PL$62 = new __Promise();
      if((PL$24/*i*/ < PL$59/*this*/["content"]["length"])){
      PL$59/*this*/["content"][PL$24/*i*/]["sendPs"].then(PL$57/*promiseland exception catcher*/(function(PL$63){PL$63;
      ++PL$24/*i*/;
      PL$62.resolve(true); return PL$62; /* continue */
      ;}), PL$58/*catch rejected*/);
      ;}else{
      PL$62.resolve(false); return PL$62; /* break */
      
      };
      PL$62;return PL$62;
      };
      var PL$64 = function(){PL$60().then(function(contLoop){
      if (contLoop){PL$64();}else{PL$61.resolve();};
      });
      };
      PL$64();
      PL$61.then(function(){;
      ;
      PL$59/*this*/["sendPs"]["resolve"]();
      PL$55.resolve(); return;});
    })();return PL$55;
    })
  }, [], PL$49/*inherited*/);
  return res; })();PL$65/*Package*/;
  var PL$66/*waitForTheSend*/ = (function(PL$67/*content*/, PL$68/*package*/){
  var PL$69 = new __Promise();
  var PL$71/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$69.reject(e);
      };
    };
  };
  var PL$72/*catch rejected*/ = function(e){
    PL$69.reject(e);
  };
  PL$71/*promiseland exception catcher*/(function(){
  
    ;
    PL$67/*content*/["sendPs"].then(PL$71/*promiseland exception catcher*/(function(PL$73){PL$73;
    PL$68/*package*/["send"]();
    PL$69.resolve(); return;}), PL$72/*catch rejected*/);
    ;
  })();return PL$69;
  });
  ;
  PL$121/*Transport*/ = (function(){var PL$74/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(){
    
      ;
      this["expect"] = {
        
      };
      this["requests"] = [
        
      ];
      this["nextFreeRequest"] = 0;
      this["_nextId"] = 1;
      this["types"] = [
        
      ];
      this["remoteTypes"] = [
        
      ];
      this["moduleData"] = {
        
      };
      this["instances"] = {
        
      };
      this["instanceTracks"] = {
        
      };
      this["workLoop"]();
      ;}),
    "queue": (function(PL$23/*parData*/){
    
      ;
      var PL$75/*id*/ = PL$23/*parData*/[0];
      ;
      this["_expectPs"](PL$75/*id*/)["resolve"](PL$23/*parData*/);
      ;}),
    "_expectPs": (function(PL$30/*parId*/){
    
      ;
      var PL$76/*ps*/ = this["expect"][PL$30/*parId*/];
      ;
      if(! PL$76/*ps*/){
        PL$76/*ps*/ = new PL$40/*Promise*/();
        this["expect"][PL$30/*parId*/] = PL$76/*ps*/;
      };
      ;
      return PL$76/*ps*/;
      ;}),
    "handleAnswer": (function(PL$77/*parAnswer*/, PL$78/*parPackage*/){
    
      ;
      var PL$75/*id*/ = PL$77/*parAnswer*/["getId"]();
      ;
      var PL$51/*r*/ = this["requests"][PL$75/*id*/];
      ;
      if(! PL$51/*r*/){
        this["error"]();
        return;
      };
      ;
      this["requests"][PL$75/*id*/] = undefined;
      if((PL$75/*id*/ < this["nextFreeRequest"])){
        this["nextFreeRequest"] = PL$75/*id*/;
      }else{
      if(((PL$75/*id*/ + 1) == this["requests"]["length"])){
        this["requests"]["pop"]();
      };
      };
      ;
      PL$51/*r*/["answerPs"]["resolve"](PL$77/*parAnswer*/);
      ;}),
    "workLoop": (function(){
    var PL$79 = new __Promise();
    var PL$81/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$79.reject(e);
        };
      };
    };
    var PL$82/*catch rejected*/ = function(e){
      PL$79.reject(e);
    };
    var PL$24/*i*/;
    var PL$89/*data*/;
    var PL$68/*package*/;
    var PL$90/*this*/ = this;
    PL$81/*promiseland exception catcher*/(function(){
    
      ;
      PL$24/*i*/;
      var PL$84 = new __Promise();
      var PL$83 = function(){var PL$85 = new __Promise();
      if(true){
      PL$24/*i*/ = 1;var PL$87 = new __Promise();
      var PL$86 = function(){var PL$88 = new __Promise();
      if((PL$24/*i*/ < PL$33/*maxId*/)){
      PL$90/*this*/["_expectPs"](PL$24/*i*/).then(PL$81/*promiseland exception catcher*/(function(PL$91){PL$89/*data*/ = PL$91;
      PL$68/*package*/ = new PL$65/*Package*/(PL$90/*this*/, PL$89/*data*/);
      PL$68/*package*/["handle"]();
      PL$88.resolve(true); return PL$88; /* continue */
      ;}), PL$82/*catch rejected*/);
      ;}else{
      PL$88.resolve(false); return PL$88; /* break */
      
      };
      PL$88;return PL$88;
      };
      var PL$92 = function(){PL$86().then(function(contLoop){
      if (contLoop){++PL$24/*i*/;PL$92();}else{PL$87.resolve();};
      });
      };
      PL$92();
      PL$87.then(function(){;
      ;
      PL$85.resolve(true); return PL$85; /* continue */
      ;});}else{
      PL$85.resolve(false); return PL$85; /* break */
      
      };
      PL$85;return PL$85;
      };
      var PL$93 = function(){PL$83().then(function(contLoop){
      if (contLoop){PL$93();}else{PL$84.resolve();};
      });
      };
      PL$93();
      PL$84.then(function(){;
      ;
      PL$79.resolve(); return;});
    })();return PL$79;
    }),
    "nextId": (function(){
    
      ;
      var PL$94/*ret*/ = this["_nextId"];
      ;
      this["_nextId"] += 1;
      if(! (this["_nextId"] < PL$33/*maxId*/)){
        this["_nextId"] = 1;
      };
      ;
      return PL$94/*ret*/;
      ;}),
    "_newRequest": (function(PL$39/*parParent*/, PL$23/*parData*/){
    
      ;
      var PL$51/*r*/ = new PL$44/*Request*/(PL$39/*parParent*/, PL$23/*parData*/);
      ;
      if(! PL$23/*parData*/){
        var PL$75/*id*/ = this["nextFreeRequest"];
        ;
        while(this["requests"][PL$75/*id*/]){
        {
          ++PL$75/*id*/;}};
        ;
        this["nextFreeRequest"] = (PL$75/*id*/ + 1);
        this["requests"][PL$75/*id*/] = PL$51/*r*/;
        PL$51/*r*/["setId"](PL$75/*id*/);
      };
      ;
      return PL$51/*r*/;
      ;}),
    "_newMessage": (function(PL$39/*parParent*/, PL$23/*parData*/){
    
      ;
      var PL$51/*r*/ = new PL$48/*Message*/(PL$39/*parParent*/, PL$23/*parData*/);
      ;
      return PL$51/*r*/;
      ;}),
    "_newAnswer": (function(PL$39/*parParent*/, PL$23/*parData*/){
    
      ;
      var PL$51/*r*/ = new PL$46/*Answer*/(PL$39/*parParent*/, PL$23/*parData*/);
      ;
      return PL$51/*r*/;
      ;}),
    "newRequest": (function(){
    
      ;
      var PL$95/*p*/ = this["newPackage"]();
      ;
      var PL$51/*r*/ = PL$95/*p*/["newRequest"]();
      ;
      PL$66/*waitForTheSend*/(PL$51/*r*/, PL$95/*p*/);
      return PL$51/*r*/;
      ;}),
    "newMessage": (function(){
    
      ;
      var PL$95/*p*/ = this["newPackage"]();
      ;
      var PL$51/*r*/ = PL$95/*p*/["newMessage"]();
      ;
      PL$66/*waitForTheSend*/(PL$51/*r*/, PL$95/*p*/);
      return PL$51/*r*/;
      ;}),
    "newAnswer": (function(){
    
      ;
      var PL$95/*p*/ = this["newPackage"]();
      ;
      var PL$51/*r*/ = PL$95/*p*/["newAnswer"]();
      ;
      PL$66/*waitForTheSend*/(PL$51/*r*/, PL$95/*p*/);
      return PL$51/*r*/;
      ;}),
    "newPackage": (function(){
    
      ;
      var PL$95/*p*/ = new PL$65/*Package*/(this);
      ;
      var PL$96/*self*/ = this;
      ;
      (function(){
      var PL$97 = new __Promise();
      var PL$99/*promiseland exception catcher*/ = function(code){
        return function(res){
          try{ code(res); }catch(e){
            PL$97.reject(e);
          };
        };
      };
      var PL$100/*catch rejected*/ = function(e){
        PL$97.reject(e);
      };
      PL$99/*promiseland exception catcher*/(function(){
      
        ;
        PL$95/*p*/["sendPs"].then(PL$99/*promiseland exception catcher*/(function(PL$101){PL$101;
        PL$95/*p*/["dataAr"][0] = PL$96/*self*/["nextId"]();
        PL$96/*self*/["sendString"](PL$102/*JSON*/["stringify"](PL$95/*p*/["dataAr"]));
        PL$97.resolve(); return;}), PL$100/*catch rejected*/);
        ;
      })();return PL$97;
      })();
      return PL$95/*p*/;
      ;}),
    "stringData": (function(PL$32/*parStr*/){
    
      ;
      var PL$89/*data*/ = PL$102/*JSON*/["parse"](PL$32/*parStr*/);
      ;
      this["queue"](PL$89/*data*/);
      ;}),
    "sendString": (function(PL$32/*parStr*/){
    
      ;
      ;}),
    "_getModuleData": (function(PL$103/*parHash*/){
    
      ;
      var PL$19/*moduleData*/ = this["moduleData"][PL$103/*parHash*/];
      ;
      if(! PL$19/*moduleData*/){
        PL$19/*moduleData*/ = {
          
        };
        this["moduleData"][PL$103/*parHash*/] = PL$19/*moduleData*/;
      };
      ;
      return PL$19/*moduleData*/;
      ;}),
    "addType": (function(PL$104/*parType*/, PL$105/*parRemoteTypeId*/){
    
      ;
      var PL$106/*syncId*/ = PL$2/*classSystem*/["getSyncId"](PL$104/*parType*/);
      ;
      var PL$19/*moduleData*/ = this["_getModuleData"](PL$106/*syncId*/["hash"]);
      ;
      var PL$107/*entry*/ = PL$19/*moduleData*/[PL$106/*syncId*/["name"]];
      ;
      var PL$108/*typeIds*/;
      ;
      if(PL$107/*entry*/){
        PL$108/*typeIds*/ = PL$107/*entry*/["typeIds"];
        if((PL$105/*parRemoteTypeId*/ !== undefined)){
          PL$108/*typeIds*/["remoteId"] = PL$105/*parRemoteTypeId*/;
          this["remoteTypes"][PL$105/*parRemoteTypeId*/] = PL$104/*parType*/;
        };
        ;
        return PL$108/*typeIds*/;
      };
      ;
      var PL$109/*typeIdInt*/ = this["types"]["length"];
      ;
      this["types"]["push"](PL$104/*parType*/);
      PL$107/*entry*/ = {
        "typeIds": {
          "id": PL$109/*typeIdInt*/,
          "remoteId": PL$105/*parRemoteTypeId*/
        },
        "type": PL$104/*parType*/
      };
      PL$19/*moduleData*/[PL$106/*syncId*/["name"]] = PL$107/*entry*/;
      if((PL$105/*parRemoteTypeId*/ !== undefined)){
        this["remoteTypes"][PL$105/*parRemoteTypeId*/] = PL$104/*parType*/;
      };
      ;
      return PL$107/*entry*/["typeIds"];
      ;}),
    "getTypeByRemoteId": (function(PL$105/*parRemoteTypeId*/){
    
      ;
      return this["remoteTypes"][PL$105/*parRemoteTypeId*/];
      ;}),
    "getTypeById": (function(PL$110/*parTypeId*/){
    
      ;
      return this["types"][PL$110/*parTypeId*/];
      ;}),
    "getInstanceRemoteId": (function(PL$23/*parData*/){
    
      ;
      var PL$111/*internalId*/ = PL$2/*classSystem*/["getInternalId"](PL$23/*parData*/);
      ;
      return this["instances"][PL$111/*internalId*/];
      ;}),
    "addInstance": (function(PL$112/*parDynInstance*/, PL$113/*parRemoteId*/, PL$114/*parTrack*/){
    
      ;
      var PL$111/*internalId*/ = PL$112/*parDynInstance*/["getInternalId"]();
      ;
      var PL$115/*remoteId*/ = this["instances"][PL$111/*internalId*/];
      ;
      if((PL$115/*remoteId*/ === undefined)){
        PL$2/*classSystem*/["addTransport"](PL$112/*parDynInstance*/, this);
        this["instances"][PL$111/*internalId*/] = PL$113/*parRemoteId*/;
      };
      ;
      if(PL$114/*parTrack*/){
        if(this["instanceTracks"][PL$111/*internalId*/]){
          PL$114/*parTrack*/();
        }else{
        this["instanceTracks"][PL$111/*internalId*/] = PL$114/*parTrack*/;
        };
      };
      ;
      ;}),
    "removeInstance": (function(PL$116/*parInternalId*/, PL$117/*dontSend*/){
    
      ;
      var PL$115/*remoteId*/ = this["instances"][PL$116/*parInternalId*/];
      ;
      if(((PL$115/*remoteId*/ !== undefined) && ! PL$117/*dontSend*/)){
        var PL$118/*m*/ = this["newMessage"]();
        ;
        PL$118/*m*/["setData"]({
          "type": "remove",
          "remoteId": PL$115/*remoteId*/
        });
        PL$118/*m*/["send"]();
      };
      ;
      delete this["instances"][PL$116/*parInternalId*/];
      PL$2/*classSystem*/["removeTransport"](PL$116/*parInternalId*/, this);
      if(this["instanceTracks"][PL$116/*parInternalId*/]){
        var PL$119/*track*/ = this["instanceTracks"][PL$116/*parInternalId*/];
        ;
        delete this["instanceTracks"][PL$116/*parInternalId*/];
        PL$119/*track*/();
      };
      ;
      ;}),
    "removeAllInstances": (function(){
    
      ;
      var PL$24/*i*/;
      ;
      var PL$120/*all*/ = [
        
      ];
      ;
      for(PL$24/*i*/ in this["instances"]){
        PL$120/*all*/["push"](PL$24/*i*/);};
      ;
      for(PL$24/*i*/ = 0;(PL$24/*i*/ < PL$120/*all*/["length"]);++PL$24/*i*/){{
        this["removeInstance"](PL$120/*all*/[PL$24/*i*/], true);}};
      ;
      ;})
  }, [], PL$74/*inherited*/);
  return res; })();PL$121/*Transport*/;
  var PL$122/*prepConnection*/ = (function(PL$123/*connection*/, PL$124/*profile*/){
  
    ;
    var PL$125/*transport*/ = new PL$121/*Transport*/();
    ;
    PL$125/*transport*/["sendString"] = (function(PL$126/*s*/){
    
      ;
      PL$123/*connection*/["send"](PL$126/*s*/);
      ;});
    PL$123/*connection*/["on"]("data", (function(PL$127/*dataStr*/){
    
      ;
      PL$125/*transport*/["stringData"](PL$127/*dataStr*/);
      ;}));
    PL$123/*connection*/["on"]("disconnect", (function(PL$127/*dataStr*/){
    
      ;
      ;}));
    PL$123/*connection*/["createRequest"] = (function(PL$89/*data*/){
    
      ;
      return PL$125/*transport*/["newRequest"]();
      ;});
    PL$123/*connection*/["createMsg"] = (function(PL$89/*data*/){
    
      ;
      var PL$128/*msg*/ = PL$125/*transport*/["newMessage"]();
      ;
      PL$128/*msg*/["setData"](PL$89/*data*/);
      PL$128/*msg*/["send"]();
      ;});
    ;});
  ;
  var PL$129/*prepConnectionNew*/ = (function(PL$123/*connection*/, PL$130/*frame*/){
  
    ;
    var PL$125/*transport*/ = new PL$121/*Transport*/();
    ;
    PL$125/*transport*/["sendString"] = (function(PL$126/*s*/){
    
      ;
      PL$123/*connection*/["send"](PL$126/*s*/);
      ;});
    PL$125/*transport*/["canAccessFrame"] = (function(PL$131/*parFrameName*/){
    
      ;
      if(! PL$123/*connection*/["restrictLocalFrames"]){
        return true;
      };
      ;
      PL$52/*console*/["log"]("checking frame access:");
      PL$52/*console*/["log"](PL$131/*parFrameName*/);
      PL$52/*console*/["log"](PL$123/*connection*/["localFrames"]["get"](PL$131/*parFrameName*/));
      return PL$123/*connection*/["localFrames"]["get"](PL$131/*parFrameName*/);
      ;});
    PL$125/*transport*/["getSession"] = (function(){
    
      ;
      return PL$123/*connection*/["session"];
      ;});
    PL$123/*connection*/["data"] = (function(PL$127/*dataStr*/){
    
      ;
      PL$52/*console*/["log"]("string data:");
      PL$52/*console*/["log"](PL$127/*dataStr*/);
      PL$125/*transport*/["stringData"](PL$127/*dataStr*/);
      ;});
    PL$123/*connection*/["_transportDisconnect"] = (function(){
    
      ;
      PL$125/*transport*/["removeAllInstances"]();
      ;});
    PL$123/*connection*/["createRequest"] = (function(PL$89/*data*/){
    
      ;
      return PL$125/*transport*/["newRequest"]();
      ;});
    PL$123/*connection*/["createMsg"] = (function(PL$89/*data*/){
    
      ;
      var PL$128/*msg*/ = PL$125/*transport*/["newMessage"]();
      ;
      PL$128/*msg*/["setData"](PL$89/*data*/);
      PL$128/*msg*/["send"]();
      ;});
    ;});
  ;
  PL$37/*handlers*/["remove"] = (function(PL$132/*parContent*/, PL$78/*parPackage*/){
  
    ;
    try
    {
      var PL$89/*data*/ = PL$132/*parContent*/["getData"]();
      ;
      var PL$133/*t*/ = PL$132/*parContent*/["getTransport"]();
      ;
      PL$133/*t*/["removeInstance"](PL$89/*data*/["remoteId"], true);}catch(PL$26/*e*/){
      PL$52/*console*/["log"]("sync error");
      PL$52/*console*/["log"](PL$26/*e*/);};
    ;
    ;});
  PL$37/*handlers*/["remoteexec"] = (function(PL$132/*parContent*/, PL$78/*parPackage*/){
  var PL$134 = new __Promise();
  var PL$136/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$134.reject(e);
      };
    };
  };
  var PL$137/*catch rejected*/ = function(e){
    PL$134.reject(e);
  };
  var PL$119/*track*/;
  var PL$138/*err*/;
  var PL$139/*args*/;
  var PL$125/*transport*/;
  var PL$140/*session*/;
  var PL$141/*realArgs*/;
  var PL$142/*cleanUpArgs*/;
  var PL$143/*clearExtraTracks*/;
  var PL$24/*i*/;
  var PL$144/*answer*/;
  var PL$89/*data*/;
  var PL$19/*moduleData*/;
  var PL$150/*funEntry*/;
  var PL$153/*funType*/;
  var PL$154/*resultTypes*/;
  var PL$155/*isVar*/;
  var PL$159/*instance*/;
  var PL$163/*funResult*/;
  PL$136/*promiseland exception catcher*/(function(){
  
    ;
    PL$119/*track*/ = (function(){
    
      ;
      ;});
    PL$138/*err*/;
    PL$139/*args*/ = [
      
    ];
    PL$125/*transport*/ = PL$78/*parPackage*/["getTransport"]();
    PL$140/*session*/;
    if(PL$125/*transport*/["getSession"]){
      PL$140/*session*/ = PL$125/*transport*/["getSession"]();
    };
    ;
    PL$141/*realArgs*/ = [
      PL$140/*session*/
    ];
    PL$142/*cleanUpArgs*/ = (function(){
    
      ;
      var PL$24/*i*/;
      ;
      for(PL$24/*i*/ = 0;(PL$24/*i*/ < PL$139/*args*/["length"]);++PL$24/*i*/){{
        try
        {
          PL$139/*args*/[PL$24/*i*/]["track"]();}catch(PL$26/*e*/){};
        ;}};
      ;
      ;});
    PL$143/*clearExtraTracks*/ = (function(){
    
      ;
      var PL$24/*i*/;
      ;
      for(PL$24/*i*/ = 0;(PL$24/*i*/ < PL$139/*args*/["length"]);++PL$24/*i*/){{
        try
        {
          PL$139/*args*/[PL$24/*i*/]["clearExtraTracks"]();}catch(PL$26/*e*/){};
        ;}};
      ;
      ;});
    PL$24/*i*/;
    PL$144/*answer*/ = PL$132/*parContent*/["createAnswer"]();
    var PL$145 = new __Promise();
    var PL$146 = new __Promise();
    var PL$147/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$146.resolve(e); }; }; };
    var PL$148 = function(e){ PL$146.resolve(e); };
    PL$147/*try catch*/(function(){
      PL$89/*data*/ = PL$132/*parContent*/["getData"]();
      PL$19/*moduleData*/ = PL$149/*getModuleData*/(PL$89/*data*/["hashStr"]);
      PL$150/*funEntry*/ = PL$19/*moduleData*/["functions"][PL$89/*data*/["nameStr"]];
      
      var PL$151 = new __Promise();if((PL$152/*promiseland*/["isFrameLocal"](PL$150/*funEntry*/["profile"]) && (! PL$125/*transport*/["canAccessFrame"] || PL$125/*transport*/["canAccessFrame"](PL$150/*funEntry*/["profile"])))){
        PL$153/*funType*/ = PL$150/*funEntry*/["funType"];
        PL$154/*resultTypes*/ = PL$6/*getEffectiveFunctionResultType*/(PL$153/*funType*/);
        PL$155/*isVar*/ = true;
        if(! PL$2/*classSystem*/["isVar"](PL$154/*resultTypes*/["promiseResolveType"])){
          PL$155/*isVar*/ = false;
        };
        ;
        PL$24/*i*/ = 0;var PL$157 = new __Promise();
        var PL$156 = function(){var PL$158 = new __Promise();
        if((PL$24/*i*/ < PL$89/*data*/["args"]["length"])){
        PL$160/*getInstanceFromTransportData*/(PL$89/*data*/["args"][PL$24/*i*/], PL$132/*parContent*/).then(PL$147/*try catch*/(function(PL$161){PL$159/*instance*/ = PL$161;
        PL$139/*args*/["push"](PL$159/*instance*/);
        PL$158.resolve(true); return PL$158; /* continue */
        ;}), PL$148);
        ;}else{
        PL$158.resolve(false); return PL$158; /* break */
        
        };
        PL$158;return PL$158;
        };
        var PL$162 = function(){PL$156().then(function(contLoop){
        if (contLoop){++PL$24/*i*/;PL$162();}else{PL$157.resolve();};
        });
        };
        PL$162();
        PL$157.then(function(){;
        ;
        for(PL$24/*i*/ = 0;(PL$24/*i*/ < PL$139/*args*/["length"]);++PL$24/*i*/){{
          PL$141/*realArgs*/["push"](PL$139/*args*/[PL$24/*i*/]["getInstanceAsType"](PL$2/*classSystem*/["getFunctionArgumentType"](PL$153/*funType*/, PL$24/*i*/)));}};
        ;
        PL$142/*cleanUpArgs*/();
        PL$163/*funResult*/ = PL$150/*funEntry*/["fun"]["apply"](undefined, PL$141/*realArgs*/);
        if(PL$154/*resultTypes*/["isTemporary"]){
          PL$119/*track*/ = PL$163/*funResult*/[1];
          PL$163/*funResult*/ = PL$163/*funResult*/[0];
        };
        ;
        var PL$164 = new __Promise();
        var PL$165 = new __Promise();
        var PL$166/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$165.resolve(e); }; }; };
        var PL$167 = function(e){ PL$165.resolve(e); };
        PL$166/*try catch*/(function(){
          PL$163/*funResult*/.then(PL$166/*try catch*/(function(PL$169){PL$144/*answer*/["setData"]({
            "data": PL$168/*getInstanceTransportData*/(PL$154/*resultTypes*/["promiseResolveType"], PL$169, PL$144/*answer*/)
          });
          PL$164.resolve();}), PL$167);
        ;})();
        PL$165.then(PL$147/*try catch*/(function(PL$26/*e*/){
          PL$52/*console*/["log"]("answer error");
          PL$52/*console*/["log"](PL$26/*e*/);
          PL$144/*answer*/["setData"]({
            "err": PL$26/*e*/
          });
          PL$164.resolve();;}));
        PL$164.then(PL$147/*try catch*/(function(){;
        ;
        PL$52/*console*/["log"]("send answer:");
        PL$52/*console*/["log"](PL$144/*answer*/["getData"]());
        PL$144/*answer*/["send"]();
        PL$119/*track*/();
        PL$134.resolve(); return;
        PL$151.resolve();;}), PL$148)});
      }else{PL$151.resolve();
      };PL$151.then(PL$147/*try catch*/(function(PL$170){PL$170;;
      ;
      PL$145.resolve();}), PL$148);
    ;})();
    PL$146.then(PL$136/*promiseland exception catcher*/(function(PL$26/*e*/){
      PL$138/*err*/ = PL$26/*e*/;
      PL$52/*console*/["log"]("remoteexec error");
      PL$52/*console*/["log"](PL$26/*e*/);
      PL$142/*cleanUpArgs*/();
      PL$143/*clearExtraTracks*/();
      PL$145.resolve();;}));
    PL$145.then(PL$136/*promiseland exception catcher*/(function(){;
    ;
    PL$144/*answer*/["setData"]({
      "err": (PL$138/*err*/ || PL$18/*errorMsg*/["canNotExecute"])
    });
    PL$144/*answer*/["send"]();
    PL$52/*console*/["log"]("error answer send");
    PL$119/*track*/();
    PL$142/*cleanUpArgs*/();
    PL$52/*console*/["log"]("remote exec fail end");
    PL$134.resolve(); return;
    PL$134.resolve(); return;}), PL$137/*catch rejected*/)
  })();return PL$134;
  });
  PL$168/*getInstanceTransportData*/ = (function(PL$104/*parType*/, PL$23/*parData*/, PL$132/*parContent*/){
  
    ;
    if((PL$23/*parData*/ === undefined)){
      return undefined;
    };
    ;
    if(PL$2/*classSystem*/["isVar"](PL$104/*parType*/)){
      return [
        PL$23/*parData*/
      ];
    };
    ;
    var PL$159/*instance*/ = new PL$5/*DynInstance*/(PL$104/*parType*/, PL$23/*parData*/);
    ;
    try
    {
      var PL$171/*getInstanceFun*/ = (function(PL$104/*parType*/, PL$172/*_parData*/){
      
        ;
        return PL$168/*getInstanceTransportData*/(PL$104/*parType*/, PL$172/*_parData*/, PL$132/*parContent*/);
        ;});
      ;
      var PL$173/*getTypeFun*/ = (function(PL$104/*parType*/){
      
        ;
        return PL$174/*getTypeTransportData*/(PL$104/*parType*/, PL$132/*parContent*/);
        ;});
      ;
      var PL$133/*t*/ = PL$132/*parContent*/["getTransport"]();
      ;
      var PL$111/*internalId*/ = PL$159/*instance*/["getInternalId"]();
      ;
      var PL$115/*remoteId*/ = PL$133/*t*/["getInstanceRemoteId"](PL$159/*instance*/["instance"]);
      ;
      var PL$175/*request*/ = PL$132/*parContent*/["newRequest"]();
      ;
      if((PL$115/*remoteId*/ !== undefined)){
        PL$175/*request*/["setData"]({
          "type": "instance",
          "remoteId": PL$115/*remoteId*/
        });
      }else{
      PL$175/*request*/["setData"]({
        "type": "addInstance",
        "id": PL$111/*internalId*/,
        "data": PL$2/*classSystem*/["getInstanceSyncData"](PL$159/*instance*/, PL$171/*getInstanceFun*/, PL$173/*getTypeFun*/)
      });
      };
      ;
      PL$175/*request*/["send"]();
      (function(){
      var PL$176 = new __Promise();
      var PL$178/*promiseland exception catcher*/ = function(code){
        return function(res){
          try{ code(res); }catch(e){
            PL$176.reject(e);
          };
        };
      };
      var PL$179/*catch rejected*/ = function(e){
        PL$176.reject(e);
      };
      var PL$144/*answer*/;
      var PL$185/*answerData*/;
      PL$178/*promiseland exception catcher*/(function(){
      
        ;
        var PL$180 = new __Promise();
        var PL$181 = new __Promise();
        var PL$182/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$181.resolve(e); }; }; };
        var PL$183 = function(e){ PL$181.resolve(e); };
        PL$182/*try catch*/(function(){
          PL$175/*request*/["answerPs"].then(PL$182/*try catch*/(function(PL$184){PL$144/*answer*/ = PL$184;
          PL$185/*answerData*/ = PL$144/*answer*/["getData"]();
          if((PL$185/*answerData*/["id"] !== undefined)){
            PL$133/*t*/["addInstance"](PL$159/*instance*/, PL$185/*answerData*/["id"], (PL$159/*instance*/["isServe"]() ? PL$159/*instance*/["getTrack"]() : undefined));
          };
          ;
          PL$180.resolve();}), PL$183);
        ;})();
        PL$181.then(PL$178/*promiseland exception catcher*/(function(PL$26/*e*/){
          PL$180.resolve();;}));
        PL$180.then(PL$178/*promiseland exception catcher*/(function(){;
        ;
        PL$159/*instance*/["track"]();
        PL$176.resolve(); return;}), PL$179/*catch rejected*/)
      })();return PL$176;
      })();
      var PL$94/*ret*/ = PL$175/*request*/["getId"]();
      ;}catch(PL$26/*e*/){
      PL$52/*console*/["log"]("getInstanceTransportData error");
      PL$52/*console*/["log"](PL$26/*e*/);
      if(PL$159/*instance*/){
        PL$159/*instance*/["track"]();
      };
      ;
      throw {
        "position": "getInstanceTransportData",
        "error": PL$26/*e*/
      };};
    ;
    return PL$94/*ret*/;
    ;});
  PL$160/*getInstanceFromTransportData*/ = (function(PL$23/*parData*/, PL$132/*parContent*/){
  var PL$186 = new __Promise();
  var PL$188/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$186.reject(e);
      };
    };
  };
  var PL$189/*catch rejected*/ = function(e){
    PL$186.reject(e);
  };
  var PL$190/*remoteType*/;
  var PL$191/*remoteVar*/;
  var PL$192/*remoteInstance*/;
  var PL$193/*req*/;
  PL$188/*promiseland exception catcher*/(function(){
  
    ;
    if(((PL$23/*parData*/ === undefined) || (PL$23/*parData*/ === null))){
      PL$186.resolve(new PL$5/*DynInstance*/(PL$2/*classSystem*/["getBuiltinType"]("var"), undefined)); return;
      ;
    };
    ;
    PL$190/*remoteType*/;
    PL$191/*remoteVar*/ = false;
    PL$192/*remoteInstance*/;
    if((PL$23/*parData*/["length"] === 1)){
      PL$186.resolve(new PL$5/*DynInstance*/(PL$2/*classSystem*/["getBuiltinType"]("var"), PL$23/*parData*/[0])); return;
    };
    ;
    PL$193/*req*/ = PL$132/*parContent*/["getRequest"](PL$23/*parData*/);
    PL$193/*req*/["localPs"].then(PL$188/*promiseland exception catcher*/(function(PL$194){PL$186.resolve(PL$194); return;
    PL$186.resolve(); return;}), PL$189/*catch rejected*/);
    ;
  })();return PL$186;
  });
  var PL$195/*getInstanceFromSyncData*/ = (function(PL$23/*parData*/, PL$132/*parContent*/){
  var PL$196 = new __Promise();
  var PL$198/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$196.reject(e);
      };
    };
  };
  var PL$199/*catch rejected*/ = function(e){
    PL$196.reject(e);
  };
  var PL$200/*tempAr*/;
  var PL$201/*clearTempAr*/;
  var PL$133/*t*/;
  var PL$24/*i*/;
  var PL$94/*ret*/;
  PL$198/*promiseland exception catcher*/(function(){
  
    ;
    PL$200/*tempAr*/ = [
      
    ];
    PL$201/*clearTempAr*/ = (function(){
    
      ;
      var PL$24/*i*/ = 1;
      ;
      for(PL$24/*i*/ = 1;(PL$24/*i*/ < PL$200/*tempAr*/["length"]);++PL$24/*i*/){{
        try
        {
          PL$200/*tempAr*/[PL$24/*i*/]["track"]();}catch(PL$26/*e*/){};
        ;}};
      ;
      ;});
    var PL$202 = new __Promise();
    var PL$203 = new __Promise();
    var PL$204/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$203.resolve(e); }; }; };
    var PL$205 = function(e){ PL$203.resolve(e); };
    PL$204/*try catch*/(function(){
      PL$133/*t*/ = PL$132/*parContent*/["getTransport"]();
      PL$206/*getTypeFromTransportData*/(PL$23/*parData*/[0], PL$132/*parContent*/).then(PL$204/*try catch*/(function(PL$207){PL$200/*tempAr*/["push"](PL$207);
      PL$24/*i*/ = 1;
      PL$24/*i*/ = 1;var PL$209 = new __Promise();
      var PL$208 = function(){var PL$210 = new __Promise();
      if((PL$24/*i*/ < PL$23/*parData*/["length"])){
      PL$160/*getInstanceFromTransportData*/(PL$23/*parData*/[PL$24/*i*/], PL$132/*parContent*/).then(PL$204/*try catch*/(function(PL$211){PL$200/*tempAr*/["push"](PL$211);
      PL$210.resolve(true); return PL$210; /* continue */
      ;}), PL$205);
      ;}else{
      PL$210.resolve(false); return PL$210; /* break */
      
      };
      PL$210;return PL$210;
      };
      var PL$212 = function(){PL$208().then(function(contLoop){
      if (contLoop){++PL$24/*i*/;PL$212();}else{PL$209.resolve();};
      });
      };
      PL$212();
      PL$209.then(function(){;
      ;
      PL$94/*ret*/ = PL$2/*classSystem*/["getInstanceFromSyncData"](PL$200/*tempAr*/);
      PL$202.resolve();});}), PL$205);
    ;})();
    PL$203.then(PL$198/*promiseland exception catcher*/(function(PL$26/*e*/){
      PL$201/*clearTempAr*/();
      throw PL$26/*e*/;
      PL$202.resolve();;}));
    PL$202.then(PL$198/*promiseland exception catcher*/(function(){;
    ;
    PL$201/*clearTempAr*/();
    PL$196.resolve(PL$94/*ret*/); return;
    PL$196.resolve(); return;}), PL$199/*catch rejected*/)
  })();return PL$196;
  });
  ;
  PL$37/*handlers*/["addInstance"] = (function(PL$132/*parContent*/, PL$78/*parPackage*/){
  var PL$213 = new __Promise();
  var PL$215/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$213.reject(e);
      };
    };
  };
  var PL$216/*catch rejected*/ = function(e){
    PL$213.reject(e);
  };
  var PL$144/*answer*/;
  var PL$159/*instance*/;
  var PL$133/*t*/;
  var PL$89/*data*/;
  var PL$111/*internalId*/;
  PL$215/*promiseland exception catcher*/(function(){
  
    ;
    PL$144/*answer*/ = PL$132/*parContent*/["createAnswer"]();
    PL$159/*instance*/;
    var PL$217 = new __Promise();
    var PL$218 = new __Promise();
    var PL$219/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$218.resolve(e); }; }; };
    var PL$220 = function(e){ PL$218.resolve(e); };
    PL$219/*try catch*/(function(){
      PL$133/*t*/ = PL$78/*parPackage*/["getTransport"]();
      PL$89/*data*/ = PL$132/*parContent*/["getData"]();
      PL$195/*getInstanceFromSyncData*/(PL$89/*data*/["data"], PL$132/*parContent*/).then(PL$219/*try catch*/(function(PL$221){PL$159/*instance*/ = PL$221;
      PL$111/*internalId*/ = PL$159/*instance*/["getInternalId"]();
      PL$133/*t*/["addInstance"](PL$159/*instance*/, PL$89/*data*/["id"]);
      PL$144/*answer*/["setData"]({
        "id": PL$111/*internalId*/
      });
      PL$144/*answer*/["send"]();
      PL$132/*parContent*/["localPs"]["resolve"](PL$159/*instance*/);
      PL$213.resolve(); return;
      PL$217.resolve();}), PL$220);
    ;})();
    PL$218.then(PL$215/*promiseland exception catcher*/(function(PL$26/*e*/){
      if(PL$159/*instance*/){
        PL$159/*instance*/["track"]();
      };
      ;
      PL$52/*console*/["log"]("answer error 3");
      PL$52/*console*/["log"](PL$26/*e*/);
      PL$144/*answer*/["setData"]({
        "err": PL$26/*e*/
      });
      PL$144/*answer*/["send"]();
      PL$132/*parContent*/["localPs"]["reject"](PL$26/*e*/);
      throw PL$26/*e*/;
      PL$217.resolve();;}));
    PL$217.then(PL$215/*promiseland exception catcher*/(function(){;
    ;
    PL$213.resolve(); return;}), PL$216/*catch rejected*/)
  })();return PL$213;
  });
  PL$37/*handlers*/["instance"] = (function(PL$132/*parContent*/, PL$78/*parPackage*/){
  
    ;
    var PL$144/*answer*/ = PL$132/*parContent*/["createAnswer"]();
    ;
    var PL$159/*instance*/;
    ;
    try
    {
      var PL$133/*t*/ = PL$78/*parPackage*/["getTransport"]();
      ;
      var PL$89/*data*/ = PL$132/*parContent*/["getData"]();
      ;
      var PL$111/*internalId*/ = PL$89/*data*/["remoteId"];
      ;
      var PL$222/*realInstance*/ = PL$3/*internalObjects*/[PL$111/*internalId*/];
      ;
      if(PL$222/*realInstance*/){
        PL$159/*instance*/ = new PL$5/*DynInstance*/(undefined, PL$222/*realInstance*/);
        PL$144/*answer*/["setData"]({
          
        });
        PL$144/*answer*/["send"]();
        PL$132/*parContent*/["localPs"]["resolve"](PL$159/*instance*/);
      }else{
      throw PL$18/*errorMsg*/["missingImplementation"];
      };
      ;}catch(PL$26/*e*/){
      if(PL$159/*instance*/){
        PL$159/*instance*/["track"]();
      };
      ;
      PL$52/*console*/["log"]("answer error 4");
      PL$52/*console*/["log"](PL$26/*e*/);
      PL$144/*answer*/["setData"]({
        "err": PL$26/*e*/
      });
      PL$144/*answer*/["send"]();
      PL$132/*parContent*/["localPs"]["reject"](PL$26/*e*/);
      throw PL$26/*e*/;};
    ;
    ;});
  PL$174/*getTypeTransportData*/ = (function(PL$104/*parType*/, PL$132/*parContent*/){
  
    ;
    if(! PL$2/*classSystem*/["isSyncedClass"](PL$104/*parType*/)){
      throw PL$18/*errorMsg*/["noSyncableData"];
    };
    ;
    var PL$133/*t*/ = PL$132/*parContent*/["getTransport"]();
    ;
    var PL$108/*typeIds*/ = PL$133/*t*/["addType"](PL$104/*parType*/);
    ;
    if((PL$108/*typeIds*/ && (PL$108/*typeIds*/["remoteId"] !== undefined))){
      return PL$108/*typeIds*/["remoteId"];
    };
    ;
    var PL$175/*request*/ = PL$132/*parContent*/["newRequest"]();
    ;
    PL$175/*request*/["setData"]({
      "type": "addType",
      "syncId": PL$2/*classSystem*/["getSyncId"](PL$104/*parType*/),
      "typeId": PL$108/*typeIds*/["id"]
    });
    PL$175/*request*/["send"]();
    (function(){
    var PL$223 = new __Promise();
    var PL$225/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$223.reject(e);
        };
      };
    };
    var PL$226/*catch rejected*/ = function(e){
      PL$223.reject(e);
    };
    var PL$144/*answer*/;
    var PL$89/*data*/;
    PL$225/*promiseland exception catcher*/(function(){
    
      ;
      PL$175/*request*/["answerPs"].then(PL$225/*promiseland exception catcher*/(function(PL$227){PL$144/*answer*/ = PL$227;
      PL$89/*data*/ = PL$144/*answer*/["getData"]();
      if(! PL$89/*data*/["err"]){
        PL$108/*typeIds*/["remoteId"] = PL$89/*data*/["id"];
      };
      ;
      PL$223.resolve(); return;}), PL$226/*catch rejected*/);
      ;
    })();return PL$223;
    })();
    return [
      PL$175/*request*/["getId"]()
    ];
    ;});
  PL$206/*getTypeFromTransportData*/ = (function(PL$23/*parData*/, PL$132/*parContent*/){
  var PL$228 = new __Promise();
  var PL$230/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$228.reject(e);
      };
    };
  };
  var PL$231/*catch rejected*/ = function(e){
    PL$228.reject(e);
  };
  var PL$133/*t*/;
  var PL$54/*type*/;
  var PL$193/*req*/;
  PL$230/*promiseland exception catcher*/(function(){
  
    ;
    PL$133/*t*/ = PL$132/*parContent*/["getTransport"]();
    PL$54/*type*/;
    if((typeof PL$23/*parData*/ === "number")){
      PL$54/*type*/ = PL$133/*t*/["getTypeById"](PL$23/*parData*/);
      PL$228.resolve(PL$54/*type*/); return;
    };
    ;
    PL$193/*req*/ = PL$132/*parContent*/["getRequest"](PL$23/*parData*/[0]);
    PL$193/*req*/["localPs"].then(PL$230/*promiseland exception catcher*/(function(PL$232){PL$228.resolve(PL$232); return;
    PL$228.resolve(); return;}), PL$231/*catch rejected*/);
    ;
  })();return PL$228;
  });
  var PL$233/*getRemoteType*/ = (function(PL$23/*parData*/, PL$132/*parContent*/){
  
    ;
    if((typeof PL$23/*parData*/ == "number")){
      var PL$133/*t*/ = PL$132/*parContent*/["getTransport"]();
      ;
      return PL$133/*t*/["getRemoteType"](PL$23/*parData*/);
    };
    ;
    throw PL$18/*errorMsg*/["invalidRemoteType"];
    ;});
  ;
  PL$37/*handlers*/["addType"] = (function(PL$132/*parContent*/, PL$78/*parPackage*/){
  
    ;
    var PL$144/*answer*/ = PL$132/*parContent*/["createAnswer"]();
    ;
    var PL$89/*data*/ = PL$132/*parContent*/["getData"]();
    ;
    var PL$54/*type*/ = PL$4/*getClassBySyncId*/(PL$89/*data*/["syncId"]);
    ;
    if(! PL$54/*type*/){
      PL$132/*parContent*/["localPs"]["reject"](PL$18/*errorMsg*/["remoteTypeNotAvailable"]);
      PL$144/*answer*/["setData"]({
        "err": PL$18/*errorMsg*/["remoteTypeNotAvailable"]
      });
      PL$144/*answer*/["send"]();
      return;
    };
    ;
    var PL$109/*typeIdInt*/ = PL$89/*data*/["typeId"];
    ;
    var PL$133/*t*/ = PL$78/*parPackage*/["getTransport"]();
    ;
    var PL$108/*typeIds*/ = PL$133/*t*/["addType"](PL$54/*type*/, PL$109/*typeIdInt*/);
    ;
    PL$144/*answer*/["setData"]({
      "id": PL$108/*typeIds*/["id"]
    });
    PL$144/*answer*/["send"]();
    PL$132/*parContent*/["localPs"]["resolve"](PL$54/*type*/);
    ;});
  var PL$234/*createRemoteExecRequest*/ = (function(PL$235/*par*/){
  var PL$236 = new __Promise();
  var PL$238/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$236.reject(e);
      };
    };
  };
  var PL$239/*catch rejected*/ = function(e){
    PL$236.reject(e);
  };
  var PL$123/*connection*/;
  var PL$153/*funType*/;
  var PL$154/*resultTypes*/;
  var PL$175/*request*/;
  var PL$139/*args*/;
  var PL$24/*i*/;
  var PL$144/*answer*/;
  var PL$89/*data*/;
  var PL$159/*instance*/;
  var PL$94/*ret*/;
  PL$238/*promiseland exception catcher*/(function(){
  
    ;
    var PL$240 = new __Promise();
    var PL$241 = new __Promise();
    var PL$242/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$241.resolve(e); }; }; };
    var PL$243 = function(e){ PL$241.resolve(e); };
    PL$242/*try catch*/(function(){
      PL$123/*connection*/ = PL$235/*par*/["connection"];
      PL$153/*funType*/ = PL$235/*par*/["funType"];
      PL$154/*resultTypes*/ = PL$6/*getEffectiveFunctionResultType*/(PL$153/*funType*/);
      PL$175/*request*/ = PL$123/*connection*/["createRequest"]();
      PL$139/*args*/ = [
        
      ];
      if((PL$235/*par*/["args"] && PL$235/*par*/["args"]["length"])){
        PL$24/*i*/ = 0;
        for(PL$24/*i*/ = 0;(PL$24/*i*/ < PL$235/*par*/["args"]["length"]);++PL$24/*i*/){{
          PL$139/*args*/["push"](PL$168/*getInstanceTransportData*/(PL$2/*classSystem*/["getFunctionArgumentType"](PL$153/*funType*/, PL$24/*i*/), PL$235/*par*/["args"][PL$24/*i*/], PL$175/*request*/));}};
        ;
      };
      ;
      PL$175/*request*/["setData"]({
        "type": "remoteexec",
        "hashStr": PL$235/*par*/["hashStr"],
        "nameStr": PL$235/*par*/["nameStr"],
        "args": PL$139/*args*/
      });
      PL$175/*request*/["send"]();
      PL$175/*request*/["answerPs"].then(PL$242/*try catch*/(function(PL$244){PL$144/*answer*/ = PL$244;
      PL$89/*data*/ = PL$144/*answer*/["getData"]();
      if(PL$89/*data*/["err"]){
        throw PL$89/*data*/["err"];
      };
      ;
      PL$160/*getInstanceFromTransportData*/(PL$89/*data*/["data"], PL$144/*answer*/).then(PL$242/*try catch*/(function(PL$245){PL$159/*instance*/ = PL$245;
      PL$94/*ret*/ = PL$159/*instance*/["getInstanceAsType"](PL$154/*resultTypes*/["promiseResolveType"]);
      PL$240.resolve();}), PL$243);
    ;}), PL$243);
    ;})();
    PL$241.then(PL$238/*promiseland exception catcher*/(function(PL$26/*e*/){
      if(PL$159/*instance*/){
        PL$159/*instance*/["track"]();
      };
      ;
      PL$52/*console*/["log"]("createRemoteExecRequest error");
      PL$52/*console*/["log"](PL$26/*e*/);
      throw PL$26/*e*/;
      PL$240.resolve();;}));
    PL$240.then(PL$238/*promiseland exception catcher*/(function(){;
    ;
    if(PL$159/*instance*/){
      PL$159/*instance*/["track"]();
    };
    ;
    PL$236.resolve(PL$94/*ret*/); return;
    PL$236.resolve(); return;}), PL$239/*catch rejected*/)
  })();return PL$236;
  });
  ;
  var PL$246/*findProfile*/ = (function(PL$247/*profileNameStr*/){
  
    ;
    return PL$20/*profiles*/[PL$247/*profileNameStr*/];
    ;});
  ;
  PL$149/*getModuleData*/ = (function(PL$103/*parHash*/){
  
    ;
    if(! PL$19/*moduleData*/[PL$103/*parHash*/]){
      PL$19/*moduleData*/[PL$103/*parHash*/] = {
        "functions": {
          
        },
        "classes": {
          
        }
      };
    };
    ;
    return PL$19/*moduleData*/[PL$103/*parHash*/];
    ;});
  PL$250/*Session*/ = (function(){var PL$248/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(PL$249/*parConnection*/){
    
      ;
      this["connection"] = PL$249/*parConnection*/;
      ;})
  }, [], PL$248/*inherited*/);
  return res; })();PL$250/*Session*/;
  var PL$251/*FrameConnection*/ = (function(){var PL$252/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(){
    
      ;
      this["session"] = new this["SessionBaseClass"](this);
      this["localFrames"] = new PL$152/*promiseland*/["Map"]();
      ;}),
    "restrictLocalFrames": false,
    "addLocalFrameAccess": (function(PL$253/*parName*/){
    
      ;
      this["localFrames"]["set"](PL$253/*parName*/, true);
      ;}),
    "removeLocalFrameAccess": (function(PL$253/*parName*/){
    
      ;
      this["localFrames"]["set"](PL$253/*parName*/, false);
      ;}),
    "SessionBaseClass": PL$250/*Session*/,
    "send": (function(PL$32/*parStr*/){
    
      ;
      ;}),
    "data": (function(PL$32/*parStr*/){
    
      ;
      ;}),
    "disconnect": (function(){
    
      ;
      this["frame"]["removeConnection"](this);
      if(this["_transportDisconnect"]){
        this["_transportDisconnect"]();
      };
      ;
      ;})
  }, [], PL$252/*inherited*/);
  return res; })();
  ;
  var PL$254/*Frame*/ = (function(){var PL$255/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(){
    
      ;
      this["connections"] = [
        
      ];
      ;}),
    "name": undefined,
    "ConnectionBaseClass": PL$251/*FrameConnection*/,
    "SessionBaseClass": PL$250/*Session*/,
    "newConnection": (function(PL$249/*parConnection*/){
    
      ;
      PL$249/*parConnection*/["frame"] = this;
      this["connections"]["push"](PL$249/*parConnection*/);
      PL$129/*prepConnectionNew*/(PL$249/*parConnection*/, this);
      ;}),
    "removeConnection": (function(PL$249/*parConnection*/){
    
      ;
      var PL$24/*i*/ = 0;
      ;
      for(PL$24/*i*/ = 0;(PL$24/*i*/ < this["connections"]["length"]);++PL$24/*i*/){{
        if((this["connections"][PL$24/*i*/] === PL$249/*parConnection*/)){
          this["connections"]["splice"](PL$24/*i*/, 1);
          return;
        };
        ;}};
      ;
      ;}),
    "getConnection": (function(){
    
      ;
      if((this["connections"]["length"] === 1)){
        return this["connections"][0];
      };
      ;
      if((this["connections"]["length"] > 1)){
        throw PL$18/*errorMsg*/["toManyConnections"];
      };
      ;
      throw PL$18/*errorMsg*/["noConnectionAvailable"];
      ;})
  }, [], PL$255/*inherited*/);
  return res; })();
  ;
  PL$152/*promiseland*/["FrameBaseClass"] = PL$254/*Frame*/;
  var PL$256/*frames*/ = new PL$152/*promiseland*/["Map"]();
  ;
  PL$152/*promiseland*/["addFrame"] = (function(PL$257/*parFrame*/){
  
    ;
    var PL$107/*entry*/ = PL$256/*frames*/["get"](PL$257/*parFrame*/["name"]);
    ;
    if(! PL$107/*entry*/){
      PL$107/*entry*/ = [
        
      ];
      PL$256/*frames*/["set"](PL$257/*parFrame*/["name"], PL$107/*entry*/);
    };
    ;
    PL$107/*entry*/["push"](PL$257/*parFrame*/);
    ;});
  var PL$258/*findFrame*/ = (function(PL$253/*parName*/){
  
    ;
    var PL$107/*entry*/ = PL$256/*frames*/["get"](PL$253/*parName*/);
    ;
    if(! PL$107/*entry*/){
      return;
    };
    ;
    return PL$107/*entry*/[0];
    ;});
  ;
  var PL$259/*localFrameMap*/ = new PL$152/*promiseland*/["Map"]();
  ;
  PL$152/*promiseland*/["isFrameLocal"] = (function(PL$131/*parFrameName*/){
  
    ;
    if(PL$259/*localFrameMap*/["has"](PL$131/*parFrameName*/)){
      return true;
    };
    ;
    return false;
    ;});
  PL$152/*promiseland*/["addLocalFrameName"] = (function(PL$131/*parFrameName*/){
  
    ;
    PL$259/*localFrameMap*/["set"](PL$131/*parFrameName*/, true);
    ;});
  PL$152/*promiseland*/["removeLocalFrameName"] = (function(PL$131/*parFrameName*/){
  
    ;
    PL$259/*localFrameMap*/["delete"](PL$131/*parFrameName*/);
    ;});
  PL$152/*promiseland*/["ProfileBaseClass"] = PL$29/*Profile*/;
  PL$152/*promiseland*/["ConnectionBaseClass"] = PL$31/*Connection*/;
  PL$152/*promiseland*/["addProfile"] = (function(PL$260/*parProfile*/){
  
    ;
    if(! PL$260/*parProfile*/){
      return;
    };
    ;
    if(PL$20/*profiles*/[PL$260/*parProfile*/["name"]()]){
      throw {
        "code": 4,
        "msg": "profile exists"
      };
    };
    ;
    PL$20/*profiles*/[PL$260/*parProfile*/["name"]()] = PL$260/*parProfile*/;
    PL$260/*parProfile*/["on"]("connection", (function(PL$123/*connection*/){
    
      ;
      PL$122/*prepConnection*/(PL$123/*connection*/, PL$260/*parProfile*/);
      ;}));
    ;});
  PL$152/*promiseland*/["profileHas"] = (function(PL$247/*profileNameStr*/){
  
    ;
    return PL$152/*promiseland*/["isFrameLocal"](PL$247/*profileNameStr*/);
    ;});
  PL$152/*promiseland*/["registerRemote"] = (function(PL$247/*profileNameStr*/, PL$261/*hashStr*/, PL$262/*nameStr*/, PL$263/*fun*/, PL$153/*funType*/){
  
    ;
    var PL$19/*moduleData*/ = PL$149/*getModuleData*/(PL$261/*hashStr*/);
    ;
    var PL$107/*entry*/ = {
      "profile": PL$247/*profileNameStr*/,
      "fun": PL$263/*fun*/,
      "funType": PL$153/*funType*/
    };
    ;
    PL$19/*moduleData*/["functions"][PL$262/*nameStr*/] = PL$107/*entry*/;
    PL$2/*classSystem*/["definitionPromise"](PL$153/*funType*/)["then"]((function(PL$264/*definedFunType*/){
    
      ;
      PL$107/*entry*/["funType"] = PL$264/*definedFunType*/;
      ;}));
    ;});
  PL$152/*promiseland*/["remoteExec"] = (function(PL$261/*hashStr*/, PL$262/*nameStr*/, PL$139/*args*/){
  
    ;
    var PL$19/*moduleData*/ = PL$149/*getModuleData*/(PL$261/*hashStr*/);
    ;
    if((! PL$19/*moduleData*/ || ! PL$19/*moduleData*/["functions"][PL$262/*nameStr*/])){
      throw PL$18/*errorMsg*/["missingRemoteFun"];
    };
    ;
    var PL$107/*entry*/ = PL$19/*moduleData*/["functions"][PL$262/*nameStr*/];
    ;
    var PL$124/*profile*/ = PL$246/*findProfile*/(PL$107/*entry*/["profile"]);
    ;
    var PL$123/*connection*/;
    ;
    if(PL$124/*profile*/){
      PL$123/*connection*/ = PL$124/*profile*/["find"]();
    }else{
    PL$124/*profile*/ = PL$258/*findFrame*/(PL$107/*entry*/["profile"]);
    if(PL$124/*profile*/){
      PL$123/*connection*/ = PL$124/*profile*/["getConnection"]();
    };
    ;
    };
    ;
    if(! PL$124/*profile*/){
      throw PL$18/*errorMsg*/["frameNotFound"];
    };
    ;
    if(! PL$123/*connection*/){
      throw {
        "code": 3,
        "msg": "no connection available"
      };
    };
    ;
    var PL$154/*resultTypes*/ = PL$6/*getEffectiveFunctionResultType*/(PL$107/*entry*/["funType"]);
    ;
    try
    {
      var PL$265/*resultPromise*/ = PL$154/*resultTypes*/["newPromise"]();
      ;
      (function(){
      var PL$266 = new __Promise();
      var PL$268/*promiseland exception catcher*/ = function(code){
        return function(res){
          try{ code(res); }catch(e){
            PL$266.reject(e);
          };
        };
      };
      var PL$269/*catch rejected*/ = function(e){
        PL$266.reject(e);
      };
      var PL$274/*tempRes*/;
      var PL$275/*realRes*/;
      PL$268/*promiseland exception catcher*/(function(){
      
        ;
        var PL$270 = new __Promise();
        var PL$271 = new __Promise();
        var PL$272/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$271.resolve(e); }; }; };
        var PL$273 = function(e){ PL$271.resolve(e); };
        PL$272/*try catch*/(function(){
          PL$274/*tempRes*/ = PL$234/*createRemoteExecRequest*/({
            "connection": PL$123/*connection*/,
            "hashStr": PL$261/*hashStr*/,
            "nameStr": PL$262/*nameStr*/,
            "args": PL$139/*args*/,
            "funType": PL$107/*entry*/["funType"]
          });
          PL$274/*tempRes*/.then(PL$272/*try catch*/(function(PL$276){PL$275/*realRes*/ = PL$276;
          PL$154/*resultTypes*/["resolvePromise"](PL$265/*resultPromise*/, PL$275/*realRes*/);
          PL$270.resolve();}), PL$273);
        ;})();
        PL$271.then(PL$268/*promiseland exception catcher*/(function(PL$26/*e*/){
          PL$154/*resultTypes*/["rejectPromise"](PL$265/*resultPromise*/, PL$26/*e*/);
          PL$270.resolve();;}));
        PL$270.then(PL$268/*promiseland exception catcher*/(function(){;
        ;
        PL$266.resolve(); return;}), PL$269/*catch rejected*/)
      })();return PL$266;
      })();}catch(PL$26/*e*/){
      PL$154/*resultTypes*/["rejectPromise"](PL$265/*resultPromise*/, PL$26/*e*/);};
    ;
    return PL$265/*resultPromise*/;
    ;});
  PL$11/*extra*/["moduleSystemPs"]["resolve"]({
    "getModuleData": PL$149/*getModuleData*/
  });
  PL$11/*extra*/["framesPs"]["resolve"]({
    "getInstanceFromTransportData": PL$160/*getInstanceFromTransportData*/,
    "getInstanceTransportData": PL$168/*getInstanceTransportData*/,
    "handlers": PL$37/*handlers*/
  });
  return;
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();