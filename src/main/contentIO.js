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
){
  var contentIO;
  
  var ContentIO = declare("ContentIO", [
    _RemoteCall
  ], {
    remoteFunctions: {
      getContentDef: true
      , saveTextDef: true
      , createFileDef: true
    }
    
    /*, getContentTypesDef: function(parFileNameOrArray){
      
    }*/
    
    , getContentDef: function(parName){
      var def = new Deferred();
      var name = nameTranslator.fileName(parName);
      files.contentTypeDef(name).then(function(parType){
      console.log("contenttype:" + name);
	    console.log(parType);
        modules.getContent({
          id: parName
          , fileName: name
          , contentType: parType
        }).then(function(result){
          def.resolve(lang.mixin({
            id: parName
            , contentType: parType
          }, result));
        });
      });
      return def;
    }
    , saveTextDef: function(parId, parText){
      var name = nameTranslator.fileName(parId);
      return files.writeTextDef(name, parText);
    }
    
    , createFileDef: function(parentIdStr, nameStr, newDir){
      var def = new Deferred();
      var newFileNameStr = parentIdStr + "/" + nameStr;
      console.log(newFileNameStr);
      if (!nameStr || !nameStr.length){
        def.reject();
        return;
      };
      
      var name = nameTranslator.fileName(newFileNameStr);
      
      if (newDir){
        files.createDirDef(name).then(lang.hitch(this, function(){
          this.getContentDef(newFileNameStr).then(function(parContent){
            def.resolve(parContent);
          });
        }), function(){
          def.reject();
        });
      }else{
        files.createFileDef(name).then(lang.hitch(this, function(){
          console.log("created");
          this.getContentDef(newFileNameStr).then(function(parContent){
            def.resolve(parContent);
          });
        }), function(){
          console.log("rej");
          def.reject();
        });
      };
      
      return def.promise;
    }
    
  });
  contentIO = new ContentIO();
  return contentIO;
});
