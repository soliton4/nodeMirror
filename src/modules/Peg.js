define([
  "dojo/_base/declare"
  , "modules/Text"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/clientOnly!./pegjs/Parser"
  , "main/clientOnly!dijit/form/Button"
  , "main/clientOnly!dojo/dom-class"
  , "sol/fileName"
  , "peg/Peg"
  , "main/serverOnly!server/files"
  , "sol/moduleLoader/universal"
  , "modules/base/Base"
], function(
  declare
  , Text
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , Parser
  , Button
  , domClass
  , fileName
  , Peg
  , files
  , moduleUniversal
  , Base
){
  
  var additionalSubtypes = {
    "peg.js": true
    , "pegjs": true
  };
    
  var additionalTypes = {
  };
  
  return declare([Text], {
    "class": "content text pegjs"
    
    , remoteFunctions: lang.mixin({}, Base.remoteFunctions, { _saveAsJs: true} )
    
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
    
    , getJsFileName: function(par){
      var fName = this.getFileName(par.id);
      if (solString.endsWith(fName, ".pegjs")){
        fName = fName.substr(0, fName.length - 6);
      };
      fName += ".js";
      return fName;
    }
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      
      this.saveAsJsBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "saveAsJs")
        , label: "save as " + fileName.single(this.getJsFileName(this.par))
      })); 
      this.menu.addChild(this.saveAsJsBtn);
      
      
      this.parseBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "openparser")
        , label: "try Parser"
      })); 
      this.menu.addChild(this.parseBtn);
      this.closeParseBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "closeparser")
        , label: "close Try Bar"
      })); 
      domClass.add(this.closeParseBtn.domNode, "invisible");
      this.menu.addChild(this.closeParseBtn);
      
      this.reinitParserBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "reinitParser")
        , label: "reapply Peg Code"
      })); 
      domClass.add(this.reinitParserBtn.domNode, "invisible");
      this.menu.addChild(this.reinitParserBtn);
      
      this.getJsBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "getJs")
        , label: "get JavaScript"
      })); 
      domClass.add(this.getJsBtn.domNode, "invisible");
      this.menu.addChild(this.getJsBtn);
      
      
      
      
      this.mirror.set("mode", "pegjs");
      
      return ret;
    }
    
    , _setContentAttr: function(){
      var res = this.inherited(arguments);
      this.mirror.set("mode", "pegjs");
      return res;
    }
    
    , getJs: function(){
      this.parser.getJs();
    }
    
    , saveAsJs: function(){
      this._saveAsJs(this.par, this.mirror.get("value"));
    }
    
    , _saveAsJs: function(par, parCode){
      var def = new Deferred();
      var fName = this.getJsFileName(par);
      
      var parserCode;
      
      try {
        parserCode = Peg.buildParser(parCode, {output: "source", trackLineAndColumn: true});
        parserCode = moduleUniversal.createModule({
          code: parserCode
        });
      }catch(e){
        console.log(e);
        parserCode = "/* error */";
      };
      
      files.writeTextDef(fName, parserCode).then(function(){
        def.resolve();
      });
      
      
      return def.promise;
    }
    
    , openparser: function(){
      domClass.add(this.parseBtn.domNode, "invisible");
      domClass.remove(this.closeParseBtn.domNode, "invisible");
      domClass.remove(this.reinitParserBtn.domNode, "invisible");
      domClass.remove(this.getJsBtn.domNode, "invisible");
      //this.menu.resize();
      if (!this.parser){
        this.parser = this.ownObj(new Parser({
          parent: this
        }));
        this.mirror.on("change", lang.hitch(this, function(){
          //this.parser.parserCodeChanged();
        }));
      };
      this.addChild(this.parser);
      this.parser.parse();
    }
    , closeparser: function(){
      domClass.remove(this.parseBtn.domNode, "invisible");
      domClass.add(this.closeParseBtn.domNode, "invisible");
      domClass.add(this.reinitParserBtn.domNode, "invisible");
      domClass.add(this.getJsBtn.domNode, "invisible");
      //this.menu.resize();
      this.removeChild(this.parser);
    }
    
    , reinitParser: function(){
      this.parser.parserCodeChanged();
    }
    
  });
});
