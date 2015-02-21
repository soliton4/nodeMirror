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
    if (promiseland._hasModule({ hashStr: "3653aa32175d625621eee1c4d819ae22" })){ return promiseland._getModule("3653aa32175d625621eee1c4d819ae22"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "3653aa32175d625621eee1c4d819ae22", "module": PL$1, promising: true });
var PL$9/*document*/;try{PL$9/*document*/ = document;}catch(e){};
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
var PL$5/*BorderContainer*/;
var PL$7/*domClass*/;
var PL$10/*mainBc*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  __requireFun("dijit/layout/BorderContainer").then(PL$3/*promiseland exception catcher*/(function(PL$6){PL$5/*BorderContainer*/ = PL$6;
  __requireFun("dojo/dom-class").then(PL$3/*promiseland exception catcher*/(function(PL$8){PL$7/*domClass*/ = PL$8;
  PL$7/*domClass*/["add"](PL$9/*document*/["body"], "claro");
  PL$10/*mainBc*/ = new PL$5/*BorderContainer*/({
    "class": "mainBc"
  });
  PL$10/*mainBc*/["placeAt"](PL$9/*document*/["body"]);
  PL$10/*mainBc*/["startup"]();
  PL$1.resolve({
    "mainBc": PL$10/*mainBc*/
  }); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();