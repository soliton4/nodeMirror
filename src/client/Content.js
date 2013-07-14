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
      contentIO.getContentDef(this.item.id).then(lang.hitch(this, function(res){
        if (res.contentType == "inode/directory"){
          var d = this.ownObj(new Directory({
            content: res
            , contentObj: this
          }));
          d.placeAt(this.domNode);
          d.startup();
        }else if(res.isText){
          var Class = Text;
          if (res.contentType == "application/promiseLand"){
            Class = PromiseLand;
          };
          if (res.contentType == "application/peg.js"){
            Class = Pegjs;
          };
          var t = this.ownObj(new Class({
            content: res
            , contentObj: this
          }));
          t.placeAt(this.domNode);
          t.startup();
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
