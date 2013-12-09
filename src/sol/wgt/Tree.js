define([
  "dojo/_base/declare"
  , "dijit/Tree"
  , "dojo/_base/lang"
  , "dojo/on"
  , "dojo/dom-geometry"
  , "dojo/dom-style"
  , "dojo/dom-class"
  , "dojo/dom-construct"
  , "./tree/OverflowWgt"
  , "dojo/_base/fx"
], function(
  declare
  , Tree
  , lang
  , on
  , domGeo
  , domStyle
  , domClass
  , domConstruct
  , OverflowWgt
  , fx
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
      var expandoBox = domGeo.getMarginBox(this.expandoNode);
      domStyle.set(self.backgroundNode, {
        zIndex: 2000 - (self.indent * 2)
        , height: self._rowBox().h + "px"
        , left: expandoBox.l + expandoBox.w
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
      var rowBox = domGeo.getMarginBox(this.rowNode);
      if (rowBox.h && rowBox.w){
        this._rowBoxJsn = rowBox;
      };
      return rowBox;
    }
    
    , getIndentAddition: function(){
      return this.indent * this._rowBox().h;
    }
    
    , scrollToTop: function(){
      var box = domGeo.getMarginBox(this.domNode);
      this.tree.scrollTo(box.t - this.getIndentAddition());
    }
    
    , expand: function(){
      var res = this.inherited(arguments);
      var self = this;
      var checkFun = function(){
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
      };
      this._onScroll = on(this.tree.domNode, "scroll", checkFun);
      this.tree._lastExpand = this;
      res.then(function(){
        checkFun();
        if (self.tree._lastExpand === self){
          var box1 = domGeo.getMarginBox(self.domNode);
          if (box1.t + box1.h > self.tree.domNode.scrollTop + self.tree.domNode.clientHeight){
            var indent = self.getIndentAddition();
            if (indent + box1.h > self.tree.domNode.clientHeight){
              self.scrollToTop();
            }else{
              self.tree.scrollTo(box1.t + box1.h - self.tree.domNode.clientHeight);
            };
          };
        };
      });
      return res;
    }
    , collapse: function(){
      var res = this.inherited(arguments);
      if (this._floatStyleAdded){
        var self = this;
        self.scrollToTop();
        /*res.then(function(){
          self.scrollToTop();
        });*/
      };
      this._removeFloat();
      return res;
    }
  });
  
  
  
  return declare([
    Tree
  ], {
    
    addHoverNode: function(parHoverNode){
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
    
    , scrollTo: function(parScrollTop){
      var self = this;
      if (this._scrollAnimation){
        this._scrollAnimation.stop();
      };
      this._scrollAnimation = new fx.Animation({
        curve: [this.domNode.scrollTop, parScrollTop]
        , onAnimate: function(value){
          self.domNode.scrollTop = value;
        }
      });
      this._scrollAnimation.play();
    }
    
    , _onClick: function(/*TreeNode*/ nodeWidget, /*Event*/ e){
      if (e.target && domClass.contains(e.target, "treeOpenMore")){
        nodeWidget.scrollToTop();
        e.stopPropagation();
        e.preventDefault();
        return;
      };
      this.inherited(arguments);
    }
    
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
      
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
    
    , destroy: function(){
      if (this._scrollAnimation){
        this._scrollAnimation.stop();
      };
      this.inherited(arguments);
    }
    
  });
});
