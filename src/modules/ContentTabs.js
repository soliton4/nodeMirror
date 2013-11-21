define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/config"
  , "modules/base/Base"
], function(
  declare
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , config
  , Base
){
  
  return declare([Base], {
    //, keepBuildRendering: true
    
    constructor: function(){
      var self = this;
      this.childs = [];
      if (!has("server-modules")){
        config.get("tabposition").then(function(tabposition){
          self.set("tabPosition", tabposition || "top");
          self._createWgt();
        });
      }
    }
    
    , set: function(name, value){
      var self = this;
      if (name == "tabPosition"){
        this.tabPosition = value;
        if (!this.wgt){
          return;
        };
        if (value == this.wgt.get("tabPosition")){
          return;
        };
        this._getChilds();
        var oldWgt = this.wgt;
        this._createWgt().then(function(){
          if (oldWgt){
            oldWgt.destroy();
          };
        });
      };
    }
    
    , _createWgt: function(){
      if (has("server-modules")){
        return;
      };
      var def = new Deferred();
      var self = this;
      require([
        "main/clientOnly!modules/contentTabs/Wgt"
        , "main/moduleLoader!client"
      ], function(
        Wgt
        , moduleLoader
      ){
        var gui = moduleLoader.getModule("modules/Gui");
        self.wgt = new Wgt({
          tabPosition: self.tabPosition
        });
        gui.addChild(self.wgt);
        self._setChilds();
        def.resolve();
      });
      return def.promise;
    }
    
    , _setChilds: function(){
      var self = this;
      if (self.childs.length){
        array.forEach(self.childs, function(child){
          self.wgt.addChild(child);
        });
        if (this.activeChild){
          self.wgt.selectChild(this.activeChild);
        };
      };
    }
    , _getChilds: function(){
      if (this.wgt){
        this.childs = this.wgt.getChildren();
        this.activeChild = this.wgt.selectedChildWidget;
      };
    }
    
    
    , addChild: function(wgt){
      this.childs.push(wgt);
      if (this.wgt){
        this.wgt.addChild(wgt);
      };
    }
    , removeChild: function(wgt){
      this.childs = array.filter(this.childs, function(par){
        if (par == wgt){
          return;
        };
        return par;
      });
      if (this.wgt){
        this.wgt.removeChild(wgt);
      };
    }
    , selectChild: function(wgt){
      if (this.wgt){
        this.wgt.selectChild(wgt);
      };
      this.activeChild = wgt;
    }
    , getIndexOfChild: function(wgt){
      return array.indexOf(this.childs, wgt);
    }
    
  });
});
