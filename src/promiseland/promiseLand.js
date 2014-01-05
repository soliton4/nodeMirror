// promiseLand
//
// Copyright Matthias Behrens 2013
//
//
// promiseLand is a very promising Language
//
//
(function(){
  var require = require;
  var define = define;
  if (typeof exports == "object" && typeof module == "object"){ // CommonJS
    var commonJsRequire = require;
    require = function(modulesAr, callback){
      var i = 0;
      var l = modulesAr.length;
      var args = [];
      for (i; i < l; ++i){
        args.push(commonJsRequire(modulesAr[i]));
      };
      callback.apply(callback, args);
    };
    define = function(requireAr, callback){
      require(requireAr, function(){
        module.exports = callback.apply(callback, arguments);
      });
    };
    //module.exports = mod();
  }else if (typeof define == "function" && define.amd){ // AMD
    //return define([], mod);
  }else{ // Plain browser env
    require = function(modulesAr, callback){
      if (modulesAr && modulesAr.length){
        throw {
          msg: "no module loader available"
        };
      };
      callback.apply(callback, []);
    };
    define = function(requireAr, callback){
      require(requireAr, function(){
        var originalPromiseLand = this["promiseLand"];
        this["promiseLand"] = callback.apply(callback, arguments);
        if (originalPromiseLand){
          for (var i in originalPromiseLand){
            if (this["promiseLand"][i] === undefined){
              this["promiseLand"][i] = originalPromiseLand[i];
            };
          };
        };
      });
    };
    //this.promiseLand = mod();
  };
  
  define([], function(){
    var promiseLand = {
      
    };
    
    return promiseLand;
    
  });
})();
