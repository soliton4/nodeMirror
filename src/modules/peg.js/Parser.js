define([
  "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/CodeMirror"
  , "sol/wgt/ObjectInspector"
  , "peg/Peg"
  , "dojo/_base/lang"
], function(
  declare
  , BorderContainer
  , CodeMirror
  , ObjectInspector
  , Peg
  , lang
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
      this.mirror.on("change", lang.hitch(this, function(){
        if (this._started){
          this.parse();
        };
      }));
      
      this.inspector = this.ownObj(new ObjectInspector({
        "class": "pegjs output"
        , region: "center"
        , value: undefined
        , expandlevel: 0
      }));
      this.inspector.region = "center";
      this.addChild(this.inspector);
    }
    , parse: function(){
      if (!this.parserCode){
        this.parserCode = this.parent.mirror.get("value");
        this.parser = Peg.buildParser(this.parserCode);
      };
      
      try{
        var parsed = this.parser.parse(this.mirror.get("value"));
        this.inspector.set("name", "result");
        this.inspector.set("value", parsed);
      }catch(e){
        this.inspector.set("name", "error");
        this.inspector.set("value", e);
      }
    }
    , parserCodeChanged: function(){
      this.parserCode = this.parent.mirror.get("value");
      this.parser = Peg.buildParser(this.parserCode);
    }
  });
});