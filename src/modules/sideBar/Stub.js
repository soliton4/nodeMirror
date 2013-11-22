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
  , "dijit/_WidgetBase"
  , "dijit/form/Button"
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
  , _WidgetBase
  , Button
  , topic
){
  
  
  return declare([_WidgetBase], {
    "class": "mainWidget sideBarStub"
    , "region": "left"
    
    , splitter: false
    
    //, keepBuildRendering: true
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      var self = this;
      self.showing = true;
      this.openBtn = this.ownObj(new Button({
        label: "<"
        , "class": "openBtn"
        , onClick: function(){
          if (self.showing){
            self.sideBarWgt.hide();
            this.set("label", ">");
          }else{
            self.sideBarWgt.unhide();
            this.set("label", "<");
          };
          self.showing = !self.showing;
          topic.publish("client/mainBc/resize");
        }
      }));
      this.openBtn.placeAt(this.domNode);
      
      return ret;
    }
    
  });
});


