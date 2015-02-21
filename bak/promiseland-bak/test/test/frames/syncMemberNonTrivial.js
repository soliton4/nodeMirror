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
if (promiseland._hasModule({ hashStr: "91c253f473d9ac5d6b2cdcfd0dcff7bc" })){ return promiseland._getModule("91c253f473d9ac5d6b2cdcfd0dcff7bc"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "91c253f473d9ac5d6b2cdcfd0dcff7bc", "module": PL$1, promising: true });
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
var PL$11/*isClient*/;
var PL$4/*C1*/;
var PL$7/*C2*/;
var PL$12/*local*/;
var _TPL$12/*local*/;
var PL$14/*init*/;
var PL$38/*tempC1*/;
var _TPL$38/*tempC1*/;

/* ---------------------------- */
/* type C1 */
var PL$3/*type:C1*/ = classSystem._createProvisionalClass();
PL$4/*C1*/ = PL$3/*type:C1*/
var PL$5/*C1-constructor*/ = undefined;
classSystem.readyPromise(PL$3/*type:C1*/).then(function(parType){
  PL$3/*type:C1*/ = parType;
  PL$5/*C1-constructor*/ = classSystem.getTypeConstructor(PL$3/*type:C1*/);
});
/* ---------------------------- */


/* ---------------------------- */
/* type C2 */
var PL$6/*type:C2*/ = classSystem._createProvisionalClass();
PL$7/*C2*/ = PL$6/*type:C2*/
var PL$8/*C2-constructor*/ = undefined;
classSystem.readyPromise(PL$6/*type:C2*/).then(function(parType){
  PL$6/*type:C2*/ = parType;
  PL$8/*C2-constructor*/ = classSystem.getTypeConstructor(PL$6/*type:C2*/);
});
/* ---------------------------- */

function PL$13/*doInit*/(){

  ;
  /*temp tracked assign*/(function(vAr){
    if (_TPL$12/*local*/){ _TPL$12/*local*/(); };
    if(vAr){
      var v = vAr[0];
      PL$12/*local*/ = v;
      _TPL$12/*local*/ = vAr[1];
      return v;
    }else{
      PL$12/*local*/ = undefined; 
      _TPL$12/*local*/ = undefined;
      return;
    };
  })(new PL$8/*C2-constructor*/())/*end temp assign*/;
  (function(s, vAr){ vAr = s[12](vAr); var v = vAr[0]; s[11] = v; if(s[13]){ s[13](); }; s[13] = v[3](s[1]); vAr[1](); return v; })(PL$12/*local*/, new PL$5/*C1-constructor*/());
  ;};
var PL$21/*x*/ = (function(f){
promiseland.registerRemote("server", "91c253f473d9ac5d6b2cdcfd0dcff7bc", "PL$27", f, (classSystem.createFunctionType({ "return": classSystem.getBuiltinType("var"), arguments: [PL$6/*type:C2*/]})));
if (promiseland.profileHas("server")){
return function(){
var i = 0; var l = arguments.length; var newArgs = [undefined];
for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
return f.apply(this, newArgs);
};
}else{
return function(){
return promiseland.remoteExec("91c253f473d9ac5d6b2cdcfd0dcff7bc", "PL$27", arguments);
}
};
})(function (PL$15/*session*/, PL$22/*par1*/){
var PL$23 = new __Promise();
var PL$25/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      if (_TPL$22/*par1*/){ _TPL$22/*par1*/();};PL$23.reject(e);
    };
  };
};
var PL$26/*catch rejected*/ = function(e){
  if (_TPL$22/*par1*/){ _TPL$22/*par1*/();};PL$23.reject(e);
};
var _TPL$22/*par1*/;
if(PL$22/*par1*/){ _TPL$22/*par1*/ = PL$22/*par1*/[1];
PL$22/*par1*/ = PL$22/*par1*/[0];}
PL$25/*promiseland exception catcher*/(function(){

  ;
  /*tracked assign*/(function(v){
  if (_TPL$12/*local*/){ _TPL$12/*local*/(); };
  PL$12/*local*/ = v;
  if (v){
  _TPL$12/*local*/ = v[2]();
  }else{
  _TPL$12/*local*/ = undefined;
  };
  return v;
  })(PL$22/*par1*/)/*end assign*/
  ;
  if (_TPL$22/*par1*/){ _TPL$22/*par1*/();};PL$23.resolve(); return;;
})();return PL$23;
});
var PL$28/*getLocalTB*/ = (function(f){
promiseland.registerRemote("server", "91c253f473d9ac5d6b2cdcfd0dcff7bc", "PL$33", f, classSystem.getBuiltinType("var"));
if (promiseland.profileHas("server")){
return function(){
var i = 0; var l = arguments.length; var newArgs = [undefined];
for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
return f.apply(this, newArgs);
};
}else{
return function(){
return promiseland.remoteExec("91c253f473d9ac5d6b2cdcfd0dcff7bc", "PL$33", arguments);
}
};
})(function (PL$15/*session*/){
var PL$29 = new __Promise();
var PL$31/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$29.reject(e);
    };
  };
};
var PL$32/*catch rejected*/ = function(e){
  PL$29.reject(e);
};
PL$31/*promiseland exception catcher*/(function(){

  ;
  PL$29.resolve(PL$12/*local*/[11][9]); return;
  PL$29.resolve(); return;
})();return PL$29;
});
PL$9/*promiseland exception catcher*/(function(){

  ;
  PL$11/*isClient*/ = false;
  (function(){
  if (!promiseland.profileHas("client")){
  return;
  };
  
    ;
    PL$11/*isClient*/ = true;
    ;})();
  classSystem._resolveProvisional(PL$3/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"a","type":classSystem.getBuiltinType("var")},{"name":"b","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "sync": {"type":"sync","all":1,"line":9,"column":12,"offset":87}, "hashStr": "91c253f473d9ac5d6b2cdcfd0dcff7bc", "name": "C1"}, {"a": 1, "b": 2}));PL$4/*C1*/;
  classSystem._resolveProvisional(PL$6/*type:C2*/, classSystem.createClass({className: "C2",members: [{"name":"c","type":classSystem.getBuiltinType("var")},{"name":"d","type":classSystem.getBuiltinType("var")},{"name":"t1","type":PL$3/*type:C1*/}], "extends": [], "hasFreePart": true, "sync": {"type":"sync","all":1,"line":14,"column":12,"offset":129}, "hashStr": "91c253f473d9ac5d6b2cdcfd0dcff7bc", "name": "C2"}, {"c": 3, "d": 4, "t1": undefined}));PL$7/*C2*/;
  PL$12/*local*/;
  /* function doInit (){} - hoisted */;
  ;
  PL$14/*init*/ = ((function(f){
  promiseland.registerRemote("server", "91c253f473d9ac5d6b2cdcfd0dcff7bc", "PL$20", f, classSystem.getBuiltinType("var"));
  if (promiseland.profileHas("server")){
  return function(){
  var i = 0; var l = arguments.length; var newArgs = [undefined];
  for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
  return f.apply(this, newArgs);
  };
  }else{
  return function(){
  return promiseland.remoteExec("91c253f473d9ac5d6b2cdcfd0dcff7bc", "PL$20", arguments);
  }
  };
  })(function(PL$15/*session*/){
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
  PL$18/*promiseland exception catcher*/(function(){
  
    ;
    PL$13/*doInit*/();
    PL$16.resolve(); return;
  })();return PL$16;
  }));
  /* function x (){} - hoisted */;
  ;
  /* function getLocalTB (){} - hoisted */;
  ;
  if(! PL$11/*isClient*/){
    PL$1.resolve({
      "success": true
    }); return;
  };
  ;
  PL$14/*init*/().then(PL$9/*promiseland exception catcher*/(function(PL$34){PL$34;
  PL$13/*doInit*/();
  PL$28/*getLocalTB*/().then(PL$9/*promiseland exception catcher*/(function(PL$35){if((PL$35 !== 2)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  (function(s, v){ v = s[10](v); s[9] = v; return v; })(PL$12/*local*/[11], 6);
  PL$21/*x*/((function(v){ if(!v){ return; }; return [v, v[2]()];})(PL$12/*local*/)).then(PL$9/*promiseland exception catcher*/(function(PL$36){PL$36;
  PL$28/*getLocalTB*/().then(PL$9/*promiseland exception catcher*/(function(PL$37){if((PL$37 !== 6)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  /*temp tracked assign*/(function(vAr){
    if (_TPL$38/*tempC1*/){ _TPL$38/*tempC1*/(); };
    if(vAr){
      var v = vAr[0];
      PL$38/*tempC1*/ = v;
      _TPL$38/*tempC1*/ = vAr[1];
      return v;
    }else{
      PL$38/*tempC1*/ = undefined; 
      _TPL$38/*tempC1*/ = undefined;
      return;
    };
  })(new PL$5/*C1-constructor*/())/*end temp assign*/;
  (function(s, v){ v = s[10](v); s[9] = v; return v; })(PL$38/*tempC1*/, 12);
  (function(s, v){ var vAr = [v, v[2]()]; vAr = s[12](vAr); s[11] = v; if(s[13]){ s[13](); }; s[13] = v[3](s[1]); vAr[1](); return v; })(PL$12/*local*/, PL$38/*tempC1*/);
  PL$28/*getLocalTB*/().then(PL$9/*promiseland exception catcher*/(function(PL$39){if((PL$39 !== 12)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  (function(s, v){ v = s[10](v); s[9] = v; return v; })(PL$38/*tempC1*/, 13);
  PL$28/*getLocalTB*/().then(PL$9/*promiseland exception catcher*/(function(PL$40){if((PL$40 !== 13)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  PL$1.resolve({
    "success": true
  }); return;
  PL$1.resolve(); return;}), PL$10/*catch rejected*/);
  ;}), PL$10/*catch rejected*/);
  ;}), PL$10/*catch rejected*/);
  ;}), PL$10/*catch rejected*/);
  ;}), PL$10/*catch rejected*/);
  ;}), PL$10/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();