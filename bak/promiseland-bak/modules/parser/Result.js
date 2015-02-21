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
    if (promiseland._hasModule({ hashStr: "2dcce3264c7e9e3c85f5b5fbd3d450e8" })){ return promiseland._getModule("2dcce3264c7e9e3c85f5b5fbd3d450e8"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "2dcce3264c7e9e3c85f5b5fbd3d450e8", "module": PL$1, promising: true });
var PL$16/*Array*/;try{PL$16/*Array*/ = Array;}catch(e){};
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
var PL$11/*_Result*/;
var PL$18/*IndentTracker*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  __requireFun("./basics").then(PL$3/*promiseland exception catcher*/(function(PL$6){PL$5/*basics*/ = PL$6;
  PL$7/*errorFun*/ = PL$5/*basics*/["errorFun"];
  PL$8/*errorMsg*/ = PL$5/*basics*/["errorMsg"];
  PL$9/*_stringEncodeStr*/ = PL$5/*basics*/["_stringEncodeStr"];
  PL$10/*stringEncodeStr*/ = PL$5/*basics*/["stringEncodeStr"];
  PL$11/*_Result*/ = (function(PL$12/*par*/){
  
    ;
    if(PL$12/*par*/["codeStr"]){
      this["codeStr"] = PL$12/*par*/["codeStr"];
    }else{
    this["codeAr"] = [
      
    ];
    };
    ;
    this["_cp"] = PL$12/*par*/["cp"];
    ;});
  PL$11/*_Result*/["prototype"] = {
    "pushType": (function(PL$12/*par*/){
    
      ;
      this["push"](PL$12/*par*/);
      this["setType"](PL$12/*par*/["getType"]());
      ;}),
    "_prepCode": (function(PL$13/*parCode*/, PL$14/*parReference*/, PL$12/*par*/){
    
      ;
      if((typeof PL$13/*parCode*/ == "string")){
        PL$13/*parCode*/ = this["newResult"]({
          "codeStr": PL$13/*parCode*/,
          "reference": PL$14/*parReference*/
        });
      };
      ;
      var PL$15/*res*/;
      ;
      if((PL$12/*par*/ && PL$12/*par*/["stringEncode"])){
        PL$15/*res*/ = this["newResult"]();
        PL$15/*res*/["_stringEncode"] = true;
        PL$15/*res*/["push"](PL$13/*parCode*/);
        PL$13/*parCode*/ = PL$15/*res*/;
      };
      ;
      if((PL$12/*par*/ && PL$12/*par*/["dynamic"])){
        PL$15/*res*/ = this["newResult"]();
        PL$15/*res*/["_dynamic"] = true;
        PL$15/*res*/["push"]("\" + ");
        PL$15/*res*/["push"](PL$13/*parCode*/);
        PL$15/*res*/["push"](" + \"");
        PL$13/*parCode*/ = PL$15/*res*/;
      };
      ;
      return PL$13/*parCode*/;
      ;}),
    "push": (function(PL$13/*parCode*/, PL$14/*parReference*/, PL$12/*par*/){
    
      ;
      if(! this["reference"]){
        this["reference"] = PL$14/*parReference*/;
      };
      ;
      if(! PL$13/*parCode*/){
        return;
      };
      ;
      if((PL$14/*parReference*/ && (typeof PL$14/*parReference*/ == "boolean"))){
        PL$7/*errorFun*/(undefined, PL$8/*errorMsg*/["internalWrongUseOfReference"]);
      };
      ;
      if(PL$16/*Array*/["isArray"](PL$13/*parCode*/)){
        var PL$17/*i*/ = 0;
        ;
        for(PL$17/*i*/ = 0;(PL$17/*i*/ < PL$13/*parCode*/["length"]);++PL$17/*i*/){{
          this["push"](PL$13/*parCode*/[PL$17/*i*/]);}};
        ;
      }else{
      PL$13/*parCode*/ = this["_prepCode"](PL$13/*parCode*/, PL$14/*parReference*/, PL$12/*par*/);
      if(! this["codeAr"]){
        this["error"]((PL$14/*parReference*/ || this["reference"]), PL$8/*errorMsg*/["internalCantAddToStringResult"]);
      };
      ;
      this["codeAr"]["push"](PL$13/*parCode*/);
      };
      ;
      if(PL$13/*parCode*/["promising"]){
        this["makePromising"]();
      };
      ;
      ;}),
    "_iterPar": (function(PL$12/*par*/){
    
      ;
      if(! PL$12/*par*/){
        PL$12/*par*/ = {
          "stringEncode": 0
        };
      };
      ;
      PL$12/*par*/ = {
        "stringEncode": (PL$12/*par*/["stringEncode"] || 0),
        "indent": (PL$12/*par*/["indent"] || new PL$18/*IndentTracker*/(PL$12/*par*/))
      };
      if(this["_stringEncode"]){
        PL$12/*par*/["stringEncode"] += 1;
      };
      ;
      if(this["_dynamic"]){
        PL$12/*par*/["stringEncode"] -= 1;
      };
      ;
      return PL$12/*par*/;
      ;}),
    "setPromise": (function(PL$19/*ps*/){
    
      ;
      var PL$20/*self*/ = this;
      ;
      this["promise"] = PL$19/*ps*/;
      PL$19/*ps*/["then"]((function(PL$15/*res*/){
      
        ;
        PL$20/*self*/["replace"](PL$15/*res*/);
        ;}));
      ;}),
    "resolve": (function(PL$15/*res*/){
    
      ;
      this["promise"]["resolve"](PL$15/*res*/);
      ;}),
    "replace": (function(PL$15/*res*/){
    
      ;
      if((typeof PL$15/*res*/ == "string")){
        PL$15/*res*/ = this["newResult"]({
          "codeStr": PL$15/*res*/
        });
      };
      ;
      this["replacement"] = PL$15/*res*/;
      ;}),
    "getParsed": (function(){
    
      ;
      if(this["reference"]){
        return this["reference"];
      };
      ;
      var PL$21/*p*/;
      ;
      if(this["preCode"]){
        PL$21/*p*/ = this["preCode"]["getParsed"]();
      };
      ;
      if(PL$21/*p*/){
        return PL$21/*p*/;
      };
      ;
      if(this["codeAr"]){
        var PL$17/*i*/ = 0;
        ;
        for(PL$17/*i*/ = 0;(PL$17/*i*/ < this["codeAr"]["length"]);++PL$17/*i*/){{
          PL$21/*p*/ = this["codeAr"][PL$17/*i*/]["getParsed"]();
          if(PL$21/*p*/){
            return PL$21/*p*/;
          };
          ;}};
        ;
      };
      ;
      if(this["postCode"]){
        PL$21/*p*/ = this["postCode"]["getParsed"]();
      };
      ;
      return PL$21/*p*/;
      ;}),
    "setParsed": (function(PL$14/*parReference*/){
    
      ;
      if(PL$14/*parReference*/){
        this["reference"] = PL$14/*parReference*/;
      };
      ;
      ;}),
    "_getPreCodeStr": (function(PL$12/*par*/){
    
      ;
      PL$12/*par*/ = this["_iterPar"](PL$12/*par*/);
      var PL$22/*resStr*/ = "";
      ;
      var PL$17/*i*/;
      ;
      if(this["preCode"]){
        PL$22/*resStr*/ += this["preCode"]["getPreCodeStr"](PL$12/*par*/);
        PL$22/*resStr*/ += this["preCode"]["getCodeStr"](PL$12/*par*/);
      };
      ;
      if(this["codeAr"]){
        for(PL$17/*i*/ = 0;(PL$17/*i*/ < this["codeAr"]["length"]);++PL$17/*i*/){{
          PL$22/*resStr*/ += this["codeAr"][PL$17/*i*/]["getPreCodeStr"](PL$12/*par*/);}};
        ;
      };
      ;
      if(this["postCode"]){
        PL$22/*resStr*/ += this["postCode"]["getPreCodeStr"](PL$12/*par*/);
      };
      ;
      return PL$22/*resStr*/;
      ;}),
    "getPreCodeStr": (function(PL$12/*par*/){
    
      ;
      if(this["replacement"]){
        return this["replacement"]["getPreCodeStr"](PL$12/*par*/);
      };
      ;
      if((this["isStatement"] || this["isComplete"])){
        return "";
      }else{
      return this["_getPreCodeStr"](PL$12/*par*/);
      };
      ;
      ;}),
    "getCodeStr": (function(PL$12/*par*/){
    
      ;
      if(this["replacement"]){
        return this["replacement"]["getCodeStr"](PL$12/*par*/);
      };
      ;
      PL$12/*par*/ = this["_iterPar"](PL$12/*par*/);
      var PL$22/*resStr*/ = "";
      ;
      var PL$23/*indentDst*/;
      ;
      if(this["_indent"]){
        PL$23/*indentDst*/ = PL$12/*par*/["indent"]["inc"]();
      };
      ;
      if(this["_indentPair"]){
        if(this["_isIndentStart"]){
          PL$23/*indentDst*/ = PL$12/*par*/["indent"]["inc"]();
          this["_end"]["_indentDst"] = PL$23/*indentDst*/;
        }else{
        this["_indentDst"]();
        };
        ;
      };
      ;
      var PL$17/*i*/;
      ;
      if((this["isStatement"] || this["isComplete"])){
        PL$22/*resStr*/ += this["_getPreCodeStr"](PL$12/*par*/);
      };
      ;
      if((this["codeAr"] && ! this["_newLine"])){
        for(PL$17/*i*/ = 0;(PL$17/*i*/ < this["codeAr"]["length"]);++PL$17/*i*/){{
          PL$22/*resStr*/ += this["codeAr"][PL$17/*i*/]["getCodeStr"](PL$12/*par*/);}};
        ;
      }else{
      if((this["codeStr"] || this["_newLine"])){
        var PL$24/*tempCodeStr*/;
        ;
        if(this["_newLine"]){
          PL$24/*tempCodeStr*/ = "\n";
          PL$24/*tempCodeStr*/ += PL$12/*par*/["indent"]["getStr"]();
        }else{
        PL$24/*tempCodeStr*/ = this["codeStr"];
        };
        ;
        if((PL$12/*par*/["stringEncode"] < 0)){
          PL$7/*errorFun*/(undefined, PL$8/*errorMsg*/["internalNegativeStringEncode"]);
        };
        ;
        for(PL$17/*i*/ = 0;(PL$17/*i*/ < PL$12/*par*/["stringEncode"]);++PL$17/*i*/){{
          PL$24/*tempCodeStr*/ = PL$9/*_stringEncodeStr*/(PL$24/*tempCodeStr*/);}};
        ;
        PL$22/*resStr*/ += PL$24/*tempCodeStr*/;
      };
      };
      ;
      if(this["promiseName"]){
        PL$22/*resStr*/ += this["promiseName"]["getCodeStr"](PL$12/*par*/);
      };
      ;
      if(this["isComplete"]){
        PL$22/*resStr*/ += this["_getPostCodeStr"](PL$12/*par*/);
      };
      ;
      if(this["_indent"]){
        PL$23/*indentDst*/();
      };
      ;
      if(this["checkasm"]){
        this["_cp"]["checkAsm"](this, PL$22/*resStr*/);
      };
      ;
      return PL$22/*resStr*/;
      ;}),
    "_getPostCodeStr": (function(PL$12/*par*/){
    
      ;
      PL$12/*par*/ = this["_iterPar"](PL$12/*par*/);
      var PL$22/*resStr*/ = "";
      ;
      var PL$17/*i*/;
      ;
      if(this["postCode"]){
        PL$22/*resStr*/ += this["postCode"]["getCodeStr"](PL$12/*par*/);
        PL$22/*resStr*/ += this["postCode"]["getPostCodeStr"](PL$12/*par*/);
      };
      ;
      if(this["codeAr"]){
        for(PL$17/*i*/ = this["codeAr"]["length"];PL$17/*i*/;--PL$17/*i*/){{
          PL$22/*resStr*/ += this["codeAr"][(PL$17/*i*/ - 1)]["getPostCodeStr"](PL$12/*par*/);}};
        ;
      };
      ;
      if(this["preCode"]){
        PL$22/*resStr*/ += this["preCode"]["getPostCodeStr"](PL$12/*par*/);
      };
      ;
      return PL$22/*resStr*/;
      ;}),
    "getPostCodeStr": (function(PL$12/*par*/){
    
      ;
      if(this["replacement"]){
        return this["replacement"]["getPostCodeStr"](PL$12/*par*/);
      };
      ;
      if(this["isComplete"]){
        return "";
      }else{
      return this["_getPostCodeStr"](PL$12/*par*/);
      };
      ;
      ;}),
    "getProgramCodeStr": (function(PL$12/*par*/){
    
      ;
      PL$12/*par*/ = this["_iterPar"](PL$12/*par*/);
      return ((this["getPreCodeStr"](PL$12/*par*/) + this["getCodeStr"](PL$12/*par*/)) + this["getPostCodeStr"](PL$12/*par*/));
      ;}),
    "makePromising": (function(){
    
      ;
      if(this["promising"]){
        return;
      };
      ;
      this["promising"] = true;
      ;}),
    "setPromiseName": (function(PL$13/*parCode*/, PL$14/*parReference*/){
    
      ;
      this["makePromising"]();
      this["promiseName"] = this["newResult"]({
        "codeStr": PL$13/*parCode*/,
        "reference": PL$14/*parReference*/
      });
      ;
      this["hasPromiseName"] = true;
      ;}),
    "getPromiseName": (function(){
    
      ;
      if((this["promising"] && this["hasPromiseName"])){
        return this["promiseName"];
      };
      ;
      ;}),
    "isPromising": (function(){
    
      ;
      return this["promising"];
      ;}),
    "addPre": (function(PL$13/*parCode*/, PL$14/*parReference*/, PL$12/*par*/){
    
      ;
      if(! PL$13/*parCode*/){
        return;
      };
      ;
      PL$13/*parCode*/ = this["_prepCode"](PL$13/*parCode*/, PL$14/*parReference*/, PL$12/*par*/);
      if(PL$13/*parCode*/["promising"]){
        this["makePromising"]();
      };
      ;
      if(! this["preCode"]){
        this["preCode"] = this["newResult"]();
      };
      ;
      this["preCode"]["push"](PL$13/*parCode*/, PL$14/*parReference*/, PL$12/*par*/);
      ;}),
    "addPost": (function(PL$13/*parCode*/, PL$14/*parReference*/, PL$12/*par*/){
    
      ;
      if(! PL$13/*parCode*/){
        return;
      };
      ;
      PL$13/*parCode*/ = this["_prepCode"](PL$13/*parCode*/, PL$14/*parReference*/, PL$12/*par*/);
      if(PL$13/*parCode*/["promising"]){
        this["makePromising"]();
      };
      ;
      if(! this["postCode"]){
        this["postCode"] = this["newResult"]();
      };
      ;
      this["postCode"]["push"](PL$13/*parCode*/, PL$14/*parReference*/, PL$12/*par*/);
      ;}),
    "setStatement": (function(){
    
      ;
      this["isStatement"] = true;
      ;}),
    "setComplete": (function(){
    
      ;
      this["isComplete"] = true;
      ;}),
    "newResult": (function(PL$12/*par*/){
    
      ;
      return new PL$11/*_Result*/({
        "cp": this["_cp"],
        "codeStr": (PL$12/*par*/ ? PL$12/*par*/["codeStr"] : undefined)
      });
      ;}),
    "getType": (function(PL$12/*par*/){
    
      ;
      return this["providesType"];
      ;}),
    "setType": (function(PL$12/*par*/){
    
      ;
      if(this["providesType"]){
        PL$7/*errorFun*/({
          
        }, PL$8/*errorMsg*/["multipleTypeProviding"]);
      };
      ;
      if((typeof PL$12/*par*/ == "string")){
        this["providesType"] = this["_cp"]["getType"](PL$12/*par*/, this["reference"]);
        return;
      };
      ;
      this["providesType"] = PL$12/*par*/;
      ;})
  };
  PL$18/*IndentTracker*/ = (function(){var PL$25/*inherited*/ = {};
  var res = promiseland.createClass({
    "constructor": (function(PL$12/*par*/){
    
      ;
      this["unit"] = 2;
      if(PL$12/*par*/){
        this["unit"] = (PL$12/*par*/["unit"] || this["unit"]);
      };
      ;
      this["cnt"] = 0;
      ;}),
    "inc": (function(){
    
      ;
      this["cnt"] += 1;
      var PL$26/*done*/;
      ;
      var PL$20/*self*/ = this;
      ;
      return (function(){
      
        ;
        if(PL$26/*done*/){
          return;
        };
        ;
        PL$20/*self*/["cnt"] -= 1;
        PL$26/*done*/ = true;
        ;});
      ;}),
    "getStr": (function(){
    
      ;
      var PL$17/*i*/ = 0;
      ;
      var PL$22/*resStr*/ = "";
      ;
      for(PL$17/*i*/ = 0;(PL$17/*i*/ < this["cnt"]);++PL$17/*i*/){{
        var PL$27/*j*/ = 0;
        ;
        for(PL$27/*j*/ = 0;(PL$27/*j*/ < this["unit"]);++PL$27/*j*/){{
          PL$22/*resStr*/ += " ";}};
        ;}};
      ;
      return PL$22/*resStr*/;
      ;})
  }, [], PL$25/*inherited*/);
  return res; })();PL$18/*IndentTracker*/;
  PL$1.resolve(PL$11/*_Result*/); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();