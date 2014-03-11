// promiseLand
//
// Copyright Matthias Behrens 2014
//
//
// promiseLand is a very promising Language
//
//


(function(){
  var defineFun;
  var requireFun;
  
  if (typeof exports == "object" && typeof module == "object"){ // CommonJS
    console.log("commonjs");
    requireFun = function(modulesAr, callback){
      var i = 0;
      var l = modulesAr.length;
      var args = [];
      for (i; i < l; ++i){
        args.push(require(modulesAr[i]));
      };
      callback.apply(callback, args);
    };
    defineFun = function(requireAr, callback){
      requireFun(requireAr, function(){
        module.exports = callback.apply(callback, arguments);
      });
    };
    
  }else if (typeof define == "function" && define.amd){ // AMD
    console.log("amd");
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
        return par2.apply(args);
      });
    };
    requireFun = require;
    
  }else{ // Plain browser env
    console.log("plain browser mode");
    requireFun = function(modulesAr, callback){
      if (modulesAr && modulesAr.length){
        throw {
          msg: "no module loader available"
        };
      };
      callback.apply(callback, []);
    };
    defineFun = function(requireAr, callback){
      requireFun(requireAr, function(){
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
    
  };
  
  defineFun([], function(){
    
    var require = requireFun;
    
    var Promise;
    var Promise2 = function(){
      
      var thenAr = [];
      var elseAr = [];
      
      var thenFun = function(parThenFun, parElseFun){
        if (parThenFun){
          thenAr.push(parThenFun);
        };
        if (parElseFun){
          elseAr.push(parElseFun);
        };
        //return returnPromise;
      };
      
      this.resolve = function(value){
        thenFun = function(parThenFun){
          try{
            parThenFun(value);
          }catch(e){
            // maybe we are ignoring to much here, lets check later
          };
        };
        if (!thenAr) return;
        var i = 0;
        var l = thenAr.length;
        for (i; i < l; ++i){
          try{
            thenAr[i](value);
          }catch(e){
            // will those errors ocur? if so what do we do with them?
          }
        };
        thenAr = undefined; // why not delete?
        elseAr = undefined;
      };
      this.reject = function(value){
        thenFun = function(u, parElseFun){
          try{
            parElseFun(value);
          }catch(e){
            // maybe we are ignoring to much here, lets check later
          };
        };
        if (!elseAr) return;
        var i = 0;
        var l = elseAr.length;
        for (i; i < l; ++i){
          try{
            elseAr[i](value);
          }catch(e){
            // will those errors ocur? if so what do we do with them?
          }
        };
        thenAr = undefined; // why not delete?
        elseAr = undefined;
      };
      
      this.then = function(par1, par2){
        thenFun(par1, par2);
      };
      /*this.promise = {
        then: this.then
      };*/
      this.promise = this.then;
      /* so this should be possible
        var p = Promise();
        var ps = p.then;
        ps(thenfun...);
        //alternative:
        ps.then(thenfun...); // so the thenFun is a promise itself;
      */
      this.then.then = this.then;
    };
    
    
    
    
    
    
    Promise = Promise2;
    
    
    /*var functionPromise = function(promise){
      
      var f = function(thenFun, elseFun){
        promise.then(thenFun, elseFun);
      };
      f.then = promise.then;
      return f;
    };*/
    
    var _parserPs;
    
    var promiseLand = {
      Promise: Promise,
      
      _getParser: function(){
        if (_parserPs){
          return _parserPs;
        };
        var p = new Promise();
        _parserPs = p.promise;
        require(["./_parser"], function(parser){
          console.log("x1");
          p.resolve(parser);
        });
        return _parserPs;
      }
    };
    
    return promiseLand;
    
  });
})();
