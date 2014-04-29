define([], function(){
  
  return {
    "headStr": function(){
      return "(function(){\n  var defineFun;\n  var requireFun;\n  \n  if (typeof exports == \"object\" && typeof module == \"object\"){ // CommonJS\n    requireFun = function(modulesAr, callback){\n      var i = 0;\n      var l = modulesAr.length;\n      var args = [];\n      for (i; i < l; ++i){\n        args.push(require(modulesAr[i]));\n      };\n      callback.apply(callback, args);\n    };\n    defineFun = function(requireAr, callback){\n      requireFun(requireAr, function(){\n        module.exports = callback.apply(callback, arguments);\n      });\n    };\n    \n  }else if (typeof define == \"function\" && define.amd){ // AMD\n    var _define = define;\n    requireFun = require;\n    \n    defineFun = function(par1, par2){\n      if (par1 instanceof Array){\n        par1.unshift(\"require\");\n      }else{\n        par2 = par1;\n        par1 = [\"require\"];\n      };\n      _define(par1, function(){\n        requireFun = arguments[0];\n        var args = [];\n        for (var i = 1; i < arguments.length; ++i){\n          args.push(arguments[i]);\n        };\n        return par2.apply(par2, args);\n      });\n    };\n    requireFun = require;\n    \n  }else{ // Plain browser env\n    alert(\"not working out!\");\n    \n  };\n  \n  defineFun([], function(){\n";
    },
    "footStr": function(){
      return "\n  });\n})();";
    }
    , createModule: function(par){
      var code = this.headStr();
      if (!par["export"]){
        code += "return " + par.code;
      }else{
        code += par.code;
        code += ";\n";
        code += "return " + par["export"] + ";\n";
      };
      code += this.footStr();
      return code;
    }
  };
  
});