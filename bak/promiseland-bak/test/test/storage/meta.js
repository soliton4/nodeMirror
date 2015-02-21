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
if (promiseland._hasModule({ hashStr: "77cc02dd044b16afcb2e77dad8305f70" })){ return promiseland._getModule("77cc02dd044b16afcb2e77dad8305f70"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "77cc02dd044b16afcb2e77dad8305f70", "module": PL$1, promising: true });
var PL$16/*promiseland*/;try{PL$16/*promiseland*/ = promiseland;}catch(e){};
var PL$2 = (function(){
"use strict";
var PL$6/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$1.reject(e);
    };
  };
};
var PL$7/*catch rejected*/ = function(e){
  PL$1.reject(e);
};
var PL$8/*properties*/;
var PL$31/*SaveHandler*/;
var PL$4/*C1*/;
var PL$32/*a*/;

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

PL$6/*promiseland exception catcher*/(function(){

  ;
  PL$8/*properties*/;
  PL$31/*SaveHandler*/ = (function(){var PL$9/*inherited*/ = {};
  var res = promiseland.createClass({
    "registerClass": (function(PL$10/*par*/){
    var PL$11 = new __Promise();
    var PL$13/*promiseland exception catcher*/ = function(code){
      return function(res){
        try{ code(res); }catch(e){
          PL$11.reject(e);
        };
      };
    };
    var PL$14/*catch rejected*/ = function(e){
      PL$11.reject(e);
    };
    var PL$15/*map*/;
    PL$13/*promiseland exception catcher*/(function(){
    
      ;
      PL$15/*map*/ = new PL$16/*promiseland*/["Map"]();
      PL$8/*properties*/ = PL$10/*par*/["properties"];
      PL$11.resolve({
        "save": (function(PL$10/*par*/){
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
        var PL$21/*i*/;
        var PL$22/*o*/;
        PL$19/*promiseland exception catcher*/(function(){
        
          ;
          PL$21/*i*/ = 0;
          PL$22/*o*/ = {
            
          };
          for(PL$21/*i*/ = 0;(PL$21/*i*/ < PL$10/*par*/["propertiesAr"]["length"]);++PL$21/*i*/){{
            if((PL$10/*par*/["propertiesAr"][PL$21/*i*/]["name"] == "id")){
              continue;;
            };
            ;
            PL$22/*o*/[PL$10/*par*/["propertiesAr"][PL$21/*i*/]["name"]] = PL$10/*par*/["propertiesAr"][PL$21/*i*/]["value"];}};
          ;
          PL$15/*map*/["set"](PL$10/*par*/["properties"]["id"]["value"], PL$22/*o*/);
          PL$17.resolve(); return;
        })();return PL$17;
        }),
        "load": (function(PL$10/*par*/){
        var PL$23 = new __Promise();
        var PL$25/*promiseland exception catcher*/ = function(code){
          return function(res){
            try{ code(res); }catch(e){
              PL$23.reject(e);
            };
          };
        };
        var PL$26/*catch rejected*/ = function(e){
          PL$23.reject(e);
        };
        PL$25/*promiseland exception catcher*/(function(){
        
          ;
          PL$23.resolve(PL$15/*map*/["get"](PL$10/*par*/["properties"]["id"]["value"])); return;
          PL$23.resolve(); return;
        })();return PL$23;
        }),
        "delete": (function(PL$10/*par*/){
        var PL$27 = new __Promise();
        var PL$29/*promiseland exception catcher*/ = function(code){
          return function(res){
            try{ code(res); }catch(e){
              PL$27.reject(e);
            };
          };
        };
        var PL$30/*catch rejected*/ = function(e){
          PL$27.reject(e);
        };
        PL$29/*promiseland exception catcher*/(function(){
        
          ;
          PL$27.resolve(PL$15/*map*/["delete"](PL$10/*par*/["properties"]["id"]["value"])); return;
          PL$27.resolve(); return;
        })();return PL$27;
        })
      }); return;
      PL$11.resolve(); return;
    })();return PL$11;
    })
  }, [], PL$9/*inherited*/);
  return res; })();PL$31/*SaveHandler*/;
  classSystem._resolveProvisional(PL$3/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"x","type":classSystem.getBuiltinType("var"),"meta":{
    "type": "int"
  }},{"name":"y","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "hashStr": "77cc02dd044b16afcb2e77dad8305f70", "name": "C1", "savable": true}, {"x": 1, "y": 2}));PL$4/*C1*/;
  PL$16/*promiseland*/["classSystem"]["setStorageEngine"](new PL$31/*SaveHandler*/(), PL$4/*C1*/);
  new PL$5/*C1-constructor*/("xxx").then(PL$6/*promiseland exception catcher*/(function(PL$33){PL$32/*a*/ = PL$33;
  PL$32/*a*/[4]().then(PL$6/*promiseland exception catcher*/(function(PL$34){PL$34;
  if(! PL$8/*properties*/){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  if(! PL$8/*properties*/["x"]){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  if(! PL$8/*properties*/["x"]["meta"]){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  if((PL$8/*properties*/["x"]["meta"]["type"] != "int")){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  PL$1.resolve({
    "success": true
  }); return;
  PL$1.resolve(); return;}), PL$7/*catch rejected*/);
  ;}), PL$7/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();