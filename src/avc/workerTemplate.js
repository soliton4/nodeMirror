var avc = new Avc();

var config = null;

onPictureDecoded = function (buffer, width, height) {
    self.postMessage({picture: buffer, width: width, height: height});
};
avc.onPictureDecoded = onPictureDecoded;


var evtFun = function(data){
  avc.configure(data);
  
  evtFun = function(data){
    avc.decode(data);
  };
  
};

self.addEventListener('message', function(e) {
  evtFun(e.data);
}, false);

