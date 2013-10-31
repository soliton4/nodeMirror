define([
  "main/config"
  , "./codeMirrorSetable"
  , "dojo/Deferred"
  , "dojo/aspect"
], function(
  config
  , codeMirrorSetable
  , Deferred
  , aspect
){
  
  var loadedSettings = {};
  var settingsDef = new Deferred();
  
  var valCnt = 1;
  var checkValCnt = function(){
    if (valCnt){
      return;
    };
    settingsDef.resolve(loadedSettings);
  };
  var getValue = function(parValue){
    config.get("codemirror-" + parValue).then(function(value){
      --valCnt;
      loadedSettings[parValue] = value;
      checkValCnt();
    });
  };
  
  for (var valname in codeMirrorSetable){
    ++valCnt;
    getValue(valname);
  };
  --valCnt;
  checkValCnt();
  
  var resolved = false;
  settingsDef.then(function(settings){
    resolved = true;
  });
  
  var obj = {
    on: function(parWhat, parFun){
      if (parWhat == "settings"){
        if (resolved){
          settingsDef.then(function(settings){
            parFun(settings);
          });
        };
        return aspect.after(this, "_settings", parFun, true);
      };
    }
    , _settings: function(parSettings){
    }
    , set: function(parName, parValue){
      settingsDef.then(function(settings){
        settings[parName] = parValue;
        config.set("codemirror-" + parName, parValue);
        obj._settings(settings);
      });
    }
  };
  
  settingsDef.then(function(settings){
    obj._settings(settings);
  });
  
  return obj;
});