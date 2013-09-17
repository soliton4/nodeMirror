define([
  "dojo/node!npm"
  , "dojo/_base/declare"
  , "dojo/deferred"
  , "dojo/_base/lang"
], function(
  npm
  , declare
  , deferred
  , lang
){
  
  var npmPs = new Deferred();
  npm.load(function(err){
    if (err){
      console.log(err);
      npmPs.reject(err);
      return;
    };
    npmPs.resolve(npm);
  });
  
  var Installer = declare([], {
    constructor: function(parModuleName){
      this.moduleName = parModuleName;
      this.installDef = new Deferred();
      this.errorDef = new Deferred();
    }
    
    , install: function(){
      this.installDef.resolve();
      delete this.installDef;
      npm.commands.install([this.moduleName], lang.hitch(this, function(err, data){
        if (err){
          this.errorDef.resolve();
        }else{
          this.errorDef.reject();
        };
        
      }));
    }
    , on: function(parWhat, parFun){
      if (parWhat == "installing"){
        this.installDef.then(parFun);
      };
      if (parWhat == "installing"){
        this.installDef.then(parFun);
      };
    }
  });
  
  return {
    
  };
  
});
npm.load(myConfigObject, function (er) {
  if (er) return handlError(er)
  npm.commands.install(["some", "args"], function (er, data) {
    if (er) return commandFailed(er)
    // command succeeded, and data might have some info
  })
  npm.on("log", function (message) { .... })
})