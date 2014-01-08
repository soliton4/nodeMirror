// promiseLand
//
// Copyright Matthias Behrens 2013
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
    
    var Promise = function(){
      var self = this;
      this.promise = {
        then: function(s, r){
          self.then(s, r);
        }
      };
    };
    var _Promise = {
      then: function(sFun, rFun){
        var thenAr = [];
        var rejectAr = [];
        
        this.thenAr = thenAr;
        this.rejectAr = rejectAr;
        
        var thenFun = function(sFun, rFun){
          if (sFun){
            thenAr.push(sFun);
          };
          if (rFun){
            rejectAr.push(rFun);
          };
        };
        this.then = thenFun;
        thenFun(sFun, rFun);
      },
      resolve: function(value){
        this.then = function(fun){
          if (fun){
            fun(value);
          };
        };
        this.resolve = function(){
          throw {
            msg: "double resolve"
          };
        };
        this.reject = function(){
          throw {
            msg: "double reject"
          };
        };
        if (this.thenAr){
          var i = 0;
          var l = this.thenAr.length;
          for (i; i < l; ++i){
            try{
              this.thenAr[i](value);
            }catch(e){
            };
          };
          delete this.thenAr;
          delete this.rejectAr;
        };
      },
      reject: function(value){
        this.then = function(fun1, fun){
          if (fun){
            fun(value);
          };
        };
        this.resolve = function(){
          throw {
            msg: "double resolve"
          };
        };
        this.reject = function(){
          throw {
            msg: "double reject"
          };
        };
        if (this.rejectAr){
          var i = 0;
          var l = this.rejectAr.length;
          for (i; i < l; ++i){
            try{
              this.rejectAr[i](value);
            }catch(e){
            };
          };
          delete this.thenAr;
          delete this.rejectAr;
        };
      }
    };
    Promise.prototype = _Promise;
    
    
    /*var MakePromise = function(){};
    MakePromise.prototype = new Promise();
    MakePromise.prototype.constructor = MakePromise;
    MakePromise.prototype.resolve = function(value){
        var thenAr = [];
        var rejectAr = [];
        var thenFun = function(sFun, rFun){
          if (sFun){
            thenAr.push(sFun);
          };
          if (rFun){
            rejectAr.push(rFun);
          };
        };
        this.then = thenFun;
        thenFun(sFun, rFun);
      }
    */
    
    var _parser;
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
          _parser = parser;
          p.resolve(parser);
        });
        return _parserPs;
      }
    };
    
    return promiseLand;
    
  });
})();
