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
    if (promiseland._hasModule({ hashStr: "8c3436b597adf2719e0ecfedda477764" })){ return promiseland._getModule("8c3436b597adf2719e0ecfedda477764"); };
var PL$1 = new __Promise();
promiseland._registerModule({ hashStr: "8c3436b597adf2719e0ecfedda477764", "module": PL$1, promising: true });
var PL$2 = (function(){
"use strict";
var PL$3/*promiseland exception catcher*/ = function(code){
  return function(res){
    try{ code(res); }catch(e){
      PL$1.reject(e);
    };
  };
};
var PL$4/*catch rejected*/ = function(e){
  PL$1.reject(e);
};
var PL$5/*basics*/;
var PL$7/*errorFun*/;
var PL$8/*errorMsg*/;
var PL$9/*_stringEncodeStr*/;
var PL$10/*stringEncodeStr*/;
var PL$11/*loaderStr*/;
PL$3/*promiseland exception catcher*/(function(){

  ;
  __requireFun("./basics").then(PL$3/*promiseland exception catcher*/(function(PL$6){PL$5/*basics*/ = PL$6;
  PL$7/*errorFun*/ = PL$5/*basics*/["errorFun"];
  PL$8/*errorMsg*/ = PL$5/*basics*/["errorMsg"];
  PL$9/*_stringEncodeStr*/ = PL$5/*basics*/["_stringEncodeStr"];
  PL$10/*stringEncodeStr*/ = PL$5/*basics*/["stringEncodeStr"];
  PL$11/*loaderStr*/ = (function(PL$12/*par*/){
  
    ;
    var PL$13/*resStr*/ = "";
    ;
    var PL$14/*i*/;
    ;
    PL$13/*resStr*/ += "(function(){\n  var defineFun;\n  var requireFun;\n  \n  if (typeof exports == \"object\" && typeof module == \"object\"){ // CommonJS\n    requireFun = function(modulesAr, callback, errBack){\n      try{\n        var i = 0;\n        var l = modulesAr.length;\n        var args = [];\n        for (i; i < l; ++i){\n          args.push(require(modulesAr[i]));\n        };\n      }catch(e){\n        errBack(e);\n        return;\n      };\n      callback.apply(callback, args);\n    };\n    defineFun = function(requireAr, callback){\n      requireFun(requireAr, function(){\n        module.exports = callback.apply(callback, arguments);\n      });\n    };\n    \n  }else if (typeof define == \"function\" && define.amd){ // AMD\n    var _define = define;\n    requireFun = require;\n    \n    defineFun = function(par1, par2){\n      if (par1 instanceof Array){\n        par1.unshift(\"require\");\n      }else{\n        par2 = par1;\n        par1 = [\"require\"];\n      };\n      _define(par1, function(){\n        requireFun = arguments[0];\n        var args = [];\n        for (var i = 1; i < arguments.length; ++i){\n          args.push(arguments[i]);\n        };\n        return par2.apply(par2, args);\n      });\n    };\n    \n  }else{ // Plain browser env\n    alert(\"not working out!\");\n    \n  };\n  ";
    var PL$15/*modules*/ = [
      
    ];
    ;
    if(! PL$12/*par*/["promiseLandModule"]){
      PL$15/*modules*/["push"]({
        "varName": "promiseland",
        "moduleName": "promiseland"
      });
    };
    ;
    var PL$16/*extraModules*/ = PL$12/*par*/["extraModules"];
    ;
    if(PL$16/*extraModules*/){
      var PL$17/*extraModulesAr*/ = PL$16/*extraModules*/["getArray"]();
      ;
      for(PL$14/*i*/ = 0;(PL$14/*i*/ < PL$17/*extraModulesAr*/["length"]);++PL$14/*i*/){{
        PL$15/*modules*/["push"]({
          "varName": PL$12/*par*/["variableNames"]["get"](PL$17/*extraModulesAr*/[PL$14/*i*/]["key"]),
          "moduleName": PL$17/*extraModulesAr*/[PL$14/*i*/]["value"]
        });}};
      ;
    };
    ;
    PL$13/*resStr*/ += "defineFun([";
    for(PL$14/*i*/ = 0;(PL$14/*i*/ < PL$15/*modules*/["length"]);++PL$14/*i*/){{
      if(PL$14/*i*/){
        PL$13/*resStr*/ += ", ";
      };
      ;
      PL$13/*resStr*/ += PL$10/*stringEncodeStr*/(PL$15/*modules*/[PL$14/*i*/]["moduleName"]);}};
    ;
    PL$13/*resStr*/ += "], function(";
    for(PL$14/*i*/ = 0;(PL$14/*i*/ < PL$15/*modules*/["length"]);++PL$14/*i*/){{
      if(PL$14/*i*/){
        PL$13/*resStr*/ += ", ";
      };
      ;
      PL$13/*resStr*/ += PL$15/*modules*/[PL$14/*i*/]["varName"];}};
    ;
    PL$13/*resStr*/ += "){\n";
    if(PL$12/*par*/["promiseLandModule"]){
      PL$13/*resStr*/ += "var __execute = function(promiseland, extra){ __execute = undefined; var __require = requireFun;\n";
    }else{
    PL$13/*resStr*/ += "var __require = requireFun;\n";
    };
    ;
    PL$13/*resStr*/ += "\n";
    if((PL$12/*par*/["usePromise"] || PL$12/*par*/["useRequire"])){
      PL$13/*resStr*/ += "var __Promise = promiseland.Promise;\n";
      PL$13/*resStr*/ += "var Promise = promiseland.Promise;\n";
    };
    ;
    if(PL$12/*par*/["useClassSystem"]){
      PL$13/*resStr*/ += "var classSystem = promiseland.classSystem;\n";
    };
    ;
    if(PL$12/*par*/["useRequire"]){
      PL$13/*resStr*/ += "var __requireFun = function(parModule){\n      var returnPromise = new __Promise();\n      try{__require([parModule], function(m){\n        if (promiseland.isPromiseLandPromisingModule(m)){\n          m.then(function(realm){returnPromise.resolve(realm);}, function(e){returnPromise.reject(e);});\n        }else{\n          returnPromise.resolve(m);\n        };\n        }, function(err){ returnPromise.reject(err); });\n      }catch(e){ returnPromise.reject(e); };\n      return returnPromise.promise;};\n    ";
    };
    ;
    return PL$13/*resStr*/;
    ;});
  PL$1.resolve(PL$11/*loaderStr*/); return;
  PL$1.resolve(); return;}), PL$4/*catch rejected*/);
  ;
})();return PL$1;
})();
;;
return PL$1});
})();