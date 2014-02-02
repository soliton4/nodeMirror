define([
  "./Avc"
, "dijit/_WidgetBase"
, "dojo/_base/declare"
, "./canvas"
, "dojo/dom-construct"
], function(
  Avc
, _WidgetBase
, declare
, canvas
, domConstruct
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
  
  return declare([_WidgetBase], {
    size: {
      x: 640
    , y: 360
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
        }catch(e){};
      };
      
      this.avc = new Avc();
      this.avc.configure(this.config);
      this.avc.onPictureDecoded = onPictureDecoded;
      
    }
    
    , decode: function(data){
      this.avc.decode(data);
    }
    /*, decodeBase64: function(data){
      
    }*/
    
  });
  
});