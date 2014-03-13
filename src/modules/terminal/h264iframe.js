define([
  "avc/Wgt"
, "sol/base64"
], function(
  AvcWgt
  , base64
){
    var wgt;
    
    var initAvc = function(){
      if (window.avcframedata){
        wgt = new AvcWgt({
          size: {
            w: window.avcframedata.w
            , h: window.avcframedata.h
          },
          useWorker: true
        });
        wgt.placeAt(document.body);
        var i = 0;
        for (i; i < window.frameBufferAr.length; ++i){
          wgt.decodeRaw(base64.toUint8Array(window.frameBufferAr[i]));
        };
        delete window.frameBufferAr;
        window.onmessage = function(e){
          setTimeout(function(){
            wgt.decodeRaw(base64.toUint8Array(e.data));
          }, 1);
        };
      };
    };
    window.onmessage = function(e){
        if (e.data){
          if (e.data.h && e.data.w){
            window.avcframedata = e.data;
            initAvc();
          };
        };
    };
    initAvc();
  
  
  return {};
});
