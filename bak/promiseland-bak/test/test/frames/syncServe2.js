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
if (promiseland._hasModule({ hashStr: "12ec951a9167283bf1517db6d7d26aa4" })){ return promiseland._getModule("12ec951a9167283bf1517db6d7d26aa4"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "12ec951a9167283bf1517db6d7d26aa4", "module": PL$1, promising: true });
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
var PL$11/*destroyed*/;
var PL$12/*isClient*/;
var PL$4/*C1*/;
var PL$27/*tempres*/;
var PL$28/*serverDestroyed*/;
var PL$29/*fx*/;

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
promiseland.registerRemote("server", "12ec951a9167283bf1517db6d7d26aa4", "PL$20", f, (classSystem.createFunctionType({ "return": PL$6/*type:C1**/, arguments: [classSystem.getBuiltinType("var")]})));
if (promiseland.profileHas("server")){
return function(){
var i = 0; var l = arguments.length; var newArgs = [undefined];
for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
return f.apply(this, newArgs);
};
}else{
return function(){
return promiseland.remoteExec("12ec951a9167283bf1517db6d7d26aa4", "PL$20", arguments);
}
};
})((function(t){return t;})(function (PL$14/*session*/, PL$15/*par1*/){
var PL$16;
var _TPL$16;
(function(){ var vAr = new PL$8/*C1*-constructor*/(); PL$16 = vAr[0]; _TPL$16 = vAr[1]; })();var PL$17/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      if (_TPL$19/*temp*/){ _TPL$19/*temp*/();};PL$16.reject(e);
    };
  };
};
var PL$18/*catch rejected*/ = function(e){
  if (_TPL$19/*temp*/){ _TPL$19/*temp*/();};PL$16.reject(e);
};
var PL$19/*temp*/;
var _TPL$19/*temp*/;
PL$17/*promiseland exception catcher*/(function(){

  ;
  PL$11/*destroyed*/ = false;
  /*temp tracked assign*/(function(vAr){
    if (_TPL$19/*temp*/){ _TPL$19/*temp*/(); };
    if(vAr){
      var v = vAr[0];
      PL$19/*temp*/ = v;
      _TPL$19/*temp*/ = vAr[1];
      return v;
    }else{
      PL$19/*temp*/ = undefined; 
      _TPL$19/*temp*/ = undefined;
      return;
    };
  })(new PL$5/*C1-constructor*/())/*end temp assign*/;
  (function(s, v){ v = s[8](v); s[7] = v; return v; })(PL$19/*temp*/, 2);
  PL$16.resolve((function(ret){ if (_TPL$19/*temp*/){ _TPL$19/*temp*/();};return ret; })((function(v){ if(!v){ return; }; return [v, v[2]()];})(PL$19/*temp*/))); return;;
  if (_TPL$19/*temp*/){ _TPL$19/*temp*/();};PL$16.resolve(); return;;
})();return [PL$16, _TPL$16];
}));
var PL$21/*check*/ = (function(f){
promiseland.registerRemote("server", "12ec951a9167283bf1517db6d7d26aa4", "PL$26", f, classSystem.getBuiltinType("var"));
if (promiseland.profileHas("server")){
return function(){
var i = 0; var l = arguments.length; var newArgs = [undefined];
for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
return f.apply(this, newArgs);
};
}else{
return function(){
return promiseland.remoteExec("12ec951a9167283bf1517db6d7d26aa4", "PL$26", arguments);
}
};
})(function (PL$14/*session*/){
var PL$22 = new __Promise();
var PL$24/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$22.reject(e);
    };
  };
};
var PL$25/*catch rejected*/ = function(e){
  PL$22.reject(e);
};
PL$24/*promiseland exception catcher*/(function(){

  ;
  PL$22.resolve(PL$11/*destroyed*/); return;
  PL$22.resolve(); return;
})();return PL$22;
});
PL$9/*promiseland exception catcher*/(function(){

  ;
  PL$11/*destroyed*/ = false;
  PL$12/*isClient*/ = false;
  (function(){
  if (!promiseland.profileHas("client")){
  return;
  };
  
    ;
    PL$12/*isClient*/ = true;
    ;})();
  classSystem._resolveProvisional(PL$3/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"a","type":classSystem.getBuiltinType("var")},{"name":"destroy","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "sync": {"type":"sync","all":1,"serve":1,"line":9,"column":12,"offset":109}, "hashStr": "12ec951a9167283bf1517db6d7d26aa4", "name": "C1"}, {"a": 1, "destroy": (function(){
  
    ;
    PL$11/*destroyed*/ = true;
    ;})}));PL$4/*C1*/;
  /* function x (){} - hoisted */;
  ;
  /* function check (){} - hoisted */;
  ;
  PL$27/*tempres*/;
  PL$28/*serverDestroyed*/;
  PL$29/*fx*/ = (function(){
  var PL$30 = new __Promise();
  var PL$32/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        if (_TPL$34/*t*/){ _TPL$34/*t*/();};PL$30.reject(e);
      };
    };
  };
  var PL$33/*catch rejected*/ = function(e){
    if (_TPL$34/*t*/){ _TPL$34/*t*/();};PL$30.reject(e);
  };
  var PL$34/*t*/;
  var _TPL$34/*t*/;
  PL$32/*promiseland exception catcher*/(function(){
  
    ;
    /*temptracked promise*/(function(vAr){
    var r = vAr[0].thenReuse(vAr[1], PL$32/*promiseland exception catcher*/(function(PL$35){/*temp tracked assign*/(function(vAr){
      if (_TPL$34/*t*/){ _TPL$34/*t*/(); };
      if(vAr){
        var v = vAr[0];
        PL$34/*t*/ = v;
        _TPL$34/*t*/ = vAr[1];
        return v;
      }else{
        PL$34/*t*/ = undefined; 
        _TPL$34/*t*/ = undefined;
        return;
      };
    })(PL$35)/*end temp assign*/;
    PL$27/*tempres*/ = PL$34/*t*/[7];
    if (_TPL$34/*t*/){ _TPL$34/*t*/();};PL$30.resolve(); return;;}), PL$33/*catch rejected*/);
    return r;
    })(PL$13/*x*/());/*temptracked promise end*/
    ;
  })();return PL$30;
  });
  
  var PL$36 = new __Promise();if(PL$12/*isClient*/){
    PL$29/*fx*/().then(PL$9/*promiseland exception catcher*/(function(PL$37){PL$37;
    PL$21/*check*/().then(PL$9/*promiseland exception catcher*/(function(PL$38){PL$28/*serverDestroyed*/ = PL$38;
    PL$36.resolve();;}), PL$10/*catch rejected*/);
    ;}), PL$10/*catch rejected*/);
    ;
  }else{
  PL$1.resolve({
    "success": true
  }); return;
  PL$36.resolve();;
  };PL$36.then(PL$9/*promiseland exception catcher*/(function(PL$39){PL$39;;
  ;
  if((PL$27/*tempres*/ != 2)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  if(! PL$28/*serverDestroyed*/){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  PL$1.resolve({
    "success": true
  }); return;
  PL$1.resolve(); return;}), PL$10/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();