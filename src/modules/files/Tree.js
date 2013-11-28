define([
  "dojo/_base/declare"
  , "dijit/Tree"
  , "./Model"
  , "client/globals"
  , "dojo/_base/lang"
  , "dojo/on"
  , "dojo/dom-geometry"
  , "dojo/dom-style"
  , "dojo/dom-class"
], function(
  declare
  , Tree
  , Model
  , globals
  , lang
  , on
  , domGeo
  , domStyle
  , domClass
){
  
  
  var TreeNode = declare([Tree._TreeNode], {
    expand: function(){
      this.inherited(arguments);
      var self = this;
      this._onScroll = on(this.tree.domNode, "scroll", function(){
        var box1 = domGeo.getMarginBox(self.domNode);
        var box2 = domGeo.getMarginBox(self.rowNode);
        if (box1.t < self.tree.domNode.scrollTop + (self.indent * box2.h) && box1.t + box1.h > self.tree.domNode.scrollTop + (self.indent * box2.h)){
          //var cs = domStyle.getComputedStyle(self.tree.domNode);
          //debugger;
          //domClass.add(self.rowNode, "dijitTabPaneWrapper");
          domStyle.set(self.rowNode, {
            position: "absolute"
            , top: (self.tree.domNode.scrollTop + (self.indent * box2.h)) + "px"
            , left: "0px"
            , right: "0px"
            , backgroundColor: "white"
          });
          domStyle.set(self.domNode, {
            paddingTop: box2.h + "px"
          });
        }else{
          //domClass.remove(self.rowNode, "dijitTabPaneWrapper");
          domStyle.set(self.rowNode, {
            position: "static"
            , backgroundColor: ""
          });
          domStyle.set(self.domNode, {
            paddingTop: ""
          });
        };
      });
    }
    , collapse: function(){
      this.inherited(arguments);
      this._onScroll.remove();
    }
  });
  
  
  
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
    
    , _createTreeNode: function(/*Object*/ args){
      // summary:
      //		creates a TreeNode
      // description:
      //		Developers can override this method to define their own TreeNode class;
      //		However it will probably be removed in a future release in favor of a way
      //		of just specifying a widget for the label, rather than one that contains
      //		the children too.
      return new TreeNode(args);
    }
    
  });
});
