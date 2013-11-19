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
        require([
          "main/clientOnly!modules/contentTabs/Wgt"
          , "main/moduleLoader!client"
        ], function(
          Wgt
          , moduleLoader
        ){
          var gui = moduleLoader.getModule("modules/Gui");
          self.wgt = new Wgt({});
          gui.addChild(self.wgt);
          if (self.childs.length){
            array.forEach(self.childs, function(child){
              self.wgt.addChild(child);
            });
          };
        });
      }
    }
    
    , set: function(name, value){
      var self = this;
      if (name == "tabPosition"){
        if (value == this.wgt.get("tabPosition")){
          return;
        };
        require([
          "main/clientOnly!modules/contentTabs/Wgt"
          , "main/moduleLoader!client"
        ], function(
          Wgt
          , moduleLoader
        ){
          var gui = moduleLoader.getModule("modules/Gui");
          var oldWgt = self.wgt;
          self.wgt = new Wgt({
            tabPosition: value
          });
          if (self.childs.length){
            array.forEach(self.childs, function(child){
              self.wgt.addChild(child);
            });
          };
          if (oldWgt){
            oldWgt.destroy();
          };
          gui.addChild(self.wgt);
        });
      };
    }
    
    /*, provideMainWidgetPs: function(){
      var def = new Deferred();
      var self = this;
      if (self.wgt){
        def.resolve(self.wgt);
      }else{
        require(["main/clientOnly!modules/contentTabs/Wgt"], function(Wgt){
          self.wgt = new Wgt({});
          def.resolve(self.wgt);
        });
      };
      return def;
    }*/
    
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
    }
    , getIndexOfChild: function(wgt){
      return array.indexOf(this.childs, wgt);
    }
    
  });
});
