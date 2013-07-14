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
){
  return declare([
    TypeText
  ], {
    "class": "content text promiseland"
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      this.analyzeBtn = this.ownObj(new MenuItem({
        //iconClass: "dijitAdditionalEditorIconSave"
        //, showLabel: false
        onClick: lang.hitch(this, "analyze")
        , label: "analyze"
      })); 
      this.menu.addChild(this.analyzeBtn);
      return ret;
    }
    
    , analyze: function(){
      if (!this.analyzer){
        this.analyzer = this.ownObj(new Analyzer({
          
        }));
        this.addChild(this.analyzer);
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
