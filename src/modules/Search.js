define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/config"
  , "main/connection"
  , "main/clientOnly!./search/Wgt"
  , "modules/base/Base"
  , "main/nameTranslator"

], function(
  declare
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , config
  , connection
  , SearchWgt
  , Base
  , nameTranslator
  
){
  
  var Search = declare([Base], {
    //, keepBuildRendering: true
    remoteFunctions: lang.mixin({}, Base.remoteFunctions, { find: true} )
    
    , constructor: function(){
      var self = this;
    }
    
    , openSearchTab: function(par){
      var tabs = moduleLoader.getModule("modules/ContentTabs");
      
      var tab = new SearchWgt(lang.mixin({
        module: this
      }, par));
      tabs.addChild(tab);
      tabs.selectChild(tab);
    }
    
    , find: function(search){
      var def = new Deferred();
      console.log(search);
      
      require([
        "sol/node/fileWalker"
      ], function(
        fileWalker
      ){
        var res = [];
        fileWalker.walk(nameTranslator.fileName(search.dir), {fileFun: function(par){
          res.push({
            filename: nameTranslator.reduceName(par.filename)
          });
        }}).then(function(){
          def.resolve(res);
        });
      });
      
      return def.promise;
    }
    
  });
  
  
  if (has("server-modules")){
  }else{
  };
  
  return Search;
  
});



