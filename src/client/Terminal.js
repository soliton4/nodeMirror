define([
  "dojo/_base/declare"
  , "term/TerminalWgt"
  , "dijit/layout/BorderContainer"
  , "client/connection"
], function(
  declare
  , Terminal
  , BorderContainer
  , connection
){
  return declare([BorderContainer], {
    title: "Terminal"
    , buildRendering: function(){
      this.inherited(arguments);
      this.terminal = new Terminal({
        region: "center"
        
      });
      this.addChild(this.terminal);
      var term = this.terminal;
      connection.emit("openterminal", function(par){
        var termid = par.termid;
        connection.on(termid, function(data){
          term.write(data);
        });
        term.on("data", function(data){
          connection.emit(termid, data);
        });
      });
    }
  });
});