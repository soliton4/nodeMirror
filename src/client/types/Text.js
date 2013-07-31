define([
  "dojo/_base/declare"
  , "sol/fileName"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "sol/wgt/CodeMirror"
  , "dijit/Toolbar"
  , "dijit/form/Button"
  , "main/contentIO"
  , "./Base"
  , "codemirror/theme/all"
  , "dijit/form/Select"
  , "dojo/_base/array"
  , "main/config"
  , "codemirror/mode/allModes"
  , "codemirror/addon/dialog/dialog"
  , "codemirror/addon/search/search"
  , "codemirror/addon/search/searchcursor"
  , "codemirror/addon/edit/matchbrackets"
], function(
  declare
  , fileName
  , domConstruct
  , lang
  , topic
  , CodeMirror
  , Toolbar
  , Button
  , contentIO
  , Base
  , allThemes
  , Select
  , array
  , config
){
  return declare([
    Base
  ], {
    "class": "content text"
    , savebutton: true
    , reloadbutton: true
    , downloadbutton: true
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      
      this.themeSelect = this.ownObj(new Select({
        options: array.map(allThemes, function(theme){
          return {
            label: theme
            , value: theme
          };
        })
        , onChange: lang.hitch(this, "changeTheme")
      }));
      this.menu.addChild(this.themeSelect);
      
      this.mirror = this.ownObj(new CodeMirror({
        region: "center"
        , value: this.content.text
        , mode: this.content.contentType
        , lineNumbers: true
        , theme: "twilight"
        , matchBrackets: true
      }));
      this.addChild(this.mirror);
      this.mirror.on("change", lang.hitch(this, function(){
        if (this._started){
          this.contentObj.set("dirty", true);
        };
      }));
      config.get("theme").then(lang.hitch(this, function(theme){
        this.mirror.set("theme", theme);
        this.themeSelect.set("value", theme);
      }));
      return ret;
    }
    
    , changeTheme: function(){
      this.mirror.set("theme", this.themeSelect.get("value"));
      config.set("theme", this.themeSelect.get("value"));
    }
    
    , _setContentAttr: function(parContent){
      this._set("content", parContent);
      if (this.mirror){
        this.mirror.set("value", this.content.text);
        this.mirror.set("mode", this.content.contentType);
      };
    }
    
    
    , save: function(){
      var def = contentIO.saveTextDef(this.content.id, this.mirror.get("value"));
      def.then(lang.hitch(this, function(){
          this.contentObj.set("dirty", false);
      }));
      return def;
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
    }
  });
});
