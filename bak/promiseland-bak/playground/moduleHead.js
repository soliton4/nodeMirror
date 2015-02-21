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

if (promiseland._hasModule({ hashStr: "52cf958b3004012a011869e87d65d22c" })){ return promiseland._getModule("52cf958b3004012a011869e87d65d22c"); };
var PL$5/*RegExp*/;try{PL$5/*RegExp*/ = RegExp;}catch(e){};
var PL$1 = (function(){
"use strict";

  ;
  var PL$2/*stringEncodeStr*/ = (function(PL$3/*par*/){
  
    ;
    var PL$4/*s*/ = PL$3/*par*/["replace"](new PL$5/*RegExp*/("\\\\", "g"), "\\\\");
    ;
    PL$4/*s*/ = PL$4/*s*/["replace"](new PL$5/*RegExp*/("\\n", "g"), "\\n");
    PL$4/*s*/ = PL$4/*s*/["replace"](new PL$5/*RegExp*/("\\r", "g"), "\\r");
    PL$4/*s*/ = PL$4/*s*/["replace"](new PL$5/*RegExp*/("\\\"", "g"), "\\\"");
    PL$4/*s*/ = PL$4/*s*/["replace"](new PL$5/*RegExp*/("\\u2028", "g"), "\\u2028");
    PL$4/*s*/ = PL$4/*s*/["replace"](new PL$5/*RegExp*/("\\u2029", "g"), "\\u2029");
    return (("\"" + PL$4/*s*/) + "\"");
    ;});
  ;
  return {
    "stringEncodeStr": PL$2/*stringEncodeStr*/,
    "headStr": (function(PL$3/*par*/){
    var PL$10/*i*/;
    
      ;
      var PL$6/*resStr*/ = "(function(){\n  var defineFun;\n  var __requireFun;\n  \n  if (typeof exports == \"object\" && typeof module == \"object\"){ // CommonJS\n    __requireFun = function(modulesAr, callback){\n      var i = 0;\n      var l = modulesAr.length;\n      var args = [];\n      for (i; i < l; ++i){\n        args.push(require(modulesAr[i]));\n      };\n      callback.apply(callback, args);\n    };\n    defineFun = function(requireAr, callback){\n      __requireFun(requireAr, function(){\n        module.exports = callback.apply(callback, arguments);\n      });\n    };\n    \n  }else if (typeof define == \"function\" && define.amd){ // AMD\n    var _define = define;\n    __requireFun = require;\n    \n    defineFun = function(par1, par2){\n      if (par1 instanceof Array){\n        par1.unshift(\"require\");\n      }else{\n        par2 = par1;\n        par1 = [\"require\"];\n      };\n      _define(par1, function(){\n        __requireFun = arguments[0];\n        var args = [];\n        for (var i = 1; i < argsuments.length; ++i){\n          args.push(arguments[i]);\n        };\n        return par2.apply(par2, args);\n      });\n    };\n    __requireFun = require;\n    \n  }else{ // Plain browser env\n    alert(\"not working out!\");\n    \n  };\n  \n  defineFun([";
      ;
      var PL$7/*namePartStr*/ = "";
      ;
      var PL$8/*paramPartStr*/ = "";
      ;
      var PL$9/*cnt*/ = 0;
      ;
      if((PL$3/*par*/ && PL$3/*par*/["modules"])){
        for(PL$10/*i*/ in PL$3/*par*/["modules"]){
          if(PL$9/*cnt*/){
            PL$7/*namePartStr*/ += ", ";
            PL$8/*paramPartStr*/ += ", ";
          };
          ;
          PL$9/*cnt*/++;};
        ;
        PL$7/*namePartStr*/ += PL$2/*stringEncodeStr*/(PL$3/*par*/["modules"][PL$10/*i*/]);
        PL$8/*paramPartStr*/ += PL$10/*i*/;
      };
      ;
      var PL$11/*requireNameStr*/ = "require";
      ;
      if((PL$3/*par*/ && PL$3/*par*/["requireName"])){
        PL$11/*requireNameStr*/ = PL$3/*par*/["requireName"];
      };
      ;
      PL$6/*resStr*/ += PL$7/*namePartStr*/;
      PL$6/*resStr*/ += "], function(";
      PL$6/*resStr*/ += PL$8/*paramPartStr*/;
      PL$6/*resStr*/ += (("){ \n    var " + PL$11/*requireNameStr*/) + " = __requireFun;\n    __requireFun = undefined;\n");
      return PL$6/*resStr*/;
      ;}),
    "promiseLandDefinitionsStr": (function(){
    
      ;
      return "var __Promise = promiseland.Promise;\n  var __module = new __Promise();\n  var __requireFun = function(parModule){\n    var returnPromise = new __Promise();\n    try{__require([parModule], function(m){\n    if (promiseland.isPromiseLandModule(m)){\n      m.then(function(realm){returnPromise.resolve(realm);}, function(e){returnPromise.reject(e);});\n    }else{\n      returnPromise.resolve(m);\n    };\n    });\n    }catch(e){returnPromise.reject(e);};\n  return returnPromise.promise;};\n  \n  ";
      ;}),
    "footStr": (function(){
    
      ;
      return "return __module.promise.then;\n  });\n})();";
      ;})
  };
  ;})();
;return PL$1;
});
})();