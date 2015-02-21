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
    var Callback = promiseland.Callback;
if (promiseland._hasModule({ hashStr: "68d24d8387772c0d2c334e8117591495" })){ return promiseland._getModule("68d24d8387772c0d2c334e8117591495"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "68d24d8387772c0d2c334e8117591495", "module": PL$1, promising: true });
var PL$22/*promiseland*/;try{PL$22/*promiseland*/ = promiseland;}catch(e){};
var PL$60/*console*/;try{PL$60/*console*/ = console;}catch(e){};
var PL$146/*process*/;try{PL$146/*process*/ = process;}catch(e){};
var PL$151/*Callback*/;try{PL$151/*Callback*/ = Callback;}catch(e){};
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
var PL$11/*DijitTree*/;
var PL$12/*rootPathStr*/;
var PL$13/*path*/;
var PL$14/*fs*/;
var PL$15/*solString*/;
var PL$17/*files*/;
var PL$18/*frontEnd*/;
var PL$19/*watch*/;
var PL$20/*monitor*/;
var PL$4/*Tree*/;
var PL$108/*theTree*/;
var _TPL$108/*theTree*/;

/* ---------------------------- */
/* type Tree */
var PL$3/*type:Tree*/ = classSystem._createProvisionalClass();
PL$4/*Tree*/ = PL$3/*type:Tree*/
var PL$5/*Tree-constructor*/ = undefined;
classSystem.readyPromise(PL$3/*type:Tree*/).then(function(parType){
  PL$3/*type:Tree*/ = parType;
  PL$5/*Tree-constructor*/ = classSystem.getTypeConstructor(PL$3/*type:Tree*/);
});
var PL$6/*type:Tree**/ = classSystem._createPromiseOfClass(PL$3/*type:Tree*/);
var PL$7/*Tree**/ = PL$6/*type:Tree**/;
var PL$8/*Tree*-constructor*/ = undefined;classSystem.readyPromise(PL$6/*type:Tree**/).then(function(parType){
  PL$6/*type:Tree**/ = parType;
  PL$8/*Tree*-constructor*/ = classSystem.getTypeConstructor(PL$6/*type:Tree**/);
});
/* ---------------------------- */

function PL$109/*solvePath*/(PL$110/*pathStr*/){

  ;
  var PL$111/*newPathStr*/ = PL$13/*path*/["normalize"](PL$13/*path*/["join"](PL$12/*rootPathStr*/, PL$110/*pathStr*/));
  ;
  if(PL$15/*solString*/["startsWith"](PL$111/*newPathStr*/, PL$12/*rootPathStr*/)){
    return PL$111/*newPathStr*/;
  };
  ;
  throw {
    "msg": "access denied"
  };
  ;};
function PL$112/*real2FrontEndPath*/(PL$110/*pathStr*/){

  ;
  PL$110/*pathStr*/ = PL$13/*path*/["normalize"](PL$110/*pathStr*/);
  if(! PL$15/*solString*/["startsWith"](PL$110/*pathStr*/, PL$12/*rootPathStr*/)){
    throw {
      "msg": "attempt to access path outside configuration"
    };
  };
  ;
  return PL$110/*pathStr*/["substr"](PL$12/*rootPathStr*/["length"]);
  ;};
var PL$34/*getRoot*/ = (function(f){
promiseland.registerRemote("server", "68d24d8387772c0d2c334e8117591495", "PL$118", f, classSystem.getBuiltinType("var"));
if (promiseland.profileHas("server")){
return function(){
var i = 0; var l = arguments.length; var newArgs = [undefined];
for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
return f.apply(this, newArgs);
};
}else{
return function(){
return promiseland.remoteExec("68d24d8387772c0d2c334e8117591495", "PL$118", arguments);
}
};
})(function (PL$113/*session*/){
var PL$114 = new __Promise();
var PL$116/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$114.reject(e);
    };
  };
};
var PL$117/*catch rejected*/ = function(e){
  PL$114.reject(e);
};
PL$116/*promiseland exception catcher*/(function(){

  ;
  PL$114.resolve({
    "id": "/",
    "name": "root",
    "hasChildren": true
  }); return;
  PL$114.resolve(); return;
})();return PL$114;
});
var PL$119/*getChildren*/ = (function(f){
promiseland.registerRemote("server", "68d24d8387772c0d2c334e8117591495", "PL$124", f, classSystem.getBuiltinType("var"));
if (promiseland.profileHas("server")){
return function(){
var i = 0; var l = arguments.length; var newArgs = [undefined];
for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
return f.apply(this, newArgs);
};
}else{
return function(){
return promiseland.remoteExec("68d24d8387772c0d2c334e8117591495", "PL$124", arguments);
}
};
})(function (PL$113/*session*/, PL$41/*parId*/){
var PL$120 = new __Promise();
var PL$122/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$120.reject(e);
    };
  };
};
var PL$123/*catch rejected*/ = function(e){
  PL$120.reject(e);
};
PL$122/*promiseland exception catcher*/(function(){

  ;
  PL$120.resolve([
    
  ]); return;
  PL$120.resolve(); return;
})();return PL$120;
});
var PL$47/*getTreeChildren*/ = (function(f){
promiseland.registerRemote("server", "68d24d8387772c0d2c334e8117591495", "PL$131", f, classSystem.getBuiltinType("var"));
if (promiseland.profileHas("server")){
return function(){
var i = 0; var l = arguments.length; var newArgs = [undefined];
for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
return f.apply(this, newArgs);
};
}else{
return function(){
return promiseland.remoteExec("68d24d8387772c0d2c334e8117591495", "PL$131", arguments);
}
};
})(function (PL$113/*session*/, PL$41/*parId*/){
var PL$125 = new __Promise();
var PL$127/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$125.reject(e);
    };
  };
};
var PL$128/*catch rejected*/ = function(e){
  PL$125.reject(e);
};
var PL$129/*realPathStr*/;
var PL$68/*kids*/;
PL$127/*promiseland exception catcher*/(function(){

  ;
  PL$129/*realPathStr*/ = PL$109/*solvePath*/(PL$41/*parId*/);
  PL$17/*files*/["dirChildren"](PL$129/*realPathStr*/).then(PL$127/*promiseland exception catcher*/(function(PL$130){PL$68/*kids*/ = PL$130;
  PL$125.resolve(PL$68/*kids*/["map"]((function(PL$110/*pathStr*/){
  
    ;
    return {
      "id": PL$112/*real2FrontEndPath*/(PL$110/*pathStr*/),
      "name": PL$13/*path*/["basename"](PL$110/*pathStr*/),
      "hasChildren": true
    };
    ;}))); return;
  PL$125.resolve(); return;}), PL$128/*catch rejected*/);
  ;
})();return PL$125;
});
var PL$132/*getTree*/ = (function(f){
promiseland.registerRemote("server", "68d24d8387772c0d2c334e8117591495", "PL$136", f, (classSystem.createFunctionType({ "return": PL$6/*type:Tree**/, arguments: []})));
if (promiseland.profileHas("server")){
return function(){
var i = 0; var l = arguments.length; var newArgs = [undefined];
for(i = 0; i < l; ++i){ newArgs.push(arguments[i]); };
return f.apply(this, newArgs);
};
}else{
return function(){
return promiseland.remoteExec("68d24d8387772c0d2c334e8117591495", "PL$136", arguments);
}
};
})((function(t){return t;})(function (PL$113/*session*/){
var PL$133;
var _TPL$133;
(function(){ var vAr = new PL$8/*Tree*-constructor*/(); PL$133 = vAr[0]; _TPL$133 = vAr[1]; })();var PL$134/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$133.reject(e);
    };
  };
};
var PL$135/*catch rejected*/ = function(e){
  PL$133.reject(e);
};
PL$134/*promiseland exception catcher*/(function(){

  ;
  PL$133.resolve((function(v){ if(!v){ return; }; return [v, v[2]()];})(PL$108/*theTree*/)); return;
  PL$133.resolve(); return;
})();return [PL$133, _TPL$133];
}));
PL$9/*promiseland exception catcher*/(function(){

  ;
  PL$11/*DijitTree*/;
  PL$12/*rootPathStr*/;
  PL$13/*path*/;
  PL$14/*fs*/;
  __requireFun("../sol/string").then(PL$9/*promiseland exception catcher*/(function(PL$16){PL$15/*solString*/ = PL$16;
  PL$17/*files*/;
  PL$18/*frontEnd*/;
  PL$19/*watch*/;
  PL$20/*monitor*/;
  classSystem._resolveProvisional(PL$3/*type:Tree*/, classSystem.createClass({className: "Tree",members: [{"name":"constructor","type":classSystem.getBuiltinType("var")},{"name":"onDelete","type":(classSystem.createFunctionType({ "return": classSystem.getBuiltinType("var"), arguments: [classSystem.getBuiltinType("var")]})),"sync": true},{"name":"onChildrenChange","type":(classSystem.createFunctionType({ "return": classSystem.getBuiltinType("var"), arguments: [classSystem.getBuiltinType("var")]})),"sync": true},{"name":"destroy","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "sync": {"type":"sync","all":0,"line":16,"column":12,"offset":158}, "hashStr": "68d24d8387772c0d2c334e8117591495", "name": "Tree"}, {"constructor": (function(){
  var PL$21/*self*/;
  var _TPL$21/*self*/;
  
    try{;
    /*tracked assign*/(function(v){
    if (_TPL$21/*self*/){ _TPL$21/*self*/(); };
    PL$21/*self*/ = v;
    if (v){
    _TPL$21/*self*/ = v[2]();
    }else{
    _TPL$21/*self*/ = undefined;
    };
    return v;
    })(this)/*end assign*/
    ;
    (function(){
    if (!promiseland.profileHas("client")){
    return;
    };
    
      ;
      PL$21/*self*/[5]["tree"] = new PL$11/*DijitTree*/({
        "region": "left",
        "class": "mainTree",
        "model": {
          "itemMap": new PL$22/*promiseland*/["Map"](),
          "getRoot": (function(PL$23/*thenFun*/, PL$24/*errFun*/){
          var PL$72 = new __Promise();
          var PL$74/*promiseland exception catcher*/ = function(code){
            return function(res){
              try{ code(res); }catch(e){
                PL$72.reject(e);
              };
            };
          };
          var PL$75/*catch rejected*/ = function(e){
            PL$72.reject(e);
          };
          var PL$33/*item*/;
          var PL$81/*this*/ = this;
          PL$74/*promiseland exception catcher*/(function(){
          
            ;
            var PL$76 = new __Promise();
            var PL$77 = new __Promise();
            var PL$78/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$77.resolve(e); }; }; };
            var PL$79 = function(e){ PL$77.resolve(e); };
            PL$78/*try catch*/(function(){
              PL$34/*getRoot*/().then(PL$78/*try catch*/(function(PL$80){PL$33/*item*/ = PL$80;
              PL$81/*this*/["itemMap"]["set"](PL$33/*item*/["id"], PL$33/*item*/);
              PL$23/*thenFun*/(PL$33/*item*/);
              PL$76.resolve();}), PL$79);
            ;})();
            PL$77.then(PL$74/*promiseland exception catcher*/(function(PL$37/*e*/){
              PL$24/*errFun*/(PL$37/*e*/);
              PL$76.resolve();;}));
            PL$76.then(PL$74/*promiseland exception catcher*/(function(){;
            ;
            PL$72.resolve(); return;}), PL$75/*catch rejected*/)
          })();return PL$72;
          }),
          "getLabel": (function(PL$38/*parItem*/){
          
            ;
            return PL$38/*parItem*/["name"];
            ;}),
          "mayHaveChildren": (function(PL$38/*parItem*/){
          
            ;
            return PL$38/*parItem*/["hasChildren"];
            ;}),
          "getIdentity": (function(PL$38/*parItem*/){
          
            ;
            return PL$38/*parItem*/["id"];
            ;}),
          "_importKids": (function(PL$39/*parKids*/){
          
            ;
            var PL$40/*i*/ = 0;
            ;
            for(PL$40/*i*/ = 0;(PL$40/*i*/ < PL$39/*parKids*/["length"]);++PL$40/*i*/){{
              this["itemMap"]["set"](PL$39/*parKids*/[PL$40/*i*/]["id"], PL$39/*parKids*/[PL$40/*i*/]);}};
            ;
            ;}),
          "_getChildren": (function(PL$41/*parId*/){
          var PL$82 = new __Promise();
          var PL$84/*promiseland exception catcher*/ = function(code){
            return function(res){
              try{ code(res); }catch(e){
                PL$82.reject(e);
              };
            };
          };
          var PL$85/*catch rejected*/ = function(e){
            PL$82.reject(e);
          };
          var PL$46/*res*/;
          var PL$87/*this*/ = this;
          PL$84/*promiseland exception catcher*/(function(){
          
            ;
            PL$47/*getTreeChildren*/(PL$41/*parId*/).then(PL$84/*promiseland exception catcher*/(function(PL$86){PL$46/*res*/ = PL$86;
            PL$87/*this*/["_importKids"](PL$46/*res*/);
            PL$82.resolve(PL$46/*res*/); return;
            PL$82.resolve(); return;}), PL$85/*catch rejected*/);
            ;
          })();return PL$82;
          }),
          "getChildren": (function(PL$38/*parItem*/, PL$23/*thenFun*/, PL$24/*errFun*/){
          var PL$88 = new __Promise();
          var PL$90/*promiseland exception catcher*/ = function(code){
            return function(res){
              try{ code(res); }catch(e){
                PL$88.reject(e);
              };
            };
          };
          var PL$91/*catch rejected*/ = function(e){
            PL$88.reject(e);
          };
          var PL$46/*res*/;
          var PL$96/*this*/ = this;
          PL$90/*promiseland exception catcher*/(function(){
          
            ;
            var PL$92 = new __Promise();
            var PL$93 = new __Promise();
            var PL$94/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$93.resolve(e); }; }; };
            var PL$95 = function(e){ PL$93.resolve(e); };
            PL$94/*try catch*/(function(){
              PL$96/*this*/["_getChildren"](PL$38/*parItem*/["id"]).then(PL$94/*try catch*/(function(PL$97){PL$46/*res*/ = PL$97;
              PL$23/*thenFun*/(PL$46/*res*/);
              PL$92.resolve();}), PL$95);
            ;})();
            PL$93.then(PL$90/*promiseland exception catcher*/(function(PL$37/*e*/){
              PL$24/*errFun*/(PL$37/*e*/);
              PL$92.resolve();;}));
            PL$92.then(PL$90/*promiseland exception catcher*/(function(){;
            ;
            PL$88.resolve(); return;}), PL$91/*catch rejected*/)
          })();return PL$88;
          }),
          "onChildrenChange": (function(){
          
            ;
            ;}),
          "onDelete": (function(){
          
            ;
            ;})
        }
      });
      PL$18/*frontEnd*/["mainBc"]["addChild"](PL$21/*self*/[5]["tree"]);
      ;})();
    if (_TPL$21/*self*/){ _TPL$21/*self*/();};}catch(e){if (_TPL$21/*self*/){ _TPL$21/*self*/();};throw e};;}), "onDelete": (function(PL$41/*parId*/){
  
    ;
    PL$60/*console*/["log"](("onDelete: " + PL$41/*parId*/));
    if(this[5]["tree"]){
      var PL$33/*item*/ = this[5]["tree"]["model"]["itemMap"]["get"](PL$41/*parId*/);
      ;
      if(PL$33/*item*/){
        this[5]["tree"]["model"]["onDelete"](PL$33/*item*/);
      };
      ;
    };
    ;
    ;}), "onChildrenChange": ((function(t){return t;})(function(PL$41/*parId*/){
  var PL$98 = new __Promise();
  var PL$100/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$98.reject(e);
      };
    };
  };
  var PL$101/*catch rejected*/ = function(e){
    PL$98.reject(e);
  };
  var PL$33/*item*/;
  var PL$68/*kids*/;
  var PL$103/*this*/ = this;
  PL$100/*promiseland exception catcher*/(function(){
  
    ;
    PL$60/*console*/["log"](("onChildrenChange: " + PL$41/*parId*/));
    
    var PL$102 = new __Promise();if(PL$103/*this*/[5]["tree"]){
      PL$33/*item*/ = PL$103/*this*/[5]["tree"]["model"]["itemMap"]["get"](PL$41/*parId*/);
      
      var PL$104 = new __Promise();if(PL$33/*item*/){
        PL$103/*this*/[5]["tree"]["model"]["_getChildren"](PL$41/*parId*/).then(PL$100/*promiseland exception catcher*/(function(PL$105){PL$68/*kids*/ = PL$105;
        PL$103/*this*/[5]["tree"]["model"]["onChildrenChange"](PL$33/*item*/, PL$68/*kids*/);
        PL$104.resolve();;}), PL$101/*catch rejected*/);
        ;
      }else{PL$104.resolve();
      };PL$104.then(PL$100/*promiseland exception catcher*/(function(PL$106){PL$106;;
      ;
      PL$102.resolve();;}), PL$101/*catch rejected*/);
      ;
    }else{PL$102.resolve();
    };PL$102.then(PL$100/*promiseland exception catcher*/(function(PL$107){PL$107;;
    ;
    PL$98.resolve(); return;}), PL$101/*catch rejected*/);
    ;
  })();return PL$98;
  })), "destroy": (function(){
  
    ;
    PL$60/*console*/["log"]("tree destructor");
    if(this[5]["tree"]){
      this[5]["tree"]["destroy"]();
      this[5]["tree"] = null;
      PL$18/*frontEnd*/["mainBc"]["resize"]();
    };
    ;
    ;})}));PL$4/*Tree*/;
  PL$108/*theTree*/;
  /* function solvePath (){} - hoisted */;
  ;
  /* function real2FrontEndPath (){} - hoisted */;
  ;
  /* function getRoot (){} - hoisted */;
  ;
  /* function getChildren (){} - hoisted */;
  ;
  /* function getTreeChildren (){} - hoisted */;
  ;
  /* function getTree (){} - hoisted */;
  ;
  (function(){
  if (!promiseland.profileHas("server")){
  var p = new __Promise();
  p.reject({id: 14, msg: "function does not execute in this frame."});
  return p;
  };
  var PL$137 = new __Promise();
  var PL$139/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$137.reject(e);
      };
    };
  };
  var PL$140/*catch rejected*/ = function(e){
    PL$137.reject(e);
  };
  var PL$150/*cb*/;
  PL$139/*promiseland exception catcher*/(function(){
  
    ;
    var PL$141 = new __Promise();
    var PL$142 = new __Promise();
    var PL$143/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$142.resolve(e); }; }; };
    var PL$144 = function(e){ PL$142.resolve(e); };
    PL$143/*try catch*/(function(){
      __requireFun("path").then(PL$143/*try catch*/(function(PL$145){PL$13/*path*/ = PL$145;
      PL$12/*rootPathStr*/ = PL$13/*path*/["normalize"](PL$146/*process*/["cwd"]());
      __requireFun("fs").then(PL$143/*try catch*/(function(PL$147){PL$14/*fs*/ = PL$147;
      __requireFun("./files").then(PL$143/*try catch*/(function(PL$148){PL$17/*files*/ = PL$148;
      __requireFun("watch").then(PL$143/*try catch*/(function(PL$149){PL$19/*watch*/ = PL$149;
      /*temp tracked assign*/(function(vAr){
        if (_TPL$108/*theTree*/){ _TPL$108/*theTree*/(); };
        if(vAr){
          var v = vAr[0];
          PL$108/*theTree*/ = v;
          _TPL$108/*theTree*/ = vAr[1];
          return v;
        }else{
          PL$108/*theTree*/ = undefined; 
          _TPL$108/*theTree*/ = undefined;
          return;
        };
      })(new PL$5/*Tree-constructor*/())/*end temp assign*/;
      PL$150/*cb*/ = new PL$151/*Callback*/();
      PL$19/*watch*/["createMonitor"](PL$12/*rootPathStr*/, {
        "ignoreUnreadableDir": true
      }, PL$150/*cb*/);
      PL$150/*cb*/["promise"].then(PL$143/*try catch*/(function(PL$152){PL$20/*monitor*/ = PL$152[0];
      PL$20/*monitor*/["on"]("created", (function(PL$153/*f*/, PL$154/*stat*/){
      
        ;
        PL$60/*console*/["log"](("created: " + PL$153/*f*/));
        PL$60/*console*/["log"](("isDir: " + PL$154/*stat*/["isDirectory"]()));
        if(PL$154/*stat*/["isDirectory"]()){
          var PL$155/*parentId*/ = PL$13/*path*/["dirname"](PL$112/*real2FrontEndPath*/(PL$153/*f*/));
          ;
          PL$108/*theTree*/[10](PL$155/*parentId*/);
        };
        ;
        ;}));
      PL$20/*monitor*/["on"]("changed", (function(PL$153/*f*/, PL$156/*curr*/, PL$157/*prev*/){
      
        ;
        PL$60/*console*/["log"](("changed: " + PL$153/*f*/));
        PL$60/*console*/["log"](("isDir: " + PL$156/*curr*/["isDirectory"]()));
        PL$60/*console*/["log"](("isDir: " + PL$157/*prev*/["isDirectory"]()));
        ;}));
      PL$20/*monitor*/["on"]("removed", (function(PL$153/*f*/, PL$154/*stat*/){
      
        ;
        PL$60/*console*/["log"](("removed: " + PL$153/*f*/));
        PL$108/*theTree*/[8](PL$112/*real2FrontEndPath*/(PL$153/*f*/));
        ;}));
      PL$141.resolve();}), PL$144);
    ;}), PL$144);
    ;}), PL$144);
    ;}), PL$144);
    ;}), PL$144);
    ;})();
    PL$142.then(PL$139/*promiseland exception catcher*/(function(PL$37/*e*/){
      PL$60/*console*/["log"](PL$37/*e*/);
      PL$141.resolve();;}));
    PL$141.then(PL$139/*promiseland exception catcher*/(function(){;
    ;
    PL$60/*console*/["log"]("finished");
    PL$137.resolve(); return;}), PL$140/*catch rejected*/)
  })();return PL$137;
  })();
  (function(){
  if (!promiseland.profileHas("client")){
  var p = new __Promise();
  p.reject({id: 14, msg: "function does not execute in this frame."});
  return p;
  };
  var PL$158 = new __Promise();
  var PL$160/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$158.reject(e);
      };
    };
  };
  var PL$161/*catch rejected*/ = function(e){
    PL$158.reject(e);
  };
  var PL$164/*client*/;
  var PL$166/*OfflineWgt*/;
  var PL$168/*offlineWgt*/;
  function PL$169/*enterOffline*/(){
  
    ;
    if(PL$168/*offlineWgt*/){
      return;
    };
    ;
    PL$168/*offlineWgt*/ = new PL$166/*OfflineWgt*/({
      "region": "top"
    });
    PL$18/*frontEnd*/["mainBc"]["addChild"](PL$168/*offlineWgt*/);
    ;};
  function PL$170/*enterOnline*/(){
  var PL$171 = new __Promise();
  var PL$173/*promiseland exception catcher*/ = function(code){
    return function(res){
      try{ code(res); }catch(e){
        PL$171.reject(e);
      };
    };
  };
  var PL$174/*catch rejected*/ = function(e){
    PL$171.reject(e);
  };
  PL$173/*promiseland exception catcher*/(function(){
  
    ;
    if(PL$168/*offlineWgt*/){
      PL$168/*offlineWgt*/["destroy"]();
      PL$168/*offlineWgt*/ = undefined;
      PL$18/*frontEnd*/["mainBc"]["resize"]();
    };
    ;
    /*temptracked promise*/(function(vAr){
    var r = vAr[0].thenReuse(vAr[1], PL$173/*promiseland exception catcher*/(function(PL$175){/*temp tracked assign*/(function(vAr){
      if (_TPL$108/*theTree*/){ _TPL$108/*theTree*/(); };
      if(vAr){
        var v = vAr[0];
        PL$108/*theTree*/ = v;
        _TPL$108/*theTree*/ = vAr[1];
        return v;
      }else{
        PL$108/*theTree*/ = undefined; 
        _TPL$108/*theTree*/ = undefined;
        return;
      };
    })(PL$175)/*end temp assign*/;
    PL$171.resolve(); return;}), PL$174/*catch rejected*/);
    return r;
    })(PL$132/*getTree*/());/*temptracked promise end*/
    ;
  })();return PL$171;
  };
  PL$160/*promiseland exception catcher*/(function(){
  
    ;
    __requireFun("dijit/Tree").then(PL$160/*promiseland exception catcher*/(function(PL$162){PL$11/*DijitTree*/ = PL$162;
    __requireFun("./frontEnd").then(PL$160/*promiseland exception catcher*/(function(PL$163){PL$18/*frontEnd*/ = PL$163;
    __requireFun("frameworkClient/client").then(PL$160/*promiseland exception catcher*/(function(PL$165){PL$164/*client*/ = PL$165;
    __requireFun("./OfflineWgt").then(PL$160/*promiseland exception catcher*/(function(PL$167){PL$166/*OfflineWgt*/ = PL$167;
    PL$168/*offlineWgt*/;
    /* function enterOffline (){} - hoisted */;
    ;
    /* function enterOnline (){} - hoisted */;
    ;
    if(PL$164/*client*/["connected"]){
      PL$170/*enterOnline*/();
    }else{
    PL$169/*enterOffline*/();
    };
    ;
    PL$164/*client*/["on"]("disconnect", PL$169/*enterOffline*/);
    PL$164/*client*/["on"]("connect", PL$170/*enterOnline*/);
    PL$158.resolve(); return;}), PL$161/*catch rejected*/);
    ;}), PL$161/*catch rejected*/);
    ;}), PL$161/*catch rejected*/);
    ;}), PL$161/*catch rejected*/);
    ;
  })();return PL$158;
  })();
  PL$1.resolve(); return;}), PL$10/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();