define([
  "dojo/_base/declare"
  , "dijit/Tree"
  , "main/moduleLoader!client"
  , "dojo/_base/array"
  , "dijit/layout/ContentPane"
  , "dijit/form/Button"
  , "sol/wgt/Iframe"
  , "sol/wgt/mixin/resize"
  , "dojo/_base/lang"
  , "dojo/dom-class"
  , "dojo/dom-geometry"
  , "dojo/dom-construct"
  , "dijit/form/Select"
  , "main/config"
  , "dojo/topic"
  , "dojox/layout/TableContainer"
], function(
  declare
  , Tree
  , moduleLoader
  , array
  , ContentPane
  , Button
  , Iframe
  , resize
  , lang
  , domClass
  , domGeometry
  , domConstruct
  , Select
  , config
  , topic
  , TableContainer
){
  var musicWgt;
  
  var MusicWgt = declare([Iframe, resize], {
    src: "http://cmd.fm?referer=NodeMirror"
    , "class": "cmdFmWgt"
    , constructor: function(){
      
    }
  });
  
  var MusicTab = declare([ContentPane], {
    title: "music"
    , closable: true
    , buildRendering: function(){
      this.inherited(arguments);
    }
    , onShow: function(){
      domClass.remove(musicWgt.domNode, "invisible");
      musicWgt.domNode.contentWindow.focus();
      this._pos();
    }
    , onHide: function(){
      domClass.add(musicWgt.domNode, "invisible");
    }
    , _pos: function(){
      var pos = domGeometry.position(this.domNode);
      domGeometry.setMarginBox(musicWgt.domNode, { t: pos.y, l: pos.x });
    }
    , resize: function(par){
      this.inherited(arguments);
      musicWgt.resize({
        h: par.h
        , w: par.w
      });
      this._pos();
    }
  });
  
  return declare([
    ContentPane
  ], {
    title: "Ctrl."
    
    , constructor: function(){
      var self = this;
	}
    
    , buildRendering: function(){
      this.inherited(arguments);
      var self = this;
      this.restartBtn = new Button({
        label: "restart Server"
        , onClick: function(){
          self.module.restartServer();
        }
      });
      this.restartBtn.placeAt(this.domNode);
      
      this.playMusicBtn = new Button({
        label: "play Music"
        , onClick: function(){
          var tabs = moduleLoader.getModule("modules/ContentTabs");
          
          if (!musicWgt){
            musicWgt = new MusicWgt({
            });
            domClass.add(musicWgt.domNode, "invisible");
            musicWgt.placeAt(document.body);
          };
          if (!self.musicTab){
            self.musicTab = new MusicTab({
              onClose: function(){
                domClass.add(musicWgt.domNode, "invisible");
                setTimeout(lang.hitch(this, function(){
                  this.destroy();
                }), 0);
                self.musicTab = undefined;
                return true;
              }
            });
          };
          tabs.getIndexOfChild(self.musicTab).then(function(idx){
            if (idx == -1){
              tabs.addChild(self.musicTab);
            };
            try{
              tabs.selectChild(self.musicTab);
            }catch(e){
              // dont care
            };
          });
        }
      });
      config.get("music").then(function(music){
        if (music === false){
          return;
        };
        self.playMusicBtn.placeAt(self.domNode);
      });
      
      self.table = new TableContainer({});
      self.table.placeAt(self.domNode);
      
      //debugger;
      config.get("theme").then(function(theme){
        self.guiStyleSelect = new Select({
          label: "Theme"
          , value: theme || "claro"
          , options: [{
            label: "classic"
            , value: "claro"
          }, {
            label: "dark (beta)"
            , value: "dark"
          }, {
            label: "soria"
            , value: "soria"
          }, {
            label: "tundra"
            , value: "tundra"
          }, {
            label: "nihilo"
            , value: "nihilo"
          }]
          , onChange: function(){
            array.forEach(this.options, function(option){
              domClass.remove(document.body, option.value);
            });
            domClass.add(document.body, this.get("value"));
            config.set("theme", this.get("value"));
            topic.publish("client/mainBc/resize");
          }
          , startup: function(){
            //this.inherited(arguments);
            this.onChange();
          }
        });
        self.table.addChild(self.guiStyleSelect);
      });
      
      config.get("tabposition").then(function(tabposition){
        self.tabpositionSelect = new Select({
          label: "Tab Position"
          , value: tabposition || "top"
          , options: [{
            label: "top"
            , value: "top"
          }, {
            label: "bottom"
            , value: "bottom"
          }, {
            label: "right"
            , value: "right"
          }, {
            label: "left"
            , value: "left"
          }]
          , onChange: function(){
            config.set("tabposition", this.get("value"));
            moduleLoader.getModule("modules/ContentTabs").set("tabPosition", this.get("value"));
          }
          , startup: function(){
            this.onChange();
          }
        });
        self.table.addChild(self.tabpositionSelect);
      });
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      var self = this;
      this.inherited(arguments);
    }
    
  });
});
