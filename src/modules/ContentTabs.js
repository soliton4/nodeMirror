define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/config"
], function(
  declare
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , config
){
  
  
  return declare([], {
    //, keepBuildRendering: true
    
    constructor: function(){
    }
    
    , provideMainWidgetPs: function(){
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
    }
    
    , addChild: function(){
      var a = arguments;
      this.provideMainWidgetPs().then(function(wgt){
        wgt.addChild.apply(wgt, a);
      });
    }
    , removeChild: function(){
      this.wgt.removeChild.apply(this.wgt, arguments);
    }
    , selectChild: function(){
      var a = arguments;
      this.provideMainWidgetPs().then(function(wgt){
        wgt.selectChild.apply(wgt, a);
      });
      //this.wgt.selectChild.apply(this.wgt, arguments);
    }
    , getIndexOfChild: function(){
      var def = new Deferred();
      var a = arguments;
      this.provideMainWidgetPs().then(function(wgt){
        def.resolve(wgt.getIndexOfChild.apply(wgt, a));
      });
      return def;
      //this.wgt.selectChild.apply(this.wgt, arguments);
    }
    
  });
});
