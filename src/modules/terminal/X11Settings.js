define([
  "dojo/_base/declare"
  , "dijit/TooltipDialog"
  , "dijit/form/Select"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "dojox/layout/TableContainer"
  , "dojo/topic"
  , "main/config"
  , "dijit/form/CheckBox"
  , "dijit/form/NumberSpinner"
  , "sol/convenient/Delayed"
], function(
  declare
  , TooltipDialog
  , Select
  , array
  , lang
  , TableContainer
  , topic
  , config
  , CheckBox
  , NumberSpinner
  , Delayed
){
  return declare([TooltipDialog], {
    applyChange: function(){} // override
    
    , buildRendering: function(){
      this.inherited(arguments);
      var self = this;
      
      this.applyConfig = new Delayed({
        delay: 3000
      }, function(){
        self.applyChange();
      });
      
      this.table = this.ownObj(new TableContainer({
        "class": "codeMirrorSettingsTable"
        , labelWidth: 220
      }));
      this.table.placeAt(this.containerNode);
      
      var onChangeFun = function(parValue){
        if (!self.startedComplete){
          return;
        };
        config.set(this.setting, parValue);
        self.applyConfig.exec();
      };
      var valueSetFun = function(parValue){
        this.set("value", parValue);
      };
      var onChangeCheckBoxFun = function(parValue){
        if (!self.startedComplete){
          return;
        };
        if (this.get("checked")){
          config.set(this.setting, true);
        }else{
          config.set(this.setting, false);
        };
        self.applyConfig.exec();
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
          label: "ogg"
          , value: "ogg"
        }, {
          label: "webm"
          , value: "webm"
        }, {
          label: "h264"
          , value: "h264"
        }]
        , label: "Format"
        , setting: "x11format"
        , valueSet: valueSetFun
        , onChange: onChangeFun
        
      }), new NumberSpinner({
        label: "fps"
        , setting: "x11fps"
        , valueSet: valueSetFun
        , onChange: onChangeFun
        
      }), new NumberSpinner({
        label: "Quality"
        , setting: "x11quality"
        , valueSet: valueSetFun
        , onChange: onChangeFun
        
      }), new NumberSpinner({
        label: "target Bitrate"
        , setting: "x11targetrate"
        , valueSet: valueSetFun
        , onChange: onChangeFun
        
      }), new Select({
        options: [{
          label: "no extra thread"
          , value: "0"
        }, {
          label: "one worker thread"
          , value: "1"
        }, {
          label: "split video in 4 threads"
          , value: "4"
        }]
        , label: "h264 threaded rendering"
        , setting: "x11h264threads"
        , valueSet: valueSetFun
        , onChange: onChangeFun
        
      })];
      
      var settingsMap = {};
      array.forEach(settingsStructure, function(entry){
        settingsMap[entry.setting] = entry;
      });
      
      var _counter = 0;
      var incFun = function(){
        _counter++;
      };
      var decFun = function(){
        _counter--;
        if (!_counter){
          self.startedComplete = true;
        };
      };
      
      
      var applySetting = function(setting){
        incFun();
        config.get(setting).then(function(value){
          settingsMap[setting].valueSet(value);
          decFun();
        });
      };
      
      incFun();
        var s;
        for (s in settingsMap){
          applySetting(s);
        };
      setTimeout(decFun, 1000);
      
      array.forEach(settingsStructure, function(entry){
        self.table.addChild(entry);
      });
      
    }
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
    }
    /*, destroy: function(){
      //debugger; // this should not happen !!!
      // i shall not be destroyed !
      return;
    }*/
    
  });
  
});