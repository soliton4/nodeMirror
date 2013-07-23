define([
  "dojo/_base/declare"
  , "modules/Base"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "main/nameTranslator"
  , "main/config"
], function(
  declare
  , Base
  , Deferred
  , has
  , solPromise
  , array
  , nameTranslator
  , config
){
  var files;
  if (config.isServer){
    require(["server/files"], function(parFiles){
      files = parFiles;
    });
  };
  
  return declare([Base], {
    getContent: function(par){
      if (par.contentType != "inode/directory"){
        return;
      };
      console.log(has("serverModules"));
      console.log("serverModules");
      var def = new Deferred();
      files.childrenDef(par.fileName).then(function(ar){
        console.log("there");
        var result = {
          children: []
        };
        solPromise.allDone(array.map(ar, function(child){
          var entry = {
            id: nameTranslator.reduceName(child)
          };
          result.children.push(entry);
          return files.contentTypeDef(child).then(function(contentType){
             entry.contentType = contentType;
          });
        })).then(function(){
          def.resolve(result);
        });
      });
      
      return def;
    }
    
  });
});
