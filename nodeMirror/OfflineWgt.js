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
    if (promiseland._hasModule({ hashStr: "32f60c18904f3bf4f100f250ee9014ee" })){ return promiseland._getModule("32f60c18904f3bf4f100f250ee9014ee"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "32f60c18904f3bf4f100f250ee9014ee", "module": PL$1, promising: true });
var PL$12/*document*/;try{PL$12/*document*/ = document;}catch(e){};
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
var PL$5/*_WidgetBase*/;
var PL$7/*declare*/;
var PL$9/*domConstruct*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  __requireFun("dijit/_WidgetBase").then(PL$3/*promiseland exception catcher*/(function(PL$6){PL$5/*_WidgetBase*/ = PL$6;
  __requireFun("dojo/_base/declare").then(PL$3/*promiseland exception catcher*/(function(PL$8){PL$7/*declare*/ = PL$8;
  __requireFun("dojo/dom-construct").then(PL$3/*promiseland exception catcher*/(function(PL$10){PL$9/*domConstruct*/ = PL$10;
  PL$1.resolve(PL$7/*declare*/([
    PL$5/*_WidgetBase*/
  ], {
    "class": "offlineWidget",
    "domConstruct": (function(){
    var PL$11/*arguments*/ = arguments;
    
      ;
      this["inherited"]("domConstruct", PL$11/*arguments*/);
      PL$9/*domConstruct*/["place"](PL$12/*document*/["createTextNode"]("offline"), this["domNode"]);
      ;})
  })); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();