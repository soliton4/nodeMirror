define([
  "dojo/_base/declare"
  , "dijit/Tree"
  , "client/tree/Model"
  , "client/globals"
  , "dijit/layout/BorderContainer"
], function(
  declare
  , Tree
  , Model
  , globals
  , BorderContainer
){
  return declare([
    BorderContainer
  ], {
    title: "Files"
    
    , gutters: false
    
    , constructor: function(){
      //this.model = new Model();
	}
    
    , buildRendering: function(){
      this.inherited(arguments);
      this._createTree();
    }
    
    , _createTree: function(){
      this.tree = new Tree({
        onClick: function(item, node, evt){
          globals.openItem(item);
        }
      , model: new Model()
      , region: "center"
      });
      this.addChild(this.tree);
    }
    
    , refresh: function(){
      if (this.tree){
        this.tree.destroy();
      };
      this._createTree();
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      setTimeout(function(){
        globals.openItem({
          id: ""
          , name: "/"
        });
      }, 0);
    }
    
  });
});
