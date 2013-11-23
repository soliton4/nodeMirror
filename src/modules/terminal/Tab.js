define([
  "dojo/_base/declare"
  , "./TerminalWgt"
  , "dijit/layout/BorderContainer"
  , "client/connection"
  , "sol/wgt/Text"
  , "main/config"
  , "dojo/dom-class"
  , "modules/contentTabs/tabMixin"
], function(
  declare
  , Terminal
  , BorderContainer
  , connection
  , Text
  , config
  , domClass
  , tabMixin
){
  return declare([BorderContainer, tabMixin], {
    title: "Terminal"
    , closable: true
    , "class": "terminalTab"
    , onShow: function(){
      this.inherited(arguments);
      this.terminalWgt.focus();
    }
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
      this.terminalWgt = new Terminal({
        region: "center"
      });
      config.get("seeunicorns").then(function(seeunicorns){
        if (seeunicorns){
          domClass.add(self.domNode, "seeunicorns");
          domClass.add(self.terminalWgt.domNode, "seeunicorns");
        };
      });
      this.addChild(this.terminalWgt);
      var term = this.terminalWgt;
      
      this.terminal.on("data", function(data){
        term.write(data);
        if (self._hidden && !this.dirty){
          self.set("dirty", true);
        }
      });
      this.terminal.on("resize", function(data){
        term.emitResize(data);
      });
      term.on("title", function(title){
        self.set("title", title);
      });
      term.on("resize", function(size){
        self.terminal.resize(size);
      });
      term.on("data", function(data){
        self.terminal.write(data);
      });
      return;
      
    }
    , onHide: function(){
      this._hidden = true;
    }
    , onShow: function(){
      this._hidden = false;
      this.set("dirty", false);
    }
  });
});