define([
  "dojo/_base/declare"
  , "sol/fileName"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/CodeMirror"
  , "dijit/Toolbar"
  , "dijit/form/Button"
  , "main/contentIO"
  , "dijit/MenuItem"
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
  , BorderContainer
  , CodeMirror
  , Toolbar
  , Button
  , contentIO
  , MenuBarItem
){
  return declare([
    BorderContainer
  ], {
    "class": "content text"
    , gutters: false
    , content: {} // will be provided
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      this.menu = this.ownObj(new Toolbar({
        region: "top"
      }));
      this.addChild(this.menu);
      
      this.saveButton = this.ownObj(new Button({
        iconClass: "dijitAdditionalEditorIconSave"
        //, showLabel: false
        , onClick: lang.hitch(this, "save")
        , label: "save"
      }));
      this.menu.addChild(this.saveButton);
      
      this.reloadButton = this.ownObj(new Button({
        //iconClass: "dijitAdditionalEditorIconSave"
        onClick: lang.hitch(this, "reload")
        , label: "reload"
      }));
      this.menu.addChild(this.reloadButton);
      
      this.mirror = this.ownObj(new CodeMirror({
        region: "center"
        , value: this.content.text
        , mode: this.content.contentType
        , lineNumbers: true
        , theme: "twilight"
        , matchBrackets: true
      }));
      this.addChild(this.mirror);
      return ret;
    }
    
    , _setContentAttr: function(parContent){
      this._set("content", parContent);
      if (this.mirror){
        this.mirror.set("value", this.content.text);
        this.mirror.set("mode", this.content.contentType);
      };
    }
    
    , reload: function(){
      this.contentObj.reload();
    }
    
    , save: function(){
      contentIO.saveTextDef(this.content.id, this.mirror.get("value"));
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      
    }
  });
});
