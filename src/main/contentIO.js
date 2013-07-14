define([
  "dojo/_base/declare"
  , "main/_RemoteCall"
  , "dojo/Deferred"
  , "main/config"
  , "dojo/_base/array"
  , "sol/fileName"
  , "sol/promise"
  , "dojo/_base/lang"
  , "main/nameTranslator"
], function(
  declare
  , _RemoteCall
  , Deferred
  , config
  , array
  , fileName
  , solPromise
  , lang
  , nameTranslator
){
  var contentIO;
  var files;
  if (config.isServer){
    require(["server/files"], function(parFiles){
      files = parFiles;
    });
  };
  
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
      var result = {
      };
      files.contentTypeDef(name).then(function(parType){
        result.id = parName;
        result.contentType = parType;
        if (parType == "inode/directory"){
          files.childrenDef(name).then(function(ar){
            console.log(ar);
            result.children = [];
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
        }else{
          var isText = false;
          isText = isText || parType.substr(0, 5) == "text/";
          isText = isText || parType == "application/javascript";
          isText = isText || parType == "application/peg.js";
          isText = isText || parType == "application/css";
          isText = isText || parType == "inode/x-empty";
          console.log(parType);
          if (isText){
            result.isText = true;
            files.readTextDef(name).then(function(parText){
              result.text = parText;
              def.resolve(result);
            });
            return;
          };
          if (parType == "application/promiseLand"){
            result.isText = true;
            files.readTextDef(name).then(function(parText){
              result.text = parText;
              def.resolve(result);
            });
            return;
          };
        };
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
