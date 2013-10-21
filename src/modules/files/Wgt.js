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
    
  });
});
