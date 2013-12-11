define([
  "dojo/_base/declare"
  , "dijit/_WidgetBase"
  , "sol/wgt/mixin/resize"
  , "dojo/dom-construct"
], function(
  declare
  , _WidgetBase
  , resizeMixin
  , domConstruct
){
  return declare([_WidgetBase, resizeMixin], {
    resize: function(){
      this.inherited(arguments);
      this.load();
    }
    , load: function(par){
      var self = this;
      this.par = par || this.par;
      if (!this.par){
        return;
      };
      if (!(this._contentBox.w && this._contentBox.h)){
        return;
      };
      this.module.getBase64Ps(this.par.id, {
        width: this._contentBox.w
        , height: this._contentBox.h
      }).then(function(base64Src){
        if (self.imgNode){
          domConstruct.destroy(self.imgNode);
        };
        self.imgNode = domConstruct.create("img", {
          src: "data:image/png;base64," + base64Src
        });
        domConstruct.place(self.imgNode, self.domNode);
      });
    }
  });
});
