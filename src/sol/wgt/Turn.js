/*
Turn a Widget 0, 90, 180 or -90 degrees.
*/

define([
  "dojo/_base/declare"
  , "dijit/_WidgetBase"
  , "./mixin/resize"
  , "dojo/dom-construct"
  , "dojo/dom-style"
  , "sol/convenient/SceduleExec"
  , "dojo/dom-geometry"
], function(
  declare
  , _WidgetBase
  , resizeMixin
  , domConstruct
  , domStyle
  , SceduleExec
  , domGeo
){
  return declare([_WidgetBase, resizeMixin], {
    buildRendering: function(){
      this.inherited(arguments);
      
      domStyle.set(this.domNode, {
        position: "relative"
        , overflow: "visible"
      });
      this.turnNode = domConstruct.create("div", {
        "class": "turnNode"
        , "style": {
          position: "absolute"
          , top: "0px"
          , left: "0px"
          , width: "0px"
          , height: "0px"
          , overflow: "visible"
        }
      });
      domConstruct.place(this.turnNode, this.domNode);
      
      this.containerNode = domConstruct.create("div", {
        "class": "containerNode"
        , "style": {
          position: "absolute"
          , top: "0px"
          , left: "0px"
        }
      });
      domConstruct.place(this.containerNode, this.turnNode);
      this._applyTurn();
      
      var self = this;
      this.sceduleResize = new SceduleExec(function(){
        if (!self.widget){
          return;
        };
        var box = domGeo.getMarginBox(self.domNode);
        var newBox = {
          h: box.h
          , w: box.w
        };
        if (self.rotate == 90 || self.rotate == 270){
          newBox = {
            h: box.w
            , w: box.h
          };
        };
        if (self.widget.resize){
          self.widget.resize(newBox);
        }else{
          domGeo.setMarginBox(self.widget.domNode, newBox);
        };
      });
      
      if (this.widget){
        this.widget.placeAt(this.containerNode);
      };
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      if (this.widget){
        this.widget.startup();
      };
      this._getSize();
    }
    
    , _setRotateAttr: function(rotate){
      var value = rotate;
      while (value < 0){
        value += 360;
      };
      while (value >= 360){
        value -= 360;
      };
      if (value === 0 || value == 90 || value == 180 || value == 270){
      }else{
        value = 0;
      };
      this._set("rotate", value);
      this._applyTurn();
      if (this._started){
        this._getSize();
      };
    }
    
    , _getSize: function(){
      if (this.widget){
        var box = domGeo.getMarginBox(this.widget.domNode);
        if (this.rotate == 90 || this.rotate == 270){
          domGeo.setMarginBox(this.domNode, {
            h: box.w
            , w: box.h
          });
          
        }else{
          domGeo.setMarginBox(this.domNode, {
            h: box.h
            , w: box.w
          });
        };
      };
    }
    
    , place: function(){
      var ret = this.inherited(arguments);
      this._getSize();
      return ret;
    }
    
    , resize: function(){
      var ret = this.inherited(arguments);
      this.sceduleResize.exec();
      return ret;
    }
    
    , _applyTurn: function(){
      if (!this.turnNode){
        return;
      };
      if (this.rotate === 90){
        domStyle.set(this.containerNode, {
          "left": "0px"
          , "bottom": "0px"
          , "right": "auto"
          , "top": "auto"
        });
      }else if(this.rotate === 180){
        domStyle.set(this.containerNode, {
          "left": "auto"
          , "bottom": "0px"
          , "right": "0px"
          , "top": "auto"
        });
      }else if(this.rotate === 270){
        domStyle.set(this.containerNode, {
          "left": "auto"
          , "bottom": "auto"
          , "right": "0px"
          , "top": "0px"
        });
      }else {
        domStyle.set(this.containerNode, {
          "left": "0px"
          , "bottom": "auto"
          , "right": "auto"
          , "top": "0px"
        });
      };
      domStyle.set(this.turnNode, {
        "-webkit-transform": "rotate(" + this.rotate + "deg)"
        , "-moz-transform": "rotate(" + this.rotate + "deg)"
        , "-ms-transform": "rotate(" + this.rotate + "deg)"
        , "-o-transform": "rotate(" + this.rotate + "deg)"
        , "transform": "rotate(" + this.rotate + "deg)"
      });

    }
    
  });
});