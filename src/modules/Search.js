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
  , "sol/promise/Counter"
  , "require"
  , "main/serverOnly!sol/node/fileWalker"
  , "main/serverOnly!dojo/node!fs"
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
  , Counter
  , require
  , fileWalker
  , fs
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
      
      /*require([
        "sol/node/fileWalker"
        , "dojo/node!fs"
      ], function(
        fileWalker
        //, fs
      ){*/
        console.log("done require");
        var counter = new Counter();
        var res = [];
        fileWalker.walk(nameTranslator.fileName(search.dir), {fileFun: function(par){
          counter.inc();
          fs.readFile(par.filename, {
            encoding: "utf8"
          }, function(err, str){
            if (!err && str.indexOf(search.phrase) !== -1){
              res.push({
                id: nameTranslator.reduceName(par.filename)
              });
            };
            counter.dec();
          });
        }}).then(function(){
          counter.then(function(){
            def.resolve(res);
          });
        });
      //});
      
      return def.promise;
    }
    
  });
  
  
  if (has("server-modules")){
  }else{
  };
  
  return Search;
  
});



