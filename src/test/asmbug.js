  
var chunkSize = Math.pow(2, 24);

var heapSize = chunkSize;
var heap = new ArrayBuffer(heapSize);

var asmInstance = asmFactory(window, {
    yuv2rgb: yuv2rgbcalc
}, heap);

asmInstance.init(heapSize);

  
  var imul = Math.imul;
  var min = Math.min;
  var max = Math.max;
  function yuv2rgbcalc(y, u, v, paro){
    y = y|0;
    u = u|0;
    v = v|0;
    
    var r = 0;
    var g = 0;
    var b = 0;
    
    var o = 0;
    
    var a0 = 0;
    var a1 = 0;
    var a2 = 0;
    var a3 = 0;
    var a4 = 0;
    
    a0 = imul(1192, (y - 16)|0)|0;
    a1 = imul(1634, (v - 128)|0)|0;
    a2 = imul(832, (v - 128)|0)|0;
    a3 = imul(400, (u - 128)|0)|0;
    a4 = imul(2066, (u - 128)|0)|0;

    r = (((a0 + a1)|0) >> 10)|0;
    g = (((((a0 - a2)|0) - a3)|0) >> 10)|0;
    b = (((a0 + a4)|0) >> 10)|0;
    
    if ((((r & 255)|0) != (r|0))|0){
      r = min(255, max(0, r)|0)|0;
    };
    if ((((g & 255)|0) != (g|0))|0){
      g = min(255, max(0, g)|0)|0;
    };
    if ((((b & 255)|0) != (b|0))|0){
      b = min(255, max(0, b)|0)|0;
    };
    
    o = 255;
    o = (o << 8)|0;
    o = (o + b)|0;
    o = (o << 8)|0;
    o = (o + g)|0;
    o = (o << 8)|0;
    o = (o + r)|0;
    
    if ((o|0) != paro){
      console.log("difference! y:" + y + " u:" + u + " v:" + v);
      console.log("asm.js: " + paro);
      console.log("plain javascript: " + (o|0));
    };
    
    return o|0;
    
  };
  
  /*
  difference! 31 158 92
Avc.js:405 difference! 34 230 125
Avc.js:405 difference! 136 50 77
Avc.js:405 difference! 21 109 174
Avc.js:405 difference! 16 118 155
Avc.js:405 difference! 42 177 106
*/

asmInstance.doit();


function asmFactory(stdlib, foreign, heap) {
  "use asm";
  
  var imul = stdlib.Math.imul;
  var min = stdlib.Math.min;
  var max = stdlib.Math.max;
  var pow = stdlib.Math.pow;
  var out = new stdlib.Uint8Array(heap);
  var out32 = new stdlib.Uint32Array(heap);
  var inp = new stdlib.Uint8Array(heap);
  var mem = new stdlib.Uint8Array(heap);
  var mem32 = new stdlib.Uint32Array(heap);
  
  
  
  function init(s){
    s = s|0;
    
    var i = 0;
    //var s = 0;
    
    var cacheStart = 0;
    
    // initializing memory (to be on the safe side)
    
    for (i = 0|0; ((i|0) < (s|0))|0; i = (i + 4)|0){
      mem32[((cacheStart + i)|0) >> 2] = 0;
    };
  };
  
  function doit(){
    
    var y = 0;
    var u = 0;
    var v = 0;
    
    var o = 0;
    
    
    y = 31|0;
    u = 158|0;
    v = 92|0;
    o = yuv2rgbcalc(y,u,v)|0;
    foreign.yuv2rgb(y, u, v, o);
    
  };
  

  function yuv2rgbcalc(y, u, v){
    y = y|0;
    u = u|0;
    v = v|0;
    
    var r = 0;
    var g = 0;
    var b = 0;
    
    var o = 0;
    
    var a0 = 0;
    var a1 = 0;
    var a2 = 0;
    var a3 = 0;
    var a4 = 0;
    
    a0 = imul(1192, (y - 16)|0)|0;
    a1 = imul(1634, (v - 128)|0)|0;
    a2 = imul(832, (v - 128)|0)|0;
    a3 = imul(400, (u - 128)|0)|0;
    a4 = imul(2066, (u - 128)|0)|0;

    r = (((a0 + a1)|0) >> 10)|0;
    g = (((((a0 - a2)|0) - a3)|0) >> 10)|0;
    b = (((a0 + a4)|0) >> 10)|0;
    
    if ((((r & 255)|0) != (r|0))|0){
      r = min(255, max(0, r)|0)|0;
    };
    if ((((g & 255)|0) != (g|0))|0){
      g = min(255, max(0, g)|0)|0;
    };
    if ((((b & 255)|0) != (b|0))|0){
      b = min(255, max(0, b)|0)|0;
    };
    
    o = 255;
    o = (o << 8)|0;
    o = (o + b)|0;
    o = (o << 8)|0;
    o = (o + g)|0;
    o = (o << 8)|0;
    o = (o + r)|0;
    
    return o|0;
    
  };
  

  return {
    init: init,
    doit: doit
  };
}

  
  
