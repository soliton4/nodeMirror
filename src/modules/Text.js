define([
  "dojo/_base/declare"
  , "modules/base/BorderContainer"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "main/serverOnly!server/files"
  , "main/codemirror/subtypes"
  , "sol/string"
  , "main/clientOnly!sol/wgt/CodeMirror"
  , "main/clientOnly!codemirror/theme/all"
  , "main/clientOnly!dijit/form/Select"
  , "main/config"
  , "main/clientOnly!dijit/form/DropDownButton"
  , "main/clientOnly!./text/settingsDlg"
  , "main/clientOnly!modules/text/codeMirrorSettings"
  , "main/clientOnly!dijit/form/ToggleButton"
  , "main/clientOnly!dijit/form/Button"
  , "main/clientOnly!dijit/DropDownMenu"
  , "main/clientOnly!dijit/MenuItem"
  
  , "main/clientOnly!codemirror/mode/allModes"
  , "main/clientOnly!codemirror/addon/dialog/dialog"
  , "main/clientOnly!codemirror/addon/search/search"
  , "main/clientOnly!codemirror/addon/search/searchcursor"
  , "main/clientOnly!codemirror/addon/edit/matchbrackets"
  , "main/clientOnly!codemirror/addon/edit/closebrackets"
  , "main/clientOnly!codemirror/addon/fold/xml-fold"
  , "main/clientOnly!codemirror/addon/edit/matchtags"
  , "main/clientOnly!codemirror/addon/edit/trailingspace"
  , "main/clientOnly!codemirror/addon/edit/closetag"
  , "main/clientOnly!codemirror/addon/fold/foldcode"
  , "main/clientOnly!codemirror/addon/fold/foldgutter"
  , "main/clientOnly!codemirror/addon/fold/brace-fold"
  , "main/clientOnly!codemirror/addon/fold/comment-fold"
  , "main/clientOnly!codemirror/addon/fold/foldcode"
  , "main/clientOnly!codemirror/addon/lint/all"
  , "main/clientOnly!codemirror/addon/selection/active-line"
  , "main/clientOnly!codemirror/addon/display/placeholder"
  
  
], function(
  declare
  , Base
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , files
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
      return files.writeTextDef(this.getFileName(par.id), parContent.text);
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
      }));
      this.addChild(this.mirror);
      this.mirror.on("change", lang.hitch(this, function(){
        if (this._started){
          this.set("dirty", true);
        };
      }));
      codeMirrorSettings.on("settings", function(settings){
        var s;
        for (s in settings){
          self.mirror.set(s, settings[s]);
        };
      });
      
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
    
  });
});
