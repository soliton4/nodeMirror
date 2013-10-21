define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "dijit/form/Select"
  , "main/config"
  , "dijit/layout/TabContainer"
  , "dijit/layout/ContentPane"
  , "main/moduleLoader!client"
], function(
  declare
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , Select
  , config
  , TabContainer
  , ContentPane
  , moduleLoader
){
  
  
  return declare([TabContainer], {
    "class": "mainWidget sideBar"
    , "region": "left"
    
    , splitter: true
    , nested: true
    
    //, keepBuildRendering: true
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      var self = this;
      
      var modules = moduleLoader.getModules();
      array.forEach(modules, function(module){
        if (module.provideSideBarWidgetPs){
          module.provideSideBarWidgetPs().then(function(wgt){
            self.addChild(wgt);
          });
        };
      });
      
      
      return ret;
    }
    
  });
});
