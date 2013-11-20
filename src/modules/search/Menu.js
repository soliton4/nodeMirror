define([
  "dojo/_base/declare"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/form/Button"
  , "sol/fileName"
  , "dojo/date/locale"
  , "dojo/dom-class"
  , "dojo/dom-geometry"
  , "sol/convenient/SceduleExec"
  , "dojo/_base/array"
  , "sol/scroll"
  , "dojo/dom-style"
  , "dojox/layout/TableContainer"
  , "dijit/form/TextBox"
], function(
  declare
  , domConstruct
  , lang
  , topic
  , Button
  , fileName
  , locale
  , domClass
  , domGeo
  , SceduleExec
  , array
  , scroll
  , domStyle
  , TableContainer
  , TextBox
){
  
  return declare([
    TableContainer
  ], {
    
    region: "top"
    
    , constructor: function(){
      
    }
    , buildRendering: function(){
      this.inherited(arguments);
      
      this.folder = this.ownObj(new TextBox({
        label: "folder"
        , value: this.dir
      }));
      this.addChild(this.folder);
      
      this.phrase = this.ownObj(new TextBox({
        label: "phrase"
      }));
      this.addChild(this.phrase);
    }
    
    , _getSearchAttr: function(){
      return {
        dir: this.folder.get("value")
        , phrase: this.phrase.get("value")
      };
    }
    
    , resize: function(){
      //debugger;
      var ret = this.inherited(arguments);
      return ret;
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
    }
    
  });
  
});
