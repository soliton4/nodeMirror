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
  , "dojo/topic"
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
  , topic
){
  
  
  return declare([TabContainer], {
    "class": "mainWidget contentTabs"
    , "region": "center"
    
    //, keepBuildRendering: true
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      var self = this;
      
      topic.subscribe("client/tabs/position", function(position){
        
        //self.set("tabPosition", position);
      });
      
      return ret;
    }
    
  });
});
