define([
  "dojo/_base/declare"
  , "term/Terminal"
  , "dijit/_WidgetBase"
  , "sol/wgt/mixin/resize"
  , "dojo/_base/array"
  , "sol/wgt/Try"
  , "sol/wgt/Text"
  , "sol/convenient/SceduleExec"
  , "dojo/_base/lang"
  , "dojo/dom-construct"
  , "dojo/dom-geometry"
], function(
  declare
  , Terminal
  , _WidgetBase
  , resizeMixin
  , array
  , Try
  , Text
  , SceduleExec
  , lang
  , domConstruct
  , domGeo
){
  
  
  return declare([_WidgetBase, resizeMixin], {
    buildRendering: function(){
      this.domNode = domConstruct.create("div", {
        "class": "mouseWidget"
      });
      this.inherited(arguments);
      
    }
    
    , _setWidthAttr: function(width){
      this._set("width", width);
      domGeo.setMarginBox(this.domNode, {w: width});
    }
    
    , _setHeightAttr: function(height){
      this._set("height", height);
      domGeo.setMarginBox(this.domNode, {h: height});
    }
    
    , _setPosAttr: function(pos){
      this._set("pos", pos);
      domGeo.setMarginBox(this.domNode, {
        l: pos.x * this.width + (this.xOffset || 0)
        , t: pos.y * this.height + (this.yOffset || 0)
      });
    }
  });
});