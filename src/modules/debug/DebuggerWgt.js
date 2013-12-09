define([
  "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "dijit/Toolbar"
  , "dijit/form/Button"
  , "dojo/_base/lang"
  , "sol/node/debug/util"
  , "dojo/Deferred"
  , "./ScriptWgt"
  , "dijit/form/ComboButton"
  , "dijit/Menu"
  , "dijit/MenuItem"
  , "dojo/_base/array"
  , "dijit/form/ToggleButton"
], function(
  declare
  , BorderContainer
  , MenuBar
  , Button
  , lang
  , debugUtil
  , Deferred
  , ScriptWgt
  , ComboButton
  , Menu
  , MenuItem
  , array
  , ToggleButton
){
  return declare([
    BorderContainer
  ], {
    title: "Debugger"
    
    , gutters: false
    
    , constructor: function(options){
      var title = "";
      if (options.type == "js"){
        title += "JavaScript";
      };
      title += " - ";
      title += "port: " + options.port;
      this.title = title;
	}
    
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
      
      this.menu = this.ownObj(new MenuBar({
        region: "top"
      }));
      this.addChild(this.menu);
      
      this.openBtn = this.ownObj(new Button({
        label: "open"
        , onClick: lang.hitch(this, "open")
      }));
      this.menu.addChild(this.openBtn);
      
      this.exceptionBtn = this.ownObj(new ToggleButton({
        label: "Exception"
        , checked: true
        , onChange: function(){
          self.debuggerObj.setExceptionBreak(this.checked ? "all" : undefined);
        }
      }));
      this.menu.addChild(this.exceptionBtn);
      
      /*this.exceptionBreakRotation = [{
        label: "do not break"
      }, {
        label: "break on uncaught"
        , type: "uncaught"
      }, {
        label: "break on exception"
        , type: "all"
      }];
      
      var menu = new Menu({ style: "display: none;"});
      
      array.forEach(this.exceptionBreakRotation, function(entry, index){
        var menuItem = new MenuItem({
          label: entry.label,
          onClick: function(){ 
            self.exceptionBreakRotate(index);
          }
        });
        menu.addChild(menuItem);
      });
      
      
      this.exceptionBreakMenu = this.ownObj(new ComboButton({
        label: this.exceptionBreakRotation[1].label
        , rotation: 1
        , dropDown: menu
        , onClick: function(){
          self.exceptionBreakRotate();
        }
      }));
      this.menu.addChild(this.exceptionBreakMenu);*/
      
    }
    , exceptionBreakRotate: function(par){
      if (par === undefined){
        par = this.exceptionBreakMenu.rotation + 1;
        if (par >= this.exceptionBreakRotation.length){
          par = 0;
        };
      };
      this.exceptionBreakMenu.set("rotation", par);
      this.exceptionBreakMenu.set("label", this.exceptionBreakRotation[par].label);
      this.debuggerObj.setExceptionBreak(this.exceptionBreakRotation[par].type);
    }
    
    , _setStateAttr: function(state){
      this._set("state", state);
      
      var title = "";
      if (this.type == "js"){
        title += "JavaScript";
      };
      title += " - ";
      title += "port: " + this.port;
      title += " - ";
      title += state;
      this.set("title", title);
    }
    
    , getSource: function(parId){
      var self = this;
      var def = new Deferred();
      var source = self.sources[parId];
      if (source){
        def.resolve(source);
      }else{
        self.debuggerObj.getSource(parId).then(function(parSource){
          self.sources[parId] = parSource;
          def.resolve(parSource);
        });
      };
      return def.promise;
    }
    
    , openScript: function(parId){
      var def = new Deferred();
      var self = this;
      require(["main/moduleLoader!client"], function(moduleLoader){
        var tabs = moduleLoader.getModule("modules/ContentTabs");
        
        var wgt = self.scriptWgts[parId];
        if (wgt){
          //tabs.addChild(wgt);
          tabs.selectChild(wgt);
          def.resolve(wgt);
          return;
        };
        
        self.getSource(parId).then(function(parSource){
          wgt = new ScriptWgt({
            debuggerObj: self.debuggerObj
            , debuggerWgt: self
            , source: parSource
          });
          self.scriptWgts[parId] = wgt;
          wgt.on("close", function(){
            delete self.scriptWgts[term.termid];
          });
          tabs.addChild(wgt);
          tabs.selectChild(wgt);
          
          def.resolve(wgt);
          
        });
        
      });
      return def.promise;
    }
    
    , focusBreakPoint: function(){
      var self = this;
      this.openScript(this.breakPoint.script.id).then(function(wgt){
        wgt.setBreakPoint(self.breakPoint);
      });
    }
    
    , open: function(){
      
      if (this.scriptWgts){
        for (var w in this.scriptWgts){
          this.scriptWgts[w].destroy();
        };
        delete this.scriptWgts;
      };
      
      if (this.debuggerObj){
        console.log("close implementation missing");
        return;
      };
      
      this.scriptWgts = {};
      this.sources = {};
      
      var setBreakPointFun = lang.hitch(this, function(par){
        this.breakPoint = debugUtil.dereference(par.frames[0].body, par.frames[0].refs);
        this.focusBreakPoint();
      });
      
      this.module.openDebugger(this.debugId).then(lang.hitch(this, function(debuggerObj){
        this.debuggerObj = debuggerObj;
        this.own(this.debuggerObj);
        this.openBtn.set("label", "close");
        
        this.debuggerObj.on("state", lang.hitch(this, function(par){
          this.set("state", par.data);
        }));
        this.debuggerObj.getState().then(lang.hitch(this, function(parState){
          this.set("state", parState);
          if (parState == "break"){
            this.debuggerObj.getBreakPoint().then(setBreakPointFun);
          };
        }));
        
        this.debuggerObj.on("break", function(par){
          setBreakPointFun(par.data);
        });
      }));
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
    }
    
  });
});
