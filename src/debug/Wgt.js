define([
  "dojo/_base/declare"
  , "term/TerminalWgt"
  , "dijit/layout/BorderContainer"
  , "client/connection"
  , "sol/wgt/Text"
  , "client/globals"
  , "./ScriptWgt"
  , "dojo/Deferred"
  , "dojo/_base/lang"
], function(
  declare
  , Terminal
  , BorderContainer
  , connection
  , Text
  , globals
  , ScriptWgt
  , Deferred
  , lang
){
  return declare([BorderContainer], {
    title: "Debugger"
    , mode: "dbg"
    , "class": "debuggerTab"
    
    , constructor: function(){
      this.codeWgts = {};
    }
    
    , buildRendering: function(){
      this.inherited(arguments);
      var self = this;
      connection.emit("openterminal", {
        mode: this.mode
      }, lang.hitch(this, function(par){
        var termid = par.termid;
        this.termid = termid;
        
        var installWgt;
        
        connection.on(termid + "_meta", function(meta){
          if (meta.event == "ready"){
            self.resize();
          };
        });
        
        connection.on(termid, function(msg){
          if (msg.type == "break"){
            self.doBreak(msg.body);
          };
        });
      }));
    }
    
    , doBreak: function(data){
      var wgt = this.codeWgts[data.script.id];
      if (!wgt){
        this.codeWgts[data.script.id] = new ScriptWgt({
          script: {
            id: data.script.id
            , name: data.script.name
          }
          , debuggerObj: this
        });
        wgt = this.codeWgts[data.script.id];
        globals.addTab(wgt);
      };
      wgt.promise.then(function(){
        wgt.breakPoint(data);
      });
      
      //this.codeWgts
    }
    
    , getSource: function(source){
      
      var def = new Deferred();
      
      connection.emit(this.termid, {
        type: "source"
        , id: source.id
      }, lang.hitch(this, function(par){
        def.resolve(par);
      }));
      
      return def;
      
    }
    
  });
});