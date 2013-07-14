define([
  "dojo/_base/declare"
  , "sol/fileName"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/CodeMirror"
  , "dijit/MenuBar"
  , "dijit/form/Button"
  , "main/contentIO"
  , "dijit/MenuItem"
], function(
  declare
  , fileName
  , domConstruct
  , lang
  , topic
  , BorderContainer
  , CodeMirror
  , MenuBar
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
      this.menu = this.ownObj(new MenuBar({
        region: "top"
      }));
      this.addChild(this.menu);
      
      this.saveButton = this.ownObj(new MenuBarItem({
        iconClass: "dijitAdditionalEditorIconSave"
        //, showLabel: false
        , onClick: lang.hitch(this, "save")
        , label: "save"
      }));
      this.menu.addChild(this.saveButton);
      
      this.mirror = this.ownObj(new CodeMirror({
        region: "center"
        , value: this.content.text
        , mode: this.content.contentType
        , lineNumbers: true
        , theme: "night"
      }));
      this.addChild(this.mirror);
      return ret;
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
