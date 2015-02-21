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
if (promiseland._hasModule({ hashStr: "a46d1b70d8e7becaa21a64131b960210" })){ return promiseland._getModule("a46d1b70d8e7becaa21a64131b960210"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "a46d1b70d8e7becaa21a64131b960210", "module": PL$1, promising: true });
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
var PL$4/*C1*/;
var PL$11/*a*/;
var _TPL$11/*a*/;
var PL$12/*serverInit*/;

/* ---------------------------- */
/* type C1 */
var PL$3/*type:C1*/ = classSystem._createProvisionalClass();
PL$4/*C1*/ = PL$3/*type:C1*/
var PL$5/*C1-constructor*/ = undefined;
classSystem.readyPromise(PL$3/*type:C1*/).then(function(parType){
  PL$3/*type:C1*/ = parType;
  PL$5/*C1-constructor*/ = classSystem.getTypeConstructor(PL$3/*type:C1*/);
});
var PL$6/*type:C1**/ = classSystem._createPromiseOfClass(PL$3/*type:C1*/);
var PL$7/*C1**/ = PL$6/*type:C1**/;
var PL$8/*C1*-constructor*/ = undefined;classSystem.readyPromise(PL$6/*type:C1**/).then(function(parType){
  PL$6/*type:C1**/ = parType;
  PL$8/*C1*-constructor*/ = classSystem.getTypeConstructor(PL$6/*type:C1**/);
});
/* ---------------------------- */

var PL$13/*x*/ = (function(f){
promiseland.registerRemote("server", "a46d1b70d8e7becaa21a64131b960210", "PL$19", f, (classSystem.createFunctionType({ "return": PL$6/*type:C1**/, arguments: [classSystem.getBuiltinType("var")]})));
if (promiseland.profileHas("server")){
return function(){
var i = 0; var l = arguments.length; var newArgs = [undefined];
for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
return f.apply(this, newArgs);
};
}else{
return function(){
return promiseland.remoteExec("a46d1b70d8e7becaa21a64131b960210", "PL$19", arguments);
}
};
})((function(t){return t;})(function (PL$14/*session*/, PL$15/*par1*/){
var PL$16;
var _TPL$16;
(function(){ var vAr = new PL$8/*C1*-constructor*/(); PL$16 = vAr[0]; _TPL$16 = vAr[1]; })();var PL$17/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$16.reject(e);
    };
  };
};
var PL$18/*catch rejected*/ = function(e){
  PL$16.reject(e);
};
PL$17/*promiseland exception catcher*/(function(){

  ;
  if(! PL$12/*serverInit*/){
    /*temp tracked assign*/(function(vAr){
      if (_TPL$11/*a*/){ _TPL$11/*a*/(); };
      if(vAr){
        var v = vAr[0];
        PL$11/*a*/ = v;
        _TPL$11/*a*/ = vAr[1];
        return v;
      }else{
        PL$11/*a*/ = undefined; 
        _TPL$11/*a*/ = undefined;
        return;
      };
    })(new PL$5/*C1-constructor*/())/*end temp assign*/;
    (function(s, v){ v = s[8](v); s[7] = v; return v; })(PL$11/*a*/, 2);
    PL$12/*serverInit*/ = true;
  };
  ;
  PL$16.resolve((function(v){ if(!v){ return; }; return [v, v[2]()];})(PL$11/*a*/)); return;
  PL$16.resolve(); return;
})();return [PL$16, _TPL$16];
}));
PL$9/*promiseland exception catcher*/(function(){

  ;
  classSystem._resolveProvisional(PL$3/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"a","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "sync": {"type":"sync","all":1,"line":1,"column":12,"offset":11}, "hashStr": "a46d1b70d8e7becaa21a64131b960210", "name": "C1"}, {"a": 1}));PL$4/*C1*/;
  PL$11/*a*/;
  PL$12/*serverInit*/ = false;
  /* function x (){} - hoisted */;
  ;
  /*temptracked promise*/(function(vAr){
  var r = vAr[0].thenReuse(vAr[1], PL$9/*promiseland exception catcher*/(function(PL$20){/*temp tracked assign*/(function(vAr){
    if (_TPL$11/*a*/){ _TPL$11/*a*/(); };
    if(vAr){
      var v = vAr[0];
      PL$11/*a*/ = v;
      _TPL$11/*a*/ = vAr[1];
      return v;
    }else{
      PL$11/*a*/ = undefined; 
      _TPL$11/*a*/ = undefined;
      return;
    };
  })(PL$20)/*end temp assign*/;
  if((PL$11/*a*/[7] == 2)){
    PL$1.resolve({
      "success": true
    }); return;
  };
  ;
  PL$1.resolve({
    "success": false
  }); return;
  PL$1.resolve(); return;}), PL$10/*catch rejected*/);
  return r;
  })(PL$13/*x*/());/*temptracked promise end*/
  ;
})();return PL$1;
})();
;;
return PL$1});
})();