// promiseLand
//
// Copyright Matthias Behrens 2014
//
//
// promiseLand is a very promising Language
//
//
// licence lgpl


(function(){
  var defineFun;
  var requireFun;

  if (typeof exports == "object" && typeof module == "object"){ // CommonJS
    console.log("commonjs x");
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
        return par2.apply(null, args);
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
        var originalPromiseLand = this["promiseland"];
        this["promiseland"] = callback.apply(callback, arguments);
        if (originalPromiseLand){
          for (var i in originalPromiseLand){
            if (this["promiseland"][i] === undefined){
              this["promiseland"][i] = originalPromiseLand[i];
            };
          };
        };
      });
    };

  };

  defineFun([
    "./modules/createClass", 
    "./modules/Promise",
    "./modules/Chainable",
    "./modules/Tracker",
    "./modules/moduleSystem",
    "./modules/classSystem",
    "./modules/frames",
    "./modules/ParserClass",
    "./modules/errorMsg"
  ], function(createClassModule, PromiseModule, ChainableModule, TrackerModule, moduleSystemModule, classSystemModule, framesModule, ParserClassModule, errorMsgModule){

    var require = requireFun;


    // extra modules

    var createClass;

    var Promise;

    var Chainable;

    var Tracker;


    // config

    var setable = {
      profile: true
    };

    var config = {

    };
    
    
    // eval
    // this is here because its pure javascript
    
    var specialEval = function(jsStr, __parObj){
      if (!__parObj){
        return eval(jsStr);
      };
      
      var s = "";
      var n;
      for (n in __parObj){
        s += "var " + n + " = __parObj." + n + ";";
      };
      
      //s = "(function(){" + s;
      s += jsStr;
      //s += "})();";
      
      return eval(s);
    };


    // module object

    var promiseland = {
      Promise: Promise, // stub

      createClass: function(par, parExtends, inheritedObject){
        return createClass(par, parExtends, inheritedObject);
      },

      set: function(parWhat, parValue){
        if (!setable[parWhat]){
          return;
        };
        config[parWhat] = parValue;
        if (parWhat == "profile"){
          this.addLocalFrameName(parValue);
        };
      },
      
      javascriptEval: specialEval,

      // stub
      // will be overridden by moduleSystem.pland
      _getModule: function(parHashStr){
        return; 
      }

      // stub
      // will be overridden by moduleSystem.pland
      , _hasModule: function(parHashStr){
        return false;
      }

      // stub
      // will be overridden by moduleSystem.pland
      , isPromiseLandPromisingModule: function(parM){
        return false;
      }
      
      // for frameworks
      // enables the server to deliver promiseland directly from the node_modules directory
      , getPromiselandPathName: function(){
        return __dirname;
      }

    };


    // for promiseland internal modules to share objects
    var internals = {
      config: config,
      getModule: function(parModule){
        return parModule(promiseland, internals);
      }
    };
    
    internals.errorMsg = internals.getModule(errorMsgModule);
    
    var errorMsg = internals.errorMsg;

    // initialize addtional modules

    if (createClassModule){
      createClass = createClassModule(promiseland, internals);
      
    };

    if (PromiseModule){
      Promise = PromiseModule(promiseland, internals);
      internals.moduleSystemPs = new Promise();
      internals.classSystemPs = new Promise();
      internals.TrackerPs = new Promise();
      internals.ChainablePs = new Promise();
      internals.framesPs = new Promise();
    };

    if (moduleSystemModule){
      moduleSystemModule(promiseland, internals);
    };

    if (classSystemModule){
      classSystemModule(promiseland, internals);
    };

    if (ChainableModule){
      Chainable = ChainableModule(promiseland, internals);
      internals.ChainablePs.resolve({
        Chainable: Chainable
      });
    };

    if (TrackerModule){
      Tracker = TrackerModule(promiseland, internals);
      internals.TrackerPs.resolve({
        Tracker: Tracker
      });
    };

    if (framesModule){
      framesModule(promiseland, internals);
    };
    
    if (ParserClassModule){
      ParserClassModule(promiseland, internals);
    }


    return promiseland;

  });
})();
