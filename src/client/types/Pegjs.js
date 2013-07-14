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
  , "./Text"
  , "./promiseLand/Analyzer"
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
  , TypeText
  , Analyzer
  , MenuItem
){
  return declare([
    TypeText
  ], {
    "class": "content text pegjs"
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      this.parseBtn = this.ownObj(new MenuItem({
        //iconClass: "dijitAdditionalEditorIconSave"
        //, showLabel: false
        onClick: lang.hitch(this, "parse")
        , label: "parse"
      })); 
      this.menu.addChild(this.parseBtn);
      return ret;
    }
    
    , parse: function(){
      if (!this.parser){
        this.parser = this.ownObj(new Parser({
          
        }));
        this.addChild(this.parser);
      }
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      
    }
  });
});
