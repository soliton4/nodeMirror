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
  , "main/clientOnly!./javascript/formatSettingsDlg"
  , "main/clientOnly!dijit/form/DropDownButton"
  , "main/config"
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
  , formatSettingsDlg
  , DropDownButton
  , config
){
  
  var mChecker;
  var getFormatter = function(){
    if (!mChecker){
      mChecker = Formatter();
    };
    return mChecker;
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
      var self = this;
      config.get("codemirror-jscsPreset").then(function(preset){
        var Checker = getFormatter();
        var checker = new Checker();
        checker.registerDefaultRules();
        
        preset = preset || "mdcs";
        checker.configure( {
          preset: preset
        } );
        self.mirror.set("value", checker.formatString(self.get("content").text));
      });
    }
    
    
    // so special implementations can override it
    , setCodemirrorValue: function(parValue){
      if (this.mirror && this.mirror.get("autoJscsFormat")){
        var preset = this.mirror.get("jscsPreset") || "mdcs";
        var Checker = getFormatter();
        var checker = new Checker();
        checker.registerDefaultRules();
        
        preset = preset || "mdcs";
        checker.configure( {
          preset: preset
        } );
        this.mirror.set("value", checker.formatString(parValue));
      }else{
        return this.inherited(arguments);
      };
    }

    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      
      
      this.mirror.setJscs(getFormatter());
      
      
      return ret;
    }
    
    , createMenu: function(){
      var menu = this.inherited(arguments);
      this.syntaxSettingsBtn = this.ownObj(new DropDownButton({
        label: "Format cfg.",
        dropDown: formatSettingsDlg()
      }));
      menu.addChild(this.syntaxSettingsBtn);
      
      this.formatBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "format")
        , label: "format"
      })); 
      menu.addChild(this.formatBtn);
      
      return menu;
    }

    
    
  });
});
