define([
  "dojo/_base/declare"
  , "modules/Base"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
], function(
  declare
  , Base
  , Deferred
  , has
  , solPromise
  , array
){
  var files;
  if (has("serverModules")){
    require(["server/files"], function(parFiles){
      files = parFiles;
    });
  };
  
  var possibleContentTypes = [
    "application/promiseLand"
  ];
  
  return declare([Base], {
    getContent: function(par){
      var isText = false;
      if (par.contentType.substr(0, 5) == "text/"){
        isText = true;
      };
      
      var i = 0;
      while (!isText && i < possibleContentTypes.length){
        if (par.contentType == possibleContentTypes[i]){
          isText = true;
        };
      };
      
      if (!isText){
        return;
      };
      
      var def = new Deferred();
      
      var result = {
        isText: true
      };
      
      files.readTextDef(par.fileName).then(function(parText){
        result.text = parText;
        def.resolve(result);
      });
      
      return def;
    }
    
  });
});
