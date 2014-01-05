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
        if (!this["promiseLand"]){
          this["promiseLand"] = {};
        };
        this["promiseLand"]["parser"] = callback.apply(callback, arguments);
      });
    };
    //this.promiseLand = mod();
  };
  
  define(["promiseLand"], function(promiseLand){
    
    var unknownType = function(entry){
      throw {
        msg: "unknown type - " + entry.type
      };
    };
    
    var parseProgram = function(entry){
      
    };
    
    var parser = {
      parseStr: function(promiseLandCodeStr){
        var parsedAr = promiseLand._parser.parse(promiseLandCodeStr);
        
        var i = 0;
        var l = parsedAr.length;
        var resStr = "";
        for (i; i < l; ++i){
          if (parsedAr[i].type == "Program"){
            resStr += parseProgram(parsedAr[i]);
          }else{
            unknownType(parsedAr[i]);
          };
        };
      }
    };
    
    return parser;
    
  });
})();


