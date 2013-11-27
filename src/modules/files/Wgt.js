define([
  "dojo/_base/declare"
  , "./Tree"
  , "client/globals"
  , "dijit/layout/BorderContainer"
], function(
  declare
  , Tree
  , globals
  , BorderContainer
){
  return declare([
    BorderContainer
  ], {
    title: "Files"
    
    , gutters: false
    
    , constructor: function(){
	}
    
    , buildRendering: function(){
      this.inherited(arguments);
      this._createTree();
    }
    
    , _createTree: function(){
      this.tree = new Tree({
        region: "center"
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
