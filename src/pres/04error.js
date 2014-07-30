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
if (promiseland._hasModule({ hashStr: "88539a0216df5f3123ab0d2be961c57e" })){ return promiseland._getModule("88539a0216df5f3123ab0d2be961c57e"); };
var _V1 = new __Promise();
promiseland._registerModule({ hashStr: "88539a0216df5f3123ab0d2be961c57e", "module": _V1, promising: true });
var _V11/*userinput*/;try{_V11/*userinput*/ = userinput;}catch(e){};
var _V13/*readFile*/;try{_V13/*readFile*/ = readFile;}catch(e){};
var _V15/*postProcess*/;try{_V15/*postProcess*/ = postProcess;}catch(e){};
var _V16/*readFromNetwork*/;try{_V16/*readFromNetwork*/ = readFromNetwork;}catch(e){};
var _V19/*restOfProgram*/;try{_V19/*restOfProgram*/ = restOfProgram;}catch(e){};
var _V20/*handleError*/;try{_V20/*handleError*/ = handleError;}catch(e){};
var _V21/*e*/;try{_V21/*e*/ = e;}catch(e){};
var _V22/*type:var*/ = __classSystem.getBuiltinType("var");
var _V2 = (function(){
"use strict";
var _V3 = function(code){ return function(res){ try{code(res);}catch(e){ _V1.reject(e); }; }; };
var _V4 = function(e){ _V1.reject(e); };
var _V9/*result*/;
_V3(function(){;
var _V5 = new __Promise();
var _V6 = new __Promise();
var _V7/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ _V6.resolve(e); }; }; };
var _V8 = function(e){ _V6.resolve(e); };
_V7/*try catch*/(function(){_V9/*result*/;
_V11/*userinput*/().then(_V7/*try catch*/(function(_V12){var _V10 = new __Promise();
if(_V12){
_V13/*readFile*/().then(_V7/*try catch*/(function(_V14){_V9/*result*/ = _V14;;
_V10.resolve();;
}), _V8);
;
}else{
_V16/*readFromNetwork*/().then(_V7/*try catch*/(function(_V17){_V15/*postProcess*/(_V17).then(_V7/*try catch*/(function(_V18){_V9/*result*/ = _V18;;
_V10.resolve();;
}), _V8);
;}), _V8);
;}; _V10.then(function(){;
;
_V19/*restOfProgram*/(_V9/*result*/);;
_V5.resolve();
});}), _V8);
;})();
_V6.then(_V3(function(e){_V20/*handleError*/(_V21/*e*/);;
_V5.resolve();;
}));
_V5.then(_V3(function(){;
;
_V1.resolve(); return;;
}), _V4)})();
return _V1;
})();
;;
return _V1});
})();