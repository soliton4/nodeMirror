define([
  "dojo/_base/declare"
  , "dijit/Tree"
  , "modules/terminal/Model"
  , "main/moduleLoader!client"
  , "./Tab"
  , "dojo/_base/array"
  , "./X11"
  , "client/connection"
  , "main/config"
], function(
  declare
  , Tree
  , Model
  , moduleLoader
  , Tab
  , array
  , X11
  , connection
  , config
){
  return declare([
    Tree
  ], {
    title: "Term."
    
    , showRoot: false
    
    , constructor: function(){
      var self = this;
      this.terminals = [];
      this.tabs = {};
	}
    
    , buildRendering: function(){
      this.inherited(arguments);
      this.model = new Model({
        terminals: this.terminals
        , x11terminal: this.x11terminal
      });
      
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      var self = this;
      this.inherited(arguments);
      self._updateList();
      connection.on("connect", function(socket){
        self._updateList();
        socket.on("terminal/listChanged", function(){
          self._updateList();
        });
      });
    }
    
    , _updateList: function(){
      var self = this;
      self.module.getList().then(function(parList){
        self.listChanged(parList);
      });
    }
    
    , openX11Tab: function(){
      var self = this;
      config.get("hide-contenttabs").then(function(hideTabs){
        var tabs = moduleLoader.getModule("modules/ContentTabs");
        var tab = new X11({
          "module": self.module
          , "region": "center"
        });
        if (hideTabs){
          var gui = moduleLoader.getModule("modules/Gui");
          gui.addChild(tab);
        }else{
          tabs.addChild(tab);
        };
        tab.on("close", function(){
          delete self.tabs["x11"];
        });
        tabs.selectChild(tab);
        self.tabs["x11"] = tab;
      });
    }
    
    , onClick: function(item, node, evt){
      var self = this;
      var tabs = moduleLoader.getModule("modules/ContentTabs");
      if (this.tabs[item.id]){
        tabs.selectChild(this.tabs[item.id]);
        return;
      };
      if (item.id == "new"){
        self.module.openTerminal().then(function(term){
          var tab = new Tab({
            terminal: term
          });
          tabs.addChild(tab);
          tab.on("close", function(){
            delete self.tabs[term.termid];
          });
          tabs.selectChild(tab);
          self.tabs[term.termid] = tab;
          self._addTerm(term.termid);
        });
      }else if (item.id == "x11"){
        self.openX11Tab();
        
      }else if (item.id == "x264"){
        var tab = new X264({
          "module": self.module
        });
        tabs.addChild(tab);
        tab.on("close", function(){
          delete self.tabs["x264"];
        });
        tabs.selectChild(tab);
        self.tabs["x264"] = tab;
      }else{
        self.module.openTerminal(item.id).then(function(term){
          var tab = new Tab({
            terminal: term
          });
          tabs.addChild(tab);
          tab.on("close", function(){
            delete self.tabs[item.id];
          });
          tabs.selectChild(tab);
          self.tabs[item.id] = tab;
        });
      };
    }
    
    , _addTerm: function(parId){
      var temp = {};
      array.forEach(this.terminals, function(t){
        temp[t.id] = {
          id: t.id
          , label: "Terminal " + t.id
        };
      });
      temp[parId] = {
        id: parId
        , label: "Terminal " + parId
      };
      while (this.terminals.length){
        this.terminals.pop();
      };
      var i;
      for (i in temp){
        this.terminals.push(temp[i]);
      };
      this.model.refreshTree();
    }
    
    , listChanged: function(parList){
      while (this.terminals.length){
        this.terminals.pop();
      };
      for (var i = 0; i < parList.length; ++i){
        this.terminals.push({
          id: parList[i]
          , label: "Terminal " + parList[i]
        });
      };
      this.model.refreshTree();
    }
    
  });
});
