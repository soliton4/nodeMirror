define([
  "dojo/_base/declare"
  , "term/Terminal"
  , "dijit/_WidgetBase"
], function(
  declare
  , Terminal
  , _WidgetBase
){
  return declare([_WidgetBase], {
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
      
    }
    , on: function(){
      this.terminal.on.apply(this.terminal, arguments);
    }
    , write: function(){
      this.terminal.write.apply(this.terminal, arguments);
    }
  });
});