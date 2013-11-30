define([
  "dojo/_base/declare"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/form/Button"
  , "dijit/Dialog"
  , "sol/wgt/TextBox"
  , "client/globals"
  , "dojo/Deferred"
  , "dijit/form/NumberSpinner"
  , "dijit/form/Select"
], function(
  declare
  , domConstruct
  , lang
  , topic
  , Button
  , Dialog
  , TextBox
  , globals
  , Deferred
  , NumberSpinner
  , Select
){
  
  return declare([Dialog], {
    title: "create Debugger"
    , constructor: function(){
      this._def = new Deferred();
      this.promise = this._def.promise;
    }
    , buildRendering: function(){
      this.inherited(arguments);
      
      var okFun = lang.hitch(this, "_ok");
      
      this.typeSelect = this.ownObj(new Select({
        value: "js"
        , options: [{
          label: "JavaScript"
          , value: "js"
        }]
      }));
      this.typeSelect.placeAt(this.containerNode);
      
      this.portBox = this.ownObj(new NumberSpinner({
        onEnterPressed: okFun
        , value: 5858
      }));
      this.portBox.placeAt(this.containerNode);
      
      this.okBtn = this.ownObj(new Button({
        label: "ok"
        , onClick: okFun
      }));
      this.okBtn.placeAt(this.containerNode);
    }
    , postMixInProperties: function(){
      this.inherited(arguments);
    }
    , _ok: function(){
      if (this._def){
        this._def.resolve({
          type: this.typeSelect.get("value")
          , port: this.portBox.get("value")
        });
        delete this._def;
      };
      this.destroy();
    }
    
    , destroy: function(){
      this.inherited(arguments);
      if (this._def){
        this._def.reject();
        delete this._def;
      };
    }
  });
  
});
