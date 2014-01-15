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
    
){
  var vidid = 0;
  
  return declare([BorderContainer, tabMixin], {
    title: "X11"
    , gutters: false
    , closable: true
    , "class": "x11 x11Tab"
    
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
      
      this.formatSelect = this.ownObj(new Select({
        options: [{
          label: "ogg"
          , value: "ogg"
        }, {
          label: "webm"
          , value: "webm"
        }]
        , onChange: function(){
          self.createVideo();
        }
      }));
      this.toolBar.addChild(this.formatSelect);

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
      
      this.div2 = this.ownObj(new Node({
        tagName: "div"
        , "class": "x11div2"
        , region: "bottom"
      }));
      this.addChild(this.div2);
      
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
    
    , clearVidTimeout: function(){
      if (this.vidTimeout){
        clearTimeout(this.vidTimeout);
        delete this.vidTimeout;
      };
    }
    
    , createVideo: function(){
      var self = this;
      if (this._destroyed){
        return;
      };
      
      this.creationProcess = true;
      
      this.clearVidTimeout();
      var format = this.formatSelect.get("value") || "ogg";
      
      var newVidid = Math.floor(Math.random() * 1000000000);
      var newVideo = domConstruct.create("video", {
        "class": "x11Video"
        , "src": "x11.stream?vidid=" + newVidid + "&format=" + format
        , "autoplay": "autoplay"
        , "type": "video/" + format
      });
      domConstruct.place(newVideo, self.div2.domNode);
      on(newVideo, "canplay", function(){
        domConstruct.place(newVideo, self.div.domNode);
        if (self.video){
          domConstruct.destroy(self.video);
          self.module.x11vidkill(self.vidid);
        };
        self.vidid = newVidid;
        self.video = newVideo;
        self.lastCurrentTime = 0;
        self.progressCounter = 0;
        self.video.play();
        self.creationProcess = false;
        self.clearVidTimeout();
        self.vidTimeout = setTimeout(function(){
          self.createVideo();
        }, 1000 * 175);
      });
      on(newVideo, "ended", lang.hitch(this, "createVideo"));
      on(newVideo, "error", lang.hitch(this, "createVideo"));
      /*on(newVideo, "playing", function(){
        self.vidTimeout = setTimeout(function(){
          self.createVideo();
        }, 1000 * 175);
      });*/
      on(newVideo, "mousedown", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mousedown"
          , x: evt.offsetX
          , y: evt.offsetY
          , button: evt.button + 1
        });
      });
      on(newVideo, "click", function(evt){
        event.stop(evt);
        self.keyBoard.focus();
      });
      on(newVideo, "mouseup", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mouseup"
          , x: evt.offsetX
          , y: evt.offsetY
          , button: evt.button + 1
        });
      });
      on(newVideo, "mousemove", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mousemove"
          , x: evt.offsetX
          , y: evt.offsetY
        });
      });
      on(newVideo, "mouseover", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mousemove"
          , x: evt.offsetX
          , y: evt.offsetY
        });
      });
      on(newVideo, "contextmenu", function(evt){
        event.stop(evt);
      });
    }
    
    , playFun: function(){
      if (this._destroyed){
        return;
      };
      setTimeout(lang.hitch(this, "playFun"), 100);
      try{
        this.video.play();
        for (var i = 0; i < 20; ++i){
          this.video.currentTime += 0.1;
        };
      }catch(e){
      }
      if (this.video){
        if (this.video.currentTime == this.lastCurrentTime){
          this.progressCounter++;
        }else{
          this.progressCounter = 0;
        };
        this.lastCurrentTime = this.video.currentTime;
      }else{
        this.progressCounter++;
      };
      if ((this.progressCounter > 10 * 5 && !this.creationProcess) || this.progressCounter > 10 * 20){
        this.createVideo();
      };
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      this.playFun();
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