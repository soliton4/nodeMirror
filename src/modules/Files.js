define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/config"
  , "main/clientOnly!./files/Wgt"
], function(
  declare
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , config
  , Wgt
){
  
  
  return declare([], {
    //, keepBuildRendering: true
    
    constructor: function(){
    }
    
    , provideSideBarWidgetPs: function(){
      var def = new Deferred();
      var self = this;
      if (self.wgt){
        def.resolve(self.wgt);
      }else{
        require(["main/clientOnly!modules/files/Wgt"], function(Wgt){
          self.wgt = new Wgt({});
          def.resolve(self.wgt);
        });
      };
      return def;
    }
    
  });
});
