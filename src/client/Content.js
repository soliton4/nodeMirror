define([
  "dojo/_base/declare"
  , "dijit/layout/ContentPane"
  , "main/contentIO"
  , "./types/Directory"
  , "./types/Text"
  , "dojo/_base/lang"
  , "sol/fileName"
  , "./types/PromiseLand"
  , "./types/Pegjs"
  , "./types/Download"
], function(
  declare
  , ContentPane
  , contentIO
  , Directory
  , Text
  , lang
  , fileName
  , PromiseLand
  , Pegjs
  , Download
){
  return declare([
    ContentPane
  ], {
    "class": "mainContentPane"
    , item: {} // will be provided
    , closable: true
    , postMixInProperties: function(){
      this.inherited(arguments);
      this.title = fileName.single(this.item.name || this.item.id);
      this.originalTitle = this.title;
    }
    , startup: function(){
      if (this._started) { return; };
      this.inherited(arguments);
      this.load();
      this.on("close", lang.hitch(this, "_onClose"));
    }
    
    , reload: function(){
      this.load();
    }
    
    , _setDirtyAttr: function(parDirty){
      this._set("dirty", parDirty);
      if (this.dirty){
        this.set("title", this.originalTitle + " *");
      }else{
        this.set("title", this.originalTitle);
      };
    }
    
    , _onClose: function(){
      if (this.wgt && this.wgt.onClose){
        return this.wgt.onClose();
      };
      return true;
    }
    
    , load: function(){
      contentIO.getContentDef(this.item.id).then(lang.hitch(this, function(res){
        if (this.contentType == res.contentType){
          if (this.wgt){
            this.wgt.set("content", res);
          };
          this.set("dirty", false);
          return;
        };
        if (this.wgt){
          this.wgt.destroy();
        };
        this.set("dirty", false);
        this.contentType = res.contentType;
        if (res.contentType == "inode/directory"){
          this.wgt = this.ownObj(new Directory({
            content: res
            , contentObj: this
          }));
          this.wgt.placeAt(this.domNode);
          this.wgt.startup();
        }else if(res.isText){
          var Class = Text;
          if (res.contentType == "application/promiseLand"){
            Class = PromiseLand;
          };
          if (res.contentType == "application/peg.js"){
            Class = Pegjs;
          };
          this.wgt = this.ownObj(new Class({
            content: res
            , contentObj: this
          }));
          this.wgt.placeAt(this.domNode);
          this.wgt.startup();
        }else if(res.download){
          this.wgt = this.ownObj(new Download({
            content: res
            , contentObj: this
          }));
          this.wgt.placeAt(this.domNode);
          this.wgt.startup();
        };
        this.resize();
      }));
    }
    
    , removeMe: function(){}
    
    , onClose: function(){
      this.removeMe();
      return true;
    }
    /*, destroy: function(){
      debugger;
      this.inherited(arguments);
    }
    , destroyRecursive: function(){
      debugger;
      this.inherited(arguments);
    }*/
  });
});
