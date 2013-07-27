define([
  "dojo/_base/declare"
  , "sol/fileName"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/CodeMirror"
  , "dijit/Toolbar"
  , "dijit/form/Button"
  , "main/contentIO"
  , "dojo/io/iframe"
], function(
  declare
  , fileName
  , domConstruct
  , lang
  , topic
  , BorderContainer
  , CodeMirror
  , Toolbar
  , Button
  , contentIO
  , iframe
){
  return declare([
    BorderContainer
  ], {
    "class": "content text"
    , gutters: false
    , content: {} // will be provided
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      this.menu = this.ownObj(new Toolbar({
        region: "top"
      }));
      this.addChild(this.menu);
      
      this.downLoadButton = this.ownObj(new Button({
        onClick: lang.hitch(this, "download")
        , label: "download"
      }));
      this.menu.addChild(this.downLoadButton);
      
      return ret;
    }
    
    , _setContentAttr: function(parContent){
      this._set("content", parContent);
    }
    
    , download: function(){
      //var iframeInstance = new iframe();
      iframe.send({
        url: "/download",
        handleAs: "html",
        content: {
          id: this.content.id
        }
      });
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      
    }
  });
});
