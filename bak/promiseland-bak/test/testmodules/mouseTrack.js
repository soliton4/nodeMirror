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
if (promiseland._hasModule({ hashStr: "2ce826e49303a51951d5788126b893c0" })){ return promiseland._getModule("2ce826e49303a51951d5788126b893c0"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "2ce826e49303a51951d5788126b893c0", "module": PL$1, promising: true });
var PL$27/*Callback*/;try{PL$27/*Callback*/ = Callback;}catch(e){};
var PL$28/*setTimeout*/;try{PL$28/*setTimeout*/ = setTimeout;}catch(e){};
var PL$31/*console*/;try{PL$31/*console*/ = console;}catch(e){};
var PL$35/*newSes*/;try{PL$35/*newSes*/ = newSes;}catch(e){};
var PL$41/*getPos*/;try{PL$41/*getPos*/ = getPos;}catch(e){};
var PL$62/*window*/;try{PL$62/*window*/ = window;}catch(e){};
var PL$65/*setInterval*/;try{PL$65/*setInterval*/ = setInterval;}catch(e){};
var PL$68/*document*/;try{PL$68/*document*/ = document;}catch(e){};
var PL$2 = (function(){
"use strict";
var PL$15/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$1.reject(e);
    };
  };
};
var PL$16/*catch rejected*/ = function(e){
  PL$1.reject(e);
};
var PL$21/*waitFun*/;
var PL$30/*nextId*/;
var PL$4/*Ses*/;
var PL$7/*Pos*/;
var PL$33/*pos*/;
var _TPL$33/*pos*/;
var PL$34/*gotit*/;
var PL$46/*serverSetMouse*/;
var PL$55/*s*/;
var _TPL$55/*s*/;
var PL$56/*setMousePos*/;
var PL$64/*wgts*/;

/* ---------------------------- */
/* type Ses */
var PL$3/*type:Ses*/ = classSystem._createProvisionalClass();
PL$4/*Ses*/ = PL$3/*type:Ses*/
var PL$5/*Ses-constructor*/ = undefined;
classSystem.readyPromise(PL$3/*type:Ses*/).then(function(parType){
  PL$3/*type:Ses*/ = parType;
  PL$5/*Ses-constructor*/ = classSystem.getTypeConstructor(PL$3/*type:Ses*/);
});
var PL$9/*type:Ses**/ = classSystem._createPromiseOfClass(PL$3/*type:Ses*/);
var PL$10/*Ses**/ = PL$9/*type:Ses**/;
var PL$11/*Ses*-constructor*/ = undefined;classSystem.readyPromise(PL$9/*type:Ses**/).then(function(parType){
  PL$9/*type:Ses**/ = parType;
  PL$11/*Ses*-constructor*/ = classSystem.getTypeConstructor(PL$9/*type:Ses**/);
});
/* ---------------------------- */


/* ---------------------------- */
/* type Pos */
var PL$6/*type:Pos*/ = classSystem._createProvisionalClass();
PL$7/*Pos*/ = PL$6/*type:Pos*/
var PL$8/*Pos-constructor*/ = undefined;
classSystem.readyPromise(PL$6/*type:Pos*/).then(function(parType){
  PL$6/*type:Pos*/ = parType;
  PL$8/*Pos-constructor*/ = classSystem.getTypeConstructor(PL$6/*type:Pos*/);
});
var PL$12/*type:Pos**/ = classSystem._createPromiseOfClass(PL$6/*type:Pos*/);
var PL$13/*Pos**/ = PL$12/*type:Pos**/;
var PL$14/*Pos*-constructor*/ = undefined;classSystem.readyPromise(PL$12/*type:Pos**/).then(function(parType){
  PL$12/*type:Pos**/ = parType;
  PL$14/*Pos*-constructor*/ = classSystem.getTypeConstructor(PL$12/*type:Pos**/);
});
/* ---------------------------- */

PL$15/*promiseland exception catcher*/(function(){

  ;
  var PL$17 = new __Promise();
  var PL$18 = new __Promise();
  var PL$19/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$18.resolve(e); }; }; };
  var PL$20 = function(e){ PL$18.resolve(e); };
  PL$19/*try catch*/(function(){
    PL$21/*waitFun*/ = (function(){
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
    var PL$26/*cb*/;
    PL$24/*promiseland exception catcher*/(function(){
    
      ;
      PL$26/*cb*/ = new PL$27/*Callback*/();
      PL$28/*setTimeout*/(PL$26/*cb*/, 2000);
      PL$26/*cb*/["promise"].then(PL$24/*promiseland exception catcher*/(function(PL$29){PL$29;
      PL$22.resolve(); return;}), PL$25/*catch rejected*/);
      ;
    })();return PL$22;
    });
    PL$30/*nextId*/ = 1;
    classSystem._resolveProvisional(PL$3/*type:Ses*/, classSystem.createClass({className: "Ses",members: [{"name":"constructor","type":classSystem.getBuiltinType("var")},{"name":"id","type":classSystem.getBuiltinType("var")},{"name":"destroy","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "sync": {"type":"sync","all":1,"line":11,"column":14,"offset":146}, "hashStr": "2ce826e49303a51951d5788126b893c0", "name": "Ses"}, {"constructor": (function(){
    
      ;
      (function(s, v){ v = s[10](v); s[9] = v; return v; })(this, PL$30/*nextId*/++);
      ;}), "id": 0, "destroy": (function(){
    
      ;
      PL$31/*console*/["log"](("destroying" + this[9]));
      var PL$32/*p*/ = PL$33/*pos*/[7];
      ;
      PL$31/*console*/["log"](PL$32/*p*/);
      delete PL$32/*p*/[this[9]];
      PL$31/*console*/["log"](PL$32/*p*/);
      (function(s, v){ v = s[8](v); s[7] = v; return v; })(PL$33/*pos*/, PL$32/*p*/);
      ;})}));PL$4/*Ses*/;
    classSystem._resolveProvisional(PL$6/*type:Pos*/, classSystem.createClass({className: "Pos",members: [{"name":"p","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "sync": {"type":"sync","all":1,"line":26,"column":14,"offset":416}, "hashStr": "2ce826e49303a51951d5788126b893c0", "name": "Pos"}, {"p": {
      
    }}));PL$7/*Pos*/;
    PL$33/*pos*/;
    PL$34/*gotit*/ = false;
    (function(){
    if (!promiseland.profileHas("server")){
    return;
    };
    
      ;
      /*temp tracked assign*/(function(vAr){
        if (_TPL$33/*pos*/){ _TPL$33/*pos*/(); };
        if(vAr){
          var v = vAr[0];
          PL$33/*pos*/ = v;
          _TPL$33/*pos*/ = vAr[1];
          return v;
        }else{
          PL$33/*pos*/ = undefined; 
          _TPL$33/*pos*/ = undefined;
          return;
        };
      })(new PL$8/*Pos-constructor*/())/*end temp assign*/;
      PL$34/*gotit*/ = true;
      ;})();
    ((function(f){
    promiseland.registerRemote("server", "2ce826e49303a51951d5788126b893c0", "PL$40", f, (classSystem.createFunctionType({ "return": PL$9/*type:Ses**/, arguments: []})));
    if (promiseland.profileHas("server")){
    return function(){
    var i = 0; var l = arguments.length; var newArgs = [undefined];
    for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
    return f.apply(this, newArgs);
    };
    }else{
    return function(){
    return promiseland.remoteExec("2ce826e49303a51951d5788126b893c0", "PL$40", arguments);
    }
    };
    })((function(t){return t;})(function PL$35/*newSes*/(PL$36/*session*/){
    var PL$37;
    var _TPL$37;
    (function(){ var vAr = new PL$11/*Ses*-constructor*/(); PL$37 = vAr[0]; _TPL$37 = vAr[1]; })();var PL$38/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$37.reject(e);
        };
      };
    };
    var PL$39/*catch rejected*/ = function(e){
      PL$37.reject(e);
    };
    PL$38/*promiseland exception catcher*/(function(){
    
      ;
      PL$31/*console*/["log"]("new session");
      PL$37.resolve(new PL$5/*Ses-constructor*/()); return;
      PL$37.resolve(); return;
    })();return [PL$37, _TPL$37];
    })));
    ((function(f){
    promiseland.registerRemote("server", "2ce826e49303a51951d5788126b893c0", "PL$45", f, (classSystem.createFunctionType({ "return": PL$12/*type:Pos**/, arguments: []})));
    if (promiseland.profileHas("server")){
    return function(){
    var i = 0; var l = arguments.length; var newArgs = [undefined];
    for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
    return f.apply(this, newArgs);
    };
    }else{
    return function(){
    return promiseland.remoteExec("2ce826e49303a51951d5788126b893c0", "PL$45", arguments);
    }
    };
    })((function(t){return t;})(function PL$41/*getPos*/(PL$36/*session*/){
    var PL$42;
    var _TPL$42;
    (function(){ var vAr = new PL$14/*Pos*-constructor*/(); PL$42 = vAr[0]; _TPL$42 = vAr[1]; })();var PL$43/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$42.reject(e);
        };
      };
    };
    var PL$44/*catch rejected*/ = function(e){
      PL$42.reject(e);
    };
    PL$43/*promiseland exception catcher*/(function(){
    
      ;
      PL$42.resolve((function(v){ if(!v){ return; }; return [v, v[2]()];})(PL$33/*pos*/)); return;
      PL$42.resolve(); return;
    })();return [PL$42, _TPL$42];
    })));
    PL$46/*serverSetMouse*/ = ((function(f){
    promiseland.registerRemote("server", "2ce826e49303a51951d5788126b893c0", "PL$54", f, classSystem.getBuiltinType("var"));
    if (promiseland.profileHas("server")){
    return function(){
    var i = 0; var l = arguments.length; var newArgs = [undefined];
    for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
    return f.apply(this, newArgs);
    };
    }else{
    return function(){
    return promiseland.remoteExec("2ce826e49303a51951d5788126b893c0", "PL$54", arguments);
    }
    };
    })(function(PL$36/*session*/, PL$47/*x*/, PL$48/*y*/, PL$49/*sid*/){
    var PL$50 = new __Promise();
    var PL$52/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$50.reject(e);
        };
      };
    };
    var PL$53/*catch rejected*/ = function(e){
      PL$50.reject(e);
    };
    var PL$32/*p*/;
    PL$52/*promiseland exception catcher*/(function(){
    
      ;
      PL$32/*p*/ = PL$33/*pos*/[7];
      PL$32/*p*/[PL$49/*sid*/] = {
        "x": PL$47/*x*/,
        "y": PL$48/*y*/
      };
      (function(s, v){ v = s[8](v); s[7] = v; return v; })(PL$33/*pos*/, PL$32/*p*/);
      PL$50.resolve(); return;
      PL$50.resolve(); return;
    })();return PL$50;
    }));
    (function(){
    if (!promiseland.profileHas("server")){
    return;
    };
    
      ;
      PL$34/*gotit*/ = true;
      ;})();
    PL$55/*s*/;
    PL$56/*setMousePos*/ = (function(PL$47/*x*/, PL$48/*y*/){
    
      ;
      if((PL$55/*s*/[9] > 0)){
        PL$46/*serverSetMouse*/(PL$47/*x*/, PL$48/*y*/, PL$55/*s*/[9]);
      };
      ;
      ;});
    
    var PL$57 = new __Promise();if(! PL$34/*gotit*/){
      PL$21/*waitFun*/().then(PL$19/*try catch*/(function(PL$58){PL$58;
      (function(){ throw { id:201, msg: "type missmatch" } })();
      (function(){ throw { id:201, msg: "type missmatch" } })();
      PL$57.resolve();;}), PL$20);
      ;
    }else{PL$57.resolve();
    };PL$57.then(PL$19/*try catch*/(function(PL$61){PL$61;;
    ;
    if(PL$62/*window*/){
      PL$62/*window*/["onmousemove"] = (function(PL$63/*evt*/){
      
        ;
        if((PL$63/*evt*/["pageX"] !== undefined)){
          PL$56/*setMousePos*/(PL$63/*evt*/["pageX"], PL$63/*evt*/["pageY"]);
        };
        ;
        ;});
      PL$64/*wgts*/ = {
        
      };
      PL$65/*setInterval*/((function(){
      
        ;
        var PL$32/*p*/ = PL$33/*pos*/[7];
        ;
        var PL$66/*i*/;
        ;
        var PL$67/*n*/;
        ;
        for(PL$66/*i*/ in PL$32/*p*/){
          if((PL$66/*i*/ != PL$55/*s*/[9])){
            if(PL$64/*wgts*/[PL$66/*i*/]){
              PL$67/*n*/ = PL$64/*wgts*/[PL$66/*i*/]["n"];
            }else{
            PL$67/*n*/ = PL$68/*document*/["createElement"]("img");
            PL$67/*n*/["src"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAEWklEQVRIx6WVC1BUVRiAbyCBiUVlzuhQNgxmDQwx8hQkddkVWSAJotSwiYfh8qayKaD57967hCZFGCGP3QXuwrK7vJ8iwfIM5LmwsGBKmrxFB6ERSYaFzjJao4DAcma++e+5/5lv/nvPC/vm24jtyoUFbMMt5sdYFySjn/jk5MZESclcB0l2bgzTyeVNcwtL9UUZmSJGSWk5kcJNjUHdF3x8T6knKiouZUhy8gkEJCam4IzDDroBLNb6RdKaWoZQlEtkCMVAZYjYScn8YNO3d29at6iltY2RKZQQgkwRpKZnApdPkUkp/GNcfvr6RDJ5N516LKIyIYWXDrxUQRSXl3aYEmStXdQlVzCyJLmEUJwDAqEE0gVZwEvLAD6VEU1RQnveWitrl3UxCorLiIKiMsgrLIWc/EKQ5BaCSIUkj0xO5hlHfIevLrrS3EKvqW8iqmsbQVrzO1TVNECltAF+k9ZBVXUDXlRyGU77B2xbw6zV0+WKP4hOeS/IulQoQNapgE55H3Sg2Ngsw/MKyyLQUK1nikpKK+gDQ2PEzVvD8B8Dw3D9zwFQ9F2Hnt5+uNb/Fzu/qCy8u/fqyqK8/AL6g5lZYmrqPizy9zTcnZiC8bv3EKo4ucjk1DRBZQq9Y3+OW14kFInsFxYWyDmlEubmlaCcm4c55RxifgkzM/9EkZzvmY5M5lIRlU4tihCwFmZnH0abmZtbGxmbPCnip/LtZx/OkPemJlD5k6swAdMP7sPg0OC5Lbpbdzs7H/1flEZR9qPj4+Tg8DAsy8gIjI7fhtHbYzA8OrLYH7tzB5paWggTE9Md5hZWj/6RONu+r/8m0XMVzdBTKBBdPX1QUVVHNjS1kfLefuLajQHixsAoe2hsnLhcWR356mt6mx4dI2W05nY52djaCY+50i7HUcSbO7oB7UNAw6wRNs9rb2bu2mV4zGqfne9RV48gVkBoONPJNUhLCy2x6toGmrSuiayqbYJqhLS2ie3l6xfE5QtCahvb8MqaRjIwOMxWW1sH27FTHzN51wyzZzhiRWVSVR0aiK1aKlNLawet6FIlWVJeBRXSevxzVlA4SurHXUgwKL1UGVVeVQe/XuTiH7h5rLgWFytql8lpGVk5ZHZ+Me7nH6L6jLdUyfj4REycU8gRivMgS1LAYTJdTFbb/Qd/SUjheHmdVlVi+OR5LqbFX+SSCUl8nBN9PszF2XVlUZY4l+HucYKNHg2ezv0Ud+HFsz/EngUiGnDyHOeIg9PrK4o++thzLwpGmpqaS3JoJT8XHsn2CQk7ww794muC5R/sbmFptbzI86Q3pqOzednc4K0BLDjkS1ufUyyOl48f7vmp91dmZuZb1LquAoJCt7t7HI9EgNuHx6PsDh4yVksUGByKOTm7Bjo4uuBHmO+zbfcf+Ezt29h6n43F/vcOcewO0HDTvZbn0auX1BLZ2NphBoZ7onfqv3FGT+9lN00NjW3YBtorCN097xhhSLQk+S/Hvpo08p3TowAAAABJRU5ErkJggg==";
            PL$67/*n*/["style"]["position"] = "absolute";
            PL$68/*document*/["body"]["appendChild"](PL$67/*n*/);
            PL$64/*wgts*/[PL$66/*i*/] = {
              "n": PL$67/*n*/
            };
            };
            ;
            PL$67/*n*/["style"]["top"] = (PL$32/*p*/[PL$66/*i*/]["y"] + "px");
            PL$67/*n*/["style"]["left"] = (PL$32/*p*/[PL$66/*i*/]["x"] + "px");
          };
          ;};
        ;
        for(PL$66/*i*/ in PL$64/*wgts*/){
          if(! PL$32/*p*/[PL$66/*i*/]){
            PL$67/*n*/ = PL$64/*wgts*/[PL$66/*i*/]["n"];
            PL$68/*document*/["body"]["removeChild"](PL$67/*n*/);
            delete PL$64/*wgts*/[PL$66/*i*/];
          };
          ;};
        ;
        ;}), 100);
    };
    ;
    PL$17.resolve();}), PL$20);
  ;})();
  PL$18.then(PL$15/*promiseland exception catcher*/(function(PL$69/*e*/){
    PL$31/*console*/["log"]("error:");
    PL$31/*console*/["log"](PL$69/*e*/);
    PL$17.resolve();;}));
  PL$17.then(PL$15/*promiseland exception catcher*/(function(){;
  PL$1.resolve(); return;}), PL$16/*catch rejected*/)
})();return PL$1;
})();
;;
return PL$1});
})();