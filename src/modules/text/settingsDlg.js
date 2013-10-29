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
){
  Dlg = declare([TooltipDialog], {
    buildRendering: function(){
      this.inherited(arguments);
      
      this.table = this.ownObj(new TableContainer({
        
      }));
      this.table.placeAt(this.containerNode);
      
      this.themeSelect = this.ownObj(new Select({
        options: array.map(allThemes, function(theme){
          return {
            label: theme
            , value: theme
          };
        })
        , label: "Color Theme"
        , onChange: lang.hitch(this, "changeTheme")
      }));
      this.table.addChild(this.themeSelect);
      config.get("theme").then(lang.hitch(this, function(theme){
        this.themeSelect.set("value", theme);
      }));
      
      this.autoCloseBracketsChk = new CheckBox({
        label: "close Brackets"
        , onChange: function(){
          config.set("codemirrorAutoCloseBrackets", this.get("checked"));
          topic.publish("files/codemirror/changeSetting", {
            setting: "autoCloseBrackets"
            , value: this.get("checked")
          });
        }
      });
      this.table.addChild(this.autoCloseBracketsChk);
    }
    
    , changeTheme: function(){
      //this.mirror.set("theme", this.themeSelect.get("value"));
      config.set("theme", this.themeSelect.get("value"));
      topic.publish("files/codemirror/theme/change", this.themeSelect.get("value"));
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