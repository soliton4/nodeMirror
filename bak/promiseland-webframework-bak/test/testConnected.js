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
if (promiseland._hasModule({ hashStr: "a2219ef2ef8c82d43dcf0636c2ce8721" })){ return promiseland._getModule("a2219ef2ef8c82d43dcf0636c2ce8721"); };
var PL$2/*console*/;try{PL$2/*console*/ = console;}catch(e){};
var PL$1 = (function(){
"use strict";
var PL$3/*testFun*/ = (function(f){
promiseland.registerRemote("server", "a2219ef2ef8c82d43dcf0636c2ce8721", "PL$10", f, classSystem.getBuiltinType("var"));
if (promiseland.profileHas("server")){
return function(){
var i = 0; var l = arguments.length; var newArgs = [undefined];
for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
return f.apply(this, newArgs);
};
}else{
return function(){
return promiseland.remoteExec("a2219ef2ef8c82d43dcf0636c2ce8721", "PL$10", arguments);
}
};
})(function (PL$4/*session*/, PL$5/*par1*/){
var PL$6 = new __Promise();
var PL$8/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$6.reject(e);
    };
  };
};
var PL$9/*catch rejected*/ = function(e){
  PL$6.reject(e);
};
PL$8/*promiseland exception catcher*/(function(){

  ;
  PL$2/*console*/["log"](("par1: " + PL$5/*par1*/));
  PL$2/*console*/["log"](PL$4/*session*/);
  PL$6.resolve("server Content"); return;
  PL$6.resolve(); return;
})();return PL$6;
});
var PL$11/*authFun*/ = (function(f){
promiseland.registerRemote("serverNoAuth", "a2219ef2ef8c82d43dcf0636c2ce8721", "PL$16", f, classSystem.getBuiltinType("var"));
if (promiseland.profileHas("serverNoAuth")){
return function(){
var i = 0; var l = arguments.length; var newArgs = [undefined];
for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
return f.apply(this, newArgs);
};
}else{
return function(){
return promiseland.remoteExec("a2219ef2ef8c82d43dcf0636c2ce8721", "PL$16", arguments);
}
};
})(function (PL$4/*session*/){
var PL$12 = new __Promise();
var PL$14/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$12.reject(e);
    };
  };
};
var PL$15/*catch rejected*/ = function(e){
  PL$12.reject(e);
};
PL$14/*promiseland exception catcher*/(function(){

  ;
  PL$2/*console*/["log"]("calling auth");
  PL$2/*console*/["log"](PL$4/*session*/);
  if((PL$4/*session*/ && PL$4/*session*/["setAuth"])){
    PL$4/*session*/["setAuth"](true);
  }else{
  PL$2/*console*/["log"]("missing setAuth");
  };
  ;
  PL$12.resolve(); return;
})();return PL$12;
});

  ;
  PL$2/*console*/["log"]("connected");
  /* function testFun (){} - hoisted */;
  ;
  /* function authFun (){} - hoisted */;
  ;
  (function(){
  if (!promiseland.profileHas("client")){
  var p = new __Promise();
  p.reject({id: 14, msg: "function does not execute in this frame."});
  return p;
  };
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
    var PL$21 = new __Promise();
    var PL$22 = new __Promise();
    var PL$23/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$22.resolve(e); }; }; };
    var PL$24 = function(e){ PL$22.resolve(e); };
    PL$23/*try catch*/(function(){
      PL$3/*testFun*/("xx1").then(PL$23/*try catch*/(function(PL$25){PL$2/*console*/["log"](PL$25);
      PL$21.resolve();}), PL$24);
    ;})();
    PL$22.then(PL$19/*promiseland exception catcher*/(function(PL$26/*err*/){
      PL$2/*console*/["log"]("failed --- ");
      PL$2/*console*/["log"](PL$26/*err*/);
      PL$21.resolve();;}));
    PL$21.then(PL$19/*promiseland exception catcher*/(function(){;
    ;
    PL$2/*console*/["log"]("now calling auth");
    PL$11/*authFun*/().then(PL$19/*promiseland exception catcher*/(function(PL$27){PL$27;
    var PL$28 = new __Promise();
    var PL$29 = new __Promise();
    var PL$30/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$29.resolve(e); }; }; };
    var PL$31 = function(e){ PL$29.resolve(e); };
    PL$30/*try catch*/(function(){
      PL$3/*testFun*/("xx1").then(PL$30/*try catch*/(function(PL$32){PL$2/*console*/["log"](PL$32);
      PL$28.resolve();}), PL$31);
    ;})();
    PL$29.then(PL$19/*promiseland exception catcher*/(function(PL$26/*err*/){
      PL$2/*console*/["log"](PL$26/*err*/);
      PL$28.resolve();;}));
    PL$28.then(PL$19/*promiseland exception catcher*/(function(){;
    ;
    PL$17.resolve(); return;}), PL$20/*catch rejected*/)}), PL$20/*catch rejected*/);
    ;}), PL$20/*catch rejected*/)
  })();return PL$17;
  })();
  ;})();
;return PL$1;
});
})();