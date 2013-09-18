define([
  "dojo/_base/declare"
  , "modules/Text"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/clientOnly!dijit/form/Button"
  , "main/clientOnly!dijit/form/ToggleButton"
], function(
  declare
  , Base
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , Button
  , ToggleButton
){
  
  var additionalSubtypes = {
    "javascript": true
    , "javaScript": true
    , "JavaScript": true
    , "Javascript": true
  };
    
  var additionalTypes = {
  };
  
  var lastTimeJsHint = true;
  
  return declare([Base], {
    "class": "content text javascript"
    
    , isCompetentPs: function(par){
      var def = this.def();
      
      var isJs = false;
      
      var subtype = par.contentType.split("/")[1];
      if (additionalSubtypes[subtype]){
        isJs = true;
      };
      
      if (!isJs){
        if (additionalTypes[par.contentType]){
          isJs = true;
        };
      };
      
      
      if (isJs){
        def.resolve();
      }else{
        def.reject();
      };
      
      return def;
    }
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      this.jshintBtn = this.ownObj(new ToggleButton({
        onChange: lang.hitch(this, function(){
          lastTimeJsHint = this.jshintBtn.get("checked");
          this.mirror.set("jshint", lastTimeJsHint);
        })
        , label: "syntax check"
        , checked: lastTimeJsHint
      })); 
      this.menu.addChild(this.jshintBtn);
      this.mirror.set("jshint", lastTimeJsHint);
      return ret;
    }
    
    
  });
});
