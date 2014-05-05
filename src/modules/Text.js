define([
  "dojo/_base/declare"
  , "modules/base/BorderContainer"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "main/serverOnly!server/files"
  //, "main/serverOnly!./text/openFiles"
  , "main/codemirror/subtypes"
  , "sol/string"
  , "main/clientOnly!sol/wgt/CodeMirror"
  , "main/clientOnly!codemirror4/theme/all"
  , "main/clientOnly!dijit/form/Select"
  , "main/config"
  , "main/clientOnly!dijit/form/DropDownButton"
  , "main/clientOnly!./text/settingsDlg"
  , "main/clientOnly!modules/text/codeMirrorSettings"
  , "main/clientOnly!dijit/form/ToggleButton"
  , "main/clientOnly!dijit/form/Button"
  , "main/clientOnly!dijit/DropDownMenu"
  , "main/clientOnly!dijit/MenuItem"
  , "main/clientOnly!dojo/dom-class"
  , "main/clientOnly!dojo/dom-style"
  
  , "main/clientOnly!codemirror4/mode/allModes"
  , "main/clientOnly!codemirror4/addon/dialog/dialog"
  , "main/clientOnly!codemirror4/addon/search/search"
  , "main/clientOnly!codemirror4/addon/search/searchcursor"
  , "main/clientOnly!codemirror4/addon/edit/matchbrackets"
  , "main/clientOnly!codemirror4/addon/edit/closebrackets"
  , "main/clientOnly!codemirror4/addon/fold/xml-fold"
  , "main/clientOnly!codemirror4/addon/edit/matchtags"
  , "main/clientOnly!codemirror4/addon/edit/trailingspace"
  , "main/clientOnly!codemirror4/addon/edit/closetag"
  , "main/clientOnly!codemirror4/addon/fold/foldcode"
  , "main/clientOnly!codemirror4/addon/fold/foldgutter"
  , "main/clientOnly!codemirror4/addon/fold/brace-fold"
  , "main/clientOnly!codemirror4/addon/fold/comment-fold"
  , "main/clientOnly!codemirror4/addon/fold/foldcode"
  , "main/clientOnly!codemirror4/addon/lint/all"
  , "main/clientOnly!codemirror4/addon/selection/active-line"
  , "main/clientOnly!codemirror4/addon/display/placeholder"
  
  
], function(
  declare
  , Base
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , files
  //, openFiles
  , subtypes
  , solString
  , CodeMirror
  , allThemes
  , Select
  , config
  , DropDownButton
  , settingsDlg
  , codeMirrorSettings
  , ToggleButton
  , Button
  , DropDownMenu
  , MenuItem
  , domClass
  , domStyle
){
  
  var additionalSubtypes = {
    "peg.js": true
    , "x-empty": true
  };
  
  var additionalTypes = {
    "inode/x-empty": true
  };
  
  var lastTimeLint = true;
  
  return declare([Base], {
    "class": "content text"
    , saveButton: true
    , reloadButton: true
    , downloadButton: true
    , binaryModeButton: true
    
    , isCompetentPs: function(par){
      var def = this.def();
      
      var isText = false;
      
      if (solString.startsWith(par.contentType, "text/")){
        isText = true;
      };
      
      if (!isText){
        if (solString.startsWith(par.contentType, "application/")){
          var subtype = par.contentType.split("/")[1];
          if (subtypes[subtype] || additionalSubtypes[subtype]){
            isText = true;
          };
        };
      };
      
      if (!isText){
        if (additionalTypes[par.contentType]){
          isText = true;
        };
      };
      
      
      if (isText){
        def.resolve();
      }else{
        def.reject();
      };
      
      return def;
    }
    
    , getContentPs: function(par){
      
      var def = new Deferred();
      
      var result = {
      };
      
      var def1 = this.def();
      var def2 = this.def();
      
      files.readTextDef(this.getFileName(par.id)).then(function(parText){
        result.text = parText;
        def1.resolve(result);
      });
      files.contentTypeDef(this.getFileName(par.id)).then(function(parType){
        result.contentType = parType;
        def2.resolve(result);
      });
      solPromise.allDone([def1, def2]).then(lang.hitch(def, "resolve", result));
      
      return def;
    }
    
    , saveContentPs: function(par, parContent){
      var ps = files.writeTextDef(this.getFileName(par.id), parContent.text);
      return ps;
    }
    
    , onShow: function(){
      this.inherited(arguments);
      this.mirror.focus();
    }
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      var self = this;
      
      this.mirror = this.ownObj(new CodeMirror({
        region: "center"
        , value: this.content.text
        , mode: this.par.contentType
        , lineNumbers: true
        , styleActiveLine: true
        , theme: "eclipse"
        , matchBrackets: true
        , gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        , placeholder: "empty File..."
        , extraKeys: {
          "Ctrl-S": lang.hitch(this, "savePs"),
          "Shift-Ctrl-F11": function(){
            self.toggleFullscreen();
          },
          "Esc": function(){
            self.endFullscreen();
          }
        }
      }));
      this.addChild(this.mirror);
      this.mirror.on("change", lang.hitch(this, function(){
        if (this._started){
          this.set("dirty", true);
        };
      }));
      this.ownObj(codeMirrorSettings.on("settings", function(settings){
        var s;
        for (s in settings){
          self.mirror.set(s, settings[s]);
        };
      }));
      
      this.syntaxBtn = this.ownObj(new ToggleButton({
        onChange: lang.hitch(this, function(){
          lastTimeLint = this.syntaxBtn.get("checked");
          this.mirror.set("lint", lastTimeLint);
        })
        , label: "syntax check"
        , checked: lastTimeLint
      })); 
      this.menu.addChild(this.syntaxBtn);
      this.mirror.set("lint", lastTimeLint);
      
      
      var commentMenu = this.ownObj(new DropDownMenu({ style: "display: none;"}));
      var commentBlock = this.ownObj(new MenuItem({
        label: "block",
        onClick: lang.hitch(this, function(){
          this.mirror.blockComment();
        })
      }));
      commentMenu.addChild(commentBlock);
      
      var commentLine = this.ownObj(new MenuItem({
        label: "line",
        onClick: lang.hitch(this, function(){
          this.mirror.lineComment();
        })
      }));
      commentMenu.addChild(commentLine);

      var uncomment = this.ownObj(new MenuItem({
        label: "uncomment",
        onClick: lang.hitch(this, function(){
          this.mirror.uncomment();
        })
      }));
      commentMenu.addChild(uncomment);
      
      var button = this.ownObj(new DropDownButton({
        label: "comment",
        dropDown: commentMenu
      }));
      
      this.menu.addChild(button);
      
      this.wrapBtn = this.ownObj(new ToggleButton({
        onChange: lang.hitch(this, function(){
          this.mirror.set("lineWrapping", this.wrapBtn.get("checked"));
        })
        , label: "wrap"
        , checked: false
      })); 
      this.menu.addChild(this.wrapBtn);
      
      return ret;
    }
    
    , startup: function(){
      if (this._started){ return; };
      this.inherited(arguments);
      setTimeout(lang.hitch(this.mirror, "focus"), 0);
    }
    
    , toggleFullscreen: function(){
      if (this._fullscreen){
        domClass.remove(this.mirror.domNode, "sudofullscreen");
        this.addChild(this.mirror);
      }else{
        domClass.add(this.mirror.domNode, "sudofullscreen");
        this.mirror.placeAt(document.body);
        domStyle.set(this.mirror.domNode, "top", "0px");
        domStyle.set(this.mirror.domNode, "left", "0px");
        domStyle.set(this.mirror.domNode, "width", "100%");
        domStyle.set(this.mirror.domNode, "height", "100%");
      };
      this._fullscreen = !this._fullscreen;
      this.mirror.resize();
      this.mirror.refresh();
      this.mirror.focus();
    }
    , endFullscreen: function(){
      domClass.remove(this.mirror.domNode, "sudofullscreen");
      this._fullscreen = false;
      this.addChild(this.mirror);
      this.mirror.resize();
      this.mirror.refresh();
      this.mirror.focus();
    }
    
    , createMenu: function(){
      var menu = this.inherited(arguments);
      this.settingsBtn = this.ownObj(new DropDownButton({
        label: "Settings",
        dropDown: settingsDlg()
      }));
      menu.addChild(this.settingsBtn);
      return menu;
    }
    
    , _setContentAttr: function(parContent){
      this._set("content", parContent);
      if (this.mirror){
        this.mirror.set("value", this.content.text);
        this.mirror.set("mode", this.content.contentType);
      };
    }
    , _getContentAttr: function(){
      if (this.mirror){
        this.content.text = this.mirror.get("value");
      };
      return this.content;
    }
    
    , destroyRecursive: function(){
      if (this.settingsBtn){
        this.settingsBtn.dropDown = undefined;
      }
      this.inherited(arguments);
    }
    
  });
});
