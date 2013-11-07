define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/config"
  , "main/connection"
  , "main/nodeControl"

], function(
  declare
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , config
  , connection
  , nodeControl
){
  
  var Control = declare([], {
    //, keepBuildRendering: true
    //remoteFunctions: { restartServer: true }
    
    constructor: function(){
      var self = this;
    }
    
    , provideSideBarWidgetPs: function(){
      var def = new Deferred();
      var self = this;
      config.get("control").then(function(control){
        if (control === false){
          def.reject();
          return;
        };
        if (self.wgt){
          def.resolve(self.wgt);
        }else{
          require(["main/clientOnly!modules/control/Wgt"], function(Wgt){
            self.wgt = new Wgt({
              module: self
            });
            def.resolve(self.wgt);
          });
        };
      });
      return def;
    }
    
    , restartServer: function(){
      nodeControl.restartDef();
    }
    
  });
  
  return Control;
  
});


