define([
  "dojo/_base/declare"
  , "dojo/_base/config"
  , "dojo/_base/lang"
  , "dojo/has"
  , "./config/load!node-mirror"
  , "main/_RemoteCall"
  , "dojo/Deferred"
  , "modules/text/codeMirrorSetable"
], function(
  declare
  , dojoConfig
  , lang
  , has
  , nodeMirrorConfig
  , _RemoteCall
  , Deferred
  , codeMirrorSetable
){
  var isServer = has("server-modules");
  var config;
  
  var codeMirrorSaveable = function(parValue){
    return parValue.substr(0, 11) == "codemirror-" && codeMirrorSetable.hasOwnProperty(parValue.substr(11));
  };
  
  var ConfigCls = declare("Config", [
    _RemoteCall
  ], {
    remoteFunctions: {
      loadClientConfig: true
      , clientSetConfig: true
    }
    
    , clientConfig: {
      "terminal": true
      , "control": true
      , "debug": true
      , "restart": true
      , "seeunicorns": true
      , "music": true
      , "webpath": "/"
      , "theme": "claro"
      , "tabposition": "top"
      , "treefiles": false
    }
    , saveable: {
      "theme": true
    , "tabposition": true
    , "treefiles": true
    }
    
    , constructor: function(){
      lang.mixin(this, nodeMirrorConfig);
      if (has("server-modules")){
        this.config = nodeMirrorConfig;
      }else{
        this.configLoaded = this.loadClientConfig();
        this.configLoaded.then(lang.hitch(this, function(parConfig){
          this.config = parConfig;
        }));
      };
    }
    
    , set: function(parName, parValue){
      console.log("calling set!!!");
      if (isServer){
        console.log("doing a set");
        try{
        this.config[parName] = parValue;
        if (this.saveable[parName] || codeMirrorSaveable(parName)){
          nodeMirrorConfig.set(parName, parValue);
        };
        nodeMirrorConfig[parName] = parValue;
        }catch(e){
          console.log(e);
        };
        console.log(nodeMirrorConfig);
      }else{
        this.configLoaded.then(lang.hitch(this, function(){
          if (this.config[parName] == parValue){
            return;
          };
          this.config[parName] = parValue;
          this.clientSetConfig(parName, parValue);
        }));
      };
    }
    , set2: function(parName, parValue){
      console.log("calling set!!!");
      if (isServer){
        console.log("doing a set");
        try{
        this.config[parName] = parValue;
        if (this.saveable[parName] || codeMirrorSaveable(parName)){
          nodeMirrorConfig.set(parName, parValue);
        };
        nodeMirrorConfig[parName] = parValue;
        }catch(e){
          console.log(e);
        };
        console.log(nodeMirrorConfig);
      }else{
        this.configLoaded.then(lang.hitch(this, function(){
          if (this.config[parName] == parValue){
            return;
          };
          this.config[parName] = parValue;
          this.clientSetConfig(parName, parValue);
        }));
      };
    }
    
    , clientSetConfig: function(parName, parValue){
      console.log("doing it");
      var def = new Deferred();
      if (this.clientConfig[parName] !== undefined || codeMirrorSaveable(parName)){
        this.set2(parName, parValue);
      };
      def.resolve();
      return def;
    }
    
    , get: function(parName){
      var def = new Deferred();
      if (isServer){
        def.resolve(this.config[parName]);
      }else{
        this.configLoaded.then(lang.hitch(this, function(){
          def.resolve(this.config[parName]);
        }));
      };
      return def;
    }
    
    , load: function(id, require, load){
      load(config);
    }
    
    , loadClientConfig: function(){
      var def = new Deferred();
      var res = {};
      var i;
      for(i in this.clientConfig){
        res[i] = nodeMirrorConfig[i];
      };
      for(i in codeMirrorSetable){
        res["codemirror-" + i] = nodeMirrorConfig.hasOwnProperty("codemirror-" + i) ? nodeMirrorConfig["codemirror-" + i] : codeMirrorSetable[i];
      };
      def.resolve(res);
      return def;
    }
    
  });
  config = new ConfigCls();
  return config;
});
