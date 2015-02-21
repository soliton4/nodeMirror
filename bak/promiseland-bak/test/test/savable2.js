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
    if (promiseland._hasModule({ hashStr: "8a7d7ccb2eff83be2169fd09a5b023be" })){ return promiseland._getModule("8a7d7ccb2eff83be2169fd09a5b023be"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "8a7d7ccb2eff83be2169fd09a5b023be", "module": PL$1, promising: true });
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
var PL$8/*savable*/;
var PL$4/*C1*/;
var PL$10/*a*/;
var _TPL$10/*a*/;

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
  __requireFun("./savable").then(PL$6/*promiseland exception catcher*/(function(PL$9){PL$8/*savable*/ = PL$9;
  classSystem._resolveProvisional(PL$3/*type:C1*/, classSystem.createClass({className: "C1",members: [{"name":"a","type":classSystem.getBuiltinType("var")},{"name":"b","type":classSystem.getBuiltinType("var")}], "extends": [], "hasFreePart": true, "track": true, "hashStr": "8a7d7ccb2eff83be2169fd09a5b023be", "name": "C1", "savable": true}, {"a": 1, "b": 2}));PL$4/*C1*/;
  /*temptracked promise*/(function(vAr){
  var r = vAr[0].thenReuse(vAr[1], PL$6/*promiseland exception catcher*/(function(PL$11){/*temp tracked assign*/(function(vAr){
    if (_TPL$10/*a*/){ _TPL$10/*a*/(); };
    if(vAr){
      var v = vAr[0];
      PL$10/*a*/ = v;
      _TPL$10/*a*/ = vAr[1];
      return v;
    }else{
      PL$10/*a*/ = undefined; 
      _TPL$10/*a*/ = undefined;
      return;
    };
  })(PL$11)/*end temp assign*/;
  if((PL$10/*a*/[9] != 1)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  PL$10/*a*/[9] = 3;
  if((PL$10/*a*/[9] != 3)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  /*temptracked promise*/(function(vAr){
  var r = vAr[0].thenReuse(vAr[1], PL$6/*promiseland exception catcher*/(function(PL$12){/*temp tracked assign*/(function(vAr){
    if (_TPL$10/*a*/){ _TPL$10/*a*/(); };
    if(vAr){
      var v = vAr[0];
      PL$10/*a*/ = v;
      _TPL$10/*a*/ = vAr[1];
      return v;
    }else{
      PL$10/*a*/ = undefined; 
      _TPL$10/*a*/ = undefined;
      return;
    };
  })(PL$12)/*end temp assign*/;
  /*temptracked promise*/(function(vAr){
  var r = vAr[0].thenReuse(vAr[1], PL$6/*promiseland exception catcher*/(function(PL$13){/*temp tracked assign*/(function(vAr){
    if (_TPL$10/*a*/){ _TPL$10/*a*/(); };
    if(vAr){
      var v = vAr[0];
      PL$10/*a*/ = v;
      _TPL$10/*a*/ = vAr[1];
      return v;
    }else{
      PL$10/*a*/ = undefined; 
      _TPL$10/*a*/ = undefined;
      return;
    };
  })(PL$13)/*end temp assign*/;
  if((PL$10/*a*/[9] != 1)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  PL$10/*a*/[9] = 4;
  PL$10/*a*/[7]().then(PL$6/*promiseland exception catcher*/(function(PL$14){PL$14;
  /*temptracked promise*/(function(vAr){
  var r = vAr[0].thenReuse(vAr[1], PL$6/*promiseland exception catcher*/(function(PL$15){/*temp tracked assign*/(function(vAr){
    if (_TPL$10/*a*/){ _TPL$10/*a*/(); };
    if(vAr){
      var v = vAr[0];
      PL$10/*a*/ = v;
      _TPL$10/*a*/ = vAr[1];
      return v;
    }else{
      PL$10/*a*/ = undefined; 
      _TPL$10/*a*/ = undefined;
      return;
    };
  })(PL$15)/*end temp assign*/;
  /*temptracked promise*/(function(vAr){
  var r = vAr[0].thenReuse(vAr[1], PL$6/*promiseland exception catcher*/(function(PL$16){/*temp tracked assign*/(function(vAr){
    if (_TPL$10/*a*/){ _TPL$10/*a*/(); };
    if(vAr){
      var v = vAr[0];
      PL$10/*a*/ = v;
      _TPL$10/*a*/ = vAr[1];
      return v;
    }else{
      PL$10/*a*/ = undefined; 
      _TPL$10/*a*/ = undefined;
      return;
    };
  })(PL$16)/*end temp assign*/;
  if((PL$10/*a*/[9] != 4)){
    PL$1.resolve({
      "success": false
    }); return;
  };
  ;
  PL$1.resolve({
    "success": true
  }); return;
  PL$1.resolve(); return;}), PL$7/*catch rejected*/);
  return r;
  })(new PL$5/*C1-constructor*/("id1"));/*temptracked promise end*/
  ;}), PL$7/*catch rejected*/);
  return r;
  })(new PL$5/*C1-constructor*/("id2"));/*temptracked promise end*/
  ;}), PL$7/*catch rejected*/);
  ;}), PL$7/*catch rejected*/);
  return r;
  })(new PL$5/*C1-constructor*/("id1"));/*temptracked promise end*/
  ;}), PL$7/*catch rejected*/);
  return r;
  })(new PL$5/*C1-constructor*/("id2"));/*temptracked promise end*/
  ;}), PL$7/*catch rejected*/);
  return r;
  })(new PL$5/*C1-constructor*/("id1"));/*temptracked promise end*/
  ;}), PL$7/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();