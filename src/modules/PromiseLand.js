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
  , "main/clientOnly!./less/Tester"
  , "main/clientOnly!dijit/form/Button"
  , "main/serverOnly!dojo/node!less"
  , "sol/fileName"
  , "main/serverOnly!server/files"
  , "main/clientOnly!sol/wgt/Iframe"
  , "main/clientOnly!dojo/dom-style"
  , "main/clientOnly!dojo/dom-construct"
  , "main/clientOnly!dojo/dom-geometry"
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
  , less
  , fileName
  , files
  , Iframe
  , domStyle
  , domConstruct
  , domGeo
){
  
  var additionalSubtypes = {
    "promiseland": true
  };
    
  var additionalTypes = {
  };
  
  return declare([Text], {
    
    remoteFunctions: lang.mixin({}, Base.remoteFunctions, { testPs: true} )
    
    , "class": "content text promiseland"
    
    , isCompetentPs: function(par){
      var def = this.def();
      
      var hit = false;
      
      var subtype = par.contentType.split("/")[1];
      if (additionalSubtypes[subtype]){
        hit = true;
      };
      
      if (!hit){
        if (additionalTypes[par.contentType]){
          hit = true;
        };
      };
      
      if (hit){
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
      
      /*this.referenceBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "reference")
        , label: "Reference"
      })); 
      this.menu.addChild(this.referenceBtn);*/
      return ret;
    }
    
    /*, reference: function(){
      if (this.referenceFrame && this.showingReference){
        this.showingReference = false;
        this._frameBox = domGeo.getMarginBox(this.referenceFrame.domNode);
        this._frameBox2 = domGeo.getMarginBox(this.referenceFrame._splitterWidget.domNode);
        domStyle.set(this.referenceFrame.domNode, "height", "0px");
        domStyle.set(this.referenceFrame.domNode, "border", "0px");
        domStyle.set(this.referenceFrame._splitterWidget.domNode, "height", "0px");
        this.resize();
        return;
      };
      this.showingReference = true;
      if (!this.referenceFrame){
        this.referenceFrame = this.ownObj(new Iframe({
          "class": "referenceFrame"
          , src: "http://lesscss.org/#reference"
          , region: "top"
          , splitter: true
        }));
        this.addChild(this.referenceFrame);
      }else{
        domGeo.setMarginBox(this.referenceFrame.domNode, {h: this._frameBox.h});
        domGeo.setMarginBox(this.referenceFrame._splitterWidget.domNode, {h: this._frameBox2.h});
        this.resize();
      };
    }*/
    
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
      var parser = new(less.Parser)({
        paths: [this.getFileName(fileName.dir(par.id))], // Specify search paths for @import directives
        filename: fileName.single(par.id) // Specify a filename, for better error messages
      });
      
      parser.parse(parCode, function (err, tree) {
        if (err) { 
          console.log(err);
          def.resolve("error");
          return;
        }
        def.resolve(tree.toCSS());
      });
      return def;
    }
    
    // write also a css file
    , saveContentPs: function(par, parContent){
      var inheritedPs = this.inherited(arguments);
      var savePs = this.def();
      try{
        var fName = this.getFileName(par.id);
        if (solString.endsWith(fName, ".plnd")){
          fName = fName.substr(0, fName.length - 5);
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
        savePs.resolve();
      };
      return solPromise.allDone([inheritedPs, savePs]);
    }
    
  });
});
