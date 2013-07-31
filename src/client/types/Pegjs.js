define([
  "dojo/_base/declare"
  , "sol/fileName"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/CodeMirror"
  , "dijit/form/Button"
  , "main/contentIO"
  , "./Text"
  , "./pegjs/Parser"
], function(
  declare
  , fileName
  , domConstruct
  , lang
  , topic
  , BorderContainer
  , CodeMirror
  , Button
  , contentIO
  , TypeText
  , Parser
){
  return declare([
    TypeText
  ], {
    "class": "content text pegjs"
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      this.parseBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "parse")
        , label: "parse"
      })); 
      this.menu.addChild(this.parseBtn);
      return ret;
    }
    
    , parse: function(){
      if (!this.parser){
        this.parser = this.ownObj(new Parser({
          parent: this
        }));
        this.addChild(this.parser);
        this.mirror.on("change", lang.hitch(this, function(){
          this.parser.parserCodeChanged();
        }));
      };
      this.parser.parse();
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      
    }
  });
});
