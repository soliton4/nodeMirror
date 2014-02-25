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
  var seepinkpies = false;
  config.get("seepinkpies").then(function(parSeepinkpies){
    seepinkpies = parSeepinkpies;
  });
  return declare([BorderContainer, tabMixin], {
    title: "Terminal"
    , closable: true
    , "class": "terminalTab"
    , onShow: function(){
      this.inherited(arguments);
      this.terminalWgt.focus();
      this._hidden = false;
      this.set("dirty", false);
    }
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
      this.terminalWgt = new Terminal({
        region: "center"
        , seepinkpies: seepinkpies
      });
      config.get("seeunicorns").then(function(seeunicorns){
        if (seeunicorns){
          domClass.add(self.domNode, "seeunicorns");
          domClass.add(self.terminalWgt.domNode, "seeunicorns");
        };
      });
      if (seepinkpies){
        domClass.add(self.domNode, "seepinkpies");
        domClass.add(self.terminalWgt.domNode, "seepinkpies");
      };
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
    , destroy: function(){
      this.terminal.destroy();
      this.inherited(arguments);
    }
  });
});