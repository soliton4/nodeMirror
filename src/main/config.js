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
      , "seepinkpies": true
      , "music": true
      , "webpath": "/"
      , "theme": "claro"
      , "tabposition": "top"
      , "treefiles": false
      , "dirColorCode": false
      , "dirViewMode": "list"
      , "x11terminal": false
      , "x11format": "ogg"
      , "x11fps": 5
      , "x11quality": 5
      , "x11maxrate": "100k"
      , "x11preset": "medium"
      , "x11h264threads": "0"
      , "hide-sidebar": false
      , "hide-contenttabs": false
      , "x11-autostart": false
    }
    , saveable: {
      "theme": true
    , "tabposition": true
    , "treefiles": true
    , "dirColorCode": true
    , "dirViewMode": true
    , "x11format": true
    , "x11fps": true
    , "x11quality": true
    , "x11maxrate": true
    , "x11preset": true
    , "x11h264threads": true
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
      //console.log("calling set!!!");
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
      var requestAr = [];
      var i = 0;
      for (i = 0; i < arguments.length; ++i){
        requestAr.push(arguments[i]);
      };
      var def = new Deferred();
      if (isServer){
        def.resolve(this.config[parName]);
      }else{
        this.configLoaded.then(lang.hitch(this, function(){
          if (requestAr.length > 1){
            var res = {};
            for (i = 0; i < requestAr.length; ++i){
              res[requestAr[i]] = this.config[requestAr[i]];
            };
            def.resolve(res);
          }else{
            def.resolve(this.config[parName]);
          };
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
