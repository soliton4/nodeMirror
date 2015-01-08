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
      
      this._size = new Size(this.size.x || this.size.w || this.size.width, this.size.y || this.size.h || this.size.height);
      
      /*this.canvas = domConstruct.create('canvas');
      this.canvas.width = this._size.w;
      this.canvas.height = this._size.h;
      this.canvas.style.backgroundColor = "#333333";*/
      //domConstruct.place(this.canvas, this.domNode);
      
      this.canvas = domConstruct.create('canvas');
      this.canvas.width = this._size.w;
      this.canvas.height = this._size.h;
      this.canvas.style.backgroundColor = "#333333";
      domConstruct.place(this.canvas, this.domNode);
      
      if (this.webgl){
        this.webGLCanvas = new YUVWebGLCanvas(this.canvas, this._size);
      };
      
      var imgData;
      var ctx;
      var dataPresent = false;
      var processing = false;
      

      if (this.webgl){
        var onPictureDecoded = function(buffer, width, height) {
          if (!buffer) {
            return;
          };
          try{
            var createImgData = false;
            if (width != self._size.w){
              self._size.w = width;
              self.canvas.width = self._size.w;
              createImgData = true;
            };
            if (height != self._size.h){
              self._size.h = height;
              self.canvas.height = self._size.h;
              createImgData = true;
            };
          
          var canvas = self.canvas;
          
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
        
      }else{
        
        var onPictureDecoded = function(buffer, width, height) {
          if (!buffer) {
            return;
          };
          try{
            var createImgData = false;
            if (width != self._size.w){
              self._size.w = width;
              self.canvas.width = self._size.w;
              createImgData = true;
            };
            if (height != self._size.h){
              self._size.h = height;
              self.canvas.height = self._size.h;
              createImgData = true;
            };

            var canvas = self.canvas;
            //var ctx = canvas.getContext('2d');

            if (!imgData || createImgData){
              ctx = canvas.getContext('2d');
              imgData = ctx.createImageData(width, height);
            };
            //var imgBuffer = imgData.data;

            imgData.data.set(buffer);
            dataPresent = true;

            //if (!processing){
            processing = true;
            window.requestAnimationFrame(function(){
              ctx.putImageData(imgData, 0, 0);
              dataPresent = false;
              processing = false;
            });
            //};


            //ctx.putImageData(imgData, 0, 0);
            return;
          }catch(e){
            debugger;
          };
        };
      
      };
      
      
      function _trans(v){
        v = v - 128;
        v = v * 1.18;
        v = v + 128;
        return v;
      };
      
      function yuv2rgb4(y,u,v){
        
        var vt = 1.370705;
        var gt = 0.698001;
        var gt2 = 0.337633;
        var bt = 1.732446;
        
        var r = (y + (vt * (v - 128)));
        var g = (y - (gt * (v - 128)) - (gt2 * (u - 128)));
        var b = (y + (bt * (u - 128)));
        
        
        r = clamp(_trans(r));
        g = clamp(_trans(g));
        b = clamp(_trans(b));
        
        return({r:r,g:g,b:b});
      };
    
      function yuv2rgb3(y,u,v){
        
        var c = y - 16;
        var d = u - 128;
        var e = v - 128;
        
        var r = clamp((298 * c + 409 * e + 128) >> 8);
        var g = clamp(((298 * c) - (100 * d) - (208 * e) + 128) >> 8);
        var b = clamp((298 * c - 516 * d + 128) >> 8);
        
        return({r:r,g:g,b:b});
      }
      
      function yuv2rgb2(y,u,v){
        /*var umax = 0.436;
        var vmax = 0.615;
        
        var wr = 0.299;
        var wb = 0.114;*/
        
        var r = clamp(y + (1.402 * (v - 128)));
        
        var g = clamp(y - (0.344 * (u - 128) + 0.714 * (v - 128)));
        var b = clamp(y + (1.772 * (u - 128)));
        
        return({r:r,g:g,b:b});
      }
      
      function yuv2rgb(y,u,v){
        y=parseInt(y);
        u=parseInt(u);
        v=parseInt(v);
        var r=clamp(Math.floor(y+1.4075*(v-128)),0,255);
        var g=clamp(Math.floor(y-0.3455*(u-128)-(0.7169*(v-128))),0,255);
        var b=clamp(Math.floor(y+1.7790*(u-128)));
        return({r:r,g:g,b:b});
      }

      function clamp(n){
        if(n<0){return 0;}
        if(n>255){return 255;}
        return n;
      }
      
      this.config = this.config || {};
      this.config.webgl = this.webgl;

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
        }, false);
        this.onPictureDecoded = onPictureDecoded;
        this.worker.postMessage(this.config); // Send data to our worker.
        
      }else{
        this.avc = new Avc({webgl: this.webgl});
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
          this.worker.postMessage(data.buffer, [data.buffer]); // Send data to our worker.
        }else{
          this.avc.decode(data);
        };
      }catch(e){};
    }
    /*, decodeBase64: function(data){
      
    }*/
    
  });
  
});