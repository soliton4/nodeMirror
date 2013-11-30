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
  , "./MouseWgt"
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
  , MouseWgt
){
  
  var charBox;
  
  var getCharBox = function(){
    if (charBox){
      return charBox;
    };
    var tryWgt = new Try({});
    var textStr = "";
    for (var i = 0; i < 1000; ++i){
      textStr += ".";
    };
    var text = new Text({
      text: textStr
    });
    
    tryWgt.placeAt(document.body);
    var box = tryWgt.getMarginBox({
      node: text.domNode
      , "class": "terminal"
    });
    charBox = {
      w: box.w / 1000
      , h: box.h
    };
    
    text.destroy();
    tryWgt.destroy();
    return charBox;
  };
  
  
  
  return declare([_WidgetBase, resizeMixin], {
    "class": "terminalWidget"
    , buildRendering: function(){
      this.sceduleEmitResize = this.ownObj(new SceduleExec(lang.hitch(this,"emitResize"),{
        delay: 100
      }));
      this.inherited(arguments);
      
      
      this.terminal = new Terminal({
        cols: 80,
        rows: 30,
        useStyle: true,
        screenKeys: true
      });
      
      this.terminal.open(this.domNode);

      /*this.mouseWgt = this.ownObj(new MouseWgt({
        width: getCharBox().w
        , height: getCharBox().h
      }));
      this.mouseWgt.placeAt(this.domNode);
      
      this.terminal.mouseWgt = this.mouseWgt;*/

      this.resizeHandler = [];
    }
    , focus: function(){
      this.terminal.focus();
      this.terminal.element.focus();
      console.log("focusing");
    }
    , on: function(parWhat, parHandler){
      if (parWhat == "resize"){
        this.resizeHandler.push(parHandler);
      }else{
        return this.terminal.on.apply(this.terminal, arguments);
      };
    }
    , write: function(){
      return this.terminal.write.apply(this.terminal, arguments);
    }
    , emitResize: function(dims){
      var emit = false;
      if (!dims){
        emit = true;
      };
      if (emit){
        var box = this.get("contentBox");
        var tb = getCharBox();
        this.dims = {
          x: Math.floor((box.w - 10) / tb.w)
          , y: Math.floor((box.h - 10) / tb.h)
        };
        dims = this.dims;
      }else{
        if (dims.x == this.dims.x && dims.y == this.dims.y){
          return;
        };
      };
      this.terminal.resize(dims.x, dims.y);
      this.terminal.options.cols = dims.x;
      this.terminal.options.rows = dims.y;
      if (emit){
        array.forEach(this.resizeHandler, function(handlerFun){
          handlerFun(dims);
        });
      };
    }
    , resize: function(){
      var box = {
        w: this._contentBox && this._contentBox.w
        , h: this._contentBox && this._contentBox.h
      };
      this.inherited(arguments);
      if (this._contentBox.w == box.w && this._contentBox.h == box.h && this._resizeEmited){
        return;
      };
      this._resizeEmited = true;
      this.sceduleEmitResize.exec();
    }
  });
});