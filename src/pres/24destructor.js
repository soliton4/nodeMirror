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
if (promiseland._hasModule({ hashStr: "9ea1d18527bb6b5aa987367f9bce9bb3" })){ return promiseland._getModule("9ea1d18527bb6b5aa987367f9bce9bb3"); };
var _V8/*console*/;try{_V8/*console*/ = console;}catch(e){};
var _V6/*type:var*/ = __classSystem.getBuiltinType("var");
var _V1 = (function(){
"use strict";
var _V5/*cnt*/;
var _V3/*C1*/;
var _V2/*type:C1*/ = classSystem._createProvisionalClass();
_V3/*C1*/ = _V2/*type:C1*/;
var _V4/*C1-constructor*/ = undefined;classSystem.readyPromise(_V2/*type:C1*/).then(function(parType){_V2/*type:C1*/ = parType;_V4/*C1-constructor*/ = classSystem.getTypeConstructor(_V2/*type:C1*/);});;
_V5/*cnt*/ = 0;
classSystem._resolveProvisional(_V2/*type:C1*/, classSystem.createClass({members: [{"name":"constructor","type":_V6/*type:var*/},{"name":"concnt","type":_V6/*type:var*/},{"name":"destroy","type":_V6/*type:var*/}], "extends": [], "hasFreePart": true, "track": true}, {"constructor": (function(){
;
_V5/*cnt*/++;;
this[7] = _V5/*cnt*/;;
;
}), "concnt": 0, "destroy": (function(){
;
_V5/*cnt*/--;;
;
})}));_V3/*C1*/;;
(function(){
var _V7/*a*/;
var _T_V7/*a*/;
try{;
_V7/*a*/;
(function(vAr){ if (_T_V7/*a*/){ _T_V7/*a*/(); }; if(vAr){ var v = vAr[0]; _V7/*a*/ = v; _T_V7/*a*/ = vAr[1]; return v; }else{ _V7/*a*/ = undefined; _T_V7/*a*/ = undefined; return; }; })(new _V4/*C1-constructor*/());;
_V8/*console*/["log"](_V7/*a*/[7]);;
(function(vAr){ if (_T_V7/*a*/){ _T_V7/*a*/(); }; if(vAr){ var v = vAr[0]; _V7/*a*/ = v; _T_V7/*a*/ = vAr[1]; return v; }else{ _V7/*a*/ = undefined; _T_V7/*a*/ = undefined; return; }; })(new _V4/*C1-constructor*/());;
_V8/*console*/["log"](_V7/*a*/[7]);;
(function(vAr){ if (_T_V7/*a*/){ _T_V7/*a*/(); }; if(vAr){ var v = vAr[0]; _V7/*a*/ = v; _T_V7/*a*/ = vAr[1]; return v; }else{ _V7/*a*/ = undefined; _T_V7/*a*/ = undefined; return; }; })(new _V4/*C1-constructor*/());;
_V8/*console*/["log"](_V7/*a*/[7]);;
if (_T_V7/*a*/){ _T_V7/*a*/();};}catch(e){if (_T_V7/*a*/){ _T_V7/*a*/();};throw e};;
})();;
_V8/*console*/["log"](("overall cnt: " + _V5/*cnt*/));;
;
})();
;promiseland._registerModule({ hashStr: "9ea1d18527bb6b5aa987367f9bce9bb3", "module": _V1, promising: false });
return _V1;
});
})();