(function(){
  var defineFun;
  var requireFun;
  
  if (typeof exports == "object" && typeof module == "object"){ // CommonJS
    requireFun = function(modulesAr, callback){
      var i = 0;
      var l = modulesAr.length;
      var args = [];
      for (i; i < l; ++i){
        args.push(require(modulesAr[i]));
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
    requireFun = require;
    
  }else{ // Plain browser env
    alert("not working out!");
    
  };
  
defineFun(["promiseland"], function(promiseland){ var __require = requireFun;

  var __Promise = promiseland.Promise;
  var __modulePromise = new __Promise();
  var classSystem = promiseland.classSystem; 
  var __requireFun = function(parModule){
    var returnPromise = new __Promise();
    try{__require([parModule], function(m){
    if (promiseland.isPromiseLandPromisingModule(m)){
      m.then(function(realm){returnPromise.resolve(realm);}, function(e){returnPromise.reject(e);});
    }else{
      returnPromise.resolve(m);
    };
    });
    }catch(e){returnPromise.reject(e);};
  return returnPromise.promise;};
  var __classSystem = promiseland.classSystem;
  
  
var Callback = promiseland.Callback;
if (promiseland._hasModule({ hashStr: "f885356c4096edc908c35e59dbc2e3f4" })){ return promiseland._getModule("f885356c4096edc908c35e59dbc2e3f4"); };
var _V1 = new __Promise();
promiseland._registerModule({ hashStr: "f885356c4096edc908c35e59dbc2e3f4", "module": _V1, promising: true });
var _V7/*userinput*/;try{_V7/*userinput*/ = userinput;}catch(e){};
var _V9/*readFile*/;try{_V9/*readFile*/ = readFile;}catch(e){};
var _V11/*postProcess*/;try{_V11/*postProcess*/ = postProcess;}catch(e){};
var _V12/*readFromNetwork*/;try{_V12/*readFromNetwork*/ = readFromNetwork;}catch(e){};
var _V15/*restOfProgram*/;try{_V15/*restOfProgram*/ = restOfProgram;}catch(e){};
var _V16/*type:var*/ = __classSystem.getBuiltinType("var");
var _V2 = (function(){
"use strict";
var _V3 = function(code){ return function(res){ try{code(res);}catch(e){ _V1.reject(e); }; }; };
var _V4 = function(e){ _V1.reject(e); };
var _V5/*result*/;
_V3(function(){;
_V5/*result*/;
_V7/*userinput*/().then(_V3(function(_V8){var _V6 = new __Promise();
if(_V8){
_V9/*readFile*/().then(_V3(function(_V10){_V5/*result*/ = _V10;;
_V6.resolve();;
}), _V4);
;
}else{
_V12/*readFromNetwork*/().then(_V3(function(_V13){_V11/*postProcess*/(_V13).then(_V3(function(_V14){_V5/*result*/ = _V14;;
_V6.resolve();;
}), _V4);
;}), _V4);
;}; _V6.then(function(){;
;
_V15/*restOfProgram*/(_V5/*result*/);;
_V1.resolve(); return;;
});}), _V4);
;})();
return _V1;
})();
;;
return _V1});
})();