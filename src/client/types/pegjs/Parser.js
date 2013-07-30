define([
  "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/CodeMirror"
  , "sol/wgt/ObjectInspector"
], function(
  declare
  , BorderContainer
  , CodeMirror
  , ObjectInspector
){
  return declare([BorderContainer], {
    "class": "pegjs parser"
    , region: "right"
    , gutters: false
    , splitter: true
    , buildRendering: function(){
      this.inherited(arguments);
      this.mirror = this.ownObj(new CodeMirror({
        "class": "pegjs input"
        , region: "top"
        , splitter: true
      }));
      this.addChild(this.mirror);
      
      this.inspector = this.ownObj(new ObjectInspector({
        "class": "pegjs output"
        , region: "center"
        , value: {
          bla1: 1
          , bla2: "s"
        }
      }));
      this.inspector.region = "center";
      debugger;
      this.addChild(this.inspector);
    }
  });
});