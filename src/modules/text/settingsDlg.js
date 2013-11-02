define([
  "dojo/_base/declare"
  , "dijit/TooltipDialog"
  , "main/clientOnly!codemirror/theme/all"
  , "main/clientOnly!dijit/form/Select"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "dojox/layout/TableContainer"
  , "dojo/topic"
  , "main/config"
  , "dijit/form/CheckBox"
  , "modules/text/codeMirrorSettings"
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
){
  Dlg = declare([TooltipDialog], {
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
        options: array.map(allThemes, function(theme){
          return {
            label: theme
            , value: theme
          };
        })
        , label: "Color Theme"
        , setting: "theme"
        , valueSet: valueSetFun
        , onChange: onChangeFun
        
      }), new CheckBox({
        label: "close Brackets"
        , setting: "autoCloseBrackets"
        , valueSet: valueSetCheckBoxFun
        , onChange: onChangeCheckBoxFun
        
      }), new CheckBox({
        label: "match Tags"
        , setting: "matchTags"
        , valueSet: valueSetCheckBoxFun
        , onChange: onChangeCheckBoxFun
        
      }), new CheckBox({
        label: "show trailing Space"
        , setting: "showTrailingSpace"
        , valueSet: valueSetCheckBoxFun
        , onChange: onChangeCheckBoxFun
        
      }), new CheckBox({
        label: "close Tags"
        , setting: "autoCloseTags"
        , valueSet: valueSetCheckBoxFun
        , onChange: onChangeCheckBoxFun
        
      }), new CheckBox({
        label: "Code folding"
        , setting: "foldGutter"
        , valueSet: valueSetCheckBoxFun
        , onChange: onChangeCheckBoxFun
        
      }), new CheckBox({
        label: "Ctrl+Space auto complete"
        , setting: "autoComplete"
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
    
  });
  
  var dlg;
  return function(){
    if (!dlg){
       dlg = new Dlg({});
    };
    return dlg;
  };
});