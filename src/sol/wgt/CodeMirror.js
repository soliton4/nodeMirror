define([
  "dojo/_base/declare"
  , "dojo/_base/lang"
  , "dijit/_WidgetBase"
  , "dojo/dom-geometry"
  , "sol/convenient/Delayed"
  , "codemirror4/lib/codemirror"
  , "codemirror4/addon/hint/all"
  , "dojo/_base/array"
  , "dojo/dom-style"
  , "jshint/jshint"
  , "codemirror/lint/csslint"
  , "codemirror/lint/jsonlint"
  
  , "codemirror4/addon/display/fullscreen"
  , "codemirror4/addon/comment/comment"
], function(
  declare
  , lang
  , WidgetBase
  , domGeometry
  , Delayed
  , CodeMirror
  //, JSHINT
  , allHints
  , array
  , domStyle
  , jshint
  , CSSLint
  , jsonlint
){
  
  window.JSHINT = jshint;
  window.CSSLint = CSSLint;
  window.jsonlint = jsonlint;
  
  var jscs;
  
  var cmOptions = {
    lineNumbers: false
    , mode: undefined
    , theme: "default"
    , matchBrackets: true
    , readOnly: false
    , autoCloseBrackets: true
    , matchTags: true
    , showTrailingSpace: false
    , autoCloseTags: true
    //, foldGutter: true
    , gutters: true
    , extraKeys: {}
    , placeholder: ""
    , lineWrapping: false
    , keyMap: "default"
    , styleActiveLine: true
    , highlightSelectionMatches: null
    //, javascriptSyntax: "jshint"
  };
       
       //highlightSelectionMatches: {showToken: /\w/}
  
  var hintMap = {};
  array.forEach(allHints, function(parHint){
    hintMap[parHint] = true;
  });
  
  CodeMirror.commands.autocomplete = function(cm) {
    var mode = cm.getMode();
    if (mode){
      if (CodeMirror.hint[mode.name]){
        CodeMirror.showHint(cm, CodeMirror.hint[mode.name]);
        return;
      };
    };
    CodeMirror.showHint(cm, CodeMirror.hint.anyword);
  };  
  
  return declare([
    WidgetBase
  ], {
    
    extraKeys: {
        /*("F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },*/
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      }
    
    , lint: true
    
    , constructor: function(){
      var mix = {
      };
      var o;
      function f(oriName, setName){
          mix["_set" + setName + "Attr"] = function(newValue){
            this._set(oriName, newValue);
            this.mirror.setOption(oriName, newValue);
          };
          mix["_get" + setName + "Attr"] = function(){
            return this.mirror.getOption(oriName);
          };
      };
      for(o in cmOptions){
        f(o, o[0].toUpperCase() + o.substr(1));
      };
      declare.safeMixin(this, mix);
      /*this.checkDelayed = this.ownObj(new Delayed({
        delay: 3000
      }, lang.hitch(this, "updateHints")));*/
    }
    
    , buildRendering: function(){
      this.inherited(arguments);
      this.mirror = new CodeMirror(this.domNode);
      this.mirror.setOption("mode", undefined);
      if (this.value){
        this.mirror.setValue(this.value);
      };
      this.mirror.setOption("extraKeys", this.extraKeys);
      //this.widgets = [];
    }
    
    // helper function to set the jscs
    // this way we do not need to create a dependency
    , setJscs: function(parJscs){
      jscs = parJscs;
    }
    
    , _setJavascriptSyntaxAttr: function(parValue){
      var changed = false;
      if (parValue != this.get("javascriptSyntax")){
        changed = true;
      };
      this._set("javascriptSyntax", parValue);
      var data = {
        errors: []
      };
      var self = this;
      if (parValue == "jscs"){
        window.JSHINT = function(text, options){
          data.errors = [];
          if (jscs){
            
            var Checker = jscs;
            var checker = new Checker();
            checker.registerDefaultRules();

            var preset = self.get("jscsPreset") || "mdcs";
            checker.configure( {
              preset: preset
            } );

            var c = checker.checkString(text);
            data.errors = c.getErrorList();
            var e = data.errors;
            var i = 0;
            for (i = 0; i < e.length; ++i){
              e[i].reason = e[i].reason || e[i].message;
              e[i].character = e[i].character || e[i].column;
            };
            /*column: 53filename: "input"line: 12message: "Missing space before closing round bracket"rule: "requireSpacesInsideParentheses"*/
          };
        };
        window.JSHINT.data = function(){
          return data;
        };
      }else if (parValue == "jshint+jscs"){
        window.JSHINT = function(text, options){
          var i = 0;
          data.errors = [];
          if (jscs){
            var Checker = jscs;
            var checker = new Checker();
            checker.registerDefaultRules();

            var preset = self.get("jscsPreset") || "mdcs";
            checker.configure( {
              preset: preset
            } );

            var c = checker.checkString(text);
            data.errors = c.getErrorList();
            var e = data.errors;
            for (i = 0; i < e.length; ++i){
              e[i].reason = e[i].reason || e[i].message;
              e[i].character = e[i].character || e[i].column;
            };
          };
          jshint(text, options);
          var errors = jshint.data().errors;
          i = 0;
          for (i = 0; i < errors.length; ++i){
            data.errors.push(errors[i]);
          };
          
        };
        window.JSHINT.data = function(){
          return data;
        };
      }else{
        window.JSHINT = jshint;
      };
      if (changed){
        // trigger linter
        this.set("lint", this.get("lint"));
      };
      //JSHINT(text, options);
      //var errors = JSHINT.data().errors;
    }
    
    //, _setJscsPresetAttr: function(parValue){
    //}
    
    , _setAutoCompleteAttr: function(parValue){
      this._set("autoComplete", parValue);
      var keyMap = this.mirror.getOption("extraKeys") || {};
      if (parValue){
        keyMap["Ctrl-Space"] = "autocomplete";
      }else{
        delete keyMap["Ctrl-Space"];
      };
      this.mirror.setOption("extraKeys", keyMap);
    }
    
    , focus: function(){
      this.inherited(arguments);
      this.mirror.focus();
    }
    
    , on: function(parWhat, parFun){
      return this.mirror.on(parWhat, parFun);
    }
    
    , _setFoldFloatAttr: function(parValue){
      this._set("foldFloat", parValue);
      if (this.foldGutter){
        this.foldGutter["float"] = parValue;
        this.set("foldGutter", this.foldGutter);
      };
    }
    , _setFoldGutterAttr: function(parValue){
      
      if (parValue){
        if (parValue === true){
          parValue = {};
        };
        parValue["float"] = parValue["float"] || this.foldFloat;
      };
      this._set("foldGutter", parValue);
      
      this.mirror.setOption("foldGutter", parValue);
    }
    
    , _setLintAttr: function(parValue){
      this._set("lint", parValue);
      
      var helper = this.mirror.getHelper(CodeMirror.Pos(0, 0), "lint");
      if (helper){
        if (parValue){
          //notes: eslint / plato
          this.mirror.setOption("lint", {options: {
            laxcomma: true
          , laxbreak: true
          , multistr: true
          , maxerr: 100
          , newcap: false
          , "-W032": true
          , "-W069": true
          //  , es5: true
          //, "-W070": false
          //, "+W070": true
            //, trailing: true
          
          }});
        }else{
          this.mirror.setOption("lint", parValue);
        };
      }else{
        this.mirror.setOption("lint", false);
      };
    }
    
    , postMixInProperties: function(){
      this.inherited(arguments);
    }
    
    , startup: function(){
      if (this._started) { return; };
      this.inherited(arguments);
      
      if (this.jshint === undefined){
        var mode = this.mirror.getMode();
        if (mode && mode.name == "javascript"){
          this.jshint = true;
        };
      };
      
      this.mirror.refresh();
      
    }
    
    , refresh: function(){
      this.mirror.refresh();
    }
    
    , setCursor: function(){
      this.mirror.getDoc().setCursor.apply(this.mirror.getDoc(), arguments);
    }
    
    , blockComment: function(from, to, options){
      if (!from){
        from = this.mirror.getDoc().getCursor("start");
      };
      if (!to){
        to = this.mirror.getDoc().getCursor("end");
      };
      this.mirror.blockComment(from, to);
    }
    
    , lineComment: function(from, to, options){
      if (!from){
        from = this.mirror.getDoc().getCursor("start");
      };
      if (!to){
        to = this.mirror.getDoc().getCursor("end");
      };
      this.mirror.lineComment(from, to);
    }
    
    , uncomment: function(from, to, options){
      if (!from){
        from = this.mirror.getDoc().getCursor("start");
      };
      if (!to){
        to = this.mirror.getDoc().getCursor("end");
      };
      this.mirror.uncomment(from, to);
    }
    
    , _setValueAttr: function(parValue){
      this._set("value", parValue);
      this.mirror.getDoc().setValue(parValue);
    }
    
    , _getValueAttr: function(){
      return this.mirror.getDoc().getValue();
    }
    
    , _setTextsizeAttr: function(value){
      domStyle.set(this.domNode, "font-size", value + "px");
      this.resize();
      this.mirror.refresh();
    }
    
    , resize: function(changeSize){
      if (changeSize){
        domGeometry.setMarginBox(this.domNode, changeSize);
      };
      var box = domGeometry.getMarginBox(this.domNode);
      this.mirror.setSize(box.w, box.h);
      
    }
    
    , destroy: function(){
      this.inherited(arguments);
    }
    
  });
});
