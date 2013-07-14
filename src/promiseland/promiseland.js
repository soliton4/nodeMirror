// promiseLand
//
// Copyright Matthias Behrens 2013
//
//
// promiseLand makes a lot of Promises. I promise!
//
//

if (!promiseLand){
  if (!promiseLandConfig){
    promiseLandConfig = {};
  };
  
  // first where are we running?
  if (!(promiseLandConfig.host == "node" || promiseLandConfig.host == "browser")){
    // try auto detect
    if (typeof process == "object" && process.versions && process.versions.node && process.versions.v8){
      promiseLandConfig.host = "node";
    }else{
      promiseLandConfig.host = "browser";
    };
  };
  
  if (!promiseLandConfig.modules){
    promiseLandConfig.modules = {};
  };
  if (!promiseLandConfig.modules.parser){
    promiseLandConfig.modules.parser = "./modules/parser.js";
  };
  
  
  // the function that will be called by whatever loader is being used
  var defFun = function(parser){
    
    
    // basic Promise
    // after all its about Promises
    
    var Promise = function(){
      this._thenAr = [];
    };
    Promise.prototype = {
      
      then: function( parFun ){
        if (this._fulfilled){
          // caller must catch
          parFun(this._fulfillment);
          return;
        };
        this._thenAr.push(parFun);
      },
      
      // yes the fulfill function is part of the Promise class
      // in some implementations the promise class has been kept pure, meaning only the then function and the canel are present.
      // the philosophy of this programmer is that if the Promise class had no possibility to fulfill the promise, there would be a possibility to break the promise.
      // this however shall never happen. I promise!
      fulfill: function( parFulfillment ){
        if (this._fulfilled){
          throw promiseLand._errors.alreadyFulfilled;
        };
        this._fulfillment = parFulfillment;
        this._fulfilled = true;
        
        var i = 0;
        while (i < this._thenAr.length){
          try{
            this._thenAr[i](this._fulfillment);
          }catch(e){
            this._catcher(e);
          };
          ++i;
        };
        this._thenAr = []; // save memory ;)
      },
      
      isFulfilled: function(){
        if (this._fulfilled){
          return true;
        };
        return false;
      }
      
    };
    
    
    // PromiseLand Class
    var PromiseLand = function(parConfig){
      this.config = parConfig || {};
      
      if (this.config.require){
        this.require = this.config.require;
        if (this.config.amd){
          this.amd = true;
        };
      };
      if (!this.require){
        // try autodetect
        if (promiseLandConfig.host == "node" && require){
          this.require = require;
          this.node = true;
        };
      };
    };
    var _PromiseLand = {
      // the promise
      Promise: Promise
      
      , parser: parser
      
      , _ready: function(){
        if (this.isFulfilled()){
          return;
        };
        this.fulfill(this);
      }
      , _initErrors: function(){
        // some constants
        this._errors = {
          alreadyFulfilled: {
            msg: "promise was allready fulfilled"
          }
        };
        if (this.node){
          this.catcher = function(parError){
            if (parError && parError.msg){
              console.log(parError.msg);
            };
          };
        }else{
          this.catcher = function(){
          };
        };
      }
    };
    _PromiseLand.prototype = Promise;
  
    PromiseLand.prototype = _PromiseLand;
    
    // create one Singleton Instance
    promiseLand = new PromiseLand(promiseLandConfig);
    return promiseLand;
  };
  
  var useAmd;
  var useCommonJs;
  if (promiseLandConfig){
    
    if (promiseLandConfig.useAmd !== undefined){
      useAmd = promiseLandConfig.useAmd;
    };
    if (!useAmd){
      useCommonJs = promiseLandConfig.useCommonJs;
    };
  };
  if (!useAmd && !useCommonJs){
    if (useAmd === undefined){
      if (define){
        useAmd = true;
      };
    };
    if (!useAmd && useCommonJs === undefined){
      if (module && require){
        useCommonJs = true;
      };
    };
  };
  if (useAmd){
    define("promiseland", [promiseLandConfig.modules.parser], defFun);
  }else if (useCommonJs){
    var parser = require(promiseLandConfig.modules.parser);
    module.exports = defFun(parser);
  }else{
    defFun();
  };
};
