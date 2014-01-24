define([
  "dojo/_base/declare"
  , "dojo/_base/config"
  , "dojo/_base/lang"
  , "dojo/has"
  , "sol/string"
], function(
  declare
  , dojoConfig
  , lang
  , has
  , solString
){
  if (has("server-modules")){
    return {
      
      load: function(id, require, load){
        var nodeMirror = dojoConfig.nodeMirrorNodeModule;
        var defaultConfig = nodeMirror.getConfig();
        if (!defaultConfig.dir){
          defaultConfig.dir = nodeMirror.getProcessDir();
        };
        if (!defaultConfig.x11videotool){
          defaultConfig.x11videotool = "avconv";
        };
        require(["dojo/node!runtime-configuration"], function(rc){
          var rcInstance = rc(id, {
            port: 3000
            , theme: "monokai"
            , webpath: "/"
            , "x11format": "ogg"
            , "x11fps": 5
            , "x11quality": 5
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
            if (process.platform == "win32"){
              defaultConfig.restart = false;
            };
            if (!defaultConfig.webpath){
              defaultConfig.webpath = "/";
            }else{
              if(!solString.startsWith(defaultConfig.webpath, "/")){
                defaultConfig.webpath = "/" + defaultConfig.webpath;
              };
              if(!solString.endsWith(defaultConfig.webpath, "/")){
                defaultConfig.webpath = defaultConfig.webpath + "/";
              };
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
