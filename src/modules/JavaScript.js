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
  , "main/clientOnly!./javascript/Formatter4"
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
  , Formatter
){
  
  var checker;
  var getFormatter = function(){
    if (!checker){
      var Checker = Formatter();
      checker = new Checker();
      checker.registerDefaultRules();
      checker.configure( {
        preset: 'mdcs'
      } );
    };
    return checker;
  };
  
  var additionalSubtypes = {
    "javascript": true
    , "javaScript": true
    , "JavaScript": true
    , "Javascript": true
  };
    
  var additionalTypes = {
  };
  
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
    
    , format: function(){
      var checker = getFormatter();
      this.mirror.set("value", checker.formatString(this.get("content").text));
    }
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      
      this.formatBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "format")
        , label: "format"
      })); 
      this.menu.addChild(this.formatBtn);
      
      
      return ret;
    }
    
    
  });
});
