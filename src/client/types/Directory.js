define([
  "dojo/_base/declare"
  , "dgrid/Grid"
  , "sol/fileName"
  , "dgrid/extensions/DijitRegistry"
  , "dojo/dom-construct"
  , "dgrid/Selection"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/layout/BorderContainer"
  , "dijit/MenuBar"
  , "dijit/form/Button"
  , "dijit/Dialog"
  , "dijit/form/TextBox"
  , "main/contentIO"
  , "dijit/MenuItem"
  , "dijit/MenuBarItem"
], function(
  declare
  , Grid
  , fileName
  , DijitRegistry
  , domConstruct
  , Selection
  , lang
  , topic
  , BorderContainer
  , MenuBar
  , Button
  , Dialog
  , TextBox
  , contentIO
  , MenuItem
  , MenuBarItem
){
  var DirGrid = declare([
        Grid, DijitRegistry, Selection
  ], {
    content: {} // will be provided
    , region: "center"
    , columns: {
        id: {
            label: "Name"
            , get: function(object){
                return fileName.single(object.id);
            }
        },
        contentType: {
            label: "Content Type"
        }
    }
    , selectionMode: "single"
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      this.renderArray(this.content.children);
      this.on(".dgrid-row:click", lang.hitch(this, function(evt){
        var row = this.row(evt);
        topic.publish("client/openid", {
          item: row.data
          , insteadOf: this.contentObj
        });
        // row.element == the element with the dgrid-row class
        // row.id == the identity of the item represented by the row
        // row.data == the item represented by the row
      }));
    }
    , isLeftToRight: function(){
      return true;
    }
    , placeAt: function(parNode, par2){
      domConstruct.place(this.domNode, parNode, par2);
    }
  });
  
  var NewDlg = declare([Dialog], {
    title: "create new File"
    , constructor: function(){
    }
    , buildRendering: function(){
      this.inherited(arguments);
      this.nameBox = this.ownObj(new TextBox({
      }));
      this.nameBox.placeAt(this.containerNode);
      this.okBtn = this.ownObj(new Button({
        label: "ok"
        , onClick: lang.hitch(this, function(){
          contentIO.createFileDef(this.contentDirObj.content.id, this.nameBox.get("value"), this.newDir).then(lang.hitch(this, function(parItem){
            topic.publish("client/openid", {
              item: parItem
              , insteadOf: this.contentObj
            });
          }));
          this.destroy();
        })
      }));
      this.okBtn.placeAt(this.containerNode);
    }
    , postMixInProperties: function(){
      this.inherited(arguments);
      if (this.newDir){
        this.title = "create new Directory";
      };
    }
  });
  
  return declare([
    BorderContainer
  ], {
    "class": "content dir"
    , gutters: false
    , content: {} // will be provided
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      this.menu = this.ownObj(new MenuBar({
        "class": "contentMenu zeroBorder"
        , gutters: false
        , region: "top"
      }));
      this.addChild(this.menu);
      
      this.newDirButton = this.ownObj(new MenuBarItem({
        label: "new Directory"
        , showLabel: true
        , onClick: lang.hitch(this, "createNew", true)
        , region: "left"
      }));
      this.menu.addChild(this.newDirButton);
      
      this.newButton = this.ownObj(new MenuBarItem({
        label: "new File"
        , showLabel: true
        , onClick: lang.hitch(this, "createNew", false)
        , region: "left"
      }));
      this.menu.addChild(this.newButton);
      
      this.grid = this.ownObj(new DirGrid({
        content: this.content
        , contentObj: this.contentObj
      }));
      this.addChild(this.grid);
      return ret;
    }
    , createNew: function(parDir){
      var dlg = new NewDlg({
        newDir: parDir
        , contentDirObj: this
        , contentObj: this.contentObj
      });
      dlg.startup();
      dlg.show();
    }
  });
  
});
