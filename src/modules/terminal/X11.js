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
  , "dijit/form/NumberSpinner"
  , "./X11Settings"
  , "dijit/_WidgetBase"
  , "sol/wgt/mixin/resize"
  , "dijit/form/DropDownButton"
  , "sol/base64"
  , "require" //"avc/Wgt"
  
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
  , NumberSpinner
  , X11Settings
  , _WidgetBase
  , resizeMixin
  , DropDownButton
  , base64
  , require //AvcWgt
    
){
  var AvcWgt;
    
  var EventDiv = declare([_WidgetBase, resizeMixin], {
    "class": "x11EventDiv"
    , resize: function(){
      var ret = this.inherited(arguments);
      if (this._contentBox && this.wrapper){
        this.wrapper.set("box", this._contentBox);
        this.wrapper.applyBoxChange();
      };
      return ret;
    }
  });

  var WrapperDiv = declare([_WidgetBase, resizeMixin], {
    "class": "x11WrapperDiv"
    , resize: function(){
      var ret = this.inherited(arguments);
      this.applyBoxChange();
      return ret;
    }
    , applyBoxChange: function(){
      if (!(this.box && this._contentBox)){
        return;
      };
      if (this.box.h > this._contentBox.h || this.box.w > this._contentBox.w){
        domClass.add(this.domNode, "showScroll");
      }else{
        domClass.remove(this.domNode, "showScroll");
      };
    }
  });

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
      
      this.settingsBtn = this.ownObj(new DropDownButton({
        label: "Settings",
        dropDown: new X11Settings({
          applyChange: lang.hitch(this, function(){
            this.module.stopX264();
            this.createVideo();
          })
        })
      }));
      this.toolBar.addChild(this.settingsBtn);

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
      
      this.div = this.ownObj(new WrapperDiv({
        region: "center"
      }));
      this.addChild(this.div);
      
      this.eventDiv = this.ownObj(new EventDiv({
        wrapper: this.div
      }));
      this.eventDiv.placeAt(this.div.domNode);
      
      var eventNode = this.eventDiv.domNode;
      
      on(eventNode, "mousedown", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mousedown"
          , x: evt.offsetX
          , y: evt.offsetY
          , button: evt.button + 1
        });
      });
      on(eventNode, "click", function(evt){
        event.stop(evt);
        self.keyBoard.focus();
      });
      on(eventNode, "mouseup", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mouseup"
          , x: evt.offsetX
          , y: evt.offsetY
          , button: evt.button + 1
        });
      });
      on(eventNode, "mousemove", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mousemove"
          , x: evt.offsetX
          , y: evt.offsetY
        });
      });
      on(eventNode, "mouseover", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mousemove"
          , x: evt.offsetX
          , y: evt.offsetY
        });
      });
      on(eventNode, "contextmenu", function(evt){
        event.stop(evt);
      });
      
      
      
      this.div2 = this.ownObj(new Node({
        tagName: "div"
        , "class": "x11div2"
        , region: "bottom"
      }));
      this.addChild(this.div2);
      
      //this.createVideo();
      
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
    
    , _cleanUp: function(){
      var self = this;
            if (self.video){
              domConstruct.destroy(self.video);
              self.module.x11vidkill(self.vidid);
            };
      if (self.avc){
        self.avc.destroy();
      };
      if (self.vidid){
        self.module.stopX264(self.vidid);
      };
    }
    
    , createVideo: function(){
      var self = this;
      if (this._destroyed){
        return;
      };
      
      this.creationProcess = true;
      
      
      config.get("x11format", "x11fps", "x11quality").then(function(par){
        if (self._destroyed){
          return false;
        };
        var format = par.x11format;
        var fps = par.x11fps;
        var quality = par.x11quality;
        
        self.clearVidTimeout();
        var newVidid = Math.floor(Math.random() * 1000000000);
        if (format == "h264"){
          var first = true;
          self.module.registerX264StreamFunction(function(data){
            if (self._destroyed){
              return false;
            };
            if (first){
              self._cleanUp();
              self.vidid = newVidid;
              first = false;
              self.avc = new AvcWgt({
                size: {
                  w: self.size.x
                  , h: self.size.y
                }
              });
              self.avc.placeAt(self.eventDiv.domNode);
              self.vidTimeout = setTimeout(function(){
                self.createVideo();
              }, 1000 * 175);
            };
            //var frameData = base64.toUint8Array(data);
            self.avc.decode(base64.toUint8Array(data));

            return true;
          }, {
            fps: fps
            , q: quality
            , vidid: newVidid
          });
          
          
        }else{
          var newVideo = domConstruct.create("video", {
            "class": "x11Video"
            , "src": "x11.stream?vidid=" + newVidid + "&format=" + format + "&fps=" + fps + "&q=" + quality
            , "autoplay": "autoplay"
            , "type": "video/" + format
          });
          domConstruct.place(newVideo, self.div2.domNode);
          on(newVideo, "canplay", function(){
            if (self._destroyed){
              return false;
            };
            domConstruct.place(newVideo, self.eventDiv.domNode);
            self._cleanUp();
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
          on(newVideo, "ended", lang.hitch(self, "createVideo"));
          on(newVideo, "error", lang.hitch(self, "createVideo"));
          
        };
      });
      /*on(newVideo, "playing", function(){
        self.vidTimeout = setTimeout(function(){
          self.createVideo();
        }, 1000 * 175);
      });*/
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
        return;
        //this.progressCounter++;
      };
      if ((this.progressCounter > 10 * 5 && !this.creationProcess) || this.progressCounter > 10 * 20){
        this.createVideo();
      };
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      var self = this;
      this.inherited(arguments);
      this.size = {
        x: 800
        , y: 600
      };
      this.module.x11size().then(function(size){
        self.size.x = size.x;
        self.size.y = size.y;
        self.eventDiv.resize({
          h: size.y
          , w: size.x
        });
        require(["avc/Wgt"], function(wgt){
          AvcWgt = wgt;
          self.createVideo();
          self.playFun();
        });
      });
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
      this._cleanUp();
      this.module.stopX264();
      this.inherited(arguments);
    }
  });
});