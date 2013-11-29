define([
  "dojo/_base/declare"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/form/Button"
  , "dijit/Dialog"
  , "sol/wgt/TextBox"
  , "client/globals"
], function(
  declare
  , domConstruct
  , lang
  , topic
  , Button
  , Dialog
  , TextBox
  , globals
){
  
  return declare([Dialog], {
    title: "create new File"
    , constructor: function(){
    }
    , buildRendering: function(){
      this.inherited(arguments);
      
      var okFun = lang.hitch(this, function(){
        this.parent.createFilePs(this.parent.par, this.nameBox.get("value"), this.newDir).then(lang.hitch(this, function(content){
          globals.openContent({
            par: content.par
            , content: content
            , instead: this.parent
          });
          this.destroy();
        }));
      });
      
      this.nameBox = this.ownObj(new TextBox({
        onEnterPressed: okFun
      }));
      this.nameBox.placeAt(this.containerNode);
      this.okBtn = this.ownObj(new Button({
        label: "ok"
        , onClick: okFun
      }));
      this.okBtn.placeAt(this.containerNode);
    }
    , postMixInProperties: function(){
      this.inherited(arguments);
      if (this.newDir){
        this.title = "create new Folder";
      };
    }
  });
  
});
