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
    var text = new Text({
      text: "."
    });
    
    tryWgt.placeAt(document.body);
    charBox = tryWgt.getMarginBox({
      node: text.domNode
      , "class": "terminal"
    });
    
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
        screenKeys: true,
      });
      
      
      /*term.on('data', function(data) {
        socket.emit('data', data);
      });

      term.on('title', function(title) {
        document.title = title;
      });*/

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
      this.inherited(arguments);
      //this.emitResize();
      this.sceduleEmitResize.exec();
    }
  });
});