define([
  "./Avc"
, "dijit/_WidgetBase"
, "dojo/_base/declare"
, "./canvas"
, "dojo/dom-construct"
, "sol/base64"
], function(
  Avc
, _WidgetBase
, declare
, canvas
, domConstruct
, base64
){
  var YUVWebGLCanvas = canvas.YUVWebGLCanvas;
  
  var Size = (function size() {
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
  })();
    
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
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
      
      this._size = new Size(this.size.x || this.size.w || this.size.width, this.size.y || this.size.h || this.size.height);
      
      this.canvas = domConstruct.create('canvas');
      this.canvas.width = this._size.w;
      this.canvas.height = this._size.h;
      this.canvas.style.backgroundColor = "#333333";
      domConstruct.place(this.canvas, this.domNode);
      
      this.webGLCanvas = new YUVWebGLCanvas(this.canvas, this._size);
      
      
      var onPictureDecoded = function(buffer, width, height) {
        if (!buffer) {
          return;
        };
        try{
          if (width != self._size.w){
            self._size.w = width;
            self.canvas.width = self._size.w;
          };
          if (height != self._size.h){
            self._size.h = height;
            self.canvas.height = self._size.h;
          };
          var lumaSize = width * height;
          var chromaSize = lumaSize >> 2;
          
          self.webGLCanvas.YTexture.fill(buffer.subarray(0, lumaSize));
          self.webGLCanvas.UTexture.fill(buffer.subarray(lumaSize, lumaSize + chromaSize));
          self.webGLCanvas.VTexture.fill(buffer.subarray(lumaSize + chromaSize, lumaSize + 2 * chromaSize));
          self.webGLCanvas.drawScene();
        }catch(e){
          debugger;
        };
      };
      
      if (this.useWorker){
        var lastDim = {};
        this.worker = new Worker("avc/worker.js");
        this.worker.addEventListener('message', function(e) {
          var data = e.data;
          if (data.width){
            lastDim = data;
            return;
          };
          onPictureDecoded(new Uint8Array(data), lastDim.width, lastDim.height);
          /*var ar = e.data.picture;
          var u8 = new Uint8Array(ar.length);
          var l = ar.length;
          var i = 0;
          for (i; i < l; ++i){
            u8[i] = ar[i];
          };
          onPictureDecoded(u8, e.data.width, e.data.height);*/
          
          //console.log('Worker said: ', e.data);
          //setTimeout(function(){
          //debugger;
          //onPictureDecoded(base64.toUint8Array(e.data.picture), e.data.width, e.data.height);
          /*var u8 = new Uint8Array(atob(e.data.picture).split("").map(function(c) {
            return c.charCodeAt(0); 
          }));
          onPictureDecoded(u8, e.data.width, e.data.height);*/
          //onPictureDecoded(atob(e.data.picture), e.data.width, e.data.height);
          
          //}, 10);*/
        }, false);
        this.onPictureDecoded = onPictureDecoded;
        this.worker.postMessage(this.config); // Send data to our worker.
        
      }else{
        this.avc = new Avc();
        this.avc.configure(this.config);
        this.avc.onPictureDecoded = onPictureDecoded;
      };
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
        if (this.useWorker){
          this.worker.postMessage(data); // Send data to our worker.
        }else{
          this.avc.decode(data);
        };
      }catch(e){};
    }
    /*, decodeBase64: function(data){
      
    }*/
    
  });
  
});