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
  var files;
  if (config.isServer){
    require(["server/files"], function(parFiles){
      files = parFiles;
    });
  };
  
  var treeItems;
  
  var TreeItems = declare("treeItems", [
    _RemoteCall
  ], {
    remoteFunctions: {
	  getRootDef: true
	  , getChildrenDef: true
          , getItemDef: true
	}
    
    , getRootDef: function(){
       return treeItems.getItemDef("");
    }
    , getItemDef: function(parId){
      console.log(parId);
	  var def = new Deferred();
          var item = {
	    id: parId
	    , name: parId === "" ? fileName.single(config.__dirname) : fileName.single(parId)
          };
          files.dirsDef(nameTranslator.fileName(parId)).then(function(ar){
            item.hasChildren = !!ar;
            console.log("resolve:" + parId);
            def.resolve(item);
          });
	  return def;
    }
    
    , getChildrenDef: function(parId){
      var def = new Deferred();
      files.dirsDef(config.__dirname + parId).then(function(ar){
        if (!ar){
          def.resolve();
          console.log("???");
          return;
        };
        var resultAr = [];
        console.log(ar);
        solPromise.allDone(array.map(ar, function(parFileName){
          console.log(parFileName);
          return treeItems.getItemDef(nameTranslator.reduceName(parFileName)).then(lang.hitch(resultAr, "push"));
          return new Deferred();
        })).then(function(){
          def.resolve(resultAr);
        }, function(){ console.log("error");});
      });
      return def;
    }
    
  });
  treeItems = new TreeItems();
  return treeItems;
});
