define([
  "dojo/_base/declare"
  , "dijit/_WidgetBase"
  , "sol/wgt/mixin/resize"
  , "dojo/dom-construct"
  , "sol/convenient/Delayed"
], function(
  declare
  , _WidgetBase
  , resizeMixin
  , domConstruct
  , Delayed
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
      
      if (!this._load){
        this._load = this.ownObj(new Delayed({
          delay: 300
        }, function(){
          self.module.getBase64Ps(self.par.id, {
            width: self._contentBox.w
            , height: self._contentBox.h
          }).then(function(base64Src){
            if (self.imgNode){
              domConstruct.destroy(self.imgNode);
            };
            self.imgNode = domConstruct.create("img", {
              src: "data:image/png;base64," + base64Src
            });
            domConstruct.place(self.imgNode, self.domNode);
          });
        }));
      };
      this._load.exec();
    }
  });
});
