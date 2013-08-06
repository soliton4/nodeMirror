define([
  "dojo/_base/declare"
  , "modules/Text"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/clientOnly!./peg.js/Parser"
  , "main/clientOnly!dijit/form/Button"
], function(
  declare
  , Base
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , Parser
  , Button
){
  
  var additionalSubtypes = {
    "peg.js": true
    , "pegjs": true
  };
    
  var additionalTypes = {
  };
  
  return declare([Base], {
    "class": "content text pegjs"
    
    , isCompetentPs: function(par){
      var def = this.def();
      
      var isPeg = false;
      
      var subtype = par.contentType.split("/")[1];
      if (additionalSubtypes[subtype]){
        isPeg = true;
      };
      
      if (!isPeg){
        if (additionalTypes[par.contentType]){
          isPeg = true;
        };
      };
      
      
      if (isPeg){
        def.resolve();
      }else{
        def.reject();
      };
      
      return def;
    }
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      this.parseBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "parse")
        , label: "parse"
      })); 
      this.menu.addChild(this.parseBtn);
      return ret;
    }
    
    , parse: function(){
      if (!this.parser){
        this.parser = this.ownObj(new Parser({
          parent: this
        }));
        this.addChild(this.parser);
        this.mirror.on("change", lang.hitch(this, function(){
          this.parser.parserCodeChanged();
        }));
      };
      this.parser.parse();
    }
    
  });
});
