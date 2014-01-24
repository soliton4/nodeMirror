define([
  "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "client/connection"
  , "sol/wgt/Text"
  , "main/config"
  , "dojo/dom-class"
  , "modules/contentTabs/tabMixin"
  , "dojo/dom-construct"
  , "sol/wgt/Node"
  , "dojo/on"
  , "dojo/_base/lang"
  , "dojo/_base/event"
  , "sol/wgt/KeyboardInput"
  , "dijit/Toolbar"
  , "dijit/form/Select"
  , "dijit/form/Button"
  , "dojo/dom-style"
  , "sol/base64"
  , "avc/Wgt"
  
], function(
  declare
  , BorderContainer
  , connection
  , Text
  , config
  , domClass
  , tabMixin
  , domConstruct
  , Node
  , on
  , lang
  , event
  , KeyboardInput
  , Toolbar
  , Select
  , Button
  , domStyle
  , base64
  , AvcWgt
    
){
  var vidid = 0;
  
  return declare([BorderContainer, tabMixin], {
    title: "X11 - h264"
    , gutters: false
    , closable: true
    , "class": "x11 x11Tab x264Tab"
    
    , onShow: function(){
      this.keyBoard.focus();
      return this.inherited(arguments);
    }
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
      
      this.toolBar = this.ownObj(new Toolbar({
        region: "top"
      }));
      this.addChild(this.toolBar);
      
      this.fullScreenBtn = this.ownObj(new Button({
        label: "Fullscreen"
        , onClick: function(){
          var element = self.div.domNode;
          self.stopResize = true;
          domStyle.set(element, "top", "0");
          domStyle.set(element, "left", "0");
          domStyle.set(element, "width", "100%");
          domStyle.set(element, "height", "100%");
          if(element.requestFullscreen) {
            element.requestFullscreen();
          } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
          };
        }
      }));
      this.toolBar.addChild(this.fullScreenBtn);

      this.keyBoard = this.ownObj(new KeyboardInput({
        region: "top"
      }));
      this.addChild(this.keyBoard);
      
      var keyMap = {
        "188": "comma"
        , "190": "period"
        , "191": "slash"
        , "186": "somicolon"
        , "222": "quotedbl"
        , "189": "minus"
        , "187": "equal"
        , "192": "grave"
        , "219": "bracketleft"
        , "221": "bracketright"
        , "220": "backslash"
      };
      
      this.keyBoard.on("keydown", function(e){
        
        var charStr = self.keyBoard.lookupCode(e.keyCode);
        
        if (!charStr){
          charStr = keyMap[e.keyCode];
        };
        
        if (!charStr){
          
          if (e.charCode) {
            charStr = String.fromCharCode(e.charCode).toLowerCase();
          } else {
            charStr = String.fromCharCode(e.keyCode).toLowerCase();
          };
        };
        
        self.module.keyEvent({
          type: "keydown"
          , charOrCode: charStr
        });
        
      });
      this.keyBoard.on("keyup", function(e){
        
        var charStr = self.keyBoard.lookupCode(e.keyCode);
        
        if (!charStr){
          charStr = keyMap[e.keyCode];
        };
        
        if (!charStr){
          if (e.charCode) {
            charStr = String.fromCharCode(e.charCode).toLowerCase();
          } else {
            charStr = String.fromCharCode(e.keyCode).toLowerCase();
          };
        };
        
        self.module.keyEvent({
          type: "keyup"
          , charOrCode: charStr
        });
        
      });
      
      this.div = this.ownObj(new Node({
        tagName: "div"
        , "class": "x11divWraper"
        , tagAttributes: {
          "class": "x11divWraper"
        }
        , region: "center"
      }));
      this.addChild(this.div);
      this.avc = new AvcWgt({
        size: {
          w: 1024
          , h: 768
        }
      });
      this.avc.placeAt(this.div.domNode);
      
      this.createVideo();
      
      return;
      
    }
    
    , resize: function(){
      var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
      if (fullscreenElement){
        return;
      };
      var ret = this.inherited(arguments);
      return ret;
    }
    
    , createVideo: function(){
      var self = this;
      if (this._destroyed){
        return;
      };
      
      this.creationProcess = true;
      
      this.module.registerX264StreamFunction(function(data){
        if (self._destroyed){
          return false;
        };
        //var frameData = base64.toUint8Array(data);
        self.avc.decode(base64.toUint8Array(data));
        
        return true;
      });
      
      //this.clearVidTimeout();
      //var format = this.formatSelect.get("value") || "ogg";
      
      var newVidid = Math.floor(Math.random() * 1000000000);
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      //this.playFun();
      this.keyBoard.focus();
    }
    
    , onHide: function(){
      this.keyBoard.blur();
      return this.inherited(arguments);
    }
    
    , destroy: function(){
      try{
        this.module.x11vidkill(this.vidid);
      }catch(e){}
      this.inherited(arguments);
    }
  });
});