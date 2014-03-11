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
          }
        });
        wgt.placeAt(document.body);
        window.onmessage = function(e){
          wgt.decodeRaw(base64.toUint8Array(e.data));
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
