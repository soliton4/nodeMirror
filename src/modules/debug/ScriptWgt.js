define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "./mode"
  , "modules/contentTabs/tabMixin"
  , "dijit/layout/BorderContainer"
  , "main/codemirror/childMixin"
  , "dijit/Toolbar"
  , "dijit/form/Button"
  , "sol/fileName"
], function(
  declare
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , debugMode
  , tabMixin
  , BorderContainer
  , codeMirrorChildMixin
  , MenuBar
  , Button
  , fileName
){
  
  return declare([BorderContainer, codeMirrorChildMixin, tabMixin], {
    "class": "debug javascript debugScriptWidget"
    
    , gutters: false
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      
      this.menu = this.ownObj(new MenuBar({
        region: "top"
      }));
      this.addChild(this.menu);
      
      this.continueBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "_continue", undefined)
        , label: "continue"
      }));
      this.menu.addChild(this.continueBtn);
      
      this.stepInBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "_continue", "in")
        , label: "step in"
      })); 
      this.menu.addChild(this.stepInBtn);
      
      this.stepNextBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "_continue", "next")
        , label: "next"
      })); 
      this.menu.addChild(this.stepNextBtn);
      
      this.stepOutBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "_continue", "out")
        , label: "step out"
      })); 
      this.menu.addChild(this.stepOutBtn);
      
      this.mirror.set("value", this.source.source);
      
      this.set("title", fileName.single(this.source.name));
      this.set("tooltip", this.source.name);
      
      return ret;
    }
    
    , setBreakPoint: function(bp, exception){
      this.mirror.set("mode", {
        name: "debugging"
        , line: bp.line
        , col: bp.column
        , length: bp.sourceLineText.length - bp.column
        , exception: exception
      });
      this.mirror.setCursor({
        line: bp.line,
        ch: bp.column
      });
    }
    
    , _continue: function(parStep){
      this.debuggerObj.cont(parStep);
    }
    
    , constructor: function(par){
      this.promise = new Deferred();
      this.debuggerObj = par.debuggerObj;
      this.script = par.script;
      this.content = {
        text: "loading code ..."
      };
      
      /*this.debuggerObj.getSource(this.script).then(lang.hitch(this, function(par){
        this.mirror.set("value", par.source);
        this.promise.resolve(this);
      }));*/
    }
    
    , breakPoint: function(parData){
      /*
      invocationText: "#<Server>.[anonymous](req=#<IncomingMessage>, res=#<ServerResponse>)"
script: Object
sourceColumn: 2
sourceLine: 3
sourceLineText: "  debugger;"
__proto__: Object
*/
      //debugger;
      this.mirror.set("mode", {
        name: "debugging"
        , line: parData.sourceLine
        , col: parData.sourceColumn
        , length: parData.sourceLineText.length - parData.sourceColumn
      });
    }
    
    
  });
});
