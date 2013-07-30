define([
  "dojo/_base/declare"
  , "dojo/_base/config"
  , "dojo/_base/lang"
  , "dojo/has"
], function(
  declare
  , dojoConfig
  , lang
  , has
){
  if (has("server-modules")){
    return {
      
      load: function(id, require, load){
        var nodeMirror = dojoConfig.nodeMirrorNodeModule;
        var defaultConfig = nodeMirror.getConfig();
        if (!defaultConfig.dir){
          defaultConfig.dir = nodeMirror.getProcessDir();
        };
        require(["dojo/node!runtime-configuration"], function(rc){
          var rcInstance = rc(id, {
            port: 3000
            , theme: "monokai"
          }, function(err, config){
            if (err){
              console.log(err);
              return;
            };
            lang.mixin(defaultConfig, config);
            defaultConfig.set = function(parName, parValue){
              rcInstance.set(parName, parValue);
              rcInstance.save("ini");
            };
            load(defaultConfig);
          });
        });
      }
    };
  }else{
    return {
      load: function(id, require, load){
        load({});
      }
    };
  };
});
