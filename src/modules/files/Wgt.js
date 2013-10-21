define([
  "dojo/_base/declare"
  , "dijit/Tree"
  , "client/tree/Model"
  , "client/globals"
], function(
  declare
  , Tree
  , Model
  , globals
){
  return declare([
    Tree
  ], {
    title: "Files"
    
    , constructor: function(){
      this.model = new Model();
	}
    
    , onClick: function(item, node, evt){
      globals.openItem(item);
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      return;
      setTimeout(function(){
        globals.openItem({
          id: ""
          , name: "/"
        });
      }, 0);
    }
    
  });
});
