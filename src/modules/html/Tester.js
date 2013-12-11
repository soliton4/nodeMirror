define([
  "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/ObjectInspector"
  , "dojo/_base/lang"
  , "sol/wgt/Iframe"
  , "dojo/dom-construct"
  , "sol/string"
], function(
  declare
  , BorderContainer
  , ObjectInspector
  , lang
  , Iframe
  , domConstruct
  , solString
){
  return declare([BorderContainer], {
    "class": "html tester"
    , region: "bottom"
    , gutters: false
    , splitter: true
    
    , buildRendering: function(){
      this.inherited(arguments);
      
      this.inspector = this.ownObj(new ObjectInspector({
        "class": "html inspector"
        , region: "center"
        //, value: this.iframe.get("document")
      }));
      this.inspector.region = "center";
      this.addChild(this.inspector);
      
      this.test();
    }
    
    , test: function(){
      if (this.iframe){
        this.iframe.destroy();
      };
      
      var originStr = window.location.origin;
      if (!solString.endsWith(originStr, "/")){
        originStr += "/";
      };
      originStr += "file";
      originStr += this.parent.par.id;
      
      this.iframe = this.ownObj(new Iframe({
        "class": "html iframe output"
        , region: "left"
        , splitter: true
        , src: originStr
        //, innerHTML:  "<base href=\"" + originStr + "\" />" +  this.parent.mirror.get("value")
      }));
      this.addChild(this.iframe);
      
      this.iframe.set("innerHTML", this.parent.mirror.get("value"));
      this.inspector.set("value", this.iframe.get("document"));
    }
    , codeChanged: function(){}
  });
});