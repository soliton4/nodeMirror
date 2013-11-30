define([
  "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "dijit/MenuBar"
  , "dijit/MenuItem"
  , "dojo/_base/lang"
], function(
  declare
  , BorderContainer
  , MenuBar
  , MenuItem
  , lang
){
  return declare([
    BorderContainer
  ], {
    title: "Debugger"
    
    , gutters: false
    
    , constructor: function(options){
      var title = "";
      if (options.type == "js"){
        title += "JavaScript";
      };
      title += " - ";
      title += "port: " + options.port;
      this.title = title;
	}
    
    , buildRendering: function(){
      this.inherited(arguments);
      
      this.menu = this.ownObj(new MenuBar({
        region: "top"
      }));
      this.addChild(this.menu);
      
      this.openBtn = this.ownObj(new MenuItem({
        label: "open"
        , onClick: lang.hitch(this, "open")
      }));
      this.menu.addChild(this.openBtn);
      
    }
    
    , open: function(){}
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
    }
    
  });
});
