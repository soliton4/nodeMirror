define([
  "dojo/_base/declare"
  , "modules/Base"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "main/serverOnly!server/files"
  , "main/codemirror/subtypes"
  , "sol/string"
], function(
  declare
  , Base
  , Deferred
  , has
  , solPromise
  , array
  , files
  , subtypes
  , solString
){
  
  var additionalSubtypes = {
    "peg.js": true
    , "x-empty": true
  };
    
  var additionalTypes = {
    "inode/x-empty": true
  };
  
  return declare([Base], {
    getContent: function(par){
      var isText = false;
      //console.log(par.contentType);
      if (solString.startsWith(par.contentType, "text/")){
        isText = true;
      };
      
      if (!isText){
        if (solString.startsWith(par.contentType, "application/")){
          var subtype = par.contentType.split("/")[1];
          if (subtypes[subtype] || additionalSubtypes[subtype]){
            isText = true;
          };
        };
      };
      
      if (!isText){
        if (additionalTypes[par.contentType]){
          isText = true;
        };
      };
      
      if (par.extra && par.extra.forceText){
        isText = true;
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
