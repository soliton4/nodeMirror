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
var classSystem = promiseland.classSystem;
var Callback = promiseland.Callback;
if (promiseland._hasModule({ hashStr: "611a5a0761f38d97f4674b150f8771da" })){ return promiseland._getModule("611a5a0761f38d97f4674b150f8771da"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "611a5a0761f38d97f4674b150f8771da", "module": PL$1, promising: true });
var PL$21/*Callback*/;try{PL$21/*Callback*/ = Callback;}catch(e){};
var PL$22/*setTimeout*/;try{PL$22/*setTimeout*/ = setTimeout;}catch(e){};
var PL$24/*console*/;try{PL$24/*console*/ = console;}catch(e){};
var PL$26/*x*/;try{PL$26/*x*/ = x;}catch(e){};
var PL$2 = (function(){
"use strict";
var PL$9/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$1.reject(e);
    };
  };
};
var PL$10/*catch rejected*/ = function(e){
  PL$1.reject(e);
};
var PL$15/*waitFun*/;
var PL$4/*Cs1*/;

/* ---------------------------- */
/* type Cs1 */
var PL$3/*type:Cs1*/ = classSystem._createProvisionalClass();
PL$4/*Cs1*/ = PL$3/*type:Cs1*/
var PL$5/*Cs1-constructor*/ = undefined;
classSystem.readyPromise(PL$3/*type:Cs1*/).then(function(parType){
  PL$3/*type:Cs1*/ = parType;
  PL$5/*Cs1-constructor*/ = classSystem.getTypeConstructor(PL$3/*type:Cs1*/);
});
var PL$6/*type:Cs1**/ = classSystem._createPromiseOfClass(PL$3/*type:Cs1*/);
var PL$7/*Cs1**/ = PL$6/*type:Cs1**/;
var PL$8/*Cs1*-constructor*/ = undefined;classSystem.readyPromise(PL$6/*type:Cs1**/).then(function(parType){
  PL$6/*type:Cs1**/ = parType;
  PL$8/*Cs1*-constructor*/ = classSystem.getTypeConstructor(PL$6/*type:Cs1**/);
});
/* ---------------------------- */

PL$9/*promiseland exception catcher*/(function(){

  ;
  var PL$11 = new __Promise();
  var PL$12 = new __Promise();
  var PL$13/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$12.resolve(e); }; }; };
  var PL$14 = function(e){ PL$12.resolve(e); };
  PL$13/*try catch*/(function(){
    PL$15/*waitFun*/ = (function(){
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
    var PL$20/*cb*/;
    PL$18/*promiseland exception catcher*/(function(){
    
      ;
      PL$20/*cb*/ = new PL$21/*Callback*/();
      PL$22/*setTimeout*/(PL$20/*cb*/, 2000);
      PL$20/*cb*/["promise"].then(PL$18/*promiseland exception catcher*/(function(PL$23){PL$23;
      PL$16.resolve(); return;}), PL$19/*catch rejected*/);
      ;
    })();return PL$16;
    });
    classSystem._resolveProvisional(PL$3/*type:Cs1*/, classSystem.createClass({className: "Cs1",members: [{"name":"constructor","type":classSystem.getBuiltinType("var")},{"name":"a","type":classSystem.getBuiltinType("var")},{"name":"b","type":classSystem.getBuiltinType("var")},{"name":"destroy","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "sync": {"type":"sync","all":1,"serve":1,"line":10,"column":12,"offset":126}, "hashStr": "611a5a0761f38d97f4674b150f8771da", "name": "Cs1"}, {"constructor": (function(){
    
      ;
      PL$24/*console*/["log"]("constructed");
      ;}), "a": 1, "b": 4, "destroy": (function(){
    
      ;
      PL$24/*console*/["log"]("destroyed");
      ;})}));PL$4/*Cs1*/;
    (function(){
    if (!promiseland.profileHas("server")){
    return;
    };
    var PL$25/*a*/;
    var _TPL$25/*a*/;
    
      try{;
      /*temp tracked assign*/(function(vAr){
        if (_TPL$25/*a*/){ _TPL$25/*a*/(); };
        if(vAr){
          var v = vAr[0];
          PL$25/*a*/ = v;
          _TPL$25/*a*/ = vAr[1];
          return v;
        }else{
          PL$25/*a*/ = undefined; 
          _TPL$25/*a*/ = undefined;
          return;
        };
      })(new PL$5/*Cs1-constructor*/())/*end temp assign*/;
      (function(s, v){ v = s[10](v); s[9] = v; return v; })(PL$25/*a*/, 3);
      if (_TPL$25/*a*/){ _TPL$25/*a*/();};}catch(e){if (_TPL$25/*a*/){ _TPL$25/*a*/();};throw e};;})();
    ((function(f){
    promiseland.registerRemote("server", "611a5a0761f38d97f4674b150f8771da", "PL$31", f, (classSystem.createFunctionType({ "return": PL$6/*type:Cs1**/, arguments: []})));
    if (promiseland.profileHas("server")){
    return function(){
    var i = 0; var l = arguments.length; var newArgs = [undefined];
    for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
    return f.apply(this, newArgs);
    };
    }else{
    return function(){
    return promiseland.remoteExec("611a5a0761f38d97f4674b150f8771da", "PL$31", arguments);
    }
    };
    })((function(t){return t;})(function PL$26/*x*/(PL$27/*session*/){
    var PL$28;
    var _TPL$28;
    (function(){ var vAr = new PL$8/*Cs1*-constructor*/(); PL$28 = vAr[0]; _TPL$28 = vAr[1]; })();var PL$29/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          if (_TPL$25/*a*/){ _TPL$25/*a*/();};PL$28.reject(e);
        };
      };
    };
    var PL$30/*catch rejected*/ = function(e){
      if (_TPL$25/*a*/){ _TPL$25/*a*/();};PL$28.reject(e);
    };
    var PL$25/*a*/;
    var _TPL$25/*a*/;
    PL$29/*promiseland exception catcher*/(function(){
    
      ;
      PL$24/*console*/["log"]("doing the sync request");
      /*temp tracked assign*/(function(vAr){
        if (_TPL$25/*a*/){ _TPL$25/*a*/(); };
        if(vAr){
          var v = vAr[0];
          PL$25/*a*/ = v;
          _TPL$25/*a*/ = vAr[1];
          return v;
        }else{
          PL$25/*a*/ = undefined; 
          _TPL$25/*a*/ = undefined;
          return;
        };
      })(new PL$5/*Cs1-constructor*/())/*end temp assign*/;
      PL$28.resolve((function(ret){ if (_TPL$25/*a*/){ _TPL$25/*a*/();};return ret; })((function(v){ if(!v){ return; }; return [v, v[2]()];})(PL$25/*a*/))); return;;
      if (_TPL$25/*a*/){ _TPL$25/*a*/();};PL$28.resolve(); return;;
    })();return [PL$28, _TPL$28];
    })));
    PL$15/*waitFun*/().then(PL$13/*try catch*/(function(PL$32){PL$32;
    (function(){
    var PL$33 = new __Promise();
    var PL$35/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          if (_TPL$37/*b*/){ _TPL$37/*b*/();};PL$33.reject(e);
        };
      };
    };
    var PL$36/*catch rejected*/ = function(e){
      if (_TPL$37/*b*/){ _TPL$37/*b*/();};PL$33.reject(e);
    };
    var PL$37/*b*/;
    var _TPL$37/*b*/;
    PL$35/*promiseland exception catcher*/(function(){
    
      ;
      (function(){ throw { id:201, msg: "type missmatch" } })();
      if (_TPL$37/*b*/){ _TPL$37/*b*/();};PL$33.resolve(); return;;
    })();return PL$33;
    })();
    PL$11.resolve();}), PL$14);
  ;})();
  PL$12.then(PL$9/*promiseland exception catcher*/(function(PL$39/*e*/){
    PL$24/*console*/["log"]("error:");
    PL$24/*console*/["log"](PL$39/*e*/);
    PL$11.resolve();;}));
  PL$11.then(PL$9/*promiseland exception catcher*/(function(){;
  PL$1.resolve(); return;}), PL$10/*catch rejected*/)
})();return PL$1;
})();
;;
return PL$1});
})();