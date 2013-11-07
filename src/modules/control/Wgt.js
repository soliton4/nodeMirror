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
      
      this.guiStyleSelect = new Select({
        options: [{
          label: "classic"
          , value: "claro"
        }, {
          label: "dark (beta)"
          , value: "dark"
        }]
        , onChange: function(){
          array.forEach(this.options, function(option){
            domClass.remove(document.body, option.value);
          });
          domClass.add(document.body, this.get("value"));
        }
      });
      this.guiStyleSelect.placeAt(this.domNode);
      domClass.add(document.body, "claro");
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
