define([
  "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/ObjectInspector"
  , "dojo/_base/lang"
  , "sol/wgt/Iframe"
  , "dojo/dom-construct"
  , "sol/wgt/CodeMirror"
  , "modules/text/codeMirrorSettings"
  
], function(
  declare
  , BorderContainer
  , ObjectInspector
  , lang
  , Iframe
  , domConstruct
  , CodeMirror
  , codeMirrorSettings
){
  return declare([BorderContainer], {
    "class": "less tester"
    , region: "right"
    , gutters: false
    , splitter: true
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
      this.mirror = this.ownObj(new CodeMirror({
        "class": "less output"
        , mode: "text/css"
        , region: "center"
        , readOnly: true
        //, splitter: true
      }));
      this.addChild(this.mirror);
      this.ownObj(codeMirrorSettings.on("settings", function(settings){
        self.mirror.set("theme", settings.theme);
      }));
    }
    , _setValueAttr: function(parValue){
      this.mirror.set("value", parValue);
    }
    , codeChanged: function(){}
  });
});