define([
  "dojo/_base/declare"
  , "modules/Text"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/clientOnly!./html/Tester"
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
  , Tester
  , Button
){
  
  var additionalSubtypes = {
    "html": true
  };
    
  var additionalTypes = {
  };
  
  return declare([Base], {
    "class": "content text html"
    
    , isCompetentPs: function(par){
      var def = this.def();
      
      var isHtml = false;
      
      var subtype = par.contentType.split("/")[1];
      if (additionalSubtypes[subtype]){
        isHtml = true;
      };
      
      if (!isHtml){
        if (additionalTypes[par.contentType]){
          isHtml = true;
        };
      };
      
      
      if (isHtml){
        def.resolve();
      }else{
        def.reject();
      };
      
      return def;
    }
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      this.testBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "test")
        , label: "test"
      })); 
      this.menu.addChild(this.testBtn);
      return ret;
    }
    
    , test: function(){
      if (!this.tester){
        this.tester = this.ownObj(new Tester({
          parent: this
        }));
        this.addChild(this.tester);
        this.mirror.on("change", lang.hitch(this, function(){
          this.tester.codeChanged();
        }));
      };
      this.tester.test();
    }
    
    
  });
});
