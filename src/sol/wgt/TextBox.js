define([
  "dojo/_base/declare"
  , "dijit/form/TextBox"
  , "dojo/keys"
], function(
  declare
  , TextBox
  , keys
){
  return declare([TextBox], {
    buildRendering: function(){
      var res = this.inherited(arguments);
      return res;
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      this.on("keyPress", function(e){
        if (e.charOrCode == keys.ENTER){
          this.onEnterPressed(e);
        };
      });
    }
    
    , onEnterPressed: function(){}
  });
});