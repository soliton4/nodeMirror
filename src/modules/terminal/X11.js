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
      
      this.keyBoard = this.ownObj(new KeyboardInput({
        region: "top"
      }));
      this.addChild(this.keyBoard);
      this.keyBoard.on("keydown", function(e){
        
        var charStr = self.keyBoard.lookupCode(e.keyCode);
        
        if (!charStr){
          if (e.charCode) {
            charStr = String.fromCharCode(e.charCode);
          } else {
            charStr = String.fromCharCode(e.keyCode);
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
          if (e.charCode) {
            charStr = String.fromCharCode(e.charCode);
          } else {
            charStr = String.fromCharCode(e.keyCode);
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
      
      this.createVideo();
      
      return;
      
    }
    
    , createVideo: function(){
      if (this._destroyed){
        return;
      };
      if (this.video){
        domConstruct.destroy(this.video);
      };
      if (this.vidTimeout){
        clearTimeout(this.vidTimeout);
        delete this.vidTimeout;
      };
      var self = this;
      this.video = domConstruct.create("video", {
        "class": "x11Video"
        , "src": "x11.webm?vidid=" + (vidid++)
        , "autoplay": "autoplay"
        //, "type": "video/webm"
      });
      domConstruct.place(this.video, this.div.domNode);
      on(this.video, "ended", lang.hitch(this, "createVideo"));
      on(this.video, "error", lang.hitch(this, "createVideo"));
      on(this.video, "playing", function(){
        self.vidTimeout = setTimeout(function(){
          self.createVideo();
        }, 1000 * 175);
      });
      on(this.video, "mousedown", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mousedown"
          , x: evt.offsetX
          , y: evt.offsetY
          , button: evt.button + 1
        });
      });
      on(this.video, "click", function(evt){
        event.stop(evt);
        self.keyBoard.focus();
      });
      on(this.video, "mouseup", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mouseup"
          , x: evt.offsetX
          , y: evt.offsetY
          , button: evt.button + 1
        });
      });
      on(this.video, "mousemove", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mousemove"
          , x: evt.offsetX
          , y: evt.offsetY
        });
      });
      on(this.video, "mouseover", function(evt){
        event.stop(evt);
        self.module.mouseEvent({
          type: "mousemove"
          , x: evt.offsetX
          , y: evt.offsetY
        });
      });
      on(this.video, "contextmenu", function(evt){
        event.stop(evt);
      });
    }
    
    , playFun: function(){
      if (this._destroyed){
        return;
      };
      setTimeout(lang.hitch(this, "playFun"), 100);
      this.video.play();
      try{
        this.video.currentTime += 1;
      }catch(e){
      }
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
  });
});