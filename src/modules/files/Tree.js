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
    
    constructor: function(){
      this.model = new Model();
	}
    , region: "center"
    
    , buildRendering: function(){
      this.inherited(arguments);
      //this._createTree();
    }
    
    , onClick: function(item, node, evt){
      globals.openItem(item);
    }
    
  });
});
