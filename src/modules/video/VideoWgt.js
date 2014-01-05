define([
  "dojo/_base/declare"
  , "dijit/_WidgetBase"
  , "sol/wgt/mixin/resize"
  , "dojo/dom-construct"
  , "sol/convenient/Delayed"
  , "dojo/Deferred"
  , "dojo/dom-style"
  , "dojo/on"
], function(
  declare
  , _WidgetBase
  , resizeMixin
  , domConstruct
  , Delayed
  , Deferred
  , domStyle
  , on
){
  
  
  function _preferedVideoFormat()
  {
    var vidTest = document.createElement("video");
    if(!vidTest || !vidTest.canPlayType){
      return;
    };
    
    var oggString = 'video/ogg; codecs="theora, vorbis"';
    var mp4String = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    
    var oggTest = vidTest.canPlayType(oggString);
    var h264Test = vidTest.canPlayType(mp4String);
    
    if (oggTest == "probably"){
      return {
        type: "ogg"
        , str: oggString
      };
    };
    
    if (h264Test == "probably"){
      return {
        type: "mp4"
        , str: mp4String
      };
    };

    if (oggTest == "maybe"){
      return {
        type: "ogg"
        , str: oggString
      };
    };
    
    if (h264Test == "maybe"){
      return {
        type: "mp4"
        , str: mp4String
      };
    };
  };
  
  var preferedVideoFormat = function(){
    var format = _preferedVideoFormat();
    preferedVideoFormat = function(){
      return format;
    };
    return format;
  };
    
    
    
    
  return declare([_WidgetBase, resizeMixin], {
    
    junkSize: 20
    
    , position: 0
    , duration: 0
    
    , buildRendering: function(){
      var self = this;
      var ret = this.inherited(arguments);
      this.buffer = {
        
      };
      this.fillCache();
      on(this.domNode, "click", function(){
        self.play();
      });
      return ret;
    },
    
    _getJunkNo: function(pos){
      return Math.floor(pos / this.junkSize);
    }
    
    , play: function(){
      var self = this;
      this.fillCache();
      var currentJunk = this._getJunkNo(this.position);
      this.buffer[currentJunk].then(function(nodes){
        self.curVidNode = nodes.v;
        self.curANode = nodes.a;
        self.currentJunkNo = currentJunk;
        self.nextJunkNo = currentJunk + 1;
        if (self.buffer[self.nextJunkNo]){
          self.buffer[self.nextJunkNo].then(function(nodes2){
            self.nextVidNode = nodes2.v;
            self.nextANode = nodes2.a;
            self.startLoop();
          });
        };
      });
    }
    
    , startLoop: function(){
      if (this._loopRunning){
        return;
      };
      var self = this;
      domStyle.set(self.curVidNode, "display", "");
      
      var switchFun = function(){
        setTimeout(switchFun, self.junkSize * 1000);
        self.nextVidNode.play();
        self.nextANode.play();
        self.curVidNode.pause();
        self.curANode.pause();
        
        domStyle.set(self.nextVidNode, "display", "");
        domStyle.set(self.curVidNode, "display", "none");
        self.position = self.nextJunkNo * self.junkSize;
        
        self.curVidNode = self.nextVidNode;
        self.curANode = self.nextANode;
        self.currentJunkNo = self.nextJunkNo;
        self.fillCache();
        
        self.nextJunkNo = self.currentJunkNo + 1;
        if (self.buffer[self.nextJunkNo]){
          self.buffer[self.nextJunkNo].then(function(nodes){
            self.nextVidNode = nodes.v;
            self.nextANode = nodes.a;
          });
        };
      };
      
      //var doit = function(){
        setTimeout(switchFun, self.junkSize * 1000);
      //};
      
      self.curVidNode.play();
      self.curANode.play();
      
    }
    
    , fillCache: function(){
      var currentJunk = this._getJunkNo(this.position);
      var lastJunk = this._getJunkNo(this.duration);
      var last = Math.min(currentJunk + 1, lastJunk) + 1;
      var i;
      for(i = currentJunk; i < last; ++i){
        if (!this.buffer[i]){
          this.buffer[i] = this._getJunkDef(i);
        };
      };
      if (this.buffer[currentJunk - 1]){
        this.buffer[currentJunk - 1].then(function(nodes){
          try{
            domConstruct.destroy(nodes.v);
          }catch(e){
            debugger;
          };
          try{
            domConstruct.destroy(nodes.a);
          }catch(e){
            debugger;
          };
        });
        delete this.buffer[currentJunk - 1];
      };
    },
    
    _getJunkDef: function(junkNo){
      var self = this;
      var def = new Deferred();
      this.module.getJunkPs(self.par.id, {
        width: (self._contentBox && self._contentBox.w) || 100
        , height: (self._contentBox && self._contentBox.h) || 100
        , type: preferedVideoFormat()
        , junk: junkNo
        , junkSize: self.junkSize
      }).then(function(par){
        var vidNode = domConstruct.create("video", {
          src: "data:video/" + preferedVideoFormat().type + ";base64," + par.base64Src
          , type: "video/" + preferedVideoFormat().type
          , controls: "controls"
          , style: {
            display: "none"
          }
        });
        var aNode = domConstruct.create("audio", {
          src: "data:audio/" + preferedVideoFormat().type + ";base64," + par.base64AudioSrc
          , type: "audio/" + preferedVideoFormat().type
          , style: {
            display: "none"
          }
        });
        domConstruct.place(vidNode, self.domNode);
        domConstruct.place(aNode, self.domNode);
        setTimeout(function(){
          try{
            aNode.currentTime = aNode.duration - self.junkSize -1;
          }catch(e){};
        }, 1000);
        def.resolve({v: vidNode, a: aNode});
      });
      
      return def.promise;
    },
    
    resize: function(){
      var ret = this.inherited(arguments);
      //this.load();
      return ret;
    }
  });
});
