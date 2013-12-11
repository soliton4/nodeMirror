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
  var isWin;
  if (has("server-modules")){
    dirnamelen = config.dir.length;
  if (process.platform == "win32" || process.platform == "win64"){
      isWin = true;
	};
  };
  
  var NameTranslator = declare("NameTranslator", [
  ], {
    reduceName: function(parName){
      if (isWin){
        return parName.substr(dirnamelen).replace("\\", "/");
      }else{
        return parName.substr(dirnamelen);
      };
    }
    , fileName: function(parName){
      if (isWin){
        return config.dir + (parName.replace("/", "\\"));
      }else{
        return config.dir + parName;
      };
    }
  });
  nameTranslator = new NameTranslator();
  return nameTranslator;
});
