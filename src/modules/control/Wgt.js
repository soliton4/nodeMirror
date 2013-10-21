define([
  "dojo/_base/declare"
  , "dijit/Tree"
  , "main/moduleLoader!client"
  , "dojo/_base/array"
  , "dijit/layout/ContentPane"
  , "dijit/form/Button"
], function(
  declare
  , Tree
  , moduleLoader
  , array
  , ContentPane
  , Button
){
  return declare([
    ContentPane
  ], {
    title: "Ctrl."
    
    , constructor: function(){
      var self = this;
	}
    
    , buildRendering: function(){
      this.inherited(arguments);
      var self = this;
      this.restartBtn = new Button({
        label: "restart Server"
        , onClick: function(){
          self.module.restartServer();
        }
      });
      this.restartBtn.placeAt(this.domNode);
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      var self = this;
      this.inherited(arguments);
    }
    
  });
});
