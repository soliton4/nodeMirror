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
        
      }), new Select({
        options: [{
          label: "50 kb/s"
          , value: "50k"
        }, {
          label: "75 kb/s"
          , value: "75k"
        }, {
          label: "100 kb/s"
          , value: "100k"
        }, {
          label: "150 kb/s"
          , value: "150k"
        }, {
          label: "200 kb/s"
          , value: "200k"
        }, {
          label: "250 kb/s"
          , value: "250k"
        }, {
          label: "300 kb/s"
          , value: "300k"
        }, {
          label: "400 kb/s"
          , value: "400k"
        }, {
          label: "500 kb/s"
          , value: "500k"
        }, {
          label: "750 kb/s"
          , value: "750k"
        }, {
          label: "1 mb/s"
          , value: "1000k"
        }, {
          label: "1.5 mb/s"
          , value: "1500k"
        }, {
          label: "2 mb/s"
          , value: "2000k"
        }, {
          label: "2.5 mb/s"
          , value: "2500k"
        }, {
          label: "3 mb/s"
          , value: "3000k"
        }, {
          label: "4 mb/s"
          , value: "4000k"
        }, {
          label: "5 mb/s"
          , value: "5000k"
        }, {
          label: "7.5 mb/s"
          , value: "7500k"
        }, {
          label: "10 mb/s"
          , value: "10m"
        }, {
          label: "15 mb/s"
          , value: "15m"
        }, {
          label: "20 mb/s"
          , value: "20m"
        }, {
          label: "25 mb/s"
          , value: "25m"
        }, {
          label: "30 mb/s"
          , value: "30m"
        }, {
          label: "40 mb/s"
          , value: "40m"
        }, {
          label: "50 mb/s"
          , value: "50m"
        }, {
          label: "75 mb/s"
          , value: "75m"
        }, {
          label: "100 mb/s"
          , value: "100m"
        }, {
          label: "150 mb/s"
          , value: "150m"
        }, {
          label: "200 mb/s"
          , value: "200m"
        }, {
          label: "250 mb/s"
          , value: "250m"
        }, {
          label: "unlimited"
          , value: "unlimited"
        }]
        , label: "max Bitrate"
        , setting: "x11maxrate"
        , valueSet: valueSetFun
        , onChange: onChangeFun
        
      }), new Select({
        options: [{
          label: "low latency / high bandwith or low quality"
          , value: "ultrafast"
        }, {
          label: "medium"
          , value: "medium"
        }, {
          label: "bandwith optimization / high quality"
          , value: "veryslow"
        }]
        , label: "latency / quality"
        , setting: "x11preset"
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