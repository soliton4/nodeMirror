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
  , "main/clientOnly!dojo/dom-class"
  , "main/clientOnly!dijit/layout/BorderContainer"
  , "main/clientOnly!dojo/topic"
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
  , domClass
  , BorderContainer
  , topic
){
  
  
  return declare([Base], {
    //, keepBuildRendering: true
    
    constructor: function(){
      var self = this;
      if (!has("server-modules")){
        domClass.add(document.body, "nodeMirror");
        domClass.add(document.body, "claro");
        this.mainBc = new BorderContainer({
          "class": "mainBc"
          , gutters: false
          , liveSplitters: true
        });
        this.mainBc.placeAt(document.body);
        this.mainBc.startup();
        
        topic.subscribe("client/mainBc/resize", function(par){
          self.mainBc.resize(par);
        });
        
        require([
          "main/moduleLoader!client"
        , "dojo/dom-construct"
        , "dojo/dom"
        ], function(
          moduleLoader
        , domConstruct
        , dom
        ){
          var modules = moduleLoader.getModules();
          array.forEach(modules, function(module){
            if (module.provideMainWidgetPs){
              module.provideMainWidgetPs().then(function(wgt){
                self.mainBc.addChild(wgt);
              });
            };
          });
          setTimeout(lang.hitch(self.mainBc, "resize"), 100);
          setTimeout(function(){
            self.mainBc.resize();
            domConstruct.destroy(dom.byId("startupscreen"));
            self.mainBc.resize();
          }, 2000);
        });
      };
    }
    
    , resize: function(par){
      this.mainBc.resize(par);
    }
    
    , addChild: function(par, par2){
      this.mainBc.addChild(par, par2);
    }
    , removeChild: function(){
      this.mainBc.removeChild.apply(this.mainBc, arguments);
    }
    
  });
});
