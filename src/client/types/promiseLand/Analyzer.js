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
  , MenuItem
){
  return declare([
    BorderContainer
  ], {
    "class": "analyzer"
    , gutters: false
    , region: "right"
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      return ret;
    }
    
    , analyze: function(parStr){
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      
    }
  });
});
