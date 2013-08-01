define([
  "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/ObjectInspector"
  , "dojo/_base/lang"
  , "sol/wgt/Iframe"
  , "dojo/dom-construct"
], function(
  declare
  , BorderContainer
  , ObjectInspector
  , lang
  , Iframe
  , domConstruct
){
  return declare([BorderContainer], {
    "class": "html tester"
    , region: "bottom"
    , gutters: false
    , splitter: true
    , buildRendering: function(){
      this.inherited(arguments);
      this.iframe = this.ownObj(new Iframe({
        "class": "html iframe output"
        , region: "left"
        , splitter: true
        , innerHTML: this.parent.mirror.get("value")
      }));
      this.addChild(this.iframe);
      
      this.inspector = this.ownObj(new ObjectInspector({
        "class": "html inspector"
        , region: "center"
        , value: this.iframe.get("document")
      }));
      this.inspector.region = "center";
      this.addChild(this.inspector);
    }
    , test: function(){
      this.iframe.set("innerHTML", this.parent.mirror.get("value"));
      this.inspector.set("value", this.iframe.get("document"));
    }
    , codeChanged: function(){}
  });
});