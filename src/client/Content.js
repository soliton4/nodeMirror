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
    }
    , startup: function(){
      if (this._started) { return; };
      this.inherited(arguments);
      this.load();
    }
    
    , reload: function(){
      this.load();
    }
    
    , load: function(){
      contentIO.getContentDef(this.item.id).then(lang.hitch(this, function(res){
        if (this.contentType == res.contentType){
          if (this.wgt){
            this.wgt.set("content", res);
          };
          return;
        };
        if (this.wgt){
          this.wgt.destroy();
        };
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
