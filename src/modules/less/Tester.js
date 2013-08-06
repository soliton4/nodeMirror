define([
  "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/ObjectInspector"
  , "dojo/_base/lang"
  , "sol/wgt/Iframe"
  , "dojo/dom-construct"
  , "sol/wgt/CodeMirror"
], function(
  declare
  , BorderContainer
  , ObjectInspector
  , lang
  , Iframe
  , domConstruct
  , CodeMirror
){
  return declare([BorderContainer], {
    "class": "less tester"
    , region: "right"
    , gutters: false
    , splitter: true
    , buildRendering: function(){
      this.inherited(arguments);
      this.mirror = this.ownObj(new CodeMirror({
        "class": "less output"
        , mode: "text/css"
        , region: "center"
        , readOnly: true
        //, splitter: true
      }));
      this.addChild(this.mirror);
    }
    , _setValueAttr: function(parValue){
      this.mirror.set("value", parValue);
    }
    , codeChanged: function(){}
  });
});