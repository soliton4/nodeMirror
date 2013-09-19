define([
  "dojo/_base/declare"
  , "main/_RemoteCall"
  , "dojo/Deferred"
  , "dojo/_base/array"
  , "sol/fileName"
  , "sol/promise"
  , "dojo/_base/lang"
  , "main/nameTranslator"
  , "main/modules"
  , "main/serverOnly!server/files"
  , "main/moduleLoader!server"
], function(
  declare
  , _RemoteCall
  , Deferred
  , array
  , fileName
  , solPromise
  , lang
  , nameTranslator
  , modules
  , files
  , moduleLoader
){
  var contentIO;
  
  var ContentIO = declare("ContentIO", [
    _RemoteCall
  ], {
    remoteFunctions: {
      getContentDef: true
    }
    
    , getContentDef: function(par){
      var def = new Deferred();
      var rejectFun = lang.hitch(def, "reject");
      var name = nameTranslator.fileName(par.id);
      files.contentTypeDef(name).then(function(parType){
        //console.log(parType);
        par.contentType = parType;
        moduleLoader.findModulePs(par).then(function(module){
          try{
            module.getContentPs(par).then(function(content){
              //console.log("have content");
              def.resolve({
                content: content
                , par: par
                , moduleId: module.getModuleId()
              });
            }, rejectFun);
          }catch(e){
            console.log(e);
            rejectFun();
          };
        }, rejectFun);
      });
      return def;
    }
    
  });
  contentIO = new ContentIO();
  return contentIO;
});
