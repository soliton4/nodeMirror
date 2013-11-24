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
      var self = this;
      if (!has("server-modules")){
        require([
          "main/clientOnly!modules/sideBar/Wgt"
          , "main/moduleLoader!client"
          , "main/clientOnly!modules/sideBar/Stub"
        ], function(
          Wgt
          , moduleLoader
          , Stub
        ){
          var gui = moduleLoader.getModule("modules/Gui");
          self.wgt = new Wgt({
            region: "left"
            , layoutPriority: 10
          });
          gui.addChild(self.wgt);
          self.stub = new Stub({
            region: "left"
            , sideBarWgt: self.wgt
            , layoutPriority: 9
          });
          gui.addChild(self.stub);
        });
      };
      
    }
    
/*    , provideMainWidgetPs: function(){
      var def = new Deferred();
      var self = this;
      if (self.wgt){
        def.resolve(self.wgt);
      }else{
        require(["main/clientOnly!modules/sideBar/Wgt"], function(Wgt){
          self.wgt = new Wgt({});
          def.resolve(self.wgt);
        });
      };
      return def;
    }*/
    
  });
});
