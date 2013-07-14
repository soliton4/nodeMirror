define([
  "dojo/_base/declare"
  , "main/config"
], function(
  declare
  , config
){
  var nameTranslator;
  var dirnamelen = 0;
  if (config.isServer){
    dirnamelen = config.__dirname.length;
  };
  
  var NameTranslator = declare("NameTranslator", [
  ], {
    reduceName: function(parName){
      return parName.substr(dirnamelen);
    }
    , fileName: function(parName){
      return config.__dirname + parName
    }
  });
  nameTranslator = new NameTranslator();
  return nameTranslator;
});
