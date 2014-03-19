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
  , "dojo/dom-geometry"
  , "dojo/has"
  , "dojo/text!modules/terminal/h264iframe.html.txt"
  
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
  , domGeom
  , has
  , iframeText
    
){
  var AvcWgt;
    
  var EventDiv = declare([_WidgetBase, resizeMixin], {
    "class": "x11EventDiv"
    , resize: function(){
      var ret = this.inherited(arguments);
      if (this._contentBox && this.wrapper){
        this.wrapper.set("box", this._contentBox);
        this.wrapper.applyBoxChange();
        domStyle.set(this.coverDiv, "height", this._contentBox.h + "px");
        domStyle.set(this.coverDiv, "width", this._contentBox.w + "px");
      };
      return ret;
    }
    , buildRendering: function(){
      this.inherited(arguments);
      this.coverDiv = domConstruct.create("div", {
        "class": "overlay"
      });
      domConstruct.place(this.coverDiv, this.domNode);
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
      
      var offsetCreator = function(evt){
        if (evt.offsetX === undefined){
          var pos = domGeom.position(eventNode, true);
          evt.offsetX = evt.pageX - pos.x;
          evt.offsetY = evt.pageY - pos.y;
        };
        return evt;
      };
      
      on(eventNode, "mousewheel", function(evt){
        event.stop(evt);
        var e = evt;
        var scroll = e[(!has("mozilla") ? "wheelDelta" : "detail")] * (!has("mozilla") ? 1 : -1);
        //console.log(scroll);
        evt = offsetCreator(evt);
        if (scroll > 0){
          self.module.mouseEvent({
            type: "wheelup"
            , x: evt.offsetX
            , y: evt.offsetY
          });
          
        }else{
          self.module.mouseEvent({
            type: "wheeldown"
            , x: evt.offsetX
            , y: evt.offsetY
          });
          
        };
      });
      
      
      on(eventNode, "mousedown", function(evt){
        event.stop(evt);
        evt = offsetCreator(evt);
        self.module.mouseEvent({
          type: "mousedown"
          , x: evt.offsetX
          , y: evt.offsetY
          , button: evt.button + 1
        });
      });
      on(eventNode, "click", function(evt){
        event.stop(evt);
        //evt = offsetCreator(evt);
        self.keyBoard.focus();
      });
      on(eventNode, "mouseup", function(evt){
        event.stop(evt);
        evt = offsetCreator(evt);
        self.module.mouseEvent({
          type: "mouseup"
          , x: evt.offsetX
          , y: evt.offsetY
          , button: evt.button + 1
        });
      });
      on(eventNode, "mousemove", function(evt){
        event.stop(evt);
        evt = offsetCreator(evt);
        self.module.mouseEvent({
          type: "mousemove"
          , x: evt.offsetX
          , y: evt.offsetY
        });
      });
      on(eventNode, "mouseover", function(evt){
        event.stop(evt);
        evt = offsetCreator(evt);
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
      if (self.nothinghappensTimeout){
        clearTimeout(self.nothinghappensTimeout);
        delete this.nothinghappensTimeout;
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
        delete self.avc;
      };
      
      var i = 0;
      if (self.avcIframes){
        for (i = 0; i < self.avcIframes.length; ++i){
          domConstruct.destroy(self.avcIframes[i]);
        };
        delete self.avcIframes;
      };
      
      if (self.avcs){
        for (i = 0; i < self.avcs.length; ++i){
          self.avcs[i].destroy();
        };
        delete self.avcs;
      };
      
      if (self.vidid){
        self.module.stopX264(self.vidid);
      };
    }
    
    , createVideo: function(){
      console.log("createVideo");
      var self = this;
      if (this._destroyed){
        return;
      };
      
      this.creationProcess = true;
      
      var x11duration = 180;
      
      
      config.get("x11format", "x11fps", "x11quality", "x11maxrate", "x11h264threads", "x11preset").then(function(par){
        if (self._destroyed){
          return false;
        };
        var format = par.x11format;
        var fps = par.x11fps;
        var quality = par.x11quality;
        var maxrate = par.x11maxrate;
        var preset = par.x11preset;
        var h264threads = par.x11h264threads;
        
        self.clearVidTimeout();
        var newVidid = Math.floor(Math.random() * 1000000000);
        if (format == "h264"){
          var h264rows = 1;
          var h264cols = 1;
          var useThreads = false;
          if (h264threads == "4"){
            h264rows = 2;
            h264cols = 2;
            useThreads = true;
          }else if(h264threads == "1"){
            useThreads = true;
          };
          
          var first = true;
          var frames = [];
          var col = 0;
          var colwidth = Math.ceil(self.size.x / h264cols);
          var rowheight = Math.ceil(self.size.y / h264rows);
          for (col; col < h264cols; ++col){
            var x = col * colwidth;
            var width = colwidth;
            if (x + width > self.size.x){
              width = self.size.x - x;
            };
            var row = 0;
            for (row; row < h264rows; ++row){
              var y = row * rowheight;
              var height = rowheight;
              if (y + height > self.size.y){
                height = self.size.y - y;
              };
              frames.push({
                x: x,
                y: y,
                w: width,
                h: height
              });
            };
          };
          self.module.registerX264StreamFunction(function(data, index){
            if (self._destroyed){
              return false;
            };
            
            if (self.nothinghappensTimeout){
              clearTimeout(self.nothinghappensTimeout);
            };
            self.nothinghappensTimeout = setTimeout(function(){
              self.createVideo();
            }, 10000); // ten sec
            
            //console.log("frame");
            if (first){
              self._cleanUp();
              self.vidid = newVidid;
              first = false;
              /*self.avc = new AvcWgt({
                size: {
                  w: self.size.x
                  , h: self.size.y
                }
              });
              self.avc.placeAt(self.eventDiv.domNode);*/
              self.avcs = [];
              var i = 0;
              for (i; i < frames.length; ++i){
                var avc = new AvcWgt({
                  size: {
                    w: frames[i].w
                    , h: frames[i].h
                  },
                  useWorker: useThreads
                });
                //var avciframe = document.createElement('iframe');
                //domConstruct.place(avciframe, self.eventDiv.domNode);
                avc.placeAt(self.eventDiv.domNode);
                
                domStyle.set(avc.domNode, "position", "absolute");
                domStyle.set(avc.domNode, "top", frames[i].y + "px");
                domStyle.set(avc.domNode, "left", frames[i].x + "px");
                self.avcs.push(avc);
              };
              
              self.vidTimeout = setTimeout(function(){
                self.createVideo();
              }, 1000 * (x11duration - 5));
            };
            try{
              self.avcs[index].decodeRaw(base64.toUint8Array(data));
            }catch(e){};

            return true;
          }, {
            fps: fps
            , q: quality
            , vidid: newVidid
            , maxrate: maxrate
            , preset: preset
            , frames: frames
            , duration: x11duration
          });
          
          
        }else{
          //console.log("doing stuff");
          var newVideo = domConstruct.create("video", {
            "class": "x11Video"
            , "src": "x11.stream?vidid=" + newVidid + "&format=" + format + "&fps=" + fps + "&q=" + quality + "&maxrate=" + maxrate + "&preset=" + preset
            //, "autoplay": "autoplay"
            , "type": "video/" + format
          });
          domConstruct.place(newVideo, self.div2.domNode);
          //domConstruct.place(newVideo, self.eventDiv.domNode);
          //return;
          on(newVideo, "canplay", function(){
            if (newVideo.doneThat){
              return;
            };
            newVideo.doneThat = true;
            //console.log("stuff got real");
            if (self._destroyed){
              return false;
            };
            domConstruct.place(newVideo, self.eventDiv.domNode);
            self._cleanUp();
            self.vidid = newVidid;
            self.video = newVideo;
            self.videoPlaying = false;
            self.lastCurrentTime = 0;
            self.progressCounter = 0;
            self.video.play();
            self.creationProcess = false;
            self.clearVidTimeout();
            self.vidTimeout = setTimeout(function(){
              self.createVideo();
            }, 1000 * (x11duration - 5));
          });
          return;
          /*on(newVideo, "ended", lang.hitch(self, function(){
            console.log("ended");
            self.createVideo();
          }));*/
          /*on(newVideo, "playing", lang.hitch(self, function(){
            console.log("playing");
            self.videoPlaying = true;
          }));*/
          
          on(newVideo, "error", lang.hitch(self, function(){
            console.log("error evt");
            self.createVideo();
          }));
          
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
        if (this.video){
          //if (!this.videoPlaying){
            this.video.play();
            //this.videoPlaying = true;
            for (var i = 0; i < 20; ++i){
              this.video.currentTime += 0.1;
            };
          //};
        };
      }catch(e){
      };
      if (this.video){
        //console.log(this.video.currentTime);
      };
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
      if ((this.progressCounter > 250 && !this.creationProcess) || this.progressCounter > 450){
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