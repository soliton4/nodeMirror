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
      , duration: 180
      , constructor: function(par){
        declare.safeMixin(this, par);


        var params = [
          "-re",                   // Real time mode
          "-f","x11grab",          // Grab screen
          "-r", this.fps,              // Framerate
          "-s", "" + this.dim.w + "x" + this.dim.h,   // Capture size

          "-i", ":0+" + this.dim.x + "," + this.dim.y // Capture offset
          //"-g", "100",                // All frames are i-frames
        ];

          if (this.format == "webm" || this.format == "ogg"){
          params.push("-me_method");
          params.push("zero");
          params.push("-flags2");
          params.push("fast");

          };

          params.push("-vcodec");
          if (this.format == "webm"){
          params.push("libvpx");

          }else if (this.format == "ogg"){
          params.push("libtheora");

          }else{
          params.push("libx264");
          };
          if (this.preset && this.maxrate != "medium"){
          params.push("-preset");
          params.push(this.preset);
          };
          if (this.maxrate && this.maxrate != "unlimited"){
          params.push("-b:v");
          params.push(this.maxrate);
          params.push("-maxrate");
          params.push(this.maxrate);
          params.push("-bufsize");
          params.push("4000k"); // we need a bufsize in order to do maxrate
          };

          if (!this.format || this.format == "h264"){
            params.push("-pass");
            params.push("1");
            params.push("-coder");
            params.push("0");
            params.push("-bf");
            params.push("0");
            params.push("-flags");
            params.push("-loop");
            params.push("-wpredp");
            params.push("0");
          };
          params.push("-tune");
          params.push("zerolatency");

          if (this.format == "webm" || this.format == "ogg"){
            params.push("-threads");
            params.push("8");
          }else{
            params.push("-threads");
            params.push("2");
          };

          params.push("-an");
          if (this.format == "webm" || this.format == "ogg"){
            params.push("-crf");
            params.push("20");// Quality
          };
          params.push("-t");
          params.push("" + this.duration); // 3 min
          params.push("-f");
          if (this.format == "webm"){
            params.push("webm");             // File format
          }else if (this.format == "ogg"){
            params.push("ogg");             // File format
          }else{
            params.push("h264");             // File format
          };

          //-pass 1 -coder 0 -bf 0 -flags -loop -wpredp 0 -an
          if (x11videotool == "avconv" && this.quality){
            if (this.format == "webm" || this.format == "ogg"){
              params.push("-qmin");
              params.push("1");             // Quantization
              params.push("-qmax");
              params.push(this.quality);
            };
          };
          if (this.format == "ogg" && this.quality){
            params.push("-q:v");
            params.push(this.quality);
          };
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
        killFun();
      }, (this.duration + 10) * 1000);
      var self = this;

      var stream;
      try{
        stream = this.avconv.stdout;
        var bufAr = [];
        stream.on("data", function(data){
          if (!(data && data.length)){
            return;
          };
          self.streamData(data);
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
          killFun();
        }catch(e){
          console.log("error 3");
        }
      });
      stream.on("close", function(){
        console.log("stream close");
        try{
          killFun();
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
