define([
  "dojo/_base/declare"
  , "main/config"
  , "dojo/has"
], function(
  declare
  , config
  , has
){
  var nameTranslator;
  var dirnamelen = 0;
  if (has("server-modules")){
    dirnamelen = config.dir.length;
  };
  
  var NameTranslator = declare("NameTranslator", [
  ], {
    reduceName: function(parName){
      return parName.substr(dirnamelen);
    }
    , fileName: function(parName){
      return config.dir + parName;
    }
  });
  nameTranslator = new NameTranslator();
  return nameTranslator;
});
