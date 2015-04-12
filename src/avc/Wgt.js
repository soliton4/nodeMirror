define([
 "dijit/_WidgetBase"
, "dojo/_base/declare"
, "dojo/dom-construct"
, "sol/base64"
, "./Player"
, "main/config"
], function(
 _WidgetBase
, declare
, domConstruct
, base64
, Player
, config
){

  var webPathStr;
  config.get("webpath").then(function(par){
    webPathStr = par;
  });
  
  //var YUVWebGLCanvas = canvas.YUVWebGLCanvas;
  
  /*var Size = (function size() {
    function constructor(w, h) {
      this.w = w;
      this.h = h;
    }
    constructor.prototype = {
      toString: function () {
        return "(" + this.w + ", " + this.h + ")";
      },
      getHalfSize: function() {
        return new Size(this.w >>> 1, this.h >>> 1);
      },
      length: function() {
        return this.w * this.h;
      }
    };
    return constructor;
  })();*/
    
  var concatUint8 = function(parAr) {
    if (!parAr || !parAr.length){
      return new Uint8Array(0);
    };
    var completeLength = 0;
    var i = 0;
    var l = parAr.length;
    for (i; i < l; ++i){
      completeLength += parAr[i].byteLength;
    };
    
    var res = new Uint8Array(completeLength);
    var filledLength = 0;
    
    for (i = 0; i < l; ++i){
      res.set(new Uint8Array(parAr[i]), filledLength);
      filledLength += parAr[i].byteLength;
    };
    
    return res;
    
  };
  
  return declare([_WidgetBase], {
    size: {
      x: 640
    , y: 360
    }
    
    , constructor: function(){
      this.bufferAr = [];
    }
    , config: {
      //filter: "original",
      //filterHorLuma: "optimized",
      //filterVerLumaEdge: "optimized",
      //getBoundaryStrengthsA: "optimized"
    }
    /*, destroy: function(){
      try{
        window.cancelAnimationFrame(this.animationHandler);
      }catch(e){
        debugger;
      };
      this.inherited(arguments);
    }*/
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
      
      
      this.player = new Player({
        useWorker: this.useWorker,
        workerFile: webPathStr + "avc/Decoder.js",
        webgl: this.webgl ? "auto" : false,
        size: {
          width: this.size.x || this.size.w || this.size.width, 
          height: this.size.y || this.size.h || this.size.height
        }
      });
      domConstruct.place(this.player.canvas, this.domNode);
      
      /*
      
      useWorker true / false
decode in a worker thread

workerFile 
path to Decoder.js. Only neccessary when using worker. defaults to "Decoder.js"

webgl true / "auto" / false
use webgl. defaults to "auto"
*/
    }
    
    // you can call this function with raw h264 data
    // it will try to detect frames
    , decodeRaw: function(data){
      if (!(data && data.length)){
        return;
      };
      var self = this;
      var foundHit = false;
      var hit = function(offset){
        foundHit = true;
        self.bufferAr.push(data.subarray(0, offset));
        self.decode( concatUint8(self.bufferAr) );
        self.bufferAr = [];
        self.bufferAr.push(data.subarray(offset));
      };
      
      var b = 0;
      var l = data.length;
      var zeroCnt = 0;
      for (b; b < l; ++b){
        if (data[b] === 0){
          zeroCnt++;
        }else{
          if (data[b] == 1){
            if (zeroCnt >= 3){
              hit(b - 3);
              break;
            };
          };
          zeroCnt = 0;
        };
      };
      if (!foundHit){
        this.bufferAr.push(data);
      };
      
    }
    
    , decode: function(data){
      try{
        this.player.decode(data);
      }catch(e){};
    }
    /*, decodeBase64: function(data){
      
    }*/
    
  });
  
});