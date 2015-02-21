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
if (promiseland._hasModule({ hashStr: "eae93c49cf65b200dc7532ca35899b2d" })){ return promiseland._getModule("eae93c49cf65b200dc7532ca35899b2d"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "eae93c49cf65b200dc7532ca35899b2d", "module": PL$1, promising: true });
var PL$19/*promiseland*/;try{PL$19/*promiseland*/ = promiseland;}catch(e){};
var PL$39/*console*/;try{PL$39/*console*/ = console;}catch(e){};
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
var PL$34/*SaveHandler*/;
var PL$4/*C1*/;
var PL$35/*a*/;
var _TPL$35/*a*/;

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
  var PL$8 = new __Promise();
  var PL$9 = new __Promise();
  var PL$10/*try catch*/ = function(code){ return function(res){ try{code(res);}catch(e){ PL$9.resolve(e); }; }; };
  var PL$11 = function(e){ PL$9.resolve(e); };
  PL$10/*try catch*/(function(){
    PL$34/*SaveHandler*/ = (function(){var PL$12/*inherited*/ = {};
    var res = promiseland.createClass({
      "registerClass": (function(PL$13/*par*/){
      var PL$14 = new __Promise();
      var PL$16/*promiseland exception catcher*/ = function(code){
        return function(res){
          try{ code(res); }catch(e){
            PL$14.reject(e);
          };
        };
      };
      var PL$17/*catch rejected*/ = function(e){
        PL$14.reject(e);
      };
      var PL$18/*map*/;
      PL$16/*promiseland exception catcher*/(function(){
      
        ;
        PL$18/*map*/ = new PL$19/*promiseland*/["Map"]();
        PL$14.resolve({
          "save": (function(PL$13/*par*/){
          var PL$20 = new __Promise();
          var PL$22/*promiseland exception catcher*/ = function(code){
            return function(res){
              try{ code(res); }catch(e){
                PL$20.reject(e);
              };
            };
          };
          var PL$23/*catch rejected*/ = function(e){
            PL$20.reject(e);
          };
          var PL$24/*i*/;
          var PL$25/*o*/;
          PL$22/*promiseland exception catcher*/(function(){
          
            ;
            PL$24/*i*/ = 0;
            PL$25/*o*/ = {
              
            };
            for(PL$24/*i*/ = 0;(PL$24/*i*/ < PL$13/*par*/["propertiesAr"]["length"]);++PL$24/*i*/){{
              if((PL$13/*par*/["propertiesAr"][PL$24/*i*/]["name"] == "id")){
                continue;;
              };
              ;
              PL$25/*o*/[PL$13/*par*/["propertiesAr"][PL$24/*i*/]["name"]] = PL$13/*par*/["propertiesAr"][PL$24/*i*/]["value"];}};
            ;
            PL$18/*map*/["set"](PL$13/*par*/["properties"]["id"]["value"], PL$25/*o*/);
            PL$20.resolve(); return;
          })();return PL$20;
          }),
          "load": (function(PL$13/*par*/){
          var PL$26 = new __Promise();
          var PL$28/*promiseland exception catcher*/ = function(code){
            return function(res){
              try{ code(res); }catch(e){
                PL$26.reject(e);
              };
            };
          };
          var PL$29/*catch rejected*/ = function(e){
            PL$26.reject(e);
          };
          PL$28/*promiseland exception catcher*/(function(){
          
            ;
            PL$26.resolve(PL$18/*map*/["get"](PL$13/*par*/["properties"]["id"]["value"])); return;
            PL$26.resolve(); return;
          })();return PL$26;
          }),
          "delete": (function(PL$13/*par*/){
          var PL$30 = new __Promise();
          var PL$32/*promiseland exception catcher*/ = function(code){
            return function(res){
              try{ code(res); }catch(e){
                PL$30.reject(e);
              };
            };
          };
          var PL$33/*catch rejected*/ = function(e){
            PL$30.reject(e);
          };
          PL$32/*promiseland exception catcher*/(function(){
          
            ;
            PL$30.resolve(PL$18/*map*/["delete"](PL$13/*par*/["properties"]["id"]["value"])); return;
            PL$30.resolve(); return;
          })();return PL$30;
          })
        }); return;
        PL$14.resolve(); return;
      })();return PL$14;
      })
    }, [], PL$12/*inherited*/);
    return res; })();PL$34/*SaveHandler*/;
    PL$19/*promiseland*/["classSystem"]["setSaveHandler"](new PL$34/*SaveHandler*/());
    classSystem._resolveProvisional(PL$3/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"x","type":classSystem.getBuiltinType("var")},{"name":"y","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "track": true, "hashStr": "eae93c49cf65b200dc7532ca35899b2d", "name": "C1", "savable": true}, {"x": 1, "y": 2}));PL$4/*C1*/;
    /*temptracked promise*/(function(vAr){
    var r = vAr[0].thenReuse(vAr[1], PL$10/*try catch*/(function(PL$36){/*temp tracked assign*/(function(vAr){
      if (_TPL$35/*a*/){ _TPL$35/*a*/(); };
      if(vAr){
        var v = vAr[0];
        PL$35/*a*/ = v;
        _TPL$35/*a*/ = vAr[1];
        return v;
      }else{
        PL$35/*a*/ = undefined; 
        _TPL$35/*a*/ = undefined;
        return;
      };
    })(PL$36)/*end temp assign*/;
    PL$35/*a*/[9] = 4;
    PL$35/*a*/[7]();
    /*temptracked promise*/(function(vAr){
    var r = vAr[0].thenReuse(vAr[1], PL$10/*try catch*/(function(PL$37){/*temp tracked assign*/(function(vAr){
      if (_TPL$35/*a*/){ _TPL$35/*a*/(); };
      if(vAr){
        var v = vAr[0];
        PL$35/*a*/ = v;
        _TPL$35/*a*/ = vAr[1];
        return v;
      }else{
        PL$35/*a*/ = undefined; 
        _TPL$35/*a*/ = undefined;
        return;
      };
    })(PL$37)/*end temp assign*/;
    /*temptracked promise*/(function(vAr){
    var r = vAr[0].thenReuse(vAr[1], PL$10/*try catch*/(function(PL$38){/*temp tracked assign*/(function(vAr){
      if (_TPL$35/*a*/){ _TPL$35/*a*/(); };
      if(vAr){
        var v = vAr[0];
        PL$35/*a*/ = v;
        _TPL$35/*a*/ = vAr[1];
        return v;
      }else{
        PL$35/*a*/ = undefined; 
        _TPL$35/*a*/ = undefined;
        return;
      };
    })(PL$38)/*end temp assign*/;
    PL$39/*console*/["log"](PL$35/*a*/[9]);
    PL$8.resolve();}), PL$11);
  return r;
  })(new PL$5/*C1-constructor*/("x"));/*temptracked promise end*/
  ;}), PL$11);
  return r;
  })(new PL$5/*C1-constructor*/("y"));/*temptracked promise end*/
  ;}), PL$11);
  return r;
  })(new PL$5/*C1-constructor*/("x"));/*temptracked promise end*/
  ;})();
  PL$9.then(PL$6/*promiseland exception catcher*/(function(PL$40/*e*/){
    PL$39/*console*/["log"]("err:");
    PL$39/*console*/["log"](PL$40/*e*/);
    PL$8.resolve();;}));
  PL$8.then(PL$6/*promiseland exception catcher*/(function(){;
  PL$1.resolve(); return;}), PL$7/*catch rejected*/)
})();return PL$1;
})();
;;
return PL$1});
})();