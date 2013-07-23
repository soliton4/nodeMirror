define([
  "dojo/_base/declare"
  , "modules/Base"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "main/config"
], function(
  declare
  , Base
  , Deferred
  , has
  , solPromise
  , array
  , config
){
  var files;
  if (config.isServer){
    require(["server/files"], function(parFiles){
      files = parFiles;
    });
  };
  
  var possibleContentTypes = [
    "application/javascript"
  , "application/peg.js"
  , "application/css"
  , "application/json"
  , "inode/x-empty"
  ];
  
  return declare([Base], {
    getContent: function(par){
      var isText = false;
      console.log(par.contentType);
      if (par.contentType.substr(0, 5) == "text/"){
        isText = true;
      };
      
      var i = 0;
      while (!isText && i < possibleContentTypes.length){
        if (par.contentType == possibleContentTypes[i]){
          isText = true;
        };
        ++i;
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
