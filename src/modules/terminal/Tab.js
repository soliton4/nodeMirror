define([
  "dojo/_base/declare"
  , "./TerminalWgt"
  , "dijit/layout/BorderContainer"
  , "client/connection"
  , "sol/wgt/Text"
  , "main/config"
  , "dojo/dom-class"
], function(
  declare
  , Terminal
  , BorderContainer
  , connection
  , Text
  , config
  , domClass
){
  return declare([BorderContainer], {
    title: "Terminal"
    , closable: true
    , "class": "terminalTab"
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
      this.terminalWgt = new Terminal({
        region: "center"
      });
      config.get("seeunicorns").then(function(seeunicorns){
        if (seeunicorns){
          domClass.add(self.domNode, "seeunicorns");
        };
      });
      this.addChild(this.terminalWgt);
      var term = this.terminalWgt;
      
      this.terminal.on("data", function(data){
        term.write(data);
      });
      this.terminal.on("resize", function(data){
        term.emitResize(data);
      });
      term.on("resize", function(size){
        self.terminal.resize(size);
      });
      term.on("data", function(data){
        self.terminal.write(data);
      });
      return;
      
      
        connection.on("terminal_meta", function(meta){
          if (meta.event == "install"){
            self.installWgt = new Text({
              text: "please wait while pty.js is being installed ..."
              , region: "top"
              , "class": "message"
            });
            self.addChild(self.installWgt);
            self.own(self.installWgt);
          };
          if (meta.event == "installerror"){
            if (self.installWgt){
              self.installWgt.destroy();
            };
            errorWgt = new Text({
              text: "installation of pty.js was not successful ..."
              , region: "top"
              , "class": "message"
            });
            self.addChild(errorWgt);
            self.own(errorWgt);
          };
        });
      
      
      connection.emit("openterminal", {
        mode: this.mode
      }, function(par){
        var termid = par.termid;
        
        connection.on(termid + "_meta", function(meta){
          if (meta.event == "ready"){
            if (self.installWgt){
              self.installWgt.destroy();
            };
            self.resize();
            term.emitResize();
          };
        });
        
        term.on("resize", function(size){
          connection.emit(termid + "_resize", size);
        });
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