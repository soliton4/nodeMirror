define([
  "dojo/_base/declare"
  , "term/Terminal"
  , "dijit/_WidgetBase"
  , "sol/wgt/mixin/resize"
  , "dojo/_base/array"
], function(
  declare
  , Terminal
  , _WidgetBase
  , resizeMixin
  , array
){
  return declare([_WidgetBase, resizeMixin], {
    buildRendering: function(){
      this.inherited(arguments);
      this.terminal = new Terminal({
        cols: 80,
        rows: 30,
        useStyle: true,
        screenKeys: true
      });
      
      /*term.on('data', function(data) {
        socket.emit('data', data);
      });

      term.on('title', function(title) {
        document.title = title;
      });*/

      this.terminal.open(this.domNode);
      
      //term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n');      
      
      this.resizeHandler = [];
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
    , emitResize: function(){
      var box = this.get("contentBox");
      this.dims = {
        x: Math.floor((box.w - 10) / 7)
        , y: Math.floor((box.h - 10) / 13)
      };
      var dims = this.dims;
      this.terminal.resize(dims.x, dims.y);
      this.terminal.options.cols = dims.x;
      this.terminal.options.rows = dims.y;
      array.forEach(this.resizeHandler, function(handlerFun){
        handlerFun(dims);
      });
    }
    , resize: function(){
      this.inherited(arguments);
      this.emitResize();
    }
  });
});