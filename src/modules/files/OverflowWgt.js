define([
  "dojo/_base/declare"
  , "dijit/_WidgetBase"
  , "dojo/_base/lang"
  , "dojo/on"
  , "dojo/dom-geometry"
  , "dojo/dom-style"
  , "dojo/dom-class"
  , "dojo/dom-construct"
  , "sol/scroll"
], function(
  declare
  , _WidgetBase
  , lang
  , on
  , domGeo
  , domStyle
  , domClass
  , domConstruct
  , scroll
){
  
  return declare([
    _WidgetBase
  ], {
    
    constructor: function(){
	}
    , "class": "treeOverFlowWidget"
    , region: "left"
    
    , _setHoverNodeAttr: function(hoverNode){
      this._set("hoverNode", hoverNode);
      if (hoverNode){
        this._copy();
        this.update();
      }else{
        domClass.remove(this.domNode, "hoverVisible");
      };
    }
    
    , _copy: function(){
      if (this.copyNode){
        domConstruct.destroy(this.copyNode);
      };
      this.copyNode = lang.clone(this.hoverNode.rowNode);
      domStyle.set(this.copyNode, {
        position: "absolute"
      });
      domConstruct.place(this.copyNode, this.domNode);
    }
    
    , update: function(){
      if (this.hoverNode){
        var addition = 10;
        //var labelBox = domGeo.getMarginBox(this.hoverNode.labelNode);
        var labelPos = domGeo.position(this.hoverNode.labelNode, true);
        var scrollBarPresent = this.treeWgt.domNode.scrollHeight > this.treeWgt.domNode.clientHeight;
        var limit = this.treePos.x + this.treePos.w;
        if (scrollBarPresent){
          limit -= scroll.dimensions().w;
        };
        if (labelPos.x + labelPos.w + addition > limit){
          var rowPos = domGeo.position(this.hoverNode.rowNode, true);
          if (rowPos.x + rowPos.w < labelPos.x + labelPos.w + addition){
            rowPos.w = labelPos.x + labelPos.w + addition - rowPos.x;
          };
          var thisLeft = limit;
          domGeo.setMarginBox(this.domNode, {
            h: rowPos.h
            , l: thisLeft
            , t: rowPos.y
            , w: labelPos.x + labelPos.w - thisLeft + addition
          });
          domGeo.setMarginBox(this.copyNode, {
            t: 0
            , l: rowPos.x - thisLeft
            , h: rowPos.h
            , w: rowPos.w
          });
          domClass.add(this.domNode, "hoverVisible");
          
        }else{
          domClass.remove(this.domNode, "hoverVisible");
          
        };
      };
    }
    , updateSize: function(){
      //this.treeBox = domGeo.getMarginBox(this.treeWgt.domNode);
      this.treePos = domGeo.position(this.treeWgt.domNode, true);
      this.update();
    }
    
    , buildRendering: function(){
      this.inherited(arguments);
      domStyle.set(this.domNode, {
        opacity: 0.9
      });
      this.updateSize();
    }
    
    
  });
});
