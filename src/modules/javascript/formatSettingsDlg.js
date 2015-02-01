define([
  "dojo/_base/declare"
  , "dijit/TooltipDialog"
  , "main/clientOnly!codemirror4/theme/all"
  , "main/clientOnly!dijit/form/Select"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "dojox/layout/TableContainer"
  , "dojo/topic"
  , "main/config"
  , "dijit/form/CheckBox"
  , "modules/text/codeMirrorSettings"
  , "dijit/form/HorizontalSlider"
  , "sol/convenient/Delayed"
  
  , "codemirror4/keymap/emacs"
  , "codemirror4/keymap/vim"
], function(
  declare
  , TooltipDialog
  , allThemes
  , Select
  , array
  , lang
  , TableContainer
  , topic
  , config
  , CheckBox
  , codeMirrorSettings
  , HorizontalSlider
  , Delayed
){
  var Dlg = declare([TooltipDialog], {
    buildRendering: function(){
      this.inherited(arguments);
      var self = this;
      
      this.table = this.ownObj(new TableContainer({
        "class": "codeMirrorSettingsTable"
        , labelWidth: 220
      }));
      this.table.placeAt(this.containerNode);
      
      var onChangeFun = function(parValue){
        if (!self.startedComplete){
          return;
        };
        codeMirrorSettings.set(this.setting, parValue);
      };
      var valueSetFun = function(parValue){
        this.set("value", parValue);
      };
      var onChangeCheckBoxFun = function(parValue){
        if (!self.startedComplete){
          return;
        };
        if (this.get("checked")){
          codeMirrorSettings.set(this.setting, true);
        }else{
          codeMirrorSettings.set(this.setting, false);
        };
      };
      var valueSetCheckBoxFun = function(parValue){
        if (parValue){
          this.set("checked", true);
        }else{
          this.set("checked", false);
        };
      };
      
      var settingsStructure = [new Select({
        options: [{
          label: "jshint"
          , value: "jshint"
        },{
          label: "jscs"
          , value: "jscs"
        },{
          label: "jshint + jscs"
          , value: "jshint+jscs"
        }]
        , label: "Syntax Check"
        , setting: "javascriptSyntax"
        , valueSet: valueSetFun
        , onChange: onChangeFun
        
      }), new Select({
        options: [{
          label: "airbnb"
          , value: "airbnb"
        },{
          label: "crockford"
          , value: "crockford"
        },{
          label: "google"
          , value: "google"
        },{
          label: "jquery"
          , value: "jquery"
        },{
          label: "mdcs"
          , value: "mdcs"
        },{
          label: "wikimedia"
          , value: "wikimedia"
        },{
          label: "yandex"
          , value: "yandex"
        }]
        , label: "jscs preset"
        , setting: "jscsPreset"
        , valueSet: valueSetFun
        , onChange: onChangeFun
        
      }), new CheckBox({
        label: "format after loading"
        , setting: "autoJscsFormat"
        , valueSet: valueSetCheckBoxFun
        , onChange: onChangeCheckBoxFun
      })];


      
      
      var settingsMap = {};
      array.forEach(settingsStructure, function(entry){
        settingsMap[entry.setting] = entry;
      });
      
      var doneBoo = false;
      var handle = codeMirrorSettings.on("settings", function(settings){
        if (handle){
          handle.remove();
        };
        doneBoo = true;
        var s;
        for (s in settings){
          if (settingsMap[s]){
            settingsMap[s].valueSet(settings[s]);
          };
        };
        self.checkStarted(2);
      });
      if (doneBoo){
        handle.remove();
      };
      
      array.forEach(settingsStructure, function(entry){
        self.table.addChild(entry);
      });
      
    }
    , checkStarted: function(par){
      if (par == 1){
        this.started1 = true;
      };
      if (par == 2){
        this.started2 = true;
      };
      if (this.started1 && this.started2)
      {
        this.startedComplete = true;
      }
    }
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      var self = this;
      setTimeout(function(){
        self.checkStarted(1);
      }, 0);
    }
    , destroy: function(){
      //debugger; // this should not happen !!!
      // i shall not be destroyed !
      return;
    }
    
  });
  
  var dlg;
  return function(){
    if (!dlg){
       dlg = new Dlg({});
    };
    return dlg;
  };
});