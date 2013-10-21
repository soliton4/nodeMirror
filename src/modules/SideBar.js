define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/config"
], function(
  declare
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , config
){
  
  
  return declare([], {
    //, keepBuildRendering: true
    
    constructor: function(){
    }
    
    , provideMainWidgetPs: function(){
      var def = new Deferred();
      var self = this;
      if (self.wgt){
        def.resolve(self.wgt);
      }else{
        require(["main/clientOnly!modules/sideBar/Wgt"], function(Wgt){
          self.wgt = new Wgt({});
          def.resolve(self.wgt);
        });
      };
      return def;
    }
    
  });
});
