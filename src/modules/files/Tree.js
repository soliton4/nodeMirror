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
  , "dojo/dom-construct"
  , "./OverflowWgt"
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
  , domConstruct
  , OverflowWgt
){
  
  
  var TreeNode = declare([Tree._TreeNode], {
    buildRendering: function(){
      this.inherited(arguments);
      this.backgroundNode = domConstruct.create("div", {
        "class": "backgroundNode"
      });
      domConstruct.place(this.backgroundNode, this.domNode);
      
      this.moreNode = domConstruct.create("div", {
        "class": "treeOpenMore moreNode"
      });
      domConstruct.place(this.moreNode, this.rowNode);
      
      this.moreInner = domConstruct.create("span", {
        "class": "treeOpenMore moreNodeInner"
        , innerHTML: "..."
      });
      domConstruct.place(this.moreInner, this.moreNode);
      this.watch("hovering", lang.hitch(this, "_hoverChange"));
    }
    
    , _hoverChange: function(hovering, oldValue, newValue){
      if (newValue){
        if (domClass.contains(this.rowNode, "dijitTreeRowHover")){
          this.tree.addHoverNode(this);
        };
      }else{
        this.tree.removeHoverNode(this);
      };
    }
    
    , _addFloatStyle: function(){
      if (this._floatStyleAdded){
        return;
      };
      this._floatStyleAdded = true;
      var self = this;
      domClass.add(this.rowNode, "rowNodeIsFloating");
      domClass.add(this.backgroundNode, "rowNodeIsFloating");
      domStyle.set(self.domNode, {
        paddingTop: self._rowBox().h + "px"
      });
      domStyle.set(self.rowNode, {
        zIndex: 2000 - (self.indent * 2) + 1
      });
      domStyle.set(self.backgroundNode, {
        zIndex: 2000 - (self.indent * 2)
        , height: self._rowBox().h + "px"
      });
    }
    , _removeFloatStyle: function(){
      if (!this._floatStyleAdded){
        return;
      };
      this._floatStyleAdded = false;
      domClass.remove(this.rowNode, "rowNodeIsFloating");
      domClass.remove(this.backgroundNode, "rowNodeIsFloating");
      domStyle.set(this.domNode, {
        paddingTop: ""
      });
    }
    , _removeFloat: function(){
      if (this._onScroll){
        this._onScroll.remove();
        delete this._onScroll;
      };
      this._removeFloatStyle();
    }
    
    , destroy: function(){
      this._removeFloat();
      this.inherited(arguments);
    }
    
    , _rowBox: function(){
      if (this._rowBoxJsn){
        return this._rowBoxJsn;
      };
      this._rowBoxJsn = domGeo.getMarginBox(this.rowNode);
      return this._rowBoxJsn;
    }
    
    , getIndentAddition: function(){
      return this.indent * this._rowBox().h;
    }
    
    , expand: function(){
      this.inherited(arguments);
      var self = this;
      this._onScroll = on(this.tree.domNode, "scroll", function(){
        if (!self.isExpandable){
          self._removeFloat();
          return;
        };
        var box1 = domGeo.getMarginBox(self.domNode);
        if (
          box1.t < self.tree.domNode.scrollTop + self.getIndentAddition()
          && box1.t + box1.h > self.tree.domNode.scrollTop + self.getIndentAddition()
        ){
          var top = (self.tree.domNode.scrollTop + self.getIndentAddition());
          if (top + self._rowBox().h > box1.t + box1.h){
            top = box1.t + box1.h - self._rowBox().h;
          };
          self._addFloatStyle();
          domStyle.set(self.rowNode, {
            top: top + "px"
          });
          domStyle.set(self.backgroundNode, {
            top: top + "px"
          });
        }else{
          self._removeFloatStyle();
        };
      });
    }
    , collapse: function(){
      this.inherited(arguments);
      this._removeFloat();
    }
  });
  
  
  
  return declare([
    Tree
  ], {
    
    constructor: function(){
      this.model = new Model();
	}
    , region: "center"
    
    , addHoverNode: function(parHoverNode){
      if (this._hoverNode === parHoverNode){
        return;
      };
      this._hoverNode = parHoverNode;
      this.overflowWgt.set("hoverNode", parHoverNode);
    }
    , removeHoverNode: function(parHoverNode){
      if (this._hoverNode === parHoverNode){
        delete this._hoverNode;
        this.overflowWgt.set("hoverNode", undefined);
      };
    }
    
    , _onClick: function(/*TreeNode*/ nodeWidget, /*Event*/ e){
      if (e.target && domClass.contains(e.target, "treeOpenMore")){
        var box = domGeo.getMarginBox(nodeWidget.domNode);
        nodeWidget.tree.domNode.scrollTop = box.t - nodeWidget.getIndentAddition();
        e.stopPropagation();
        e.preventDefault();
        return;
      };
      this.inherited(arguments);
    }
    
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
      //this._createTree();
      this.overflowWgt = new OverflowWgt({
        treeWgt: this
      });
      this.own(this.overflowWgt);
      this.overflowWgt.placeAt(document.body);
      this._onScroll = on(this.domNode, "scroll", function(){
        self.overflowWgt.update();
      });
      this.own(this._onScroll);
    }
    
    , onClick: function(item, node, evt){
      globals.openItem(item);
    }
    
    , resize: function(){
      this.inherited(arguments);
      this.overflowWgt.updateSize();
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
