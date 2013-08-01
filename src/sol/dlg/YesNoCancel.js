define([
  "dojo/_base/declare"
  , "dijit/Dialog"
  , "dojo/Deferred"
  , "dijit/form/Button"
  , "dojo/_base/lang"
], function(
  declare
  , Dialog
  , Deferred
  , Button
  , lang
){
  return declare([Dialog], {
    constructor: function(){
      this._def = new Deferred();
    }
    
    , buildRendering: function(){
      this.inherited(arguments);
      
    }
    
    , show: function(){
      var res = this.inherited(arguments);
      
      if (!this.yesButton){
        this.yesButton = this.ownObj(new Button({
          label: "Yes"
          , onClick: lang.hitch(this, "click", 1)
        }));
        this.yesButton.placeAt(this.containerNode);
      };
      if (!this.noButton){
        this.noButton = this.ownObj(new Button({
          label: "No"
          , onClick: lang.hitch(this, "click", 0)
        }));
        this.noButton.placeAt(this.containerNode);
      };
      if (!this.cancelButton){
        this.cancelButton = this.ownObj(new Button({
          label: "Cancel"
          , onClick: lang.hitch(this, "click", 2)
        }));
        this.cancelButton.placeAt(this.containerNode);
      };
      
      return res;
    }
    
    , click: function(pId){
      this._def.resolve(pId);
      this.destroy();
    }
    
    , then: function(fun1, fun2){
      return this._def.then(fun1, fun2);
    }
  });
});