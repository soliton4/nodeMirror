define([
  "dojo/_base/declare"
, "dijit/_WidgetBase"
, "dojo/dom-construct"
, "dojo/dom-class"
, "dojo/dom-geometry"
, "dojo/on"
], function(
  declare
, _WidgetBase
, domConstruct
, domClass
, domGeo
, on
){
  return declare([_WidgetBase], {
    
    "class": "solWgt scrollBar"
    , "direction": "vertical"
    
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
      this.grabNode = domConstruct.create("div", {
        "class": "grabNode"
      });
      domConstruct.place(this.grabNode, this.domNode);
      on(this.grabNode, "mousedown", function(e){
        self._dragStart = {
          x: e.pageX
          , y: e.pageY
        };
        self._scrollStart = {
          t: self.scrollNode.scrollTop
          , l: self.scrollNode.scrollLeft
        };
        self._posStart = domGeo.getMarginBox(self.grabNode);
        self.set("draging", true);
        self._moveHandler = on(document.body, "mousemove", function(e){
          self.updateMove(e);
        });
        self._upHandler = on(document.body, "mouseup", function(e){
          self._moveHandler.remove();
          delete self._moveHandler;
          self._upHandler.remove();
          delete self._upHandler;
          self.set("draging", false);
          self.update();
        });
      });
    }
    , updateMove: function(e){
      if (!this.draging){
        return;
      };
      var delta = {
        x: e.pageX - this._dragStart.x
        , y: e.pageY - this._dragStart.y
      };
      this.deltaCorrection(delta);
      var grabTop = this._posStart.t + delta.y;
      domGeo.setMarginBox(this.grabNode, {
        t: grabTop
      });
      var mb = domGeo.getMarginBox(this.domNode);
      var sh = this.scrollNode.scrollHeight;
      var st = (grabTop * sh) / mb.h;
      this.scrollNode.scrollTop = st;
    }
    
    , deltaCorrection: function(delta){}
    
    , update: function(){
      if (!this.scrollNode){
        return;
      };
      var oh = this.scrollNode.offsetHeight;
      var sh = this.scrollNode.scrollHeight;
      if (oh < sh){
        domClass.add(this.domNode, "scroll");
        var st = this.scrollNode.scrollTop;
        var mb = domGeo.getMarginBox(this.domNode);
        var grabHeight = (mb.h * oh) / sh;
        var grabTop = (mb.h * st) / sh;
        domGeo.setMarginBox(this.grabNode, {
          h: grabHeight
          , t: grabTop
        });
        /*domGeo.setPosition(this.grabNode, {
          y: grabTop
          , t: grabTop
        });*/
      }else{
        domClass.remove(this.domNode, "scroll");
      };
    }
    
    , _setDirectionAttr: function(value){
      domClass.remove(this.domNode, "horizontal");
      domClass.remove(this.domNode, "vertical");
      domClass.add(this.domNode, value);
      this._set("direction", value);
    }
    
    , _setScrollNodeAttr: function(node){
      var self = this;
      if (this._scrollHandler){
        this._scrollHandler.remove();
      }
      this._scrollHandler = on(node, "scroll", function(){
        if (self.draging){
          return;
        };
        self.update();
      });
    }
    , destroy: function(){
      if (this._scrollHandler){
        this._scrollHandler.remove();
      };
      if (this._moveHandler){
        this._moveHandler.remove();
      };
      if (this._upHandler){
        this._upHandler.remove();
      };
      
      this.inherited(arguments);
    }
  });
});