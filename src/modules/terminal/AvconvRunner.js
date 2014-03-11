define([
  "dojo/_base/declare"
, "main/config"
, "dojo/node!child_process"
, "dojo/_base/lang"
], function(
  declare
, config
, child_process
, lang
){
  var x11videotool = "avconv";
  config.get("x11videotool").then(function(par){
    x11videotool = par || "avconv";
  });
  var spawn  = child_process.spawn;
  
  return declare([], {
    fps: "5"
    , quality: "5"
    , constructor: function(par){
      declare.safeMixin(this, par);
      
      var params = [
        "-re",                   // Real time mode
        "-f","x11grab",          // Grab screen
        "-r", this.fps,              // Framerate
        "-s", "" + this.dim.w + "x" + this.dim.h,   // Capture size

        "-i", ":0+" + this.dim.x + "," + this.dim.y, // Capture offset
        "-g", "0",                // All frames are i-frames
        "-me_method","zero",     // Motion algorithms off
        "-flags2","fast",
        "-vcodec", "libx264",      // vp8 encoding / ogg encoding
        "-preset","ultrafast",
        "-tune","zerolatency",
        //"-b:v","1000000",             // Target bit rate
        //"-b:v","1M",             // Target bit rate
        "-an",
        //"-crf","20",             // Quality
        "-t", "180", // 3 min
        "-f", "h264"             // File format
      ];
      if (this.targetrate && this.targetrate != "0"){
        params.push("-b:v");
        params.push(this.targetrate);             // Quantization
      };
      params.push("-qmin");
      params.push("1");             // Quantization
      params.push("-qmax");
      params.push(this.quality);
      params.push("-q:v");                      // Output to STDOUT
      params.push(this.quality);
      params.push("-");                      // Output to STDOUT

      var cmdStr = "";
      cmdStr += x11videotool;
      i = 0;
      for (i = 0; i < params.length; ++i){
        cmdStr += " ";
        cmdStr += params[i];
      };
      console.log(cmdStr);
      //avconv -re -f x11grab -r 12 -s 1024x768 -i :3+0,0 -g 1 -me_method zero -flags2 fast -vcodec libvpx -preset ultrafast -tune zerolatecy -b:v 1M -crf 40 -qmin 5 -qmax 5 -t 180 -f webm -
      //ffmpeg -re -f x11grab -r 5 -s 1024x768 -i :0+0,0 -g 1 -me_method zero -flags2 fast -vcodec libtheora -preset ultrafast -tune zerolatecy -b:v 1M -crf 40 -q:v 6 -t 180 -f ogg -

      try{
        this.avconv = spawn(x11videotool, params);
      }catch(e){
        console.log("error 1");
      };
      var killFun = lang.hitch(this, "kill");
      setTimeout(function(){
        killfun();
      }, 190000);
      var self = this;
      
      var stream;
      try{
        stream = this.avconv.stdout;
        var bufAr = [];
        stream.on("data", function(data){
          if (!(data && data.length)){
            return;
          };
          self.streamData(data.toString("base64"));
        });
        stream.on("error", function(err){
          console.log("some stream error");
          console.log(err);
        });
        //stream.pipe(res);
      }catch(e){
        console.log("error 2");
      }
      
      try{
        stream.on("end", function(){
          console.log("stream end");
          try{
            killfun();
          }catch(e){
            console.log("error 3");
          }
        });
        stream.on("close", function(){
          console.log("stream close");
          try{
            killfun();
          }catch(e){
            console.log("error 3.5");
          }
        });
      }catch(e){};
      
    }
    
    , kill: function(){
      console.log("killing ...");
      this.avconv.kill();
    }
    
    , streamData: function(){}
    
  });
  
});
