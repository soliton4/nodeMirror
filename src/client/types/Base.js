define([
  "dojo/_base/declare"
  , "sol/fileName"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
  , "dijit/layout/BorderContainer"
  , "dijit/Toolbar"
  , "dijit/form/Button"
  , "main/contentIO"
  , "dojo/io/iframe"
], function(
  declare
  , fileName
  , domConstruct
  , lang
  , BorderContainer
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
      
      this._buttons = {};
      
      if (this.savebutton){
        this._buttons.saveButton = this.ownObj(new Button({
          iconClass: "dijitAdditionalEditorIconSave"
          , onClick: lang.hitch(this, "save")
          , label: "save"
        }));
        this.menu.addChild(this._buttons.saveButton);
      };
      
      if (this.reloadbutton){
        this._buttons.reloadButton = this.ownObj(new Button({
          onClick: lang.hitch(this, "reload")
          , label: "reload"
        }));
        this.menu.addChild(this._buttons.reloadButton);
      };
      
      if (this.downloadbutton){
        this._buttons.downLoadButton = this.ownObj(new Button({
          onClick: lang.hitch(this, "download")
          , label: "download"
        }));
        this.menu.addChild(this._buttons.downLoadButton);
      };
      
      return ret;
    }
    
    , reload: function(){
      this.contentObj.reload();
    }
    
    , save: function(){
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
    
  });
});
