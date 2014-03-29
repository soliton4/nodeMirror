define([
  "dojo/_base/declare"
  , "modules/base/Base"
  , "modules/Text"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/clientOnly!./promiseLand/Tester"
  , "main/clientOnly!dijit/form/Button"
  , "sol/fileName"
  , "main/serverOnly!server/files"
  , "main/clientOnly!dojo/dom-style"
  , "main/clientOnly!dojo/dom-construct"
  , "main/clientOnly!dojo/dom-geometry"
  , "promiseland/promiseland"
  , "promiseland/parser"
], function(
  declare
  , Base
  , Text
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , Tester
  , Button
  , fileName
  , files
  , domStyle
  , domConstruct
  , domGeo
  , promiseland
  , parser
){
  
  var additionalSubtypes = {
    "pland": true
    , "promiseland": true
    , "promiseLand": true
    , "PromiseLand": true
    , "Promiseland": true
  };
    
  var additionalTypes = {
  };
  
  return declare([Text], {
    
    remoteFunctions: lang.mixin({}, Base.remoteFunctions, { 
      //testPs: true
    } )
    
    , "class": "content text promiseLand"
    
    , isCompetentPs: function(par){
      var def = this.def();
      
      var isCompetent = false;
      
      var subtype = par.contentType.split("/")[1];
      if (additionalSubtypes[subtype]){
        isCompetent = true;
      };
      
      if (!isCompetent){
        if (additionalTypes[par.contentType]){
          isCompetent = true;
        };
      };
      
      if (isCompetent){
        console.log("competent");
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
        //this.mirror.on("change", lang.hitch(this, function(){
          //this.tester.codeChanged();
        //}));
      };
      //this.tester.test();
      
      this.testPs(this.par, this.mirror.get("value")).then(lang.hitch(this, function(parCss){
        this.tester.set("value", parCss);
      }));
    }
    
    , testPs: function(par, parCode){
      var def = this.def();
      
      parser.parse(parCode).then(function(jsStr){
        def.resolve(jsStr);
      });
      //def.resolve("xxx");
      return def;
    }
    
    // write also a css file
    , saveContentPs: function(par, parContent){
      var inheritedPs = this.inherited(arguments);
      var savePs = this.def();
      try{
        var fName = this.getFileName(par.id);
        if (solString.endsWith(fName, ".pland")){
          fName = fName.substr(0, fName.length - 6);
        };
        fName += ".js";
        console.log("js:" + fName);
        this.testPs(par, parContent.text).then(function(parJs){
          console.log("js result");
          files.writeTextDef(fName, parJs).then(function(){
            savePs.resolve();
          });
        });
      }catch(e){
        console.log(e);
      };
      return solPromise.allDone([inheritedPs, savePs]);
    }
    
  });
});


